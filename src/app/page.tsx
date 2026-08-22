'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Restaurant,
  Category,
  Neighborhood,
} from '@/types';
import { INITIAL_RESTAURANTS } from '@/data/restaurants';
import TopNavCapsule, { ViewMode } from '@/components/TopNavCapsule';
import SpatialMapFlow, { DISTRICT_MAP_CONFIG } from '@/components/SpatialMapFlow';
import MagazineFeedView from '@/components/MagazineFeedView';
import GridView from '@/components/GridView';
import RestaurantDrawer from '@/components/RestaurantDrawer';
import SubmitModal from '@/components/SubmitModal';

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(INITIAL_RESTAURANTS);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [hoveredRestaurantId, setHoveredRestaurantId] = useState<string | null>(null);

  // Active View Mode ('spatial' | 'feed' | 'grid')
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

  // Submit Modal
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  // Load bookmarks on mount
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

  // Keyboard shortcut listener for ⌘K or / to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        searchInput?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Synchronized Neighborhood handler
  const handleSelectNeighborhood = useCallback((area: Neighborhood | 'All') => {
    setSelectedNeighborhood(area);
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

      {/* Main View Area */}
      <div className="h-full w-full">
        {viewMode === 'spatial' && (
          <SpatialMapFlow
            restaurants={filteredRestaurants}
            selectedRestaurant={selectedRestaurant}
            onSelectRestaurant={(r) => setSelectedRestaurant(r)}
            hoveredRestaurantId={hoveredRestaurantId}
            onHoverRestaurant={setHoveredRestaurantId}
            selectedNeighborhood={selectedNeighborhood}
            onSelectNeighborhood={handleSelectNeighborhood}
            onToggleBookmark={handleToggleBookmark}
            bookmarkedIds={bookmarkedIds}
            targetDistrict={targetDistrict}
          />
        )}

        {viewMode === 'feed' && (
          <div className="h-full w-full overflow-y-auto bg-zinc-50">
            <MagazineFeedView
              restaurants={filteredRestaurants}
              onSelectRestaurant={(r) => setSelectedRestaurant(r)}
              onToggleBookmark={handleToggleBookmark}
              bookmarkedIds={bookmarkedIds}
              onViewOnMap={(r) => {
                setSelectedRestaurant(r);
                setViewMode('spatial');
              }}
            />
          </div>
        )}

        {viewMode === 'grid' && (
          <div className="h-full w-full overflow-y-auto bg-zinc-50 pt-24">
            <GridView
              restaurants={filteredRestaurants}
              onSelectRestaurant={(r) => setSelectedRestaurant(r)}
              onToggleBookmark={handleToggleBookmark}
              bookmarkedIds={bookmarkedIds}
              onViewOnMap={(r) => {
                setSelectedRestaurant(r);
                setViewMode('spatial');
              }}
            />
          </div>
        )}
      </div>

      {/* Restaurant Dossier Detail Sheet */}
      {selectedRestaurant && (
        <RestaurantDrawer
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          onToggleBookmark={handleToggleBookmark}
          isBookmarked={bookmarkedIds.has(selectedRestaurant.id)}
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
