'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Restaurant, Neighborhood } from '@/types';
import { CATEGORY_META } from '@/lib/colors';
import { LocateFixed } from 'lucide-react';

export const NEIGHBORHOOD_HUBS: {
  id: Neighborhood;
  name: string;
  shortLabel: string;
  icon: string;
  lat: number;
  lng: number;
  zoom: number;
}[] = [
  { id: 'Indiranagar', name: 'Indiranagar', shortLabel: 'Indiranagar', icon: '🌿', lat: 12.9734, lng: 77.6409, zoom: 15 },
  { id: 'Church Street & MG Road', name: 'Church St / CBD', shortLabel: 'Church St', icon: '☕', lat: 12.9737, lng: 77.6074, zoom: 15.5 },
  { id: 'Malleshwaram', name: 'Malleshwaram', shortLabel: 'Malleshwaram', icon: '🥞', lat: 12.9985, lng: 77.5708, zoom: 15 },
  { id: 'Basavanagudi', name: 'Basavanagudi / VV Puram', shortLabel: 'Basavanagudi', icon: '🍛', lat: 12.9455, lng: 77.5739, zoom: 15 },
  { id: 'Koramangala', name: 'Koramangala', shortLabel: 'Koramangala', icon: '🍺', lat: 12.9341, lng: 77.6256, zoom: 15 },
  { id: 'HSR Layout', name: 'HSR Layout', shortLabel: 'HSR Layout', icon: '🍳', lat: 12.9118, lng: 77.6385, zoom: 15 },
  { id: 'JP Nagar', name: 'JP Nagar', shortLabel: 'JP Nagar', icon: '🎭', lat: 12.9080, lng: 77.5880, zoom: 15 },
  { id: 'Jayanagar', name: 'Jayanagar', shortLabel: 'Jayanagar', icon: '🥘', lat: 12.9238, lng: 77.5934, zoom: 15 },
  { id: 'Lavelle Road', name: 'Lavelle Road', shortLabel: 'Lavelle Rd', icon: '🍷', lat: 12.9698, lng: 77.5997, zoom: 15.5 },
  { id: 'CBD & Central', name: 'CBD & Central', shortLabel: 'CBD & Central', icon: '🏛️', lat: 12.9750, lng: 77.5950, zoom: 15 },
  { id: 'Bellandur & Ecoworld', name: 'Bellandur / Ecoworld', shortLabel: 'Bellandur', icon: '🍜', lat: 12.9258, lng: 77.6867, zoom: 15 },
  { id: 'Sarjapur Road', name: 'Sarjapur Rd', shortLabel: 'Sarjapur Rd', icon: '🍻', lat: 12.9100, lng: 77.6800, zoom: 14.5 },
  { id: 'Kalyan Nagar & Kammanahalli', name: 'Kalyan Nagar / CMR', shortLabel: 'Kalyan Nagar', icon: '🥢', lat: 13.0185, lng: 77.6440, zoom: 15 },
  { id: 'Whitefield', name: 'Whitefield', shortLabel: 'Whitefield', icon: '🌾', lat: 12.9750, lng: 77.7350, zoom: 14.5 },
  { id: 'Sadashivanagar & Palace Grounds', name: 'Sadashivanagar', shortLabel: 'Sadashivanagar', icon: '🍃', lat: 13.0080, lng: 77.5800, zoom: 15 },
  { id: 'Bel Road & North BLR', name: 'North BLR', shortLabel: 'North BLR', icon: '🌲', lat: 13.0450, lng: 77.5850, zoom: 13.5 },
];

// Controller to fly the map camera smoothly
function MapController({
  selectedRestaurant,
  targetDistrict,
}: {
  selectedRestaurant: Restaurant | null;
  targetDistrict: { name: string; lat: number; lng: number; zoom: number } | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedRestaurant) {
      // Center directly on the restaurant coordinates
      map.flyTo([selectedRestaurant.lat, selectedRestaurant.lng], 16.5, {
        duration: 0.9,
        easeLinearity: 0.25,
      });
    }
  }, [selectedRestaurant, map]);

  useEffect(() => {
    if (targetDistrict) {
      map.flyTo([targetDistrict.lat, targetDistrict.lng], targetDistrict.zoom, {
        duration: 1.3,
        easeLinearity: 0.25,
      });
    }
  }, [targetDistrict, map]);

  return null;
}

// Map Event Listener for Dynamic Zoom Level Tracking
function MapZoomWatcher({ onZoom }: { onZoom: (zoom: number) => void }) {
  const map = useMapEvents({
    zoomend: () => {
      onZoom(map.getZoom());
    },
  });

  useEffect(() => {
    onZoom(map.getZoom());
  }, [map, onZoom]);

  return null;
}

