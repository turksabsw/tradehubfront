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
      <!-- Full-width background (clipped for decorative elements) -->
      <div
        class="absolute inset-0 overflow-hidden"
        style="background: linear-gradient(0deg, var(--color-primary-100, #fdf0c3) 1%, var(--color-primary-50, #fef9e7) 100%);"
      >
        <div class="absolute -top-10 left-[5%] w-48 h-48 rounded-full bg-primary-200/20"></div>
        <div class="absolute top-1/3 right-[3%] w-36 h-36 rounded-full bg-primary-200/15"></div>
      </div>

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
