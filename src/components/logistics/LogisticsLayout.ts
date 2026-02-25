/**
 * LogisticsLayout Component
 * Two hash-based views: #orders (default) and #reviews.
 * Orders: info banner, status tabs, search/filters, data table, empty state
 * Reviews: info banner, tabs, search, data table, empty state
 */

/* ────────────────────────────────────────
   SHARED: Empty icon + Info banner
   ──────────────────────────────────────── */
const EMPTY_ENVELOPE_ICON = `
<svg width="64" height="64" viewBox="0 0 64 64" fill="none">
  <rect x="12" y="18" width="40" height="28" rx="4" fill="#F3F4F6" stroke="#D1D5DB" stroke-width="1.5"/>
  <path d="M12 22l20 14 20-14" stroke="#D1D5DB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="18" y="8" width="28" height="14" rx="3" fill="#E5E7EB" stroke="#D1D5DB" stroke-width="1"/>
</svg>`;

const INFO_BANNER_ORDERS = `
<div class="log-banner">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#3B82F6" stroke-width="1.3"/><path d="M8 5v3m0 2.5h.01" stroke="#3B82F6" stroke-width="1.3" stroke-linecap="round"/></svg>
  <span>Uyarı: lojistik pazar yeri siparişleri artık ticaret güvence emirlerine yükseltildi. Ticaret güvence siparişlerinizi alibaba> sipariş menüsünde yönetebilirsiniz.</span>
</div>`;

const INFO_BANNER_REVIEWS = `
<div class="log-banner">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#3B82F6" stroke-width="1.3"/><path d="M8 5v3m0 2.5h.01" stroke="#3B82F6" stroke-width="1.3" stroke-linecap="round"/></svg>
  <span>Uyarı: lojistik pazar yeri siparişleri, yaklaşık 20 şubat tarihinden itibaren ticaret güvence siparişlerine yükseltilecektir.</span>
</div>`;

/* ────────────────────────────────────────
   SEARCH ICON
   ──────────────────────────────────────── */
const SEARCH_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#666" stroke-width="1.3"/><path d="M11 11l3 3" stroke="#666" stroke-width="1.3" stroke-linecap="round"/></svg>`;

/* ────────────────────────────────────────
   SECTION: Lojistik Siparişlerim
   ──────────────────────────────────────── */
const ORDER_TABS = [
  'All (0)',
  "Waiting for forwarder's quote (0)",
  'Ödenmemiş (0)',
  'To be shipped (0)',
  'To be received (0)',
  'In dispute (0)',
  'Tamamlandı/Kapatıldı (0)',
];

