/**
 * Checkout Page — Entry Point
 * Assembles header, checkout content, and footer.
 */

import './style.css'
import { initFlowbite } from 'flowbite'

// Header components (reuse from main page)
import { TopBar, initMobileDrawer, SubHeader, initStickyHeaderSearch, MegaMenu, initMegaMenu, initHeaderCart } from './components/header'

// Shared components
import { Breadcrumb } from './components/shared/Breadcrumb'

// Footer components
import { FooterLinks } from './components/footer'

// Floating components
import { FloatingPanel } from './components/floating'

// Alpine.js
import { startAlpine } from './alpine'

// Checkout components
import { CheckoutHeader, CheckoutLayout, ShippingAddressForm, initShippingAddressForm, OrderSummary, PaymentMethodSection, ItemsDeliverySection, OrderProtectionModal } from './components/checkout'
import { protectionSummaryItems, tradeAssuranceText, modalSections, paymentIcons, infoBoxBullets } from './data/mockCheckout'
import { cartStore } from './components/cart/state/CartStore'
import type { OrderSummary as OrderSummaryData } from './types/checkout'
import { initStickyHeights } from './utils/stickyHeights'

// CartStore'dan checkout order summary oluştur
cartStore.load();
const cartSummary = cartStore.getSummary();
const checkoutOrderSummary: OrderSummaryData = {
  itemCount: cartSummary.selectedCount || cartSummary.items.reduce((s, i) => s + i.quantity, 0),
  thumbnails: cartSummary.items.map(i => ({ image: i.image, quantity: i.quantity })),
  itemSubtotal: cartSummary.productSubtotal,
  shipping: cartSummary.shippingFee,
  subtotal: cartSummary.productSubtotal + cartSummary.shippingFee - cartSummary.discount,
  processingFee: 0,
  total: cartSummary.subtotal,
  currency: 'USD',
};

const appEl = document.querySelector<HTMLDivElement>('#app')!;
appEl.classList.add('relative');
appEl.innerHTML = `
  <!-- Header (Not Sticky for Checkout Page) -->
  <div id="sticky-header" class="relative bg-white border-b border-[#e5e5e5] w-full">
    ${TopBar()}
    ${SubHeader()}
  </div>

  ${MegaMenu()}

  <!-- Main Content -->
  <main>
    <div class="container-boxed">
      ${Breadcrumb([{ label: 'Sepetim', href: '/cart.html' }, { label: 'Ödeme' }])}
    </div>
    ${CheckoutLayout({
  leftContent: `
        ${CheckoutHeader()}
        ${ShippingAddressForm()}
        ${PaymentMethodSection()}
        ${ItemsDeliverySection()}
      `,
  rightContent: `
        ${OrderSummary({ data: checkoutOrderSummary, protectionItems: protectionSummaryItems, tradeAssuranceText })}
      `
})}
  </main>

  <!-- Footer -->
  <footer>
    ${FooterLinks()}
  </footer>

  <!-- Floating Panel -->
  ${FloatingPanel()}

  <!-- Order Protection Modal -->
  ${OrderProtectionModal({ sections: modalSections, paymentIcons, infoBoxBullets })}
`;

// Initialize behaviors
initMegaMenu();
initFlowbite();
startAlpine();
initStickyHeaderSearch();
initMobileDrawer();
initHeaderCart();
initShippingAddressForm();
// initAddressAutocomplete() — REMOVED, now handled by Alpine.js shippingForm component
// initAccordionSections() — REMOVED, now handled by Alpine.js checkoutAccordion component
initStickyHeights();
