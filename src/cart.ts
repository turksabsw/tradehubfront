/**
 * Cart Page — Entry Point
 * Assembles header, cart content, and footer.
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

// Cart components
import { CartPage, initCartPage } from './components/cart'

// Mock data
import { mockCartSuppliers, mockCartSummary, mockAssuranceItems } from './data/mockCart'

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
      ${Breadcrumb([{ label: 'Sepetim' }])}
    </div>
    ${CartPage({ suppliers: mockCartSuppliers, summary: mockCartSummary, assuranceItems: mockAssuranceItems })}
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

// Cart-specific inits — store'u mock data ile başlat
initCartPage(mockCartSuppliers, mockCartSummary.shippingFee, mockCartSummary.discount);

// Header cart init'i store doldurulduktan SONRA gelsin ki badge güncellensin
initHeaderCart();
