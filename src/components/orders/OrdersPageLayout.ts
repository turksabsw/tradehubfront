/**
 * OrdersPageLayout Component
 * "Siparişlerim" page — 2-panel: left nav + right dynamic content.
 * Supports hash-based sub-pages: #all-orders, #refunds, #reviews, #coupons, #tax-info
 */

interface OrdersNavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: OrdersNavItem[] = [
  { id: 'all-orders', label: 'Tüm siparişlerim' },
  { id: 'refunds', label: 'Para iadesi ve satış sonrası hizmetler' },
  { id: 'reviews', label: 'Değerlendirmelerim' },
  { id: 'coupons', label: 'Kupon ve kredilerim' },
  { id: 'tax-info', label: 'Vergi bilgilerim' },
];

/* ────────────────────────────────────────
   SHARED EMPTY ICON (receipt/document)
   ──────────────────────────────────────── */
const EMPTY_RECEIPT_ICON = `
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
    <rect x="12" y="5" width="36" height="46" rx="3" fill="#E5E7EB" stroke="#D1D5DB" stroke-width="1"/>
    <rect x="18" y="14" width="24" height="3" rx="1.5" fill="#D1D5DB"/>
    <rect x="18" y="22" width="18" height="3" rx="1.5" fill="#D1D5DB"/>
    <rect x="18" y="30" width="20" height="3" rx="1.5" fill="#D1D5DB"/>
    <path d="M12 51l4-3 4 3 4-3 4 3 4-3 4 3 4-3 4 3V5H12v46z" fill="#E5E7EB"/>
  </svg>`;

/* ────────────────────────────────────────
   SECTION RENDERERS
   ──────────────────────────────────────── */

function renderAllOrders(): string {
  return `
    <div class="flex items-center justify-between px-7 pt-6 pb-5 border-b border-(--color-border-light,#f0f0f0)">
      <h1 class="text-[22px] font-bold text-(--color-text-heading,#111827)">Siparişlerim</h1>
      <button class="orders-page__upload-btn px-5 py-2 text-sm text-(--color-text-body,#333) bg-(--color-surface,#fff) border border-(--color-border-medium,#d1d5db) rounded-[20px] cursor-pointer whitespace-nowrap transition-colors hover:border-(--color-text-placeholder) hover:bg-(--color-surface-muted,#fafafa)">Havale dekontu yükle</button>
    </div>
    <div class="flex-1 flex flex-col items-center justify-center gap-3 px-10 py-[60px] text-center">
      <div class="w-[120px] h-[100px] mb-2">
        <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
          <rect x="25" y="10" width="60" height="75" rx="6" fill="#F3F4F6" stroke="#D1D5DB" stroke-width="1.5"/>
          <rect x="40" y="4" width="30" height="12" rx="4" fill="#E5E7EB" stroke="#D1D5DB" stroke-width="1"/>
          <rect x="35" y="30" width="40" height="5" rx="2" fill="#E5E7EB"/>
          <rect x="35" y="42" width="32" height="5" rx="2" fill="#E5E7EB"/>
          <rect x="35" y="55" width="10" height="10" rx="2" fill="#F97316" opacity="0.7"/>
          <rect x="50" y="55" width="25" height="5" rx="2" fill="#E5E7EB"/>
          <rect x="50" y="63" width="18" height="3" rx="1.5" fill="#E5E7EB"/>
          <circle cx="85" cy="15" r="12" fill="#F3F4F6" stroke="#D1D5DB" stroke-width="1"/>
          <path d="M80 15l3 3 6-6" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="55" cy="47" r="40" fill="none" stroke="#F0F0F0" stroke-width="1" stroke-dasharray="4 4" opacity="0.6"/>
        </svg>
      </div>
      <h3 class="text-base font-bold text-(--color-text-heading,#111827)">Henüz siparişiniz bulunmamaktadır</h3>
      <p class="text-sm text-(--color-text-muted,#666) max-w-[400px]">Tedarik etmeye başlamak için ana sayfaya gidin veya aşağıya tıklayın</p>
      <a href="/" class="inline-block px-8 py-2.5 text-sm text-(--color-text-body,#333) border border-(--color-text-body) rounded-[24px] no-underline mt-2 transition-colors hover:bg-(--color-text-heading) hover:text-(--color-surface)">Tedarik etmeye başla</a>
    </div>
  `;
}

