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
    (item) => {
      const isActive = item.id === activeId;
      const activeClasses = isActive
        ? 'os-nav__item--active bg-blue-50 text-gray-800 font-semibold border-l-blue-600 max-md:border-l-transparent max-md:border-b-blue-600'
        : 'border-l-transparent max-md:border-b-transparent hover:bg-[#fafafa] hover:text-gray-800';
      return `<a href="#${item.id}" class="os-nav__item block py-2.5 px-4 text-[13px] no-underline border-l-[3px] max-md:border-l-0 max-md:border-b-2 transition-all ${activeClasses}" style="color:var(--color-text-muted, #666666)" data-service="${item.id}">${item.label}</a>`;
    }
  ).join('');

  return `
    <div class="w-60 flex-shrink-0 bg-white rounded-lg overflow-hidden max-md:w-full max-md:flex max-md:flex-wrap max-md:items-center">
      <h3 class="text-[15px] font-bold text-gray-800 py-4 px-4 pb-3 m-0 max-md:w-full max-md:py-3 max-md:pb-2">Diğer hizmetlerim</h3>
      ${items}
    </div>
  `;
}

function renderPaymentTerms(): string {
  return `
    <div class="os-content flex-1 min-w-0">
      <div class="bg-white rounded-lg py-12 px-10 text-center max-md:py-8 max-md:px-5">
        <div class="mb-5">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="inline-block">
            <rect x="6" y="14" width="26" height="20" rx="3" fill="#E5E7EB"/>
            <rect x="8" y="16" width="22" height="16" rx="2" fill="#F3F4F6"/>
            <path d="M10 22h18M10 26h12" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M32 12c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v6" stroke="#6B7280" stroke-width="2" stroke-linecap="round"/>
            <path d="M30 18h12v4c0 1-1 2-2.5 3L36 27l-3.5-2c-1.5-1-2.5-2-2.5-3v-4z" fill="#6B7280"/>
            <circle cx="36" cy="22" r="1.5" fill="white"/>
            <path d="M34.5 18v-2M37.5 18v-2" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <h1 class="text-xl font-bold text-gray-800 mb-2">Ödeme Koşulları Hizmeti Sonlandırma Bildirimi</h1>
        <p class="text-sm mb-8" style="color:var(--color-text-muted, #666666)">Sonlandırma tarihi: <strong class="text-gray-800">30 Aralık 2025</strong> (Pekin saati)</p>

        <div class="max-w-[760px] mx-auto text-left bg-white border border-gray-200 rounded-lg p-8 max-md:p-5">
          <p class="text-sm mb-4" style="color:var(--color-text-body, #333333)">Sayın alıcılar,</p>

          <p class="text-sm leading-[1.7] mb-4" style="color:var(--color-text-body, #333333)">
            Devam eden ürün güncellemelerimizin bir parçası olarak Ödeme Koşulları hizmeti, Pekin saatiyle
            <strong class="text-gray-900 font-bold">30 Aralık 2025</strong> tarihinden itibaren resmi olarak sonlandırılacaktır.
            <strong class="text-gray-900 font-bold">Devam eden Ödeme Koşulları siparişleriniz varsa ödemelerinizi zamanında yapmanız gerekir.</strong>
          </p>

          <p class="text-sm leading-[1.7] mb-4" style="color:var(--color-text-body, #333333)">
            Yaşanan herhangi bir aksaklıktan dolayı içtenlikle özür dileriz ve daha iyi çözümler sunmak için
            çalışırken gösterdiğiniz anlayış için minnettarız. Hâlâ ödeme çözümü hizmetlerine ihtiyacınız varsa
            <strong class="text-gray-900 font-bold">Buy Now Pay Later</strong> veya <strong class="text-gray-900 font-bold">Pay Later for Business</strong> ödeme seçeneklerini
            değerlendirebilirsiniz. Daha fazla bilgi edinmek için <a href="/payment.html#pay-later" class="text-blue-600 underline underline-offset-2 font-medium hover:text-blue-700">buraya</a> tıklayın.
          </p>

          <p class="text-sm leading-[1.7] mb-4" style="color:var(--color-text-body, #333333)">Sürekli desteğiniz için teşekkür ederiz!</p>

          <div class="mt-6 text-sm leading-relaxed" style="color:var(--color-text-body, #333333)">
            <p class="m-0">Saygılarımızla,</p>
            <p class="m-0">Alibaba.com Ödeme Koşulları Ekibi</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderProductInspection(): string {
  return `
    <div class="os-content flex-1 min-w-0">
      <div class="bg-white rounded-lg py-12 px-10 text-center max-md:py-8 max-md:px-5">
        <div class="mb-5">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="inline-block">
            <rect x="10" y="6" width="28" height="36" rx="3" stroke="#6B7280" stroke-width="2" fill="none"/>
            <path d="M18 16h12M18 22h12M18 28h8" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"/>
            <circle cx="36" cy="36" r="8" fill="#F3F4F6" stroke="#6B7280" stroke-width="2"/>
            <path d="M33 36l2 2 4-4" stroke="#22C55E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h1 class="text-xl font-bold text-gray-800 mb-2">Ürün Denetimi Hizmeti</h1>
        <p class="text-sm mb-8" style="color:var(--color-text-muted, #666666)">Tedarikçi ürünlerinizi profesyonel olarak denetletin</p>

        <div class="max-w-[760px] mx-auto text-left bg-white border border-gray-200 rounded-lg p-8 max-md:p-5">
          <p class="text-sm mb-4" style="color:var(--color-text-body, #333333)">Sayın alıcılar,</p>
          <p class="text-sm leading-[1.7] mb-4" style="color:var(--color-text-body, #333333)">
            Ürün denetimi hizmetimiz ile siparişlerinizin kalitesini sevkiyat öncesinde profesyonel denetçiler
            aracılığıyla kontrol ettirebilirsiniz. Bu hizmet şu anda yapılandırılmaktadır.
          </p>
          <p class="text-sm leading-[1.7] mb-4" style="color:var(--color-text-body, #333333)">
            Denetim hizmeti hakkında daha fazla bilgi almak için müşteri hizmetlerimize başvurabilirsiniz.
          </p>
          <div class="mt-6 text-sm leading-relaxed" style="color:var(--color-text-body, #333333)">
            <p class="m-0">Saygılarımızla,</p>
            <p class="m-0">Alibaba.com Kalite Denetim Ekibi</p>
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
    <div class="flex gap-6 py-4 items-start max-md:flex-col max-md:gap-4">
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
      const isActive = service === activeId;
      link.classList.toggle('os-nav__item--active', isActive);
      link.classList.toggle('bg-blue-50', isActive);
      link.classList.toggle('font-semibold', isActive);
      link.classList.toggle('border-l-blue-600', isActive);
      link.classList.toggle('border-l-transparent', !isActive);
    });
  }

  window.addEventListener('hashchange', navigate);
}
