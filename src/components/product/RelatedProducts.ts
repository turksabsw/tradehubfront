/**
 * RelatedProducts Component
 * Horizontal Swiper slider of related product cards.
 * Reuses ProductGrid card rendering pattern with SVG placeholders.
 */

import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

interface RelatedProduct {
  name: string;
  href: string;
  price: string;
  moq: string;
  stats: string;
  imageKind: RelatedImageKind;
  verified?: boolean;
  supplierYears?: number;
}

type RelatedImageKind = 'jewelry' | 'accessory' | 'crafts' | 'electronics' | 'clothing';

interface RelatedVisual {
  background: string;
  accent: string;
  stroke: string;
  icon: string;
}

const relatedVisuals: Record<RelatedImageKind, RelatedVisual> = {
  jewelry: {
    background: 'linear-gradient(180deg, #fef9e7 0%, #fdf0c3 100%)',
    accent: 'rgba(230, 178, 18, 0.3)',
    stroke: '#8a6800',
    icon: `<path d="M12 2l2.5 5.5L20 9l-4 4 1 5.5L12 16l-5 2.5 1-5.5-4-4 5.5-1.5Z"/><circle cx="12" cy="10" r="2"/>`,
  },
  accessory: {
    background: 'linear-gradient(180deg, #fff7ed 0%, #ffedd5 100%)',
    accent: 'rgba(251, 146, 60, 0.3)',
    stroke: '#b45309',
    icon: `<rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4"/><path d="M4 14h16"/>`,
  },
  crafts: {
    background: 'linear-gradient(180deg, #fdf4ff 0%, #fae8ff 100%)',
    accent: 'rgba(192, 132, 252, 0.3)',
    stroke: '#7e22ce',
    icon: `<path d="M12 2C8.5 2 6 4.5 6 7c0 3 6 8 6 8s6-5 6-8c0-2.5-2.5-5-6-5Z"/><path d="M8 18h8M9 21h6"/>`,
  },
  electronics: {
    background: 'linear-gradient(180deg, #eef2ff 0%, #dbeafe 100%)',
    accent: 'rgba(129, 140, 248, 0.3)',
    stroke: '#4f5fb3',
    icon: `<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M7 20h10M12 16v4"/><circle cx="12" cy="10" r="2"/>`,
  },
  clothing: {
    background: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 100%)',
    accent: 'rgba(244, 114, 182, 0.3)',
    stroke: '#a3456e',
    icon: `<path d="M8 3h8l2 6v12H6V9l2-6Z"/><path d="M12 3v8M8 3 6 9M16 3l2 6"/>`,
  },
};

const relatedProducts: RelatedProduct[] = [
  { name: 'Titanyum Çelik Küba Zincir Bileklik Erkek', href: '#', price: '$2.10-3.60', moq: '10 adet', stats: '3,580 satış', imageKind: 'jewelry', verified: true, supplierYears: 4 },
  { name: 'Gümüş Kübik Zirkon Küpe Set Kadın', href: '#', price: '$0.90-1.60', moq: '20 adet', stats: '8,950 satış', imageKind: 'jewelry', verified: true, supplierYears: 6 },
  { name: 'Deri Minimalist Kartlık Cüzdan RFID', href: '#', price: '$1.50-2.20', moq: '50 adet', stats: '6,730 satış', imageKind: 'accessory', verified: true, supplierYears: 5 },
  { name: 'El Yapımı Reçine Telefon Kılıfı Kalıp Seti', href: '#', price: '$2.40-3.80', moq: '20 adet', stats: '890 satış', imageKind: 'crafts', verified: false, supplierYears: 2 },
  { name: 'Akıllı WiFi Güvenlik Kamerası 1080P', href: '#', price: '$8.50-12', moq: '10 adet', stats: '1,280 satış', imageKind: 'electronics', verified: true, supplierYears: 7 },
  { name: 'Oversize Pamuk Vintage Baskılı Tişört', href: '#', price: '$3.20-4.50', moq: '30 adet', stats: '9,450 satış', imageKind: 'clothing', verified: true, supplierYears: 4 },
  { name: 'Polarize UV400 Aviator Güneş Gözlüğü', href: '#', price: '$1.20-2.40', moq: '50 adet', stats: '14,200 satış', imageKind: 'accessory', verified: true, supplierYears: 3 },
  { name: 'Elmas Boyama Kiti 5D DIY Hobi Set', href: '#', price: '$1.20-2.80', moq: '10 adet', stats: '7,890 satış', imageKind: 'crafts', verified: true, supplierYears: 3 },
];

