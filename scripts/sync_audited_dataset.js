const fs = require('fs');
const path = require('path');

const restaurantsPath = path.join(__dirname, '../src/data/restaurants.ts');
const code = fs.readFileSync(restaurantsPath, 'utf8');
const eqIdx = code.indexOf('= [');
const jsonStr = code.slice(eqIdx + 2, code.lastIndexOf(']') + 1);
let list = JSON.parse(jsonStr);

const auditResults = JSON.parse(fs.readFileSync('audit_results.json', 'utf8'));
const auditMap = {};
auditResults.forEach(r => { auditMap[r.id] = r; });

// 1. IDs to remove (Verified Closed on Google Maps)
const closedIds = new Set([
  'toast-and-tonic-richmond',
  'pecos-classic-rest-house-road',
  'new-krishna-bhavan-malleshwaram',
  'aurum-brew-works-sarjapur',
  'brewklyn-microbrewery-cmr',
  'the-druid-garden-sahakar-nagar',
  'brik-oven-sarjapur'
]);

console.log(`Removing ${closedIds.size} closed spots...`);
list = list.filter(r => !closedIds.has(r.id));

// 2. Sync exact verified coordinates and URLs from Google Maps for active spots
let syncCount = 0;
list = list.map(r => {
  const audit = auditMap[r.id];
  if (audit && !audit.isClosed) {
    syncCount++;
    return {
      ...r,
      lat: audit.resolvedLat || r.lat,
      lng: audit.resolvedLng || r.lng,
      googleMapsUrl: audit.resolvedUrl || r.googleMapsUrl
    };
  }
  return r;
});
console.log(`Synchronized coordinates from live Google Maps for ${syncCount} restaurants.`);

// 3. Add verified open replacements
const replacements = [
  {
    id: 'the-local-kalyan-nagar',
    name: 'The Local',
    slug: 'the-local-kalyan-nagar',
    tagline: 'Kalyan Nagar’s legendary neighborhood pub where classic rock meets fiery coastal ghee roasts',
    description: 'The quintessential Bangalore neighborhood watering hole in HRBR Layout. Unapologetically casual, wood-accented, and soundtracked by 80s/90s classic rock, famous for cold draft beer on tap and exceptionally spicy Mangalorean ghee roasts.',
    category: 'Microbrewery',
    neighborhood: 'Kalyan Nagar & Kammanahalli',
    address: '2075, 4th Cross, 6th Main Rd, HRBR Layout 2nd Block, Kalyan Nagar, Bengaluru, Karnataka 560043',
    lat: 13.0198,
    lng: 77.6472,
    priceLevel: '₹₹',
    priceForTwo: '₹1,400',
    mustTry: [
      'Mangalore Chicken / Paneer Ghee Roast with Hot Appams',
      'Coorg Style Pork Fry',
      'Spicy Buffalo Wings & Bacon Sausages',
      'Chilled Draft Beer Pints'
    ],
    vibeTags: ['Craft Beer', 'Outdoor Seating', 'Pocket Friendly', 'Late Night'],
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://www.google.com/maps/place/The+Local/@13.0198,77.6472,17z',
    timings: '11:00 AM – 11:30 PM',
    curatorNote: 'Preserves the authentic, soulful identity of old Bangalore pub culture: great music, unpretentious hospitality, and phenomenal, fiery coastal bar bites.',
    isVegetarian: false,
    verified: true
  },
  {
    id: 'vapour-sarjapur-road',
    name: 'Vapour Brewpub & Diner',
    slug: 'vapour-sarjapur-road',
    tagline: 'Panoramic 7th-floor rooftop microbrewery with sunset views & fresh house craft ales',
    description: 'Perched on the 7th floor of Bren Mercury overlooking Sarjapur Road, Vapour provides unobstructed skyline views, a breezy sunset alfresco deck, and fresh house craft brews paired with global pub favorites.',
    category: 'Microbrewery',
    neighborhood: 'Sarjapur Road',
    address: '7th Floor, Bren Mercury, Kaikondrahalli Junction, Sarjapur Main Rd, Bengaluru, Karnataka 560035',
    lat: 12.9172,
    lng: 77.6763,
    priceLevel: '₹₹₹',
    priceForTwo: '₹1,900',
    mustTry: [
      'Vapour Premium Basmati Blonde & Belgian Wheat',
      'Peri Peri Chicken Skewers',
      'Crispy Water Chestnut Pepper Salt',
      'Wood-Fired Thin Crust Pizza'
    ],
    vibeTags: ['Craft Beer', 'Rooftop', 'Outdoor Seating', 'Cocktail Program'],
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://www.google.com/maps/place/Vapour+Brewpub+and+Diner/@12.9172,77.6763,17z',
    timings: '12:00 PM – 1:00 AM',
    curatorNote: 'The premier high-altitude rooftop brewpub on Sarjapur Road. Ideal for golden hour beers when the Bangalore breeze kicks in.',
    isVegetarian: false,
    verified: true
  },
  {
    id: 'pecos-stones-indiranagar',
    name: 'Pecos Stones',
    slug: 'pecos-stones-indiranagar',
    tagline: 'The 1989 classic rock retro pub legend with cold draft mugs & fiery chilli pork',
    description: 'Bangalore’s timeless retro rock sanctuary on 100 Feet Road. Preserves the authentic 1980s Pecos DNA with wood-paneled rock posters, classic vinyl playlists, chilled draft beer, and signature South Indian chilli pork.',
    category: 'Microbrewery',
    neighborhood: 'Indiranagar',
    address: '765, 1st Floor, 100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
    lat: 12.9782,
    lng: 77.6408,
    priceLevel: '₹₹',
    priceForTwo: '₹1,200',
    mustTry: [
      'Chilled Draft Beer Mugs',
      'Signature Coorg Chilli Pork',
      'Beef Dosa / Chilli Beef',
      'Crispy Bacon Wrapped Sausages'
    ],
    vibeTags: ['Craft Beer', 'Pocket Friendly', 'Heritage (Pre-1980)'],
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://www.google.com/maps/place/Pecos+Stones+2.0/@12.9782,77.6408,17z',
    timings: '11:00 AM – 11:30 PM',
    curatorNote: 'The ultimate Bangalore rock pub institution. Nothing beats a cold mug of draft beer with spicy chilli pork while listening to Led Zeppelin.',
    isVegetarian: false,
    verified: true
  }
];

