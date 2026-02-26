/**
 * OtherServicesLayout Component
 * "Diğer hizmetlerim" section with sub-navigation:
 * - Esnek ödeme koşulları: 30/60 gün
 * - Ürün denetimi
 */

type ServiceId = 'payment-terms' | 'product-inspection';

interface ServiceNavItem {
  id: ServiceId;
  label: string;
}

const SERVICE_NAV: ServiceNavItem[] = [
  { id: 'payment-terms', label: 'Esnek ödeme koşulları: 30/60 gün' },
  { id: 'product-inspection', label: 'Ürün denetimi' },
];

function getActiveService(): ServiceId {
  const hash = window.location.hash.replace('#', '') as ServiceId;
  if (hash === 'payment-terms' || hash === 'product-inspection') return hash;
  return 'payment-terms';
}

function renderServiceNav(activeId: ServiceId): string {
  const items = SERVICE_NAV.map(
    (item) =>
      `<a href="#${item.id}" class="os-nav__item${item.id === activeId ? ' os-nav__item--active' : ''}" data-service="${item.id}">${item.label}</a>`
  ).join('');

  return `
    <div class="os-nav">
      <h3 class="os-nav__title">Diğer hizmetlerim</h3>
      ${items}
    </div>
  `;
}

function renderPaymentTerms(): string {
  return `
    <div class="os-content">
      <div class="os-notice">
        <div class="os-notice__icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="14" width="26" height="20" rx="3" fill="#E5E7EB"/>
            <rect x="8" y="16" width="22" height="16" rx="2" fill="#F3F4F6"/>
            <path d="M10 22h18M10 26h12" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M32 12c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v6" stroke="#6B7280" stroke-width="2" stroke-linecap="round"/>
            <path d="M30 18h12v4c0 1-1 2-2.5 3L36 27l-3.5-2c-1.5-1-2.5-2-2.5-3v-4z" fill="#6B7280"/>
            <circle cx="36" cy="22" r="1.5" fill="white"/>
            <path d="M34.5 18v-2M37.5 18v-2" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <h1 class="os-notice__title">Ödeme Koşulları Hizmeti Sonlandırma Bildirimi</h1>
        <p class="os-notice__subtitle">Sonlandırma tarihi: <strong>30 Aralık 2025</strong> (Pekin saati)</p>

        <div class="os-notice__card">
          <p class="os-notice__greeting">Sayın alıcılar,</p>

          <p class="os-notice__text">
            Devam eden ürün güncellemelerimizin bir parçası olarak Ödeme Koşulları hizmeti, Pekin saatiyle
            <strong>30 Aralık 2025</strong> tarihinden itibaren resmi olarak sonlandırılacaktır.
            <strong>Devam eden Ödeme Koşulları siparişleriniz varsa ödemelerinizi zamanında yapmanız gerekir.</strong>
          </p>

          <p class="os-notice__text">
            Yaşanan herhangi bir aksaklıktan dolayı içtenlikle özür dileriz ve daha iyi çözümler sunmak için
            çalışırken gösterdiğiniz anlayış için minnettarız. Hâlâ ödeme çözümü hizmetlerine ihtiyacınız varsa
            <strong>Buy Now Pay Later</strong> veya <strong>Pay Later for Business</strong> ödeme seçeneklerini
            değerlendirebilirsiniz. Daha fazla bilgi edinmek için <a href="/payment.html#pay-later" class="os-notice__link">buraya</a> tıklayın.
          </p>

          <p class="os-notice__text">Sürekli desteğiniz için teşekkür ederiz!</p>

          <div class="os-notice__signature">
            <p>Saygılarımızla,</p>
            <p>Alibaba.com Ödeme Koşulları Ekibi</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderProductInspection(): string {
  return `
    <div class="os-content">
      <div class="os-notice">
        <div class="os-notice__icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="6" width="28" height="36" rx="3" stroke="#6B7280" stroke-width="2" fill="none"/>
            <path d="M18 16h12M18 22h12M18 28h8" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"/>
            <circle cx="36" cy="36" r="8" fill="#F3F4F6" stroke="#6B7280" stroke-width="2"/>
            <path d="M33 36l2 2 4-4" stroke="#22C55E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h1 class="os-notice__title">Ürün Denetimi Hizmeti</h1>
        <p class="os-notice__subtitle">Tedarikçi ürünlerinizi profesyonel olarak denetletin</p>

        <div class="os-notice__card">
          <p class="os-notice__greeting">Sayın alıcılar,</p>
          <p class="os-notice__text">
            Ürün denetimi hizmetimiz ile siparişlerinizin kalitesini sevkiyat öncesinde profesyonel denetçiler
            aracılığıyla kontrol ettirebilirsiniz. Bu hizmet şu anda yapılandırılmaktadır.
          </p>
          <p class="os-notice__text">
            Denetim hizmeti hakkında daha fazla bilgi almak için müşteri hizmetlerimize başvurabilirsiniz.
          </p>
          <div class="os-notice__signature">
            <p>Saygılarımızla,</p>
            <p>Alibaba.com Kalite Denetim Ekibi</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

const SERVICE_RENDERERS: Record<ServiceId, () => string> = {
  'payment-terms': renderPaymentTerms,
  'product-inspection': renderProductInspection,
};

export function OtherServicesLayout(): string {
  const activeId = getActiveService();

  return `
    <div class="os-layout">
      ${renderServiceNav(activeId)}
      ${SERVICE_RENDERERS[activeId]()}
    </div>
  `;
}

export function initOtherServicesLayout(): void {
  const navItems = document.querySelectorAll<HTMLAnchorElement>('.os-nav__item');
  if (!navItems.length) return;

  function navigate(): void {
    const activeId = getActiveService();
    const contentEl = document.querySelector('.os-content');
    if (contentEl) {
      contentEl.outerHTML = SERVICE_RENDERERS[activeId]();
    }

    // Update nav active state
    document.querySelectorAll('.os-nav__item').forEach((link) => {
      const service = link.getAttribute('data-service');
      link.classList.toggle('os-nav__item--active', service === activeId);
    });
  }

  window.addEventListener('hashchange', navigate);
}
