/**
 * SubscriptionLayout Component
 * Two views: main dashboard (AI Modu overview + invoice history)
 * and plan selection (pricing cards + FAQ).
 */

/* ────────────────────────────────────────
   EMPTY RECEIPT ICON
   ──────────────────────────────────────── */
const EMPTY_INVOICE_ICON = `
<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
  <rect x="10" y="4" width="28" height="36" rx="3" fill="#E5E7EB" stroke="#D1D5DB" stroke-width="1"/>
  <rect x="16" y="12" width="16" height="2.5" rx="1.25" fill="#D1D5DB"/>
  <rect x="16" y="18" width="12" height="2.5" rx="1.25" fill="#D1D5DB"/>
  <rect x="16" y="24" width="14" height="2.5" rx="1.25" fill="#D1D5DB"/>
  <path d="M10 40l3-2.5 3 2.5 3-2.5 3 2.5 3-2.5 3 2.5 3-2.5 3 2.5V4H10v36z" fill="#E5E7EB"/>
</svg>`;

/* ────────────────────────────────────────
   PLAN DATA
   ──────────────────────────────────────── */
interface PlanFeature {
  icon: 'sparkle' | 'check';
  text: string;
  bold?: string;
}

interface Plan {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  yearlyTotal: string;
  billingNote?: string;
  popular?: boolean;
  currentPlan?: boolean;
  features: PlanFeature[];
}

const PLANS: Plan[] = [
  {
    name: 'Free',
    monthlyPrice: '$0.00',
    yearlyPrice: '$0.00',
    yearlyTotal: '',
    currentPlan: true,
    features: [
      { icon: 'sparkle', text: 'AI Modu sorgu hakkı', bold: 'Günde 3' },
      { icon: 'check', text: 'Sınırsız sorgu' },
      { icon: 'check', text: 'Standart işleme hızı' },
    ],
  },
  {
    name: 'Starter',
    monthlyPrice: '$9.9',
    yearlyPrice: '$4.95',
    yearlyTotal: 'Yılda $59.40, yıllık faturalandırılır',
    billingNote: 'Aylık faturalandırılır',
    features: [
      { icon: 'sparkle', text: 'AI Modu görevi', bold: 'Ayda 200' },
      { icon: 'check', text: 'Sınırsız sorgu' },
      { icon: 'check', text: 'Daha hızlı işleme hızı' },
      { icon: 'check', text: 'Ortak verilerine özel erişim' },
      { icon: 'check', text: 'Ürün tasarımı oluşturma' },
      { icon: 'check', text: 'Trend ve çok satan analizi' },
      { icon: 'check', text: 'Öncelikli destek' },
    ],
  },
  {
    name: 'Pro',
    monthlyPrice: '$19.9',
    yearlyPrice: '$9.95',
    yearlyTotal: 'Yılda $119.40, yıllık faturalandırılır',
    billingNote: 'Aylık faturalandırılır',
    popular: true,
    features: [
      { icon: 'sparkle', text: 'AI Modu görevi', bold: 'Ayda 400' },
      { icon: 'check', text: 'Sınırsız sorgu' },
      { icon: 'check', text: 'Premium işleme hızı' },
      { icon: 'check', text: 'Ortak verilerine özel erişim' },
      { icon: 'check', text: 'Ürün tasarımı oluşturma' },
      { icon: 'check', text: 'Trend ve çok satan analizi' },
      { icon: 'check', text: 'Yeni özelliklere erken erişim' },
      { icon: 'check', text: 'Öncelikli destek' },
    ],
  },
];

