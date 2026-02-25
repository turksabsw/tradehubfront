/**
 * C8: Certificates Carousel
 * Swiper carousel with Navigation arrows + dot pagination
 * Responsive: 4→3→2→1 slides per view
 */
import type { Certificate } from '../../types/seller/types';

export function Certificates(certificates: Certificate[]): string {
  if (!certificates || !certificates.length) return '';

  return `
    <section id="certificates" class="py-12" aria-label="Sertifikalar">
      <div class="max-w-[var(--container-lg)] mx-auto px-4 lg:px-6 xl:px-8">
        <h2 class="text-[28px] font-bold text-[#1e3a5f] uppercase text-center mb-8">
          Sertifikalar
        </h2>

        <div class="relative px-6">
          <!-- Swiper -->
          <div class="certificates__swiper swiper">
            <div class="swiper-wrapper">
              ${certificates.map(cert => `
                <div class="swiper-slide">
                  <div class="bg-white border border-[var(--card-border-color)] rounded-[var(--radius-card)] overflow-hidden p-4 flex flex-col items-center text-center">
                    <div class="w-full aspect-[3/4] mb-3 flex items-center justify-center">
                      <img src="${cert.image}" alt="${cert.name}" class="max-w-full max-h-full object-contain" loading="lazy"
                           onerror="this.parentElement.innerHTML='<div class=\\'w-16 h-20 bg-gray-100 rounded flex items-center justify-center\\'><svg class=\\'w-8 h-8 text-gray-300\\' fill=\\'none\\' stroke=\\'currentColor\\' viewBox=\\'0 0 24 24\\'><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' stroke-width=\\'2\\' d=\\'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z\\'/></svg></div>'" />
                    </div>
                    <p class="text-[13px] text-[#374151] font-medium leading-snug line-clamp-2">${cert.name}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Navigation Arrows -->
          <button class="certificates__prev" aria-label="Önceki sertifika">
            <svg class="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button class="certificates__next" aria-label="Sonraki sertifika">
            <svg class="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          <!-- Dot Pagination -->
          <div class="certificates__dots"></div>
        </div>
      </div>
    </section>
  `;
}
