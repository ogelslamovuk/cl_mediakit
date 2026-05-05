# Landing brief: Go2.by advertising media kit

## Goal

Create a polished static HTML/CSS landing page for Go2.by advertising opportunities.

The landing must be based on three approved visual reference images:

- `visual-reference/reference-1.webp` — hero / positioning / audience value
- `visual-reference/reference-2.webp` — advertising formats
- `visual-reference/reference-3.webp` — packages / analytics / contacts

This is not a redesign.

The goal is to transfer the approved visual direction into a working web landing page with maximum visual fidelity.

## Required output

Create or update:

- `index.html`
- `styles.css`
- `assets/*` if extracted visual assets are needed

The result must work as a static site on GitHub Pages without a build step.

## Required section structure

The page must contain these exact section IDs:

- `#hero`
- `#formats`
- `#packages`

They are required for automated visual capture and comparison.

Mapping:

- `#hero` must visually correspond to `visual-reference/reference-1.webp`
- `#formats` must visually correspond to `visual-reference/reference-2.webp`
- `#packages` must visually correspond to `visual-reference/reference-3.webp`

Additional subsections may exist inside these sections, but do not rename or remove the required IDs.

## Core visual rule

The page must look like a continuous premium landing page, not like three pasted PDF pages.

Use a hybrid implementation:

- HTML/CSS for structure, grids, typography, live text, tables, cards, pricing, layout, responsive behavior.
- Image assets for exact logo, complex mockups, device visuals, branded fragments, or graphical elements that cannot be reproduced accurately in CSS.

## Strict prohibitions

Do not use `visual-reference/*` as live page content.

Forbidden:

- `<img src="visual-reference/reference-1.webp">` as the visible hero
- CSS `background-image: url("visual-reference/reference-*.webp")`
- stacking the three reference images as the website
- using the reference files as full-page backgrounds
- making a generic landing merely inspired by the references
- replacing the Go2.by logo with plain text
- recreating the logo with CSS/divs
- replacing complex device/mockup visuals with primitive rectangles
- changing prices, figures, or wording unless explicitly required by layout

Reference images are only for:

- visual guidance
- visual diff baseline
- asset extraction source, if needed

If an element is extracted from a reference, save it into `assets/` and use the extracted asset from there.

## Asset extraction rules

Extract assets when needed for fidelity.

Recommended assets:

- `assets/go2-logo.*`
- `assets/hero-device-mockup.*`
- `assets/formats-placement-mockup.*`
- `assets/packages-visual.*` if the packages section contains complex visual fragments

Use assets only for complex visual elements.

Do not turn whole sections into image assets.

The main content must remain live HTML/CSS.

## Page content

Preserve the following content.

### Hero

Title:

`Рекламные возможности Go2.by`

Subtitle:

`Качественный digital-контакт с аудиторией в момент принятия решения`

KPI cards:

1. `до 100 тыс.`  
   `визитов в месяц`

2. `Desktop + Mobile`  
   `основные точки контакта`

3. `Беларусь`  
   `ядро аудитории площадки`

Block title:

`Почему Go2.by интересен брендам`

Benefits:

- `Пользователь планирует досуг и готов к покупке`
- `Контекст кино, событий и развлечений`
- `Digital-аудитория с понятным сценарием контакта`
- `Нативные и премиальные рекламные поверхности`

Categories:

- `банки`
- `платёжные системы`
- `FMCG`
- `telecom`
- `food & beverage`
- `lifestyle`

### Advertising formats

Section title:

`Рекламные форматы`

Formats:

#### 1. Hero-баннер 970×250

Placement:

`Главная, 1-й экран`

Devices:

`Desktop + Mobile`

Impressions per month:

`35–50 тыс.`

Price:

`1 800 BYN`

#### 2. Нативная карточка

Placement:

`Афиша / лента фильмов`

Devices:

`Desktop + Mobile`

Impressions per month:

`30–40 тыс.`

Price:

`1 100 BYN`

#### 3. Промо-слот

Placement:

`Карточка фильма / события`

Devices:

`Desktop + Mobile`

Impressions per month:

`18–25 тыс.`

Price:

`900 BYN`

#### 4. Баннер выбора мест

Placement:

`Шаг выбора мест / до оплаты`

Devices:

`Desktop + Mobile`

Impressions per month:

`20–30 тыс.`

Price:

`1 300 BYN`

#### 5. E-mail / PDF-билет

Placement:

`Электронный билет`

Devices:

`Desktop + Mobile`

Impressions per month:

`12–20 тыс.`

Price:

`800 BYN`

### Packages

Section title:

`Пакеты размещения`

#### Basic

Includes:

- `Нативная карточка`
- `E-mail / PDF-билет`

Advertising contacts:

`40–55 тыс.`

Price:

`2 200 BYN / мес.`

#### Standard

Includes:

- `Hero-баннер`
- `Нативная карточка`
- `Баннер выбора мест`

Advertising contacts:

`70–90 тыс.`

Price:

