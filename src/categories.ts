/**
 * Categories Page — Entry Point
 * Assembles header, Amazon-style category grid, and footer.
 */

import './style.css'
import { initFlowbite } from 'flowbite'

// Header components
import { TopBar, initMobileDrawer, SubHeader, initStickyHeaderSearch, MegaMenu, initMegaMenu, initHeaderCart } from './components/header'

// Footer components
import { FooterLinks } from './components/footer'

// Floating components
import { FloatingPanel, initFloatingPanel } from './components/floating'

// Shared components
import { Breadcrumb } from './components/shared/Breadcrumb'

// Categories components
import { renderCategoryPage, CategoryFilterSidebar, initCategoryFilters } from './components/categories'

// Category data
import { categorySections } from './data/categories'

// Utilities
import { initAnimatedPlaceholder } from './utils/animatedPlaceholder'

const appEl = document.querySelector<HTMLDivElement>('#app')!;
appEl.innerHTML = `
  <!-- Sticky Header -->
  <div id="sticky-header" class="sticky top-0 z-[var(--z-header)]" style="background-color:var(--header-scroll-bg);border-bottom:1px solid var(--header-scroll-border)">
    ${TopBar()}
    ${SubHeader()}
  </div>

  ${MegaMenu()}

  <!-- Main Content -->
  <main>
    <section class="py-4 lg:py-8" style="background: var(--products-bg, #f9fafb);">
      <div class="container-boxed">
        ${Breadcrumb([{ label: 'Kategoriler' }])}

        <!-- Page Header -->
        <div class="mb-4">
          <h1 class="text-2xl font-bold text-gray-900">Tüm Kategoriler</h1>
          <p class="text-sm text-gray-500 mt-1">Binlerce ürün arasından aradığınızı bulun</p>
        </div>

        <!-- Main layout: Filter Sidebar + Category Grid -->
        <div class="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <!-- Filter Sidebar (hidden on mobile) -->
          <div class="hidden lg:block">
            ${CategoryFilterSidebar(categorySections)}
          </div>

          <!-- Category Grid -->
          <div class="flex-1 min-w-0">
            ${renderCategoryPage(categorySections)}
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer>
    ${FooterLinks()}
  </footer>

  <!-- Floating Panel -->
  ${FloatingPanel()}
`;

// Initialize custom component behaviors
initMegaMenu();
initFlowbite();
initStickyHeaderSearch();
initHeaderCart();
initMobileDrawer();
initAnimatedPlaceholder('#topbar-compact-search-input');
initFloatingPanel();
initCategoryFilters();
