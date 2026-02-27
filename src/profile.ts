/**
 * Profile Page — Entry Point
 * User profile with cover image, profile card, and info sections.
 */

import './style.css'
import { initFlowbite } from 'flowbite'

import { TopBar, initMobileDrawer, initHeaderCart } from './components/header'
import { Breadcrumb } from './components/shared/Breadcrumb'
import { FooterLinks } from './components/footer'
import { FloatingPanel, initFloatingPanel } from './components/floating'
import { renderSidebar, initSidebar } from './components/sidebar'
import { ProfileLayout, initProfileLayout } from './components/profile'

const appEl = document.querySelector<HTMLDivElement>('#app')!;
appEl.classList.add('relative');
appEl.innerHTML = `
  <div id="sticky-header" class="sticky top-0 z-(--z-header)" style="background-color:var(--header-scroll-bg)">
    ${TopBar({ compact: true })}
  </div>

  <div class="bg-[#F5F5F5] min-h-screen">
    <div class="max-w-[1425px] mx-auto px-4 max-sm:px-2 flex gap-[14px]">
      <div class="w-[260px] flex-shrink-0 pt-4 max-md:hidden">
        ${renderSidebar()}
      </div>

      <div class="flex-1 min-w-0">
        <div class="pt-4">
          ${Breadcrumb([
            { label: 'Hesabım', href: '/buyer-dashboard.html' },
            { label: 'Profilim' },
          ])}
        </div>

        <main>
          ${ProfileLayout()}
        </main>

        <footer>
          ${FooterLinks()}
        </footer>
      </div>
    </div>
  </div>

  ${FloatingPanel()}
`;

initFlowbite();
initHeaderCart();
initFloatingPanel();
initMobileDrawer();
initSidebar();
initProfileLayout();
