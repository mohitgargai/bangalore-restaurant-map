'use client';

import React, { useState } from 'react';
import {
  Category,
  Neighborhood,
  PriceLevel,
  VibeTag,
  ALL_CATEGORIES,
  ALL_NEIGHBORHOODS,
  ALL_VIBE_TAGS,
  SubmissionForm,
  Restaurant,
} from '@/types';
import { CATEGORY_META } from '@/lib/colors';
import { X, Sparkles, Plus, Check, Loader2, MapPin, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const NEIGHBORHOOD_COORDS: Record<Neighborhood, { lat: number; lng: number }> = {
  'Indiranagar': { lat: 12.9719, lng: 77.6412 },
  'Koramangala': { lat: 12.9352, lng: 77.6245 },
  'Church Street & MG Road': { lat: 12.9749, lng: 77.6094 },
  'Lavelle Road': { lat: 12.9702, lng: 77.5985 },
  'Malleshwaram': { lat: 13.0039, lng: 77.5701 },
  'Basavanagudi': { lat: 12.9452, lng: 77.5739 },
  'HSR Layout': { lat: 12.9121, lng: 77.6446 },
  'Whitefield': { lat: 12.9698, lng: 77.7499 },
  'JP Nagar': { lat: 12.9063, lng: 77.5857 },
  'Jayanagar': { lat: 12.9308, lng: 77.5838 },
  'CBD & Central': { lat: 12.9716, lng: 77.5946 },
  'Sadashivanagar & Palace Grounds': { lat: 13.0068, lng: 77.5813 },
  'Sarjapur Road': { lat: 12.9226, lng: 77.6775 },
  'Bel Road & North BLR': { lat: 13.0315, lng: 77.5645 },
};

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newRestaurant: Restaurant) => void;
}

