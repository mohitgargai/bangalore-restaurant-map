'use client';

import React, { useState } from 'react';
import { Restaurant } from '@/types';
import { CATEGORY_META } from '@/lib/colors';
import {
  X,
  MapPin,
  Clock,
  Heart,
  Navigation,
  Share2,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  DollarSign,
  Tag,
  Check,
  User,
} from 'lucide-react';

interface RestaurantDrawerProps {
  restaurant: Restaurant | null;
  onClose: () => void;
  onUpvote: (id: string, e: React.MouseEvent) => void;
  isUpvoted: boolean;
}

export default function RestaurantDrawer({
  restaurant,
  onClose,
  onUpvote,
  isUpvoted,
}: RestaurantDrawerProps) {
  const [copied, setCopied] = useState(false);

  if (!restaurant) return null;

  const meta = CATEGORY_META[restaurant.category] || {
    color: '#f97316',
    icon: '📍',
    badge: 'bg-orange-50 text-orange-800 border-orange-200',
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${restaurant.name} on BLR Food Map`,
        text: `Check out ${restaurant.name} in ${restaurant.neighborhood} — Must try: ${restaurant.mustTry.join(', ')}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-[2000] flex w-full max-w-lg flex-col bg-white shadow-2xl transition-transform duration-300 border-l border-zinc-200/80 overflow-hidden">
      {/* Cover Image Header */}
      <div className="relative h-64 w-full shrink-0 bg-zinc-100">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Top Floating Controls */}
        <div className="absolute inset-x-4 top-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md border ${meta.badge}`}
            >
              <span>{meta.icon}</span>
              <span>{restaurant.category}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-colors"
              title="Share"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Share2 className="h-4 w-4" />}
            </button>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-colors"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Bottom Hero Info */}
        <div className="absolute inset-x-5 bottom-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <span className="rounded-md bg-white/20 px-2 py-0.5 text-xs font-medium backdrop-blur-md">
              📍 {restaurant.neighborhood}
            </span>
            <span className="rounded-md bg-white/20 px-2 py-0.5 text-xs font-medium backdrop-blur-md">
              {restaurant.priceLevel} • {restaurant.priceForTwo} for two
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            {restaurant.name}
            {restaurant.verified && (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 fill-emerald-400/20" />
            )}
          </h2>
        </div>
      </div>

      {/* Content Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Tagline / Overview */}
        <div>
          <p className="text-base text-zinc-700 font-medium leading-relaxed">
            {restaurant.tagline}
          </p>
          <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
            {restaurant.description}
          </p>
        </div>

        {/* Curator Note Box */}
        {restaurant.curatorNote && (
          <div className="rounded-2xl border border-amber-200/80 bg-amber-50/70 p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>Curator Insider Tip</span>
            </div>
            <p className="text-sm text-amber-950 italic leading-relaxed">
              &ldquo;{restaurant.curatorNote}&rdquo;
            </p>
          </div>
        )}

        {/* Must Try Dishes Highlight */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-orange-500" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
              Must-Order Dishes
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {restaurant.mustTry.map((dish, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-800 shadow-xs"
              >
                <span className="text-orange-500 font-bold">•</span>
                <span>{dish}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Vibe & Atmosphere Tags */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Tag className="h-4 w-4 text-zinc-500" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
              Vibe & Features
            </h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {restaurant.vibeTags.map((vibe, i) => (
              <span
                key={i}
                className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700"
              >
                {vibe}
              </span>
            ))}
          </div>
        </div>

        {/* Key Info Details */}
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-4 space-y-3">
          <div className="flex items-start gap-3 text-xs text-zinc-600">
            <MapPin className="h-4 w-4 text-zinc-400 shrink-0 mt-0.5" />
            <span>{restaurant.address}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-zinc-600">
            <Clock className="h-4 w-4 text-zinc-400 shrink-0" />
            <span>{restaurant.timings}</span>
          </div>
          {restaurant.submittedBy && (
            <div className="flex items-center gap-3 text-xs text-zinc-500 pt-2 border-t border-zinc-200/60">
              <User className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
              <span>Recommended by <b className="text-zinc-700">{restaurant.submittedBy}</b></span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="border-t border-zinc-200 bg-white p-4 shrink-0 flex items-center gap-3">
        {/* Upvote Button */}
        <button
          onClick={(e) => onUpvote(restaurant.id, e)}
          className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
            isUpvoted
              ? 'bg-rose-50 text-rose-600 border border-rose-200 font-semibold scale-102'
              : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
          }`}
        >
          <Heart
            className={`h-4 w-4 ${isUpvoted ? 'fill-rose-500 text-rose-500 animate-pulse' : ''}`}
          />
          <span>{restaurant.upvotes}</span>
        </button>

        {/* Google Maps Directions */}
        <a
          href={restaurant.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-orange-600 py-3 text-sm font-semibold text-white shadow-md shadow-orange-500/20 hover:bg-orange-700 transition-all active:scale-[0.98]"
        >
          <Navigation className="h-4 w-4" />
          <span>Get Directions</span>
        </a>
      </div>
    </div>
  );
}
