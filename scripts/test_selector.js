const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
  
  const queries = [
    'Vidyarthi Bhavan Gandhi Bazaar Bangalore',
    'CTR Central Tiffin Room Margosa Road Malleshwaram Bangalore',
    'Veena Stores Margosa Road Malleshwaram Bangalore',
    'Lavonne Cafe Defence Colony Indiranagar Bangalore',
    'The Rameshwaram Cafe 100 Feet Road Indiranagar Bangalore'
  ];
  
  for (const q of queries) {
    const searchUrl = 'https://www.google.com/maps/search/' + encodeURIComponent(q);
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await new Promise(r => setTimeout(r, 4000));
    
    let url = page.url();
    if (!url.includes('/place/')) {
      const extractedHref = await page.evaluate(() => {
        // First try the primary card link
        const firstCard = document.querySelector('a.hfpxzc') || document.querySelector('div[role=\"feed\"] a') || document.querySelector('a[href*=\"/maps/place/\"]');
        return firstCard ? firstCard.href : null;
      });
      if (extractedHref) {
        url = extractedHref;
      }
    }
    
    console.log('Query:', q);
    console.log('Final URL:', url);
    const m = url.match(/@([0-9]+\.[0-9]+),([0-9]+\.[0-9]+)/);
    if (m) {
      console.log('🎯 Exact coordinates: lat=' + m[1] + ', lng=' + m[2] + '\n');
    } else {
      console.log('❌ No match in URL: ' + url + '\n');
    }
  }
  
  await browser.close();
})();
