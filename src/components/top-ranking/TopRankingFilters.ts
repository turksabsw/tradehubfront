/**
 * TopRankingFilters Component
 * Region + Category dropdown filters (inside hero)
 * Buttons: bg surface-raised (#f5f5f5), rounded-full, py-3 px-6
 */

import { t } from '../../i18n';
import { getRegionOptions, getRankingMainCategories } from '../../data/mockTopRanking';

export function TopRankingFilters(): string {
  const regions = getRegionOptions();
  const mainCategories = getRankingMainCategories();

  const regionRadios = regions.map(r => `
    <label
      class="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-surface-raised rounded-lg transition-colors"
      @click="pendingRegion = '${r.id}'"
    >
      <input
        type="radio"
        name="region"
        :checked="pendingRegion === '${r.id}'"
        class="w-4 h-4 text-primary-500 border-border-default focus:ring-primary-400"
      />
      <span class="text-sm text-text-secondary" data-i18n="${r.labelKey}">${t(r.labelKey)}</span>
    </label>
  `).join('');

  const categoryLevel1Items = mainCategories.map(cat => {
    const hasSubCats = cat.subCategories && cat.subCategories.length > 0;
    return `
      <button
        type="button"
        class="flex items-center justify-between w-full px-4 py-2.5 text-sm text-text-secondary hover:bg-surface-raised rounded-lg transition-colors text-left"
        @click="${hasSubCats ? `openCategoryLevel2('${cat.id}')` : `selectedMainCategory = '${cat.id}'; pendingSubCategory = null; applyCategoryFilter()`}"
      >
        <span data-i18n="${cat.nameKey}">${t(cat.nameKey)}</span>
        ${hasSubCats ? `<svg class="w-4 h-4 text-text-tertiary flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>` : ''}
      </button>
    `;
  }).join('');

  const categoryLevel2Panels = mainCategories
    .filter(cat => cat.subCategories && cat.subCategories.length > 0)
    .map(cat => {
      const subRadios = cat.subCategories!.map(sub => `
        <label
          class="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-surface-raised rounded-lg transition-colors"
          @click="pendingSubCategory = '${sub.id}'"
        >
          <input
            type="radio"
            name="subcategory"
            :checked="pendingSubCategory === '${sub.id}'"
            class="w-4 h-4 text-primary-500 border-border-default focus:ring-primary-400"
          />
          <span class="text-sm text-text-secondary" data-i18n="${sub.nameKey}">${t(sub.nameKey)}</span>
        </label>
      `).join('');

      return `
        <div x-show="categoryDropdownLevel === 2 && selectedMainCategory === '${cat.id}'" x-cloak>
          <label
            class="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-surface-raised rounded-lg transition-colors"
            @click="pendingSubCategory = null"
          >
            <input
              type="radio"
              name="subcategory"
              :checked="pendingSubCategory === null"
              class="w-4 h-4 text-primary-500 border-border-default focus:ring-primary-400"
            />
            <span class="text-sm text-text-secondary font-medium">${t('topRankingPage.allCategories')} - ${t(cat.nameKey)}</span>
          </label>
          ${subRadios}
          <div class="flex gap-2 pt-3 mt-2 border-t border-border-default px-4 pb-1">
            <button
              type="button"
              class="flex-1 px-4 py-2 text-sm font-medium text-text-secondary bg-surface-raised rounded-lg hover:bg-secondary-200 transition-colors"
              @click="goBackToLevel1()"
              data-i18n="topRankingPage.back"
            >${t('topRankingPage.back')}</button>
            <button
              type="button"
              class="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
              @click="applyCategoryFilter()"
              data-i18n="topRankingPage.apply"
            >${t('topRankingPage.apply')}</button>
          </div>
        </div>
      `;
    }).join('');

  return `
    <div class="flex items-center justify-center gap-3 mt-5">
      <!-- Region Dropdown -->
      <div class="relative" @click.outside="regionDropdownOpen = false">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full bg-surface-raised text-sm font-medium text-secondary-800 hover:bg-secondary-200 transition-colors"
          style="padding: 11px 24px;"
          @click="regionDropdownOpen = !regionDropdownOpen; pendingRegion = activeRegion"
        >
          <svg class="w-4 h-4 text-secondary-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span x-text="$t('topRankingPage.region' + {global:'Global',us:'US',europe:'Europe'}[activeRegion])">${t('topRankingPage.regionEurope')}</span>
          <svg class="w-4 h-4 text-secondary-400 transition-transform" :class="regionDropdownOpen && 'rotate-180'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
        </button>

        <div
          x-show="regionDropdownOpen"
          x-transition
          x-cloak
          class="absolute left-0 top-full mt-2 w-64 bg-surface border border-border-default rounded-xl shadow-lg z-30 p-3"
        >
          <div class="space-y-1">
            ${regionRadios}
          </div>
          <div class="pt-3 mt-2 border-t border-border-default">
            <button
              type="button"
              class="w-full px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
              @click="applyRegion()"
              data-i18n="topRankingPage.apply"
            >${t('topRankingPage.apply')}</button>
          </div>
        </div>
      </div>

      <!-- Category Dropdown -->
      <div class="relative" @click.outside="categoryDropdownOpen = false; categoryDropdownLevel = 1">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full bg-surface-raised text-sm font-medium text-secondary-800 hover:bg-secondary-200 transition-colors"
          style="padding: 11px 24px;"
          @click="categoryDropdownOpen = !categoryDropdownOpen; categoryDropdownLevel = 1"
        >
          <svg class="w-4 h-4 text-secondary-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          <span x-text="selectedMainCategory ? $t('topRankingPage.cat' + selectedMainCategory.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')) : $t('topRankingPage.allCategories')">${t('topRankingPage.allCategories')}</span>
          <svg class="w-4 h-4 text-secondary-400 transition-transform" :class="categoryDropdownOpen && 'rotate-180'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
        </button>

        <div
          x-show="categoryDropdownOpen"
          x-transition
          x-cloak
          class="absolute left-0 top-full mt-2 w-72 bg-surface border border-border-default rounded-xl shadow-lg z-30 p-3"
        >
          <div x-show="categoryDropdownLevel === 1">
            <button
              type="button"
              class="flex items-center w-full px-4 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-raised rounded-lg transition-colors text-left"
              @click="selectedMainCategory = null; pendingSubCategory = null; applyCategoryFilter()"
            >
              <span data-i18n="topRankingPage.allCategories">${t('topRankingPage.allCategories')}</span>
            </button>
            <div class="my-1 border-t border-border-default"></div>
            <div class="space-y-0.5">
              ${categoryLevel1Items}
            </div>
          </div>
          ${categoryLevel2Panels}
        </div>
      </div>
    </div>
  `;
}