const existingIds = new Set(list.map(r => r.id));
replacements.forEach(r => {
  if (!existingIds.has(r.id)) {
    list.push(r);
  }
});

// Explicit fix for VV Puram Food Street pins
list = list.map(r => {
  if (r.id === 'shri-vasavi-condiments-vv-puram') {
    return {
      ...r,
      address: 'Sajjan Rao Circle, Food Street (Thindi Beedi), VV Puram, Basavanagudi, Bengaluru, Karnataka 560004',
      lat: 12.9518,
      lng: 77.5775,
      googleMapsUrl: 'https://www.google.com/maps/place/Shri+Vasavi+Condiments/@12.9518,77.5775,17z'
    };
  }
  if (r.id === 'shivanna-gulkand-center-vv-puram') {
    return {
      ...r,
      address: '128/1, Food Street (Thindi Beedi), VV Puram, Basavanagudi, Bengaluru, Karnataka 560004',
      lat: 12.9524,
      lng: 77.5781,
      googleMapsUrl: 'https://www.google.com/maps/place/Shivanna+Gulkand+Center/@12.9524,77.5781,17z'
    };
  }
  return r;
});

const updatedCode = `import { Restaurant } from '@/types';\n\nexport const INITIAL_RESTAURANTS: Restaurant[] = ${JSON.stringify(list, null, 2)};\n`;
fs.writeFileSync(restaurantsPath, updatedCode, 'utf8');

console.log(`✓ Master dataset synchronized! Total verified active spots: ${list.length}`);

const hoods = {};
list.forEach(r => { hoods[r.neighborhood] = (hoods[r.neighborhood] || 0) + 1; });
console.log('\nFinal Distribution by Neighborhood:');
console.log(hoods);
