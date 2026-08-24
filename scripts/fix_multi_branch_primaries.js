const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = 'AIzaSyBZzXAYObiQYcICqtlFjRlACZXnGgsFrF4';

const restaurantsPath = path.join(__dirname, '../src/data/restaurants.ts');
const code = fs.readFileSync(restaurantsPath, 'utf8');
const eqIdx = code.indexOf('= [');
const jsonStr = code.slice(eqIdx + 2, code.lastIndexOf(']') + 1);
let list = JSON.parse(jsonStr);

function fetchPlace(query) {
  const payload = JSON.stringify({
    textQuery: query + ', Bengaluru, Karnataka, India'
  });

  const options = {
    hostname: 'places.googleapis.com',
    port: 443,
    path: '/v1/places:searchText',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.googleMapsUri,places.businessStatus'
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// Explicit street-specific queries for chain/multi-branch flagships
const SPECIFIC_PRIMARY_QUERIES = {
  'brik-oven-church-street': 'Brik Oven Church Street Ashok Nagar',
  'samarkand-infantry-road': 'Samarkand Restaurant Gem Plaza Infantry Road',
  'bologna-indiranagar': 'Bologna Italian Ristorante 100 Feet Road Indiranagar',
  'lucky-chan': 'Lucky Chan 12th Main Road Indiranagar',
  'beanlore-coffee': 'Beanlore Coffee Roasters CMH Road Indiranagar',
  'corner-house-residency-road': 'Corner House Ice Cream Residency Road',
  'glens-bakehouse-lavelle-road': 'Glens Bakehouse Lavelle Road',
  'bobs-bar-indiranagar': 'Bobs Bar 100 Feet Road Indiranagar',
  'amadora-gourmet-ice-cream': 'Amadora Gourmet Ice Cream 12th Main Indiranagar',
  'araku-coffee-flagship': 'Araku Coffee 12th Main Road Indiranagar',
  'the-pizza-bakery': 'The Pizza Bakery 12th Main Road Indiranagar',
  'chulha-chouki-da-dhaba': 'Chulha Chauki Da Dhaba HRBR Layout Kalyan Nagar',
  'hotel-empire': 'Hotel Empire Central Street Shivajinagar',
  'nagarjuna': 'Nagarjuna Restaurant Residency Road',
  'biergarten': 'Biergarten Brewery Bellandur Outer Ring Road'
};

async function run() {
  console.log('Fixing flagship locations with street-specific Place queries...');

  for (const [id, q] of Object.entries(SPECIFIC_PRIMARY_QUERIES)) {
    const idx = list.findIndex(r => r.id === id);
    if (idx !== -1) {
      const res = await fetchPlace(q);
      const place = res.places?.[0];
      if (place && place.location) {
        list[idx].lat = place.location.latitude;
        list[idx].lng = place.location.longitude;
        if (place.formattedAddress) list[idx].address = place.formattedAddress;
        if (place.googleMapsUri) list[idx].googleMapsUrl = place.googleMapsUri;
        console.log(`✓ ${list[idx].name} -> ${list[idx].lat}, ${list[idx].lng} (${list[idx].address})`);
      } else {
        console.log(`❌ Failed on ${id}: ${q}`);
      }
    }
  }

  const updatedCode = `import { Restaurant } from '@/types';\n\nexport const INITIAL_RESTAURANTS: Restaurant[] = ${JSON.stringify(list, null, 2)};\n`;
  fs.writeFileSync(restaurantsPath, updatedCode, 'utf8');
  console.log('\nMaster dataset updated with street-accurate flagship coordinates!');
}

run().catch(console.error);
