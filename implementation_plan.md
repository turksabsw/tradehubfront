# Implementation Plan: Homepage Sections (Top Deals, Top Ranking, Tailored Selections)

**Date:** 2026-02-17
**Status:** Active
**Prepared by:** TPM Agent
**Revision:** 2 (updated per PO screenshot specs)

---

## 1. Overview

Add three new homepage sections below the existing hero area. These sections replicate the Alibaba.com homepage layout and will be placed inside `<main>` in `src/main.ts`, between the hero section and the footer. Each section follows the established component pattern: a TypeScript component file exporting a render function + init function, CSS variables in `src/style.css`, token definitions in `src/utils/themeTokens.ts`, and barrel exports from the component index.

### Section Placement (top to bottom in `<main>`)
1. Hero (existing)
2. **Top Deals** (new) -- horizontal scrollable product deal cards
3. **Top Ranking** (new) -- horizontal scrollable category ranking cards
4. **Tailored Selections** (new) -- 3-column collection grid with paired product images
5. Footer (existing)

---

## 2. Architectural Decisions

### Component Pattern (follow existing conventions)
- Each section lives in `src/components/hero/` (homepage content sections, co-located with other hero-area components)
- Each file exports: `SectionName(): string` (HTML renderer) and `initSectionName(): void` (DOM event binding)
- All are re-exported from `src/components/hero/index.ts`
- Imported and wired in `src/main.ts`
- All colors/styling use CSS variables with `var(--token-name)` inline styles, matching the pattern in `RecommendationSlider.ts` and `CategoryBrowse.ts`
- Static mock data arrays defined at the top of each component file (same pattern as `recommendationCards` in RecommendationSlider.ts)
- SVG placeholder visuals for product images (same approach as RecommendationSlider visual system)

### CSS Variable Naming Convention
Follow the existing `--section-property` pattern (e.g., `--hero-bg`, `--mega-bg`, `--footer-bg`):
- Top Deals: `--deals-*`
- Top Ranking: `--ranking-*`
- Tailored Selections: `--tailored-*`

### Responsive Behavior
- Mobile-first, with breakpoints at `960px` (md) and `1280px` (lg) per the project's custom breakpoint system
- All sections use `container-wide` for max-width consistency
- Top Deals & Top Ranking: horizontal Swiper carousel, responsive `slidesPerView`
- Tailored Selections: 1 col mobile, 2 cols tablet, 3 cols desktop grid

---

## 3. Section Specifications

### 3.1 Top Deals

**Purpose:** Showcase lowest-price product deals in a horizontal scrollable row.

**Component file:** `src/components/hero/TopDeals.ts`

**Visual Reference (from Alibaba screenshot):**
- Section header row: **"Top Deals"** (bold heading) + **"Score the lowest prices on Alibaba.com"** (subtitle) + **"View more >"** link aligned right
- Horizontal scrollable card row (Swiper carousel), 6+ cards visible on desktop
- **Each card contains:**
  - Product image area (top ~60% of card) -- use SVG placeholder visuals
  - Deal price with small yellow price-tag icon (e.g., "$2.19")
  - Original price crossed out in gray (e.g., "~~$8.37~~")
  - "MOQ: 2 pieces" label at bottom in muted text
- **First card only** has a red **"Top picks"** badge overlay at top-left corner
- Cards have rounded corners, subtle border, white background
- Navigation arrows on hover (left/right), same pattern as RecommendationSlider

**Mock Data:** 8-10 deal items with varied product types, prices, and MOQs.

**CSS Variables (13 tokens):**
```
--deals-bg: #ffffff                    Section background
--deals-heading-color: #111827         Title text color
--deals-subtitle-color: #6b7280       Subtitle text color
--deals-link-color: #cc9900           "View more" link color
--deals-link-hover-color: #b38600     "View more" link hover
--deals-card-bg: #ffffff              Card background
--deals-card-border: #e5e5e5          Card border color
--deals-card-hover-border: #fcd34d    Card border on hover
--deals-price-color: #111827          Deal price text
--deals-price-icon-color: #f59e0b     Yellow price-tag icon
--deals-original-price-color: #9ca3af Crossed-out price text
--deals-badge-bg: #ef4444             "Top picks" badge background
--deals-badge-text: #ffffff           "Top picks" badge text
```

**Init function (`initTopDeals`):**
- Initialize Swiper carousel:
  - `autoplay: false` (user-driven scrolling)
  - Navigation arrows (prev/next buttons)
  - Responsive breakpoints: 2 slides mobile, 3 tablet, 5-6 desktop
  - `spaceBetween: 12-16px`
  - `loop: false`

**Accessibility:**
- `aria-label="Top deals product carousel"` on section
- Navigation buttons with descriptive `aria-label`
- Cards are `<a>` links with `aria-label` combining product name + price

---

### 3.2 Top Ranking

**Purpose:** Showcase trending product categories with data-driven ranking badges.

**Component file:** `src/components/hero/TopRanking.ts`

**Visual Reference (from Alibaba screenshot):**
- Section header row: **"Top Ranking"** (bold heading) + **"Navigate trends with data-driven rankings"** (subtitle) + **"View more >"** link aligned right
- Horizontal scrollable card row (Swiper carousel), 6 cards visible on desktop
- **Each card contains:**
  - Square image area (top ~70% of card) -- use SVG placeholder visuals with category-themed icons
  - **"TOP" badge** overlay at bottom of the image area (small rounded label with gradient/colored bg)
  - Category name below image (e.g., "Electric Motorcycles", "Party Decorations")
  - **"Hot selling"** label in muted/accent text below category name
- Cards have rounded corners, subtle border, white background
- Navigation arrows on hover

**Mock Data:** 8-10 category items spanning different product verticals (electronics, home, fashion, machinery, etc.)

**CSS Variables (14 tokens):**
```
--ranking-bg: #ffffff                  Section background
--ranking-heading-color: #111827       Title text color
--ranking-subtitle-color: #6b7280     Subtitle text color
--ranking-link-color: #cc9900         "View more" link color
--ranking-link-hover-color: #b38600   "View more" link hover
--ranking-card-bg: #ffffff            Card background
--ranking-card-border: #e5e5e5        Card border color
--ranking-card-hover-border: #fcd34d  Card border on hover
--ranking-category-color: #111827     Category name text
--ranking-label-color: #6b7280        "Hot selling" label text
--ranking-badge-bg: #ef4444           "TOP" badge background
--ranking-badge-text: #ffffff         "TOP" badge text
--ranking-badge-gradient-start: #f97316  "TOP" badge gradient start (optional)
--ranking-badge-gradient-end: #ef4444    "TOP" badge gradient end (optional)
```

**Init function (`initTopRanking`):**
- Initialize Swiper carousel:
  - `autoplay: false`
  - Navigation arrows
  - Responsive breakpoints: 2 slides mobile, 3-4 tablet, 6 desktop
  - `spaceBetween: 12-16px`
  - `loop: false`

**Accessibility:**
- `aria-label="Top ranking category carousel"` on section
- Cards are `<a>` links with category name as accessible label

---

### 3.3 Tailored Selections

**Purpose:** Curated product collections displayed as a grid of collection cards, each showing a pair of products.

**Component file:** `src/components/hero/TailoredSelections.ts`

**Visual Reference (from Alibaba screenshot):**
- Section header row: **"Tailored Selections"** (bold heading) + **"View more >"** link aligned right
- **3-column grid** of collection cards (1 col mobile, 2 cols tablet, 3 cols desktop)
- **Each collection card contains:**
  - Collection title (e.g., "Top selling children bikini", "Trending cosmetics brushes")
  - View count label (e.g., "28K+ views") in muted text
  - **2 product images side by side** (left and right) -- use SVG placeholder visuals
  - Price below each image (e.g., "$3.66", "$1.53")
- Cards have rounded corners, subtle border, white background
- No carousel -- static grid layout
- 6 collection cards total (2 rows x 3 cols on desktop)

**Mock Data:** 6 collections, each with a title, view count string, and 2 products (name, price, image kind).

**CSS Variables (13 tokens):**
```
--tailored-bg: #f9fafb                 Section background (slightly off-white)
--tailored-heading-color: #111827      Title text color
--tailored-link-color: #cc9900         "View more" link color
--tailored-link-hover-color: #b38600   "View more" link hover
--tailored-card-bg: #ffffff            Card background
--tailored-card-border: #e5e5e5        Card border color
--tailored-card-hover-border: #fcd34d  Card border on hover
--tailored-collection-title-color: #111827  Collection title text
--tailored-views-color: #6b7280        View count text color
--tailored-price-color: #111827        Product price text
--tailored-image-bg: #f3f4f6           Product image placeholder background
--tailored-divider-color: #e5e5e5      Divider between products (if any)
--tailored-views-icon-color: #9ca3af   Eye icon color for view count
```

**Init function (`initTailoredSelections`):**
- Minimal JS needed -- mainly for optional "View more" link behavior
- Optional: hover effects on cards via JS if CSS alone is insufficient
- No Swiper, no carousel -- pure CSS grid

**Accessibility:**
- `aria-label="Tailored product selections"` on section
- Collection cards use semantic `<article>` elements
- Images have descriptive `alt` text
- View counts use `aria-label` for screen readers (e.g., "28 thousand plus views")

---

## 4. Shared Design Patterns

### Section Header Pattern (reuse across all 3 sections)
All three sections share an identical header layout:
```html
<div class="flex items-center justify-between mb-4">
  <div>
    <h2 class="text-xl font-bold" style="color:var(--{section}-heading-color)">Title</h2>
    <p class="text-sm mt-0.5" style="color:var(--{section}-subtitle-color)">Subtitle text</p>
  </div>
  <a href="/..." class="text-sm font-medium" style="color:var(--{section}-link-color)">
    View more
    <svg ...chevron-right... />
  </a>
</div>
```

### Product Image Placeholder Pattern
Follow the `RecommendationSlider` visual system: each product type gets a unique SVG icon + gradient background + accent blob. Define a shared `renderPlaceholderImage()` utility or duplicate inline per component (prefer inline to avoid coupling).

### Card Hover Pattern
All product/collection cards follow: `transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md` + border color change via CSS variable on hover.

---

## 5. Integration Points

### 5.1 `src/main.ts` Changes
Add the three new sections inside `<main>`, after the hero `</section>`:

```typescript
// New imports added to the existing hero import block
import {
  TopDeals, initTopDeals,
  TopRanking, initTopRanking,
  TailoredSelections, initTailoredSelections,
} from './components/hero'

// In appEl.innerHTML template, after hero closing </section>:
//
//   <!-- Top Deals Section -->
//   <section class="py-6 lg:py-8" aria-label="Top deals">
//     <div class="container-wide">
//       ${TopDeals()}
//     </div>
//   </section>
//
//   <!-- Top Ranking Section -->
//   <section class="py-6 lg:py-8" aria-label="Top ranking">
//     <div class="container-wide">
//       ${TopRanking()}
//     </div>
//   </section>
//
//   <!-- Tailored Selections Section -->
//   <section class="py-6 lg:py-8" aria-label="Tailored selections">
//     <div class="container-wide">
//       ${TailoredSelections()}
//     </div>
//   </section>

// In init sequence (after existing inits):
//   initTopDeals();
//   initTopRanking();
//   initTailoredSelections();
```

### 5.2 `src/components/hero/index.ts` Changes
Add barrel exports:
```typescript
export { TopDeals, initTopDeals } from './TopDeals';
export { TopRanking, initTopRanking } from './TopRanking';
export { TailoredSelections, initTailoredSelections } from './TailoredSelections';
```

### 5.3 `src/style.css` Changes

**Inside `@theme { }` block**, add new comment section after existing `/* --- Hero --- */`:

```css
/* --- Top Deals --- */
--deals-bg: #ffffff;
--deals-heading-color: #111827;
--deals-subtitle-color: #6b7280;
--deals-link-color: #cc9900;
--deals-link-hover-color: #b38600;
--deals-card-bg: #ffffff;
--deals-card-border: #e5e5e5;
--deals-card-hover-border: #fcd34d;
--deals-price-color: #111827;
--deals-price-icon-color: #f59e0b;
--deals-original-price-color: #9ca3af;
--deals-badge-bg: #ef4444;
--deals-badge-text: #ffffff;

/* --- Top Ranking --- */
--ranking-bg: #ffffff;
--ranking-heading-color: #111827;
--ranking-subtitle-color: #6b7280;
--ranking-link-color: #cc9900;
--ranking-link-hover-color: #b38600;
--ranking-card-bg: #ffffff;
--ranking-card-border: #e5e5e5;
--ranking-card-hover-border: #fcd34d;
--ranking-category-color: #111827;
--ranking-label-color: #6b7280;
--ranking-badge-bg: #ef4444;
--ranking-badge-text: #ffffff;
--ranking-badge-gradient-start: #f97316;
--ranking-badge-gradient-end: #ef4444;

/* --- Tailored Selections --- */
--tailored-bg: #f9fafb;
--tailored-heading-color: #111827;
--tailored-link-color: #cc9900;
--tailored-link-hover-color: #b38600;
--tailored-card-bg: #ffffff;
--tailored-card-border: #e5e5e5;
--tailored-card-hover-border: #fcd34d;
--tailored-collection-title-color: #111827;
--tailored-views-color: #6b7280;
--tailored-price-color: #111827;
--tailored-image-bg: #f3f4f6;
--tailored-divider-color: #e5e5e5;
--tailored-views-icon-color: #9ca3af;
```

**Inside `@layer components { }` block**, add:

```css
/* --- Top Deals link --- */
.th-deals-link {
    color: var(--deals-link-color);
    transition: color 0.15s ease;
}
.th-deals-link:hover {
    color: var(--deals-link-hover-color);
}

/* --- Top Ranking link --- */
.th-ranking-link {
    color: var(--ranking-link-color);
    transition: color 0.15s ease;
}
.th-ranking-link:hover {
    color: var(--ranking-link-hover-color);
}

/* --- Tailored Selections link --- */
.th-tailored-link {
    color: var(--tailored-link-color);
    transition: color 0.15s ease;
}
.th-tailored-link:hover {
    color: var(--tailored-link-hover-color);
}
```

### 5.4 `src/utils/themeTokens.ts` Changes
Add three new entries to the `sectionEditors` array (before the Footer entry):

```typescript
{
  id: 'section-deals',
  name: 'Top Deals',
  icon: '%%',   // use a simple text icon, not emoji (per project convention)
  tokens: [
    { var: '--deals-bg', type: 'color', default: '#ffffff', label: 'Background' },
    { var: '--deals-heading-color', type: 'color', default: '#111827', label: 'Heading Color' },
    { var: '--deals-subtitle-color', type: 'color', default: '#6b7280', label: 'Subtitle Color' },
    { var: '--deals-link-color', type: 'color', default: '#cc9900', label: 'Link Color' },
    { var: '--deals-link-hover-color', type: 'color', default: '#b38600', label: 'Link Hover' },
    { var: '--deals-card-bg', type: 'color', default: '#ffffff', label: 'Card Background' },
    { var: '--deals-card-border', type: 'color', default: '#e5e5e5', label: 'Card Border' },
    { var: '--deals-card-hover-border', type: 'color', default: '#fcd34d', label: 'Card Hover Border' },
    { var: '--deals-price-color', type: 'color', default: '#111827', label: 'Price Color' },
    { var: '--deals-price-icon-color', type: 'color', default: '#f59e0b', label: 'Price Icon' },
    { var: '--deals-original-price-color', type: 'color', default: '#9ca3af', label: 'Original Price' },
    { var: '--deals-badge-bg', type: 'color', default: '#ef4444', label: 'Badge Background' },
    { var: '--deals-badge-text', type: 'color', default: '#ffffff', label: 'Badge Text' },
  ],
},
{
  id: 'section-ranking',
  name: 'Top Ranking',
  icon: '##',
  tokens: [
    { var: '--ranking-bg', type: 'color', default: '#ffffff', label: 'Background' },
    { var: '--ranking-heading-color', type: 'color', default: '#111827', label: 'Heading Color' },
    { var: '--ranking-subtitle-color', type: 'color', default: '#6b7280', label: 'Subtitle Color' },
    { var: '--ranking-link-color', type: 'color', default: '#cc9900', label: 'Link Color' },
    { var: '--ranking-link-hover-color', type: 'color', default: '#b38600', label: 'Link Hover' },
    { var: '--ranking-card-bg', type: 'color', default: '#ffffff', label: 'Card Background' },
    { var: '--ranking-card-border', type: 'color', default: '#e5e5e5', label: 'Card Border' },
    { var: '--ranking-card-hover-border', type: 'color', default: '#fcd34d', label: 'Card Hover Border' },
    { var: '--ranking-category-color', type: 'color', default: '#111827', label: 'Category Text' },
    { var: '--ranking-label-color', type: 'color', default: '#6b7280', label: 'Label Color' },
    { var: '--ranking-badge-bg', type: 'color', default: '#ef4444', label: 'Badge Background' },
    { var: '--ranking-badge-text', type: 'color', default: '#ffffff', label: 'Badge Text' },
    { var: '--ranking-badge-gradient-start', type: 'color', default: '#f97316', label: 'Badge Gradient Start' },
    { var: '--ranking-badge-gradient-end', type: 'color', default: '#ef4444', label: 'Badge Gradient End' },
  ],
},
{
  id: 'section-tailored',
  name: 'Tailored Selections',
  icon: '**',
  tokens: [
    { var: '--tailored-bg', type: 'color', default: '#f9fafb', label: 'Background' },
    { var: '--tailored-heading-color', type: 'color', default: '#111827', label: 'Heading Color' },
    { var: '--tailored-link-color', type: 'color', default: '#cc9900', label: 'Link Color' },
    { var: '--tailored-link-hover-color', type: 'color', default: '#b38600', label: 'Link Hover' },
    { var: '--tailored-card-bg', type: 'color', default: '#ffffff', label: 'Card Background' },
    { var: '--tailored-card-border', type: 'color', default: '#e5e5e5', label: 'Card Border' },
    { var: '--tailored-card-hover-border', type: 'color', default: '#fcd34d', label: 'Card Hover Border' },
    { var: '--tailored-collection-title-color', type: 'color', default: '#111827', label: 'Collection Title' },
    { var: '--tailored-views-color', type: 'color', default: '#6b7280', label: 'Views Text' },
    { var: '--tailored-price-color', type: 'color', default: '#111827', label: 'Price Color' },
    { var: '--tailored-image-bg', type: 'color', default: '#f3f4f6', label: 'Image Placeholder BG' },
    { var: '--tailored-divider-color', type: 'color', default: '#e5e5e5', label: 'Divider Color' },
    { var: '--tailored-views-icon-color', type: 'color', default: '#9ca3af', label: 'Views Icon Color' },
  ],
},
```

### 5.5 Theme Editor Panel Highlight Map
In `ThemeEditorPanel.ts`, add entries to the `sectionSelectors` map in `highlightPageSection()`:
```typescript
'section-deals': '.top-deals-section',
'section-ranking': '.top-ranking-section',
'section-tailored': '.tailored-selections-section',
```

---

## 6. Task Breakdown

### Phase 1: CSS Variables & Theme Tokens [LOGIC]

**Task L1: Add CSS variables for all 3 sections to `src/style.css`** [LOGIC]
- Add `--deals-*` (13 variables) to `@theme {}` block after the Hero section
- Add `--ranking-*` (14 variables) to `@theme {}` block
- Add `--tailored-*` (13 variables) to `@theme {}` block
- Add `.th-deals-link`, `.th-ranking-link`, `.th-tailored-link` classes to `@layer components {}`
- **Acceptance criteria:** All 40 variables defined, no build errors, `npx vite build` succeeds

