/**
 * RecommendationSlider Component
 * Single-image recommendation cards in a Swiper carousel.
 */

import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

type RecommendationImageKind =
  | 'vending-machine'
  | 'wedding-dress'
  | 'electric-car'
  | 'portable-ac'
  | 'office-chair'
  | 'set-top-box'
  | 'jewelry-components'
  | 'cargo-service'
  | 'sports-shoes';

interface RecommendationCard {
  title: string;
  subtitle?: string;
  href: string;
  imageKind: RecommendationImageKind;
  imageAlt: string;
}

interface RecommendationVisual {
  background: string;
  accent: string;
  stroke: string;
  icon: string;
}

const recommendationCards: RecommendationCard[] = [
  {
    title: 'Frequently searched',
    subtitle: 'Vending Machines',
    href: 'products.html?q=vending+machines',
    imageKind: 'vending-machine',
    imageAlt: 'Vending machine product card',
  },
  {
    title: 'Frequently searched',
    subtitle: 'Wedding Dresses',
    href: 'products.html?q=wedding+dresses',
    imageKind: 'wedding-dress',
    imageAlt: 'Wedding dress product card',
  },
  {
    title: 'Frequently searched',
    subtitle: 'Electric Cars',
    href: 'products.html?q=electric+cars',
    imageKind: 'electric-car',
    imageAlt: 'Electric car product card',
  },
  {
    title: 'Frequently searched',
    subtitle: 'Portable Air Conditioners',
    href: 'products.html?q=portable+air+conditioners',
    imageKind: 'portable-ac',
    imageAlt: 'Portable air conditioner product card',
  },
  {
    title: 'Frequently searched',
    subtitle: 'Office Chairs',
    href: 'products.html?q=office+chairs',
    imageKind: 'office-chair',
    imageAlt: 'Office chair product card',
  },
  {
    title: 'Frequently searched',
    subtitle: 'Set-top Boxes',
    href: 'products.html?q=set-top+box',
    imageKind: 'set-top-box',
    imageAlt: 'Set-top box product card',
  },
  {
    title: 'Frequently searched',
    subtitle: 'Jewelry Components',
    href: 'products.html?q=jewelry+components',
    imageKind: 'jewelry-components',
    imageAlt: 'Jewelry components product card',
  },
  {
    title: 'Frequently searched',
    subtitle: 'Cargo Services',
    href: 'products.html?q=cargo+services',
    imageKind: 'cargo-service',
    imageAlt: 'Cargo service product card',
  },
  {
    title: 'Frequently searched',
    subtitle: 'Sports Shoes',
    href: 'products.html?q=sports+shoes',
    imageKind: 'sports-shoes',
    imageAlt: 'Sports shoes product card',
  },
];

const recommendationVisuals: Record<RecommendationImageKind, RecommendationVisual> = {
  'vending-machine': {
    background: 'linear-gradient(180deg, #f6f8ff 0%, #edf2ff 100%)',
    accent: 'rgba(157, 172, 255, 0.45)',
    stroke: '#49578d',
    icon: `
      <rect x="6.25" y="2.75" width="11.5" height="18.5" rx="1.5" />
      <rect x="8.25" y="5.25" width="6.2" height="5.8" rx="0.7" />
      <path d="M15.3 5.8v11.8M9 13.8h4.1M9 15.9h4.1" />
      <rect x="8.6" y="17.9" width="3.4" height="1.9" rx="0.45" />
    `,
  },
  'wedding-dress': {
    background: 'linear-gradient(180deg, #fbfbfe 0%, #f2f3fa 100%)',
    accent: 'rgba(212, 219, 255, 0.45)',
    stroke: '#707dac',
    icon: `
      <circle cx="12" cy="5.2" r="1.8" />
      <path d="M10 8h4l1.6 3.4-2 1.6v7H10.4v-7l-2-1.6L10 8Z" />
      <path d="M8.9 13.7h6.2" />
    `,
  },
  'electric-car': {
    background: 'linear-gradient(180deg, #f4f9ff 0%, #eaf3ff 100%)',
    accent: 'rgba(168, 211, 255, 0.5)',
    stroke: '#3f6f9b',
    icon: `
      <path d="M4.2 14.4h15.6l-1.2-3.9a1.9 1.9 0 0 0-1.84-1.35H7.18a1.9 1.9 0 0 0-1.84 1.35l-1.14 3.9Z" />
      <circle cx="7.6" cy="17.1" r="1.55" />
      <circle cx="16.4" cy="17.1" r="1.55" />
      <path d="M9.6 11.5h4.8" />
    `,
  },
  'portable-ac': {
    background: 'linear-gradient(180deg, #f3fcff 0%, #eaf7fb 100%)',
    accent: 'rgba(148, 223, 240, 0.5)',
    stroke: '#3a7b8a',
    icon: `
      <rect x="5.3" y="3.4" width="13.4" height="17.2" rx="2" />
      <path d="M8.2 7.1h7.6M8.2 10.1h7.6M8.2 13.1h7.6M10.5 17.1h3" />
    `,
  },
  'office-chair': {
    background: 'linear-gradient(180deg, #fcf8f2 0%, #f6efe5 100%)',
    accent: 'rgba(239, 202, 152, 0.45)',
    stroke: '#876443',
    icon: `
      <path d="M9.1 4.6h5.8v5.2H9.1z" />
      <path d="M7.8 10.8h8.4l1.4 2.8H6.4l1.4-2.8Z" />
      <path d="M12 13.6v4.1m-4.1 0h8.2m-6 0-1.6 2m5.8-2 1.6 2" />
    `,
  },
  'set-top-box': {
    background: 'linear-gradient(180deg, #f5f6ff 0%, #ecefff 100%)',
    accent: 'rgba(168, 173, 255, 0.45)',
    stroke: '#525c9f',
    icon: `
      <rect x="4.6" y="8.7" width="14.8" height="6.8" rx="1.5" />
      <path d="M7.3 11.8h7.9M6.8 18.2h10.4" />
      <circle cx="17.1" cy="11.8" r="0.8" />
    `,
  },
  'jewelry-components': {
    background: 'linear-gradient(180deg, #fffaf1 0%, #fff3df 100%)',
    accent: 'rgba(255, 207, 128, 0.45)',
    stroke: '#9d7440',
    icon: `
      <path d="M6.4 9.7 12 3.4l5.6 6.3L12 20.6 6.4 9.7Z" />
      <path d="M6.4 9.7h11.2M9.1 9.7 12 3.4l2.9 6.3" />
    `,
  },
  'cargo-service': {
    background: 'linear-gradient(180deg, #f5fbf4 0%, #edf7ec 100%)',
    accent: 'rgba(165, 223, 164, 0.5)',
    stroke: '#4f7e53',
    icon: `
      <rect x="3.7" y="7.4" width="10.7" height="8.8" rx="1.1" />
      <path d="M14.4 10.1h3.2l2 2.1v4h-5.2z" />
      <circle cx="8" cy="17.2" r="1.2" />
      <circle cx="16.9" cy="17.2" r="1.2" />
    `,
  },
  'sports-shoes': {
    background: 'linear-gradient(180deg, #f8f8f8 0%, #efefef 100%)',
    accent: 'rgba(197, 197, 197, 0.5)',
    stroke: '#666666',
    icon: `
      <path d="M4.1 14.5c2.3.3 3.8-.2 5.4-1.5l2.2 1.5H20v3.1H4.1v-3.1Z" />
      <path d="M9 14.5V12M11 14.5v-1.8M13 14.5v-1.3M6.2 17.6h11.7" />
    `,
  },
};