function renderRefunds(): string {
  return `
    <div class="flex items-center justify-between px-7 pt-6 pb-5 border-b border-(--color-border-light,#f0f0f0)">
      <h1 class="text-[22px] font-bold text-(--color-text-heading,#111827)">Satış sonrası işlemler ve para iadeleri</h1>
    </div>
    <div class="os-tabs flex border-b border-(--color-border-default,#e5e5e5) px-7" data-tabgroup="refunds">
      <button class="os-tabs__tab os-tabs__tab--active py-3 px-4 text-sm bg-transparent border-none border-b-2 border-b-transparent cursor-pointer whitespace-nowrap transition-colors" data-tab="refund-returns">Para İadeleri</button>
      <button class="os-tabs__tab py-3 px-4 text-sm bg-transparent border-none border-b-2 border-b-transparent cursor-pointer whitespace-nowrap transition-colors text-(--color-text-muted,#666)" data-tab="refund-tax">Vergi iadeleri</button>
      <button class="os-tabs__tab py-3 px-4 text-sm bg-transparent border-none border-b-2 border-b-transparent cursor-pointer whitespace-nowrap transition-colors text-(--color-text-muted,#666)" data-tab="refund-after">Satış sonrası hizmetler</button>
    </div>

    <!-- Tab: Para İadeleri (empty) -->
    <div class="os-tab-content os-tab-content--active" data-content="refund-returns">
      <div class="flex flex-col items-center justify-center gap-3 px-10 py-20 text-center">
        ${EMPTY_RECEIPT_ICON}
        <p class="text-sm text-(--color-text-muted,#666)">Şu anda satış sonrası servis talebi yok</p>
      </div>
    </div>

    <!-- Tab: Vergi iadeleri (table) -->
    <div class="os-tab-content" data-content="refund-tax">
      <div class="px-7">
        <table class="os-table w-full border-collapse border border-(--color-border-default,#e5e5e5) rounded-md overflow-hidden">
          <thead>
            <tr>
              <th class="px-4 py-3 text-[13px] font-semibold text-(--color-text-body,#333) bg-(--color-surface-muted,#fafafa) border-b border-(--color-border-default,#e5e5e5) text-left whitespace-nowrap">Sipariş numarası</th>
              <th class="px-4 py-3 text-[13px] font-semibold text-(--color-text-body,#333) bg-(--color-surface-muted,#fafafa) border-b border-(--color-border-default,#e5e5e5) text-left whitespace-nowrap">Vaka numarası</th>
              <th class="px-4 py-3 text-[13px] font-semibold text-(--color-text-body,#333) bg-(--color-surface-muted,#fafafa) border-b border-(--color-border-default,#e5e5e5) text-left whitespace-nowrap">Başvuru Tarihi</th>
              <th class="px-4 py-3 text-[13px] font-semibold text-(--color-text-body,#333) bg-(--color-surface-muted,#fafafa) border-b border-(--color-border-default,#e5e5e5) text-left whitespace-nowrap">Para iadesi tutarı</th>
              <th class="px-4 py-3 text-[13px] font-semibold text-(--color-text-body,#333) bg-(--color-surface-muted,#fafafa) border-b border-(--color-border-default,#e5e5e5) text-left whitespace-nowrap">Durum</th>
              <th class="px-4 py-3 text-[13px] font-semibold text-(--color-text-body,#333) bg-(--color-surface-muted,#fafafa) border-b border-(--color-border-default,#e5e5e5) text-left whitespace-nowrap">Banka iade durumu</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="6" class="text-center !py-[60px] px-4">
                ${EMPTY_RECEIPT_ICON}
                <p class="text-sm text-(--color-text-muted,#666)">Şu anda satış sonrası servis talebi yok</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Tab: Satış sonrası hizmetler (empty) -->
    <div class="os-tab-content" data-content="refund-after">
      <div class="flex flex-col items-center justify-center gap-3 px-10 py-20 text-center">
        ${EMPTY_RECEIPT_ICON}
        <p class="text-sm text-(--color-text-muted,#666)">Şu anda satış sonrası servis talebi yok</p>
      </div>
    </div>
  `;
}

function renderReviews(): string {
  return `
    <div class="flex items-center justify-between px-7 pt-6 pb-5 border-b border-(--color-border-light,#f0f0f0)">
      <h1 class="text-[22px] font-bold text-(--color-text-heading,#111827)">Değerlendirmelerim</h1>
      <div class="flex items-center gap-1">
        <span class="text-[13px] text-(--color-text-muted,#666)">Puanlama Kuralları</span>
        <svg class="w-4 h-4" fill="none" stroke="#999" stroke-width="1.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/><path stroke-linecap="round" d="M12 16v-4m0-4h.01"/>
        </svg>
      </div>
    </div>
    <div class="os-tabs flex border-b border-(--color-border-default,#e5e5e5) px-7" data-tabgroup="reviews">
      <button class="os-tabs__tab os-tabs__tab--active os-tabs__tab--orange py-3 px-4 text-sm bg-transparent border-none border-b-2 border-b-transparent cursor-pointer whitespace-nowrap transition-colors" data-tab="review-pending">Bekleyen değerlendirmeler (0)</button>
      <button class="os-tabs__tab py-3 px-4 text-sm bg-transparent border-none border-b-2 border-b-transparent cursor-pointer whitespace-nowrap transition-colors text-(--color-text-muted,#666)" data-tab="review-done">Değerlendirilenler (0)</button>
    </div>

    <div class="flex justify-end px-7 py-3">
      <div class="flex border border-(--color-border-medium,#d1d5db) rounded overflow-hidden">
        <input type="text" placeholder="Sipariş numarası, E-posta, Hesap" class="os-reviews-toolbar__input w-[240px] h-8 px-2.5 text-[13px] border-none outline-none text-(--color-text-body,#333)" />
        <button class="flex items-center justify-center w-8 h-8 border-none border-l border-l-(--color-border-medium,#d1d5db) bg-(--color-surface-muted,#fafafa) text-(--color-text-muted,#666) cursor-pointer hover:bg-(--color-border-light) hover:text-(--color-text-heading,#111827)" aria-label="Ara">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="m21 21-4.35-4.35"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="os-tab-content os-tab-content--active" data-content="review-pending">
      <div class="flex flex-col items-center justify-center gap-3 px-10 py-20 text-center">
        <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
          <rect x="10" y="10" width="50" height="55" rx="4" fill="#FFECD2" stroke="#F7A84B" stroke-width="1"/>
          <rect x="15" y="18" width="40" height="4" rx="2" fill="#F7A84B" opacity="0.3"/>
          <rect x="15" y="28" width="30" height="4" rx="2" fill="#F7A84B" opacity="0.3"/>
          <circle cx="72" cy="38" r="8" fill="#FBBF24"/>
          <rect x="66" y="48" width="12" height="20" rx="3" fill="#1E3A5F"/>
        </svg>
        <p class="text-sm text-(--color-text-muted,#666)">Bekleyen yorum yok</p>
      </div>
    </div>

    <div class="os-tab-content" data-content="review-done">
      <div class="flex flex-col items-center justify-center gap-3 px-10 py-20 text-center">
        ${EMPTY_RECEIPT_ICON}
        <p class="text-sm text-(--color-text-muted,#666)">Değerlendirme bulunamadı</p>
      </div>
    </div>
  `;
}

