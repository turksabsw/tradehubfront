/**
 * ProductCard Shared Component
 * Anchor element with lazy-loaded image, price range, and min order text.
 */

import type { ProductCardProps } from '../../types/buyerDashboard';

export function ProductCard({ image, price, currency, minOrder, href }: ProductCardProps): string {
  return `
    <a href="${href}" class="block w-[169.5px] flex-shrink-0 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div class="w-full aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden">
        <img
          src="${image}"
          alt=""
          loading="lazy"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="p-2">
        <p class="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight">${currency}${price}</p>
        <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">${minOrder}</p>
      </div>
    </a>
  `;
}
