const fs = require('fs');
const path = require('path');

const restaurantsPath = path.join(__dirname, '../src/data/restaurants.ts');
const code = fs.readFileSync(restaurantsPath, 'utf8');
const eqIdx = code.indexOf('= [');
const jsonStr = code.slice(eqIdx + 2, code.lastIndexOf(']') + 1);
let list = JSON.parse(jsonStr);

const auditResults = JSON.parse(fs.readFileSync('master_audit_results.json', 'utf8'));
const auditMap = {};
auditResults.forEach(r => {
  auditMap[r.id] = r;
});

const EXACT_OVERRIDE_COORDS = {
  'yauatcha-bengaluru-mg-road': { lat: 12.9732218, lng: 77.620367, googleMapsUrl: 'https://www.google.com/maps/place/Yauatcha+Bengaluru/@12.9732218,77.620367,17z' },
  'rim-naam-the-oberoi': { lat: 12.973455, lng: 77.618703, googleMapsUrl: 'https://www.google.com/maps/place/Rim+Naam/@12.973455,77.618703,17z' },
  'edo-itc-gardenia': { lat: 12.967128, lng: 77.5956714, googleMapsUrl: 'https://www.google.com/maps/place/Edo+-+Japanese+Restaurant+and+Bar,+ITC+Gardenia/@12.967128,77.5956714,17z' },
  'pecos-mojo-brigade-branch': { lat: 12.9723, lng: 77.6074, googleMapsUrl: 'https://www.google.com/maps/place/Pecos+Mojo/@12.9723,77.6074,17z' },
  'grasshopper-bannerghatta': { lat: 12.8715, lng: 77.5972, googleMapsUrl: 'https://www.google.com/maps/place/Grasshopper/@12.8715,77.5972,17z' }
};

let parentSyncCount = 0;
let branchSyncCount = 0;

list = list.map(r => {
  let updatedR = { ...r };

  // Check exact override first
  if (EXACT_OVERRIDE_COORDS[r.id]) {
    updatedR.lat = EXACT_OVERRIDE_COORDS[r.id].lat;
    updatedR.lng = EXACT_OVERRIDE_COORDS[r.id].lng;
    updatedR.googleMapsUrl = EXACT_OVERRIDE_COORDS[r.id].googleMapsUrl;
    parentSyncCount++;
  } else if (auditMap[r.id] && auditMap[r.id].resolvedLat && Math.abs(auditMap[r.id].resolvedLat - 12.8647) > 0.01) {
    updatedR.lat = auditMap[r.id].resolvedLat;
    updatedR.lng = auditMap[r.id].resolvedLng;
    if (auditMap[r.id].resolvedUrl) updatedR.googleMapsUrl = auditMap[r.id].resolvedUrl;
    if (auditMap[r.id].resolvedAddress && auditMap[r.id].resolvedAddress.length > 5) {
      updatedR.address = auditMap[r.id].resolvedAddress;
    }
    parentSyncCount++;
  }

  // Sync branches if present
  if (updatedR.branches && updatedR.branches.length > 0) {
    updatedR.branches = updatedR.branches.map(b => {
      let updatedB = { ...b };
      if (EXACT_OVERRIDE_COORDS[b.id]) {
        updatedB.lat = EXACT_OVERRIDE_COORDS[b.id].lat;
        updatedB.lng = EXACT_OVERRIDE_COORDS[b.id].lng;
        updatedB.googleMapsUrl = EXACT_OVERRIDE_COORDS[b.id].googleMapsUrl;
        branchSyncCount++;
      } else if (auditMap[b.id] && auditMap[b.id].resolvedLat && Math.abs(auditMap[b.id].resolvedLat - 12.8647) > 0.01) {
        updatedB.lat = auditMap[b.id].resolvedLat;
        updatedB.lng = auditMap[b.id].resolvedLng;
        if (auditMap[b.id].resolvedUrl) updatedB.googleMapsUrl = auditMap[b.id].resolvedUrl;
        if (auditMap[b.id].resolvedAddress && auditMap[b.id].resolvedAddress.length > 5) {
          updatedB.address = auditMap[b.id].resolvedAddress;
        }
        branchSyncCount++;
      }
      return updatedB;
    });
  }

  return updatedR;
});

const updatedCode = `import { Restaurant } from '@/types';\n\nexport const INITIAL_RESTAURANTS: Restaurant[] = ${JSON.stringify(list, null, 2)};\n`;
fs.writeFileSync(restaurantsPath, updatedCode, 'utf8');

console.log(`✓ Synchronized ${parentSyncCount} parent restaurants and ${branchSyncCount} branches with live verified Google Maps data!`);
