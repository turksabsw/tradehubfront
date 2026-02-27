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
import { BuyerDashboardLayout, initBuyerDashboardLayout, OtherServicesLayout, initOtherServicesLayout } from './components/buyer-dashboard'
import { renderSidebar, initSidebar } from './components/sidebar'

// Mock data
import { mockBuyerDashboardData } from './data/mockBuyerDashboard'

// ── Hash routing: dashboard vs other-services sub-pages ──
type DashboardView = 'dashboard' | 'other-services';

const OTHER_SERVICE_HASHES = ['payment-terms', 'product-inspection'];

function getActiveView(): DashboardView {
  const hash = window.location.hash.replace('#', '');
  if (OTHER_SERVICE_HASHES.includes(hash)) return 'other-services';
  return 'dashboard';
}

function renderMainContent(view: DashboardView): string {
  if (view === 'other-services') {
    return OtherServicesLayout();
  }
  return BuyerDashboardLayout({ data: mockBuyerDashboardData });
}

function getBreadcrumbItems(view: DashboardView): { label: string; href?: string }[] {
  if (view === 'other-services') {
    return [
      { label: 'Hesabım', href: '/buyer-dashboard.html' },
      { label: 'Diğer hizmetlerim' },
    ];
  }
  return [{ label: 'Hesabım' }];
}

const activeView = getActiveView();

const appEl = document.querySelector<HTMLDivElement>('#app')!;
appEl.classList.add('relative');
appEl.innerHTML = `
  <!-- Simplified Dashboard Header (TopBar only, no search/mega menu) -->
  <div id="sticky-header" class="sticky top-0 z-(--z-header)" style="background-color:var(--header-scroll-bg)">
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
        <div class="pt-4" id="bd-breadcrumb">
          ${Breadcrumb(getBreadcrumbItems(activeView))}
        </div>

        <!-- Main Content -->
        <main id="bd-main-content">
          ${renderMainContent(activeView)}
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
initSidebar();

// Init based on current view
function initCurrentView(): void {
  const view = getActiveView();
  if (view === 'other-services') {
    initOtherServicesLayout();
  } else {
    initBuyerDashboardLayout();
  }
}

initCurrentView();

// Handle hash changes to switch between views
window.addEventListener('hashchange', () => {
  const view = getActiveView();
  const mainEl = document.getElementById('bd-main-content');
  const breadcrumbEl = document.getElementById('bd-breadcrumb');
  if (mainEl) {
    mainEl.innerHTML = renderMainContent(view);
  }
  if (breadcrumbEl) {
    breadcrumbEl.innerHTML = Breadcrumb(getBreadcrumbItems(view));
  }
  initCurrentView();
});
