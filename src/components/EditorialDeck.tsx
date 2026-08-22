'use client';

import React from 'react';
import {
  Restaurant,
  Category,
  Neighborhood,
  PriceLevel,
  ALL_CATEGORIES,
  ALL_NEIGHBORHOODS,
} from '@/types';
import { CATEGORY_META } from '@/lib/colors';
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  Heart,
  MapPin,
  CheckCircle2,
  Plus,
  Compass,
  ArrowUpRight,
  X,
  RotateCcw,
  Flame,
} from 'lucide-react';

interface EditorialDeckProps {
  restaurants: Restaurant[];
  totalUnfilteredCount: number;
  selectedRestaurant: Restaurant | null;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  hoveredRestaurantId: string | null;
  onHoverRestaurant: (id: string | null) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: Category | 'All';
  onSelectCategory: (cat: Category | 'All') => void;
  selectedNeighborhoods: Neighborhood[];
  onSelectNeighborhood: (n: Neighborhood | 'All') => void;
  vegOnly: boolean;
  onToggleVegOnly: (v: boolean) => void;
  sortBy: string;
  onSelectSortBy: (s: any) => void;
  onOpenSubmitModal: () => void;
  onOpenStoriesDrawer: () => void;
  onOpenFilterDrawer: () => void;
  onResetFilters: () => void;
  activeFilterCount: number;
  onUpvote: (id: string, e: React.MouseEvent) => void;
  userUpvotes: Record<string, boolean>;
}

