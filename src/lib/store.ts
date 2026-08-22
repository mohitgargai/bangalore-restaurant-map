import { Restaurant, SubmissionForm } from '@/types';
import { INITIAL_RESTAURANTS } from '@/data/restaurants';

// Global in-memory cache for server lifecycle
let restaurantsCache: Restaurant[] = [...INITIAL_RESTAURANTS];
let submissionsQueue: (SubmissionForm & { id: string; submittedAt: string; status: 'pending' | 'approved' })[] = [];

export function getRestaurants(): Restaurant[] {
  return restaurantsCache;
}

export function getRestaurantById(id: string): Restaurant | undefined {
  return restaurantsCache.find((r) => r.id === id);
}

export function upvoteRestaurant(id: string): { success: boolean; upvotes: number } {
  const restaurant = restaurantsCache.find((r) => r.id === id);
  if (!restaurant) {
    return { success: false, upvotes: 0 };
  }
  restaurant.upvotes += 1;
  return { success: true, upvotes: restaurant.upvotes };
}

export function addSubmission(data: SubmissionForm): Restaurant {
  const newId = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36);
  
  const mustTryArray = Array.isArray(data.mustTry)
    ? data.mustTry
    : typeof data.mustTry === 'string'
    ? data.mustTry.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  const defaultImage = data.imageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80';

  const newRestaurant: Restaurant = {
    id: newId,
    name: data.name,
    slug: newId,
    tagline: data.curatorNote || `Curated spot in ${data.neighborhood}`,
    description: data.curatorNote || `Community recommended spot in ${data.neighborhood}`,
    category: data.category,
    neighborhood: data.neighborhood,
    address: data.address || `${data.neighborhood}, Bengaluru`,
    lat: data.lat || 12.9716 + (Math.random() - 0.5) * 0.04,
    lng: data.lng || 77.5946 + (Math.random() - 0.5) * 0.04,
    priceLevel: data.priceLevel || '₹₹',
    priceForTwo: data.priceForTwo || '₹600',
    mustTry: mustTryArray.length > 0 ? mustTryArray : ['Signature Special'],
    vibeTags: data.vibeTags || [],
    imageUrl: defaultImage,
    googleMapsUrl: data.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.name + ' ' + data.neighborhood + ' Bangalore')}`,
    timings: '11:00 AM – 11:00 PM',
    upvotes: 1,
    verified: false,
    curatorNote: data.curatorNote,
    submittedBy: data.submittedBy || 'Foodie Community',
    submittedAt: new Date().toISOString(),
  };

  // Add to active restaurants so submitter sees it immediately
  restaurantsCache = [newRestaurant, ...restaurantsCache];
  
  submissionsQueue.push({
    ...data,
    id: newId,
    submittedAt: new Date().toISOString(),
    status: 'approved',
  });

  return newRestaurant;
}

export function getSubmissionsQueue() {
  return submissionsQueue;
}
