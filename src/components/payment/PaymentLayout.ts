/**
 * PaymentLayout Component
 * Internal left-nav with grouped sections:
 *   Özet: Ödeme yönetimi, İşlemler
 *   T/T: Havale hesapları, Havale Takibi
 *   Ek hizmetler: Alibaba.com Kartı, Pay Later for Business
 *
 * Modals: "Yeni bir kart ekle", "Tedarikçinin hesabını doğrula"
 * Inline view: "Havale dekontu yükle"
 */

/* ────────────────────────────────────────
   NAV STRUCTURE
   ──────────────────────────────────────── */
interface PayNavGroup {
  title: string;
  items: { id: string; label: string }[];
}

const NAV_GROUPS: PayNavGroup[] = [
  {
    title: 'Özet',
    items: [
      { id: 'payment-management', label: 'Ödeme yönetimi' },
      { id: 'transactions', label: 'İşlemler' },
    ],
  },
  {
    title: 'T/T',
    items: [
      { id: 'tt-accounts', label: 'Havale hesapları' },
      { id: 'tt-tracking', label: 'Havale Takibi' },
    ],
  },
  {
    title: 'Ek hizmetler',
    items: [
      { id: 'alibaba-card', label: 'Alibaba.com Kartı' },
      { id: 'pay-later', label: 'Pay Later for Business' },
    ],
  },
];

/* ────────────────────────────────────────
   SHARED ICONS
   ──────────────────────────────────────── */
const SEARCH_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#666" stroke-width="1.3"/><path d="M11 11l3 3" stroke="#666" stroke-width="1.3" stroke-linecap="round"/></svg>`;
const CALENDAR_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="2" stroke="#999" stroke-width="1.2"/><path d="M2 6h12M5 1v3M11 1v3" stroke="#999" stroke-width="1.2" stroke-linecap="round"/></svg>`;
const RECEIPT_ICON = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="10" y="4" width="28" height="36" rx="3" fill="#E5E7EB" stroke="#D1D5DB" stroke-width="1"/><rect x="16" y="12" width="16" height="2.5" rx="1.25" fill="#D1D5DB"/><rect x="16" y="18" width="12" height="2.5" rx="1.25" fill="#D1D5DB"/><rect x="16" y="24" width="14" height="2.5" rx="1.25" fill="#D1D5DB"/><path d="M10 40l3-2.5 3 2.5 3-2.5 3 2.5 3-2.5 3 2.5 3-2.5 3 2.5V4H10v36z" fill="#E5E7EB"/></svg>`;

/* ────────────────────────────────────────
   SECTION: Ödeme yönetimi
   ──────────────────────────────────────── */
