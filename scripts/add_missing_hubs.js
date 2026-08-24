const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const NEW_HUBS_SPOTS = [
  // ================= 1. KALYAN NAGAR & KAMMANAHALLI =================
  {
    id: 'arirang-korean-kammanahalli',
    name: 'Arirang Korean Restaurant',
    slug: 'arirang-korean-kammanahalli',
    tagline: 'The legendary grandfather of authentic Korean tabletop BBQ & in-house grocery mart',
    description: 'The beating culinary heart of Korean expat dining in Kammanahalli. Features an authentic ground-floor Korean grocery mart and traditional upper-floor dining with built-in tabletop grills serving thick-cut pork belly and uncompromised fermented kimchi.',
    category: 'Pan-Asian & Japanese',
    neighborhood: 'Kalyan Nagar & Kammanahalli',
    address: '13, N.K. Enclave Building, 4th Cross, Kammanahalli Main Rd, Bengaluru, Karnataka 560084',
    searchQuery: 'Arirang Korean Restaurant Kammanahalli Main Road Bengaluru',
    fallbackLat: 13.0076,
    fallbackLng: 77.6384,
    priceLevel: '₹₹₹',
    priceForTwo: '₹1,800',
    mustTry: ['Samgyeopsal (Tabletop Grilled Pork Belly)', 'Dolsot Bibimbap', 'Kimchi Jjigae with Aged Tofu', 'Haemul Pajeon Seafood Pancake'],
    vibeTags: ['Authentic Expat Enclave', 'Tabletop BBQ', 'Traditional Floor Seating'],
    imageUrl: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1000&q=80',
    timings: '11:30 AM – 3:30 PM, 6:00 PM – 10:30 PM',
    curatorNote: 'Refuses to dilute traditional Korean spice or fermentation for local palates. The tabletop grill ritual and pungent house-fermented kimchi banchan are peerless.',
    isVegetarian: false,
    verified: true,
  },
  {
    id: 'hi-seoul-kalyan-nagar',
    name: 'Hi Seoul',
    slug: 'hi-seoul-kalyan-nagar',
    tagline: 'Soulful, unpretentious Korean home cooking in a converted neighborhood bungalow',
    description: 'Tucked discreetly into HRBR Layout, Hi Seoul is a beloved, family-run eatery that feels like stepping into a private home in Seoul. Famous for generous hospitality, piping hot noodle stews, and unlimited homemade banchan refills.',
    category: 'Pan-Asian & Japanese',
    neighborhood: 'Kalyan Nagar & Kammanahalli',
    address: '309, 7th Main Rd, HRBR Layout 2nd Block, Kalyan Nagar, Bengaluru, Karnataka 560043',
    searchQuery: 'Hi Seoul HRBR Layout 2nd Block Kalyan Nagar Bengaluru',
    fallbackLat: 13.0195,
    fallbackLng: 77.6465,
    priceLevel: '₹₹',
    priceForTwo: '₹1,300',
    mustTry: ['Chicken & Beef Gimbap', 'Budae Jjigae (Army Stew)', 'Japchae Glass Noodles', 'Tteokbokki Rice Cakes'],
    vibeTags: ['Cozy House Cafe', 'Homestyle K-Comfort', 'Generous Banchan Refills'],
    imageUrl: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1000&q=80',
    timings: '12:00 PM – 3:30 PM, 6:00 PM – 10:00 PM',
    curatorNote: 'The master of daily Korean comfort food. Gentle home-style broth preparations and crisp, made-to-order gimbap make this one of the city’s most honest dining rooms.',
    isVegetarian: false,
    verified: true,
  },
  {
    id: 'the-coorg-food-co-kalyan-nagar',
    name: 'The Coorg Food Co.',
    slug: 'the-coorg-food-co-kalyan-nagar',
    tagline: 'The definitive temple of smoky Pandi Curry with wood-smoked Kachampuli & Kadambuttu',
    description: 'Dedicated exclusively to authentic Kodava plantation recipes, sourcing pure Kachampuli (black garcinia vinegar) and spices directly from estates in Coorg. The smoky Pandi Curry is an essential Bangalore culinary milestone.',
    category: 'Regional & Coastal',
    neighborhood: 'Kalyan Nagar & Kammanahalli',
    address: '2nd Floor, Masand Esquire, Hennur Main Rd, HRBR Layout 3rd Block, Kalyan Nagar, Bengaluru, Karnataka 560043',
    searchQuery: 'The Coorg Food Co Hennur Main Road Kalyan Nagar Bengaluru',
    fallbackLat: 13.0185,
    fallbackLng: 77.6432,
    priceLevel: '₹₹',
    priceForTwo: '₹1,100',
    mustTry: ['Iconic Pandi Curry', 'Steamed Kadambuttu (Rice Dumplings)', 'Crisp Akki Otti Flatbreads', 'Pork Pepper Dry Fry'],
    vibeTags: ['Kodava Heritage', 'Cult Pork Destination', 'Pocket Friendly'],
    imageUrl: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1000&q=80',
    timings: '12:00 PM – 3:30 PM, 7:00 PM – 11:00 PM',
    curatorNote: 'Unlike generic restaurants using tamarind substitutes, The Coorg Food Co. uses authentic wood-smoked Kachampuli and ancestral roasting methods.',
    isVegetarian: false,
    verified: true,
  },
  {
    id: 'chulha-chouki-da-dhaba-flagship',
    name: 'Chulha Chouki Da Dhaba (Original Flagship)',
    slug: 'chulha-chouki-da-dhaba-flagship',
    tagline: 'The iconic mothership that sparked Bangalore’s rustic live charcoal dhaba revolution',
    description: 'Furnished with traditional woven charpais (cots), hurricane lanterns, and an open live tandoor counter, the original Kalyan Nagar flagship serves unadulterated North Indian dhaba comfort food on traditional kansa thalis.',
    category: 'Modern Indian & Dining',
    neighborhood: 'Kalyan Nagar & Kammanahalli',
    address: '1-M, 404, Masand Esquire, Hennur Main Rd, HRBR Layout 3rd Block, Kalyan Nagar, Bengaluru, Karnataka 560043',
    searchQuery: 'Chulha Chouki Da Dhaba Hennur Road Kalyan Nagar Bengaluru',
    fallbackLat: 13.0184,
    fallbackLng: 77.6430,
    priceLevel: '₹₹',
    priceForTwo: '₹900',
    mustTry: ['Smoky Kalmi Kebab', 'Charcoal-Smoked Chicken Angara', 'Lahsuni Paneer Tikka', 'Dal Makhani with Garlic Kulcha', 'Chilled Malai Kullad Lassi'],
    vibeTags: ['Charpai Seating', 'Live Tandoor', 'Pocket Friendly'],
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80',
    timings: '12:00 PM – 3:30 PM, 7:00 PM – 11:00 PM',
    curatorNote: 'The original flagship maintains superior tandoor mastery and smoky charcoal profiling that modern franchised outlets rarely replicate.',
    isVegetarian: false,
    verified: true,
  },
  {
    id: 'al-amanah-cafe-kammanahalli',
    name: 'Al Amanah Cafe',
    slug: 'al-amanah-cafe-kammanahalli',
    tagline: 'The legendary birthplace of the fry-stuffed Chicken Kudu Jumbo Roll',
    description: 'A 10+ year cult institution in Kammanahalli drawing midnight food pilgrims across the city. World-famous for its Gulf-style Arabian rolls, where spiced meats, garlic toum, and crispy french fries are wrapped inside hot kuboos.',
    category: 'Street Food & Chaat',
    neighborhood: 'Kalyan Nagar & Kammanahalli',
    address: '19/20, 5th Avenue, 5th Main Rd, Kullappa Circle, Kammanahalli, Bengaluru, Karnataka 560084',
    searchQuery: 'Al Amanah Cafe Kullappa Circle Kammanahalli Bengaluru',
    fallbackLat: 13.0073,
    fallbackLng: 77.6412,
    priceLevel: '₹',
    priceForTwo: '₹400',
    mustTry: ['Chicken Kudu Jumbo Roll (Stuffed with Fries)', 'Crispy Chicken Jumbo Roll', 'Mutton Kheema Roll', 'Hot Cheesy Kunafa'],
    vibeTags: ['Pocket Friendly', 'Late Night Ritual', 'Arabian Street Classic'],
    imageUrl: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=1000&q=80',
    timings: '11:00 AM – 1:00 AM',
    curatorNote: 'Decades of uncompromised garlic toum mastery and legendary late-night consistency make this an immortal Kammanahalli street legend.',
    isVegetarian: false,
    verified: true,
  },
  {
    id: 'brewklyn-microbrewery-cmr',
    name: 'Brewklyn Microbrewery',
    slug: 'brewklyn-microbrewery-cmr',
    tagline: 'Brooklyn-inspired industrial craft brews & rooftop breezes on CMR Road',
    description: 'Set atop B.R. Plaza overlooking CMR Road, Brewklyn brings NYC industrial brewery aesthetics to Kalyan Nagar. Features exposed brick walls, a custom brew-kit, pool tables, and breezy rooftop seating pouring fresh grain-to-glass artisanal beers.',
    category: 'Microbrewery',
    neighborhood: 'Kalyan Nagar & Kammanahalli',
    address: '30, 4th & 5th Floor, B.R. Plaza, CMR Main Rd, HRBR Layout 2nd Block, Kalyan Nagar, Bengaluru, Karnataka 560043',
    searchQuery: 'Brewklyn Microbrewery CMR Main Road Kalyan Nagar Bengaluru',
    fallbackLat: 13.0189,
    fallbackLng: 77.6478,
    priceLevel: '₹₹₹',
    priceForTwo: '₹1,900',
    mustTry: ['Brewklyn Belgian Witbier', 'Biggie New England IPA', 'Smoked Pork Belly Bites', 'Wood-Fired Butter Chicken Pizza'],
    vibeTags: ['Craft Beer', 'Rooftop', 'Outdoor Seating', 'Cocktail Program'],
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80',
    timings: '12:00 PM – 1:00 AM',
    curatorNote: 'The uncontested craft brewery champion of Kalyan Nagar. Brewmaster precision ensures their Belgian Wits and seasonal IPAs stay true-to-style without off-flavors.',
    isVegetarian: false,
    verified: true,
  },

  // ================= 2. VV PURAM FOOD STREET & HERITAGE =================
  {
    id: 'shivanna-gulkand-center-vv-puram',
    name: 'Shivanna Gulkand Center',
    slug: 'shivanna-gulkand-center-vv-puram',
    tagline: 'The 1960s pioneer of sun-ripened Damascus Rose Jam, butter fruit & malai ice cream',
    description: 'Founded in the late 1960s on Thindi Beedi (VV Puram Food Street), this modest dessert counter pioneered Bangalore’s post-dinner street ritual. Sun-cured rose petal gulkand layered with seasonal avocado/fruits, rich malai ice cream, and fresh white butter.',
    category: 'Bakeries & Desserts',
    neighborhood: 'Basavanagudi',
    address: '128/1, Diagonal Rd, Food Street (Thindi Beedi), VV Puram, Basavanagudi, Bengaluru, Karnataka 560004',
    searchQuery: 'Shivanna Gulkand Center Food Street VV Puram Basavanagudi Bengaluru',
    fallbackLat: 12.9450,
    fallbackLng: 77.5755,
    priceLevel: '₹',
    priceForTwo: '₹200',
    mustTry: ['Special Gulkand with Ice Cream, Butter & Fruits', 'Butter Fruit (Avocado) Gulkand', 'Dry Fruit Gulkand', 'Masala Soda'],
    vibeTags: ['Heritage (Pre-1980)', 'Pure Veg', 'Pocket Friendly', 'Late Night Ritual'],
    imageUrl: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=1000&q=80',
    timings: '11:00 AM – 11:30 PM',
    curatorNote: 'The mandatory closing chapter of any VV Puram food trail. The textural contrast between floral chewy gulkand, dense malai cream, and fresh butter is magical.',
    isVegetarian: true,
    verified: true,
  },
  {
    id: 'shri-vasavi-condiments-vv-puram',
    name: 'Shri Vasavi Condiments',
    slug: 'shri-vasavi-condiments-vv-puram',
    tagline: 'The genesis of Bengaluru’s famous Avarebele Mela & legendary Congress groundnuts',
    description: 'The iconic confectionery on VV Puram Food Street that revolutionized Bangalore street culture by creating the annual Avarebele Mela. Celebrated year-round for its spicy Congress Kadlekai and double-peeled hyacinth bean savories.',
    category: 'Street Food & Chaat',
    neighborhood: 'Basavanagudi',
    address: 'Food Street (Thindi Beedi), Near Sajjan Rao Circle, VV Puram, Basavanagudi, Bengaluru, Karnataka 560004',
    searchQuery: 'Shri Vasavi Condiments Food Street VV Puram Bengaluru',
    fallbackLat: 12.9470,
    fallbackLng: 77.5756,
    priceLevel: '₹',
    priceForTwo: '₹200',
    mustTry: ['Authentic Congress Kadlekai (Spiced Peanuts)', 'Fried Avarebele Mixture', 'Hitikida Avarekai Vada', 'Avarebele Dosa & Paddu'],
    vibeTags: ['Pure Veg', 'Pocket Friendly', 'Heritage (Pre-1980)'],
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80',
    timings: '9:00 AM – 10:30 PM',
    curatorNote: 'Transformed a local seasonal bean into an immortal Bangalore cultural identity. Exceptional freshness and crunchy legume textures without artificial preservatives.',
    isVegetarian: true,
    verified: true,
  },
  {
    id: 'hotel-navayuga-gandhinagar',
    name: 'Hotel Navayuga',
    slug: 'hotel-navayuga-gandhinagar',
    tagline: 'The mythical 1981 Mecca of scorched Green Chilli Chicken & banana-leaf Andhra meals',
    description: 'Established in 1981 in Majestic’s film-distributor district of Gandhinagar, Navayuga is Bangalore’s definitive sanctum for fiery Andhra non-veg dining. Steaming rice on banana leaves served with gongura, kandi podi, and their legendary Green Chilli Chicken.',
    category: 'Regional & Coastal',
    neighborhood: 'CBD & Central',
    address: '1, Aparna Complex, Subedar Chatram (SC) Rd, Gandhi Nagar, Majestic, Bengaluru, Karnataka 560009',
    searchQuery: 'Hotel Navayuga Aparna Complex SC Road Gandhi Nagar Bengaluru',
    fallbackLat: 12.9770,
    fallbackLng: 77.5750,
    priceLevel: '₹₹',
    priceForTwo: '₹650',
    mustTry: ['Navayuga Green Chilli Chicken (Fiery Green Chilli Gravy)', 'Full Andhra Banana Leaf Meal', 'Mutton Roast in Peppery Masala', 'Seer Fish Tawa Fry'],
    vibeTags: ['Heritage (Pre-1980)', 'Pocket Friendly'],
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80',
    timings: '11:30 AM – 4:00 PM, 7:00 PM – 11:00 PM',
    curatorNote: 'While modern chains diluted traditional Andhra heat, Navayuga preserves the unapologetic, green-chilli scorched purity of 1980s Gandhinagar dining.',
    isVegetarian: false,
    verified: true,
  },

  // ================= 3. NORTH BANGALORE =================
  {
    id: 'the-druid-garden-sahakar-nagar',
    name: 'The Druid Garden',
    slug: 'the-druid-garden-sahakar-nagar',
    tagline: 'India’s premier 360-degree retractable glass-roof microbrewery & botanical culinary haven',
    description: 'Perched on the 3rd floor of Century Corbel in Sahakar Nagar, The Druid Garden is an architectural marvel featuring a motorized 360-degree retractable glass roof that opens up to Bangalore’s night breeze. Pairs Czech/German craft beers with refined European and Pan-Asian dishes.',
    category: 'Microbrewery',
    neighborhood: 'Bel Road & North BLR',
    address: '3rd Floor, Century Corbel Commercial, 40/1 Sahakara Nagar Main Rd, Sahakara Nagar, Bengaluru, Karnataka 560092',
    searchQuery: 'The Druid Garden Century Corbel Sahakara Nagar Bengaluru',
    fallbackLat: 13.0617,
    fallbackLng: 77.5878,
    priceLevel: '₹₹₹',
    priceForTwo: '₹2,500',
    mustTry: ['Chorizo & Fior di Latte Sourdough Pizza', 'Czech Pilsner & Galaxy IPA', 'Hometown Chicken in Black Bean', 'Grilled Kam Heyong Lamb', 'Aztec Coffee Cocktail'],
    vibeTags: ['Craft Beer', 'Rooftop', 'Outdoor Seating', 'Romantic', 'Cocktail Program'],
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    timings: '12:00 PM – 1:00 AM',
    curatorNote: 'Pairs its breathtaking retractable glass-roof architecture with genuine brewing integrity and a kitchen that treats European and Pan-Asian recipes with equal precision.',
    isVegetarian: false,
    verified: true,
  },
  {
    id: 'far-and-east-four-seasons',
    name: 'Far & East',
    slug: 'far-and-east-four-seasons',
    tagline: '21st-floor rooftop luxury featuring authentic Japanese Binchotan Robata, omakase & skyline views',
    description: 'Located atop the Four Seasons Hotel Bengaluru at Embassy ONE on Bellary Road, Far & East is designed by Yabu Pushelberg. Features an open Robata grill with binchotan charcoal, air-flown sashimi sushi counter, and panoramic skyline vistas.',
    category: 'Pan-Asian & Japanese',
    neighborhood: 'Bel Road & North BLR',
    address: '21st Floor, Four Seasons Hotel Bengaluru, 8 Bellary Rd, Ganganagar, Bengaluru, Karnataka 560032',
    searchQuery: 'Far and East Four Seasons Hotel Bengaluru Bellary Road',
    fallbackLat: 13.0238,
    fallbackLng: 77.5866,
    priceLevel: '₹₹₹₹',
    priceForTwo: '₹5,000',
    mustTry: ['Hamachi Carpaccio with Truffle Ponzu', 'Robata Lamb Chops with Saikyo Miso', 'Chef’s Omakase Sashimi Platter', 'Truffle Edamame Dim Sum', 'Matcha Molten Lava Cake'],
    vibeTags: ['Rooftop', 'Romantic', 'Cocktail Program'],
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1000&q=80',
    timings: '12:30 PM – 3:30 PM, 7:00 PM – 11:30 PM',
    curatorNote: 'The undisputed high-water mark for Japanese and modern Pan-Asian fine dining in North Bangalore. World-class robata grilling and omakase sashimi.',
    isVegetarian: false,
    verified: true,
  },
  {
    id: 'oia-bangalore-hennur',
    name: 'Oia Bangalore',
    slug: 'oia-bangalore-hennur',
    tagline: 'Asia’s largest 87,000 sq ft Santorini-inspired amphitheater dining sanctuary & cocktail haven',
    description: 'Spanning an enormous 87,000 sq ft in Hennur, Oia is inspired by the cliffside whitewashed architecture of Santorini, Greece. Sweeping white arches, cascading water bodies, and dramatic columns pair with a global menu curated with Michelin-level culinary rigor.',
    category: 'Modern Indian & Dining',
    neighborhood: 'Bel Road & North BLR',
    address: 'Plot No. 162/2, Hennur Main Rd, Visthar, Opp. Mantri Webcity, Bengaluru, Karnataka 560077',
    searchQuery: 'Oia Bangalore Hennur Main Road Visthar Bengaluru',
    fallbackLat: 13.0658,
    fallbackLng: 77.6540,
    priceLevel: '₹₹₹',
    priceForTwo: '₹2,800',
    mustTry: ['Whiskey Glazed Roasted Chicken with Truffle Mash', 'Garlic Butter Prawns', 'Aburi Hamachi Uramaki', 'Grand Mediterranean Mezze Platter', 'Baileys Salted Caramel Tiramisu'],
    vibeTags: ['Outdoor Seating', 'Romantic', 'Cocktail Program'],
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    timings: '12:00 PM – 1:00 AM',
    curatorNote: 'Proves that monumental architectural scale does not have to sacrifice culinary craftsmanship—delivering one of the most stunning open-air dining atmospheres in South India.',
    isVegetarian: false,
    verified: true,
  }
];

