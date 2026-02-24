/**
 * ProductCard Shared Component
 * Anchor element with lazy-loaded image, price range, and min order text.
 */

import type { ProductCardProps } from '../../types/buyerDashboard';

export function ProductCard({ image, price, currency, minOrder, href }: ProductCardProps): string {
  return `
    <a href="${href}" class="block w-[169.5px] flex-shrink-0 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div class="w-full aspect-square bg-[#f5f5f5] overflow-hidden">
        <img
          src="${image}"
          alt=""
          loading="lazy"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="p-2">
        <p class="text-[14px] font-semibold text-[#222] leading-tight">${currency}${price}</p>
        <p class="text-[12px] text-[#999] mt-0.5">${minOrder}</p>
      </div>
    </a>
  `;
}
