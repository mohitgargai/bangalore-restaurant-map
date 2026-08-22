'use client';

import React from 'react';
import { Category, Neighborhood, ALL_CATEGORIES, ALL_NEIGHBORHOODS } from '@/types';
import {
  Search,
  Bookmark,
  Plus,
  X,
  Map as MapIcon,
  LayoutGrid,
  BookOpen,
} from 'lucide-react';

export type ViewMode = 'spatial' | 'feed' | 'grid';

interface TopNavCapsuleProps {
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
  viewMode: ViewMode;
  onSelectViewMode: (mode: ViewMode) => void;
  onOpenSubmitModal: () => void;
  totalFilteredCount: number;
}

export default function TopNavCapsule({
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
  viewMode,
  onSelectViewMode,
  onOpenSubmitModal,
  totalFilteredCount,
}: TopNavCapsuleProps) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[1200] p-2.5 sm:p-4">
      <div className="pointer-events-auto mx-auto max-w-6xl">
        {/* Single Unified Floating Capsule Container */}
        <div className="rounded-3xl border border-zinc-200/90 bg-white/95 p-3 shadow-xl shadow-zinc-950/5 backdrop-blur-xl transition-all">
          {/* Top Row: Brand, Search & Actions */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            {/* Brand + Omni-Search */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              {/* Monogram */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-2xl bg-zinc-950 text-white font-serif font-black text-sm sm:text-base shadow-sm">
                  B
                </div>
                <div className="hidden md:block">
                  <div className="flex items-center gap-1.5 leading-none">
                    <span className="font-mono text-xs font-black uppercase tracking-wider text-zinc-900">
                      BLR // EATS
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-[10px] text-zinc-400 font-medium">Curated Index</p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative flex-1 max-w-sm sm:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search dish (Dosa, Coffee, IPA) or spot…"
                  className="w-full rounded-2xl border border-zinc-200/90 bg-zinc-50/80 py-1.5 sm:py-2 pl-9 pr-8 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900"
                />
                {searchQuery ? (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-700"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md border border-zinc-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-zinc-400">
                    ⌘K
                  </kbd>
                )}
              </div>
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between sm:justify-end gap-1.5 shrink-0 overflow-x-auto no-scrollbar pt-1 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
              {/* Area Selector */}
              <select
                value={selectedNeighborhood}
                onChange={(e) => onSelectNeighborhood(e.target.value as any)}
                className="rounded-full border border-zinc-200 bg-zinc-50/90 px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 transition-colors focus:outline-none cursor-pointer"
              >
                <option value="All">All Bangalore</option>
                {ALL_NEIGHBORHOODS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>

              {/* Veg Switch */}
              <button
                onClick={() => onToggleVegOnly(!vegOnly)}
                className={`flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-semibold transition-all ${
                  vegOnly
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                    : 'border border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100'
                }`}
                title="Pure Vegetarian only"
              >
                <span>🌱</span>
                <span className="hidden sm:inline">Veg</span>
              </button>

              {/* Saved Wishlist Toggle */}
              <button
                onClick={() => onToggleSavedOnly(!showSavedOnly)}
                className={`flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-semibold transition-all ${
                  showSavedOnly
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'border border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100'
                }`}
                title="View Bookmarked Places"
              >
                <Bookmark className={`h-3.5 w-3.5 ${showSavedOnly ? 'fill-white' : ''}`} />
                <span className="hidden sm:inline">Saved</span>
                {savedCount > 0 && <span className="text-[10px] font-bold">({savedCount})</span>}
              </button>

              {/* View Switcher */}
              <div className="flex rounded-full border border-zinc-200 bg-zinc-100/90 p-0.5 text-xs">
                <button
                  onClick={() => onSelectViewMode('spatial')}
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold transition-all ${
                    viewMode === 'spatial'
                      ? 'bg-white text-zinc-900 shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                  title="Spatial Map"
                >
                  <MapIcon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Map</span>
                </button>
                <button
                  onClick={() => onSelectViewMode('feed')}
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold transition-all ${
                    viewMode === 'feed'
                      ? 'bg-white text-zinc-900 shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                  title="Editorial Magazine Feed"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Feed</span>
                </button>
                <button
                  onClick={() => onSelectViewMode('grid')}
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white text-zinc-900 shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                  title="Grid Directory"
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
              </div>

              {/* Add Spot */}
              <button
                onClick={onOpenSubmitModal}
                className="flex items-center gap-1 rounded-full bg-orange-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-orange-700 transition-all active:scale-95 shrink-0"
              >
                <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                <span className="hidden sm:inline">Add Spot</span>
              </button>
            </div>
          </div>

          {/* Bottom Row: Integrated Category Chips */}
          <div className="mt-2.5 pt-2 border-t border-zinc-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => onSelectCategory('All')}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                selectedCategory === 'All'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
              }`}
            >
              All Cuisines ({totalFilteredCount})
            </button>

            {ALL_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(active ? 'All' : cat)}
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                    active
                      ? 'bg-zinc-900 text-white shadow-xs'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
