'use client';

import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Restaurant, Neighborhood } from '@/types';
import { getGoogleMapsDirectionsUrl, resolveLocationForDisplay } from '@/lib/maps';
import { Bookmark, Navigation, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

// Dynamic Leaflet Map Component
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-zinc-950 text-zinc-400">
      <div className="flex flex-col items-center gap-2">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-orange-600 border-t-transparent"></div>
        <p className="text-xs font-mono font-medium tracking-wider uppercase">Loading Map Canvas…</p>
      </div>
    </div>
  ),
});

export const DISTRICT_MAP_CONFIG: {
  id: Neighborhood | 'All';
  label: string;
  lat: number;
  lng: number;
  zoom: number;
}[] = [
  { id: 'All', label: 'All Bangalore', lat: 12.9716, lng: 77.5946, zoom: 12 },
  { id: 'Indiranagar', label: 'Indiranagar', lat: 12.9734, lng: 77.6409, zoom: 15 },
  { id: 'Church Street & MG Road', label: 'Church St / CBD', lat: 12.9737, lng: 77.6074, zoom: 15 },
  { id: 'Malleshwaram', label: 'Malleshwaram', lat: 12.9985, lng: 77.5708, zoom: 15 },
  { id: 'Basavanagudi', label: 'Basavanagudi / VV Puram', lat: 12.9455, lng: 77.5739, zoom: 15 },
  { id: 'Koramangala', label: 'Koramangala', lat: 12.9341, lng: 77.6256, zoom: 15 },
  { id: 'HSR Layout', label: 'HSR Layout', lat: 12.9118, lng: 77.6385, zoom: 15 },
  { id: 'JP Nagar', label: 'JP Nagar', lat: 12.9080, lng: 77.5880, zoom: 15 },
  { id: 'Jayanagar', label: 'Jayanagar', lat: 12.9238, lng: 77.5934, zoom: 15 },
  { id: 'Lavelle Road', label: 'Lavelle Road', lat: 12.9698, lng: 77.5997, zoom: 15 },
  { id: 'CBD & Central', label: 'CBD & Central', lat: 12.9750, lng: 77.5950, zoom: 15 },
  { id: 'Bellandur & Ecoworld', label: 'Bellandur / Ecoworld', lat: 12.9258, lng: 77.6867, zoom: 15 },
  { id: 'Sarjapur Road', label: 'Sarjapur Rd', lat: 12.9100, lng: 77.6800, zoom: 14 },
  { id: 'Kalyan Nagar & Kammanahalli', label: 'Kalyan Nagar / CMR', lat: 13.0185, lng: 77.6440, zoom: 15 },
  { id: 'Whitefield', label: 'Whitefield', lat: 12.9750, lng: 77.7350, zoom: 14 },
  { id: 'Sadashivanagar & Palace Grounds', label: 'Sadashivanagar', lat: 13.0080, lng: 77.5800, zoom: 15 },
  { id: 'Bel Road & North BLR', label: 'North BLR', lat: 13.0450, lng: 77.5850, zoom: 13 },
];

interface SpatialMapFlowProps {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onOpenDrawer: (restaurant: Restaurant) => void;
  hoveredRestaurantId: string | null;
  onHoverRestaurant: (id: string | null) => void;
  selectedNeighborhood: Neighborhood | 'All';
  onSelectNeighborhood: (n: Neighborhood | 'All') => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  bookmarkedIds: Set<string>;
  targetDistrict: { name: string; lat: number; lng: number; zoom: number } | null;
}

