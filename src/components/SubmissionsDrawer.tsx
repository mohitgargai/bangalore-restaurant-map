'use client';

import React from 'react';
import { Restaurant } from '@/types';
import { X, Inbox, Heart, User, MapPin, Sparkles, Navigation } from 'lucide-react';

interface SubmissionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: Restaurant[];
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onUpvote: (id: string, e: React.MouseEvent) => void;
  userUpvotes: Record<string, boolean>;
}

export default function SubmissionsDrawer({
  isOpen,
  onClose,
  submissions,
  onSelectRestaurant,
  onUpvote,
  userUpvotes,
}: SubmissionsDrawerProps) {
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
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Inbox className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-900">Community Drops</h2>
              <p className="text-xs text-zinc-500">
                {submissions.length} freshly crowd-sourced restaurant gems
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {submissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Inbox className="h-10 w-10 text-zinc-300 mb-2" />
              <p className="text-sm font-medium text-zinc-700">No community submissions yet</p>
              <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                Be the first to recommend a hidden gem using the &ldquo;Recommend Spot&rdquo; button!
              </p>
            </div>
          ) : (
            submissions.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-xs hover:border-zinc-300 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800 border border-amber-200">
                      {item.category}
                    </span>
                    <h3
                      onClick={() => {
                        onSelectRestaurant(item);
                        onClose();
                      }}
                      className="text-base font-bold text-zinc-900 hover:text-orange-600 cursor-pointer mt-1"
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3 text-zinc-400" />
                      <span>{item.neighborhood}</span>
                    </p>
                  </div>

                  <button
                    onClick={(e) => onUpvote(item.id, e)}
                    className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      userUpvotes[item.id]
                        ? 'bg-rose-50 text-rose-600 border border-rose-200'
                        : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                    }`}
                  >
                    <Heart
                      className={`h-3.5 w-3.5 ${
                        userUpvotes[item.id] ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                    <span>{item.upvotes}</span>
                  </button>
                </div>

                {item.curatorNote && (
                  <p className="text-xs text-zinc-600 italic bg-zinc-50 p-2.5 rounded-xl border border-zinc-100">
                    &ldquo;{item.curatorNote}&rdquo;
                  </p>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3 text-zinc-400" />
                    <span>By {item.submittedBy || 'Anonymous'}</span>
                  </span>
                  <button
                    onClick={() => {
                      onSelectRestaurant(item);
                      onClose();
                    }}
                    className="font-semibold text-orange-600 hover:text-orange-700"
                  >
                    View Spot &rarr;
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
