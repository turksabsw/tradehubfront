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
    <div class="orders-page__header">
      <h1 class="orders-page__title">Siparişlerim</h1>
      <button class="orders-page__upload-btn">Havale dekontu yükle</button>
    </div>
    <div class="orders-page__empty">
      <div class="orders-page__empty-illustration">
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
      <h3 class="orders-page__empty-title">Henüz siparişiniz bulunmamaktadır</h3>
      <p class="orders-page__empty-desc">Tedarik etmeye başlamak için ana sayfaya gidin veya aşağıya tıklayın</p>
      <a href="/" class="orders-page__empty-cta">Tedarik etmeye başla</a>
    </div>
  `;
}

function renderRefunds(): string {
  return `
    <div class="orders-page__header">
      <h1 class="orders-page__title">Satış sonrası işlemler ve para iadeleri</h1>
    </div>
    <div class="os-tabs" data-tabgroup="refunds">
      <button class="os-tabs__tab os-tabs__tab--active" data-tab="refund-returns">Para İadeleri</button>
      <button class="os-tabs__tab" data-tab="refund-tax">Vergi iadeleri</button>
      <button class="os-tabs__tab" data-tab="refund-after">Satış sonrası hizmetler</button>
    </div>

    <!-- Tab: Para İadeleri (empty) -->
    <div class="os-tab-content os-tab-content--active" data-content="refund-returns">
      <div class="os-empty">
        ${EMPTY_RECEIPT_ICON}
        <p class="os-empty__text">Şu anda satış sonrası servis talebi yok</p>
      </div>
    </div>

    <!-- Tab: Vergi iadeleri (table) -->
    <div class="os-tab-content" data-content="refund-tax">
      <div class="os-table-wrap">
        <table class="os-table">
          <thead>
            <tr>
              <th>Sipariş numarası</th>
              <th>Vaka numarası</th>
              <th>Başvuru Tarihi</th>
              <th>Para iadesi tutarı</th>
              <th>Durum</th>
              <th>Banka iade durumu</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="6" class="os-table__empty">
                ${EMPTY_RECEIPT_ICON}
                <p>Şu anda satış sonrası servis talebi yok</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Tab: Satış sonrası hizmetler (empty) -->
    <div class="os-tab-content" data-content="refund-after">
      <div class="os-empty">
        ${EMPTY_RECEIPT_ICON}
        <p class="os-empty__text">Şu anda satış sonrası servis talebi yok</p>
      </div>
    </div>
  `;
}

function renderReviews(): string {
  return `
    <div class="orders-page__header">
      <h1 class="orders-page__title">Değerlendirmelerim</h1>
      <div class="os-header-right">
        <span class="os-header-right__label">Puanlama Kuralları</span>
        <svg class="w-4 h-4" fill="none" stroke="#999" stroke-width="1.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/><path stroke-linecap="round" d="M12 16v-4m0-4h.01"/>
        </svg>
      </div>
    </div>
    <div class="os-tabs" data-tabgroup="reviews">
      <button class="os-tabs__tab os-tabs__tab--active os-tabs__tab--orange" data-tab="review-pending">Bekleyen değerlendirmeler (0)</button>
      <button class="os-tabs__tab" data-tab="review-done">Değerlendirilenler (0)</button>
    </div>

    <div class="os-reviews-toolbar">
      <div class="os-reviews-toolbar__search">
        <input type="text" placeholder="Sipariş numarası, E-posta, Hesap" class="os-reviews-toolbar__input" />
        <button class="os-reviews-toolbar__btn" aria-label="Ara">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="m21 21-4.35-4.35"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="os-tab-content os-tab-content--active" data-content="review-pending">
      <div class="os-empty">
        <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
          <rect x="10" y="10" width="50" height="55" rx="4" fill="#FFECD2" stroke="#F7A84B" stroke-width="1"/>
          <rect x="15" y="18" width="40" height="4" rx="2" fill="#F7A84B" opacity="0.3"/>
          <rect x="15" y="28" width="30" height="4" rx="2" fill="#F7A84B" opacity="0.3"/>
          <circle cx="72" cy="38" r="8" fill="#FBBF24"/>
          <rect x="66" y="48" width="12" height="20" rx="3" fill="#1E3A5F"/>
        </svg>
        <p class="os-empty__text">Bekleyen yorum yok</p>
      </div>
    </div>

    <div class="os-tab-content" data-content="review-done">
      <div class="os-empty">
        ${EMPTY_RECEIPT_ICON}
        <p class="os-empty__text">Değerlendirme bulunamadı</p>
      </div>
    </div>
  `;
}

function renderCoupons(): string {
  return `
    <div class="orders-page__header">
      <h1 class="orders-page__title">Kupon ve krediler</h1>
    </div>
    <div class="os-tabs" data-tabgroup="coupons">
      <button class="os-tabs__tab os-tabs__tab--active" data-tab="coupons-list">Kuponlar</button>
      <button class="os-tabs__tab" data-tab="coupons-credit">Kredi</button>
    </div>

    <!-- Tab: Kuponlar -->
    <div class="os-tab-content os-tab-content--active" data-content="coupons-list">
      <div class="os-pill-filters">
        <button class="os-pill os-pill--active">Mevcut</button>
        <button class="os-pill">Kullanıldı</button>
        <button class="os-pill">Süresi doldu</button>
      </div>
      <div class="os-empty os-empty--short">
        <p class="os-empty__text">Kupon Yok</p>
      </div>
    </div>

    <!-- Tab: Kredi -->
    <div class="os-tab-content" data-content="coupons-credit">
      <div class="os-credit-card">
        <p class="os-credit-card__label">Toplam kredi bakiyesi</p>
        <p class="os-credit-card__amount">0.00</p>
        <p class="os-credit-card__note">1 kredi 1 USD'ye eşittir <a href="#terms" class="os-credit-card__link">Hükümler ve koşullar</a></p>
      </div>

      <h3 class="os-section-title">Geçmiş</h3>
      <div class="os-table-wrap">
        <table class="os-table">
          <thead>
            <tr>
              <th>İşlem</th>
              <th>Ayrıntılar</th>
              <th>Tarih (UTC-8)</th>
              <th>Tutar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4" class="os-table__empty-text">Henüz bir kayıt yok.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="os-pagination">
        <button class="os-pagination__btn" disabled>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <span class="os-pagination__page os-pagination__page--active">1</span>
        <button class="os-pagination__btn" disabled>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  `;
}

function renderTaxInfo(): string {
  return `
    <div class="orders-page__header">
      <h1 class="orders-page__title">Vergi bilgileri</h1>
    </div>
    <div class="os-tabs" data-tabgroup="tax">
      <button class="os-tabs__tab os-tabs__tab--active" data-tab="tax-info-tab">Vergi Bilgileri</button>
      <button class="os-tabs__tab" data-tab="tax-customs">Gümrük muayenesi bilgileri</button>
    </div>

    <!-- Tab: Vergi Bilgileri -->
    <div class="os-tab-content os-tab-content--active" data-content="tax-info-tab">
      <div class="os-info-card">
        <div class="os-info-card__text">
          <h4 class="os-info-card__title">KDV muafiyeti için</h4>
          <p class="os-info-card__desc">Yeniden satış veya üretim için ürün satın alıyorsanız doğrulanması için vergi bilgilerinizi gönderin ve TradeHub.com'da vergiden muaf siparişler verin.</p>
        </div>
        <button class="os-info-card__btn" data-modal="pst-modal">Vergi muafiyeti ekleyin veya değiştirin</button>
      </div>

      <div class="os-info-card">
        <div class="os-info-card__text">
          <h4 class="os-info-card__title">AB/Norveç/Birleşik Krallık/İsviçre veya Avustralya/Yeni Zelanda/Singapur/Şili vergi bilgisi gönderimi</h4>
          <p class="os-info-card__desc">Ticari satın alımlarda, doğrulanması için vergi bilgilerinizi göndererek TradeHub.com'da vergiden muaf siparişler verebilirsiniz.</p>
        </div>
        <button class="os-info-card__btn" data-modal="vat-modal">Vergi bilgilerinizi ekleyin</button>
      </div>

      <h3 class="os-section-title">Sıkça Sorulan Sorular</h3>

      <div class="os-faq">
        <div class="os-faq__grid">
          <div class="os-faq__card">
            <h5 class="os-faq__card-title">Vergi bilgilerim yoksa ne yapmalıyım?</h5>
            <p class="os-faq__card-desc">Yerel vergi kurumunuzun web sitesini kontrol ederek vergi muafiyeti için uygunluk kriterlerinizi inceleyin.</p>
          </div>
          <div class="os-faq__card">
            <h5 class="os-faq__card-title">Vergi bilgilerim neden onaylanmadı?</h5>
            <p class="os-faq__card-desc">Vergi bilgilerinizin süresinin dolup dolmadığını veya yanlış bilgi gönderip göndermediğinizi kontrol edin.</p>
          </div>
          <div class="os-faq__card">
            <h5 class="os-faq__card-title">Vergi iadesi için nasıl başvurabilirim?</h5>
            <p class="os-faq__card-desc">Vergi bilgileriniz gönderilmişse ve siparişiniz kargoya verilmeden önce doğrulanmışsa vergi iadesi alabilirsiniz.</p>
          </div>
        </div>

        <details class="os-faq__accordion">
          <summary>Satış vergisi nedir?</summary>
          <p>Satış vergisi, mal ve hizmetlerin satışından alınan bir tüketim vergisidir.</p>
        </details>
        <details class="os-faq__accordion">
          <summary>Katma Değer Vergisi (KDV) nedir?</summary>
          <p>KDV, üretim ve dağıtım sürecinin her aşamasında eklenen değer üzerinden alınan bir vergidir.</p>
        </details>
      </div>
    </div>

    <!-- Tab: Gümrük muayenesi bilgileri -->
    <div class="os-tab-content" data-content="tax-customs">
      <div class="os-info-card">
        <div class="os-info-card__text">
          <h4 class="os-info-card__title">Gümrük işlemleri (tüm bölgeleri kapsar)</h4>
          <p class="os-info-card__desc">Vergi bilgileriniz gümrük yetkilileri tarafından talep edilmektedir. Bu, bir İşveren Kimlik Numarası veya Sosyal Güvenlik Numarası olabilir.</p>
        </div>
        <button class="os-info-card__btn" data-modal="customs-modal">Gümrük muayenesi bilgileri ekleyin</button>
      </div>
    </div>

    <!-- ═══ MODAL: PST bilgileri ═══ -->
    <div class="os-modal" id="pst-modal">
      <div class="os-modal__overlay"></div>
      <div class="os-modal__dialog">
        <div class="os-modal__header">
          <h3 class="os-modal__title">PST bilgileri</h3>
          <button class="os-modal__close" aria-label="Kapat">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="#666" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
        </div>
        <div class="os-modal__body">
          <div class="os-modal__field">
            <label class="os-modal__label">İl <span class="os-modal__required">*</span></label>
            <div class="os-modal__radio-group">
              <label class="os-modal__radio">
                <input type="radio" name="pst-province" value="manitoba" checked />
                <span class="os-modal__radio-custom"></span>
                Manitoba
              </label>
              <label class="os-modal__radio">
                <input type="radio" name="pst-province" value="saskatchewan" />
                <span class="os-modal__radio-custom"></span>
                Saskatchewan
              </label>
            </div>
          </div>
          <div class="os-modal__field">
            <label class="os-modal__label">RST numarası <span class="os-modal__required">*</span></label>
            <input type="text" class="os-modal__input" placeholder="RST numaranızı girin" />
          </div>
        </div>
        <div class="os-modal__footer">
          <button class="os-modal__btn os-modal__btn--primary">Doğrula</button>
        </div>
      </div>
    </div>

    <!-- ═══ MODAL: KDV/GST Numarası Ekleyin ═══ -->
    <div class="os-modal" id="vat-modal">
      <div class="os-modal__overlay"></div>
      <div class="os-modal__dialog">
        <div class="os-modal__header">
          <h3 class="os-modal__title">KDV/GST Numarası Ekleyin</h3>
          <button class="os-modal__close" aria-label="Kapat">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="#666" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
        </div>
        <div class="os-modal__body">
          <div class="os-modal__field">
            <label class="os-modal__label">Ülke/bölge <span class="os-modal__required">*</span></label>
            <div class="os-modal__select-wrap">
              <select class="os-modal__select">
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
              <svg class="os-modal__select-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5l3 3 3-3" stroke="#666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
          </div>
          <div class="os-modal__field">
            <label class="os-modal__label">Vergi numarası <span class="os-modal__required">*</span></label>
            <input type="text" class="os-modal__input" placeholder="Vergi numaranızı girin" />
          </div>
          <div class="os-modal__field">
            <label class="os-modal__label">Tam kayıt adı <span class="os-modal__required">*</span></label>
            <input type="text" class="os-modal__input" placeholder="Tam kayıt adınızı girin" />
          </div>
        </div>
        <div class="os-modal__footer">
          <button class="os-modal__btn os-modal__btn--primary">Doğrula</button>
        </div>
      </div>
    </div>

    <!-- ═══ MODAL: Gümrük muayenesi bilgileri ═══ -->
    <div class="os-modal" id="customs-modal">
      <div class="os-modal__overlay"></div>
      <div class="os-modal__dialog">
        <div class="os-modal__header">
          <h3 class="os-modal__title">Gümrük muayenesi bilgileri</h3>
          <button class="os-modal__close" aria-label="Kapat">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="#666" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
        </div>
        <div class="os-modal__body">
          <div class="os-modal__info-banner">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#E8912D" stroke-width="1.5"/><path d="M8 5v3m0 2.5h.01" stroke="#E8912D" stroke-width="1.5" stroke-linecap="round"/></svg>
            <span>Vergi bilgileriniz, gümrük yetkilileri tarafından talep edilmektedir. Bu bir İşveren Kimlik Numarası (EIN) veya Sosyal Güvenlik Numarası (SSN) olabilir.</span>
          </div>

          <div class="os-modal__field">
            <label class="os-modal__label">Vergi mükellefi türü <span class="os-modal__required">*</span></label>
            <div class="os-modal__radio-group">
              <label class="os-modal__radio">
                <input type="radio" name="customs-type" value="business" checked />
                <span class="os-modal__radio-custom"></span>
                İşletme (Business)
              </label>
              <label class="os-modal__radio">
                <input type="radio" name="customs-type" value="personal" />
                <span class="os-modal__radio-custom"></span>
                Bireysel (Personal)
              </label>
            </div>
          </div>
          <div class="os-modal__field">
            <label class="os-modal__label">İşveren Kimlik Numarası (EIN) <span class="os-modal__required">*</span></label>
            <input type="text" class="os-modal__input" placeholder="EIN numaranızı girin" />
          </div>
          <div class="os-modal__privacy-note">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1a4 4 0 00-4 4v2H2a1 1 0 00-1 1v4a1 1 0 001 1h10a1 1 0 001-1V8a1 1 0 00-1-1h-1V5a4 4 0 00-4-4zm-2 4a2 2 0 114 0v2H5V5z" fill="#999"/></svg>
            <span>Gizlilik bilgilendirmesi: Bilgileriniz <a href="#" class="os-modal__link">Gizlilik Politikamız</a> uyarınca korunmaktadır.</span>
          </div>
          <label class="os-modal__checkbox">
            <input type="checkbox" />
            <span class="os-modal__checkbox-custom"></span>
            <span>Yukarıdaki bilgilerin doğru olduğunu ve vergi bilgilerimin gümrük işlemleri için kullanılabileceğini kabul ediyorum.</span>
          </label>
        </div>
        <div class="os-modal__footer os-modal__footer--split">
          <button class="os-modal__btn os-modal__btn--cancel">İptal et</button>
          <button class="os-modal__btn os-modal__btn--primary">Kaydet</button>
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
    const active = item.id === activeId ? 'orders-page__nav-link--active' : '';
    return `<a href="#${item.id}" class="orders-page__nav-link ${active}" data-nav="${item.id}">${item.label}</a>`;
  }).join('');
}

export function OrdersPageLayout(): string {
  const activeId = getActiveSection();
  const renderFn = SECTIONS[activeId] ?? renderAllOrders;

  return `
    <div class="orders-page">
      <aside class="orders-page__nav">
        <h2 class="orders-page__nav-title">Siparişlerim</h2>
        <nav class="orders-page__nav-links">
          ${renderNav(activeId)}
        </nav>
      </aside>
      <div class="orders-page__content" id="orders-content">
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
      link.classList.toggle('orders-page__nav-link--active', link.dataset.nav === activeId);
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
  modal.classList.add('os-modal--open');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal: HTMLElement): void {
  modal.classList.remove('os-modal--open');
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
      const openModal = document.querySelector<HTMLElement>('.os-modal--open');
      if (openModal) closeModal(openModal);
    }
  });
}
