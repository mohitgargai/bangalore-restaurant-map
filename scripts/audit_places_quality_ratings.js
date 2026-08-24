const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = process.env.GOOGLE_PLACES_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

if (!API_KEY) {
  console.error('Error: GOOGLE_PLACES_API_KEY environment variable is required.');
  console.error('Usage: GOOGLE_PLACES_API_KEY=your_key node scripts/audit_places_quality_ratings.js');
  process.exit(1);
}

const restaurantsPath = path.join(__dirname, '../src/data/restaurants.ts');
const code = fs.readFileSync(restaurantsPath, 'utf8');
const eqIdx = code.indexOf('= [');
const jsonStr = code.slice(eqIdx + 2, code.lastIndexOf(']') + 1);
const list = JSON.parse(jsonStr);

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
      'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.googleMapsUri,places.businessStatus,places.rating,places.userRatingCount'
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

async function run() {
  console.log(`Auditing all ${list.length} restaurants for ratings, operational status and quality flags...\n`);

  const results = [];

  for (let i = 0; i < list.length; i++) {
    const r = list[i];
    let q = `${r.name} ${r.address.split(',')[0]}`;
    if (r.id === 'ironhill-bengaluru-orr') q = 'Ironhill Bengaluru Marathahalli';
    if (r.id === 'the-rameshwaram-cafe-indiranagar') q = 'The Rameshwaram Cafe 100 Feet Road Indiranagar';
    
    try {
      const res = await fetchPlace(q);
      const p = res.places?.[0];
      const rating = p?.rating || 0;
      const reviewCount = p?.userRatingCount || 0;
      const status = p?.businessStatus || 'UNKNOWN';

      results.push({
        id: r.id,
        name: r.name,
        neighborhood: r.neighborhood,
        category: r.category,
        rating,
        reviewCount,
        status,
        address: r.address
      });
    } catch (e) {
      results.push({
        id: r.id,
        name: r.name,
        neighborhood: r.neighborhood,
        category: r.category,
        rating: 0,
        reviewCount: 0,
        status: 'ERROR',
        address: r.address
      });
    }

    await new Promise(r => setTimeout(r, 40));
  }

  // Sort by rating ascending to find lowest rated or degraded spots
  results.sort((a, b) => a.rating - b.rating);

  console.log('=== LOWEST RATED & POTENTIALLY BELOW-PAR SPOTS (Rating < 4.2) ===');
  results.filter(r => r.rating < 4.2 && r.rating > 0).forEach(r => {
    console.log(`⚠️ ${r.rating}★ (${r.reviewCount} reviews) - ${r.name} [${r.neighborhood} / ${r.category}]`);
  });

  console.log('\n=== CLOSED OR UNKNOWN STATUS ===');
  results.filter(r => r.status !== 'OPERATIONAL').forEach(r => {
    console.log(`❌ [${r.status}] ${r.name} [${r.neighborhood}]`);
  });

  fs.writeFileSync('quality_audit_ratings.json', JSON.stringify(results, null, 2), 'utf8');
}

run().catch(console.error);
