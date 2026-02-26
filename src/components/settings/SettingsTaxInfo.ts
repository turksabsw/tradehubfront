/**
 * SettingsTaxInfo Component
 * Tax information page with tabs (Vergi Bilgileri / Gümrük muayenesi bilgileri).
 */

const ICONS = {
  info: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#2563eb" stroke-width="1.2"/><path d="M8 7v4M8 5h0" stroke="#2563eb" stroke-width="1.5" stroke-linecap="round"/></svg>`,
};

export interface TaxSection {
  title: string;
  description: string;
  buttonLabel: string;
}

const defaultSections: TaxSection[] = [
  {
    title: 'ABD satış vergisi muafiyeti için',
    description: 'Yeniden satış veya üretim için ürün satın alıyorsanız doğrulanması için vergi bilgilerinizi gönderin ve Alibaba.com\'da vergiden muaf siparişler verin.',
    buttonLabel: 'Vergi muafiyeti ekleyin veya değiştirin',
  },
  {
    title: 'AB/Norveç/Birleşik Krallık/İsviçre veya Avustralya/Yeni Zelanda/Singapur/Şili vergi bilgisi gönderimi',
    description: 'AB/Norveç/Birleşik Krallık/İsviçre veya Avustralya/Yeni Zelanda/Singapur/Şili ülkelerindeki ticari satın alımlarda, doğrulanması için vergi bilgilerinizi göndererek Alibaba.com\'da vergiden muaf siparişler verebilirsiniz. İsviçre\'deki ticari satın alımlarda vergi düzenlemelerine uymak için KDV numaranızı buradan gönderin.',
    buttonLabel: 'Vergi bilgilerinizi ekleyin',
  },
  {
    title: 'Kanada PST vergi muafiyeti için',
    description: 'Yeniden satış veya üretim için ürün satın alıyorsanız doğrulanması için vergi bilgilerinizi gönderin ve Alibaba.com\'da vergiden muaf siparişler verin.',
    buttonLabel: 'PST bilgisini ekle',
  },
];

export interface FaqItem {
  title: string;
  description: string;
  linkText?: string;
}

const defaultFaqs: FaqItem[] = [
  {
    title: 'Vergi bilgilerim yoksa ne yapmalıyım?',
    description: 'Yerel vergi kurumunuzun web sitesini kontrol ederek vergi muafiyeti için uygunluk kriterlerinizi inceleyin. Uygunluk şartlarını sağlıyorsanız, vergi kurumundan vergi muafiyeti belgenizi alıp, bu sayfa üzerinden göndererek vergi muafiyetine sahip bir alıcı olabilirsiniz.',
    linkText: 'Daha fazlası',
  },
  {
    title: 'Vergi bilgilerim neden onaylanmadı?',
    description: 'Check whether your tax information has expired or if you have provided incorrect information to us.',
    linkText: 'Learn more',
  },
  {
    title: 'Vergi iadesi için nasıl başvurabilirim?',
    description: 'You can receive a tax refund if your tax information has been submitted and verified before your order has shipped.',
    linkText: 'View more',
  },
];

function renderTaxSection(section: TaxSection): string {
  return `
    <div class="tax-info__section">
      <div class="tax-info__section-content">
        <h3 class="tax-info__section-title">${section.title}</h3>
        <p class="tax-info__section-desc">${section.description}</p>
      </div>
      <button class="tax-info__section-btn" type="button">${section.buttonLabel}</button>
    </div>
  `;
}

function renderFaqCard(faq: FaqItem): string {
  return `
    <div class="tax-info__faq-card">
      <h4 class="tax-info__faq-title">${faq.title}</h4>
      <p class="tax-info__faq-desc">${faq.description}</p>
      ${faq.linkText ? `<a href="#" class="tax-info__faq-link">${faq.linkText}</a>` : ''}
    </div>
  `;
}

export function SettingsTaxInfo(sections?: TaxSection[], faqs?: FaqItem[]): string {
  const taxSections = sections || defaultSections;
  const faqItems = faqs || defaultFaqs;

  return `
    <div class="tax-info">
      <h2 class="tax-info__title">Information</h2>

      <div class="tax-info__tabs">
        <button class="tax-info__tab tax-info__tab--active" data-tab="vergi">Vergi Bilgileri</button>
        <button class="tax-info__tab" data-tab="gumruk">Gümrük muayenesi bilgileri</button>
      </div>

      <div class="tax-info__alert">
        ${ICONS.info}
        <span>Vergiden muaf statüsü elde edin. Yeniden satış veya üretim için ürün satın alıyorsanız vergi muafiyetinin doğrulanması amacıyla vergi bilgilerinizi gönderin.</span>
        <a href="#" class="tax-info__alert-link">Daha fazla bilgi edinin</a>
      </div>

      <div class="tax-info__sections" id="tax-tab-vergi">
        ${taxSections.map(renderTaxSection).join('')}
      </div>

      <div class="tax-info__sections" id="tax-tab-gumruk" style="display:none">
        <div class="tax-info__empty">Gümrük muayenesi bilgileri burada görüntülenecek.</div>
      </div>

      <h3 class="tax-info__faq-heading">Sıkça Sorulan Sorular</h3>
      <div class="tax-info__faq-grid">
        ${faqItems.map(renderFaqCard).join('')}
      </div>
    </div>
  `;
}

export function initSettingsTaxInfo(): void {
  const tabs = document.querySelectorAll<HTMLButtonElement>('.tax-info__tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('tax-info__tab--active'));
      tab.classList.add('tax-info__tab--active');
      const target = tab.dataset.tab;
      document.getElementById('tax-tab-vergi')!.style.display = target === 'vergi' ? '' : 'none';
      document.getElementById('tax-tab-gumruk')!.style.display = target === 'gumruk' ? '' : 'none';
    });
  });
}
