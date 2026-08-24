'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  Restaurant,
  Category,
  Neighborhood,
} from '@/types';
import { INITIAL_RESTAURANTS } from '@/data/restaurants';
import { trackEvent } from '@/lib/analytics';
import TopNavCapsule, { ViewMode } from '@/components/TopNavCapsule';
import SpatialMapFlow, { DISTRICT_MAP_CONFIG } from '@/components/SpatialMapFlow';
import GridView from '@/components/GridView';
import RestaurantDrawer from '@/components/RestaurantDrawer';
import SubmitModal from '@/components/SubmitModal';

function subscribeBookmarks(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('blr_bookmarks_updated', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('blr_bookmarks_updated', callback);
  };
}

function getBookmarksSnapshot(): string {
  if (typeof window === 'undefined') return '[]';
  try {
    return localStorage.getItem('blr_food_bookmarks') || '[]';
  } catch {
    return '[]';
  }
}

function getBookmarksServerSnapshot(): string {
  return '[]';
}

export default function Home() {
  const [restaurants] = useState<Restaurant[]>(INITIAL_RESTAURANTS);

  // Focused pin / active card on the map
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  
  // Explicitly opened detail drawer (only opens on clear ask: clicking 'View Spot')
  const [activeDrawerState, setActiveDrawerState] = useState<{
    restaurant: Restaurant;
    initialBranchId?: string | null;
  } | null>(null);
  
  const [hoveredRestaurantId, setHoveredRestaurantId] = useState<string | null>(null);

  // Active View Mode ('spatial' | 'grid')
  const [viewMode, setViewMode] = useState<ViewMode>('spatial');

  // Active district fly-to
  const [targetDistrict, setTargetDistrict] = useState<{
    name: string;
    lat: number;
    lng: number;
    zoom: number;
  } | null>(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Neighborhood | 'All'>('All');
  const [vegOnly, setVegOnly] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Bookmarks state (Hydration-safe via React 19 useSyncExternalStore)
  const bookmarksRaw = React.useSyncExternalStore(
    subscribeBookmarks,
    getBookmarksSnapshot,
    getBookmarksServerSnapshot
  );

  const bookmarkedIds = useMemo(() => {
    try {
      const parsed = JSON.parse(bookmarksRaw);
      return new Set<string>(Array.isArray(parsed) ? parsed : []);
    } catch {
      return new Set<string>();
    }
  }, [bookmarksRaw]);

  // Modals state
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  // Synchronized Neighborhood selection
  const handleSelectNeighborhood = useCallback((area: Neighborhood | 'All') => {
    setSelectedNeighborhood(area);
    setSelectedRestaurant(null);
    trackEvent('filter_neighborhood', { neighborhood: area });
    const match = DISTRICT_MAP_CONFIG.find((d) => d.id === area);
    if (match) {
      setTargetDistrict({
        name: match.label,
        lat: match.lat,
        lng: match.lng,
        zoom: match.zoom,
      });
    } else {
      setTargetDistrict(null);
    }
  }, []);

  const handleToggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      const current = Array.from(bookmarkedIds);
      const isAdding = !bookmarkedIds.has(id);
      const next = isAdding ? [...current, id] : current.filter((x) => x !== id);
      localStorage.setItem('blr_food_bookmarks', JSON.stringify(next));
      window.dispatchEvent(new Event('blr_bookmarks_updated'));
      trackEvent(isAdding ? 'bookmark_add' : 'bookmark_remove', { restaurant_id: id });
    } catch {
      // Ignore storage error
    }
  };

  // Map pin / carousel card focus (DOES NOT open full drawer)
  const handleSelectRestaurant = (r: Restaurant | null) => {
    setSelectedRestaurant(r);
    if (r) {
      setTargetDistrict(null);
      trackEvent('view_restaurant', {
        restaurant_id: r.id,
        name: r.name,
        category: r.category,
        neighborhood: r.neighborhood,
      });
    }
  };

  // Explicit user action to open full dossier drawer ("View Spot" click)
  const handleOpenDrawer = (r: Restaurant, branchId: string | null = null) => {
    setSelectedRestaurant(r);
    setActiveDrawerState({ restaurant: r, initialBranchId: branchId });
    trackEvent('open_drawer_spot', {
      restaurant_id: r.id,
      name: r.name,
      category: r.category,
    });
  };

  // Synchronize active outlet when changed inside Drawer
  const handleSelectBranch = (branchRestaurant: Restaurant) => {
    setSelectedRestaurant(branchRestaurant);
  };

  // Filtered dataset
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      // Search matching across primary + branches
      const matchesSearch =
        searchQuery === '' ||
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.mustTry.some((dish) => dish.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (r.branches &&
          r.branches.some(
            (b) =>
              b.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
              b.address.toLowerCase().includes(searchQuery.toLowerCase())
          ));

      // Category matching
      const matchesCategory =
        selectedCategory === 'All' || r.category === selectedCategory;

      // Spatial isolation: Neighborhood matching across primary + branches
      const matchesNeighborhood =
        selectedNeighborhood === 'All' ||
        r.neighborhood === selectedNeighborhood ||
        (r.branches && r.branches.some((b) => b.neighborhood === selectedNeighborhood));

      // Dietary matching
      const matchesVeg = !vegOnly || r.isVegetarian;

      // Bookmarked filter
      const matchesSaved = !showSavedOnly || bookmarkedIds.has(r.id);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesNeighborhood &&
        matchesVeg &&
        matchesSaved
      );
    });
  }, [
    restaurants,
    searchQuery,
    selectedCategory,
    selectedNeighborhood,
    vegOnly,
    showSavedOnly,
    bookmarkedIds,
  ]);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-zinc-950">
      {/* Floating Top Floating Capsule */}
      <TopNavCapsule
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          trackEvent('filter_category', { category: cat });
        }}
        selectedNeighborhood={selectedNeighborhood}
        onSelectNeighborhood={handleSelectNeighborhood}
        vegOnly={vegOnly}
        onToggleVegOnly={setVegOnly}
        showSavedOnly={showSavedOnly}
        onToggleSavedOnly={setShowSavedOnly}
        savedCount={bookmarkedIds.size}
        viewMode={viewMode}
        onSelectViewMode={(mode) => {
          setViewMode(mode);
          trackEvent('switch_view_mode', { mode });
        }}
        onOpenSubmitModal={() => setIsSubmitOpen(true)}
        totalFilteredCount={filteredRestaurants.length}
      />

      {/* Main Viewport */}
      <div className="h-full w-full">
        {viewMode === 'spatial' ? (
          <SpatialMapFlow
            restaurants={filteredRestaurants}
            selectedRestaurant={selectedRestaurant}
            onSelectRestaurant={handleSelectRestaurant}
            onOpenDrawer={handleOpenDrawer}
            hoveredRestaurantId={hoveredRestaurantId}
            onHoverRestaurant={setHoveredRestaurantId}
            selectedNeighborhood={selectedNeighborhood}
            onSelectNeighborhood={handleSelectNeighborhood}
            onToggleBookmark={handleToggleBookmark}
            bookmarkedIds={bookmarkedIds}
            targetDistrict={targetDistrict}
          />
        ) : (
          <div className="h-full w-full overflow-y-auto bg-zinc-50 pt-36">
            <GridView
              restaurants={filteredRestaurants}
              selectedNeighborhood={selectedNeighborhood}
              onSelectRestaurant={handleOpenDrawer}
              onToggleBookmark={handleToggleBookmark}
              bookmarkedIds={bookmarkedIds}
              onViewOnMap={(r) => {
                handleSelectRestaurant(r);
                setViewMode('spatial');
              }}
            />
          </div>
        )}
      </div>

      {/* Restaurant Dossier Detail Sheet (Opens ONLY when explicit 'View Spot' is clicked) */}
      {activeDrawerState && (
        <RestaurantDrawer
          restaurant={activeDrawerState.restaurant}
          initialBranchId={activeDrawerState.initialBranchId}
          allRestaurants={restaurants}
          onClose={() => setActiveDrawerState(null)}
          onSelectBranch={handleSelectBranch}
          onToggleBookmark={handleToggleBookmark}
          isBookmarked={bookmarkedIds.has(activeDrawerState.restaurant.id)}
        />
      )}

      {/* Submit Spot Modal */}
      <SubmitModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
      />
    </main>
  );
}
