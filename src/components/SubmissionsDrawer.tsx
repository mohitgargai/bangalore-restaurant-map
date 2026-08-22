'use client';

import React from 'react';
import { Restaurant } from '@/types';
import { X, Inbox, Bookmark, MapPin, Sparkles } from 'lucide-react';

interface SubmissionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: Restaurant[];
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  bookmarkedIds: Set<string>;
}

export default function SubmissionsDrawer({
  isOpen,
  onClose,
  submissions,
  onSelectRestaurant,
  onToggleBookmark,
  bookmarkedIds,
}: SubmissionsDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[3000] flex justify-end">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl border-l border-zinc-200">
        <div className="flex items-center justify-between border-b border-zinc-200 p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
              <Inbox className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900">Community Submissions</h2>
              <p className="text-xs text-zinc-500">
                {submissions.length} newly added spots
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

        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {submissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Inbox className="h-8 w-8 text-zinc-300 mb-2" />
              <p className="text-xs text-zinc-500">No community submissions yet</p>
            </div>
          ) : (
            submissions.map((item) => {
              const isBookmarked = bookmarkedIds.has(item.id);
              return (
                <div
                  key={item.id}
                  className="rounded-xl border border-zinc-200 bg-white p-3.5 shadow-2xs hover:border-zinc-300 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-700">
                        {item.category}
                      </span>
                      <h3
                        onClick={() => {
                          onSelectRestaurant(item);
                          onClose();
                        }}
                        className="text-sm font-bold text-zinc-900 hover:text-orange-600 cursor-pointer mt-1"
                      >
                        {item.name}
                      </h3>
                      <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 text-zinc-400" />
                        <span>{item.neighborhood}</span>
                      </p>
                    </div>

                    <button
                      onClick={(e) => onToggleBookmark(item.id, e)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isBookmarked
                          ? 'text-orange-600 bg-orange-50'
                          : 'text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      <Bookmark
                        className={`h-4 w-4 ${isBookmarked ? 'fill-orange-600' : ''}`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-xs text-zinc-500">
                    <span>By {item.submittedBy || 'Anonymous'}</span>
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
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
