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
import FilterDrawer, { SortOption } from '@/components/FilterDrawer';
import FoodStoriesDrawer from '@/components/FoodStoriesDrawer';
import SubmissionsDrawer from '@/components/SubmissionsDrawer';
import {
  Sparkles,
  MapPin,
  X,
  Compass,
  Layers,
  Locate,
  LayoutList,
  Map as MapIcon,
  Maximize2,
} from 'lucide-react';

// Dynamic import for Leaflet Map to avoid SSR errors
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-white">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent"></div>
        <p className="text-xs font-mono font-semibold tracking-widest text-zinc-400 uppercase">
          Initializing Spatial Canvas…
        </p>
      </div>
    </div>
  ),
});

const DISTRICT_COORDINATES = [
  { name: 'All BLR', lat: 12.9716, lng: 77.5946, zoom: 12 },
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
  // Master restaurant dataset
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

  // Load upvotes from localStorage on client
  useEffect(() => {
    try {
      const saved = localStorage.getItem('blr_eats_upvotes');
      if (saved) {
        setUserUpvotes(JSON.parse(saved));
      }
    } catch (e) {}

    // Fetch latest restaurants from API
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
    <main className="relative h-[100dvh] w-full overflow-hidden bg-zinc-950 flex flex-col lg:flex-row font-sans">
      {/* LEFT PANE: Editorial Discovery Feed (460px width on desktop) */}
      <div
        className={`h-full w-full lg:w-[480px] lg:shrink-0 z-10 transition-all ${
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
          selectedNeighborhoods={selectedNeighborhoods}
          onSelectNeighborhood={(n) => {
            if (n === 'All') {
              setSelectedNeighborhoods([]);
            } else {
              setSelectedNeighborhoods([n]);
              // Pan map to that district
              const match = DISTRICT_COORDINATES.find((d) => d.name.toLowerCase().includes(n.toLowerCase()));
              if (match) setTargetDistrict(match);
            }
          }}
          vegOnly={vegOnly}
          onToggleVegOnly={setVegOnly}
          sortBy={sortBy}
          onSelectSortBy={setSortBy}
          onOpenSubmitModal={() => setIsSubmitOpen(true)}
          onOpenStoriesDrawer={() => setIsStoriesOpen(true)}
          onOpenFilterDrawer={() => setIsFilterOpen(true)}
          onResetFilters={resetAllFilters}
          activeFilterCount={activeFilterCount}
          onUpvote={handleUpvote}
          userUpvotes={userUpvotes}
        />
      </div>

      {/* RIGHT PANE: Spatial Map Viewport */}
      <div
        className={`relative flex-1 h-full w-full ${
          mobileTab === 'map' ? 'block' : 'hidden lg:block'
        }`}
      >
        {/* Floating Top District Jumper Ribbon */}
        <div className="pointer-events-none absolute inset-x-0 top-4 z-[1000] px-4 flex justify-end">
          <div className="pointer-events-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar rounded-2xl border border-zinc-200/80 bg-white/90 p-1.5 shadow-lg backdrop-blur-md max-w-full">
            <span className="px-2 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 shrink-0 hidden sm:inline">
              Fly To District
            </span>
            {DISTRICT_COORDINATES.map((dist) => (
              <button
                key={dist.name}
                onClick={() => setTargetDistrict(dist)}
                className={`shrink-0 rounded-xl px-2.5 py-1 text-xs font-semibold transition-all ${
                  targetDistrict?.name === dist.name
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                }`}
              >
                {dist.name}
              </button>
            ))}
          </div>
        </div>

        {/* Trail Active Pill (if active) */}
        {trailFilterIds && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/95 px-4 py-1.5 text-xs font-semibold text-orange-950 shadow-lg backdrop-blur-md">
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

        {/* The Map */}
        <MapComponent
          restaurants={filteredRestaurants}
          selectedRestaurant={selectedRestaurant}
          hoveredRestaurantId={hoveredRestaurantId}
          onSelectRestaurant={(r) => setSelectedRestaurant(r)}
          onUpvote={handleUpvote}
          userUpvotes={userUpvotes}
          targetDistrict={targetDistrict}
        />

        {/* Floating Bottom Info Pill */}
        <div className="pointer-events-none absolute bottom-4 right-4 z-[1000] hidden sm:flex items-center gap-2">
          <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-zinc-200 bg-white/95 px-3.5 py-1.5 text-xs font-medium text-zinc-800 shadow-md backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>
              <b>{filteredRestaurants.length}</b> verified spots
            </span>
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="lg:hidden shrink-0 border-t border-zinc-200 bg-white/95 p-2 backdrop-blur-md flex items-center justify-around z-[1100]">
        <button
          onClick={() => setMobileTab('feed')}
          className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            mobileTab === 'feed'
              ? 'bg-zinc-950 text-white shadow-xs'
              : 'text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <LayoutList className="h-4 w-4" />
          <span>Curated Feed ({filteredRestaurants.length})</span>
        </button>
        <button
          onClick={() => setMobileTab('map')}
          className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            mobileTab === 'map'
              ? 'bg-zinc-950 text-white shadow-xs'
              : 'text-zinc-500 hover:text-zinc-900'
          }`}
        >
          <MapIcon className="h-4 w-4" />
          <span>Spatial Map</span>
        </button>
      </div>

      {/* Detail Dossier Sheet */}
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

      {/* Granular Filter Drawer */}
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