function renderPaymentManagement(): string {
  return `
    <div class="pay-header"><h1 class="pay-header__title">Ödeme yönetimi</h1></div>

    <!-- Kayıtlı kartlar -->
    <div class="pay-section">
      <h2 class="pay-section__title">Kayıtlı kartlar ve hesaplar</h2>
      <div class="pay-add-card" data-action="open-card-modal">
        <span class="pay-add-card__icon">+</span>
        <span class="pay-add-card__text">Yeni bir kart ekle</span>
      </div>
    </div>

    <!-- İşlemler -->
    <div class="pay-section">
      <h2 class="pay-section__title">İşlemler</h2>
      <div class="pay-tabs" data-tabgroup="pay-mgmt">
        <button class="pay-tabs__tab pay-tabs__tab--active" data-tab="pay-mgmt-payments">Ödemeler</button>
        <button class="pay-tabs__tab" data-tab="pay-mgmt-refunds">Para iadeleri</button>
      </div>
      <div class="pay-tab-content pay-tab-content--active" data-content="pay-mgmt-payments">
        <div class="pay-empty">
          ${RECEIPT_ICON}
          <p>Henüz bir ödeme kaydı bulunmamaktadır</p>
        </div>
      </div>
      <div class="pay-tab-content" data-content="pay-mgmt-refunds">
        <div class="pay-empty">
          ${RECEIPT_ICON}
          <p>Henüz bir iade kaydı bulunmamaktadır</p>
        </div>
      </div>
    </div>

    <!-- Modal: Yeni bir kart ekle -->
    <div class="pay-modal" id="pay-card-modal">
      <div class="pay-modal__overlay"></div>
      <div class="pay-modal__dialog">
        <div class="pay-modal__header">
          <h3 class="pay-modal__title">Yeni bir kart ekle</h3>
          <button class="pay-modal__close" aria-label="Kapat">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M14 4L4 14M4 4l10 10" stroke="#333" stroke-width="1.8" stroke-linecap="round"/></svg>
          </button>
        </div>
        <div class="pay-modal__body">
          <div class="pay-card-logos">
            <span class="pay-card-logo pay-card-logo--visa">VISA</span>
            <span class="pay-card-logo pay-card-logo--mc">MC</span>
            <span class="pay-card-logo pay-card-logo--amex">AMEX</span>
            <span class="pay-card-logo pay-card-logo--discover">D</span>
            <span class="pay-card-logo pay-card-logo--diners">DC</span>
            <span class="pay-card-logo pay-card-logo--jcb">JCB</span>
            <span class="pay-card-logo pay-card-logo--union">UP</span>
            <span class="pay-card-logo pay-card-logo--other">CB</span>
          </div>
          <div class="pay-form__field">
            <input type="text" class="pay-form__input" placeholder="Kart numarası *" maxlength="19" />
          </div>
          <div class="pay-form__row">
            <input type="text" class="pay-form__input" placeholder="Ad *" />
            <input type="text" class="pay-form__input" placeholder="Soyad *" />
          </div>
          <div class="pay-form__row pay-form__row--expiry">
            <select class="pay-form__select pay-form__select--month"><option>Ay *</option>${Array.from({length:12},(_,i)=>`<option>${String(i+1).padStart(2,'0')}</option>`).join('')}</select>
            <span class="pay-form__separator">/</span>
            <select class="pay-form__select pay-form__select--year"><option>Yıl *</option>${Array.from({length:10},(_,i)=>`<option>${2025+i}</option>`).join('')}</select>
            <div class="pay-form__cvv-wrap">
              <input type="text" class="pay-form__input pay-form__input--cvv" placeholder="CVV/CVC *" maxlength="4" />
              <div class="pay-form__cvv-icons">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" stroke="#999" stroke-width="1.2"/><path d="M2 7h12" stroke="#999" stroke-width="1.2"/></svg>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#999" stroke-width="1.2"/><path d="M8 5v3m0 2.5h.01" stroke="#999" stroke-width="1.2" stroke-linecap="round"/></svg>
              </div>
            </div>
          </div>
        </div>
        <div class="pay-modal__footer">
          <button class="pay-modal__btn pay-modal__btn--primary">Kaydet</button>
        </div>
      </div>
    </div>
  `;
}

/* ────────────────────────────────────────
   SECTION: İşlemler (Tüm İşlemler)
   ──────────────────────────────────────── */
function renderTransactions(): string {
  return `
    <div class="pay-breadcrumb">Ödemeler &gt; Tüm İşlemler</div>
    <div class="pay-header"><h1 class="pay-header__title">Tüm İşlemler</h1></div>

    <div class="pay-tabs" data-tabgroup="pay-trans">
      <button class="pay-tabs__tab pay-tabs__tab--active" data-tab="pay-trans-payments">Ödeme</button>
      <button class="pay-tabs__tab" data-tab="pay-trans-refunds">Para iadesi</button>
    </div>

    <div class="pay-tab-content pay-tab-content--active" data-content="pay-trans-payments">
      <!-- Status pills -->
      <div class="pay-status-row">
        <span class="pay-status-row__label">Durum</span>
        <div class="pay-pills">
          <button class="pay-pill pay-pill--active">Tümü</button>
          <button class="pay-pill">Ödemeler Henüz Ulaşmadı</button>
          <button class="pay-pill">Bekleyen Tedarikçi Eşleşmesi</button>
          <button class="pay-pill">Tamamlandı</button>
        </div>
      </div>

      <!-- Filters -->
      <div class="pay-filter-row">
        <div class="pay-filter-row__inputs">
          <div class="pay-filter__date-wrap">
            <input type="text" class="pay-filter__input" placeholder="Saat seçin" readonly />
            ${CALENDAR_ICON}
          </div>
          <input type="text" class="pay-filter__input" placeholder="Ödeme tutarına göre ara" />
          <select class="pay-filter__select"><option>Para birimi</option><option>USD</option><option>EUR</option><option>TRY</option></select>
          <a href="#" class="pay-filter__reset">Filtreleri Kaldır</a>
        </div>
        <button class="pay-filter__export-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v8m0 0l-3-3m3 3l3-3M3 12h10" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          İhracat Ayrıntıları
        </button>
      </div>

      <!-- Table -->
      <div class="pay-table-wrap">
        <table class="pay-table">
          <thead><tr>
            <th>Gönderme saati (PST)</th><th>Tedarikçi</th><th>Ödeme yöntemi</th><th>Tutar</th><th>İşlem Ücreti</th><th>Durum</th><th>İşlemler</th>
          </tr></thead>
          <tbody><tr><td colspan="7" class="pay-table__empty-text">Henüz bir ödeme kaydı bulunmamaktadır</td></tr></tbody>
        </table>
      </div>
    </div>

    <div class="pay-tab-content" data-content="pay-trans-refunds">
      <div class="pay-empty">${RECEIPT_ICON}<p>Henüz bir iade kaydı bulunmamaktadır</p></div>
    </div>
  `;
}

