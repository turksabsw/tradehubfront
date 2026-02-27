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
import { FloatingPanel, initFloatingPanel } from './components/floating'

// Checkout components
import { CheckoutHeader, CheckoutLayout, ShippingAddressForm, initShippingAddressForm } from './components/checkout'

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
    <div class="container-boxed">
      ${Breadcrumb([{ label: 'Sepetim', href: '/cart.html' }, { label: 'Ödeme' }])}
    </div>
    ${CheckoutLayout({
      leftContent: `
        ${CheckoutHeader()}
        ${ShippingAddressForm()}
        <!-- Form sections will be added in subsequent subtasks -->
        <div id="checkout-form-area"></div>
      `,
      rightContent: `
        <!-- Order summary will be added in subsequent subtasks -->
        <div id="checkout-summary-area"></div>
      `
    })}
  </main>

  <!-- Footer -->
  <footer>
    ${FooterLinks()}
  </footer>

  <!-- Floating Panel -->
  ${FloatingPanel()}
`;

// Initialize behaviors
initMegaMenu();
initFlowbite();
initStickyHeaderSearch();
initFloatingPanel();
initMobileDrawer();
initHeaderCart();
initShippingAddressForm();
