# Active Task: Product Info Card Layout Restructure

**Date:** 2026-02-18
**Reference:** `implementation_plan.md` Section 10
**Status:** In Progress

---

## Task Summary

Restructure the product detail page so the ProductInfo sticky sidebar starts at the same vertical level as the breadcrumb. Move Breadcrumb and ProductTitleBar inside the grid's left column.

---

## Task Assignments

### [FRONTEND] Task F10: Refactor Breadcrumb component to remove container wrapper
**Assignee:** frontend-specialist
**File:** `src/components/product/Breadcrumb.ts`
**Priority:** HIGH (blocks F11)
**Status:** Pending

**What to do:**
1. Remove the `<div class="container-boxed">` wrapper from inside the `<nav>`
2. Remove the inline `style="background: var(--pd-bg, #ffffff);"` from the `<nav>`
3. Keep `class="py-3"` and `aria-label="Breadcrumb"` on the `<nav>`

**Before:**
```html
<nav aria-label="Breadcrumb" class="py-3" style="background: var(--pd-bg, #ffffff);">
  <div class="container-boxed">
    <ol class="flex items-center gap-2 flex-wrap">...</ol>
  </div>
</nav>
```

**After:**
```html
<nav aria-label="Breadcrumb" class="py-3">
  <ol class="flex items-center gap-2 flex-wrap">...</ol>
</nav>
```

---

### [FRONTEND] Task F11: Restructure product-detail.ts HTML template
**Assignee:** frontend-specialist
**File:** `src/product-detail.ts`
**Priority:** HIGH
**Status:** Pending (blocked by F10)

**What to do:**
Replace the `<main>` content (lines 49-76) so that:
1. Remove the standalone `${Breadcrumb()}` call above the section
2. Move `${Breadcrumb()}` inside `#pd-hero-left` as the FIRST child
3. Move `${ProductTitleBar()}` inside `#pd-hero-left` as the SECOND child (before `#pd-hero-gallery`)
4. The grid `#pd-hero-grid` becomes the direct first child of `container-boxed`

**Target HTML structure:**
```html
<main>
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

  ${ProductTabs()}
</main>
```

---

### [LOGIC] Task L5: Verify and adjust CSS grid styles
**Assignee:** logic-engineer
**File:** `src/style.css` (lines 1186-1228)
**Priority:** MEDIUM (can run in parallel with F10)
**Status:** Pending

**What to do:**
1. Review existing `#pd-hero-grid` CSS to confirm it works with the new structure (breadcrumb + title inside left column)
2. Check if `#pd-title-bar { margin-bottom: 20px }` (line 1263) still provides correct spacing
3. Verify `#pd-hero-info { position: sticky; top: 80px }` is still appropriate
4. Adjust spacing/margins if needed
5. Run `npx vite build` to confirm no CSS issues

**Expected outcome:** CSS likely needs no changes, but confirm and adjust if spacing looks off.

---

### [QA] Task Q6: Visual and structural QA for layout restructure
**Assignee:** qa-engineer
**Priority:** HIGH
**Status:** Pending (blocked by F11 + L5)

**Verification checklist:**

Desktop (>=1024px):
- [ ] ProductInfo card top aligns with breadcrumb top
- [ ] Sticky card works while scrolling
- [ ] No overlap with header
- [ ] Left column order: breadcrumb -> title -> gallery -> related
- [ ] Grid columns correct at 1024px and 1280px

Mobile (<1024px):
- [ ] Stacked layout: breadcrumb -> title -> gallery -> related -> info
- [ ] No sticky behavior on mobile
- [ ] No visual regressions

Build:
- [ ] `npx vite build` succeeds with zero errors
- [ ] No console errors in browser

---

## Dependency Chain

```
F10 (Breadcrumb refactor) ──> F11 (template restructure) ──> Q6 (QA)
L5 (CSS verification) ─────────────────────────────────────> Q6 (QA)
```

F10 and L5 can run in parallel. F11 is blocked by F10. Q6 is blocked by both F11 and L5.

---
---

# Active Task: Sticky CTA Buttons Fix

**Date:** 2026-02-18
**Reference:** `implementation_plan.md` Section 11
**Status:** Ready for Assignment

---

## Task Summary

Fix the sticky product info card so that CTA buttons (Siparis Baslat, Sepete Ekle, Sohbet Baslat) are always visible and pinned at the bottom of the card when it becomes sticky on scroll. Currently, `overflow: hidden` on `.pd-sticky #product-info` clips the buttons.

---

## Root Cause

**File:** `src/style.css`, line 1522-1527

```css
.pd-sticky #product-info {
    flex: 1;
    min-height: 0;
    max-height: 100%;
    overflow: hidden;    /* <-- BUG: clips CTA buttons */
}
```

The `overflow: hidden` prevents the flex layout from showing `#pd-cta-buttons` when content exceeds the constrained height. The scrollable area (`#pd-info-scrollable`) already handles its own overflow via `overflow-y: auto`, so `overflow: hidden` on the parent is unnecessary and harmful.

---

## Task Assignments

### [FRONTEND] Task F12: Remove overflow:hidden from sticky #product-info
**Assignee:** frontend-specialist
**File:** `src/style.css` (line 1522-1527)
**Priority:** HIGH
**Status:** Pending

**What to do:**
1. In the `.pd-sticky #product-info` rule, **remove** `overflow: hidden`
2. **Add** `display: flex; flex-direction: column` to explicitly reinforce the flex context in sticky mode

**Before:**
```css
.pd-sticky #product-info {
    flex: 1;
    min-height: 0;
    max-height: 100%;
    overflow: hidden;
}
```

**After:**
```css
.pd-sticky #product-info {
    flex: 1;
    min-height: 0;
    max-height: 100%;
    display: flex;
    flex-direction: column;
}
```

**Why this works:**
- Removing `overflow: hidden` allows the flex layout to properly distribute space between `#pd-info-scrollable` (flex: 1, scrolls) and `#pd-cta-buttons` (flex-shrink: 0, pinned)
- `#pd-info-scrollable` already has `overflow-y: auto` to handle its own content scrolling
- `display: flex; flex-direction: column` ensures the height-constrained container properly lays out its children

**Acceptance criteria:**
- CTA buttons visible and pinned at bottom of sticky card at all times
- `#pd-info-scrollable` scrolls independently above the buttons
- Card respects its `max-height: calc(100vh - 150px)` constraint
- No visual regression in non-sticky state
- No horizontal overflow or layout shift
- `npx vite build` succeeds with zero errors

---

### [QA] Task Q7: Visual QA for sticky CTA buttons fix
**Assignee:** qa-engineer
**Priority:** HIGH
**Status:** Pending (blocked by F12)

**Verification checklist:**

Desktop (>=1024px) -- Sticky state:
- [ ] Scroll down until `#pd-hero-info` becomes sticky
- [ ] CTA buttons (Siparis Baslat, Sepete Ekle, Sohbet Baslat) are visible at the bottom of the card
- [ ] CTA buttons have a `border-top: 1px solid #e5e5e5` separator line above them
- [ ] Content above buttons scrolls independently
- [ ] Scrollbar is hidden but scroll works via mousewheel/touch
- [ ] Card height does not exceed viewport
- [ ] CTA buttons are clickable and not clipped

Desktop -- Non-sticky state:
- [ ] CTA buttons appear in normal content flow at the bottom of the card
- [ ] No visual change from previous non-sticky behavior

Mobile (<1024px):
- [ ] Card is not sticky on mobile
- [ ] CTA buttons display normally within the card
- [ ] No layout regression

Build:
- [ ] `npx vite build` succeeds with zero errors
- [ ] No console errors in browser

---

## Dependency Chain

```
F12 (CSS fix) ──> Q7 (Visual QA)
```

F12 has no blockers. Q7 depends on F12 completion. This is a single CSS property change with low risk.

---
---

# Active Task: CTA Buttons Repositioning — State-Dependent Placement

**Date:** 2026-02-18
**Reference:** `implementation_plan.md` Section 12
**Status:** Ready for Assignment

---

## Task Summary

Reposition CTA buttons so they appear BETWEEN the Shipping section and Trade Assurance in normal (non-sticky) state, and are pinned at the bottom of the sticky card's scroll viewport in sticky state. Pure HTML move + CSS changes, no JS modifications needed.

---

## Approach

1. Move `#pd-cta-buttons` from outside `#pd-info-scrollable` to inside it, between the Shipping `.pd-info-section` and `#pd-trade-assurance`
2. In non-sticky mode: buttons are in normal content flow with top and bottom dividers
3. In sticky mode: `position: sticky; bottom: 0` on `#pd-cta-buttons` pins them at the bottom of the scroll viewport inside `#pd-info-scrollable`

---

## Task Assignments

### [FRONTEND] Task F13: Move CTA buttons inside scrollable area in ProductInfo.ts
**Assignee:** frontend-specialist
**File:** `src/components/product/ProductInfo.ts`
**Priority:** HIGH (blocks F14 logically)
**Status:** Pending

**What to do:**
1. Cut the `#pd-cta-buttons` block (lines 182-193) from its current position (after `</div><!-- end #pd-info-scrollable -->`)
2. Paste it inside `#pd-info-scrollable`, between the Shipping `.pd-info-section` closing `</div>` (line 140) and the `<!-- Trade Assurance -->` comment (line 142)
3. Update the comment from "pinned at bottom of sticky card" to "in-flow between Shipping and Trade Assurance; sticky-pinned in sticky mode"

**Before (lines 140-194):**
```html
        </div>
        <!-- end Shipping section -->

        <!-- Trade Assurance / Order Protection -->
        <div id="pd-trade-assurance">
          ...
        </div>
      </div>
      <!-- end #pd-info-scrollable -->

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

**After:**
```html
        </div>
        <!-- end Shipping section -->

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
      <!-- end #pd-info-scrollable -->
    </div>
```

**Acceptance criteria:**
- `#pd-cta-buttons` is now a child of `#pd-info-scrollable`, between Shipping and Trade Assurance
- `#pd-cta-buttons` is NO LONGER a direct child of `#product-info`
- No changes to button content, IDs, or classes
- No TypeScript compilation errors

---

### [FRONTEND] Task F14: Update CSS for state-dependent CTA button positioning
**Assignee:** frontend-specialist
**File:** `src/style.css`
**Priority:** HIGH
**Status:** Pending (logically after F13)

**What to do:**

**1. Update `#pd-cta-buttons` base rule** (line 1796-1803):

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

Changes: remove `flex-shrink: 0`, add `border-bottom`, add `margin: 0 -20px` (counteracts `#pd-info-scrollable` padding for full-width span)

**2. Add new rule** immediately after `#pd-cta-buttons`:

```css
.pd-sticky #pd-cta-buttons {
    position: sticky;
    bottom: 0;
    z-index: 2;
    border-bottom: none;
    margin-bottom: -20px;
}
```

**3. Simplify `.pd-sticky #product-info`** (line 1522-1527):

Before (as modified by F12):
```css
.pd-sticky #product-info {
    flex: 1;
    min-height: 0;
    max-height: 100%;
    display: flex;
    flex-direction: column;
}
```

After:
```css
.pd-sticky #product-info {
    flex: 1;
    min-height: 0;
    max-height: 100%;
}
```

Remove `display: flex; flex-direction: column` since CTA buttons are no longer a direct child needing flex distribution.

**Acceptance criteria:**
- Non-sticky: buttons in content flow with top + bottom dividers, full card width
- Sticky: buttons pinned at bottom of scroll viewport, no bottom border, white bg hides content behind
- `npx vite build` succeeds with zero errors

---

### [QA] Task Q8: Visual QA for CTA button repositioning
**Assignee:** qa-engineer
**Priority:** HIGH
**Status:** Pending (blocked by F13 + F14)

**Verification checklist:**

Desktop (>=1024px) -- Non-sticky state:
- [ ] CTA buttons appear between Shipping and Trade Assurance sections
- [ ] Buttons have `border-top` above and `border-bottom` below
- [ ] Buttons span full card width (no padding gaps)
- [ ] Trade Assurance section visible below buttons
- [ ] All three buttons clickable

Desktop (>=1024px) -- Sticky state:
- [ ] Scroll until `#pd-hero-info` becomes sticky
- [ ] CTA buttons pinned at bottom of visible card area
- [ ] Content scrolls independently above buttons
- [ ] White background on buttons -- no content bleeds through
- [ ] `border-top` separator visible, NO `border-bottom`
- [ ] Card height does not exceed viewport
- [ ] All three buttons clickable in sticky mode
- [ ] Trade Assurance accessible by scrolling past buttons

Mobile (<1024px):
- [ ] Card is not sticky on mobile
- [ ] CTA buttons between Shipping and Trade Assurance in normal flow
- [ ] Both top and bottom borders visible
- [ ] No layout regression

Build:
- [ ] `npx vite build` succeeds with zero errors
- [ ] No console errors in browser

---

## Dependency Chain

```
F13 (HTML move) ──> F14 (CSS changes) ──> Q8 (Visual QA)
```

F13 has no blockers. F14 is logically sequenced after F13 (same agent, tests need HTML in place). Q8 depends on both F13 and F14.

---
---

# Active Task: Product Attributes Card — Gallery Tab Content Switching

**Date:** 2026-02-18
**Reference:** `implementation_plan.md` Section 13
**Status:** Ready for Assignment

---

## Task Summary

Create a Product Attributes card that shows product specifications (2-column grid + vertical list) in the gallery area when the user clicks the "Ozellikler" tab. Wire up tab switching to show/hide the photo gallery vs. the attributes card.

---

## Current State

- Tab buttons already rendered in `ProductImageGallery.ts`: "Fotograflar" and "Ozellikler"
- Click handler exists but only toggles CSS `active` class — no content switching
- `ProductSpec` type and 10 mock specs already available
- CSS variables `--pd-spec-*` already defined for spec styling

---

## Task Assignments

### [FRONTEND] Task F15: Create ProductAttributes component
**Assignee:** frontend-specialist
**File:** `src/components/product/ProductAttributes.ts` (new file)
**Priority:** HIGH (blocks F16)
**Status:** Pending

**What to do:**
1. Create `src/components/product/ProductAttributes.ts`
2. Import `mockProduct` from `../../data/mockProduct`
3. Export `ProductAttributes(): string` that renders:
   - Outer: `<div id="pd-attributes-card" class="hidden">` (hidden by default)
   - Grid: `<div class="pd-attr-grid">` with first 6 specs as cells (value bold on top, key gray below)
   - List: `<div class="pd-attr-list">` with remaining specs as rows (key: value horizontal)
   - Omit list section if 6 or fewer total specs
4. CSS classes: `pd-attr-cell`, `pd-attr-value`, `pd-attr-key`, `pd-attr-row`, `pd-attr-row-key`, `pd-attr-row-value`
5. Use CSS variables for colors: `--pd-spec-value-color` for values, `--pd-spec-key-color` for keys, `--pd-spec-border` for dividers

