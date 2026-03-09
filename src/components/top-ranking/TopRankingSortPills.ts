/**
 * TopRankingSortPills Component
 * Hot selling / Most popular / Best reviewed sort pills
 * Uses project theme colors
 */

import { t } from '../../i18n';

export function TopRankingSortPills(): string {
  const pills = [
    { id: 'hot-selling', labelKey: 'topRankingPage.sortHotSelling' },
    { id: 'most-popular', labelKey: 'topRankingPage.sortMostPopular' },
    { id: 'best-reviewed', labelKey: 'topRankingPage.sortBestReviewed' },
  ];

  const pillsHtml = pills.map(pill => `
    <button
      type="button"
      class="px-4 py-1.5 text-sm rounded-full border transition-colors"
      :class="activeSort === '${pill.id}'
        ? 'border-secondary-800 text-text-primary font-medium'
        : 'border-border-default text-text-tertiary hover:border-border-strong'"
      @click="setSort('${pill.id}')"
      data-i18n="${pill.labelKey}"
    >${t(pill.labelKey)}</button>
  `).join('');

  return `
    <div class="flex items-center gap-2 py-3">
      ${pillsHtml}
    </div>
  `;
}
