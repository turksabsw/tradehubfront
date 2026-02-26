/**
 * SettingsAccountEdit Component
 * Account information view/edit form with localStorage CRUD.
 * - read(): localStorage'dan veri oku
 * - save(data): localStorage'a kaydet
 * - View mode: kayıtlı veriyi göster + "Düzenle" butonu
 * - Edit mode: form inputları + "Gönder" butonu → kaydet → view'a dön
 */

const STORAGE_KEY = 'tradehub_account_data';

const ICONS = {
  verified: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="#22c55e"/><path d="M4.5 7l2 2 3.5-3.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

// ── Data Model ───────────────────────────────────────────────────

export interface AccountData {
  accountId: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  emailVerified: boolean;
  altEmail: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  phoneCountry: string;
  phoneArea: string;
  phoneNumber: string;
  faxCountry: string;
  faxArea: string;
  faxNumber: string;
  mobile: string;
  department: string;
  occupation: string;
}

const defaultData: AccountData = {
  accountId: 'tr29243492599miuy',
  firstName: 'Metin',
  lastName: 'K.',
  gender: '',
  email: 'met***@gmail.com',
  emailVerified: true,
  altEmail: '',
  address: '',
  city: '',
  country: 'Turkey',
  postalCode: '',
  phoneCountry: '',
  phoneArea: '',
  phoneNumber: '',
  faxCountry: '',
  faxArea: '',
  faxNumber: '',
  mobile: '',
  department: '',
  occupation: '',
};

// ── CRUD Methods ─────────────────────────────────────────────────

function readAccountData(): AccountData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return { ...defaultData, ...JSON.parse(raw) };
    }
  } catch { /* ignore parse errors */ }
  return { ...defaultData };
}

