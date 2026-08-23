'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Restaurant } from '@/types';
import { CATEGORY_META } from '@/lib/colors';
import { getGoogleMapsDirectionsUrl } from '@/lib/maps';
import { Bookmark, Navigation, Sparkles } from 'lucide-react';

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
      map.flyTo([selectedRestaurant.lat, selectedRestaurant.lng], 16, {
        duration: 1.2,
        easeLinearity: 0.25,
      });
    }
  }, [selectedRestaurant, map]);

  useEffect(() => {
    if (targetDistrict) {
      map.flyTo([targetDistrict.lat, targetDistrict.lng], targetDistrict.zoom, {
        duration: 1.4,
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
  onOpenDrawer,
  onToggleBookmark,
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
    const size = active ? 42 : 32;

    const html = `
      <div class="relative flex items-center justify-center cursor-pointer transition-all duration-300 ${
        active ? 'scale-125 z-[1000]' : 'hover:scale-115'
      }" style="width: ${size}px; height: ${size}px;">
        ${
          active
            ? `<div class="absolute -inset-2 rounded-full animate-ping opacity-25" style="background-color: ${meta.color};"></div>`
            : ''
        }
        <div class="w-full h-full rounded-full flex items-center justify-center shadow-md transition-all duration-300"
             style="
               background: ${active ? '#18181b' : 'white'};
               border: 2px solid ${active ? '#18181b' : meta.color};
               box-shadow: 0 4px 12px 0 rgba(0, 0, 0, ${active ? '0.3' : '0.12'});
             ">
          <span style="font-size: ${active ? '16px' : '13px'}; line-height: 1;">${meta.icon}</span>
        </div>
        ${
          isBookmarked
            ? `<div class="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-xs text-[7px] font-bold ring-1.5 ring-white">✓</div>`
            : ''
        }
      </div>
    `;

    return L.divIcon({
      className: 'modern-leaflet-pin',
      html,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -size / 2 - 4],
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
          const isSelected = selectedRestaurant?.id === restaurant.id;
          const isHovered = hoveredRestaurantId === restaurant.id;
          const isBookmarked = bookmarkedIds.has(restaurant.id);
          const icon = createModernPin(restaurant, isSelected, isHovered);
          const directionsUrl = getGoogleMapsDirectionsUrl(restaurant);

          return (
            <Marker
              key={restaurant.id}
              position={[restaurant.lat, restaurant.lng]}
              icon={icon}
              eventHandlers={{
                click: () => onSelectRestaurant(restaurant),
              }}
            >
              <Popup className="custom-popup" closeButton={false} offset={[0, -8]}>
                <div className="w-[280px] p-0 overflow-hidden text-zinc-900 rounded-2xl">
                  {/* Image cover */}
                  <div className="relative h-28 w-full overflow-hidden bg-zinc-900">
                    <img
                      src={restaurant.imageUrl}
                      alt={restaurant.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <span className="absolute bottom-2 left-2.5 rounded-md bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-zinc-900 backdrop-blur-md shadow-xs">
                      {restaurant.neighborhood}
                    </span>
                    <span className="absolute bottom-2 right-2.5 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-md">
                      {restaurant.priceLevel}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-3 bg-white">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[9.5px] font-bold uppercase tracking-wider text-orange-600">
                          {restaurant.category}
                        </span>
                        <h4 className="font-bold text-zinc-900 text-sm leading-tight">
                          {restaurant.name}
                        </h4>
                      </div>
                      <button
                        onClick={(e) => onToggleBookmark(restaurant.id, e)}
                        className={`p-1 rounded-lg transition-colors ${
                          isBookmarked
                            ? 'text-orange-600 bg-orange-50'
                            : 'text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100'
                        }`}
                        title={isBookmarked ? 'Remove bookmark' : 'Save place'}
                      >
                        <Bookmark
                          className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-orange-600' : ''}`}
                        />
                      </button>
                    </div>

                    {/* Signature dish */}
                    <div className="mt-2 flex items-center gap-1 text-xs text-zinc-700">
                      <Sparkles className="h-3 w-3 text-orange-600 shrink-0" />
                      <span className="truncate"><b>Must try:</b> {restaurant.mustTry[0]}</span>
                    </div>

                    {/* Actions */}
                    <div className="mt-3 flex items-center gap-2 pt-2 border-t border-zinc-100">
                      <button
                        onClick={() => {
                          if (onOpenDrawer) {
                            onOpenDrawer(restaurant);
                          } else {
                            onSelectRestaurant(restaurant);
                          }
                        }}
                        className="flex-1 rounded-lg bg-zinc-900 py-1.5 text-center text-xs font-semibold text-white hover:bg-zinc-800 transition-colors"
                      >
                        View Spot &rarr;
                      </button>
                      <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-zinc-200 p-1.5 text-zinc-600 hover:bg-zinc-50 transition-colors"
                        title="Directions in Google Maps"
                      >
                        <Navigation className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
