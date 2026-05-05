import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const OUTPUT_DIR = process.env.VISUAL_CURRENT_DIR || 'artifacts/current';
const TARGET_URL = process.env.VISUAL_URL || 'http://127.0.0.1:4173/index.html';

const sections = [
  { section: 'hero', selector: '#hero', output: 'hero.png' },
  { section: 'formats', selector: '#formats', output: 'formats.png' },
  { section: 'packages', selector: '#packages', output: 'packages.png' }
];

await fs.mkdir(OUTPUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 2400 } });
  const page = await context.newPage();
  await page.goto(TARGET_URL, { waitUntil: 'networkidle' });

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

  await context.close();
  console.log(`Saved section screenshots to ${OUTPUT_DIR}`);
} finally {
  await browser.close();
}
