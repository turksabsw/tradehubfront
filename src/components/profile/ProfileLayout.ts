/**
 * ProfileLayout Component
 * Profile page with cover image, profile card, and info sections.
 */

// ── SVG Icons ────────────────────────────────────────────────────

const ICONS = {
  edit: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10.5 1.5l2 2L4.5 11.5H2.5v-2l8-8z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  link: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.5 8.5l3-3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M6 9.5l-1.3 1.3a1.5 1.5 0 01-2.1-2.1L4 7.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M8 4.5l1.3-1.3a1.5 1.5 0 012.1 2.1L10 6.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`,
  eye: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.2"/></svg>`,
  verified: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="#22c55e"/><path d="M4.5 7l2 2 3.5-3.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  flag: `<svg width="16" height="12" viewBox="0 0 16 12"><rect width="16" height="4" fill="#E30A17"/><rect y="4" width="16" height="4" fill="#fff"/><rect y="8" width="16" height="4" fill="#E30A17"/></svg>`,
};

// ── Profile Info Data ────────────────────────────────────────────

interface InfoField {
  label: string;
  value: string;
  isVerified?: boolean;
  isLink?: boolean;
}

interface InfoSection {
  title: string;
  fields: InfoField[];
}

const contactInfo: InfoSection = {
  title: 'İletişim Bilgileri',
  fields: [
    { label: 'E-posta', value: 'met***@gmail.com', isVerified: true },
    { label: 'Alternatif E-posta', value: 'Yok' },
    { label: 'Sosyal Bağlantılar', value: 'Yok' },
    { label: 'Faks', value: 'Yok' },
    { label: 'Telefon', value: 'Yok' },
    { label: 'Mobil', value: 'Yok' },
  ],
};

const companyInfo: InfoSection = {
  title: 'Şirket Bilgileri',
  fields: [
    { label: 'Şirket Adı', value: 'Metin K.' },
    { label: 'Kuruluş Yılı', value: 'Yok' },
    { label: 'Resmi Web Sitesi', value: 'Yok' },
    { label: 'İşletme Türü', value: 'Yok' },
    { label: 'Toplam Çalışan', value: 'Yok' },
    { label: 'Vergi Bilgileri', value: 'Görüntüle', isLink: true },
    { label: 'Satış Platformları', value: 'Yok' },
    { label: 'Ana Ürünler', value: 'Yok' },
    { label: 'Kayıtlı Adres', value: 'TR' },
    { label: 'Operasyonel Adres', value: 'Yok' },
    { label: 'Hakkımızda', value: 'Yok' },
  ],
};

const sourcingInfo: InfoSection = {
  title: 'Tedarik Bilgileri',
  fields: [
    { label: 'Yıllık Satın Alma Hacmi', value: 'Yok' },
    { label: 'Birincil Tedarik Amacı', value: 'Yok' },
    { label: 'Ortalama Tedarik Sıklığı', value: 'Yok' },
    { label: 'Tercih Edilen Tedarikçi Konumu', value: 'Yok' },
    { label: 'Tercih Edilen Endüstriler', value: 'Yok' },
  ],
};

// ── Renderers ────────────────────────────────────────────────────

function renderInfoField(field: InfoField): string {
  const isEmpty = field.value === 'Yok';

  let valueHtml = field.value;
  if (field.isVerified) {
    valueHtml = `${field.value} <span class="inline-flex items-center gap-[3px] text-xs font-medium text-green-500">${ICONS.verified} Doğrulandı</span>`;
  }
  if (field.isLink && !isEmpty) {
    valueHtml = `<a href="#" class="text-blue-600 no-underline font-medium hover:underline">${field.value}</a>`;
  }

  return `
    <div class="text-[13px] py-1.5" style="color:var(--color-text-placeholder, #999999)">${field.label}</div>
    <div class="text-[13px] py-1.5 flex items-center gap-1.5" style="color:${isEmpty ? 'var(--color-text-placeholder, #999999)' : 'var(--color-text-heading, #111827)'}">${valueHtml}</div>
  `;
}

