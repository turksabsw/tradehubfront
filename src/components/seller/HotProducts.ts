/**
 * C5: Hot Products / Featured Products
 * Orange title + 3-col product grid with Buy Now buttons
 */
import type { SimpleProduct } from '../../types/seller/types';

export function HotProducts(products: SimpleProduct[]): string {
  if (!products.length) return '';

  return `
    <section id="hot-products" class="py-12" aria-label="Popüler ürünler">
      <div class="max-w-[var(--container-lg)] mx-auto px-4 lg:px-6 xl:px-8">
        <h2 class="text-[36px] md:text-[42px] xl:text-[48px] 2xl:text-[54px] font-black text-[#f97316] uppercase text-center tracking-tight mb-10">
          HOT PRODUCTS
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          ${products.map(product => `
            <div class="bg-white border border-[var(--card-border-color)] rounded-[var(--radius-card)] p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div class="w-full h-[200px] flex items-center justify-center mb-4">
                <img src="${product.image}" alt="${product.name}" class="max-h-full max-w-full object-contain" loading="lazy"
                     onerror="this.parentElement.innerHTML='<div class=\\'w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center\\'><svg class=\\'w-8 h-8 text-gray-300\\' fill=\\'none\\' stroke=\\'currentColor\\' viewBox=\\'0 0 24 24\\'><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' stroke-width=\\'2\\' d=\\'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z\\'/></svg></div>'" />
              </div>
              <h3 class="text-[15px] text-[#222222] font-normal leading-snug mb-3 line-clamp-2">${product.name}</h3>
              <a href="${product.link}" class="mt-auto bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold text-[13px] rounded-[var(--radius-button)] px-6 py-2 transition-colors shadow-sm hover:shadow-md inline-block">
                Buy Now
              </a>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
