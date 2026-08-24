const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const NEW_VENUES = [
  {
    id: 'zen-the-leela-palace',
    name: 'Zen',
    slug: 'zen-the-leela-palace',
    tagline: 'The Leela Palace’s Pan-Asian jewel with live Teppanyaki tables, Yakitori grill & Korean BBQ',
    description: 'A grand architectural and culinary tour across Asia inside The Leela Palace. Features live hibachi Teppanyaki counters, private Yakitori booths, a dedicated sushi bar, and an extensive menu traversing Japanese, Korean, Thai, and Cantonese cuisines.',
    category: 'Pan-Asian & Japanese',
    neighborhood: 'Indiranagar',
    address: 'The Leela Palace, 23, HAL Old Airport Rd, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008, India',
    lat: 12.9602309,
    lng: 77.6485261,
    priceLevel: '₹₹₹₹',
    priceForTwo: '₹3,800',
    mustTry: [
      'Live Hibachi Teppanyaki Tenderloin & Prawns',
      'Alaskan King Crab & Salmon Maki Roll',
      'Korean Bulgogi with House-Fermented Kimchi',
      'Steamed Chilean Seabass Dumpling',
      'Wasabi Creme Brulee'
    ],
    vibeTags: ['Romantic', 'Cocktail Program'],
    imageUrl: '/images/restaurants/zen-the-leela-palace.jpg',
    sourceImg: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://maps.google.com/?cid=17532239643721011878',
    timings: '12:00 PM – 3:00 PM, 7:00 PM – 11:30 PM',
    curatorNote: 'A high-end Pan-Asian temple. Book a seat at the live Teppanyaki counter for sizzling hibachi theater, or order the melt-in-mouth Alaskan Crab maki.',
    isVegetarian: false,
    verified: true
  },
  {
    id: 'klaa-kitchen-indiranagar',
    name: 'Klaa Kitchen',
    slug: 'klaa-kitchen-indiranagar',
    tagline: 'Celebrated modern Goan bistro & craft cocktail bar serving traditional Choriz Poi, Recheado & Sorpotel',
    description: 'A vibrant tribute to Goan culinary heritage on Paramahansa Yogananda Road. Chef-driven regional gastronomy celebrating fiery pork choriz, fresh seafood recheado, coconut-milk curries, and artisanal coastal feni cocktails in a breezy Portuguese-inspired space.',
    category: 'Regional & Coastal',
    neighborhood: 'Indiranagar',
    address: '846, Ground and 1st Floor, Paramahansa Yogananda Rd, Binnamangala, Stage 1, Indiranagar, Bengaluru, Karnataka 560038, India',
    lat: 12.9803627,
    lng: 77.6372517,
    priceLevel: '₹₹₹',
    priceForTwo: '₹1,800',
    mustTry: [
      'Pork Choriz Poi (Smoked spicy Goan sausage in crusty poi)',
      'Recheado Stuffed Baby Squids',
      'Traditional Goan Pork Sorpotel with Steamed Sannas',
      'Butter Garlic Mud Crab / Tiger Prawns',
      'Authentic Multi-Layered Goan Bebinca'
    ],
    vibeTags: ['Outdoor Seating', 'Cocktail Program'],
    imageUrl: '/images/restaurants/klaa-kitchen-indiranagar.jpg',
    sourceImg: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://maps.google.com/?cid=16039486211756598560',
    timings: '12:30 PM – 11:30 PM',
    curatorNote: 'Bangalore’s best Goan table. The spicy, oily Pork Choriz stuffed inside warm crusty Goan Poi bread paired with a kokum cocktail is phenomenal.',
    isVegetarian: false,
    verified: true
  },
  {
    id: 'the-reservoire-koramangala',
    name: 'The Reservoire',
    slug: 'the-reservoire-koramangala',
    tagline: 'India’s largest cocktail bar with 100+ craft concoctions & sprawling multi-tier glass rooftop',
    description: 'A legendary multi-story cocktail sanctum in Koramangala 5th Block featuring an expansive glasshouse rooftop terrace, live music gigs, and India’s most comprehensive craft mixology menu featuring over 100 signature cocktails.',
    category: 'Cocktails & Rooftops',
    neighborhood: 'Koramangala',
    address: '17, 5th Block, 17th H Main Rd, 5th Block, Koramangala, Bengaluru, Karnataka 560095, India',
    lat: 12.9334087,
    lng: 77.6222176,
    priceLevel: '₹₹₹',
    priceForTwo: '₹2,000',
    mustTry: [
      'Smoked Whiskey Infusions & Botanical Gin Cocktails',
      'Ghee Roast Prawn Skewers',
      'Wood-Fired Truffle Mushroom Flatbread',
      'Bacon Wrapped Sausages in Bourbon Glaze',
      'Baileys Chocolate Mousse'
    ],
    vibeTags: ['Rooftop', 'Outdoor Seating', 'Cocktail Program', 'Live Music / Vinyl'],
    imageUrl: '/images/restaurants/the-reservoire-koramangala.jpg',
    sourceImg: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://maps.google.com/?cid=10822519618415436619',
    timings: '12:00 PM – 1:00 AM',
    curatorNote: 'A Koramangala nightlife landmark. The lush greenhouse rooftop with a smoky bourbon craft cocktail is an absolute staple for Bangalore evenings.',
    isVegetarian: false,
    verified: true
  },
  {
    id: 'sanchez-ub-city',
    name: 'Sanchez',
    slug: 'sanchez-ub-city',
    tagline: 'Chef Vikas Seth’s authentic Mexican dining with live table-side guacamole trolley & corn masa',
    description: 'Chef Vikas Seth’s premier contemporary Mexican restaurant overlooking UB City’s piazza. Renowned for its live table-side guacamole trolley, authentic stone-ground corn tortillas, slow-braised birria tacos, and artisanal mezcal cocktails.',
    category: 'Modern Indian & Dining',
    neighborhood: 'Lavelle Road',
    address: '204, Vittal Mallya Rd, KG Halli, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001, India',
    lat: 12.9715895,
    lng: 77.5960585,
    priceLevel: '₹₹₹',
    priceForTwo: '₹2,200',
    mustTry: [
      'Live Tableside Fresh Guacamole with Warm Tortilla Chips',
      'Slow-Cooked Lamb Birria Tacos with Consommé',
      'Chipotle Grilled Prawn Taquitos',
      'Smoked Jalapeño & Mezcal Margarita',
      'Warm Cinnamon Churros with Spiced Dulce de Leche'
    ],
    vibeTags: ['Outdoor Seating', 'Cocktail Program'],
    imageUrl: '/images/restaurants/sanchez-ub-city.jpg',
    sourceImg: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://maps.google.com/?cid=12085732649581893245',
    timings: '11:30 AM – 11:00 PM',
    curatorNote: 'Bangalore’s benchmark for authentic Mexican gastronomy. The live guacamole cart made fresh at your table with Hass avocados and lime is unbeatable.',
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
      console.log(`✓ Saved self-hosted image: ${v.id}.jpg`);
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

  console.log(`\n🎉 Added Zen, Klaa Kitchen, The Reservoire & Sanchez! Total restaurants: ${list.length}`);
}

run().catch(console.error);