function renderInfoSection(section: InfoSection): string {
  return `
    <div class="bg-white rounded-lg py-6 px-8 max-md:p-5 max-sm:p-4">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-bold m-0" style="color:var(--color-text-heading, #111827)">${section.title}</h3>
        <a href="#" class="inline-flex items-center gap-1 text-[13px] text-blue-600 no-underline font-medium transition-colors hover:text-blue-700">
          ${ICONS.edit}
          <span>Düzenle</span>
        </a>
      </div>
      <div class="h-px bg-gray-200 my-4"></div>
      <div class="grid grid-cols-2 gap-x-8 gap-y-3 max-md:grid-cols-1 max-md:gap-y-1">
        ${section.fields.map(renderInfoField).join('')}
      </div>
    </div>
  `;
}

function renderCover(): string {
  return `
    <div class="w-full h-[180px] rounded-t-lg overflow-hidden bg-gray-200 max-md:h-[120px]">
      <img
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=360&fit=crop&crop=center"
        alt="Kapak fotoğrafı"
        class="w-full h-full object-cover"
      />
    </div>
  `;
}

function renderProfileCard(): string {
  return `
    <div class="flex items-start justify-between gap-6 bg-white rounded-b-lg py-6 px-8 -mt-px max-md:flex-col max-md:p-5 max-md:gap-4">
      <div class="flex gap-5 flex-1 min-w-0 max-md:flex-col max-md:items-start">
        <div class="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 -mt-10 border-3 border-white shadow-md max-md:w-16 max-md:h-16 max-md:-mt-8" style="background:var(--color-border-medium)">
          <span class="text-4xl font-bold text-white lowercase leading-none max-md:text-[28px]">m</span>
        </div>
        <div class="flex flex-col gap-1 min-w-0">
          <div class="flex items-center gap-2">
            <h1 class="text-xl font-bold m-0 max-sm:text-[17px]" style="color:var(--color-text-heading, #111827)">Metin K.</h1>
            <a href="#" class="inline-flex items-center justify-center w-7 h-7 rounded transition-all hover:bg-surface-raised" style="color:var(--color-text-placeholder, #999999)" title="Profil bağlantısını kopyala">${ICONS.link}</a>
          </div>
          <div class="flex items-center gap-1.5 text-[13px]" style="color:var(--color-text-muted, #666666)">
            <span class="inline-flex items-center">${ICONS.flag}</span>
            <span>TR</span>
          </div>
          <div class="text-[13px]" style="color:var(--color-text-muted, #666666)">at Metin K.</div>
          <div class="flex items-center gap-2 text-[13px] flex-wrap mt-1 max-sm:flex-col max-sm:items-start max-sm:gap-1" style="color:var(--color-text-muted, #666666)">
            <span class="inline-flex items-center gap-1">
              E-posta met***@gmail.com
              <span class="inline-flex items-center gap-[3px] text-xs font-medium text-green-500">${ICONS.verified} Doğrulandı</span>
            </span>
            <span class="max-sm:hidden" style="color:var(--color-border-medium)">|</span>
            <span>Katılım 2026</span>
          </div>
          <div class="flex items-center gap-2 text-[13px] mt-1">
            <span style="color:var(--color-text-placeholder, #999999)">Ana ürünler</span>
            <span style="color:var(--color-text-muted, #666666)">—</span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-3 flex-shrink-0 max-md:w-full">
        <a href="#" class="inline-flex items-center gap-1.5 py-2 px-4 rounded-md text-[13px] font-medium no-underline transition-all whitespace-nowrap bg-surface-raised hover:bg-gray-200 max-md:flex-1 max-md:justify-center" style="color:var(--color-text-body, #333333)">
          ${ICONS.eye}
          <span>Diğerlerinin gördüğü</span>
        </a>
        <a href="#" class="inline-flex items-center gap-1.5 py-2 px-4 rounded-md text-[13px] font-medium no-underline transition-all whitespace-nowrap text-white hover:bg-gray-800 max-md:flex-1 max-md:justify-center" style="background:var(--color-text-heading)">
          ${ICONS.edit}
          <span>Düzenle</span>
        </a>
      </div>
    </div>
  `;
}

