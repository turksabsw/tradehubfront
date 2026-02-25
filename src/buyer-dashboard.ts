/**
 * Buyer Dashboard Page — Entry Point
 * Assembles header, buyer dashboard content, and footer.
 */

import './style.css'
import { initFlowbite } from 'flowbite'

// Header components (simplified for dashboard — no search bar / mega menu)
import { TopBar, initMobileDrawer, initHeaderCart } from './components/header'

// Shared components
import { Breadcrumb } from './components/shared/Breadcrumb'

// Footer components
import { FooterLinks } from './components/footer'

// Floating components
import { FloatingPanel, initFloatingPanel } from './components/floating'

// Buyer Dashboard components
import { BuyerDashboardLayout, initBuyerDashboardLayout } from './components/buyer-dashboard'
import { renderSidebar } from './components/sidebar'

// Mock data
import { mockBuyerDashboardData } from './data/mockBuyerDashboard'

const appEl = document.querySelector<HTMLDivElement>('#app')!;
appEl.classList.add('relative');
appEl.innerHTML = `
  <!-- Simplified Dashboard Header (TopBar only, no search/mega menu) -->
  <div id="sticky-header" class="sticky top-0 z-[var(--z-header)]" style="background-color:var(--header-scroll-bg)">
    ${TopBar({ compact: true })}
  </div>

  <!-- Page body: Sidebar spans entire page including footer -->
  <div class="bg-[#F5F5F5] min-h-screen">
    <div class="max-w-[1425px] mx-auto px-4 flex gap-[14px]">
      <!-- Sidebar Column (spans main + footer) -->
      <div class="w-[260px] flex-shrink-0 pt-4">
        ${renderSidebar()}
      </div>

      <!-- Content Column (main + footer) -->
      <div class="flex-1 min-w-0">
        <!-- Breadcrumb -->
        <div class="pt-4">
          ${Breadcrumb([{ label: 'Hesabım' }])}
        </div>

        <!-- Main Content -->
        <main>
          ${BuyerDashboardLayout({ data: mockBuyerDashboardData })}
        </main>

        <!-- Footer -->
        <footer>
          ${FooterLinks()}
        </footer>
      </div>
    </div>
  </div>

  <!-- Floating Panel -->
  ${FloatingPanel()}
`;

// Initialize behaviors
initFlowbite();
initHeaderCart();
initFloatingPanel();
initMobileDrawer();

// Buyer Dashboard inits
initBuyerDashboardLayout();
