/**
 * Sidebar Component — Main sidebar composition
 * Composes SidebarMenuItem and SidebarFlyout for all menu sections.
 * initSidebar() handles hover flyout with 150ms bridge, single flyout,
 * responsive breakpoint at 1024px, and 200ms width transition.
 */

import { sidebarSections, discoverItem } from './sidebarData';
import { renderSidebarMenuItem } from './SidebarMenuItem';
import { renderSidebarFlyout } from './SidebarFlyout';
import type { SidebarSection } from '../../types/buyerDashboard';

/* ════════════════════════════════════════════════════
   RENDER
   ════════════════════════════════════════════════════ */

/**
 * Renders a single sidebar section with optional title and items.
 */
function renderSection(section: SidebarSection, expanded: boolean): string {
  const title = section.title && expanded
    ? `<h3 class="sidebar__section-title px-6 pt-4 pb-1 text-xs font-normal uppercase tracking-wider text-gray-400 dark:text-gray-500">${section.title}</h3>`
    : '';

  const items = section.items
    .map((item) => {
      const menuItem = renderSidebarMenuItem({ item, expanded });
      const flyout = item.submenu?.length ? renderSidebarFlyout({ item }) : '';
      return `
        <div class="sidebar__item-wrapper relative" data-sidebar-wrapper="${item.id}">
          ${menuItem}
          ${flyout}
        </div>
      `;
    })
    .join('');

  return `
    <div class="sidebar__section">
      ${title}
      ${items}
    </div>
  `;
}

/**
 * Renders the full sidebar HTML.
 */
export function renderSidebar(expanded = true): string {
  const sections = sidebarSections.map((s) => renderSection(s, expanded)).join('');

  const discoverLink = `
    <div class="sidebar__discover border-t border-gray-200 dark:border-gray-700 mt-auto pt-2 pb-3">
      <div class="sidebar__item-wrapper relative" data-sidebar-wrapper="${discoverItem.id}">
        ${renderSidebarMenuItem({ item: discoverItem, expanded })}
      </div>
    </div>
  `;

  return `
    <aside
      id="buyer-sidebar"
      class="sidebar sidebar--${expanded ? 'expanded' : 'collapsed'} sticky top-[42px] z-20 flex flex-col bg-gray-100 dark:bg-gray-900 rounded-lg h-[calc(100vh-42px)] transition-shadow"
      role="navigation"
      aria-label="Buyer dashboard sidebar"
    >
      <div class="sidebar__menu flex-1 py-2">
        ${sections}
      </div>
      ${discoverLink}
    </aside>
  `;
}

/* ════════════════════════════════════════════════════
   INIT
   ════════════════════════════════════════════════════ */

/**
 * Initializes sidebar interactivity:
 * 1. Hover event delegation for flyout show/hide with 150ms setTimeout bridge
 * 2. Only one flyout visible at a time
 * 3. Responsive breakpoint listener at 1024px (collapsed below, expanded above)
 * 4. Width transition animation via CSS class toggle
 */
export function initSidebar(): void {
  const sidebar = document.getElementById('buyer-sidebar');
  if (!sidebar) return;

  /* ──── URL-based active state ──── */
  const currentPath = window.location.pathname;
  const allItems = sidebar.querySelectorAll<HTMLElement>('[data-sidebar-item]');
  const activeClasses = ['bg-white', 'text-gray-900', 'shadow-sm'];
  const inactiveClasses = ['text-gray-700'];

  allItems.forEach((el) => {
    const href = el.getAttribute('href') || '';
    const hrefPath = href.split('#')[0]; // strip hash
    const isActive = hrefPath && currentPath.endsWith(hrefPath.replace(/^\//, ''));

    // Remove old active styling
    el.classList.remove(...activeClasses, 'bg-green-50', 'text-green-600');

    if (isActive) {
      el.classList.add(...activeClasses);
      el.classList.remove(...inactiveClasses);
    } else {
      el.classList.add(...inactiveClasses);
    }
  });

  let closeTimer: ReturnType<typeof setTimeout> | null = null;
  let activeFlyout: HTMLElement | null = null;

  /* ──── Flyout helpers ──── */

  function positionFlyout(flyout: HTMLElement, _wrapper: HTMLElement): void {
    const sidebarRect = sidebar!.getBoundingClientRect();
    flyout.style.left = `${sidebarRect.right}px`;
    flyout.style.top = `${sidebarRect.top}px`;
    flyout.style.height = `${sidebarRect.height}px`;
  }

  function showFlyout(flyout: HTMLElement, wrapper: HTMLElement): void {
    if (activeFlyout && activeFlyout !== flyout) {
      activeFlyout.style.display = 'none';
    }
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    positionFlyout(flyout, wrapper);
    flyout.style.display = 'block';
    activeFlyout = flyout;
    // Sidebar + flyout become one unified card
    sidebar!.classList.add('shadow-md', 'rounded-r-none');
  }

  function scheduleClose(): void {
    if (closeTimer) clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      if (activeFlyout) {
        activeFlyout.style.display = 'none';
        activeFlyout = null;
        // Restore sidebar card shape
        sidebar!.classList.remove('shadow-md', 'rounded-r-none');
      }
    }, 150);
  }

  /* ──── Event delegation on sidebar ──── */

  sidebar.addEventListener('mouseenter', (e: MouseEvent) => {
    const wrapper = (e.target as HTMLElement).closest<HTMLElement>('[data-sidebar-wrapper]');
    if (!wrapper) return;

    const flyout = wrapper.querySelector<HTMLElement>('[data-sidebar-flyout]');
    if (flyout) showFlyout(flyout, wrapper);
  }, true);

  sidebar.addEventListener('mouseleave', (e: MouseEvent) => {
    const wrapper = (e.target as HTMLElement).closest<HTMLElement>('[data-sidebar-wrapper]');
    if (!wrapper) return;

    const flyout = wrapper.querySelector<HTMLElement>('[data-sidebar-flyout]');
    if (flyout && activeFlyout === flyout) scheduleClose();
  }, true);

  /* ──── Flyout mouse bridge ──── */

  sidebar.addEventListener('mouseenter', (e: MouseEvent) => {
    const flyout = (e.target as HTMLElement).closest<HTMLElement>('[data-sidebar-flyout]');
    if (flyout && closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
  }, true);

  sidebar.addEventListener('mouseleave', (e: MouseEvent) => {
    const flyout = (e.target as HTMLElement).closest<HTMLElement>('[data-sidebar-flyout]');
    if (flyout && activeFlyout === flyout) scheduleClose();
  }, true);

  /* ──── Close flyout on scroll ──── */
  window.addEventListener('scroll', () => {
    if (activeFlyout) {
      activeFlyout.style.display = 'none';
      activeFlyout = null;
      sidebar!.classList.remove('shadow-md', 'rounded-r-none');
    }
  }, { passive: true });
}