**Grid cell HTML pattern:**
```html
<div class="pd-attr-cell">
  <span class="pd-attr-value">316L Paslanmaz Celik</span>
  <span class="pd-attr-key">Malzeme</span>
</div>
```

**List row HTML pattern:**
```html
<div class="pd-attr-row">
  <span class="pd-attr-row-key">Garanti</span>
  <span class="pd-attr-row-value">2 Yil</span>
</div>
```

**Acceptance criteria:**
- Grid shows 6 cells (3 rows x 2 cols) from first 6 specs
- List shows remaining 4 specs as key-value rows
- Container has `id="pd-attributes-card"` and starts with `class="hidden"`
- No TypeScript compilation errors

---

### [FRONTEND] Task F16: Wire up ProductAttributes in product-detail.ts and barrel export
**Assignee:** frontend-specialist
**File:** `src/product-detail.ts`, `src/components/product/index.ts`
**Priority:** HIGH (blocked by F15)
**Status:** Pending

**What to do:**

1. In `src/components/product/index.ts`, add:
   ```typescript
   export { ProductAttributes } from './ProductAttributes';
   ```

2. In `src/product-detail.ts`:
   - Add `ProductAttributes` to the import from `'./components/product'`
   - Add `${ProductAttributes()}` after `${ProductImageGallery()}` inside `#pd-hero-gallery`:
     ```html
     <div id="pd-hero-gallery">
       ${ProductImageGallery()}
       ${ProductAttributes()}
     </div>
     ```

**Acceptance criteria:**
- `ProductAttributes` is exported from the barrel
- Attributes card HTML is rendered in `#pd-hero-gallery` but hidden by default
- Photo gallery still displays normally
- No TypeScript compilation errors

---

### [FRONTEND] Task F17: Update tab switching logic to show/hide gallery vs attributes
**Assignee:** frontend-specialist
**File:** `src/components/product/ProductImageGallery.ts` (lines 229-236)
**Priority:** HIGH (blocked by F16)
**Status:** Pending

**What to do:**
Replace the existing tab click handler (lines 229-236 in `initImageGallery()`) with content switching logic.

**Before (lines 229-236):**
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

**Acceptance criteria:**
- Click "Ozellikler": gallery hides, attributes card shows
- Click "Fotograflar": attributes card hides, gallery shows
- Tab active styling still works
- Gallery functionality (thumbnail hover, arrows) works after switching back
- No console errors or TypeScript compilation errors

---

### [LOGIC] Task L6: Add CSS styles for ProductAttributes card
**Assignee:** logic-engineer
**File:** `src/style.css` (after line 1508, after `.gallery-view-tab.active`)
**Priority:** HIGH (can run in parallel with F15)
**Status:** Pending

**What to do:**
Add the following CSS rules after the `.gallery-view-tab.active` block (after line 1508):

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

**No new CSS variables needed** — reuses existing `--pd-spec-header-bg`, `--pd-spec-border`, `--pd-spec-key-color`, `--pd-spec-value-color`.

**Acceptance criteria:**
- All CSS classes compile without errors
- Grid displays 2 columns with proper dividers
- List rows have horizontal dividers
- Colors use existing `--pd-spec-*` CSS variables
- `npx vite build` succeeds with zero errors

---

### [QA] Task Q9: Visual and functional QA for Attributes card
**Assignee:** qa-engineer
**Priority:** HIGH
**Status:** Pending (blocked by F15 + F16 + F17 + L6)

**Verification checklist:**

Tab switching:
- [ ] Default: "Fotograflar" active, gallery visible, attributes hidden
- [ ] Click "Ozellikler": gallery hides, attributes card appears
- [ ] Click "Fotograflar": attributes hides, gallery appears
- [ ] Gallery functionality still works after switching back to photos
- [ ] Tab pill styling correct in both states

Attributes card content:
- [ ] Grid: 6 cells (3x2) — Malzeme, Kaplama, Zincir Uzunlugu, Uc Boyutu, Agirlik, Su Gecirmezlik
- [ ] Each cell: bold value on top, gray label below
- [ ] Grid has light borders/dividers between cells
- [ ] List: 4 rows — Garanti, Sertifikalar, Mensei Ulke, Marka
- [ ] Each row: gray key (left) + dark value (right)
- [ ] List rows separated by horizontal dividers

Styling:
- [ ] Card background #f9fafb, rounded corners, subtle border
- [ ] Grid white background, rounded corners
- [ ] Colors match --pd-spec-* variables

Responsive:
- [ ] Desktop: 2-column grid correct
- [ ] Mobile: grid still readable, no overflow

Build:
- [ ] `npx vite build` succeeds with zero errors
- [ ] No TypeScript errors, no console errors

---

## Dependency Chain

```
L6 (CSS styles) ───────────────────────────────┐
                                                 ├──> Q9 (QA)
F15 (component) ──> F16 (wiring) ──> F17 (tab logic) ──┘
```

L6 and F15 can run in parallel (different files). F16 depends on F15. F17 depends on F16. Q9 depends on all tasks.

---
---

# Active Task: Product Detail Lower Sections Redesign — Phase A

**Date:** 2026-02-18
**Reference:** `implementation_plan.md` Section 14 (Phase A)
**Status:** Ready for Assignment

---

## Task Summary

Redesign the lower page sections: rename/reorder tabs to Alibaba layout (Ozellikler, Yorumlar, Tedarikci, Aciklama), create a new AttributesTabContent component with Key Attributes and Packaging & Delivery 4-column tables.

---

## Task Assignments

### [LOGIC] Task L7: Add mock data for packagingSpecs
**Assignee:** logic-engineer
**Files:** `src/types/product.ts`, `src/data/mockProduct.ts`
**Priority:** HIGH (blocks F19)
**Status:** Pending

**What to do:**
1. In `src/types/product.ts`:
   - Add `packagingSpecs: ProductSpec[];` to the `ProductDetail` interface (reuses existing `ProductSpec` type)

2. In `src/data/mockProduct.ts`:
   - Add `packagingSpecs` array to `mockProduct`:
     ```typescript
     packagingSpecs: [
       { key: 'Satis Birimi', value: 'Tek parca / Paket' },
       { key: 'Paket Boyutu', value: '10cm x 8cm x 3cm' },
       { key: 'Brut Agirlik', value: '25g' },
     ],
     ```

**Acceptance criteria:**
- TypeScript compiles
- `mockProduct.packagingSpecs` accessible and correctly typed

---

### [LOGIC] Task L8: Add CSS for 4-column attribute tables and section headings
**Assignee:** logic-engineer
**File:** `src/style.css`
**Priority:** HIGH (blocks F19 visually)
**Status:** Pending

**What to do:**
Add the following CSS rules after the `#pd-hero-left #product-tabs-section` block (around line 1271):

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

No new CSS variables needed -- reuses `--pd-spec-border`, `--pd-spec-key-color`, `--pd-spec-value-color`, `--pd-spec-header-bg`, `--pd-title-color`.

**Acceptance criteria:**
- Tables render with proper 4-column layout
- Key columns gray bg, value columns white
- Borders between all cells
- `npx vite build` succeeds

---

### [FRONTEND] Task F18: Restructure ProductTabs configuration (rename tabs, reorder)
**Assignee:** frontend-specialist
**File:** `src/components/product/ProductTabs.ts`
**Priority:** HIGH (blocked by F19 + F20)
**Status:** Pending

**What to do:**
1. Update the `tabs` array to:
   ```typescript
   const tabs: TabConfig[] = [
     { id: 'attributes', label: 'Ozellikler', content: AttributesTabContent },
     { id: 'reviews', label: 'Yorumlar', content: ProductReviews },
     { id: 'supplier', label: 'Tedarikci', content: CompanyProfile },
     { id: 'description', label: 'Aciklama', content: ProductDescription },
   ];
   ```
2. Update imports:
   - Add: `import { AttributesTabContent } from './AttributesTabContent';`
   - Remove `ProductFAQ` import (no longer used as a tab)
3. Keep `initProductTabs()` unchanged

**Acceptance criteria:**
- 4 tabs: Ozellikler, Yorumlar, Tedarikci, Aciklama
- "Ozellikler" is active by default
- Tab switching works
- No TypeScript errors

---

### [FRONTEND] Task F19: Create AttributesTabContent component
**Assignee:** frontend-specialist
**File:** `src/components/product/AttributesTabContent.ts` (new file)
**Priority:** HIGH (blocked by L7)
**Status:** Pending

**What to do:**
1. Create `src/components/product/AttributesTabContent.ts`
2. Import `mockProduct` from `../../data/mockProduct`
3. Export `AttributesTabContent(): string` that renders two sub-sections:

**KeyAttributes():**
- Heading: `<h3 class="pd-section-heading">Temel Ozellikler</h3>`
- 4-column table from `mockProduct.specs`
- Pair specs 2 per row: `[key1 | val1 | key2 | val2]`
- If odd total, last row has 2 empty cells on right

**PackagingDelivery():**
- Heading: `<h3 class="pd-section-heading">Paketleme ve Teslimat</h3>`
- Same 4-column table from `mockProduct.packagingSpecs`

**HTML pattern for table rows:**
```html
<table class="pd-attrs-table">
  <tbody>
    <tr>
      <td class="pd-attrs-key">Malzeme</td>
      <td class="pd-attrs-val">316L Paslanmaz Celik</td>
      <td class="pd-attrs-key">Kaplama</td>
      <td class="pd-attrs-val">18K Altin / PVD Kaplama</td>
    </tr>
    <!-- pair specs, 2 per row -->
  </tbody>
</table>
```

**Pairing logic:**
```typescript
function renderPairedTable(specs: ProductSpec[]): string {
  const rows: string[] = [];
  for (let i = 0; i < specs.length; i += 2) {
    const left = specs[i];
    const right = specs[i + 1];
    rows.push(`
      <tr>
        <td class="pd-attrs-key">${left.key}</td>
        <td class="pd-attrs-val">${left.value}</td>
        ${right
          ? `<td class="pd-attrs-key">${right.key}</td><td class="pd-attrs-val">${right.value}</td>`
          : `<td class="pd-attrs-key"></td><td class="pd-attrs-val"></td>`
        }
      </tr>
    `);
  }
  return rows.join('');
}
```

**Wrap each sub-section in `<div class="pd-attrs-section">`** for spacing.

**Acceptance criteria:**
- Key Attributes: 5 rows (10 specs paired), 4-column table
- Packaging: 2 rows (3 specs, last row has empty right cells)
- Correct CSS classes on all elements
- No TypeScript errors

---

### [FRONTEND] Task F20: Wire AttributesTabContent into barrel export and ProductTabs
**Assignee:** frontend-specialist
**Files:** `src/components/product/index.ts`
**Priority:** HIGH (blocked by F19)
**Status:** Pending

**What to do:**
1. In `src/components/product/index.ts`:
   ```typescript
   export { AttributesTabContent } from './AttributesTabContent';
   ```

**Acceptance criteria:**
- `AttributesTabContent` importable from barrel
- No TypeScript errors

---

### [QA] Task Q10: QA for Phase A (tab bar + key attributes + packaging)
**Assignee:** qa-engineer
**Priority:** HIGH
**Status:** Pending (blocked by F18 + F19 + F20 + L7 + L8)

**Verification checklist:**

Tab bar:
- [ ] 4 tabs: Ozellikler, Yorumlar, Tedarikci, Aciklama
- [ ] "Ozellikler" is default active tab with underline
- [ ] Tab switching works for all 4 tabs
- [ ] Sticky tab bar on scroll still works

Key Attributes (under Ozellikler tab):
- [ ] Heading "Temel Ozellikler" displays
- [ ] 4-column table with 5 rows (10 specs)
- [ ] Key columns have gray background
- [ ] Value columns have bold dark text
- [ ] Borders between all cells

Packaging & Delivery:
- [ ] Heading "Paketleme ve Teslimat" displays
- [ ] 4-column table with correct data
- [ ] Last row with odd spec count has empty right cells

Other tabs:
- [ ] "Yorumlar" tab still shows existing reviews content
- [ ] "Tedarikci" tab shows company profile
- [ ] "Aciklama" tab shows product description

Build:
- [ ] `npx vite build` succeeds
- [ ] No console errors, no TypeScript errors

---

## Phase A Dependency Chain

```
L7 (packaging mock data) ──┐
L8 (CSS for tables)  ──────┼──> F19 (AttributesTabContent) ──> F20 (wiring) ──> F18 (tab config) ──> Q10
```

L7 and L8 can run in parallel. F19 depends on L7 (needs packagingSpecs data). F20 is the barrel export. F18 restructures the tabs to use the new component. Q10 depends on everything.

---
---

# Active Task: Product Detail Lower Sections Redesign — Phase B

**Date:** 2026-02-18
**Reference:** `implementation_plan.md` Section 14 (Phase B)
**Status:** Ready for Assignment (after Phase A completes)

---

## Task Summary

Add Lead Time (collapsible table) and Customization Options sections to the AttributesTabContent component under the Ozellikler tab.

---

## Task Assignments

### [LOGIC] Task L9: Add mock data for leadTimeRanges and customizationOptions
**Assignee:** logic-engineer
**Files:** `src/types/product.ts`, `src/data/mockProduct.ts`
**Priority:** HIGH (blocks F21, F22)
**Status:** Pending

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
3. In `src/data/mockProduct.ts`:
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

### [LOGIC] Task L10: Add CSS for Lead Time and Customization sections
**Assignee:** logic-engineer
**File:** `src/style.css`
**Priority:** HIGH (can parallel with L9)
**Status:** Pending

**What to do:**
Add CSS for collapsible heading, lead time table headers, and customization options:

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
- Collapsible heading, lead time, customization all styled
- No build errors

---

### [FRONTEND] Task F21: Add Lead Time collapsible section to AttributesTabContent
**Assignee:** frontend-specialist
**File:** `src/components/product/AttributesTabContent.ts`
**Priority:** HIGH (blocked by L9)
**Status:** Pending

**What to do:**
1. Add `LeadTime(): string` renderer:
   - Heading: clickable `<button>` with "Teslim Suresi" text + chevron SVG
   - Table body (hidden by default): columns for each quantity range, row for lead times
   - Use `id="pd-lead-time-toggle"` on button, `id="pd-lead-time-body"` on table wrapper
2. Add after `PackagingDelivery()` in the composed output

**Acceptance criteria:**
- Lead Time section renders below Packaging
- Starts collapsed (hidden table)
- Correct table structure with 4 quantity columns
- No TypeScript errors

---

### [FRONTEND] Task F22: Add Customization Options section to AttributesTabContent
**Assignee:** frontend-specialist
**File:** `src/components/product/AttributesTabContent.ts`
**Priority:** HIGH (after F21)
**Status:** Pending

