/**
 * TopDealsHero Component
 * Gradient hero banner for Top Deals page (Alibaba-style)
 */

import { t } from '../../i18n';

function lightningBoltIcon(): string {
  return `
    <svg class="h-8 w-8 sm:h-10 sm:w-10" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5948 30.1888L0.735054 19.2232C0.221831 18.5826 0.604285 17.5239 1.34894 17.5239L6.20746 17.5239C6.77424 10.7461 10.1716 2.20349 20.7371 0.585977C21.9772 0.396125 23.4376 0.585405 24.5 0.585787C16.6194 3.93595 16.33 12.2572 16.2123 17.5239L21.5078 17.5239C22.2623 17.5239 22.6405 18.6069 22.1072 19.2408L11.8082 30.2064C11.4715 30.6066 10.9232 30.5987 10.5948 30.1888Z" fill="url(#paint0_linear_hero)"/>
      <defs>
        <linearGradient id="paint0_linear_hero" x1="11.4284" y1="30.5016" x2="11.2898" y2="-0.282995" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FF988C"/>
          <stop offset="1" stop-color="#FFECEB"/>
        </linearGradient>
      </defs>
    </svg>
  `;
}

export function TopDealsHero(): string {
  return `
    <section
      class="relative overflow-hidden rounded-xl px-6 py-8 sm:py-12 md:py-16 text-center"
      style="background: var(--topdeals-page-hero-gradient, linear-gradient(135deg, #ff6b35 0%, #ee2737 50%, #c41442 100%));"
    >
      <div class="relative z-10 flex flex-col items-center gap-2">
        <div class="flex items-center gap-2">
          ${lightningBoltIcon()}
          <h1
            class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight"
            data-i18n="topDealsPage.heroTitle"
          >${t('topDealsPage.heroTitle')}</h1>
          ${lightningBoltIcon()}
        </div>
        <p
          class="text-sm sm:text-base md:text-lg text-white/90 font-medium"
          data-i18n="topDealsPage.heroSubtitle"
        >${t('topDealsPage.heroSubtitle')}</p>
      </div>
      <!-- Decorative circles -->
      <div class="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/5"></div>
      <div class="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/5"></div>
      <div class="absolute top-1/2 left-1/4 w-20 h-20 rounded-full bg-white/5"></div>
    </section>
  `;
}
