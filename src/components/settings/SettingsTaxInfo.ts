/**
 * SettingsTaxInfo Component
 * Tax information page with tabs.
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
    <div class="flex items-center justify-between gap-6 p-6 border border-border-default rounded-lg max-md:flex-col max-md:items-start">
      <div class="flex-1 min-w-0">
        <h3 class="text-[15px] font-bold mb-2 m-0" style="color:var(--color-text-heading, #111827)">${section.title}</h3>
        <p class="text-[13px] leading-normal m-0" style="color:var(--color-text-muted, #666666)">${section.description}</p>
      </div>
      <button class="py-2.5 px-6 border border-(--color-text-heading) rounded-[20px] bg-white text-[13px] font-medium whitespace-nowrap cursor-pointer transition-all flex-shrink-0 hover:bg-surface-raised" style="color:var(--color-text-heading, #111827)" type="button">${section.buttonLabel}</button>
    </div>
  `;
}

function renderFaqCard(faq: FaqItem): string {
  return `
    <div class="p-5 border border-border-default rounded-lg">
      <h4 class="text-sm font-bold mb-2 m-0" style="color:var(--color-text-heading, #111827)">${faq.title}</h4>
      <p class="text-[13px] leading-normal mb-2 m-0" style="color:var(--color-text-muted, #666666)">${faq.description}</p>
      ${faq.linkText ? `<a href="#" class="text-[13px] text-blue-600 underline">${faq.linkText}</a>` : ''}
    </div>
  `;
}

export function SettingsTaxInfo(sections?: TaxSection[], faqs?: FaqItem[]): string {
  const taxSections = sections || defaultSections;
  const faqItems = faqs || defaultFaqs;

  return `
    <div class="bg-white rounded-lg p-8 max-md:p-5">
      <h2 class="text-xl font-bold mb-5 m-0" style="color:var(--color-text-heading, #111827)">Information</h2>

      <div class="flex border-b-2 border-border-default mb-5">
        <button class="tax-info__tab py-2.5 px-5 text-sm font-medium bg-none border-none border-b-2 -mb-[2px] cursor-pointer transition-all" style="color:var(--color-text-heading, #111827); border-bottom-color:var(--color-text-heading)" data-tab="vergi">Vergi Bilgileri</button>
        <button class="tax-info__tab py-2.5 px-5 text-sm font-medium bg-none border-none border-b-2 border-transparent -mb-[2px] cursor-pointer transition-all" style="color:var(--color-text-muted, #666666)" data-tab="gumruk">Gümrük muayenesi bilgileri</button>
      </div>

      <div class="flex items-center gap-2.5 py-3 px-4 bg-blue-50 rounded-md text-[13px] text-blue-800 mb-6 flex-wrap">
        <span class="flex-shrink-0">${ICONS.info}</span>
        <span>Vergiden muaf statüsü elde edin. Yeniden satış veya üretim için ürün satın alıyorsanız vergi muafiyetinin doğrulanması amacıyla vergi bilgilerinizi gönderin.</span>
        <a href="#" class="text-blue-600 font-medium no-underline ml-auto hover:underline">Daha fazla bilgi edinin</a>
      </div>

      <div class="flex flex-col gap-4 mb-8" id="tax-tab-vergi">
        ${taxSections.map(renderTaxSection).join('')}
      </div>

      <div class="flex flex-col gap-4 mb-8" id="tax-tab-gumruk" style="display:none">
        <div class="p-10 text-center text-sm" style="color:var(--color-text-placeholder, #999999)">Gümrük muayenesi bilgileri burada görüntülenecek.</div>
      </div>

      <h3 class="text-lg font-bold mb-4 m-0" style="color:var(--color-text-heading, #111827)">Sıkça Sorulan Sorular</h3>
      <div class="grid grid-cols-3 gap-4 max-md:grid-cols-1">
        ${faqItems.map(renderFaqCard).join('')}
      </div>
    </div>
  `;
}

export function initSettingsTaxInfo(): void {
  const tabs = document.querySelectorAll<HTMLButtonElement>('.tax-info__tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.style.color = 'var(--color-text-muted, #666666)';
        t.style.borderBottomColor = 'transparent';
      });
      tab.style.color = 'var(--color-text-heading, #111827)';
      tab.style.borderBottomColor = 'var(--color-text-heading)';
      const target = tab.dataset.tab;
      document.getElementById('tax-tab-vergi')!.style.display = target === 'vergi' ? '' : 'none';
      document.getElementById('tax-tab-gumruk')!.style.display = target === 'gumruk' ? '' : 'none';
    });
  });
}