**What to do:**
1. Add `CustomizationOptions(): string` renderer:
   - Heading: "Ozellestirme Secenekleri"
   - Each option: label + price + min order + "Detaylari Gor" link
   - "Sohbet Baslat" button at bottom
2. Add after `LeadTime()` in the composed output

**Acceptance criteria:**
- 3 options display with correct data
- "Detaylari Gor" links present
- "Sohbet Baslat" button at bottom
- No TypeScript errors

---

### [FRONTEND] Task F23: Add init function for Lead Time toggle
**Assignee:** frontend-specialist
**Files:** `src/components/product/AttributesTabContent.ts`, `src/components/product/index.ts`, `src/product-detail.ts`
**Priority:** MEDIUM (after F21)
**Status:** Pending

**What to do:**
1. Export `initAttributesTab(): void` from `AttributesTabContent.ts`:
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
2. Add to barrel export: `export { AttributesTabContent, initAttributesTab } from './AttributesTabContent';`
3. In `src/product-detail.ts`: import and call `initAttributesTab()` after `initProductTabs()`

**Acceptance criteria:**
- Lead time toggle works (click heading expands/collapses)
- Chevron rotates
- No console errors

---

### [QA] Task Q11: QA for Phase B (lead time + customization)
**Assignee:** qa-engineer
**Priority:** HIGH
**Status:** Pending (blocked by F21 + F22 + F23 + L9 + L10)

**Verification checklist:**

Lead Time:
- [ ] Section below Packaging & Delivery
- [ ] Starts collapsed
- [ ] Click heading toggles table
- [ ] Chevron rotates
- [ ] 4 quantity columns with lead time values
- [ ] "Pazarlik yapilacak" displays for >2000

Customization:
- [ ] Section below Lead Time
- [ ] 3 options: Malzeme, Logo Baski, Ozel Ambalaj
- [ ] Price addon + min order on each
- [ ] "Detaylari Gor" links present
- [ ] "Sohbet Baslat" button at bottom

Build:
- [ ] `npx vite build` succeeds
- [ ] No console errors

---

## Phase B Dependency Chain

```
L9 (mock data)  ──┐
L10 (CSS)  ────────┼──> F21 (lead time) ──> F22 (customization) ──> F23 (init) ──> Q11
```

L9 and L10 can run in parallel. F21 depends on L9 (data). F22 follows F21 (same file). F23 follows F21. Q11 depends on all.

**Note:** Phase B depends on Phase A being complete (F19 creates the file that F21/F22 modify).

---
---

# Active Task: Product Detail Lower Sections Redesign — Phase C (Reviews Redesign)

**Date:** 2026-02-18
**Reference:** `implementation_plan.md` Section 14 (Phase C)
**Status:** Ready for Assignment

---

## Task Summary

Complete redesign of the ProductReviews component to match Alibaba's review section. Includes sub-tabs (product/store reviews), enhanced rating summary with category bars, filter row with pills and dropdowns, mention tags, redesigned review cards with anonymized names/badges/supplier replies, and a "Tumunu Goster" button.

---

## Current State

**Existing `ProductReviews.ts` provides:**
- `starIcon()`, `renderStars()` -- reusable star SVG helpers
- `getStarBreakdown()` -- computes 5-star distribution from reviews
- `countryFlag()` -- maps country codes to flag emojis
- `renderReviewCard()` -- basic card (avatar, name, date, stars, comment, helpful button)
- `ProductReviews()` -- rating summary (overall score + star breakdown bars) + review list
- `initReviews()` -- helpful button click handler

**Existing `ProductReview` type:**
```typescript
interface ProductReview {
  id: string; author: string; country: string; rating: number;
  date: string; comment: string; images?: string[]; helpful: number;
}
```

**Existing CSS variables:**
- `--pd-review-star-color: #f59e0b` (star fill)
- `--pd-review-bar-bg: #e5e5e5` (bar track)
- `--pd-review-bar-fill: #f59e0b` (bar fill)
- `--pd-rating-star-color: #f59e0b`
- `--pd-rating-text-color: #6b7280`

**Mock data:** 6 reviews in `mockProduct.reviews`, `rating: 4.7`, `reviewCount: 328`

---

## Task Assignments

### [LOGIC] Task L11: Add types and mock data for review enhancements
**Assignee:** logic-engineer
**Files:** `src/types/product.ts`, `src/data/mockProduct.ts`
**Priority:** HIGH (blocks F24)
**Status:** Pending

**What to do:**

**1. In `src/types/product.ts`:**

Add new interfaces:
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

Add new optional fields to `ProductReview`:
```typescript
export interface ProductReview {
  // ...existing fields unchanged...
  verified?: boolean;
  repeatBuyer?: boolean;
  supplierReply?: string;
  countryName?: string;
}
```

Add new fields to `ProductDetail`:
```typescript
export interface ProductDetail {
  // ...existing fields unchanged...
  reviewCategoryRatings: ReviewCategoryRating[];
  storeReviewCount: number;
  reviewMentionTags: ReviewMentionTag[];
}
```

**2. In `src/data/mockProduct.ts`:**

Add to `mockProduct`:
```typescript
reviewCategoryRatings: [
  { label: 'Tedarikci Hizmeti', score: 4.9 },
  { label: 'Zamaninda Gonderim', score: 4.6 },
  { label: 'Urun Kalitesi', score: 4.8 },
],
storeReviewCount: 151,
reviewMentionTags: [
  { label: 'Profesyonel Isbirligi', count: 1 },
  { label: 'Zamaninda Gonderim', count: 1 },
  { label: 'Iyi Tedarikci', count: 4 },
  { label: 'Kaliteli Urun', count: 3 },
  { label: 'Hizli Iletisim', count: 2 },
],
```

Add new fields to existing review entries:
```typescript
// rev-1 (Ahmet Y.)
verified: true, repeatBuyer: false, countryName: 'Turkiye',
supplierReply: 'Tesekkur ederiz! Siparislerinizi her zaman ozenle hazirliyoruz.',

// rev-2 (Maria S.)
verified: true, repeatBuyer: false, countryName: 'Almanya',

// rev-3 (Fatma K.)
verified: true, repeatBuyer: true, countryName: 'Turkiye',
supplierReply: 'Tekrar siparisleriniz icin tesekkurler. Her zaman en iyi kaliteyi sunmaya devam edecegiz.',

// rev-4 (John D.)
verified: true, repeatBuyer: false, countryName: 'ABD',

// rev-5 (Elena P.)
verified: true, repeatBuyer: true, countryName: 'Italya',
supplierReply: 'Toplu siparisleriniz icin tesekkurler! Numune gondermek bizim icin bir zevkti.',

// rev-6 (Mehmet A.)
verified: true, repeatBuyer: false, countryName: 'Turkiye',
supplierReply: 'Gecikme icin ozur dileriz. Lojistik surecimizi iyilestirdik. Bir sonraki siparisinizte %10 indirim sunuyoruz.',
```

**Acceptance criteria:**
- TypeScript compiles with zero errors
- All new fields accessible on `mockProduct`
- Existing code that reads `mockProduct.reviews` still works (new fields are optional)
- `reviewCategoryRatings`, `storeReviewCount`, `reviewMentionTags` all populated

---

### [LOGIC] Task L12: Add CSS for redesigned reviews section
**Assignee:** logic-engineer
**File:** `src/style.css`
**Priority:** HIGH (can parallel with L11)
**Status:** Pending

**What to do:**
Add the following CSS rules in a new section after the existing Product Info Card CSS. Group under a `/* Reviews Redesign */` comment header.

```css
/* ============================================================
   REVIEWS REDESIGN — Alibaba-style reviews section
   ============================================================ */

/* Sub-tabs (Urun Yorumlari | Magaza Yorumlari) */
.rv-sub-tabs {
    display: flex;
    gap: 0;
    border-bottom: 2px solid var(--pd-spec-border, #e5e5e5);
    margin-bottom: 24px;
}

.rv-sub-tab {
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 500;
    color: var(--pd-rating-text-color, #6b7280);
    background: none;
    border: none;
    cursor: pointer;
    position: relative;
    white-space: nowrap;
    transition: color 0.15s;
}

.rv-sub-tab.active {
    color: var(--pd-title-color, #111827);
    font-weight: 700;
}

.rv-sub-tab.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--pd-tab-active-border, #cc9900);
}

/* Rating summary block */
.rv-rating-summary {
    display: flex;
    gap: 32px;
    padding-bottom: 24px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--pd-spec-border, #e5e5e5);
}

.rv-rating-big {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 140px;
}

.rv-rating-number {
    font-size: 48px;
    font-weight: 800;
    line-height: 1;
    color: var(--pd-title-color, #111827);
}

.rv-rating-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--pd-review-star-color, #f59e0b);
    margin-top: 4px;
}

.rv-rating-subtitle {
    font-size: 12px;
    color: var(--pd-rating-text-color, #6b7280);
    margin-top: 6px;
    text-align: center;
}

/* Category rating bars (Tedarikci Hizmeti, etc.) */
.rv-category-bars {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
}

.rv-category-row {
    display: flex;
    align-items: center;
    gap: 10px;
}

.rv-category-label {
    font-size: 13px;
    color: var(--pd-rating-text-color, #6b7280);
    min-width: 140px;
    flex-shrink: 0;
}

.rv-category-bar-track {
    flex: 1;
    height: 6px;
    border-radius: 3px;
    background: var(--pd-review-bar-bg, #e5e5e5);
    overflow: hidden;
}

.rv-category-bar-fill {
    height: 100%;
    border-radius: 3px;
    background: var(--pd-review-bar-fill, #f59e0b);
    transition: width 0.3s ease;
}

.rv-category-score {
    font-size: 13px;
    font-weight: 700;
    color: var(--pd-title-color, #111827);
    min-width: 28px;
    text-align: right;
}

/* Filter row */
.rv-filter-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 16px;
}

.rv-filter-pill {
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 500;
    border-radius: 20px;
    border: 1px solid var(--pd-spec-border, #e5e5e5);
    background: #fff;
    color: var(--pd-rating-text-color, #6b7280);
    cursor: pointer;
    transition: all 0.15s;
    white-space: nowrap;
}

.rv-filter-pill.active {
    border-color: var(--pd-tab-active-border, #cc9900);
    color: var(--pd-tab-active-color, #cc9900);
    background: var(--pd-price-tier-active-bg, #fef9e7);
}

.rv-filter-pill:hover:not(.active) {
    border-color: #d1d5db;
}

/* Sort dropdown trigger */
.rv-sort-btn {
    margin-left: auto;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 500;
    border-radius: 20px;
    border: 1px solid var(--pd-spec-border, #e5e5e5);
    background: #fff;
    color: var(--pd-rating-text-color, #6b7280);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
}

/* Mention tags row */
.rv-mention-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 20px;
}

.rv-mention-tag {
    padding: 4px 12px;
    font-size: 12px;
    border-radius: 4px;
    background: var(--pd-spec-header-bg, #f9fafb);
    color: var(--pd-rating-text-color, #6b7280);
    border: 1px solid var(--pd-spec-border, #e5e5e5);
}

/* Review card redesigned */
.rv-card {
    padding: 20px 0;
    border-bottom: 1px solid var(--pd-spec-border, #e5e5e5);
}

.rv-card:last-child {
    border-bottom: none;
}

.rv-card-header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 10px;
}

.rv-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
    flex-shrink: 0;
    color: #fff;
}

.rv-card-meta {
    flex: 1;
    min-width: 0;
}

.rv-card-name-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
}

.rv-card-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--pd-title-color, #111827);
}

.rv-card-country {
    font-size: 12px;
    color: var(--pd-rating-text-color, #6b7280);
    display: flex;
    align-items: center;
    gap: 4px;
}

.rv-badge {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 2px 8px;
    font-size: 11px;
    font-weight: 600;
    border-radius: 3px;
}

.rv-badge-verified {
    background: #f0fdf4;
    color: #15803d;
}

.rv-badge-repeat {
    background: #fff7ed;
    color: #c2410c;
}

.rv-card-stars-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
}

.rv-card-date {
    font-size: 12px;
    color: var(--pd-rating-text-color, #6b7280);
}

.rv-card-comment {
    font-size: 13px;
    line-height: 1.6;
    color: var(--pd-spec-value-color, #111827);
    margin-bottom: 12px;
}

/* Supplier reply */
.rv-supplier-reply {
    background: var(--pd-spec-header-bg, #f9fafb);
    border-radius: 6px;
    padding: 12px 14px;
    margin-bottom: 12px;
}

.rv-supplier-reply-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--pd-rating-text-color, #6b7280);
    margin-bottom: 4px;
}

.rv-supplier-reply-text {
    font-size: 13px;
    color: var(--pd-spec-value-color, #111827);
    line-height: 1.5;
}

/* Linked product card inside review */
.rv-product-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border: 1px solid var(--pd-spec-border, #e5e5e5);
    border-radius: 6px;
    margin-bottom: 12px;
    text-decoration: none;
}

.rv-product-thumb {
    width: 48px;
    height: 48px;
    border-radius: 4px;
    background: var(--pd-spec-header-bg, #f9fafb);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.rv-product-title {
    font-size: 12px;
    color: var(--pd-title-color, #111827);
    line-height: 1.3;
}

.rv-product-price {
    font-size: 12px;
    font-weight: 600;
    color: var(--pd-title-color, #111827);
}

/* Helpful button */
.rv-helpful-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--pd-rating-text-color, #6b7280);
    background: none;
    border: 1px solid var(--pd-spec-border, #e5e5e5);
    border-radius: 4px;
    padding: 4px 10px;
    cursor: pointer;
    transition: all 0.15s;
}

.rv-helpful-btn:hover {
    border-color: #d1d5db;
    color: var(--pd-title-color, #111827);
}

.rv-helpful-btn.voted {
    border-color: var(--pd-tab-active-border, #cc9900);
    color: var(--pd-tab-active-color, #cc9900);
}

/* "Tumunu Goster" button */
.rv-show-all-btn {
    display: block;
    width: 100%;
    padding: 12px;
    margin-top: 20px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    border: 1px solid var(--pd-spec-border, #e5e5e5);
    border-radius: 8px;
    background: #fff;
    color: var(--pd-title-color, #111827);
    cursor: pointer;
    transition: all 0.15s;
}

.rv-show-all-btn:hover {
    border-color: #d1d5db;
    background: var(--pd-spec-header-bg, #f9fafb);
}

/* Responsive: stack rating summary on mobile */
@media (max-width: 639px) {
    .rv-rating-summary {
        flex-direction: column;
        gap: 20px;
    }
    .rv-category-label {
        min-width: 100px;
    }
}
```

**No new CSS variables needed** -- reuses existing `--pd-review-*`, `--pd-rating-*`, `--pd-spec-*`, `--pd-tab-*`, `--pd-title-color`, `--pd-price-tier-active-bg`.