function renderPlaceholderVisual(kind: RecommendationImageKind): string {
  const visual = recommendationVisuals[kind];

  return `
    <div class="relative h-full w-full overflow-hidden rounded-md" style="background: ${visual.background};" aria-hidden="true">
      <div class="absolute -right-8 -top-8 h-20 w-20 rounded-full opacity-60" style="background: ${visual.accent};"></div>
      <div class="absolute -left-5 bottom-0 h-16 w-16 rounded-full opacity-55" style="background: ${visual.accent};"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <svg
          class="h-24 w-24 transition-transform duration-300 group-hover/card:scale-105 group-focus-visible/card:scale-105"
          fill="none"
          stroke-width="1.45"
          viewBox="0 0 24 24"
          style="stroke: ${visual.stroke};"
        >
          ${visual.icon}
        </svg>
      </div>
    </div>
  `;
}

function renderCard(card: RecommendationCard): string {
  const cardAriaLabel = card.subtitle ? `${card.title} - ${card.subtitle}` : card.title;

  return `
    <div class="swiper-slide recommendation-slide h-full">
      <a
        href="${card.href}"
        aria-label="${cardAriaLabel}"
        title="${card.imageAlt}"
        class="th-card group/card mx-auto flex h-full w-full flex-col transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-1 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-400"
        style="background-color:var(--hero-card-bg);border-color:var(--hero-card-border-color);border-radius:var(--hero-card-radius)"
      >
        <div class="mb-2">
          <h3 class="text-[16px] font-bold leading-tight dark:text-white" style="color:var(--hero-title-color)">${card.title}</h3>
          ${card.subtitle ? `<p class="mt-0.5 truncate text-[12px] font-semibold leading-tight text-gray-700 dark:text-gray-300">${card.subtitle}</p>` : ''}
        </div>
        <div class="min-h-0 flex-1">
          ${renderPlaceholderVisual(card.imageKind)}
        </div>
      </a>
    </div>
  `;
}

export function RecommendationSlider(): string {
  return `
    <div class="group/recommendation relative recommendation-slider-wrapper h-[260px] lg:h-[300px] px-4 lg:px-0">
      <div class="swiper recommendation-swiper h-full" aria-label="Frequently searched product slider">
        <div class="swiper-wrapper h-full">
          ${recommendationCards.map(card => renderCard(card)).join('')}
        </div>
      </div>

      <div class="reco-pagination mt-3 flex justify-center hidden"></div>

      <button
        aria-label="Previous recommendations"
        class="rec-swiper-prev absolute left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-lg transition-all duration-200 hover:text-gray-900 opacity-0 pointer-events-none md:flex group-hover/recommendation:opacity-100 group-hover/recommendation:pointer-events-auto focus-visible:opacity-100 focus-visible:pointer-events-auto focus-visible:ring-2 focus-visible:ring-primary-300 disabled:opacity-0 disabled:pointer-events-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:text-white"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      <button
        aria-label="Next recommendations"
        class="rec-swiper-next absolute right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-lg transition-all duration-200 hover:text-gray-900 opacity-0 pointer-events-none md:flex group-hover/recommendation:opacity-100 group-hover/recommendation:pointer-events-auto focus-visible:opacity-100 focus-visible:pointer-events-auto focus-visible:ring-2 focus-visible:ring-primary-300 disabled:opacity-0 disabled:pointer-events-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:text-white"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  `;
}

export function initRecommendationSlider(): void {
  const sliderElement = document.querySelector<HTMLElement>('.recommendation-swiper');
  if (!sliderElement) return;

  new Swiper(sliderElement, {
    modules: [Autoplay, Navigation, Pagination],
    loop: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 8,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: '.rec-swiper-next',
      prevEl: '.rec-swiper-prev',
    },
    pagination: {
      el: '.reco-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 12,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      960: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });
}
