const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  
  try {
    await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle2', timeout: 15000 });
    
    // Full page screenshot
    await page.screenshot({ 
      path: '/home/z/my-project/download/site-full.png',
      fullPage: true 
    });
    
    // Hero section screenshot
    await page.screenshot({ 
      path: '/home/z/my-project/download/site-hero.png'
    });
    
    console.log('Screenshots saved!');
    
    // Get spacing info
    const sections = await page.evaluate(() => {
      const sections = document.querySelectorAll('section[id]');
      return Array.from(sections).map(s => ({
        id: s.id,
        paddingTop: window.getComputedStyle(s).paddingTop,
        paddingBottom: window.getComputedStyle(s).paddingBottom,
        marginBottom: window.getComputedStyle(s).marginBottom,
        height: s.offsetHeight
      }));
    });
    
    console.log('\nSection spacing info:');
    console.log(JSON.stringify(sections, null, 2));
    
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  await browser.close();
})();
