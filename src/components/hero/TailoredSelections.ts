/**
 * TailoredSelections Component
 * Alibaba-style: Swiper slider with curated collection cards.
 * Each card has a title, views subtitle, two product images side by side, and prices.
 */

import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

interface CollectionProduct {
  name: string;
  price: string;
  imageKind: TailoredImageKind;
}

interface TailoredCollection {
  title: string;
  views: string;
  href: string;
  products: [CollectionProduct, CollectionProduct];
}

type TailoredImageKind =
  | 'laptop'
  | 'tablet'
  | 'camera'
  | 'drone'
  | 'jacket'
  | 'handbag'
  | 'headphones'
  | 'watch'
  | 'speaker'
  | 'sneakers';

interface TailoredVisual {
  background: string;
  accent: string;
  stroke: string;
  icon: string;
}

const tailoredCollections: TailoredCollection[] = [
  {
    title: 'Office Tech Essentials',
    views: '28K+ views',
    href: '/collection/office-tech',
    products: [
      { name: 'Business Laptop', price: '$320.00', imageKind: 'laptop' },
      { name: 'Drawing Tablet', price: '$85.00', imageKind: 'tablet' },
    ],
  },
  {
    title: 'Photography Gear',
    views: '15K+ views',
    href: '/collection/photography',
    products: [
      { name: 'Mirrorless Camera', price: '$480.00', imageKind: 'camera' },
      { name: 'FPV Drone', price: '$260.00', imageKind: 'drone' },
    ],
  },
  {
    title: 'Fashion Forward',
    views: '42K+ views',
    href: '/collection/fashion',
    products: [
      { name: 'Winter Jacket', price: '$45.00', imageKind: 'jacket' },
      { name: 'Leather Handbag', price: '$32.00', imageKind: 'handbag' },
    ],
  },
  {
    title: 'Audio & Sound',
    views: '31K+ views',
    href: '/collection/audio',
    products: [
      { name: 'Wireless Headphones', price: '$28.50', imageKind: 'headphones' },
      { name: 'Bluetooth Speaker', price: '$19.00', imageKind: 'speaker' },
    ],
  },
  {
    title: 'Smart Accessories',
    views: '56K+ views',
    href: '/collection/smart-accessories',
    products: [
      { name: 'Smart Watch', price: '$42.00', imageKind: 'watch' },
      { name: 'Sport Sneakers', price: '$35.00', imageKind: 'sneakers' },
    ],
  },
];

const tailoredVisuals: Record<TailoredImageKind, TailoredVisual> = {
  laptop: {
    background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
    accent: 'rgba(129, 140, 248, 0.3)',
    stroke: '#4f5fb3',
    icon: `
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M2 20h20M8 17h8" />
    `,
  },
  tablet: {
    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    accent: 'rgba(74, 222, 128, 0.3)',
    stroke: '#2d8a5e',
    icon: `
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M10 18h4" />
    `,
  },
  camera: {
    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    accent: 'rgba(251, 191, 36, 0.3)',
    stroke: '#92700c',
    icon: `
      <path d="M3 9a2 2 0 0 1 2-2h2l1-2h8l1 2h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <circle cx="12" cy="13" r="3.5" />
    `,
  },
  drone: {
    background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
    accent: 'rgba(148, 163, 184, 0.3)',
    stroke: '#475569',
    icon: `
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <circle cx="5" cy="5" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M7 7l2 2M15 7l2-2M7 17l2-2M15 17l2 2" />
    `,
  },
  jacket: {
    background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
    accent: 'rgba(244, 114, 182, 0.3)',
    stroke: '#a3456e',
    icon: `
      <path d="M8 3h8l2 6v12H6V9l2-6Z" />
      <path d="M12 3v8M8 3 6 9M16 3l2 6" />
    `,
  },
  handbag: {
    background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
    accent: 'rgba(251, 146, 60, 0.3)',
    stroke: '#b45309',
    icon: `
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V6a4 4 0 0 1 8 0v4" />
      <path d="M4 14h16" />
    `,
  },
  headphones: {
    background: 'linear-gradient(135deg, #f0f4ff 0%, #e4ecff 100%)',
    accent: 'rgba(147, 170, 255, 0.3)',
    stroke: '#4a5e9a',
    icon: `
      <path d="M5 12.5V12a7 7 0 0 1 14 0v.5" />
      <path d="M3 14a2 2 0 0 1 2-2h1v5H5a2 2 0 0 1-2-2v-1ZM18 12h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1v-5Z" />
    `,
  },
  watch: {
    background: 'linear-gradient(135deg, #f2fdf6 0%, #e2f8ec 100%)',
    accent: 'rgba(134, 224, 170, 0.3)',
    stroke: '#3a7a54',
    icon: `
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 10v2l1.5 1" />
    `,
  },
  speaker: {
    background: 'linear-gradient(135deg, #f5f0ff 0%, #ebe0ff 100%)',
    accent: 'rgba(170, 140, 255, 0.3)',
    stroke: '#5a40a0',
    icon: `
      <rect x="6" y="4" width="12" height="16" rx="3" />
      <circle cx="12" cy="10" r="3" />
      <circle cx="12" cy="16" r="1.5" />
    `,
  },
  sneakers: {
    background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
    accent: 'rgba(251, 146, 60, 0.3)',
    stroke: '#b45309',
    icon: `
      <path d="M3 16h18v2H3z" />
      <path d="M4 16c0-4 2-6 5-7l2 2h5c2 0 4 1.5 4 5" />
      <circle cx="7" cy="13" r="0.8" />
      <circle cx="10" cy="11.5" r="0.8" />
    `,
  },
};

