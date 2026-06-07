import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const OUTPUT_DIR = process.env.VISUAL_CURRENT_DIR || 'artifacts/current';
const TARGET_URL = process.env.VISUAL_URL || 'http://127.0.0.1:4173/index.html';

const sections = [
  { section: 'hero', selector: '#hero', output: 'hero.png' },
  { section: 'formats', selector: '#formats', output: 'formats.png' },
  { section: 'packages', selector: '#packages', output: 'packages.png' },
  { section: 'audience', selector: '#audience', output: 'audience.png' }
];

await fs.mkdir(OUTPUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 2400 } });
  const page = await context.newPage();
  await page.goto(TARGET_URL, { waitUntil: 'networkidle' });

  const desktopOverflow = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth
  }));
  if (desktopOverflow.scrollWidth > desktopOverflow.clientWidth + 1) {
    throw new Error(`Desktop horizontal overflow: ${desktopOverflow.scrollWidth}px > ${desktopOverflow.clientWidth}px`);
  }

  for (const item of sections) {
    const locator = page.locator(item.selector).first();
    const count = await locator.count();
    if (count === 0) {
      console.warn(`Section not found: ${item.selector}`);
      continue;
    }
    await locator.scrollIntoViewIfNeeded();
    await locator.screenshot({ path: path.join(OUTPUT_DIR, item.output) });
  }

  await page.screenshot({ path: path.join(OUTPUT_DIR, 'desktop-full.png'), fullPage: true });
  await context.close();

  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 1200 }, isMobile: true });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(TARGET_URL, { waitUntil: 'networkidle' });
  const mobileOverflow = await mobilePage.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth
  }));
  if (mobileOverflow.scrollWidth > mobileOverflow.clientWidth + 1) {
    throw new Error(`Mobile horizontal overflow: ${mobileOverflow.scrollWidth}px > ${mobileOverflow.clientWidth}px`);
  }

  await mobilePage.screenshot({ path: path.join(OUTPUT_DIR, 'mobile-390.png'), fullPage: true });
  await mobileContext.close();

  console.log(`Saved section screenshots to ${OUTPUT_DIR}`);
} finally {
  await browser.close();
}
