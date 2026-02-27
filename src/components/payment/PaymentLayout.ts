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
    <div class="mb-6"><h1 class="text-[22px] font-bold text-text-primary m-0">Ödeme yönetimi</h1></div>

    <!-- Kayıtlı kartlar -->
    <div class="mb-8">
      <h2 class="text-base font-semibold text-text-primary mb-4">Kayıtlı kartlar ve hesaplar</h2>
      <div class="pay-add-card flex items-center gap-3 py-5 px-6 border-2 border-dashed border-border-strong rounded-lg cursor-pointer transition-[border-color,background] duration-200 hover:border-[#999] hover:bg-surface-muted" data-action="open-card-modal">
        <span class="flex items-center justify-center w-10 h-10 rounded-full bg-surface-raised text-2xl text-text-secondary font-light">+</span>
        <span class="text-sm text-text-primary font-medium">Yeni bir kart ekle</span>
      </div>
    </div>

    <!-- İşlemler -->
    <div class="mb-8">
      <h2 class="text-base font-semibold text-text-primary mb-4">İşlemler</h2>
      <div class="pay-tabs flex border-b border-border-default overflow-x-auto" data-tabgroup="pay-mgmt">
        <button class="pay-tabs__tab pay-tabs__tab--active py-3 px-5 text-[13px] font-medium text-text-secondary bg-transparent border-none border-b-2 border-transparent cursor-pointer transition-[color,border-color] duration-150 -mb-px whitespace-nowrap hover:text-text-primary" data-tab="pay-mgmt-payments">Ödemeler</button>
        <button class="pay-tabs__tab py-3 px-5 text-[13px] font-medium text-text-secondary bg-transparent border-none border-b-2 border-transparent cursor-pointer transition-[color,border-color] duration-150 -mb-px whitespace-nowrap hover:text-text-primary" data-tab="pay-mgmt-refunds">Para iadeleri</button>
      </div>
      <div class="pay-tab-content pay-tab-content--active" data-content="pay-mgmt-payments">
        <div class="pay-empty flex flex-col items-center justify-center py-12 px-6 text-center">
          <div class="opacity-50 mb-4">${RECEIPT_ICON}</div>
          <p class="text-sm text-text-tertiary m-0">Henüz bir ödeme kaydı bulunmamaktadır</p>
        </div>
      </div>
      <div class="pay-tab-content" data-content="pay-mgmt-refunds">
        <div class="pay-empty flex flex-col items-center justify-center py-12 px-6 text-center">
          <div class="opacity-50 mb-4">${RECEIPT_ICON}</div>
          <p class="text-sm text-text-tertiary m-0">Henüz bir iade kaydı bulunmamaktadır</p>
        </div>
      </div>
    </div>

    <!-- Modal: Yeni bir kart ekle -->
    <div class="pay-modal hidden fixed inset-0 z-[9999] items-center justify-center" id="pay-card-modal">
      <div class="pay-modal__overlay fixed inset-0 bg-black/45 z-[1]"></div>
      <div class="pay-modal__dialog relative z-[2] bg-surface rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-[90%] max-w-[480px] max-h-[90vh] overflow-y-auto animate-[payModalIn_200ms_ease-out]">
        <div class="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#f0f0f0]">
          <h3 class="text-lg font-bold text-text-primary m-0">Yeni bir kart ekle</h3>
          <button class="pay-modal__close flex items-center justify-center w-8 h-8 bg-transparent border-none rounded-md cursor-pointer transition-[background] duration-150 hover:bg-surface-raised" aria-label="Kapat">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M14 4L4 14M4 4l10 10" stroke="#333" stroke-width="1.8" stroke-linecap="round"/></svg>
          </button>
        </div>
        <div class="pay-modal__body px-6 py-5">
          <div class="flex gap-2 flex-wrap mb-5">
            <span class="inline-flex items-center justify-center min-w-[44px] h-7 px-1.5 border border-border-default rounded text-[10px] font-bold bg-surface-muted tracking-wide text-[#1a1f71]">VISA</span>
            <span class="inline-flex items-center justify-center min-w-[44px] h-7 px-1.5 border border-border-default rounded text-[10px] font-bold bg-surface-muted tracking-wide text-[#eb001b]">MC</span>
            <span class="inline-flex items-center justify-center min-w-[44px] h-7 px-1.5 border border-border-default rounded text-[10px] font-bold bg-surface-muted tracking-wide text-[#006fcf]">AMEX</span>
            <span class="inline-flex items-center justify-center min-w-[44px] h-7 px-1.5 border border-border-default rounded text-[10px] font-bold bg-surface-muted tracking-wide text-[#ff6000]">D</span>
            <span class="inline-flex items-center justify-center min-w-[44px] h-7 px-1.5 border border-border-default rounded text-[10px] font-bold bg-surface-muted tracking-wide text-[#0079be]">DC</span>
            <span class="inline-flex items-center justify-center min-w-[44px] h-7 px-1.5 border border-border-default rounded text-[10px] font-bold bg-surface-muted tracking-wide text-[#0e4c96]">JCB</span>
            <span class="inline-flex items-center justify-center min-w-[44px] h-7 px-1.5 border border-border-default rounded text-[10px] font-bold bg-surface-muted tracking-wide text-[#d81e06]">UP</span>
            <span class="inline-flex items-center justify-center min-w-[44px] h-7 px-1.5 border border-border-default rounded text-[10px] font-bold bg-surface-muted tracking-wide text-text-secondary">CB</span>
          </div>
          <div class="mb-4">
            <input type="text" class="w-full py-2.5 px-3.5 text-sm border border-border-strong rounded-lg outline-none text-text-primary transition-[border-color] duration-150 focus:border-[#999]" placeholder="Kart numarası *" maxlength="19" />
          </div>
          <div class="flex gap-3 mb-4">
            <input type="text" class="flex-1 py-2.5 px-3.5 text-sm border border-border-strong rounded-lg outline-none text-text-primary transition-[border-color] duration-150 focus:border-[#999]" placeholder="Ad *" />
            <input type="text" class="flex-1 py-2.5 px-3.5 text-sm border border-border-strong rounded-lg outline-none text-text-primary transition-[border-color] duration-150 focus:border-[#999]" placeholder="Soyad *" />
          </div>
          <div class="flex gap-3 mb-4 items-center flex-wrap">
            <select class="py-2.5 px-3.5 text-sm border border-border-strong rounded-lg outline-none text-text-primary bg-surface cursor-pointer min-w-[80px]"><option>Ay *</option>${Array.from({length:12},(_,i)=>`<option>${String(i+1).padStart(2,'0')}</option>`).join('')}</select>
            <span class="text-base text-text-tertiary px-0.5">/</span>
            <select class="py-2.5 px-3.5 text-sm border border-border-strong rounded-lg outline-none text-text-primary bg-surface cursor-pointer min-w-[90px]"><option>Yıl *</option>${Array.from({length:10},(_,i)=>`<option>${2025+i}</option>`).join('')}</select>
            <div class="flex items-center gap-2 ml-auto">
              <input type="text" class="w-[100px] py-2.5 px-3.5 text-sm border border-border-strong rounded-lg outline-none text-text-primary transition-[border-color] duration-150 focus:border-[#999]" placeholder="CVV/CVC *" maxlength="4" />
              <div class="flex gap-1 opacity-60">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" stroke="#999" stroke-width="1.2"/><path d="M2 7h12" stroke="#999" stroke-width="1.2"/></svg>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#999" stroke-width="1.2"/><path d="M8 5v3m0 2.5h.01" stroke="#999" stroke-width="1.2" stroke-linecap="round"/></svg>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-2.5 px-6 pb-5 pt-4 border-t border-[#f0f0f0]">
          <button class="pay-modal__btn--primary py-2.5 px-6 text-sm font-medium rounded-lg border-none text-white bg-[#222] cursor-pointer transition-[background] duration-150 hover:bg-[#333]">Kaydet</button>
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
    <div class="text-[13px] text-text-tertiary mb-2">Ödemeler &gt; Tüm İşlemler</div>
    <div class="mb-6"><h1 class="text-[22px] font-bold text-text-primary m-0">Tüm İşlemler</h1></div>

    <div class="pay-tabs flex border-b border-border-default overflow-x-auto" data-tabgroup="pay-trans">
      <button class="pay-tabs__tab pay-tabs__tab--active py-3 px-5 text-[13px] font-medium text-text-secondary bg-transparent border-none border-b-2 border-transparent cursor-pointer transition-[color,border-color] duration-150 -mb-px whitespace-nowrap hover:text-text-primary" data-tab="pay-trans-payments">Ödeme</button>
      <button class="pay-tabs__tab py-3 px-5 text-[13px] font-medium text-text-secondary bg-transparent border-none border-b-2 border-transparent cursor-pointer transition-[color,border-color] duration-150 -mb-px whitespace-nowrap hover:text-text-primary" data-tab="pay-trans-refunds">Para iadesi</button>
    </div>

    <div class="pay-tab-content pay-tab-content--active" data-content="pay-trans-payments">
      <!-- Status pills -->
      <div class="flex items-center gap-3 py-4 flex-wrap">
        <span class="text-[13px] font-semibold text-text-primary whitespace-nowrap">Durum</span>
        <div class="pay-pills flex flex-wrap gap-2">
          <button class="pay-pill pay-pill--active py-1.5 px-3.5 text-xs rounded-2xl border cursor-pointer whitespace-nowrap transition-all duration-150 text-white bg-[#222] border-[#222]">Tümü</button>
          <button class="pay-pill py-1.5 px-3.5 text-xs rounded-2xl border cursor-pointer whitespace-nowrap transition-all duration-150 text-text-secondary bg-surface-raised border-border-default hover:border-[#bbb] hover:bg-[#eee]">Ödemeler Henüz Ulaşmadı</button>
          <button class="pay-pill py-1.5 px-3.5 text-xs rounded-2xl border cursor-pointer whitespace-nowrap transition-all duration-150 text-text-secondary bg-surface-raised border-border-default hover:border-[#bbb] hover:bg-[#eee]">Bekleyen Tedarikçi Eşleşmesi</button>
          <button class="pay-pill py-1.5 px-3.5 text-xs rounded-2xl border cursor-pointer whitespace-nowrap transition-all duration-150 text-text-secondary bg-surface-raised border-border-default hover:border-[#bbb] hover:bg-[#eee]">Tamamlandı</button>
        </div>
      </div>

      <!-- Filters -->
      <div class="flex items-center justify-between gap-3 py-3 flex-wrap max-md:flex-col max-md:items-start">
        <div class="flex items-center gap-2.5 flex-wrap">
          <div class="relative flex items-center gap-1.5">
            <input type="text" class="py-2 px-3 text-[13px] border border-border-strong rounded-md outline-none text-text-primary min-w-[160px] transition-[border-color] duration-150 pr-8 focus:border-[#999]" placeholder="Saat seçin" readonly />
            <span class="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">${CALENDAR_ICON}</span>
          </div>
          <input type="text" class="py-2 px-3 text-[13px] border border-border-strong rounded-md outline-none text-text-primary min-w-[160px] transition-[border-color] duration-150 focus:border-[#999]" placeholder="Ödeme tutarına göre ara" />
          <select class="py-2 px-3 text-[13px] border border-border-strong rounded-md outline-none text-text-primary bg-surface cursor-pointer min-w-[120px]"><option>Para birimi</option><option>USD</option><option>EUR</option><option>TRY</option></select>
          <a href="#" class="text-[13px] text-text-secondary no-underline whitespace-nowrap transition-[color] duration-150 hover:text-text-primary hover:underline">Filtreleri Kaldır</a>
        </div>
        <button class="inline-flex items-center gap-1.5 py-2 px-4 text-[13px] text-white bg-[#222] border-none rounded-md cursor-pointer transition-[background] duration-150 whitespace-nowrap hover:bg-[#333]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v8m0 0l-3-3m3 3l3-3M3 12h10" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          İhracat Ayrıntıları
        </button>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto mt-2">
        <table class="w-full border-collapse text-[13px]">
          <thead><tr>
            <th class="text-left py-3 px-4 font-semibold text-text-secondary bg-surface-muted border-b border-border-default whitespace-nowrap">Gönderme saati (PST)</th><th class="text-left py-3 px-4 font-semibold text-text-secondary bg-surface-muted border-b border-border-default whitespace-nowrap">Tedarikçi</th><th class="text-left py-3 px-4 font-semibold text-text-secondary bg-surface-muted border-b border-border-default whitespace-nowrap">Ödeme yöntemi</th><th class="text-left py-3 px-4 font-semibold text-text-secondary bg-surface-muted border-b border-border-default whitespace-nowrap">Tutar</th><th class="text-left py-3 px-4 font-semibold text-text-secondary bg-surface-muted border-b border-border-default whitespace-nowrap">İşlem Ücreti</th><th class="text-left py-3 px-4 font-semibold text-text-secondary bg-surface-muted border-b border-border-default whitespace-nowrap">Durum</th><th class="text-left py-3 px-4 font-semibold text-text-secondary bg-surface-muted border-b border-border-default whitespace-nowrap">İşlemler</th>
          </tr></thead>
          <tbody><tr><td colspan="7" class="text-center text-text-tertiary !py-12 px-4">Henüz bir ödeme kaydı bulunmamaktadır</td></tr></tbody>
        </table>
      </div>
    </div>

    <div class="pay-tab-content" data-content="pay-trans-refunds">
      <div class="pay-empty flex flex-col items-center justify-center py-12 px-6 text-center">
        <div class="opacity-50 mb-4">${RECEIPT_ICON}</div>
        <p class="text-sm text-text-tertiary m-0">Henüz bir iade kaydı bulunmamaktadır</p>
      </div>
    </div>
  `;
}

/* ────────────────────────────────────────
   SECTION: Havale hesapları (Banka Havalesi Hesapları)
   ──────────────────────────────────────── */
function renderTTAccounts(): string {
  return `
    <div class="text-[13px] text-text-tertiary mb-2">İşlemler &gt; Banka Havalesi Hesapları</div>
    <div class="flex items-center justify-between flex-wrap gap-3 mb-6 max-md:flex-col max-md:items-start">
      <h1 class="text-[22px] font-bold text-text-primary m-0">Banka Havalesi Hesapları</h1>
      <div class="flex items-center gap-2 relative max-md:flex-wrap">
        <button class="inline-flex items-center gap-1.5 py-2 px-4 text-[13px] text-text-primary bg-surface border border-border-strong rounded-full cursor-pointer transition-[border-color,background] duration-150 whitespace-nowrap hover:border-[#999] hover:bg-surface-muted" data-action="open-verify-modal">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="2" stroke="#333" stroke-width="1.2"/><path d="M6 8l2 2 4-4" stroke="#333" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Tedarikçinin hesabını doğrula
        </button>
        <button class="inline-flex items-center gap-1.5 py-2 px-4 text-[13px] text-text-primary bg-surface border border-border-strong rounded-full cursor-pointer transition-[border-color,background] duration-150 whitespace-nowrap hover:border-[#999] hover:bg-surface-muted" data-action="show-upload">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#333" stroke-width="1.2"/><path d="M8 5v6M5 8h6" stroke="#333" stroke-width="1.2" stroke-linecap="round"/></svg>
          Havale dekontu yükle
        </button>
        <button class="inline-flex items-center justify-center w-8 h-8 bg-transparent border border-border-strong rounded-full cursor-pointer transition-[border-color,background] duration-150 hover:border-[#999] hover:bg-surface-muted" aria-label="Bilgi" data-action="toggle-tooltip">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#666" stroke-width="1.2"/><path d="M8 5v3m0 2.5h.01" stroke="#666" stroke-width="1.2" stroke-linecap="round"/></svg>
        </button>
        <div class="pay-tooltip hidden absolute top-full right-0 mt-2 py-3.5 px-4.5 bg-surface border border-border-default rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.1)] text-[13px] text-text-secondary leading-normal min-w-[280px] max-w-[360px] z-[100] max-md:right-auto max-md:left-0 max-md:min-w-[220px]" id="pay-tt-tooltip">
          Tedarikçi hesabının resmi Alibaba.com banka hesabı olup olmadığını doğrulayın. Ödemenizin Alibaba.com tarafından korunduğunu doğrulamak için havale dekontu yükleyin.
          <button class="pay-tooltip__close absolute top-2 right-2.5 bg-transparent border-none text-lg text-text-tertiary cursor-pointer leading-none hover:text-text-primary" aria-label="Kapat">&times;</button>
        </div>
      </div>
    </div>

    <div class="pay-tabs flex border-b border-border-default overflow-x-auto" data-tabgroup="pay-tt">
      <button class="pay-tabs__tab pay-tabs__tab--active py-3 px-5 text-[13px] font-medium text-text-secondary bg-transparent border-none border-b-2 border-transparent cursor-pointer transition-[color,border-color] duration-150 -mb-px whitespace-nowrap hover:text-text-primary" data-tab="pay-tt-all">Tümü</button>
      <button class="pay-tabs__tab py-3 px-5 text-[13px] font-medium text-text-secondary bg-transparent border-none border-b-2 border-transparent cursor-pointer transition-[color,border-color] duration-150 -mb-px whitespace-nowrap hover:text-text-primary" data-tab="pay-tt-pending">Bekleyen Tedarikçi Eşleşmesi</button>
      <button class="pay-tabs__tab py-3 px-5 text-[13px] font-medium text-text-secondary bg-transparent border-none border-b-2 border-transparent cursor-pointer transition-[color,border-color] duration-150 -mb-px whitespace-nowrap hover:text-text-primary" data-tab="pay-tt-matched">Tedarikçi Tarafından Tam Eşleşme</button>
    </div>

    <!-- Search + Filters -->
    <div class="flex items-center justify-between gap-4 py-4 flex-wrap max-md:flex-col max-md:items-start">
      <div class="flex items-center gap-2.5 flex-wrap">
        <div class="flex items-stretch border border-border-strong rounded-md overflow-hidden">
          <input type="text" class="py-2 px-3 text-[13px] border-none rounded-none outline-none text-text-primary min-w-[200px]" placeholder="Tedarikçinin e-postasına ..." />
          <button class="flex items-center justify-center px-2.5 bg-transparent border-none border-l border-border-default cursor-pointer transition-[background] duration-150 hover:bg-surface-raised">${SEARCH_ICON}</button>
        </div>
        <div class="relative flex items-center gap-1.5">
          <input type="text" class="py-2 px-3 text-[13px] border border-border-strong rounded-md outline-none text-text-primary min-w-[160px] transition-[border-color] duration-150 pr-8 focus:border-[#999]" placeholder="Saat seçin" readonly />
          <span class="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">${CALENDAR_ICON}</span>
        </div>
        <a href="#" class="text-[13px] text-text-secondary no-underline whitespace-nowrap transition-[color] duration-150 hover:text-text-primary hover:underline">Filtreleri Kaldır</a>
      </div>
      <div class="flex items-center gap-4 flex-wrap">
        <span class="text-[13px] text-text-secondary whitespace-nowrap">Toplam Havale Miktarı: <strong class="text-text-primary font-semibold">USD 0.00</strong></span>
        <span class="text-[13px] text-text-secondary whitespace-nowrap">Bekleyen Tedarikçi Eşleşmesi: <strong class="text-text-primary font-semibold">USD 0.00</strong></span>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto mt-2">
      <table class="w-full border-collapse text-[13px]">
        <thead><tr>
          <th class="text-left py-3 px-4 font-semibold text-text-secondary bg-surface-muted border-b border-border-default whitespace-nowrap">Son Ulaşım Saati (PST)</th><th class="text-left py-3 px-4 font-semibold text-text-secondary bg-surface-muted border-b border-border-default whitespace-nowrap">Tedarikçi Bilgileri</th><th class="text-left py-3 px-4 font-semibold text-text-secondary bg-surface-muted border-b border-border-default whitespace-nowrap">Tedarikçi T/T Hesap Numarası</th><th class="text-left py-3 px-4 font-semibold text-text-secondary bg-surface-muted border-b border-border-default whitespace-nowrap">Toplam Havale Tutarı</th><th class="text-left py-3 px-4 font-semibold text-text-secondary bg-surface-muted border-b border-border-default whitespace-nowrap">Durum</th><th class="text-left py-3 px-4 font-semibold text-text-secondary bg-surface-muted border-b border-border-default whitespace-nowrap">İşlemler</th>
        </tr></thead>
        <tbody><tr><td colspan="6" class="text-center text-text-tertiary !py-12 px-4">Henüz bir ödeme kaydı bulunmamaktadır</td></tr></tbody>
      </table>
    </div>

    <!-- Modal: Tedarikçinin hesabını doğrula -->
    <div class="pay-modal hidden fixed inset-0 z-[9999] items-center justify-center" id="pay-verify-modal">
      <div class="pay-modal__overlay fixed inset-0 bg-black/45 z-[1]"></div>
      <div class="pay-modal__dialog relative z-[2] bg-surface rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-[90%] max-w-[480px] max-h-[90vh] overflow-y-auto animate-[payModalIn_200ms_ease-out]">
        <div class="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#f0f0f0]">
          <h3 class="text-lg font-bold text-text-primary m-0">Tedarikçinin hesabını doğrula</h3>
          <button class="pay-modal__close flex items-center justify-center w-8 h-8 bg-transparent border-none rounded-md cursor-pointer transition-[background] duration-150 hover:bg-surface-raised" aria-label="Kapat">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M14 4L4 14M4 4l10 10" stroke="#333" stroke-width="1.8" stroke-linecap="round"/></svg>
          </button>
        </div>
        <div class="pay-modal__body px-6 py-5">
          <div class="flex items-center gap-2.5 py-3 px-4 bg-[#FEF3C7] rounded-lg text-[13px] text-primary-800 mb-4">
            <span class="w-2 h-2 rounded-full bg-warning-500 shrink-0"></span>
            <span>Ödeme yapmadan önce daima tedarikçinin banka hesabını doğrulayın</span>
          </div>
          <p class="text-[13px] text-text-secondary leading-relaxed mb-4">Tedarikçiden bir ödeme talimatı aldığınızda, ödeme yapmadan önce hesap numarasının resmi Alibaba.com banka hesabına ait olduğunu doğrulayın. Böylece sipariş korumasından yararlanabilirsiniz.</p>
          <div class="mb-4">
            <input type="text" class="w-full py-2.5 px-3.5 text-sm border border-border-strong rounded-lg outline-none text-text-primary transition-[border-color] duration-150 focus:border-[#999]" placeholder="Tedarikçinin banka hesap numarası *" />
          </div>
        </div>
        <div class="flex justify-between gap-2.5 px-6 pb-5 pt-4 border-t border-[#f0f0f0]">
          <button class="pay-modal__btn--cancel py-2.5 px-6 text-sm font-medium rounded-lg border border-border-strong bg-surface text-text-secondary cursor-pointer transition-all duration-150 hover:border-[#999] hover:bg-surface-muted">Vazgeç</button>
          <button class="pay-modal__btn--primary inline-flex items-center gap-1.5 py-2.5 px-6 text-sm font-medium rounded-lg border-none text-white bg-[#222] cursor-pointer transition-[background] duration-150 hover:bg-[#333]">
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
    <div class="mb-6"><h1 class="text-[22px] font-bold text-text-primary m-0">Havale Takibi</h1></div>
    <div class="flex items-center justify-between gap-4 py-4 flex-wrap max-md:flex-col max-md:items-start">
      <div class="flex items-center gap-2.5 flex-wrap">
        <div class="flex items-stretch border border-border-strong rounded-md overflow-hidden">
          <input type="text" class="py-2 px-3 text-[13px] border-none rounded-none outline-none text-text-primary min-w-[200px]" placeholder="Havale referans numarası..." />
          <button class="flex items-center justify-center px-2.5 bg-transparent border-none border-l border-border-default cursor-pointer transition-[background] duration-150 hover:bg-surface-raised">${SEARCH_ICON}</button>
        </div>
        <div class="relative flex items-center gap-1.5">
          <input type="text" class="py-2 px-3 text-[13px] border border-border-strong rounded-md outline-none text-text-primary min-w-[160px] transition-[border-color] duration-150 pr-8 focus:border-[#999]" placeholder="Saat seçin" readonly />
          <span class="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">${CALENDAR_ICON}</span>
        </div>
        <a href="#" class="text-[13px] text-text-secondary no-underline whitespace-nowrap transition-[color] duration-150 hover:text-text-primary hover:underline">Filtreleri Kaldır</a>
      </div>
    </div>
    <div class="overflow-x-auto mt-2">
      <table class="w-full border-collapse text-[13px]">
        <thead><tr>
          <th class="text-left py-3 px-4 font-semibold text-text-secondary bg-surface-muted border-b border-border-default whitespace-nowrap">Referans No</th><th class="text-left py-3 px-4 font-semibold text-text-secondary bg-surface-muted border-b border-border-default whitespace-nowrap">Tedarikçi</th><th class="text-left py-3 px-4 font-semibold text-text-secondary bg-surface-muted border-b border-border-default whitespace-nowrap">Havale Tutarı</th><th class="text-left py-3 px-4 font-semibold text-text-secondary bg-surface-muted border-b border-border-default whitespace-nowrap">Gönderim Tarihi</th><th class="text-left py-3 px-4 font-semibold text-text-secondary bg-surface-muted border-b border-border-default whitespace-nowrap">Durum</th><th class="text-left py-3 px-4 font-semibold text-text-secondary bg-surface-muted border-b border-border-default whitespace-nowrap">İşlemler</th>
        </tr></thead>
        <tbody><tr><td colspan="6" class="text-center text-text-tertiary !py-12 px-4">Henüz bir havale takip kaydı bulunmamaktadır</td></tr></tbody>
      </table>
    </div>
  `;
}

/* ────────────────────────────────────────
   SECTION: Alibaba.com Kartı
   ──────────────────────────────────────── */
function renderAlibabaCard(): string {
  return `
    <div class="mb-6"><h1 class="text-[22px] font-bold text-text-primary m-0">Alibaba.com Kartı</h1></div>
    <div class="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div class="opacity-50 mb-4">${RECEIPT_ICON}</div>
      <p class="text-sm text-text-tertiary m-0">Bu hizmet yakında kullanıma sunulacaktır</p>
    </div>
  `;
}

/* ────────────────────────────────────────
   SECTION: Pay Later for Business
   ──────────────────────────────────────── */
function renderPayLater(): string {
  return `
    <div class="mb-6"><h1 class="text-[22px] font-bold text-text-primary m-0">Pay Later for Business</h1></div>
    <div class="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div class="opacity-50 mb-4">${RECEIPT_ICON}</div>
      <p class="text-sm text-text-tertiary m-0">Bu hizmet yakında kullanıma sunulacaktır</p>
    </div>
  `;
}

/* ────────────────────────────────────────
   UPLOAD VIEW (inline, replaces content)
   ──────────────────────────────────────── */
function renderUpload(): string {
  return `
    <div class="mb-6"><h1 class="text-[22px] font-bold text-text-primary m-0">Havale dekontu yükle</h1></div>
    <div class="mt-2">
      <p class="text-[13px] text-text-secondary leading-normal mb-5"><span class="text-error-500 font-semibold">*</span> Havale dekontunuzu veya MT103 belgenizi yükleyin ya da dosyayı kutuya sürükleyip bırakın. <a href="#" class="text-[#2563eb] no-underline hover:underline">Örnekleri görüntüle</a></p>
      <div class="flex gap-8 items-start p-6 border-2 border-dashed border-border-strong rounded-lg bg-surface-muted max-md:flex-col max-md:items-center max-md:text-center">
        <div class="shrink-0">
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
        <div class="flex-1 text-[13px] text-text-secondary leading-[1.7] [&_p]:m-0 [&_p]:mb-1.5 [&_strong]:text-text-primary">
          <p><strong>Belgenizin detaylarının net olduğundan emin olun</strong></p>
          <p>Dosya boyutu: 20 MB altında</p>
          <p>Desteklenen formatlar: JPG, JPEG, PNG, GIF ve PDF</p>
          <p>Ayrıca manuel olarak <a href="#" class="text-[#2563eb] no-underline hover:underline">havale bilgilerini girebilirsiniz</a></p>
          <button class="inline-flex items-center gap-2 py-2.5 px-6 mt-4 text-sm font-medium text-white bg-[#222] border-none rounded-lg cursor-pointer transition-[background] duration-150 hover:bg-[#333]">
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
      const active = item.id === activeId ? 'pay-nav__link--active font-semibold text-text-primary !border-l-[#222] bg-[#f9f9f9] max-md:!border-l-transparent max-md:!border-b-[#222]' : '';
      return `<a href="#${item.id}" class="pay-nav__link block py-2 px-5 text-sm text-text-primary no-underline border-l-[3px] border-transparent transition-[color,background,border-color] duration-150 leading-[1.4] hover:bg-surface-muted hover:text-text-primary max-md:border-l-0 max-md:border-b-2 max-md:border-transparent max-md:py-1.5 max-md:px-3 max-md:text-[13px] ${active}" data-nav="${item.id}">${item.label}</a>`;
    }).join('');
    return `
      <div class="pay-nav__group mb-2 max-md:flex max-md:items-center max-md:mb-0">
        <span class="block py-2 px-5 text-xs font-semibold text-text-tertiary uppercase tracking-wide max-md:py-1 max-md:px-2 max-md:text-[11px]">${group.title}</span>
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
    <div class="pay-layout flex bg-surface rounded-lg min-h-[calc(100vh-80px)] overflow-hidden max-md:flex-col">
      <aside class="pay-nav w-[220px] shrink-0 border-r border-[#f0f0f0] py-6 sticky top-0 self-start max-h-[calc(100vh-80px)] overflow-y-auto max-md:w-full max-md:static max-md:max-h-none max-md:border-r-0 max-md:border-b max-md:border-[#f0f0f0] max-md:py-4 max-md:flex max-md:flex-wrap max-md:items-center">
        <h2 class="text-base font-bold text-text-primary px-5 pb-4 max-md:w-full max-md:px-4 max-md:pb-2">Ödeme</h2>
        ${renderNav(activeId)}
      </aside>
      <div class="pay-content flex-1 min-w-0 py-6 px-7 max-md:p-4 max-sm:p-3" id="pay-content">
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
      const isActive = link.dataset.nav === activeId;
      link.classList.toggle('pay-nav__link--active', isActive);
      link.classList.toggle('font-semibold', isActive);
      link.classList.toggle('!border-l-[#222]', isActive);
      link.classList.toggle('bg-[#f9f9f9]', isActive);
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
        tabs.forEach(t => {
          t.classList.remove('pay-tabs__tab--active');
          t.classList.remove('!text-text-primary', '!font-semibold', '!border-b-[#222]');
        });
        tab.classList.add('pay-tabs__tab--active');
        tab.classList.add('!text-text-primary', '!font-semibold', '!border-b-[#222]');
        const parent = tabGroup.parentElement;
        if (!parent) return;
        parent.querySelectorAll<HTMLElement>('.pay-tab-content').forEach(panel => {
          panel.classList.toggle('pay-tab-content--active', panel.dataset.content === targetId);
        });
      });
    });
  });

  // Apply active styles to initially active tabs
  document.querySelectorAll<HTMLButtonElement>('.pay-tabs__tab--active').forEach(tab => {
    tab.classList.add('!text-text-primary', '!font-semibold', '!border-b-[#222]');
  });
}

function initPayPills(): void {
  document.querySelectorAll<HTMLElement>('.pay-pills').forEach(group => {
    const pills = group.querySelectorAll<HTMLButtonElement>('.pay-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => {
          p.classList.remove('pay-pill--active');
          p.classList.remove('!text-white', '!bg-[#222]', '!border-[#222]');
          p.classList.add('text-text-secondary', 'bg-surface-raised', 'border-border-default');
        });
        pill.classList.add('pay-pill--active');
        pill.classList.add('!text-white', '!bg-[#222]', '!border-[#222]');
        pill.classList.remove('text-text-secondary', 'bg-surface-raised', 'border-border-default');
      });
    });
  });
}

function openPayModal(id: string): void {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closePayModal(modal: HTMLElement): void {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
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
    const cancelBtn = modal.querySelector('.pay-modal__btn--cancel');
    if (cancelBtn) cancelBtn.addEventListener('click', () => closePayModal(modal));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const open = document.querySelector<HTMLElement>('.pay-modal:not(.hidden)');
      if (open) closePayModal(open);
    }
  });
}

function initPayTooltip(): void {
  const toggleBtn = document.querySelector<HTMLElement>('[data-action="toggle-tooltip"]');
  const tooltip = document.getElementById('pay-tt-tooltip');
  if (!toggleBtn || !tooltip) return;

  toggleBtn.addEventListener('click', () => {
    tooltip.classList.toggle('hidden');
  });

  tooltip.querySelector('.pay-tooltip__close')?.addEventListener('click', () => {
    tooltip.classList.add('hidden');
  });
}
