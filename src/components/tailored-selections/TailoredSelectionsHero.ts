/**
 * TailoredSelectionsHero Component
 * Dark gradient hero section with Swiper carousel of category cards.
 * Each card has background image, title, description, and "Insights" link.
 */

import Swiper from 'swiper';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { t } from '../../i18n';
import type { TailoredCategory } from '../../data/mockTailoredSelections';

function renderCategorySlide(category: TailoredCategory, index: number): string {
  return `
    <div class="swiper-slide" style="height: auto;" data-bg-color="${category.bgColor}">
      <div
        class="relative rounded-xl overflow-hidden h-full min-h-[280px] sm:min-h-[320px] lg:min-h-[360px] group cursor-pointer"
        style="--list-card-background-color: ${category.bgColor}; --list-card-border-color: #6a6145; background-color: var(--list-card-background-color); border: 1px solid var(--list-card-border-color);"
      >
        <!-- Background image -->
        <img
          src="${category.imageSrc}"
          alt="${category.title}"
          loading="${index <= 2 ? 'eager' : 'lazy'}"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <!-- Dynamic Gradient overlay using category's bgColor to fade into image -->
        <div 
          class="absolute inset-0"
          style="background: linear-gradient(to top, var(--list-card-background-color) 10%, transparent 80%);"
        ></div>

        <!-- Content overlay -->
        <div class="relative z-10 flex flex-col justify-end h-full p-5 sm:p-6">
          <h3 class="text-white font-bold text-lg sm:text-xl leading-tight mb-2">
            ${category.title}
          </h3>
          <p class="text-white/85 text-sm leading-relaxed line-clamp-2 mb-3">
            ${category.description}
          </p>
          <a
            href="/pages/tailored-selections.html"
            class="inline-flex items-center gap-1.5 text-white text-sm font-medium hover:underline"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/>
            </svg>
            <span data-i18n="tailoredPage.insights">${t('tailoredPage.insights')}</span> &gt;
          </a>
        </div>
      </div>
    </div>
  `;
}

export function initTailoredSelectionsHero(): void {
  const el = document.querySelector<HTMLElement>('.ts-hero-swiper');
  if (!el) return;

  new Swiper(el, {
    modules: [Navigation, EffectCoverflow],
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 0,
      stretch: 80, // pulls side slides closer to the center
      depth: 150, // pushes them slightly backward to shrink them
      modifier: 1,
      slideShadows: true,
    },
    centeredSlides: true,
    loop: true,
    navigation: {
      nextEl: '.ts-hero-next',
      prevEl: '.ts-hero-prev',
    },
    on: {
      slideChange: function (swiper) {
        const activeSlide = swiper.slides[swiper.activeIndex];
        if (activeSlide) {
          const bgColor = activeSlide.getAttribute('data-bg-color');
          if (bgColor) {
            const heroSection = document.getElementById('ts-hero-section');
            if (heroSection) {
              heroSection.style.setProperty('--floor-background-color', bgColor);
            }
          }
        }
      }
    },
    breakpoints: {
      0: { slidesPerView: 1.15 },
      480: { slidesPerView: 1.3 },
      768: { slidesPerView: 1.8 },
      1024: { slidesPerView: 2.1 }, // exactly right for typical laptop screen
      1280: { slidesPerView: 2.3 }, // wider screens
      1536: { slidesPerView: 2.5 }, // 3 cards neatly fit the max-1440px container
    },
  });
}

export function TailoredSelectionsHero(categories: TailoredCategory[]): string {
  const initialBg = categories.length > 0 ? categories[0].bgColor : '#373224';
  return `
    <section id="ts-hero-section" class="relative overflow-hidden" style="--floor-background-color: ${initialBg}; background-color: var(--floor-background-color); transition: background-color 0.5s ease;">
      <!-- Decorative elements (optional, can be removed if not needed since background is dynamic now) -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="absolute -top-20 -left-20 w-64 h-64 rounded-full" style="background: radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%);"></div>
        <div class="absolute top-10 right-10 w-48 h-48 rounded-full" style="background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%);"></div>
      </div>

      <div class="relative z-10 pt-8 pb-4 sm:pt-12 sm:pb-6 lg:pt-16 lg:pb-8">
        <!-- Title -->
        <h1 class="text-white text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-10 lg:mb-12">
          <span data-i18n="tailoredPage.title">${t('tailoredPage.title')}</span>
        </h1>

        <!-- Category Carousel -->
        <div class="group/hero relative max-w-[1400px] mx-auto px-4 sm:px-6">
          <div class="swiper ts-hero-swiper overflow-hidden" aria-label="Tailored selection categories">
            <div class="swiper-wrapper" style="align-items: stretch;">
              ${categories.map((c, i) => renderCategorySlide(c, i)).join('')}
            </div>
          </div>

          <!-- Navigation arrows -->
          <button
            aria-label="Previous categories"
            class="ts-hero-prev absolute left-1 sm:left-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 flex items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg transition-all duration-200 hover:bg-white hover:text-gray-900 hover:scale-110 disabled:opacity-0 disabled:pointer-events-none"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <button
            aria-label="Next categories"
            class="ts-hero-next absolute right-1 sm:right-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 flex items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg transition-all duration-200 hover:bg-white hover:text-gray-900 hover:scale-110 disabled:opacity-0 disabled:pointer-events-none"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Upward arrow indicator (light triangle cutting into dark background) -->
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 flex items-end">
        <svg fill="none" height="15" viewBox="0 0 32 15" width="32" xmlns="http://www.w3.org/2000/svg" class="block">
          <path d="M14.683 1.25513C15.437 0.595339 16.5631 0.595338 17.317 1.25513L30.9322 13.1683C32.115 14.2033 31.396 16.1423 29.8322 16.1423H2.16788C0.604044 16.1423 -0.114946 14.2033 1.0678 13.1683L14.683 1.25513Z" fill="var(--products-bg, #f5f5f5)"/>
        </svg>
      </div>
    </section>
  `;
}
