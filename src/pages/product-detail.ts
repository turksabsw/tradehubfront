/**
 * Product Detail Page — Entry Point
 * Assembles header, product detail sections, and footer.
 */

import '../style.css'
import { initFlowbite } from 'flowbite'

// Header components (reuse from main page)
import { TopBar, initMobileDrawer, SubHeader, MegaMenu, initMegaMenu, initHeaderCart } from '../components/header'
import { initLanguageSelector } from '../components/header/TopBar'

// Footer components
import { FooterLinks } from '../components/footer'

// Floating components
import { FloatingPanel } from '../components/floating'

// Alpine.js
import { startAlpine } from '../alpine'

// Shared components
import { Breadcrumb } from '../components/shared/Breadcrumb'

// Product detail components
import {
  ProductTitleBar,
  ProductImageGallery,
  ProductInfo,
  initProductInfo,
  ProductTabs,
  initProductTabs,
  initReviews,
  RelatedProducts,
  initRelatedProducts,
  initAttributesTab,
  ReviewsModal,
  LoginModal, showLoginModal,
  ShippingModal,
  initShippingModal,
  MobileProductLayout,
  initMobileLayout,
  CartDrawer,
  initCartDrawer,
} from '../components/product'
// Product mock data (for breadcrumb)
import { getMockProduct } from '../data/mockProduct'
const mockProduct = getMockProduct();

// Utilities
import { initAnimatedPlaceholder } from '../utils/animatedPlaceholder'
import { t } from '../i18n'
import { isLoggedIn } from '../utils/auth'
import { showToast } from '../utils/toast'

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
    <!-- DESKTOP LAYOUT (hidden on mobile via Tailwind classes) -->
    <div id="pd-desktop-layout" class="hidden xl:block">
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

    <!-- MOBILE LAYOUT (hidden on desktop via Tailwind classes) -->
    <div id="pd-mobile-layout" class="xl:hidden pb-20">
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
  <div id="pd-mobile-bar" class="xl:hidden grid grid-cols-[48px_minmax(0,1fr)_minmax(0,1fr)] gap-2 px-4 py-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] fixed bottom-0 left-0 right-0 z-100 bg-surface border-t border-border-default shadow-[0_-2px_10px_rgba(0,0,0,0.08)] overflow-hidden">
    <button type="button" id="pdm-bar-chat" class="pdm-bar-chat-btn w-12 h-11 border border-border-medium rounded-[22px] bg-surface flex items-center justify-center cursor-pointer text-text-body p-0" aria-label="Sohbet">
      <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
    </button>
    <button type="button" id="pdm-bar-cart" data-add-to-cart="${mockProduct.id}" class="pdm-bar-cart-btn h-11 border border-[#222] rounded-[22px] bg-surface text-sm font-semibold text-text-heading cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis min-w-0" data-i18n="product.addToCart">${t('product.addToCart')}</button>
    <button type="button" id="pdm-bar-order" class="pdm-bar-order-btn th-btn-dark th-btn-pill h-11 whitespace-nowrap overflow-hidden text-ellipsis min-w-0" data-i18n="product.startOrder">${t('product.startOrder')}</button>
  </div>
`;

// Initialize behaviors
initMegaMenu();
initFlowbite();
initHeaderCart();
initMobileDrawer();
initLanguageSelector();
initAnimatedPlaceholder('#topbar-compact-search-input');

// Product-specific inits
// initStickyHeaderSearch — now handled by Alpine (stickyHeaderSearch component)
// initImageGallery — now handled by Alpine (imageGallery component)
initCartDrawer();
initProductInfo();
initProductTabs(); // IntersectionObserver sticky tab bar logic (not migrated)
initAttributesTab();
initReviews();
initShippingModal();
initRelatedProducts();
initMobileLayout();

// Favorites
initFavorites();

// Start Alpine LAST — after innerHTML is set so it can find all x-data directives in the DOM
startAlpine();

/* ── Favorites logic ── */
function initFavorites(): void {
  const STORAGE_KEY = 'tradehub-favorites';
  const productId = mockProduct.id;

  // Check if already favorited
  function isFavorited(): boolean {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return stored.some((f: { id: string }) => f.id === productId);
    } catch { return false; }
  }

  // Update all favorite button visuals
  function updateButtons(active: boolean): void {
    document.querySelectorAll<HTMLButtonElement>('[data-favorite-btn]').forEach(btn => {
      const svg = btn.querySelector('svg');
      if (!svg) return;
      if (active) {
        svg.setAttribute('fill', '#ef4444');
        svg.setAttribute('stroke', '#ef4444');
        btn.style.color = '#ef4444';
      } else {
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        btn.style.color = '';
      }
    });
  }

  // Set initial state
  updateButtons(isFavorited());

  // Toggle favorite
  function toggleFavorite(): void {
    if (!isLoggedIn()) {
      showLoginModal();
      return;
    }

    try {
      const stored: { id: string }[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const index = stored.findIndex(f => f.id === productId);

      if (index >= 0) {
        // Remove from favorites
        stored.splice(index, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        updateButtons(false);
        showToast({ message: t('product.removedFromFavorites'), type: 'info' });
      } else {
        // Add to favorites
        stored.push({
          id: productId,
          image: mockProduct.images[0]?.src || '',
          title: mockProduct.title,
          priceRange: `$${mockProduct.priceTiers[0]?.price || 0}`,
          minOrder: `Min. order: ${mockProduct.moq} ${mockProduct.unit}`,
        } as any);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        updateButtons(true);
        showToast({
          message: t('cart.movedToFavorites'),
          type: 'success',
          link: { text: t('cart.favorites'), href: '/pages/dashboard/favorites.html' },
        });
      }
    } catch { /* ignore storage errors */ }
  }

  // Wire up click handlers
  document.querySelectorAll<HTMLButtonElement>('[data-favorite-btn]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleFavorite();
    });
  });
}