**Acceptance criteria:**
- All CSS classes compile without errors
- Sub-tabs have underline active style
- Rating summary has large score + category bars
- Filter pills have pill shape with active state
- Review cards styled with proper spacing
- Supplier reply has gray background
- Badges have green (verified) and orange (repeat buyer) colors
- Responsive: rating summary stacks on mobile
- `npx vite build` succeeds

---

### [FRONTEND] Task F24: Rewrite ProductReviews component HTML
**Assignee:** frontend-specialist
**File:** `src/components/product/ProductReviews.ts`
**Priority:** HIGH (blocked by L11)
**Status:** Pending

**What to do:**
Rewrite `ProductReviews()` to render the full Alibaba-style review section. Keep the existing utility functions (`starIcon`, `renderStars`, `getStarBreakdown`, `countryFlag`) and add new ones.

**New utility functions to add:**

```typescript
// Anonymize name: "Ahmet Y." -> "A***t Y."
function anonymizeName(name: string): string {
  const parts = name.split(' ');
  const first = parts[0];
  if (first.length <= 2) return first + (parts[1] ? ' ' + parts[1] : '');
  const anon = first[0] + '***' + first[first.length - 1];
  return anon + (parts[1] ? ' ' + parts[1] : '');
}

// Get a deterministic avatar background color from author name
function avatarColor(name: string): string {
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

// Satisfaction label from rating
function satisfactionLabel(rating: number): string {
  if (rating >= 4.5) return 'Cok Memnun';
  if (rating >= 4.0) return 'Memnun';
  if (rating >= 3.0) return 'Orta';
  return 'Dusuk';
}
```

**Main `ProductReviews()` structure:**

```html
<div class="py-6">
  <!-- 1. Sub-tabs -->
  <div class="rv-sub-tabs">
    <button class="rv-sub-tab active" data-rv-tab="product">
      Urun Yorumlari (${reviewCount})
    </button>
    <button class="rv-sub-tab" data-rv-tab="store">
      Magaza Yorumlari (${storeReviewCount})
    </button>
  </div>

  <!-- 2. Product reviews panel -->
  <div id="rv-panel-product">
    <!-- 2a. Rating summary -->
    <div class="rv-rating-summary">
      <div class="rv-rating-big">
        <span class="rv-rating-number">${rating}</span>
        <div class="flex items-center gap-0.5 mt-1">${renderStars(rating)}</div>
        <span class="rv-rating-label">${satisfactionLabel(rating)}</span>
        <span class="rv-rating-subtitle">${storeReviewCount} dogrulanmis alisveris yorumuna dayali</span>
      </div>
      <div class="rv-category-bars">
        ${categoryRatings.map(cat => `
          <div class="rv-category-row">
            <span class="rv-category-label">${cat.label}</span>
            <div class="rv-category-bar-track">
              <div class="rv-category-bar-fill" style="width: ${(cat.score / 5) * 100}%"></div>
            </div>
            <span class="rv-category-score">${cat.score}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 2b. Filter row -->
    <div class="rv-filter-row">
      <button class="rv-filter-pill active" data-rv-filter="all">Tumu</button>
      <button class="rv-filter-pill" data-rv-filter="photo">Fotografli/Videolu (${photoCount})</button>
      <button class="rv-sort-btn">
        Sirala: En alakali
        <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
    </div>

    <!-- 2c. Mention tags -->
    <div class="rv-mention-tags">
      ${mentionTags.map(tag => `
        <span class="rv-mention-tag">${tag.label} (${tag.count})</span>
      `).join('')}
    </div>

    <!-- 2d. Review cards -->
    <div id="rv-review-list">
      ${reviews.map(r => renderReviewCardNew(r)).join('')}
    </div>

    <!-- 2e. Show all button -->
    <button type="button" class="rv-show-all-btn">Tumunu Goster</button>
  </div>

  <!-- 3. Store reviews panel (hidden by default) -->
  <div id="rv-panel-store" class="hidden">
    <p style="color: var(--pd-rating-text-color, #6b7280); padding: 40px 0; text-align: center;">
      Magaza yorumlari yaklasimda...
    </p>
  </div>
</div>
```

**New `renderReviewCardNew(review)` function:**

```html
<div class="rv-card">
  <div class="rv-card-header">
    <!-- Avatar -->
    <div class="rv-avatar" style="background: ${avatarColor(review.author)};">
      ${review.author.charAt(0)}
    </div>
    <div class="rv-card-meta">
      <!-- Name + Country + Badges -->
      <div class="rv-card-name-row">
        <span class="rv-card-name">${anonymizeName(review.author)}</span>
        <span class="rv-card-country">
          ${countryFlag(review.country)} ${review.countryName || review.country}
        </span>
        ${review.verified ? '<span class="rv-badge rv-badge-verified">Dogrulanmis Satin Alma</span>' : ''}
        ${review.repeatBuyer ? '<span class="rv-badge rv-badge-repeat">Tekrar Alici</span>' : ''}
      </div>
      <!-- Stars + Date -->
      <div class="rv-card-stars-row">
        <div class="flex items-center gap-0.5">${renderStars(review.rating, true)}</div>
        <span class="rv-card-date">${review.date}</span>
      </div>
    </div>
  </div>

  <!-- Comment -->
  <p class="rv-card-comment">${review.comment}</p>

  <!-- Supplier reply (if exists) -->
  ${review.supplierReply ? `
    <div class="rv-supplier-reply">
      <div class="rv-supplier-reply-label">Tedarikci yaniti:</div>
      <p class="rv-supplier-reply-text">${review.supplierReply}</p>
    </div>
  ` : ''}

  <!-- Product link card -->
  <a href="#" class="rv-product-link">
    <div class="rv-product-thumb">
      <svg width="20" height="20" fill="none" stroke="#9ca3af" stroke-width="1.5" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <path d="M21 15l-5-5L5 21"/>
      </svg>
    </div>
    <div>
      <p class="rv-product-title">${mockProduct.title.substring(0, 50)}...</p>
      <span class="rv-product-price">$${mockProduct.priceTiers[0].price.toFixed(2)}</span>
    </div>
  </a>

  <!-- Helpful button -->
  <button type="button" class="rv-helpful-btn" data-review-id="${review.id}">
    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
    </svg>
    Faydali (${review.helpful})
  </button>
</div>
```

**What to keep from existing code:**
- `starIcon()` -- keep as-is
- `renderStars()` -- keep as-is
- `getStarBreakdown()` -- keep (still used for potential star filter display)
- `countryFlag()` -- keep as-is

**What to remove/replace:**
- Old `renderReviewCard()` -- replaced by `renderReviewCardNew()`
- Old `ProductReviews()` body -- fully replaced
- Old helpful button CSS class `.helpful-btn` usage -- replaced by `.rv-helpful-btn`

**Computed values:**
- `photoCount`: count of reviews where `images` array has length > 0 (currently 0 since no images in mock data, show as `(0)`)

**Acceptance criteria:**
- Sub-tabs render with correct counts
- Rating summary shows big score number, 5 stars, satisfaction label, subtitle
- Category bars render for all 3 categories with correct widths
- Filter pills render ("Tumu" active by default, "Fotografli/Videolu (0)")
- Sort button renders
- Mention tags row renders all 5 tags with counts
- All 6 review cards render with: colored avatar, anonymized name, country flag + name, badges, stars, date, comment, supplier reply (where present), product link card, helpful button
- "Tumunu Goster" button renders at bottom
- Store reviews panel is hidden by default
- No TypeScript errors

---

### [FRONTEND] Task F25: Update initReviews for new interactive elements
**Assignee:** frontend-specialist
**File:** `src/components/product/ProductReviews.ts`
**Priority:** HIGH (blocked by F24)
**Status:** Pending

**What to do:**
Rewrite `initReviews()` to handle all new interactive elements:

```typescript
export function initReviews(): void {
  // 1. Sub-tab switching
  const subTabs = document.querySelectorAll<HTMLButtonElement>('.rv-sub-tab');
  const productPanel = document.getElementById('rv-panel-product');
  const storePanel = document.getElementById('rv-panel-store');

  subTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      subTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.dataset.rvTab;
      if (productPanel && storePanel) {
        productPanel.classList.toggle('hidden', target !== 'product');
        storePanel.classList.toggle('hidden', target !== 'store');
      }
    });
  });

  // 2. Filter pill toggling
  const filterPills = document.querySelectorAll<HTMLButtonElement>('.rv-filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      // No actual filtering in this mock implementation
    });
  });

  // 3. Helpful button clicks
  const helpfulBtns = document.querySelectorAll<HTMLButtonElement>('.rv-helpful-btn');
  helpfulBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('voted')) return;
      btn.classList.add('voted');

      const text = btn.textContent || '';
      const match = text.match(/\((\d+)\)/);
      if (match) {
        const count = parseInt(match[1], 10) + 1;
        btn.innerHTML = `
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
          </svg>
          Faydali (${count})
        `;
      }
    });
  });

  // 4. "Tumunu Goster" button (no-op for now -- would load more reviews)
  const showAllBtn = document.querySelector<HTMLButtonElement>('.rv-show-all-btn');
  showAllBtn?.addEventListener('click', () => {
    showAllBtn.textContent = 'Tum yorumlar gosteriliyor';
    showAllBtn.disabled = true;
    showAllBtn.style.opacity = '0.5';
  });
}
```

**Acceptance criteria:**
- Sub-tab switching works: click "Magaza Yorumlari" hides product panel, shows store panel, and vice versa
- Filter pill toggling: clicking a pill makes it active, deactivates others
- Helpful buttons: click increments count, adds "voted" class, prevents double-voting
- "Tumunu Goster" button: disables on click with confirmation text
- No console errors

---

### [QA] Task Q12: Visual and functional QA for Reviews redesign
**Assignee:** qa-engineer
**Priority:** HIGH
**Status:** Pending (blocked by F24 + F25 + L11 + L12)

**Verification checklist:**

**Sub-tabs:**
- [ ] "Urun Yorumlari" and "Magaza Yorumlari" tabs render
- [ ] Counts display in parentheses
- [ ] Active tab has underline indicator
- [ ] Click switching works (product panel hides, store panel shows)

**Rating summary:**
- [ ] Large rating number (4.7) displays
- [ ] 5 orange stars display
- [ ] Satisfaction label ("Cok Memnun") displays
- [ ] Subtitle "151 dogrulanmis alisveris yorumuna dayali" displays
- [ ] 3 category bars render: Tedarikci Hizmeti 4.9, Zamaninda Gonderim 4.6, Urun Kalitesi 4.8
- [ ] Bar widths proportional to scores (4.9/5 = 98%, etc.)

**Filter row:**
- [ ] "Tumu" pill active by default
- [ ] "Fotografli/Videolu (0)" pill renders
- [ ] Clicking pill toggles active state
- [ ] Sort button "Sirala: En alakali" renders with chevron

**Mention tags:**
- [ ] 5 tags display: Profesyonel Isbirligi (1), Zamaninda Gonderim (1), Iyi Tedarikci (4), Kaliteli Urun (3), Hizli Iletisim (2)

**Review cards (check all 6):**
- [ ] Colored avatar circle with initial letter
- [ ] Anonymized name (e.g., "A***t Y." not "Ahmet Y.")
- [ ] Country flag emoji + country name in Turkish
- [ ] "Dogrulanmis Satin Alma" green badge (all 6 reviews)
- [ ] "Tekrar Alici" orange badge (only rev-3 Fatma K. and rev-5 Elena P.)
- [ ] Star rating and date on each card
- [ ] Review comment text
- [ ] Supplier reply section visible on 4 reviews (rev-1, rev-3, rev-5, rev-6), absent on rev-2 and rev-4
- [ ] Product link card with thumbnail placeholder, truncated title, price
- [ ] "Faydali (X)" button with thumbs-up icon

**Helpful button interaction:**
- [ ] Click increments count (e.g., "Faydali (24)" -> "Faydali (25)")
- [ ] Button changes to "voted" style after click
- [ ] Cannot vote twice on same review

**"Tumunu Goster" button:**
- [ ] Renders at bottom of review list
- [ ] Click disables button and changes text

**Store reviews panel:**
- [ ] Hidden by default
- [ ] Shows placeholder text when sub-tab switched

**Responsive:**
- [ ] Rating summary stacks vertically on mobile (<640px)
- [ ] Filter pills wrap on narrow screens
- [ ] Review cards readable at all widths
- [ ] No horizontal overflow

**Build:**
- [ ] `npx vite build` succeeds with zero errors
- [ ] No TypeScript compilation errors
- [ ] No console errors in browser

---

## Dependency Chain

```
L11 (mock data types) ──┐
                          ├──> F24 (HTML rewrite) ──> F25 (init logic) ──> Q12