function renderOrders(): string {
  const tabs = ORDER_TABS.map((t, i) =>
    `<button class="log-tabs__tab${i === 0 ? ' log-tabs__tab--active' : ''}" data-tab="log-order-${i}">${t}</button>`
  ).join('');

  return `
    ${INFO_BANNER_ORDERS}

    <div class="log-page__header">
      <h1 class="log-page__title">Lojistik siparişlerini yönet</h1>
    </div>

    <div class="log-tabs" data-tabgroup="log-orders">
      ${tabs}
    </div>

    <!-- Search + Filters -->
    <div class="log-search">
      <div class="log-search__row">
        <div class="log-search__input-wrap">
          <input type="text" class="log-search__input" placeholder="Sipariş numarasına göre ara" />
          <button class="log-search__btn">${SEARCH_ICON} Arama</button>
        </div>
        <a href="#" class="log-search__reset">Hepsini sıfırla</a>
      </div>
      <div class="log-filters">
        <div class="log-filters__item">
          <input type="text" class="log-filters__date" placeholder="Sipariş verildi" readonly />
          <svg class="log-filters__date-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="2" stroke="#999" stroke-width="1.2"/><path d="M2 6h12M5 1v3M11 1v3" stroke="#999" stroke-width="1.2" stroke-linecap="round"/></svg>
        </div>
        <div class="log-filters__item">
          <label class="log-filters__label">Hizmet türü</label>
          <select class="log-filters__select">
            <option>Seçin</option>
            <option>Deniz yolu</option>
            <option>Hava yolu</option>
            <option>Kara yolu</option>
            <option>Ekspres</option>
          </select>
        </div>
        <div class="log-filters__item">
          <label class="log-filters__label">Gönderi durumu</label>
          <select class="log-filters__select">
            <option>Seçin</option>
            <option>Beklemede</option>
            <option>Transitte</option>
            <option>Teslim edildi</option>
            <option>İptal edildi</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Data Table -->
    <div class="log-table-wrap">
      <table class="log-table">
        <thead>
          <tr>
            <th>Servis tipi ve taşıyıcı</th>
            <th>Menşe ve varış yeri</th>
            <th>Ürün bilgileri</th>
            <th>Gönderi durumu</th>
            <th>Miktar</th>
            <th>Eylem</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="6" class="log-table__empty">
              ${EMPTY_ENVELOPE_ICON}
              <p>Sonuç bulunamadı</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

/* ────────────────────────────────────────
   SECTION: Lojistik Siparişi Değerlendirmelerim
   ──────────────────────────────────────── */
function renderReviews(): string {
  return `
    ${INFO_BANNER_REVIEWS}

    <div class="log-page__header log-page__header--reviews">
      <h1 class="log-page__title">Değerlendirmelerim</h1>
      <p class="log-page__subtitle">Siparişiniz tamamlandıktan sonraki 90 gün içinde deneyiminizi puanlayın ve siparişinizle ilgili bir yorum bırakın</p>
    </div>

    <div class="log-tabs" data-tabgroup="log-reviews">
      <button class="log-tabs__tab log-tabs__tab--active" data-tab="log-review-pending">Değerlendirilecek (0)</button>
      <button class="log-tabs__tab" data-tab="log-review-done">Değerlendirildi (0)</button>
    </div>

    <!-- Search -->
    <div class="log-review-search">
      <div class="log-review-search__wrap">
        <input type="text" class="log-review-search__input" placeholder="" />
        <button class="log-review-search__btn">${SEARCH_ICON} Arama</button>
      </div>
    </div>

    <!-- Data Table -->
    <div class="log-table-wrap">
      <table class="log-table">
        <thead>
          <tr>
            <th>Nakliye komisyoncusu</th>
            <th>Hizmet türü</th>
            <th>Menşe ve varış yeri</th>
            <th>Ürün bilgileri</th>
            <th>Durum</th>
            <th>Eylem</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="6" class="log-table__empty">
              ${EMPTY_ENVELOPE_ICON}
              <p>Sonuç bulunamadı</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

/* ────────────────────────────────────────
   SECTION MAP
   ──────────────────────────────────────── */
const SECTIONS: Record<string, () => string> = {
  'orders': renderOrders,
  'reviews': renderReviews,
};

function getActiveSection(): string {
  const hash = window.location.hash.replace('#', '');
  return SECTIONS[hash] ? hash : 'orders';
}

/* ────────────────────────────────────────
   MAIN LAYOUT
   ──────────────────────────────────────── */
export function LogisticsLayout(): string {
  const activeId = getActiveSection();
  const renderFn = SECTIONS[activeId] ?? renderOrders;

  return `
    <div class="log-page" id="log-content">
      ${renderFn()}
    </div>
  `;
}

/* ────────────────────────────────────────
   INIT
   ──────────────────────────────────────── */
export function initLogisticsLayout(): void {
  const contentEl = document.getElementById('log-content');
  if (!contentEl) return;

  function navigate(): void {
    const activeId = getActiveSection();
    const renderFn = SECTIONS[activeId] ?? renderOrders;
    contentEl!.innerHTML = renderFn();
    initLogTabs();
  }

  window.addEventListener('hashchange', navigate);
  initLogTabs();
}

function initLogTabs(): void {
  document.querySelectorAll<HTMLElement>('.log-tabs').forEach(tabGroup => {
    const tabs = tabGroup.querySelectorAll<HTMLButtonElement>('.log-tabs__tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('log-tabs__tab--active'));
        tab.classList.add('log-tabs__tab--active');
      });
    });
  });
}
