const { chromium } = require('playwright');

async function createPage() {
  const browser = await chromium.launch({headless: false, slowMo: 100});

  const context = await browser.newContext();
  
  const page = await context.newPage();

  return { browser, page };

}

module.exports = { createPage };