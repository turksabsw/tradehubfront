/**
 * C6: Category Product Listing — Banner + Grid (Optional — PRO sellers only)
 * Full-width category banner + 4-column detailed product cards with badges
 */
import type { ProductCategory, DetailedProduct } from '../../types/seller/types';

function getBadgeClass(type: string): string {
  switch (type) {
    case 'main-product': return 'badge--main-product';
    case 'certified': return 'badge--certified';
    default: return 'badge--certified';
  }
}

function formatSoldCount(count: number): string {
  if (count >= 10000) return `${(count / 1000).toFixed(0)}K+`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}

function renderProductCard(product: DetailedProduct): string {
  return `
    <div class="bg-white border border-[var(--card-border-color)] border-t-0 p-4 flex flex-col">
      <!-- Image -->
      <div class="relative w-full aspect-square mb-3 overflow-hidden rounded-[var(--radius-sm)]">
        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover" loading="lazy"
             onerror="this.parentElement.style.background='#f3f4f6'" />
        ${product.hasVideo ? `
          <div class="product-card__video-play" aria-label="Video">
            <svg class="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        ` : ''}
      </div>

      <!-- Badges -->
      ${product.badges.length ? `
        <div class="flex flex-wrap gap-1 mb-2">
          ${product.badges.map(b => `<span class="${getBadgeClass(b.type)}">${b.label}</span>`).join('')}
        </div>
      ` : ''}

      <!-- Name -->
      <h3 class="text-[13px] text-[#222222] font-normal leading-snug mb-2 line-clamp-2">${product.name}</h3>

      <!-- Price -->
      <p class="text-[16px] text-[#111827] font-bold mb-1">
        $${product.priceMin.toFixed(2)} - $${product.priceMax.toFixed(2)}
      </p>

      <!-- MOQ -->
      <p class="text-[12px] text-[#6b7280] mb-1">
        Min. sipariş: ${product.moq} ${product.moqUnit}
      </p>

      <!-- Sold -->
      <p class="text-[11px] text-[#9ca3af]">
        ${formatSoldCount(product.soldCount)} satıldı
      </p>
    </div>
  `;
}

function renderCategory(category: ProductCategory): string {
  return `
    <div class="mb-8">
      <!-- Banner -->
      <div class="relative w-full h-[160px] lg:h-[200px] rounded-t-[var(--radius-md)] overflow-hidden">
        <img src="${category.bannerImage}" alt="${category.name}" class="w-full h-full object-cover" loading="lazy"
             onerror="this.parentElement.style.background='linear-gradient(135deg,#1e3a5f,#f97316)'" />
        <div class="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center pl-8">
          <h3 class="text-white text-[24px] lg:text-[28px] font-bold uppercase tracking-wide">${category.name}</h3>
        </div>
      </div>

      <!-- Product Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 border border-[var(--card-border-color)] border-t-0 rounded-b-[var(--radius-md)] overflow-hidden">
        ${category.products.map(p => renderProductCard(p)).join('')}
      </div>
    </div>
  `;
}

export function CategoryProductListing(categories: ProductCategory[]): string {
  if (!categories || !categories.length) return '';

  return `
    <section id="category-listings" class="py-12" aria-label="Kategori ürün listeleri">
      <div class="max-w-[var(--container-lg)] mx-auto px-4 lg:px-6 xl:px-8">
        ${categories.map(cat => renderCategory(cat)).join('')}
      </div>
    </section>
  `;
}
