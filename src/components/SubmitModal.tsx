'use client';

import React, { useState, useEffect } from 'react';
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
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');
  const [whyRecommend, setWhyRecommend] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleResetAndClose = React.useCallback(() => {
    setName('');
    setGoogleMapsUrl('');
    setWhyRecommend('');
    setSubmittedSuccess(false);
    setError('');
    onClose();
  }, [onClose]);

  // Keyboard shortcut: Escape key closes the modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleResetAndClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleResetAndClose]);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 55,
        origin: { y: 0.6 },
        colors: ['#BC5434', '#3E6B56', '#C87D18', '#211C1A'],
      });
    } catch {
      // Ignore confetti errors if disabled
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide the place name');
      return;
    }
    if (!googleMapsUrl.trim()) {
      setError('Please provide the Google Maps link');
      return;
    }
    if (!whyRecommend.trim()) {
      setError('Please share why you recommend this spot and what to order');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Save to Firebase Firestore
      await addDoc(collection(db, 'submissions'), {
        name: name.trim(),
        googleMapsUrl: googleMapsUrl.trim(),
        whyRecommend: whyRecommend.trim(),
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      trackEvent('submit_spot_suggestion', {
        name: name.trim(),
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

  return (
    <div className="fixed inset-0 z-[1500] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#211C1A]/60 backdrop-blur-xs transition-opacity cursor-pointer" 
        onClick={handleResetAndClose} 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md rounded-3xl border border-[#E6E0D5] bg-[#FFFDFB] p-6 shadow-2xl transition-all">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute right-5 top-5 rounded-full p-2 text-stone-400 hover:bg-[#F0EBE1] hover:text-[#211C1A] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#211C1A]"
          title="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {submittedSuccess ? (
          /* ================= SUCCESS SCREEN ================= */
          <div className="py-6 text-center flex flex-col items-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F4F0] text-[#17473C] ring-8 ring-[#E8F4F0]/60">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            <h3 className="text-xl font-bold text-[#211C1A] mb-2">Suggestion Received!</h3>
            <p className="text-sm text-stone-600 max-w-sm mx-auto mb-6">
              Thank you for suggesting <strong className="text-[#211C1A]">{name}</strong>. We will review the details and add it to the map.
            </p>

            <button
              onClick={handleResetAndClose}
              className="w-full rounded-2xl bg-[#211C1A] py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#38312E] transition-all active:scale-98 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            >
              Back to Map
            </button>
          </div>
        ) : (
          /* ================= SUGGESTION FORM ================= */
          <div>
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FDF3EE] text-[#BC5434] text-xs font-bold border border-[#F7D6C6]">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#BC5434]">
                  Community Suggestion
                </span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-[#211C1A]">
                Suggest a Place
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Know a spot in Bangalore we should add? Drop the details below.
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-xl bg-red-50 p-3 text-xs font-medium text-red-600 border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Place Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Place Name <span className="text-[#BC5434]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Naru Noodle Bar, Taaza Thindi, Zen…"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-[#E2DDD2] bg-[#F4EFE6]/70 px-3.5 py-2.5 text-sm text-[#211C1A] placeholder-stone-400 focus:border-[#BC5434] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#BC5434]"
                />
              </div>

              {/* Google Maps URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Google Maps Link <span className="text-[#BC5434]">*</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://maps.app.goo.gl/…"
                  value={googleMapsUrl}
                  onChange={(e) => setGoogleMapsUrl(e.target.value)}
                  className="w-full rounded-xl border border-[#E2DDD2] bg-[#F4EFE6]/70 px-3.5 py-2.5 text-sm text-[#211C1A] placeholder-stone-400 focus:border-[#BC5434] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#BC5434]"
                />
              </div>

              {/* Why Recommend */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Why do you recommend it & Must-Try Dishes? <span className="text-[#BC5434]">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us what dish to order and why this place belongs on the map…"
                  value={whyRecommend}
                  onChange={(e) => setWhyRecommend(e.target.value)}
                  className="w-full rounded-xl border border-[#E2DDD2] bg-[#F4EFE6]/70 p-3 text-xs text-[#211C1A] placeholder-stone-400 focus:border-[#BC5434] focus:bg-white focus:outline-none resize-none focus:ring-1 focus:ring-[#BC5434]"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#BC5434] py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#A34326] disabled:opacity-50 transition-all active:scale-98 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BC5434]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Submitting…</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Suggestion</span>
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

