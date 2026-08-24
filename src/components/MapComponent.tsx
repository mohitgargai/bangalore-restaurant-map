'use client';

import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Supercluster from 'supercluster';
import { Restaurant, Neighborhood, Category } from '@/types';
import { CATEGORY_META } from '@/lib/colors';
import { LocateFixed } from 'lucide-react';

interface SpotProperties {
  cluster: false;
  restaurantId: string;
  resolvedRestaurant: Restaurant;
  category: Category;
  isBranch: boolean;
  branchId?: string;
}

// Controller to fly the map camera smoothly
function MapController({
  selectedRestaurant,
  targetDistrict,
}: {
  selectedRestaurant: Restaurant | null;
  targetDistrict: { name: string; lat: number; lng: number; zoom: number } | null;
}) {
  const map = useMap();
  const lastSelectedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (selectedRestaurant) {
      const key = `${selectedRestaurant.id}-${selectedRestaurant.lat}-${selectedRestaurant.lng}`;
      if (lastSelectedKeyRef.current !== key) {
        lastSelectedKeyRef.current = key;
        map.flyTo([selectedRestaurant.lat, selectedRestaurant.lng], 16.5, {
          duration: 0.85,
          easeLinearity: 0.25,
        });
      }
    } else {
      lastSelectedKeyRef.current = null;
    }
  }, [selectedRestaurant, map]);

  useEffect(() => {
    if (targetDistrict) {
      map.flyTo([targetDistrict.lat, targetDistrict.lng], targetDistrict.zoom, {
        duration: 1.1,
        easeLinearity: 0.25,
      });
    }
  }, [targetDistrict, map]);

  return null;
}

// Minimalist floating controls for zoom & recenter
function MapFloatingControls({ onRecenter }: { onRecenter?: () => void }) {
  const map = useMap();

  const handleRecenter = () => {
    map.flyTo([12.9716, 77.5946], 13, { duration: 0.9 });
    if (onRecenter) onRecenter();
  };

  return (
    <div className="absolute right-3 top-36 sm:top-28 z-[1000] flex flex-col gap-1.5 pointer-events-auto">
      <div className="flex flex-col rounded-2xl border border-[#E6E0D5]/90 bg-[#FFFDFB]/95 shadow-md backdrop-blur-md overflow-hidden">
        <button
          onClick={() => map.zoomIn()}
          className="flex h-8 w-8 items-center justify-center text-[#332D28] hover:bg-[#F0EBE1] hover:text-[#211C1A] transition-colors font-bold text-sm border-b border-[#ECE6DA] cursor-pointer focus-visible:outline-none"
          title="Zoom In"
          aria-label="Zoom In"
        >
          +
        </button>
        <button
          onClick={() => map.zoomOut()}
          className="flex h-8 w-8 items-center justify-center text-[#332D28] hover:bg-[#F0EBE1] hover:text-[#211C1A] transition-colors font-bold text-sm cursor-pointer focus-visible:outline-none"
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          &minus;
        </button>
      </div>

      <button
        onClick={handleRecenter}
        className="flex h-8 w-8 items-center justify-center rounded-2xl border border-[#E6E0D5]/90 bg-[#FFFDFB]/95 text-[#332D28] shadow-md backdrop-blur-md hover:bg-[#F0EBE1] hover:text-[#211C1A] transition-colors cursor-pointer focus-visible:outline-none"
        title="Reset Bangalore View"
        aria-label="Reset Bangalore View"
      >
        <LocateFixed className="h-4 w-4 text-[#544E4B]" />
      </button>
    </div>
  );
}

