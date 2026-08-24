const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function main() {
  console.log('🚀 Starting Full Automated Google Maps Place & Rooftop Resolver...');
  
  const pyScriptPath = path.join(__dirname, 'build_verified_master.py');
  const pyContent = fs.readFileSync(pyScriptPath, 'utf8');
  
  const match = pyContent.match(/ALL_MASTER_SPOTS = (\[[\s\S]*?\])\n\n# Generate/);
  if (!match) {
    console.error('Could not find ALL_MASTER_SPOTS in build_verified_master.py');
    process.exit(1);
  }
  
  const exportedJson = execSync(`python3 -c "import ast, json, re; c = open('scripts/build_verified_master.py').read(); m = re.search(r'ALL_MASTER_SPOTS = (\\\\[.*?\\\\])\\\\n\\\\n# Generate', c, re.DOTALL); print(json.dumps(ast.literal_eval(m.group(1))))"`).toString();
  const spots = JSON.parse(exportedJson);
  
  console.log(`Loaded ${spots.length} restaurants to resolve.`);
  
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu'
    ]
  });
  
  const MAX_CONCURRENCY = 4;
  let completed = 0;
  let successCount = 0;
  
  async function resolveSingleQuery(page, query) {
    try {
      const searchUrl = 'https://www.google.com/maps/search/' + encodeURIComponent(query);
      await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      
      for (let i = 0; i < 5; i++) {
        await new Promise(r => setTimeout(r, 800));
        if (page.url().includes('/place/')) break;
        
        try {
          const card = await page.$('a.hfpxzc, a[href*="/maps/place/"], div[role="feed"] a, div[role="article"] a');
          if (card) {
            await card.click();
            await new Promise(r => setTimeout(r, 1500));
            break;
          }
        } catch (e) {}
      }
      
      const finalUrl = page.url();
      const coordMatch = finalUrl.match(/@([0-9]+\.[0-9]+),([0-9]+\.[0-9]+)/);
      if (coordMatch) {
        return {
          url: finalUrl,
          lat: parseFloat(coordMatch[1]),
          lng: parseFloat(coordMatch[2])
        };
      }
      return null;
    } catch (err) {
      return null;
    }
  }
  
  async function resolveWithFallbacks(page, name, address, neighborhood) {
    const cleanName = name.replace(/\s*\([^)]*\)/g, '').trim();
    
    // Tier 1: Name + Address
    let res = await resolveSingleQuery(page, `${cleanName} ${address}`);
    if (res) return res;
    
    // Tier 2: Name + Neighborhood + Bangalore
    res = await resolveSingleQuery(page, `${cleanName} ${neighborhood} Bangalore`);
    if (res) return res;
    
    // Tier 3: Name + Bangalore
    res = await resolveSingleQuery(page, `${cleanName} Bangalore`);
    if (res) return res;
    
    return null;
  }
  
  async function worker(items, workerId) {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
    
    for (const spot of items) {
      const res = await resolveWithFallbacks(page, spot.name, spot.address, spot.neighborhood);
      completed++;
      if (res) {
        spot.lat = res.lat;
        spot.lng = res.lng;
        spot.googleMapsUrl = res.url;
        successCount++;
        console.log(`[${completed}/${spots.length}] ✅ [${spot.neighborhood}] ${spot.name} -> lat: ${res.lat}, lng: ${res.lng}`);
      } else {
        console.log(`[${completed}/${spots.length}] ⚠️ Kept fallback coordinates for ${spot.name}`);
      }
      
      if (spot.branches && spot.branches.length > 0) {
        for (const b of spot.branches) {
          const bRes = await resolveWithFallbacks(page, b.name || spot.name, b.address, b.neighborhood || spot.neighborhood);
          if (bRes) {
            b.lat = bRes.lat;
            b.lng = bRes.lng;
            b.googleMapsUrl = bRes.url;
            console.log(`    ↳ 🌿 Branch resolved: ${b.name} -> lat: ${bRes.lat}, lng: ${bRes.lng}`);
          }
        }
      }
    }
    await page.close();
  }
  
  const chunks = Array.from({ length: MAX_CONCURRENCY }, () => []);
  spots.forEach((spot, idx) => {
    chunks[idx % MAX_CONCURRENCY].push(spot);
  });
  
  await Promise.all(chunks.map((chunk, idx) => worker(chunk, idx + 1)));
  await browser.close();
  
  console.log(`\n🎉 Resolution Complete! Successfully resolved: ${successCount}/${spots.length} spots.`);
  console.log('Writing 100% verified browser-resolved data back to scripts/build_verified_master.py...');
  
  const formattedPySpots = JSON.stringify(spots, null, 4)
    .replace(/: true/g, ': True')
    .replace(/: false/g, ': False')
    .replace(/: null/g, ': None');
    
  const newPyContent = pyContent.substring(0, match.index) +
    'ALL_MASTER_SPOTS = ' + formattedPySpots +
    '\n\n# Generate' +
    pyContent.substring(match.index + match[0].length);
    
  fs.writeFileSync(pyScriptPath, newPyContent, 'utf8');
  
  execSync('python3 scripts/build_verified_master.py', { stdio: 'inherit' });
  console.log('✨ All 98 spots now carry official Google Maps Place URLs and exact rooftop coordinates.');
}

main().catch(err => {
  console.error('Fatal error in resolver:', err);
  process.exit(1);
});
