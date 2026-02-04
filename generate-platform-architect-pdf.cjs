const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  const htmlPath = path.resolve(__dirname, 'genai-platform-architect.html');
  const pdfPath = path.resolve(__dirname, 'MASTERSTROKE-GenAI-Platform-Architect.pdf');

  if (!fs.existsSync(htmlPath)) {
    throw new Error(`HTML file not found: ${htmlPath}`);
  }

  await page.goto(`file://${htmlPath}`, {
    waitUntil: 'networkidle0'
  });

  await page.pdf({
  path: pdfPath,
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
  margin: {
    top: '0mm',
    bottom: '0mm',
    left: '0mm',
    right: '0mm'
  }
});

  await browser.close();

  console.log('✅ PDF generated:', pdfPath);
})();
