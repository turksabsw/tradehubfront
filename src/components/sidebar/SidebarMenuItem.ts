/**
 * SidebarMenuItem Component
 * Renders a single sidebar menu item with icon, label, chevron, optional badge.
 * Supports expanded (full) and collapsed (icon-only) display modes.
 * Active state: green left border + light green background.
 */

import type { SidebarMenuItem as SidebarMenuItemType } from '../../types/buyerDashboard';
import { sidebarIcons, type SidebarIconKey } from './sidebarIcons';

/* ════════════════════════════════════════════════════
   RENDER
   ════════════════════════════════════════════════════ */

export interface SidebarMenuItemProps {
  item: SidebarMenuItemType;
  expanded: boolean;
}

/**
 * Renders a single sidebar menu item.
 * In expanded mode: icon + label + optional badge + chevron (if submenu).
 * In collapsed mode: icon only in a centered 40×40 box.
 */
export function renderSidebarMenuItem({ item, expanded }: SidebarMenuItemProps): string {
  const icon = sidebarIcons[item.icon as SidebarIconKey] ?? '';
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const chevron = sidebarIcons.chevronRight;

  const activeClasses = item.active
    ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white'
    : 'text-gray-700 dark:text-gray-300';

  const hoverClasses = 'hover:bg-white hover:shadow-sm dark:hover:bg-gray-800';

  if (!expanded) {
    /* ──── Collapsed mode: icon only ──── */
    return `
      <a
        href="${item.href}"
        class="sidebar-item sidebar-item--collapsed group relative flex items-center justify-center w-11 h-11 xs:w-10 xs:h-10 mx-auto rounded-lg ${item.active ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'} ${hoverClasses} transition-colors"
        data-sidebar-item="${item.id}"
        data-tooltip-target="tooltip-sidebar-${item.id}"
        data-tooltip-placement="right"
        role="menuitem"
        aria-label="${item.label}"
      >
        <span class="w-5 h-5 flex-shrink-0">${icon}</span>
        ${item.badge ? `<span class="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-red-500 rounded-full">${item.badge}</span>` : ''}
      </a>
      <div id="tooltip-sidebar-${item.id}" role="tooltip" class="absolute z-50 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        ${item.label}
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
    `;
  }

  /* ──── Expanded mode: full item ──── */
  return `
    <a
      href="${item.href}"
      class="sidebar-item sidebar-item--expanded group flex items-center gap-2 xs:gap-3 px-3 xs:px-4 h-11 xs:h-10 rounded-lg mx-1 xs:mx-2 ${activeClasses} ${hoverClasses} transition-all cursor-pointer"
      data-sidebar-item="${item.id}"
      role="menuitem"
      aria-label="${item.label}"
      ${hasSubmenu ? 'aria-haspopup="true" aria-expanded="false"' : ''}
    >
      <span class="w-5 h-5 flex-shrink-0">${icon}</span>
      <span class="flex-1 text-sm font-normal text-gray-900 dark:text-gray-200 truncate">${item.label}</span>
      ${item.badge ? `<span class="inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white bg-red-500 rounded-full">${item.badge}</span>` : ''}
      ${hasSubmenu ? `<span class="w-4 h-4 flex-shrink-0 text-gray-400 dark:text-gray-500 transition-transform">${chevron}</span>` : ''}
    </a>
  `;
}
