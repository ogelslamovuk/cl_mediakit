# SKILLS.md

## Hybrid visual-to-web transfer + automated visual QA

Use this skill for tasks where landing pages are produced from visual references and must pass measurable visual validation.

## Scope and target

Target output:
- static landing page for GitHub Pages;
- high fidelity to approved references;
- automated visual QA artifacts proving quality.

## Required section structure

The landing must contain and preserve this core section sequence:
- `#hero`
- `#formats`
- `#packages`

Additional sections are allowed only if they do not break the reference hierarchy and commercial intent.

## Reference file rule

Primary references are fixed files:
- `visual-reference/reference-1.webp`
- `visual-reference/reference-2.webp`
- `visual-reference/reference-3.webp`

Use them as:
- visual source for implementation;
- baseline set for visual diff checks.

## Asset extraction rule

Apply hybrid transfer:
- reproduce structure/layout/content containers in HTML/CSS;
- extract/use image assets for logos, brand marks, complex graphics, mockups, and intricate decorative blocks.

When CSS reproduction materially hurts fidelity, prefer extracted assets.

## Strict prohibition

Never use `visual-reference/*` files directly as live landing content or section backgrounds.

Specifically forbidden:
- full-page reference image as single-page website;
- sliced reference chunks used to fake full implementation;
- “generic template + reference screenshot overlay” approach.

## Visual diff must be measurable

Visual quality must be evaluated via measurable diff (not subjective preview only).

Minimum expectation:
- deterministic screenshots of implemented page;
- comparison against reference baseline;
- numeric/explicit diff output in report artifacts.

## Iteration rule from report

If diff is poor, next iteration must be driven by `visual-report/prompt` and artifact findings.

Do not run speculative redesign loops “by intuition”.

Priority of fixes:
1. layout geometry and section proportions;
2. typography scale/weight/line-height;
3. spacing rhythm and alignment;
4. asset accuracy;
5. color/contrast/shadows.

## Readiness criteria

Work is ready only if:
- `#hero`, `#formats`, `#packages` are present and consistent with references;
- hybrid approach is used correctly (live HTML/CSS + proper assets);
- no forbidden usage of `visual-reference/*` as page content/background;
- visual diff artifacts exist and are reviewable;
- follow-up edits (if needed) are based on visual-report guidance;
- CI/GitHub Actions validation is part of final evidence.

## Current pipeline limitations (must be acknowledged)

- Local Codex Cloud execution may be unstable for Playwright/browser/npm.
- Local instability does not waive visual QA requirements.
- Final validation authority is CI (GitHub Actions) artifacts.
- If local run cannot complete, implementation is still expected to be iterated through CI reports until acceptable diff quality is reached.
