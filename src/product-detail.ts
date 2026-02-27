/**
 * Product Detail Page — Entry Point
 * Assembles header, product detail sections, and footer.
 */

import './style.css'
import { initFlowbite } from 'flowbite'

// Header components (reuse from main page)
import { TopBar, initMobileDrawer, SubHeader, initStickyHeaderSearch, MegaMenu, initMegaMenu, initHeaderCart } from './components/header'

// Footer components
import { FooterLinks } from './components/footer'

// Floating components
import { FloatingPanel, initFloatingPanel } from './components/floating'

// Shared components
import { Breadcrumb } from './components/shared/Breadcrumb'

// Product detail components
import {
  ProductTitleBar,
  ProductImageGallery,
  initImageGallery,
  ProductInfo,
  initProductInfo,
  ProductTabs,
  initProductTabs,
  initReviews,
  RelatedProducts,
  initRelatedProducts,
  initAttributesTab,
  ReviewsModal,
  initReviewsModal,
  LoginModal,
  initLoginModal,
  CartDrawer,
  initCartDrawer,
  ShippingModal,
  initShippingModal,
  MobileProductLayout,
  initMobileLayout,
} from './components/product'

// Product mock data (for breadcrumb)
import { mockProduct } from './data/mockProduct'

// Utilities
import { initAnimatedPlaceholder } from './utils/animatedPlaceholder'

// Build breadcrumb from product category data (skip first "Ana Sayfa" since Breadcrumb adds it)
const pdCrumbs = mockProduct.category.slice(1).map((label, i, arr) => ({
  label,
  ...(i < arr.length - 1 ? { href: `products.html?q=${encodeURIComponent(label)}` } : {}),
}));

const appEl = document.querySelector<HTMLDivElement>('#app')!;
appEl.classList.add('relative');
appEl.innerHTML = `
  <!-- Sticky Header -->
  <div id="sticky-header" class="sticky top-0 z-(--z-header)" style="background-color:var(--header-scroll-bg);border-bottom:1px solid var(--header-scroll-border)">
    ${TopBar()}
    ${SubHeader()}
  </div>

  ${MegaMenu()}

  <!-- Main Content -->
  <main>
    <!-- DESKTOP LAYOUT (hidden on mobile via CSS) -->
    <div id="pd-desktop-layout">
      <section style="background: var(--pd-bg, #ffffff);">
        <div class="container-boxed">
          <div id="pd-hero-grid" class="flex flex-col gap-5 pt-3 xl:grid xl:grid-cols-[1fr_340px] xl:gap-5 xl:items-start 2xl:grid-cols-[1fr_380px] 2xl:gap-6 3xl:grid-cols-[1fr_407px] 3xl:gap-7">
            <div id="pd-hero-left" class="w-full min-w-0">
              ${Breadcrumb(pdCrumbs)}
              ${ProductTitleBar()}
              <div id="pd-hero-gallery" class="w-full">
                ${ProductImageGallery()}
              </div>
              ${RelatedProducts()}
              ${ProductTabs()}
            </div>
            <div id="pd-hero-info" class="w-full xl:flex xl:flex-col">
              ${ProductInfo()}
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- MOBILE LAYOUT (hidden on desktop via CSS) -->
    <div id="pd-mobile-layout">
      ${MobileProductLayout()}
    </div>
  </main>

  <!-- Footer -->
  <footer>
    ${FooterLinks()}
  </footer>

  <!-- Floating Panel -->
  ${FloatingPanel()}

  <!-- Modals / Drawers -->
  ${ReviewsModal()}
  ${LoginModal()}
  ${CartDrawer()}
  ${ShippingModal()}

  <!-- Mobile Sticky Bottom Bar (Alibaba 3-button style) -->
  <div id="pd-mobile-bar" class="grid grid-cols-[48px_minmax(0,1fr)_minmax(0,1fr)] gap-2 px-4 py-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] fixed bottom-0 left-0 right-0 z-100 bg-surface border-t border-border-default shadow-[0_-2px_10px_rgba(0,0,0,0.08)] overflow-hidden">
    <button type="button" id="pdm-bar-chat" class="pdm-bar-chat-btn w-12 h-11 border border-border-medium rounded-[22px] bg-surface flex items-center justify-center cursor-pointer text-text-body p-0" aria-label="Sohbet">
      <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
    </button>
    <button type="button" id="pdm-bar-cart" class="pdm-bar-cart-btn h-11 border border-[#222] rounded-[22px] bg-surface text-sm font-semibold text-text-heading cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis min-w-0">Sepete Ekle</button>
    <button type="button" id="pdm-bar-order" class="pdm-bar-order-btn h-11 border-none rounded-[22px] bg-cta-primary text-sm font-bold text-white cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis min-w-0">Sipariş Başlat</button>
  </div>
`;

// Initialize behaviors
initMegaMenu();
initFlowbite();
initStickyHeaderSearch();
initHeaderCart();
initFloatingPanel();
initMobileDrawer();
initAnimatedPlaceholder('#topbar-compact-search-input');

// Product-specific inits
initImageGallery();
initProductInfo();
initProductTabs();
initAttributesTab();
initReviews();
initLoginModal();
initReviewsModal();
initShippingModal();
initCartDrawer();
initRelatedProducts();
initMobileLayout();
