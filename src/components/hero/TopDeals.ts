/**
 * TopDeals Component
 * Alibaba-style: Swiper slider with individual product cards, spacing between them,
 * and prev/next navigation arrows.
 */

import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

interface TopDealCard {
  name: string;
  href: string;
  price: string;
  originalPrice: string;
  moq: string;
  badge?: string;
  imageKind: TopDealImageKind;
}

type TopDealImageKind =
  | 'headphones'
  | 'smartwatch'
  | 'backpack'
  | 'sneakers'
  | 'sunglasses'
  | 'power-bank'
  | 'bluetooth-speaker'
  | 'led-bulb';

interface TopDealVisual {
  background: string;
  accent: string;
  stroke: string;
  icon: string;
}

const topDealCards: TopDealCard[] = [
  {
    name: 'Wireless Bluetooth Headphones',
    href: '/product-detail.html',
    price: '$12.50',
    originalPrice: '$25.00',
    moq: '2 pieces',
    badge: 'Top picks',
    imageKind: 'headphones',
  },
  {
    name: 'Smart Fitness Watch',
    href: '/product-detail.html',
    price: '$8.99',
    originalPrice: '$18.00',
    moq: '5 pieces',
    imageKind: 'smartwatch',
  },
  {
    name: 'Waterproof Travel Backpack',
    href: '/product-detail.html',
    price: '$6.80',
    originalPrice: '$15.50',
    moq: '10 pieces',
    imageKind: 'backpack',
  },
  {
    name: 'Running Sports Sneakers',
    href: '/product-detail.html',
    price: '$9.20',
    originalPrice: '$22.00',
    moq: '5 pairs',
    imageKind: 'sneakers',
  },
  {
    name: 'Polarized UV Sunglasses',
    href: '/product-detail.html',
    price: '$3.50',
    originalPrice: '$8.99',
    moq: '20 pieces',
    imageKind: 'sunglasses',
  },
  {
    name: '10000mAh Power Bank',
    href: '/product-detail.html',
    price: '$7.20',
    originalPrice: '$14.00',
    moq: '10 pieces',
    imageKind: 'power-bank',
  },
  {
    name: 'Portable Bluetooth Speaker',
    href: '/product-detail.html',
    price: '$5.60',
    originalPrice: '$12.00',
    moq: '10 pieces',
    imageKind: 'bluetooth-speaker',
  },
  {
    name: 'Energy Saving LED Bulb',
    href: '/product-detail.html',
    price: '$1.20',
    originalPrice: '$3.50',
    moq: '50 pieces',
    imageKind: 'led-bulb',
  },
];

