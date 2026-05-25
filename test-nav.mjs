import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER_CONSOLE:', msg.text()));
    page.on('pageerror', error => console.log('BROWSER_ERROR:', error.message));
    
    await page.goto('http://localhost:5173/');
    
    // Click "Comenzar" or next buttons
    console.log('Navigating form...');
    
    // Welcome screen "Comenzar" button
    await page.waitForSelector('button', { timeout: 5000 });
    const buttons = await page.$$('button');
    let startBtn = null;
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text.includes('Comenzar')) {
        startBtn = btn;
        break;
      }
    }
    
    if (startBtn) {
      await startBtn.click();
      await page.waitForTimeout(1000);
    }
    
    // Now we are at Question 1
    for (let i = 0; i < 15; i++) {
      // Look for react-tel-input
      const hasPhone = await page.$('.react-tel-input');
      if (hasPhone) {
        console.log('FOUND_PHONE_INPUT');
        const errText = await page.evaluate(() => document.body.innerText);
        if (errText.includes('Something went wrong')) {
          console.log('REACT CRASHED AT PHONE INPUT!');
        } else {
          // Get styles
          const styles = await page.evaluate(() => {
            const el = document.querySelector('.lhh-phone-input');
            if (!el) return null;
            const style = window.getComputedStyle(el);
            return {
              color: style.color,
              backgroundColor: style.backgroundColor,
              className: el.className
            };
          });
          console.log('PHONE_INPUT_STYLES:', styles);
        }
        break;
      }
      
      // otherwise input something and click Continuar
      const input = await page.$('input');
      if (input) {
        await input.type('test');
      } else {
        const option = await page.$('.group\\/btn');
        if (option) await option.click();
      }
      
      const contBtns = await page.$$('button');
      let nextBtn = null;
      for (const btn of contBtns) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text.includes('Continuar')) {
          nextBtn = btn;
          break;
        }
      }
      
      if (nextBtn) {
        await nextBtn.click();
        await page.waitForTimeout(1000);
      } else {
        break;
      }
    }
    
    await browser.close();
  } catch (err) {
    console.error('SCRIPT_ERROR:', err);
  }
})();