function renderPlaceholder(kind: RelatedImageKind): string {
  const v = relatedVisuals[kind];
  return `
    <div class="relative w-full h-full overflow-hidden" style="background: ${v.background};" aria-hidden="true">
      <div class="absolute -right-4 -top-4 h-12 w-12 rounded-full opacity-50" style="background: ${v.accent};"></div>
      <div class="absolute -left-3 bottom-1 h-10 w-10 rounded-full opacity-40" style="background: ${v.accent};"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <svg class="h-12 w-12" fill="none" stroke-width="1.4" viewBox="0 0 24 24" style="stroke: ${v.stroke};">
          ${v.icon}
        </svg>
      </div>
    </div>
  `;
}

function verifiedIcon(): string {
  return `<svg class="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd"/></svg>`;
}

function renderRelatedSlide(card: RelatedProduct): string {
  return `
    <div class="swiper-slide">
      <a
        href="${card.href}"
        class="group/related flex flex-col h-full border rounded-md overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        style="background: var(--card-bg, #ffffff); border-color: var(--card-border-color, #e5e5e5);"
        aria-label="${card.name}"
      >
        <div class="aspect-square w-full flex-shrink-0">
          ${renderPlaceholder(card.imageKind)}
        </div>
        <div class="flex flex-1 flex-col p-3">
          <h4 class="text-xs font-medium leading-tight line-clamp-2" style="color: var(--product-title-color, #111827); height: 2.4em;">${card.name}</h4>
          <p class="mt-2 text-sm font-bold" style="color: var(--product-price-color, #111827);">${card.price}</p>
          <p class="mt-1 text-xs" style="color: var(--product-moq-color, #6b7280);">MOQ: ${card.moq}</p>
          <div class="mt-auto pt-2">
            ${card.verified ? `
              <div class="flex items-center gap-1 text-xs font-medium" style="color: var(--product-verified-color, #cc9900);">
                ${verifiedIcon()}
                <span>Verified</span>
                ${card.supplierYears ? `<span class="opacity-60">·</span><span>${card.supplierYears} yrs</span>` : ''}
              </div>
            ` : ''}
          </div>
        </div>
      </a>
    </div>
  `;
}

export function RelatedProducts(): string {
  return `
    <section class="related-products-section" style="background: var(--pd-related-bg, #f8f8f8);">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold" style="color: var(--pd-title-color, #111827);">Benzer Ürünler</h2>
          <a href="#" class="text-sm font-medium hover:underline" style="color: var(--pd-breadcrumb-link-color, #cc9900);">Tümünü Gör →</a>
        </div>

        <div class="group/related-slider relative">
          <div class="swiper related-products-swiper overflow-hidden">
            <div class="swiper-wrapper">
              ${relatedProducts.map(p => renderRelatedSlide(p)).join('')}
            </div>
          </div>

          <!-- Navigation Arrows -->
          <button
            aria-label="Önceki ürünler"
            class="related-prev absolute left-0 top-[40%] z-10 hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-lg transition-all duration-200 hover:text-gray-900 opacity-0 pointer-events-none md:flex group-hover/related-slider:opacity-100 group-hover/related-slider:pointer-events-auto disabled:opacity-0 disabled:pointer-events-none"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button
            aria-label="Sonraki ürünler"
            class="related-next absolute right-0 top-[40%] z-10 hidden h-10 w-10 translate-x-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-lg transition-all duration-200 hover:text-gray-900 opacity-0 pointer-events-none md:flex group-hover/related-slider:opacity-100 group-hover/related-slider:pointer-events-auto disabled:opacity-0 disabled:pointer-events-none"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
    </section>
  `;
}

export function initRelatedProducts(): void {
  const el = document.querySelector<HTMLElement>('.related-products-swiper');
  if (!el) return;

  new Swiper(el, {
    modules: [Navigation],
    spaceBetween: 12,
    navigation: {
      nextEl: '.related-next',
      prevEl: '.related-prev',
    },
    breakpoints: {
      0: { slidesPerView: 2.3, spaceBetween: 10 },
      480: { slidesPerView: 3.3, spaceBetween: 10 },
      640: { slidesPerView: 4, spaceBetween: 12 },
      768: { slidesPerView: 4, spaceBetween: 12 },
      1024: { slidesPerView: 3.5, spaceBetween: 14 },
      1280: { slidesPerView: 4, spaceBetween: 16 },
    },
  });
}