function renderCoupons(): string {
  return `
    <div class="flex items-center justify-between px-7 pt-6 pb-5 border-b border-(--color-border-light,#f0f0f0)">
      <h1 class="text-[22px] font-bold text-(--color-text-heading,#111827)">Kupon ve krediler</h1>
    </div>
    <div class="os-tabs flex border-b border-(--color-border-default,#e5e5e5) px-7" data-tabgroup="coupons">
      <button class="os-tabs__tab os-tabs__tab--active py-3 px-4 text-sm bg-transparent border-none border-b-2 border-b-transparent cursor-pointer whitespace-nowrap transition-colors" data-tab="coupons-list">Kuponlar</button>
      <button class="os-tabs__tab py-3 px-4 text-sm bg-transparent border-none border-b-2 border-b-transparent cursor-pointer whitespace-nowrap transition-colors text-(--color-text-muted,#666)" data-tab="coupons-credit">Kredi</button>
    </div>

    <!-- Tab: Kuponlar -->
    <div class="os-tab-content os-tab-content--active" data-content="coupons-list">
      <div class="os-pill-filters flex gap-2 px-7 py-4">
        <button class="os-pill os-pill--active px-4 py-1.5 text-[13px] bg-(--color-surface,#fff) border border-(--color-border-medium,#d1d5db) rounded-[20px] cursor-pointer transition-all">Mevcut</button>
        <button class="os-pill px-4 py-1.5 text-[13px] text-(--color-text-muted,#666) bg-(--color-surface,#fff) border border-(--color-border-medium,#d1d5db) rounded-[20px] cursor-pointer transition-all">Kullanıldı</button>
        <button class="os-pill px-4 py-1.5 text-[13px] text-(--color-text-muted,#666) bg-(--color-surface,#fff) border border-(--color-border-medium,#d1d5db) rounded-[20px] cursor-pointer transition-all">Süresi doldu</button>
      </div>
      <div class="flex flex-col items-center justify-center gap-3 px-10 py-[60px] text-center">
        <p class="text-sm text-(--color-text-muted,#666)">Kupon Yok</p>
      </div>
    </div>

    <!-- Tab: Kredi -->
    <div class="os-tab-content" data-content="coupons-credit">
      <div class="mx-7 my-5 p-5 border border-(--color-border-default,#e5e5e5) rounded-lg">
        <p class="text-sm text-(--color-text-body,#333) mb-2">Toplam kredi bakiyesi</p>
        <p class="text-[28px] font-bold text-(--color-text-heading,#111827) mb-2">0.00</p>
        <p class="text-[13px] text-(--color-text-muted,#666)">1 kredi 1 USD'ye eşittir <a href="#terms" class="text-[#2563EB] underline">Hükümler ve koşullar</a></p>
      </div>

      <h3 class="text-base font-bold text-(--color-text-heading,#111827) px-7 pt-5 pb-3">Geçmiş</h3>
      <div class="px-7">
        <table class="os-table w-full border-collapse border border-(--color-border-default,#e5e5e5) rounded-md overflow-hidden">
          <thead>
            <tr>
              <th class="px-4 py-3 text-[13px] font-semibold text-(--color-text-body,#333) bg-(--color-surface-muted,#fafafa) border-b border-(--color-border-default,#e5e5e5) text-left whitespace-nowrap">İşlem</th>
              <th class="px-4 py-3 text-[13px] font-semibold text-(--color-text-body,#333) bg-(--color-surface-muted,#fafafa) border-b border-(--color-border-default,#e5e5e5) text-left whitespace-nowrap">Ayrıntılar</th>
              <th class="px-4 py-3 text-[13px] font-semibold text-(--color-text-body,#333) bg-(--color-surface-muted,#fafafa) border-b border-(--color-border-default,#e5e5e5) text-left whitespace-nowrap">Tarih (UTC-8)</th>
              <th class="px-4 py-3 text-[13px] font-semibold text-(--color-text-body,#333) bg-(--color-surface-muted,#fafafa) border-b border-(--color-border-default,#e5e5e5) text-left whitespace-nowrap">Tutar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4" class="text-center py-10 px-4 text-[13px] text-(--color-text-placeholder,#999)">Henüz bir kayıt yok.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex items-center justify-end gap-2 px-7 py-4">
        <button class="flex items-center justify-center w-8 h-8 border border-(--color-border-medium,#d1d5db) rounded-full bg-(--color-surface,#fff) text-(--color-text-muted,#666) cursor-pointer disabled:opacity-40 disabled:cursor-default" disabled>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <span class="flex items-center justify-center w-8 h-8 text-[13px] text-(--color-text-heading,#111827) border border-[#222] rounded-full font-semibold">1</span>
        <button class="flex items-center justify-center w-8 h-8 border border-(--color-border-medium,#d1d5db) rounded-full bg-(--color-surface,#fff) text-(--color-text-muted,#666) cursor-pointer disabled:opacity-40 disabled:cursor-default" disabled>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  `;
}

