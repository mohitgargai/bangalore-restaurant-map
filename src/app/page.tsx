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
  const [activeDrawerRestaurant, setActiveDrawerRestaurant] = useState<Restaurant | null>(null);
  
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
    trackEvent('filter_neighborhood', { neighborhood: area });
    const match = DISTRICT_MAP_CONFIG.find((d) => d.id === area);
    if (match) {
      setTargetDistrict({
        name: match.label,
        lat: match.lat,
        lng: match.lng,
        zoom: match.zoom,
      });
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
      trackEvent('view_restaurant', {
        restaurant_id: r.id,
        name: r.name,
        category: r.category,
        neighborhood: r.neighborhood,
      });
    }
  };

  // Explicit user action to open full dossier drawer ("View Spot" click)
  const handleOpenDrawer = (r: Restaurant) => {
    setSelectedRestaurant(r);
    setActiveDrawerRestaurant(r);
    trackEvent('open_drawer_spot', {
      restaurant_id: r.id,
      name: r.name,
      category: r.category,
    });
  };

  // Synchronized branch change in drawer (pans map to branch pin without resetting drawer)
  const handleSelectBranch = (branchRestaurant: Restaurant) => {
    setSelectedRestaurant(branchRestaurant);
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

      if (selectedNeighborhood !== 'All') {
        const matchesPrimary = r.neighborhood === selectedNeighborhood;
        const matchesBranch = r.branches?.some((b) => b.neighborhood === selectedNeighborhood);
        if (!matchesPrimary && !matchesBranch) {
          return false;
        }
      } 
      
      if (vegOnly && !r.isVegetarian) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = r.name.toLowerCase().includes(q);
        const matchesDish = r.mustTry.some((dish) => dish.toLowerCase().includes(q));
        const matchesVibe = r.vibeTags.some((tag) => tag.toLowerCase().includes(q));
        const matchesTagline = r.tagline.toLowerCase().includes(q);
        const matchesDescription = r.description.toLowerCase().includes(q);

        if (!matchesName && !matchesDish && !matchesVibe && !matchesTagline && !matchesDescription) {
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

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden bg-zinc-950 font-sans">
      {/* Top Floating Command Capsule */}
      <TopNavCapsule
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedNeighborhood={selectedNeighborhood}
        onSelectNeighborhood={handleSelectNeighborhood}
        vegOnly={vegOnly}
        onToggleVegOnly={setVegOnly}
        showSavedOnly={showSavedOnly}
        onToggleSavedOnly={setShowSavedOnly}
        savedCount={bookmarkedIds.size}
        viewMode={viewMode}
        onSelectViewMode={setViewMode}
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
      {activeDrawerRestaurant && (
        <RestaurantDrawer
          restaurant={activeDrawerRestaurant}
          allRestaurants={restaurants}
          onClose={() => setActiveDrawerRestaurant(null)}
          onSelectBranch={handleSelectBranch}
          onToggleBookmark={handleToggleBookmark}
          isBookmarked={bookmarkedIds.has(activeDrawerRestaurant.id)}
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
