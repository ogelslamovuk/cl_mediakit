import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';

const requiredEnv = ['OPENAI_API_KEY', 'GITHUB_TOKEN', 'GITHUB_REPOSITORY', 'GITHUB_RUN_ID', 'TASK_PROMPT'];
for (const key of requiredEnv) if (!process.env[key]) throw new Error(`${key} is required`);

const taskPrompt = process.env.TASK_PROMPT;
const runId = process.env.GITHUB_RUN_ID;
const thresholdPercent = String(Number(process.env.THRESHOLD_PERCENT || '8'));
const maxIterations = Math.min(5, Math.max(1, Number(process.env.MAX_ITERATIONS || '5')));
const branch = `autopilot/landing-${runId}`;
const artifactsRoot = 'artifacts/iterations';

const sh = (cmd, env = {}) => execSync(cmd, { stdio: 'inherit', env: { ...process.env, ...env } });
const shOut = (cmd) => execSync(cmd, { encoding: 'utf8' }).trim();

const ghHeaders = { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, 'User-Agent': 'landing-autopilot', 'Content-Type': 'application/json' };

await fs.mkdir(artifactsRoot, { recursive: true });
await fs.mkdir('artifacts/current', { recursive: true });
await fs.readFile('AGENTS.md', 'utf8');
await fs.readFile('SKILLS.md', 'utf8');
await fs.readFile('index.html', 'utf8').catch(() => '');
await fs.readFile('styles.css', 'utf8').catch(() => '');

sh('git fetch origin main');
sh(`git checkout -B ${branch} origin/main`);
sh('npx http-server . -p 4173 -a 127.0.0.1 >/tmp/http-server.log 2>&1 & echo $! > /tmp/http-server.pid');

let passed = false;
let iterationsDone = 0;
let prAction = 'none';
let prUrl = '';

try {
  for (let i = 1; i <= maxIterations; i++) {
    iterationsDone = i;
    sh('npm run visual:capture');
    let diffOk = true;
    try {
      sh('npm run visual:diff', { VISUAL_DIFF_THRESHOLD_PERCENT: thresholdPercent });
    } catch {
      diffOk = false;
    }

    const iterDir = `${artifactsRoot}/iteration-${i}`;
    await fs.mkdir(iterDir, { recursive: true });
    for (const file of ['hero.png', 'formats.png', 'packages.png']) {
      await fs.copyFile(path.join('artifacts/current', file), path.join(iterDir, file)).catch(() => {});
    }
    await fs.cp('artifacts/diff', path.join(iterDir, 'diff'), { recursive: true, force: true }).catch(() => {});
    await fs.copyFile('artifacts/visual-report.json', path.join(iterDir, 'visual-report.json')).catch(() => {});

    if (diffOk) {
      passed = true;
      await fs.writeFile(path.join(iterDir, 'visual-review.md'), '# Visual review\n\nAll sections passed threshold.\n');
      await fs.writeFile(path.join(iterDir, 'applied-fix-summary.md'), 'No fixes applied; diff passed.\n');
      break;
    }

    sh(`node scripts/visual-review-openai.mjs artifacts/visual-report.json ${iterDir}/visual-review.md ${JSON.stringify(taskPrompt)}`);
    sh(`node scripts/visual-fix-openai.mjs ${JSON.stringify(taskPrompt)} ${iterDir}/visual-review.md artifacts/visual-report.json AGENTS.md SKILLS.md`);
    await fs.copyFile('artifacts/current/applied-fix-summary.md', path.join(iterDir, 'applied-fix-summary.md')).catch(() => {});
  }
} finally {
  sh('kill $(cat /tmp/http-server.pid) || true');
}

sh('git add index.html styles.css artifacts/iterations scripts/landing-autopilot.mjs scripts/visual-review-openai.mjs scripts/visual-fix-openai.mjs .github/workflows/landing-autopilot.yml package.json package-lock.json');
if (shOut('git status --porcelain').length > 0) {
  sh('git config user.name "github-actions[bot]"');
  sh('git config user.email "41898282+github-actions[bot]@users.noreply.github.com"');
  sh('git commit -m "feat: improve landing autopilot section review and PR API checks"');
  sh(`git push --set-upstream origin ${branch}`);
}

const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
const listResp = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls?state=open&head=${owner}:${encodeURIComponent(branch)}`, { headers: ghHeaders });
if (!listResp.ok) throw new Error(`GitHub PR list failed: ${listResp.status} ${await listResp.text()}`);
const existing = await listResp.json();
const body = `Automated landing autopilot run ${runId}.\n\nStatus: ${passed ? 'pass' : 'needs review'}\nIterations: ${iterationsDone}/${maxIterations}.`;

if (Array.isArray(existing) && existing.length > 0) {
  const pr = existing[0];
  const updateResp = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${pr.number}`, {
    method: 'PATCH', headers: ghHeaders, body: JSON.stringify({ title: `Landing autopilot run ${runId}`, body })
  });
  if (!updateResp.ok) throw new Error(`GitHub PR update failed: ${updateResp.status} ${await updateResp.text()}`);
  const updated = await updateResp.json();
  prAction = 'updated';
  prUrl = updated.html_url || pr.html_url || '';
} else {
  const createResp = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
    method: 'POST', headers: ghHeaders, body: JSON.stringify({ title: `Landing autopilot run ${runId}`, head: branch, base: 'main', body })
  });
  if (!createResp.ok) throw new Error(`GitHub PR create failed: ${createResp.status} ${await createResp.text()}`);
  const created = await createResp.json();
  prAction = 'created';
  prUrl = created.html_url || '';
}

console.log('=== Landing autopilot final report ===');
console.log(`iterations_executed=${iterationsDone}`);
console.log(`final_status=${passed ? 'pass' : 'needs_review'}`);
console.log(`pr_action=${prAction}`);
console.log(`pr_url=${prUrl || 'n/a'}`);
console.log(`artifacts_path=${artifactsRoot}`);
