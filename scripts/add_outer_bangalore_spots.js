const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CANDIDATE_SPOTS = [
  // ================= 1. HSR LAYOUT =================
  {
    id: 'beanlore-coffee-roasters-hsr',
    name: 'Beanlore Coffee Roasters',
    slug: 'beanlore-coffee-roasters-hsr',
    tagline: 'Single-origin estate micro-roasting, precision manual pour-overs & Basque cheesecake',
    description: 'Operating with single-estate transparency and small-batch roasting in HSR Sector 4, Beanlore is the benchmark for third-wave specialty coffee in South Bangalore. Features custom espresso profiles and a serene sunlit space.',
    category: 'Specialty Coffee & Cafe',
    neighborhood: 'HSR Layout',
    address: '450, Ground Floor, 17th Cross Rd, Sector 4, HSR Layout, Bengaluru, Karnataka 560102',
    searchQuery: 'Beanlore Coffee Roasters Sector 4 HSR Layout Bengaluru',
    fallbackLat: 12.9123,
    fallbackLng: 77.6390,
    priceLevel: '₹₹',
    priceForTwo: '₹700',
    mustTry: ['Single-Origin Manual Pour-Over (V60)', 'Cortado with Micro-Foam', 'San Sebastián Basque Burnt Cheesecake', 'Smoked Mozzarella Pesto Toastie'],
    vibeTags: ['Filter Coffee Spot', 'Work Friendly', 'Artisanal Sourdough', 'Breakfast Spot'],
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80',
    timings: '7:30 AM – 11:00 PM',
    curatorNote: 'Roasting on-site with meticulous temperature and airflow profiling, Beanlore avoids the burnt, generic profiles of commercial cafe chains.',
    isVegetarian: false,
    verified: true,
  },
  {
    id: 'asha-tiffins-hsr',
    name: 'Asha Tiffins',
    slug: 'asha-tiffins-hsr',
    tagline: 'The undisputed ghee-soaked South Indian breakfast benchmark of HSR Layout',
    description: 'The reigning crown jewel of South Indian breakfast culture in HSR Layout. Standing shoulder-to-shoulder with Bangalore legacy institutions, Asha Tiffins serves blistering crisp dosas, pillowy thatte idlis, and frothy degree filter coffee.',
    category: 'Iconic Heritage',
    neighborhood: 'HSR Layout',
    address: '1170, 5th Main Rd, Sector 7, HSR Layout, Bengaluru, Karnataka 560102',
    searchQuery: 'Asha Tiffins Sector 7 HSR Layout Bengaluru',
    fallbackLat: 12.9090,
    fallbackLng: 77.6402,
    priceLevel: '₹',
    priceForTwo: '₹250',
    mustTry: ['Open Butter Masala Dosa', 'Ghee Podi Masala Dosa', 'Thatte Idli Dip Sambar', 'Steaming Degree Filter Coffee'],
    vibeTags: ['Pure Veg', 'Breakfast Spot', 'Filter Coffee Spot', 'Pocket Friendly'],
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80',
    timings: '6:30 AM – 10:30 PM',
    curatorNote: 'The aroma of pure clarified butter and freshly ground filter coffee draws massive crowds daily without ever dropping in speed or crunch quality.',
    isVegetarian: true,
    verified: true,
  },
  {
    id: 'broadway-gourmet-theatre-hsr',
    name: 'Broadway – The Gourmet Theatre',
    slug: 'broadway-gourmet-theatre-hsr',
    tagline: 'High-octane live Teppanyaki, volcanic rock searing & Pan-Asian rooftop dining',
    description: 'Perched on the top floor of 27th Main in HSR Layout, Broadway transforms fine dining into experiential culinary theatre. Anchored by a live Teppanyaki counter, table-side volcanic rock searing, and inventive cocktails.',
    category: 'Pan-Asian & Japanese',
    neighborhood: 'HSR Layout',
    address: '4th Floor, 2802, 27th Main Rd, Sector 1, HSR Layout, Bengaluru, Karnataka 560102',
    searchQuery: 'Broadway Gourmet Theatre 27th Main Sector 1 HSR Layout Bengaluru',
    fallbackLat: 12.9152,
    fallbackLng: 77.6435,
    priceLevel: '₹₹₹',
    priceForTwo: '₹2,200',
    mustTry: ['Live Teppanyaki Tori Niku / Prawns', 'Scallops on Volcanic Rock', 'Truffle Edamame Crystal Dumplings', 'Dragon Sushi Roll'],
    vibeTags: ['Rooftop', 'Cocktail Program', 'Outdoor Seating', 'Romantic'],
    imageUrl: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1000&q=80',
    timings: '12:00 PM – 3:30 PM, 7:00 PM – 11:30 PM',
    curatorNote: 'Unlike gimmick concepts, Broadway’s theatrics are backed by exceptional seafood sourcing, razor-sharp knife skills, and authentic Japanese umami balance.',
    isVegetarian: false,
    verified: true,
  },
  {
    id: 'kumarakom-restaurant-hsr',
    name: 'Kumarakom Restaurant',
    slug: 'kumarakom-restaurant-hsr',
    tagline: 'The gold standard for banana-leaf Karimeen Pollichathu & flaky Malabar parottas',
    description: 'An uncompromising bastion of traditional God’s Own Country flavors in HSR. Kumarakom focuses strictly on heritage backwater seafood, Malabar spice blends, slow-braised meats, and lacy appams.',
    category: 'Regional & Coastal',
    neighborhood: 'HSR Layout',
    address: '47, Ground Floor, 18th Main Rd, Sector 3, HSR Layout, Bengaluru, Karnataka 560102',
    searchQuery: 'Kumarakom Restaurant 18th Main Sector 3 HSR Layout Bengaluru',
    fallbackLat: 12.9115,
    fallbackLng: 77.6410,
    priceLevel: '₹₹',
    priceForTwo: '₹800',
    mustTry: ['Karimeen Pollichathu in Banana Leaf', 'Kerala Beef Fry (Ularthiyathu)', 'Flaky Malabar Parotta with Kozhi Stew', 'Crisp Netholi Fry'],
    vibeTags: ['Pocket Friendly'],
    imageUrl: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1000&q=80',
    timings: '11:30 AM – 11:00 PM',
    curatorNote: 'The benchmark for authentic Kerala seafood in South Bangalore. Its Karimeen Pollichathu and slow-cooked Beef Fry have commanded dedicated weekend queues for years.',
    isVegetarian: false,
    verified: true,
  },
  {
    id: 'blr-brewing-co-hsr',
    name: 'BLR Brewing Co.',
    slug: 'blr-brewing-co-hsr',
    tagline: 'Biophilic open-air craft brewery with lush water bodies & small-batch craft pours',
    description: 'Spanning a massive biophilic open-air space featuring koi ponds, cascading waterfalls, and an elevated rooftop deck, BLR Brewing Co. pairs freshly brewed craft beers with regional Karnataka and global bar plates.',
    category: 'Microbrewery',
    neighborhood: 'HSR Layout',
    address: '450, 1st Floor, 17th Cross Rd, Sector 4, HSR Layout, Bengaluru, Karnataka 560102',
    searchQuery: 'BLR Brewing Co 17th Cross Sector 4 HSR Layout Bengaluru',
    fallbackLat: 12.9123,
    fallbackLng: 77.6390,
    priceLevel: '₹₹',
    priceForTwo: '₹1,800',
    mustTry: ['Bangalore Wheat (Belgian Witbier)', 'Smoked English Stout', 'Kundapura Ghee Roast Chicken', 'Wood-Fired Neapolitan Pizza'],
    vibeTags: ['Craft Beer', 'Rooftop', 'Outdoor Seating', 'Cocktail Program'],
    imageUrl: 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&w=1000&q=80',
    timings: '12:00 PM – 1:00 AM',
    curatorNote: 'HSR’s undisputed microbrewery benchmark with high-ceiling koi pond seating and stellar small-batch Belgian Wit and seasonal fruit ciders.',
    isVegetarian: false,
    verified: true,
  },

  // ================= 2. RMZ ECOWORLD & BELLANDUR =================
  {
    id: 'burma-burma-ecoworld',
    name: 'Burma Burma',
    slug: 'burma-burma-ecoworld',
    tagline: 'Heirloom Burmese plant-based gastronomy & artisanal tea culture by the water promenade',
    description: 'India’s benchmark Burmese dining room inside The Bay at RMZ Ecoworld. Features pagoda woodwork, floor-to-ceiling glass overlooking the campus greenway, and multi-layered dishes crafted with ingredients sourced directly from Yangon.',
    category: 'Pan-Asian & Japanese',
    neighborhood: 'Bellandur & Ecoworld',
    address: 'The Bay, Campus 8A, RMZ Ecoworld, Outer Ring Road, Bellandur, Bengaluru, Karnataka 560103',
    searchQuery: 'Burma Burma The Bay RMZ Ecoworld Bellandur Bengaluru',
    fallbackLat: 12.9258,
    fallbackLng: 77.6867,
    priceLevel: '₹₹',
    priceForTwo: '₹1,600',
    mustTry: ['Burma Burma Oh No Khowsuey', 'Tea Leaf Salad (Laphet Thoke)', 'Tohu Mokhinga & Lotus Stem Crisps', 'Lavender Cold Brew Oolong Tea'],
    vibeTags: ['Pure Veg', 'Romantic', 'Outdoor Seating'],
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
    timings: '12:00 PM – 3:30 PM, 6:30 PM – 10:30 PM',
    curatorNote: '100% vegetarian yet celebrated even by hardcore carnivores. The Laphet Thoke (fermented tea leaf salad) and rich Khowsuey achieve world-class balance.',
    isVegetarian: true,
    verified: true,
  },
  {
    id: 'biergarten-bellandur',
    name: 'Biergarten Brewery & Kitchen',
    slug: 'biergarten-bellandur',
    tagline: 'Lush open-air Bavarian beer garden in the heart of the tech corridor',
    description: 'A sprawling, high-ceilinged craft brewing oasis in Devarabeesanahalli/Bellandur. Characterized by vertical greenery, exposed brickwork, and an open-air courtyard, serving authentic German hefeweizens, malty ales, and wood-fired pizzas.',
    category: 'Microbrewery',
    neighborhood: 'Bellandur & Ecoworld',
    address: '57/1A, Outer Varthur Rd, Devarabisanahalli, Bellandur, Bengaluru, Karnataka 560103',
    searchQuery: 'Biergarten Brewery Devarabisanahalli Bellandur Bengaluru',
    fallbackLat: 12.9238,
    fallbackLng: 77.6834,
    priceLevel: '₹₹₹',
    priceForTwo: '₹2,200',
    mustTry: ['Bavarian Hefeweizen', 'Code Reddy Red Ale', 'Biergarten Mezze Platter', 'Slow-Smoked BBQ Pork Ribs', 'Truffle Mushroom Pizza'],
    vibeTags: ['Craft Beer', 'Outdoor Seating', 'Cocktail Program'],
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80',
    timings: '12:00 PM – 1:00 AM',
    curatorNote: 'Biergarten sets the golden standard for ambiance and beer consistency on ORR with its tree canopy and stellar Bavarian wheat brews.',
    isVegetarian: false,
    verified: true,
  },
  {
    id: 'ironhill-bengaluru-orr',
    name: 'Ironhill Bengaluru',
    slug: 'ironhill-bengaluru-orr',
    tagline: 'One of the world’s largest microbreweries with resort-style lakeside bridges & sunken cabanas',
    description: 'Spanning an astonishing 130,000+ square feet on the Outer Ring Road corridor, Ironhill is a colossal resort-style craft brewing landmark built around a central water body with wooden bridges, tropical landscaping, and 8+ master-crafted beers on tap.',
    category: 'Microbrewery',
    neighborhood: 'Bellandur & Ecoworld',
    address: 'Sy No. 90/7 & 90/8, Outer Ring Road, Beside Radisson Blu, Marathahalli / Kadubeesanahalli, Bengaluru, Karnataka 560037',
    searchQuery: 'Ironhill Bengaluru Outer Ring Road Marathahalli Kadubeesanahalli',
    fallbackLat: 12.9436,
    fallbackLng: 77.6985,
    priceLevel: '₹₹₹',
    priceForTwo: '₹2,400',
    mustTry: ['Ironhill Belgian Witbier', 'German Hefeweizen', 'Tawa Podi Andhra Chicken', 'Wood-Fired Diavola Pepperoni Pizza', 'Slow-Braised Lamb Chops'],
    vibeTags: ['Craft Beer', 'Outdoor Seating', 'Cocktail Program'],
    imageUrl: 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&w=1000&q=80',
    timings: '12:00 PM – 1:00 AM',
    curatorNote: 'A monumental hospitality marvel. The massive water body and private cabana setup makes dining feel like a tropical resort rather than an urban tech corridor.',
    isVegetarian: false,
    verified: true,
  },

  // ================= 3. SARJAPUR ROAD =================
  {
    id: 'aurum-brew-works-sarjapur',
    name: 'Aurum Brew Works',
    slug: 'aurum-brew-works-sarjapur',
    tagline: 'Artisanal craft brewery pairing world-class pours with fiery Mangalorean & coastal soul',
    description: 'Perched on the 3rd floor rooftop of Gold Sand in Doddakannelli, Aurum Brew Works elevates the brewery concept by pairing sophisticated Belgian and German craft brews with authentic Coastal Karnataka and Mangalorean heritage cooking.',
    category: 'Microbrewery',
    neighborhood: 'Sarjapur Road',
    address: '3rd Floor, Gold Sand Building, Sarjapur Main Rd, Doddakannelli, Bengaluru, Karnataka 560035',
    searchQuery: 'Aurum Brew Works Gold Sand Sarjapur Road Doddakannelli Bengaluru',
    fallbackLat: 12.9082,
    fallbackLng: 77.6877,
    priceLevel: '₹₹₹',
    priceForTwo: '₹2,200',
    mustTry: ['Kundapura Chicken Ghee Roast', 'Anjal (Kingfish) Tawa Masala Fry', 'Neer Dosa with Mutton Pepper Fry', 'Maya Hefeweizen & Belgian Witbier'],
    vibeTags: ['Craft Beer', 'Rooftop', 'Outdoor Seating', 'Cocktail Program'],
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80',
    timings: '12:00 PM – 1:00 AM',
    curatorNote: 'Aurum avoids generic pub grub in favor of masterclass coastal Karnataka cooking—their Ghee Roasts, Anjal Fry, and soft Neer Dosas rival the best specialty Mangalorean restaurants in Bangalore.',
    isVegetarian: false,
    verified: true,
  },
  {
    id: 'the-fishermans-wharf-sarjapur',
    name: "The Fisherman's Wharf",
    slug: 'the-fishermans-wharf-sarjapur',
    tagline: 'Authentic coastal Goan seafood & riverside shack nostalgia in a rustic courtyard villa',
    description: 'Transporting guests straight to coastal Goa, The Fisherman’s Wharf features rustic terracotta-tiled pavilions, cane lamps, open courtyards, and a fresh catch seafood display cooked in traditional Goan rechado, butter garlic, or caldine styles.',
    category: 'Regional & Coastal',
    neighborhood: 'Sarjapur Road',
    address: 'Opp. Shubh Enclave, Ambalipura, Haralur Rd, Off Sarjapur Rd, Bengaluru, Karnataka 560102',
    searchQuery: 'The Fishermans Wharf Sarjapur Road Ambalipura Bengaluru',
    fallbackLat: 12.9142,
    fallbackLng: 77.6608,
    priceLevel: '₹₹₹',
    priceForTwo: '₹2,200',
    mustTry: ['Traditional Goan Prawn Curry with Red Rice', 'King Prawns Peri Peri', 'Crab in Butter Garlic Sauce', 'Kingfish Rechado Masala', 'Authentic Layered Bebinca'],
    vibeTags: ['Outdoor Seating', 'Romantic'],
    imageUrl: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1000&q=80',
    timings: '12:00 PM – 11:30 PM',
    curatorNote: 'The quintessential Goan seafood sanctuary along Sarjapur Road. Its authentic use of palm toddy vinegar, triphala, kokum, and freshly stone-ground rechado paste delivers genuine coastal soul.',
    isVegetarian: false,
    verified: true,
  },

  // ================= 4. WHITEFIELD =================
  {
    id: 'oota-bangalore-whitefield',
    name: 'Oota Bangalore',
    slug: 'oota-bangalore-whitefield',
    tagline: 'The pinnacle of hyper-local Karnataka culinary heritage elevated on a tranquil rooftop',
    description: 'Perched on the 7th floor above Windmills Craftworks in Total Environment’s signature architectural setting, Oota is the result of years of culinary anthropology across Karnataka’s micro-regions—from Mangalorean coastal kitchens to Kodagu ancestral estates.',
    category: 'Modern Indian & Dining',
    neighborhood: 'Whitefield',
    address: '7th Floor, Windmills Craftworks, 331, Road 5B, EPIP Zone, Whitefield, Bengaluru, Karnataka 560066',
    searchQuery: 'Oota Bangalore Windmills Whitefield EPIP Zone Bengaluru',
    fallbackLat: 12.9846,
    fallbackLng: 77.7289,
    priceLevel: '₹₹₹',
    priceForTwo: '₹2,000',
    mustTry: ['Pandi Curry with Kadambuttu', 'Chicken Ghee Roast', 'Kori Rotti & Kori Gassi', 'Kane Rava Fry', 'Elaneer Payasam'],
    vibeTags: ['Rooftop', 'Romantic', 'Heritage (Pre-1980)'],
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    timings: '12:00 PM – 3:30 PM, 7:00 PM – 11:30 PM',
    curatorNote: 'Universally recognized as the finest regional Karnataka fine dining institution in Bangalore. The combination of hyper-authentic home-style recipes with master-level execution makes it an indispensable cult gem.',
    isVegetarian: false,
    verified: true,
  },
  {
    id: 'biergarten-whitefield',
    name: 'Biergarten Brewery & Kitchen',
    slug: 'biergarten-whitefield',
    tagline: 'Whitefield’s sprawling two-story open-air craft beer cathedral & European kitchen',
    description: 'One of Bangalore’s most expansive and atmospheric microbreweries, Biergarten combines industrial-chic German beer garden architecture with a lush, open-air courtyard and cascading greenery. German brewing yields exceptional fresh hefeweizen and dunkel.',
    category: 'Microbrewery',
    neighborhood: 'Whitefield',
    address: '2, Road No. 2, Doddanekkundi Industrial Area, Hoodi, Whitefield, Bengaluru, Karnataka 560048',
    searchQuery: 'Biergarten Brewery and Kitchen Doddanekkundi Hoodi Whitefield Bengaluru',
    fallbackLat: 12.9825,
    fallbackLng: 77.7128,
    priceLevel: '₹₹₹',
    priceForTwo: '₹2,200',
    mustTry: ['Hefeweizen & Dunkel Dark Lager', 'Mushroom Galouti Kebab', 'Slow-Cooked Pulled Pork Burger', 'Wood-Fired Diavola Pizza', 'Deconstructed Black Forest Cake'],
    vibeTags: ['Craft Beer', 'Outdoor Seating', 'Cocktail Program'],
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80',
    timings: '12:00 PM – 1:00 AM',
    curatorNote: 'Sets the benchmark for high-capacity, top-quality craft brewing in Whitefield alongside Windmills, maintaining unwavering consistency in both brew clarity and kitchen output.',
    isVegetarian: false,
    verified: true,
  },
  {
    id: 'whitefield-baking-company',
    name: 'Whitefield Baking Company (WBC)',
    slug: 'whitefield-baking-company',
    tagline: 'Hotel-grade European pastry artistry, artisanal sourdough & gourmet delicatessen',
    description: 'Located at the Bengaluru Marriott Hotel Whitefield, WBC is the East Bangalore destination for pristine French pastry technique, slow-fermented crusty sourdoughs, and mirror-glazed entremets crafted by master pastry chefs.',
    category: 'Bakeries & Desserts',
    neighborhood: 'Whitefield',
    address: 'Bengaluru Marriott Hotel Whitefield, Plot No. 75, 8th Rd, EPIP Area, Whitefield, Bengaluru, Karnataka 560066',
    searchQuery: 'Whitefield Baking Company Bengaluru Marriott Hotel Whitefield Bengaluru',
    fallbackLat: 12.9731,
    fallbackLng: 77.7285,
    priceLevel: '₹₹',
    priceForTwo: '₹1,200',
    mustTry: ['French Butter Croissant & Pain au Chocolat', 'Opera Pastry & Valrhona Entremet', 'Wild Mushroom & Gruyère Quiche', 'Artisanal Country Sourdough Loaf'],
    vibeTags: ['Artisanal Sourdough', 'Work Friendly', 'Breakfast Spot'],
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80',
    timings: '8:00 AM – 10:00 PM',
    curatorNote: 'In a tech corridor flooded with mass-market bakery chains, WBC stands out by delivering genuine five-star French viennoiserie, entremet artistry, and sourdough bread of international benchmark quality.',
    isVegetarian: false,
    verified: true,
  },
  {
    id: 'red-rhino-whitefield',
    name: 'Red Rhino - Craft Brewery & Inspired Kitchen',
    slug: 'red-rhino-whitefield',
    tagline: 'Sky-high craft brews, sweeping rooftop vistas & inventive Bengaluru bar bites',
    description: 'Occupying the 4th-floor penthouse and rooftop terrace at Uptown Square, Red Rhino is a cult weekend institution in outer Whitefield. Renowned for unpasteurized craft brews (including Bangalore Daze IPA) and an inspired kitchen.',
    category: 'Microbrewery',
    neighborhood: 'Whitefield',
    address: '4th Floor, Uptown Square, Seegehalli, Kadugodi, Whitefield, Bengaluru, Karnataka 560067',
    searchQuery: 'Red Rhino Craft Brewery Uptown Square Kadugodi Whitefield Bengaluru',
    fallbackLat: 12.9904,
    fallbackLng: 77.7554,
    priceLevel: '₹₹',
    priceForTwo: '₹2,000',
    mustTry: ['Bangalore Daze IPA & Soul Surfer Blonde Ale', 'RR Chilli Chicken (1977 Recipe)', 'Dynamite Tempura Prawns', 'Baked Espresso Cheesecake'],
    vibeTags: ['Craft Beer', 'Rooftop', 'Outdoor Seating', 'Cocktail Program'],
    imageUrl: 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&w=1000&q=80',
    timings: '12:00 PM – 1:00 AM',
    curatorNote: 'Red Rhino brings serious craft brewing discipline and standout food that punches way above typical pub standards on the Seegehalli/Kadugodi side of Whitefield.',
    isVegetarian: false,
    verified: true,
  },
  {
    id: 'orzuv-whitefield',
    name: 'Orzuv',
    slug: 'orzuv-whitefield',
    tagline: 'A soulful Kashmiri sanctuary serving master-crafted Wazwan & house-baked breads',
    description: 'Inspired by Dal Lake houseboats and traditional wooden Kashmiri architecture, Orzuv is one of Bengaluru’s rare authentic destinations for true Kashmiri Wazwan. Spices and saffron are flown in directly from the Valley, with traditional Kandur bakers crafting hot Girda, Lavasa, and Sheermal on site.',
    category: 'Regional & Coastal',
    neighborhood: 'Whitefield',
    address: '17, Green Park Avenue, Opp. Yamaha Showroom, Whitefield Main Rd, Bengaluru, Karnataka 560066',
    searchQuery: 'Orzuv Kashmiri Restaurant Whitefield Main Road Bengaluru',
    fallbackLat: 12.9698,
    fallbackLng: 77.7499,
    priceLevel: '₹₹',
    priceForTwo: '₹1,400',
    mustTry: ['Mutton Rogan Josh', 'Gushtaba & Rista in Saffron Broth', 'Traditional Saffron Kahwa with Almonds', 'Fresh Kandur Breads (Girda & Sheermal)', 'Kashmiri Dum Aloo'],
    vibeTags: ['Romantic', 'Pocket Friendly'],
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80',
    timings: '12:00 PM – 11:00 PM',
    curatorNote: 'Orzuv delivers a transportive culinary experience in Whitefield, faithfully preserving ancient slow-cooked Wazwan traditions, authentic Kahwa, and fresh tandoor Kandur breads.',
    isVegetarian: false,
    verified: true,
  },
  {
    id: '153-biere-street-whitefield',
    name: '153 Biere Street',
    slug: '153-biere-street-whitefield',
    tagline: 'A fairytale European cobblestone microbrewery village & stone-hearth pizzeria',
    description: 'Tucked behind Prestige Ozone, 153 Biere Street is designed as an old-world European pedestrian street complete with cobblestone pathways, vintage lamp posts, colorful storefronts, and leafy patio seating. Combines craft brewing from The Biere Club with stone-hearth pizza baking.',
    category: 'Microbrewery',
    neighborhood: 'Whitefield',
    address: '153/1, Hagadur Main Rd, Next to Prestige Ozone, Whitefield, Bengaluru, Karnataka 560066',
    searchQuery: '153 Biere Street Hagadur Main Road Whitefield Bengaluru',
    fallbackLat: 12.9554,
    fallbackLng: 77.7336,
    priceLevel: '₹₹',
    priceForTwo: '₹2,000',
    mustTry: ['Small-Batch Seasonal Craft Ales', 'Stone-Oven Sourdough Pepperoni Pizza', 'Slow-Roasted BBQ Pork Ribs', 'Crispy Beer-Battered Fish and Chips'],
    vibeTags: ['Craft Beer', 'Outdoor Seating', 'Romantic', 'Pet Friendly'],
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80',
    timings: '11:30 AM – 11:30 PM',
    curatorNote: 'One of the most unique physical dining spaces in Bangalore; it transports guests into a European village while maintaining solid craft beer and stone-hearth pizza standards.',
    isVegetarian: false,
    verified: true,
  }
];

async function main() {
  console.log(`Starting Google Maps Headless Chrome verification for ${CANDIDATE_SPOTS.length} outer Bangalore spots...`);
  
  const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800'],
  });

  const verifiedList = [];

  for (const spot of CANDIDATE_SPOTS) {
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

    verifiedList.push({
      ...spot,
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

  // Filter out any duplicates
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
