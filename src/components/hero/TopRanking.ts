/**
 * TopRanking Component
 * Horizontal scrollable category ranking cards with badges and trend labels.
 */

import topBadgeUrl from '../../assets/images/top.avif';

interface TopRankingCard {
  name: string;
  href: string;
  label: string;
  imageKind: TopRankingImageKind;
}

type TopRankingImageKind =
  | 'electronics'
  | 'fashion'
  | 'home-garden'
  | 'beauty'
  | 'automotive'
  | 'sports'
  | 'industrial'
  | 'toys';

interface TopRankingVisual {
  background: string;
  accent: string;
  stroke: string;
  icon: string;
}

const topRankingCards: TopRankingCard[] = [
  {
    name: 'Consumer Electronics',
    href: '/ranking/consumer-electronics',
    label: 'Hot selling',
    imageKind: 'electronics',
  },
  {
    name: 'Fashion & Apparel',
    href: '/ranking/fashion-apparel',
    label: 'Hot selling',
    imageKind: 'fashion',
  },
  {
    name: 'Home & Garden',
    href: '/ranking/home-garden',
    label: 'Rising trend',
    imageKind: 'home-garden',
  },
  {
    name: 'Beauty & Health',
    href: '/ranking/beauty-health',
    label: 'Hot selling',
    imageKind: 'beauty',
  },
  {
    name: 'Auto Parts',
    href: '/ranking/automotive',
    label: 'Steady growth',
    imageKind: 'automotive',
  },
  {
    name: 'Sports & Outdoors',
    href: '/ranking/sports-outdoors',
    label: 'Hot selling',
    imageKind: 'sports',
  },
  {
    name: 'Industrial Equipment',
    href: '/ranking/industrial',
    label: 'Rising trend',
    imageKind: 'industrial',
  },
  {
    name: 'Toys & Hobbies',
    href: '/ranking/toys-hobbies',
    label: 'Hot selling',
    imageKind: 'toys',
  },
];

const topRankingVisuals: Record<TopRankingImageKind, TopRankingVisual> = {
  electronics: {
    background: 'linear-gradient(135deg, #eef2ff 0%, #dbeafe 100%)',
    accent: 'rgba(129, 140, 248, 0.25)',
    stroke: '#4f5fb3',
    icon: `
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 7h6M9 10h6M9 13h3" />
      <circle cx="12" cy="17.5" r="1" />
    `,
  },
  fashion: {
    background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
    accent: 'rgba(244, 114, 182, 0.25)',
    stroke: '#a3456e',
    icon: `
      <path d="M12 3 8 7h3v6H8l4 5 4-5h-3V7h3l-4-4Z" />
      <path d="M7 19h10" />
    `,
  },
  'home-garden': {
    background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
    accent: 'rgba(52, 211, 153, 0.25)',
    stroke: '#2d8a5e',
    icon: `
      <path d="M3 21h18M5 21V10l7-7 7 7v11" />
      <rect x="9" y="14" width="6" height="7" />
    `,
  },
  beauty: {
    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    accent: 'rgba(251, 191, 36, 0.25)',
    stroke: '#92700c',
    icon: `
      <path d="M12 2C8.5 2 6 4.5 6 7c0 3 6 8 6 8s6-5 6-8c0-2.5-2.5-5-6-5Z" />
      <path d="M8 18h8M9 21h6" />
    `,
  },
  automotive: {
    background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
    accent: 'rgba(100, 116, 139, 0.25)',
    stroke: '#475569',
    icon: `
      <path d="M5 14h14l-1.5-5a2 2 0 0 0-1.9-1.4H8.4A2 2 0 0 0 6.5 9L5 14Z" />
      <circle cx="7.5" cy="17" r="1.5" />
      <circle cx="16.5" cy="17" r="1.5" />
      <path d="M3 14v4h2.1M18.9 18H21v-4" />
    `,
  },
  sports: {
    background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
    accent: 'rgba(251, 146, 60, 0.25)',
    stroke: '#b45309',
    icon: `
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3c-2 3-2 6 0 9s2 6 0 9" />
      <path d="M3 12h18" />
    `,
  },
  industrial: {
    background: 'linear-gradient(135deg, #f5f5f4 0%, #e7e5e4 100%)',
    accent: 'rgba(120, 113, 108, 0.25)',
    stroke: '#57534e',
    icon: `
      <path d="M4 21V10l5-3v5l5-3v5l5-3v7H4Z" />
      <path d="M4 21h16" />
    `,
  },
  toys: {
    background: 'linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%)',
    accent: 'rgba(192, 132, 252, 0.25)',
    stroke: '#7e22ce',
    icon: `
      <circle cx="12" cy="10" r="5" />
      <path d="M12 15v4M9 21h6" />
      <path d="M10 8.5l1 1.5 2-3" />
    `,
  },
};

