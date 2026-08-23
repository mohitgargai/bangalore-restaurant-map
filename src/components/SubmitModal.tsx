'use client';

import React, { useState } from 'react';
import { Restaurant, Neighborhood } from '@/types';
import { db } from '@/lib/firebase';
import { trackEvent } from '@/lib/analytics';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { X, Sparkles, Plus, CheckCircle2, Link2, User, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newRestaurant: Restaurant) => void;
}

const NEIGHBORHOOD_COORDS: Record<string, { lat: number; lng: number }> = {
  'indiranagar': { lat: 12.9719, lng: 77.6412 },
  'koramangala': { lat: 12.9352, lng: 77.6245 },
  'church street': { lat: 12.9749, lng: 77.6094 },
  'mg road': { lat: 12.9749, lng: 77.6094 },
  'lavelle road': { lat: 12.9702, lng: 77.5985 },
  'malleshwaram': { lat: 13.0039, lng: 77.5701 },
  'basavanagudi': { lat: 12.9452, lng: 77.5739 },
  'hsr': { lat: 12.9121, lng: 77.6446 },
  'whitefield': { lat: 12.9698, lng: 77.7499 },
  'jayanagar': { lat: 12.9308, lng: 77.5838 },
  'jp nagar': { lat: 12.9063, lng: 77.5857 },
};

