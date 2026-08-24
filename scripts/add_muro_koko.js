const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const NEW_VENUES = [
  {
    id: 'muro-museum-road',
    name: 'Muro',
    slug: 'muro-museum-road',
    tagline: 'India’s 30 Best Bars icon: multi-level architectural cocktail house & Southeast Asian gastronomy',
    description: 'A multi-story modernist glasshouse cocktail sanctum on Museum Road. Ranked among India’s top bars, Muro pairs world-class mixology (clarified seasonal cocktails, bespoke highballs) with elevated Cantonese, Thai, and Southeast Asian cuisine.',
    category: 'Cocktails & Rooftops',
    neighborhood: 'Church Street & MG Road',
    address: '5, Museum Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001, India',
    lat: 12.9746211,
    lng: 77.6031473,
    priceLevel: '₹₹₹₹',
    priceForTwo: '₹3,200',
    mustTry: [
      'Clarified Tomato Martini & Plum Highball',
      'Truffle & Edamame Money Bags',
      'Hamachi Carpaccio with Truffle Ponzu',
      'Crispy Aromatic Duck Rolls with Plum Dip',
      'Thai Basil Tiger Prawns with Jasmine Rice'
    ],
    vibeTags: ['Rooftop', 'Outdoor Seating', 'Cocktail Program', 'Romantic'],
    imageUrl: '/images/restaurants/muro-museum-road.jpg',
    sourceImg: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://maps.google.com/?cid=890373212176142193',
    timings: '12:00 PM – 1:00 AM',
    curatorNote: 'One of India’s top bar programs. The multi-story glasshouse architecture on Museum Road combined with avant-garde clarified mixology and silky Cantonese dim sums is world-class.',
    isVegetarian: false,
    verified: true
  },
  {
    id: 'koko-prestige-icon-indiranagar',
    name: 'KOKO',
    slug: 'koko-prestige-icon-indiranagar',
    tagline: 'Ryan & Keenan Tham’s luxury Cantonese & Japanese gastrobar famous for Hamachi Carpaccio & artisanal sushi',
    description: 'An opulent Asian luxury gastrobar inside Prestige Icon opposite The Leela Palace. Renowned for its Hamachi Carpaccio with white truffle oil, masterfully folded Cantonese dim sums, Robatayaki skewers, and high-energy luxury nightlife.',
    category: 'Pan-Asian & Japanese',
    neighborhood: 'Indiranagar',
    address: '4121/S, Prestige Icon, HAL 2nd Stage, Kodihalli, Jeevan Bima Nagar, Bengaluru, Karnataka 560008, India',
    lat: 12.9602704,
    lng: 77.6479489,
    priceLevel: '₹₹₹₹',
    priceForTwo: '₹3,500',
    mustTry: [
      'KOKO Signature Hamachi Carpaccio with White Truffle Oil',
      'Edamame & Truffle Dumpling',
      'Lobster Truffle Cheung Fun',
      'Crispy Smoked Duck Spring Rolls',
      'Matcha Basque Cheesecake'
    ],
    vibeTags: ['Romantic', 'Cocktail Program'],
    imageUrl: '/images/restaurants/koko-prestige-icon-indiranagar.jpg',
    sourceImg: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://maps.google.com/?cid=13606406384695538047',
    timings: '12:00 PM – 1:00 AM',
    curatorNote: 'A benchmark for high-energy Pan-Asian luxury dining. The Hamachi Carpaccio with white truffle oil and silky Lobster Cheung Fun are sensational.',
    isVegetarian: false,
    verified: true
  }
];

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
  const imagesDir = path.join(__dirname, '../public/images/restaurants');

  for (const v of NEW_VENUES) {
    const destPath = path.join(imagesDir, `${v.id}.jpg`);
    try {
      const buf = await fetchBuffer(v.sourceImg);
      await sharp(buf)
        .resize({ width: 1000, height: 700, fit: 'cover', position: 'center' })
        .jpeg({ quality: 82, progressive: true })
        .toFile(destPath);
      console.log(`✓ Saved image: ${v.id}.jpg`);
    } catch (e) {
      console.error(`Error saving image for ${v.name}:`, e.message);
    }
  }

  const restaurantsPath = path.join(__dirname, '../src/data/restaurants.ts');
  const code = fs.readFileSync(restaurantsPath, 'utf8');
  const eqIdx = code.indexOf('= [');
  const jsonStr = code.slice(eqIdx + 2, code.lastIndexOf(']') + 1);
  let list = JSON.parse(jsonStr);

  const existingIds = new Set(list.map(r => r.id));
  NEW_VENUES.forEach(v => {
    const cleanEntry = { ...v };
    delete cleanEntry.sourceImg;
    if (!existingIds.has(cleanEntry.id)) {
      list.push(cleanEntry);
    }
  });

  const updatedCode = `import { Restaurant } from '@/types';\n\nexport const INITIAL_RESTAURANTS: Restaurant[] = ${JSON.stringify(list, null, 2)};\n`;
  fs.writeFileSync(restaurantsPath, updatedCode, 'utf8');

  console.log(`\n🎉 Added Muro and KOKO to master dataset! Total restaurants: ${list.length}`);
}

run().catch(console.error);
