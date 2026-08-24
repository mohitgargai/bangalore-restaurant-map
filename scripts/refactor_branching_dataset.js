const fs = require('fs');
const path = require('path');

const restaurantsPath = path.join(__dirname, '../src/data/restaurants.ts');
const code = fs.readFileSync(restaurantsPath, 'utf8');
const eqIdx = code.indexOf('= [');
const jsonStr = code.slice(eqIdx + 2, code.lastIndexOf(']') + 1);
let list = JSON.parse(jsonStr);

console.log('Original count:', list.length);

// 1. Consolidate Multi-Branch Duplicate Entries into Single Entities
// Duplicate IDs to remove because they are now nested as branches under the primary entity:
const duplicateIdsToRemove = new Set([
  'lucky-chan-bellandur',
  'burma-burma-ecoworld',
  'beanlore-coffee-roasters-hsr',
  'biergarten-whitefield',
  'byg-brewski-sarjapur'
]);

list = list.filter(r => !duplicateIdsToRemove.has(r.id));

// 2. Clean entity names and configure rich branches
list = list.map(r => {
  // Lucky Chan
  if (r.id === 'lucky-chan-indiranagar' || r.id === 'lucky-chan') {
    return {
      ...r,
      id: 'lucky-chan',
      name: 'Lucky Chan',
      slug: 'lucky-chan',
      neighborhood: 'Indiranagar',
      address: '594, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
      branches: [
        {
          id: 'lucky-chan-bellandur-branch',
          name: 'The Bay, RMZ EcoWorld',
          neighborhood: 'Bellandur & Ecoworld',
          address: 'The Bay, Campus 8A, RMZ EcoWorld, Outer Ring Road, Bellandur, Bengaluru 560103',
          lat: 12.9248,
          lng: 77.6845,
          googleMapsUrl: 'https://www.google.com/maps/place/Lucky+Chan+-+DimSum+%26+Sushi+Parlour/@12.9248,77.6845,17z'
        },
        {
          id: 'lucky-chan-forum-south-branch',
          name: 'Forum South Bengaluru',
          neighborhood: 'JP Nagar',
          address: '3rd Floor, Forum South Bengaluru, Konanakunte Cross, Kanakapura Rd, Bengaluru 560062',
          lat: 12.8878,
          lng: 77.5539,
          googleMapsUrl: 'https://www.google.com/maps/place/Forum+South+Bengaluru/@12.8878,77.5539,17z'
        }
      ]
    };
  }

  // Burma Burma
  if (r.id === 'burma-burma' || r.id === 'burma-burma-indiranagar') {
    return {
      ...r,
      id: 'burma-burma',
      name: 'Burma Burma',
      slug: 'burma-burma',
      neighborhood: 'Indiranagar',
      address: '607, 12th Main Rd, 7th Cross, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
      branches: [
        {
          id: 'burma-burma-brigade-branch',
          name: 'Forum Rex Walk, Brigade Road',
          neighborhood: 'Church Street & MG Road',
          address: 'Forum Rex Walk, Brigade Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025',
          lat: 12.9734188,
          lng: 77.6074218,
          googleMapsUrl: 'https://www.google.com/maps/place/Burma+Burma+Restaurant+%26+Tea+Room+-+Rex+Walk/@12.9734188,77.6074218,17z'
        },
        {
          id: 'burma-burma-ecoworld-branch',
          name: 'The Bay, RMZ EcoWorld',
          neighborhood: 'Bellandur & Ecoworld',
          address: 'The Bay, Campus 8A, RMZ EcoWorld, Outer Ring Road, Bellandur, Bengaluru 560103',
          lat: 12.920167,
          lng: 77.6848395,
          googleMapsUrl: 'https://www.google.com/maps/place/Burma+Burma+Restaurant+%26+Tea+Room+-+RMZ+EcoWorld/@12.920167,77.6848395,17z'
        }
      ]
    };
  }

  // Beanlore Coffee Roasters
  if (r.id === 'beanlore-coffee-indiranagar' || r.id === 'beanlore-coffee') {
    return {
      ...r,
      id: 'beanlore-coffee',
      name: 'Beanlore Coffee Roasters',
      slug: 'beanlore-coffee',
      neighborhood: 'Indiranagar',
      address: '813, 1st Floor, Chinmaya Mission Hospital Rd, Defence Colony, Indiranagar, Bengaluru, Karnataka 560038',
      branches: [
        {
          id: 'beanlore-hsr-branch',
          name: 'Sector 4, HSR Layout',
          neighborhood: 'HSR Layout',
          address: '17th Cross Rd, Sector 4, HSR Layout, Bengaluru, Karnataka 560102',
          lat: 12.9123126,
          lng: 77.6416021,
          googleMapsUrl: 'https://www.google.com/maps/place/Beanlore+Coffee+Roasters/@12.9123126,77.6416021,17z'
        }
      ]
    };
  }

  // Biergarten Brewery & Kitchen
  if (r.id === 'biergarten-bellandur' || r.id === 'biergarten') {
    return {
      ...r,
      id: 'biergarten',
      name: 'Biergarten Brewery & Kitchen',
      slug: 'biergarten',
      neighborhood: 'Bellandur & Ecoworld',
      address: '4th Floor, Soul Space Paradigm, Outer Ring Road, Marathahalli - Sarjapur Outer Ring Rd, Devarabeesanahalli, Bellandur, Bengaluru 560103',
      branches: [
        {
          id: 'biergarten-whitefield-branch',
          name: 'Doddanekkundi, Whitefield',
          neighborhood: 'Whitefield',
          address: 'Doddanekkundi Industrial Area, Mahadevapura, Bengaluru, Karnataka 560048',
          lat: 12.9825,
          lng: 77.7128,
          googleMapsUrl: 'https://www.google.com/maps/place/Biergarten+Brewery+%26+Kitchen+Whitefield/@12.9825,77.7128,17z'
        }
      ]
    };
  }

  // Byg Brewski Brewing Company
  if (r.id === 'byg-brewski-hennur' || r.id === 'byg-brewski') {
    return {
      ...r,
      id: 'byg-brewski',
      name: 'Byg Brewski Brewing Company',
      slug: 'byg-brewski',
      neighborhood: 'Bel Road & North BLR',
      address: 'Survey No. 22 & 125, Byrathi Village, Hennur Bagalur Rd, Visthar, Bengaluru, Karnataka 560077',
      branches: [
        {
          id: 'byg-brewski-sarjapur-branch',
          name: 'Sarjapur Road',
          neighborhood: 'Sarjapur Road',
          address: '10/62/2A/2 & 3, Behind MK Retail, Before Wipro Corporate Office, Sarjapur Main Rd, Kaikondrahalli, Bengaluru 560035',
          lat: 12.9134,
          lng: 77.6836,
          googleMapsUrl: 'https://www.google.com/maps/place/Byg+Brewski+Brewing+Company+-+Sarjapur/@12.9134,77.6836,17z'
        }
      ]
    };
  }

  // The Pizza Bakery
  if (r.id === 'the-pizza-bakery-indiranagar' || r.id === 'the-pizza-bakery') {
    return {
      ...r,
      id: 'the-pizza-bakery',
      name: 'The Pizza Bakery',
      slug: 'the-pizza-bakery',
      neighborhood: 'Indiranagar',
      address: '2985, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
      branches: [
        {
          id: 'the-pizza-bakery-church-street-branch',
          name: 'Church Street',
          neighborhood: 'Church Street & MG Road',
          address: '86, Coconut Grove, Church Street, Ashok Nagar, Bengaluru, Karnataka 560001',
          lat: 12.9749557,
          lng: 77.6053303,
          googleMapsUrl: 'https://www.google.com/maps/place/The+Pizza+Bakery/@12.9749557,77.6053303,17z'
        },
        {
          id: 'the-pizza-bakery-hsr-branch',
          name: 'Sector 1, HSR Layout',
          neighborhood: 'HSR Layout',
          address: 'No. 2345, 17th Cross Rd, Sector 1, HSR Layout, Bengaluru, Karnataka 560102',
          lat: 12.9170,
          lng: 77.6508,
          googleMapsUrl: 'https://www.google.com/maps/place/The+Pizza+Bakery/@12.9170,77.6508,17z'
        }
      ]
    };
  }

  // Pecos
  if (r.id === 'pecos-stones-indiranagar' || r.id === 'pecos') {
    return {
      ...r,
      id: 'pecos',
      name: 'Pecos',
      slug: 'pecos',
      neighborhood: 'Indiranagar',
      address: '765, 1st Floor, 100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
      branches: [
        {
          id: 'pecos-mojo-brigade-branch',
          name: 'Pecos Mojo, Brigade Road',
          neighborhood: 'Church Street & MG Road',
          address: 'Residency Plaza, Brigade Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025',
          lat: 12.9723,
          lng: 77.6074,
          googleMapsUrl: 'https://www.google.com/maps/place/Pecos+Mojo/@12.9723,77.6074,17z'
        }
      ]
    };
  }

  // Clean titles (remove redundant parentheticals)
  let cleanName = r.name;
  if (r.id === 'ctr-shri-sagar') cleanName = 'Central Tiffin Room (CTR)';
  if (r.id === 'mavalli-tiffin-room-mtr') cleanName = 'Mavalli Tiffin Room (MTR)';
  if (r.id === 'karavalli-residency-road') cleanName = 'Karavalli';
  if (r.id === 'arbor-brewing-company-magrath') cleanName = 'Arbor Brewing Company';
  if (r.id === 'whitefield-baking-company') cleanName = 'Whitefield Baking Company';
  if (r.id === 'chulha-chouki-da-dhaba-flagship') cleanName = 'Chulha Chouki Da Dhaba';
  if (r.id === 'hotel-empire-shivajinagar') cleanName = 'Hotel Empire';
  if (r.id === 'the-rameshwaram-cafe-indiranagar') cleanName = 'The Rameshwaram Cafe';

  return {
    ...r,
    name: cleanName
  };
});

const updatedCode = `import { Restaurant } from '@/types';\n\nexport const INITIAL_RESTAURANTS: Restaurant[] = ${JSON.stringify(list, null, 2)};\n`;
fs.writeFileSync(restaurantsPath, updatedCode, 'utf8');

console.log(`✓ Master dataset refactored! Single unified entities: ${list.length}`);
