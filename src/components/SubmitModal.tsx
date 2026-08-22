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

// Approximate coordinate anchors for Bangalore neighborhoods
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

    // Jitter coordinates around neighborhood center so markers don't stack exactly
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

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setSubmittedSuccess(true);
        triggerConfetti();
        onSuccess(data.data);
        setTimeout(() => {
          setSubmittedSuccess(false);
          onClose();
          // Reset form
          setName('');
          setMustTry('');
          setCuratorNote('');
          setSelectedVibes([]);
        }, 1800);
      } else {
        setError(data.error || 'Failed to submit restaurant');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl transition-all sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-100 text-base">
                🍜
              </span>
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
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
          <div className="my-12 flex flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4 animate-bounce">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900">Thank you for recommending!</h3>
            <p className="mt-1.5 text-sm text-zinc-500 max-w-sm">
              <b className="text-zinc-800">{name}</b> has been added to the Bengaluru Food Map for everyone to discover!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {error && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-medium text-rose-700">
                {error}
              </div>
            )}

            {/* Name + Category */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Spot Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rameshwaram Cafe, Toast & Tonic"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                >
                  {ALL_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {CATEGORY_META[cat]?.icon} {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Neighborhood + Price */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Neighborhood *
                </label>
                <select
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value as Neighborhood)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                >
                  {ALL_NEIGHBORHOODS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Price Tier
                </label>
                <select
                  value={priceLevel}
                  onChange={(e) => setPriceLevel(e.target.value as PriceLevel)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                >
                  <option value="₹">₹ (Budget / Under ₹400)</option>
                  <option value="₹₹">₹₹ (Casual / ₹400 – ₹1000)</option>
                  <option value="₹₹₹">₹₹₹ (Premium / ₹1000 – ₹2200)</option>
                  <option value="₹₹₹₹">₹₹₹₹ (Fine Dine / ₹2200+)</option>
                </select>
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Cost for Two
                </label>
                <input
                  type="text"
                  placeholder="e.g. ₹600"
                  value={priceForTwo}
                  onChange={(e) => setPriceForTwo(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
            </div>

            {/* Must-Try Dishes */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                Must-Order Dishes * (comma separated)
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ghee Podi Dosa, Filter Coffee, Dark Chocolate Babka"
                value={mustTry}
                onChange={(e) => setMustTry(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            {/* Vibe Tags */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                Vibe & Highlights (select all that apply)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {ALL_VIBE_TAGS.map((tag) => {
                  const active = selectedVibes.includes(tag);
                  return (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => toggleVibe(tag)}
                      className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                        active
                          ? 'bg-orange-600 text-white shadow-xs'
                          : 'border border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100'
                      }`}
                    >
                      {active && <Check className="h-3 w-3" />}
                      <span>{tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Curator Note & Google Maps Link */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Insider Tip / Note (optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Visit before 8 AM for fresh steaming batches..."
                  value={curatorNote}
                  onChange={(e) => setCuratorNote(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Your Name or Twitter/IG Handle (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. @mohit / Foodie"
                  value={submittedBy}
                  onChange={(e) => setSubmittedBy(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-4 py-2.5 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-2.5 text-xs font-semibold text-white shadow-md shadow-orange-500/20 hover:bg-orange-700 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Publish Spot</span>
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