L12 (CSS styles)  ───────┘
```

- L11 and L12 can run in parallel (different files: types/data vs style.css)
- F24 depends on L11 (needs new types and mock data to render)
- F24 benefits from L12 (CSS for visual correctness) but can technically compile without it
- F25 depends on F24 (needs DOM elements to exist)
- Q12 depends on all tasks

**Parallel opportunities:** L11 + L12 start immediately in parallel. F24 starts after L11. F25 follows F24.

---

# Active Task: Product Detail Lower Sections Redesign — Phase D (Supplier Tab)

**Date:** 2026-02-18
**Reference:** `implementation_plan.md` Section 14 (Phase D)
**Status:** Ready for Assignment

---

## Task Summary

Enhance the CompanyProfile component (rendered under the "Tedarikci" tab) to match Alibaba's "Know Your Supplier" section. Add a hero banner, restructure company info into a visual card with verified badge and stat counters, and add a "Sirket Profilini Gor" CTA.

---

## Current State

**`CompanyProfile.ts` currently renders:**
- 2-column layout (desktop): company info rows (left) + factory image placeholders (right)
- Company info: 8 `infoRow()` calls (name, verified, years, employees, revenue, response time/rate, on-time delivery)
- Factory: 4 SVG placeholder cards in 2x2 grid
- Certifications: badge-style pills with checkmark icons
- Main Products: rounded-full tag pills

**`SupplierCard.ts`:** Used in the right sidebar (inside ProductInfo). NOT part of this task -- stays as-is.

**Tab config in `ProductTabs.ts`:** Tab id is `company`, label is "Tedarikci", content is `CompanyProfile`. Tab id does not need to change since it only affects internal DOM IDs.

---

## Design Changes (Alibaba Reference)

### 1. "Tedarikciyi Tani" Hero Banner
A full-width banner at the top of the supplier tab content:
- Background: subtle gradient or off-white (`--pd-spec-header-bg`)
- Company name (bold, large) + verified badge inline
- Years in business + location subtitle
- "Sirket Profilini Gor" outline button aligned right

### 2. Stat Counters Row
Replace the current `infoRow()` list with a horizontal row of 3 stat cards:
- Response Time: `< 24 saat`
- Response Rate: `%98`
- On-Time Delivery: `%95`
Each card: large value (bold), small label below, with an icon.

### 3. Company Details Table
Convert remaining info (employees, revenue, years) into a clean 2-column table using the existing `.pd-attrs-table` pattern from Phase A.

### 4. Keep Factory Images + Certifications + Main Products
These sections are already well-implemented. Keep as-is with minor spacing adjustments.

---

## Task Assignments

### [FRONTEND] Task F26: Redesign CompanyProfile with hero banner and stat counters
**Assignee:** frontend-specialist
**File:** `src/components/product/CompanyProfile.ts`
**Priority:** HIGH
**Status:** Pending

**What to do:**
Rewrite `CompanyProfile()` to add the hero banner and stat counter row while keeping existing sections.

**New structure:**

```html
<div class="py-6">
  <!-- 1. Hero Banner -->
  <div class="sp-hero-banner">
    <div class="sp-hero-info">
      <div class="sp-hero-name-row">
        <h3 class="sp-hero-name">${s.name}</h3>
        ${s.verified ? `
          <span class="sp-verified-badge">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" style="color: var(--pd-supplier-verified-color, #cc9900);">
              <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd"/>
            </svg>
            Dogrulanmis Tedarikci
          </span>
        ` : ''}
      </div>
      <p class="sp-hero-subtitle">${s.yearsInBusiness} yildir hizmet veriyor</p>
    </div>
    <a href="#" class="sp-hero-cta">Sirket Profilini Gor</a>
  </div>

  <!-- 2. Stat Counters -->
  <div class="sp-stats-row">
    <div class="sp-stat-card">
      <svg ...clock icon... />
      <span class="sp-stat-value">${s.responseTime}</span>
      <span class="sp-stat-label">Yanit Suresi</span>
    </div>
    <div class="sp-stat-card">
      <svg ...check-circle icon... />
      <span class="sp-stat-value">${s.responseRate}</span>
      <span class="sp-stat-label">Yanit Orani</span>
    </div>
    <div class="sp-stat-card">
      <svg ...truck icon... />
      <span class="sp-stat-value">${s.onTimeDelivery}</span>
      <span class="sp-stat-label">Zamaninda Teslimat</span>
    </div>
  </div>

  <!-- 3. Company Details Table -->
  <div class="sp-details-section">
    <h3 class="pd-section-heading">Sirket Bilgileri</h3>
    <table class="pd-attrs-table">
      <tbody>
        <tr>
          <td class="pd-attrs-key">Calisan Sayisi</td>
          <td class="pd-attrs-val">${s.employees}</td>
          <td class="pd-attrs-key">Yillik Gelir</td>
          <td class="pd-attrs-val">${s.annualRevenue}</td>
        </tr>
        <tr>
          <td class="pd-attrs-key">Faaliyet Suresi</td>
          <td class="pd-attrs-val">${s.yearsInBusiness} yil</td>
          <td class="pd-attrs-key">Konum</td>
          <td class="pd-attrs-val">Guangzhou, Cin</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 4. Factory Images (keep existing) -->
  <div class="sp-details-section">
    <h3 class="pd-section-heading">Fabrika ve Uretim</h3>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
      ${...existing factory image placeholders...}
    </div>
  </div>

  <!-- 5. Certifications (keep existing) -->
  <div class="sp-details-section">
    <h3 class="pd-section-heading">Sertifikalar</h3>
    ${...existing certification badges...}
  </div>

  <!-- 6. Main Products (keep existing) -->
  <div class="sp-details-section">
    <h3 class="pd-section-heading">Ana Urun Gruplari</h3>
    ${...existing product tags...}
  </div>
</div>
```

**Key changes from current code:**
1. **Add** hero banner at top (`.sp-hero-banner`)
2. **Add** stat counter row (`.sp-stats-row` with 3 `.sp-stat-card` items)
3. **Replace** `infoRow()` calls with a `.pd-attrs-table` (reuse Phase A table CSS)
4. **Keep** factory images, certifications, main products -- change heading elements to use `.pd-section-heading` class for consistency
5. **Change** factory grid from `grid-cols-2` to `grid-cols-2 lg:grid-cols-4` so all 4 images show in one row on desktop
6. **Wrap** each section in `<div class="sp-details-section">` for spacing
7. **Remove** the old `infoRow()` helper function (no longer needed)

**Acceptance criteria:**
- Hero banner shows company name, verified badge, years subtitle, and CTA button
- 3 stat counter cards display with icons, values, and labels
- Company details use 4-column table (reusing `.pd-attrs-table`)
- Factory images display in 4-column grid on desktop, 2-column on mobile
- Certifications and main products render correctly
- All section headings use `.pd-section-heading` for consistency
- No TypeScript compilation errors

---

### [LOGIC] Task L13: Add CSS for supplier hero banner and stat counters
**Assignee:** logic-engineer
**File:** `src/style.css`
**Priority:** HIGH (can parallel with F26)
**Status:** Pending

**What to do:**
Add CSS rules for the supplier tab redesign. Use `sp-` prefix (supplier).

```css
/* ============================================================
   SUPPLIER TAB — "Know Your Supplier" Alibaba-style
   ============================================================ */

/* Hero banner */
.sp-hero-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 20px 24px;
    background: var(--pd-spec-header-bg, #f9fafb);
    border: 1px solid var(--pd-spec-border, #e5e5e5);
    border-radius: 8px;
    margin-bottom: 24px;
}

.sp-hero-info {
    min-width: 0;
}

.sp-hero-name-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
}

