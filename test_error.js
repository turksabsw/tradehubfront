import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    page.on('requestfailed', request => {
      if (request.failure()) console.log('REQUEST FAILED:', request.url(), request.failure().errorText);
    });
    
    await page.goto('http://localhost:5173/seller-storefront.html', { waitUntil: 'networkidle2' });
    console.log("PAGE LOADED");
    await browser.close();
})();
