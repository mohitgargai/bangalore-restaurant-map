'use client';

import React from 'react';
import {
  Restaurant,
  Category,
  Neighborhood,
  ALL_CATEGORIES,
  ALL_NEIGHBORHOODS,
} from '@/types';
import {
  Search,
  Bookmark,
  Plus,
  X,
  RotateCcw,
  Sparkles,
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
  selectedNeighborhood: Neighborhood | 'All';
  onSelectNeighborhood: (n: Neighborhood | 'All') => void;
  vegOnly: boolean;
  onToggleVegOnly: (v: boolean) => void;
  showSavedOnly: boolean;
  onToggleSavedOnly: (s: boolean) => void;
  savedCount: number;
  onOpenSubmitModal: () => void;
  onResetFilters: () => void;
  activeFilterCount: number;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  bookmarkedIds: Set<string>;
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
  selectedNeighborhood,
  onSelectNeighborhood,
  vegOnly,
  onToggleVegOnly,
  showSavedOnly,
  onToggleSavedOnly,
  savedCount,
  onOpenSubmitModal,
  onResetFilters,
  activeFilterCount,
  onToggleBookmark,
  bookmarkedIds,
}: EditorialDeckProps) {
  return (
    <aside className="flex h-full w-full flex-col bg-white border-r border-zinc-200 select-none">
      {/* Clean Modern Header */}
      <div className="shrink-0 border-b border-zinc-100 p-5 bg-white space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-zinc-900">
              BLR // EATS
            </h1>
            <p className="text-xs text-zinc-500">Curated & authentic city index</p>
          </div>

          <div className="flex items-center gap-2">
            {/* Saved Tab Toggle */}
            <button
              onClick={() => onToggleSavedOnly(!showSavedOnly)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                showSavedOnly
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              <Bookmark
                className={`h-3.5 w-3.5 ${showSavedOnly ? 'fill-white' : ''}`}
              />
              <span>Saved {savedCount > 0 ? `(${savedCount})` : ''}</span>
            </button>

            {/* Submit Spot */}
            <button
              onClick={onOpenSubmitModal}
              className="flex items-center gap-1 rounded-full bg-orange-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-orange-700 transition-all"
            >
              <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Add Spot</span>
            </button>
          </div>
        </div>

        {/* Clean Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search dish (Dosa, Coffee, Tacos), spot, or area…"
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50/70 py-2 pl-9 pr-8 text-xs text-zinc-900 placeholder-zinc-400 transition-colors focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => onSelectCategory('All')}
            className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
              selectedCategory === 'All'
                ? 'bg-zinc-900 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
            }`}
          >
            All Cuisines
          </button>
          {ALL_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(active ? 'All' : cat)}
                className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                  active
                    ? 'bg-zinc-900 text-white'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Neighborhood Selector & Veg Switch */}
        <div className="flex items-center justify-between pt-1 border-t border-zinc-100">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-zinc-400 font-medium">Area:</span>
            <select
              value={selectedNeighborhood}
              onChange={(e) => onSelectNeighborhood(e.target.value as any)}
              className="rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-800 focus:outline-none focus:border-zinc-900 cursor-pointer"
            >
              <option value="All">All Bangalore</option>
              {ALL_NEIGHBORHOODS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => onToggleVegOnly(!vegOnly)}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              vegOnly
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-semibold'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <span>🌱 Pure Veg</span>
          </button>
        </div>
      </div>

      {/* Sub-Header Result Status */}
      <div className="flex items-center justify-between px-5 py-2 bg-zinc-50 border-b border-zinc-100 text-xs text-zinc-500">
        <span>
          Showing <b className="text-zinc-900">{restaurants.length}</b> spots
          {selectedNeighborhood !== 'All' ? ` in ${selectedNeighborhood}` : ''}
        </span>
        {activeFilterCount > 0 && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-[11px] font-medium text-orange-600 hover:text-orange-700"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Clear filters</span>
          </button>
        )}
      </div>

      {/* Clean Restaurant List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {restaurants.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <div className="h-12 w-12 rounded-2xl bg-zinc-100 flex items-center justify-center text-xl mb-3">
              🔍
            </div>
            <h3 className="text-sm font-semibold text-zinc-900">No restaurants found</h3>
            <p className="mt-1 text-xs text-zinc-500 max-w-xs">
              {showSavedOnly
                ? 'You have not saved any places yet. Click the bookmark icon on any card to save it!'
                : 'Try picking another neighborhood or clearing your filters.'}
            </p>
            {activeFilterCount > 0 && (
              <button
                onClick={onResetFilters}
                className="mt-3 rounded-xl bg-zinc-900 px-3.5 py-1.5 text-xs font-semibold text-white"
              >
                Reset filters
              </button>
            )}
          </div>
        ) : (
          restaurants.map((restaurant) => {
            const isSelected = selectedRestaurant?.id === restaurant.id;
            const isHovered = hoveredRestaurantId === restaurant.id;
            const isBookmarked = bookmarkedIds.has(restaurant.id);

            return (
              <div
                key={restaurant.id}
                onMouseEnter={() => onHoverRestaurant(restaurant.id)}
                onMouseLeave={() => onHoverRestaurant(null)}
                onClick={() => onSelectRestaurant(restaurant)}
                className={`group cursor-pointer rounded-2xl border bg-white p-3 transition-all duration-200 ${
                  isSelected
                    ? 'border-zinc-900 shadow-md ring-1 ring-zinc-900'
                    : isHovered
                    ? 'border-zinc-300 shadow-sm'
                    : 'border-zinc-200/80 shadow-2xs hover:border-zinc-300'
                }`}
              >
                <div className="flex gap-3.5">
                  {/* Photo Thumbnail */}
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                    <img
                      src={restaurant.imageUrl}
                      alt={restaurant.name}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1 py-0.2 text-[9px] font-semibold text-white backdrop-blur-xs">
                      {restaurant.priceLevel}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h3 className="font-bold text-zinc-900 text-sm leading-snug group-hover:text-orange-600 transition-colors truncate">
                          {restaurant.name}
                        </h3>

                        {/* Bookmark Button */}
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
                            className={`h-4 w-4 ${isBookmarked ? 'fill-orange-600' : ''}`}
                          />
                        </button>
                      </div>

                      <p className="text-[11px] text-zinc-500 flex items-center gap-1 mt-0.5 truncate">
                        <span>{restaurant.neighborhood}</span>
                        <span className="text-zinc-300">•</span>
                        <span>{restaurant.category}</span>
                        <span className="text-zinc-300">•</span>
                        <span>{restaurant.priceForTwo} for two</span>
                      </p>
                    </div>

                    {/* Must-Try Signature */}
                    <div className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-zinc-700 truncate">
                      <Sparkles className="h-3 w-3 text-orange-600 shrink-0" />
                      <span className="truncate"><b>Must try:</b> {restaurant.mustTry[0]}</span>
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