**Task L2: Add section editors to `src/utils/themeTokens.ts`** [LOGIC]
- Add 3 new `SectionEditor` entries to the `sectionEditors` array (before Footer)
- Each entry has correct `id`, `name`, `icon`, and `tokens` array with labels
- Token `var` names must match CSS variable names in style.css exactly
- Token `default` values must match the defaults in style.css exactly
- **Acceptance criteria:** TypeScript compiles, token definitions match CSS variable names and defaults 1:1

**Task L3: Update theme panel highlight map in `ThemeEditorPanel.ts`** [LOGIC]
- Add 3 new entries to `sectionSelectors` in `highlightPageSection()`
- CSS class selectors: `.top-deals-section`, `.top-ranking-section`, `.tailored-selections-section`
- **Acceptance criteria:** Hovering section names in theme panel highlights the correct page section

### Phase 2: Component Implementation [FRONTEND]

**Task F1: Create `src/components/hero/TopDeals.ts`** [FRONTEND]
- Export `TopDeals(): string` -- renders section with:
  - Header row: "Top Deals" title + "Score the lowest prices on Alibaba.com" subtitle + "View more >" link
  - Swiper carousel of 8-10 deal cards
  - Each card: SVG product image placeholder, deal price with yellow tag icon, crossed-out original price, "MOQ: X pieces" label
  - First card has red "Top picks" badge at top-left
- Export `initTopDeals(): void` -- Swiper init with navigation, responsive breakpoints
- All styling via CSS variables (inline `style` attributes)
- Add `.top-deals-section` class to outermost element (for theme panel highlight)
- **Acceptance criteria:** Section renders with all cards, Swiper scrolls, prices display correctly, badge visible on first card

**Task F2: Create `src/components/hero/TopRanking.ts`** [FRONTEND]
- Export `TopRanking(): string` -- renders section with:
  - Header row: "Top Ranking" title + "Navigate trends with data-driven rankings" subtitle + "View more >" link
  - Swiper carousel of 8-10 category cards
  - Each card: square SVG image placeholder, "TOP" badge at bottom of image, category name, "Hot selling" label
- Export `initTopRanking(): void` -- Swiper init with navigation, responsive breakpoints
- All styling via CSS variables
- Add `.top-ranking-section` class to outermost element
- **Acceptance criteria:** Section renders with category cards, Swiper scrolls, TOP badges visible, category names display

**Task F3: Create `src/components/hero/TailoredSelections.ts`** [FRONTEND]
- Export `TailoredSelections(): string` -- renders section with:
  - Header row: "Tailored Selections" title + "View more >" link
  - CSS grid (1 col mobile / 2 cols tablet / 3 cols desktop)
  - 6 collection cards, each with: collection title, "28K+ views" label, 2 product images side by side with prices
- Export `initTailoredSelections(): void` -- minimal JS (hover effects if needed)
- All styling via CSS variables
- Add `.tailored-selections-section` class to outermost element
- **Acceptance criteria:** Section renders, grid reflows at breakpoints, all 6 collections display with paired products

**Task F4: Wire up components in `src/components/hero/index.ts` and `src/main.ts`** [FRONTEND]
- Add barrel exports to `hero/index.ts` for all 3 new components
- In `main.ts`:
  - Add imports for `TopDeals`, `initTopDeals`, `TopRanking`, `initTopRanking`, `TailoredSelections`, `initTailoredSelections`
  - Add 3 new `<section>` blocks in the HTML template after the hero section, each wrapped in `container-wide`
  - Call `initTopDeals()`, `initTopRanking()`, `initTailoredSelections()` in the init sequence
- **Acceptance criteria:** All 3 sections visible on homepage in correct order, no console errors, no TypeScript errors

### Phase 3: Quality Assurance [QA]

**Task Q1: Build verification** [QA]
- Run `npx vite build` -- must complete with zero errors
- Check for TypeScript compilation errors
- Verify no unused imports or variables
- **Acceptance criteria:** Clean build, zero errors, zero warnings

**Task Q2: Responsive testing** [QA]
- Verify all 3 sections at mobile (375px), tablet (768px), desktop (1440px) widths
- Top Deals: carousel shows 2 / 3-4 / 5-6 cards respectively
- Top Ranking: carousel shows 2 / 3-4 / 6 cards respectively
- Tailored Selections: grid shows 1 / 2 / 3 columns respectively
- No horizontal overflow at any width
- **Acceptance criteria:** Proper responsive layouts at all breakpoints

**Task Q3: Theme editor integration** [QA]
- Open theme editor panel, navigate to "Page Sections" tab
- Verify all 3 new sections appear: "Top Deals", "Top Ranking", "Tailored Selections"
- For each section: change a color token and verify live preview updates on the page
- Click "Reset" on a section and verify defaults restore
- Hover each section name and verify page highlight appears on correct section
- **Acceptance criteria:** All tokens editable, live preview works, reset works, highlights work

**Task Q4: Accessibility audit** [QA]
- Verify `aria-label` on all 3 section elements
- Verify Swiper carousel navigation buttons have `aria-label`
- Verify product/collection card links have meaningful `aria-label` text
- Check keyboard navigation: can tab through all interactive elements in each section
- **Acceptance criteria:** No critical a11y violations, all interactive elements keyboard-accessible

---

## 7. Dependency Graph

```
L1 (CSS vars in style.css) ──┐
                              ├──> F1, F2, F3 (components, can run in parallel)
L2 (theme token defs)     ───┤
                              └──> F4 (wiring in index.ts + main.ts)
                                     │
L3 (highlight map)  ─────────────────┼──> Q1, Q2, Q3, Q4 (all QA)
                                     │
                              F1+F2+F3 must complete before F4
                              F4 must complete before all QA tasks
```

**Parallel execution opportunities:**
- L1 and L2 can run in parallel (different files)
- F1, F2, F3 can run in parallel after L1+L2 complete (different files)
- L3 can run any time (independent file edit)
- Q1-Q4 all depend on F4 completion

---

## 8. Files Modified / Created

| File | Action | Owner | Description |
|------|--------|-------|-------------|
| `src/style.css` | Modified | LOGIC | Add ~40 CSS variables + 3 link component classes |
| `src/utils/themeTokens.ts` | Modified | LOGIC | Add 3 SectionEditor entries (~80 lines) |
| `src/components/theme/ThemeEditorPanel.ts` | Modified | LOGIC | Add 3 highlight selector entries |
| `src/components/hero/TopDeals.ts` | **Created** | FRONTEND | Horizontal deal card carousel |
| `src/components/hero/TopRanking.ts` | **Created** | FRONTEND | Horizontal category ranking carousel |
| `src/components/hero/TailoredSelections.ts` | **Created** | FRONTEND | 3-column collection grid |
| `src/components/hero/index.ts` | Modified | FRONTEND | Add 3 barrel exports |
| `src/main.ts` | Modified | FRONTEND | Import, render, and init 3 new sections |

---

## 9. Top Deals Visual Redesign (PO Screenshot Specs)

**Date:** 2026-02-17
**Status:** Active
**Revision:** 1
**Scope:** Purely visual changes to `TopDeals.ts` and supporting CSS/theme tokens. No logic changes.

### 9.1 Context

The Product Owner provided exact design specs extracted from Alibaba.com screenshots. The current Top Deals component needs visual adjustments to match the reference design precisely.

### 9.2 Delta Analysis (Current vs. Required)

