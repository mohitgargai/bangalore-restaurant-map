const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const https = require('https');

const restaurantsPath = path.join(__dirname, '../src/data/restaurants.ts');
const code = fs.readFileSync(restaurantsPath, 'utf8');
const eqIdx = code.indexOf('= [');
const jsonStr = code.slice(eqIdx + 2, code.lastIndexOf(']') + 1);
let list = JSON.parse(jsonStr);

// 1. Fix Araku Coffee Flagship (12th Main Indiranagar)
const arakuIdx = list.findIndex(r => r.id === 'araku-coffee' || r.id === 'araku-coffee-flagship');
if (arakuIdx !== -1) {
  list[arakuIdx].name = 'Araku Coffee Flagship';
  list[arakuIdx].neighborhood = 'Indiranagar';
  list[arakuIdx].address = '968, 12th Main Rd, HAL 2nd Stage, Doopanahalli, Indiranagar, Bengaluru, Karnataka 560008, India';
  list[arakuIdx].lat = 12.9699465;
  list[arakuIdx].lng = 77.6391732;
  list[arakuIdx].googleMapsUrl = 'https://maps.google.com/?cid=18340408279450075002';
  console.log('✓ Fixed Araku Coffee to 12th Main Indiranagar flagship!');
}

// 2. Fix The Rameshwaram Cafe (100 Feet Rd Indiranagar)
const rameshwaramIdx = list.findIndex(r => r.id === 'rameshwaram-cafe-indiranagar' || r.id === 'the-rameshwaram-cafe-indiranagar');
if (rameshwaramIdx !== -1) {
  list[rameshwaramIdx].name = 'The Rameshwaram Cafe';
  list[rameshwaramIdx].neighborhood = 'Indiranagar';
  list[rameshwaramIdx].address = '847/1, 100 Feet Rd, Indira Nagar 1st Stage, H Colony, Indiranagar, Bengaluru, Karnataka 560038, India';
  list[rameshwaramIdx].lat = 12.9816796;
  list[rameshwaramIdx].lng = 77.640918;
  list[rameshwaramIdx].googleMapsUrl = 'https://maps.google.com/?cid=15574485840685596590';
  console.log('✓ Fixed The Rameshwaram Cafe to 100 Feet Rd Indiranagar!');
}

// 3. Fix Pecos (Original 1989 Flagship on Rest House Road, Brigade Road)
const pecosIdx = list.findIndex(r => r.id === 'pecos' || r.id === 'pecos-classic');
if (pecosIdx !== -1) {
  list[pecosIdx].name = 'Pecos Classic';
  list[pecosIdx].neighborhood = 'Church Street & MG Road';
  list[pecosIdx].address = '34, Rest House Rd, off Brigade Road, below pecos pub, Shanthala Nagar, Sampangi Rama Nagara, Bengaluru, Karnataka 560001, India';
  list[pecosIdx].lat = 12.973678;
  list[pecosIdx].lng = 77.607354;
  list[pecosIdx].googleMapsUrl = 'https://maps.google.com/?cid=10173647938385044278';
  list[pecosIdx].branches = [
    {
      id: 'pecos-indiranagar-branch',
      name: 'Indiranagar (100ft Rd)',
      neighborhood: 'Indiranagar',
      address: '1st floor, 765, 100 Feet Rd, HAL 2nd Stage, Appareddipalya, Indiranagar, Bengaluru, Karnataka 560008, India',
      lat: 12.9707795,
      lng: 77.6410255,
      googleMapsUrl: 'https://maps.google.com/?cid=15764024227743916946'
    }
  ];
  console.log('✓ Fixed Pecos to Original Rest House Rd Flagship + Indiranagar Branch!');
}

