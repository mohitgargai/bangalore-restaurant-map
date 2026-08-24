const puppeteer = require('puppeteer-core');

async function auditHeavyweights() {
  const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800'],
  });

  const candidates = [
    'Rim Naam The Oberoi MG Road Bangalore',
    'Edo Restaurant ITC Gardenia Residency Road Bangalore',
    'Jamavar The Leela Palace Old Airport Road Bangalore',
    'Le Cirque Signature The Leela Palace Bangalore',
    'Grasshopper Restaurant Bannerghatta Road Bangalore',
    'Shiro UB City Vittal Mallya Road Bangalore',
    'Sanchez UB City Bangalore',
    'Kaze 13th Floor Residency Road Bangalore',
    'Alba JW Marriott Vittal Mallya Road Bangalore',
    'Nagarjuna Restaurant Residency Road Bangalore',
    'Samarkand Infantry Road Bangalore',
    'Magnolia Bakery 100 Feet Road Indiranagar Bangalore',
    'Hotel Empire Central Street Shivajinagar Bangalore'
  ];

  for (const q of candidates) {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
    await page.goto('https://www.google.com/maps/search/' + encodeURIComponent(q), { waitUntil: 'networkidle2', timeout: 25000 });
    await new Promise(r => setTimeout(r, 2000));

    const res = await page.evaluate(() => {
      const body = document.body.innerText;
      const h1 = document.querySelector('h1')?.innerText || '';
      const closedTemp = body.includes('Temporarily closed');
      const closedPerm = body.includes('Permanently closed');
      return {
        h1,
        url: window.location.href,
        status: closedTemp ? 'TEMP CLOSED' : (closedPerm ? 'PERM CLOSED' : 'OPEN')
      };
    });

    const match = res.url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    const coords = match ? (match[1] + ', ' + match[2]) : 'N/A';
    console.log(res.h1, '| Status:', res.status, '| Coords:', coords);
    console.log('  URL:', res.url);
    await page.close();
  }

  await browser.close();
}

auditHeavyweights().catch(console.error);
