import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)('playwright');
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(process.env.APP_URL || 'http://127.0.0.1:3000');
    await page.locator('#hero h1').waitFor();
    assert.equal(await page.getByRole('button', { name: /^(VN|EN)$/ }).count(), 0, 'Language controls are removed');
    assert.equal(await page.locator('html').getAttribute('lang'), 'vi');
    assert.doesNotMatch(await page.locator('body').innerText(), /SAVE|DATE|Forever|OUR STORY|COUNTDOWN|GALLERY|LOCATION|ROMANCE|LOVE IN|Thank You|RSVP/);
    if (width < 640) {
      await page.getByRole('button', { name: 'Mở menu', exact: true }).click();
      assert.equal(await page.getByRole('button', { name: /^(VN|EN)$/ }).count(), 0);
      assert.doesNotMatch(await page.locator('#mobile-menu').innerText(), /Language|Ngôn ngữ/);
      await page.getByRole('button', { name: 'Đóng menu', exact: true }).click();
    }
    await page.getByRole('tab', { name: 'Lễ nạp tài', exact: true }).click();
    assert.match(await page.locator('#invitation').innerText(), /LỄ NẠP TÀI/);
    await page.getByRole('tab', { name: 'Lễ thành hôn', exact: true }).click();
    await page.locator('#gallery button:has(> img)').first().click();
    await page.getByRole('dialog').locator('img').evaluate(el => el.decode());
    await page.getByRole('button', { name: 'Ảnh sau', exact: true }).click();
    await page.getByRole('button', { name: 'Đóng ảnh', exact: true }).click();
    await page.getByRole('dialog').waitFor({ state: 'hidden' });
    assert.deepEqual(errors, []);
    await page.close();
  }
  console.log('PASS: Vietnamese only, no language controls, working invitation tabs and gallery on mobile/desktop.');
} finally {
  await browser.close();
}
