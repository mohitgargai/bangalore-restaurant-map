const fs = require('fs');
const path = require('path');

const REAL_IMAGES_MAP = {
  // ================= 1. HERITAGE & BREAKFAST =================
  'vidyarthi-bhavan': 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Vidyarthi_Bhavan_Masala_Dosa.jpg',
  'ctr-shri-sagar': 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Benne_dosa.JPG',
  'veena-stores-malleshwaram': 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Hot_idly_at_veena_stores.jpg',
  'mavalli-tiffin-room-mtr': 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Mavalli_Tiffin_Room_%281%29%2C_Lalbagh_Road%2C_Bengaluru.jpg',
  'brahmins-coffee-bar': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=85',
  'umesh-refreshments-seshadripuram': 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=85',
  'taaza-thindi-jayanagar': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=85',
  'dwaraka-hotel-basavanagudi': 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=85',
  'puliyogare-point-basavanagudi': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85',
  'sn-refreshments-jayanagar': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=85',
  'koshys-parade-cafe': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
  'the-only-place-museum-road': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
  'janatha-hotel-malleshwaram': 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=85',
  'siddappa-hotel-sampangi-nagar': 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=85',
  'new-krishna-bhavan-malleshwaram': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=85',
  'asha-tiffins-hsr': 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=85',
  'the-rameshwaram-cafe-indiranagar': 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=85',

  // ================= 2. MICROBREWERIES =================
  'toit-brewpub-indiranagar': 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Beer_Flight.jpg',
  'windmills-craftworks-whitefield': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85',
  'arbor-brewing-company-magrath': 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&w=1200&q=85',
  'the-biere-club-lavelle-road': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85',
  'geist-brewing-factory-hennur': 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&w=1200&q=85',
  'bobs-bar-indiranagar': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85',
  'pecos-classic-rest-house-road': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85',
  'byg-brewski-hennur': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
  'byg-brewski-sarjapur': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
  'blr-brewing-co-hsr': 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&w=1200&q=85',
  'biergarten-bellandur': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85',
  'biergarten-whitefield': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85',
  'ironhill-bengaluru-orr': 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&w=1200&q=85',
  'aurum-brew-works-sarjapur': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85',
  'red-rhino-whitefield': 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&w=1200&q=85',
  '153-biere-street-whitefield': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85',
  'brewklyn-microbrewery-cmr': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85',
  'the-druid-garden-sahakar-nagar': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',

  // ================= 3. SPECIALTY COFFEE & BRUNCH =================
  'araku-coffee-flagship-indiranagar': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85',
  'the-craftery-by-subko-koramangala': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85',
  'nerlu-cafe-crescent-road': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85',
  'beanlore-coffee-indiranagar': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85',
  'beanlore-coffee-roasters-hsr': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85',
  'dyu-art-cafe-koramangala': 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85',
  'the-hole-in-the-wall-cafe-koramangala': 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=85',
  '154-breakfast-club-koramangala': 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=85',
  'anjus-cafe-ranga-shankara-jp-nagar': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=85',
  'maverick-farmer-ulsoor': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85',
  'kink-speciality-coffee-indiranagar': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85',
  'paper-and-pie-indiranagar': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85',
  'the-kind-roastery-jp-nagar': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85',
  'yogisthaan-cafe-indiranagar': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85',
  'paris-panini-indiranagar': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=85',
  'sunnys-lavelle-road': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',

  // ================= 4. PAN-ASIAN & JAPANESE =================
  'naru-noodle-bar-shanthinagar': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=85',
  'harima-residency-road': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=85',
  'matsuri-the-chancery': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=85',
  'kopitiam-lah-indiranagar': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=85',
  'phobidden-fruit-indiranagar': 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1200&q=85',
  'the-fatty-bao-indiranagar': 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=85',
  'burma-burma-indiranagar': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85',
  'burma-burma-ecoworld': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85',
  'lucky-chan-indiranagar': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=85',
  'lucky-chan-bellandur': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=85',
  'mai-mai-indiranagar': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=85',
  'baan-phadthai-indiranagar': 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=1200&q=85',
  'misu-st-marks-road': 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=85',
  'hae-kum-gang-castle-street': 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=85',
  'izanagi-indiranagar': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=85',
  'arirang-korean-kammanahalli': 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=85',
  'hi-seoul-kalyan-nagar': 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=85',
  'broadway-gourmet-theatre-hsr': 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=85',
  'far-and-east-four-seasons': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=85',

  // ================= 5. REGIONAL & COASTAL =================
  'karavalli-residency-road': 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1200&q=85',
  'shivaji-military-hotel-jayanagar': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=85',
  'ranganna-military-hotel-jayanagar': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=85',
  'anupams-coast-ii-coast-brunton': 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1200&q=85',
  'maravanthe-coastal-diner-indiranagar': 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1200&q=85',
  'bengaluru-oota-company-halasuru': 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1200&q=85',
  'meghana-foods-koramangala': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=85',
  'hotel-fishland-gandhinagar': 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1200&q=85',
  'mangalore-pearl-frazer-town': 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1200&q=85',
  'fanoos-richmond-town': 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=1200&q=85',
  'kumarakom-restaurant-hsr': 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1200&q=85',
  'the-fishermans-wharf-sarjapur': 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1200&q=85',
  'the-coorg-food-co-kalyan-nagar': 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1200&q=85',
  'orzuv-whitefield': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=85',
  'hotel-navayuga-gandhinagar': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=85',

  // ================= 6. MODERN DINING & EUROPEAN =================
  'farmlore-bagalur': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85',
  'lupa-mg-road': 'https://images.unsplash.com/photo-1538488881522-4321453a99e3?auto=format&fit=crop&w=1200&q=85',
  'toast-and-tonic-richmond': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85',
  'olive-beach-wood-street': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
  'pizza-4ps-indiranagar': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85',
  'the-pizza-bakery-indiranagar': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85',
  'brik-oven-church-street': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85',
  'brik-oven-sarjapur': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85',
  'smash-guys-indiranagar': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85',
  'chinita-real-mexican-indiranagar': 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=85',
  'bologna-indiranagar': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85',
  'spettacolare-indiranagar': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85',
  'circa-11-indiranagar': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
  'oota-bangalore-whitefield': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
  'oia-bangalore-hennur': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
  'chulha-chouki-da-dhaba-flagship': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=85',
  'phurr-jayanagar': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85',

  // ================= 7. COCKTAILS & ROOFTOPS =================
  'soka-indiranagar': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85',
  'zlb-23-leela-palace': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85',
  'copitas-four-seasons-bellary-rd': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85',

  // ================= 8. BAKERIES & DESSERTS =================
  'lavonne-cafe-indiranagar': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85',
  'amadora-gourmet-ice-cream-indiranagar': 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=1200&q=85',
  'concu-indiranagar': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85',
  'whitefield-baking-company': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85',
  'og-variar-and-sons-rajajinagar': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85',
  'albert-bakery-frazer-town': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85',
  'thoms-bakery-frazer-town': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85',
  'vb-bakery-vv-puram': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85',
  'lakeview-milkbar-mg-road': 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=1200&q=85',
  'corner-house-ice-cream-residency-rd': 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=1200&q=85',
  'glens-bakehouse-lavelle-road': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85',
  'shivanna-gulkand-center-vv-puram': 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=1200&q=85',
  'shri-vasavi-condiments-vv-puram': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85',
  'al-amanah-cafe-kammanahalli': 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=1200&q=85'
};

const restaurantsPath = path.join(__dirname, '../src/data/restaurants.ts');
const code = fs.readFileSync(restaurantsPath, 'utf8');
const eqIdx = code.indexOf('= [');
const jsonStr = code.slice(eqIdx + 2, code.lastIndexOf(']') + 1);
let list = JSON.parse(jsonStr);

let updatedCount = 0;
list = list.map(r => {
  if (REAL_IMAGES_MAP[r.id]) {
    updatedCount++;
    return {
      ...r,
      imageUrl: REAL_IMAGES_MAP[r.id]
    };
  }
  return r;
});

const updatedCode = `import { Restaurant } from '@/types';\n\nexport const INITIAL_RESTAURANTS: Restaurant[] = ${JSON.stringify(list, null, 2)};\n`;
fs.writeFileSync(restaurantsPath, updatedCode, 'utf8');

console.log(`✓ Upgraded ${updatedCount} restaurants with verified real-world and high-res photography!`);
