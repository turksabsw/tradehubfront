/**
 * C2: Store Navigation Bar (Sticky)
 * Orange sticky nav with dropdowns, search, mobile hamburger
 */
import type { StoreNavData } from '../../types/seller/types';

export function StoreNav(data: StoreNavData): string {
  const menuItems = data.items.map(item => {
    if (item.dropdownType === 'products') {
      return `
        <li class="relative">
          <button class="store-nav__item store-nav__item--dropdown flex items-center gap-1 px-5 py-3 text-[var(--store-nav-text)] text-[14px] font-normal cursor-pointer bg-transparent border-none transition-colors hover:bg-[rgba(255,255,255,0.1)]"
                  aria-expanded="false" aria-haspopup="true">
            ${item.label}
            <svg class="w-3 h-3 text-white/70 transition-transform duration-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div class="store-nav__dropdown store-nav__dropdown--products hidden absolute top-full left-0 bg-white shadow-[var(--shadow-md)] rounded-b-[var(--radius-md)] min-w-[280px] max-h-[400px] overflow-y-auto z-[var(--z-dropdown)]"
               role="menu"
               aria-label="Ürün kategorileri">
            <div class="store-nav__dropdown-header bg-[#f3f4f6] px-4 py-1.5 text-[13px] font-bold text-[#374151]">
              Products
            </div>
            <a href="#" class="store-nav__dropdown-link block px-4 py-2 text-[13px] text-[var(--store-accent)] font-medium hover:bg-[#f3f4f6] transition-colors" role="menuitem">
              See all categories
            </a>
            ${data.productCategories.map(cat => `
              <a href="#" class="store-nav__dropdown-item flex items-center justify-between px-4 py-2 text-[13px] text-[#374151] hover:bg-[#f3f4f6] transition-colors" role="menuitem">
                ${cat.name}
                ${cat.hasSubcategories ? `
                  <svg class="w-3 h-3 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                ` : ''}
              </a>
            `).join('')}
          </div>
        </li>
      `;
    }

    if (item.dropdownType === 'company') {
      return `
        <li class="relative">
          <button class="store-nav__item store-nav__item--dropdown flex items-center gap-1 px-5 py-3 text-[var(--store-nav-text)] text-[14px] font-normal cursor-pointer bg-transparent border-none transition-colors hover:bg-[rgba(255,255,255,0.1)]"
                  aria-expanded="false" aria-haspopup="true">
            ${item.label}
            <svg class="w-3 h-3 text-white/70 transition-transform duration-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div class="store-nav__dropdown store-nav__dropdown--company hidden absolute top-full left-0 bg-white shadow-[var(--shadow-md)] rounded-b-[var(--radius-md)] min-w-[200px] z-[var(--z-dropdown)]"
               role="menu"
               aria-label="Şirket profili menüsü">
            ${data.companyProfileLinks.map(link => `
              <a href="${link.href}" class="store-nav__dropdown-item block px-4 py-2 text-[13px] text-[#374151] hover:bg-[#f3f4f6] transition-colors" role="menuitem">
                ${link.label}
              </a>
            `).join('')}
          </div>
        </li>
      `;
    }

    // Regular menu item
    return `
      <li>
        <a href="${item.href}"
           class="store-nav__item ${item.isActive ? 'store-nav__item--active block px-6 py-3 text-[var(--store-nav-text)] text-[14px] font-semibold bg-(--store-nav-active-overlay) transition-colors' : 'block px-5 py-3 text-[var(--store-nav-text)] text-[14px] font-normal transition-colors hover:bg-[rgba(255,255,255,0.1)]'}"
           ${item.isActive ? 'aria-current="page"' : ''}>
          ${item.label}
        </a>
      </li>
    `;
  }).join('');

  // Mobile menu items
  const mobileMenuItems = data.items.map(item => {
    if (item.dropdownType === 'products') {
      return `
        <li>
          <button class="store-nav__item store-nav__item--dropdown w-full flex items-center justify-between px-6 py-3 text-white text-[15px] font-normal bg-transparent border-none cursor-pointer"
                  aria-expanded="false" aria-haspopup="true">
            ${item.label}
            <svg class="w-4 h-4 text-white/70 transition-transform duration-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div class="store-nav__dropdown store-nav__dropdown--products hidden bg-white/10">
            <a href="#" class="block px-10 py-2 text-[14px] text-white/80 hover:text-white hover:bg-white/5 transition-colors">See all categories</a>
            ${data.productCategories.map(cat => `
              <a href="#" class="block px-10 py-2 text-[14px] text-white/80 hover:text-white hover:bg-white/5 transition-colors">${cat.name}</a>
            `).join('')}
          </div>
        </li>
      `;
    }
    if (item.dropdownType === 'company') {
      return `
        <li>
          <button class="store-nav__item store-nav__item--dropdown w-full flex items-center justify-between px-6 py-3 text-white text-[15px] font-normal bg-transparent border-none cursor-pointer"
                  aria-expanded="false" aria-haspopup="true">
            ${item.label}
            <svg class="w-4 h-4 text-white/70 transition-transform duration-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div class="store-nav__dropdown store-nav__dropdown--company hidden bg-white/10">
            ${data.companyProfileLinks.map(link => `
              <a href="${link.href}" class="block px-10 py-2 text-[14px] text-white/80 hover:text-white hover:bg-white/5 transition-colors">${link.label}</a>
            `).join('')}
          </div>
        </li>
      `;
    }
    return `
      <li>
        <a href="${item.href}" class="store-nav__item ${item.isActive ? 'store-nav__item--active block px-6 py-3 text-white text-[15px] font-semibold bg-(--store-nav-active-overlay)' : 'block px-6 py-3 text-white text-[15px] font-normal hover:bg-white/5'} transition-colors"
           ${item.isActive ? 'aria-current="page"' : ''}>
          ${item.label}
        </a>
      </li>
    `;
  }).join('');

  return `
    <nav id="store-nav" class="store-nav sticky top-0 z-[var(--z-sticky)] bg-(--store-nav-bg) transition-shadow duration-200" aria-label="Mağaza navigasyonu">
      <div class="store-nav__container max-w-[var(--container-lg)] mx-auto px-4 lg:px-6 xl:px-8 flex items-center justify-between">

        <!-- Hamburger (mobile/tablet) -->
        <button class="store-nav__hamburger xl:hidden text-white p-2 bg-transparent border-none cursor-pointer"
                aria-label="Menüyü aç/kapa" aria-expanded="false" aria-controls="store-nav-mobile-menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>

        <!-- Desktop Menu -->
        <ul class="store-nav__menu hidden xl:flex items-center list-none m-0 p-0">
          ${menuItems}
        </ul>

        <!-- Desktop Search -->
        <div class="store-nav__search relative hidden xl:block">
          <input type="text"
                 class="store-nav__search-input bg-white rounded-[var(--radius-sm)] px-3 py-1.5 pr-9 text-[13px] text-[#374151] placeholder-[var(--color-text-muted)] w-[200px] border-none outline-none focus:ring-2 focus:ring-white/30"
                 placeholder="${data.searchPlaceholder}"
                 aria-label="Mağaza içi arama" />
          <svg class="store-nav__search-icon absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-text-secondary)] transition-colors"
               fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/>
            <path stroke-linecap="round" d="M21 21l-4.35-4.35"/>
          </svg>
        </div>
      </div>

      <!-- Mobile Panel -->
      <div id="store-nav-mobile-menu" class="store-nav__mobile-menu hidden xl:hidden bg-(--store-nav-bg) border-t border-white/10">
        <!-- Mobile Search -->
        <div class="store-nav__mobile-search px-4 py-3">
          <input type="text"
                 class="store-nav__search-input w-full bg-white rounded-[var(--radius-sm)] px-3 py-2 text-[14px] text-[#374151] placeholder-[var(--color-text-muted)] border-none outline-none"
                 placeholder="${data.searchPlaceholder}"
                 aria-label="Mağaza içi arama" />
        </div>
        <!-- Mobile Menu Items -->
        <ul class="store-nav__mobile-list list-none m-0 p-0">
          ${mobileMenuItems}
        </ul>
      </div>
    </nav>
  `;
}
