import fs from 'node:fs/promises';

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) throw new Error('OPENAI_API_KEY is required');

const [reportPath, outputPath, taskPrompt = ''] = process.argv.slice(2);
if (!reportPath || !outputPath) {
  throw new Error('Usage: node scripts/visual-review-openai.mjs <reportPath> <outputPath> <taskPrompt?>');
}

const sectionMeta = {
  hero: { reference: 'visual-reference/reference-1.webp', rendered: 'artifacts/current/hero.png' },
  formats: { reference: 'visual-reference/reference-2.webp', rendered: 'artifacts/current/formats.png' },
  packages: { reference: 'visual-reference/reference-3.webp', rendered: 'artifacts/current/packages.png' }
};

const report = JSON.parse(await fs.readFile(reportPath, 'utf8'));
const lines = ['# Visual review', '', `Overall status: ${report.status}`, `Threshold: ${report.thresholdPercent}%`, ''];

for (const result of report.results || []) {
  const meta = sectionMeta[result.section];
  if (!meta) continue;

  lines.push(`## Section: ${result.section}`);
  lines.push(`- reference image: ${meta.reference}`);
  lines.push(`- rendered image: ${meta.rendered}`);

  const isProblem = ['fail', 'dimension_mismatch', 'section_missing', 'reference_missing'].includes(result.status);
  if (!isProblem) {
    lines.push(`- status: PASS (${result.status})`);
    lines.push('');
    continue;
  }

  const [refBase64, renderedBase64] = await Promise.all([
    fs.readFile(meta.reference).then((b) => b.toString('base64')),
    fs.readFile(meta.rendered).then((b) => b.toString('base64')).catch(() => '')
  ]);

  const payload = {
    model: 'gpt-5',
    input: [
      {
        role: 'system',
        content: [
          { type: 'input_text', text: 'You are a strict visual QA reviewer for HTML/CSS landing pages.' },
          { type: 'input_text', text: 'Return concise markdown with visual mismatches and concrete fix instructions.' },
          { type: 'input_text', text: 'Do not suggest full-page image replacement. Focus on HTML/CSS fixes.' }
        ]
      },
      {
        role: 'user',
        content: [
          { type: 'input_text', text: `Task prompt:\n${taskPrompt}` },
          { type: 'input_text', text: `Section: ${result.section}` },
          { type: 'input_text', text: `Section result from visual-report.json:\n${JSON.stringify(result, null, 2)}` },
          { type: 'input_text', text: 'Reference image:' },
          { type: 'input_image', image_url: `data:image/webp;base64,${refBase64}` },
          { type: 'input_text', text: 'Rendered image:' },
          renderedBase64 ? { type: 'input_image', image_url: `data:image/png;base64,${renderedBase64}` } : { type: 'input_text', text: 'Rendered image unavailable.' },
          { type: 'input_text', text: 'Provide: 1) visual mismatches 2) concrete fix instructions.' }
        ]
      }
    ]
  };

  const resp = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify(payload)
  });
  if (!resp.ok) throw new Error(`OpenAI review failed for ${result.section}: ${resp.status} ${await resp.text()}`);

  const data = await resp.json();
  lines.push('- status: PROBLEM');
  lines.push('### visual mismatches & concrete fix instructions');
  lines.push(data.output_text?.trim() || 'No review text returned.');
  lines.push('');
}

await fs.writeFile(outputPath, `${lines.join('\n')}\n`);
