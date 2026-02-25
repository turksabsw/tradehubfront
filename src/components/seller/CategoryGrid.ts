/**
 * C4: Product Category Grid (Optional — PRO sellers only)
 * 3+4 pastel-colored category cards with product images
 */
import type { CategoryCard } from '../../types/seller/types';

export function CategoryGrid(cards: CategoryCard[]): string {
  if (!cards || !cards.length) return '';

  // Split into top row (3) and bottom row (4+)
  const topRow = cards.slice(0, 3);
  const bottomRow = cards.slice(3);

  return `
    <section id="category-grid" class="py-12" aria-label="Ürün kategorileri">
      <div class="max-w-[var(--container-lg)] mx-auto px-4 lg:px-6 xl:px-8">
        <!-- Top Row: 3 columns -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
          ${topRow.map(card => `
            <a href="${card.link || '#'}" class="relative rounded-[16px] overflow-hidden min-h-[180px] group cursor-pointer hover:shadow-md transition-all duration-300" style="background-color: ${card.bgColor}">
              <span class="absolute top-5 left-5 text-white text-[17px] font-bold uppercase drop-shadow-md z-10 leading-tight max-w-[60%]">
                ${card.name}
              </span>
              <img src="${card.image}" alt="${card.name}" class="absolute right-0 bottom-0 max-h-[80%] object-contain transition-transform duration-300 group-hover:scale-105" loading="lazy"
                   onerror="this.style.display='none'" />
            </a>
          `).join('')}
        </div>

        <!-- Bottom Row: 4 columns -->
        ${bottomRow.length ? `
          <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            ${bottomRow.map(card => `
              <a href="${card.link || '#'}" class="relative rounded-[16px] overflow-hidden min-h-[160px] group cursor-pointer hover:shadow-md transition-all duration-300" style="background-color: ${card.bgColor}">
                <span class="absolute top-4 left-4 text-white text-[15px] font-bold uppercase drop-shadow-md z-10 leading-tight max-w-[55%]">
                  ${card.name}
                </span>
                <img src="${card.image}" alt="${card.name}" class="absolute right-0 bottom-0 max-h-[75%] object-contain transition-transform duration-300 group-hover:scale-105" loading="lazy"
                     onerror="this.style.display='none'" />
              </a>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </section>
  `;
}
