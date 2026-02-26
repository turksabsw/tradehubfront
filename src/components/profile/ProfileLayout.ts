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
  const valueClass = isEmpty ? 'profile-grid__value profile-grid__value--empty' : 'profile-grid__value';

  let valueHtml = field.value;
  if (field.isVerified) {
    valueHtml = `${field.value} <span class="profile-grid__verified">${ICONS.verified} Doğrulandı</span>`;
  }
  if (field.isLink && !isEmpty) {
    valueHtml = `<a href="#" class="profile-grid__link">${field.value}</a>`;
  }

  return `
    <div class="profile-grid__label">${field.label}</div>
    <div class="${valueClass}">${valueHtml}</div>
  `;
}

function renderInfoSection(section: InfoSection): string {
  return `
    <div class="profile-section">
      <div class="profile-section__header">
        <h3 class="profile-section__title">${section.title}</h3>
        <a href="#" class="profile-section__edit">
          ${ICONS.edit}
          <span>Düzenle</span>
        </a>
      </div>
      <div class="profile-section__divider"></div>
      <div class="profile-grid">
        ${section.fields.map(renderInfoField).join('')}
      </div>
    </div>
  `;
}

function renderCover(): string {
  return `
    <div class="profile-cover">
      <img
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=360&fit=crop&crop=center"
        alt="Kapak fotoğrafı"
        class="profile-cover__img"
      />
    </div>
  `;
}

function renderProfileCard(): string {
  return `
    <div class="profile-header">
      <div class="profile-header__left">
        <div class="profile-header__avatar">
          <span class="profile-header__initial">m</span>
        </div>
        <div class="profile-header__info">
          <div class="profile-header__name-row">
            <h1 class="profile-header__name">Metin K.</h1>
            <a href="#" class="profile-header__link-icon" title="Profil bağlantısını kopyala">${ICONS.link}</a>
          </div>
          <div class="profile-header__meta">
            <span class="profile-header__flag">${ICONS.flag}</span>
            <span class="profile-header__country">TR</span>
          </div>
          <div class="profile-header__company">at Metin K.</div>
          <div class="profile-header__details">
            <span class="profile-header__detail">
              E-posta met***@gmail.com
              <span class="profile-header__verified">${ICONS.verified} Doğrulandı</span>
            </span>
            <span class="profile-header__detail-separator">|</span>
            <span class="profile-header__detail">Katılım 2026</span>
          </div>
          <div class="profile-header__tags">
            <span class="profile-header__tag-label">Ana ürünler</span>
            <span class="profile-header__tag-value">—</span>
          </div>
        </div>
      </div>
      <div class="profile-header__actions">
        <a href="#" class="profile-header__action-btn profile-header__action-btn--secondary">
          ${ICONS.eye}
          <span>Diğerlerinin gördüğü</span>
        </a>
        <a href="#" class="profile-header__action-btn profile-header__action-btn--primary">
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
      <span class="profile-form__value">${field.value}</span>
      <span class="profile-form__verified">${ICONS.verified} Eposta adresi doğrulandı</span>
    `;
  } else {
    valueHtml = `<span class="profile-form__value">${field.value || ''}</span>`;
  }

  return `
    <div class="profile-form__row">
      <div class="profile-form__label">${field.label}:</div>
      <div class="profile-form__field">${valueHtml}</div>
    </div>
  `;
}

function renderAccountEditForm(): string {
  return `
    <div class="profile-form">
      <div class="profile-form__header">
        <h2 class="profile-form__title">Hesap Bilgilerinizi Düzenleyin</h2>
        <a href="#" class="profile-form__close-account">Hesabı Kapat</a>
      </div>
      <div class="profile-form__divider"></div>
      <div class="profile-form__body">
        ${accountFields.map(renderFormField).join('')}
      </div>
      <div class="profile-form__footer">
        <button class="profile-form__submit" type="button">Düzenle</button>
      </div>
    </div>
  `;
}

// ── Main Layout ──────────────────────────────────────────────────

export function ProfileLayout(): string {
  return `
    <div class="profile-page">
      ${renderCover()}
      ${renderProfileCard()}
      ${renderAccountEditForm()}
      ${renderInfoSection(contactInfo)}
      ${renderInfoSection(companyInfo)}
      ${renderInfoSection(sourcingInfo)}
    </div>
  `;
}

// ── Init ─────────────────────────────────────────────────────────

export function initProfileLayout(): void {
  // Copy profile link
  const linkBtn = document.querySelector<HTMLAnchorElement>('.profile-header__link-icon');
  if (linkBtn) {
    linkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(window.location.href);
      linkBtn.title = 'Kopyalandı!';
      setTimeout(() => { linkBtn.title = 'Profil bağlantısını kopyala'; }, 2000);
    });
  }
}
