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
    ? `<img src="${conv.avatar}" alt="${conv.name}" class="msg-list__avatar-img" loading="lazy" />`
    : TRADEHUB_AVATAR;

  const badge = conv.unreadCount > 0
    ? `<span class="msg-list__unread-badge">${conv.unreadCount}</span>`
    : '';

  return `
    <div class="msg-list__avatar">
      ${img}
      ${badge}
    </div>
  `;
}

function renderConversation(conv: MessageConversation): string {
  const companyLine = conv.company
    ? `<p class="msg-list__company">${conv.company}</p>`
    : '';

  return `
    <a href="${conv.href}" class="msg-list__item" data-id="${conv.id}">
      ${renderAvatar(conv)}
      <div class="msg-list__content">
        <div class="msg-list__row">
          <span class="msg-list__name">${conv.name}</span>
          <span class="msg-list__date">${conv.date}</span>
        </div>
        ${companyLine}
        <p class="msg-list__preview">${conv.preview}</p>
      </div>
    </a>
  `;
}

export function MessageList(props: MessageListProps): string {
  const { conversations, title } = props;

  return `
    <div class="msg-list">
      <!-- Header -->
      <div class="msg-list__header">
        <h3 class="msg-list__title">${title}</h3>
        <button class="msg-list__filter-btn" aria-label="Filtrele">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
          </svg>
        </button>
      </div>

      <!-- Conversations -->
      <div class="msg-list__conversations">
        ${conversations.map(renderConversation).join('')}
      </div>
    </div>
  `;
}
