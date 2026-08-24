const puppeteer = require('puppeteer-core');

async function testExtraction() {
  const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800'],
  });

  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  const spots = [
    'Ironhill Bengaluru Marathahalli',
    'Oota Bangalore Whitefield',
    'Red Rhino Craft Brewery Whitefield',
    'Arirang Korean Restaurant Kammanahalli',
    'Hi Seoul Kammanahalli',
    'The Coorg Food Co Kalyan Nagar',
    'Chulha Chouki Da Dhaba Kalyan Nagar',
    'Al Amanah Cafe Kammanahalli',
    'Hotel Navayuga Majestic',
    'Far & East Four Seasons Hotel Bengaluru',
    'Oia Hennur Bangalore',
    'The Local Kalyan Nagar',
    'Vapour Brewpub Sarjapur Road',
    'BLR Brewing Co HSR Layout',
    'Byg Brewski Brewing Company Hennur',
    'Byg Brewski Brewing Company Sarjapur Road',
    'Biergarten Brewery Whitefield',
    'Biergarten Brewery Bellandur'
  ];

  for (const s of spots) {
    await page.goto('https://www.google.com/maps/search/' + encodeURIComponent(s + ' Bangalore') + '?hl=en', { waitUntil: 'networkidle2', timeout: 25000 });
    await new Promise(r => setTimeout(r, 2500));

    const result = await page.evaluate(() => {
      const currentUrl = window.location.href;
      const signIn = document.querySelector('a[href*="ServiceLogin"]')?.href || '';
      
      let canonicalUrl = currentUrl;
      if (signIn && signIn.includes('continue=')) {
        const decoded = decodeURIComponent(signIn.split('continue=')[1]?.split('&')[0] || '');
        if (decoded.includes('/place/')) {
          canonicalUrl = decoded;
        }
      }

      const match = canonicalUrl.match(/!8m2!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/) || canonicalUrl.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/) || canonicalUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      const coords = match ? (match[1] + ', ' + match[2]) : 'NOT_FOUND';

      return {
        h1: document.querySelector('h1')?.innerText || document.title,
        coords,
        canonicalUrl
      };
    });

    console.log(s, '->', result.coords);
    console.log('   Canonical URL:', result.canonicalUrl);
    await new Promise(r => setTimeout(r, 1000));
  }

  await browser.close();
}

testExtraction().catch(console.error);