// 4. Split The Craftery by Subko and Subko Coffee into distinct standalone formats
const crafteryIdx = list.findIndex(r => r.id === 'the-craftery-by-subko');
if (crafteryIdx !== -1) {
  // Keep The Craftery as dedicated craft chocolate lab & artisanal bakery in Koramangala
  list[crafteryIdx].name = 'The Craftery by Subko';
  list[crafteryIdx].tagline = 'Subko’s 4,000 sq ft experiential bean-to-bar chocolate factory, roastery & bakehouse';
  list[crafteryIdx].description = 'A massive sensory flagship in Koramangala 3rd Block. Features a working bean-to-bar craft chocolate factory, experimental viennoiserie lab, single-origin sourdough craft, and progressive specialty coffee brews.';
  list[crafteryIdx].address = 'No. 374, No. 68, 3rd Block, Santhosapuram, Koramangala, Bengaluru, Karnataka 560034, India';
  list[crafteryIdx].lat = 12.9258697;
  list[crafteryIdx].lng = 77.6255362;
  list[crafteryIdx].googleMapsUrl = 'https://maps.google.com/?cid=7958999336181928828';
  list[crafteryIdx].branches = []; // No longer bundled together!
  console.log('✓ The Craftery by Subko unbundled into standalone craft chocolate & bakery flagship!');
}

// Add Subko Coffee & Bakehouse (Indiranagar / Shanthi Nagar) as its own dedicated entity
const subkoCoffeeId = 'subko-coffee-indiranagar';
if (!list.some(r => r.id === subkoCoffeeId)) {
  list.push({
    id: subkoCoffeeId,
    name: 'Subko Coffee & Bakehouse',
    slug: 'subko-coffee-indiranagar',
    tagline: 'Premier specialty coffee bar & artisanal bakehouse on 12th Main',
    description: 'The celebrated specialty coffee roastery on 12th Main Indiranagar. Renowned for its podi toast sourdoughs, single-origin pour-overs, cold brew flights, and fresh French-inspired viennoiserie.',
    category: 'Specialty Coffee & Cafe',
    neighborhood: 'Indiranagar',
    address: '789/A, Ground Floor, 12th Main Rd, HAL 2nd Stage, Doopanahalli, Indiranagar, Bengaluru, Karnataka 560008, India',
    lat: 12.9703363,
    lng: 77.6407651,
    priceLevel: '₹₹₹',
    priceForTwo: '₹1,100',
    mustTry: [
      'Single Origin Filter Coffee / Pour Over',
      'Podi Toast with House Cultured Butter',
      'Twice-Baked Almond Pain au Chocolat',
      'Cascara Tonic Cold Brew'
    ],
    vibeTags: ['Artisanal Sourdough', 'Work Friendly', 'Breakfast Spot'],
    imageUrl: '/images/restaurants/the-craftery-by-subko.jpg',
    googleMapsUrl: 'https://maps.google.com/?cid=13095318095514028500',
    timings: '7:30 AM – 10:00 PM',
    curatorNote: 'The 12th Main specialty coffee go-to. Grab a seat by the window with a fresh pour-over and their iconic Podi Sourdough Toast.',
    isVegetarian: false,
    verified: true,
    branches: [
      {
        id: 'subko-ajji-house-courtyard',
        name: 'Ajji House (The Courtyard, Shanthi Nagar)',
        neighborhood: 'CBD & Central',
        address: '105, Kengal Hanumanthaiah Rd, opp. Corporation Bank, Raja Ram Mohanroy Extension, Shanti Nagar, Bengaluru, Karnataka 560027, India',
        lat: 12.9584305,
        lng: 77.5928951,
        googleMapsUrl: 'https://maps.google.com/?cid=1972734216234628042'
      }
    ]
  });
  console.log('✓ Added Subko Coffee & Bakehouse as distinct entity with Ajji House branch!');
}

const updatedCode = `import { Restaurant } from '@/types';\n\nexport const INITIAL_RESTAURANTS: Restaurant[] = ${JSON.stringify(list, null, 2)};\n`;
fs.writeFileSync(restaurantsPath, updatedCode, 'utf8');

console.log(`\n🎉 Nuance refinement complete! Total restaurants: ${list.length}`);