function renderTaxInfo(): string {
  return `
    <div class="flex items-center justify-between px-7 pt-6 pb-5 border-b border-(--color-border-light,#f0f0f0)">
      <h1 class="text-[22px] font-bold text-(--color-text-heading,#111827)">Vergi bilgileri</h1>
    </div>
    <div class="os-tabs flex border-b border-(--color-border-default,#e5e5e5) px-7" data-tabgroup="tax">
      <button class="os-tabs__tab os-tabs__tab--active py-3 px-4 text-sm bg-transparent border-none border-b-2 border-b-transparent cursor-pointer whitespace-nowrap transition-colors" data-tab="tax-info-tab">Vergi Bilgileri</button>
      <button class="os-tabs__tab py-3 px-4 text-sm bg-transparent border-none border-b-2 border-b-transparent cursor-pointer whitespace-nowrap transition-colors text-(--color-text-muted,#666)" data-tab="tax-customs">Gümrük muayenesi bilgileri</button>
    </div>

    <!-- Tab: Vergi Bilgileri -->
    <div class="os-tab-content os-tab-content--active" data-content="tax-info-tab">
      <div class="flex items-center justify-between gap-6 px-7 py-5 border-b border-(--color-border-light,#f0f0f0) max-md:flex-col max-md:items-start">
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-semibold text-(--color-text-heading,#111827) mb-1.5">KDV muafiyeti için</h4>
          <p class="text-[13px] text-(--color-text-muted,#666) leading-normal">Yeniden satış veya üretim için ürün satın alıyorsanız doğrulanması için vergi bilgilerinizi gönderin ve TradeHub.com'da vergiden muaf siparişler verin.</p>
        </div>
        <button class="os-info-card__btn px-5 py-2 text-[13px] text-(--color-text-body,#333) bg-(--color-surface,#fff) border border-(--color-border-medium,#d1d5db) rounded-[20px] cursor-pointer whitespace-nowrap shrink-0 transition-colors hover:border-[#999]" data-modal="pst-modal">Vergi muafiyeti ekleyin veya değiştirin</button>
      </div>

      <div class="flex items-center justify-between gap-6 px-7 py-5 border-b border-(--color-border-light,#f0f0f0) max-md:flex-col max-md:items-start">
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-semibold text-(--color-text-heading,#111827) mb-1.5">AB/Norveç/Birleşik Krallık/İsviçre veya Avustralya/Yeni Zelanda/Singapur/Şili vergi bilgisi gönderimi</h4>
          <p class="text-[13px] text-(--color-text-muted,#666) leading-normal">Ticari satın alımlarda, doğrulanması için vergi bilgilerinizi göndererek TradeHub.com'da vergiden muaf siparişler verebilirsiniz.</p>
        </div>
        <button class="os-info-card__btn px-5 py-2 text-[13px] text-(--color-text-body,#333) bg-(--color-surface,#fff) border border-(--color-border-medium,#d1d5db) rounded-[20px] cursor-pointer whitespace-nowrap shrink-0 transition-colors hover:border-[#999]" data-modal="vat-modal">Vergi bilgilerinizi ekleyin</button>
      </div>

      <h3 class="text-base font-bold text-(--color-text-heading,#111827) px-7 pt-5 pb-3">Sıkça Sorulan Sorular</h3>

      <div class="px-7 pb-7">
        <div class="grid grid-cols-3 gap-4 mb-5 max-md:grid-cols-1">
          <div class="p-5 border border-(--color-border-default,#e5e5e5) rounded-lg">
            <h5 class="text-sm font-semibold text-(--color-text-heading,#111827) mb-2">Vergi bilgilerim yoksa ne yapmalıyım?</h5>
            <p class="text-[13px] text-(--color-text-muted,#666) leading-normal">Yerel vergi kurumunuzun web sitesini kontrol ederek vergi muafiyeti için uygunluk kriterlerinizi inceleyin.</p>
          </div>
          <div class="p-5 border border-(--color-border-default,#e5e5e5) rounded-lg">
            <h5 class="text-sm font-semibold text-(--color-text-heading,#111827) mb-2">Vergi bilgilerim neden onaylanmadı?</h5>
            <p class="text-[13px] text-(--color-text-muted,#666) leading-normal">Vergi bilgilerinizin süresinin dolup dolmadığını veya yanlış bilgi gönderip göndermediğinizi kontrol edin.</p>
          </div>
          <div class="p-5 border border-(--color-border-default,#e5e5e5) rounded-lg">
            <h5 class="text-sm font-semibold text-(--color-text-heading,#111827) mb-2">Vergi iadesi için nasıl başvurabilirim?</h5>
            <p class="text-[13px] text-(--color-text-muted,#666) leading-normal">Vergi bilgileriniz gönderilmişse ve siparişiniz kargoya verilmeden önce doğrulanmışsa vergi iadesi alabilirsiniz.</p>
          </div>
        </div>

        <details class="os-faq__accordion border-b border-(--color-border-default,#e5e5e5) py-3.5">
          <summary class="text-sm text-(--color-text-heading,#111827) cursor-pointer list-none flex justify-between items-center">Satış vergisi nedir?</summary>
          <p class="pt-3 pb-1 text-[13px] text-(--color-text-muted,#666) leading-relaxed">Satış vergisi, mal ve hizmetlerin satışından alınan bir tüketim vergisidir.</p>
        </details>
        <details class="os-faq__accordion border-b border-(--color-border-default,#e5e5e5) py-3.5">
          <summary class="text-sm text-(--color-text-heading,#111827) cursor-pointer list-none flex justify-between items-center">Katma Değer Vergisi (KDV) nedir?</summary>
          <p class="pt-3 pb-1 text-[13px] text-(--color-text-muted,#666) leading-relaxed">KDV, üretim ve dağıtım sürecinin her aşamasında eklenen değer üzerinden alınan bir vergidir.</p>
        </details>
      </div>
    </div>

    <!-- Tab: Gümrük muayenesi bilgileri -->
    <div class="os-tab-content" data-content="tax-customs">
      <div class="flex items-center justify-between gap-6 px-7 py-5 border-b border-(--color-border-light,#f0f0f0) max-md:flex-col max-md:items-start">
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-semibold text-(--color-text-heading,#111827) mb-1.5">Gümrük işlemleri (tüm bölgeleri kapsar)</h4>
          <p class="text-[13px] text-(--color-text-muted,#666) leading-normal">Vergi bilgileriniz gümrük yetkilileri tarafından talep edilmektedir. Bu, bir İşveren Kimlik Numarası veya Sosyal Güvenlik Numarası olabilir.</p>
        </div>
        <button class="os-info-card__btn px-5 py-2 text-[13px] text-(--color-text-body,#333) bg-(--color-surface,#fff) border border-(--color-border-medium,#d1d5db) rounded-[20px] cursor-pointer whitespace-nowrap shrink-0 transition-colors hover:border-[#999]" data-modal="customs-modal">Gümrük muayenesi bilgileri ekleyin</button>
      </div>
    </div>

    <!-- ═══ MODAL: PST bilgileri ═══ -->
    <div class="os-modal hidden fixed inset-0 z-[9999] items-center justify-center" id="pst-modal">
      <div class="os-modal__overlay absolute inset-0 bg-black/45"></div>
      <div class="os-modal__dialog relative bg-(--color-surface,#fff) rounded-xl w-[480px] max-w-[calc(100vw-32px)] max-h-[calc(100vh-64px)] overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.2)]" style="animation: osModalIn 200ms ease-out">
        <div class="flex items-center justify-between px-6 pt-5 pb-4 border-b border-(--color-border-light,#f0f0f0)">
          <h3 class="text-base font-semibold text-(--color-text-heading,#111827)">PST bilgileri</h3>
          <button class="os-modal__close bg-transparent border-none cursor-pointer p-1 rounded flex items-center justify-center transition-colors hover:bg-(--color-surface-raised,#f5f5f5)" aria-label="Kapat">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="#666" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
        </div>
        <div class="px-6 py-5">
          <div class="mb-5">
            <label class="block text-[13px] font-semibold text-(--color-text-body,#333) mb-2">İl <span class="text-[#e53935]">*</span></label>
            <div class="flex flex-col gap-2.5">
              <label class="os-modal__radio flex items-center gap-2 text-sm text-(--color-text-body,#333) cursor-pointer">
                <input type="radio" name="pst-province" value="manitoba" checked class="hidden" />
                <span class="os-modal__radio-custom w-[18px] h-[18px] border-2 border-(--color-border-medium,#d1d5db) rounded-full shrink-0 relative transition-colors"></span>
                Manitoba
              </label>
              <label class="os-modal__radio flex items-center gap-2 text-sm text-(--color-text-body,#333) cursor-pointer">
                <input type="radio" name="pst-province" value="saskatchewan" class="hidden" />
                <span class="os-modal__radio-custom w-[18px] h-[18px] border-2 border-(--color-border-medium,#d1d5db) rounded-full shrink-0 relative transition-colors"></span>
                Saskatchewan
              </label>
            </div>
          </div>
          <div class="mb-5">
            <label class="block text-[13px] font-semibold text-(--color-text-body,#333) mb-2">RST numarası <span class="text-[#e53935]">*</span></label>
            <input type="text" class="os-modal__input w-full py-2.5 px-3 text-sm border border-(--color-border-medium,#d1d5db) rounded-md outline-none text-(--color-text-heading,#111827) transition-colors box-border focus:border-(--color-cta-primary,#cc9900) focus:shadow-[0_0_0_2px_rgba(249,115,22,0.1)]" placeholder="RST numaranızı girin" />
          </div>
        </div>
        <div class="px-6 pt-4 pb-5 flex justify-end gap-3 border-t border-(--color-border-light,#f0f0f0)">
          <button class="os-modal__btn os-modal__btn--primary px-6 py-2.5 text-sm font-medium rounded-[20px] cursor-pointer border-none transition-all bg-(--color-cta-primary,#cc9900) text-white hover:bg-[#EA580C]">Doğrula</button>
        </div>
      </div>
    </div>

    <!-- ═══ MODAL: KDV/GST Numarası Ekleyin ═══ -->
    <div class="os-modal hidden fixed inset-0 z-[9999] items-center justify-center" id="vat-modal">
      <div class="os-modal__overlay absolute inset-0 bg-black/45"></div>
      <div class="os-modal__dialog relative bg-(--color-surface,#fff) rounded-xl w-[480px] max-w-[calc(100vw-32px)] max-h-[calc(100vh-64px)] overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.2)]" style="animation: osModalIn 200ms ease-out">
        <div class="flex items-center justify-between px-6 pt-5 pb-4 border-b border-(--color-border-light,#f0f0f0)">
          <h3 class="text-base font-semibold text-(--color-text-heading,#111827)">KDV/GST Numarası Ekleyin</h3>
          <button class="os-modal__close bg-transparent border-none cursor-pointer p-1 rounded flex items-center justify-center transition-colors hover:bg-(--color-surface-raised,#f5f5f5)" aria-label="Kapat">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="#666" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
        </div>
        <div class="px-6 py-5">
          <div class="mb-5">
            <label class="block text-[13px] font-semibold text-(--color-text-body,#333) mb-2">Ülke/bölge <span class="text-[#e53935]">*</span></label>
            <div class="relative">
              <select class="os-modal__select w-full py-2.5 pl-3 pr-9 text-sm border border-(--color-border-medium,#d1d5db) rounded-md outline-none text-(--color-text-heading,#111827) bg-(--color-surface,#fff) appearance-none cursor-pointer transition-colors focus:border-(--color-cta-primary,#cc9900) focus:shadow-[0_0_0_2px_rgba(249,115,22,0.1)]">
                <option value="">Ülke/bölge seçin</option>
                <option value="TR">Türkiye</option>
                <option value="DE">Almanya</option>
                <option value="FR">Fransa</option>
                <option value="GB">Birleşik Krallık</option>
                <option value="NL">Hollanda</option>
                <option value="IT">İtalya</option>
                <option value="ES">İspanya</option>
                <option value="NO">Norveç</option>
                <option value="CH">İsviçre</option>
                <option value="AU">Avustralya</option>
                <option value="NZ">Yeni Zelanda</option>
                <option value="SG">Singapur</option>
                <option value="CL">Şili</option>
              </select>
              <svg class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5l3 3 3-3" stroke="#666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
          </div>
          <div class="mb-5">
            <label class="block text-[13px] font-semibold text-(--color-text-body,#333) mb-2">Vergi numarası <span class="text-[#e53935]">*</span></label>
            <input type="text" class="os-modal__input w-full py-2.5 px-3 text-sm border border-(--color-border-medium,#d1d5db) rounded-md outline-none text-(--color-text-heading,#111827) transition-colors box-border focus:border-(--color-cta-primary,#cc9900) focus:shadow-[0_0_0_2px_rgba(249,115,22,0.1)]" placeholder="Vergi numaranızı girin" />
          </div>
          <div class="mb-5">
            <label class="block text-[13px] font-semibold text-(--color-text-body,#333) mb-2">Tam kayıt adı <span class="text-[#e53935]">*</span></label>
            <input type="text" class="os-modal__input w-full py-2.5 px-3 text-sm border border-(--color-border-medium,#d1d5db) rounded-md outline-none text-(--color-text-heading,#111827) transition-colors box-border focus:border-(--color-cta-primary,#cc9900) focus:shadow-[0_0_0_2px_rgba(249,115,22,0.1)]" placeholder="Tam kayıt adınızı girin" />
          </div>
        </div>
        <div class="px-6 pt-4 pb-5 flex justify-end gap-3 border-t border-(--color-border-light,#f0f0f0)">
          <button class="os-modal__btn os-modal__btn--primary px-6 py-2.5 text-sm font-medium rounded-[20px] cursor-pointer border-none transition-all bg-(--color-cta-primary,#cc9900) text-white hover:bg-[#EA580C]">Doğrula</button>
        </div>
      </div>
    </div>

    <!-- ═══ MODAL: Gümrük muayenesi bilgileri ═══ -->
    <div class="os-modal hidden fixed inset-0 z-[9999] items-center justify-center" id="customs-modal">
      <div class="os-modal__overlay absolute inset-0 bg-black/45"></div>
      <div class="os-modal__dialog relative bg-(--color-surface,#fff) rounded-xl w-[480px] max-w-[calc(100vw-32px)] max-h-[calc(100vh-64px)] overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.2)]" style="animation: osModalIn 200ms ease-out">
        <div class="flex items-center justify-between px-6 pt-5 pb-4 border-b border-(--color-border-light,#f0f0f0)">
          <h3 class="text-base font-semibold text-(--color-text-heading,#111827)">Gümrük muayenesi bilgileri</h3>
          <button class="os-modal__close bg-transparent border-none cursor-pointer p-1 rounded flex items-center justify-center transition-colors hover:bg-(--color-surface-raised,#f5f5f5)" aria-label="Kapat">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="#666" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
        </div>
        <div class="px-6 py-5">
          <div class="flex items-start gap-2.5 px-3.5 py-3 bg-primary-50 border border-primary-200 rounded-md text-[13px] text-primary-800 leading-normal mb-5">
            <svg class="shrink-0 mt-px" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#E8912D" stroke-width="1.5"/><path d="M8 5v3m0 2.5h.01" stroke="#E8912D" stroke-width="1.5" stroke-linecap="round"/></svg>
            <span>Vergi bilgileriniz, gümrük yetkilileri tarafından talep edilmektedir. Bu bir İşveren Kimlik Numarası (EIN) veya Sosyal Güvenlik Numarası (SSN) olabilir.</span>
          </div>

          <div class="mb-5">
            <label class="block text-[13px] font-semibold text-(--color-text-body,#333) mb-2">Vergi mükellefi türü <span class="text-[#e53935]">*</span></label>
            <div class="flex flex-col gap-2.5">
              <label class="os-modal__radio flex items-center gap-2 text-sm text-(--color-text-body,#333) cursor-pointer">
                <input type="radio" name="customs-type" value="business" checked class="hidden" />
                <span class="os-modal__radio-custom w-[18px] h-[18px] border-2 border-(--color-border-medium,#d1d5db) rounded-full shrink-0 relative transition-colors"></span>
                İşletme (Business)
              </label>
              <label class="os-modal__radio flex items-center gap-2 text-sm text-(--color-text-body,#333) cursor-pointer">
                <input type="radio" name="customs-type" value="personal" class="hidden" />
                <span class="os-modal__radio-custom w-[18px] h-[18px] border-2 border-(--color-border-medium,#d1d5db) rounded-full shrink-0 relative transition-colors"></span>
                Bireysel (Personal)
              </label>
            </div>
          </div>
          <div class="mb-5">
            <label class="block text-[13px] font-semibold text-(--color-text-body,#333) mb-2">İşveren Kimlik Numarası (EIN) <span class="text-[#e53935]">*</span></label>
            <input type="text" class="os-modal__input w-full py-2.5 px-3 text-sm border border-(--color-border-medium,#d1d5db) rounded-md outline-none text-(--color-text-heading,#111827) transition-colors box-border focus:border-(--color-cta-primary,#cc9900) focus:shadow-[0_0_0_2px_rgba(249,115,22,0.1)]" placeholder="EIN numaranızı girin" />
          </div>
          <div class="flex items-start gap-1.5 text-xs text-(--color-text-placeholder,#999) leading-normal mb-1">
            <svg class="shrink-0 mt-px" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1a4 4 0 00-4 4v2H2a1 1 0 00-1 1v4a1 1 0 001 1h10a1 1 0 001-1V8a1 1 0 00-1-1h-1V5a4 4 0 00-4-4zm-2 4a2 2 0 114 0v2H5V5z" fill="#999"/></svg>
            <span>Gizlilik bilgilendirmesi: Bilgileriniz <a href="#" class="text-(--color-cta-primary,#cc9900) no-underline hover:underline">Gizlilik Politikamız</a> uyarınca korunmaktadır.</span>
          </div>
          <label class="os-modal__checkbox flex items-start gap-2.5 text-[13px] text-(--color-text-body,#333) leading-normal cursor-pointer mt-4">
            <input type="checkbox" class="hidden" />
            <span class="os-modal__checkbox-custom w-4 h-4 border-2 border-(--color-border-medium,#d1d5db) rounded-[3px] shrink-0 mt-0.5 relative transition-all"></span>
            <span>Yukarıdaki bilgilerin doğru olduğunu ve vergi bilgilerimin gümrük işlemleri için kullanılabileceğini kabul ediyorum.</span>
          </label>
        </div>
        <div class="px-6 pt-4 pb-5 flex justify-end gap-3 border-t border-(--color-border-light,#f0f0f0)">
          <button class="os-modal__btn os-modal__btn--cancel px-6 py-2.5 text-sm font-medium rounded-[20px] cursor-pointer transition-all bg-(--color-surface,#fff) text-(--color-text-body,#333) border border-(--color-border-medium,#d1d5db) hover:border-[#999]">İptal et</button>
          <button class="os-modal__btn os-modal__btn--primary px-6 py-2.5 text-sm font-medium rounded-[20px] cursor-pointer border-none transition-all bg-(--color-cta-primary,#cc9900) text-white hover:bg-[#EA580C]">Kaydet</button>
        </div>
      </div>
    </div>
  `;
}

