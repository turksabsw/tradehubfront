/**
 * MessagesLayout Component
 * Orchestrates the 3-panel messages layout: InboxPanel | MessageList | MessageContent
 * Plus a dismissible feedback banner at the bottom.
 */

import type { MessagesPageData } from '../../types/messages';
import { InboxPanel } from './InboxPanel';
import { MessageList } from './MessageList';
import { MessageContent } from './MessageContent';

export interface MessagesLayoutProps {
  data: MessagesPageData;
}

export function MessagesLayout(props: MessagesLayoutProps): string {
  const { data } = props;

  return `
    <div class="msg-layout">
      <!-- 3-panel grid -->
      <div class="msg-layout__panels">
        ${InboxPanel({ categories: data.categories, activeCategoryId: 'all' })}
        ${MessageList({ conversations: data.conversations, title: 'Tümü' })}
        ${MessageContent()}
      </div>

      <!-- Feedback Banner -->
      <div class="msg-feedback" id="msg-feedback">
        <span class="msg-feedback__text">İletişim deneyiminizi bizimle paylaşın.</span>
        <button class="msg-feedback__close" aria-label="Kapat" id="msg-feedback-close">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
  `;
}

export function initMessagesLayout(): void {
  /* Category tab switching */
  const cats = document.querySelectorAll<HTMLButtonElement>('.msg-inbox__cat');
  cats.forEach(btn => {
    btn.addEventListener('click', () => {
      cats.forEach(c => c.classList.remove('msg-inbox__cat--active'));
      btn.classList.add('msg-inbox__cat--active');
    });
  });

  /* Message item selection */
  const items = document.querySelectorAll<HTMLAnchorElement>('.msg-list__item');
  items.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      items.forEach(i => i.classList.remove('msg-list__item--active'));
      item.classList.add('msg-list__item--active');
    });
  });

  /* Feedback banner dismiss */
  const closeBtn = document.getElementById('msg-feedback-close');
  const banner = document.getElementById('msg-feedback');
  if (closeBtn && banner) {
    closeBtn.addEventListener('click', () => {
      banner.style.display = 'none';
    });
  }

  /* Search filtering */
  const searchInput = document.querySelector<HTMLInputElement>('.msg-inbox__search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      items.forEach(item => {
        const name = item.querySelector('.msg-list__name')?.textContent?.toLowerCase() ?? '';
        const company = item.querySelector('.msg-list__company')?.textContent?.toLowerCase() ?? '';
        const match = name.includes(query) || company.includes(query);
        (item as HTMLElement).style.display = match ? '' : 'none';
      });
    });
  }
}