`3 900 BYN / мес.`

#### Premium

Includes:

- `Все форматы`
- `Category exclusivity`
- `Расширенный отчёт`

Advertising contacts:

`90–120 тыс.`

Price:

`5 800 BYN / мес.`

### Analytics

Block title:

`Аналитика и отчётность`

Items:

- `UTM-разметка и трекинг ссылок`
- `Показы, клики, CTR по форматам`
- `Возможность подключения tracking pixel`
- `Ежемесячный отчёт и рекомендации`

### Additional option

Title:

`Подписка на инфоповоды`

Description:

`Уведомления о релевантных премьерах, событиях и сезонных контекстах для отдельных кампаний.`

Price:

`600 BYN / квартал`

### Contacts

- `support@go2.by`
- `go2.by`

## Visual direction

Follow the reference images closely.

The intended feel:

- premium commercial media kit
- clean advertising proposal
- confident but not overloaded
- modern digital product
- dark blue / white / accent color visual system
- structured cards
- clear commercial hierarchy
- compact but readable information
- strong first screen
- clear price/package comparison
- visual mockups of advertising placements

Avoid:

- generic SaaS landing look
- random gradients not present in the reference
- stock-style visual language
- excessive decorative effects
- oversized empty spaces
- unreadably small text
- weak contrast
- crude placeholder mockups

## Section-specific requirements

### `#hero`

Must communicate:

- Go2.by as an advertising platform
- audience value
- traffic / reach
- desktop + mobile contact points
- brand categories

Expected structure:

- top brand/logo area
- strong headline
- subtitle
- KPI cards
- benefits block
- category chips
- visual mockup/device/placement area if present in the reference

Use the original Go2.by logo as an asset.

Do not use a text-only fake logo.

### `#formats`

Must communicate:

- all five ad formats
- where each format is placed
- devices
- monthly impressions
- price

Preferred structure:

- section heading
- visual preview/mockup area
- compact table or structured cards
- clear price hierarchy

The table/cards must be live HTML, not an image.

Complex placement preview graphics may be assets.

### `#packages`

Must communicate:

- Basic / Standard / Premium
- included formats
- estimated advertising contacts
- monthly prices
- analytics and reporting
- additional option
- contacts

Preferred structure:

- three package cards
- Premium visually strongest
- analytics block
- additional option block
- clean final contact block

Prices must be highly visible.

## Responsive behavior

The landing must work on desktop and mobile.

Desktop priority:

- 1440px visual capture
- section layout should match references as closely as possible

Mobile priority:

- no horizontal scroll
- readable typography
- cards stack cleanly
- tables transform into readable cards if needed
- assets scale without breaking layout

## Automated visual QA requirements

The existing pipeline captures and compares:

- `#hero`
- `#formats`
- `#packages`

The landing must allow Playwright to capture these sections cleanly.

Do not hide or dynamically delay these sections.

Do not require external APIs or user interaction to render them.

After implementation, visual diff should produce:

- `artifacts/current/hero.png`
- `artifacts/current/formats.png`
- `artifacts/current/packages.png`
- `artifacts/diff/*`
- `artifacts/visual-report.json`

Target:

- pass threshold: `<= 8%`
- desired quality: `<= 5%`

If exact pixel match is impossible because HTML rendering differs from the design image, still optimize visual similarity and preserve measurable diff.

## Iteration rule

If visual diff fails:

1. Read `artifacts/visual-report.json`
2. Read `artifacts/current/visual-fix-prompt.md` if available
3. Read `visual-review.md` if generated
4. Fix only the failed sections
5. Do not redesign the whole page
6. Do not change unrelated files
7. Do not replace HTML/CSS sections with full reference images

The next iteration must be based on measured report/review, not on a new interpretation.

## Allowed files during landing generation

Allowed:

- `index.html`
- `styles.css`
- `assets/*`

Allowed only if the workflow explicitly prepares references:

- `visual-reference/reference-1.webp`
- `visual-reference/reference-2.webp`
- `visual-reference/reference-3.webp`

Forbidden:

- `AGENTS.md`
- `SKILLS.md`
- `.github/workflows/*`
- `scripts/*`
- `package.json`
- `package-lock.json`
- unrelated files

## Acceptance criteria

The result is acceptable only if:

- `index.html` exists
- `styles.css` exists
- required sections exist:
  - `#hero`
  - `#formats`
  - `#packages`
- visual-reference files are not used as visible live content
- official logo is not faked with plain text
- complex mockups are either accurately recreated or extracted into `assets/*`
- all required content, prices, and figures are preserved
- layout is a continuous landing, not stacked reference images
- GitHub Actions produces visual artifacts
- visual report is available
- final PR contains a summary of iterations and remaining issues

## Final PR summary requirements

The final PR should explain:

1. What was generated
2. Which files changed
3. Which assets were extracted
4. Which sections passed or failed visual diff
5. Final difference percent by section
6. Number of iterations performed
7. What remains visually weak, if anything
8. Whether the result is ready for manual review