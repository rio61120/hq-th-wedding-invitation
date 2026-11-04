import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readdir } from 'node:fs/promises';

const { chromium } = createRequire(import.meta.url)('playwright');
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const photoCount = (await readdir(new URL('../public/images/', import.meta.url)))
  .filter(name => /\.(jpe?g|png|webp)$/i.test(name)).length;
try {
  for (const width of [1440, 1024, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    await page.goto(process.env.APP_URL || 'http://127.0.0.1:3000');
    await page.evaluate(() => document.fonts.ready);
    await page.locator('#gallery').waitFor({ state: 'attached' });
    const gallery = page.locator('#gallery');
    const cards = gallery.locator('button:has(> img)');
    for (let index = 0; index < await cards.count(); index++) {
      await cards.nth(index).scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
    }
    await page.waitForTimeout(800);
    const items = await page.locator('#gallery button:has(> img), #gallery div:has(> h3)').evaluateAll(elements =>
      elements.filter(el => el.getBoundingClientRect().width > 0).map(el => {
        const rect = el.getBoundingClientRect();
        return { x: Math.round(rect.x), top: rect.top, bottom: rect.bottom, right: rect.right, transform: getComputedStyle(el).transform, label: el.getAttribute('aria-label') };
      })
    );
    assert.equal(items.length, photoCount + 1, 'All source photos and the album card appear exactly once');
    const columns = Map.groupBy(items, item => item.x);
    assert.equal(columns.size, width >= 1024 ? 3 : 2);
    for (const column of columns.values()) {
      column.sort((a, b) => a.top - b.top);
      for (let i = 1; i < column.length; i++) {
        const gap = column[i].top - column[i - 1].bottom;
        assert.ok(gap >= 8 && gap <= 28, `${width}px: masonry gap ${gap.toFixed(1)}px must stay between 8 and 28px; ${JSON.stringify(column.slice(i - 1, i + 1))}`);
      }
    }
    assert.ok(items.every(item => item.x >= 0 && item.right <= width));
    await gallery.screenshot({ path: `/private/tmp/wedding-masonry-${width}.png` });
    const photo = gallery.locator('button:has(> img)').first();
    await photo.click();
    const seen = new Set();
    for (let index = 0; index < photoCount; index++) {
      const image = page.getByRole('dialog').locator('img');
      await image.evaluate(el => el.decode());
      seen.add(await image.getAttribute('src'));
      await page.getByRole('button', { name: 'Ảnh sau', exact: true }).click();
    }
    assert.equal(seen.size, photoCount, 'Every photo loads in the lightbox without duplicates');
    await page.keyboard.press('Escape');
    await page.getByRole('dialog').waitFor({ state: 'hidden' });
    await page.close();
  }
  console.log(`PASS: gallery has 3 desktop / 2 mobile masonry columns, consistent gaps, all ${photoCount} photos, and working lightbox.`);
} finally {
  await browser.close();
}
