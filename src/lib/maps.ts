import { Restaurant } from '@/types';

/**
 * Returns a bulletproof official Google Maps place search URL
 * that reliably opens the place page on desktop and mobile.
 */
export function getGoogleMapsPlaceUrl(restaurant: Restaurant): string {
  const cleanName = restaurant.name.replace(/\s*\([^)]*\)/g, '').trim();
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${cleanName}, ${restaurant.address}`
  )}`;
}

/**
 * Returns a direct turn-by-turn navigation URL to the exact coordinates.
 */
export function getGoogleMapsDirectionsUrl(restaurant: Restaurant): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${restaurant.lat},${restaurant.lng}`;
}