const topDealVisuals: Record<TopDealImageKind, TopDealVisual> = {
  headphones: {
    background: 'linear-gradient(180deg, #f0f4ff 0%, #e4ecff 100%)',
    accent: 'rgba(147, 170, 255, 0.35)',
    stroke: '#4a5e9a',
    icon: `
      <path d="M5 12.5V12a7 7 0 0 1 14 0v.5" />
      <path d="M3 14a2 2 0 0 1 2-2h1v5H5a2 2 0 0 1-2-2v-1ZM18 12h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1v-5Z" />
    `,
  },
  smartwatch: {
    background: 'linear-gradient(180deg, #f2fdf6 0%, #e2f8ec 100%)',
    accent: 'rgba(134, 224, 170, 0.35)',
    stroke: '#3a7a54',
    icon: `
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 10v2l1.5 1" />
    `,
  },
  backpack: {
    background: 'linear-gradient(180deg, #fef8f0 0%, #fdefd8 100%)',
    accent: 'rgba(240, 196, 120, 0.35)',
    stroke: '#8a6930',
    icon: `
      <path d="M9 5a3 3 0 0 1 6 0" />
      <rect x="5" y="7" width="14" height="14" rx="2" />
      <path d="M9 7v4h6V7" />
    `,
  },
  sneakers: {
    background: 'linear-gradient(180deg, #f8f0fe 0%, #efe0fd 100%)',
    accent: 'rgba(192, 150, 240, 0.35)',
    stroke: '#6a4a9a',
    icon: `
      <path d="M3 16h18v2H3z" />
      <path d="M4 16c0-4 2-6 5-7l2 2h5c2 0 4 1.5 4 5" />
      <circle cx="7" cy="13" r="0.8" />
      <circle cx="10" cy="11.5" r="0.8" />
    `,
  },
  sunglasses: {
    background: 'linear-gradient(180deg, #fff5f0 0%, #ffe8db 100%)',
    accent: 'rgba(255, 170, 120, 0.35)',
    stroke: '#a05a30',
    icon: `
      <circle cx="7.5" cy="13" r="3.5" />
      <circle cx="16.5" cy="13" r="3.5" />
      <path d="M11 13h2M4 13l-1-2M20 13l1-2" />
    `,
  },
  'power-bank': {
    background: 'linear-gradient(180deg, #f0f8ff 0%, #dceeff 100%)',
    accent: 'rgba(130, 190, 255, 0.35)',
    stroke: '#3570a0',
    icon: `
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <path d="M12 9v6M9 12h6" />
      <path d="M7 9h2M7 12h.01M7 15h2" />
    `,
  },
  'bluetooth-speaker': {
    background: 'linear-gradient(180deg, #f5f0ff 0%, #ebe0ff 100%)',
    accent: 'rgba(170, 140, 255, 0.35)',
    stroke: '#5a40a0',
    icon: `
      <rect x="6" y="4" width="12" height="16" rx="3" />
      <circle cx="12" cy="10" r="3" />
      <circle cx="12" cy="16" r="1.5" />
    `,
  },
  'led-bulb': {
    background: 'linear-gradient(180deg, #fffce8 0%, #fff5c0 100%)',
    accent: 'rgba(255, 220, 80, 0.35)',
    stroke: '#9a8020',
    icon: `
      <path d="M9 18h6M10 21h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2Z" />
      <path d="M10 14h4" />
    `,
  },
};

