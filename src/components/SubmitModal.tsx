'use client';

import React, { useState } from 'react';
import { Category, Neighborhood, ALL_CATEGORIES, ALL_NEIGHBORHOODS } from '@/types';
import { db } from '@/lib/firebase';
import { trackEvent } from '@/lib/analytics';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { X, Sparkles, CheckCircle2, Loader2, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmitModal({ isOpen, onClose }: SubmitModalProps) {
  const [name, setName] = useState('');
  const [neighborhood, setNeighborhood] = useState<Neighborhood>('Indiranagar');
  const [category, setCategory] = useState<Category>('Specialty Coffee & Cafe');
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
        particleCount: 60,
        spread: 55,
        origin: { y: 0.6 },
        colors: ['#f97316', '#ea580c', '#fb923c', '#10b981', '#6366f1'],
      });
    } catch {
      // Ignore confetti errors if disabled
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide the restaurant or cafe name');
      return;
    }
    if (!whyRecommend.trim()) {
      setError('Please share why you recommend this spot and must-try dishes');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Save directly to Firebase Firestore for editorial review
      await addDoc(collection(db, 'submissions'), {
        name: name.trim(),
        neighborhood,
        category,
        googleMapsUrl: googleMapsUrl.trim() || '',
        whyRecommend: whyRecommend.trim(),
        submittedBy: submittedBy.trim() || 'Anonymous Foodie',
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      trackEvent('submit_spot_suggestion', {
        name: name.trim(),
        neighborhood,
        category,
      });

      setSubmittedSuccess(true);
      triggerConfetti();
    } catch (err: unknown) {
      console.error('Firestore submission error:', err);
      const errMsg = err instanceof Error ? err.message : 'Connection failed';
      setError(`We couldn't save your suggestion right now (${errMsg}). Please try again.`);
      setSubmittedSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setName('');
    setGoogleMapsUrl('');
    setWhyRecommend('');
    setSubmittedBy('');
    setSubmittedSuccess(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1500] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm transition-opacity" 
        onClick={handleResetAndClose} 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl transition-all">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute right-5 top-5 rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {submittedSuccess ? (
          /* ================= SUCCESS SCREEN ================= */
          <div className="py-8 text-center flex flex-col items-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            <h3 className="text-xl font-bold text-zinc-900 mb-2">Suggestion Received!</h3>
            <p className="text-sm text-zinc-600 max-w-sm mx-auto mb-6">
              Thank you for suggesting <strong className="text-zinc-900">{name}</strong> in <span className="font-semibold text-zinc-800">{neighborhood}</span>. Our editorial team will review and verify its rooftop coordinates for the next catalog release.
            </p>

            <button
              onClick={handleResetAndClose}
              className="w-full rounded-2xl bg-zinc-900 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 transition-all active:scale-98"
            >
              Back to Map
            </button>
          </div>
        ) : (
          /* ================= SUGGESTION FORM ================= */
          <div>
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-orange-600 text-xs font-bold">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-orange-600">
                  Community Editorial
                </span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-zinc-900">
                Suggest a Cult Spot
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                Know an undisputed culinary gem, specialty roaster, or heritage canteen we missed? Share it for verification.
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-xl bg-red-50 p-3 text-xs font-medium text-red-600 border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Restaurant Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                  Place Name <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zen, Naru Noodle Bar, Veena Stores…"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900"
                />
              </div>

              {/* Neighborhood & Category Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                    Neighborhood <span className="text-orange-500">*</span>
                  </label>
                  <select
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value as Neighborhood)}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs font-medium text-zinc-900 focus:border-zinc-900 focus:bg-white focus:outline-none"
                  >
                    {ALL_NEIGHBORHOODS.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                    Category <span className="text-orange-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs font-medium text-zinc-900 focus:border-zinc-900 focus:bg-white focus:outline-none"
                  >
                    {ALL_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Why Recommend / Must-Try */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                  Why It Belongs &amp; Must-Try Dishes <span className="text-orange-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="What makes this place special? What dishes or brews should everyone order?"
                  value={whyRecommend}
                  onChange={(e) => setWhyRecommend(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900"
                />
              </div>

              {/* Google Maps / Website Link */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                  Google Maps or Instagram Link <span className="text-zinc-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="https://maps.app.goo.gl/..."
                  value={googleMapsUrl}
                  onChange={(e) => setGoogleMapsUrl(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Submitter Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                  Your Name / Handle <span className="text-zinc-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. @mohit / Food Connoisseur"
                  value={submittedBy}
                  onChange={(e) => setSubmittedBy(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-orange-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 disabled:opacity-50 transition-all active:scale-98"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Submitting for Review…</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Recommendation</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
