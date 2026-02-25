/**
 * Inquiries Page — Entry Point
 * "Ürün sorularım ve Fiyat Teklifi Taleplerim (RFQ)"
 */

import './style.css'
import { initFlowbite } from 'flowbite'

import { TopBar, initMobileDrawer, initHeaderCart } from './components/header'
import { FloatingPanel, initFloatingPanel } from './components/floating'
import { renderSidebar, initSidebar } from './components/sidebar'
import { InquiriesLayout, initInquiriesLayout } from './components/inquiries'

const appEl = document.querySelector<HTMLDivElement>('#app')!;
appEl.classList.add('relative');
appEl.innerHTML = `
  <!-- Compact Dashboard Header -->
  <div id="sticky-header" class="sticky top-0 z-[var(--z-header)]" style="background-color:var(--header-scroll-bg)">
    ${TopBar({ compact: true })}
  </div>

  <!-- Page body: Sidebar + Inquiries -->
  <div class="bg-[#F5F5F5] min-h-screen">
    <div class="max-w-[1425px] mx-auto px-4 flex gap-[14px]">
      <!-- Sidebar Column -->
      <div class="w-[260px] flex-shrink-0 pt-4">
        ${renderSidebar()}
      </div>

      <!-- Content Column -->
      <div class="flex-1 min-w-0 pt-4 pb-4">
        <main>
          ${InquiriesLayout()}
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
initInquiriesLayout();
