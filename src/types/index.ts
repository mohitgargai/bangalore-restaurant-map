export type Category =
  | 'Iconic Heritage'
  | 'Microbrewery'
  | 'Specialty Coffee & Cafe'
  | 'Pan-Asian & Japanese'
  | 'Bakeries & Desserts'
  | 'Cocktails & Rooftops'
  | 'Regional & Coastal'
  | 'Modern Indian & Dining'
  | 'Street Food & Chaat';

export const ALL_CATEGORIES: Category[] = [
  'Iconic Heritage',
  'Specialty Coffee & Cafe',
  'Microbrewery',
  'Pan-Asian & Japanese',
  'Bakeries & Desserts',
  'Cocktails & Rooftops',
  'Regional & Coastal',
  'Modern Indian & Dining',
  'Street Food & Chaat',
];

export type Neighborhood =
  | 'Indiranagar'
  | 'Koramangala'
  | 'Church Street & MG Road'
  | 'Lavelle Road'
  | 'Malleshwaram'
  | 'Basavanagudi'
  | 'HSR Layout'
  | 'Whitefield'
  | 'JP Nagar'
  | 'Jayanagar'
  | 'CBD & Central'
  | 'Sadashivanagar & Palace Grounds'
  | 'Sarjapur Road'
  | 'Bel Road & North BLR';

export const ALL_NEIGHBORHOODS: Neighborhood[] = [
  'Indiranagar',
  'Koramangala',
  'Church Street & MG Road',
  'Lavelle Road',
  'Malleshwaram',
  'Basavanagudi',
  'HSR Layout',
  'Whitefield',
  'JP Nagar',
  'Jayanagar',
  'CBD & Central',
  'Sadashivanagar & Palace Grounds',
  'Sarjapur Road',
  'Bel Road & North BLR',
];

export type PriceLevel = '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹';
export const ALL_PRICE_LEVELS: PriceLevel[] = ['₹', '₹₹', '₹₹₹', '₹₹₹₹'];

export type VibeTag =
  | 'Work Friendly'
  | 'Pet Friendly'
  | 'Outdoor Seating'
  | 'Rooftop'
  | 'Romantic'
  | 'Late Night'
  | 'Pure Veg'
  | 'Craft Beer'
  | 'Filter Coffee Spot'
  | 'Artisanal Sourdough'
  | 'Pocket Friendly'
  | 'Cocktail Program'
  | 'Heritage (Pre-1980)'
  | 'Breakfast Spot'
  | 'Live Music / Vinyl';

export const ALL_VIBE_TAGS: VibeTag[] = [
  'Work Friendly',
  'Pet Friendly',
  'Outdoor Seating',
  'Rooftop',
  'Romantic',
  'Late Night',
  'Pure Veg',
  'Craft Beer',
  'Filter Coffee Spot',
  'Artisanal Sourdough',
  'Pocket Friendly',
  'Cocktail Program',
  'Heritage (Pre-1980)',
  'Breakfast Spot',
  'Live Music / Vinyl',
];

export interface Branch {
  id: string;
  name?: string;
  neighborhood: Neighborhood;
  address: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
  timings?: string;
  isFlagship?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: Category;
  neighborhood: Neighborhood;
  address: string;
  lat: number;
  lng: number;
  priceLevel: PriceLevel;
  priceForTwo: string;
  mustTry: string[];
  vibeTags: VibeTag[];
  imageUrl: string;
  googleMapsUrl: string;
  instagramUrl?: string;
  websiteUrl?: string;
  timings: string;
  curatorNote?: string;
  isVegetarian?: boolean;
  verified: boolean;
  branches?: Branch[];
  submittedBy?: string;
  submittedAt?: string;
}

export interface SubmissionForm {
  name: string;
  category: Category;
  neighborhood: Neighborhood;
  address: string;
  lat?: number;
  lng?: number;
  priceLevel: PriceLevel;
  priceForTwo: string;
  mustTry: string;
  vibeTags: VibeTag[];
  imageUrl?: string;
  googleMapsUrl: string;
  curatorNote?: string;
  submittedBy?: string;
}

export interface FoodStory {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  readTime: string;
  coverImage: string;
  restaurantIds: string[];
  author: string;
  summary: string;
}