function renderDealPlaceholder(kind: TopDealImageKind): string {
  const visual = topDealVisuals[kind];
  return `
    <div class="relative w-full h-full overflow-hidden rounded-md" style="background: ${visual.background};" aria-hidden="true">
      <div class="absolute -right-4 -top-4 h-12 w-12 rounded-full opacity-60" style="background: ${visual.accent};"></div>
      <div class="absolute -left-3 bottom-0 h-10 w-10 rounded-full opacity-50" style="background: ${visual.accent};"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <svg
          class="h-16 w-16 transition-transform duration-300 group-hover/deal:scale-110"
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

function lightningBoltIcon(): string {
  return `
    <svg class="h-4 w-auto flex-shrink-0" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5948 30.1888L0.735054 19.2232C0.221831 18.5826 0.604285 17.5239 1.34894 17.5239L6.20746 17.5239C6.77424 10.7461 10.1716 2.20349 20.7371 0.585977C21.9772 0.396125 23.4376 0.585405 24.5 0.585787C16.6194 3.93595 16.33 12.2572 16.2123 17.5239L21.5078 17.5239C22.2623 17.5239 22.6405 18.6069 22.1072 19.2408L11.8082 30.2064C11.4715 30.6066 10.9232 30.5987 10.5948 30.1888Z" fill="url(#paint0_linear_topdeals)"/>
      <defs>
        <linearGradient id="paint0_linear_topdeals" x1="11.4284" y1="30.5016" x2="11.2898" y2="-0.282995" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FF988C"/>
          <stop offset="1" stop-color="#FFECEB"/>
        </linearGradient>
      </defs>
    </svg>
  `;
}

function renderDealSlide(card: TopDealCard): string {
  return `
    <div class="swiper-slide">
      <a
        href="${card.href}"
        class="group/deal relative flex flex-col"
        aria-label="${card.name}"
      >
        ${card.badge ? `
          <span
            class="absolute top-2 left-2 z-10 inline-flex items-center rounded-sm text-[10px] font-bold leading-none"
            style="background-color: var(--topdeals-badge-bg, #DE0505); color: var(--topdeals-badge-text, #ffffff); padding: 2px 4px;"
          >${card.badge}</span>
        ` : ''}

        <!-- Square image area -->
        <div class="aspect-square w-full mb-3 flex-shrink-0">
          ${renderDealPlaceholder(card.imageKind)}
        </div>

        <!-- Price row -->
        <div class="flex items-center gap-1.5">
          <span
            class="inline-flex items-center gap-0.5 rounded-sm"
            style="background: var(--topdeals-price-bg, #FFEDED); padding: 2px 12px 2px 4px;"
          >
            ${lightningBoltIcon()}
            <span
              class="text-[15px] font-bold leading-none"
              style="color: var(--topdeals-price-color, #dc2626);"
            >${card.price}</span>
          </span>
        </div>

        <!-- MOQ -->
        <p
          class="mt-1.5 text-[14px] font-medium leading-none"
          style="color: var(--topdeals-moq-color, #222222);"
        >MOQ: ${card.moq}</p>
      </a>
    </div>
  `;
}

export function initTopDeals(): void {
  const el = document.querySelector<HTMLElement>('.topdeals-swiper');
  if (!el) return;

  new Swiper(el, {
    modules: [Navigation],
    spaceBetween: 12,
    navigation: {
      nextEl: '.topdeals-next',
      prevEl: '.topdeals-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 2.3,
        spaceBetween: 10,
      },
      480: {
        slidesPerView: 3.3,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 12,
      },
      768: {
        slidesPerView: 4.5,
        spaceBetween: 12,
      },
      1024: {
        slidesPerView: 5.5,
        spaceBetween: 14,
      },
      1280: {
        slidesPerView: 6.5,
        spaceBetween: 16,
      },
    },
  });
}

export function TopDeals(): string {
  return `
    <section class="py-4 lg:py-6" aria-label="Top Deals" style="margin-top: 28px;">
      <div class="container-boxed">
        <div class="rounded-md" style="background-color: var(--topdeals-bg, #F8F8F8); padding: 20px 16px;">
        <!-- Section header -->
        <div class="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2
              class="text-[20px] sm:text-[22px] font-bold leading-tight"
              style="color: var(--topdeals-title-color, #111827);"
            >Top Deals</h2>
            <p
              class="mt-0.5 text-[13px]"
              style="color: var(--topdeals-subtitle-color, #6b7280);"
            >Score the lowest prices on Alibaba.com</p>
          </div>
          <a
            href="/deals"
            class="th-topdeals-link flex-shrink-0 text-[13px] font-semibold transition-colors duration-150 hover:underline"
            style="color: var(--topdeals-link-color, #111827);"
          >View more &gt;</a>
        </div>

        <!-- Swiper slider -->
        <div class="group/topdeals relative">
          <div class="swiper topdeals-swiper overflow-hidden" aria-label="Top deal products">
            <div class="swiper-wrapper">
              ${topDealCards.map(card => renderDealSlide(card)).join('')}
            </div>
          </div>

          <!-- Navigation arrows -->
          <button
            aria-label="Previous deals"
            class="topdeals-prev absolute left-0 top-[94px] z-10 hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-lg transition-all duration-200 hover:text-gray-900 opacity-0 pointer-events-none md:flex group-hover/topdeals:opacity-100 group-hover/topdeals:pointer-events-auto disabled:opacity-0 disabled:pointer-events-none"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <button
            aria-label="Next deals"
            class="topdeals-next absolute right-0 top-[94px] z-10 hidden h-10 w-10 translate-x-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-lg transition-all duration-200 hover:text-gray-900 opacity-0 pointer-events-none md:flex group-hover/topdeals:opacity-100 group-hover/topdeals:pointer-events-auto disabled:opacity-0 disabled:pointer-events-none"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
        </div>
      </div>
    </section>
  `;
}