/* ────────────────────────────────────────
   SECTION MAP
   ──────────────────────────────────────── */
const SECTIONS: Record<string, () => string> = {
  'all-orders': renderAllOrders,
  'refunds': renderRefunds,
  'reviews': renderReviews,
  'coupons': renderCoupons,
  'tax-info': renderTaxInfo,
};

/* ────────────────────────────────────────
   MAIN LAYOUT
   ──────────────────────────────────────── */
function getActiveSection(): string {
  const hash = window.location.hash.replace('#', '');
  return SECTIONS[hash] ? hash : 'all-orders';
}

function renderNav(activeId: string): string {
  return NAV_ITEMS.map(item => {
    const isActive = item.id === activeId;
    const activeClasses = isActive
      ? 'orders-page__nav-link--active font-semibold text-(--color-text-heading,#111827) border-l-(--color-text-heading) underline underline-offset-[3px]'
      : 'text-(--color-text-body,#333)';
    return `<a href="#${item.id}" class="orders-page__nav-link block py-2.5 px-5 text-sm no-underline border-l-[3px] border-l-transparent transition-colors leading-[1.4] hover:bg-(--color-surface-muted,#fafafa) hover:text-(--color-text-heading,#111827) ${activeClasses}" data-nav="${item.id}">${item.label}</a>`;
  }).join('');
}