function saveAccountData(data: AccountData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ── Render: View Mode ────────────────────────────────────────────

function renderViewMode(data: AccountData): string {
  const phone = [data.phoneCountry, data.phoneArea, data.phoneNumber].filter(Boolean).join(' ') || '--';
  const fax = [data.faxCountry, data.faxArea, data.faxNumber].filter(Boolean).join(' ') || '';
  const fullName = `${data.firstName} ${data.lastName}`.trim();

  return `
    <div class="acc-edit" id="acc-edit-view">
      <div class="acc-edit__header">
        <h2 class="acc-edit__title">Hesap Bilgilerinizi Düzenleyin</h2>
        <a href="#" class="acc-edit__close-link">Hesabı Kapat</a>
      </div>
      <div class="acc-edit__divider"></div>
      <div class="acc-edit__hint">* zorunlu bilgi</div>
      <div class="acc-edit__rows">
        <div class="acc-edit__row">
          <div class="acc-edit__label">Hesap Numarası:</div>
          <div class="acc-edit__value">${data.accountId}</div>
        </div>
        <div class="acc-edit__row">
          <div class="acc-edit__label">Ad - Soyad:</div>
          <div class="acc-edit__value">${fullName}</div>
        </div>
        <div class="acc-edit__row">
          <div class="acc-edit__label">Cinsiyet:</div>
          <div class="acc-edit__value">${data.gender || ''}</div>
        </div>
        <div class="acc-edit__row">
          <div class="acc-edit__label">E-posta Adresi:</div>
          <div class="acc-edit__value">
            ${data.email}
            ${data.emailVerified ? `<span class="acc-edit__verified">${ICONS.verified} Eposta adresi doğrulandı</span>` : ''}
          </div>
        </div>
        <div class="acc-edit__row">
          <div class="acc-edit__label">Alternatif E-posta Adresi:</div>
          <div class="acc-edit__value">${data.altEmail || ''}</div>
        </div>
        <div class="acc-edit__row">
          <div class="acc-edit__label">İletişim Adresi:</div>
          <div class="acc-edit__value">${[data.address, data.city, data.country].filter(Boolean).join(', ') || ''}</div>
        </div>
        <div class="acc-edit__row">
          <div class="acc-edit__label">Posta Kodu:</div>
          <div class="acc-edit__value">${data.postalCode || ''}</div>
        </div>
        <div class="acc-edit__row">
          <div class="acc-edit__label">Tel:</div>
          <div class="acc-edit__value">${phone}</div>
        </div>
        <div class="acc-edit__row">
          <div class="acc-edit__label">Faks:</div>
          <div class="acc-edit__value">${fax}</div>
        </div>
        <div class="acc-edit__row">
          <div class="acc-edit__label">Mobil:</div>
          <div class="acc-edit__value">${data.mobile || ''}</div>
        </div>
        <div class="acc-edit__row">
          <div class="acc-edit__label">Departman:</div>
          <div class="acc-edit__value">${data.department || ''}</div>
        </div>
        <div class="acc-edit__row">
          <div class="acc-edit__label">Meslek:</div>
          <div class="acc-edit__value">${data.occupation || ''}</div>
        </div>
      </div>
      <div class="acc-edit__footer">
        <button class="acc-edit__btn acc-edit__btn--edit" type="button" id="acc-edit-toggle">Düzenle</button>
      </div>
    </div>
  `;
}

// ── Render: Edit Mode ────────────────────────────────────────────

const DEPARTMENTS = [
  { value: '', label: '--- Lütfen seçin ---' },
  { value: 'Satış', label: 'Satış' },
  { value: 'Pazarlama', label: 'Pazarlama' },
  { value: 'Mühendislik', label: 'Mühendislik' },
  { value: 'Yönetim', label: 'Yönetim' },
  { value: 'Diğer', label: 'Diğer' },
];

function renderEditMode(data: AccountData): string {
  const deptOptions = DEPARTMENTS.map(d =>
    `<option value="${d.value}" ${d.value === data.department ? 'selected' : ''}>${d.label}</option>`
  ).join('');

  return `
    <div class="acc-edit acc-edit--form" id="acc-edit-form" style="display:none">
      <div class="acc-edit__header">
        <h2 class="acc-edit__title">Hesap Bilgilerinizi Düzenleyin</h2>
        <a href="#" class="acc-edit__close-link">Hesabı Kapat</a>
      </div>
      <div class="acc-edit__divider"></div>
      <div class="acc-edit__hint">* zorunlu bilgi</div>
      <div class="acc-edit__rows">
        <div class="acc-edit__row">
          <div class="acc-edit__label"><span class="acc-edit__req">*</span> Ad - Soyad:</div>
          <div class="acc-edit__field">
            <input type="text" class="acc-edit__input acc-edit__input--half" data-field="firstName" value="${data.firstName}" placeholder="Ad" />
            <input type="text" class="acc-edit__input acc-edit__input--half" data-field="lastName" value="${data.lastName}" placeholder="Soyad" />
          </div>
        </div>
        <div class="acc-edit__row">
          <div class="acc-edit__label"><span class="acc-edit__req">*</span> Cinsiyet:</div>
          <div class="acc-edit__field">
            <label class="acc-edit__radio"><input type="radio" name="gender" value="Erkek" ${data.gender === 'Erkek' ? 'checked' : ''} /> Erkek</label>
            <label class="acc-edit__radio"><input type="radio" name="gender" value="Kadın" ${data.gender === 'Kadın' ? 'checked' : ''} /> Kadın</label>
          </div>
        </div>
        <div class="acc-edit__row">
          <div class="acc-edit__label"><span class="acc-edit__req">*</span> E-posta Adresi:</div>
          <div class="acc-edit__field">
            <span>${data.email}</span>
            ${data.emailVerified ? `<span class="acc-edit__verified">${ICONS.verified} Eposta adresi doğrulandı,</span>` : ''}
            <a href="#" class="acc-edit__link">eposta adresini değiştirin</a>
          </div>
        </div>
        <div class="acc-edit__row">
          <div class="acc-edit__label">Alternatif E-posta Adresi:</div>
          <div class="acc-edit__field acc-edit__field--col">
            <input type="email" class="acc-edit__input" data-field="altEmail" value="${data.altEmail}" />
            <span class="acc-edit__helper">(Alternatif E-posta adresinize e-posta alabilmeniz için alternatif eposta adresinizin doğru ve güncel olduğundan emin olun.)</span>
          </div>
        </div>
        <div class="acc-edit__row">
          <div class="acc-edit__label"><span class="acc-edit__req">*</span> İletişim Adresi:</div>
          <div class="acc-edit__field acc-edit__field--col">
            <div class="acc-edit__addr-group">
              <label class="acc-edit__addr-label">Açık Adres:</label>
              <input type="text" class="acc-edit__input" data-field="address" value="${data.address}" />
            </div>
            <div class="acc-edit__addr-group">
              <label class="acc-edit__addr-label">Şehir:</label>
              <input type="text" class="acc-edit__input" data-field="city" value="${data.city}" />
            </div>
            <div class="acc-edit__addr-group">
              <label class="acc-edit__addr-label">Ülke/Bölge:</label>
              <select class="acc-edit__select" data-field="country">
                <option value="Turkey" ${data.country === 'Turkey' ? 'selected' : ''}>Turkey</option>
              </select>
            </div>
            <div class="acc-edit__addr-group">
              <label class="acc-edit__addr-label">Posta Kodu:</label>
              <input type="text" class="acc-edit__input acc-edit__input--short" data-field="postalCode" value="${data.postalCode}" />
            </div>
          </div>
        </div>
        <div class="acc-edit__row">
          <div class="acc-edit__label"><span class="acc-edit__req">*</span> Tel:</div>
          <div class="acc-edit__field">
            <div class="acc-edit__phone-group">
              <div><label class="acc-edit__phone-label">Ülke kodu:</label><input type="text" class="acc-edit__input acc-edit__input--xs" data-field="phoneCountry" value="${data.phoneCountry}" /></div>
              <div><label class="acc-edit__phone-label">Bölge kodu:</label><input type="text" class="acc-edit__input acc-edit__input--xs" data-field="phoneArea" value="${data.phoneArea}" /></div>
              <div><label class="acc-edit__phone-label">Numara:</label><input type="text" class="acc-edit__input acc-edit__input--sm" data-field="phoneNumber" value="${data.phoneNumber}" /></div>
            </div>
          </div>
        </div>
        <div class="acc-edit__row">
          <div class="acc-edit__label">Faks:</div>
          <div class="acc-edit__field">
            <div class="acc-edit__phone-group">
              <div><label class="acc-edit__phone-label">Ülke kodu:</label><input type="text" class="acc-edit__input acc-edit__input--xs" data-field="faxCountry" value="${data.faxCountry}" /></div>
              <div><label class="acc-edit__phone-label">Bölge kodu:</label><input type="text" class="acc-edit__input acc-edit__input--xs" data-field="faxArea" value="${data.faxArea}" /></div>
              <div><label class="acc-edit__phone-label">Numara:</label><input type="text" class="acc-edit__input acc-edit__input--sm" data-field="faxNumber" value="${data.faxNumber}" /></div>
            </div>
          </div>
        </div>
        <div class="acc-edit__row">
          <div class="acc-edit__label">Mobil:</div>
          <div class="acc-edit__field">
            <input type="text" class="acc-edit__input acc-edit__input--short" data-field="mobile" value="${data.mobile}" />
          </div>
        </div>
        <div class="acc-edit__row">
          <div class="acc-edit__label">Departman:</div>
          <div class="acc-edit__field">
            <select class="acc-edit__select" data-field="department">
              ${deptOptions}
            </select>
          </div>
        </div>
        <div class="acc-edit__row">
          <div class="acc-edit__label">Meslek:</div>
          <div class="acc-edit__field">
            <input type="text" class="acc-edit__input" data-field="occupation" value="${data.occupation}" />
          </div>
        </div>
      </div>
      <div class="acc-edit__footer">
        <button class="acc-edit__btn acc-edit__btn--submit" type="button" id="acc-edit-submit">Gönder</button>
      </div>
    </div>
  `;
}

// ── Component Export ─────────────────────────────────────────────

export function SettingsAccountEdit(): string {
  const data = readAccountData();
  return `<div id="acc-edit-root">${renderViewMode(data)}${renderEditMode(data)}</div>`;
}

// ── Init with CRUD ───────────────────────────────────────────────

export function initSettingsAccountEdit(): void {
  const root = document.getElementById('acc-edit-root');
  if (!root) return;

  function rerender() {
    const data = readAccountData();
    root!.innerHTML = renderViewMode(data) + renderEditMode(data);
    bindEvents();
  }

  function collectFormData(): AccountData {
    const current = readAccountData();
    const formEl = document.getElementById('acc-edit-form');
    if (!formEl) return current;

    // Read all data-field inputs/selects
    formEl.querySelectorAll<HTMLInputElement | HTMLSelectElement>('[data-field]').forEach(el => {
      const field = el.dataset.field as keyof AccountData;
      if (field && field in current) {
        (current as unknown as Record<string, unknown>)[field] = el.value;
      }
    });

    // Read gender radio
    const genderRadio = formEl.querySelector<HTMLInputElement>('input[name="gender"]:checked');
    if (genderRadio) {
      current.gender = genderRadio.value;
    }

    return current;
  }

  function bindEvents() {
    const viewEl = document.getElementById('acc-edit-view');
    const formEl = document.getElementById('acc-edit-form');
    const editBtn = document.getElementById('acc-edit-toggle');
    const submitBtn = document.getElementById('acc-edit-submit');

    // Düzenle → show form
    if (editBtn && viewEl && formEl) {
      editBtn.addEventListener('click', () => {
        viewEl.style.display = 'none';
        formEl.style.display = '';
      });
    }

    // Gönder → collect, save, re-render view
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const data = collectFormData();
        saveAccountData(data);
        rerender();
      });
    }
  }

  bindEvents();
}