| Property | Current Value | Required Value | File(s) Affected |
|----------|--------------|----------------|------------------|
| Section background | `--topdeals-bg: #ffffff` | `#F8F8F8` | `style.css`, `themeTokens.ts` |
| Container padding | `px-4 lg:px-0` | `padding: 16px 8px 16px 16px` | `TopDeals.ts` |
| Badge (`Top picks`) bg | `--topdeals-badge-bg: #dc2626` | `#DE0505` | `style.css`, `themeTokens.ts` |
| Badge padding | `px-2 py-0.5` | `2px 4px` (same as `px-1 py-0.5`) | `TopDeals.ts` |
| Product image size | `aspect-square` (fluid) | Fixed `188x188px` | `TopDeals.ts` |
| Price background | None | `#FFEDED` with `padding: 2px 12px 2px 4px` | `TopDeals.ts`, `style.css`, `themeTokens.ts` |
| Price icon | Price-tag SVG | Lightning bolt SVG with linear gradient (#FF988C to #FFECEB) | `TopDeals.ts` |
| MOQ/subtitle color | `--topdeals-moq-color: #6b7280` | `#222222` | `style.css`, `themeTokens.ts` |
| MOQ font size | `text-[10px]` | `14px` (`text-[14px]`) | `TopDeals.ts` |
| Section subtitle | "Score the lowest prices" | "Score the lowest prices on Alibaba.com" | `TopDeals.ts` |

### 9.3 New CSS Variable

One new CSS variable is needed:

```
--topdeals-price-bg: #FFEDED    /* Light pink background behind price + lightning icon */
```

This must be added to:
- `src/style.css` inside `@theme {}` under `/* --- Top Deals Section --- */`
- `src/utils/themeTokens.ts` in the `section-topdeals` editor entry

### 9.4 Lightning Bolt SVG

Replace the `priceTagIcon()` function in `TopDeals.ts` with a `lightningBoltIcon()` function that renders the PO-provided SVG from `task/TXT 2.txt`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="30" viewBox="0 0 24 30" fill="none">
  <path d="M10.5948 30.1888L0.735054 19.2232C0.221831 18.5826 0.604285 17.5239 1.34894 17.5239L6.20746 17.5239C6.77424 10.7461 10.1716 2.20349 20.7371 0.585977C21.9772 0.396125 23.4376 0.585405 24.5 0.585787C16.6194 3.93595 16.33 12.2572 16.2123 17.5239L21.5078 17.5239C22.2623 17.5239 22.6405 18.6069 22.1072 19.2408L11.8082 30.2064C11.4715 30.6066 10.9232 30.5987 10.5948 30.1888Z" fill="url(#paint0_linear_1_17173)"/>
  <defs>
    <linearGradient id="paint0_linear_1_17173" x1="11.4284" y1="30.5016" x2="11.2898" y2="-0.282995" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FF988C"/>
      <stop offset="1" stop-color="#FFECEB"/>
    </linearGradient>
  </defs>
</svg>
```

**Important:** Scale the SVG to fit inline with price text (approximately `w-4 h-5` / 16x20px). The viewBox is `0 0 24 30`, keep as-is and adjust the wrapper `width`/`height` classes.

### 9.5 Task Breakdown

#### Task F5: Update section background and container styling [FRONTEND]

**File:** `src/components/hero/TopDeals.ts`

**Changes:**
1. Change the outer `<section>` inline style fallback from `#ffffff` to `#F8F8F8` (note: actual value comes from CSS variable)
2. Change the container `<div>` class from `px-4 lg:px-0` to use explicit padding: `padding: 16px 8px 16px 16px` via inline style or Tailwind utilities `pl-4 pr-2 py-4`

**Acceptance criteria:**
- Section background renders as `#F8F8F8`
- Container has asymmetric padding matching spec: 16px top, 8px right, 16px bottom, 16px left

---

#### Task F6: Update product image to fixed 188x188px [FRONTEND]

**File:** `src/components/hero/TopDeals.ts`

**Changes:**
1. In `renderDealPlaceholder()`, change the outer `<div>` from `w-full aspect-square` to `w-[188px] h-[188px]` (fixed size)
2. Ensure the image container does not stretch/shrink -- it should remain exactly 188x188 at all breakpoints
3. On mobile (where cards are narrower), the image may need `mx-auto` to center within the card column

**Acceptance criteria:**
- Product placeholder images render at exactly 188x188px
- Images do not distort at any viewport width

---

#### Task F7: Replace price tag icon with lightning bolt SVG [FRONTEND]

**File:** `src/components/hero/TopDeals.ts`

**Changes:**
1. Replace the `priceTagIcon()` function body with the lightning bolt SVG from `task/TXT 2.txt`
2. Rename function to `lightningBoltIcon()` (update all call sites)
3. Size the SVG wrapper to approximately `w-4 h-5` (16x20px) to fit inline with price text
4. The SVG uses a `<linearGradient>` with `id="paint0_linear_1_17173"` -- ensure the gradient `id` is unique to avoid conflicts if multiple instances exist (prefix with `topdeals-` if needed)

**Acceptance criteria:**
- Lightning bolt icon appears next to each deal price
- Gradient renders correctly (pink #FF988C at bottom to light pink #FFECEB at top)
- Icon is visually aligned with price text

---

#### Task F8: Add price background styling [FRONTEND]

**File:** `src/components/hero/TopDeals.ts`

**Changes:**
1. Wrap the price row (lightning icon + price text) in a `<span>` with:
   - `background-color: var(--topdeals-price-bg, #FFEDED)`
   - `padding: 2px 12px 2px 4px`
   - `border-radius: 2px` (subtle rounding)
   - `display: inline-flex; align-items: center; gap: 4px`
2. Remove the existing `flex items-center gap-1` wrapper if it conflicts

**Acceptance criteria:**
- Price row has a light pink (#FFEDED) background
- Padding matches spec: 2px top, 12px right, 2px bottom, 4px left
- Lightning icon and price text are vertically centered within the background

---

#### Task F9: Update badge, MOQ, and subtitle text [FRONTEND]

**File:** `src/components/hero/TopDeals.ts`

**Changes:**
1. **Badge padding**: Change "Top picks" badge from `px-2 py-0.5` to `px-1 py-0.5` (matching `2px 4px`)
2. **MOQ font size**: Change `text-[10px]` to `text-[14px]`
3. **Subtitle text**: Change "Score the lowest prices" to "Score the lowest prices on Alibaba.com"

**Acceptance criteria:**
- Badge padding is 2px horizontal, 4px vertical (visually tighter)
- MOQ text renders at 14px
- Full subtitle text displays correctly

---

#### Task L4: Update CSS variables and theme tokens for Top Deals redesign [LOGIC]

**Files:** `src/style.css`, `src/utils/themeTokens.ts`

**Changes in `src/style.css`:**
1. Change `--topdeals-bg` default from `#ffffff` to `#F8F8F8`
2. Change `--topdeals-badge-bg` default from `#dc2626` to `#DE0505`
3. Change `--topdeals-moq-color` default from `#6b7280` to `#222222`
4. Add new variable `--topdeals-price-bg: #FFEDED` under the Top Deals section

**Changes in `src/utils/themeTokens.ts`:**
1. Update `section-topdeals` entry: change `--topdeals-bg` default to `#F8F8F8`
2. Update `section-topdeals` entry: change `--topdeals-badge-bg` default to `#DE0505`
3. Update `section-topdeals` entry: change `--topdeals-moq-color` default to `#222222`
4. Add new token: `{ var: '--topdeals-price-bg', type: 'color', default: '#FFEDED', label: 'Price Background' }`

**Acceptance criteria:**
- All CSS variable defaults match the PO spec exactly
- Theme token defaults match CSS variable defaults 1:1
- New `--topdeals-price-bg` variable available in both style.css and theme editor
- `npx vite build` succeeds with no errors

---

#### Task Q5: Visual QA for Top Deals redesign [QA]

**Verification checklist:**
- [ ] Section background is `#F8F8F8` (not white)
- [ ] Container padding is `16px 8px 16px 16px`
- [ ] Product images are exactly 188x188px (use DevTools to measure)
- [ ] "Top picks" badge background is `#DE0505` (bright red, not `#dc2626`)
- [ ] Badge padding is `2px 4px`
- [ ] Lightning bolt SVG displays with pink gradient (not old price tag icon)
- [ ] Price row has `#FFEDED` background with correct padding
- [ ] MOQ text is `14px` size and `#222222` color
- [ ] Subtitle reads "Score the lowest prices on Alibaba.com"
- [ ] Theme editor: "Top Deals" section shows "Price Background" token, changes apply live
- [ ] No horizontal overflow at mobile, tablet, desktop widths
- [ ] No console errors, no TypeScript build errors

**Acceptance criteria:** All checklist items pass

---

### 9.6 Dependency Graph (Top Deals Redesign)

```
L4 (CSS vars + theme tokens) ──> F5, F6, F7, F8, F9 (all can run in parallel after L4)
                                       │
                                  all F tasks ──> Q5 (visual QA)
```

**Note:** F5-F9 all modify the same file (`TopDeals.ts`), so they must be executed sequentially by a single agent to avoid merge conflicts. L4 modifies different files and can run in parallel with F tasks, but F8 depends on the `--topdeals-price-bg` variable from L4.

### 9.7 Files Modified

| File | Action | Owner | Description |
|------|--------|-------|-------------|
| `src/style.css` | Modified | LOGIC | Update 3 defaults, add 1 new variable |
| `src/utils/themeTokens.ts` | Modified | LOGIC | Update 3 defaults, add 1 new token |
| `src/components/hero/TopDeals.ts` | Modified | FRONTEND | 5 visual changes (bg, images, icon, price, text) |

---

## 10. Product Info Card Layout Restructure

**Date:** 2026-02-18
**Status:** Active
**Revision:** 1
**Scope:** Restructure the product detail page HTML layout and CSS grid so the ProductInfo sticky sidebar starts at the same vertical level as the breadcrumb, spanning the full height of the left column content.

### 10.1 Context

The Product Owner requires the product detail page to match the Alibaba reference design, where the right-side product info card (price tiers, variants, shipping, CTAs) begins at the very top of the content area — aligned with the breadcrumb — and remains sticky while the user scrolls through the left column content (breadcrumb, title bar, image gallery, related products).

### 10.2 Current Structure (Problem)

```
<main>
  <nav> Breadcrumb() </nav>              <!-- OUTSIDE grid, has its own container-boxed wrapper -->
  <section>
    <div class="container-boxed">
      ProductTitleBar()                   <!-- OUTSIDE grid, above it -->
      <div id="pd-hero-grid">            <!-- Grid starts here -->
        <div id="pd-hero-left">
          ProductImageGallery()
          RelatedProducts()
        </div>
        <div id="pd-hero-info">
          ProductInfo()                   <!-- Card starts too low -->
        </div>
      </div>
    </div>
  </section>
</main>
```

**Problems:**
1. Breadcrumb renders above and outside the grid with its own `container-boxed` wrapper
2. ProductTitleBar renders above and outside the grid
3. ProductInfo card only starts after the title + supplier bar, missing ~120px of vertical alignment

### 10.3 Target Structure (Required)

```
<main>
  <section style="background: var(--pd-bg, #ffffff);">
    <div class="container-boxed">
      <div id="pd-hero-grid">              <!-- Grid starts BEFORE breadcrumb -->
        <div id="pd-hero-left">
          Breadcrumb()                      <!-- Moved INSIDE left column -->
          ProductTitleBar()                 <!-- Moved INSIDE left column -->
          <div id="pd-hero-gallery">
            ProductImageGallery()
          </div>
          RelatedProducts()
        </div>
        <div id="pd-hero-info">
          ProductInfo()                     <!-- Now vertically aligned with breadcrumb -->
        </div>
      </div>
    </div>
  </section>
  ProductTabs()
</main>
```

### 10.4 Key Design Decisions

1. **Breadcrumb wrapper removal:** The `Breadcrumb()` component currently renders its own `<nav>` with a nested `<div class="container-boxed">`. Since it will now live inside the grid's left column (which is already inside `container-boxed`), the Breadcrumb component must be refactored to remove its own `container-boxed` wrapper and background styling. It should return just the `<nav>` with the `<ol>` breadcrumb list directly.

2. **Section consolidation:** The current separate `<nav>` (breadcrumb) and `<section>` (hero) elements will be consolidated into a single `<section>` that wraps the entire grid. The background color `var(--pd-bg)` applies to this single section.

3. **Breadcrumb padding:** The breadcrumb currently has `py-3` on its `<nav>`. This vertical padding should be preserved (applied to the `<nav>` element inside the left column) so spacing remains visually identical to users.

4. **Sticky behavior unchanged:** The `#pd-hero-info` sticky positioning CSS (`position: sticky; top: 80px; max-height: calc(100vh - 100px)`) remains exactly as-is. The card will now simply start higher because the grid starts earlier.

5. **Mobile layout unchanged:** On mobile (below 1024px), the layout remains fully stacked (flex column). The breadcrumb and title bar simply appear above the gallery and info card in source order, same as before.

6. **No visual changes to components themselves:** ProductTitleBar and ProductInfo are not modified visually. Only the structural placement in the HTML template changes.

---

### 10.5 Task Breakdown

#### Task F10: Refactor Breadcrumb component to remove container wrapper [FRONTEND]

**File:** `src/components/product/Breadcrumb.ts`

**Current code returns:**
```html
<nav aria-label="Breadcrumb" class="py-3" style="background: var(--pd-bg, #ffffff);">
  <div class="container-boxed">
    <ol class="flex items-center gap-2 flex-wrap">...</ol>
  </div>
</nav>
```

**Required change — remove the `container-boxed` div and the background style:**
```html
<nav aria-label="Breadcrumb" class="py-3">
  <ol class="flex items-center gap-2 flex-wrap">...</ol>
</nav>
```

**Rationale:** The breadcrumb will now live inside `#pd-hero-left`, which is already inside `container-boxed`. The background comes from the parent `<section>`, so the inline background style on the `<nav>` is redundant and must be removed.

**Acceptance criteria:**
- Breadcrumb no longer renders its own `container-boxed` wrapper
- Breadcrumb no longer has an inline background style
- `py-3` padding is preserved on the `<nav>` element
- `aria-label="Breadcrumb"` is preserved
- No TypeScript compilation errors

---

#### Task F11: Restructure product-detail.ts HTML template [FRONTEND]

**File:** `src/product-detail.ts`

**Changes to the `<main>` section (lines 49-76):**

Replace the current structure:
```html
<main>
  <!-- Breadcrumb -->
  ${Breadcrumb()}

  <!-- Product Hero -->
  <section class="pb-6" style="background: var(--pd-bg, #ffffff);">
    <div class="container-boxed">
      <!-- Title + Rating + Supplier Bar (full-width, above grid) -->
      ${ProductTitleBar()}

      <!-- Desktop: 2-column layout (gallery + related | sticky info card) -->
      <div id="pd-hero-grid">
        <div id="pd-hero-left">
          <div id="pd-hero-gallery">
            ${ProductImageGallery()}
          </div>
          ${RelatedProducts()}
        </div>
        <div id="pd-hero-info">
          ${ProductInfo()}
        </div>
      </div>
    </div>
  </section>

  <!-- Tabbed Content -->
  ${ProductTabs()}
</main>
```

With the new structure:
```html
<main>
  <!-- Product Hero (grid starts at breadcrumb level) -->
  <section class="pb-6" style="background: var(--pd-bg, #ffffff);">
    <div class="container-boxed">
      <div id="pd-hero-grid">
        <div id="pd-hero-left">
          ${Breadcrumb()}
          ${ProductTitleBar()}
          <div id="pd-hero-gallery">
            ${ProductImageGallery()}
          </div>
          ${RelatedProducts()}
        </div>
        <div id="pd-hero-info">
          ${ProductInfo()}
        </div>
      </div>
    </div>
  </section>

  <!-- Tabbed Content -->
  ${ProductTabs()}
</main>
```

**Key differences:**
1. `${Breadcrumb()}` moved from outside the section to inside `#pd-hero-left` as the first child
2. `${ProductTitleBar()}` moved from above the grid to inside `#pd-hero-left` as the second child
3. The separate `<!-- Breadcrumb -->` comment block is removed
4. The grid `#pd-hero-grid` is now the first child of `container-boxed`

**Acceptance criteria:**
- Breadcrumb renders inside the left column of the grid
- ProductTitleBar renders inside the left column, below breadcrumb
- ProductInfo card starts at the same vertical level as the breadcrumb on desktop
- Mobile stacked layout still shows breadcrumb -> title -> gallery -> info (correct reading order)
- No console errors, no TypeScript compilation errors

---

#### Task L5: Verify and adjust CSS grid styles if needed [LOGIC]

**File:** `src/style.css` (lines 1186-1228)

**Review the existing CSS for `#pd-hero-grid`:**

The current CSS should work correctly with the new structure because:
- Mobile: `flex-direction: column` stacks `#pd-hero-left` and `#pd-hero-info` vertically (no change needed)
- Desktop: `display: grid; grid-template-columns: 1fr 380px;` places left and right columns side-by-side (no change needed)
- Sticky: `#pd-hero-info { position: sticky; top: 80px; }` still works because the grid row now starts at breadcrumb level

**Potential adjustments needed:**
1. The `#pd-title-bar` currently has `margin-bottom: 20px` (line 1263). Verify this still looks correct within the grid context. It should be fine since it is inside the left column flow.
2. If the sticky card's `top: 80px` needs fine-tuning because the grid now starts higher, adjust accordingly.
3. No changes to `#pd-hero-info` sticky rules are expected since the element is within the grid and sticky is relative to the scroll container.

**Acceptance criteria:**
- Desktop 2-column grid still functions correctly with breadcrumb + title inside left column
- Sticky card aligns with the top of the breadcrumb area
- No horizontal overflow at any viewport width
- Spacing between breadcrumb, title bar, and gallery looks natural (no excessive gaps, no collapsed margins)

---

#### Task Q6: Visual and structural QA for layout restructure [QA]

**Verification checklist:**

**Desktop (>=1024px):**
- [ ] ProductInfo card top edge is vertically aligned with the breadcrumb top edge
- [ ] ProductInfo card remains sticky while scrolling through left column content
- [ ] Sticky card does not overlap the header (check `top: 80px` is still appropriate)
- [ ] Breadcrumb, title bar, gallery, and related products all appear in the left column in correct order
- [ ] Grid columns are `1fr 380px` at 1024px and `1fr 407px` at 1280px
- [ ] No horizontal scrollbar or overflow

**Mobile (<1024px):**
- [ ] Layout is fully stacked: breadcrumb -> title -> gallery -> related -> info card
- [ ] No visual difference from the previous mobile layout (except breadcrumb is now inside the section background)
- [ ] ProductInfo card is NOT sticky on mobile

**Component integrity:**
- [ ] Breadcrumb links are clickable and display correctly
- [ ] Breadcrumb no longer has its own background (inherits from parent section)
- [ ] ProductTitleBar shows title, rating line, and supplier bar correctly
- [ ] All existing ProductInfo interactions work (tier selection, variant buttons, CTA buttons)

**Build:**
- [ ] `npx vite build` succeeds with zero errors
- [ ] No TypeScript compilation errors
- [ ] No console errors in browser

**Acceptance criteria:** All checklist items pass

---

### 10.6 Dependency Graph

```
F10 (Breadcrumb refactor) ──┐
                             ├──> F11 (product-detail.ts restructure)
                             │          │
L5 (CSS grid verification) ─┘          │
                                        └──> Q6 (visual + structural QA)
```

**Execution notes:**
- F10 MUST complete before F11, because F11 relies on Breadcrumb no longer rendering `container-boxed`
- L5 can run in parallel with F10 (different files) — it is a review/adjust task on `style.css`
- F11 depends on F10 (Breadcrumb refactored) and benefits from L5 (CSS confirmed correct)
- Q6 depends on F11 completion
- F10 and F11 are owned by `frontend-specialist` (same component scope)
- L5 is owned by `logic-engineer` (CSS/style scope)
- Q6 is owned by `qa-engineer`

### 10.7 Files Modified

| File | Action | Owner | Description |
|------|--------|-------|-------------|
| `src/components/product/Breadcrumb.ts` | Modified | FRONTEND | Remove `container-boxed` wrapper and background style |
| `src/product-detail.ts` | Modified | FRONTEND | Move Breadcrumb + TitleBar inside `#pd-hero-left`, consolidate section |
| `src/style.css` | Reviewed (possibly modified) | LOGIC | Verify grid CSS works with new structure, adjust spacing if needed |

---

## 11. Sticky Product Info Card — CTA Buttons Always Visible Fix

**Date:** 2026-02-18
**Status:** Active
**Revision:** 1
**Scope:** CSS-only fix to ensure CTA buttons (Siparis Baslat, Sepete Ekle, Sohbet Baslat) remain pinned at the bottom of the sticky product info card, always visible while the content above scrolls.

### 11.1 Context

On the product detail page, when the user scrolls and the `#pd-hero-info` column becomes sticky, the three CTA buttons at the bottom of the card get clipped and become invisible. The buttons should always remain pinned at the bottom of the sticky card (matching Alibaba's product detail page behavior).

### 11.2 Root Cause Analysis

The HTML structure is correct:

```
#pd-hero-info.pd-sticky          (sticky container, flex column, max-height: calc(100vh - 150px))
  #product-info                   (flex column child)
    #pd-info-scrollable           (scrollable content area: tabs, prices, variants, shipping, trade assurance)
    #pd-cta-buttons               (3 CTA buttons: flex-shrink: 0, border-top, padding)
```

The CSS flex setup is mostly correct:
- `#pd-hero-info.pd-sticky` has `display: flex; flex-direction: column; max-height: calc(100vh - 150px)` -- CORRECT
- `.pd-sticky #pd-info-scrollable` has `flex: 1; overflow-y: auto; min-height: 0` -- CORRECT
- `#pd-cta-buttons` has `flex-shrink: 0` -- CORRECT

**The bug is on line 1526 of `src/style.css`:**

```css
.pd-sticky #product-info {
    flex: 1;
    min-height: 0;
    max-height: 100%;
    overflow: hidden;    /* <-- THIS IS THE BUG */
}
```

`overflow: hidden` on `#product-info` clips the CTA buttons when the total content exceeds the card's constrained height. The flex container cannot display `#pd-cta-buttons` because the overflow is hidden at the `#product-info` level, before the flex layout can distribute space between `#pd-info-scrollable` (which should absorb overflow via its own `overflow-y: auto`) and `#pd-cta-buttons` (which should remain visible).

### 11.3 The Fix

**Change `overflow: hidden` to `overflow: visible` (or remove it entirely) on `.pd-sticky #product-info`.**

The `overflow: hidden` is unnecessary here because:
1. `#pd-info-scrollable` already has `overflow-y: auto` to handle its own content overflow
2. `#product-info` has `border-radius: 8px` which creates its own stacking context, and any visual clipping at the card edges is handled by the border-radius
3. The parent `#pd-hero-info.pd-sticky` already has `max-height: calc(100vh - 150px)` which constrains the total height

With `overflow: hidden` removed, the flex layout works as intended:
- `#product-info` fills the sticky container via `flex: 1; min-height: 0; max-height: 100%`
- Inside `#product-info`, the flex column distributes space:
  - `#pd-info-scrollable` gets `flex: 1` and scrolls its own overflow
  - `#pd-cta-buttons` gets `flex-shrink: 0` and stays pinned at the bottom

**However**, there is a subtlety: `overflow: hidden` may have been added to work with `min-height: 0` to allow the flex item to shrink below its content size. The correct approach is to **replace `overflow: hidden` with `overflow: clip`** -- or alternatively, keep `min-height: 0` (which already enables flex shrinking in modern browsers) and just remove `overflow: hidden`. Since `#pd-info-scrollable` handles scrolling internally, the parent does not need overflow management.

**Recommended change (line 1522-1527 of `src/style.css`):**

Before:
```css
.pd-sticky #product-info {
    flex: 1;
    min-height: 0;
    max-height: 100%;
    overflow: hidden;
}
```

After:
```css
.pd-sticky #product-info {
    flex: 1;
    min-height: 0;
    max-height: 100%;
    display: flex;
    flex-direction: column;
}
```

**Why add `display: flex; flex-direction: column` here?** The base `#product-info` rule already has these properties, but being explicit in the sticky context ensures that when the container is height-constrained (`max-height: 100%`), the flex layout properly distributes space between `#pd-info-scrollable` (flex: 1, scrollable) and `#pd-cta-buttons` (flex-shrink: 0, pinned). The key change is removing `overflow: hidden` which was the actual blocker.

### 11.4 Task Breakdown

#### Task F12: Remove overflow:hidden from sticky #product-info [FRONTEND]

**File:** `src/style.css` (line 1522-1527)

**Changes:**
1. In the `.pd-sticky #product-info` rule, remove `overflow: hidden`
2. Optionally add `display: flex; flex-direction: column` to be explicit about the flex context in sticky mode (the base rule already sets this, but it reinforces the intent)

**Exact change:**

Before:
```css
.pd-sticky #product-info {
    flex: 1;
    min-height: 0;
    max-height: 100%;
    overflow: hidden;
}
```

After:
```css
.pd-sticky #product-info {
    flex: 1;
    min-height: 0;
    max-height: 100%;
    display: flex;
    flex-direction: column;
}
```

**Acceptance criteria:**
- CTA buttons (Siparis Baslat, Sepete Ekle, Sohbet Baslat) are visible and pinned at the bottom of the sticky card at all times
- The scrollable content area (`#pd-info-scrollable`) scrolls independently above the buttons
- The card does not overflow its `max-height: calc(100vh - 150px)` constraint
- No visual regression in non-sticky state (buttons still appear in normal flow)
- No horizontal overflow or layout shift
- `npx vite build` succeeds with zero errors

---

#### Task Q7: Visual QA for sticky CTA buttons fix [QA]

**Verification checklist:**

**Desktop (>=1024px) — Sticky state:**
- [ ] Scroll down until `#pd-hero-info` becomes sticky
- [ ] CTA buttons (Siparis Baslat, Sepete Ekle, Sohbet Baslat) are visible at the bottom of the card
- [ ] CTA buttons have a `border-top: 1px solid #e5e5e5` separator line above them
- [ ] Content above the buttons (`#pd-info-scrollable`) scrolls independently
- [ ] Scrollbar is hidden (scrollbar-width: none) but scroll still works via mousewheel/touch
- [ ] Card height does not exceed viewport height minus header
- [ ] CTA buttons are clickable and not clipped

**Desktop — Non-sticky state:**
- [ ] CTA buttons appear in normal content flow at the bottom of the card
- [ ] No visual change compared to previous non-sticky behavior

**Mobile (<1024px):**
- [ ] Card is not sticky on mobile
- [ ] CTA buttons display normally within the card
- [ ] No layout regression

**Build:**
- [ ] `npx vite build` succeeds with zero errors
- [ ] No console errors in browser

**Acceptance criteria:** All checklist items pass

---

### 11.5 Dependency Graph

```
F12 (CSS fix) ──> Q7 (Visual QA)
```

This is a single CSS property change. F12 has no blockers. Q7 depends on F12 completion.

### 11.6 Files Modified

| File | Action | Owner | Description |
|------|--------|-------|-------------|
| `src/style.css` | Modified | FRONTEND | Remove `overflow: hidden` from `.pd-sticky #product-info`, replace with explicit flex column |

### 11.7 Risk Assessment

**Risk: Low.** This is a single CSS rule change. The `overflow: hidden` was the only property causing the bug. Removing it restores the intended flex layout behavior. The scrollable area already manages its own overflow via `overflow-y: auto` on `#pd-info-scrollable`.

**Rollback:** If any visual regression occurs, simply restore `overflow: hidden` to the `.pd-sticky #product-info` rule.

---

## 12. CTA Buttons Repositioning — State-Dependent Placement

**Date:** 2026-02-18
**Status:** Active
**Revision:** 1
**Scope:** Move CTA buttons inside the scrollable content area (between Shipping and Trade Assurance), then use CSS `position: sticky; bottom: 0` in the sticky card state to pin them at the bottom of the scroll viewport. No JS changes needed.

### 12.1 Context

The Product Owner requires the CTA buttons (Siparis Baslat, Sepete Ekle, Sohbet Baslat) to behave differently depending on the card's sticky state:

- **Non-sticky (normal state):** Buttons appear in the content flow BETWEEN the Shipping section and the "iSTOC Siparis Koruma" (Trade Assurance) section, sitting between two horizontal dividers.
- **Sticky state:** Buttons are pinned at the bottom of the sticky card's visible scroll area, always visible regardless of scroll position within the card.

### 12.2 Current Structure

```
#product-info                         (flex column)
  #pd-info-scrollable                 (content area, overflow-y: auto in sticky mode)
    #pd-card-tabs                     (Toptan Satis / Ozellestirme)
    #pd-ready-badge                   (Sevkiyata Hazir)
    #pd-price-tiers                   (price tiers)
    #pd-sample-price                  (sample price)
    #pd-variations-section            (variant groups)
    .pd-info-section                  (Tedarikci Ozellestirme)
    .pd-info-section                  (Kargo / Shipping) ← line 128
    #pd-trade-assurance               (iSTOC Siparis Koruma) ← line 143
  #pd-cta-buttons                     (3 CTA buttons) ← line 183, OUTSIDE scrollable
```

### 12.3 Target Structure

```
#product-info                         (flex column)
  #pd-info-scrollable                 (content area, overflow-y: auto in sticky mode)
    #pd-card-tabs
    #pd-ready-badge
    #pd-price-tiers
    #pd-sample-price
    #pd-variations-section
    .pd-info-section                  (Tedarikci Ozellestirme)
    .pd-info-section                  (Kargo / Shipping)
    #pd-cta-buttons                   ← MOVED HERE (between Shipping and Trade Assurance)
    #pd-trade-assurance               (iSTOC Siparis Koruma)
```

Key change: `#pd-cta-buttons` moves from being a sibling of `#pd-info-scrollable` to being a child of it, positioned between the Shipping `.pd-info-section` and `#pd-trade-assurance`.

### 12.4 CSS Strategy

The approach uses CSS `position: sticky` within the scroll container to achieve state-dependent behavior without any JavaScript:

**Non-sticky card (normal state):**
- `#pd-cta-buttons` is in normal document flow inside `#pd-info-scrollable`
- `#pd-info-scrollable` has `padding: 20px` and NO `overflow-y: auto` (non-sticky)
- Buttons render between Shipping and Trade Assurance with top and bottom dividers
- `position: sticky` has no visible effect because there is no scrolling container (no constrained height, no overflow)

**Sticky card:**
- `.pd-sticky #pd-info-scrollable` gets `overflow-y: auto` (already in CSS, line 1281)
- `#pd-cta-buttons` gets `position: sticky; bottom: 0` which pins it at the bottom of the scrollable viewport
- The `background: #fff` on `#pd-cta-buttons` ensures content scrolls behind the buttons without showing through
- `border-top` provides the visual separator

**Why this works:** CSS `position: sticky` with `bottom: 0` inside an `overflow: auto` container pins the element to the bottom of the scroll viewport. When there is no scroll container (non-sticky state), sticky has no effect, and the element stays in normal flow.

### 12.5 Detailed Changes

#### HTML Change (ProductInfo.ts)

Move `#pd-cta-buttons` from after `</div><!-- end #pd-info-scrollable -->` to between the Shipping section and `#pd-trade-assurance` inside `#pd-info-scrollable`.

**Before (lines 140-193):**
```html
        </div>
        <!-- end Shipping .pd-info-section (line 140) -->

        <!-- Trade Assurance / Order Protection -->
        <div id="pd-trade-assurance">
          ...
        </div>
      </div>
      <!-- end #pd-info-scrollable (line 180) -->

      <!-- CTA Buttons — pinned at bottom of sticky card -->
      <div id="pd-cta-buttons">
        <button ...>Siparis Baslat</button>
        <button ...>Sepete Ekle</button>
        <button ...>Sohbet Baslat</button>
      </div>
    </div>
    <!-- end #product-info -->
```

**After:**
```html
        </div>
        <!-- end Shipping .pd-info-section -->

        <!-- CTA Buttons — in-flow between Shipping and Trade Assurance; sticky-pinned in sticky mode -->
        <div id="pd-cta-buttons">
          <button ...>Siparis Baslat</button>
          <button ...>Sepete Ekle</button>
          <button ...>Sohbet Baslat</button>
        </div>

        <!-- Trade Assurance / Order Protection -->
        <div id="pd-trade-assurance">
          ...
        </div>
      </div>
      <!-- end #pd-info-scrollable -->
    </div>
    <!-- end #product-info -->
```

#### CSS Changes (style.css)

**1. Update base `#pd-cta-buttons` rule (line 1796-1803):**

Before:
```css
#pd-cta-buttons {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
    padding: 16px 20px;
    border-top: 1px solid #e5e5e5;
    background: #fff;
}
```

After:
```css
#pd-cta-buttons {
    display: flex;
    gap: 8px;
    padding: 16px 20px;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    background: #fff;
    margin: 0 -20px;
}
```

Changes:
- Removed `flex-shrink: 0` (no longer needed since buttons are inside the scroll container, not a flex sibling)
- Added `border-bottom: 1px solid #e5e5e5` for the bottom divider in non-sticky state
- Added `margin: 0 -20px` to make the buttons span the full width of the card (counteracting the `padding: 20px` on `#pd-info-scrollable`)

**2. Add sticky behavior in `.pd-sticky` context:**

```css
.pd-sticky #pd-cta-buttons {
    position: sticky;
    bottom: 0;
    z-index: 2;
    border-bottom: none;
    margin-bottom: -20px;
}
```

Changes:
- `position: sticky; bottom: 0` pins buttons to the bottom of the scroll viewport in sticky mode
- `z-index: 2` ensures buttons render above scrolling content
- `border-bottom: none` removes the bottom border in sticky mode (the card edge provides the visual boundary)
- `margin-bottom: -20px` counteracts the `#pd-info-scrollable` bottom padding so the buttons sit flush at the card's bottom edge

**3. Update `.pd-sticky #product-info` rule (line 1522-1527):**

This rule was updated by F12 to remove `overflow: hidden`. Since CTA buttons are now inside `#pd-info-scrollable`, the `#product-info` container no longer needs to manage the buttons as a separate flex child. The rule should be:

```css
.pd-sticky #product-info {
    flex: 1;
    min-height: 0;
    max-height: 100%;
}
```

Removed `display: flex; flex-direction: column` added by F12, since the base `#product-info` already has these, and CTA buttons are no longer a direct child that needs flex distribution.

### 12.6 Task Breakdown

#### Task F13: Move CTA buttons inside scrollable area in ProductInfo.ts [FRONTEND]

**File:** `src/components/product/ProductInfo.ts`

**What to do:**
1. Cut the `#pd-cta-buttons` block (lines 182-193) from its current position (after `</div><!-- end #pd-info-scrollable -->`)
2. Paste it inside `#pd-info-scrollable`, between the Shipping `.pd-info-section` closing `</div>` (line 140) and the `<!-- Trade Assurance -->` comment (line 142)
3. Update the comment on `#pd-cta-buttons` from "pinned at bottom of sticky card" to "in-flow between Shipping and Trade Assurance; sticky-pinned in sticky mode"

**Exact before (lines 140-194):**
```html
        </div>

        <!-- Trade Assurance / Order Protection -->
        <div id="pd-trade-assurance">
          ...
        </div>
      </div>

      <!-- CTA Buttons — pinned at bottom of sticky card -->
      <div id="pd-cta-buttons">
        <button type="button" id="pd-start-order" class="pd-cta-primary">
          Siparis Baslat
        </button>
        <button type="button" id="pd-add-to-cart" class="pd-cta-outline">
          Sepete Ekle
        </button>
        <button type="button" id="pd-chat-now" class="pd-cta-outline">
          Sohbet Baslat
        </button>
      </div>
    </div>
```

**Exact after:**
```html
        </div>

        <!-- CTA Buttons — in-flow between Shipping and Trade Assurance; sticky-pinned in sticky mode -->
        <div id="pd-cta-buttons">
          <button type="button" id="pd-start-order" class="pd-cta-primary">
            Siparis Baslat
          </button>
          <button type="button" id="pd-add-to-cart" class="pd-cta-outline">
            Sepete Ekle
          </button>
          <button type="button" id="pd-chat-now" class="pd-cta-outline">
            Sohbet Baslat
          </button>
        </div>

        <!-- Trade Assurance / Order Protection -->
        <div id="pd-trade-assurance">
          ...
        </div>
      </div>
    </div>
```

**Acceptance criteria:**
- `#pd-cta-buttons` is now a child of `#pd-info-scrollable`, positioned between the last `.pd-info-section` (Shipping) and `#pd-trade-assurance`
- `#pd-cta-buttons` is no longer a direct child of `#product-info`
- No changes to button content, IDs, or classes
- No TypeScript compilation errors
- `initProductInfo()` still works (it doesn't reference CTA button positions)

---

#### Task F14: Update CSS for state-dependent CTA button positioning [FRONTEND]

**File:** `src/style.css`

**What to do:**

1. **Update `#pd-cta-buttons` base rule** (line 1796-1803):
   - Remove `flex-shrink: 0`
   - Add `border-bottom: 1px solid #e5e5e5`
   - Add `margin: 0 -20px` (negative margin to span full card width)

2. **Add new rule `.pd-sticky #pd-cta-buttons`** after the base `#pd-cta-buttons` rule:
   ```css
   .pd-sticky #pd-cta-buttons {
       position: sticky;
       bottom: 0;
       z-index: 2;
       border-bottom: none;
       margin-bottom: -20px;
   }
   ```

3. **Simplify `.pd-sticky #product-info` rule** (line 1522-1527):
   - Remove `display: flex; flex-direction: column` (added by F12, no longer needed)
   - Keep `flex: 1; min-height: 0; max-height: 100%`

**Before `.pd-sticky #product-info`:**
```css
.pd-sticky #product-info {
    flex: 1;
    min-height: 0;
    max-height: 100%;
    display: flex;
    flex-direction: column;
}
```

**After `.pd-sticky #product-info`:**
```css
.pd-sticky #product-info {
    flex: 1;
    min-height: 0;
    max-height: 100%;
}
```

**Before `#pd-cta-buttons`:**
```css
#pd-cta-buttons {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
    padding: 16px 20px;
    border-top: 1px solid #e5e5e5;
    background: #fff;
}
```

**After `#pd-cta-buttons`:**
```css
#pd-cta-buttons {
    display: flex;
    gap: 8px;
    padding: 16px 20px;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    background: #fff;
    margin: 0 -20px;
}

.pd-sticky #pd-cta-buttons {
    position: sticky;
    bottom: 0;
    z-index: 2;
    border-bottom: none;
    margin-bottom: -20px;
}
```

**Acceptance criteria:**
- Non-sticky: CTA buttons appear between Shipping and Trade Assurance with top and bottom dividers
- Non-sticky: Buttons span the full card width (negative margin counteracts scrollable padding)
- Sticky: CTA buttons are pinned at the bottom of the scroll viewport
- Sticky: No bottom border on buttons (card edge serves as boundary)
- Sticky: Content scrolls behind the buttons without showing through (white background)
- `npx vite build` succeeds with zero errors

---

#### Task Q8: Visual QA for CTA button repositioning [QA]

**Verification checklist:**

**Desktop (>=1024px) -- Non-sticky state:**
- [ ] CTA buttons appear between the Shipping section and "iSTOC Siparis Koruma" (Trade Assurance)
- [ ] Buttons have a `border-top: 1px solid #e5e5e5` above them
- [ ] Buttons have a `border-bottom: 1px solid #e5e5e5` below them
- [ ] Buttons span the full card width (no padding gaps on left/right)
- [ ] Trade Assurance section appears below the CTA buttons
- [ ] All three buttons are clickable: Siparis Baslat, Sepete Ekle, Sohbet Baslat

**Desktop (>=1024px) -- Sticky state:**
- [ ] Scroll down until `#pd-hero-info` becomes sticky
- [ ] CTA buttons are pinned at the bottom of the visible card area
- [ ] Content above buttons scrolls independently (tabs, prices, variants, shipping scroll up behind buttons)
- [ ] Buttons have white background -- no content bleeds through from behind
- [ ] Buttons have `border-top` separator but NO `border-bottom`
- [ ] Card height does not exceed `calc(100vh - 150px)`
- [ ] Scrollbar is hidden but scroll works via mousewheel/touch
- [ ] All three buttons are clickable in sticky mode
- [ ] Trade Assurance content is accessible by scrolling past the buttons

**Mobile (<1024px):**
- [ ] Card is not sticky on mobile
- [ ] CTA buttons appear between Shipping and Trade Assurance in normal flow
- [ ] Buttons have both top and bottom borders
- [ ] No layout regression from previous mobile behavior

**Build:**
- [ ] `npx vite build` succeeds with zero errors
- [ ] No console errors in browser
- [ ] No TypeScript compilation errors

**Acceptance criteria:** All checklist items pass

---

### 12.7 Dependency Graph

```
F13 (HTML move) ──┐
                   ├──> Q8 (Visual QA)
F14 (CSS changes) ─┘
```

- F13 and F14 can theoretically run in parallel (different files), but F14 depends on the HTML structure change from F13 to be visually testable. **Recommended: execute F13 first, then F14.**
- Q8 depends on both F13 and F14 completion.
- F13 has no blockers. F14 has no hard blockers but is logically sequenced after F13.

### 12.8 Files Modified

| File | Action | Owner | Description |
|------|--------|-------|-------------|
| `src/components/product/ProductInfo.ts` | Modified | FRONTEND | Move `#pd-cta-buttons` inside `#pd-info-scrollable`, between Shipping and Trade Assurance |
| `src/style.css` | Modified | FRONTEND | Update `#pd-cta-buttons` base styles, add `.pd-sticky #pd-cta-buttons` sticky rule, simplify `.pd-sticky #product-info` |

### 12.9 Relationship to Previous Tasks

- **F12 (Section 11):** Already completed. Changed `.pd-sticky #product-info` from `overflow: hidden` to `display: flex; flex-direction: column`. Task F14 will simplify this further by removing `display: flex; flex-direction: column` since CTA buttons are no longer a direct child of `#product-info`.
- **Q7 (Section 11):** Already completed. Q8 supersedes Q7's verification scope since the button behavior is fundamentally changing.

### 12.10 Risk Assessment

**Risk: Low-Medium.** Two files modified, HTML restructure + CSS changes. The approach uses well-established CSS `position: sticky` behavior within scroll containers.

**Key risk:** `position: sticky; bottom: 0` requires the scroll container (`#pd-info-scrollable`) to have explicit `overflow-y: auto` (already set by `.pd-sticky #pd-info-scrollable` at line 1279-1284). If the overflow is not set, sticky will not activate. This is already handled by existing CSS.

**Rollback:** Move `#pd-cta-buttons` back outside `#pd-info-scrollable` (restore as sibling), revert CSS changes to `#pd-cta-buttons` base rule, remove `.pd-sticky #pd-cta-buttons` rule.

---

## 13. Product Attributes Card — Gallery Tab Content Switching

**Date:** 2026-02-18
**Status:** Active
**Revision:** 1
**Scope:** Create a new ProductAttributes component that renders product specifications in a 2-column grid + vertical list layout, and wire it into the existing gallery tab switching system so "Ozellikler" tab hides the photo gallery and shows the attributes card.

### 13.1 Context

The Product Owner requires an Attributes card to appear in the gallery area when the user clicks the "Ozellikler" (Attributes) tab. The tab buttons already exist in `ProductImageGallery.ts` (lines 138-142) with the class `.gallery-view-tab`, and a click handler already toggles the `active` CSS class (lines 229-236). However, no content switching is implemented -- clicking the tab only changes the visual active state of the tab button.

### 13.2 Current State

**Already implemented:**
- Tab buttons rendered in `ProductImageGallery.ts` (lines 138-142): "Fotograflar" and "Ozellikler" with class `.gallery-view-tab`
- Tab container: `<div id="pd-gallery-tabs">`
- CSS: `#pd-gallery-tabs` styled as a pill-shaped segmented control (lines 1478-1508 in `style.css`)
- Click handler in `initImageGallery()` (lines 229-236) toggles `active` CSS class on tabs
- `ProductSpec` type defined in `src/types/product.ts` (line 34-37): `{ key: string; value: string }`
- Mock data: `mockProduct.specs` has 10 specs (lines 63-74 in `src/data/mockProduct.ts`)
- CSS variables for spec styling already exist in `@theme`: `--pd-spec-header-bg`, `--pd-spec-border`, `--pd-spec-key-color`, `--pd-spec-value-color`

**Not yet implemented:**
- Attributes card HTML component
- Content switching logic (show/hide gallery vs attributes)
- CSS for the 2-column grid + list layout of the attributes card

### 13.3 Design Specification (from Alibaba screenshot)

The attributes card has two visual sections:

**Section A: 2-Column Grid (top 6 specs)**
- 3 rows x 2 columns = 6 cells
- Each cell shows: **value** (bold, dark, larger) on top, label (gray, smaller, below)
- Light gray borders/dividers between cells (both horizontal and vertical)
- Background: slightly off-white or white, matching the gallery area

**Section B: Vertical Key-Value List (remaining specs)**
- Each row: `Key: Value` format
- Key in gray/muted, value in dark text
- Separated by light horizontal dividers
- Stacked vertically, one per line

**Overall container:**
- Title "Ozellikler" at top (or no separate title since the tab already indicates the context)
- Same width/height area as the photo gallery (`#product-gallery`)
- White/off-white background
- Rounded corners matching gallery styling

### 13.4 Data Mapping

From `mockProduct.specs` (10 items):
- **Grid cells (first 6):** Malzeme, Kaplama, Zincir Uzunlugu, Uc Boyutu, Agirlik, Su Gecirmezlik
- **List rows (remaining 4):** Garanti, Sertifikalar, Mensei Ulke, Marka

The component should accept the specs array generically: first 6 go to the grid, remaining go to the list. If fewer than 6 specs exist, the grid adjusts (fewer cells). If exactly 6 or fewer, the list section is omitted.

### 13.5 Architectural Decisions

1. **New component file:** `src/components/product/ProductAttributes.ts` -- exports `ProductAttributes(): string` (HTML renderer). No init function needed since there are no interactive elements in the attributes card itself.

2. **Content switching approach:** Modify the existing tab click handler in `initImageGallery()` (lines 229-236 of `ProductImageGallery.ts`) to:
   - When "Fotograflar" tab is active: show `#product-gallery`, hide `#pd-attributes-card`
   - When "Ozellikler" tab is active: hide `#product-gallery`, show `#pd-attributes-card`
   - Use `display: none` / `display: flex` (or block) toggling via a CSS class (e.g., `.hidden`)

3. **HTML placement:** The `ProductAttributes()` HTML will be rendered alongside `ProductImageGallery()` inside `#pd-hero-gallery` in `product-detail.ts`. The attributes card sits as a sibling to `#product-gallery`, both wrapped by `#pd-hero-gallery`. The tab buttons (`#pd-gallery-tabs`) are already rendered by `ProductImageGallery()` and remain outside/below both content areas.

4. **CSS variables:** Reuse existing `--pd-spec-*` variables for borders, key color, and value color. No new CSS variables needed.

5. **No barrel export change for `product-detail.ts`:** Since `product-detail.ts` imports directly from `'./components/product'`, the new component must be added to the barrel export in `src/components/product/index.ts`.

### 13.6 Target HTML Structure

Inside `product-detail.ts`, the `#pd-hero-gallery` area changes from:

```html
<div id="pd-hero-gallery">
  ${ProductImageGallery()}
</div>
```

To:

```html
<div id="pd-hero-gallery">
  ${ProductImageGallery()}
  ${ProductAttributes()}
</div>
```

Where `ProductAttributes()` renders:

```html
<div id="pd-attributes-card" class="hidden">
  <!-- Section A: 2-column grid for first 6 specs -->
  <div class="pd-attr-grid">
    <div class="pd-attr-cell">
      <span class="pd-attr-value">316L Paslanmaz Celik</span>
      <span class="pd-attr-key">Malzeme</span>
    </div>
    <!-- ... 5 more cells ... -->
  </div>

  <!-- Section B: vertical key-value list for remaining specs -->
  <div class="pd-attr-list">
    <div class="pd-attr-row">
      <span class="pd-attr-row-key">Garanti</span>
      <span class="pd-attr-row-value">2 Yil</span>
    </div>
    <!-- ... more rows ... -->
  </div>
</div>
```

**Key detail:** The card starts with `class="hidden"` (Tailwind utility: `display: none`) so it is invisible by default. The tab switching JS removes `hidden` when "Ozellikler" is clicked and adds `hidden` to `#product-gallery`.

### 13.7 CSS Specifications

**New CSS rules to add to `style.css` (inside the Product Gallery section, after `.gallery-view-tab.active`):**

```css
/* Attributes card — replaces gallery when "Ozellikler" tab is active */
#pd-attributes-card {
    background: var(--pd-spec-header-bg, #f9fafb);
    border-radius: 8px;
    border: 1px solid var(--pd-spec-border, #e5e5e5);
    padding: 20px;
    min-height: 300px;
}

/* 2-column grid: first 6 specs */
.pd-attr-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 1px solid var(--pd-spec-border, #e5e5e5);
    border-radius: 6px;
    overflow: hidden;
    background: #fff;
}

.pd-attr-cell {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 14px 16px;
    border-bottom: 1px solid var(--pd-spec-border, #e5e5e5);
    border-right: 1px solid var(--pd-spec-border, #e5e5e5);
}

/* Remove right border on even (right-column) cells */
.pd-attr-cell:nth-child(even) {
    border-right: none;
}

/* Remove bottom border on last row */
.pd-attr-cell:nth-last-child(-n+2) {
    border-bottom: none;
}

.pd-attr-value {
    font-size: 14px;
    font-weight: 700;
    color: var(--pd-spec-value-color, #111827);
}

.pd-attr-key {
    font-size: 12px;
    color: var(--pd-spec-key-color, #6b7280);
}

/* Vertical key-value list: remaining specs */
.pd-attr-list {
    margin-top: 16px;
}

.pd-attr-row {
    display: flex;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid var(--pd-spec-border, #e5e5e5);
    font-size: 13px;
}

.pd-attr-row:last-child {
    border-bottom: none;
}

.pd-attr-row-key {
    color: var(--pd-spec-key-color, #6b7280);
    min-width: 120px;
    flex-shrink: 0;
}

.pd-attr-row-value {
    color: var(--pd-spec-value-color, #111827);
    font-weight: 500;
}
```

### 13.8 Tab Switching Logic Changes

**File:** `src/components/product/ProductImageGallery.ts` (lines 229-236)

**Before:**
```typescript
// Photos / Attributes tab toggle
const viewTabs = document.querySelectorAll<HTMLButtonElement>('.gallery-view-tab');
viewTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    viewTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});
```

**After:**
```typescript
// Photos / Attributes tab toggle with content switching
const viewTabs = document.querySelectorAll<HTMLButtonElement>('.gallery-view-tab');
const gallery = document.getElementById('product-gallery');
const attrCard = document.getElementById('pd-attributes-card');

viewTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    viewTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    if (gallery && attrCard) {
      // index 0 = "Fotograflar" (show gallery), index 1 = "Ozellikler" (show attributes)
      const showAttrs = index === 1;
      gallery.classList.toggle('hidden', showAttrs);
      attrCard.classList.toggle('hidden', !showAttrs);
    }
  });
});
```

**Why use index:** The tabs are rendered in a fixed order: index 0 = "Fotograflar", index 1 = "Ozellikler". This is stable since the HTML is generated by the same component. Alternatively, a `data-view` attribute could be added to each tab button for more explicit targeting, but index-based is simpler and sufficient.

### 13.9 Task Breakdown

#### Task F15: Create ProductAttributes component [FRONTEND]

**File:** `src/components/product/ProductAttributes.ts` (new file)

**What to do:**
1. Create a new file `src/components/product/ProductAttributes.ts`
2. Import `mockProduct` from `../../data/mockProduct`
3. Export `ProductAttributes(): string` that renders:
   - Outer container `<div id="pd-attributes-card" class="hidden">` (hidden by default)
   - Section A: `<div class="pd-attr-grid">` with the first 6 specs as `pd-attr-cell` elements (value bold on top, key gray below)
   - Section B: `<div class="pd-attr-list">` with the remaining specs as `pd-attr-row` elements (key: value horizontal layout)
   - If 6 or fewer specs total, omit the list section
4. All styling via CSS classes defined in style.css + existing `--pd-spec-*` CSS variables for colors/borders

**Acceptance criteria:**
- Component renders correctly with mockProduct.specs (10 specs: 6 in grid, 4 in list)
- Grid shows 3 rows x 2 columns with dividers
- List shows key-value pairs with horizontal dividers
- Container starts hidden (class="hidden")
- No TypeScript compilation errors

---

#### Task F16: Wire up ProductAttributes in product-detail.ts and barrel export [FRONTEND]

**File:** `src/product-detail.ts`, `src/components/product/index.ts`

**What to do:**
1. In `src/components/product/index.ts`: add `export { ProductAttributes } from './ProductAttributes';`
2. In `src/product-detail.ts`:
   - Add `ProductAttributes` to the existing import from `'./components/product'`
   - In the HTML template, add `${ProductAttributes()}` after `${ProductImageGallery()}` inside `#pd-hero-gallery`:
     ```html
     <div id="pd-hero-gallery">
       ${ProductImageGallery()}
       ${ProductAttributes()}
     </div>
     ```

**Acceptance criteria:**
- `ProductAttributes` is importable from the barrel export
- The attributes card HTML is rendered inside `#pd-hero-gallery` but hidden by default
- No TypeScript compilation errors
- Gallery still displays normally (attributes card is hidden)

---

#### Task F17: Update tab switching logic to show/hide gallery vs attributes [FRONTEND]

**File:** `src/components/product/ProductImageGallery.ts` (lines 229-236)

**What to do:**
1. In `initImageGallery()`, replace the existing tab click handler (lines 229-236) with content switching logic:
   - Query `#product-gallery` and `#pd-attributes-card` by ID
   - On tab click: toggle `hidden` class on both elements based on which tab is active
   - Index 0 ("Fotograflar"): show gallery, hide attributes
   - Index 1 ("Ozellikler"): hide gallery, show attributes
   - Keep the existing `active` CSS class toggle on the tab buttons

**Before (lines 229-236):**
```typescript
const viewTabs = document.querySelectorAll<HTMLButtonElement>('.gallery-view-tab');
viewTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    viewTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});
```

**After:**
```typescript
const viewTabs = document.querySelectorAll<HTMLButtonElement>('.gallery-view-tab');
const gallery = document.getElementById('product-gallery');
const attrCard = document.getElementById('pd-attributes-card');

viewTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    viewTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    if (gallery && attrCard) {
      const showAttrs = index === 1;
      gallery.classList.toggle('hidden', showAttrs);
      attrCard.classList.toggle('hidden', !showAttrs);
    }
  });
});
```

**Acceptance criteria:**
- Clicking "Ozellikler" tab hides the photo gallery and shows the attributes card
- Clicking "Fotograflar" tab hides the attributes card and shows the photo gallery
- Tab active state styling still works correctly
- Gallery functionality (thumbnail hover, navigation arrows) still works when gallery is visible
- No console errors or TypeScript compilation errors

---

#### Task L6: Add CSS styles for ProductAttributes card [LOGIC]

**File:** `src/style.css`

**What to do:**
1. Add the following CSS rules after the `.gallery-view-tab.active` block (after line 1508), inside the Product Gallery section:

```css
/* Attributes card — replaces gallery when "Ozellikler" tab is active */
#pd-attributes-card {
    background: var(--pd-spec-header-bg, #f9fafb);
    border-radius: 8px;
    border: 1px solid var(--pd-spec-border, #e5e5e5);
    padding: 20px;
    min-height: 300px;
}

.pd-attr-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 1px solid var(--pd-spec-border, #e5e5e5);
    border-radius: 6px;
    overflow: hidden;
    background: #fff;
}

.pd-attr-cell {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 14px 16px;
    border-bottom: 1px solid var(--pd-spec-border, #e5e5e5);
    border-right: 1px solid var(--pd-spec-border, #e5e5e5);
}

.pd-attr-cell:nth-child(even) {
    border-right: none;
}

.pd-attr-cell:nth-last-child(-n+2) {
    border-bottom: none;
}

.pd-attr-value {
    font-size: 14px;
    font-weight: 700;
    color: var(--pd-spec-value-color, #111827);
}

.pd-attr-key {
    font-size: 12px;
    color: var(--pd-spec-key-color, #6b7280);
}

.pd-attr-list {
    margin-top: 16px;
}

.pd-attr-row {
    display: flex;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid var(--pd-spec-border, #e5e5e5);
    font-size: 13px;
}

.pd-attr-row:last-child {
    border-bottom: none;
}

.pd-attr-row-key {
    color: var(--pd-spec-key-color, #6b7280);
    min-width: 120px;
    flex-shrink: 0;
}

.pd-attr-row-value {
    color: var(--pd-spec-value-color, #111827);
    font-weight: 500;
}
```

2. No new CSS variables needed -- reuses existing `--pd-spec-header-bg`, `--pd-spec-border`, `--pd-spec-key-color`, `--pd-spec-value-color`

**Acceptance criteria:**
- All CSS classes compile without errors
- Grid displays 2 columns with proper dividers
- List rows have horizontal dividers
- Colors match existing spec styling (gray keys, dark values)
- `npx vite build` succeeds with zero errors

---

#### Task Q9: Visual and functional QA for Attributes card [QA]

**Verification checklist:**

**Tab switching:**
- [ ] Default state: "Fotograflar" tab is active, photo gallery is visible, attributes card is hidden
- [ ] Click "Ozellikler" tab: gallery hides, attributes card appears, tab shows active styling
- [ ] Click "Fotograflar" tab: attributes card hides, gallery appears, tab shows active styling
- [ ] Gallery functionality (thumbnail hover, prev/next arrows) still works after switching back to photos
- [ ] Tab buttons remain pill-shaped segmented control styling

**Attributes card content:**
- [ ] Grid section shows 6 cells (3 rows x 2 columns): Malzeme, Kaplama, Zincir Uzunlugu, Uc Boyutu, Agirlik, Su Gecirmezlik
- [ ] Each grid cell shows: bold value on top, gray label below
- [ ] Grid has light borders/dividers between cells
- [ ] List section shows 4 rows: Garanti, Sertifikalar, Mensei Ulke, Marka
- [ ] Each list row shows: gray key label (left) + dark value (right)
- [ ] List rows have horizontal dividers between them

**Styling:**
- [ ] Card background is slightly off-white (#f9fafb)
- [ ] Card has rounded corners (8px) and subtle border
- [ ] Grid has white background with rounded corners (6px)
- [ ] Colors match existing product detail spec styling (--pd-spec-* variables)
- [ ] Card fills the same visual area as the photo gallery

**Responsive:**
- [ ] Desktop: 2-column grid displays correctly
- [ ] Mobile: 2-column grid still readable (cells may be narrower but 2-col layout is maintained)
- [ ] No horizontal overflow at any viewport width

**Build:**
- [ ] `npx vite build` succeeds with zero errors
- [ ] No TypeScript compilation errors
- [ ] No console errors in browser

**Acceptance criteria:** All checklist items pass

---

### 13.10 Dependency Graph

```
L6 (CSS styles) ───────────┐
                             ├──> Q9 (Visual + Functional QA)
F15 (component) ──> F16 (wiring) ──> F17 (tab logic) ──┘
```

- L6 and F15 can run in parallel (different files)
- F16 depends on F15 (needs the component to exist for the barrel export)
- F17 depends on F16 (needs the attributes card rendered in the DOM for the getElementById calls)
- Q9 depends on all tasks completing

**Parallel execution:**
- L6 (style.css) and F15 (new component file) can run simultaneously
- F16 and F17 both modify `ProductImageGallery.ts` and `product-detail.ts`, so they should be executed sequentially by the frontend agent
- However, F17 only modifies `ProductImageGallery.ts` (the init function), while F16 modifies `product-detail.ts` and `index.ts`, so they are actually in different files and could be parallel — but F17 logically depends on F16 having the `#pd-attributes-card` in the DOM

### 13.11 Files Modified / Created

| File | Action | Owner | Description |
|------|--------|-------|-------------|
| `src/components/product/ProductAttributes.ts` | **Created** | FRONTEND | Attributes card: 2-col grid + vertical key-value list |
| `src/components/product/index.ts` | Modified | FRONTEND | Add barrel export for `ProductAttributes` |
| `src/product-detail.ts` | Modified | FRONTEND | Add `${ProductAttributes()}` inside `#pd-hero-gallery` |
| `src/components/product/ProductImageGallery.ts` | Modified | FRONTEND | Update tab click handler with content switching logic |
| `src/style.css` | Modified | LOGIC | Add CSS for `#pd-attributes-card`, `.pd-attr-grid`, `.pd-attr-cell`, `.pd-attr-list`, `.pd-attr-row` |

### 13.12 Risk Assessment

**Risk: Low.** This feature is additive -- a new component file, CSS additions, a small HTML insertion, and a minor JS handler update. No existing components are visually modified. The `hidden` class approach is safe and reversible.

**Key consideration:** The `hidden` class must be Tailwind's `hidden` utility (which sets `display: none`). Since the project uses Tailwind CSS, this utility is available. If for some reason `hidden` is not available or conflicts with other styles, use an explicit inline style toggle or a custom `.is-hidden { display: none; }` class.

**Rollback:** Remove `ProductAttributes` import/render from `product-detail.ts`, revert the tab handler in `ProductImageGallery.ts`, remove the new CSS rules, delete `ProductAttributes.ts`.

---

## 14. Product Detail Lower Sections Redesign (Alibaba Reference)

**Date:** 2026-02-18
**Status:** Active
**Revision:** 1
**Scope:** Redesign the lower page sections of the product detail page to match Alibaba's layout. Covers tab bar changes, Key Attributes table, Packaging & Delivery, Lead Time, Customization Options, Reviews redesign, and Supplier tab. Split into four phases: A (tab bar + attributes + packaging), B (lead time + customization), C (reviews redesign), D (supplier tab).

### 14.1 Context

The Product Owner wants the content below the product gallery/info area to replicate Alibaba's product detail page. Currently, `ProductTabs` renders four tabs (Urun Aciklamasi, Musteri Yorumlari, Sirket Profili, SSS) with content panels. The redesign replaces these with Alibaba-style sections:

**Current tab structure (`ProductTabs.ts`):**
- Tab 1: "Urun Aciklamasi" -> `ProductDescription` (rich HTML + specs table + packaging)
- Tab 2: "Musteri Yorumlari" -> `ProductReviews` (rating breakdown + review cards)
- Tab 3: "Sirket Profili" -> `CompanyProfile` (company info + factory images + certs)
- Tab 4: "SSS" -> `ProductFAQ` (accordion FAQ)

**Target tab structure (Alibaba design):**
- Tab 1: "Ozellikler" (Attributes) -> Key Attributes table + Packaging & Delivery + Lead Time + Customization Options
- Tab 2: "Yorumlar" (Reviews) -> Redesigned reviews with sub-tabs, filter pills, mention tags, supplier replies
- Tab 3: "Tedarikci" (Supplier) -> Reworked supplier profile
- Tab 4: "Aciklama" (Description) -> Existing rich HTML description (kept mostly as-is)

### 14.2 Phase A: Tab Bar Redesign + Key Attributes + Packaging & Delivery

#### 14.2.1 Tab Bar Changes

**File:** `src/components/product/ProductTabs.ts`

The tab bar itself is already close to the Alibaba design (underline active indicator, horizontal layout, sticky behavior). Changes needed:

1. **Rename tabs and reorder:**
   - "Urun Aciklamasi" -> "Ozellikler" (id: `attributes`)
   - "Musteri Yorumlari" -> "Yorumlar" (id: `reviews`)
   - "Sirket Profili" -> "Tedarikci" (id: `supplier`)
   - "SSS" -> "Aciklama" (id: `description`)

2. **Update tab config array:**
```typescript
const tabs: TabConfig[] = [
  { id: 'attributes', label: 'Ozellikler', content: AttributesTabContent },
  { id: 'reviews', label: 'Yorumlar', content: ProductReviews },
  { id: 'supplier', label: 'Tedarikci', content: CompanyProfile },
  { id: 'description', label: 'Aciklama', content: ProductDescription },
];
```

3. **New `AttributesTabContent` function:** Composes the Attributes tab from multiple sub-sections: Key Attributes + Packaging & Delivery + Lead Time + Customization Options. This can be a simple wrapper function defined in `ProductTabs.ts` or a new component file.

**Decision:** Create a new file `src/components/product/AttributesTabContent.ts` that imports and composes the sub-sections. This keeps `ProductTabs.ts` clean and allows each sub-section to be independently developed.

#### 14.2.2 Key Attributes Section

**Purpose:** Display product specifications in a 4-column table (key-gray | value-bold | key-gray | value-bold per row).

**Data source:** `mockProduct.specs` (10 items, already available)

**Layout:**
- Heading: "Temel Ozellikler" (bold, section title)
- 4-column table: pairs of specs on each row
- Row structure: `[key1 | value1 | key2 | value2]`
- If odd number of specs, last row has only left 2 columns filled, right 2 are empty
- Light borders between rows and columns
- No outer background -- clean table look on white

**HTML pattern:**
```html
<div class="pd-key-attrs">
  <h3 class="pd-section-heading">Temel Ozellikler</h3>
  <table class="pd-attrs-table">
    <tbody>
      <tr>
        <td class="pd-attrs-key">Malzeme</td>
        <td class="pd-attrs-val">316L Paslanmaz Celik</td>
        <td class="pd-attrs-key">Kaplama</td>
        <td class="pd-attrs-val">18K Altin / PVD Kaplama</td>
      </tr>
      <!-- more rows, 2 specs per row -->
    </tbody>
  </table>
</div>
```

#### 14.2.3 Packaging & Delivery Section

**Purpose:** Display packaging and delivery info in the same 4-column table style.

**Data source:** Needs new mock data fields in `mockProduct`. Add a `packaging_specs` array to `ProductDetail` type:

**New type in `product.ts`:**
```typescript
export interface PackagingSpec {
  key: string;
  value: string;
}
```

**New field in `ProductDetail`:**
```typescript
packagingSpecs: PackagingSpec[];
```

**New mock data in `mockProduct`:**
```typescript
packagingSpecs: [
  { key: 'Satis Birimi', value: 'Tek parca / Paket' },
  { key: 'Paket Boyutu', value: '10cm x 8cm x 3cm' },
  { key: 'Brut Agirlik', value: '25g' },
],
```

**Layout:** Same 4-column table style as Key Attributes. Heading: "Paketleme ve Teslimat".

#### 14.2.4 CSS for 4-Column Attribute Tables

**New CSS rules:**

```css
/* Section heading used across Attributes tab sub-sections */
.pd-section-heading {
    font-size: 16px;
    font-weight: 700;
    color: var(--pd-title-color, #111827);
    margin-bottom: 12px;
}

/* 4-column attributes table (key-value pair table) */
.pd-attrs-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    border: 1px solid var(--pd-spec-border, #e5e5e5);
}

.pd-attrs-table td {
    padding: 10px 14px;
    border-bottom: 1px solid var(--pd-spec-border, #e5e5e5);
}

.pd-attrs-table tr:last-child td {
    border-bottom: none;
}

.pd-attrs-key {
    color: var(--pd-spec-key-color, #6b7280);
    width: 18%;
    background: var(--pd-spec-header-bg, #f9fafb);
    border-right: 1px solid var(--pd-spec-border, #e5e5e5);
}

.pd-attrs-val {
    color: var(--pd-spec-value-color, #111827);
    font-weight: 600;
    width: 32%;
    border-right: 1px solid var(--pd-spec-border, #e5e5e5);
}

.pd-attrs-val:last-child {
    border-right: none;
}
```

---

### 14.3 Phase B: Lead Time + Customization Options

#### 14.3.1 Lead Time Section (Collapsible)

**Purpose:** Show production lead times by quantity range in a collapsible table.

**Data source:** New mock data needed.

**New type in `product.ts`:**
```typescript
export interface LeadTimeRange {
  qtyLabel: string;
  days: string;
}
```

**New field in `ProductDetail`:**
```typescript
leadTimeRanges: LeadTimeRange[];
```

**New mock data:**
```typescript
leadTimeRanges: [
  { qtyLabel: '1 - 10', days: '7 gun' },
  { qtyLabel: '11 - 100', days: '20 gun' },
  { qtyLabel: '101 - 2000', days: '45 gun' },
  { qtyLabel: '> 2000', days: 'Pazarlik yapilacak' },
],
```

**Layout:**
- Heading: "Teslim Suresi" with expand/collapse chevron (collapsed by default)
- Table with quantity ranges as columns
- Row 1: Quantity labels (headers)
- Row 2: Lead time values (days)
- Same border/styling as attribute tables

**Collapse behavior:** Simple JS toggle -- click heading to show/hide the table body. Uses `hidden` class toggle.

#### 14.3.2 Customization Options Section

**Purpose:** Show available customization options with pricing.

**Data source:** New mock data needed.

**New type in `product.ts`:**
```typescript
export interface CustomizationOption {
  label: string;
  priceAddon: string;
  minOrder: string;
}
```

**New field in `ProductDetail`:**
```typescript
customizationOptions: CustomizationOption[];
```

**New mock data:**
```typescript
customizationOptions: [
  { label: 'Malzeme', priceAddon: '+$0.50/adet', minOrder: 'Min. siparis: 50 adet' },
  { label: 'Logo Baski', priceAddon: '+$0.30/adet', minOrder: 'Min. siparis: 100 adet' },
  { label: 'Ozel Ambalaj', priceAddon: '+$0.20/adet', minOrder: 'Min. siparis: 200 adet' },
],
```

**Layout:**
- Heading: "Ozellestirme Secenekleri"
- Each option: label + price addon + min order text
- "Detaylari Gor" link per option
- "Sohbet Baslat" button (outline style) at bottom

---

### 14.4 Phase C: Reviews Redesign

This is the most complex phase. The current `ProductReviews` component gets a complete visual overhaul to match Alibaba's review section.

#### 14.4.1 Architecture

**File:** `src/components/product/ProductReviews.ts` (rewrite in place)

The component is rewritten but keeps existing utility functions (`starIcon`, `renderStars`, `getStarBreakdown`, `countryFlag`). New utility functions are added for name anonymization, avatar colors, and satisfaction labels.

**Key design decisions:**
- Sub-tabs use `.rv-sub-tab` classes with underline active indicator (reuses `--pd-tab-active-border` variable)
- Filter pills use `.rv-filter-pill` with active state similar to variant buttons
- Review cards use `.rv-card` layout with flex column structure
- Supplier reply uses a gray background box (`.rv-supplier-reply`)
- Product link card inside each review links to the current product (self-reference in mock)
- All CSS uses existing `--pd-*` variables, no new variables needed
- CSS class prefix `rv-` (reviews) to avoid conflicts with existing `pd-` classes

#### 14.4.2 Data Requirements

**New types in `product.ts`:**
```typescript
export interface ReviewCategoryRating {
  label: string;
  score: number;
}

export interface ReviewMentionTag {
  label: string;
  count: number;
}
```

**New optional fields on `ProductReview`:**
```typescript
verified?: boolean;
repeatBuyer?: boolean;
supplierReply?: string;
countryName?: string;
```

**New fields on `ProductDetail`:**
```typescript
reviewCategoryRatings: ReviewCategoryRating[];
storeReviewCount: number;
reviewMentionTags: ReviewMentionTag[];
```

**Mock data additions:**
- `reviewCategoryRatings`: 3 entries (Tedarikci Hizmeti 4.9, Zamaninda Gonderim 4.6, Urun Kalitesi 4.8)
- `storeReviewCount: 151`
- `reviewMentionTags`: 5 entries
- Each existing review gets `verified: true`, some get `repeatBuyer: true`, some get `supplierReply` strings, all get `countryName` in Turkish

#### 14.4.3 Component Sections (top to bottom)

**1. Sub-tabs:** "Urun Yorumlari (X)" | "Magaza Yorumlari (Y)" with underline active style. Product panel visible by default, store panel hidden with placeholder text.

**2. Rating summary:** Big score number (48px font, weight 800) + 5 stars + satisfaction label (e.g., "Cok Memnun" for >= 4.5) + subtitle referencing storeReviewCount. Right side: 3 horizontal category bars with labels, tracks, fills, and scores.

**3. Filter row:** "Tumu" pill (active by default) + "Fotografli/Videolu (N)" pill + "Sirala: En alakali" sort button with chevron (pushed right via `margin-left: auto`). Pills toggle active state on click but don't actually filter in this mock.

**4. Mention tags:** Row of tag pills from `reviewMentionTags` data. Each shows `label (count)`.

**5. Review cards:** Each card contains:
- Colored avatar circle (deterministic color from name hash) with initial letter
- Anonymized name: "Ahmet Y." becomes "A***t Y." (first char + *** + last char of first name + space + last name)
- Country: flag emoji + Turkish country name from `countryName` field
- Badges: "Dogrulanmis Satin Alma" (green, shown if `verified`) + "Tekrar Alici" (orange, shown if `repeatBuyer`)
- Stars + date
- Comment text
- Supplier reply (gray box, only if `supplierReply` exists)
- Product link card (thumbnail placeholder + truncated title + price)
- "Faydali (N)" button with thumbs-up icon

**6. "Tumunu Goster" button:** Full-width outline button. Click disables it and shows confirmation text.

#### 14.4.4 Utility Functions

```typescript
function anonymizeName(name: string): string {
  const parts = name.split(' ');
  const first = parts[0];
  if (first.length <= 2) return first + (parts[1] ? ' ' + parts[1] : '');
  return first[0] + '***' + first[first.length - 1] + (parts[1] ? ' ' + parts[1] : '');
}

function avatarColor(name: string): string {
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

function satisfactionLabel(rating: number): string {
  if (rating >= 4.5) return 'Cok Memnun';
  if (rating >= 4.0) return 'Memnun';
  if (rating >= 3.0) return 'Orta';
  return 'Dusuk';
}
```

#### 14.4.5 Init Logic

`initReviews()` handles:
1. Sub-tab switching (toggle `hidden` on `#rv-panel-product` / `#rv-panel-store`)
2. Filter pill active state toggling (visual only, no actual filtering)
3. Helpful button click (increment count, add `voted` class, prevent re-voting)
4. "Tumunu Goster" button (disable on click, change text)

#### 14.4.6 CSS Overview

All new CSS classes use the `rv-` prefix. Approximately 60 CSS rules covering:
- Sub-tabs (`.rv-sub-tabs`, `.rv-sub-tab`, `.rv-sub-tab.active`)
- Rating summary (`.rv-rating-summary`, `.rv-rating-big`, `.rv-rating-number`, `.rv-rating-label`)
- Category bars (`.rv-category-bars`, `.rv-category-row`, `.rv-category-bar-track`, `.rv-category-bar-fill`)
- Filter row (`.rv-filter-row`, `.rv-filter-pill`, `.rv-sort-btn`)
- Mention tags (`.rv-mention-tags`, `.rv-mention-tag`)
- Review cards (`.rv-card`, `.rv-avatar`, `.rv-card-meta`, `.rv-badge`, `.rv-supplier-reply`)
- Product link (`.rv-product-link`, `.rv-product-thumb`)
- Helpful button (`.rv-helpful-btn`, `.rv-helpful-btn.voted`)
- Show all button (`.rv-show-all-btn`)
- Mobile responsive (`@media max-width 639px` for stacking rating summary)

#### 14.4.7 Task Breakdown

| Task | Type | File(s) | Description |
|------|------|---------|-------------|
| L11 | [LOGIC] | `product.ts`, `mockProduct.ts` | Add types + mock data for review enhancements |
| L12 | [LOGIC] | `style.css` | Add ~60 CSS rules with `rv-` prefix for all review sections |
| F24 | [FRONTEND] | `ProductReviews.ts` | Complete HTML rewrite of `ProductReviews()` |
| F25 | [FRONTEND] | `ProductReviews.ts` | Rewrite `initReviews()` for sub-tabs, filters, helpful, show-all |
| Q12 | [QA] | -- | Full visual + functional QA (30+ checklist items) |

**Dependency graph:**
```
L11 (types + data) ──┐
                      ├──> F24 (HTML) ──> F25 (init) ──> Q12
L12 (CSS styles)  ────┘
```

---

### 14.5 Phase D: Supplier Tab

The existing `CompanyProfile` component is already functional. Phase D adjustments are minimal:
- Ensure the tab is renamed to "Tedarikci"
- Optionally add a "Tedarikciyi Tani" (Know Your Supplier) header banner
- Already low priority since current implementation is close to Alibaba's layout

---

### 14.6 Task Breakdown

#### Phase A Tasks

##### Task F18: Restructure ProductTabs configuration (rename tabs, reorder) [FRONTEND]

**File:** `src/components/product/ProductTabs.ts`

**What to do:**
1. Update the `tabs` array:
   - Change tab 1 from `{ id: 'description', label: 'Urun Aciklamasi', content: ProductDescription }` to `{ id: 'attributes', label: 'Ozellikler', content: AttributesTabContent }`
   - Change tab 2 from `{ id: 'reviews', label: 'Musteri Yorumlari', content: ProductReviews }` to `{ id: 'reviews', label: 'Yorumlar', content: ProductReviews }`
   - Change tab 3 from `{ id: 'company', label: 'Sirket Profili', content: CompanyProfile }` to `{ id: 'supplier', label: 'Tedarikci', content: CompanyProfile }`
   - Change tab 4 from `{ id: 'faq', label: 'SSS', content: ProductFAQ }` to `{ id: 'description', label: 'Aciklama', content: ProductDescription }`
2. Update imports: add `AttributesTabContent` import, remove `ProductFAQ` import (FAQ content will be removed or folded into another section later)
3. Keep `initProductTabs()` unchanged (the tab switching logic is generic and works with any tab IDs)

**Acceptance criteria:**
- 4 tabs render in order: Ozellikler, Yorumlar, Tedarikci, Aciklama
- Active underline and tab switching still work
- First tab (Ozellikler) is active by default
- No TypeScript errors

---

##### Task F19: Create AttributesTabContent component [FRONTEND]

**File:** `src/components/product/AttributesTabContent.ts` (new file)

**What to do:**
1. Create a new file that imports sub-section renderers and composes them
2. Export `AttributesTabContent(): string` that renders:
   ```html
   <div class="py-6">
     ${KeyAttributes()}
     ${PackagingDelivery()}
   </div>
   ```
3. For now (Phase A), include only Key Attributes and Packaging & Delivery. Lead Time and Customization will be added in Phase B.
4. `KeyAttributes()` renders the 4-column table from `mockProduct.specs`:
   - Heading: "Temel Ozellikler"
   - Pair specs 2 per row: `[key1 | val1 | key2 | val2]`
   - If odd number, last row has only left 2 cells
5. `PackagingDelivery()` renders the same 4-column table from `mockProduct.packagingSpecs`:
   - Heading: "Paketleme ve Teslimat"
   - Same table structure

**Acceptance criteria:**
- Key Attributes table shows 5 rows (10 specs, 2 per row)
- Packaging table shows 2 rows (3 specs, last row has 1 pair + empty cells)
- Tables use `.pd-attrs-table`, `.pd-attrs-key`, `.pd-attrs-val` CSS classes
- No TypeScript errors

---

##### Task L7: Add mock data for packagingSpecs [LOGIC]

**Files:** `src/types/product.ts`, `src/data/mockProduct.ts`

**What to do:**
1. In `src/types/product.ts`:
   - Add `PackagingSpec` interface: `{ key: string; value: string; }` (can reuse `ProductSpec` type alias, or define separately for clarity)
   - Add `packagingSpecs: ProductSpec[];` to `ProductDetail` interface

2. In `src/data/mockProduct.ts`:
   - Add `packagingSpecs` array:
     ```typescript
     packagingSpecs: [
       { key: 'Satis Birimi', value: 'Tek parca / Paket' },
       { key: 'Paket Boyutu', value: '10cm x 8cm x 3cm' },
       { key: 'Brut Agirlik', value: '25g' },
     ],
     ```

**Acceptance criteria:**
- TypeScript compiles
- `mockProduct.packagingSpecs` accessible and typed correctly

---

##### Task L8: Add CSS for 4-column attribute tables and section headings [LOGIC]

**File:** `src/style.css`

**What to do:**
Add the following CSS rules in the Product Tabs section (after the existing `#pd-hero-left #product-tabs-section` block, around line 1271):

```css
/* Section heading for Attributes tab sub-sections */
.pd-section-heading {
    font-size: 16px;
    font-weight: 700;
    color: var(--pd-title-color, #111827);
    margin-bottom: 12px;
}

/* 4-column attribute table (key | value | key | value) */
.pd-attrs-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    border: 1px solid var(--pd-spec-border, #e5e5e5);
}

.pd-attrs-table td {
    padding: 10px 14px;
    border-bottom: 1px solid var(--pd-spec-border, #e5e5e5);
}

.pd-attrs-table tr:last-child td {
    border-bottom: none;
}

.pd-attrs-key {
    color: var(--pd-spec-key-color, #6b7280);
    width: 18%;
    background: var(--pd-spec-header-bg, #f9fafb);
    border-right: 1px solid var(--pd-spec-border, #e5e5e5);
}

.pd-attrs-val {
    color: var(--pd-spec-value-color, #111827);
    font-weight: 600;
    width: 32%;
    border-right: 1px solid var(--pd-spec-border, #e5e5e5);
}

.pd-attrs-val:last-child {
    border-right: none;
}

/* Spacing between sub-sections in Attributes tab */
.pd-attrs-section {
    margin-bottom: 32px;
}

.pd-attrs-section:last-child {
    margin-bottom: 0;
}
```

**Acceptance criteria:**
- Tables render with proper 4-column layout
- Key columns have gray background, value columns white
- Borders between all cells
- No build errors

---

##### Task F20: Wire AttributesTabContent into barrel export and ProductTabs [FRONTEND]

**Files:** `src/components/product/index.ts`, `src/components/product/ProductTabs.ts`

**What to do:**
1. In `src/components/product/index.ts`: add `export { AttributesTabContent } from './AttributesTabContent';`
2. In `ProductTabs.ts`: import `AttributesTabContent` from `'./AttributesTabContent'` and use it in the tabs array (as specified in F18)

**Note:** This task should be done together with or after F18 and F19, as it wires the pieces together.

**Acceptance criteria:**
- "Ozellikler" tab renders the AttributesTabContent
- Tab switching works for all 4 tabs
- No TypeScript errors

---

##### Task Q10: QA for Phase A (tab bar + key attributes + packaging) [QA]

**Verification checklist:**

Tab bar:
- [ ] 4 tabs render: Ozellikler, Yorumlar, Tedarikci, Aciklama
- [ ] "Ozellikler" is active by default with underline indicator
- [ ] Tab switching works (click each tab, content panel changes)
- [ ] Sticky tab bar behavior still works on scroll

Key Attributes:
- [ ] Heading "Temel Ozellikler" displays
- [ ] 4-column table with 5 rows (10 specs paired)
- [ ] Key columns have gray background, value columns have bold text
- [ ] Light borders between all cells
- [ ] Last row handles even number of specs correctly

Packaging & Delivery:
- [ ] Heading "Paketleme ve Teslimat" displays
- [ ] 4-column table with correct data (Satis Birimi, Paket Boyutu, Brut Agirlik)
- [ ] Last row with odd spec count shows empty right cells

Build:
- [ ] `npx vite build` succeeds with zero errors
- [ ] No console errors

---

#### Phase B Tasks

##### Task L9: Add mock data for leadTimeRanges and customizationOptions [LOGIC]

**Files:** `src/types/product.ts`, `src/data/mockProduct.ts`

**What to do:**
1. In `src/types/product.ts`, add:
   ```typescript
   export interface LeadTimeRange {
     qtyLabel: string;
     days: string;
   }

   export interface CustomizationOption {
     label: string;
     priceAddon: string;
     minOrder: string;
   }
   ```
2. Add to `ProductDetail`:
   ```typescript
   leadTimeRanges: LeadTimeRange[];
   customizationOptions: CustomizationOption[];
   ```
3. In `src/data/mockProduct.ts`, add:
   ```typescript
   leadTimeRanges: [
     { qtyLabel: '1 - 10', days: '7 gun' },
     { qtyLabel: '11 - 100', days: '20 gun' },
     { qtyLabel: '101 - 2000', days: '45 gun' },
     { qtyLabel: '> 2000', days: 'Pazarlik yapilacak' },
   ],
   customizationOptions: [
     { label: 'Malzeme', priceAddon: '+$0.50/adet', minOrder: 'Min. siparis: 50 adet' },
     { label: 'Logo Baski', priceAddon: '+$0.30/adet', minOrder: 'Min. siparis: 100 adet' },
     { label: 'Ozel Ambalaj', priceAddon: '+$0.20/adet', minOrder: 'Min. siparis: 200 adet' },
   ],
   ```

**Acceptance criteria:**
- TypeScript compiles
- New fields accessible on `mockProduct`

---

##### Task F21: Add Lead Time collapsible section to AttributesTabContent [FRONTEND]

**File:** `src/components/product/AttributesTabContent.ts`

**What to do:**
1. Add a `LeadTime()` renderer function:
   - Heading: "Teslim Suresi" with a clickable chevron icon (collapse/expand)
   - Table showing quantity ranges as columns, lead time values in second row
   - Table starts collapsed (hidden) by default
2. Add the section after PackagingDelivery in `AttributesTabContent()`
3. Add a simple init function `initLeadTimeToggle()` that toggles the table visibility on heading click

**HTML pattern:**
```html
<div class="pd-attrs-section">
  <button type="button" id="pd-lead-time-toggle" class="pd-section-heading pd-collapsible-heading">
    Teslim Suresi
    <svg class="pd-chevron" ...>...</svg>
  </button>
  <div id="pd-lead-time-body" class="hidden">
    <table class="pd-attrs-table">
      <thead>
        <tr>
          <th>Miktar (adet)</th>
          <th>1 - 10</th>
          <th>11 - 100</th>
          ...
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Teslim suresi (gun)</td>
          <td>7 gun</td>
          <td>20 gun</td>
          ...
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

**Acceptance criteria:**
- Lead Time section appears below Packaging & Delivery
- Heading click toggles table visibility
- Chevron rotates on expand/collapse
- Table shows all quantity ranges and lead times
- No TypeScript errors

---

##### Task F22: Add Customization Options section to AttributesTabContent [FRONTEND]

**File:** `src/components/product/AttributesTabContent.ts`

**What to do:**
1. Add a `CustomizationOptions()` renderer function:
   - Heading: "Ozellestirme Secenekleri"
   - Each option as a row: label + price addon text + min order text
   - "Detaylari Gor" link per option
   - "Sohbet Baslat" button (outline style) at bottom
2. Add after the Lead Time section in `AttributesTabContent()`

**HTML pattern:**
```html
<div class="pd-attrs-section">
  <h3 class="pd-section-heading">Ozellestirme Secenekleri</h3>
  <div class="pd-custom-options">
    <div class="pd-custom-option">
      <div class="pd-custom-option-info">
        <span class="pd-custom-option-label">Malzeme</span>
        <span class="pd-custom-option-price">+$0.50/adet</span>
        <span class="pd-custom-option-min">(Min. siparis: 50 adet)</span>
      </div>
      <a href="#" class="pd-custom-option-link">Detaylari Gor</a>
    </div>
    <!-- more options -->
  </div>
  <button type="button" class="pd-cta-outline mt-4">Sohbet Baslat</button>
</div>
```

**Acceptance criteria:**
- 3 customization options display with correct data
- Each has label, price, min order, and "Detaylari Gor" link
- "Sohbet Baslat" button at bottom
- No TypeScript errors

---

##### Task L10: Add CSS for Lead Time and Customization sections [LOGIC]

**File:** `src/style.css`

**What to do:**
Add CSS for collapsible heading and customization options:

```css
/* Collapsible section heading */
.pd-collapsible-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin-bottom: 12px;
}

.pd-collapsible-heading .pd-chevron {
    width: 20px;
    height: 20px;
    transition: transform 0.2s;
    color: var(--pd-spec-key-color, #6b7280);
}

.pd-collapsible-heading.expanded .pd-chevron {
    transform: rotate(180deg);
}

/* Lead time table header cells */
.pd-attrs-table th {
    padding: 10px 14px;
    font-size: 13px;
    font-weight: 600;
    color: var(--pd-spec-key-color, #6b7280);
    background: var(--pd-spec-header-bg, #f9fafb);
    border-bottom: 1px solid var(--pd-spec-border, #e5e5e5);
    border-right: 1px solid var(--pd-spec-border, #e5e5e5);
    text-align: left;
}

.pd-attrs-table th:last-child {
    border-right: none;
}

/* Customization options */
.pd-custom-options {
    display: flex;
    flex-direction: column;
    gap: 0;
}

.pd-custom-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid var(--pd-spec-border, #e5e5e5);
    font-size: 13px;
}

.pd-custom-option:last-child {
    border-bottom: none;
}

.pd-custom-option-info {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
}

.pd-custom-option-label {
    font-weight: 600;
    color: var(--pd-spec-value-color, #111827);
}

.pd-custom-option-price {
    color: var(--pd-spec-value-color, #111827);
}

.pd-custom-option-min {
    color: var(--pd-spec-key-color, #6b7280);
}

.pd-custom-option-link {
    color: var(--pd-breadcrumb-link-color, #cc9900);
    font-size: 13px;
    white-space: nowrap;
}

.pd-custom-option-link:hover {
    text-decoration: underline;
}
```

**Acceptance criteria:**
- Collapsible heading has chevron that rotates
- Lead time table has header row styling
- Customization options have proper layout
- No build errors

---

##### Task F23: Add init function for Lead Time toggle [FRONTEND]

**Files:** `src/components/product/AttributesTabContent.ts`, `src/components/product/ProductTabs.ts` or `src/product-detail.ts`

**What to do:**
1. Export `initAttributesTab(): void` from `AttributesTabContent.ts` that sets up the lead time toggle:
   ```typescript
   export function initAttributesTab(): void {
     const toggle = document.getElementById('pd-lead-time-toggle');
     const body = document.getElementById('pd-lead-time-body');
     if (toggle && body) {
       toggle.addEventListener('click', () => {
         body.classList.toggle('hidden');
         toggle.classList.toggle('expanded');
       });
     }
   }
   ```
2. Call `initAttributesTab()` from `product-detail.ts` init sequence (after `initProductTabs()`)
3. Add to barrel export in `index.ts`

**Acceptance criteria:**
- Lead time section toggles on click
- Chevron rotates when expanded
- No console errors

---

##### Task Q11: QA for Phase B (lead time + customization) [QA]

**Verification checklist:**

Lead Time:
- [ ] Section appears below Packaging & Delivery
- [ ] Starts collapsed (table hidden)
- [ ] Click heading expands/collapses table
- [ ] Chevron rotates on expand/collapse
- [ ] Table shows 4 quantity columns with lead time values
- [ ] "Pazarlik yapilacak" text displays for >2000

Customization:
- [ ] Section appears below Lead Time
- [ ] 3 options display: Malzeme, Logo Baski, Ozel Ambalaj
- [ ] Each shows price addon and min order
- [ ] "Detaylari Gor" links are present
- [ ] "Sohbet Baslat" button at bottom

Build:
- [ ] `npx vite build` succeeds with zero errors
- [ ] No console errors

---

#### Phase C Tasks

##### Task L11: Add mock data for review enhancements [LOGIC]

**Files:** `src/types/product.ts`, `src/data/mockProduct.ts`

**What to do:**
1. In `src/types/product.ts`:
   - Add to `ProductReview`: `verified?: boolean;`, `repeatBuyer?: boolean;`, `supplierReply?: string;`
   - Add `ReviewCategoryRating` interface: `{ label: string; score: number; }`
   - Add `ReviewMentionTag` interface: `{ label: string; count: number; }`
   - Add to `ProductDetail`: `reviewCategoryRatings: ReviewCategoryRating[];`, `storeReviewCount: number;`, `reviewMentionTags: ReviewMentionTag[];`

2. In `src/data/mockProduct.ts`:
   - Add `verified`, `repeatBuyer`, `supplierReply` to existing review entries
   - Add `reviewCategoryRatings`, `storeReviewCount`, `reviewMentionTags` to `mockProduct`

**Acceptance criteria:**
- TypeScript compiles
- All new fields accessible on `mockProduct`
- Existing review data preserved with new optional fields added

---

##### Task F24: Redesign ProductReviews component [FRONTEND]

**File:** `src/components/product/ProductReviews.ts`

**What to do:**
Complete rewrite of `ProductReviews()` to match Alibaba design:
1. Sub-tabs: "Urun Yorumlari (X)" | "Magaza Yorumlari (Y)"
2. Rating summary: large score, stars, satisfaction label, category bars
3. Filter row: "Hepsi" pill, "Fotografli/Videolu" pill, "Puan" dropdown, "Sirala" dropdown
4. Mention tags row
5. Redesigned review cards with anonymized names, badges, supplier replies
6. "Tumunu Goster" button at bottom

**Key sub-functions:**
- `anonymizeName(name: string)`: "Ahmet Y." -> "A***t Y."
- `renderReviewSubTabs()`: sub-tab navigation
- `renderRatingSummary()`: large score + category bars
- `renderFilterRow()`: pill buttons + dropdowns
- `renderMentionTags()`: tag pills
- `renderReviewCard(review)`: redesigned card
- `renderShowAllButton()`: "Tumunu Goster"

**Acceptance criteria:**
- All visual sections render correctly
- Sub-tabs show correct counts
- Rating bars display with correct percentages
- Review cards show badges, anonymized names, supplier replies
- "Tumunu Goster" button displays

---

##### Task F25: Update initReviews for new interactive elements [FRONTEND]

**File:** `src/components/product/ProductReviews.ts`

**What to do:**
Update `initReviews()` to handle:
1. Sub-tab switching (product vs store reviews)
2. Filter pill toggling
3. "Helpful" button clicks (existing, keep working)
4. "Tumunu Goster" button (no-op for now, or show all hidden reviews)

**Acceptance criteria:**
- Sub-tab switching works
- Filter pills toggle active state
- Helpful buttons still work
- No console errors

---

##### Task L12: Add CSS for redesigned reviews [LOGIC]

**File:** `src/style.css`

**What to do:**
Add CSS for review sub-tabs, category bars, filter pills, mention tags, review card badges, supplier reply section, and "Tumunu Goster" button.

**Acceptance criteria:**
- All new review sections styled correctly
- Badges (Dogrulanmis, Tekrar Alici) have correct colors
- Category progress bars render
- No build errors

---

##### Task Q12: QA for Phase C (reviews redesign) [QA]

**Verification checklist:**
- [ ] Sub-tabs display with correct counts
- [ ] Rating summary shows large score, stars, category bars
- [ ] Filter pills and sort dropdowns render
- [ ] Mention tags display
- [ ] Review cards show anonymized names, badges, supplier replies
- [ ] "Tumunu Goster" button displays
- [ ] Helpful buttons work
- [ ] No build errors, no console errors

---

#### Phase D Tasks

##### Task F26: Update CompanyProfile for Supplier tab [FRONTEND]

**File:** `src/components/product/CompanyProfile.ts`

**What to do:**
- Add a "Tedarikciyi Tani" header banner at top
- Minor visual adjustments to match Alibaba reference more closely
- Keep existing functionality

**Acceptance criteria:**
- "Tedarikciyi Tani" banner at top of supplier tab
- Existing content preserved
- No TypeScript errors

---

##### Task Q13: QA for Phase D (supplier tab) [QA]

**Verification checklist:**
- [ ] "Tedarikci" tab shows supplier content
- [ ] Header banner displays
- [ ] All existing content renders correctly
- [ ] No build errors

---

### 14.7 Dependency Graph

```
PHASE A:
  L7 (packaging mock data) ──┐
  L8 (CSS for tables)  ──────┤
                               ├──> F19 (AttributesTabContent) ──> F20 (wiring) ──> F18 (tab config) ──> Q10
                               │
PHASE B:
  L9 (lead time + custom mock) ──> F21 (lead time) ──> F22 (customization) ──> F23 (init) ──> Q11
  L10 (CSS for B) ────────────────────────────────────────────────────────────────────────────┘

PHASE C:
  L11 (review mock data) ──> F24 (reviews redesign) ──> F25 (init reviews) ──> Q12
  L12 (review CSS) ────────────────────────────────────────────────────────────┘

PHASE D:
  F26 (supplier update) ──> Q13
```

**Cross-phase dependencies:**
- Phase B depends on Phase A completion (F21-F22 add to `AttributesTabContent` created in F19)
- Phase C is independent of A and B (different component files)
- Phase D is independent of all others

**Parallel opportunities within phases:**
- Phase A: L7, L8 can run in parallel; F19 depends on both
- Phase B: L9, L10 can run in parallel; F21 depends on L9
- Phase C: L11, L12 can run in parallel; F24 depends on L11

### 14.8 Files Modified / Created

| File | Action | Phase | Owner | Description |
|------|--------|-------|-------|-------------|
| `src/types/product.ts` | Modified | A,B,C | LOGIC | Add PackagingSpec type reuse, LeadTimeRange, CustomizationOption, review types |
| `src/data/mockProduct.ts` | Modified | A,B,C | LOGIC | Add packagingSpecs, leadTimeRanges, customizationOptions, review enhancements |
| `src/style.css` | Modified | A,B,C | LOGIC | Add table CSS, collapsible heading, customization, review styles |
| `src/components/product/AttributesTabContent.ts` | **Created** | A | FRONTEND | Composed attributes tab: key attrs + packaging + lead time + customization |
| `src/components/product/ProductTabs.ts` | Modified | A | FRONTEND | Rename tabs, reorder, import AttributesTabContent |
| `src/components/product/index.ts` | Modified | A | FRONTEND | Add barrel exports |
| `src/components/product/ProductReviews.ts` | Modified | C | FRONTEND | Complete redesign |
| `src/components/product/CompanyProfile.ts` | Modified | D | FRONTEND | Add supplier banner |
| `src/product-detail.ts` | Modified | B | FRONTEND | Add initAttributesTab() call |

### 14.9 Risk Assessment

**Risk: Medium.** This is a large multi-phase feature touching many files. Key risks:
1. **Phase A** is low risk -- new component file, tab config changes, additive CSS
2. **Phase B** is low risk -- extends Phase A component, new mock data
3. **Phase C** is medium risk -- complete rewrite of ProductReviews with many new interactive elements
4. **Phase D** is low risk -- minor changes to existing component

**Mitigation:** Phased delivery means each phase can be verified independently. Phase C (reviews) is the riskiest and can be deferred if earlier phases take longer than expected.

**Rollback per phase:**
- Phase A: Revert tab config, delete `AttributesTabContent.ts`, remove CSS
- Phase B: Remove lead time + customization from `AttributesTabContent`, revert mock data
- Phase C: Restore original `ProductReviews.ts` from git
- Phase D: Restore original `CompanyProfile.ts` from git
- Phase E: Restore `ProductReviews.ts` from Phase C state, delete `LoginModal.ts` and `ReviewsModal.ts`, remove CSS

---

## 15. Product Detail Lower Sections Redesign — Phase E (Reviews: Dual-Tab Layout, Interactive Filters, All-Reviews Modal, Login Popup)

**Date:** 2026-02-18
**Status:** Active (Revised)
**Revision:** 2 (revised per PO clarification: separate Product/Store tab layouts)
**Scope:** Restructure the Reviews section so the Product Reviews tab and Store Reviews tab have distinct layouts. Product tab is simpler (info banner, basic filters, no mention tags, no modal). Store tab has the full Alibaba experience (all filters, mention tags, language toggle, "Tumunu Goster" modal). Both tabs share the login popup for the Helpful button auth gate.

### 15.1 Context

The Product Owner clarified that the two review sub-tabs have DIFFERENT layouts, matching Alibaba's actual product page behavior. The "Urun Yorumlari" (Product Reviews) tab has a simplified filter bar, while the "Magaza Yorumlari" (Store Reviews) tab has the full interactive experience with all filters, mention tags, and the all-reviews modal.

### 15.2 Requirements Summary (Revised)

| ID | Feature | Tab | Type |
|----|---------|-----|------|
| R1 | Product Reviews tab: info banner + "Tumu" pill + "Puan" dropdown + sort dropdown + language toggle + review cards with "Gizli yorumlari goster" link. NO photos filter, NO mention tags, NO "Tumunu Goster" button | Product | Restructure |
| R2 | Store Reviews tab: full filter bar ("Tumu" + "Fotografli/Videolu" + "Puan" dropdown + sort dropdown) + mention tags + language toggle + review cards + "Tumunu Goster" button | Store | New content (was placeholder) |
| R3 | "Tumunu Goster" opens all-reviews modal (Store tab only) | Store | New Component |
| R4 | "Gizli yorumlari goster" link on every review card (both tabs) | Both | Enhancement |
| R5 | Helpful button -> login modal auth gate | Both | New Component |
| R6 | Language toggle row on both tabs | Both | New UI |

### 15.3 Architectural Decisions

1. **Dual-panel architecture:** The `ProductReviews()` component now renders two fully distinct panel layouts — `#rv-product-panel` (simple) and `#rv-store-panel` (full). Sub-tab switching toggles visibility between them. Both panels share the same review data (`mockProduct.reviews`) but present different UI chrome around the cards.

2. **Client-side filtering:** All filtering (rating, sort, mention tags) operates on `mockProduct.reviews` in-memory. No server calls. Each panel maintains its own filter state in separate closure variables inside `initReviews()`.

3. **Review rendering reuse:** The `renderReviewCard()` function is shared across both panels and the modal. It is exported from `ProductReviews.ts` so `ReviewsModal.ts` can import it.

4. **"Gizli yorumlari goster" link:** Added to every review card in `renderReviewCard()` — a text link after the comment, before the supplier reply. Visual-only (no actual hidden content).

5. **Modal pattern:** Both modals (Reviews Modal and Login Modal) follow the same structural pattern:
   - Fixed overlay container (`position: fixed; inset: 0; z-index: 50`)
   - Semi-transparent dark backdrop (`background: rgba(0,0,0,0.5)`)
   - Centered card with close X button
   - Body scroll lock when modal is open (`document.body.style.overflow = 'hidden'`)
   - Close on backdrop click, X button click, and Escape key

6. **Auth state:** A simple `let isLoggedIn = false;` flag at the top of `initReviews()`. No real authentication — the login modal is visual-only (buttons close the modal and set `isLoggedIn = true` to simulate login).

7. **New files:**
   - `src/components/product/ReviewsModal.ts` — All-reviews overlay modal (Store tab only)
   - `src/components/product/LoginModal.ts` — Sign-in popup modal
   - Both exported from `src/components/product/index.ts`

8. **Sort logic:**
   - "En alakali" (Most relevant): sort by `helpful` count descending
   - "En yeni" (Most recent): sort by `date` descending (ISO string comparison)

9. **Rating filter:** Dropdown with options: "Tum Puanlar" (all), "5 Yildiz", "4 Yildiz", "3 Yildiz", "2 Yildiz", "1 Yildiz". Filters reviews where `Math.round(review.rating) === selectedRating`.

10. **Mention tag filter (Store tab only):** Clicking a mention tag filters reviews whose `comment` contains the tag's `label` text (case-insensitive). Clicking the active tag again deselects it (shows all reviews).

11. **Info banner (Product tab only):** Static informational text at the top of the Product Reviews panel: "Bu urun icin son bir yilda yeni puan yok. Bunun yerine onceki puanlar ve yorumlar gosteriliyor."

### 15.4 Tab Layout Specifications

#### 15.4.1 Product Reviews Tab (`#rv-product-panel`) — Simplified Layout

**Current state:** This panel has a rating summary, full filter bar (Tumu + Fotografli/Videolu + sort), mention tags, review cards, and a "Tumunu Goster" button.

**Required state (per PO):**
1. **Info banner** at top (before rating summary): gray info box with text "Bu urun icin son bir yilda yeni puan yok. Bunun yerine onceki puanlar ve yorumlar gosteriliyor."
2. **Rating summary**: keep as-is (big score, stars, category bars)
3. **Simplified filter row**: "Tumu" pill + "Puan" rating dropdown + "Sirala: En alakali" sort dropdown. NO "Fotografli/Videolu" filter pill.
4. **NO mention tags** on this tab
5. **Language toggle row**: globe icon + "Sectiginiz dilde tum yorumlar gosteriliyor" + "Orijinalini Goster" toggle
6. **Review cards** with added "Gizli yorumlari goster" link (between comment and supplier reply)
7. **NO "Tumunu Goster" button** on this tab

**HTML structure for `#rv-product-panel`:**
```html
<div id="rv-product-panel">
  <!-- Info Banner -->
  <div class="rv-info-banner">
    <svg width="16" height="16" ...info-circle icon.../>
    Bu urun icin son bir yilda yeni puan yok. Bunun yerine onceki puanlar ve yorumlar gosteriliyor.
  </div>

  <!-- Rating Summary (unchanged) -->
  <div class="rv-rating-summary">...</div>

  <!-- Simplified Filter Row: Tumu + Puan dropdown + Sort dropdown -->
  <div class="rv-filter-row">
    <button type="button" class="rv-filter-pill active" data-rv-filter="all">Tumu</button>
    <div class="rv-dropdown" id="rv-prod-rating-dropdown">
      <button type="button" class="rv-filter-pill rv-dropdown-trigger">
        Puan <svg ...chevron.../>
      </button>
      <div class="rv-dropdown-menu hidden">
        <button type="button" class="rv-dropdown-item active" data-rating="all">Tum Puanlar</button>
        <button type="button" class="rv-dropdown-item" data-rating="5">5 Yildiz</button>
        <button type="button" class="rv-dropdown-item" data-rating="4">4 Yildiz</button>
        <button type="button" class="rv-dropdown-item" data-rating="3">3 Yildiz</button>
        <button type="button" class="rv-dropdown-item" data-rating="2">2 Yildiz</button>
        <button type="button" class="rv-dropdown-item" data-rating="1">1 Yildiz</button>
      </div>
    </div>
    <div class="rv-dropdown rv-dropdown-right" id="rv-prod-sort-dropdown">
      <button type="button" class="rv-sort-btn rv-dropdown-trigger" id="rv-prod-sort-label">
        Sirala: En alakali <svg ...chevron.../>
      </button>
      <div class="rv-dropdown-menu hidden">
        <button type="button" class="rv-dropdown-item active" data-sort="relevant">En alakali</button>
        <button type="button" class="rv-dropdown-item" data-sort="recent">En yeni</button>
      </div>
    </div>
  </div>

  <!-- NO mention tags on Product tab -->

  <!-- Language Toggle -->
  <div class="rv-lang-row">
    <svg ...globe icon.../>
    <span>Sectiginiz dilde tum yorumlar gosteriliyor</span>
    <button type="button" class="rv-lang-toggle" id="rv-prod-lang-toggle">Orijinalini Goster</button>
  </div>

  <!-- Review Cards -->
  <div id="rv-prod-review-list">
    ${reviews.map(r => renderReviewCard(r)).join('')}
  </div>

  <!-- NO "Tumunu Goster" button on Product tab -->
</div>
```

---

#### 15.4.2 Store Reviews Tab (`#rv-store-panel`) — Full Alibaba Layout

**Current state:** Placeholder text "Magaza yorumlari yaklasimda..."

**Required state (per PO):**
1. **Full filter row**: "Tumu" pill + "Fotografli/Videolu (N)" pill + "Puan" rating dropdown + "Sirala: En alakali" sort dropdown
2. **Mention tag chips**: "Sik bahsedilenler:" label + clickable tag pill buttons
3. **Language toggle row**: globe icon + text + "Orijinalini Goster" toggle
4. **Review cards** with "Gizli yorumlari goster" link
5. **"Tumunu Goster" button** at bottom (opens the all-reviews modal)

**HTML structure for `#rv-store-panel`:**
```html
<div id="rv-store-panel" class="hidden">
  <!-- Full Filter Row -->
  <div class="rv-filter-row">
    <button type="button" class="rv-filter-pill active" data-rv-store-filter="all">Tumu</button>
    <button type="button" class="rv-filter-pill" data-rv-store-filter="photo">Fotografli/Videolu (${photoCount})</button>
    <div class="rv-dropdown" id="rv-store-rating-dropdown">
      <button type="button" class="rv-filter-pill rv-dropdown-trigger">
        Puan <svg ...chevron.../>
      </button>
      <div class="rv-dropdown-menu hidden">
        ...same 6 rating options with data-store-rating...
      </div>
    </div>
    <div class="rv-dropdown rv-dropdown-right" id="rv-store-sort-dropdown">
      <button type="button" class="rv-sort-btn rv-dropdown-trigger" id="rv-store-sort-label">
        Sirala: En alakali <svg ...chevron.../>
      </button>
      <div class="rv-dropdown-menu hidden">
        ...same 2 sort options with data-store-sort...
      </div>
    </div>
  </div>

  <!-- Mention Tags -->
  <div class="rv-mention-tags">
    <span style="...">Sik bahsedilenler:</span>
    ${mentionTags.map(tag => `<button type="button" class="rv-mention-tag" data-mention="${tag.label}">${tag.label} (${tag.count})</button>`).join('')}
  </div>

  <!-- Language Toggle -->
  <div class="rv-lang-row">
    <svg ...globe icon.../>
    <span>Sectiginiz dilde tum yorumlar gosteriliyor</span>
    <button type="button" class="rv-lang-toggle" id="rv-store-lang-toggle">Orijinalini Goster</button>
  </div>

  <!-- Review Cards -->
  <div id="rv-store-review-list">
    ${reviews.map(r => renderReviewCard(r)).join('')}
  </div>

  <!-- Show All Button (opens modal) -->
  <button type="button" class="rv-show-all-btn">Tumunu Goster</button>
</div>
```

---

#### 15.4.3 Review Card Enhancement — "Gizli yorumlari goster" Link + Product Thumbnail Card (R4)

**File:** `src/components/product/ProductReviews.ts` — modify `renderReviewCard()`

**A) "Gizli yorumlari goster" link:**
Add a "Gizli yorumlari goster" (Show hidden reviews) text link in each review card, placed between the comment and the supplier reply:

```html
<!-- After rv-card-comment, before supplier reply -->
<a href="#" class="rv-hidden-link" onclick="return false;">Gizli yorumlari goster</a>
```

This is a visual-only link (no actual hidden content). Uses `onclick="return false;"` to prevent navigation. Styled with muted text + hover underline.

**B) Product Thumbnail Card (Store tab + Modal only):**

The `renderReviewCard(review, showProductThumb)` function already supports a `showProductThumb` boolean parameter. When `true`, it renders a product thumbnail card inside the review card. **Critical fix required:** The current implementation incorrectly uses `mockProduct.title` and computed price from `mockProduct.priceTiers`. It must use **per-review fields** instead:

- `review.productTitle` — the title of the product this review is about
- `review.productPrice` — the price range string (e.g., "$8.50-12.00")
- `review.productImage` — image URL (placeholder/empty allowed)

**Corrected HTML for product thumbnail card:**
```html
<!-- Only rendered when showProductThumb === true AND review.productTitle exists -->
<div class="rv-product-card">
  <img class="rv-product-card-img" src="${review.productImage || ''}" alt="Ürün görseli">
  <div class="rv-product-card-info">
    <span class="rv-product-card-title">${review.productTitle}</span>
    <span class="rv-product-card-price">${review.productPrice}</span>
  </div>
  <a class="rv-product-card-link" href="javascript:void(0)">Ürün detaylarını gör ›</a>
</div>
```

**CSS:** Already implemented — `.rv-product-card`, `.rv-product-card-img`, `.rv-product-card-info`, `.rv-product-card-title`, `.rv-product-card-price`, `.rv-product-card-link` classes exist in `style.css`.

**Where `showProductThumb = true` must be passed:**
1. Store tab initial render: `renderReviewCard(r, true)` — already done
2. Store tab filter re-render in `applyStoreFilters()` — needs fix
3. ReviewsModal initial render — needs fix (currently `renderReviewCard(r)` defaults to `false`)
4. ReviewsModal filter re-render — needs fix

**Data model:** `ProductReview` interface already has `productTitle?: string`, `productPrice?: string`, `productImage?: string` fields. Mock data already has all 6 reviews populated with these values. **No [LOGIC] data task needed.**

---

#### 15.4.4 Reviews Modal (R3) — Store Tab Only

**File:** `src/components/product/ReviewsModal.ts` (NEW)


**Exports:**
- `ReviewsModal(): string` — returns modal HTML (hidden by default)
- `initReviewsModal(): void` — opens/closes modal, manages filter state inside modal

**Key clarification:** This modal is triggered ONLY from the Store Reviews tab's "Tumunu Goster" button. The Product Reviews tab does NOT have this button.

**HTML structure:**
```html
<div id="rv-modal-overlay" class="rv-modal-overlay hidden">
  <div class="rv-modal-backdrop"></div>
  <div class="rv-modal-container">
    <div class="rv-modal-header">
      <h2 class="rv-modal-title">Magaza Yorumlari (${storeReviewCount})</h2>
      <button type="button" class="rv-modal-close" id="rv-modal-close">
        <svg ...X icon.../>
      </button>
    </div>
    <div class="rv-modal-body">
      <!-- Full filter bar (mirrors Store tab) -->
      <div class="rv-filter-row">
        <button type="button" class="rv-filter-pill active" data-rv-modal-filter="all">Tumu</button>
        <button type="button" class="rv-filter-pill" data-rv-modal-filter="photo">Fotografli/Videolu (N)</button>
        <div class="rv-dropdown" id="rv-modal-rating-dropdown">
          ...rating dropdown (data-modal-rating)...
        </div>
        <div class="rv-dropdown rv-dropdown-right" id="rv-modal-sort-dropdown">
          ...sort dropdown (data-modal-sort)...
        </div>
      </div>

      <!-- Mention tags -->
      <div class="rv-mention-tags">
        <span style="...">Sik bahsedilenler:</span>
        ${mentionTags as buttons with data-modal-mention}
      </div>

      <!-- Language toggle -->
      <div class="rv-lang-row">
        <svg ...globe.../>
        <span>Sectiginiz dilde tum yorumlar gosteriliyor</span>
        <button type="button" class="rv-lang-toggle" id="rv-modal-lang-toggle">Orijinalini Goster</button>
      </div>

      <!-- All review cards (showProductThumb = true for Store reviews) -->
      <div id="rv-modal-review-list">
        ${reviews.map(r => renderReviewCard(r, true)).join('')}
      </div>
    </div>
  </div>
</div>
```

**Modal behaviors:**
- Opens when Store tab's "Tumunu Goster" button is clicked
- Body scroll locked while open
- Closes on X button, backdrop click, or Escape key
- Internal filters work independently from both main-page tabs
- Scrollable body, fixed header
- Helpful buttons inside modal respect login gate

---

#### 15.4.5 Login Modal (R5)

**File:** `src/components/product/LoginModal.ts` (NEW)

**Exports:**
- `LoginModal(): string` — returns login modal HTML (hidden by default)
- `showLoginModal(): void` — shows the modal
- `hideLoginModal(): void` — hides the modal

**HTML structure:** (unchanged from previous spec — same login UI)
```html
<div id="rv-login-overlay" class="rv-modal-overlay hidden">
  <div class="rv-modal-backdrop"></div>
  <div class="rv-login-modal">
    <button type="button" class="rv-modal-close" id="rv-login-close">
      <svg ...X icon.../>
    </button>
    <div class="rv-login-banner">
      Ilk siparisiniizde <span style="color: #ef4444; font-weight: 700;">UCRETSIZ kargo</span>
    </div>
    <h2 class="rv-login-title">Giris Yap</h2>
    <p class="rv-login-subtitle">Son giris yonteminizi kullanin</p>
    <div class="rv-login-buttons">
      <button type="button" class="rv-login-btn" data-provider="google">Google ile devam et</button>
      <button type="button" class="rv-login-btn" data-provider="facebook">Facebook ile devam et</button>
      <button type="button" class="rv-login-btn" data-provider="linkedin">LinkedIn ile devam et</button>
      <button type="button" class="rv-login-btn" data-provider="email">E-posta ile devam et</button>
    </div>
    <p class="rv-login-register">TradeHub'da yeni misiniz? <a href="#">Hesap olustur</a></p>
    <p class="rv-login-qr">QR kod ile giris yap</p>
  </div>
</div>
```

**Behaviors:**
- Auth gate: `let isLoggedIn = false;` in `initReviews()` closure
- Clicking any `.rv-helpful-btn` (in either tab OR in modal) when `!isLoggedIn` opens the login modal
- Clicking any login button sets `isLoggedIn = true` and closes the modal
- After "login", helpful button clicks work normally (increment + voted class)
- Closes on X button, backdrop click, Escape key
- Login modal has `z-index: 60` to layer above reviews modal (`z-index: 50`)

---

### 15.5 CSS Specifications

**File:** `src/style.css`

New CSS rules to add under a `/* REVIEWS PHASE E — Filters, Modals, Login */` comment. All rules are the same as previously specified, PLUS these additions:

**New CSS for info banner (Product tab only):**
```css
/* Info banner for Product Reviews tab */
.rv-info-banner {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 12px 16px;
    background: var(--pd-spec-header-bg, #f9fafb);
    border: 1px solid var(--pd-spec-border, #e5e5e5);
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 13px;
    color: var(--pd-rating-text-color, #6b7280);
    line-height: 1.5;
}

.rv-info-banner svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: var(--pd-rating-text-color, #6b7280);
}
```

**New CSS for "Gizli yorumlari goster" link:**
```css
/* Hidden reviews link */
.rv-hidden-link {
    display: inline-block;
    font-size: 13px;
    color: var(--pd-breadcrumb-link-color, #cc9900);
    text-decoration: none;
    margin-bottom: 12px;
}

.rv-hidden-link:hover {
    text-decoration: underline;
}
```

All other CSS rules (dropdowns, mention tag active state, language toggle, modal overlay, reviews modal, login modal) remain exactly as specified in the previous revision. See task L14 in `task.md` for the complete CSS listing.

---

### 15.6 Integration Points

Same as previous revision:
- `src/components/product/index.ts`: barrel exports for `ReviewsModal`, `initReviewsModal`, `LoginModal`, `showLoginModal`, `hideLoginModal`
- `src/product-detail.ts`: import + render + init both modals

---

### 15.7 Task Breakdown (Revised)

**Tasks changed from previous revision:**

| Task | Change |
|------|--------|
| L14 | ADD `.rv-info-banner` and `.rv-hidden-link` CSS rules. Product card CSS already exists. |
| F27 | SPLIT into F27a (Product tab) and F27b (Store tab) for clarity |
| F27b | ADD: Fix `renderReviewCard` to use per-review `productTitle`/`productPrice`/`productImage` instead of `mockProduct` globals |
| F28 | Clarify modal is Store-tab-only. ADD: Pass `showProductThumb = true` in `renderReviewCard` calls |
| L15 | SPLIT into L15a (Product tab logic) and L15b (Store tab logic) for clear scoping |
| L15b | ADD: Pass `showProductThumb = true` in Store tab filter re-renders |
| Q14 | ADD Product vs Store tab distinction + product thumbnail card verification to QA checklist |

See `task.md` for the full updated task assignments.

---

### 15.8 Dependency Graph (Revised)

```
L14 (CSS: dropdowns, modals, login, info banner, hidden link) ──┐
                                                                   │
                    ┌──────────────────────────────────────────────┤
                    │                                              │
                    ├──> F27a (Product tab HTML restructure)       │
                    │       │                                      │
                    │       └──> L15a (Product tab filter logic)   │
                    │                                              │
                    ├──> F27b (Store tab HTML: full panel)         │
                    │       │                                      │
                    │       └──> L15b (Store tab filter logic)     │
                    │                                              │
                    ├──> F28 (ReviewsModal — Store only)  ──┐     │
                    │                                        ├──> F30 (wiring)
                    ├──> F29 (LoginModal)  ─────────────────┘     │
                    │                                              │
                    └──────────────────────────────────────────────┴──> Q14 (full QA)
```

**Parallel opportunities:**
- L14 starts immediately
- F27a, F27b, F28, F29 can all run in parallel after L14 (different scopes)
- L15a depends on F27a; L15b depends on F27b + F29
- F30 depends on F28 + F29
- Q14 depends on everything

---

### 15.9 Files Modified / Created

| File | Action | Owner | Description |
|------|--------|-------|-------------|
| `src/style.css` | Modified | LOGIC | Add ~220 lines: dropdown, modal, login modal, info banner, hidden link CSS |
| `src/components/product/ProductReviews.ts` | Modified | FRONTEND + LOGIC | Restructure both panels (F27a/F27b), add hidden link to card (F27a), export `renderReviewCard`, rewrite `initReviews()` with dual-panel logic (L15a/L15b) |
| `src/components/product/ReviewsModal.ts` | **Created** | FRONTEND | Store-reviews overlay modal |
| `src/components/product/LoginModal.ts` | **Created** | FRONTEND | Sign-in popup modal |
| `src/components/product/index.ts` | Modified | FRONTEND | Barrel exports |
| `src/product-detail.ts` | Modified | FRONTEND | Import + render + init modals |

### 15.10 Risk Assessment

**Risk: Medium-High.** This phase has dual-panel complexity (two different layouts sharing one component file) and two modal components.

Key risks:
1. **Dual-panel filter state** — Product and Store tabs have independent filter states inside `initReviews()`. Must use scoped selectors (e.g., `#rv-prod-rating-dropdown` vs `#rv-store-rating-dropdown`) to avoid cross-contamination.
2. **Re-rendering after filter** — `renderReviewCard` is called to re-render review lists. Must re-bind event listeners (helpful buttons) after innerHTML replacement.
3. **Modal z-index stacking** — Login modal (`z-index: 60`) must layer above reviews modal (`z-index: 50`). Body scroll lock must handle both modals.
4. **Shared `renderReviewCard`** — Exported and used in 3 places (Product panel, Store panel, ReviewsModal). Any changes to the function affect all three.

**Mitigation:**
- Use prefixed IDs (`rv-prod-*`, `rv-store-*`, `rv-modal-*`) to scope all DOM queries
- `bindHelpfulButtons(scope)` takes a parent element parameter for targeted re-binding
- Test modal stacking: Store tab -> Tumunu Goster -> modal opens -> click helpful -> login modal opens on top

---

---

## 16. Tedarikçiler Sayfası — "Source by Category" Hover Flyout Menü

**Tarih:** 2026-02-23
**Durum:** Planlandı
**Hazırlayan:** TPM Agent

---

### 16.1 Genel Bakış

Tedarikçiler sayfasındaki "Source by category" sidebar bileşeni, Alibaba tarzı hover-activated flyout menüye dönüştürülecek. Kullanıcı sol taraftaki bir kategorinin üzerine geldiğinde, sağ tarafta alt kategoriler ve/veya öne çıkan ürünler görüntülenecek.

**Hedef Davranış:**
- Sol panel: Ana kategoriler listesi (statik, her zaman görünür)
- Sağ panel (flyout): Hover edilen kategoriye ait alt kategoriler ve öne çıkan içerik
- Hover gecikmesi: ~150ms (kasıtsız hoverları önlemek için)
- Flyout kapanması: Sol panelin dışına çıkıldığında

---

### 16.2 Görev Bağımlılık Grafiği

```
Task #5 [LOGIC]  →  Task #6 [FRONTEND]  →  Task #7 [LOGIC]  →  Task #8 [QA]
(Veri yapısı)       (HTML/CSS yapısı)      (Hover event)       (Final review)
```

---

### 16.3 Task Tanımları

#### Task #5 — [LOGIC] Türkçe Kategori Veri Yapısı

**Sorumlu:** Logic Engineer
**Bağımlılık:** Yok (başlangıç noktası)

**Kabul Kriterleri:**
- TypeScript `interface` tanımları: `Category`, `SubCategory`, `FeaturedItem`
- En az 8 ana kategori, her birinde 4–8 alt kategori
- Veriler `src/data/categories.ts` dosyasında export edilecek
- Tüm kategori isimleri Türkçe olacak
- Her kategoride isteğe bağlı `featuredItems[]` alanı (öne çıkan ürün/tedarikçi)
- `icon` alanı: SVG string veya icon class adı

**Örnek Veri Yapısı:**
```typescript
interface SubCategory {
  id: string;
  name: string; // Türkçe
  href: string;
}

interface Category {
  id: string;
  name: string; // Türkçe
  icon?: string;
  subCategories: SubCategory[];
  featuredItems?: FeaturedItem[];
}
```

---

#### Task #6 — [FRONTEND] Flyout HTML/CSS Yapısı

**Sorumlu:** Frontend Engineer
**Bağımlılık:** Task #5 tamamlanmış olmalı

**Kabul Kriterleri:**
- Mevcut sidebar bileşeni yerinde korunacak, flyout overlay olarak eklenerek genişletilecek
- İki panelli layout: Sol = kategori listesi, Sağ = flyout içeriği
- Flyout paneli `position: absolute` veya `fixed`, z-index uygun şekilde ayarlanmış
- Sol panel öğeleri: ikon + kategori adı + sağ ok (→)
- Sağ flyout paneli: alt kategori grid (2–3 sütun), isteğe bağlı "Featured" bölümü
- Hover durumu için aktif kategori öğesinde `is-active` sınıfı
- CSS değişkenleri `--flyout-*` prefix ile `src/style.css`'e eklenecek
- Tailwind utility class'ları + özel CSS karışımı kullanılacak
- Flyout varsayılan olarak gizli (`opacity-0`, `pointer-events-none`), hover'da görünür

**CSS Değişkenleri:**
```
--flyout-bg: #ffffff
--flyout-border: #e5e5e5
--flyout-shadow: 0 8px 24px rgba(0,0,0,0.12)
--flyout-item-hover-bg: #fafafa
--flyout-item-color: #374151
--flyout-item-hover-color: #cc9900
--flyout-heading-color: #111827
--flyout-featured-bg: #fffbeb
```

**Bileşen Dosyası:** `src/components/suppliers/CategoryFlyout.ts` (yeni dosya)

---

#### Task #7 — [LOGIC] Hover Event Logic

**Sorumlu:** Logic Engineer
**Bağımlılık:** Task #5 ve Task #6 tamamlanmış olmalı

**Kabul Kriterleri:**
- `initCategoryFlyout()` fonksiyonu export edilecek
- Her kategori öğesine `mouseenter` / `mouseleave` event listener eklenecek
- 150ms gecikme (debounce) uygulanacak — kasıtsız hover geçişlerini önlemek için
- Aktif kategori değiştiğinde flyout içeriği güncellenecek (kategori verisi `categories.ts`'ten çekilecek)
- Flyout içeriği dinamik olarak render edilecek (innerHTML veya DOM manipulation)
- Fare flyout paneline geçtiğinde menü açık kalacak (fare panelden çıkınca kapanacak)
- Erişilebilirlik: keyboard navigation için `focusin`/`focusout` desteği (isteğe bağlı, bonus)

**Event Akışı:**
```
mouseenter(kategori) → 150ms gecikme → flyout içeriğini güncelle → flyout'u göster
mouseleave(sol panel) → flyout'u gizle (flyout panel üzerindeyse iptal et)
mouseenter(flyout) → gizleme işlemini iptal et
mouseleave(flyout) → flyout'u gizle
```

---

#### Task #8 — [QA] Final Review

**Sorumlu:** QA Engineer
**Bağımlılık:** Task #5, #6, #7 tamamlanmış olmalı

**Kabul Kriterleri:**
- Tüm ana kategorilerde hover flyout açılıyor ve doğru alt kategoriler gösteriliyor
- Hızlı hover geçişlerinde (debounce) istenmeyen flickering yok
- Flyout panel üzerinde fare tutunca menü kapanmıyor
- Sol panelin tamamen dışına çıkıldığında flyout kapanıyor
- Aktif kategori öğesi görsel olarak vurgulanıyor (is-active sınıfı)
- CSS değişkenleri doğru uygulanıyor, renk teması tutarlı
- Mobil/tablet breakpoint'lerde geri dönüş davranışı var (flyout devre dışı, accordion veya static liste)
- TypeScript derleme hatası yok (`npm run build` temiz geçiyor)
- Mevcut tedarikçiler sayfası bileşenleri bozulmamış

---

### 16.4 Dosya Değişiklikleri

| Dosya | İşlem | Sorumlu | Açıklama |
|-------|--------|---------|----------|
| `src/data/categories.ts` | Oluşturulacak | LOGIC | Türkçe kategori veri yapısı ve mock data |
| `src/components/suppliers/CategoryFlyout.ts` | Oluşturulacak | FRONTEND | Flyout HTML render + CSS değişkenleri |
| `src/components/suppliers/index.ts` | Güncellenecek | FRONTEND | Barrel export ekleme |
| `src/style.css` | Güncellenecek | FRONTEND | `--flyout-*` CSS değişkenleri (~30 satır) |
| `src/suppliers.ts` veya ilgili sayfa TS | Güncellenecek | LOGIC | `initCategoryFlyout()` import + çağrı |

---

### 16.5 Risk Değerlendirmesi

**Risk: Düşük-Orta.**

Temel riskler:
1. **Hover gecikmesi yönetimi** — Çok kısa gecikme: flickering; çok uzun: yavaş his. 150ms optimum başlangıç noktası.
2. **Flyout-panel fare çıkışı koordinasyonu** — `mouseleave` olayının yanlış tetiklenmesi flyout'u erken kapatabilir. Her iki panel için ayrı listener yönetimi gerekli.
3. **Mobil uyumluluk** — Hover, mobilde çalışmaz. Mobil için alternatif (accordion veya sayfa yönlendirmesi) planlanmalı.

**Azaltma:**
- Timer ID değişkeni ile gecikme yönetimi (`let hoverTimer: ReturnType<typeof setTimeout>`)
- Her iki panel için `mouseenter`/`mouseleave` dinleyicisi, timer iptal mekanizmasıyla
- CSS `@media (hover: none)` ile mobil geri dönüş stili

**Rollback:** Restore `ProductReviews.ts` from Phase C state, delete `ReviewsModal.ts` and `LoginModal.ts`, remove Phase E CSS block