const FAQ_ITEMS = [
  { q: 'Bugün ücretlendirilecek miyim?', a: 'Hayır, 3 günlük ücretsiz deneme süreniz boyunca herhangi bir ücret yansıtılmaz. Deneme süresi sonunda otomatik olarak seçtiğiniz plan üzerinden faturalandırılırsınız.' },
  { q: 'Faturalandırma nasıl yapılır?', a: 'Aylık veya yıllık faturalandırma seçenekleri mevcuttur. Yıllık planda %50 tasarruf sağlarsınız. Faturalar her dönem başında otomatik olarak kesilir.' },
  { q: 'Planımı değiştirebilir miyim?', a: 'Evet, istediğiniz zaman planınızı yükseltebilir veya düşürebilirsiniz. Değişiklikler bir sonraki fatura döneminde geçerli olur.' },
  { q: 'İptal edersem ne olur?', a: 'Mevcut fatura döneminin sonuna kadar tüm özelliklerden faydalanmaya devam edersiniz. Dönem sonunda Free plana otomatik geçiş yapılır.' },
];

/* ────────────────────────────────────────
   SVG ICONS
   ──────────────────────────────────────── */
const SPARKLE_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1l1.5 4.5L14 7l-4.5 1.5L8 13l-1.5-4.5L2 7l4.5-1.5L8 1z" stroke="#F97316" stroke-width="1.2" stroke-linejoin="round"/></svg>`;
const CHECK_ICON = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3.5 3.5L13 5" stroke="#222" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/* ────────────────────────────────────────
   VIEW RENDERERS
   ──────────────────────────────────────── */

