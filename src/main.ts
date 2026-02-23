import './style.css'
import { initFlowbite } from 'flowbite'

// Header components
import { TopBar, MobileSearchTabs, initMobileDrawer, SubHeader, initStickyHeaderSearch, MegaMenu, initMegaMenu } from './components/header'

// Hero components
import {
  CategoryBrowse,
  initCategoryBrowse,
  RecommendationSlider,
  initRecommendationSlider,
  HeroSideBannerSlider,
  initHeroSideBannerSlider,
  MobileCategoryBar,
  initMobileCategoryBar,
  TopDeals,
  initTopDeals,
  TopRanking,
  initTopRanking,
  TailoredSelections,
  initTailoredSelections,
  ProductGrid,
  initProductGrid,
} from './components/hero'

// Footer components
import { FooterLinks } from './components/footer'

// Floating components
import { FloatingPanel, initFloatingPanel } from './components/floating'

// Utilities
import { initAnimatedPlaceholder } from './utils/animatedPlaceholder'

const appEl = document.querySelector<HTMLDivElement>('#app')!;
appEl.classList.add('relative');
appEl.innerHTML = `
  <!-- Sticky Header (global, stays sticky across full page) -->
  <div id="sticky-header" class="sticky top-0 z-[var(--z-header)]" style="background-color:var(--header-scroll-bg);border-bottom:1px solid var(--header-scroll-border)">
    ${TopBar()}
    ${SubHeader()}
  </div>

  <!-- Mobile Search Tabs (Products | Manufacturers | Worldwide) — non-sticky -->
  ${MobileSearchTabs()}

  <!-- Mobile Category Bar (Alibaba-style, mobile/tablet only) -->
  ${MobileCategoryBar()}

  <!-- Mega Menu (fixed overlay, positioned by JS) -->
  ${MegaMenu()}

  <!-- Main Content -->
  <main>
    <!-- Hero: Categories + Recommendation Slider + Right Banner Slider -->
    <section class="pt-1 pb-2 lg:py-6" aria-label="Browse categories and recommendations">
      <div class="container-boxed">
        <div class="flex flex-col lg:flex-row gap-4 items-stretch">
          <div class="hidden lg:block lg:w-[300px] lg:flex-shrink-0">
            ${CategoryBrowse()}
          </div>
          <div class="h-[260px] lg:h-[300px] flex-1 min-w-0">
            ${RecommendationSlider()}
          </div>
          <div class="hidden h-[300px] lg:block lg:w-[340px] lg:flex-shrink-0">
            ${HeroSideBannerSlider()}
          </div>
        </div>
      </div>
    </section>

    <!-- Top Deals Section -->
    ${TopDeals()}

    <!-- Top Ranking Section -->
    ${TopRanking()}

    <!-- Tailored Selections Section -->
    ${TailoredSelections()}

    <!-- Product Grid Section -->
    ${ProductGrid()}
  </main>

  <!-- Footer Section -->
  <footer>
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
initCategoryBrowse();
initMobileCategoryBar();
initRecommendationSlider();
initHeroSideBannerSlider();
initFloatingPanel();

initTopDeals();
initTopRanking();
initTailoredSelections();
initProductGrid();

initMobileDrawer();
initAnimatedPlaceholder('#topbar-compact-search-input');
