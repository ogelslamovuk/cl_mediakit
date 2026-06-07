import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const OUTPUT_PATH = process.env.PDF_OUTPUT_PATH || 'artifacts/go2-mediakit.pdf';
const TARGET_URL = process.env.PDF_URL || pathToFileURL(path.resolve('index.html')).toString();

await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1055, height: 1491 } });
  await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
  await page.pdf({
    path: OUTPUT_PATH,
    printBackground: true,
    preferCSSPageSize: true
  });
  console.log(`Saved PDF to ${OUTPUT_PATH}`);
} finally {
  await browser.close();
}
