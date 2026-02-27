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
  const badge = cat.count ? `<span class="ml-auto text-xs text-(--color-text-placeholder,#999999) font-normal">${cat.count}</span>` : '';

  return `
    <button class="msg-inbox__cat flex items-center gap-2 px-3 py-2 border-none bg-transparent rounded-md text-[13px] text-(--color-text-muted,#666666) cursor-pointer transition-[background,color] duration-150 hover:bg-(--color-surface-raised,#f5f5f5) ${activeClass}" data-category="${cat.id}">
      ${categoryIcon(cat.icon)}
      <span>${cat.label}</span>
      ${badge}
    </button>
  `;
}

export function InboxPanel(props: InboxPanelProps): string {
  const { categories, activeCategoryId } = props;

  return `
    <aside class="w-[240px] max-lg:w-[200px] max-md:w-full flex-shrink-0 border-r border-(--color-border-light,#f0f0f0) max-md:border-r-0 max-md:border-b flex flex-col bg-(--color-surface,#ffffff) max-sm:px-0">
      <!-- Search -->
      <div class="relative px-4 pt-4 pb-3">
        <svg class="absolute left-7 top-1/2 -translate-y-1/2 mt-0.5 w-4 h-4 text-(--color-text-placeholder,#999999) pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/>
          <path stroke-linecap="round" d="m21 21-4.35-4.35"/>
        </svg>
        <input type="text" class="msg-inbox__search-input w-full h-9 pl-9 pr-3 border border-(--color-border-default,#e5e5e5) rounded-full text-[13px] text-(--color-text-body,#333333) bg-(--color-surface-muted,#fafafa) outline-none transition-[border-color] duration-150 placeholder:text-(--color-text-placeholder,#999999) focus:border-(--color-cta-primary,#cc9900) focus:bg-(--color-surface,#ffffff)" placeholder="Ara" />
      </div>

      <!-- Heading -->
      <h2 class="text-[15px] font-bold text-(--color-text-heading,#111827) px-4 pb-3">Gelen Kutusu</h2>

      <!-- Category Tabs -->
      <nav class="flex flex-col max-md:flex-row gap-0.5 px-2" aria-label="Mesaj kategorileri">
        ${categories.map(c => renderCategory(c, c.id === activeCategoryId)).join('')}
      </nav>

      <!-- Bottom toolbar -->
      <div class="mt-auto flex items-center gap-2 px-4 py-3 border-t border-(--color-border-light,#f0f0f0) max-md:hidden">
        <button class="flex items-center justify-center w-7 h-7 border-none bg-transparent text-(--color-text-placeholder,#999999) cursor-pointer rounded hover:text-(--color-text-body,#333333) hover:bg-(--color-surface-raised,#f5f5f5) transition-[color,background] duration-150" aria-label="Liste görünümü">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </button>
        <div class="w-px h-4 bg-gray-200"></div>
        <button class="flex items-center justify-center w-7 h-7 border-none bg-transparent text-(--color-text-placeholder,#999999) cursor-pointer rounded hover:text-(--color-text-body,#333333) hover:bg-(--color-surface-raised,#f5f5f5) transition-[color,background] duration-150" aria-label="Kart görünümü">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
          </svg>
        </button>
      </div>
    </aside>
  `;
}
