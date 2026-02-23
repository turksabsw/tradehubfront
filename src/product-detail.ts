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

// Product detail components
import {
  Breadcrumb,
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

// Utilities
import { initAnimatedPlaceholder } from './utils/animatedPlaceholder'

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
    <!-- DESKTOP LAYOUT (hidden on mobile via CSS) -->
    <div id="pd-desktop-layout">
      <section style="background: var(--pd-bg, #ffffff);">
        <div class="container-boxed">
          <div id="pd-hero-grid">
            <div id="pd-hero-left">
              ${Breadcrumb()}
              ${ProductTitleBar()}
              <div id="pd-hero-gallery">
                ${ProductImageGallery()}
              </div>
              ${RelatedProducts()}
              ${ProductTabs()}
            </div>
            <div id="pd-hero-info">
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
  <div id="pd-mobile-bar">
    <button type="button" id="pdm-bar-chat" class="pdm-bar-chat-btn" aria-label="Sohbet">
      <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
    </button>
    <button type="button" id="pdm-bar-cart" class="pdm-bar-cart-btn">Sepete Ekle</button>
    <button type="button" id="pdm-bar-order" class="pdm-bar-order-btn">Sipariş Başlat</button>
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
