'use client';

import React, { useState, useEffect } from 'react';
import { Restaurant, Branch } from '@/types';
import { getGoogleMapsDirectionsUrl, getGoogleMapsPlaceUrl } from '@/lib/maps';
import {
  X,
  MapPin,
  Clock,
  Bookmark,
  Navigation,
  Share2,
  Sparkles,
  ExternalLink,
  Check,
  Building2,
} from 'lucide-react';

interface RestaurantDrawerProps {
  restaurant: Restaurant | null;
  allRestaurants?: Restaurant[];
  onClose: () => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelectBranch?: (branchRestaurant: Restaurant) => void;
  isBookmarked: boolean;
}

export default function RestaurantDrawer({
  restaurant,
  allRestaurants = [],
  onClose,
  onToggleBookmark,
  onSelectBranch,
  isBookmarked,
}: RestaurantDrawerProps) {
  const [copied, setCopied] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  // Reset selected branch when restaurant changes
  useEffect(() => {
    setSelectedBranch(null);
  }, [restaurant]);

  if (!restaurant) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${restaurant.name} on BLR // EATS`,
          text: `Check out ${restaurant.name} in ${restaurant.neighborhood} — Must try: ${restaurant.mustTry.join(', ')}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBranchClick = (b: Branch | null) => {
    if (!b) {
      setSelectedBranch(null);
      return;
    }
    setSelectedBranch(b);
    if (onSelectBranch) {
      const match = allRestaurants.find((r) => r.id === b.id);
      if (match) {
        onSelectBranch(match);
      } else {
        onSelectBranch({
          ...restaurant,
          id: b.id,
          name: b.name || `${restaurant.name.split(' (')[0]} (${b.neighborhood})`,
          neighborhood: b.neighborhood,
          address: b.address,
          lat: b.lat,
          lng: b.lng,
          googleMapsUrl: b.googleMapsUrl,
        });
      }
    }
  };

  const currentAddress = selectedBranch ? selectedBranch.address : restaurant.address;
  const currentNeighborhood = selectedBranch ? selectedBranch.neighborhood : restaurant.neighborhood;
  const currentMapsUrl = selectedBranch ? selectedBranch.googleMapsUrl : restaurant.googleMapsUrl || getGoogleMapsPlaceUrl(restaurant);
  const currentDirectionsUrl = selectedBranch
    ? `https://www.google.com/maps/dir/?api=1&destination=${selectedBranch.lat},${selectedBranch.lng}`
    : getGoogleMapsDirectionsUrl(restaurant);

  return (
    <>
      {/* Non-blur subtle backdrop to catch outside clicks without blurring the map */}
      <div
        className="fixed inset-0 z-[1999] bg-black/20 transition-opacity"
        onClick={onClose}
      />

      {/* Adaptive Sheet: Bottom Sheet on Mobile (<sm), Slide-Over Drawer on Desktop (sm+) */}
      <div className="fixed inset-x-0 bottom-0 z-[2000] flex max-h-[88vh] sm:max-h-full sm:inset-y-0 sm:left-auto sm:right-0 w-full sm:max-w-md flex-col rounded-t-3xl sm:rounded-none bg-white shadow-2xl transition-transform duration-300 border-t sm:border-t-0 sm:border-l border-zinc-200 overflow-hidden">
        {/* Mobile Drag Indicator */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1 bg-zinc-950">
          <div className="h-1 w-10 rounded-full bg-white/40" />
        </div>

        {/* Cover Image Header */}
        <div className="relative h-44 sm:h-56 w-full shrink-0 bg-zinc-950">
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

          {/* Top Controls */}
          <div className="absolute inset-x-4 top-3 sm:top-4 flex items-center justify-between">
            <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-zinc-900 shadow-sm backdrop-blur-md">
              {restaurant.category}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80 transition-colors"
                title="Share"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4" />}
              </button>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80 transition-colors"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Bottom Hero Info */}
          <div className="absolute inset-x-4 bottom-3 sm:bottom-4 text-white">
            <div className="flex items-center gap-1.5 mb-1 text-xs font-medium text-white/90">
              <span>📍 {currentNeighborhood}</span>
              <span>•</span>
              <span>{restaurant.priceLevel} ({restaurant.priceForTwo} for two)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {restaurant.name}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 sm:space-y-5">
          {/* Multi-Branch Outlets Selector (Synchronized with Map) */}
          {restaurant.branches && restaurant.branches.length > 0 && (
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/90 p-3">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-600 mb-2">
                <Building2 className="h-3.5 w-3.5 text-zinc-500" />
                <span>Outlets in Bangalore ({restaurant.branches.length + 1})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {/* Active Main Branch */}
                <button
                  onClick={() => handleBranchClick(null)}
                  className={`rounded-xl px-2.5 py-1 text-xs font-semibold transition-all ${
                    !selectedBranch
                      ? 'bg-zinc-900 text-white shadow-xs'
                      : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  📍 {restaurant.neighborhood}
                </button>
                {/* Other Outlets */}
                {restaurant.branches.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => handleBranchClick(b)}
                    className={`rounded-xl px-2.5 py-1 text-xs font-semibold transition-all ${
                      selectedBranch?.id === b.id
                        ? 'bg-zinc-900 text-white shadow-xs'
                        : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    📍 {b.name || b.neighborhood}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <p className="text-xs sm:text-sm text-zinc-700 font-medium leading-relaxed">
              {restaurant.tagline}
            </p>
            <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
              {restaurant.description}
            </p>
          </div>

          {/* Curator Note Box */}
          {restaurant.curatorNote && (
            <div className="rounded-xl border border-amber-200/80 bg-amber-50/70 p-3 sm:p-3.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-1">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                <span>Curator Note</span>
              </div>
              <p className="text-xs text-amber-950 leading-relaxed italic">
                &ldquo;{restaurant.curatorNote}&rdquo;
              </p>
            </div>
          )}

          {/* Must Try Dishes Highlight */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Must-Order Dishes
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {restaurant.mustTry.map((dish, i) => (
                <span
                  key={i}
                  className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-800"
                >
                  {dish}
                </span>
              ))}
            </div>
          </div>

          {/* Vibe Tags */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Atmosphere & Features
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {restaurant.vibeTags.map((vibe, i) => (
                <span
                  key={i}
                  className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] font-medium text-zinc-600"
                >
                  {vibe}
                </span>
              ))}
            </div>
          </div>

          {/* Address & Timings */}
          <div className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-3 sm:p-3.5 space-y-2 text-xs text-zinc-700">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-zinc-400 shrink-0 mt-0.5" />
                <span>{currentAddress}</span>
              </div>
              <a
                href={currentMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-orange-600 hover:text-orange-700 shrink-0 flex items-center gap-1"
              >
                <span>View Map</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <div className="flex items-center gap-2 text-zinc-600">
              <Clock className="h-4 w-4 text-zinc-400 shrink-0" />
              <span>{restaurant.timings}</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar (Safe Area Padding) */}
        <div className="border-t border-zinc-200 bg-white p-3.5 sm:p-4 shrink-0 flex items-center gap-2.5">
          {/* Bookmark Button */}
          <button
            onClick={(e) => onToggleBookmark(restaurant.id, e)}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
              isBookmarked
                ? 'bg-orange-50 text-orange-700 border border-orange-200'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-orange-600' : ''}`} />
            <span>{isBookmarked ? 'Saved' : 'Save'}</span>
          </button>

          {/* Get Directions */}
          <a
            href={currentDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-zinc-950 py-2.5 text-xs font-semibold text-white hover:bg-zinc-800 transition-all shadow-xs active:scale-[0.98]"
          >
            <Navigation className="h-3.5 w-3.5" />
            <span>Get Directions {selectedBranch ? `(${selectedBranch.neighborhood})` : ''}</span>
          </a>
        </div>
      </div>
    </>
  );
}
