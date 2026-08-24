const fs = require('fs');
const path = require('path');

const restaurantsPath = path.join(__dirname, '../src/data/restaurants.ts');
const code = fs.readFileSync(restaurantsPath, 'utf8');
const eqIdx = code.indexOf('= [');
const jsonStr = code.slice(eqIdx + 2, code.lastIndexOf(']') + 1);
let list = JSON.parse(jsonStr);

console.log('Starting list length:', list.length);

const idsToRemove = new Set([
  'miso-sexy',
  'super-naati',
  'muru-muru',
  'vanamo-indiranagar',
  'the-estate-deli-indiranagar',
  'airlines-hotel',
  'truffles-st-marks',
  'burma-burma-brigade-road',
  'the-pizza-bakery-church-street'
]);

// Find the entries to remove
const toRemove = list.filter(r => idsToRemove.has(r.id));
console.log('Removing:', toRemove.map(r => r.name + ' (' + r.neighborhood + ')'));

// Filter list
let pruned = list.filter(r => !idsToRemove.has(r.id));

// Ensure Burma Burma Indiranagar has Brigade Road and Ecoworld in branches
pruned = pruned.map(r => {
  if (r.id === 'burma-burma-indiranagar') {
    return {
      ...r,
      name: 'Burma Burma',
      branches: [
        {
          id: 'burma-burma-brigade',
          name: 'Burma Burma (Forum Rex Walk)',
          neighborhood: 'Church Street & MG Road',
          address: 'Forum Rex Walk, Brigade Rd, Shanthala Nagar, Ashok Nagar, Bengaluru 560025',
          lat: 12.9734188,
          lng: 77.6074218,
          googleMapsUrl: 'https://maps.app.goo.gl/uX3QxTzH3k5mR8Xm8'
        },
        {
          id: 'burma-burma-ecoworld-branch',
          name: 'Burma Burma (The Bay, RMZ Ecoworld)',
          neighborhood: 'Bellandur & Ecoworld',
          address: 'The Bay, Campus 8A, RMZ Ecoworld, Outer Ring Road, Bellandur, Bengaluru 560103',
          lat: 12.9258,
          lng: 77.6867,
          googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Burma+Burma+The+Bay+RMZ+Ecoworld+Bellandur'
        }
      ]
    };
  }

  if (r.id === 'the-pizza-bakery-indiranagar') {
    return {
      ...r,
      name: 'The Pizza Bakery',
      branches: [
        {
          id: 'the-pizza-bakery-church-st',
          name: 'The Pizza Bakery (Church Street)',
          neighborhood: 'Church Street & MG Road',
          address: '86, Coconut Grove, Church Street, Ashok Nagar, Bengaluru 560001',
          lat: 12.9749557,
          lng: 77.6053303,
          googleMapsUrl: 'https://maps.app.goo.gl/7g8eQYgG2yXvH6eGA'
        },
        {
          id: 'the-pizza-bakery-hsr',
          name: 'The Pizza Bakery (HSR Layout)',
          neighborhood: 'HSR Layout',
          address: 'No. 2345, 17th Cross Rd, Sector 1, HSR Layout, Bengaluru 560102',
          lat: 12.9170,
          lng: 77.6508,
          googleMapsUrl: 'https://maps.google.com/?q=The+Pizza+Bakery+HSR+Layout'
        }
      ]
    };
  }

  return r;
});

const updatedCode = `import { Restaurant } from '@/types';\n\nexport const INITIAL_RESTAURANTS: Restaurant[] = ${JSON.stringify(pruned, null, 2)};\n`;
fs.writeFileSync(restaurantsPath, updatedCode, 'utf8');

console.log('✓ Master dataset pruned! Total ultra-curated spots remaining:', pruned.length);

const hoods = {};
pruned.forEach(r => { hoods[r.neighborhood] = (hoods[r.neighborhood] || 0) + 1; });
console.log('\nFinal Distribution by Neighborhood:');
console.log(hoods);
