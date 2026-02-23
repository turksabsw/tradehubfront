import './style.css'
import { initFlowbite } from 'flowbite'

// Header components
import { TopBar, MobileSearchTabs, initMobileDrawer, SubHeader, initStickyHeaderSearch, MegaMenu, initMegaMenu } from './components/header'

// Footer components
import { FooterLinks } from './components/footer'

// Floating components
import { FloatingPanel, initFloatingPanel } from './components/floating'

// Utilities
import { initAnimatedPlaceholder } from './utils/animatedPlaceholder'

// Manufacturers specific components
import { ManufacturersLayout, initHorizontalCategoryBar, initCategoryFlyout, initFactorySliders } from './components/manufacturers'

const appEl = document.querySelector<HTMLDivElement>('#app')!;
appEl.classList.add('relative');

appEl.innerHTML = `
  <!-- Sticky Header (global, stays sticky across full page) -->
  <div id="sticky-header" class="sticky top-0 z-[var(--z-header)] transition-colors duration-200" style="background-color:var(--header-scroll-bg);border-bottom:1px solid var(--header-scroll-border)">
    ${TopBar()}
    ${SubHeader()}
  </div>

  <!-- Mobile Search Tabs (Products | Manufacturers) — non-sticky -->
  ${MobileSearchTabs()}

  <!-- Mega Menu (fixed overlay, positioned by JS) -->
  ${MegaMenu()}

  <!-- Main Content -->
  <main class="flex-1 min-w-0 bg-[#f0f2f5] dark:bg-gray-900 pb-12">
    ${ManufacturersLayout()}
  </main>

  <!-- Footer Section -->
  <footer class="mt-auto">
    ${FooterLinks()}
  </footer>

  <!-- Floating Panel -->
  ${FloatingPanel()}
`

// Initialize custom component behaviors FIRST (before Flowbite can interfere)
initMegaMenu();

// Initialize Flowbite for other interactive components
initFlowbite();

// Initialize remaining custom behaviors
initStickyHeaderSearch();
initFloatingPanel();
initMobileDrawer();
initAnimatedPlaceholder('#topbar-compact-search-input');

// Initialize Manufacturers specific behaviors if any
initHorizontalCategoryBar();
initCategoryFlyout();
initFactorySliders();
