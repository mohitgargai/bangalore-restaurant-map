'use client';

import React from 'react';
import { FoodStory, Restaurant } from '@/types';
import { CURATED_STORIES } from '@/data/stories';
import { X, Sparkles, Compass, ArrowRight, MapPin } from 'lucide-react';

interface FoodStoriesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTrailFilter: (restaurantIds: string[]) => void;
  restaurants: Restaurant[];
}

export default function FoodStoriesDrawer({
  isOpen,
  onClose,
  onApplyTrailFilter,
  restaurants,
}: FoodStoriesDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[3000] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative z-10 flex h-full w-full max-w-lg flex-col bg-white shadow-2xl border-l border-zinc-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-900">Curated Food Trails</h2>
              <p className="text-xs text-zinc-500">Handpicked themed routes by local foodies</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Stories List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {CURATED_STORIES.map((story) => {
            const matchingPlaces = restaurants.filter((r) =>
              story.restaurantIds.includes(r.id)
            );

            return (
              <div
                key={story.id}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xs transition-all hover:border-zinc-300 hover:shadow-md"
              >
                {/* Cover */}
                <div className="relative h-40 w-full overflow-hidden bg-zinc-100">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full bg-black/60 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                    {story.tag}
                  </span>
                  <span className="absolute bottom-2.5 right-3 text-[11px] font-medium text-white/90">
                    {story.readTime}
                  </span>
                </div>

                {/* Body */}
                <div className="p-4">
                  <h3 className="text-base font-bold text-zinc-900 leading-snug">
                    {story.title}
                  </h3>
                  <p className="mt-1 text-xs text-orange-600 font-medium">
                    {story.subtitle}
                  </p>
                  <p className="mt-2 text-xs text-zinc-600 leading-relaxed">
                    {story.summary}
                  </p>

                  {/* Stops Preview */}
                  <div className="mt-3.5 pt-3 border-t border-zinc-100">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                      Trail Stops ({matchingPlaces.length})
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {matchingPlaces.map((place) => (
                        <span
                          key={place.id}
                          className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700"
                        >
                          {place.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Explore Trail Button */}
                  <div className="mt-4 pt-2">
                    <button
                      onClick={() => {
                        onApplyTrailFilter(story.restaurantIds);
                        onClose();
                      }}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-900 py-2.5 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors shadow-xs"
                    >
                      <Compass className="h-4 w-4 text-orange-400" />
                      <span>Explore this Trail on Map</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