// ── Account Edit Form ────────────────────────────────────────────

interface FormField {
  label: string;
  value: string;
  name: string;
  isVerified?: boolean;
  readonly?: boolean;
}

const accountFields: FormField[] = [
  { label: 'Hesap Numarası', value: 'tr29243492599miuy', name: 'accountId', readonly: true },
  { label: 'Ad - Soyad', value: 'Metin K.', name: 'fullName' },
  { label: 'Cinsiyet', value: '', name: 'gender' },
  { label: 'E-posta Adresi', value: 'met***@gmail.com', name: 'email', isVerified: true },
  { label: 'Alternatif E-posta Adresi', value: '', name: 'altEmail' },
  { label: 'İletişim Adresi', value: 'Turkey', name: 'address' },
  { label: 'Posta Kodu', value: '', name: 'postalCode' },
  { label: 'Tel', value: '--', name: 'phone' },
  { label: 'Faks', value: '', name: 'fax' },
  { label: 'Mobil', value: '', name: 'mobile' },
  { label: 'Departman', value: '', name: 'department' },
  { label: 'Meslek', value: '', name: 'occupation' },
];

function renderFormField(field: FormField): string {
  let valueHtml: string;

  if (field.isVerified) {
    valueHtml = `
      <span style="color:var(--color-text-body, #333333)">${field.value}</span>
      <span class="inline-flex items-center gap-[3px] text-xs italic" style="color:var(--color-cta-primary, #cc9900)">${ICONS.verified} Eposta adresi doğrulandı</span>
    `;
  } else {
    valueHtml = `<span style="color:var(--color-text-body, #333333)">${field.value || ''}</span>`;
  }

  return `
    <div class="flex items-baseline py-2.5 min-h-[38px] max-md:flex-col max-md:gap-1">
      <div class="w-[220px] flex-shrink-0 text-sm font-bold text-right pr-4 max-md:w-auto max-md:text-left max-md:pr-0" style="color:var(--color-text-heading, #111827)">${field.label}:</div>
      <div class="flex-1 flex items-center gap-2 text-sm" style="color:var(--color-text-body, #333333)">${valueHtml}</div>
    </div>
  `;
}

function renderAccountEditForm(): string {
  return `
    <div class="bg-white rounded-lg p-8 max-md:p-5">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold m-0" style="color:var(--color-text-heading, #111827)">Hesap Bilgilerinizi Düzenleyin</h2>
        <a href="#" class="text-[13px] text-blue-600 no-underline font-medium hover:underline">Hesabı Kapat</a>
      </div>
      <div class="h-px bg-gray-200 mt-5 mb-6"></div>
      <div class="flex flex-col">
        ${accountFields.map(renderFormField).join('')}
      </div>
      <div class="mt-6 py-4 bg-[#eff1f7] rounded-md flex justify-center">
        <button class="py-1.5 px-7 rounded border-[1.5px] border-primary-600 bg-white text-sm font-medium cursor-pointer transition-all hover:bg-amber-50 hover:border-amber-700" style="color:var(--color-text-heading, #111827)" type="button">Düzenle</button>
      </div>
    </div>
  `;
}

// ── Main Layout ──────────────────────────────────────────────────

export function ProfileLayout(): string {
  return `
    <div class="py-4 flex flex-col gap-4">
      ${renderCover()}
      ${renderProfileCard()}
      ${renderAccountEditForm()}
      ${renderInfoSection(contactInfo)}
      ${renderInfoSection(companyInfo)}
      ${renderInfoSection(sourcingInfo)}
    </div>
  `;
}

export function initProfileLayout(): void {
  // Profile page is read-only, no interactive logic needed
}