function renderProductPlaceholder(kind: TailoredImageKind): string {
  const visual = tailoredVisuals[kind];
  return `
    <div class="relative h-full w-full overflow-hidden rounded-md" style="background: ${visual.background};" aria-hidden="true">
      <div class="absolute -right-3 -top-3 h-8 w-8 rounded-full opacity-50" style="background: ${visual.accent};"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <svg
          class="h-10 w-10"
          fill="none"
          stroke-width="1.3"
          viewBox="0 0 24 24"
          style="stroke: ${visual.stroke};"
        >
          ${visual.icon}
        </svg>
      </div>
    </div>
  `;
}

function renderCollectionSlide(collection: TailoredCollection): string {
  const [product1, product2] = collection.products;
  return `
    <div class="swiper-slide tailored-slide">
      <a
        href="${collection.href}"
        class="group/col flex flex-col h-full rounded-md overflow-hidden"
        style="background: var(--tailored-card-bg, #ffffff); padding: 16px;"
        aria-label="${collection.title}"
      >
        <!-- Title -->
        <h3
          class="truncate font-bold leading-tight"
          style="color: var(--tailored-collection-title-color, #222222); font-size: 20px;"
        >${collection.title}</h3>

        <!-- Views subtitle -->
        <p
          style="color: var(--tailored-views-color, #767676); font-size: 16px; margin: 0 0 12px;"
        >${collection.views}</p>

        <!-- Product images side by side — 164x164 each -->
        <div class="flex gap-2 flex-1">
          <div class="flex-1 flex flex-col">
            <div class="aspect-square w-full">
              ${renderProductPlaceholder(product1.imageKind)}
            </div>
            <p
              class="font-bold leading-none truncate"
              style="color: var(--tailored-price-color, #222222); font-size: 20px; margin-top: 8px;"
            >${product1.price}</p>
          </div>
          <div class="flex-1 flex flex-col">
            <div class="aspect-square w-full">
              ${renderProductPlaceholder(product2.imageKind)}
            </div>
            <p
              class="font-bold leading-none truncate"
              style="color: var(--tailored-price-color, #222222); font-size: 20px; margin-top: 8px;"
            >${product2.price}</p>
          </div>
        </div>
      </a>
    </div>
  `;
}

export function initTailoredSelections(): void {
  const el = document.querySelector<HTMLElement>('.tailored-swiper');
  if (!el) return;

  new Swiper(el, {
    modules: [Navigation],
    spaceBetween: 8,
    navigation: {
      nextEl: '.tailored-next',
      prevEl: '.tailored-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1.2,
        spaceBetween: 8,
      },
      480: {
        slidesPerView: 1.5,
        spaceBetween: 8,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 8,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 8,
      },
    },
  });
}

export function TailoredSelections(): string {
  return `
    <section class="py-4 lg:py-6" aria-label="Tailored Selections" style="margin-top: 28px;">
      <div class="container-boxed">
        <div class="rounded-md" style="background-color: var(--tailored-bg, #F5F5F5); padding: 20px 16px;">
          <!-- Section header -->
          <div class="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2
                class="text-[20px] sm:text-[22px] font-bold leading-tight"
                style="color: var(--tailored-title-color, #111827);"
              >Tailored Selections</h2>
            </div>
            <a
              href="/collections"
              class="th-tailored-link flex-shrink-0 text-[13px] font-semibold transition-colors duration-150 hover:underline"
              style="color: var(--tailored-link-color, #111827);"
            >View more &gt;</a>
          </div>

          <!-- Swiper slider -->
          <div class="group/tailored relative">
            <div class="swiper tailored-swiper overflow-hidden" aria-label="Tailored selection collections">
              <div class="swiper-wrapper">
                ${tailoredCollections.map(c => renderCollectionSlide(c)).join('')}
              </div>
            </div>

            <!-- Navigation arrows -->
            <button
              aria-label="Previous collections"
              class="tailored-prev absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-lg transition-all duration-200 hover:text-gray-900 opacity-0 pointer-events-none md:flex group-hover/tailored:opacity-100 group-hover/tailored:pointer-events-auto disabled:opacity-0 disabled:pointer-events-none"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>

            <button
              aria-label="Next collections"
              class="tailored-next absolute right-0 top-1/2 z-10 hidden h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-lg transition-all duration-200 hover:text-gray-900 opacity-0 pointer-events-none md:flex group-hover/tailored:opacity-100 group-hover/tailored:pointer-events-auto disabled:opacity-0 disabled:pointer-events-none"
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
