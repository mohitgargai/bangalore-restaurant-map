const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = process.env.GOOGLE_PLACES_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

if (!API_KEY) {
  console.error('Error: GOOGLE_PLACES_API_KEY environment variable is required.');
  console.error('Usage: GOOGLE_PLACES_API_KEY=your_key node scripts/sync_all_places_google_api_official.js');
  process.exit(1);
}

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

async function run() {
  console.log(`Starting official Google Places API Sync for ${list.length} total restaurants...`);

  let parentSuccess = 0;
  let branchSuccess = 0;
  let missing = [];

  for (let i = 0; i < list.length; i++) {
    const r = list[i];
    
    // Construct clean search query
    let cleanAddress = (r.address || '').split(',')[0].replace(/[^\w\s]/g, '').trim();
    // Special cleaner for known institutional landmarks
    let q = `${r.name} ${cleanAddress}`;
    if (r.id === 'ironhill-bengaluru-orr') q = 'Ironhill Bengaluru Marathahalli';
    if (r.id === 'yauatcha-bengaluru-mg-road') q = 'Yauatcha 1 MG Lido Mall MG Road';
    if (r.id === 'rim-naam-the-oberoi') q = 'Rim Naam The Oberoi MG Road';
    if (r.id === 'edo-itc-gardenia') q = 'Edo Japanese Restaurant ITC Gardenia';
    if (r.id === 'jamavar-the-leela-palace') q = 'Jamavar The Leela Palace Old Airport Road';
    if (r.id === 'le-cirque-signature-leela') q = 'Le Cirque Signature The Leela Palace';
    if (r.id === 'grasshopper-bannerghatta') q = 'Grasshopper Bannerghatta Road';
    if (r.id === 'shiro-ub-city') q = 'Shiro UB City Vittal Mallya Road';
    if (r.id === 'kaze-residency-road') q = 'Kaze Bar & Kitchen Residency Road';
    if (r.id === 'nagarjuna-residency-road') q = 'Nagarjuna Restaurant Residency Road';
    if (r.id === 'samarkand-infantry-road') q = 'Samarkand Restaurant Infantry Road';
    if (r.id === 'hotel-empire-shivajinagar') q = 'Hotel Empire Central Street Shivajinagar';
    if (r.id === 'magnolia-bakery-indiranagar') q = 'Magnolia Bakery 100 Feet Road Indiranagar';
    if (r.id === 'arirang-kammanahalli') q = 'Arirang Korean Restaurant Kammanahalli';
    if (r.id === 'the-coorg-food-co') q = 'The Coorg Food Co Kalyan Nagar';
    if (r.id === 'al-amanah-cafe') q = 'Al Amanah Cafe Kammanahalli';
    if (r.id === 'the-local-kalyan-nagar') q = 'The Local HRBR Layout Kalyan Nagar';
    if (r.id === 'red-rhino-whitefield') q = 'Red Rhino Craft Brewery Whitefield';
    if (r.id === 'oota-bangalore-whitefield') q = 'Oota Bangalore Whitefield';
    if (r.id === 'whitefield-baking-company') q = 'Whitefield Baking Company Marriott Whitefield';
    if (r.id === 'byg-brewski') q = 'Byg Brewski Brewing Company Hennur';

    try {
      let res = await fetchPlace(q);
      let place = res.places?.[0];

      if (!place) {
        // Fallback search with just name + neighborhood
        res = await fetchPlace(`${r.name} ${r.neighborhood}`);
        place = res.places?.[0];
      }

      if (place && place.location) {
        list[i].lat = place.location.latitude;
        list[i].lng = place.location.longitude;
        if (place.formattedAddress) list[i].address = place.formattedAddress;
        if (place.googleMapsUri) list[i].googleMapsUrl = place.googleMapsUri;
        parentSuccess++;
        console.log(`[${i + 1}/${list.length}] ✓ ${r.name} -> ${list[i].lat}, ${list[i].lng}`);
      } else {
        console.log(`[${i + 1}/${list.length}] ❌ NOT FOUND: ${r.name} (query: ${q})`);
        missing.push(r.name);
      }
    } catch (e) {
      console.log(`[${i + 1}/${list.length}] Error on ${r.name}:`, e.message);
    }

    // Nested branches
    if (list[i].branches && list[i].branches.length > 0) {
      for (let j = 0; j < list[i].branches.length; j++) {
        const b = list[i].branches[j];
        let bq = `${r.name} ${b.name || b.neighborhood} ${b.address.split(',')[0]}`;
        if (b.id === 'byg-brewski-sarjapur-branch') bq = 'Byg Brewski Brewing Company Sarjapur Road';
        if (b.id === 'biergarten-whitefield-branch') bq = 'Biergarten Brewery Whitefield';
        if (b.id === 'lucky-chan-bellandur-branch') bq = 'Lucky Chan The Bay RMZ EcoWorld';
        if (b.id === 'lucky-chan-forum-south-branch') bq = 'Lucky Chan Forum South Bengaluru';
        if (b.id === 'burma-burma-brigade-branch') bq = 'Burma Burma Forum Rex Walk Brigade Road';
        if (b.id === 'burma-burma-ecoworld-branch') bq = 'Burma Burma The Bay RMZ EcoWorld';

        try {
          let bRes = await fetchPlace(bq);
          let bPlace = bRes.places?.[0];
          if (!bPlace) {
            bRes = await fetchPlace(`${r.name} ${b.name || b.neighborhood}`);
            bPlace = bRes.places?.[0];
          }

          if (bPlace && bPlace.location) {
            list[i].branches[j].lat = bPlace.location.latitude;
            list[i].branches[j].lng = bPlace.location.longitude;
            if (bPlace.formattedAddress) list[i].branches[j].address = bPlace.formattedAddress;
            if (bPlace.googleMapsUri) list[i].branches[j].googleMapsUrl = bPlace.googleMapsUri;
            branchSuccess++;
            console.log(`     ↳ Branch ✓ ${b.name || b.neighborhood} -> ${bPlace.location.latitude}, ${bPlace.location.longitude}`);
          } else {
            console.log(`     ↳ Branch ❌ NOT FOUND: ${b.name || b.neighborhood}`);
          }
        } catch (be) {
          console.log(`     ↳ Branch error:`, be.message);
        }
      }
    }

    await new Promise(r => setTimeout(r, 40));
  }

  const updatedCode = `import { Restaurant } from '@/types';\n\nexport const INITIAL_RESTAURANTS: Restaurant[] = ${JSON.stringify(list, null, 2)};\n`;
  fs.writeFileSync(restaurantsPath, updatedCode, 'utf8');

  console.log(`\n======================================================`);
  console.log(`🎉 OFFICIAL GOOGLE PLACES API SYNC COMPLETE!`);
  console.log(`✓ Synchronized ${parentSuccess} / ${list.length} parent venues`);
  console.log(`✓ Synchronized ${branchSuccess} branch locations`);
  console.log(`❌ Missing count: ${missing.length}`);
  if (missing.length > 0) console.log('Missing list:', missing);
  console.log(`======================================================`);
}

run().catch(console.error);
