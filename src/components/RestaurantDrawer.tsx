'use client';

import React, { useState, useEffect } from 'react';
import { Restaurant, Branch } from '@/types';
import { getGoogleMapsDirectionsUrl, getGoogleMapsPlaceUrl } from '@/lib/maps';
import { CATEGORY_META } from '@/lib/colors';
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
  initialBranchId?: string | null;
  allRestaurants?: Restaurant[];
  onClose: () => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelectBranch?: (restaurant: Restaurant) => void;
  isBookmarked: boolean;
}

export default function RestaurantDrawer({
  restaurant,
  initialBranchId = null,
  onClose,
  onToggleBookmark,
  onSelectBranch,
  isBookmarked,
}: RestaurantDrawerProps) {
  const [copied, setCopied] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(initialBranchId);
  const [currentSyncKey, setCurrentSyncKey] = useState(`${restaurant?.id}-${initialBranchId}`);

  // Sync state when restaurant ID or initial branch changes
  const targetSyncKey = `${restaurant?.id}-${initialBranchId}`;
  if (targetSyncKey !== currentSyncKey) {
    setCurrentSyncKey(targetSyncKey);
    setSelectedBranchId(initialBranchId);
  }

  const selectedBranch = restaurant?.branches?.find((b) => b.id === selectedBranchId) || null;

  // Keyboard shortcut: Escape key closes the drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!restaurant) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${restaurant.name} on BLR // EATS`,
          text: `Check out ${restaurant.name} in ${restaurant.neighborhood}. Must try: ${restaurant.mustTry.join(', ')}`,
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
    setSelectedBranchId(b ? b.id : null);
    if (onSelectBranch) {
      const activeLat = b ? b.lat : restaurant.lat;
      const activeLng = b ? b.lng : restaurant.lng;
      const activeHood = b ? b.neighborhood : restaurant.neighborhood;
      const activeAddr = b ? b.address : restaurant.address;
      const activeMapsUrl = b ? b.googleMapsUrl : restaurant.googleMapsUrl;

      onSelectBranch({
        ...restaurant,
        neighborhood: activeHood,
        address: activeAddr,
        lat: activeLat,
        lng: activeLng,
        googleMapsUrl: activeMapsUrl,
      });
    }
  };

  const currentAddress = selectedBranch ? selectedBranch.address : restaurant.address;
  const currentNeighborhood = selectedBranch ? selectedBranch.neighborhood : restaurant.neighborhood;
  const currentMapsUrl = selectedBranch
    ? selectedBranch.googleMapsUrl || getGoogleMapsPlaceUrl(restaurant, selectedBranch)
    : restaurant.googleMapsUrl || getGoogleMapsPlaceUrl(restaurant);
  const currentDirectionsUrl = getGoogleMapsDirectionsUrl(restaurant, selectedBranch || undefined);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[1999] bg-[#211C1A]/40 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Adaptive Sheet: Bottom Sheet on Mobile (<sm), Slide-Over Drawer on Desktop (sm+) */}
      <div className="fixed inset-x-0 bottom-0 z-[2000] flex max-h-[88vh] sm:max-h-full sm:inset-y-0 sm:left-auto sm:right-0 w-full sm:max-w-md flex-col rounded-t-3xl sm:rounded-none bg-[#FFFDFB] shadow-2xl transition-transform duration-300 border-t sm:border-t-0 sm:border-l border-[#E6E0D5] overflow-hidden">
        {/* Mobile Drag Indicator */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1 bg-[#211C1A]">
          <div className="h-1 w-10 rounded-full bg-white/40" />
        </div>

        {/* Cover Image Header */}
        <div className="relative h-44 sm:h-56 w-full shrink-0 bg-[#211C1A]">
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85';
            }}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#211C1A]/90 via-[#211C1A]/30 to-transparent" />

          {/* Top Controls */}
          <div className="absolute inset-x-4 top-3 sm:top-4 flex items-center justify-between">
            {(() => {
              const meta = CATEGORY_META[restaurant.category] || {
                badge: 'bg-white/95 text-stone-900 border-stone-200',
              };
              return (
                <span className={`rounded-full px-3 py-1 text-xs font-bold shadow-sm backdrop-blur-md border ${meta.badge}`}>
                  {restaurant.category}
                </span>
              );
            })()}

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                title="Share"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4" />}
              </button>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
            <div className="rounded-2xl border border-[#E6E0D5] bg-[#F7F4EE]/90 p-3">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-2">
                <Building2 className="h-3.5 w-3.5 text-stone-500" />
                <span>Outlets in Bangalore ({restaurant.branches.length + 1})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {/* Active Main Branch */}
                <button
                  onClick={() => handleBranchClick(null)}
                  className={`rounded-xl px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#283629] ${
                    !selectedBranch
                      ? 'bg-[#283629] text-white shadow-xs font-bold'
                      : 'bg-white border border-[#E2DDD2] text-stone-700 hover:bg-[#F0EBE1]'
                  }`}
                >
                  📍 {restaurant.neighborhood}
                </button>
                {/* Other Outlets */}
                {restaurant.branches.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => handleBranchClick(b)}
                    className={`rounded-xl px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#283629] ${
                      selectedBranch?.id === b.id
                        ? 'bg-[#283629] text-white shadow-xs font-bold'
                        : 'bg-white border border-[#E2DDD2] text-stone-700 hover:bg-[#F0EBE1]'
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
            <p className="text-xs sm:text-sm text-[#211C1A] font-medium leading-relaxed">
              {restaurant.tagline}
            </p>
            <p className="mt-1 text-xs text-stone-500 leading-relaxed">
              {restaurant.description}
            </p>
          </div>

          {/* Curator Note Box */}
          {restaurant.curatorNote && (
            <div className="rounded-xl border border-[#F5E5BE] bg-[#FEF8E7] p-3 sm:p-3.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#7A4807] mb-1">
                <Sparkles className="h-3.5 w-3.5 text-[#BC5434]" />
                <span>Curator Note</span>
              </div>
              <p className="text-xs text-[#5C3806] leading-relaxed italic">
                &ldquo;{restaurant.curatorNote}&rdquo;
              </p>
            </div>
          )}

          {/* Must Try Dishes Highlight */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              Must-Order Dishes
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {restaurant.mustTry.map((dish, i) => (
                <span
                  key={i}
                  className="rounded-lg bg-[#F2ECE1] px-2.5 py-1 text-xs font-semibold text-[#332D28]"
                >
                  {dish}
                </span>
              ))}
            </div>
          </div>

          {/* Vibe Tags */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              Atmosphere & Features
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {restaurant.vibeTags.map((vibe, i) => (
                <span
                  key={i}
                  className="rounded-md border border-[#E2DDD2] bg-[#F7F4EE] px-2 py-0.5 text-[11px] font-medium text-stone-600"
                >
                  {vibe}
                </span>
              ))}
            </div>
          </div>

          {/* Address & Timings */}
          <div className="rounded-xl border border-[#E6E0D5] bg-[#F9F6F0]/80 p-3 sm:p-3.5 space-y-2 text-xs text-[#332D28]">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-stone-400 shrink-0 mt-0.5" />
                <span>{currentAddress}</span>
              </div>
              <a
                href={currentMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-semibold text-[#BC5434] hover:text-[#A34326] shrink-0 flex items-center gap-1 cursor-pointer focus-visible:outline-none"
              >
                <span>View Map</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <div className="flex items-center gap-2 text-stone-600">
              <Clock className="h-4 w-4 text-stone-400 shrink-0" />
              <span>{restaurant.timings}</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar (Safe Area Padding) */}
        <div className="border-t border-[#ECE6DA] bg-[#FFFDFB] p-3.5 sm:p-4 shrink-0 flex items-center gap-2.5">
          {/* Bookmark Button */}
          <button
            onClick={(e) => onToggleBookmark(restaurant.id, e)}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 ${
              isBookmarked
                ? 'bg-[#FDF3EE] text-[#BC5434] border border-[#F7D6C6]'
                : 'bg-[#F4EFE6] text-[#4A443F] hover:bg-[#EAE4D9]'
            }`}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-[#BC5434]' : ''}`} />
            <span>{isBookmarked ? 'Saved' : 'Save'}</span>
          </button>

          {/* Get Directions */}
          <a
            href={currentDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#211C1A] py-2.5 text-xs font-semibold text-white hover:bg-[#38312E] transition-all shadow-xs active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
          >
            <Navigation className="h-3.5 w-3.5" />
            <span>Get Directions {selectedBranch ? `(${selectedBranch.neighborhood})` : ''}</span>
          </a>
        </div>
      </div>
    </>
  );
}
