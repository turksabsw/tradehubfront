/**
 * OperationSlider Component
 * Swiper-based notification slider with custom arrows (hidden by default, visible on hover
 * via CSS group-hover), pagination bullets (active: oval 16x8 dark, inactive: round 8x8 gray),
 * loop, optional autoplay 5000ms.
 */

import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

import type { NotificationSlide } from '../../types/buyerDashboard';

export interface OperationSliderProps {
  notifications: NotificationSlide[];
}

function renderSlide(slide: NotificationSlide): string {
  return `
    <div class="swiper-slide">
      <div class="flex items-center justify-between px-5 py-3 min-h-[44px] gap-4 max-md:px-3">
        <span class="text-sm font-normal text-[var(--color-text-heading,#111827)] whitespace-nowrap overflow-hidden text-ellipsis min-w-0">${slide.title}</span>
        <a href="${slide.linkHref}" class="text-sm text-[var(--color-text-heading,#111827)] no-underline inline-flex items-center whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[var(--color-cta-primary,#cc9900)]">
          ${slide.linkText}
          <svg class="w-3 h-3 ml-1 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  `;
}

export function OperationSlider(props: OperationSliderProps): string {
  const { notifications } = props;
  const hasMultiple = notifications.length > 1;

  return `
    <div class="operation-slider relative overflow-hidden group/opslider" aria-label="Bildirimler">
      <div class="swiper operation-slider__swiper overflow-hidden bg-[var(--color-surface-raised,#f5f5f5)]">
        <div class="swiper-wrapper">
          ${notifications.map(renderSlide).join('')}
        </div>
      </div>

      ${hasMultiple ? `
        <!-- Custom Pagination -->
        <div class="operation-slider__pagination flex justify-center gap-1.5 py-2 pb-2.5"></div>

        <!-- Custom Navigation Arrows -->
        <button
          aria-label="Önceki bildirim"
          class="operation-slider__prev"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button
          aria-label="Sonraki bildirim"
          class="operation-slider__next"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      ` : ''}
    </div>
  `;
}

export function initOperationSlider(): void {
  const container = document.querySelector<HTMLElement>('.operation-slider__swiper');
  if (!container) return;

  const slides = container.querySelectorAll('.swiper-slide');
  const hasMultiple = slides.length > 1;

  new Swiper(container, {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: 1,
    loop: hasMultiple,
    autoplay: hasMultiple ? { delay: 5000, disableOnInteraction: false } : false,
    navigation: hasMultiple
      ? { nextEl: '.operation-slider__next', prevEl: '.operation-slider__prev' }
      : false,
    pagination: hasMultiple
      ? { el: '.operation-slider__pagination', clickable: true }
      : false,
  });
}
