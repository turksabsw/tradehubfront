/**
 * SidebarFlyout Component
 * Renders the flyout submenu panel that appears on hover over a sidebar menu item.
 * Supports grouped sections (e.g., Ödeme with Özet, T/T, Ek Hizmetler groups).
 * Positioned absolute, left: 100% of sidebar.
 */

import type { SidebarMenuItem, SidebarSubmenuItem } from '../../types/buyerDashboard';

/* ════════════════════════════════════════════════════
   HELPERS
   ════════════════════════════════════════════════════ */

/**
 * Groups submenu items by their optional `group` property.
 * Items without a group go into a default '' key.
 */
function groupSubmenuItems(items: SidebarSubmenuItem[]): Map<string, SidebarSubmenuItem[]> {
  const groups = new Map<string, SidebarSubmenuItem[]>();
  for (const item of items) {
    const key = item.group ?? '';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(item);
  }
  return groups;
}

/**
 * Renders a single flyout link item.
 */
function renderFlyoutLink(item: SidebarSubmenuItem): string {
  return `
    <a
      href="${item.href}"
      class="block px-3 py-2 text-sm font-normal text-gray-900 dark:text-gray-300 rounded-md transition-colors hover:bg-gray-50 hover:text-primary-600 dark:hover:bg-gray-700 dark:hover:text-primary-400"
    >
      ${item.label}
    </a>
  `;
}

/* ════════════════════════════════════════════════════
   RENDER
   ════════════════════════════════════════════════════ */

export interface SidebarFlyoutProps {
  item: SidebarMenuItem;
}

/**
 * Renders the flyout submenu panel for a sidebar menu item.
 * Returns empty string if no submenu exists.
 */
export function renderSidebarFlyout({ item }: SidebarFlyoutProps): string {
  if (!item.submenu || item.submenu.length === 0) return '';

  const groups = groupSubmenuItems(item.submenu);
  const hasGroups = groups.size > 1 || (groups.size === 1 && !groups.has(''));

  let content: string;

  if (hasGroups) {
    /* ──── Grouped sections ──── */
    const sections: string[] = [];
    for (const [groupName, items] of groups) {
      sections.push(`
        <div class="sidebar-flyout__section ${sections.length > 0 ? 'mt-3 pt-3 border-t border-gray-100 dark:border-gray-700' : ''}">
          ${groupName ? `<h4 class="px-3 mb-1.5 text-xs font-normal text-gray-400 dark:text-gray-500">${groupName}</h4>` : ''}
          ${items.map(renderFlyoutLink).join('')}
        </div>
      `);
    }
    content = sections.join('');
  } else {
    /* ──── Flat list ──── */
    content = item.submenu.map(renderFlyoutLink).join('');
  }

  return `
    <div
      class="sidebar-flyout fixed z-50 w-[196px] bg-gray-100 dark:bg-gray-800 pt-5 px-5 pb-5 overflow-y-auto border-l border-gray-200 dark:border-gray-700 rounded-r-lg"
      data-sidebar-flyout="${item.id}"
      role="menu"
      aria-label="${item.label} submenu"
      style="display: none; clip-path: inset(-24px -24px -24px 0); box-shadow: 4px 0 24px rgba(0,0,0,0.08);"
    >
      <h3 class="px-3 mb-3 text-base font-bold text-gray-900 dark:text-white">${item.label}</h3>
      ${content}
    </div>
  `;
}
