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
      class="block px-3 py-1.5 text-sm text-gray-700 rounded-md transition-colors hover:bg-gray-50 hover:text-[#FF6A00] dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-orange-400"
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
          ${groupName ? `<h4 class="px-3 mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">${groupName}</h4>` : ''}
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
      class="sidebar-flyout absolute left-full top-0 z-50 min-w-[200px] rounded-r-lg bg-white p-5 shadow-lg border border-l-0 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
      data-sidebar-flyout="${item.id}"
      role="menu"
      aria-label="${item.label} submenu"
      style="display: none;"
    >
      <h3 class="px-3 mb-2 text-sm font-bold text-gray-900 dark:text-white">${item.label}</h3>
      ${content}
    </div>
  `;
}
