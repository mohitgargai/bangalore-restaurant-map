const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const restaurantsPath = path.join(__dirname, '../src/data/restaurants.ts');
const code = fs.readFileSync(restaurantsPath, 'utf8');
const eqIdx = code.indexOf('= [');
const jsonStr = code.slice(eqIdx + 2, code.lastIndexOf(']') + 1);
const list = JSON.parse(jsonStr);

// Flatten all entities and their branches into an audit list
const targets = [];
list.forEach(r => {
  targets.push({
    isBranch: false,
    parentId: r.id,
    id: r.id,
    name: r.name,
    neighborhood: r.neighborhood,
    address: r.address,
    currentLat: r.lat,
    currentLng: r.lng,
    currentUrl: r.googleMapsUrl
  });

  if (r.branches && r.branches.length > 0) {
    r.branches.forEach(b => {
      targets.push({
        isBranch: true,
        parentId: r.id,
        id: b.id,
        name: `${r.name} (${b.name || b.neighborhood})`,
        neighborhood: b.neighborhood,
        address: b.address,
        currentLat: b.lat,
        currentLng: b.lng,
        currentUrl: b.googleMapsUrl
      });
    });
  }
});

console.log(`Auditing ${targets.length} total locations (including branches) on Google Maps...`);

async function auditSingleTarget(browser, item, index) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  // Search query
  const query = `${item.name} ${item.address || item.neighborhood} Bangalore`;
  const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;

  let result = {
    ...item,
    status: 'Open',
    isClosed: false,
    resolvedName: '',
    resolvedAddress: '',
    resolvedLat: item.currentLat,
    resolvedLng: item.currentLng,
    resolvedUrl: item.currentUrl,
    needsReview: false,
    reviewReason: ''
  };

  try {
    await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 3000));

    // If on search result list, click first result if available
    const isList = await page.evaluate(() => {
      const firstResult = document.querySelector('div[role="feed"] a, a[href*="/maps/place/"]');
      if (firstResult && !document.querySelector('h1')) {
        firstResult.click();
        return true;
      }
      return false;
    });

    if (isList) {
      await new Promise(r => setTimeout(r, 3000));
    }

    const pageData = await page.evaluate(() => {
      const h1 = document.querySelector('h1')?.innerText?.trim() || '';
      const body = document.body.innerText;
      const closedTemp = body.includes('Temporarily closed');
      const closedPerm = body.includes('Permanently closed');
      
      const addrBtn = document.querySelector('button[data-item-id*="address"], div[aria-label*="Address"], [data-tooltip*="Copy address"]');
      const addr = addrBtn ? addrBtn.innerText.replace(/[]/g, '').trim() : '';

      return {
        h1,
        closedTemp,
        closedPerm,
        addr,
        url: window.location.href
      };
    });

    result.resolvedName = pageData.h1;
    result.resolvedAddress = pageData.addr || item.address;
    result.resolvedUrl = pageData.url;

    if (pageData.closedTemp) {
      result.isClosed = true;
      result.status = 'Temporarily closed';
      result.needsReview = true;
      result.reviewReason = 'Business is marked Temporarily Closed on Google Maps';
    } else if (pageData.closedPerm) {
      result.isClosed = true;
      result.status = 'Permanently closed';
      result.needsReview = true;
      result.reviewReason = 'Business is marked Permanently Closed on Google Maps';
    }

    // Extract high-precision coordinates:
    // Check !3d<lat>!4d<lng> in URL first (exact rooftop pinpoint)
    const exactMatch = pageData.url.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
    if (exactMatch) {
      result.resolvedLat = parseFloat(exactMatch[1]);
      result.resolvedLng = parseFloat(exactMatch[2]);
    } else {
      const viewMatch = pageData.url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (viewMatch) {
        result.resolvedLat = parseFloat(viewMatch[1]);
        result.resolvedLng = parseFloat(viewMatch[2]);
      }
    }

    // Verify Bangalore bounds
    if (result.resolvedLat < 12.7 || result.resolvedLat > 13.3 || result.resolvedLng < 77.3 || result.resolvedLng > 77.9) {
      result.needsReview = true;
      result.reviewReason = `Coordinates out of Bangalore metropolitan bounds: ${result.resolvedLat}, ${result.resolvedLng}`;
    }

  } catch (err) {
    result.needsReview = true;
    result.reviewReason = `Audit timeout / error: ${err.message}`;
  } finally {
    await page.close();
  }

  return result;
}

async function main() {
  const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1366,900'],
  });

  const CONCURRENCY = 4;
  const allResults = [];

  for (let i = 0; i < targets.length; i += CONCURRENCY) {
    const chunk = targets.slice(i, i + CONCURRENCY);
    console.log(`Progress: Auditing ${i + 1} - ${Math.min(i + CONCURRENCY, targets.length)} of ${targets.length}...`);
    
    const chunkResults = await Promise.all(
      chunk.map((item, idx) => auditSingleTarget(browser, item, i + idx))
    );

    chunkResults.forEach(res => {
      const badge = res.isClosed ? `❌ [${res.status}]` : (res.needsReview ? `⚠️ [REVIEW]` : `✓ [OPEN]`);
      console.log(`  ${badge} ${res.name} -> ${res.resolvedLat}, ${res.resolvedLng}`);
      allResults.push(res);
    });
  }

  await browser.close();

  fs.writeFileSync('master_audit_results.json', JSON.stringify(allResults, null, 2), 'utf8');
  console.log('\nMaster audit finished! Saved to master_audit_results.json');

  const flagged = allResults.filter(r => r.isClosed || r.needsReview);
  console.log(`\n========================================`);
  console.log(`TOTAL LOCATIONS FLAGGED FOR ATTENTION: ${flagged.length}`);
  console.log(`========================================`);
  flagged.forEach(f => {
    console.log(`- ${f.name} (${f.neighborhood}) [ID: ${f.id}]`);
    console.log(`  Status: ${f.status} | Reason: ${f.reviewReason}`);
    console.log(`  Current Pin: ${f.currentLat}, ${f.currentLng} -> Resolved: ${f.resolvedLat}, ${f.resolvedLng}`);
  });
}

main().catch(console.error);
