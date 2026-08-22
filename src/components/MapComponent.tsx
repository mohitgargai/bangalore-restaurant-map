'use client';

import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Restaurant } from '@/types';
import { CATEGORY_META } from '@/lib/colors';
import { Heart, MapPin, Sparkles, Navigation } from 'lucide-react';

interface MapComponentProps {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onUpvote: (id: string, e: React.MouseEvent) => void;
  userUpvotes: Record<string, boolean>;
}

// Helper to center and pan map smoothly
function MapController({ selectedRestaurant }: { selectedRestaurant: Restaurant | null }) {
  const map = useMap();

  useEffect(() => {
    if (selectedRestaurant) {
      map.flyTo([selectedRestaurant.lat, selectedRestaurant.lng], 15, {
        duration: 1.2,
        easeLinearity: 0.25,
      });
    }
  }, [selectedRestaurant, map]);

  return null;
}

export default function MapComponent({
  restaurants,
  selectedRestaurant,
  onSelectRestaurant,
  onUpvote,
  userUpvotes,
}: MapComponentProps) {
  // Bangalore Center coordinates
  const defaultCenter: [number, number] = [12.9716, 77.5946];
  const defaultZoom = 12;

  // Generate custom crisp HTML markers for each restaurant
  const createCustomIcon = (restaurant: Restaurant, isSelected: boolean) => {
    const meta = CATEGORY_META[restaurant.category] || {
      color: '#f97316',
      icon: '📍',
      bg: '#ffedd5',
    };

    const size = isSelected ? 48 : 38;
    const borderWeight = isSelected ? 'ring-4 ring-orange-500/80 scale-110 shadow-2xl' : 'shadow-md hover:scale-110';

    const html = `
      <div class="custom-map-pin relative flex items-center justify-center cursor-pointer transition-all duration-200" style="width: ${size}px; height: ${size}px;">
        <div class="w-full h-full rounded-2xl flex items-center justify-center ${borderWeight}" 
             style="background: ${isSelected ? '#18181b' : 'white'}; border: 2px solid ${isSelected ? '#f97316' : meta.color};">
          <span style="font-size: ${isSelected ? '20px' : '16px'}; line-height: 1;">${meta.icon}</span>
        </div>
        ${
          restaurant.featured
            ? `<div class="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs text-[9px] font-bold ring-1 ring-white">★</div>`
            : ''
        }
        <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45" 
             style="background: ${isSelected ? '#18181b' : 'white'}; border-right: 2px solid ${isSelected ? '#f97316' : meta.color}; border-bottom: 2px solid ${isSelected ? '#f97316' : meta.color};"></div>
      </div>
    `;

    return L.divIcon({
      className: 'custom-leaflet-div-icon',
      html,
      iconSize: [size, size],
      iconAnchor: [size / 2, size + 2],
      popupAnchor: [0, -size - 4],
    });
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
        zoomControl={false}
      >
        {/* CartoDB Positron / Clean Light Tiles for ultra-clean minimalist design */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        <MapController selectedRestaurant={selectedRestaurant} />

        {restaurants.map((restaurant) => {
          const isSelected = selectedRestaurant?.id === restaurant.id;
          const icon = createCustomIcon(restaurant, isSelected);

          return (
            <Marker
              key={restaurant.id}
              position={[restaurant.lat, restaurant.lng]}
              icon={icon}
              eventHandlers={{
                click: () => onSelectRestaurant(restaurant),
              }}
            >
              <Popup className="custom-popup" closeButton={false} offset={[0, -10]}>
                <div className="w-[280px] p-0 overflow-hidden text-zinc-900">
                  {/* Image cover */}
                  <div className="relative h-32 w-full overflow-hidden bg-zinc-100">
                    <img
                      src={restaurant.imageUrl}
                      alt={restaurant.name}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <span className="absolute bottom-2 left-2.5 rounded-md bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-zinc-800 backdrop-blur-sm shadow-xs">
                      {restaurant.neighborhood}
                    </span>
                    <span className="absolute bottom-2 right-2.5 rounded-md bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                      {restaurant.priceLevel} ({restaurant.priceForTwo})
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-zinc-900 text-base leading-tight">
                        {restaurant.name}
                      </h4>
                      <button
                        onClick={(e) => onUpvote(restaurant.id, e)}
                        className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium transition-colors ${
                          userUpvotes[restaurant.id]
                            ? 'bg-rose-50 text-rose-600 border border-rose-200'
                            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                        }`}
                      >
                        <Heart
                          className={`h-3.5 w-3.5 ${
                            userUpvotes[restaurant.id] ? 'fill-rose-500 text-rose-500' : ''
                          }`}
                        />
                        <span>{restaurant.upvotes}</span>
                      </button>
                    </div>

                    <p className="mt-1 text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                      {restaurant.tagline}
                    </p>

                    {/* Must try badges */}
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {restaurant.mustTry.slice(0, 2).map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-1.5 py-0.5 text-[10.5px] font-medium text-amber-900 border border-amber-200/60"
                        >
                          <Sparkles className="h-2.5 w-2.5 text-amber-600" />
                          {item}
                        </span>
                      ))}
                      {restaurant.mustTry.length > 2 && (
                        <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[10.5px] font-medium text-zinc-500">
                          +{restaurant.mustTry.length - 2} more
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="mt-3 flex items-center gap-2 pt-2 border-t border-zinc-100">
                      <button
                        onClick={() => onSelectRestaurant(restaurant)}
                        className="flex-1 rounded-lg bg-zinc-900 py-1.5 text-center text-xs font-medium text-white transition-colors hover:bg-zinc-800 shadow-xs"
                      >
                        View Full Details
                      </button>
                      <a
                        href={restaurant.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-zinc-200 p-1.5 text-zinc-600 hover:bg-zinc-50 transition-colors"
                        title="Directions"
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