export default function EditorialDeck({
  restaurants,
  totalUnfilteredCount,
  selectedRestaurant,
  onSelectRestaurant,
  hoveredRestaurantId,
  onHoverRestaurant,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  selectedNeighborhoods,
  onSelectNeighborhood,
  vegOnly,
  onToggleVegOnly,
  sortBy,
  onSelectSortBy,
  onOpenSubmitModal,
  onOpenStoriesDrawer,
  onOpenFilterDrawer,
  onResetFilters,
  activeFilterCount,
  onUpvote,
  userUpvotes,
}: EditorialDeckProps) {
  const currentNeighborhood =
    selectedNeighborhoods.length === 1 ? selectedNeighborhoods[0] : 'All';

  return (
    <aside className="flex h-full w-full flex-col bg-white border-r border-zinc-200/80 select-none">
      {/* Brand Header */}
      <div className="shrink-0 border-b border-zinc-100 p-5 sm:p-6 bg-white/80 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-950 text-white font-serif font-black text-lg shadow-sm">
              B
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black tracking-tight text-zinc-950 uppercase font-mono">
                  TABLE // BLR
                </h1>
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-600 border border-zinc-200">
                  2026 INDEX
                </span>
              </div>
              <p className="text-xs text-zinc-500 font-medium">
                The Curated Index of Bengaluru Dining
              </p>
            </div>
          </div>

          <button
            onClick={onOpenSubmitModal}
            className="flex items-center gap-1.5 rounded-xl bg-zinc-950 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 transition-all active:scale-95"
          >
            <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
            <span>Submit Spot</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mt-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search dish (Dosa, IPA, Tacos), spot, or area…"
            className="w-full rounded-xl border border-zinc-200/90 bg-zinc-50/80 py-2.5 pl-10 pr-9 text-xs text-zinc-900 placeholder-zinc-400 transition-colors focus:border-zinc-950 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-950"
          />
          {searchQuery ? (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : (
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-zinc-400 shadow-2xs">
              /
            </kbd>
          )}
        </div>

        {/* Quick Category / Mood Scroller */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 pb-1">
          <button
            onClick={() => onSelectCategory('All')}
            className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
              selectedCategory === 'All'
                ? 'bg-zinc-950 text-white shadow-xs'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
            }`}
          >
            All Categories ({totalUnfilteredCount})
          </button>
          {ALL_CATEGORIES.map((cat) => {
            const meta = CATEGORY_META[cat];
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(active ? 'All' : cat)}
                className={`flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                  active
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                }`}
              >
                <span>{meta.icon}</span>
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary District Filter Chips */}
        <div className="mt-2 flex items-center justify-between pt-2 border-t border-zinc-100 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-1 mr-2">
            {['All', 'Indiranagar', 'Church Street & MG Road', 'Malleshwaram', 'Basavanagudi', 'Koramangala'].map(
              (area) => {
                const isSelected =
                  area === 'All'
                    ? selectedNeighborhoods.length === 0
                    : selectedNeighborhoods.includes(area as Neighborhood);

                return (
                  <button
                    key={area}
                    onClick={() => onSelectNeighborhood(area as any)}
                    className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-medium transition-colors ${
                      isSelected
                        ? 'bg-orange-50 text-orange-950 font-bold border border-orange-200'
                        : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                    }`}
                  >
                    {area === 'Church Street & MG Road' ? 'Church St' : area}
                  </button>
                );
              }
            )}
          </div>

          <button
            onClick={onOpenFilterDrawer}
            className={`flex items-center gap-1 shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-semibold border transition-colors ${
              activeFilterCount > 0
                ? 'border-orange-500 bg-orange-50 text-orange-950'
                : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
            }`}
          >
            <SlidersHorizontal className="h-3 w-3" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-orange-600 text-[9px] text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Feed Sub-Header Info */}
      <div className="flex items-center justify-between px-5 py-2.5 bg-zinc-50/80 border-b border-zinc-100 text-xs text-zinc-500">
        <span>
          Showing <b className="text-zinc-900">{restaurants.length}</b> verified spots
        </span>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 text-[11px] font-medium text-orange-600 hover:text-orange-700"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          )}
          <button
            onClick={onOpenStoriesDrawer}
            className="flex items-center gap-1 text-[11px] font-bold text-zinc-900 hover:text-orange-600"
          >
            <Sparkles className="h-3 w-3 text-orange-500" />
            <span>Trails</span>
          </button>
        </div>
      </div>

      {/* Editorial Cards Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {restaurants.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <div className="h-12 w-12 rounded-2xl bg-zinc-100 flex items-center justify-center text-xl mb-3">
              🍽️
            </div>
            <h3 className="text-sm font-bold text-zinc-900">No restaurants found</h3>
            <p className="mt-1 text-xs text-zinc-500 max-w-xs">
              No matching dining spots in this view. Try adjusting search or clearing filters.
            </p>
            <button
              onClick={onResetFilters}
              className="mt-4 rounded-xl bg-zinc-950 px-4 py-2 text-xs font-semibold text-white"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          restaurants.map((restaurant) => {
            const meta = CATEGORY_META[restaurant.category] || {
              color: '#f97316',
              icon: '📍',
              badge: 'bg-orange-50 text-orange-800 border-orange-200',
            };
            const isSelected = selectedRestaurant?.id === restaurant.id;
            const isHovered = hoveredRestaurantId === restaurant.id;
            const isUpvoted = !!userUpvotes[restaurant.id];

            return (
              <div
                key={restaurant.id}
                onMouseEnter={() => onHoverRestaurant(restaurant.id)}
                onMouseLeave={() => onHoverRestaurant(null)}
                onClick={() => onSelectRestaurant(restaurant)}
                className={`group cursor-pointer overflow-hidden rounded-2xl border bg-white p-3 transition-all duration-200 ${
                  isSelected
                    ? 'border-zinc-950 ring-2 ring-zinc-950/10 shadow-lg'
                    : isHovered
                    ? 'border-zinc-300 shadow-md translate-x-1'
                    : 'border-zinc-200/80 shadow-2xs hover:border-zinc-300 hover:shadow-sm'
                }`}
              >
                <div className="flex gap-3.5">
                  {/* Photo Thumbnail */}
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                    <img
                      src={restaurant.imageUrl}
                      alt={restaurant.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute bottom-1.5 left-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[9.5px] font-bold text-white backdrop-blur-xs">
                      {restaurant.priceLevel}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 truncate">
                          {restaurant.category}
                        </span>
                        <button
                          onClick={(e) => onUpvote(restaurant.id, e)}
                          className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold transition-transform active:scale-90 ${
                            isUpvoted
                              ? 'bg-rose-50 text-rose-600 border border-rose-200'
                              : 'bg-zinc-50 text-zinc-500 hover:bg-zinc-100'
                          }`}
                        >
                          <Heart
                            className={`h-3 w-3 ${
                              isUpvoted ? 'fill-rose-500 text-rose-500' : ''
                            }`}
                          />
                          <span>{restaurant.upvotes}</span>
                        </button>
                      </div>

                      <h3 className="font-bold text-zinc-950 text-sm leading-snug group-hover:text-orange-600 transition-colors flex items-center gap-1 truncate">
                        <span>{restaurant.name}</span>
                        {restaurant.verified && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        )}
                      </h3>

                      <p className="text-[11px] text-zinc-500 flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="h-3 w-3 text-zinc-400 shrink-0" />
                        <span>{restaurant.neighborhood}</span>
                        <span className="text-zinc-300">•</span>
                        <span>{restaurant.priceForTwo} for two</span>
                      </p>
                    </div>

                    {/* Must-Try Signature Highlight */}
                    <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-orange-50/70 px-2 py-1 text-[11px] font-medium text-orange-950 border border-orange-200/50 truncate">
                      <Sparkles className="h-3 w-3 text-orange-600 shrink-0" />
                      <span className="truncate"><b>Signature:</b> {restaurant.mustTry[0]}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
}