export function OrdersPageLayout(): string {
  const activeId = getActiveSection();
  const renderFn = SECTIONS[activeId] ?? renderAllOrders;

  return `
    <div class="orders-page flex bg-(--color-surface,#fff) rounded-lg min-h-[calc(100vh-80px)] overflow-hidden max-md:flex-col">
      <aside class="orders-page__nav w-[240px] shrink-0 border-r border-(--color-border-light,#f0f0f0) py-6 max-md:w-full max-md:border-r-0 max-md:border-b max-md:border-b-(--color-border-light,#f0f0f0) max-md:py-4">
        <h2 class="text-base font-bold text-(--color-text-heading,#111827) px-5 pb-4">Siparişlerim</h2>
        <nav class="orders-page__nav-links flex flex-col max-md:flex-row max-md:overflow-x-auto max-md:px-4 max-md:gap-1">
          ${renderNav(activeId)}
        </nav>
      </aside>
      <div class="orders-page__content flex-1 flex flex-col min-w-0" id="orders-content">
        ${renderFn()}
      </div>
    </div>
  `;
}

/* ────────────────────────────────────────
   INIT
   ──────────────────────────────────────── */
export function initOrdersPageLayout(): void {
  const contentEl = document.getElementById('orders-content');
  if (!contentEl) return;

  function navigate(): void {
    const activeId = getActiveSection();
    const renderFn = SECTIONS[activeId] ?? renderAllOrders;
    contentEl!.innerHTML = renderFn();

    // Update nav active state
    document.querySelectorAll<HTMLAnchorElement>('.orders-page__nav-link').forEach(link => {
      const isActive = link.dataset.nav === activeId;
      link.classList.toggle('orders-page__nav-link--active', isActive);
      link.classList.toggle('font-semibold', isActive);
      link.classList.toggle('underline', isActive);
      link.classList.toggle('underline-offset-[3px]', isActive);
    });

    // Init inner tabs
    initInnerTabs();
    initPillFilters();
    initTaxModals();
  }

  // Hash change listener
  window.addEventListener('hashchange', navigate);

  // Nav link clicks
  document.querySelectorAll<HTMLAnchorElement>('.orders-page__nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.dataset.nav ?? 'all-orders';
      window.location.hash = id;
    });
  });

  // Init inner tabs for initial render
  initInnerTabs();
  initPillFilters();
  initTaxModals();
}

