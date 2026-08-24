const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const restaurantsPath = path.join(__dirname, '../src/data/restaurants.ts');
const code = fs.readFileSync(restaurantsPath, 'utf8');
const eqIdx = code.indexOf('= [');
const jsonStr = code.slice(eqIdx + 2, code.lastIndexOf(']') + 1);
let list = JSON.parse(jsonStr);

// Collect all items that need exact resolution
const targets = [];
list.forEach(r => {
  const isSearchUrl = !r.googleMapsUrl || r.googleMapsUrl.includes('/search/') || r.googleMapsUrl.includes('/sorry/');
  const latDecimals = (r.lat.toString().split('.')[1] || '').length;
  const isRounded = latDecimals <= 4;

  if (isSearchUrl || isRounded) {
    targets.push({
      isBranch: false,
      parentId: r.id,
      id: r.id,
      name: r.name,
      neighborhood: r.neighborhood,
      address: r.address,
      currentLat: r.lat,
      currentLng: r.lng
    });
  }

  if (r.branches) {
    r.branches.forEach(b => {
      const bSearch = !b.googleMapsUrl || b.googleMapsUrl.includes('/search/') || b.googleMapsUrl.includes('/sorry/');
      const bLatDec = (b.lat.toString().split('.')[1] || '').length;
      if (bSearch || bLatDec <= 4) {
        targets.push({
          isBranch: true,
          parentId: r.id,
          id: b.id,
          name: `${r.name} ${b.name || b.neighborhood}`,
          neighborhood: b.neighborhood,
          address: b.address,
          currentLat: b.lat,
          currentLng: b.lng
        });
      }
    });
  }
});

console.log(`Need exact rooftop resolution for ${targets.length} locations...`);

async function run() {
  const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800'],
  });

  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  const resolved = {};

  for (let i = 0; i < targets.length; i++) {
    const t = targets[i];
    const cleanAddress = t.address.replace(/[^\w\s,]/g, '').trim();
    const query = `${t.name} ${t.neighborhood} ${cleanAddress.split(',')[0]} Bangalore`;
    console.log(`[${i + 1}/${targets.length}] Querying: ${t.name} (${t.neighborhood})...`);

    try {
      await page.goto('https://www.google.com/maps/search/' + encodeURIComponent(query) + '?hl=en', { waitUntil: 'networkidle2', timeout: 25000 });
      await new Promise(r => setTimeout(r, 2500));

      const pageUrl = page.url();

      if (pageUrl.includes('/place/')) {
        const match = pageUrl.match(/!8m2!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/) || pageUrl.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/) || pageUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
        if (match) {
          resolved[t.id] = {
            lat: parseFloat(match[1]),
            lng: parseFloat(match[2]),
            googleMapsUrl: pageUrl
          };
          console.log(`  ✓ Resolved Place URL: ${match[1]}, ${match[2]}`);
          continue;
        }
      }

      // Check if on results list and click first item
      const clicked = await page.evaluate(() => {
        const first = document.querySelector('a.hfpxzc, div[role="feed"] a, a[href*="/place/"]');
        if (first) {
          first.click();
          return true;
        }
        return false;
      });

      if (clicked) {
        await new Promise(r => setTimeout(r, 3000));
        const afterClickUrl = page.url();
        const match = afterClickUrl.match(/!8m2!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/) || afterClickUrl.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/) || afterClickUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
        if (match) {
          resolved[t.id] = {
            lat: parseFloat(match[1]),
            lng: parseFloat(match[2]),
            googleMapsUrl: afterClickUrl
          };
          console.log(`  ✓ Resolved after click: ${match[1]}, ${match[2]}`);
          continue;
        }
      }

      console.log(`  ⚠️ Could not resolve exact place URL for: ${t.name}, pageUrl: ${pageUrl}`);
    } catch (err) {
      console.log(`  Error on ${t.name}: ${err.message}`);
    }

    // Pacing delay
    await new Promise(r => setTimeout(r, 1000));
  }

  await browser.close();

  // Update master list with resolved data
  let updatedCount = 0;
  list = list.map(r => {
    let updatedR = { ...r };
    if (resolved[r.id]) {
      updatedR.lat = resolved[r.id].lat;
      updatedR.lng = resolved[r.id].lng;
      updatedR.googleMapsUrl = resolved[r.id].googleMapsUrl;
      updatedCount++;
    }
    if (updatedR.branches) {
      updatedR.branches = updatedR.branches.map(b => {
        let updatedB = { ...b };
        if (resolved[b.id]) {
          updatedB.lat = resolved[b.id].lat;
          updatedB.lng = resolved[b.id].lng;
          updatedB.googleMapsUrl = resolved[b.id].googleMapsUrl;
          updatedCount++;
        }
        return updatedB;
      });
    }
    return updatedR;
  });

  const updatedCode = `import { Restaurant } from '@/types';\n\nexport const INITIAL_RESTAURANTS: Restaurant[] = ${JSON.stringify(list, null, 2)};\n`;
  fs.writeFileSync(restaurantsPath, updatedCode, 'utf8');

  console.log(`\n🎉 Synchronized ${updatedCount} exact locations!`);
}

run().catch(console.error);
