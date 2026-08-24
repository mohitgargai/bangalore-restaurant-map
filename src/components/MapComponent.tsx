'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Restaurant, Neighborhood } from '@/types';
import { CATEGORY_META } from '@/lib/colors';
import { LocateFixed } from 'lucide-react';

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

// Minimalist floating controls for zoom & recenter
function MapFloatingControls() {
  const map = useMap();

  const handleRecenter = () => {
    map.flyTo([12.9716, 77.5946], 13, { duration: 1.1 });
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
  onSelectRestaurant,
  bookmarkedIds,
  targetDistrict,
}: MapComponentProps) {
  // Bangalore Center coordinates
  const defaultCenter: [number, number] = [12.9716, 77.5946];
  const defaultZoom = 13;

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

        <MapFloatingControls />

        {restaurants.map((restaurant) => {
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