function initInnerTabs(): void {
  document.querySelectorAll<HTMLElement>('.os-tabs').forEach(tabGroup => {
    const tabs = tabGroup.querySelectorAll<HTMLButtonElement>('.os-tabs__tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.tab;
        if (!targetId) return;

        // Toggle active tab
        tabs.forEach(t => t.classList.remove('os-tabs__tab--active'));
        tab.classList.add('os-tabs__tab--active');

        // Toggle content panels within same parent
        const parent = tabGroup.parentElement;
        if (!parent) return;
        parent.querySelectorAll<HTMLElement>('.os-tab-content').forEach(panel => {
          panel.classList.toggle('os-tab-content--active', panel.dataset.content === targetId);
        });
      });
    });
  });
}

function initPillFilters(): void {
  document.querySelectorAll<HTMLElement>('.os-pill-filters').forEach(group => {
    const pills = group.querySelectorAll<HTMLButtonElement>('.os-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('os-pill--active'));
        pill.classList.add('os-pill--active');
      });
    });
  });
}

function openModal(id: string): void {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal: HTMLElement): void {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
}

function initTaxModals(): void {
  // Open modal on button click
  document.querySelectorAll<HTMLButtonElement>('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.dataset.modal;
      if (modalId) openModal(modalId);
    });
  });

  // Close modal on overlay click, close button, or cancel button
  document.querySelectorAll<HTMLElement>('.os-modal').forEach(modal => {
    const overlay = modal.querySelector<HTMLElement>('.os-modal__overlay');
    const closeBtn = modal.querySelector<HTMLButtonElement>('.os-modal__close');
    const cancelBtn = modal.querySelector<HTMLButtonElement>('.os-modal__btn--cancel');

    overlay?.addEventListener('click', () => closeModal(modal));
    closeBtn?.addEventListener('click', () => closeModal(modal));
    cancelBtn?.addEventListener('click', () => closeModal(modal));
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModalEl = document.querySelector<HTMLElement>('.os-modal:not(.hidden)');
      if (openModalEl) closeModal(openModalEl);
    }
  });
}
