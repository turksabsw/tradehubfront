/**
 * HeroSideBannerSlider Component
 * Right-side single-image style promotional slider for hero area.
 */

import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

interface HeroSideBannerSlide {
  label: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  background: string;
}

const sideBannerSlides: HeroSideBannerSlide[] = [
  {
    label: 'New suppliers',
    title: 'Discover fresh production partners',
    description: 'Find verified factories, compare offers, and source faster from one place.',
    cta: 'See more',
    href: '/suppliers/new',
    background: 'linear-gradient(135deg, #8cc9f7 0%, #6aa8de 45%, #74b8e9 100%)',
  },
  {
    label: 'Trend alert',
    title: 'Top-picked seasonal products',
    description: 'Browse trending categories and connect with suppliers ready to ship today.',
    cta: 'Explore now',
    href: '/trending',
    background: 'linear-gradient(135deg, #87d4b4 0%, #56b08b 42%, #69be9a 100%)',
  },
  {
    label: 'Fast customization',
    title: 'Launch your private label line',
    description: 'Send your logo and packaging brief to producers with low MOQ options.',
    cta: 'Start request',
    href: '/customization',
    background: 'linear-gradient(135deg, #9faef8 0%, #778be8 45%, #8598ef 100%)',
  },
  {
    label: 'RFQ spotlight',
    title: 'Get multiple quotes in minutes',
    description: 'Post one RFQ and receive matched supplier offers for your next purchase.',
    cta: 'Create RFQ',
    href: '/rfq/create',
    background: 'linear-gradient(135deg, #f8b58a 0%, #f28e63 44%, #f3a075 100%)',
  },
];

function renderSlide(slide: HeroSideBannerSlide): string {
  return `
    <div class="swiper-slide">
      <a href="${slide.href}" class="th-card hero-side-slide-link group relative block h-[300px] overflow-hidden transition-transform duration-200 ease-out dark:border-gray-700" style="padding:0;border-color:var(--hero-card-border-color);border-radius:var(--hero-card-radius)">
        <div class="absolute inset-0" style="background: ${slide.background};"></div>
        <div class="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/25 blur-2xl"></div>
        <div class="absolute -left-10 bottom-2 w-36 h-36 rounded-full bg-white/20 blur-3xl"></div>

        <div class="relative z-10 flex h-full flex-col justify-between p-4 text-white">
          <div>
            <p class="text-[10px] uppercase tracking-[0.11em] text-white/80 font-medium">${slide.label}</p>
            <h3 class="mt-1.5 text-[22px] leading-[1.2] font-extrabold max-w-[220px]">${slide.title}</h3>
            <p class="mt-2 text-xs leading-snug text-white/90 max-w-[220px]">${slide.description}</p>
          </div>

          <div class="flex justify-center pb-10">
            <span class="inline-flex items-center justify-center rounded-full bg-[#0c2e61] px-5 py-2 text-sm font-semibold shadow-lg transition-transform group-hover:scale-[1.02]">
              ${slide.cta}
            </span>
          </div>
        </div>
      </a>
    </div>
  `;
}

export function HeroSideBannerSlider(): string {
  return `
    <div class="group/hero-side relative hero-side-slider h-full [&_.hero-side-bullet]:h-2.5 [&_.hero-side-bullet]:w-2.5 [&_.hero-side-bullet]:rounded-full [&_.hero-side-bullet]:bg-slate-500/75 [&_.hero-side-bullet]:opacity-100 [&_.hero-side-bullet]:transition-all [&_.hero-side-bullet-active]:w-6 [&_.hero-side-bullet-active]:bg-white">
      <div class="swiper hero-side-swiper relative h-full rounded-md">
        <div class="swiper-wrapper">
          ${sideBannerSlides.map(renderSlide).join('')}
        </div>
        <div class="hero-side-pagination absolute inset-x-0 bottom-4 z-20 mx-auto flex w-fit items-center justify-center gap-1.5"></div>
      </div>

      <button
        type="button"
        class="hero-side-prev absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-lg transition-[opacity,color] duration-200 ease-out opacity-0 pointer-events-none lg:flex group-hover/hero-side:opacity-100 group-hover/hero-side:pointer-events-auto focus-visible:opacity-100 focus-visible:pointer-events-auto focus-visible:ring-2 focus-visible:ring-primary-300 hover:text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:text-white"
        aria-label="Previous side banner"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19 8 12l7-7"/>
        </svg>
      </button>

      <button
        type="button"
        class="hero-side-next absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-lg transition-[opacity,color] duration-200 ease-out opacity-0 pointer-events-none lg:flex group-hover/hero-side:opacity-100 group-hover/hero-side:pointer-events-auto focus-visible:opacity-100 focus-visible:pointer-events-auto focus-visible:ring-2 focus-visible:ring-primary-300 hover:text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:text-white"
        aria-label="Next side banner"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
        </svg>
      </button>
    </div>
  `;
}

export function initHeroSideBannerSlider(): void {
  const sliderElement = document.querySelector<HTMLElement>('.hero-side-swiper');
  const rootElement = document.querySelector<HTMLElement>('.hero-side-slider');
  if (!sliderElement) return;

  const prevButton = rootElement?.querySelector<HTMLButtonElement>('.hero-side-prev');
  const nextButton = rootElement?.querySelector<HTMLButtonElement>('.hero-side-next');
  const paginationElement = rootElement?.querySelector<HTMLElement>('.hero-side-pagination');
  const stopPeek = (): void => {
    rootElement?.classList.remove('hero-side-peek-prev', 'hero-side-peek-next');
  };

  const startPrevPeek = (): void => {
    rootElement?.classList.remove('hero-side-peek-next');
    rootElement?.classList.add('hero-side-peek-prev');
  };

  const startNextPeek = (): void => {
    rootElement?.classList.remove('hero-side-peek-prev');
    rootElement?.classList.add('hero-side-peek-next');
  };

  prevButton?.addEventListener('mouseenter', startPrevPeek);
  prevButton?.addEventListener('mouseleave', stopPeek);
  prevButton?.addEventListener('focus', startPrevPeek);
  prevButton?.addEventListener('blur', stopPeek);
  prevButton?.addEventListener('click', stopPeek);
  nextButton?.addEventListener('mouseenter', startNextPeek);
  nextButton?.addEventListener('mouseleave', stopPeek);
  nextButton?.addEventListener('focus', startNextPeek);
  nextButton?.addEventListener('blur', stopPeek);
  nextButton?.addEventListener('click', stopPeek);
  rootElement?.addEventListener('mouseleave', stopPeek);

  const swiper = new Swiper(sliderElement, {
    modules: [Autoplay, Navigation, Pagination],
    slidesPerView: 1,
    loop: true,
    speed: 650,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      prevEl: prevButton,
      nextEl: nextButton,
    },
    pagination: {
      el: paginationElement,
      clickable: true,
      bulletClass: 'hero-side-bullet',
      bulletActiveClass: 'hero-side-bullet-active',
      renderBullet: (_index, className) => `<button type="button" class="${className}" aria-label="Go to banner slide"></button>`,
    },
  });

  swiper.on('slideChangeTransitionStart', stopPeek);
}
