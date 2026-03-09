/**
 * TopDealsCategoryTabs Component
 * Horizontal scrollable category tab bar with arrow navigation
 * Matches Alibaba top-deals reference: thick black border on active tab
 */

import { t } from '../../i18n';
import { getTopDealCategories } from '../../data/mockTopDeals';

export function TopDealsCategoryTabs(): string {
  const categories = getTopDealCategories();

  const tabsHtml = categories.map(cat => `
    <button
      type="button"
      class="top-deals-tab flex-shrink-0 whitespace-nowrap px-4 py-3 text-sm transition-colors border-b-[3px] border-transparent"
      :class="activeCategory === '${cat.id}'
        ? '!border-[#222] !text-[#222] font-semibold'
        : 'text-[#666] hover:text-[#222]'"
      @click="setCategory('${cat.id}')"
      data-i18n="${cat.labelKey}"
    >${t(cat.labelKey)}</button>
  `).join('');

  return `
    <div class="relative" x-ref="tabsContainer">
      <!-- Left arrow -->
      <button
        type="button"
        class="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white shadow border border-gray-200 text-gray-500 hover:text-gray-900 transition-all"
        x-show="canScrollLeft"
        x-transition
        @click="scrollTabs('left')"
        aria-label="Scroll left"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      <!-- Tabs container -->
      <div
        class="flex overflow-x-auto scrollbar-hide border-b border-gray-200"
        x-ref="tabsScroll"
        @scroll="updateScrollState()"
        style="scroll-behavior: smooth;"
      >
        ${tabsHtml}
      </div>

      <!-- Right arrow -->
      <button
        type="button"
        class="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white shadow border border-gray-200 text-gray-500 hover:text-gray-900 transition-all"
        x-show="canScrollRight"
        x-transition
        @click="scrollTabs('right')"
        aria-label="Scroll right"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  `;
}

export function initCategoryTabs(): void {
  setTimeout(() => {
    const scrollEl = document.querySelector<HTMLElement>('[x-ref="tabsScroll"]');
    if (scrollEl) {
      scrollEl.dispatchEvent(new Event('scroll'));
    }
  }, 100);
}
