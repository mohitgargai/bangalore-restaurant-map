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
 * Resolves the active location representation (primary vs matching branch)
 * when filtering by a specific neighborhood.
 */
export interface ResolvedLocation {
  restaurant: Restaurant;
  parentRestaurant: Restaurant;
  branchId: string | null;
  neighborhood: string;
  address: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
  branchLabel: string | null;
  resolvedRestaurant: Restaurant;
}

export function resolveLocationForDisplay(
  restaurant: Restaurant,
  selectedNeighborhood?: string
): ResolvedLocation {
  if (!selectedNeighborhood || selectedNeighborhood === 'All' || restaurant.neighborhood === selectedNeighborhood) {
    return {
      restaurant,
      parentRestaurant: restaurant,
      branchId: null,
      neighborhood: restaurant.neighborhood,
      address: restaurant.address,
      lat: restaurant.lat,
      lng: restaurant.lng,
      googleMapsUrl: restaurant.googleMapsUrl,
      branchLabel: null,
      resolvedRestaurant: restaurant,
    };
  }

  const matchingBranch = restaurant.branches?.find((b) => b.neighborhood === selectedNeighborhood);
  if (matchingBranch) {
    const resolved: Restaurant = {
      ...restaurant,
      neighborhood: matchingBranch.neighborhood,
      address: matchingBranch.address,
      lat: matchingBranch.lat,
      lng: matchingBranch.lng,
      googleMapsUrl: matchingBranch.googleMapsUrl || restaurant.googleMapsUrl,
    };
    return {
      restaurant,
      parentRestaurant: restaurant,
      branchId: matchingBranch.id,
      neighborhood: matchingBranch.neighborhood,
      address: matchingBranch.address,
      lat: matchingBranch.lat,
      lng: matchingBranch.lng,
      googleMapsUrl: matchingBranch.googleMapsUrl || restaurant.googleMapsUrl,
      branchLabel: matchingBranch.name || `${matchingBranch.neighborhood} Branch`,
      resolvedRestaurant: resolved,
    };
  }

  return {
    restaurant,
    parentRestaurant: restaurant,
    branchId: null,
    neighborhood: restaurant.neighborhood,
    address: restaurant.address,
    lat: restaurant.lat,
    lng: restaurant.lng,
    googleMapsUrl: restaurant.googleMapsUrl,
    branchLabel: null,
    resolvedRestaurant: restaurant,
  };
}

/**
 * Returns a direct turn-by-turn navigation URL to the exact named venue and verified street address.
 */
export function getGoogleMapsDirectionsUrl(restaurant: Restaurant, branch?: Branch): string {
  const targetName = branch?.name ? `${restaurant.name} ${branch.name}` : restaurant.name;
  const targetAddress = branch ? branch.address : restaurant.address;
  const cleanName = targetName.replace(/\s*\([^)]*\)/g, '').trim();

  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${cleanName}, ${targetAddress}`
  )}`;
}



