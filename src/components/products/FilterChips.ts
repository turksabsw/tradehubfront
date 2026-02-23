/**
 * FilterChips Component
 * Renders active filter chips/tags above the product grid.
 * Each chip shows which filter is active, with an X button to remove it.
 * Uses event delegation via data-remove-filter attribute.
 */

import type { FilterState } from './filterEngine';

/**
 * Create a single chip HTML
 */
function makeChip(label: string, section: string, value: string): string {
  return `
    <span class="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200 rounded-full dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-700/50">
      <span>${label}</span>
      <button
        type="button"
        class="ml-0.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-orange-200 dark:hover:bg-orange-800/50 transition-colors"
        data-remove-filter="${section}:${value}"
        aria-label="Kaldir: ${label}"
      >
        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </span>
  `;
}

/**
 * Render all active filter chips from the current FilterState
 */
export function renderFilterChips(state: FilterState): string {
  const chips: string[] = [];

  if (state.verified) chips.push(makeChip('Verified Supplier', 'supplier-features', 'verified'));
  if (state.verifiedPro) chips.push(makeChip('Verified PRO', 'supplier-features', 'verified-pro'));
  if (state.minRating !== null) chips.push(makeChip(`${state.minRating}\u2605 & up`, 'store-reviews', String(state.minRating)));
  if (state.priceMin !== null || state.priceMax !== null) {
    const label = `$${state.priceMin ?? '0'} \u2013 $${state.priceMax ?? '\u221E'}`;
    chips.push(makeChip(label, 'price', 'range'));
  }
  if (state.minOrder !== null) chips.push(makeChip(`MOQ \u2264 ${state.minOrder}`, 'min-order', String(state.minOrder)));
  state.supplierCountries.forEach(c => chips.push(makeChip(c, 'supplier-country', c)));

  return chips.join('');
}

/**
 * Update the #active-filter-chips container in the DOM
 */
export function updateFilterChips(state: FilterState): void {
  const container = document.getElementById('active-filter-chips');
  if (!container) return;
  container.innerHTML = renderFilterChips(state);
}

/**
 * Initialize chip removal via event delegation.
 * Listens for clicks on [data-remove-filter] buttons and unchecks
 * the corresponding sidebar filter input, then dispatches filter-change.
 */
export function initFilterChips(): void {
  document.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-remove-filter]');
    if (!btn) return;

    const attr = btn.getAttribute('data-remove-filter');
    if (!attr) return;

    const colonIdx = attr.indexOf(':');
    if (colonIdx === -1) return;
    const section = attr.slice(0, colonIdx);
    const value = attr.slice(colonIdx + 1);

    // Uncheck the corresponding checkbox/radio input
    const input = document.querySelector<HTMLInputElement>(
      `input[data-filter-section="${section}"][data-filter-value="${value}"]`
    );
    if (input) {
      input.checked = false;
      input.dispatchEvent(new Event('change', { bubbles: true }));
      return;
    }

    // For price range, clear both min/max inputs
    if (section === 'price') {
      document.querySelectorAll<HTMLInputElement>('[data-filter-section="price"][data-filter-type]').forEach(i => { i.value = ''; });
      document.dispatchEvent(new CustomEvent('filter-change'));
      return;
    }

    // For min-order, clear the value input
    if (section === 'min-order') {
      document.querySelectorAll<HTMLInputElement>('[data-filter-section="min-order"][data-filter-type]').forEach(i => { i.value = ''; });
      document.dispatchEvent(new CustomEvent('filter-change'));
    }
  });
}
