const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1
    }
  });

  const page = await browser.newPage();

  const filePath = `file://${path.resolve(__dirname, 'systemsengineer.html')}`;

  await page.goto(filePath, {
    waitUntil: 'networkidle0'
  });

  // IMPORTANT: ensure fonts & styles are fully settled
  await page.evaluateHandle('document.fonts.ready');

  await page.pdf({
    path: 'Masterstroke-Curriculum-Roadmap.pdf',
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true
  });

  await browser.close();
})();