export default function SubmitModal({ isOpen, onClose, onSuccess }: SubmitModalProps) {
  const [name, setName] = useState('');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');
  const [whyRecommend, setWhyRecommend] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 75,
        spread: 60,
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
    if (!googleMapsUrl.trim()) {
      setError('Please paste the Google Maps link or neighborhood');
      return;
    }
    if (!whyRecommend.trim()) {
      setError('Please share why you recommend this spot or what to order');
      return;
    }

    setLoading(true);
    setError('');

    // Detect neighborhood from input text
    const lowerInput = (googleMapsUrl + ' ' + name).toLowerCase();
    let detectedHood: Neighborhood = 'Indiranagar';
    let baseCoord = { lat: 12.9716, lng: 77.5946 };

    for (const [key, coord] of Object.entries(NEIGHBORHOOD_COORDS)) {
      if (lowerInput.includes(key)) {
        baseCoord = coord;
        if (key === 'koramangala') detectedHood = 'Koramangala';
        else if (key === 'church street' || key === 'mg road') detectedHood = 'Church Street & MG Road';
        else if (key === 'malleshwaram') detectedHood = 'Malleshwaram';
        else if (key === 'basavanagudi') detectedHood = 'Basavanagudi';
        else if (key === 'hsr') detectedHood = 'HSR Layout';
        else if (key === 'whitefield') detectedHood = 'Whitefield';
        else if (key === 'jayanagar') detectedHood = 'Jayanagar';
        else if (key === 'lavelle road') detectedHood = 'Lavelle Road';
        break;
      }
    }

    const jitterLat = baseCoord.lat + (Math.random() - 0.5) * 0.012;
    const jitterLng = baseCoord.lng + (Math.random() - 0.5) * 0.012;

    const formattedMapsUrl = googleMapsUrl.startsWith('http')
      ? googleMapsUrl.trim()
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          name.trim() + ' ' + googleMapsUrl.trim() + ' Bengaluru'
        )}`;

    const newId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString(36);

    const newSpot: Restaurant = {
      id: newId,
      name: name.trim(),
      slug: newId,
      tagline: whyRecommend.trim().slice(0, 80),
      description: whyRecommend.trim(),
      category: 'Iconic Heritage',
      neighborhood: detectedHood,
      address: `${detectedHood}, Bengaluru`,
      lat: jitterLat,
      lng: jitterLng,
      priceLevel: '₹₹',
      priceForTwo: '₹600',
      mustTry: [whyRecommend.split('.')[0].slice(0, 45) || 'Signature Special'],
      vibeTags: ['Pocket Friendly'],
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
      googleMapsUrl: formattedMapsUrl,
      timings: 'Open Daily',
      curatorNote: whyRecommend.trim(),
      submittedBy: submittedBy.trim() || 'Community Foodie',
      submittedAt: new Date().toISOString(),
      verified: false,
    };

    try {
      // 1. Save directly to Firebase Firestore
      try {
        await addDoc(collection(db, 'submissions'), {
          name: name.trim(),
          googleMapsUrl: formattedMapsUrl,
          whyRecommend: whyRecommend.trim(),
          submittedBy: submittedBy.trim() || 'Community Foodie',
          neighborhood: detectedHood,
          lat: jitterLat,
          lng: jitterLng,
          createdAt: serverTimestamp(),
          status: 'pending',
        });
        trackEvent('submit_spot', {
          spot_name: name.trim(),
          neighborhood: detectedHood,
        });
      } catch (firestoreErr) {
        console.warn('Firestore write warning:', firestoreErr);
      }

      // 2. Save locally in browser for instant persistence
      try {
        const stored = JSON.parse(localStorage.getItem('blr_user_submissions') || '[]');
        localStorage.setItem('blr_user_submissions', JSON.stringify([newSpot, ...stored]));
      } catch (e) {}

      setSubmittedSuccess(true);
      triggerConfetti();
      onSuccess(newSpot);

      setTimeout(() => {
        setSubmittedSuccess(false);
        onClose();
        setName('');
        setGoogleMapsUrl('');
        setWhyRecommend('');
        setSubmittedBy('');
        setLoading(false);
      }, 1600);
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-200 bg-white p-5 sm:p-7 shadow-2xl transition-all">
        {/* Top Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 font-bold">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-zinc-900 sm:text-xl">
                Recommend a Spot
              </h2>
              <p className="text-xs text-zinc-500">
                Share a must-visit eatery, cafe, or hidden gem in Bangalore.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submittedSuccess ? (
          <div className="my-8 flex flex-col items-center justify-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-3 animate-bounce">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900">Thank you! Added to Map 🎉</h3>
            <p className="mt-1 text-xs text-zinc-500 max-w-xs">
              <b className="text-zinc-800">{name}</b> has been saved to Firebase and pinned for everyone to discover!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {error && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 p-2.5 text-xs font-medium text-rose-700">
                {error}
              </div>
            )}

            {/* 1. Restaurant / Cafe Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                Restaurant / Spot Name <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rameshwaram Cafe, CTR, Toit, Araku"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none"
              />
            </div>

            {/* 2. Google Maps Link */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                Google Maps Link or Area <span className="text-orange-600">*</span>
              </label>
              <div className="relative">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                <input
                  type="text"
                  required
                  value={googleMapsUrl}
                  onChange={(e) => setGoogleMapsUrl(e.target.value)}
                  placeholder="https://maps.app.goo.gl/... or Indiranagar 100ft Rd"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-8 pr-3.5 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* 3. Why recommend & Must Order */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                Why do you recommend it & what to order? <span className="text-orange-600">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={whyRecommend}
                onChange={(e) => setWhyRecommend(e.target.value)}
                placeholder="e.g. Best crispy Benne Dosa in town, paired with their coconut mint chutney. Must try: Ghee Podi Dosa & Filter Coffee."
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none resize-none"
              />
            </div>

            {/* 4. Submitter Handle (Optional) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                Your Name / Handle (Optional)
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                <input
                  type="text"
                  value={submittedBy}
                  onChange={(e) => setSubmittedBy(e.target.value)}
                  placeholder="e.g. @mohit / FoodieBLR"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-8 pr-3.5 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-1.5 rounded-xl bg-orange-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-orange-500/20 hover:bg-orange-700 transition-all disabled:opacity-50 active:scale-95"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving to Firebase…</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 stroke-[2.5]" />
                    <span>Submit Spot</span>
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
