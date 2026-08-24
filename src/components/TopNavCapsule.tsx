'use client';

import React from 'react';
import { Category, Neighborhood, ALL_CATEGORIES } from '@/types';
import {
  Search,
  Bookmark,
  Plus,
  X,
  Map as MapIcon,
  LayoutGrid,
  ChevronDown,
} from 'lucide-react';

export type ViewMode = 'spatial' | 'grid';

export const NEIGHBORHOOD_TILES: { id: Neighborhood | 'All'; label: string }[] = [
  { id: 'All', label: 'All Bangalore' },
  { id: 'Indiranagar', label: 'Indiranagar' },
  { id: 'Church Street & MG Road', label: 'Church St / CBD' },
  { id: 'Malleshwaram', label: 'Malleshwaram' },
  { id: 'Basavanagudi', label: 'Basavanagudi / VV Puram' },
  { id: 'Koramangala', label: 'Koramangala' },
  { id: 'HSR Layout', label: 'HSR Layout' },
  { id: 'JP Nagar', label: 'JP Nagar' },
  { id: 'Jayanagar', label: 'Jayanagar' },
  { id: 'Lavelle Road', label: 'Lavelle Road' },
  { id: 'CBD & Central', label: 'CBD & Central' },
  { id: 'Bellandur & Ecoworld', label: 'Bellandur / Ecoworld' },
  { id: 'Sarjapur Road', label: 'Sarjapur Rd' },
  { id: 'Kalyan Nagar & Kammanahalli', label: 'Kalyan Nagar / CMR' },
  { id: 'Whitefield', label: 'Whitefield' },
  { id: 'Sadashivanagar & Palace Grounds', label: 'Sadashivanagar' },
  { id: 'Bel Road & North BLR', label: 'North BLR' },
];

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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[1200] p-2 sm:p-4">
      <div className="pointer-events-auto mx-auto max-w-6xl">
        {/* Floating Command Island */}
        <div className="rounded-2xl sm:rounded-3xl border border-zinc-200/90 bg-white/95 p-3 shadow-xl shadow-zinc-950/5 backdrop-blur-xl transition-all">
          
          {/* ================= DESKTOP LAYOUT (md+) ================= */}
          <div className="hidden md:flex flex-col gap-3">
            {/* Top Row */}
            <div className="flex items-center justify-between gap-3">
              {/* Brand Logo */}
              <div className="flex items-center gap-2.5 shrink-0">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-sm overflow-hidden border border-zinc-800 shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="white" />
                    <circle cx="12" cy="9" r="3.5" fill="#f59e0b" />
                  </svg>
                </div>
                <div className="leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-black uppercase tracking-wider text-zinc-900">
                      BLR // EATS
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-[10px] text-zinc-400 font-medium">{totalFilteredCount} curated spots</p>
                </div>
              </div>

              {/* Big Search */}
              <div className="relative flex-1 min-w-0 max-w-2xl">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search dish (Crispy Dosa, Pour-over, Craft IPA, Tacos) or spot…"
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50/80 py-2.5 pl-10 pr-9 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 shadow-2xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-700"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1.5 shrink-0">
                {/* Craving Selector */}
                <div className="relative shrink-0">
                  <select
                    value={selectedCategory}
                    onChange={(e) => onSelectCategory(e.target.value as Category | 'All')}
                    className="appearance-none rounded-full border border-zinc-200 bg-zinc-50/90 pl-3 pr-7 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 transition-colors focus:outline-none cursor-pointer shadow-2xs"
                  >
                    <option value="All">✨ All Cravings</option>
                    {ALL_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-zinc-400" />
                </div>

                {/* Pure Veg Switch */}
                <button
                  onClick={() => onToggleVegOnly(!vegOnly)}
                  className={`flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold transition-all shrink-0 ${
                    vegOnly
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs'
                      : 'border border-zinc-200 bg-zinc-50/90 text-zinc-600 hover:bg-zinc-100'
                  }`}
                  title="Pure Vegetarian only"
                >
                  <span>🌱</span>
                  <span>Veg</span>
                </button>

                {/* Saved Wishlist Toggle */}
                <button
                  onClick={() => onToggleSavedOnly(!showSavedOnly)}
                  className={`flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold transition-all shrink-0 ${
                    showSavedOnly
                      ? 'bg-zinc-900 text-white shadow-xs'
                      : 'border border-zinc-200 bg-zinc-50/90 text-zinc-600 hover:bg-zinc-100'
                  }`}
                  title="View Saved Spots"
                >
                  <Bookmark className={`h-3.5 w-3.5 ${showSavedOnly ? 'fill-white' : ''}`} />
                  <span>Saved</span>
                  {savedCount > 0 && <span className="text-[10.5px] font-bold">({savedCount})</span>}
                </button>

                {/* View Switcher */}
                <div className="flex rounded-full border border-zinc-200 bg-zinc-100/90 p-0.5 text-xs shrink-0">
                  <button
                    onClick={() => onSelectViewMode('spatial')}
                    className={`flex items-center gap-1 rounded-full px-3 py-1.5 font-semibold transition-all ${
                      viewMode === 'spatial'
                        ? 'bg-white text-zinc-900 shadow-xs'
                        : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                    title="Spatial Map"
                  >
                    <MapIcon className="h-3.5 w-3.5" />
                    <span>Map</span>
                  </button>
                  <button
                    onClick={() => onSelectViewMode('grid')}
                    className={`flex items-center gap-1 rounded-full px-3 py-1.5 font-semibold transition-all ${
                      viewMode === 'grid'
                        ? 'bg-white text-zinc-900 shadow-xs'
                        : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="h-3.5 w-3.5" />
                    <span>Grid</span>
                  </button>
                </div>

                {/* Add Spot Button */}
                <button
                  onClick={onOpenSubmitModal}
                  className="flex items-center gap-1 rounded-full bg-orange-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-orange-700 transition-all active:scale-95 shrink-0"
                >
                  <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                  <span>Add Spot</span>
                </button>
              </div>
            </div>

            {/* Bottom Row: Neighborhood Tiles */}
            <div className="pt-2 border-t border-zinc-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0 mr-1">
                Hoods:
              </span>
              {NEIGHBORHOOD_TILES.map((hood) => {
                const isSelected = selectedNeighborhood === hood.id;
                return (
                  <button
                    key={hood.id}
                    onClick={() => onSelectNeighborhood(hood.id)}
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-zinc-900 text-white shadow-xs scale-102'
                        : 'bg-zinc-100/90 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                    }`}
                  >
                    {hood.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= MOBILE OPTIMIZED LAYOUT (< md) ================= */}
          <div className="md:hidden flex flex-col gap-2.5">
            {/* Mobile Row 1: Brand & Top Action Bar */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="relative flex h-7 w-7 items-center justify-center rounded-xl bg-zinc-950 text-white shadow-sm overflow-hidden border border-zinc-800 shrink-0">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="white" />
                    <circle cx="12" cy="9" r="3.5" fill="#f59e0b" />
                  </svg>
                </div>
                <span className="font-mono text-xs font-black uppercase tracking-wider text-zinc-900">
                  BLR // EATS
                </span>
              </div>

              {/* Top Quick Actions (Veg, Saved, Map/Grid, Add, Admin) */}
              <div className="flex items-center gap-1 shrink-0">
                {/* Pure Veg Pill */}
                <button
                  onClick={() => onToggleVegOnly(!vegOnly)}
                  className={`flex items-center rounded-full px-2 py-1 text-[11px] font-semibold transition-all ${
                    vegOnly
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs'
                      : 'border border-zinc-200 bg-zinc-50/90 text-zinc-600'
                  }`}
                  title="Pure Veg"
                >
                  <span>🌱</span>
                </button>

                {/* Saved Wishlist Pill */}
                <button
                  onClick={() => onToggleSavedOnly(!showSavedOnly)}
                  className={`flex items-center gap-0.5 rounded-full px-2 py-1 text-[11px] font-semibold transition-all ${
                    showSavedOnly
                      ? 'bg-zinc-900 text-white shadow-xs'
                      : 'border border-zinc-200 bg-zinc-50/90 text-zinc-600'
                  }`}
                  title="Saved Spots"
                >
                  <Bookmark className={`h-3 w-3 ${showSavedOnly ? 'fill-white' : ''}`} />
                  {savedCount > 0 && <span className="text-[10px] font-bold">{savedCount}</span>}
                </button>

                {/* View Switcher */}
                <div className="flex rounded-full border border-zinc-200 bg-zinc-100 p-0.5 text-[11px]">
                  <button
                    onClick={() => onSelectViewMode('spatial')}
                    className={`flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold transition-all ${
                      viewMode === 'spatial' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-500'
                    }`}
                  >
                    <MapIcon className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => onSelectViewMode('grid')}
                    className={`flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold transition-all ${
                      viewMode === 'grid' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-500'
                    }`}
                  >
                    <LayoutGrid className="h-3 w-3" />
                  </button>
                </div>

                {/* Add Spot */}
                <button
                  onClick={onOpenSubmitModal}
                  className="flex items-center gap-0.5 rounded-full bg-orange-600 px-2 py-1 text-[11px] font-semibold text-white shadow-xs hover:bg-orange-700 active:scale-95"
                >
                  <Plus className="h-3 w-3 stroke-[2.5]" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Mobile Row 2: Search Bar & Cravings Selector */}
            <div className="flex items-center gap-1.5">
              {/* Search input */}
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search dish or spot…"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/90 py-1.5 pl-8 pr-7 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-zinc-400"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>

              {/* Craving Filter Chip */}
              <div className="relative shrink-0">
                <select
                  value={selectedCategory}
                  onChange={(e) => onSelectCategory(e.target.value as Category | 'All')}
                  className="appearance-none rounded-xl border border-zinc-200 bg-zinc-50/90 pl-2.5 pr-6 py-1.5 text-xs font-semibold text-zinc-800 focus:outline-none cursor-pointer"
                >
                  <option value="All">✨ Cravings</option>
                  {ALL_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-zinc-400" />
              </div>
            </div>

            {/* Mobile Row 3: DEDICATED NEIGHBORHOODS TILE ROW */}
            <div className="pt-2 border-t border-zinc-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0 mr-0.5">
                Hoods:
              </span>
              {NEIGHBORHOOD_TILES.map((hood) => {
                const isSelected = selectedNeighborhood === hood.id;
                return (
                  <button
                    key={hood.id}
                    onClick={() => onSelectNeighborhood(hood.id)}
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-zinc-900 text-white shadow-xs scale-102 font-bold'
                        : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                    }`}
                  >
                    {hood.label}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
