/**
 * TopRankingCategoryTabs Component
 * Horizontal scrollable category tab bar with arrow navigation
 * Uses project theme colors
 */

import { t } from '../../i18n';
import { getRankingTabs } from '../../data/mockTopRanking';

export function TopRankingCategoryTabs(): string {
  const tabs = getRankingTabs();

  const tabsHtml = tabs.map(tab => `
    <button
      type="button"
      class="top-ranking-tab flex-shrink-0 whitespace-nowrap px-4 py-3 text-sm transition-colors border-b-[3px] border-transparent"
      :class="activeTab === '${tab.id}'
        ? '!border-secondary-800 !text-text-primary font-semibold'
        : 'text-text-tertiary hover:text-text-primary'"
      @click="setTab('${tab.id}')"
      data-i18n="${tab.labelKey}"
    >${t(tab.labelKey)}</button>
  `).join('');

  return `
    <div class="relative" x-ref="tabsContainer">
      <!-- Left arrow -->
      <button
        type="button"
        class="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-surface shadow border border-border-default text-text-tertiary hover:text-text-primary transition-all"
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
        class="flex overflow-x-auto scrollbar-hide border-b border-border-default"
        x-ref="tabsScroll"
        @scroll="updateScrollState()"
        style="scroll-behavior: smooth;"
      >
        ${tabsHtml}
      </div>

      <!-- Right arrow -->
      <button
        type="button"
        class="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-surface shadow border border-border-default text-text-tertiary hover:text-text-primary transition-all"
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

export function initRankingCategoryTabs(): void {
  setTimeout(() => {
    const scrollEl = document.querySelector<HTMLElement>('[x-ref="tabsScroll"]');
    if (scrollEl) {
      scrollEl.dispatchEvent(new Event('scroll'));
    }
  }, 100);
}