export default function SubmitModal({ isOpen, onClose, onSuccess }: SubmitModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Iconic Heritage');
  const [neighborhood, setNeighborhood] = useState<Neighborhood>('Indiranagar');
  const [address, setAddress] = useState('');
  const [priceLevel, setPriceLevel] = useState<PriceLevel>('₹₹');
  const [priceForTwo, setPriceForTwo] = useState('₹800');
  const [mustTry, setMustTry] = useState('');
  const [selectedVibes, setSelectedVibes] = useState<VibeTag[]>([]);
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');
  const [curatorNote, setCuratorNote] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  const toggleVibe = (tag: VibeTag) => {
    setSelectedVibes((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f97316', '#ea580c', '#fb923c', '#10b981', '#6366f1'],
      });
    } catch (e) {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide the restaurant name');
      return;
    }
    if (!mustTry.trim()) {
      setError('Please list at least 1 must-order dish');
      return;
    }

    setLoading(true);
    setError('');

    // Coordinate jitter for map placement
    const baseCoord = NEIGHBORHOOD_COORDS[neighborhood] || { lat: 12.9716, lng: 77.5946 };
    const jitterLat = baseCoord.lat + (Math.random() - 0.5) * 0.015;
    const jitterLng = baseCoord.lng + (Math.random() - 0.5) * 0.015;

    const payload: SubmissionForm = {
      name: name.trim(),
      category,
      neighborhood,
      address: address.trim() || `${neighborhood}, Bengaluru`,
      lat: jitterLat,
      lng: jitterLng,
      priceLevel,
      priceForTwo: priceForTwo.trim() || '₹800',
      mustTry: mustTry.trim(),
      vibeTags: selectedVibes,
      googleMapsUrl:
        googleMapsUrl.trim() ||
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          name.trim() + ' ' + neighborhood + ' Bengaluru'
        )}`,
      curatorNote: curatorNote.trim(),
      submittedBy: submittedBy.trim() || 'Food Explorer',
      imageUrl: imageUrl.trim() || undefined,
    };

    const newId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString(36);
    const clientRestaurant: Restaurant = {
      id: newId,
      name: payload.name,
      slug: newId,
      tagline: payload.curatorNote || `Curated spot in ${payload.neighborhood}`,
      description: payload.curatorNote || `Community recommended spot in ${payload.neighborhood}`,
      category: payload.category,
      neighborhood: payload.neighborhood,
      address: payload.address,
      lat: jitterLat,
      lng: jitterLng,
      priceLevel: payload.priceLevel,
      priceForTwo: payload.priceForTwo,
      mustTry: payload.mustTry.split(',').map((s) => s.trim()).filter(Boolean),
      vibeTags: payload.vibeTags,
      imageUrl: payload.imageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
      googleMapsUrl: payload.googleMapsUrl,
      timings: '11:00 AM – 11:00 PM',
      verified: false,
      curatorNote: payload.curatorNote,
      submittedBy: payload.submittedBy,
      submittedAt: new Date().toISOString(),
    };

    try {
      // Try API if available, fallback gracefully on static hosting
      let serverRestaurant: Restaurant | null = null;
      try {
        const res = await fetch('/api/submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success) serverRestaurant = data.data;
        }
      } catch (apiErr) {}

      const finalRest = serverRestaurant || clientRestaurant;

      // Persist user submission locally
      try {
        const stored = JSON.parse(localStorage.getItem('blr_user_submissions') || '[]');
        localStorage.setItem('blr_user_submissions', JSON.stringify([finalRest, ...stored]));
      } catch (e) {}

      setSubmittedSuccess(true);
      triggerConfetti();
      onSuccess(finalRest);

      setTimeout(() => {
        setSubmittedSuccess(false);
        onClose();
        setName('');
        setMustTry('');
        setCuratorNote('');
        setSelectedVibes([]);
      }, 1800);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-zinc-200 bg-white p-5 sm:p-8 shadow-2xl transition-all">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-100 text-base">
                🍜
              </span>
              <h2 className="text-lg font-bold tracking-tight text-zinc-900 sm:text-2xl">
                Recommend a Food Spot
              </h2>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-zinc-500">
              Crowd-source your favorite Bengaluru hidden gems, cafes, dosas, and brewpubs.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submittedSuccess ? (
          <div className="my-10 flex flex-col items-center justify-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-3 animate-bounce">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-zinc-900">Thank you for recommending!</h3>
            <p className="mt-1 text-xs sm:text-sm text-zinc-500 max-w-sm">
              <b className="text-zinc-800">{name}</b> has been added to the Bengaluru Food Map for everyone to discover!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4 sm:space-y-5">
            {error && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-medium text-rose-700">
                {error}
              </div>
            )}

            {/* Restaurant Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                Place Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarakki Tiffin Room, BLR Brewing Co"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Category & Neighborhood */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                  Category <span className="text-rose-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 focus:border-zinc-900 focus:bg-white focus:outline-none cursor-pointer"
                >
                  {ALL_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                  Neighborhood <span className="text-rose-500">*</span>
                </label>
                <select
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value as Neighborhood)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 focus:border-zinc-900 focus:bg-white focus:outline-none cursor-pointer"
                >
                  {ALL_NEIGHBORHOODS.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                Exact Street Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. 100 Feet Rd, Indiranagar, Bengaluru"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Price Level & Price for two */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                  Price Tier
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['₹', '₹₹', '₹₹₹', '₹₹₹₹'] as PriceLevel[]).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setPriceLevel(level)}
                      className={`rounded-xl py-2 text-xs font-bold transition-all ${
                        priceLevel === level
                          ? 'bg-zinc-900 text-white shadow-xs'
                          : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                  Approx Price for Two
                </label>
                <input
                  type="text"
                  value={priceForTwo}
                  onChange={(e) => setPriceForTwo(e.target.value)}
                  placeholder="e.g. ₹600"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Must Try Dishes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                Must-Order Dishes <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={mustTry}
                onChange={(e) => setMustTry(e.target.value)}
                placeholder="Comma separated: Podi Dosa, Filter Coffee, Dark Stout"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Curator Insider Note */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                Insider Tip / Curator Note
              </label>
              <textarea
                rows={2}
                value={curatorNote}
                onChange={(e) => setCuratorNote(e.target.value)}
                placeholder="e.g. Best visited on Sunday morning for fresh hot batches."
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none resize-none"
              />
            </div>

            {/* Vibes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                Atmosphere & Features
              </label>
              <div className="flex flex-wrap gap-1.5">
                {ALL_VIBE_TAGS.map((tag) => {
                  const active = selectedVibes.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleVibe(tag)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                        active
                          ? 'bg-orange-600 text-white shadow-xs'
                          : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submitter Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                Your Name / Handle (Optional)
              </label>
              <input
                type="text"
                value={submittedBy}
                onChange={(e) => setSubmittedBy(e.target.value)}
                placeholder="e.g. @mohit / FoodieBLR"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-600 hover:bg-zinc-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-orange-500/20 hover:bg-orange-700 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Submitting…</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 stroke-[2.5]" />
                    <span>Recommend Spot</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
