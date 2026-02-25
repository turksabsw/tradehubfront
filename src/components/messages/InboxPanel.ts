/**
 * InboxPanel Component
 * Left panel: search bar, "Gelen Kutusu" heading, category tabs (Tümü / Okunmamış).
 */

import type { InboxCategory } from '../../types/messages';

export interface InboxPanelProps {
  categories: InboxCategory[];
  activeCategoryId: string;
}

function categoryIcon(type: string): string {
  if (type === 'chat') {
    return `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
    </svg>`;
  }
  // eye icon
  return `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/>
    <circle cx="12" cy="12" r="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

function renderCategory(cat: InboxCategory, isActive: boolean): string {
  const activeClass = isActive ? 'msg-inbox__cat--active' : '';
  const badge = cat.count ? `<span class="msg-inbox__cat-badge">${cat.count}</span>` : '';

  return `
    <button class="msg-inbox__cat ${activeClass}" data-category="${cat.id}">
      ${categoryIcon(cat.icon)}
      <span class="msg-inbox__cat-label">${cat.label}</span>
      ${badge}
    </button>
  `;
}

export function InboxPanel(props: InboxPanelProps): string {
  const { categories, activeCategoryId } = props;

  return `
    <aside class="msg-inbox">
      <!-- Search -->
      <div class="msg-inbox__search">
        <svg class="msg-inbox__search-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/>
          <path stroke-linecap="round" d="m21 21-4.35-4.35"/>
        </svg>
        <input type="text" class="msg-inbox__search-input" placeholder="Ara" />
      </div>

      <!-- Heading -->
      <h2 class="msg-inbox__heading">Gelen Kutusu</h2>

      <!-- Category Tabs -->
      <nav class="msg-inbox__cats" aria-label="Mesaj kategorileri">
        ${categories.map(c => renderCategory(c, c.id === activeCategoryId)).join('')}
      </nav>

      <!-- Bottom toolbar -->
      <div class="msg-inbox__toolbar">
        <button class="msg-inbox__toolbar-btn" aria-label="Liste görünümü">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </button>
        <div class="msg-inbox__toolbar-divider"></div>
        <button class="msg-inbox__toolbar-btn" aria-label="Kart görünümü">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
          </svg>
        </button>
      </div>
    </aside>
  `;
}
