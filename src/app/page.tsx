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
import Navbar from '@/components/Navbar';
import GridView from '@/components/GridView';
import RestaurantDrawer from '@/components/RestaurantDrawer';
import SubmitModal from '@/components/SubmitModal';
import FilterDrawer, { SortOption } from '@/components/FilterDrawer';
import FoodStoriesDrawer from '@/components/FoodStoriesDrawer';
import SubmissionsDrawer from '@/components/SubmissionsDrawer';
import { Sparkles, MapPin, X, Flame, ChevronRight } from 'lucide-react';

// Dynamic import for Leaflet Map to avoid SSR errors
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-zinc-50">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
        <p className="text-xs font-semibold text-zinc-500 tracking-wide uppercase">
          Loading Bengaluru Food Map…
        </p>
      </div>
    </div>
  ),
});

export default function Home() {
  // Master restaurant dataset
  const [restaurants, setRestaurants] = useState<Restaurant[]>(INITIAL_RESTAURANTS);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  // View state
  const [viewMode, setViewMode] = useState<'map' | 'grid'>('map');

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<Neighborhood[]>([]);
  const [selectedPriceLevels, setSelectedPriceLevels] = useState<PriceLevel[]>([]);
  const [selectedVibes, setSelectedVibes] = useState<VibeTag[]>([]);
  const [vegOnly, setVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('upvotes');
  const [trailFilterIds, setTrailFilterIds] = useState<string[] | null>(null);

  // Upvotes persistence
  const [userUpvotes, setUserUpvotes] = useState<Record<string, boolean>>({});

  // Modals & Drawers state
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isStoriesOpen, setIsStoriesOpen] = useState(false);
  const [isSubmissionsOpen, setIsSubmissionsOpen] = useState(false);
  const [showNewsTicker, setShowNewsTicker] = useState(true);

  // Load upvotes from localStorage on client
  useEffect(() => {
    try {
      const saved = localStorage.getItem('blr_eats_upvotes');
      if (saved) {
        setUserUpvotes(JSON.parse(saved));
      }
    } catch (e) {}

    // Fetch latest restaurants from API (including any server-side submissions)
    fetch('/api/restaurants')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setRestaurants(data.data);
        }
      })
      .catch(() => {});
  }, []);

  // Handle upvoting with optimistic update and API call
  const handleUpvote = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const isAlreadyUpvoted = !!userUpvotes[id];
    const newUpvotesState = { ...userUpvotes, [id]: !isAlreadyUpvoted };
    setUserUpvotes(newUpvotesState);
    try {
      localStorage.setItem('blr_eats_upvotes', JSON.stringify(newUpvotesState));
    } catch (e) {}

    // Update in-memory count
    setRestaurants((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return {
            ...r,
            upvotes: isAlreadyUpvoted ? Math.max(0, r.upvotes - 1) : r.upvotes + 1,
          };
        }
        return r;
      })
    );

    // Call API
    try {
      await fetch('/api/upvote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
    } catch (err) {}
  };

  // When a new spot is submitted
  const handleNewSubmission = (newRest: Restaurant) => {
    setRestaurants((prev) => [newRest, ...prev]);
    setSelectedRestaurant(newRest);
  };

  // Filter and Sort Logic
  const filteredRestaurants = useMemo(() => {
    return restaurants
      .filter((r) => {
        // Trail filter
        if (trailFilterIds && !trailFilterIds.includes(r.id)) {
          return false;
        }

        // Category filter
        if (selectedCategory !== 'All' && r.category !== selectedCategory) {
          return false;
        }

        // Neighborhoods filter
        if (
          selectedNeighborhoods.length > 0 &&
          !selectedNeighborhoods.includes(r.neighborhood)
        ) {
          return false;
        }

        // Price Level filter
        if (
          selectedPriceLevels.length > 0 &&
          !selectedPriceLevels.includes(r.priceLevel)
        ) {
          return false;
        }

        // Vibe Tags filter
        if (
          selectedVibes.length > 0 &&
          !selectedVibes.some((v) => r.vibeTags.includes(v))
        ) {
          return false;
        }

        // Pure Veg filter
        if (vegOnly && !r.isVegetarian && !r.vibeTags.includes('Pure Veg')) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = r.name.toLowerCase().includes(q);
          const matchNeighborhood = r.neighborhood.toLowerCase().includes(q);
          const matchCategory = r.category.toLowerCase().includes(q);
          const matchMustTry = r.mustTry.some((dish) => dish.toLowerCase().includes(q));
          const matchVibes = r.vibeTags.some((v) => v.toLowerCase().includes(q));
          const matchDesc = r.description.toLowerCase().includes(q);

          if (
            !matchName &&
            !matchNeighborhood &&
            !matchCategory &&
            !matchMustTry &&
            !matchVibes &&
            !matchDesc
          ) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'upvotes') {
          return b.upvotes - a.upvotes;
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'price-asc') {
          return a.priceLevel.length - b.priceLevel.length;
        }
        if (sortBy === 'price-desc') {
          return b.priceLevel.length - a.priceLevel.length;
        }
        return 0;
      });
  }, [
    restaurants,
    selectedCategory,
    selectedNeighborhoods,
    selectedPriceLevels,
    selectedVibes,
    vegOnly,
    searchQuery,
    sortBy,
    trailFilterIds,
  ]);

  // Count active filters
  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    selectedNeighborhoods.length +
    selectedPriceLevels.length +
    selectedVibes.length +
    (vegOnly ? 1 : 0) +
    (trailFilterIds ? 1 : 0);

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setSelectedNeighborhoods([]);
    setSelectedPriceLevels([]);
    setSelectedVibes([]);
    setVegOnly(false);
    setSearchQuery('');
    setTrailFilterIds(null);
  };

  const crowdSubmissions = useMemo(
    () => restaurants.filter((r) => !r.verified || r.submittedBy),
    [restaurants]
  );

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-zinc-100 font-sans">
      {/* Floating Modern Header / Filter Bar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        viewMode={viewMode}
        onToggleView={setViewMode}
        onOpenSubmitModal={() => setIsSubmitOpen(true)}
        onOpenFilterDrawer={() => setIsFilterOpen(true)}
        onOpenStoriesDrawer={() => setIsStoriesOpen(true)}
        onOpenSubmissionsDrawer={() => setIsSubmissionsOpen(true)}
        activeFilterCount={activeFilterCount}
        totalResults={filteredRestaurants.length}
        pendingSubmissionsCount={crowdSubmissions.length}
      />

      {/* Trail active banner */}
      {trailFilterIds && (
        <div className="absolute top-28 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/95 px-4 py-1.5 text-xs font-semibold text-orange-900 shadow-md backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-orange-600" />
          <span>Active Food Trail Filter</span>
          <button
            onClick={() => setTrailFilterIds(null)}
            className="ml-1 rounded-full p-0.5 hover:bg-orange-200 text-orange-800"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Main View: Map or Grid */}
      <div className="h-full w-full">
        {viewMode === 'map' ? (
          <MapComponent
            restaurants={filteredRestaurants}
            selectedRestaurant={selectedRestaurant}
            onSelectRestaurant={(r) => setSelectedRestaurant(r)}
            onUpvote={handleUpvote}
            userUpvotes={userUpvotes}
          />
        ) : (
          <div className="h-full w-full overflow-y-auto">
            <GridView
              restaurants={filteredRestaurants}
              onSelectRestaurant={(r) => setSelectedRestaurant(r)}
              onUpvote={handleUpvote}
              userUpvotes={userUpvotes}
              onViewOnMap={(r) => {
                setSelectedRestaurant(r);
                setViewMode('map');
              }}
            />
          </div>
        )}
      </div>

      {/* Floating Bottom Left Results Badge */}
      <div className="pointer-events-none absolute bottom-4 left-4 z-[1000] hidden sm:flex items-center gap-2">
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/90 px-3.5 py-1.5 text-xs font-medium text-zinc-700 shadow-lg backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>
            <b>{filteredRestaurants.length}</b> spots in Bangalore
          </span>
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={resetAllFilters}
            className="pointer-events-auto rounded-full border border-zinc-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 shadow-lg backdrop-blur-md transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Floating Clean News / Bangalore Bites Mini-Card (Top Right) */}
      {showNewsTicker && (
        <div className="pointer-events-none absolute right-4 top-28 z-[1000] hidden lg:block w-72">
          <div className="pointer-events-auto rounded-2xl border border-zinc-200/90 bg-white/95 p-3.5 shadow-xl backdrop-blur-md transition-all">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600">
                <Flame className="h-3.5 w-3.5" />
                <span>Bangalore Food Bites</span>
              </div>
              <button
                onClick={() => setShowNewsTicker(false)}
                className="rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-2.5 space-y-2">
              <div
                onClick={() => setIsStoriesOpen(true)}
                className="cursor-pointer group rounded-xl p-2 hover:bg-zinc-50 transition-colors"
              >
                <p className="text-xs font-semibold text-zinc-900 leading-snug group-hover:text-orange-600">
                  Top 5 Weekend Microbreweries & Taprooms
                </p>
                <p className="mt-0.5 text-[11px] text-zinc-500 flex items-center justify-between">
                  <span>Curator Guide</span>
                  <ChevronRight className="h-3 w-3 text-zinc-400" />
                </p>
              </div>
              <div
                onClick={() => {
                  setSearchQuery('Dosa');
                  setShowNewsTicker(false);
                }}
                className="cursor-pointer group rounded-xl p-2 hover:bg-zinc-50 transition-colors"
              >
                <p className="text-xs font-semibold text-zinc-900 leading-snug group-hover:text-orange-600">
                  The Golden Ghee Dosa Tour of South Bangalore
                </p>
                <p className="mt-0.5 text-[11px] text-zinc-500 flex items-center justify-between">
                  <span>Malleshwaram & Basavanagudi</span>
                  <ChevronRight className="h-3 w-3 text-zinc-400" />
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Restaurant Detail Drawer */}
      {selectedRestaurant && (
        <RestaurantDrawer
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          onUpvote={handleUpvote}
          isUpvoted={!!userUpvotes[selectedRestaurant.id]}
        />
      )}

      {/* Crowd-Sourcing Submit Modal */}
      <SubmitModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onSuccess={handleNewSubmission}
      />

      {/* Multi-Faceted Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedNeighborhoods={selectedNeighborhoods}
        onToggleNeighborhood={(n) =>
          setSelectedNeighborhoods((prev) =>
            prev.includes(n) ? prev.filter((item) => item !== n) : [...prev, n]
          )
        }
        selectedPriceLevels={selectedPriceLevels}
        onTogglePriceLevel={(p) =>
          setSelectedPriceLevels((prev) =>
            prev.includes(p) ? prev.filter((item) => item !== p) : [...prev, p]
          )
        }
        selectedVibes={selectedVibes}
        onToggleVibe={(v) =>
          setSelectedVibes((prev) =>
            prev.includes(v) ? prev.filter((item) => item !== v) : [...prev, v]
          )
        }
        vegOnly={vegOnly}
        onToggleVegOnly={setVegOnly}
        sortBy={sortBy}
        onSelectSortBy={setSortBy}
        onResetFilters={resetAllFilters}
        totalFilteredCount={filteredRestaurants.length}
      />

      {/* Food Stories / Trails Drawer */}
      <FoodStoriesDrawer
        isOpen={isStoriesOpen}
        onClose={() => setIsStoriesOpen(false)}
        onApplyTrailFilter={(ids) => setTrailFilterIds(ids)}
        restaurants={restaurants}
      />

      {/* Community Submissions Queue Drawer */}
      <SubmissionsDrawer
        isOpen={isSubmissionsOpen}
        onClose={() => setIsSubmissionsOpen(false)}
        submissions={crowdSubmissions}
        onSelectRestaurant={(r) => setSelectedRestaurant(r)}
        onUpvote={handleUpvote}
        userUpvotes={userUpvotes}
      />
    </main>
  );
}