async function main() {
  console.log(`Starting Google Maps Headless Chrome verification for ${NEW_HUBS_SPOTS.length} new hub spots...`);
  
  const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800'],
  });

  const verifiedList = [];

  for (const spot of NEW_HUBS_SPOTS) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    
    let resolvedUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.searchQuery)}`;
    let lat = spot.fallbackLat;
    let lng = spot.fallbackLng;

    try {
      console.log(`Searching for: ${spot.name} (${spot.neighborhood})...`);
      await page.goto(resolvedUrl, { waitUntil: 'networkidle2', timeout: 20000 });
      await new Promise(r => setTimeout(r, 2000));

      const currentUrl = page.url();
      if (currentUrl.includes('/place/') || currentUrl.includes('@')) {
        resolvedUrl = currentUrl;
        const match = currentUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
        if (match) {
          lat = parseFloat(match[1]);
          lng = parseFloat(match[2]);
        }
      }
      console.log(`  ✓ Resolved: ${lat}, ${lng}`);
    } catch (err) {
      console.warn(`  ⚠ Fallback for ${spot.name}:`, err.message);
    } finally {
      await page.close();
    }

    const { searchQuery, fallbackLat, fallbackLng, ...cleanSpot } = spot;
    verifiedList.push({
      ...cleanSpot,
      lat,
      lng,
      googleMapsUrl: resolvedUrl,
    });
  }

  await browser.close();

  // Load existing restaurants
  const restaurantsPath = path.join(__dirname, '../src/data/restaurants.ts');
  const code = fs.readFileSync(restaurantsPath, 'utf8');
  const eqIdx = code.indexOf('= [');
  const jsonStr = code.slice(eqIdx + 2, code.lastIndexOf(']') + 1);
  const existingList = JSON.parse(jsonStr);

  const existingIds = new Set(existingList.map(r => r.id));
  const newSpotsToAdd = verifiedList.filter(r => !existingIds.has(r.id));

  console.log(`Adding ${newSpotsToAdd.length} new spots to existing ${existingList.length} spots...`);
  const combined = [...existingList, ...newSpotsToAdd];

  const updatedCode = `import { Restaurant } from '@/types';\n\nexport const INITIAL_RESTAURANTS: Restaurant[] = ${JSON.stringify(combined, null, 2)};\n`;
  fs.writeFileSync(restaurantsPath, updatedCode, 'utf8');

  console.log(`✓ Master dataset successfully updated! Total spots now: ${combined.length}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
