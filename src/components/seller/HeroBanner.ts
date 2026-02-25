/**
 * C3: Hero Banner Carousel
 * Full-width Swiper.js carousel with text overlays and dot pagination
 */
import type { HeroBannerData, HeroSlide } from '../../types/seller/types';

function renderSlide(slide: HeroSlide): string {
  const hasText = !!slide.title;
  if (!hasText) {
    return `
      <div class="swiper-slide" data-slide-id="${slide.id}">
        <div class="relative w-full h-[350px] md:h-[400px] xl:h-[450px] 2xl:h-[500px]">
          <img src="${slide.image}" alt="" class="w-full h-full object-cover" loading="lazy"
               onerror="this.parentElement.style.background='linear-gradient(135deg,#1e3a5f,#2563eb)'" />
        </div>
      </div>
    `;
  }

  const isWhite = slide.textColor === 'white';
  const titleColor = isWhite ? 'text-white' : 'text-[var(--color-text-primary)]';
  const subtitleColor = isWhite ? 'text-white/80' : 'text-[var(--color-text-secondary)]';

  // Position classes
  let positionClasses = 'items-start text-left pl-8 lg:pl-12 xl:pl-16';
  if (slide.textPosition === 'center') {
    positionClasses = 'items-center text-center px-8';
  } else if (slide.textPosition === 'right') {
    positionClasses = 'items-end text-right pr-8 lg:pr-12 xl:pr-16';
  }

  // Handle multi-line titles (newline separated)
  const titleHtml = (slide.title || '').split('\n').map(line =>
    `<span class="block">${line}</span>`
  ).join('');

  const subtitleHtml = slide.subtitle
    ? `<p class="mt-2 text-[14px] md:text-[16px] xl:text-[18px] ${subtitleColor} max-w-[500px] whitespace-pre-line">${slide.subtitle}</p>`
    : '';

  const ctaHtml = slide.ctaText
    ? `<a href="${slide.ctaLink || '#'}" class="inline-block mt-4 bg-[var(--store-accent)] hover:bg-[var(--store-accent-hover)] text-white font-semibold text-[14px] rounded-[var(--radius-button)] px-6 py-2.5 shadow-[var(--shadow-md)] transition-colors">
        ${slide.ctaText}
      </a>`
    : '';

  return `
    <div class="swiper-slide" data-slide-id="${slide.id}">
      <div class="relative w-full h-[350px] md:h-[400px] xl:h-[450px] 2xl:h-[500px]">
        <img src="${slide.image}" alt="" class="w-full h-full object-cover" loading="lazy"
             onerror="this.parentElement.style.background='linear-gradient(135deg,#1e3a5f,#2563eb)'" />
        <!-- Text Overlay -->
        <div class="absolute inset-0 flex flex-col justify-center ${positionClasses}">
          <h2 class="text-[28px] md:text-[36px] xl:text-[42px] 2xl:text-[48px] font-black ${titleColor} leading-tight uppercase tracking-tight">
            ${titleHtml}
          </h2>
          ${subtitleHtml}
          ${ctaHtml}
        </div>
      </div>
    </div>
  `;
}

export function HeroBanner(data: HeroBannerData): string {
  if (!data.slides.length) return '';

  return `
    <section id="hero-banner" class="store-hero" aria-label="Mağaza hero banner">
      <div class="store-hero__swiper swiper">
        <div class="swiper-wrapper">
          ${data.slides.map(slide => renderSlide(slide)).join('')}
        </div>
        ${data.showPagination !== false ? `
          <div class="store-hero__pagination absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2"></div>
        ` : ''}
      </div>
    </section>
  `;
}
