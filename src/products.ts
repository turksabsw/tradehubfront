/**
 * Products Listing Page — Entry Point
 * Assembles header, filter sidebar, search header, product grid, and footer.
 * Alibaba-style product listing with left filter panel and responsive product grid.
 */

import './style.css'
import { initFlowbite } from 'flowbite'

// Header components (reuse from main page)
import { TopBar, initMobileDrawer, SubHeader, initStickyHeaderSearch, MegaMenu, initMegaMenu, initHeaderCart } from './components/header'

// Footer components
import { FooterLinks } from './components/footer'

// Floating components
import { FloatingPanel, initFloatingPanel } from './components/floating'

// Products listing components
import {
  FilterSidebar,
  initFilterSidebar,
  ProductListingGrid,
  initProductListingGrid,
  initProductSliders,
  ListingCartDrawer,
  initListingCartDrawer,
  SearchHeader,
  initSearchHeader,
  updateSearchHeader,
  rerenderProductGrid,
  initFilterEngine,
  updateFilterChips,
  initFilterChips,
  setGridViewMode,
} from './components/products'

import { mockProductListingCards } from './data/mockProductListing'

// Category data for ID → name mapping
import { megaCategories } from './components/header'

// Utilities
import { initAnimatedPlaceholder } from './utils/animatedPlaceholder'

/* ── Helpers ── */

/** HTML-encode user input to prevent XSS when inserted via innerHTML */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ── Read URL parameters ── */
const urlParams = new URLSearchParams(window.location.search);
const categoryParam = urlParams.get('category');
const queryParam = urlParams.get('q');

/** Resolve display keyword from URL params */
function resolveKeyword(): string {
  if (categoryParam) {
    const cat = megaCategories.find(c => c.id === categoryParam);
    // Category names from megaCategories are safe (hardcoded), but fallback ID needs escaping
    return cat ? cat.name : escapeHtml(categoryParam);
  }
  if (queryParam) {
    return escapeHtml(queryParam.replace(/\+/g, ' '));
  }
  return 'laptop backpack';
}

const searchKeyword = resolveKeyword();

const appEl = document.querySelector<HTMLDivElement>('#app')!;
appEl.classList.add('relative');
appEl.innerHTML = `
  <!-- Sticky Header -->
  <div id="sticky-header" class="sticky top-0 z-[var(--z-header)]" style="background-color:var(--header-scroll-bg);border-bottom:1px solid var(--header-scroll-border)">
    ${TopBar()}
    ${SubHeader()}
  </div>

  ${MegaMenu()}

  <!-- Main Content -->
  <main>
    <section class="py-4 lg:py-6" style="background: var(--products-bg, #f9fafb);">
      <div class="container-boxed">
        <!-- Search Header (keyword, product count, sorting, view toggle) -->
        ${SearchHeader({ keyword: searchKeyword })}

        <!-- Active Filter Chips -->
        <div id="active-filter-chips" class="flex flex-wrap gap-2 mb-3 empty:hidden"></div>

        <!-- Main layout: Filter Sidebar + Product Grid -->
        <div class="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <!-- Filter Sidebar (hidden on mobile, shown via drawer) -->
          <div class="hidden lg:block">
            ${FilterSidebar()}
          </div>

          <!-- Product Grid -->
          ${ProductListingGrid()}
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

  <!-- Mobile Filter Drawer (off-canvas for mobile) -->
  <div
    id="filter-sidebar-drawer"
    class="fixed top-0 left-0 z-50 h-screen overflow-y-auto transition-transform -translate-x-full bg-white w-72 dark:bg-gray-800 lg:hidden"
    tabindex="-1"
    aria-labelledby="filter-sidebar-drawer-label"
  >
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <h5
        id="filter-sidebar-drawer-label"
        class="text-base font-semibold text-gray-900 dark:text-white"
      >
        Filters
      </h5>
      <button
        type="button"
        data-drawer-hide="filter-sidebar-drawer"
        aria-controls="filter-sidebar-drawer"
        class="absolute top-3 right-3 inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-md text-sm dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        <span class="sr-only">Close menu</span>
      </button>
    </div>
    <div class="p-4">
      ${FilterSidebar(undefined, 'mobile')}
    </div>
  </div>

  <!-- Drawer backdrop -->
  <div
    data-drawer-backdrop="filter-sidebar-drawer"
    class="hidden bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"
  ></div>

  <!-- Cart Drawer for product listing -->
  ${ListingCartDrawer()}
`;

// Initialize custom component behaviors FIRST (before Flowbite can interfere)
initMegaMenu();

// Initialize Flowbite for interactive components (dropdowns, drawers, etc.)
initFlowbite();

// Initialize header behaviors
initStickyHeaderSearch();
initHeaderCart();
initMobileDrawer();
initAnimatedPlaceholder('#topbar-compact-search-input');

// Initialize floating panel
initFloatingPanel();

// Initialize products page components
initFilterSidebar();
initProductListingGrid();
initProductSliders();
initSearchHeader();

// Listen for view-mode-change events from SearchHeader toggle buttons
document.addEventListener('view-mode-change', (e: Event) => {
  setGridViewMode((e as CustomEvent).detail.mode);
});

// Initialize cart drawer for listing page
initListingCartDrawer(mockProductListingCards);

// Initialize filter chips removal handler (event delegation)
initFilterChips();

// Initialize filter engine: connects filters + sorting to product grid
let engine: ReturnType<typeof initFilterEngine> | null = null;
engine = initFilterEngine({
  products: mockProductListingCards,
  onUpdate: (filtered, count) => {
    rerenderProductGrid(filtered);
    updateSearchHeader({ totalProducts: count });
    if (engine) updateFilterChips(engine.getState());
  },
});
