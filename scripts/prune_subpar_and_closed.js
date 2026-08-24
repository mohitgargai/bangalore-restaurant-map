const fs = require('fs');
const path = require('path');

const restaurantsPath = path.join(__dirname, '../src/data/restaurants.ts');
const code = fs.readFileSync(restaurantsPath, 'utf8');
const eqIdx = code.indexOf('= [');
const jsonStr = code.slice(eqIdx + 2, code.lastIndexOf(']') + 1);
let list = JSON.parse(jsonStr);

console.log('Total count before pruning:', list.length);

const idsToPrune = new Set([
  'samarkand-infantry-road',          // Permanently Closed
  'shivanna-gulkand-center-vv-puram', // 3.2★ Low quality / heavily degraded
  'kumarakom-restaurant-hsr',         // 3.8★ Quality decline / hygiene issues
  'shivaji-military-hotel-jayanagar', // 3.8★ Commercialized / poor recent feedback
  'fanoos-johnson-market',            // 3.9★ Past its prime / poor meat quality
  'mai-mai-indiranagar',              // Subpar generic fusion / 37 reviews
  'vapour-brewpub-sarjapur'           // Generic commercial filler brewery
]);

list = list.filter(r => {
  if (idsToPrune.has(r.id)) {
    console.log(`🗑️ Pruned: ${r.name} (${r.neighborhood}) [ID: ${r.id}]`);
    return false;
  }
  return true;
});

// Also fix Brahmins and Magnolia coordinates/URLs cleanly
const brahminsIdx = list.findIndex(r => r.id === 'brahmins-coffee-bar');
if (brahminsIdx !== -1) {
  list[brahminsIdx].lat = 12.9539725;
  list[brahminsIdx].lng = 77.568847;
  list[brahminsIdx].googleMapsUrl = 'https://maps.google.com/?cid=13844621949168171364';
}

const magnoliaIdx = list.findIndex(r => r.id === 'magnolia-bakery-indiranagar');
if (magnoliaIdx !== -1) {
  list[magnoliaIdx].lat = 12.9789975;
  list[magnoliaIdx].lng = 77.6405322;
  list[magnoliaIdx].googleMapsUrl = 'https://maps.google.com/?cid=12140656093557945037';
}

const updatedCode = `import { Restaurant } from '@/types';\n\nexport const INITIAL_RESTAURANTS: Restaurant[] = ${JSON.stringify(list, null, 2)};\n`;
fs.writeFileSync(restaurantsPath, updatedCode, 'utf8');

console.log(`\n🎉 Pruning complete! Total curated benchmark restaurants: ${list.length}`);