/* ────────────────────────────────────────
   SECTION: Havale hesapları (Banka Havalesi Hesapları)
   ──────────────────────────────────────── */
function renderTTAccounts(): string {
  return `
    <div class="pay-breadcrumb">İşlemler &gt; Banka Havalesi Hesapları</div>
    <div class="pay-header pay-header--actions">
      <h1 class="pay-header__title">Banka Havalesi Hesapları</h1>
      <div class="pay-header__btns">
        <button class="pay-header__action-btn" data-action="open-verify-modal">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="2" stroke="#333" stroke-width="1.2"/><path d="M6 8l2 2 4-4" stroke="#333" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Tedarikçinin hesabını doğrula
        </button>
        <button class="pay-header__action-btn" data-action="show-upload">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#333" stroke-width="1.2"/><path d="M8 5v6M5 8h6" stroke="#333" stroke-width="1.2" stroke-linecap="round"/></svg>
          Havale dekontu yükle
        </button>
        <button class="pay-header__info-btn" aria-label="Bilgi" data-action="toggle-tooltip">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#666" stroke-width="1.2"/><path d="M8 5v3m0 2.5h.01" stroke="#666" stroke-width="1.2" stroke-linecap="round"/></svg>
        </button>
        <div class="pay-tooltip" id="pay-tt-tooltip">
          Tedarikçi hesabının resmi Alibaba.com banka hesabı olup olmadığını doğrulayın. Ödemenizin Alibaba.com tarafından korunduğunu doğrulamak için havale dekontu yükleyin.
          <button class="pay-tooltip__close" aria-label="Kapat">&times;</button>
        </div>
      </div>
    </div>

    <div class="pay-tabs" data-tabgroup="pay-tt">
      <button class="pay-tabs__tab pay-tabs__tab--active" data-tab="pay-tt-all">Tümü</button>
      <button class="pay-tabs__tab" data-tab="pay-tt-pending">Bekleyen Tedarikçi Eşleşmesi</button>
      <button class="pay-tabs__tab" data-tab="pay-tt-matched">Tedarikçi Tarafından Tam Eşleşme</button>
    </div>

    <!-- Search + Filters -->
    <div class="pay-tt-filters">
      <div class="pay-tt-filters__left">
        <div class="pay-tt-filters__search">
          <input type="text" class="pay-filter__input pay-filter__input--sm" placeholder="Tedarikçinin e-postasına ..." />
          <button class="pay-tt-filters__search-btn">${SEARCH_ICON}</button>
        </div>
        <div class="pay-filter__date-wrap">
          <input type="text" class="pay-filter__input" placeholder="Saat seçin" readonly />
          ${CALENDAR_ICON}
        </div>
        <a href="#" class="pay-filter__reset">Filtreleri Kaldır</a>
      </div>
      <div class="pay-tt-filters__right">
        <span class="pay-tt-summary">Toplam Havale Miktarı: <strong>USD 0.00</strong></span>
        <span class="pay-tt-summary">Bekleyen Tedarikçi Eşleşmesi: <strong>USD 0.00</strong></span>
      </div>
    </div>

    <!-- Table -->
    <div class="pay-table-wrap">
      <table class="pay-table">
        <thead><tr>
          <th>Son Ulaşım Saati (PST)</th><th>Tedarikçi Bilgileri</th><th>Tedarikçi T/T Hesap Numarası</th><th>Toplam Havale Tutarı</th><th>Durum</th><th>İşlemler</th>
        </tr></thead>
        <tbody><tr><td colspan="6" class="pay-table__empty-text">Henüz bir ödeme kaydı bulunmamaktadır</td></tr></tbody>
      </table>
    </div>

    <!-- Modal: Tedarikçinin hesabını doğrula -->
    <div class="pay-modal" id="pay-verify-modal">
      <div class="pay-modal__overlay"></div>
      <div class="pay-modal__dialog">
        <div class="pay-modal__header">
          <h3 class="pay-modal__title">Tedarikçinin hesabını doğrula</h3>
          <button class="pay-modal__close" aria-label="Kapat">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M14 4L4 14M4 4l10 10" stroke="#333" stroke-width="1.8" stroke-linecap="round"/></svg>
          </button>
        </div>
        <div class="pay-modal__body">
          <div class="pay-verify-warning">
            <span class="pay-verify-warning__dot"></span>
            <span>Ödeme yapmadan önce daima tedarikçinin banka hesabını doğrulayın</span>
          </div>
          <p class="pay-verify-desc">Tedarikçiden bir ödeme talimatı aldığınızda, ödeme yapmadan önce hesap numarasının resmi Alibaba.com banka hesabına ait olduğunu doğrulayın. Böylece sipariş korumasından yararlanabilirsiniz.</p>
          <div class="pay-form__field">
            <input type="text" class="pay-form__input" placeholder="Tedarikçinin banka hesap numarası *" />
          </div>
        </div>
        <div class="pay-modal__footer pay-modal__footer--split">
          <button class="pay-modal__btn pay-modal__btn--cancel">Vazgeç</button>
          <button class="pay-modal__btn pay-modal__btn--primary pay-modal__btn--icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3.5 3.5L13 5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Doğrula
          </button>
        </div>
      </div>
    </div>
  `;
}

