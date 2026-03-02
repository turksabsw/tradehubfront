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
    ? `<h3 class="sidebar__section-title hidden px-6 pt-4 pb-1 text-xs font-normal uppercase tracking-wider text-gray-400 dark:text-gray-500 xl:block">${section.title}</h3>`
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
  const widthClass = expanded ? 'w-[72px] xl:w-[260px]' : 'w-[72px]';

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
      class="sidebar sidebar--${expanded ? 'expanded' : 'collapsed'} sticky top-[42px] z-20 flex ${widthClass} flex-col bg-gray-100 dark:bg-gray-900 rounded-lg h-[calc(100vh-42px)] transition-shadow duration-300 hover:shadow-[0_0_12px_0_rgba(0,0,0,0.12)]"
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
  const sidebarEl: HTMLElement = sidebar;

  const shouldUsePeekExpand = (): boolean => window.innerWidth >= 768 && window.innerWidth < 1280;

  /* ──── URL-based active state ──── */
  const currentPath = window.location.pathname;
  const allItems = sidebarEl.querySelectorAll<HTMLElement>('[data-sidebar-item]');
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
  let isPeekExpanded = false;

  /* ──── Collapsed -> temporary expanded sidebar (tablet) ──── */

  function applyPeekExpandStyles(): void {
    sidebarEl.style.width = '260px';
    sidebarEl.style.zIndex = '30';
    sidebarEl.style.boxShadow = '4px 0 24px rgba(0,0,0,0.08)';
    sidebarEl.style.borderTopRightRadius = '0';
    sidebarEl.style.borderBottomRightRadius = '0';

    sidebarEl.querySelectorAll<HTMLElement>('.sidebar__section-title').forEach((el) => {
      el.style.display = 'block';
    });

    sidebarEl.querySelectorAll<HTMLElement>('.sidebar-item--expanded').forEach((el) => {
      el.style.marginLeft = '0.5rem';
      el.style.marginRight = '0.5rem';
      el.style.width = 'auto';
      el.style.height = '40px';
      el.style.justifyContent = 'flex-start';
      el.style.gap = '0.75rem';
      el.style.paddingLeft = '1rem';
      el.style.paddingRight = '1rem';
    });

    sidebarEl.querySelectorAll<HTMLElement>('.sidebar-item-label').forEach((el) => {
      el.style.display = 'block';
      if (el.classList.contains('truncate')) {
        el.style.whiteSpace = 'normal';
        el.style.overflow = 'visible';
        el.style.textOverflow = 'unset';
      }
    });

    sidebarEl.querySelectorAll<HTMLElement>('.sidebar-item-badge').forEach((el) => {
      el.style.display = 'inline-flex';
    });

    sidebarEl.querySelectorAll<HTMLElement>('.sidebar-item-chevron').forEach((el) => {
      el.style.display = 'block';
    });
  }

  function clearPeekExpandStyles(): void {
    sidebarEl.style.width = '';
    sidebarEl.style.zIndex = '';
    sidebarEl.style.boxShadow = '';
    sidebarEl.style.borderTopRightRadius = '';
    sidebarEl.style.borderBottomRightRadius = '';

    sidebarEl.querySelectorAll<HTMLElement>('.sidebar__section-title').forEach((el) => {
      el.style.display = '';
    });

    sidebarEl.querySelectorAll<HTMLElement>('.sidebar-item--expanded').forEach((el) => {
      el.style.marginLeft = '';
      el.style.marginRight = '';
      el.style.width = '';
      el.style.height = '';
      el.style.justifyContent = '';
      el.style.gap = '';
      el.style.paddingLeft = '';
      el.style.paddingRight = '';
    });

    sidebarEl.querySelectorAll<HTMLElement>('.sidebar-item-label').forEach((el) => {
      el.style.display = '';
      el.style.whiteSpace = '';
      el.style.overflow = '';
      el.style.textOverflow = '';
    });

    sidebarEl.querySelectorAll<HTMLElement>('.sidebar-item-badge').forEach((el) => {
      el.style.display = '';
    });

    sidebarEl.querySelectorAll<HTMLElement>('.sidebar-item-chevron').forEach((el) => {
      el.style.display = '';
    });
  }

  function setPeekExpanded(next: boolean): void {
    const shouldExpand = next && shouldUsePeekExpand();
    if (shouldExpand === isPeekExpanded) return;
    isPeekExpanded = shouldExpand;

    if (activeFlyout) {
      activeFlyout.style.display = 'none';
      activeFlyout = null;
    }
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    sidebarEl.style.borderTopRightRadius = '';
    sidebarEl.style.borderBottomRightRadius = '';

    if (shouldExpand) applyPeekExpandStyles();
    else clearPeekExpandStyles();
  }

  /* ──── Flyout helpers ──── */

  function positionFlyout(flyout: HTMLElement, _wrapper: HTMLElement): void {
    const sidebarRect = sidebarEl.getBoundingClientRect();
    flyout.style.left = `${sidebarRect.right}px`;
    flyout.style.top = `${sidebarRect.top}px`;
    flyout.style.height = `${sidebarRect.height}px`;
  }

  function showFlyout(flyout: HTMLElement, wrapper: HTMLElement): void {
    if (shouldUsePeekExpand()) return;
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
    // Sidebar + flyout become one unified card: remove right border-radius
    sidebarEl.style.borderTopRightRadius = '0';
    sidebarEl.style.borderBottomRightRadius = '0';
  }

  function scheduleClose(): void {
    if (closeTimer) clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      if (activeFlyout) {
        activeFlyout.style.display = 'none';
        activeFlyout = null;
        // Restore sidebar card shape
        sidebarEl.style.borderTopRightRadius = '';
        sidebarEl.style.borderBottomRightRadius = '';
      }
    }, 150);
  }

  /* ──── Event delegation on sidebar ──── */

  sidebarEl.addEventListener('mouseenter', (e: MouseEvent) => {
    if (shouldUsePeekExpand()) {
      setPeekExpanded(true);
      return;
    }
    const wrapper = (e.target as HTMLElement).closest<HTMLElement>('[data-sidebar-wrapper]');
    if (!wrapper) return;

    const flyout = wrapper.querySelector<HTMLElement>('[data-sidebar-flyout]');
    if (flyout) showFlyout(flyout, wrapper);
  }, true);

  sidebarEl.addEventListener('mouseleave', (e: MouseEvent) => {
    if (shouldUsePeekExpand()) {
      const related = e.relatedTarget as Node | null;
      if (!related || !sidebarEl.contains(related)) {
        setPeekExpanded(false);
      }
      return;
    }
    const wrapper = (e.target as HTMLElement).closest<HTMLElement>('[data-sidebar-wrapper]');
    if (!wrapper) return;

    const flyout = wrapper.querySelector<HTMLElement>('[data-sidebar-flyout]');
    if (flyout && activeFlyout === flyout) scheduleClose();
  }, true);

  /* ──── Flyout mouse bridge ──── */

  sidebarEl.addEventListener('mouseenter', (e: MouseEvent) => {
    if (shouldUsePeekExpand()) return;
    const flyout = (e.target as HTMLElement).closest<HTMLElement>('[data-sidebar-flyout]');
    if (flyout && closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
  }, true);

  sidebarEl.addEventListener('mouseleave', (e: MouseEvent) => {
    if (shouldUsePeekExpand()) return;
    const flyout = (e.target as HTMLElement).closest<HTMLElement>('[data-sidebar-flyout]');
    if (flyout && activeFlyout === flyout) scheduleClose();
  }, true);

  /* ──── Close flyout on scroll ──── */
  window.addEventListener('scroll', () => {
    if (isPeekExpanded) {
      setPeekExpanded(false);
    }
    if (activeFlyout) {
      activeFlyout.style.display = 'none';
      activeFlyout = null;
      sidebarEl.style.borderTopRightRadius = '';
    sidebarEl.style.borderBottomRightRadius = '';
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (!shouldUsePeekExpand()) {
      setPeekExpanded(false);
    }
  }, { passive: true });
}
