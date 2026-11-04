import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');

const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const appUrl = process.env.APP_URL || 'http://127.0.0.1:3000';
try {
  for (const mobile of [true, false]) {
    const page = await browser.newPage({
      viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 1000 },
      hasTouch: mobile,
      isMobile: mobile,
    });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(appUrl);
    await page.getByRole('switch').waitFor();
    if (mobile) await page.locator('#hero h1').tap();
    await page.waitForTimeout(6200);
    const scrollY = await page.evaluate(() => window.scrollY);
    const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
    assert.ok(scrollY > 0 && scrollY < maxScroll, `${mobile ? 'Mobile' : 'Desktop'}: auto scroll should be progressing toward the page end; scrollY=${scrollY}, max=${maxScroll}`);
    assert.equal(await page.getByRole('switch').getAttribute('aria-checked'), 'true', 'Auto scroll remains enabled while the presentation runs');
    await page.getByRole('switch').click();
    for (const id of ['gallery', 'location']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(1200);
      assert.ok(await page.locator(`#${id} h2`).isVisible());
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No horizontal overflow');
    }
    assert.deepEqual(errors, [], 'No browser runtime errors');
    await page.close();
  }
  const page = await browser.newPage();
  await page.goto(appUrl);
  await page.getByRole('switch').waitFor();
  await page.mouse.wheel(0, 120);
  await page.waitForTimeout(200);
  assert.equal(await page.getByRole('switch').getAttribute('aria-checked'), 'false', 'Manual scroll cancels timer');
  const position = await page.evaluate(() => scrollY);
  await page.waitForTimeout(5400);
  assert.equal(await page.evaluate(() => scrollY), position, 'No delayed scroll after cancellation');
  const restartPosition = await page.evaluate(() => scrollY);
  await page.getByRole('switch').click();
  await page.waitForTimeout(600);
  assert.ok(await page.evaluate(() => scrollY) > restartPosition, 'Toggle restarts auto scroll');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(appUrl);
  assert.equal(await page.getByRole('switch').getAttribute('aria-checked'), 'true', 'Auto scroll starts enabled');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto(`${appUrl}/#location`);
  assert.equal(await page.getByRole('switch').getAttribute('aria-checked'), 'true', 'Auto scroll starts enabled for deep links');

  await page.goto(appUrl);
  const toggle = page.getByRole('switch');
  await toggle.waitFor();
  const switchAlignment = await toggle.evaluate(button => {
    const icon = button.children[0].getBoundingClientRect();
    const track = button.children[1].getBoundingClientRect();
    const knob = button.children[1].firstElementChild.getBoundingClientRect();
    return {
      buttonCenter: button.getBoundingClientRect().left + button.getBoundingClientRect().width / 2,
      iconCenter: icon.left + icon.width / 2,
      trackCenter: track.left + track.width / 2,
      knobCenter: knob.left + knob.width / 2,
      iconBottom: icon.bottom,
      trackTop: track.top,
    };
  });
  assert.ok(Math.max(Math.abs(switchAlignment.buttonCenter - switchAlignment.iconCenter), Math.abs(switchAlignment.buttonCenter - switchAlignment.trackCenter), Math.abs(switchAlignment.buttonCenter - switchAlignment.knobCenter)) < 1 && switchAlignment.iconBottom < switchAlignment.trackTop, 'Switch icon and vertical track are aligned');
  const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  await page.waitForFunction(() => document.querySelector('[data-auto-scroll-toggle]')?.getAttribute('aria-checked') === 'false', undefined, { timeout: Math.ceil(5000 + maxScroll / 0.1 + 5000) });
  const finalPosition = await page.evaluate(() => ({ y: scrollY, max: document.documentElement.scrollHeight - innerHeight }));
  assert.ok(Math.abs(finalPosition.y - finalPosition.max) <= 1, `Auto scroll reaches the page end; scrollY=${finalPosition.y}, max=${finalPosition.max}`);
  await page.close();
  console.log('PASS: initial delay, continuous scroll to page end, switch alignment, manual cancellation, immediate restart, reduced motion, deep links, and mobile/desktop layout.');
} finally {
  await browser.close();
}
