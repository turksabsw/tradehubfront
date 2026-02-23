import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1536, height: 1080 });
  await page.goto('http://localhost:37777/manufacturers.html', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: '/home/metin/.gemini/antigravity/brain/db710ad8-fa7f-45d1-aeca-748c14d6cfba/artifacts/debug_layout.png', fullPage: true });
  await browser.close();
  console.log("Screenshot saved.");
})();
