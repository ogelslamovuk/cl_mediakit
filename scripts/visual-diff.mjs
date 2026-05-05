import fs from 'node:fs/promises';
import path from 'node:path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import sharp from 'sharp';

const THRESHOLD_PERCENT = Number(process.env.VISUAL_DIFF_THRESHOLD_PERCENT || 8);
const CURRENT_DIR = process.env.VISUAL_CURRENT_DIR || 'artifacts/current';
const REFERENCE_DIR = process.env.VISUAL_REFERENCE_DIR || 'visual-reference';
const DIFF_DIR = process.env.VISUAL_DIFF_DIR || 'artifacts/diff';
const REPORT_PATH = process.env.VISUAL_REPORT_PATH || 'artifacts/visual-report.json';

const sections = [
  { section: 'hero', selector: '#hero', rendered: 'hero.png', reference: 'reference-1.webp' },
  { section: 'formats', selector: '#formats', rendered: 'formats.png', reference: 'reference-2.webp' },
  { section: 'packages', selector: '#packages', rendered: 'packages.png', reference: 'reference-3.webp' }
];

const loadAsPng = async (filePath) => {
  const rawPng = await sharp(filePath).png().toBuffer();
  return PNG.sync.read(rawPng);
};

const exists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

await fs.mkdir(path.dirname(REPORT_PATH), { recursive: true });
await fs.mkdir(DIFF_DIR, { recursive: true });

const report = {
  status: 'pass',
  thresholdPercent: THRESHOLD_PERCENT,
  checkedAt: new Date().toISOString(),
  results: []
};

let referencesMissing = false;
let hasFailure = false;

for (const item of sections) {
  const renderedPath = path.join(CURRENT_DIR, item.rendered);
  const referencePath = path.join(REFERENCE_DIR, item.reference);

  const hasReference = await exists(referencePath);
  if (!hasReference) {
    referencesMissing = true;
    report.results.push({
      section: item.section,
      selector: item.selector,
      reference: referencePath,
      rendered: renderedPath,
      expectedReference: item.reference,
      totalPixels: null,
      differentPixels: null,
      differencePercent: null,
      threshold: THRESHOLD_PERCENT,
      status: 'reference_missing'
    });
    continue;
  }

  const hasRendered = await exists(renderedPath);
  if (!hasRendered) {
    hasFailure = true;
    report.results.push({
      status: 'section_missing',
      section: item.section,
      selector: item.selector,
      expectedReference: item.reference,
      reference: referencePath,
      rendered: renderedPath,
      totalPixels: null,
      differentPixels: null,
      differencePercent: null,
      threshold: THRESHOLD_PERCENT
    });
    continue;
  }

  const rendered = await loadAsPng(renderedPath);
  const reference = await loadAsPng(referencePath);

  if (rendered.width !== reference.width || rendered.height !== reference.height) {
    hasFailure = true;
    report.results.push({
      section: item.section,
      selector: item.selector,
      reference: referencePath,
      rendered: renderedPath,
      totalPixels: rendered.width * rendered.height,
      differentPixels: rendered.width * rendered.height,
      differencePercent: 100,
      threshold: THRESHOLD_PERCENT,
      status: 'dimension_mismatch'
    });
    continue;
  }

  const diff = new PNG({ width: rendered.width, height: rendered.height });
  const differentPixels = pixelmatch(rendered.data, reference.data, diff.data, rendered.width, rendered.height, { threshold: 0.1 });
  const totalPixels = rendered.width * rendered.height;
  const differencePercent = Number(((differentPixels / totalPixels) * 100).toFixed(4));
  const diffPath = path.join(DIFF_DIR, `${item.section}-diff.png`);
  await fs.writeFile(diffPath, PNG.sync.write(diff));

  const passed = differencePercent <= THRESHOLD_PERCENT;
  if (!passed) hasFailure = true;

  report.results.push({
    section: item.section,
    selector: item.selector,
    reference: referencePath,
    rendered: renderedPath,
    totalPixels,
    differentPixels,
    differencePercent,
    threshold: THRESHOLD_PERCENT,
    status: passed ? 'pass' : 'fail',
    diffImage: diffPath
  });
}

report.status = referencesMissing ? 'references_missing' : hasFailure ? 'fail' : 'pass';
await fs.writeFile(REPORT_PATH, JSON.stringify(report, null, 2));
console.log(`Saved report to ${REPORT_PATH}`);

if (report.status === 'fail') process.exit(1);