// Proportional, elegant cluster disc icon
function createClusterIcon(count: number) {
  let size = 32;
  let ringClass = 'border-2 border-white ring-1.5 ring-stone-900/15';
  let bgClass = 'bg-[#211C1A] text-white';

  if (count >= 16) {
    size = 40;
    ringClass = 'border-2 border-white ring-2 ring-[#BC5434]/40';
    bgClass = 'bg-[#BC5434] text-white';
  } else if (count >= 6) {
    size = 36;
    ringClass = 'border-2 border-white ring-1.5 ring-[#283629]/40';
    bgClass = 'bg-[#283629] text-white';
  }

  const html = `
    <div class="flex items-center justify-center cursor-pointer select-none"
         style="width: ${size}px; height: ${size}px;">
      <div class="w-full h-full rounded-full ${bgClass} ${ringClass} font-black text-xs sm:text-sm flex items-center justify-center shadow-md transition-transform duration-150 ease-out hover:scale-110 active:scale-95">
        ${count}
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-hub-icon',
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

// Category Pin with clean, smooth rendering
function createModernPin(
  restaurant: Restaurant,
  isSelected: boolean,
  isHovered: boolean,
  isBookmarked: boolean
) {
  const meta = CATEGORY_META[restaurant.category] || {
    color: '#BC5434',
    icon: '📍',
    bg: '#FDF3EE',
  };

  const active = isSelected || isHovered;
  const size = active ? 44 : 32;

  const html = `
    <div class="relative flex items-center justify-center cursor-pointer transition-transform duration-150 ease-out ${
      active ? 'scale-125 z-[1000]' : 'hover:scale-115'
    }" style="width: ${size}px; height: ${size}px;">
      ${
        active
          ? `<div class="absolute -inset-2 rounded-full animate-ping opacity-35" style="background-color: ${meta.color};"></div>`
          : ''
      }
      <div class="w-full h-full rounded-full flex items-center justify-center shadow-md transition-all duration-150"
           style="
             background: ${active ? '#211C1A' : 'white'};
             border: 2.5px solid ${active ? '#211C1A' : meta.color};
             box-shadow: 0 4px 14px 0 rgba(33, 28, 26, ${active ? '0.35' : '0.12'});
           ">
        <span style="font-size: ${active ? '17px' : '13px'}; line-height: 1;">${meta.icon}</span>
      </div>
      ${
        isBookmarked
          ? `<div class="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#BC5434] text-white flex items-center justify-center shadow-xs text-[8px] font-bold ring-1.5 ring-white">✓</div>`
          : ''
      }
    </div>
  `;

  return L.divIcon({
    className: 'modern-leaflet-pin',
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

// Interactive Supercluster Viewport Renderer
function SuperclusterMapLayer({
  supercluster,
  selectedRestaurant,
  hoveredRestaurantId,
  bookmarkedIds,
  onSelectRestaurant,
}: {
  supercluster: Supercluster<SpotProperties>;
  selectedRestaurant: Restaurant | null;
  hoveredRestaurantId: string | null;
  bookmarkedIds: Set<string>;
  onSelectRestaurant: (restaurant: Restaurant) => void;
}) {
  const map = useMap();
  const [zoom, setZoom] = useState<number>(() => Math.floor(map.getZoom()));
  const [bounds, setBounds] = useState<[number, number, number, number]>(() => {
    const b = map.getBounds();
    return [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()];
  });

  const updateView = useCallback(() => {
    const b = map.getBounds();
    setBounds([b.getWest(), b.getSouth(), b.getEast(), b.getNorth()]);
    setZoom(Math.floor(map.getZoom()));
  }, [map]);

  useMapEvents({
    zoomend: updateView,
    moveend: updateView,
  });

  const clusters = useMemo(() => {
    try {
      return supercluster.getClusters(bounds, zoom);
    } catch {
      return [];
    }
  }, [supercluster, bounds, zoom]);

  // Handle clicking a cluster to smoothly expand and fly camera
  const handleClusterClick = (clusterId: number, lat: number, lng: number) => {
    const expansionZoom = Math.min(
      supercluster.getClusterExpansionZoom(clusterId),
      17
    );
    map.flyTo([lat, lng], expansionZoom, {
      duration: 0.75,
      easeLinearity: 0.25,
    });
  };

  return (
    <>
      {/* Background Clusters & Unselected Spots */}
      {clusters.map((cluster) => {
        const [lng, lat] = cluster.geometry.coordinates;
        const isCluster = cluster.properties.cluster;

        if (isCluster) {
          const count = cluster.properties.point_count;
          const clusterId = cluster.id as number;

          return (
            <Marker
              key={`cluster-${clusterId}-${lat}-${lng}`}
              position={[lat, lng]}
              icon={createClusterIcon(count)}
              eventHandlers={{
                click: () => handleClusterClick(clusterId, lat, lng),
              }}
            />
          );
        }

        // Individual spot marker
        const props = cluster.properties as SpotProperties;
        const spot = props.resolvedRestaurant;
        const isHovered = hoveredRestaurantId === spot.id;
        const isBookmarked = bookmarkedIds.has(spot.id);

        return (
          <Marker
            key={`spot-${spot.id}-${lat}-${lng}`}
            position={[lat, lng]}
            icon={createModernPin(spot, false, isHovered, isBookmarked)}
            eventHandlers={{
              click: () => onSelectRestaurant(spot),
            }}
          />
        );
      })}

      {/* Explicit Always-Unfurled Focused Spot Pin (Never swallowed into cluster) */}
      {selectedRestaurant && (
        <Marker
          key={`focused-${selectedRestaurant.id}-${selectedRestaurant.lat}-${selectedRestaurant.lng}`}
          position={[selectedRestaurant.lat, selectedRestaurant.lng]}
          zIndexOffset={10000}
          icon={createModernPin(
            selectedRestaurant,
            true,
            hoveredRestaurantId === selectedRestaurant.id,
            bookmarkedIds.has(selectedRestaurant.id)
          )}
          eventHandlers={{
            click: () => onSelectRestaurant(selectedRestaurant),
          }}
        />
      )}
    </>
  );
}

interface MapComponentProps {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  hoveredRestaurantId: string | null;
  selectedNeighborhood?: Neighborhood | 'All';
  onSelectNeighborhood?: (n: Neighborhood | 'All') => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onOpenDrawer?: (restaurant: Restaurant) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  bookmarkedIds: Set<string>;
  targetDistrict: { name: string; lat: number; lng: number; zoom: number } | null;
}

export default function MapComponent({
  restaurants,
  selectedRestaurant,
  hoveredRestaurantId,
  selectedNeighborhood,
  onSelectNeighborhood,
  onSelectRestaurant,
  bookmarkedIds,
  targetDistrict,
}: MapComponentProps) {
  // Bangalore Center coordinates
  const defaultCenter: [number, number] = [12.9716, 77.5946];
  const defaultZoom = 13;

  // Convert restaurants + branches to Supercluster Point Features
  // (Excluding the currently focused restaurant so it always renders independently on top)
  const points: GeoJSON.Feature<GeoJSON.Point, SpotProperties>[] = useMemo(() => {
    const pts: GeoJSON.Feature<GeoJSON.Point, SpotProperties>[] = [];

    restaurants.forEach((restaurant) => {
      const isPrimarySelected =
        selectedRestaurant?.id === restaurant.id &&
        selectedRestaurant?.lat === restaurant.lat &&
        selectedRestaurant?.lng === restaurant.lng;

      const showPrimary =
        !selectedNeighborhood ||
        selectedNeighborhood === 'All' ||
        restaurant.neighborhood === selectedNeighborhood;

      if (showPrimary && !isPrimarySelected) {
        pts.push({
          type: 'Feature',
          properties: {
            cluster: false,
            restaurantId: restaurant.id,
            resolvedRestaurant: restaurant,
            category: restaurant.category,
            isBranch: false,
          },
          geometry: {
            type: 'Point',
            coordinates: [restaurant.lng, restaurant.lat],
          },
        });
      }

      restaurant.branches
        ?.filter(
          (branch) =>
            !selectedNeighborhood ||
            selectedNeighborhood === 'All' ||
            branch.neighborhood === selectedNeighborhood
        )
        .forEach((branch) => {
          const isBranchSelected =
            selectedRestaurant?.id === restaurant.id &&
            selectedRestaurant?.lat === branch.lat &&
            selectedRestaurant?.lng === branch.lng;

          if (!isBranchSelected) {
            pts.push({
              type: 'Feature',
              properties: {
                cluster: false,
                restaurantId: restaurant.id,
                resolvedRestaurant: {
                  ...restaurant,
                  neighborhood: branch.neighborhood,
                  address: branch.address,
                  lat: branch.lat,
                  lng: branch.lng,
                  googleMapsUrl: branch.googleMapsUrl,
                },
                category: restaurant.category,
                isBranch: true,
                branchId: branch.id,
              },
              geometry: {
                type: 'Point',
                coordinates: [branch.lng, branch.lat],
              },
            });
          }
        });
    });

    return pts;
  }, [restaurants, selectedNeighborhood, selectedRestaurant]);

  // Load supercluster spatial index
  const supercluster = useMemo(() => {
    const sc = new Supercluster<SpotProperties>({
      radius: 48,
      maxZoom: 16,
      minPoints: 2,
    });
    sc.load(points);
    return sc;
  }, [points]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#F4EFE6]">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
        zoomControl={false}
      >
        {/* CartoDB Voyager Minimalist Map Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        <MapController
          selectedRestaurant={selectedRestaurant}
          targetDistrict={targetDistrict}
        />

        <MapFloatingControls onRecenter={() => onSelectNeighborhood?.('All')} />

        <SuperclusterMapLayer
          supercluster={supercluster}
          selectedRestaurant={selectedRestaurant}
          hoveredRestaurantId={hoveredRestaurantId}
          bookmarkedIds={bookmarkedIds}
          onSelectRestaurant={onSelectRestaurant}
        />
      </MapContainer>
    </div>
  );
}



