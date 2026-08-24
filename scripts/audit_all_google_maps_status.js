const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const restaurantsPath = path.join(__dirname, '../src/data/restaurants.ts');
const code = fs.readFileSync(restaurantsPath, 'utf8');
const eqIdx = code.indexOf('= [');
const jsonStr = code.slice(eqIdx + 2, code.lastIndexOf(']') + 1);
const list = JSON.parse(jsonStr);

console.log(`Starting rigorous Google Maps live audit for all ${list.length} restaurants...`);

async function auditRestaurant(browser, restaurant) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  // Search query
  const query = `${restaurant.name} ${restaurant.neighborhood} Bangalore`;
  const url = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;

  let isClosed = false;
  let statusText = 'Open';
  let resolvedLat = restaurant.lat;
  let resolvedLng = restaurant.lng;
  let resolvedUrl = restaurant.googleMapsUrl;
  let pageTitle = '';
  let resolvedAddress = '';

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 25000 });
    await new Promise(r => setTimeout(r, 2500));

    const pageData = await page.evaluate(() => {
      const body = document.body.innerText;
      const h1 = document.querySelector('h1')?.innerText || '';
      const closedTemp = body.includes('Temporarily closed');
      const closedPerm = body.includes('Permanently closed');
      const addrEl = document.querySelector('button[data-item-id*="address"], div[aria-label*="Address"]');
      return {
        h1,
        closedTemp,
        closedPerm,
        addr: addrEl ? addrEl.innerText : '',
        url: window.location.href,
        bodySnippet: body.slice(0, 400)
      };
    });

    pageTitle = pageData.h1;
    resolvedAddress = pageData.addr;

    if (pageData.closedTemp) {
      isClosed = true;
      statusText = 'Temporarily closed';
    } else if (pageData.closedPerm) {
      isClosed = true;
      statusText = 'Permanently closed';
    }

    if (pageData.url.includes('/place/') || pageData.url.includes('@')) {
      resolvedUrl = pageData.url;
      const match = pageData.url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (match) {
        resolvedLat = parseFloat(match[1]);
        resolvedLng = parseFloat(match[2]);
      }
    }
  } catch (err) {
    statusText = `Error: ${err.message}`;
  } finally {
    await page.close();
  }

  return {
    id: restaurant.id,
    name: restaurant.name,
    neighborhood: restaurant.neighborhood,
    statusText,
    isClosed,
    pageTitle,
    resolvedAddress,
    oldLat: restaurant.lat,
    oldLng: restaurant.lng,
    resolvedLat,
    resolvedLng,
    resolvedUrl
  };
}

async function main() {
  const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800'],
  });

  const results = [];
  const CONCURRENCY = 4;

  for (let i = 0; i < list.length; i += CONCURRENCY) {
    const chunk = list.slice(i, i + CONCURRENCY);
    console.log(`Auditing batch ${i + 1} - ${Math.min(i + CONCURRENCY, list.length)} of ${list.length}...`);
    const chunkResults = await Promise.all(chunk.map(r => auditRestaurant(browser, r)));
    
    chunkResults.forEach(res => {
      console.log(`  [${res.statusText}] ${res.name} (${res.neighborhood}) -> Coords: ${res.resolvedLat}, ${res.resolvedLng}`);
      results.push(res);
    });
  }

  await browser.close();

  fs.writeFileSync('audit_results.json', JSON.stringify(results, null, 2), 'utf8');
  console.log('\nAudit complete! Saved to audit_results.json');

  const closedSpots = results.filter(r => r.isClosed);
  console.log(`\n=== CLOSED SPOTS DETECTED: ${closedSpots.length} ===`);
  closedSpots.forEach(s => {
    console.log(`❌ [${s.statusText}] ${s.name} (${s.neighborhood}) - ${s.id}`);
  });
}

main().catch(console.error);
