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
      <div class="operation-slider__slide" style="background-color: ${slide.bgColor};">
        <div class="operation-slider__slide-icon" aria-hidden="true">
          ${slide.icon}
        </div>
        <div class="operation-slider__slide-content">
          <p class="operation-slider__slide-title">${slide.title}</p>
          <p class="operation-slider__slide-desc">${slide.description}</p>
          <a href="${slide.linkHref}" class="operation-slider__slide-link">
            ${slide.linkText}
            <svg class="w-3 h-3 ml-1 inline-block" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  `;
}

export function OperationSlider(props: OperationSliderProps): string {
  const { notifications } = props;
  const hasMultiple = notifications.length > 1;

  return `
    <div class="operation-slider group/opslider" aria-label="Bildirimler">
      <div class="swiper operation-slider__swiper overflow-hidden">
        <div class="swiper-wrapper">
          ${notifications.map(renderSlide).join('')}
        </div>
      </div>

      ${hasMultiple ? `
        <!-- Custom Pagination -->
        <div class="operation-slider__pagination"></div>

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
