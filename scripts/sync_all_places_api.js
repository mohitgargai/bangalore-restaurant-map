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
    textQuery: query + ', Bengaluru',
    maxResultCount: 1,
    locationBias: {
      circle: {
        center: { latitude: 12.9716, longitude: 77.5946 },
        radius: 35000.0
      }
    }
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
  console.log(`Starting official Google Places API (New) sync across all ${list.length} restaurants...`);
  
  let parentSuccess = 0;
  let branchSuccess = 0;
  let closedCount = 0;

  for (let i = 0; i < list.length; i++) {
    const r = list[i];
    const query = `${r.name}, ${r.address.split(',')[0]}`;
    
    try {
      const res = await fetchPlace(query);
      const place = res.places?.[0];
      if (place && place.location) {
        list[i].lat = place.location.latitude;
        list[i].lng = place.location.longitude;
        if (place.formattedAddress) list[i].address = place.formattedAddress;
        if (place.googleMapsUri) list[i].googleMapsUrl = place.googleMapsUri;

        if (place.businessStatus && place.businessStatus !== 'OPERATIONAL') {
          console.log(`  ⚠️ CLOSED WARNING: ${r.name} status is ${place.businessStatus}`);
          closedCount++;
        } else {
          parentSuccess++;
        }
        console.log(`[${i + 1}/${list.length}] ✓ ${r.name} -> ${list[i].lat}, ${list[i].lng}`);
      } else {
        console.log(`[${i + 1}/${list.length}] ❌ Place not found for: ${r.name}`);
      }
    } catch (e) {
      console.log(`[${i + 1}/${list.length}] Error on ${r.name}:`, e.message);
    }

    // Process nested branches
    if (list[i].branches && list[i].branches.length > 0) {
      for (let j = 0; j < list[i].branches.length; j++) {
        const b = list[i].branches[j];
        const bQuery = `${r.name} ${b.name || b.neighborhood}, ${b.address.split(',')[0]}`;
        try {
          const bRes = await fetchPlace(bQuery);
          const bPlace = bRes.places?.[0];
          if (bPlace && bPlace.location) {
            list[i].branches[j].lat = bPlace.location.latitude;
            list[i].branches[j].lng = bPlace.location.longitude;
            if (bPlace.formattedAddress) list[i].branches[j].address = bPlace.formattedAddress;
            if (bPlace.googleMapsUri) list[i].branches[j].googleMapsUrl = bPlace.googleMapsUri;
            branchSuccess++;
            console.log(`     ↳ Branch ✓ ${b.name || b.neighborhood} -> ${bPlace.location.latitude}, ${bPlace.location.longitude}`);
          }
        } catch (be) {
          console.log(`     ↳ Branch error on ${b.name}:`, be.message);
        }
      }
    }

    // Small delay to be polite
    await new Promise(r => setTimeout(r, 60));
  }

  const updatedCode = `import { Restaurant } from '@/types';\n\nexport const INITIAL_RESTAURANTS: Restaurant[] = ${JSON.stringify(list, null, 2)};\n`;
  fs.writeFileSync(restaurantsPath, updatedCode, 'utf8');

  console.log(`\n==============================================`);
  console.log(`🎉 COMPLETED GOOGLE PLACES API SYNC!`);
  console.log(`✓ Synchronized ${parentSuccess} parent venues`);
  console.log(`✓ Synchronized ${branchSuccess} branch locations`);
  console.log(`⚠️ Closed / Non-Operational count: ${closedCount}`);
  console.log(`==============================================`);
}

run().catch(console.error);
