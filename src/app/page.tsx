'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
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

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(INITIAL_RESTAURANTS);
  
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

  // Bookmarks state (persisted locally)
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  // Modals state
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  // Load initial data, bookmarks & overrides
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem('blr_food_bookmarks');
      if (savedBookmarks) {
        setBookmarkedIds(new Set(JSON.parse(savedBookmarks)));
      }

      // Check for Admin Custom Overrides
      const savedOverrides = localStorage.getItem('blr_custom_overrides');
      if (savedOverrides) {
        const parsedOverrides = JSON.parse(savedOverrides);
        if (Array.isArray(parsedOverrides) && parsedOverrides.length > 0) {
          setRestaurants(parsedOverrides);
          return;
        }
      }

      // Or load user submissions + initial
      const userSubmissions = JSON.parse(localStorage.getItem('blr_user_submissions') || '[]');
      if (Array.isArray(userSubmissions) && userSubmissions.length > 0) {
        setRestaurants([...userSubmissions, ...INITIAL_RESTAURANTS]);
      }
    } catch (e) {}
  }, []);

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
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      const isAdding = !next.has(id);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem('blr_food_bookmarks', JSON.stringify(Array.from(next)));
        trackEvent(isAdding ? 'bookmark_add' : 'bookmark_remove', { restaurant_id: id });
      } catch (err) {}
      return next;
    });
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

  // Synchronized branch change in drawer
  const handleSelectBranch = (branchRestaurant: Restaurant) => {
    setSelectedRestaurant(branchRestaurant);
    setActiveDrawerRestaurant(branchRestaurant);
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
        onSuccess={handleNewSubmission}
      />
    </main>
  );
}
