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
<div class="flex items-start gap-2.5 px-6 py-3.5 bg-[#EFF6FF] text-[13px] text-gray-700 leading-normal rounded-t-lg">
  <svg class="shrink-0 mt-px" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#3B82F6" stroke-width="1.3"/><path d="M8 5v3m0 2.5h.01" stroke="#3B82F6" stroke-width="1.3" stroke-linecap="round"/></svg>
  <span>Uyarı: lojistik pazar yeri siparişleri artık ticaret güvence emirlerine yükseltildi. Ticaret güvence siparişlerinizi alibaba> sipariş menüsünde yönetebilirsiniz.</span>
</div>`;

const INFO_BANNER_REVIEWS = `
<div class="flex items-start gap-2.5 px-6 py-3.5 bg-[#EFF6FF] text-[13px] text-gray-700 leading-normal rounded-t-lg">
  <svg class="shrink-0 mt-px" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#3B82F6" stroke-width="1.3"/><path d="M8 5v3m0 2.5h.01" stroke="#3B82F6" stroke-width="1.3" stroke-linecap="round"/></svg>
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
    `<button class="log-tabs__tab px-4 py-3 text-[13px] font-medium text-gray-500 bg-transparent border-none border-b-2 border-b-transparent cursor-pointer transition-colors whitespace-nowrap -mb-px hover:text-gray-900${i === 0 ? ' log-tabs__tab--active !text-gray-900 !font-semibold !border-b-[#222]' : ''}" data-tab="log-order-${i}">${t}</button>`
  ).join('');

  return `
    ${INFO_BANNER_ORDERS}

    <div class="px-7 max-sm:px-3 pt-6">
      <h1 class="text-[22px] font-bold text-gray-900">Lojistik siparişlerini yönet</h1>
    </div>

    <div class="flex px-7 max-md:px-4 border-b border-border-default mt-4 overflow-x-auto" data-tabgroup="log-orders">
      ${tabs}
    </div>

    <!-- Search + Filters -->
    <div class="px-7 max-sm:px-3 py-5">
      <div class="flex items-center gap-4 mb-4">
        <div class="flex-1 flex border border-border-default rounded-md overflow-hidden">
          <input type="text" class="flex-1 px-3.5 py-2.5 text-[14px] border-none outline-none text-gray-900 placeholder:text-gray-400" placeholder="Sipariş numarasına göre ara" />
          <button class="flex items-center gap-1.5 px-5 py-2.5 text-[14px] text-gray-700 bg-white border-none border-l border-l-border-default cursor-pointer whitespace-nowrap hover:bg-gray-100 transition-colors">${SEARCH_ICON} Arama</button>
        </div>
        <a href="#" class="text-[13px] text-primary-500 no-underline whitespace-nowrap hover:underline">Hepsini sıfırla</a>
      </div>
      <div class="grid grid-cols-3 max-md:grid-cols-1 gap-4">
        <div class="relative">
          <input type="text" class="w-full py-2.5 pl-3.5 pr-9 text-[14px] border border-border-default rounded-md outline-none text-gray-900 bg-white cursor-pointer box-border" placeholder="Sipariş verildi" readonly />
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="2" stroke="#999" stroke-width="1.2"/><path d="M2 6h12M5 1v3M11 1v3" stroke="#999" stroke-width="1.2" stroke-linecap="round"/></svg>
        </div>
        <div class="relative">
          <label class="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-gray-500 pointer-events-none">Hizmet türü</label>
          <select class="w-full py-2.5 pl-[110px] pr-3 text-[14px] border border-border-default rounded-md outline-none text-gray-900 bg-white appearance-none cursor-pointer box-border">
            <option>Seçin</option>
            <option>Deniz yolu</option>
            <option>Hava yolu</option>
            <option>Kara yolu</option>
            <option>Ekspres</option>
          </select>
        </div>
        <div class="relative">
          <label class="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-gray-500 pointer-events-none">Gönderi durumu</label>
          <select class="w-full py-2.5 pl-[110px] pr-3 text-[14px] border border-border-default rounded-md outline-none text-gray-900 bg-white appearance-none cursor-pointer box-border">
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
    <div class="px-7 max-sm:px-3 pb-7">
      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th class="text-left text-[13px] font-semibold text-gray-500 px-3 py-3 border-b border-border-default bg-surface-muted">Servis tipi ve taşıyıcı</th>
            <th class="text-left text-[13px] font-semibold text-gray-500 px-3 py-3 border-b border-border-default bg-surface-muted">Menşe ve varış yeri</th>
            <th class="text-left text-[13px] font-semibold text-gray-500 px-3 py-3 border-b border-border-default bg-surface-muted">Ürün bilgileri</th>
            <th class="text-left text-[13px] font-semibold text-gray-500 px-3 py-3 border-b border-border-default bg-surface-muted">Gönderi durumu</th>
            <th class="text-left text-[13px] font-semibold text-gray-500 px-3 py-3 border-b border-border-default bg-surface-muted">Miktar</th>
            <th class="text-left text-[13px] font-semibold text-gray-500 px-3 py-3 border-b border-border-default bg-surface-muted">Eylem</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="6" class="text-center py-20 px-4 text-gray-400 text-[14px]">
              <div class="flex justify-center mb-3">${EMPTY_ENVELOPE_ICON}</div>
              <p class="m-0">Sonuç bulunamadı</p>
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

    <div class="px-7 max-sm:px-3 pt-6 flex items-baseline gap-3 flex-wrap max-md:flex-col max-md:gap-1">
      <h1 class="text-[22px] font-bold text-gray-900">Değerlendirmelerim</h1>
      <p class="text-[14px] text-gray-400 m-0">Siparişiniz tamamlandıktan sonraki 90 gün içinde deneyiminizi puanlayın ve siparişinizle ilgili bir yorum bırakın</p>
    </div>

    <div class="flex px-7 max-md:px-4 border-b border-border-default mt-4 overflow-x-auto" data-tabgroup="log-reviews">
      <button class="log-tabs__tab log-tabs__tab--active px-4 py-3 text-[13px] font-semibold text-gray-900 bg-transparent border-none border-b-2 border-b-[#222] cursor-pointer whitespace-nowrap -mb-px" data-tab="log-review-pending">Değerlendirilecek (0)</button>
      <button class="log-tabs__tab px-4 py-3 text-[13px] font-medium text-gray-500 bg-transparent border-none border-b-2 border-b-transparent cursor-pointer whitespace-nowrap -mb-px hover:text-gray-900" data-tab="log-review-done">Değerlendirildi (0)</button>
    </div>

    <!-- Search -->
    <div class="px-7 max-sm:px-3 py-5">
      <div class="flex border border-border-default rounded-md overflow-hidden max-w-[500px]">
        <input type="text" class="flex-1 px-3.5 py-2.5 text-[14px] border-none outline-none text-gray-900" placeholder="" />
        <button class="flex items-center gap-1.5 px-5 py-2.5 text-[14px] text-gray-700 bg-white border-none border-l border-l-border-default cursor-pointer whitespace-nowrap hover:bg-gray-100 transition-colors">${SEARCH_ICON} Arama</button>
      </div>
    </div>

    <!-- Data Table -->
    <div class="px-7 max-sm:px-3 pb-7">
      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th class="text-left text-[13px] font-semibold text-gray-500 px-3 py-3 border-b border-border-default bg-surface-muted">Nakliye komisyoncusu</th>
            <th class="text-left text-[13px] font-semibold text-gray-500 px-3 py-3 border-b border-border-default bg-surface-muted">Hizmet türü</th>
            <th class="text-left text-[13px] font-semibold text-gray-500 px-3 py-3 border-b border-border-default bg-surface-muted">Menşe ve varış yeri</th>
            <th class="text-left text-[13px] font-semibold text-gray-500 px-3 py-3 border-b border-border-default bg-surface-muted">Ürün bilgileri</th>
            <th class="text-left text-[13px] font-semibold text-gray-500 px-3 py-3 border-b border-border-default bg-surface-muted">Durum</th>
            <th class="text-left text-[13px] font-semibold text-gray-500 px-3 py-3 border-b border-border-default bg-surface-muted">Eylem</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="6" class="text-center py-20 px-4 text-gray-400 text-[14px]">
              <div class="flex justify-center mb-3">${EMPTY_ENVELOPE_ICON}</div>
              <p class="m-0">Sonuç bulunamadı</p>
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
    <div class="bg-white rounded-lg min-h-[600px]" id="log-content">
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
  document.querySelectorAll<HTMLElement>('.log-tabs__tab').forEach(tab => {
    const parent = tab.parentElement;
    if (!parent) return;
    tab.addEventListener('click', () => {
      parent.querySelectorAll<HTMLButtonElement>('.log-tabs__tab').forEach(t => {
        t.classList.remove('log-tabs__tab--active', '!text-gray-900', '!font-semibold', '!border-b-[#222]');
        t.classList.add('text-gray-500');
      });
      tab.classList.add('log-tabs__tab--active', '!text-gray-900', '!font-semibold', '!border-b-[#222]');
      tab.classList.remove('text-gray-500');
    });
  });
}
