/**
 * Tailored Selections Page — Entry Point
 * Assembles header, hero carousel, product grid, and footer for the
 * Tailored Selections landing page (opened from homepage "View more" link).
 */

import '../style.css'
import { initFlowbite } from 'flowbite'
import { t } from '../i18n'

// Header components
import { TopBar, initMobileDrawer, SubHeader, MegaMenu, initMegaMenu, initHeaderCart } from '../components/header'
import { initLanguageSelector } from '../components/header/TopBar'

// Shared components
import { Breadcrumb } from '../components/shared/Breadcrumb'

// Footer components
import { FooterLinks } from '../components/footer'

// Floating components
import { FloatingPanel } from '../components/floating'

// Alpine.js
import { startAlpine } from '../alpine'

// Tailored Selections components
import { TailoredSelectionsHero, initTailoredSelectionsHero, TailoredProductGrid } from '../components/tailored-selections'

// Data
import { getTailoredCategories, getTailoredProducts } from '../data/mockTailoredSelections'

// Utilities
import { initAnimatedPlaceholder } from '../utils/animatedPlaceholder'

/* ── Data ── */

const categories = getTailoredCategories();
const products = getTailoredProducts();

/* ── Breadcrumb ── */

const breadcrumbItems = [
  { label: t('tailoredPage.breadcrumbHome'), href: '/' },
  { label: t('tailoredPage.breadcrumb') },
];

/* ── Page Assembly ── */

const appEl = document.querySelector<HTMLDivElement>('#app')!;
appEl.classList.add('relative');
appEl.innerHTML = `
  <!-- Mobile Header (visible only on small screens) -->
  <div class="sticky top-0 z-[30] flex items-center justify-between px-3 py-2.5 md:hidden" style="background-color: var(--header-scroll-bg, #fff); border-bottom: 1px solid var(--header-scroll-border, #e5e7eb);">
    <a href="/" class="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors" aria-label="Back">
      <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
    </a>
    <h1 class="text-base font-semibold text-gray-900" data-i18n="tailoredPage.title">${t('tailoredPage.title')}</h1>
    <button class="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors" aria-label="Search">
      <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
    </button>
  </div>

  <!-- Desktop Header (hidden on mobile) -->
  <div id="sticky-header" class="sticky top-0 z-[30] hidden md:block" style="background-color:var(--header-scroll-bg);border-bottom:1px solid var(--header-scroll-border)">
    ${TopBar()}
    ${SubHeader()}
  </div>

  ${MegaMenu()}

  <!-- Main Content -->
  <main>
    <!-- Hero Section with Category Carousel -->
    ${TailoredSelectionsHero(categories)}

    <!-- Breadcrumb (hidden on mobile) -->
    <div class="container-boxed pt-4 pb-2 hidden md:block" style="background: var(--products-bg, #f5f5f5);">
      ${Breadcrumb(breadcrumbItems)}
    </div>

    <!-- Product Grid -->
    ${TailoredProductGrid(products)}
  </main>

  <!-- Footer -->
  <footer>
    ${FooterLinks()}
  </footer>

  <!-- Floating Panel -->
  ${FloatingPanel()}
`;

/* ── Initialization ── */

initMegaMenu();
initFlowbite();
startAlpine();
initHeaderCart();
initMobileDrawer();
initLanguageSelector();
initTailoredSelectionsHero();
initAnimatedPlaceholder('#topbar-compact-search-input');
