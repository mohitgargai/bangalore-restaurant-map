'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  Restaurant,
  Category,
  Neighborhood,
  PriceLevel,
  VibeTag,
} from '@/types';
import { INITIAL_RESTAURANTS } from '@/data/restaurants';
import EditorialDeck from '@/components/EditorialDeck';
import RestaurantDrawer from '@/components/RestaurantDrawer';
import SubmitModal from '@/components/SubmitModal';
import {
  LayoutList,
  Map as MapIcon,
  Compass,
} from 'lucide-react';

// Dynamic import for Leaflet Map
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-zinc-100 text-zinc-500">
      <div className="flex flex-col items-center gap-2">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-orange-600 border-t-transparent"></div>
        <p className="text-xs font-medium text-zinc-500">Loading Map…</p>
      </div>
    </div>
  ),
});

const DISTRICT_COORDINATES = [
  { name: 'All Bangalore', lat: 12.9716, lng: 77.5946, zoom: 12 },
  { name: 'Indiranagar', lat: 12.9734, lng: 77.6409, zoom: 15 },
  { name: 'Church St / CBD', lat: 12.9737, lng: 77.6074, zoom: 15 },
  { name: 'Malleshwaram', lat: 12.9985, lng: 77.5708, zoom: 15 },
  { name: 'Basavanagudi', lat: 12.9455, lng: 77.5739, zoom: 15 },
  { name: 'Koramangala', lat: 12.9341, lng: 77.6256, zoom: 15 },
  { name: 'HSR Layout', lat: 12.9118, lng: 77.6385, zoom: 15 },
  { name: 'Whitefield', lat: 12.9818, lng: 77.7291, zoom: 15 },
  { name: 'Jayanagar', lat: 12.9238, lng: 77.5934, zoom: 15 },
];

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(INITIAL_RESTAURANTS);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [hoveredRestaurantId, setHoveredRestaurantId] = useState<string | null>(null);

  // Active district fly-to
  const [targetDistrict, setTargetDistrict] = useState<{
    name: string;
    lat: number;
    lng: number;
    zoom: number;
  } | null>(null);

  // Mobile View Switcher (Feed vs Map)
  const [mobileTab, setMobileTab] = useState<'feed' | 'map'>('feed');

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Neighborhood | 'All'>('All');
  const [vegOnly, setVegOnly] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Bookmarks state
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  // Modal
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  // Load bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('blr_food_bookmarks');
      if (saved) {
        setBookmarkedIds(new Set(JSON.parse(saved)));
      }
    } catch (e) {}

    fetch('/api/restaurants')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setRestaurants(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleToggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem('blr_food_bookmarks', JSON.stringify(Array.from(next)));
      } catch (err) {}
      return next;
    });
  };

  const handleNewSubmission = (newRest: Restaurant) => {
    setRestaurants((prev) => [newRest, ...prev]);
    setSelectedRestaurant(newRest);
  };

  // Filter Logic
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      if (showSavedOnly && !bookmarkedIds.has(r.id)) {
        return false;
      }

      if (selectedCategory !== 'All' && r.category !== selectedCategory) {
        return false;
      }

      if (selectedNeighborhood !== 'All' && r.neighborhood !== selectedNeighborhood) {
        return false;
      }

      if (vegOnly && !r.isVegetarian && !r.vibeTags.includes('Pure Veg')) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = r.name.toLowerCase().includes(q);
        const matchNeighborhood = r.neighborhood.toLowerCase().includes(q);
        const matchCategory = r.category.toLowerCase().includes(q);
        const matchMustTry = r.mustTry.some((dish) => dish.toLowerCase().includes(q));

        if (!matchName && !matchNeighborhood && !matchCategory && !matchMustTry) {
          return false;
        }
      }

      return true;
    });
  }, [
    restaurants,
    selectedCategory,
    selectedNeighborhood,
    vegOnly,
    showSavedOnly,
    bookmarkedIds,
    searchQuery,
  ]);

  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedNeighborhood !== 'All' ? 1 : 0) +
    (vegOnly ? 1 : 0) +
    (showSavedOnly ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setSelectedNeighborhood('All');
    setVegOnly(false);
    setShowSavedOnly(false);
    setSearchQuery('');
  };

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-zinc-100 flex flex-col lg:flex-row font-sans">
      {/* LEFT PANE: Clean Editorial Discovery Feed */}
      <div
        className={`h-full w-full lg:w-[440px] lg:shrink-0 z-10 ${
          mobileTab === 'feed' ? 'block' : 'hidden lg:block'
        }`}
      >
        <EditorialDeck
          restaurants={filteredRestaurants}
          totalUnfilteredCount={restaurants.length}
          selectedRestaurant={selectedRestaurant}
          onSelectRestaurant={(r) => {
            setSelectedRestaurant(r);
            if (window.innerWidth < 1024) {
              setMobileTab('map');
            }
          }}
          hoveredRestaurantId={hoveredRestaurantId}
          onHoverRestaurant={setHoveredRestaurantId}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedNeighborhood={selectedNeighborhood}
          onSelectNeighborhood={(n) => {
            setSelectedNeighborhood(n);
            if (n !== 'All') {
              const match = DISTRICT_COORDINATES.find((d) =>
                d.name.toLowerCase().includes(n.toLowerCase())
              );
              if (match) setTargetDistrict(match);
            }
          }}
          vegOnly={vegOnly}
          onToggleVegOnly={setVegOnly}
          showSavedOnly={showSavedOnly}
          onToggleSavedOnly={setShowSavedOnly}
          savedCount={bookmarkedIds.size}
          onOpenSubmitModal={() => setIsSubmitOpen(true)}
          onResetFilters={resetAllFilters}
          activeFilterCount={activeFilterCount}
          onToggleBookmark={handleToggleBookmark}
          bookmarkedIds={bookmarkedIds}
        />
      </div>

      {/* RIGHT PANE: Spatial Map Viewport */}
      <div
        className={`relative flex-1 h-full w-full ${
          mobileTab === 'map' ? 'block' : 'hidden lg:block'
        }`}
      >
        {/* Clean District Jumper Top Bar */}
        <div className="pointer-events-none absolute inset-x-0 top-3 z-[1000] px-4 flex justify-end">
          <div className="pointer-events-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar rounded-full border border-zinc-200/90 bg-white/95 px-2.5 py-1.5 shadow-sm backdrop-blur-md">
            {DISTRICT_COORDINATES.map((dist) => (
              <button
                key={dist.name}
                onClick={() => setTargetDistrict(dist)}
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
                  targetDistrict?.name === dist.name
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {dist.name}
              </button>
            ))}
          </div>
        </div>

        {/* Map Component */}
        <MapComponent
          restaurants={filteredRestaurants}
          selectedRestaurant={selectedRestaurant}
          hoveredRestaurantId={hoveredRestaurantId}
          onSelectRestaurant={(r) => setSelectedRestaurant(r)}
          onToggleBookmark={handleToggleBookmark}
          bookmarkedIds={bookmarkedIds}
          targetDistrict={targetDistrict}
        />
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="lg:hidden shrink-0 border-t border-zinc-200 bg-white p-2 backdrop-blur-md flex items-center justify-around z-[1100]">
        <button
          onClick={() => setMobileTab('feed')}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
            mobileTab === 'feed'
              ? 'bg-zinc-900 text-white'
              : 'text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <LayoutList className="h-4 w-4" />
          <span>Places ({filteredRestaurants.length})</span>
        </button>
        <button
          onClick={() => setMobileTab('map')}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
            mobileTab === 'map'
              ? 'bg-zinc-900 text-white'
              : 'text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <MapIcon className="h-4 w-4" />
          <span>Map View</span>
        </button>
      </div>

      {/* Detail Drawer */}
      {selectedRestaurant && (
        <RestaurantDrawer
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          onToggleBookmark={handleToggleBookmark}
          isBookmarked={bookmarkedIds.has(selectedRestaurant.id)}
        />
      )}

      {/* Submit Modal */}
      <SubmitModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onSuccess={handleNewSubmission}
      />
    </main>
  );
}
