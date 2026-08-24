const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
  
  const remaining = [
    { id: 'amadora-gourmet-ice-cream-indiranagar', query: 'Amadora Gourmet Ice Cream UB City Bangalore' },
    { id: 'hotel-fishland-gandhinagar', query: 'Hotel Fishland Gandhinagar Majestic Bangalore' },
    { id: 'corner-house-residency-road', query: 'Corner House Ice Cream Residency Road Bangalore' }
  ];
  
  for (const item of remaining) {
    const searchUrl = 'https://www.google.com/maps/search/' + encodeURIComponent(item.query);
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
    
    for (let i = 0; i < 5; i++) {
      await new Promise(r => setTimeout(r, 1000));
      if (page.url().includes('/place/')) break;
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
    const m = finalUrl.match(/@([0-9]+\.[0-9]+),([0-9]+\.[0-9]+)/);
    if (m) {
      console.log(`RESOLVED:${item.id}:${m[1]}:${m[2]}:${finalUrl}`);
    }
  }
  
  await browser.close();
})();
