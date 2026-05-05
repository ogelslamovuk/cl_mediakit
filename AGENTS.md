# AGENTS.md

## Project purpose (current)

This repository is a **playground + template** for an automated landing generation pipeline.

Primary process:
- input: visual reference images;
- output: production-ready landing page in HTML/CSS;
- delivery target: static site deployable on GitHub Pages.

The old media-kit-document workflow is no longer the main process in this repo.

## Primary deliverable

Each task should produce:
- a working landing page (`index.html` + `styles.css` + assets);
- visual fidelity to approved references;
- evidence from automated visual QA (artifacts/reports).

A PR is **not ready** without visual-check artifacts.

## Mandatory implementation model

Use a **hybrid visual-to-web approach**:
- HTML/CSS for structure, semantics, layout, adaptive behavior, and live text/content.
- Image assets for logos, branded graphics, complex mockups, and non-trivial decorative visuals.

Do not use full-page reference images as the website itself.

Do not create a generic “inspired by” landing that ignores reference composition.

## Visual references policy

`visual-reference/` is:
- the visual source of truth;
- the baseline for visual diff.

References must guide:
- section order;
- hierarchy;
- spacing rhythm;
- typography scale;
- CTA emphasis;
- component proportions.

Forbidden:
- embedding `visual-reference/*` full pages as page content/background;
- shipping references as a fake implementation;
- replacing reference-driven layout with template-like blocks.

## Automated visual QA is required

Visual QA is a required stage, not optional.

Required checks:
- render actual landing in browser (Playwright);
- compare against reference baselines (pixel/visual diff, e.g., pixelmatch);
- save artifacts (screenshots, diff images, reports);
- use report results to drive next iteration.

If diff quality is poor, next iteration must follow the visual report findings.
Do not “freestyle” edits not backed by measured mismatch.

## CI-first execution model

Preferred execution loop:
1. generate/update landing;
2. run visual-check and visual-autoloop;
3. inspect artifacts/report;
4. iterate based on measured diff;
5. submit PR with artifacts.

Target stack:
- GitHub Actions;
- OpenAI API;
- Playwright;
- pixelmatch;
- visual report artifacts.

Codex UI is a helper interface, **not** the primary iteration loop.

## Environment limitations policy

Local Codex Cloud issues (npm/playwright/browser/runtime quirks) are **not** a valid reason to skip automated validation.

If local checks are unstable:
- rely on GitHub Actions execution;
- fix pipeline/config/scripts until CI visual checks pass;
- attach CI artifacts and use them as acceptance evidence.

## Definition of ready

A task/PR is ready only when all are true:
- landing is implemented with hybrid HTML/CSS + proper assets;
- no forbidden use of full-page references as final content;
- visual diff is measurable and reviewed;
- visual-check/visual-autoloop artifacts are attached/published;
- CI workflow provides reproducible proof of quality.

## Agent behavior rules

Do:
- prioritize fidelity to approved references;
- keep content live in HTML where practical;
- extract and reuse assets for visual accuracy;
- iterate by measurable QA output.

Do not:
- switch back to document-style media kit process by default;
- mark work done without visual-check artifacts;
- treat Codex UI preview as final QA evidence;
- bypass CI-driven validation for convenience.