/* ────────────────────────────────────────
   SECTION: Havale Takibi
   ──────────────────────────────────────── */
function renderTTTracking(): string {
  return `
    <div class="pay-header"><h1 class="pay-header__title">Havale Takibi</h1></div>
    <div class="pay-tt-filters">
      <div class="pay-tt-filters__left">
        <div class="pay-tt-filters__search">
          <input type="text" class="pay-filter__input pay-filter__input--sm" placeholder="Havale referans numarası..." />
          <button class="pay-tt-filters__search-btn">${SEARCH_ICON}</button>
        </div>
        <div class="pay-filter__date-wrap">
          <input type="text" class="pay-filter__input" placeholder="Saat seçin" readonly />
          ${CALENDAR_ICON}
        </div>
        <a href="#" class="pay-filter__reset">Filtreleri Kaldır</a>
      </div>
    </div>
    <div class="pay-table-wrap">
      <table class="pay-table">
        <thead><tr>
          <th>Referans No</th><th>Tedarikçi</th><th>Havale Tutarı</th><th>Gönderim Tarihi</th><th>Durum</th><th>İşlemler</th>
        </tr></thead>
        <tbody><tr><td colspan="6" class="pay-table__empty-text">Henüz bir havale takip kaydı bulunmamaktadır</td></tr></tbody>
      </table>
    </div>
  `;
}

/* ────────────────────────────────────────
   SECTION: Alibaba.com Kartı
   ──────────────────────────────────────── */
function renderAlibabaCard(): string {
  return `
    <div class="pay-header"><h1 class="pay-header__title">Alibaba.com Kartı</h1></div>
    <div class="pay-empty pay-empty--tall">${RECEIPT_ICON}<p>Bu hizmet yakında kullanıma sunulacaktır</p></div>
  `;
}

