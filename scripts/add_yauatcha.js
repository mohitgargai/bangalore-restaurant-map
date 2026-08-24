const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const https = require('https');

const yauatchaEntry = {
  id: 'yauatcha-bengaluru-mg-road',
  name: 'Yauatcha',
  slug: 'yauatcha-bengaluru-mg-road',
  tagline: 'London-originated Michelin-starred Cantonese dim sum tea house & patisserie',
  description: 'Perched on Level 5 of 1 MG Lido Mall with sweeping skyline views, Yauatcha represents the pinnacle of contemporary Cantonese dim sum gastronomy in South India, celebrated for translucent crystal dumplings, crispy aromatic duck, and European patisserie.',
  category: 'Pan-Asian & Japanese',
  neighborhood: 'Church Street & MG Road',
  address: 'Level 5, 1 MG - Lido Mall, MG Road, Someshwarpura, Halasuru, Bengaluru, Karnataka 560008',
  lat: 12.9732218,
  lng: 77.620367,
  priceLevel: '₹₹₹₹',
  priceForTwo: '₹3,200',
  mustTry: [
    'Crispy Prawn Cheung Fun',
    'Truffle Edamame Dumplings',
    'Signature Crispy Aromatic Duck with Mandarin Pancakes',
    'Pork Char Siu Bun',
    'Raspberry Delice & Artisan Macarons'
  ],
  vibeTags: ['Rooftop', 'Romantic', 'Cocktail Program'],
  imageUrl: '/images/restaurants/yauatcha-bengaluru-mg-road.jpg',
  googleMapsUrl: 'https://www.google.com/maps/place/Yauatcha+Bengaluru/@12.9732218,77.620367,17z',
  timings: '12:00 PM – 11:00 PM',
  curatorNote: 'Bangalore’s undisputed benchmark for Cantonese dim sum artistry. The Crispy Prawn Cheung Fun (crispy fried prawn roll wrapped inside silky steamed rice noodle skin) is absolute perfection.',
  isVegetarian: false,
  verified: true
};

// Download and optimize image
const imgUrl = 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=85';
const destPath = path.join(__dirname, '../public/images/restaurants/yauatcha-bengaluru-mg-road.jpg');

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function run() {
  const buf = await fetchBuffer(imgUrl);
  await sharp(buf)
    .resize({ width: 1000, height: 700, fit: 'cover', position: 'center' })
    .jpeg({ quality: 82, progressive: true })
    .toFile(destPath);
  console.log('✓ Saved self-hosted Yauatcha image to public/images/restaurants/yauatcha-bengaluru-mg-road.jpg');

  const restaurantsPath = path.join(__dirname, '../src/data/restaurants.ts');
  const code = fs.readFileSync(restaurantsPath, 'utf8');
  const eqIdx = code.indexOf('= [');
  const jsonStr = code.slice(eqIdx + 2, code.lastIndexOf(']') + 1);
  let list = JSON.parse(jsonStr);

  if (!list.some(r => r.id === yauatchaEntry.id)) {
    list.push(yauatchaEntry);
  }

  const updatedCode = `import { Restaurant } from '@/types';\n\nexport const INITIAL_RESTAURANTS: Restaurant[] = ${JSON.stringify(list, null, 2)};\n`;
  fs.writeFileSync(restaurantsPath, updatedCode, 'utf8');
  console.log('✓ Added Yauatcha to master dataset! Total restaurants:', list.length);
}

run().catch(console.error);