function renderMainView(): string {
  return `
    <!-- Header -->
    <div class="sub-header">
      <h1 class="sub-header__title">AI Modu</h1>
      <button class="sub-header__manage-btn" id="sub-manage-btn">Planı yönet</button>
    </div>

    <!-- Current Plan Card -->
    <div class="sub-plan-card">
      <div class="sub-plan-card__top">
        <span class="sub-plan-card__name">Free</span>
        <div class="sub-plan-card__quota">
          <span>AI Modu görevleri (günlük sıfırlanır)</span>
          <span class="sub-plan-card__quota-num">3</span>
        </div>
      </div>
      <div class="sub-plan-card__banner">
        <span>Yükseltmeden önce <strong>AI Modunu</strong> ücretsiz deneyin!</span>
        <button class="sub-plan-card__banner-btn" id="sub-try-btn">AI Modunu ücretsiz deneyin</button>
      </div>
    </div>

    <!-- Invoice History -->
    <h2 class="sub-section-title">Fatura geçmişi</h2>
    <div class="sub-invoice-table-wrap">
      <table class="sub-invoice-table">
        <thead>
          <tr>
            <th>Tarih</th>
            <th>Açıklama</th>
            <th>Ödeme yöntemi</th>
            <th>Durum</th>
            <th>Tutar</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="6" class="sub-invoice-table__empty">
              ${EMPTY_INVOICE_ICON}
              <p>Henüz fatura yok</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function renderFeatureItem(f: PlanFeature): string {
  const icon = f.icon === 'sparkle' ? SPARKLE_ICON : CHECK_ICON;
  const text = f.bold ? `${f.bold} ${f.text}` : f.text;
  return `<li class="sub-pricing__feature"><span class="sub-pricing__feature-icon">${icon}</span><span>${text}</span></li>`;
}

function renderPlanCard(plan: Plan, isYearly: boolean): string {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const billing = isYearly && plan.yearlyTotal ? plan.yearlyTotal : (plan.billingNote ?? '');
  const popularBadge = plan.popular ? '<span class="sub-pricing__badge">Popüler</span>' : '';
  const cardClass = plan.popular ? 'sub-pricing__card sub-pricing__card--popular' : 'sub-pricing__card';

  let btnHtml: string;
  if (plan.currentPlan) {
    btnHtml = '<button class="sub-pricing__btn sub-pricing__btn--current" disabled>Güncel plan</button>';
  } else if (plan.popular) {
    btnHtml = '<button class="sub-pricing__btn sub-pricing__btn--primary">3 günlük ücretsiz denemeyi başlat</button>';
  } else {
    btnHtml = '<button class="sub-pricing__btn sub-pricing__btn--dark">3 günlük ücretsiz denemeyi başlat</button>';
  }

  return `
    <div class="${cardClass}">
      <div class="sub-pricing__card-header">
        <div class="sub-pricing__card-name-row">
          <h3 class="sub-pricing__card-name">${plan.name}</h3>
          ${popularBadge}
        </div>
        <div class="sub-pricing__card-price">
          <span class="sub-pricing__price-amount">${price}</span>
          <span class="sub-pricing__price-period">/ aylık</span>
        </div>
        ${billing ? `<p class="sub-pricing__billing-note">${billing}</p>` : ''}
      </div>
      <div class="sub-pricing__card-action">
        ${btnHtml}
      </div>
      <ul class="sub-pricing__features">
        ${plan.features.map(f => renderFeatureItem(f)).join('')}
      </ul>
    </div>
  `;
}

function renderPricingView(): string {
  const cards = PLANS.map(p => renderPlanCard(p, false)).join('');
  const faqItems = FAQ_ITEMS.map(item => `
    <details class="sub-faq__item">
      <summary>${item.q}</summary>
      <p>${item.a}</p>
    </details>
  `).join('');

  return `
    <!-- Back + Title -->
    <div class="sub-pricing-header">
      <button class="sub-pricing-header__back" id="sub-back-btn" aria-label="Geri">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 4l-6 6 6 6" stroke="#222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <h1 class="sub-pricing-header__title">AI Modu ile saniyeler içinde daha iyi tedarikçi eşleşmeleri bulun</h1>
    </div>

    <!-- Billing Toggle -->
    <div class="sub-billing-toggle">
      <button class="sub-billing-toggle__btn sub-billing-toggle__btn--active" data-billing="monthly">Aylık</button>
      <button class="sub-billing-toggle__btn" data-billing="yearly">Yıllık <span class="sub-billing-toggle__save">50% kazanç</span></button>
    </div>

    <!-- Pricing Cards -->
    <div class="sub-pricing-grid" id="sub-pricing-grid">
      ${cards}
    </div>

    <!-- FAQ -->
    <div class="sub-faq">
      <div class="sub-faq__header">
        <h2 class="sub-faq__title">Sık sorulan sorular</h2>
        <a href="#" class="sub-faq__help">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#666" stroke-width="1.2"/><path d="M6.5 6.5a1.5 1.5 0 113 0c0 .83-.67 1-1.5 1.5M8 11.5h.01" stroke="#666" stroke-width="1.2" stroke-linecap="round"/></svg>
          Yardım Al
        </a>
      </div>
      ${faqItems}
    </div>
  `;
}

/* ────────────────────────────────────────
   MAIN LAYOUT
   ──────────────────────────────────────── */
export function SubscriptionLayout(): string {
  return `
    <div class="sub-page" id="sub-content">
      ${renderMainView()}
    </div>
  `;
}

/* ────────────────────────────────────────
   INIT
   ──────────────────────────────────────── */
export function initSubscriptionLayout(): void {
  const contentEl = document.getElementById('sub-content');
  if (!contentEl) return;

  function showMain(): void {
    contentEl!.innerHTML = renderMainView();
    bindMainEvents();
  }

  function showPricing(): void {
    contentEl!.innerHTML = renderPricingView();
    bindPricingEvents();
  }

  function bindMainEvents(): void {
    document.getElementById('sub-manage-btn')?.addEventListener('click', showPricing);
    document.getElementById('sub-try-btn')?.addEventListener('click', showPricing);
  }

  function bindPricingEvents(): void {
    // Back button
    document.getElementById('sub-back-btn')?.addEventListener('click', showMain);

    // Billing toggle
    const toggleBtns = document.querySelectorAll<HTMLButtonElement>('.sub-billing-toggle__btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const isYearly = btn.dataset.billing === 'yearly';
        toggleBtns.forEach(b => b.classList.remove('sub-billing-toggle__btn--active'));
        btn.classList.add('sub-billing-toggle__btn--active');

        // Re-render pricing cards
        const grid = document.getElementById('sub-pricing-grid');
        if (grid) {
          grid.innerHTML = PLANS.map(p => renderPlanCard(p, isYearly)).join('');
        }
      });
    });
  }

  // Init main view events
  bindMainEvents();
}