/* ────────────────────────────────────────
   SECTION: Pay Later for Business
   ──────────────────────────────────────── */
function renderPayLater(): string {
  return `
    <div class="pay-header"><h1 class="pay-header__title">Pay Later for Business</h1></div>
    <div class="pay-empty pay-empty--tall">${RECEIPT_ICON}<p>Bu hizmet yakında kullanıma sunulacaktır</p></div>
  `;
}

/* ────────────────────────────────────────
   UPLOAD VIEW (inline, replaces content)
   ──────────────────────────────────────── */
function renderUpload(): string {
  return `
    <div class="pay-header"><h1 class="pay-header__title">Havale dekontu yükle</h1></div>
    <div class="pay-upload-area">
      <p class="pay-upload-area__note"><span class="pay-upload-area__star">*</span> Havale dekontunuzu veya MT103 belgenizi yükleyin ya da dosyayı kutuya sürükleyip bırakın. <a href="#" class="pay-upload-area__link">Örnekleri görüntüle</a></p>
      <div class="pay-upload-area__content">
        <div class="pay-upload-area__preview">
          <svg width="120" height="160" viewBox="0 0 120 160" fill="none">
            <rect x="4" y="4" width="112" height="152" rx="4" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="1" stroke-dasharray="4 4"/>
            <rect x="16" y="20" width="88" height="8" rx="2" fill="#E5E7EB"/>
            <rect x="16" y="36" width="60" height="6" rx="2" fill="#E5E7EB"/>
            <rect x="16" y="50" width="70" height="6" rx="2" fill="#E5E7EB"/>
            <rect x="16" y="64" width="50" height="6" rx="2" fill="#E5E7EB"/>
            <rect x="16" y="84" width="88" height="1" fill="#E5E7EB"/>
            <rect x="16" y="96" width="60" height="6" rx="2" fill="#E5E7EB"/>
            <rect x="16" y="110" width="40" height="6" rx="2" fill="#E5E7EB"/>
            <rect x="16" y="126" width="70" height="6" rx="2" fill="#E5E7EB"/>
          </svg>
        </div>
        <div class="pay-upload-area__info">
          <p><strong>Belgenizin detaylarının net olduğundan emin olun</strong></p>
          <p>Dosya boyutu: 20 MB altında</p>
          <p>Desteklenen formatlar: JPG, JPEG, PNG, GIF ve PDF</p>
          <p>Ayrıca manuel olarak <a href="#" class="pay-upload-area__link">havale bilgilerini girebilirsiniz</a></p>
          <button class="pay-upload-area__btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v8m0-8l-3 3m3-3l3 3M3 12h10" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Dosya yükle
          </button>
        </div>
      </div>
    </div>
  `;
}

/* ────────────────────────────────────────
   SECTION MAP
   ──────────────────────────────────────── */
const SECTIONS: Record<string, () => string> = {
  'payment-management': renderPaymentManagement,
  'transactions': renderTransactions,
  'tt-accounts': renderTTAccounts,
  'tt-tracking': renderTTTracking,
  'alibaba-card': renderAlibabaCard,
  'pay-later': renderPayLater,
  'upload-receipt': renderUpload,
};

function getActiveSection(): string {
  const hash = window.location.hash.replace('#', '');
  return SECTIONS[hash] ? hash : 'payment-management';
}

/* ────────────────────────────────────────
   NAV RENDERER
   ──────────────────────────────────────── */
function renderNav(activeId: string): string {
  return NAV_GROUPS.map(group => {
    const items = group.items.map(item => {
      const active = item.id === activeId ? 'pay-nav__link--active' : '';
      return `<a href="#${item.id}" class="pay-nav__link ${active}" data-nav="${item.id}">${item.label}</a>`;
    }).join('');
    return `
      <div class="pay-nav__group">
        <span class="pay-nav__group-title">${group.title}</span>
        ${items}
      </div>
    `;
  }).join('');
}

/* ────────────────────────────────────────
   MAIN LAYOUT
   ──────────────────────────────────────── */
