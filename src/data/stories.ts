import { FoodStory } from '@/types';

export const CURATED_STORIES: FoodStory[] = [
  {
    id: 'story-filter-coffee',
    title: 'The Great Bangalore Filter Coffee & Dosa Trail',
    subtitle: 'From Malleshwaram’s CTR to Gandhi Bazaar’s Vidyarthi Bhavan',
    tag: 'Heritage Trail',
    readTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80',
    restaurantIds: ['vidyarthi-bhavan', 'ctr-shri-sagar', 'mtr-lalbagh', 'brahmins-coffee-bar', 'veena-stores-malleshwaram'],
    author: 'Curator Picks',
    summary: 'A golden tour of South Indian breakfast legends where butter rules, idlis melt, and frothy filter coffee is poured from brass dabarah sets.'
  },
  {
    id: 'story-craft-breweries',
    title: 'Hop-Heads Guide: Top Microbreweries in Bengaluru',
    subtitle: 'From Indiranagar rooftops to Whitefield jazz libraries',
    tag: 'Craft Beer',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=800&q=80',
    restaurantIds: ['toit-brewpub', 'windmills-craftworks', 'arbor-brewing-company', 'byg-brewski', 'geist-brewing-factory'],
    author: 'Beer Guild',
    summary: 'Bengaluru earned its title as the Pub Capital with pioneering Belgian wits, tropical NEIPAs, and open-air leafy amphitheaters.'
  },
  {
    id: 'story-specialty-cafes',
    title: 'Third-Wave Coffee & Work Sanctuaries',
    subtitle: 'Where great roasts meet creator studios & quiet corners',
    tag: 'Work & Coffee',
    readTime: '3 min read',
    coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    restaurantIds: ['araku-coffee', 'paper-and-pie-indiranagar', 'the-craftery-by-subko', 'nerlu-cafe-crescent-road'],
    author: 'Workspace Radar',
    summary: 'Our handpicked cafes with single-origin beans, natural lighting, high-speed WiFi, and peaceful work spots.'
  }
];
