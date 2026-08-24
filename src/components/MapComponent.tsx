'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Restaurant } from '@/types';
import { CATEGORY_META } from '@/lib/colors';

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

interface MapComponentProps {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  hoveredRestaurantId: string | null;
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
      color: '#f97316',
      icon: '📍',
      bg: '#ffedd5',
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
               background: ${active ? '#18181b' : 'white'};
               border: 2.5px solid ${active ? '#18181b' : meta.color};
               box-shadow: 0 4px 14px 0 rgba(0, 0, 0, ${active ? '0.35' : '0.15'});
             ">
          <span style="font-size: ${active ? '17px' : '13px'}; line-height: 1;">${meta.icon}</span>
        </div>
        ${
          isBookmarked
            ? `<div class="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-xs text-[8px] font-bold ring-1.5 ring-white">✓</div>`
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
    <div className="relative h-full w-full overflow-hidden bg-zinc-900">
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

        {restaurants.map((restaurant) => {
          const isSelected =
            selectedRestaurant?.id === restaurant.id &&
            selectedRestaurant?.lat === restaurant.lat &&
            selectedRestaurant?.lng === restaurant.lng;
          const isHovered = hoveredRestaurantId === restaurant.id;
          const icon = createModernPin(restaurant, isSelected, isHovered);

          return (
            <React.Fragment key={restaurant.id}>
              {/* Primary Location Pin */}
              <Marker
                position={[restaurant.lat, restaurant.lng]}
                icon={icon}
                eventHandlers={{
                  click: () => onSelectRestaurant(restaurant),
                }}
              />

              {/* Branch Location Pins */}
              {restaurant.branches?.map((branch) => {
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
