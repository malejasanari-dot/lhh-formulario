import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER_CONSOLE:', msg.text()));
    page.on('pageerror', error => console.log('BROWSER_ERROR:', error.message));
    
    await page.goto('http://localhost:5173/');
    await new Promise(r => setTimeout(r, 2000));
    
    const bodyHTML = await page.evaluate(() => document.body.innerHTML);
    if (bodyHTML.includes('Something went wrong')) {
      console.log('REACT_CRASHED: Found error boundary message.');
      const errText = await page.evaluate(() => document.body.innerText);
      console.log('ERROR_DETAILS:\n', errText);
    } else {
      console.log('REACT_RENDERED_OK');
      const hasTelInput = await page.$('.react-tel-input');
      console.log('Has .react-tel-input:', !!hasTelInput);
    }
    
    await browser.close();
  } catch (err) {
    console.error('SCRIPT_ERROR:', err);
  }
})();
