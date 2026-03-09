/**
 * Top Ranking Page — Entry Point
 * Assembles header, hero banner, filter dropdowns, category tabs,
 * sort pills, ranking grid, and footer for the Top Ranking landing page.
 */

import '../style.css'
import Alpine from 'alpinejs'
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

// Top Ranking components
import {
  TopRankingHero,
  TopRankingCategoryTabs,
  TopRankingSortPills,
  TopRankingGrid,
  initRankingCategoryTabs,
} from '../components/top-ranking'
import { renderRankingGroupCard } from '../components/top-ranking/TopRankingGrid'

// Data
import { getMockRankingGroups } from '../data/mockTopRanking'
import type { RankingCategoryGroup } from '../data/mockTopRanking'

// Utilities
import { initAnimatedPlaceholder } from '../utils/animatedPlaceholder'

/* ── Alpine Data Registration ── */

const allGroups = getMockRankingGroups();
const GROUPS_PER_PAGE = 12;

Alpine.data('topRankingPage', () => ({
  // Filter state
  activeRegion: 'europe' as string,
  activeTab: 'all',
  activeSort: 'hot-selling',

  // Dropdown state
  regionDropdownOpen: false,
  categoryDropdownOpen: false,
  pendingRegion: 'europe' as string,

  // Category dropdown navigation
  categoryDropdownLevel: 1 as 1 | 2,
  selectedMainCategory: null as string | null,
  pendingSubCategory: null as string | null,

  // Tab scroll state
  canScrollLeft: false,
  canScrollRight: true,

  // Pagination
  visibleGroupCount: GROUPS_PER_PAGE,

  // Static data
  allGroups: allGroups,

  get filteredGroups(): RankingCategoryGroup[] {
    let groups = this.allGroups;

    // Filter by tab
    if (this.activeTab !== 'all') {
      groups = groups.filter(g => g.categoryId === this.activeTab);
    }

    // Filter by selected main category from dropdown
    if (this.selectedMainCategory) {
      groups = groups.filter(g => g.categoryId === this.selectedMainCategory);
    }

    return groups;
  },

  get visibleGroups(): RankingCategoryGroup[] {
    return this.filteredGroups.slice(0, this.visibleGroupCount);
  },

  setTab(tabId: string) {
    this.activeTab = tabId;
    this.visibleGroupCount = GROUPS_PER_PAGE;
  },

  setSort(sortMode: string) {
    this.activeSort = sortMode;
  },

  loadMore() {
    this.visibleGroupCount += GROUPS_PER_PAGE;
  },

  renderGroupCard(group: RankingCategoryGroup): string {
    return renderRankingGroupCard(group);
  },

  scrollTabs(direction: 'left' | 'right') {
    const el = (this.$refs as Record<string, HTMLElement>).tabsScroll;
    if (!el) return;
    const scrollAmount = 200;
    el.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
  },

  updateScrollState() {
    const el = (this.$refs as Record<string, HTMLElement>).tabsScroll;
    if (!el) return;
    this.canScrollLeft = el.scrollLeft > 0;
    this.canScrollRight = el.scrollLeft < el.scrollWidth - el.clientWidth - 1;
  },

  // Region dropdown
  applyRegion() {
    this.activeRegion = this.pendingRegion;
    this.regionDropdownOpen = false;
  },

  // Category dropdown
  openCategoryLevel2(mainCatId: string) {
    this.selectedMainCategory = mainCatId;
    this.pendingSubCategory = null;
    this.categoryDropdownLevel = 2;
  },

  goBackToLevel1() {
    this.categoryDropdownLevel = 1;
  },

  applyCategoryFilter() {
    this.activeTab = this.selectedMainCategory || 'all';
    this.categoryDropdownOpen = false;
    this.categoryDropdownLevel = 1;
    this.visibleGroupCount = GROUPS_PER_PAGE;
  },

  // i18n helper for Alpine templates
  $t(key: string): string {
    return t(key);
  },
}));

/* ── Page Assembly ── */

const breadcrumbItems = [
  { label: t('topRankingPage.breadcrumb') },
];

const appEl = document.querySelector<HTMLDivElement>('#app')!;
appEl.classList.add('relative');
appEl.innerHTML = `
  <!-- Header -->
  <div id="sticky-header" class="z-[30]" style="background-color:var(--header-scroll-bg);border-bottom:1px solid var(--header-scroll-border)">
    ${TopBar()}
    ${SubHeader()}
  </div>

  ${MegaMenu()}

  <!-- Main Content -->
  <main x-data="topRankingPage">
    <!-- Hero (full-width background with breadcrumb inside) -->
    <section class="relative z-20" style="background: linear-gradient(0deg, var(--color-primary-100, #fdf0c3) 1%, var(--color-primary-50, #fef9e7) 100%);">
      <!-- Decorative circles -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-10 left-[5%] w-48 h-48 rounded-full bg-primary-200/20"></div>
        <div class="absolute top-1/3 right-[3%] w-36 h-36 rounded-full bg-primary-200/15"></div>
      </div>
      <!-- Breadcrumb -->
      <div class="relative z-10 container-boxed pt-2 lg:pt-3">
        ${Breadcrumb(breadcrumbItems)}
      </div>
      ${TopRankingHero()}
    </section>

    <!-- Sticky tabs + sort pills bar (outside hero) -->
    <div id="sticky-tabs" class="sticky top-0 z-10 bg-surface transition-shadow duration-200">
      <div class="container-boxed">
        ${TopRankingCategoryTabs()}
        ${TopRankingSortPills()}
      </div>
    </div>

    <!-- Ranking Grid -->
    <section class="pb-8 lg:pb-12" style="background: var(--products-bg, #f9fafb);">
      <div class="container-boxed">
        ${TopRankingGrid()}
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

// Initialize
initMegaMenu();
initFlowbite();
startAlpine();
initHeaderCart();
initMobileDrawer();
initLanguageSelector();
initRankingCategoryTabs();
initAnimatedPlaceholder('#topbar-compact-search-input');

// Add bottom border to sticky tabs when they become stuck
const stickyTabs = document.getElementById('sticky-tabs');
if (stickyTabs) {
  const sentinel = document.createElement('div');
  sentinel.style.height = '1px';
  sentinel.style.width = '100%';
  sentinel.style.pointerEvents = 'none';
  stickyTabs.parentElement?.insertBefore(sentinel, stickyTabs);

  const observer = new IntersectionObserver(
    ([entry]) => {
      const isStuck = !entry.isIntersecting;
      stickyTabs.classList.toggle('shadow-sm', isStuck);
      stickyTabs.classList.toggle('border-b', isStuck);
      stickyTabs.classList.toggle('border-gray-200', isStuck);
    },
    { threshold: 0 }
  );
  observer.observe(sentinel);
}
