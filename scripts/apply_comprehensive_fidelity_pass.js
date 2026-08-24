const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const https = require('https');

const restaurantsPath = path.join(__dirname, '../src/data/restaurants.ts');
const code = fs.readFileSync(restaurantsPath, 'utf8');
const eqIdx = code.indexOf('= [');
const jsonStr = code.slice(eqIdx + 2, code.lastIndexOf(']') + 1);
let list = JSON.parse(jsonStr);

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
  console.log('Applying comprehensive fidelity pass across all landmark flagships...\n');

  // 1. MTR 1924 (Lalbagh Original World Heritage)
  const mtrIdx = list.findIndex(r => r.id === 'mtr-1924' || r.id === 'mavalli-tiffin-room-mtr-1924');
  if (mtrIdx !== -1) {
    list[mtrIdx].name = 'Mavalli Tiffin Room (MTR 1924)';
    list[mtrIdx].neighborhood = 'Basavanagudi';
    list[mtrIdx].address = '14, Lal Bagh Main Rd, Doddamavalli, Sudhama Nagar, Bengaluru, Karnataka 560027, India';
    list[mtrIdx].lat = 12.9551821;
    list[mtrIdx].lng = 77.5855569;
    list[mtrIdx].googleMapsUrl = 'https://maps.google.com/?cid=16038659297309083906';
    console.log('✓ Fixed MTR 1924 to Lalbagh Heritage Flagship!');
  }

  // 2. Umesh Refreshments (Kumara Park West Original)
  const umeshIdx = list.findIndex(r => r.id === 'umesh-refreshments');
  if (umeshIdx !== -1) {
    list[umeshIdx].name = 'Umesh Dosa Point';
    list[umeshIdx].neighborhood = 'Malleshwaram';
    list[umeshIdx].address = '21, 4th Main Rd, 4th Block, Kumara Park West, Seshadripuram, Bengaluru, Karnataka 560020, India';
    list[umeshIdx].lat = 12.9889373;
    list[umeshIdx].lng = 77.5775321;
    list[umeshIdx].googleMapsUrl = 'https://maps.google.com/?cid=12853698143630628717';
    console.log('✓ Fixed Umesh Dosa Point to Kumara Park West original!');
  }

  // 3. Glen\'s Bakehouse (Lavelle Road Flagship Villa)
  const glensIdx = list.findIndex(r => r.id === 'glens-bakehouse' || r.id === 'glens-bakehouse-lavelle-road');
  if (glensIdx !== -1) {
    list[glensIdx].name = 'Glen\'s Bakehouse';
    list[glensIdx].neighborhood = 'Lavelle Road';
    list[glensIdx].address = '24/1, Lavelle Road, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001, India';
    list[glensIdx].lat = 12.9698289;
    list[glensIdx].lng = 77.597437;
    list[glensIdx].googleMapsUrl = 'https://maps.google.com/?cid=3948675282140169658';
    console.log('✓ Fixed Glen\'s Bakehouse to Lavelle Road flagship villa!');
  }

  // 4. Bologna Italian Ristorante (100 Feet Rd Indiranagar)
  const bolognaIdx = list.findIndex(r => r.id === 'bologna-italian-ristorante' || r.id === 'bologna-indiranagar');
  if (bolognaIdx !== -1) {
    list[bolognaIdx].name = 'Bologna Italian Ristorante';
    list[bolognaIdx].neighborhood = 'Indiranagar';
    list[bolognaIdx].address = 'First Floor, 759, 100 Feet Rd, HAL 2nd Stage, Appareddipalya, Indiranagar, Bengaluru, Karnataka 560038, India';
    list[bolognaIdx].lat = 12.9718159;
    list[bolognaIdx].lng = 77.6410228;
    list[bolognaIdx].googleMapsUrl = 'https://maps.google.com/?cid=17842799711718605795';
    console.log('✓ Fixed Bologna to 100 Feet Rd Indiranagar!');
  }

  // 5. Chulha Chouki Da Dhaba (HRBR Layout Kalyan Nagar Flagship)
  const chulhaIdx = list.findIndex(r => r.id === 'chulha-chouki-da-dhaba');
  if (chulhaIdx !== -1) {
    list[chulhaIdx].name = 'Chulha Chouki Da Dhaba';
    list[chulhaIdx].neighborhood = 'Kalyan Nagar & Kammanahalli';
    list[chulhaIdx].address = 'Masand Esquire, 1M, near Hennur Main Road, HRBR Layout 3rd Block, Kalyan Nagar, Bengaluru, Karnataka 560043, India';
    list[chulhaIdx].lat = 13.0249313;
    list[chulhaIdx].lng = 77.6315241;
    list[chulhaIdx].googleMapsUrl = 'https://maps.google.com/?cid=17149048302875044392';
    console.log('✓ Fixed Chulha Chouki Da Dhaba to HRBR Layout Kalyan Nagar flagship!');
  }

  // 6. Geist Brewing Factory (Bhartiya / Hennur)
  const geistIdx = list.findIndex(r => r.id === 'geist-brewing-factory');
  if (geistIdx !== -1) {
    list[geistIdx].name = 'Geist Brewing Factory';
    list[geistIdx].neighborhood = 'Bel Road & North BLR';
    list[geistIdx].address = 'UG Floor, Bhartiya Mall Of Bengaluru, Thanisandra / Hennur Bagalur Rd, Kannuru, Bengaluru, Karnataka 560064, India';
    list[geistIdx].lat = 13.0838244;
    list[geistIdx].lng = 77.64447;
    list[geistIdx].googleMapsUrl = 'https://maps.google.com/?cid=7299639736744997223';
    console.log('✓ Fixed Geist Brewing Factory to Hennur / Bhartiya flagship!');
  }

  // 7. Smash Guys (Fix branch neighborhood from Whitefield to Bellandur & Ecoworld)
  const smashIdx = list.findIndex(r => r.id === 'smash-guys-indiranagar');
  if (smashIdx !== -1 && list[smashIdx].branches) {
    list[smashIdx].branches = list[smashIdx].branches.map(b => {
      if (b.id === 'smash-guys-ecoworld') {
        return {
          ...b,
          neighborhood: 'Bellandur & Ecoworld'
        };
      }
      return b;
    });
    console.log('✓ Fixed Smash Guys EcoWorld branch neighborhood!');
  }

  // 8. Add Milano Ice Cream (Indiranagar 100ft Rd / Krishna Temple Rd, 4.6★ / 14,185 reviews)
  const milanoId = 'milano-ice-cream-indiranagar';
  if (!list.some(r => r.id === milanoId)) {
    const imagesDir = path.join(__dirname, '../public/images/restaurants');
    const destPath = path.join(imagesDir, `${milanoId}.jpg`);
    try {
      const buf = await fetchBuffer('https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=1200&q=85');
      await sharp(buf)
        .resize({ width: 1000, height: 700, fit: 'cover', position: 'center' })
        .jpeg({ quality: 82, progressive: true })
        .toFile(destPath);
      console.log('✓ Saved self-hosted image for Milano Ice Cream');
    } catch (e) {
      console.error('Error saving image for Milano:', e.message);
    }

    list.push({
      id: milanoId,
      name: 'Milano Ice Cream',
      slug: 'milano-ice-cream-indiranagar',
      tagline: 'Bangalore’s premier artisanal Italian gelateria serving authentic fresh churned gelato & crepes',
      description: 'An undisputed dessert pilgrimage on Krishna Temple Road off 100 Feet Road Indiranagar. Renowned for its authentic Italian gelato crafted with imported Sicilian pistachios, dark chocolate-orange, salted butter caramel, and warm fresh Nutella crepes.',
      category: 'Bakeries & Desserts',
      neighborhood: 'Indiranagar',
      address: '460, Shri Krishna Temple Rd, Indira Nagar 1st Stage, Stage 1, Indiranagar, Bengaluru, Karnataka 560038, India',
      lat: 12.9790343,
      lng: 77.6440204,
      priceLevel: '₹₹',
      priceForTwo: '₹400',
      mustTry: [
        'Pure Sicilian Pistachio Gelato',
        'Dark Chocolate & Candied Orange Gelato',
        'Salted Butter Caramel Gelato',
        'Warm Nutella & Banana Crepe with Gelato Scoop',
        'Fresh Strawberry Sorbetto'
      ],
      vibeTags: ['Late Night', 'Outdoor Seating', 'Pocket Friendly'],
      imageUrl: `/images/restaurants/${milanoId}.jpg`,
      googleMapsUrl: 'https://maps.google.com/?cid=12179050838404975860',
      timings: '11:00 AM – 1:00 AM (Late Night)',
      curatorNote: 'Bangalore’s benchmark for authentic Italian gelato. Open past midnight, the rich Sicilian Pistachio and Dark Chocolate Orange on a freshly baked waffle cone are exceptional.',
      isVegetarian: true,
      verified: true
    });
    console.log('✓ Added Milano Ice Cream (Indiranagar) to master dataset!');
  }

  const updatedCode = `import { Restaurant } from '@/types';\n\nexport const INITIAL_RESTAURANTS: Restaurant[] = ${JSON.stringify(list, null, 2)};\n`;
  fs.writeFileSync(restaurantsPath, updatedCode, 'utf8');

  console.log(`\n🎉 Comprehensive fidelity pass complete! Total restaurants: ${list.length}`);
}

run().catch(console.error);