// Minimalist floating controls for zoom & recenter
function MapFloatingControls({ onRecenter }: { onRecenter?: () => void }) {
  const map = useMap();

  const handleRecenter = () => {
    map.flyTo([12.9716, 77.5946], 13, { duration: 1.1 });
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
  const [currentZoom, setCurrentZoom] = useState<number>(defaultZoom);

  const handleZoomUpdate = useCallback((zoom: number) => {
    setCurrentZoom(zoom);
  }, []);

  // Compute spot counts per neighborhood matching current filters
  const countsByNeighborhood = useMemo(() => {
    const counts: Record<string, number> = {};
    restaurants.forEach((r) => {
      counts[r.neighborhood] = (counts[r.neighborhood] || 0) + 1;
      if (r.branches) {
        r.branches.forEach((b) => {
          counts[b.neighborhood] = (counts[b.neighborhood] || 0) + 1;
        });
      }
    });
    return counts;
  }, [restaurants]);

  // Determine whether to display Neighborhood Hubs or Individual Pins:
  // When zoomed out (< 14) and no specific neighborhood filter or restaurant is active, show Hub Badges
  const isClusteredView =
    (!selectedNeighborhood || selectedNeighborhood === 'All') &&
    currentZoom < 14 &&
    !selectedRestaurant;

  // Modern Minimalist Category Pin
  const createModernPin = (restaurant: Restaurant, isSelected: boolean, isHovered: boolean) => {
    const meta = CATEGORY_META[restaurant.category] || {
      color: '#BC5434',
      icon: '📍',
      bg: '#FDF3EE',
    };

    const active = isSelected || isHovered;
    const isBookmarked = bookmarkedIds.has(restaurant.id);
    const size = active ? 44 : 32;

    const html = `
      <div class="relative flex items-center justify-center cursor-pointer transition-all duration-300 ${
        active ? 'scale-125 z-[1000]' : 'hover:scale-115'
      }" style="width: ${size}px; height: ${size}px;">
        ${
          active
            ? `<div class="absolute -inset-2 rounded-full animate-ping opacity-30" style="background-color: ${meta.color};"></div>`
            : ''
        }
        <div class="w-full h-full rounded-full flex items-center justify-center shadow-md transition-all duration-300"
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
  };

  // Minimalist Numeric Food Hub Cluster Disc (Airbnb / Apple Maps style)
  const createHubIcon = (hub: (typeof NEIGHBORHOOD_HUBS)[0], count: number) => {
    const html = `
      <div class="group relative flex items-center justify-center cursor-pointer"
           style="transform: translate(-50%, -50%);">
        <div class="h-8.5 w-8.5 rounded-full bg-[#211C1A] text-white font-black text-xs flex items-center justify-center shadow-md border-2 border-white ring-1.5 ring-stone-900/10 transition-all duration-200 group-hover:scale-110 group-hover:bg-[#BC5434] group-hover:shadow-xl active:scale-95">
          ${count}
        </div>
        <!-- Delicate Tooltip on Hover Only -->
        <div class="opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 absolute -top-7 left-1/2 -translate-x-1/2 rounded-lg bg-[#211C1A] px-2.5 py-1 text-[11px] font-bold text-white whitespace-nowrap shadow-xl border border-white/10">
          ${hub.name}
        </div>
      </div>
    `;

    return L.divIcon({
      className: 'custom-hub-icon',
      html,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
    });
  };

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

        <MapZoomWatcher onZoom={handleZoomUpdate} />

        <MapFloatingControls onRecenter={() => onSelectNeighborhood?.('All')} />

        {/* ================= CLUSTERED VIEW: NEIGHBORHOOD FOOD HUBS ================= */}
        {isClusteredView &&
          NEIGHBORHOOD_HUBS.map((hub) => {
            const count = countsByNeighborhood[hub.id] || 0;
            if (count === 0) return null;

            return (
              <Marker
                key={hub.id}
                position={[hub.lat, hub.lng]}
                icon={createHubIcon(hub, count)}
                eventHandlers={{
                  click: () => {
                    onSelectNeighborhood?.(hub.id);
                  },
                }}
              />
            );
          })}

        {/* ================= DETAILED VIEW: INDIVIDUAL CATEGORY PINS ================= */}
        {!isClusteredView &&
          restaurants.map((restaurant) => {
            const isSelected =
              selectedRestaurant?.id === restaurant.id &&
              selectedRestaurant?.lat === restaurant.lat &&
              selectedRestaurant?.lng === restaurant.lng;
            const isHovered = hoveredRestaurantId === restaurant.id;
            const icon = createModernPin(restaurant, isSelected, isHovered);

            const showPrimary =
              !selectedNeighborhood ||
              selectedNeighborhood === 'All' ||
              restaurant.neighborhood === selectedNeighborhood;

            return (
              <React.Fragment key={restaurant.id}>
                {/* Primary Location Pin */}
                {showPrimary && (
                  <Marker
                    position={[restaurant.lat, restaurant.lng]}
                    icon={icon}
                    eventHandlers={{
                      click: () => onSelectRestaurant(restaurant),
                    }}
                  />
                )}

                {/* Branch Location Pins */}
                {restaurant.branches
                  ?.filter(
                    (branch) =>
                      !selectedNeighborhood ||
                      selectedNeighborhood === 'All' ||
                      branch.neighborhood === selectedNeighborhood
                  )
                  .map((branch) => {
                    const isBranchSelected =
                      selectedRestaurant?.id === restaurant.id &&
                      selectedRestaurant?.lat === branch.lat &&
                      selectedRestaurant?.lng === branch.lng;
                    const branchIcon = createModernPin(restaurant, isBranchSelected, isHovered);

                    return (
                      <Marker
                        key={`${restaurant.id}-${branch.id}`}
                        position={[branch.lat, branch.lng]}
                        icon={branchIcon}
                        eventHandlers={{
                          click: () =>
                            onSelectRestaurant({
                              ...restaurant,
                              neighborhood: branch.neighborhood,
                              address: branch.address,
                              lat: branch.lat,
                              lng: branch.lng,
                              googleMapsUrl: branch.googleMapsUrl,
                            }),
                        }}
                      />
                    );
                  })}
              </React.Fragment>
            );
          })}
      </MapContainer>
    </div>
  );
}

