/**
 * ContactsLayout Component
 * "Kişilerim" page — 2-panel: contact list (left) + contact detail (right).
 * Alibaba-style with search, sort dropdown, and empty states.
 */

export function ContactsLayout(): string {
  return `
    <div class="contacts-layout">
      <!-- Info Banner -->
      <div class="contacts-banner" id="contacts-banner">
        <svg class="contacts-banner__icon" fill="none" stroke="#2563EB" stroke-width="1.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <path stroke-linecap="round" d="M12 16v-4m0-4h.01"/>
        </svg>
        <span class="contacts-banner__text">
          TradeHub'u geliştirmemize yardım edin!
          <a href="#feedback" class="contacts-banner__link">Buraya tıklayın</a>
        </span>
      </div>

      <!-- Panels -->
      <div class="contacts-panels">
        <!-- Left: Contact List -->
        <aside class="contacts-list">
          <!-- Header -->
          <div class="contacts-list__header">
            <button class="contacts-list__title-btn">
              Tüm kişiler - 0
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
          </div>

          <!-- Search -->
          <div class="contacts-list__search">
            <input type="text" class="contacts-list__search-input" placeholder="Tedarikçi kişilerinizi arayın" />
            <button class="contacts-list__search-btn" aria-label="Ara">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/>
                <path stroke-linecap="round" d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </div>

          <!-- Sort -->
          <div class="contacts-list__sort">
            <button class="contacts-list__sort-btn">
              Kişi zamanına göre sırala
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
          </div>

          <!-- Empty State -->
          <div class="contacts-list__empty">
            <svg class="contacts-list__empty-icon" fill="none" stroke="#999" stroke-width="1.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/>
              <path stroke-linecap="round" d="M12 16v-4m0-4h.01"/>
            </svg>
            <span class="contacts-list__empty-text">Sonuç yok</span>
          </div>
        </aside>

        <!-- Right: Contact Detail -->
        <div class="contacts-detail">
          <div class="contacts-detail__empty">
            <!-- Illustration: person at server/file cabinet -->
            <div class="contacts-detail__illustration">
              <svg width="180" height="140" viewBox="0 0 180 140" fill="none">
                <!-- Server/Cabinet -->
                <rect x="30" y="20" width="60" height="100" rx="4" fill="#E8EDF3" stroke="#C5CED8" stroke-width="1"/>
                <rect x="35" y="28" width="50" height="14" rx="2" fill="#D1D9E3"/>
                <rect x="35" y="48" width="50" height="14" rx="2" fill="#D1D9E3"/>
                <rect x="35" y="68" width="50" height="14" rx="2" fill="#D1D9E3"/>
                <rect x="35" y="88" width="50" height="14" rx="2" fill="#D1D9E3"/>
                <circle cx="42" cy="35" r="2" fill="#93A3B5"/>
                <circle cx="42" cy="55" r="2" fill="#93A3B5"/>
                <circle cx="42" cy="75" r="2" fill="#93A3B5"/>
                <circle cx="42" cy="95" r="2" fill="#93A3B5"/>
                <!-- Person -->
                <circle cx="115" cy="42" r="10" fill="#FBBF24"/>
                <rect x="107" y="55" width="16" height="30" rx="4" fill="#1E3A5F"/>
                <rect x="103" y="58" width="8" height="22" rx="3" fill="#1E3A5F"/>
                <rect x="119" y="58" width="12" height="4" rx="2" fill="#D4A574"/>
                <rect x="107" y="85" width="7" height="18" rx="3" fill="#1E3A5F"/>
                <rect x="116" y="85" width="7" height="18" rx="3" fill="#1E3A5F"/>
                <!-- Spray/water effect -->
                <path d="M131 62 Q145 55 140 70 Q135 80 148 75" stroke="#BFD4E8" stroke-width="1" fill="none" opacity="0.6"/>
                <path d="M131 65 Q142 60 138 73 Q134 82 145 78" stroke="#BFD4E8" stroke-width="1" fill="none" opacity="0.4"/>
                <!-- Floor shadow -->
                <ellipse cx="100" cy="110" rx="50" ry="6" fill="#E8EDF3" opacity="0.5"/>
              </svg>
            </div>
            <p class="contacts-detail__text">Üzgünüz, bu kişinin bilgilerini bulamadık.</p>
          </div>

          <!-- Top-right compose button -->
          <button class="contacts-detail__compose" aria-label="Yeni mesaj">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

export function initContactsLayout(): void {
  /* Banner dismiss (optional) */
  const banner = document.getElementById('contacts-banner');
  if (banner) {
    banner.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('.contacts-banner__link')) return;
    });
  }
}
