'use client';

import React from 'react';
import { Restaurant, Neighborhood } from '@/types';
import { resolveLocationForDisplay } from '@/lib/maps';
import { Bookmark, MapPin, Sparkles, ArrowRight } from 'lucide-react';

interface GridViewProps {
  restaurants: Restaurant[];
  selectedNeighborhood?: Neighborhood | 'All';
  onSelectRestaurant: (restaurant: Restaurant, initialBranchId?: string | null) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  bookmarkedIds: Set<string>;
  onViewOnMap: (restaurant: Restaurant) => void;
}

export default function GridView({
  restaurants,
  selectedNeighborhood,
  onSelectRestaurant,
  onToggleBookmark,
  bookmarkedIds,
  onViewOnMap,
}: GridViewProps) {
  if (restaurants.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center p-8 text-center pt-48">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-2xl">
          🔍
        </div>
        <h3 className="mt-4 text-base font-semibold text-zinc-900">No restaurants found</h3>
        <p className="mt-1 max-w-sm text-xs text-zinc-500">
          Try clearing some filters or searching for another dish or neighborhood.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 pt-28 pb-20">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {restaurants.map((restaurant) => {
          const loc = resolveLocationForDisplay(restaurant, selectedNeighborhood);
          const isBookmarked = bookmarkedIds.has(restaurant.id);

          return (
            <div
              key={`${restaurant.id}-${loc.lat}-${loc.lng}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-2xs transition-all duration-200 hover:shadow-md hover:border-zinc-300"
            >
              {/* Image Container */}
              <div
                className="relative h-44 w-full cursor-pointer overflow-hidden bg-zinc-950"
                onClick={() => onSelectRestaurant(loc.parentRestaurant, loc.branchId)}
              >
                <img
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Category Badge */}
                <span className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[10.5px] font-semibold text-zinc-900 shadow-xs backdrop-blur-md">
                  {restaurant.category}
                </span>

                {/* Bookmark Button Overlay */}
                <button
                  onClick={(e) => onToggleBookmark(restaurant.id, e)}
                  className={`absolute top-3 right-3 flex items-center justify-center rounded-full p-2 text-xs font-semibold backdrop-blur-md shadow-xs transition-transform active:scale-90 cursor-pointer ${
                    isBookmarked
                      ? 'bg-orange-600 text-white'
                      : 'bg-white/90 text-zinc-700 hover:bg-white'
                  }`}
                  title={isBookmarked ? 'Remove bookmark' : 'Save place'}
                >
                  <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-white' : ''}`} />
                </button>

                {/* Bottom Photo Chips */}
                <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-white text-[11px] font-medium">
                  <span className="rounded-md bg-black/60 px-2 py-0.5 backdrop-blur-xs">
                    📍 {loc.branchLabel ? `${loc.branchLabel} (${loc.neighborhood})` : loc.neighborhood}
                  </span>
                  <span className="rounded-md bg-black/60 px-2 py-0.5 backdrop-blur-xs">
                    {restaurant.priceLevel} ({restaurant.priceForTwo})
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-4">
                <h3
                  onClick={() => onSelectRestaurant(loc.parentRestaurant, loc.branchId)}
                  className="cursor-pointer font-bold text-zinc-900 text-base leading-tight hover:text-orange-600 transition-colors truncate"
                >
                  {restaurant.name}
                </h3>

                <p className="mt-1 text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                  {restaurant.tagline}
                </p>

                {/* Must-Order Highlights */}
                <div className="mt-3 flex-1">
                  <div className="flex items-center gap-1 text-[11px] font-medium text-zinc-700">
                    <Sparkles className="h-3 w-3 text-orange-600 shrink-0" />
                    <span className="truncate"><b>Must try:</b> {restaurant.mustTry[0]}</span>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center gap-2">
                  <button
                    onClick={() => onViewOnMap(loc.resolvedRestaurant)}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900"
                  >
                    <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                    <span>View on Map</span>
                  </button>
                  <button
                    onClick={() => onSelectRestaurant(loc.parentRestaurant, loc.branchId)}
                    className="flex items-center justify-center rounded-xl bg-zinc-900 px-3 py-2 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors shadow-2xs cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
