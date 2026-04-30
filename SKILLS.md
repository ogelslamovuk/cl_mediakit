# SKILLS.md

## Hybrid visual-to-web transfer skill

Use this skill when the task is to convert an approved visual design, PDF page, slide, screenshot, or media-kit reference into a web landing page.

### Core principle

Do not redesign the approved visual.

Do not create a new interpretation.

Do not make a generic landing inspired by the reference.

The goal is to transfer the approved visual into a working web page with maximum visual fidelity.

### Required approach

Use a hybrid implementation:

- HTML/CSS for page structure, grids, spacing, typography, live text, tables, cards, CTA blocks, pricing blocks, and responsive layout.
- Image assets for elements that are visual, branded, complex, or expensive to reproduce accurately in CSS.

Image assets are allowed and often required for:

- official logos;
- brand marks;
- mascot/illustration elements;
- complex UI mockups;
- device mockups;
- screenshots;
- detailed advertising placement visuals;
- visual fragments whose exact look matters more than editability.

### Forbidden approach

Do not force pure HTML/CSS if it damages visual quality.

Do not recreate official logos or mascots with divs, CSS shapes, emoji, or approximate text.

Do not replace complex mockups with primitive boxes, gradients, or placeholder divs.

Do not invent new mockups if approved mockups already exist.

Do not simply paste full-page reference images as the whole website unless the user explicitly asks for image-only embedding.

Do not convert the design into three visible A4/PDF sheets stacked on the page if the requested output is a continuous landing.

### Correct web translation

The web result should feel like one continuous landing page while preserving the approved visual system.

Keep:

- brand colors;
- exact logo/assets;
- typography feel;
- grid logic;
- card style;
- shadows;
- rounded corners;
- pricing hierarchy;
- mockup appearance;
- visual rhythm;
- content order.

Avoid visible page-sheet framing unless it is explicitly part of the requested web design.

### Asset extraction rule

If a visual element cannot be reproduced close to the reference in HTML/CSS within reasonable effort, extract or use it as an image asset.

Prefer asset extraction for logos and complex mockups over inaccurate CSS imitation.

The final result may combine live HTML text with image-based visual fragments.

### Iteration rule

For complex visual transfer tasks, do not implement all screens at once after a failed attempt.

First implement the first screen/hero and produce a screenshot for review.

After the first screen is accepted, continue with the remaining sections.

### Visual QA rule

The implementer must compare the resulting page against the visual references.

Use Playwright or another browser screenshot method when available.

Check:

- spacing;
- typography scale;
- colors;
- logo accuracy;
- mockup accuracy;
- card proportions;
- section rhythm;
- desktop layout;
- mobile layout;
- absence of horizontal scroll;
- absence of generic-template feel.

If screenshot tooling is unavailable, state this clearly and provide the best available visual verification method.

### Acceptance criteria

A result is acceptable only if:

- it visually resembles the approved reference, not a new design;
- official logos and complex visuals are not replaced with homemade approximations;
- the page feels like a polished landing, not stacked PDF screenshots;
- live HTML/CSS is used where useful, and image assets are used where accuracy requires them;
- content, prices, and agreed figures are preserved;
- the implementation works as a static site on GitHub Pages without a build step.
