/**
 * TopRankingHero Component
 * Full-width beige gradient hero banner containing:
 * - Title + subtitle (centered)
 * - Region + Category dropdown filters (centered)
 */

import { t } from '../../i18n';
import { TopRankingFilters } from './TopRankingFilters';

export function TopRankingHero(): string {
  return `
    <div class="relative">
      <!-- Centered content -->
      <div class="relative z-10 container-boxed py-10 sm:py-14 text-center">
        <h1
          class="text-3xl sm:text-[40px] md:text-[44px] font-bold leading-tight text-secondary-800"
          data-i18n="topRankingPage.heroTitle"
        >${t('topRankingPage.heroTitle')}</h1>
        <p
          class="mt-1 text-sm sm:text-base font-medium text-secondary-500"
          data-i18n="topRankingPage.heroSubtitle"
        >${t('topRankingPage.heroSubtitle')}</p>

        <div class="flex justify-center">
          ${TopRankingFilters()}
        </div>
      </div>
    </div>
  `;
}
