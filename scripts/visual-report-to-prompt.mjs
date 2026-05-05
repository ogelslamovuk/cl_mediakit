import fs from 'node:fs/promises';
import path from 'node:path';

const REPORT_PATH = process.env.VISUAL_REPORT_PATH || 'artifacts/visual-report.json';
const OUTPUT_PATH = process.env.VISUAL_PROMPT_PATH || 'artifacts/current/visual-fix-prompt.md';

const report = JSON.parse(await fs.readFile(REPORT_PATH, 'utf8'));
const failed = report.results.filter((item) => ['fail', 'dimension_mismatch', 'section_missing'].includes(item.status));

const lines = [
  '# Visual fix prompt',
  '',
  `Threshold: ${report.thresholdPercent}%`,
  `Overall status: ${report.status}`,
  '',
  'Task: fix only failed sections (#hero, #formats, #packages) to match references.',
  'Allowed to edit only: index.html, styles.css.',
  'Do not modify assets, reference images, workflows, or scripts.',
  '',
  'Return STRICT JSON only:',
  '{"index_html":"...full file...","styles_css":"...full file..."}',
  ''
];

if (failed.length === 0) {
  lines.push('No failed sections. Keep files unchanged.');
} else {
  lines.push('Failed sections to fix:');
  for (const item of failed) {
    lines.push(`- section=${item.section}, selector=${item.selector}, status=${item.status}`);
    lines.push(`  - reference=${item.reference}`);
    lines.push(`  - rendered=${item.rendered}`);
    lines.push(`  - differencePercent=${item.differencePercent}`);
    if (item.diffImage) lines.push(`  - diffImage=${item.diffImage}`);
  }
}

await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
await fs.writeFile(OUTPUT_PATH, `${lines.join('\n')}\n`);
console.log(`Saved prompt to ${OUTPUT_PATH}`);