.sp-hero-name {
    font-size: 18px;
    font-weight: 700;
    color: var(--pd-title-color, #111827);
    margin: 0;
}

.sp-verified-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: 600;
    color: var(--pd-supplier-verified-color, #cc9900);
}

.sp-hero-subtitle {
    font-size: 13px;
    color: var(--pd-rating-text-color, #6b7280);
    margin-top: 4px;
}

.sp-hero-cta {
    padding: 8px 20px;
    font-size: 13px;
    font-weight: 600;
    border: 1px solid var(--pd-spec-border, #e5e5e5);
    border-radius: 6px;
    color: var(--pd-title-color, #111827);
    background: #fff;
    text-decoration: none;
    white-space: nowrap;
    transition: all 0.15s;
}

.sp-hero-cta:hover {
    border-color: #d1d5db;
    background: var(--pd-spec-header-bg, #f9fafb);
}

/* Stat counters row */
.sp-stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 28px;
}

.sp-stat-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 16px;
    border: 1px solid var(--pd-spec-border, #e5e5e5);
    border-radius: 8px;
    text-align: center;
}

.sp-stat-card svg {
    width: 24px;
    height: 24px;
    color: var(--pd-supplier-verified-color, #cc9900);
}

.sp-stat-value {
    font-size: 18px;
    font-weight: 700;
    color: var(--pd-title-color, #111827);
}

.sp-stat-label {
    font-size: 12px;
    color: var(--pd-rating-text-color, #6b7280);
}

/* Details section spacing */
.sp-details-section {
    margin-bottom: 28px;
}

.sp-details-section:last-child {
    margin-bottom: 0;
}

/* Responsive: stack hero banner on mobile */
@media (max-width: 639px) {
    .sp-hero-banner {
        flex-direction: column;
        align-items: flex-start;
    }
    .sp-stats-row {
        grid-template-columns: 1fr;
    }
}
```

**No new CSS variables** -- reuses existing `--pd-spec-header-bg`, `--pd-spec-border`, `--pd-title-color`, `--pd-rating-text-color`, `--pd-supplier-verified-color`.

**Acceptance criteria:**
- Hero banner has off-white background, rounded corners, flex layout
- Stat cards display in 3-column grid with centered content
- Section spacing is consistent via `.sp-details-section`
- Mobile: banner stacks vertically, stats go single-column
- `npx vite build` succeeds

---

### [QA] Task Q13: Visual and functional QA for Supplier tab redesign
**Assignee:** qa-engineer
**Priority:** HIGH
**Status:** Pending (blocked by F26 + L13)

**Verification checklist:**

**Hero Banner:**
- [ ] Company name "Guangzhou Golden Craft Jewelry Co., Ltd." displays bold
- [ ] Verified badge with checkmark icon and "Dogrulanmis Tedarikci" text
- [ ] "8 yildir hizmet veriyor" subtitle
- [ ] "Sirket Profilini Gor" button aligned right
- [ ] Banner has off-white background and rounded corners

**Stat Counters:**
- [ ] 3 cards in a row: Yanit Suresi (< 24 saat), Yanit Orani (%98), Zamaninda Teslimat (%95)
- [ ] Each card has icon, large value, and label
- [ ] Cards have borders and rounded corners

**Company Details Table:**
- [ ] 4-column table with: Calisan Sayisi, Yillik Gelir, Faaliyet Suresi, Konum
- [ ] Reuses `.pd-attrs-table` styling from Phase A (gray key bg, bold values)

**Factory Images:**
- [ ] 4 factory placeholder images render
- [ ] Desktop: 4-column grid (one row)
- [ ] Mobile: 2-column grid (two rows)

**Certifications:**
- [ ] SGS, ISO 9001, BSCI, ROHS badges render with checkmark icons

**Main Products:**
- [ ] 4 product tag pills render

**Responsive:**
- [ ] Mobile: hero banner stacks vertically
- [ ] Mobile: stat cards stack single-column
- [ ] No horizontal overflow

**Build:**
- [ ] `npx vite build` succeeds with zero errors
- [ ] No TypeScript errors, no console errors

---

## Dependency Chain

```
L13 (CSS styles) ──┐
                     ├──> Q13 (QA)
F26 (HTML rewrite) ─┘
```

- L13 and F26 can run in parallel (different files: `style.css` vs `CompanyProfile.ts`)
- Q13 depends on both completing

**This is a lean phase: 2 implementation tasks + 1 QA task.**

---
---


# Active Task: Product Detail Lower Sections Redesign — Phase E (Reviews: Dual-Tab Layout, Interactive Filters, All-Reviews Modal, Login Popup)

**Date:** 2026-02-18
**Reference:** `implementation_plan.md` Section 15
**Status:** Ready for Assignment (Revised per PO clarification)

---

## Task Summary

Restructure the Reviews section so the two sub-tabs have DIFFERENT layouts:
- **Product Reviews tab** (simpler): info banner, "Tumu" + "Puan" dropdown + sort dropdown, language toggle, review cards with "Gizli yorumlari goster" link. NO photos filter, NO mention tags, NO "Tumunu Goster" button.
- **Store Reviews tab** (full Alibaba): complete filter bar + mention tag chips + language toggle + review cards + "Tumunu Goster" button opening an all-reviews modal.

Both tabs share: review card format (with "Gizli yorumlari goster" link), language toggle row, and the login popup auth gate on the Helpful button.

---

## Current State

**`ProductReviews.ts` currently has:**
- `#rv-product-panel`: rating summary + full filter bar (Tumu + Fotografli/Videolu + sort) + mention tags + review cards + "Tumunu Goster" button
- `#rv-store-panel`: placeholder text only ("Magaza yorumlari yaklasimda...")
- `initReviews()`: sub-tab switching, pill toggling (visual only), helpful vote (no auth gate), show-all disable

**What needs to change:**
- `#rv-product-panel`: SIMPLIFY — remove photos filter, remove mention tags, remove "Tumunu Goster" button, add info banner, add "Puan" rating dropdown, make sort a real dropdown
- `#rv-store-panel`: BUILD OUT — replace placeholder with full filter bar + mention tags + language toggle + review cards + "Tumunu Goster" button
- Both panels: add "Gizli yorumlari goster" link to review cards, add language toggle row
- `initReviews()`: dual-panel filter state (separate for each tab), real client-side filtering, login gate on helpful buttons

---

## Task Assignments

### [LOGIC] Task L14: Add CSS for dropdowns, info banner, hidden link, language row, modals, and login modal
**Assignee:** logic-engineer
**File:** `src/style.css`
**Priority:** HIGH (blocks F27a, F27b, F28, F29)
**Status:** Pending

**What to do:**
Add all CSS rules after the existing reviews responsive media query block. Group under a `/* REVIEWS PHASE E — Filters, Modals, Login */` comment.

**CSS to add (~220 lines):**

Everything from the previous revision PLUS these two new blocks:

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

/* Hidden reviews link in review cards */
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

**Plus all previously specified CSS (from prior task L14 spec):**
- `.rv-dropdown`, `.rv-dropdown-trigger`, `.rv-dropdown-menu`, `.rv-dropdown-right`, `.rv-dropdown-item`
- `.rv-mention-tag.active`
- `.rv-lang-row`, `.rv-lang-toggle`
- `.rv-modal-overlay`, `.rv-modal-backdrop`
- `.rv-modal-container`, `.rv-modal-header`, `.rv-modal-title`, `.rv-modal-close`, `.rv-modal-body`
- `.rv-login-modal`, `#rv-login-overlay`, `.rv-login-banner`, `.rv-login-title`, `.rv-login-subtitle`, `.rv-login-buttons`, `.rv-login-btn`, `.rv-login-register`, `.rv-login-qr`

(See `implementation_plan.md` Section 15.5 or the previous revision of this task for the full CSS listing — it remains unchanged.)

**Acceptance criteria:**
- All CSS classes compile without errors
- Info banner has off-white background, border, left-aligned icon
- Hidden link has gold color with hover underline
- All dropdown, modal, and login modal CSS renders correctly
- `npx vite build` succeeds with zero errors

---

### [FRONTEND] Task F27a: Restructure Product Reviews tab (`#rv-product-panel`)
**Assignee:** frontend-specialist
**File:** `src/components/product/ProductReviews.ts`
**Priority:** HIGH
**Status:** Pending

**What to do:**

Rewrite the `#rv-product-panel` HTML inside `ProductReviews()`:

1. **Add info banner** at the very top of the panel (before rating summary):
   ```html
   <div class="rv-info-banner">
     <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
       <circle cx="12" cy="12" r="10"/>
       <path d="M12 16v-4M12 8h.01"/>
     </svg>
     Bu urun icin son bir yilda yeni puan yok. Bunun yerine onceki puanlar ve yorumlar gosteriliyor.
   </div>
   ```

2. **Keep rating summary** unchanged

3. **Replace filter row** — remove "Fotografli/Videolu" pill, add "Puan" dropdown, make sort a dropdown:
   ```html
   <div class="rv-filter-row">
     <button type="button" class="rv-filter-pill active" data-rv-filter="all">Tumu</button>
     <div class="rv-dropdown" id="rv-prod-rating-dropdown">
       <button type="button" class="rv-filter-pill rv-dropdown-trigger">
         Puan
         <svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
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
         Sirala: En alakali
         <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
       </button>
       <div class="rv-dropdown-menu hidden">
         <button type="button" class="rv-dropdown-item active" data-sort="relevant">En alakali</button>
         <button type="button" class="rv-dropdown-item" data-sort="recent">En yeni</button>
       </div>
     </div>
   </div>
   ```

4. **Remove mention tags entirely** from this panel

5. **Add language toggle row** (after filter row, before review cards):
   ```html
   <div class="rv-lang-row">
     <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
       <circle cx="12" cy="12" r="10"/>
       <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
     </svg>
     <span>Sectiginiz dilde tum yorumlar gosteriliyor</span>
     <button type="button" class="rv-lang-toggle" id="rv-prod-lang-toggle">Orijinalini Goster</button>
   </div>
   ```

6. **Wrap review cards** in a container with `id="rv-prod-review-list"`

7. **Remove "Tumunu Goster" button** from this panel

8. **Add "Gizli yorumlari goster" link** to `renderReviewCard()` — between comment and supplier reply:
   ```html
   <a href="#" class="rv-hidden-link" onclick="return false;">Gizli yorumlari goster</a>
   ```

9. **Export `renderReviewCard`** — add `export` keyword to function declaration

**Acceptance criteria:**
- Info banner displays at top of Product tab with info icon
- No "Fotografli/Videolu" pill in filter row
- "Puan" rating dropdown renders with 6 options
- Sort dropdown renders with 2 options, right-aligned
- No mention tags on this tab
- Language toggle row renders after filters
- Review cards have "Gizli yorumlari goster" link
- No "Tumunu Goster" button on this tab
- `renderReviewCard` is exported
- No TypeScript compilation errors

---

### [FRONTEND] Task F27b: Build out Store Reviews tab (`#rv-store-panel`)
**Assignee:** frontend-specialist
**File:** `src/components/product/ProductReviews.ts`
**Priority:** HIGH (can parallel with F27a — same file, different panel)
**Status:** Pending

**What to do:**

Replace the `#rv-store-panel` placeholder content with the full Alibaba-style layout:

```html
<div id="rv-store-panel" class="hidden">
  <!-- Full Filter Row -->
  <div class="rv-filter-row">
    <button type="button" class="rv-filter-pill active" data-rv-store-filter="all">Tumu</button>
    <button type="button" class="rv-filter-pill" data-rv-store-filter="photo">Fotografli/Videolu (${photoReviewCount})</button>
    <div class="rv-dropdown" id="rv-store-rating-dropdown">
      <button type="button" class="rv-filter-pill rv-dropdown-trigger">
        Puan
        <svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
      </button>
      <div class="rv-dropdown-menu hidden">
        <button type="button" class="rv-dropdown-item active" data-store-rating="all">Tum Puanlar</button>
        <button type="button" class="rv-dropdown-item" data-store-rating="5">5 Yildiz</button>
        <button type="button" class="rv-dropdown-item" data-store-rating="4">4 Yildiz</button>
        <button type="button" class="rv-dropdown-item" data-store-rating="3">3 Yildiz</button>
        <button type="button" class="rv-dropdown-item" data-store-rating="2">2 Yildiz</button>
        <button type="button" class="rv-dropdown-item" data-store-rating="1">1 Yildiz</button>
      </div>
    </div>
    <div class="rv-dropdown rv-dropdown-right" id="rv-store-sort-dropdown">
      <button type="button" class="rv-sort-btn rv-dropdown-trigger" id="rv-store-sort-label">
        Sirala: En alakali
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
      </button>
      <div class="rv-dropdown-menu hidden">
        <button type="button" class="rv-dropdown-item active" data-store-sort="relevant">En alakali</button>
        <button type="button" class="rv-dropdown-item" data-store-sort="recent">En yeni</button>
      </div>
    </div>
  </div>

  <!-- Mention Tags -->
  <div class="rv-mention-tags">
    <span style="font-size: 12px; color: var(--pd-rating-text-color, #6b7280); align-self: center;">Sik bahsedilenler:</span>
    ${p.reviewMentionTags.map(tag => `
      <button type="button" class="rv-mention-tag" data-mention="${tag.label}">${tag.label} (${tag.count})</button>
    `).join('')}
  </div>

  <!-- Language Toggle -->
  <div class="rv-lang-row">
    <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
    </svg>
    <span>Sectiginiz dilde tum yorumlar gosteriliyor</span>
    <button type="button" class="rv-lang-toggle" id="rv-store-lang-toggle">Orijinalini Goster</button>
  </div>

  <!-- Review Cards (showProductThumb = true for Store tab) -->
  <div id="rv-store-review-list">
    ${p.reviews.map(r => renderReviewCard(r, true)).join('')}
  </div>

  <!-- Show All Button (opens modal) -->
  <button type="button" class="rv-show-all-btn">Tumunu Goster</button>
</div>
```

**Note:** All IDs and data attributes are prefixed with `store-` to avoid conflicts with the Product tab.

**IMPORTANT — Fix `renderReviewCard` product thumbnail data source:**

The `renderReviewCard()` function's product thumbnail card currently uses `mockProduct.title` and computed price from `mockProduct.priceTiers`. This is incorrect for the Store tab where each review references a **different product**. Fix the `productThumbHtml` block inside `renderReviewCard()` to use per-review fields:

**Before (WRONG):**
```typescript
const productThumbHtml = showProductThumb
  ? `<div class="rv-product-card">
      <img class="rv-product-card-img" src="" alt="Ürün görseli">
      <div class="rv-product-card-info">
        <span class="rv-product-card-title">${mockProduct.title}</span>
        <span class="rv-product-card-price">$${mockProduct.priceTiers[mockProduct.priceTiers.length - 1].price.toFixed(2)}-${mockProduct.priceTiers[0].price.toFixed(2)}</span>
      </div>
      <a class="rv-product-card-link" href="javascript:void(0)">Ürün detaylarını gör ›</a>
    </div>`
  : '';
```

**After (CORRECT):**
```typescript
const productThumbHtml = (showProductThumb && review.productTitle)
  ? `<div class="rv-product-card">
      <img class="rv-product-card-img" src="${review.productImage || ''}" alt="Ürün görseli">
      <div class="rv-product-card-info">
        <span class="rv-product-card-title">${review.productTitle}</span>
        <span class="rv-product-card-price">${review.productPrice || ''}</span>
      </div>
      <a class="rv-product-card-link" href="javascript:void(0)">Ürün detaylarını gör ›</a>
    </div>`
  : '';
```

**Key changes:**
1. Guard with `review.productTitle` — only show if review has product data
2. Use `review.productImage` instead of empty string
3. Use `review.productTitle` instead of `mockProduct.title`
4. Use `review.productPrice` instead of computed `mockProduct.priceTiers` range

**Acceptance criteria:**
- Store tab has full filter bar: Tumu + Fotografli/Videolu + Puan dropdown + Sort dropdown
- Mention tags render as clickable buttons with `data-mention` attributes
- Language toggle row renders
- Review cards display with `showProductThumb = true` — each card shows a gray-bg product thumbnail block
- Product thumbnail card shows per-review product title, price, and image (NOT the main product's data)
- "Ürün detaylarını gör ›" link renders in each product thumbnail card
- "Tumunu Goster" button renders at bottom
- Panel starts hidden (has `class="hidden"`)
- No TypeScript compilation errors

---

### [FRONTEND] Task F28: Create ReviewsModal component (Store tab only)
**Assignee:** frontend-specialist
**File:** `src/components/product/ReviewsModal.ts` (NEW)
**Priority:** HIGH (can parallel with F27a, F27b, F29)
**Status:** Pending

**What to do:**
Same as previous revision, with these key clarifications:
- Modal is triggered ONLY from the Store Reviews tab's "Tumunu Goster" button
- Modal title: "Magaza Yorumlari (${storeReviewCount})"
- Modal contains: full filter bar (same as Store tab), mention tags, language toggle, all review cards
- All IDs prefixed with `rv-modal-` to scope independently
- **IMPORTANT:** Review cards in the modal must pass `showProductThumb = true` to `renderReviewCard()`:
  ```typescript
  ${reviews.map(r => renderReviewCard(r, true)).join('')}
  ```
  This ensures each review card in the modal shows the product thumbnail card (since it's a Store reviews modal).

(See previous task F28 spec for full HTML structure, exports, and behaviors — unchanged except for the Store-tab-only trigger clarification and showProductThumb fix.)

**Acceptance criteria:**
- Modal renders hidden in DOM
- Opens ONLY from Store tab's "Tumunu Goster" click
- Body scroll locked/unlocked properly
- Close on X, backdrop, Escape
- Internal filters work independently from both tabs
- Helpful buttons inside modal respect login gate
- **Review cards inside modal show product thumbnail cards** (gray bg, product image, title, price, "Ürün detaylarını gör" link)
- Product thumbnail data comes from per-review fields (review.productTitle, review.productPrice, review.productImage)
- No TypeScript compilation errors

---

### [FRONTEND] Task F29: Create LoginModal component
**Assignee:** frontend-specialist
**File:** `src/components/product/LoginModal.ts` (NEW)
**Priority:** HIGH (can parallel with F27a, F27b, F28)
**Status:** Pending

(Unchanged from previous revision — see prior task F29 spec for full HTML structure with social login buttons, exports `LoginModal()`, `showLoginModal()`, `hideLoginModal()`, and close behaviors.)

**Acceptance criteria:**
- Login modal renders hidden in DOM with `z-index: 60`
- `showLoginModal()` opens centered card with dark backdrop
- 4 social login buttons: Google, Facebook, LinkedIn, E-posta (with brand SVGs)
- Banner, title, subtitle, register link, QR text all render
- Close on X, backdrop, Escape
- Body scroll management handles both modals being open
- No TypeScript compilation errors

---

### [LOGIC] Task L15a: Wire Product tab filter/sort/auth logic in initReviews
**Assignee:** logic-engineer
**File:** `src/components/product/ProductReviews.ts` (modify `initReviews()`)
**Priority:** HIGH (blocked by F27a, F29)
**Status:** Pending

**What to do:**
Add Product-tab-specific logic to `initReviews()`:

1. **Auth state:** `let isLoggedIn = false;` at the top of `initReviews()`
2. **Product tab filter state:**
   ```typescript
   let prodActiveRating: number | null = null;
   let prodActiveSort: 'relevant' | 'recent' = 'relevant';
   ```
3. **Product tab `applyProdFilters()`:** Filter `mockProduct.reviews` by rating, sort by helpful or date, re-render `#rv-prod-review-list` innerHTML, re-bind helpful buttons
4. **Product tab rating dropdown:** `setupDropdown('rv-prod-rating-dropdown', ...)` — set `prodActiveRating`, call `applyProdFilters()`
5. **Product tab sort dropdown:** `setupDropdown('rv-prod-sort-dropdown', ...)` — set `prodActiveSort`, update label, call `applyProdFilters()`
6. **Product tab language toggle:** `#rv-prod-lang-toggle` click toggles text
7. **Helpful buttons with login gate:** All `.rv-helpful-btn` clicks check `isLoggedIn` — if false, call `showLoginModal()`
8. **Login modal integration:** Listen to `.rv-login-btn` clicks — set `isLoggedIn = true`, call `hideLoginModal()`
9. **Close all dropdowns on outside click**
10. **`setupDropdown()` helper function** (shared with L15b): reusable function that takes a container ID and onSelect callback

**Import additions:**
```typescript
import { showLoginModal, hideLoginModal } from './LoginModal';
```

**Acceptance criteria:**
- Product tab rating dropdown filters reviews
- Product tab sort dropdown sorts reviews
- "Bu filtreye uygun yorum bulunamadi" empty state when no matches
- Helpful button shows login modal when not logged in
- After login, helpful buttons work normally
- Language toggle switches text
- Dropdowns close on outside click
- No console errors

---

### [LOGIC] Task L15b: Wire Store tab filter/sort/mention tag logic in initReviews
**Assignee:** logic-engineer
**File:** `src/components/product/ProductReviews.ts` (modify `initReviews()`)
**Priority:** HIGH (blocked by F27b, F29)
**Status:** Pending

**What to do:**
Add Store-tab-specific logic to `initReviews()` (same function, additional scope):

1. **Store tab filter state:**
   ```typescript
   let storeActiveRating: number | null = null;
   let storeActiveSort: 'relevant' | 'recent' = 'relevant';
   let storeActiveMention: string | null = null;
   ```
2. **Store tab `applyStoreFilters()`:** Filter by rating + mention (case-insensitive comment includes), sort, re-render `#rv-store-review-list` with `renderReviewCard(r, true)` (pass `showProductThumb = true`), re-bind helpful buttons
3. **Store tab rating dropdown:** `setupDropdown('rv-store-rating-dropdown', ...)`
4. **Store tab sort dropdown:** `setupDropdown('rv-store-sort-dropdown', ...)`
5. **Store tab mention tags:** Click `[data-mention]` buttons — toggle `.active`, set/clear `storeActiveMention`, call `applyStoreFilters()`
6. **Store tab language toggle:** `#rv-store-lang-toggle` click toggles text
7. **Store tab filter pills:** `[data-rv-store-filter]` clicks toggle active class
8. **Helpful buttons in Store tab:** Same login gate as Product tab (shared `isLoggedIn` flag)

**Acceptance criteria:**
- Store tab rating dropdown filters reviews
- Store tab sort dropdown sorts reviews
- Mention tags filter reviews by comment content
- Active mention tag has gold styling
- Click active tag again removes filter
- Filters combine: rating + mention + sort
- Store tab language toggle works independently from Product tab
- **After filtering, re-rendered review cards still show product thumbnail cards** (showProductThumb = true passed)
- No console errors

---

### [FRONTEND] Task F30: Wire ReviewsModal and LoginModal into product-detail.ts and barrel exports
**Assignee:** frontend-specialist
**Files:** `src/components/product/index.ts`, `src/product-detail.ts`
**Priority:** HIGH (blocked by F28, F29)
**Status:** Pending

**What to do:**

1. In `src/components/product/index.ts`, add barrel exports:
   ```typescript
   export { ReviewsModal, initReviewsModal } from './ReviewsModal';
   export { LoginModal, showLoginModal, hideLoginModal } from './LoginModal';
   ```

2. In `src/product-detail.ts`:
   - Add `ReviewsModal`, `initReviewsModal`, `LoginModal` to imports
   - Add `${ReviewsModal()}${LoginModal()}` inside `<main>`, before `</main>`
   - Add `initReviewsModal();` in init sequence after `initReviews()`

**Acceptance criteria:**
- Both modals render in the DOM (hidden by default)
- `initReviewsModal()` runs in init sequence
- Both modals importable from barrel
- No TypeScript compilation errors
- `npx vite build` succeeds

---

### [QA] Task Q14: Visual and functional QA for Phase E (Revised)
**Assignee:** qa-engineer
**Priority:** HIGH
**Status:** Pending (blocked by L14 + F27a + F27b + F28 + F29 + F30 + L15a + L15b)

**Verification checklist:**

**Product Reviews Tab (simpler layout):**
- [ ] Info banner displays: "Bu urun icin son bir yilda yeni puan yok..." with info icon
- [ ] Rating summary (big number, stars, category bars) displays correctly
- [ ] Filter row: "Tumu" pill + "Puan" dropdown + "Sirala" dropdown
- [ ] NO "Fotografli/Videolu" pill on this tab
- [ ] NO mention tags on this tab
- [ ] "Puan" dropdown opens with 6 rating options
- [ ] Rating filter works: selecting "5 Yildiz" filters reviews
- [ ] "Tum Puanlar" resets to all
- [ ] Sort dropdown: "En yeni" sorts by date, "En alakali" by helpful
- [ ] Sort label updates on selection
- [ ] Language toggle: "Orijinalini Goster" / "Cevirilmis Goster"
- [ ] Review cards have "Gizli yorumlari goster" link
- [ ] NO "Tumunu Goster" button on this tab
- [ ] Dropdowns close on outside click

**Store Reviews Tab (full layout):**
- [ ] Full filter bar: Tumu + Fotografli/Videolu + Puan dropdown + Sort dropdown
- [ ] Mention tags: 5 clickable tag buttons
- [ ] Click mention tag filters reviews
- [ ] Active tag has gold styling
- [ ] Click active tag deselects
- [ ] Filters combine: rating + mention + sort
- [ ] Language toggle works independently from Product tab
- [ ] Review cards display with "Gizli yorumlari goster" link
- [ ] **Product thumbnail card** appears in each Store review card (gray bg block)
- [ ] Product thumbnail shows per-review product title (NOT the main product title)
- [ ] Product thumbnail shows per-review price string (e.g., "$8.50-12.00")
- [ ] Product thumbnail image placeholder renders (empty src OK for mock)
- [ ] "Ürün detaylarını gör ›" link renders in product thumbnail card
- [ ] Product thumbnail cards persist after filtering (re-renders pass showProductThumb=true)
- [ ] NO product thumbnail cards in Product Reviews tab
- [ ] "Tumunu Goster" button at bottom

**Sub-Tab Switching:**
- [ ] "Urun Yorumlari" tab shows Product panel (default)
- [ ] "Magaza Yorumlari" tab shows Store panel
- [ ] Switching tabs preserves each tab's filter state
- [ ] Active tab has underline indicator

**Reviews Modal (Store tab only):**
- [ ] Click "Tumunu Goster" on Store tab opens modal
- [ ] Modal title: "Magaza Yorumlari (count)"
- [ ] Dark semi-transparent backdrop
- [ ] Modal has full filter bar + mention tags + language toggle
- [ ] Modal filters work independently from main page
- [ ] **Review cards inside modal show product thumbnail cards** (showProductThumb=true)
- [ ] Product thumbnail data uses per-review fields (not main product data)
- [ ] Product thumbnail cards persist after modal filter re-renders
- [ ] Body scroll locked while open
- [ ] Close on X, backdrop, Escape
- [ ] Body scroll restored on close

**Login Modal:**
- [ ] Click "Faydali" (not logged in) opens login modal
- [ ] Works from Product tab, Store tab, AND reviews modal
- [ ] Login modal layers above reviews modal (z-index: 60 vs 50)
- [ ] Banner: "UCRETSIZ kargo" in red
- [ ] 4 social buttons with brand SVGs
- [ ] Close on X, backdrop, Escape
- [ ] Click any login button closes modal and enables voting
- [ ] After login, helpful buttons increment count + show voted state
- [ ] Cannot double-vote

**Responsive:**
- [ ] Dropdowns usable on mobile
- [ ] Info banner wraps text on narrow screens
- [ ] Reviews modal: 90vw, max-width 720px
- [ ] Login modal: 90vw, max-width 420px
- [ ] No horizontal overflow

**Build:**
- [ ] `npx vite build` succeeds with zero errors
- [ ] No TypeScript compilation errors
- [ ] No console errors in browser

---

## Phase E Dependency Chain (Revised)

```
L14 (CSS) ──┐
              ├──> F27a (Product tab HTML) ──> L15a (Product tab logic)
              ├──> F27b (Store tab HTML)   ──> L15b (Store tab logic)
              ├──> F28 (ReviewsModal)  ──┐
              ├──> F29 (LoginModal)  ────┼──> F30 (wiring)
              │                          │
              └──────────────────────────┴──> Q14 (full QA)
```

**Parallel opportunities:**
- L14 starts immediately (CSS only)
- F27a, F27b, F28, F29 can all start in parallel after L14
- L15a depends on F27a + F29; L15b depends on F27b + F29
- F30 depends on F28 + F29
- Q14 depends on everything

**NOTE:** F27a and F27b both modify the same file (`ProductReviews.ts`), so they should be done sequentially by the same frontend-specialist agent to avoid merge conflicts. Recommended order: F27a first (restructure Product tab), then F27b (build Store tab).

**Phase E depends on Phase C (F24/F25) being complete**, since it modifies the Phase C code in `ProductReviews.ts`.

---

# Phase F — "Sepete Ekle" (Add to Cart) Slide-Out Drawer

**Requested by:** Product Owner
**Date:** 2026-02-18
**Scope:** Right-side slide-out drawer triggered by "Sepete Ekle" button, with variant selection, quantity stepper, shipping info, and subtotal footer.

## Data Sources (all existing — no new types needed)

- `mockProduct.priceTiers` — 3 tiers: `{ minQty, maxQty, price, currency }[]`
- `mockProduct.variants` — 3 variant groups: color (4 options with hex `value`), size/Zincir Uzunluğu (4 options), material (3 options); each option has `id`, `label`, `value`, `available`
- `mockProduct.shipping` — 2 methods: `{ method, estimatedDays, cost }[]`
- `mockProduct.moq` — minimum order quantity (currently `1`)
- `mockProduct.unit` — "adet"

## Task Summary

| Task | Type | File | Description | Blocked By |
|------|------|------|-------------|------------|
| L16 | CSS | `src/style.css` | Add all Cart Drawer CSS rules | — |
| F31 | FRONTEND | `src/components/product/CartDrawer.ts` (NEW) | Create drawer component HTML | L16 |
| L17 | LOGIC | `src/components/product/CartDrawer.ts` | Wire drawer open/close, variant selection, qty stepper, subtotal calc | F31 |
| F32 | FRONTEND | `src/components/product/index.ts`, `src/product-detail.ts` | Wire CartDrawer into page + barrel exports | F31 |
| Q15 | QA | — | Full visual + functional QA | L16, F31, L17, F32 |

---

### [LOGIC] Task L16: Add Phase F CSS to style.css
**Assignee:** logic-engineer
**File:** `src/style.css`
**Priority:** HIGH (starts immediately, unblocks all)
**Status:** Pending

**What to do:**

Add a new CSS block under a `/* ── CART DRAWER — Phase F ──────────────────────── */` comment. All rules use existing `--pd-*` CSS variables for theming consistency.

```css
/* ── CART DRAWER — Phase F ──────────────────────── */

/* Overlay + Backdrop */
.cd-overlay {
    position: fixed;
    inset: 0;
    z-index: var(--z-modal, 50);
    display: flex;
    justify-content: flex-end;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 0.3s, opacity 0.3s ease;
}

.cd-overlay.open {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s, opacity 0.3s ease;
}

.cd-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
}

/* Drawer Panel */
.cd-drawer {
    position: relative;
    width: 400px;
    max-width: 90vw;
    height: 100vh;
    background: #fff;
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 1;
}

.cd-overlay.open .cd-drawer {
    transform: translateX(0);
}

/* Header */
.cd-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid var(--pd-spec-border, #e5e5e5);
    flex-shrink: 0;
}

.cd-header-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--pd-title-color, #111827);
}

.cd-close {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: var(--pd-rating-text-color, #6b7280);
    display: flex;
    align-items: center;
    justify-content: center;
}

.cd-close:hover {
    color: var(--pd-title-color, #111827);
}

/* Scrollable Body */
.cd-body {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
}

/* Price Tiers Row */
.cd-price-tiers {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
}

.cd-tier {
    flex: 1;
    text-align: center;
    padding: 10px 8px;
    border: 1px solid var(--pd-spec-border, #e5e5e5);
    border-radius: 8px;
    cursor: pointer;
    transition: border-color 0.15s;
}

.cd-tier.active {
    border-color: var(--pd-cta-primary-bg, #e85d04);
    background: rgba(232, 93, 4, 0.04);
}

.cd-tier-price {
    font-size: 18px;
    font-weight: 700;
    color: var(--pd-price-color, #e85d04);
    display: block;
}

.cd-tier-range {
    font-size: 12px;
    color: var(--pd-rating-text-color, #6b7280);
    margin-top: 2px;
    display: block;
}

/* Variant Sections */
.cd-variant-section {
    margin-bottom: 20px;
}

.cd-variant-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--pd-title-color, #111827);
    margin-bottom: 10px;
}

/* Color Swatches */
.cd-color-swatches {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.cd-color-swatch {
    width: 44px;
    height: 44px;
    border-radius: 8px;
    border: 2px solid var(--pd-spec-border, #e5e5e5);
    cursor: pointer;
    position: relative;
    transition: border-color 0.15s;
    padding: 0;
    background: none;
}

.cd-color-swatch.selected {
    border-color: var(--pd-cta-primary-bg, #e85d04);
}

.cd-color-swatch.unavailable {
    opacity: 0.35;
    cursor: not-allowed;
}

.cd-color-swatch-inner {
    width: 100%;
    height: 100%;
    border-radius: 6px;
}

.cd-swatch-badge {
    position: absolute;
    top: -6px;
    right: -6px;
    background: var(--pd-cta-primary-bg, #e85d04);
    color: #fff;
    font-size: 10px;
    font-weight: 600;
    padding: 1px 5px;
    border-radius: 8px;
    display: none;
}

.cd-color-swatch.selected .cd-swatch-badge {
    display: block;
}

/* Size / Material Pills */
.cd-pill-options {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.cd-pill {
    padding: 8px 16px;
    border: 1px solid var(--pd-spec-border, #e5e5e5);
    border-radius: 20px;
    background: #fff;
    font-size: 13px;
    color: var(--pd-title-color, #111827);
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
}

.cd-pill.selected {
    border-color: var(--pd-cta-primary-bg, #e85d04);
    background: rgba(232, 93, 4, 0.04);
    color: var(--pd-cta-primary-bg, #e85d04);
    font-weight: 600;
}

.cd-pill.unavailable {
    opacity: 0.35;
    cursor: not-allowed;
    text-decoration: line-through;
}

/* Price + Quantity Row */
.cd-qty-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    padding-top: 16px;
    border-top: 1px solid var(--pd-spec-border, #e5e5e5);
}

.cd-current-price {
    font-size: 22px;
    font-weight: 700;
    color: var(--pd-price-color, #e85d04);
}

.cd-qty-stepper {
    display: flex;
    align-items: center;
    border: 1px solid var(--pd-spec-border, #e5e5e5);
    border-radius: 8px;
    overflow: hidden;
}

.cd-qty-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--pd-spec-header-bg, #f9fafb);
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: var(--pd-title-color, #111827);
    padding: 0;
}

.cd-qty-btn:hover {
    background: #eee;
}

.cd-qty-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
}

.cd-qty-input {
    width: 56px;
    height: 36px;
    text-align: center;
    border: none;
    border-left: 1px solid var(--pd-spec-border, #e5e5e5);
    border-right: 1px solid var(--pd-spec-border, #e5e5e5);
    font-size: 14px;
    font-weight: 600;
    color: var(--pd-title-color, #111827);
    outline: none;
    -moz-appearance: textfield;
}

.cd-qty-input::-webkit-outer-spin-button,
.cd-qty-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Shipping Card */
.cd-shipping-card {
    border: 1px solid var(--pd-spec-border, #e5e5e5);
    border-radius: 8px;
    padding: 14px 16px;
    margin-bottom: 20px;
}

.cd-shipping-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
}

.cd-shipping-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--pd-title-color, #111827);
}

.cd-shipping-change {
    font-size: 12px;
    color: var(--pd-breadcrumb-link-color, #cc9900);
    text-decoration: none;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
}

.cd-shipping-change:hover {
    text-decoration: underline;
}

.cd-shipping-method {
    font-size: 13px;
    color: var(--pd-title-color, #111827);
}

.cd-shipping-detail {
    font-size: 12px;
    color: var(--pd-rating-text-color, #6b7280);
    margin-top: 2px;
}

/* Sticky Footer */
.cd-footer {
    padding: 16px 20px;
    border-top: 1px solid var(--pd-spec-border, #e5e5e5);
    background: #fff;
    flex-shrink: 0;
}

.cd-subtotal-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 4px;
}

.cd-subtotal-label {
    font-size: 13px;
    color: var(--pd-rating-text-color, #6b7280);
}

.cd-subtotal-value {
    font-size: 20px;
    font-weight: 700;
    color: var(--pd-title-color, #111827);
}

.cd-per-piece {
    font-size: 12px;
    color: var(--pd-rating-text-color, #6b7280);
    text-align: right;
    margin-bottom: 12px;
}

.cd-submit-btn {
    width: 100%;
    padding: 14px;
    background: var(--pd-cta-primary-bg, #e85d04);
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s;
}

.cd-submit-btn:hover {
    background: var(--pd-cta-primary-hover, #d45303);
}

/* Responsive */
@media (max-width: 480px) {
    .cd-drawer {
        width: 100vw;
        max-width: 100vw;
    }

    .cd-price-tiers {
        flex-direction: column;
    }
}
```

**Acceptance criteria:**
- All `.cd-*` classes compile without errors
- Drawer overlay + backdrop + slide-in transition defined
- Price tier cards, color swatches, pill buttons, qty stepper, shipping card, sticky footer styled
- Responsive: full-width on mobile (<=480px)
- Uses existing `--pd-*` CSS variables for theming
- `npx vite build` succeeds

---

### [FRONTEND] Task F31: Create CartDrawer component HTML
**Assignee:** frontend-specialist
**File:** `src/components/product/CartDrawer.ts` (NEW)
**Priority:** HIGH (blocked by L16)
**Status:** Pending

**What to do:**

Create a new component file `src/components/product/CartDrawer.ts` that exports:
- `CartDrawer(): string` — returns the drawer HTML (hidden by default)
- `initCartDrawer(): void` — to be implemented by logic-engineer in L17 (stub for now)

**Imports:**
```typescript
import { mockProduct } from '../../data/mockProduct';
import type { PriceTier, ProductVariant, VariantOption } from '../../types/product';
```

**HTML structure:**
```html
<div id="cd-overlay" class="cd-overlay">
  <div class="cd-backdrop"></div>
  <div class="cd-drawer">

    <!-- Header -->
    <div class="cd-header">
      <span class="cd-header-title">Varyasyon ve miktar seçin</span>
      <button type="button" class="cd-close" id="cd-close">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Scrollable Body -->
    <div class="cd-body">

      <!-- Price Tiers -->
      <div class="cd-price-tiers">
        ${mockProduct.priceTiers.map((tier: PriceTier, i: number) => `
          <div class="cd-tier${i === 0 ? ' active' : ''}" data-tier-index="${i}">
            <span class="cd-tier-price">$${tier.price.toFixed(2)}</span>
            <span class="cd-tier-range">${tier.minQty}-${tier.maxQty ?? '∞'} ${mockProduct.unit}</span>
          </div>
        `).join('')}
      </div>

      <!-- Variants -->
      ${mockProduct.variants.map((variant: ProductVariant) => `
        <div class="cd-variant-section" data-variant-type="${variant.type}">
          <div class="cd-variant-label">${variant.label}</div>
          ${variant.type === 'color'
            ? `<div class="cd-color-swatches">
                ${variant.options.map((opt: VariantOption, i: number) => `
                  <button type="button"
                    class="cd-color-swatch${i === 0 && opt.available ? ' selected' : ''}${!opt.available ? ' unavailable' : ''}"
                    data-variant-id="${opt.id}"
                    data-variant-type="color"
                    ${!opt.available ? 'disabled' : ''}
                    title="${opt.label}">
                    <div class="cd-color-swatch-inner" style="background: ${opt.value};"></div>
                    <span class="cd-swatch-badge">×1</span>
                  </button>
                `).join('')}
              </div>`
            : `<div class="cd-pill-options">
                ${variant.options.map((opt: VariantOption, i: number) => `
                  <button type="button"
                    class="cd-pill${i === 0 && opt.available ? ' selected' : ''}${!opt.available ? ' unavailable' : ''}"
                    data-variant-id="${opt.id}"
                    data-variant-type="${variant.type}"
                    ${!opt.available ? 'disabled' : ''}>
                    ${opt.label}
                  </button>
                `).join('')}
              </div>`
          }
        </div>
      `).join('')}

      <!-- Price + Quantity Row -->
      <div class="cd-qty-row">
        <span class="cd-current-price" id="cd-current-price">$${mockProduct.priceTiers[0].price.toFixed(2)}</span>
        <div class="cd-qty-stepper">
          <button type="button" class="cd-qty-btn" id="cd-qty-minus">−</button>
          <input type="number" class="cd-qty-input" id="cd-qty-input" value="${mockProduct.moq}" min="1" max="9999">
          <button type="button" class="cd-qty-btn" id="cd-qty-plus">+</button>
        </div>
      </div>

      <!-- Shipping Card -->
      <div class="cd-shipping-card">
        <div class="cd-shipping-header">
          <span class="cd-shipping-label">Kargo</span>
          <button type="button" class="cd-shipping-change">Değiştir ›</button>
        </div>
        <div class="cd-shipping-method" id="cd-shipping-method">${mockProduct.shipping[0].method}</div>
        <div class="cd-shipping-detail" id="cd-shipping-detail">
          ${mockProduct.shipping[0].cost} · Tahmini teslimat: ${mockProduct.shipping[0].estimatedDays}
        </div>
      </div>

    </div>

    <!-- Sticky Footer -->
    <div class="cd-footer">
      <div class="cd-subtotal-row">
        <span class="cd-subtotal-label">Ara Toplam</span>
        <span class="cd-subtotal-value" id="cd-subtotal">$${(mockProduct.moq * mockProduct.priceTiers[0].price).toFixed(2)}</span>
      </div>
      <div class="cd-per-piece" id="cd-per-piece">${mockProduct.moq} ${mockProduct.unit} × $${mockProduct.priceTiers[0].price.toFixed(2)}/adet</div>
      <button type="button" class="cd-submit-btn" id="cd-submit">Sepete Ekle</button>
    </div>

  </div>
</div>
```

**Stub init function:**
```typescript
export function initCartDrawer(): void {
  // Logic will be added by L17
}
```

**Acceptance criteria:**
- Component renders hidden drawer in the DOM
- Price tiers display all 3 tiers from `mockProduct.priceTiers` with correct prices and ranges
- First tier is `.active` by default
- Color variants render as swatches with correct hex backgrounds
- Size/material variants render as pills
- Unavailable options have `.unavailable` class + `disabled` attribute
- First available option in each variant group is pre-selected
- Quantity input defaults to `mockProduct.moq`
- Shipping card shows first shipping method
- Subtotal footer shows calculated initial total
- `CartDrawer()` and `initCartDrawer()` are exported
- No TypeScript compilation errors

---

### [LOGIC] Task L17: Wire CartDrawer open/close, variant selection, quantity stepper, subtotal calculation
**Assignee:** logic-engineer
**File:** `src/components/product/CartDrawer.ts` (modify `initCartDrawer()`)
**Priority:** HIGH (blocked by F31)
**Status:** Pending

**What to do:**

Implement the full drawer logic inside `initCartDrawer()`:

**1. Open/Close:**
```typescript
const overlay = document.getElementById('cd-overlay');
const closeBtn = document.getElementById('cd-close');
const backdrop = overlay?.querySelector('.cd-backdrop');

function openDrawer() {
  overlay?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  overlay?.classList.remove('open');
  document.body.style.overflow = '';
}

// Trigger: both "Sepete Ekle" buttons
document.getElementById('pd-add-to-cart')?.addEventListener('click', openDrawer);
document.querySelector('#pd-mobile-bar button:first-child')?.addEventListener('click', openDrawer);

// Close triggers
closeBtn?.addEventListener('click', closeDrawer);
backdrop?.addEventListener('click', closeDrawer);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay?.classList.contains('open')) closeDrawer();
});
```

**2. Price Tier Selection:**
- Click `.cd-tier` → remove `.active` from all tiers, add to clicked
- Update `activeTierIndex` state variable
- Recalculate subtotal

**3. Variant Selection:**
- **Color swatches:** Click `.cd-color-swatch:not(.unavailable)` → remove `.selected` from siblings, add to clicked
- **Pills:** Click `.cd-pill:not(.unavailable)` → remove `.selected` from siblings (same `data-variant-type`), add to clicked
- Unavailable options do nothing (disabled)

**4. Quantity Stepper:**
```typescript
let quantity = mockProduct.moq;

const qtyInput = document.getElementById('cd-qty-input') as HTMLInputElement;
const minusBtn = document.getElementById('cd-qty-minus');
const plusBtn = document.getElementById('cd-qty-plus');

function setQuantity(val: number) {
  quantity = Math.max(1, Math.min(9999, val));
  qtyInput.value = String(quantity);
  updateTierHighlight();
  updateSubtotal();
}

minusBtn?.addEventListener('click', () => setQuantity(quantity - 1));
plusBtn?.addEventListener('click', () => setQuantity(quantity + 1));
qtyInput?.addEventListener('change', () => setQuantity(parseInt(qtyInput.value, 10) || 1));
```

**5. Auto Tier Highlight:**
When quantity changes, auto-highlight the matching price tier:
```typescript
function updateTierHighlight() {
  const tiers = mockProduct.priceTiers;
  let matchIndex = 0;
  for (let i = 0; i < tiers.length; i++) {
    if (quantity >= tiers[i].minQty) matchIndex = i;
  }
  document.querySelectorAll('.cd-tier').forEach((el, i) => {
    el.classList.toggle('active', i === matchIndex);
  });
  activeTierIndex = matchIndex;
}
```

**6. Subtotal Calculation:**
```typescript
function updateSubtotal() {
  const tierPrice = mockProduct.priceTiers[activeTierIndex].price;
  const total = quantity * tierPrice;
  document.getElementById('cd-subtotal')!.textContent = `$${total.toFixed(2)}`;
  document.getElementById('cd-current-price')!.textContent = `$${tierPrice.toFixed(2)}`;
  document.getElementById('cd-per-piece')!.textContent = `${quantity} ${mockProduct.unit} × $${tierPrice.toFixed(2)}/adet`;
}
```

**7. Shipping Toggle (simple):**
- Click `.cd-shipping-change` → cycle through `mockProduct.shipping` array, update `#cd-shipping-method` and `#cd-shipping-detail`

**8. Submit Button:**
- Click `#cd-submit` → `console.log('Added to cart:', { quantity, tier, variants })` (visual only, no real cart)
- Close drawer after click

**Export `openCartDrawer`** for external use:
```typescript
export function openCartDrawer(): void { ... }
```

**Acceptance criteria:**
- Clicking "Sepete Ekle" on ProductInfo opens drawer with slide animation
- Clicking "Sepete Ekle" on mobile bottom bar also opens drawer
- Drawer closes on X, backdrop, Escape
- Body scroll locked while drawer is open, restored on close
- Clicking a price tier highlights it and updates price display
- Clicking unavailable variant does nothing
- Clicking available color swatch selects it (orange border)
- Clicking available pill selects it (orange text + border)
- Quantity minus decrements, plus increments
- Quantity cannot go below 1 or above 9999
- Typing in quantity input works, validates on change
- Changing quantity auto-highlights the correct price tier
- Subtotal = quantity × tier price, updates live
- Per-piece price text updates
- Current price display updates when tier changes
- Shipping "Degistir" cycles through shipping methods
- Submit button logs to console and closes drawer
- No console errors

---

### [FRONTEND] Task F32: Wire CartDrawer into product-detail.ts and barrel exports
**Assignee:** frontend-specialist
**Files:** `src/components/product/index.ts`, `src/product-detail.ts`
**Priority:** HIGH (blocked by F31)
**Status:** Pending

**What to do:**

1. In `src/components/product/index.ts`, add barrel export:
   ```typescript
   export { CartDrawer, initCartDrawer } from './CartDrawer';
   ```

2. In `src/product-detail.ts`:
   - Add `CartDrawer, initCartDrawer` to imports from `./components/product`
   - Add `${CartDrawer()}` in the modals section (after `${LoginModal()}`):
     ```typescript
     <!-- Modals -->
     ${ReviewsModal()}
     ${LoginModal()}
     ${CartDrawer()}
     ```
   - Add `initCartDrawer();` in the init sequence after `initLoginModal()`:
     ```typescript
     initLoginModal();
     initReviewsModal();
     initCartDrawer();
     ```

**Acceptance criteria:**
- CartDrawer HTML renders in the DOM (hidden by default)
- `initCartDrawer()` runs in init sequence
- CartDrawer importable from barrel
- No TypeScript compilation errors
- `npx vite build` succeeds

---

### [QA] Task Q15: Visual and functional QA for Phase F (Cart Drawer)
**Assignee:** qa-engineer
**Priority:** HIGH
**Status:** Pending (blocked by L16 + F31 + L17 + F32)

**Verification checklist:**

**Drawer Open/Close:**
- [ ] Click "Sepete Ekle" on ProductInfo opens drawer from right side
- [ ] Click "Sepete Ekle" on mobile bottom bar opens drawer
- [ ] Slide-in animation is smooth (~0.3s ease)
- [ ] Dark backdrop covers rest of page
- [ ] Body scroll locked while open
- [ ] Close on X button
- [ ] Close on backdrop click
- [ ] Close on Escape key
- [ ] Body scroll restored after close

**Price Tiers:**
- [ ] 3 price tier cards display: $12.00 (1-99), $10.00 (100-499), $8.50 (500+)
- [ ] First tier highlighted by default (orange border)
- [ ] Clicking a tier highlights it
- [ ] Tier highlight auto-updates when quantity changes to match range

**Variant Selection — Color Swatches:**
- [ ] 4 color swatches render with correct hex backgrounds (gold, silver, rose gold, black)
- [ ] First available swatch pre-selected (orange border)
- [ ] Black swatch disabled + dimmed (available: false)
- [ ] Clicking available swatch selects it
- [ ] "×N" badge appears on selected swatch
- [ ] Clicking disabled swatch does nothing

**Variant Selection — Size Pills:**
- [ ] 4 size pills render: 40 cm, 45 cm, 50 cm, 55 cm
- [ ] First pill pre-selected
- [ ] Clicking pill selects it (orange text + border)
- [ ] All size options are available

**Variant Selection — Material Pills:**
- [ ] 3 material pills render: 316L Çelik, Titanyum, 925 Gümüş
- [ ] First available pill pre-selected
- [ ] 925 Gümüş disabled + dimmed + strikethrough (available: false)
- [ ] Clicking disabled pill does nothing

**Quantity Stepper:**
- [ ] Default quantity = MOQ (1)
- [ ] Minus button decrements by 1
- [ ] Plus button increments by 1
- [ ] Cannot go below 1 (minus disabled or clamped)
- [ ] Cannot go above 9999
- [ ] Typing a value in input works
- [ ] Invalid input (non-number, empty) resets to 1 on change
- [ ] Subtotal updates after every quantity change

**Shipping Card:**
- [ ] First shipping method displays: DHL Express, $45.00, 5-8 iş günü
- [ ] "Değiştir ›" link/button present
- [ ] Clicking "Değiştir" cycles to next method: Deniz Yolu, $12.00, 25-35 iş günü
- [ ] Clicking again cycles back

**Subtotal Footer:**
- [ ] "Ara Toplam" label displays
- [ ] Subtotal = quantity × tier price (e.g., 1 × $12.00 = $12.00)
- [ ] Per-piece breakdown: "1 adet × $12.00/adet"
- [ ] Changing quantity updates subtotal and per-piece text
- [ ] Changing tier (manually or via quantity) updates price and subtotal
- [ ] Full-width "Sepete Ekle" orange button in footer
- [ ] Footer stays visible (sticky) while body scrolls

**Integration:**
- [ ] Drawer HTML is in DOM on page load
- [ ] `initCartDrawer()` called in init sequence
- [ ] CartDrawer exported from barrel `index.ts`
- [ ] No interference with ReviewsModal or LoginModal (separate z-index scope)
- [ ] Drawer visible above sticky header

**Responsive:**
- [ ] Drawer 400px wide on desktop
- [ ] Drawer full-width on mobile (<=480px)
- [ ] Price tiers stack vertically on mobile
- [ ] All interactive elements usable on touch
- [ ] No horizontal overflow

**Build:**
- [ ] `npx vite build` succeeds with zero errors
- [ ] No TypeScript compilation errors
- [ ] No console errors in browser

---

## Phase F Dependency Chain

```
L16 (CSS) ──┐
             ├──> F31 (CartDrawer HTML) ──┬──> L17 (drawer logic)
             │                             │
             │                             └──> F32 (wiring)
             │
             └────────────────────────────────> Q15 (full QA)
```

**Parallel opportunities:**
- L16 starts immediately (CSS only)
- F31 starts after L16
- L17 and F32 can start in parallel after F31 (different concerns: logic vs wiring)
- Q15 depends on everything

**Phase F is independent of Phase E** — no shared files except `style.css` (append-only), `index.ts` (add export), and `product-detail.ts` (add render + init). No merge conflict risk if Phase E is complete before F starts.
