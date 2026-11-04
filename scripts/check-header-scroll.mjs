import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)('playwright');
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
try {
  for (const width of [320, 390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    await page.goto(process.env.APP_URL || 'http://127.0.0.1:3000');
    const names = page.locator('#site-header a[href="#hero"] > span').first();
    await names.waitFor({ state: 'attached' });
    for (const [position, visible] of [[0, false], [299, false], [300, true], [600, true], [299, false]]) {
      await page.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), position);
      await page.waitForTimeout(100);
      assert.equal(await names.isVisible(), visible, `${width}px: names visible=${visible} at scrollY=${position}`);
    }
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.evaluate(() => window.scrollTo({ top: 300, behavior: 'instant' }));
    await page.waitForTimeout(80);
    const progress = await names.locator('.header-name').evaluateAll(elements => elements.map(el => Number(getComputedStyle(el).opacity)));
    assert.ok(progress[0] > progress[2], 'The groom appears before the bride');
    await page.waitForTimeout(1100);
    const styles = await names.locator('.header-name').evaluateAll(elements => elements.map(el => {
      const css = getComputedStyle(el);
      return { opacity: css.opacity, delay: parseFloat(css.transitionDelay), transition: css.transitionProperty };
    }));
    assert.equal(styles.length, 3);
    assert.ok(styles.every(style => style.opacity === '1' && style.transition.includes('clip-path')));
    assert.ok(styles[0].delay < styles[1].delay && styles[1].delay < styles[2].delay);
    await page.evaluate(() => document.fonts.ready);
    const nameBounds = await names.locator('.header-name').evaluateAll(elements => elements.map(el => el.getBoundingClientRect().top));
    assert.ok(Math.max(...nameBounds) - Math.min(...nameBounds) < 8, 'Names stay on one line');
    await page.screenshot({ path: `/private/tmp/wedding-header-refined-${width}.png` });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.close();
  }
  console.log('PASS: header names toggle at 300px on mobile/desktop, animate, and respect reduced motion.');
} finally {
  await browser.close();
}
