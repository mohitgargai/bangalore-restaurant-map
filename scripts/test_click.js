const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
  
  const testQueries = [
    'Vidyarthi Bhavan Gandhi Bazaar Bangalore',
    'CTR Central Tiffin Room Malleshwaram Bangalore',
    'Veena Stores Margosa Road Malleshwaram Bangalore',
    'Lavonne Cafe Defence Colony Indiranagar Bangalore',
    'Toit 100 Feet Road Indiranagar Bangalore'
  ];
  
  for (const q of testQueries) {
    const searchUrl = 'https://www.google.com/maps/search/' + encodeURIComponent(q);
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
    
    // Wait up to 5s for either URL to change or first result card to appear
    for (let i = 0; i < 6; i++) {
      await new Promise(r => setTimeout(r, 1000));
      if (page.url().includes('/place/')) break;
      
      // Try clicking first card if available
      try {
        const card = await page.$('a.hfpxzc, a[href*="/maps/place/"], div[role="feed"] a');
        if (card) {
          await card.click();
          await new Promise(r => setTimeout(r, 2000));
          break;
        }
      } catch (e) {}
    }
    
    const finalUrl = page.url();
    console.log('Query:', q);
    console.log('Final URL:', finalUrl);
    const m = finalUrl.match(/@([0-9]+\.[0-9]+),([0-9]+\.[0-9]+)/);
    if (m) {
      console.log('🎯 Exact coordinates: lat=' + m[1] + ', lng=' + m[2] + '\n');
    } else {
      console.log('❌ No coordinates found\n');
    }
  }
  
  await browser.close();
})();
