'use client';

import React from 'react';
import { Restaurant } from '@/types';
import { CATEGORY_META } from '@/lib/colors';
import { Heart, MapPin, Sparkles, Navigation, CheckCircle2, ArrowRight } from 'lucide-react';

interface GridViewProps {
  restaurants: Restaurant[];
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onUpvote: (id: string, e: React.MouseEvent) => void;
  userUpvotes: Record<string, boolean>;
  onViewOnMap: (restaurant: Restaurant) => void;
}

export default function GridView({
  restaurants,
  onSelectRestaurant,
  onUpvote,
  userUpvotes,
  onViewOnMap,
}: GridViewProps) {
  if (restaurants.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-3xl">
          🔍
        </div>
        <h3 className="mt-4 text-lg font-semibold text-zinc-900">No restaurants found</h3>
        <p className="mt-1 max-w-sm text-sm text-zinc-500">
          Try clearing some filters or searching for another dish, cuisine, or neighborhood.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 pt-28 pb-16">
      {/* Header Info */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
            Curated Bengaluru Food Directory
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-zinc-500">
            Showing <b className="text-zinc-900">{restaurants.length}</b> handpicked dining institutions, cafes & bars
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {restaurants.map((restaurant) => {
          const meta = CATEGORY_META[restaurant.category] || {
            color: '#f97316',
            icon: '📍',
            badge: 'bg-orange-50 text-orange-800 border-orange-200',
          };

          const isUpvoted = !!userUpvotes[restaurant.id];

          return (
            <div
              key={restaurant.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-zinc-300"
            >
              {/* Image Container */}
              <div
                className="relative h-48 w-full cursor-pointer overflow-hidden bg-zinc-100"
                onClick={() => onSelectRestaurant(restaurant)}
              >
                <img
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Category Badge */}
                <span
                  className={`absolute top-3 left-3 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-md border ${meta.badge}`}
                >
                  <span>{meta.icon}</span>
                  <span>{restaurant.category}</span>
                </span>

                {/* Upvote Button Overlay */}
                <button
                  onClick={(e) => onUpvote(restaurant.id, e)}
                  className={`absolute top-3 right-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-md shadow-xs transition-transform active:scale-90 ${
                    isUpvoted
                      ? 'bg-rose-500 text-white'
                      : 'bg-white/90 text-zinc-700 hover:bg-white'
                  }`}
                >
                  <Heart className={`h-3.5 w-3.5 ${isUpvoted ? 'fill-white' : ''}`} />
                  <span>{restaurant.upvotes}</span>
                </button>

                {/* Bottom Photo Chips */}
                <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-white">
                  <span className="rounded-md bg-black/50 px-2 py-0.5 text-[11px] font-medium backdrop-blur-sm">
                    📍 {restaurant.neighborhood}
                  </span>
                  <span className="rounded-md bg-black/50 px-2 py-0.5 text-[11px] font-medium backdrop-blur-sm">
                    {restaurant.priceLevel} ({restaurant.priceForTwo})
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    onClick={() => onSelectRestaurant(restaurant)}
                    className="cursor-pointer font-bold text-zinc-900 text-base leading-tight hover:text-orange-600 transition-colors flex items-center gap-1.5"
                  >
                    {restaurant.name}
                    {restaurant.verified && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    )}
                  </h3>
                </div>

                <p className="mt-1.5 text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                  {restaurant.tagline}
                </p>

                {/* Must-Order Highlights */}
                <div className="mt-3 flex-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-orange-500" />
                    <span>Must Order</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {restaurant.mustTry.slice(0, 3).map((dish, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700"
                      >
                        {dish}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center gap-2">
                  <button
                    onClick={() => onViewOnMap(restaurant)}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors"
                  >
                    <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                    <span>View on Map</span>
                  </button>
                  <button
                    onClick={() => onSelectRestaurant(restaurant)}
                    className="flex items-center justify-center rounded-xl bg-zinc-900 px-3 py-2 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors shadow-xs"
                    title="Open details"
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
