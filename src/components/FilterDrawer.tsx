'use client';

import React from 'react';
import {
  Neighborhood,
  PriceLevel,
  VibeTag,
  ALL_NEIGHBORHOODS,
  ALL_VIBE_TAGS,
} from '@/types';
import { X, RotateCcw, Check, CheckCircle } from 'lucide-react';

export type SortOption = 'upvotes' | 'name' | 'price-asc' | 'price-desc';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNeighborhoods: Neighborhood[];
  onToggleNeighborhood: (n: Neighborhood) => void;
  selectedPriceLevels: PriceLevel[];
  onTogglePriceLevel: (p: PriceLevel) => void;
  selectedVibes: VibeTag[];
  onToggleVibe: (v: VibeTag) => void;
  vegOnly: boolean;
  onToggleVegOnly: (veg: boolean) => void;
  sortBy: SortOption;
  onSelectSortBy: (sort: SortOption) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
}

export default function FilterDrawer({
  isOpen,
  onClose,
  selectedNeighborhoods,
  onToggleNeighborhood,
  selectedPriceLevels,
  onTogglePriceLevel,
  selectedVibes,
  onToggleVibe,
  vegOnly,
  onToggleVegOnly,
  sortBy,
  onSelectSortBy,
  onResetFilters,
  totalFilteredCount,
}: FilterDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[3000] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl border-l border-zinc-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 p-5">
          <div>
            <h2 className="text-lg font-bold text-zinc-900">Filters & Sort</h2>
            <p className="text-xs text-zinc-500">
              Narrow down {totalFilteredCount} matching restaurants
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Filters */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Sort By */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Sort By
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: '🔥 Most Upvoted', value: 'upvotes' },
                { label: '🔤 Alphabetical', value: 'name' },
                { label: '💰 Price: Low to High', value: 'price-asc' },
                { label: '💎 Price: High to Low', value: 'price-desc' },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => onSelectSortBy(item.value as SortOption)}
                  className={`rounded-xl border p-2.5 text-xs font-medium text-left transition-all ${
                    sortBy === item.value
                      ? 'border-orange-500 bg-orange-50/80 text-orange-950 font-semibold shadow-xs'
                      : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Vegetarian Only Switch */}
          <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50/50 p-3.5">
            <div>
              <span className="text-xs font-bold text-emerald-950 block">🌱 Pure Vegetarian Only</span>
              <span className="text-[11px] text-emerald-700">Filter places that are 100% veg</span>
            </div>
            <button
              onClick={() => onToggleVegOnly(!vegOnly)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                vegOnly ? 'bg-emerald-600' : 'bg-zinc-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  vegOnly ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Price Level */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Price Range
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['₹', '₹₹', '₹₹₹', '₹₹₹₹'] as PriceLevel[]).map((price) => {
                const isSelected = selectedPriceLevels.includes(price);
                return (
                  <button
                    key={price}
                    onClick={() => onTogglePriceLevel(price)}
                    className={`rounded-xl border py-2 text-center text-xs font-semibold transition-all ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50 text-orange-900 shadow-xs'
                        : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-300'
                    }`}
                  >
                    {price}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Neighborhoods */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Neighborhoods
            </label>
            <div className="flex flex-wrap gap-1.5">
              {ALL_NEIGHBORHOODS.map((area) => {
                const isSelected = selectedNeighborhoods.includes(area);
                return (
                  <button
                    key={area}
                    onClick={() => onToggleNeighborhood(area)}
                    className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-zinc-900 text-white shadow-xs'
                        : 'border border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-100'
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3" />}
                    <span>{area}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Vibe / Atmosphere Tags */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Vibe & Features
            </label>
            <div className="flex flex-wrap gap-1.5">
              {ALL_VIBE_TAGS.map((tag) => {
                const isSelected = selectedVibes.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => onToggleVibe(tag)}
                    className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'border border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-300'
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3" />}
                    <span>{tag}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-200 p-4">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-orange-600 py-3 text-center text-sm font-semibold text-white shadow-md shadow-orange-500/20 hover:bg-orange-700 transition-colors"
          >
            Show {totalFilteredCount} Spots
          </button>
        </div>
      </div>
    </div>
  );
}