function renderRankingPlaceholder(kind: TopRankingImageKind): string {
  const visual = topRankingVisuals[kind];
  return `
    <div class="relative h-full w-full overflow-hidden rounded-md" style="background: ${visual.background};" aria-hidden="true">
      <div class="absolute -right-5 -top-5 h-14 w-14 rounded-full opacity-50" style="background: ${visual.accent};"></div>
      <div class="absolute -left-4 bottom-1 h-12 w-12 rounded-full opacity-40" style="background: ${visual.accent};"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <svg
          class="h-14 w-14 transition-transform duration-300 group-hover/rank:scale-110"
          fill="none"
          stroke-width="1.4"
          viewBox="0 0 24 24"
          style="stroke: ${visual.stroke};"
        >
          ${visual.icon}
        </svg>
      </div>
    </div>
  `;
}

function renderRankingCard(card: TopRankingCard): string {
  return `
    <a
      href="${card.href}"
      class="group/rank relative flex-shrink-0 flex flex-col w-[188px] h-[262px] rounded-md border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
      style="background: var(--topranking-card-bg, #ffffff); border-color: var(--topranking-card-border, #e5e7eb); padding: 12px 12px 16px;"
      aria-label="${card.name}"
    >
      <!-- Image area with badge -->
      <div class="relative w-full flex-1">
        <div class="h-full w-full overflow-hidden rounded-md">
          ${renderRankingPlaceholder(card.imageKind)}
        </div>
        <!-- TOP badge — overlaps bottom edge of image -->
        <div class="absolute -bottom-5 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center">
          <img
            src="${topBadgeUrl}"
            alt=""
            class="h-[48px] w-[48px] object-contain drop-shadow"
            loading="lazy"
          />
        </div>
      </div>

      <!-- Info area -->
      <div class="flex flex-col" style="margin-top: 28px;">
        <p
          class="truncate text-[16px] font-semibold leading-tight"
          style="color: var(--topranking-name-color, #222222);"
          title="${card.name}"
        >${card.name}</p>
        <p
          class="truncate text-[14px] leading-none"
          style="color: var(--topranking-label-color, #666666); margin-top: 2px;"
        >${card.label}</p>
      </div>
    </a>
  `;
}

/** No-op init — TopRanking uses native scroll, no JS library needed. */
export function initTopRanking(): void {
  // Placeholder for future enhancements
}

export function TopRanking(): string {
  return `
    <section class="py-4 lg:py-6" aria-label="Top Ranking" style="margin-top: 28px;">
      <div class="container-boxed">
        <div class="relative overflow-hidden rounded-md" style="background-color: var(--topranking-bg, #F5F5F5);">
          <div style="padding: 24px 20px 20px;">
            <!-- Section header -->
            <div class="mb-4 flex items-end justify-between gap-4">
              <div>
                <h2
                  class="text-[20px] sm:text-[22px] font-bold leading-tight"
                  style="color: var(--topranking-title-color, #111827);"
                >Top Ranking</h2>
                <p
                  class="mt-0.5 text-[13px]"
                  style="color: var(--topranking-subtitle-color, #6b7280);"
                >Navigate trends with data-driven rankings</p>
              </div>
              <a
                href="/ranking"
                class="th-topranking-link flex-shrink-0 text-[13px] font-semibold transition-colors duration-150 hover:underline"
                style="color: var(--topranking-link-color, #111827);"
              >View more &gt;</a>
            </div>

            <!-- Scrollable cards -->
            <div class="relative">
              <div
                class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
                role="list"
                aria-label="Top ranking categories"
              >
                ${topRankingCards.map(card => `<div role="listitem">${renderRankingCard(card)}</div>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
