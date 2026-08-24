const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const HEAVYWEIGHTS = [
  {
    id: 'rim-naam-the-oberoi',
    name: 'Rim Naam',
    slug: 'rim-naam-the-oberoi',
    tagline: 'Bangalore’s 20-year benchmark for royal Thai dining in an alfresco garden pavilion over koi ponds',
    description: 'An enchanting open-air teakwood pavilion floating over tranquil water bodies and framed by ancient raintrees at The Oberoi. Master Thai chefs craft authentic tom yum, fiery green curries, and steamed seabass with lemongrass.',
    category: 'Pan-Asian & Japanese',
    neighborhood: 'Church Street & MG Road',
    address: 'The Oberoi, 37-39, MG Road, Yellappa Garden, Yellappa Chetty Layout, Sivanchetti Gardens, Bengaluru 560001',
    lat: 12.973455,
    lng: 77.618703,
    priceLevel: '₹₹₹₹',
    priceForTwo: '₹3,500',
    mustTry: [
      'Pla Neung Manao (Steamed Seabass in Spicy Lime & Garlic Broth)',
      'Tom Yum Goong (Authentic Tiger Prawn Soup)',
      'Gaeng Kiew Wan Gai (Fiery Thai Green Curry with Pea Aubergines)',
      'Crispy Soft Shell Crab with Black Pepper',
      'Warm Sticky Rice with Fresh Sweet Mango'
    ],
    vibeTags: ['Outdoor Seating', 'Romantic', 'Cocktail Program'],
    imageUrl: '/images/restaurants/rim-naam-the-oberoi.jpg',
    sourceImg: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://www.google.com/maps/place/Rim+Naam/@12.973455,77.618703,17z',
    timings: '12:30 PM – 3:00 PM, 7:00 PM – 11:30 PM',
    curatorNote: 'Bangalore’s most romantic garden pavilion. The fragrant herbal balance in their lemongrass-scented Tom Yum and steamed seabass is unmatched in India.',
    isVegetarian: false,
    verified: true
  },
  {
    id: 'edo-itc-gardenia',
    name: 'Edo Restaurant & Bar',
    slug: 'edo-itc-gardenia',
    tagline: 'Master Japanese Kaiseki, live Robatayaki charcoal grill & authentic Omakase sushi',
    description: 'Inspired by Tokyo’s Edo period, this ultra-premium Japanese culinary shrine inside ITC Gardenia features a live Robatayaki charcoal grill, private tatami dining chambers, and an authentic Omakase sushi bar.',
    category: 'Pan-Asian & Japanese',
    neighborhood: 'Church Street & MG Road',
    address: 'ITC Gardenia, 1, Residency Rd, Ashok Nagar, Bengaluru, Karnataka 560025',
    lat: 12.967128,
    lng: 77.5956714,
    priceLevel: '₹₹₹₹',
    priceForTwo: '₹4,500',
    mustTry: [
      'Authentic Omakase Nigiri & Sashimi Platter',
      'Charcoal Grilled Black Cod with Sweet Saikyo Miso',
      'Wagyu Beef on Hot Ishiyaki Volcanic Rock',
      'Crispy Tiger Prawn Tempura',
      'Matcha Green Tea Soufflé'
    ],
    vibeTags: ['Romantic', 'Cocktail Program'],
    imageUrl: '/images/restaurants/edo-itc-gardenia.jpg',
    sourceImg: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://www.google.com/maps/place/Edo+-+Japanese+Restaurant+and+Bar,+ITC+Gardenia/@12.967128,77.5956714,17z',
    timings: '6:30 PM – 11:30 PM (Dinner Only)',
    curatorNote: 'The gold standard for Japanese Kaiseki dining in South India. The Saikyo Miso Black Cod melts effortlessly on the tongue.',
    isVegetarian: false,
    verified: true
  },
  {
    id: 'jamavar-the-leela-palace',
    name: 'Jamavar',
    slug: 'jamavar-the-leela-palace',
    tagline: 'The royal benchmark for Awadhi & North Indian fine dining beneath handcrafted chandeliers',
    description: 'The Leela Palace’s iconic culinary jewel. Named after traditional Kashmiri Jamavar shawls, this palatial dining room presents royal Awadhi and Mughlai recipes perfected over decades under silver-leaf ceilings.',
    category: 'Regional & Coastal',
    neighborhood: 'Indiranagar',
    address: 'The Leela Palace, 23, HAL Old Airport Rd, Kodihalli, Bengaluru, Karnataka 560008',
    lat: 12.9605,
    lng: 77.6485,
    priceLevel: '₹₹₹₹',
    priceForTwo: '₹4,000',
    mustTry: [
      'Dal Jamavar (Slow-simmered 24-hour black urad lentils)',
      'Raan-e-Jamavar (Melt-in-mouth spiced leg of spring lamb)',
      'Murgh Chandi Kebab with Edible Silver Vark',
      'Fragrant Awadhi Gosht Dum Biryani',
      'Kesari Rasmalai'
    ],
    vibeTags: ['Romantic'],
    imageUrl: '/images/restaurants/jamavar-the-leela-palace.jpg',
    sourceImg: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://www.google.com/maps/place/Jamavar/@12.9605,77.6485,17z',
    timings: '12:00 PM – 3:00 PM, 7:00 PM – 11:30 PM',
    curatorNote: 'The slow-simmered 24-hour Dal Jamavar and tender Raan-e-Jamavar define royal Indian fine dining in Bangalore.',
    isVegetarian: false,
    verified: true
  },
  {
    id: 'le-cirque-signature-leela',
    name: 'Le Cirque Signature',
    slug: 'le-cirque-signature-leela',
    tagline: 'World-renowned Franco-Italian fine dining & vintage cellar overlooking the palace arches',
    description: 'Sirio Maccioni’s legendary New York flagship transplanted to the 5th floor of The Leela Palace. Serves classical Franco-Italian haute cuisine paired with an exceptional international wine library and panoramic palace views.',
    category: 'Modern Indian & Dining',
    neighborhood: 'Indiranagar',
    address: '5th Floor, The Leela Palace, 23, HAL Old Airport Rd, Kodihalli, Bengaluru, Karnataka 560008',
    lat: 12.9606,
    lng: 77.6486,
    priceLevel: '₹₹₹₹',
    priceForTwo: '₹5,000',
    mustTry: [
      'Truffle & Porcini Risotto Acquerello',
      'Homemade Black Truffle Tortelloni with Smoked Duck',
      'Signature Dover Sole Meunière',
      'Sous-Vide Lamb Chop Rossini',
      'The Original Le Cirque Crème Brûlée'
    ],
    vibeTags: ['Rooftop', 'Romantic'],
    imageUrl: '/images/restaurants/le-cirque-signature-leela.jpg',
    sourceImg: 'https://images.unsplash.com/photo-1538488881522-4321453a99e3?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://www.google.com/maps/place/Le+Cirque+Signature/@12.9606,77.6486,17z',
    timings: '6:30 PM – 11:30 PM (Dinner Only)',
    curatorNote: 'The ultimate celebratory dinner setting. The Acquerello Truffle Risotto and classic NYC Crème Brûlée are masterclasses in technique.',
    isVegetarian: false,
    verified: true
  },
  {
    id: 'grasshopper-bannerghatta',
    name: 'Grasshopper',
    slug: 'grasshopper-bannerghatta',
    tagline: 'An enchanted 7-course farm-to-table culinary pilgrimage in an open-air bamboo farm',
    description: 'Founded by Himanshu Dimri and Sonali Sattar in 2002, Grasshopper is Bangalore’s most celebrated farm-to-table dining institution. Hidden inside a serene bamboo greenhouse farm, it serves an unhurried, personalized 7-course seasonal tasting menu.',
    category: 'Modern Indian & Dining',
    neighborhood: 'JP Nagar',
    address: '45, Kalena Agrahara, Bannerghatta Main Rd, Bengaluru, Karnataka 560076',
    lat: 12.8715,
    lng: 77.5972,
    priceLevel: '₹₹₹₹',
    priceForTwo: '₹5,500',
    mustTry: [
      'Chef’s Bespoke 7-Course Seasonal Tasting Menu',
      'Pan-Seared Prawns with Mustard & Raw Mango',
      'Braised Pork Belly with Spiced Apple Puree',
      'Zucchini Flower Beignets with Ricotta',
      'Dark Chocolate Ganache with Sea Salt & Espresso Cream'
    ],
    vibeTags: ['Outdoor Seating', 'Romantic'],
    imageUrl: '/images/restaurants/grasshopper-bannerghatta.jpg',
    sourceImg: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://www.google.com/maps/place/Grasshopper/@12.8715,77.5972,17z',
    timings: '7:30 PM – 11:00 PM (Tues–Sun, Strict Prior Reservation)',
    curatorNote: 'An unhurried culinary sanctuary. Candlelit dining surrounded by bamboo groves and cricket chirps with an ever-evolving, personalized seasonal menu.',
    isVegetarian: false,
    verified: true
  },
  {
    id: 'shiro-ub-city',
    name: 'Shiro',
    slug: 'shiro-ub-city',
    tagline: 'High-ceiling Pan-Asian temple with towering Zen sculptures, live Teppanyaki & Robata',
    description: 'A dramatic 40-foot-high architectural spectacle inside UB City with monumental stone Zen sculptures, cascading waterfalls, and luxury Pan-Asian gastronomy spanning live Teppanyaki, Robata skewers, and dim sum.',
    category: 'Pan-Asian & Japanese',
    neighborhood: 'Lavelle Road',
    address: '2nd Floor, UB City, Comet Block, Vittal Mallya Rd, Bengaluru, Karnataka 560001',
    lat: 12.97185,
    lng: 77.5966162,
    priceLevel: '₹₹₹₹',
    priceForTwo: '₹3,500',
    mustTry: [
      'Hibachi Teriyaki Tenderloin on Live Teppanyaki',
      'Shiro Signature Crispy Prawn Moirang Roll',
      'Peking Duck with Steamed Pancakes',
      'Spicy Chilean Seabass Dumpling',
      'Chocolate Volcano with Vanilla Bean Gelato'
    ],
    vibeTags: ['Romantic', 'Cocktail Program', 'Outdoor Seating'],
    imageUrl: '/images/restaurants/shiro-ub-city.jpg',
    sourceImg: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://www.google.com/maps/place/Shiro+Bengaluru/@12.97185,77.5966162,17z',
    timings: '12:00 PM – 11:30 PM',
    curatorNote: 'The towering Zen stone architecture makes dining here awe-inspiring. Sit at the live Teppanyaki counter for sizzling hibachi theater.',
    isVegetarian: false,
    verified: true
  },
  {
    id: 'kaze-residency-road',
    name: 'Kazé Bar & Kitchen',
    slug: 'kaze-residency-road',
    tagline: '13th-floor open-air skyline terrace with 360° city panoramas, Robatayaki & craft mixology',
    description: 'Perched 13 floors above Residency Road, Kazé offers Bangalore’s most dramatic skyline sunsets, luxury Pan-Asian robata skewers, sashimi platters, and bespoke botanical mixology on a breezy open terrace.',
    category: 'Cocktails & Rooftops',
    neighborhood: 'Church Street & MG Road',
    address: '13th Floor, SKAV 909, 9/1, Lavelle Road / Residency Rd, Richmond Town, Bengaluru, Karnataka 560025',
    lat: 12.9654907,
    lng: 77.5964235,
    priceLevel: '₹₹₹₹',
    priceForTwo: '₹3,200',
    mustTry: [
      'Charcoal Binchotan Salmon Skewers',
      'Truffle & Avocado Dragon Roll',
      'Robata Pork Belly Glazed with Yuzu Kosho',
      'Smoked Japanese Whiskey Cocktails',
      'Japanese Yuzu Cheesecake'
    ],
    vibeTags: ['Rooftop', 'Outdoor Seating', 'Romantic', 'Cocktail Program', 'Late Night'],
    imageUrl: '/images/restaurants/kaze-residency-road.jpg',
    sourceImg: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://www.google.com/maps/place/Kaz%C3%A9+Bar+%26+Kitchen/@12.9654907,77.5964235,17z',
    timings: '12:30 PM – 1:00 AM',
    curatorNote: 'Bangalore’s premier high-altitude open terrace. The 360-degree sunset view with a smoked cocktail and fresh robata skewers is unforgettable.',
    isVegetarian: false,
    verified: true
  },
  {
    id: 'nagarjuna-residency-road',
    name: 'Nagarjuna',
    slug: 'nagarjuna-residency-road',
    tagline: 'The 1984 Mecca of fiery Andhra banana-leaf Bhojanam, spicy Gunpowder & Chilli Chicken',
    description: 'The legendary 1984 flagship on Residency Road that defined Andhra meals for generations of Bangaloreans. Steaming hot sona masoori rice, melted ghee, fiery paruppu podi (gunpowder), and crispy green chilli chicken served on fresh banana leaves.',
    category: 'Regional & Coastal',
    neighborhood: 'Church Street & MG Road',
    address: '44/1, Residency Rd, Near Galaxy Theatre, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025',
    lat: 12.9729,
    lng: 77.6080,
    priceLevel: '₹₹',
    priceForTwo: '₹900',
    mustTry: [
      'Unlimited Andhra Banana Leaf Vegetarian Bhojanam',
      'Signature Nagarjuna Andhra Chilli Chicken',
      'Fiery Mutton Sukka & Andhra Pepper Chicken',
      'Shahi Tukda & Sweet Payasam'
    ],
    vibeTags: ['Pocket Friendly', 'Heritage (Pre-1980)'],
    imageUrl: '/images/restaurants/nagarjuna-residency-road.jpg',
    sourceImg: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://www.google.com/maps/place/Nagarjuna+Restaurant+-+Residency+Road/@12.9729,77.6080,17z',
    timings: '12:00 PM – 3:45 PM, 7:00 PM – 10:45 PM',
    curatorNote: 'Bangalore’s quintessential spicy lunch ritual. Heap steaming rice on your banana leaf, douse in hot ghee and gunpowder, and pair with the fiery green chilli chicken.',
    isVegetarian: false,
    verified: true
  },
  {
    id: 'samarkand-infantry-road',
    name: 'Samarkand',
    slug: 'samarkand-infantry-road',
    tagline: 'Timeless Northwest Frontier & Peshawari feast with open glass tandoors & Gosht Rogan Josh',
    description: 'A beloved 20-year-old culinary landmark on Infantry Road styled after an ancient Silk Route caravanserai. Features floor-to-ceiling glass show-kitchens where master ustads bake massive karari rotis and simmer rich Peshawari gravies.',
    category: 'Modern Indian & Dining',
    neighborhood: 'CBD & Central',
    address: 'Gem Plaza, 66, Infantry Rd, Tasker Town, Shivaji Nagar, Bengaluru, Karnataka 560001',
    lat: 12.9818,
    lng: 77.5992,
    priceLevel: '₹₹₹',
    priceForTwo: '₹2,200',
    mustTry: [
      'Giant Karari Roti Drizzled with Spiced Ghee',
      'Gosht Rogan Josh simmered on dum',
      'Dahi Ke Kebab & Galouti Kebab',
      'Bukhara Style Sikandari Raan',
      'Zafrani Phirni in Clay Pots'
    ],
    vibeTags: ['Romantic'],
    imageUrl: '/images/restaurants/samarkand-infantry-road.jpg',
    sourceImg: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://www.google.com/maps/place/Samarkand/@12.9818,77.5992,17z',
    timings: '12:00 PM – 3:30 PM, 7:00 PM – 11:30 PM',
    curatorNote: 'The massive dome of spiced Karari Roti shattered at the table and the fork-tender Gosht Rogan Josh are eternal Bangalore classics.',
    isVegetarian: false,
    verified: true
  },
  {
    id: 'hotel-empire-shivajinagar',
    name: 'Hotel Empire (1966 Flagship)',
    slug: 'hotel-empire-shivajinagar',
    tagline: 'Bangalore’s legendary 1966 midnight institution for crispy Butter Chicken & Coin Parottas',
    description: 'The historic original 1966 mother branch on Central Street in Shivajinagar that sparked Bangalore’s famous post-midnight dining culture. Known city-wide for its signature spiced Empire Butter Chicken, fragrant Ghee Rice, and layered flaky coin parottas.',
    category: 'Regional & Coastal',
    neighborhood: 'CBD & Central',
    address: '36, Central St, Tasker Town, Shivaji Nagar, Bengaluru, Karnataka 560001',
    lat: 12.9822,
    lng: 77.6045,
    priceLevel: '₹₹',
    priceForTwo: '₹800',
    mustTry: [
      'Original Empire Special Fried Butter Chicken',
      'Fragrant Ghee Rice & Mutton Kheema Curry',
      'Flaky Kerala Coin Parottas',
      'Grilled Tandoori Chicken & Brain Fry',
      'Caramel Custard'
    ],
    vibeTags: ['Late Night', 'Pocket Friendly', 'Heritage (Pre-1980)'],
    imageUrl: '/images/restaurants/hotel-empire-shivajinagar.jpg',
    sourceImg: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://www.google.com/maps/place/Hotel+Empire+-+Central+Street/@12.9822,77.6045,17z',
    timings: '10:00 AM – 2:00 AM (Late Night Everyday)',
    curatorNote: 'The undisputed soul of Bangalore midnight dining since 1966. Dip hot, flaky coin parottas into the crispy, spiced fried Butter Chicken gravy at 1 AM.',
    isVegetarian: false,
    verified: true
  },
  {
    id: 'magnolia-bakery-indiranagar',
    name: 'Magnolia Bakery',
    slug: 'magnolia-bakery-indiranagar',
    tagline: 'NYC’s world-famous bakery flagship for iconic fresh Banana Pudding & pastel cupcakes',
    description: 'The first international outpost in India of New York City’s legendary Bleecker Street bakery. Located on 100 Feet Road, it draws daily queues for its whipped fresh Banana Pudding, layered cheesecakes, and vintage pastel buttercream cupcakes.',
    category: 'Bakeries & Desserts',
    neighborhood: 'Indiranagar',
    address: '788, 100 Feet Rd, 12th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
    lat: 12.9790,
    lng: 77.6405,
    priceLevel: '₹₹',
    priceForTwo: '₹800',
    mustTry: [
      'World-Famous Classic Banana Pudding',
      'Chocolate Hazelnut Banana Pudding',
      'Red Velvet Cupcake with Vanilla Cream Cheese',
      'Tres Leches Cake & New York Cheesecake'
    ],
    vibeTags: ['Outdoor Seating'],
    imageUrl: '/images/restaurants/magnolia-bakery-indiranagar.jpg',
    sourceImg: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85',
    googleMapsUrl: 'https://www.google.com/maps/place/Magnolia+Bakery/@12.9790,77.6405,17z',
    timings: '10:00 AM – 11:30 PM',
    curatorNote: 'The Classic Banana Pudding (layers of creamy vanilla pudding, Nilla wafers, and fresh bananas) is a global icon executed to perfection on 100 Feet Road.',
    isVegetarian: true,
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

  for (const h of HEAVYWEIGHTS) {
    const destPath = path.join(imagesDir, `${h.id}.jpg`);
    try {
      const buf = await fetchBuffer(h.sourceImg);
      await sharp(buf)
        .resize({ width: 1000, height: 700, fit: 'cover', position: 'center' })
        .jpeg({ quality: 82, progressive: true })
        .toFile(destPath);
      console.log(`  ✓ Saved ${h.id}.jpg`);
    } catch (e) {
      console.error(`  Error saving image for ${h.name}:`, e.message);
    }
  }

  const restaurantsPath = path.join(__dirname, '../src/data/restaurants.ts');
  const code = fs.readFileSync(restaurantsPath, 'utf8');
  const eqIdx = code.indexOf('= [');
  const jsonStr = code.slice(eqIdx + 2, code.lastIndexOf(']') + 1);
  let list = JSON.parse(jsonStr);

  const existingIds = new Set(list.map(r => r.id));
  HEAVYWEIGHTS.forEach(h => {
    const cleanEntry = { ...h };
    delete cleanEntry.sourceImg;
    if (!existingIds.has(cleanEntry.id)) {
      list.push(cleanEntry);
    }
  });

  const updatedCode = `import { Restaurant } from '@/types';\n\nexport const INITIAL_RESTAURANTS: Restaurant[] = ${JSON.stringify(list, null, 2)};\n`;
  fs.writeFileSync(restaurantsPath, updatedCode, 'utf8');

  console.log(`\n🎉 DONE! Added all ${HEAVYWEIGHTS.length} heavyweights. Total restaurants: ${list.length}`);
}

run().catch(console.error);
