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
  ChevronDown,
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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[1200] p-3 sm:p-4">
      <div className="pointer-events-auto mx-auto max-w-6xl">
        {/* Single Ultra-Clean Floating Command Capsule */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-full border border-zinc-200/90 bg-white/95 px-3 py-2 shadow-xl shadow-zinc-950/5 backdrop-blur-xl transition-all">
          {/* Brand + Omni-Search */}
          <div className="flex items-center gap-2.5 flex-1 min-w-[240px]">
            {/* Brand Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-950 text-white font-serif font-black text-sm shadow-xs">
                B
              </div>
              <div className="hidden lg:block leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-black uppercase tracking-wider text-zinc-900">
                    BLR // EATS
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Omni-Search Box */}
            <div className="relative flex-1 max-w-xs sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search dish, spot, or craving…"
                className="w-full rounded-full border border-zinc-200/80 bg-zinc-50/80 py-1.5 pl-8 pr-7 text-xs text-zinc-900 placeholder-zinc-400 transition-colors focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
              {searchQuery ? (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-700"
                >
                  <X className="h-3 w-3" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-block absolute right-2 top-1/2 -translate-y-1/2 rounded border border-zinc-200 bg-white px-1 py-0.2 text-[9px] font-semibold text-zinc-400">
                  ⌘K
                </kbd>
              )}
            </div>
          </div>

          {/* Filters & Actions in One Single Row */}
          <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto no-scrollbar">
            {/* Area Dropdown */}
            <div className="relative">
              <select
                value={selectedNeighborhood}
                onChange={(e) => onSelectNeighborhood(e.target.value as any)}
                className="appearance-none rounded-full border border-zinc-200 bg-zinc-50/90 pl-3 pr-7 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 transition-colors focus:outline-none cursor-pointer"
              >
                <option value="All">📍 All Districts</option>
                {ALL_NEIGHBORHOODS.map((n) => (
                  <option key={n} value={n}>
                    📍 {n}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-zinc-400" />
            </div>

            {/* Category Cuisines Dropdown */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => onSelectCategory(e.target.value as any)}
                className="appearance-none rounded-full border border-zinc-200 bg-zinc-50/90 pl-3 pr-7 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 transition-colors focus:outline-none cursor-pointer"
              >
                <option value="All">🍽️ All Cuisines ({totalFilteredCount})</option>
                {ALL_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-zinc-400" />
            </div>

            {/* Veg Switch */}
            <button
              onClick={() => onToggleVegOnly(!vegOnly)}
              className={`flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-semibold transition-all ${
                vegOnly
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs'
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
              <Bookmark className={`h-3 w-3 ${showSavedOnly ? 'fill-white' : ''}`} />
              <span className="hidden sm:inline">Saved</span>
              {savedCount > 0 && <span className="text-[10px] font-bold">({savedCount})</span>}
            </button>

            {/* View Mode Switcher */}
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
                <MapIcon className="h-3 w-3" />
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
                <BookOpen className="h-3 w-3" />
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

            {/* Add Spot Action */}
            <button
              onClick={onOpenSubmitModal}
              className="flex items-center gap-1 rounded-full bg-orange-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-orange-700 transition-all active:scale-95 shrink-0"
            >
              <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">Add Spot</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
