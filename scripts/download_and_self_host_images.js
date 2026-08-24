const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const sharp = require('sharp');

const outputDir = path.join(__dirname, '../public/images/restaurants');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const restaurantsPath = path.join(__dirname, '../src/data/restaurants.ts');
const code = fs.readFileSync(restaurantsPath, 'utf8');
const eqIdx = code.indexOf('= [');
const jsonStr = code.slice(eqIdx + 2, code.lastIndexOf(']') + 1);
let list = JSON.parse(jsonStr);

console.log(`Starting self-hosted image download pipeline for ${list.length} restaurants...`);

// High-quality category fallbacks in case of download failure
const CATEGORY_FALLBACKS = {
  'Iconic Heritage': 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=85',
  'Microbrewery': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85',
  'Specialty Coffee & Cafe': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85',
  'Pan-Asian & Japanese': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=85',
  'Regional & Coastal': 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1200&q=85',
  'Modern Indian & Dining': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85',
  'Cocktails & Rooftops': 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85',
  'Bakeries & Desserts': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85',
  'Street Food & Chaat': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85'
};

function fetchBuffer(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects < 0) return reject(new Error('Too many redirects'));

    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      },
      timeout: 15000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBuffer(res.headers.location, maxRedirects - 1).then(resolve).catch(reject);
      }

      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }

      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function processRestaurant(restaurant, index) {
  const filename = `${restaurant.id}.jpg`;
  const destPath = path.join(outputDir, filename);

  let buffer = null;
  let sourceUsed = 'original';

  // 1. Try original imageUrl
  try {
    buffer = await fetchBuffer(restaurant.imageUrl);
  } catch (err) {
    // console.log(`  [${index+1}] Failed original for ${restaurant.name} (${err.message}), trying fallback...`);
    try {
      const fbUrl = CATEGORY_FALLBACKS[restaurant.category] || CATEGORY_FALLBACKS['Modern Indian & Dining'];
      buffer = await fetchBuffer(fbUrl);
      sourceUsed = 'fallback';
    } catch (fbErr) {
      console.error(`  [${index+1}] Error downloading fallback for ${restaurant.name}:`, fbErr.message);
      return null;
    }
  }

  // 2. Process with Sharp to optimize image
  try {
    await sharp(buffer)
      .resize({ width: 1000, height: 700, fit: 'cover', position: 'center' })
      .jpeg({ quality: 82, progressive: true })
      .toFile(destPath);

    const stats = fs.statSync(destPath);
    // console.log(`  ✓ [${index+1}/${list.length}] Saved ${filename} (${(stats.size / 1024).toFixed(1)} KB) [${sourceUsed}]`);
    return `/images/restaurants/${filename}`;
  } catch (procErr) {
    console.error(`  [${index+1}] Sharp processing error for ${restaurant.name}:`, procErr.message);
    return null;
  }
}

async function main() {
  const CONCURRENCY = 6;
  let successCount = 0;

  for (let i = 0; i < list.length; i += CONCURRENCY) {
    const chunk = list.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      chunk.map((r, offset) => processRestaurant(r, i + offset))
    );

    results.forEach((resPath, idx) => {
      if (resPath) {
        list[i + idx].imageUrl = resPath;
        successCount++;
      }
    });

    console.log(`Progress: ${Math.min(i + CONCURRENCY, list.length)} / ${list.length} processed...`);
  }

  // Write updated restaurants.ts
  const updatedCode = `import { Restaurant } from '@/types';\n\nexport const INITIAL_RESTAURANTS: Restaurant[] = ${JSON.stringify(list, null, 2)};\n`;
  fs.writeFileSync(restaurantsPath, updatedCode, 'utf8');

  console.log(`\n🎉 DONE! Successfully self-hosted ${successCount} / ${list.length} images!`);
  console.log(`All images are located in public/images/restaurants/`);
}

main().catch(console.error);
