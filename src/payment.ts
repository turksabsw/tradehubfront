/**
 * Payment Page — Entry Point
 * "Ödeme" — payment management, transactions, T/T transfers.
 */

import './style.css'
import { initFlowbite } from 'flowbite'

import { TopBar, initMobileDrawer, initHeaderCart } from './components/header'
import { FloatingPanel, initFloatingPanel } from './components/floating'
import { renderSidebar, initSidebar } from './components/sidebar'
import { PaymentLayout, initPaymentLayout } from './components/payment'

const appEl = document.querySelector<HTMLDivElement>('#app')!;
appEl.classList.add('relative');
appEl.innerHTML = `
  <!-- Compact Dashboard Header -->
  <div id="sticky-header" class="sticky top-0 z-(--z-header)" style="background-color:var(--header-scroll-bg)">
    ${TopBar({ compact: true })}
  </div>

  <!-- Page body: Sidebar + Payment -->
  <div class="bg-[#F5F5F5] min-h-screen">
    <div class="max-w-[1425px] mx-auto px-4 max-sm:px-2 flex gap-[14px]">
      <!-- Sidebar Column -->
      <div class="w-[260px] flex-shrink-0 pt-4 max-md:hidden">
        ${renderSidebar()}
      </div>

      <!-- Content Column -->
      <div class="flex-1 min-w-0 pt-4 pb-4 max-md:pt-2 max-md:pb-2">
        <main>
          ${PaymentLayout()}
        </main>
      </div>
    </div>
  </div>

  <!-- Floating Panel -->
  ${FloatingPanel()}
`;

initFlowbite();
initHeaderCart();
initFloatingPanel();
initMobileDrawer();
initSidebar();
initPaymentLayout();
