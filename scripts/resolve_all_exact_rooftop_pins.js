const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const restaurantsPath = path.join(__dirname, '../src/data/restaurants.ts');
const code = fs.readFileSync(restaurantsPath, 'utf8');
const eqIdx = code.indexOf('= [');
const jsonStr = code.slice(eqIdx + 2, code.lastIndexOf(']') + 1);
let list = JSON.parse(jsonStr);

// Collect all spots that still have coarse 4-decimal or search URLs
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
      address: r.address
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
          address: b.address
        });
      }
    });
  }
});

console.log(`Resolving exact rooftop coordinates for ${targets.length} locations...`);

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
    // Clean query: Name + Street / Area
    const cleanStreet = t.address.split(',')[0].replace(/[^\w\s]/g, '').trim();
    const query = `${t.name} ${cleanStreet} Bangalore`;
    console.log(`[${i + 1}/${targets.length}] Searching: ${query}...`);

    try {
      await page.goto('https://www.google.com/maps/search/' + encodeURIComponent(query) + '?hl=en', { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, 4000));

      let currentUrl = page.url();

      if (!currentUrl.includes('/place/')) {
        // Try clicking first result if on feed
        const clicked = await page.evaluate(() => {
          const item = document.querySelector('div.Nv2PK, a.hfpxzc, div[role="feed"] a');
          if (item) { item.click(); return true; }
          return false;
        });

        if (clicked) {
          await new Promise(r => setTimeout(r, 3500));
          currentUrl = page.url();
        }
      }

      // Check sign-in continue param fallback if still on search
      if (!currentUrl.includes('/place/')) {
        const signInUrl = await page.evaluate(() => {
          const signIn = document.querySelector('a[href*="ServiceLogin"]')?.href || '';
          if (signIn.includes('continue=')) {
            const decoded = decodeURIComponent(signIn.split('continue=')[1]?.split('&')[0] || '');
            if (decoded.includes('/place/')) return decoded;
          }
          return null;
        });
        if (signInUrl) currentUrl = signInUrl;
      }

      const match = currentUrl.match(/!8m2!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/) || currentUrl.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/) || currentUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

      if (match && currentUrl.includes('/place/')) {
        const exactLat = parseFloat(match[1]);
        const exactLng = parseFloat(match[2]);
        resolved[t.id] = {
          lat: exactLat,
          lng: exactLng,
          googleMapsUrl: currentUrl
        };
        console.log(`  ✓ Resolved: ${exactLat}, ${exactLng} | URL: ${currentUrl.slice(0, 70)}...`);
      } else {
        console.log(`  ⚠️ Still not place URL for: ${t.name} (URL: ${currentUrl.slice(0, 60)})`);
      }
    } catch (e) {
      console.log(`  Error on ${t.name}:`, e.message);
    }

    await new Promise(r => setTimeout(r, 1000));
  }

  await browser.close();

  // Update master dataset
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

  console.log(`\n🎉 DONE! Updated ${updatedCount} exact locations in master dataset!`);
}

run().catch(console.error);
