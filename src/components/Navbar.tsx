'use client';

import React from 'react';
import { Category, ALL_CATEGORIES } from '@/types';
import { CATEGORY_META } from '@/lib/colors';
import {
  Search,
  Map as MapIcon,
  LayoutGrid,
  SlidersHorizontal,
  Plus,
  Compass,
  X,
  Sparkles,
  Inbox,
} from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: Category | 'All';
  onSelectCategory: (cat: Category | 'All') => void;
  viewMode: 'map' | 'grid';
  onToggleView: (mode: 'map' | 'grid') => void;
  onOpenSubmitModal: () => void;
  onOpenFilterDrawer: () => void;
  onOpenStoriesDrawer: () => void;
  onOpenSubmissionsDrawer: () => void;
  activeFilterCount: number;
  totalResults: number;
  pendingSubmissionsCount: number;
}

export default function Navbar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  viewMode,
  onToggleView,
  onOpenSubmitModal,
  onOpenFilterDrawer,
  onOpenStoriesDrawer,
  onOpenSubmissionsDrawer,
  activeFilterCount,
  totalResults,
  pendingSubmissionsCount,
}: NavbarProps) {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-[1000] p-3 sm:p-4">
      <div className="pointer-events-auto mx-auto max-w-[1440px] rounded-2xl border border-zinc-200/80 bg-white/90 p-2.5 shadow-lg backdrop-blur-md transition-all">
        {/* Main Row */}
        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: Brand + Search */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Brand */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-600 text-white shadow-sm shadow-orange-500/30">
                <span className="text-lg">🥘</span>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-zinc-900 tracking-tight text-sm sm:text-base">
                    BLR Eats Map
                  </span>
                  <span className="rounded-md bg-orange-100 px-1.5 py-0.5 text-[10px] font-semibold text-orange-800 uppercase tracking-wider">
                    Curated
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 hidden md:block">
                  Curated & crowd-sourced dining gems
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search dish (e.g. Dosa, IPA, Tacos), spot, or area…"
                className="w-full rounded-full border border-zinc-200 bg-zinc-50/80 py-2 pl-9 pr-8 text-xs sm:text-sm text-zinc-800 placeholder-zinc-400 transition-colors focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-700"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right: View Toggle, Filters, Stories, Submissions & Add CTA */}
          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
            {/* Curated Guides / Trails Button */}
            <button
              onClick={onOpenStoriesDrawer}
              className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-xs hover:border-zinc-300 hover:bg-zinc-50 transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5 text-orange-500" />
              <span className="hidden sm:inline">Food Trails</span>
            </button>

            {/* Filter Toggle Button */}
            <button
              onClick={onOpenFilterDrawer}
              className={`relative flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                activeFilterCount > 0
                  ? 'border-orange-500 bg-orange-50 text-orange-950 font-semibold'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* View Switcher: Map vs Grid */}
            <div className="flex rounded-full border border-zinc-200 bg-zinc-100/80 p-0.5 text-xs">
              <button
                onClick={() => onToggleView('map')}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-medium transition-all ${
                  viewMode === 'map'
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <MapIcon className="h-3.5 w-3.5" />
                <span>Map</span>
              </button>
              <button
                onClick={() => onToggleView('grid')}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Grid</span>
              </button>
            </div>

            {/* Community Drops / Submissions */}
            {pendingSubmissionsCount > 0 && (
              <button
                onClick={onOpenSubmissionsDrawer}
                className="relative flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-xs font-medium text-amber-800 shadow-xs hover:bg-amber-100 transition-colors"
                title="Community Submissions"
              >
                <Inbox className="h-3.5 w-3.5 text-amber-600" />
                <span>{pendingSubmissionsCount}</span>
              </button>
            )}

            {/* Primary Action: Recommend / Submit Spot */}
            <button
              onClick={onOpenSubmitModal}
              className="flex items-center gap-1.5 rounded-full bg-orange-600 px-3.5 py-1.5 text-xs font-medium text-white shadow-md shadow-orange-500/20 hover:bg-orange-700 transition-all active:scale-95 shrink-0"
            >
              <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Recommend Spot</span>
            </button>
          </div>
        </div>

        {/* Category Horizontal Quick Filters */}
        <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 no-scrollbar scroll-smooth">
          <button
            onClick={() => onSelectCategory('All')}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all ${
              selectedCategory === 'All'
                ? 'bg-zinc-900 text-white shadow-xs'
                : 'border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50'
            }`}
          >
            All Spots ({totalResults})
          </button>

          {ALL_CATEGORIES.map((cat) => {
            const meta = CATEGORY_META[cat];
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(isSelected ? 'All' : cat)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50'
                }`}
              >
                <span>{meta.icon}</span>
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
