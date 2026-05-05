import fs from 'node:fs/promises';

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) throw new Error('OPENAI_API_KEY is required');

const [taskPrompt, reviewPath, reportPath, agentsPath, skillsPath] = process.argv.slice(2);
if (!reviewPath || !reportPath || !agentsPath || !skillsPath) {
  throw new Error('Usage: node scripts/visual-fix-openai.mjs <taskPrompt> <reviewPath> <reportPath> <agentsPath> <skillsPath>');
}

const [review, report, agents, skills, indexHtml, stylesCss] = await Promise.all([
  fs.readFile(reviewPath, 'utf8'),
  fs.readFile(reportPath, 'utf8'),
  fs.readFile(agentsPath, 'utf8'),
  fs.readFile(skillsPath, 'utf8'),
  fs.readFile('index.html', 'utf8').catch(() => ''),
  fs.readFile('styles.css', 'utf8').catch(() => '')
]);

const body = {
  model: 'gpt-5',
  input: [
    {
      role: 'system',
      content: [
        { type: 'input_text', text: 'You are a precise frontend assistant editing only index.html and styles.css.' },
        { type: 'input_text', text: 'Keep required IDs: #hero, #formats, #packages.' },
        { type: 'input_text', text: 'Do not use visual-reference files as live content/background.' },
        { type: 'input_text', text: 'Apply only report/review-driven fixes. Return strict JSON with keys index_html, styles_css, applied_fix_summary.' }
      ]
    },
    {
      role: 'user',
      content: [
        { type: 'input_text', text: `Task prompt:\n${taskPrompt || ''}` },
        { type: 'input_text', text: `AGENTS.md:\n${agents}` },
        { type: 'input_text', text: `SKILLS.md:\n${skills}` },
        { type: 'input_text', text: `Visual report:\n${report}` },
        { type: 'input_text', text: `Visual review:\n${review}` },
        { type: 'input_text', text: `Current index.html:\n${indexHtml}` },
        { type: 'input_text', text: `Current styles.css:\n${stylesCss}` }
      ]
    }
  ],
  text: { format: { type: 'json_object' } }
};

const resp = await fetch('https://api.openai.com/v1/responses', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` },
  body: JSON.stringify(body)
});
if (!resp.ok) throw new Error(`OpenAI fix failed: ${resp.status} ${await resp.text()}`);
const data = await resp.json();
const raw = data.output_text?.trim() || '{}';
const parsed = JSON.parse(raw);
if (!parsed.index_html || !parsed.styles_css) throw new Error('Missing index_html/styles_css in model output');
await fs.writeFile('index.html', parsed.index_html);
await fs.writeFile('styles.css', parsed.styles_css);
await fs.writeFile('artifacts/current/applied-fix-summary.md', `${parsed.applied_fix_summary || 'No summary provided.'}\n`);
