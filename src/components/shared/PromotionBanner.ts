/**
 * PromotionBanner Shared Component
 * Colored card with title, subtitle, and image.
 */

import type { PromotionBannerProps } from '../../types/buyerDashboard';

export function PromotionBanner({ title, subtitle, image, bgColor, href }: PromotionBannerProps): string {
  return `
    <a href="${href}" class="block rounded-lg overflow-hidden hover:shadow-sm transition-shadow" style="background-color: ${bgColor}">
      <div class="flex items-center justify-between p-4">
        <div class="flex-1 min-w-0 pr-3">
          <p class="text-sm font-bold text-gray-900 dark:text-gray-100 leading-tight">${title}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">${subtitle}</p>
        </div>
        <img
          src="${image}"
          alt=""
          loading="lazy"
          class="w-16 h-16 object-cover rounded-md flex-shrink-0"
        />
      </div>
    </a>
  `;
}
