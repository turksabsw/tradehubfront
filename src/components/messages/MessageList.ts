/**
 * MessageList Component
 * Center panel: "Tümü" header with filter icon + conversation list.
 * Each conversation: avatar + unread badge, name, date, company, preview text.
 */

import type { MessageConversation } from '../../types/messages';

export interface MessageListProps {
  conversations: MessageConversation[];
  title: string;
}

/* TradeHub logo SVG for platform messages */
const TRADEHUB_AVATAR = `<svg class="w-full h-full" viewBox="0 0 40 40" fill="none">
  <circle cx="20" cy="20" r="20" fill="#FFF2E8"/>
  <text x="20" y="25" text-anchor="middle" font-size="16" font-weight="600" fill="#E67A00">T</text>
</svg>`;

function renderAvatar(conv: MessageConversation): string {
  const img = conv.avatar
    ? `<img src="${conv.avatar}" alt="${conv.name}" class="w-10 h-10 rounded-full object-cover" loading="lazy" />`
    : TRADEHUB_AVATAR;

  const badge = conv.unreadCount > 0
    ? `<span class="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center px-1 text-[11px] font-semibold text-(--color-surface) bg-red-500 rounded-full border-2 border-(--color-surface) leading-none">${conv.unreadCount}</span>`
    : '';

  return `
    <div class="relative w-10 h-10 flex-shrink-0 rounded-full overflow-visible">
      ${img}
      ${badge}
    </div>
  `;
}

function renderConversation(conv: MessageConversation): string {
  const companyLine = conv.company
    ? `<p class="msg-list__company text-[13px] text-(--color-text-placeholder,#999999) whitespace-nowrap overflow-hidden text-ellipsis mb-0.5">${conv.company}</p>`
    : '';

  return `
    <a href="${conv.href}" class="msg-list__item flex items-start gap-3 px-5 py-3.5 no-underline border-b border-(--color-surface-raised,#f5f5f5) cursor-pointer transition-[background] duration-150 hover:bg-(--color-surface-muted,#fafafa)" data-id="${conv.id}">
      ${renderAvatar(conv)}
      <div class="flex-1 min-w-0">
        <div class="flex items-baseline justify-between gap-2 mb-0.5">
          <span class="msg-list__name text-sm font-semibold text-(--color-text-heading,#111827) whitespace-nowrap overflow-hidden text-ellipsis">${conv.name}</span>
          <span class="text-xs text-(--color-text-placeholder,#999999) whitespace-nowrap flex-shrink-0">${conv.date}</span>
        </div>
        ${companyLine}
        <p class="text-[13px] text-(--color-text-placeholder,#999999) whitespace-nowrap overflow-hidden text-ellipsis">${conv.preview}</p>
      </div>
    </a>
  `;
}

export function MessageList(props: MessageListProps): string {
  const { conversations, title } = props;

  return `
    <div class="w-[360px] max-lg:w-[300px] max-md:w-full max-md:max-h-[50vh] flex-shrink-0 border-r border-(--color-border-light,#f0f0f0) max-md:border-r-0 flex flex-col bg-(--color-surface,#ffffff)">
      <!-- Header -->
      <div class="flex items-center justify-between px-5 pt-4 pb-3 border-b border-(--color-border-light,#f0f0f0)">
        <h3 class="text-base font-bold text-(--color-text-heading,#111827)">${title}</h3>
        <button class="flex items-center justify-center w-7 h-7 border-none bg-transparent text-(--color-text-placeholder,#999999) cursor-pointer rounded hover:text-(--color-text-body,#333333) transition-colors duration-150" aria-label="Filtrele">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
          </svg>
        </button>
      </div>

      <!-- Conversations -->
      <div class="flex-1 overflow-y-auto">
        ${conversations.map(renderConversation).join('')}
      </div>
    </div>
  `;
}
