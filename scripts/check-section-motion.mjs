import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)('playwright');
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
try {
  for (const reducedMotion of ['no-preference', 'reduce']) {
    const page = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(process.env.APP_URL || 'http://127.0.0.1:3000', { waitUntil: 'domcontentloaded' });
    await page.getByRole('switch').waitFor();
    if (await page.getByRole('switch').getAttribute('aria-checked') === 'true') await page.getByRole('switch').click();
    const names = page.locator('#hero .hero-name');
    assert.equal(await names.count(), 3, 'Hero names have a staggered entrance');
    const animations = await names.evaluateAll(elements => elements.map(el => getComputedStyle(el).animationName));
    assert.ok(animations.every(name => name === (reducedMotion === 'reduce' ? 'none' : 'hero-name-enter')));
    const flower = page.locator('#hero .botanical-motion');
    await flower.waitFor();
    const before = await flower.evaluate(el => getComputedStyle(el).transform);
    await page.waitForTimeout(500);
    const after = await flower.evaluate(el => getComputedStyle(el).transform);
    if (reducedMotion === 'reduce') assert.equal(after, 'none', 'Reduced motion keeps flowers still');
    else assert.notEqual(before, after, 'Flowers move when their section enters the viewport');
    const seal = page.locator('#invitation .seal-motion').first();
    await seal.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1400);
    assert.equal(await seal.evaluate(el => getComputedStyle(el).opacity), '1');
    await page.locator('#gallery button:has(> img)').first().click();
    await page.getByRole('dialog').locator('img').evaluate(el => el.decode());
    await page.getByRole('button', { name: 'Ảnh sau', exact: true }).click();
    await page.waitForTimeout(500);
    assert.equal(await page.getByRole('dialog').locator('img').evaluate(el => getComputedStyle(el).opacity), '1');
    await page.keyboard.press('Escape');
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    assert.deepEqual(errors, []);
    await page.close();
  }
  console.log('PASS: staggered hero, moving flowers, seal entrance, lightbox transitions, reduced motion, and mobile layout.');
} finally {
  await browser.close();
}
