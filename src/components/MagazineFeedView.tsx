'use client';

import React from 'react';
import { Restaurant } from '@/types';
import { getGoogleMapsDirectionsUrl, getGoogleMapsPlaceUrl } from '@/lib/maps';
import {
  Bookmark,
  MapPin,
  Sparkles,
  Navigation,
  Clock,
} from 'lucide-react';

interface MagazineFeedViewProps {
  restaurants: Restaurant[];
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  bookmarkedIds: Set<string>;
  onViewOnMap: (restaurant: Restaurant) => void;
}

export default function MagazineFeedView({
  restaurants,
  onSelectRestaurant,
  onToggleBookmark,
  bookmarkedIds,
  onViewOnMap,
}: MagazineFeedViewProps) {
  if (restaurants.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center p-8 text-center pt-48">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-2xl">
          🔍
        </div>
        <h3 className="mt-4 text-base font-semibold text-zinc-900">No matching culinary spots</h3>
        <p className="mt-1 max-w-sm text-xs text-zinc-500">
          Try clearing some filters or picking another cuisine or neighborhood.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pt-28 pb-20">
      {/* Sub-Header */}
      <div className="mb-8 border-b border-zinc-200 pb-4">
        <h2 className="text-2xl font-serif font-black tracking-tight text-zinc-950 sm:text-3xl">
          The Bengaluru Tastemaker Index
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-zinc-500">
          An authentic, hand-curated digest of {restaurants.length} iconic institutions, craft breweries & dining sanctuaries.
        </p>
      </div>

      {/* Magazine Feed Cards */}
      <div className="space-y-8">
        {restaurants.map((restaurant, idx) => {
          const isBookmarked = bookmarkedIds.has(restaurant.id);
          const directionsUrl = getGoogleMapsDirectionsUrl(restaurant);

          return (
            <article
              key={restaurant.id}
              className="group overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-zinc-300 sm:p-7"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-stretch">
                {/* Photo Gallery Thumbnail */}
                <div
                  className="relative h-56 md:h-auto md:w-80 shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-zinc-950"
                  onClick={() => onSelectRestaurant(restaurant)}
                >
                  <img
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                  {/* Badges */}
                  <span className="absolute top-3.5 left-3.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-zinc-950 backdrop-blur-md shadow-sm">
                    {restaurant.category}
                  </span>

                  <div className="absolute bottom-3 inset-x-3.5 flex items-center justify-between text-white text-xs font-medium">
                    <span className="rounded-md bg-black/60 px-2 py-0.5 backdrop-blur-xs">
                      📍 {restaurant.neighborhood}
                    </span>
                    <span className="rounded-md bg-black/60 px-2 py-0.5 backdrop-blur-xs">
                      {restaurant.priceLevel} ({restaurant.priceForTwo} for two)
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-zinc-400">
                            #{String(idx + 1).padStart(2, '0')}
                          </span>
                          <h3
                            onClick={() => onSelectRestaurant(restaurant)}
                            className="cursor-pointer text-lg sm:text-xl font-bold tracking-tight text-zinc-950 hover:text-orange-600 transition-colors"
                          >
                            {restaurant.name}
                          </h3>
                        </div>
                        <p className="mt-1 text-xs sm:text-sm font-medium text-zinc-600 leading-snug">
                          {restaurant.tagline}
                        </p>
                      </div>

                      {/* Bookmark Toggle */}
                      <button
                        onClick={(e) => onToggleBookmark(restaurant.id, e)}
                        className={`p-2 rounded-xl transition-all ${
                          isBookmarked
                            ? 'bg-orange-50 text-orange-600 border border-orange-200'
                            : 'bg-zinc-50 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100'
                        }`}
                        title={isBookmarked ? 'Remove bookmark' : 'Save place'}
                      >
                        <Bookmark
                          className={`h-4 w-4 ${isBookmarked ? 'fill-orange-600' : ''}`}
                        />
                      </button>
                    </div>

                    {/* Curator Note */}
                    {restaurant.curatorNote && (
                      <div className="mt-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 p-3 text-xs text-amber-950 leading-relaxed italic">
                        <span className="font-semibold uppercase tracking-wider not-italic text-[10px] text-amber-900 block mb-0.5">
                          Curator Insider Tip
                        </span>
                        &ldquo;{restaurant.curatorNote}&rdquo;
                      </div>
                    )}

                    {/* Must-Try Highlights */}
                    <div className="mt-3.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1">
                        <Sparkles className="h-3 w-3 text-orange-500" />
                        <span>Must-Order Dishes</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {restaurant.mustTry.map((dish, i) => (
                          <span
                            key={i}
                            className="rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-semibold text-zinc-800"
                          >
                            {dish}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Links */}
                  <div className="mt-5 pt-3.5 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Clock className="h-3.5 w-3.5 text-zinc-400" />
                      <span>{restaurant.timings}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onViewOnMap(restaurant)}
                        className="flex items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-1.5 font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors"
                      >
                        <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                        <span>Pin on Map</span>
                      </button>

                      <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 rounded-xl bg-zinc-950 px-3.5 py-1.5 font-semibold text-white hover:bg-zinc-800 transition-colors shadow-xs"
                      >
                        <Navigation className="h-3.5 w-3.5" />
                        <span>Get Directions</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
