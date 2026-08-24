import { Restaurant, Branch } from '@/types';

/**
 * Returns a bulletproof official Google Maps place search URL
 * that reliably opens the place page on desktop and mobile.
 */
export function getGoogleMapsPlaceUrl(restaurant: Restaurant, branch?: Branch): string {
  if (branch?.googleMapsUrl) return branch.googleMapsUrl;
  if (restaurant.googleMapsUrl) return restaurant.googleMapsUrl;

  const targetName = branch?.name ? `${restaurant.name} ${branch.name}` : restaurant.name;
  const targetAddress = branch ? branch.address : restaurant.address;
  const cleanName = targetName.replace(/\s*\([^)]*\)/g, '').trim();

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${cleanName}, ${targetAddress}`
  )}`;
}

/**
 * Returns a direct turn-by-turn navigation URL to the exact named venue and verified street address.
 * Matching the named venue ensures Google Maps opens the registered business place card with front-door routing.
 */
export function getGoogleMapsDirectionsUrl(restaurant: Restaurant, branch?: Branch): string {
  const targetName = branch?.name ? `${restaurant.name} ${branch.name}` : restaurant.name;
  const targetAddress = branch ? branch.address : restaurant.address;
  const cleanName = targetName.replace(/\s*\([^)]*\)/g, '').trim();

  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${cleanName}, ${targetAddress}`
  )}`;
}
