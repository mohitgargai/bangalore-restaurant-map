const fs = require('fs');
const path = require('path');

const restaurantsPath = path.join(__dirname, '../src/data/restaurants.ts');
const code = fs.readFileSync(restaurantsPath, 'utf8');
const eqIdx = code.indexOf('= [');
const jsonStr = code.slice(eqIdx + 2, code.lastIndexOf(']') + 1);
let list = JSON.parse(jsonStr);

// 1. Fix neighborhood misallocations
list = list.map(r => {
  if (r.id === 'lucky-chan-bellandur') {
    return { ...r, neighborhood: 'Bellandur & Ecoworld' };
  }
  if (r.id === 'albert-bakery-frazer-town' || r.id === 'thoms-bakery-frazer-town') {
    return { ...r, neighborhood: 'CBD & Central' };
  }
  return r;
});

// 2. Add Byg Brewski Sarjapur and Brik Oven Sarjapur if not present
const existingIds = new Set(list.map(r => r.id));

const additionalSarjapurSpots = [
  {
    id: 'byg-brewski-sarjapur',
    name: 'Byg Brewski Brewing Company',
    slug: 'byg-brewski-sarjapur',
    tagline: 'The iconic open-air amphitheater microbrewery wrapped around a central koi pond',
    description: 'The Sarjapur flagship that pioneered Bangalore’s mega-brewery amphitheater culture. Features tiered multi-level seating surrounding a serene koi pond, mist systems, award-winning craft beers, and fiery coastal ghee roasts.',
    category: 'Microbrewery',
    neighborhood: 'Sarjapur Road',
    address: '10/62/2A/2 & 3, Behind MK Retail, Before Wipro Corporate Office, Sarjapur Main Rd, Kaikondrahalli, Bengaluru, Karnataka 560035',
    lat: 12.9134,
    lng: 77.6836,
    priceLevel: '₹₹₹',
    priceForTwo: '₹2,400',
    mustTry: [
      'Byg Rauchbier (Smoked Malt Ale)',
      'Byg Hefeweizen & Belgian Wit',
      'Giant Karari Roti with Spiced Ghee',
      'Kundapura Ghee Roast Mutton',
      'Wood-Fired Smoked Duck Pizza'
    ],
    vibeTags: ['Craft Beer', 'Outdoor Seating', 'Romantic', 'Pet Friendly', 'Late Night'],
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80',
    googleMapsUrl: 'https://www.google.com/maps/place/Byg+Brewski+Brewing+Company+-+Sarjapur/@12.9134,77.6836,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae14878a9c4021:0x4d59a2a9ca173200!8m2!3d12.9134!4d77.6836!16s%2Fg%2F11b6_c8d20',
    timings: '12:00 PM – 1:00 AM',
    curatorNote: 'The amphitheater koi pond setting remains an architectural marvel. The smoke-infused craft beer and coastal ghee roast dishes are consistently exceptional.',
    isVegetarian: false,
    verified: true
  },
  {
    id: 'brik-oven-sarjapur',
    name: 'Brik Oven',
    slug: 'brik-oven-sarjapur',
    tagline: 'Wood-fired 48-hour fermented sourdough Neapolitan pizza on the cobblestone promenade',
    description: 'Located in the open-air European street promenade of Street 1522 in Carmelaram off Sarjapur Road. Hand-stretched sourdough crusts blistered at 900°F with imported San Marzano tomatoes and artisanal burrata.',
    category: 'Modern Indian & Dining',
    neighborhood: 'Sarjapur Road',
    address: 'Street 1522, Carmelaram Rd, Near Sarjapur Main Rd, Chikkakannalli, Bengaluru, Karnataka 562130',
    lat: 12.9025,
    lng: 77.7015,
    priceLevel: '₹₹',
    priceForTwo: '₹1,500',
    mustTry: [
      'The Bird (Smoked Chicken & Bird\'s Eye Chili)',
      'Truffle Quattro Formaggi Sourdough Pizza',
      'Artisanal Burrata Caprese',
      'Handcrafted Gelato & Waffles'
    ],
    vibeTags: ['Artisanal Sourdough', 'Outdoor Seating', 'Romantic'],
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80',
    googleMapsUrl: 'https://www.google.com/maps/place/Street+1522+Carmelaram/@12.9025,77.7015,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae139265f24259:0x89c4d96a7989eb20!8m2!3d12.9025!4d77.7015!16s%2Fg%2F11t7l6z7m9',
    timings: '12:00 PM – 11:30 PM',
    curatorNote: 'Brings genuine Neapolitan high-hydration sourdough fermentation and fresh fior di latte to the Sarjapur/Carmelaram residential corridor.',
    isVegetarian: false,
    verified: true
  }
];

additionalSarjapurSpots.forEach(s => {
  if (!existingIds.has(s.id)) {
    list.push(s);
  }
});

const updatedCode = `import { Restaurant } from '@/types';\n\nexport const INITIAL_RESTAURANTS: Restaurant[] = ${JSON.stringify(list, null, 2)};\n`;
fs.writeFileSync(restaurantsPath, updatedCode, 'utf8');

console.log('✓ Master dataset refined! Total spots:', list.length);

const hoods = {};
list.forEach(r => { hoods[r.neighborhood] = (hoods[r.neighborhood] || 0) + 1; });
console.log('\nFinal Distribution by Neighborhood:');
console.log(hoods);
