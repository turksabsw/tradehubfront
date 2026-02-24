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
    ? `<h3 class="sidebar__section-title px-4 pt-4 pb-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">${section.title}</h3>`
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
      class="sidebar sidebar--${expanded ? 'expanded' : 'collapsed'} fixed top-0 left-0 z-40 h-screen flex flex-col bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-[width] duration-200 ease-in-out ${expanded ? 'w-[240px]' : 'w-[64px]'}"
      role="navigation"
      aria-label="Buyer dashboard sidebar"
    >
      <div class="sidebar__menu flex-1 overflow-y-auto overflow-x-hidden py-2">
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

  let closeTimer: ReturnType<typeof setTimeout> | null = null;
  let activeFlyout: HTMLElement | null = null;

  /* ──── Flyout helpers ──── */

  function showFlyout(flyout: HTMLElement): void {
    if (activeFlyout && activeFlyout !== flyout) {
      activeFlyout.style.display = 'none';
    }
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    flyout.style.display = 'block';
    activeFlyout = flyout;
  }

  function scheduleClose(): void {
    if (closeTimer) clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      if (activeFlyout) {
        activeFlyout.style.display = 'none';
        activeFlyout = null;
      }
    }, 150);
  }

  /* ──── Event delegation on sidebar ──── */

  sidebar.addEventListener('mouseenter', (e: MouseEvent) => {
    const wrapper = (e.target as HTMLElement).closest<HTMLElement>('[data-sidebar-wrapper]');
    if (!wrapper) return;

    const flyout = wrapper.querySelector<HTMLElement>('[data-sidebar-flyout]');
    if (flyout) showFlyout(flyout);
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

  /* ──── Responsive breakpoint: 1024px ──── */

  function applyBreakpoint(): void {
    if (!sidebar) return;
    const isWide = window.innerWidth >= 1024;
    const isExpanded = sidebar.classList.contains('sidebar--expanded');

    if (isWide && !isExpanded) {
      sidebar.classList.replace('sidebar--collapsed', 'sidebar--expanded');
      sidebar.classList.replace('w-[64px]', 'w-[240px]');
      sidebar.innerHTML = renderSidebar(true).replace(/^<aside[^>]*>/, '').replace(/<\/aside>$/, '');
    } else if (!isWide && isExpanded) {
      sidebar.classList.replace('sidebar--expanded', 'sidebar--collapsed');
      sidebar.classList.replace('w-[240px]', 'w-[64px]');
      sidebar.innerHTML = renderSidebar(false).replace(/^<aside[^>]*>/, '').replace(/<\/aside>$/, '');
    }
  }

  const mql = window.matchMedia('(min-width: 1024px)');
  mql.addEventListener('change', applyBreakpoint);
}