export function PaymentLayout(): string {
  const activeId = getActiveSection();
  const renderFn = SECTIONS[activeId] ?? renderPaymentManagement;

  return `
    <div class="pay-layout">
      <aside class="pay-nav">
        <h2 class="pay-nav__title">Ödeme</h2>
        ${renderNav(activeId)}
      </aside>
      <div class="pay-content" id="pay-content">
        ${renderFn()}
      </div>
    </div>
  `;
}

/* ────────────────────────────────────────
   INIT
   ──────────────────────────────────────── */
export function initPaymentLayout(): void {
  const contentEl = document.getElementById('pay-content');
  if (!contentEl) return;

  function navigate(): void {
    const activeId = getActiveSection();
    const renderFn = SECTIONS[activeId] ?? renderPaymentManagement;
    contentEl!.innerHTML = renderFn();

    document.querySelectorAll<HTMLAnchorElement>('.pay-nav__link').forEach(link => {
      link.classList.toggle('pay-nav__link--active', link.dataset.nav === activeId);
    });

    initPayTabs();
    initPayModals();
    initPayPills();
    initPayTooltip();
  }

  window.addEventListener('hashchange', navigate);

  // Nav link clicks
  document.querySelectorAll<HTMLAnchorElement>('.pay-nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.dataset.nav ?? 'payment-management';
      window.location.hash = id;
    });
  });

  initPayTabs();
  initPayModals();
  initPayPills();
  initPayTooltip();
}

function initPayTabs(): void {
  document.querySelectorAll<HTMLElement>('.pay-tabs').forEach(tabGroup => {
    const tabs = tabGroup.querySelectorAll<HTMLButtonElement>('.pay-tabs__tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.tab;
        if (!targetId) return;
        tabs.forEach(t => t.classList.remove('pay-tabs__tab--active'));
        tab.classList.add('pay-tabs__tab--active');
        const parent = tabGroup.parentElement;
        if (!parent) return;
        parent.querySelectorAll<HTMLElement>('.pay-tab-content').forEach(panel => {
          panel.classList.toggle('pay-tab-content--active', panel.dataset.content === targetId);
        });
      });
    });
  });
}

function initPayPills(): void {
  document.querySelectorAll<HTMLElement>('.pay-pills').forEach(group => {
    const pills = group.querySelectorAll<HTMLButtonElement>('.pay-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('pay-pill--active'));
        pill.classList.add('pay-pill--active');
      });
    });
  });
}

function openPayModal(id: string): void {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('pay-modal--open');
  document.body.style.overflow = 'hidden';
}

function closePayModal(modal: HTMLElement): void {
  modal.classList.remove('pay-modal--open');
  document.body.style.overflow = '';
}

function initPayModals(): void {
  // Card modal
  document.querySelector<HTMLElement>('[data-action="open-card-modal"]')?.addEventListener('click', () => openPayModal('pay-card-modal'));

  // Verify modal
  document.querySelector<HTMLElement>('[data-action="open-verify-modal"]')?.addEventListener('click', () => openPayModal('pay-verify-modal'));

  // Upload view
  document.querySelector<HTMLElement>('[data-action="show-upload"]')?.addEventListener('click', () => {
    window.location.hash = 'upload-receipt';
  });

  // Close handlers for all modals
  document.querySelectorAll<HTMLElement>('.pay-modal').forEach(modal => {
    modal.querySelector('.pay-modal__overlay')?.addEventListener('click', () => closePayModal(modal));
    modal.querySelector('.pay-modal__close')?.addEventListener('click', () => closePayModal(modal));
    modal.querySelector('.pay-modal__btn--cancel')?.addEventListener('click', () => closePayModal(modal));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const open = document.querySelector<HTMLElement>('.pay-modal--open');
      if (open) closePayModal(open);
    }
  });
}

function initPayTooltip(): void {
  const toggleBtn = document.querySelector<HTMLElement>('[data-action="toggle-tooltip"]');
  const tooltip = document.getElementById('pay-tt-tooltip');
  if (!toggleBtn || !tooltip) return;

  toggleBtn.addEventListener('click', () => {
    tooltip.classList.toggle('pay-tooltip--visible');
  });

  tooltip.querySelector('.pay-tooltip__close')?.addEventListener('click', () => {
    tooltip.classList.remove('pay-tooltip--visible');
  });
}