export default function SpatialMapFlow({
  restaurants,
  selectedRestaurant,
  onSelectRestaurant,
  onOpenDrawer,
  hoveredRestaurantId,
  onHoverRestaurant,
  selectedNeighborhood,
  onToggleBookmark,
  bookmarkedIds,
  targetDistrict,
}: SpatialMapFlowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Auto-scroll the bottom carousel when a restaurant pin is selected
  useEffect(() => {
    if (selectedRestaurant && cardRefs.current[selectedRestaurant.id]) {
      cardRefs.current[selectedRestaurant.id]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [selectedRestaurant]);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-zinc-950">
      {/* Fullscreen Map Canvas */}
      <MapComponent
        restaurants={restaurants}
        selectedRestaurant={selectedRestaurant}
        hoveredRestaurantId={hoveredRestaurantId}
        selectedNeighborhood={selectedNeighborhood}
        onSelectRestaurant={onSelectRestaurant}
        onOpenDrawer={onOpenDrawer}
        onToggleBookmark={onToggleBookmark}
        bookmarkedIds={bookmarkedIds}
        targetDistrict={targetDistrict}
      />

      {/* Floating Bottom Card Carousel Flow with Mobile Snap Scroll */}
      <div className="pointer-events-none absolute inset-x-0 bottom-3 sm:bottom-5 z-[1100] px-2 sm:px-4 flex flex-col items-center">
        <div className="pointer-events-auto relative w-full max-w-5xl">
          {/* Scroll Nav Buttons (Desktop only) */}
          {restaurants.length > 3 && (
            <>
              <button
                onClick={handleScrollLeft}
                className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 h-9 w-9 items-center justify-center rounded-full bg-white/95 text-zinc-800 shadow-xl border border-zinc-200 backdrop-blur-md hover:bg-white hover:scale-105 transition-all"
                title="Previous"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleScrollRight}
                className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 h-9 w-9 items-center justify-center rounded-full bg-white/95 text-zinc-800 shadow-xl border border-zinc-200 backdrop-blur-md hover:bg-white hover:scale-105 transition-all"
                title="Next"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}

          {/* Carousel Track with Smooth Touch Snap */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth snap-x snap-mandatory touch-pan-x"
          >
            {restaurants.map((restaurant) => {
              const loc = resolveLocationForDisplay(restaurant, selectedNeighborhood);
              const isSelected =
                selectedRestaurant?.id === restaurant.id &&
                (!selectedRestaurant?.lat || selectedRestaurant.lat === loc.lat);
              const isHovered = hoveredRestaurantId === restaurant.id;
              const isBookmarked = bookmarkedIds.has(restaurant.id);
              const directionsUrl =
                loc.lat && loc.lng
                  ? `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`
                  : getGoogleMapsDirectionsUrl(restaurant);

              return (
                <div
                  key={`${restaurant.id}-${loc.lat}-${loc.lng}`}
                  ref={(el) => {
                    cardRefs.current[restaurant.id] = el;
                  }}
                  onMouseEnter={() => onHoverRestaurant(restaurant.id)}
                  onMouseLeave={() => onHoverRestaurant(null)}
                  onClick={() => onSelectRestaurant(loc.resolvedRestaurant)}
                  className={`shrink-0 snap-center w-[82vw] sm:w-[320px] max-w-[340px] cursor-pointer rounded-2xl border bg-white/95 p-3 shadow-xl backdrop-blur-xl transition-all duration-200 ${
                    isSelected
                      ? 'border-zinc-950 ring-2 ring-zinc-950 scale-102 shadow-2xl'
                      : isHovered
                      ? 'border-zinc-400 -translate-y-1'
                      : 'border-zinc-200/90 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex gap-2.5 sm:gap-3">
                    {/* Thumbnail */}
                    <div className="relative h-18 w-18 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-900">
                      <img
                        src={restaurant.imageUrl}
                        alt={restaurant.name}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80';
                        }}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1 py-0.2 text-[9px] font-semibold text-white backdrop-blur-xs">
                        {restaurant.priceLevel}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <span className="text-[9.5px] font-bold uppercase tracking-wider text-orange-600 truncate">
                            {restaurant.category}
                          </span>
                          <button
                            onClick={(e) => onToggleBookmark(restaurant.id, e)}
                            className={`p-1 rounded-lg transition-colors ${
                              isBookmarked
                                ? 'text-orange-600 bg-orange-50'
                                : 'text-zinc-400 hover:text-zinc-700'
                            }`}
                          >
                            <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-orange-600' : ''}`} />
                          </button>
                        </div>

                        <h3 className="font-bold text-zinc-900 text-sm leading-snug truncate">
                          {restaurant.name}
                        </h3>

                        <p className="text-[10.5px] sm:text-[11px] text-zinc-500 truncate">
                          📍 {loc.branchLabel ? `${loc.branchLabel} (${loc.neighborhood})` : loc.neighborhood} • {restaurant.priceForTwo} for two
                        </p>
                      </div>

                      {/* Must-Try Signature */}
                      <div className="mt-1 flex items-center gap-1 text-[10px] sm:text-[10.5px] font-medium text-zinc-700 truncate">
                        <Sparkles className="h-3 w-3 text-orange-600 shrink-0" />
                        <span className="truncate"><b>Must try:</b> {restaurant.mustTry[0]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-2.5 pt-2 border-t border-zinc-100 flex items-center justify-between text-xs">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDrawer(loc.resolvedRestaurant);
                      }}
                      className="font-bold text-zinc-900 text-[11px] hover:text-orange-600 flex items-center gap-0.5"
                    >
                      <span>View Spot</span>
                      <span>&rarr;</span>
                    </button>
                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-[11px] font-semibold text-orange-600 hover:text-orange-700"
                    >
                      <Navigation className="h-3 w-3" />
                      <span>Directions</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
