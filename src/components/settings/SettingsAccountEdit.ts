/**
 * SettingsAccountEdit Component
 * Account information view/edit form with localStorage CRUD.
 */

import { t } from '../../i18n';

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
    <div class="bg-white rounded-lg p-8 max-md:p-5 max-sm:p-3" id="acc-edit-view">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold m-0" style="color:var(--color-text-heading, #111827)">${t('settings.editAccountTitle')}</h2>
        <a href="#" class="text-[13px] text-blue-600 no-underline font-medium hover:underline">${t('settings.closeAccountLink')}</a>
      </div>
      <div class="h-px bg-gray-200 mt-5 mb-3"></div>
      <div class="text-xs text-red-600 text-right mb-3">${t('settings.requiredField')}</div>
      <div class="flex flex-col">
        <div class="flex items-baseline py-2.5 min-h-[38px] max-md:flex-col max-md:gap-1">
          <div class="w-[220px] flex-shrink-0 text-sm font-bold text-right pr-4 max-md:w-auto max-md:text-left max-md:pr-0" style="color:var(--color-text-heading, #111827)">${t('settings.accountNumber')}</div>
          <div class="flex-1 text-sm flex items-center gap-2" style="color:var(--color-text-body, #333333)">${data.accountId}</div>
        </div>
        <div class="flex items-baseline py-2.5 min-h-[38px] max-md:flex-col max-md:gap-1">
          <div class="w-[220px] flex-shrink-0 text-sm font-bold text-right pr-4 max-md:w-auto max-md:text-left max-md:pr-0" style="color:var(--color-text-heading, #111827)">${t('settings.fullName')}</div>
          <div class="flex-1 text-sm flex items-center gap-2" style="color:var(--color-text-body, #333333)">${fullName}</div>
        </div>
        <div class="flex items-baseline py-2.5 min-h-[38px] max-md:flex-col max-md:gap-1">
          <div class="w-[220px] flex-shrink-0 text-sm font-bold text-right pr-4 max-md:w-auto max-md:text-left max-md:pr-0" style="color:var(--color-text-heading, #111827)">${t('settings.genderLabel')}</div>
          <div class="flex-1 text-sm flex items-center gap-2" style="color:var(--color-text-body, #333333)">${data.gender || ''}</div>
        </div>
        <div class="flex items-baseline py-2.5 min-h-[38px] max-md:flex-col max-md:gap-1">
          <div class="w-[220px] flex-shrink-0 text-sm font-bold text-right pr-4 max-md:w-auto max-md:text-left max-md:pr-0" style="color:var(--color-text-heading, #111827)">${t('settings.emailAddressField')}</div>
          <div class="flex-1 text-sm flex items-center gap-2" style="color:var(--color-text-body, #333333)">
            ${data.email}
            ${data.emailVerified ? `<span class="inline-flex items-center gap-[3px] text-xs italic" style="color:var(--color-primary-500, #cc9900)">${ICONS.verified} ${t('settings.emailVerifiedText')}</span>` : ''}
          </div>
        </div>
        <div class="flex items-baseline py-2.5 min-h-[38px] max-md:flex-col max-md:gap-1">
          <div class="w-[220px] flex-shrink-0 text-sm font-bold text-right pr-4 max-md:w-auto max-md:text-left max-md:pr-0" style="color:var(--color-text-heading, #111827)">${t('settings.altEmailAddress')}</div>
          <div class="flex-1 text-sm flex items-center gap-2" style="color:var(--color-text-body, #333333)">${data.altEmail || ''}</div>
        </div>
        <div class="flex items-baseline py-2.5 min-h-[38px] max-md:flex-col max-md:gap-1">
          <div class="w-[220px] flex-shrink-0 text-sm font-bold text-right pr-4 max-md:w-auto max-md:text-left max-md:pr-0" style="color:var(--color-text-heading, #111827)">${t('settings.contactAddressLabel')}</div>
          <div class="flex-1 text-sm flex items-center gap-2" style="color:var(--color-text-body, #333333)">${[data.address, data.city, data.country].filter(Boolean).join(', ') || ''}</div>
        </div>
        <div class="flex items-baseline py-2.5 min-h-[38px] max-md:flex-col max-md:gap-1">
          <div class="w-[220px] flex-shrink-0 text-sm font-bold text-right pr-4 max-md:w-auto max-md:text-left max-md:pr-0" style="color:var(--color-text-heading, #111827)">${t('settings.postalCodeLabel')}</div>
          <div class="flex-1 text-sm flex items-center gap-2" style="color:var(--color-text-body, #333333)">${data.postalCode || ''}</div>
        </div>
        <div class="flex items-baseline py-2.5 min-h-[38px] max-md:flex-col max-md:gap-1">
          <div class="w-[220px] flex-shrink-0 text-sm font-bold text-right pr-4 max-md:w-auto max-md:text-left max-md:pr-0" style="color:var(--color-text-heading, #111827)">${t('settings.telLabel')}</div>
          <div class="flex-1 text-sm flex items-center gap-2" style="color:var(--color-text-body, #333333)">${phone}</div>
        </div>
        <div class="flex items-baseline py-2.5 min-h-[38px] max-md:flex-col max-md:gap-1">
          <div class="w-[220px] flex-shrink-0 text-sm font-bold text-right pr-4 max-md:w-auto max-md:text-left max-md:pr-0" style="color:var(--color-text-heading, #111827)">${t('settings.faxLabel')}</div>
          <div class="flex-1 text-sm flex items-center gap-2" style="color:var(--color-text-body, #333333)">${fax}</div>
        </div>
        <div class="flex items-baseline py-2.5 min-h-[38px] max-md:flex-col max-md:gap-1">
          <div class="w-[220px] flex-shrink-0 text-sm font-bold text-right pr-4 max-md:w-auto max-md:text-left max-md:pr-0" style="color:var(--color-text-heading, #111827)">${t('settings.mobileLabel')}</div>
          <div class="flex-1 text-sm flex items-center gap-2" style="color:var(--color-text-body, #333333)">${data.mobile || ''}</div>
        </div>
        <div class="flex items-baseline py-2.5 min-h-[38px] max-md:flex-col max-md:gap-1">
          <div class="w-[220px] flex-shrink-0 text-sm font-bold text-right pr-4 max-md:w-auto max-md:text-left max-md:pr-0" style="color:var(--color-text-heading, #111827)">${t('settings.departmentLabel')}</div>
          <div class="flex-1 text-sm flex items-center gap-2" style="color:var(--color-text-body, #333333)">${data.department || ''}</div>
        </div>
        <div class="flex items-baseline py-2.5 min-h-[38px] max-md:flex-col max-md:gap-1">
          <div class="w-[220px] flex-shrink-0 text-sm font-bold text-right pr-4 max-md:w-auto max-md:text-left max-md:pr-0" style="color:var(--color-text-heading, #111827)">${t('settings.occupationLabel')}</div>
          <div class="flex-1 text-sm flex items-center gap-2" style="color:var(--color-text-body, #333333)">${data.occupation || ''}</div>
        </div>
      </div>
      <div class="mt-6 py-4 bg-[#eff1f7] rounded-md flex justify-center">
        <button class="th-btn-outline" type="button" id="acc-edit-toggle">${t('settings.editBtn')}</button>
      </div>
    </div>
  `;
}

// ── Render: Edit Mode ────────────────────────────────────────────

function getDepartments(): { value: string; label: string }[] {
  return [
    { value: '', label: t('settings.deptSelectPlaceholder') },
    { value: t('settings.deptSales'), label: t('settings.deptSales') },
    { value: t('settings.deptMarketing'), label: t('settings.deptMarketing') },
    { value: t('settings.deptEngineering'), label: t('settings.deptEngineering') },
    { value: t('settings.deptManagement'), label: t('settings.deptManagement') },
    { value: t('settings.deptOther'), label: t('settings.deptOther') },
  ];
}

function renderEditMode(data: AccountData): string {
  const DEPARTMENTS = getDepartments();
  const deptOptions = DEPARTMENTS.map(d =>
    `<option value="${d.value}" ${d.value === data.department ? 'selected' : ''}>${d.label}</option>`
  ).join('');

  const rowCls = "flex items-baseline py-2.5 min-h-[38px] max-md:flex-col max-md:gap-1";
  const labelCls = "w-[220px] flex-shrink-0 text-sm font-bold text-right pr-4 max-md:w-auto max-md:text-left max-md:pr-0";
  const fieldCls = "flex-1 flex items-center gap-2 text-sm max-sm:flex-wrap";
  const inputCls = "py-1.5 px-2.5 border border-gray-300 rounded text-sm outline-none transition-colors focus:border-blue-600 max-sm:w-full";

  return `
    <div class="bg-white rounded-lg p-8 max-md:p-5 max-sm:p-3" id="acc-edit-form" style="display:none">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold m-0" style="color:var(--color-text-heading, #111827)">${t('settings.editAccountTitle')}</h2>
        <a href="#" class="text-[13px] text-blue-600 no-underline font-medium hover:underline">${t('settings.closeAccountLink')}</a>
      </div>
      <div class="h-px bg-gray-200 mt-5 mb-3"></div>
      <div class="text-xs text-red-600 text-right mb-3">${t('settings.requiredField')}</div>
      <div class="flex flex-col">
        <div class="${rowCls}">
          <div class="${labelCls}" style="color:var(--color-text-heading, #111827)"><span class="text-red-600 mr-0.5">*</span> ${t('settings.fullName')}</div>
          <div class="${fieldCls}" style="color:var(--color-text-body, #333333)">
            <input type="text" class="${inputCls} w-[140px] max-sm:w-full" data-field="firstName" value="${data.firstName}" placeholder="${t('settings.firstName')}" />
            <input type="text" class="${inputCls} w-[140px] max-sm:w-full" data-field="lastName" value="${data.lastName}" placeholder="${t('settings.lastName')}" />
          </div>
        </div>
        <div class="${rowCls}">
          <div class="${labelCls}" style="color:var(--color-text-heading, #111827)"><span class="text-red-600 mr-0.5">*</span> ${t('settings.genderLabel')}</div>
          <div class="${fieldCls}" style="color:var(--color-text-body, #333333)">
            <label class="inline-flex items-center gap-1 text-sm cursor-pointer" style="color:var(--color-text-body, #333333)"><input type="radio" name="gender" value="${t('settings.genderMale')}" class="m-0" ${data.gender === t('settings.genderMale') ? 'checked' : ''} /> ${t('settings.genderMale')}</label>
            <label class="inline-flex items-center gap-1 text-sm cursor-pointer" style="color:var(--color-text-body, #333333)"><input type="radio" name="gender" value="${t('settings.genderFemale')}" class="m-0" ${data.gender === t('settings.genderFemale') ? 'checked' : ''} /> ${t('settings.genderFemale')}</label>
          </div>
        </div>
        <div class="${rowCls}">
          <div class="${labelCls}" style="color:var(--color-text-heading, #111827)"><span class="text-red-600 mr-0.5">*</span> ${t('settings.emailAddressField')}</div>
          <div class="${fieldCls}" style="color:var(--color-text-body, #333333)">
            <span>${data.email}</span>
            ${data.emailVerified ? `<span class="inline-flex items-center gap-[3px] text-xs italic" style="color:var(--color-primary-500, #cc9900)">${ICONS.verified} ${t('settings.emailVerifiedText')},</span>` : ''}
            <a href="#" class="text-[13px] text-blue-600 no-underline hover:underline">${t('settings.changeEmailLink')}</a>
          </div>
        </div>
        <div class="${rowCls}">
          <div class="${labelCls}" style="color:var(--color-text-heading, #111827)">${t('settings.altEmailAddress')}</div>
          <div class="flex-1 flex flex-col items-start gap-2.5 text-sm" style="color:var(--color-text-body, #333333)">
            <input type="email" class="${inputCls}" data-field="altEmail" value="${data.altEmail}" />
            <span class="text-xs italic" style="color:var(--color-text-placeholder, #999999)">${t('settings.altEmailHint')}</span>
          </div>
        </div>
        <div class="${rowCls}">
          <div class="${labelCls}" style="color:var(--color-text-heading, #111827)"><span class="text-red-600 mr-0.5">*</span> ${t('settings.contactAddressLabel')}</div>
          <div class="flex-1 flex flex-col items-start gap-2.5 text-sm" style="color:var(--color-text-body, #333333)">
            <div class="flex items-center gap-2 w-full">
              <label class="text-[13px] min-w-[80px] flex-shrink-0" style="color:var(--color-text-muted, #666666)">${t('settings.streetAddress')}</label>
              <input type="text" class="${inputCls}" data-field="address" value="${data.address}" />
            </div>
            <div class="flex items-center gap-2 w-full">
              <label class="text-[13px] min-w-[80px] flex-shrink-0" style="color:var(--color-text-muted, #666666)">${t('settings.cityLabel')}</label>
              <input type="text" class="${inputCls}" data-field="city" value="${data.city}" />
            </div>
            <div class="flex items-center gap-2 w-full">
              <label class="text-[13px] min-w-[80px] flex-shrink-0" style="color:var(--color-text-muted, #666666)">${t('settings.countryRegion')}</label>
              <select class="py-1.5 px-2.5 border border-gray-300 rounded text-sm outline-none min-w-[180px] bg-white" style="color:var(--color-text-heading, #111827)" data-field="country">
                <option value="Turkey" ${data.country === 'Turkey' ? 'selected' : ''}>Turkey</option>
              </select>
            </div>
            <div class="flex items-center gap-2 w-full">
              <label class="text-[13px] min-w-[80px] flex-shrink-0" style="color:var(--color-text-muted, #666666)">${t('settings.postalCodeLabel')}</label>
              <input type="text" class="${inputCls} w-[160px]" data-field="postalCode" value="${data.postalCode}" />
            </div>
          </div>
        </div>
        <div class="${rowCls}">
          <div class="${labelCls}" style="color:var(--color-text-heading, #111827)"><span class="text-red-600 mr-0.5">*</span> ${t('settings.telLabel')}</div>
          <div class="${fieldCls}" style="color:var(--color-text-body, #333333)">
            <div class="flex items-end gap-3 max-md:flex-col max-md:items-start max-md:gap-2">
              <div><label class="block text-xs mb-1" style="color:var(--color-text-muted, #666666)">${t('settings.countryCodeLabel')}</label><input type="text" class="${inputCls} w-[90px]" data-field="phoneCountry" value="${data.phoneCountry}" /></div>
              <div><label class="block text-xs mb-1" style="color:var(--color-text-muted, #666666)">${t('settings.areaCodeLabel')}</label><input type="text" class="${inputCls} w-[90px]" data-field="phoneArea" value="${data.phoneArea}" /></div>
              <div><label class="block text-xs mb-1" style="color:var(--color-text-muted, #666666)">${t('settings.numberLabel')}</label><input type="text" class="${inputCls} w-[140px]" data-field="phoneNumber" value="${data.phoneNumber}" /></div>
            </div>
          </div>
        </div>
        <div class="${rowCls}">
          <div class="${labelCls}" style="color:var(--color-text-heading, #111827)">${t('settings.faxLabel')}</div>
          <div class="${fieldCls}" style="color:var(--color-text-body, #333333)">
            <div class="flex items-end gap-3 max-md:flex-col max-md:items-start max-md:gap-2">
              <div><label class="block text-xs mb-1" style="color:var(--color-text-muted, #666666)">${t('settings.countryCodeLabel')}</label><input type="text" class="${inputCls} w-[90px]" data-field="faxCountry" value="${data.faxCountry}" /></div>
              <div><label class="block text-xs mb-1" style="color:var(--color-text-muted, #666666)">${t('settings.areaCodeLabel')}</label><input type="text" class="${inputCls} w-[90px]" data-field="faxArea" value="${data.faxArea}" /></div>
              <div><label class="block text-xs mb-1" style="color:var(--color-text-muted, #666666)">${t('settings.numberLabel')}</label><input type="text" class="${inputCls} w-[140px]" data-field="faxNumber" value="${data.faxNumber}" /></div>
            </div>
          </div>
        </div>
        <div class="${rowCls}">
          <div class="${labelCls}" style="color:var(--color-text-heading, #111827)">${t('settings.mobileLabel')}</div>
          <div class="${fieldCls}" style="color:var(--color-text-body, #333333)">
            <input type="text" class="${inputCls} w-[160px]" data-field="mobile" value="${data.mobile}" />
          </div>
        </div>
        <div class="${rowCls}">
          <div class="${labelCls}" style="color:var(--color-text-heading, #111827)">${t('settings.departmentLabel')}</div>
          <div class="${fieldCls}" style="color:var(--color-text-body, #333333)">
            <select class="py-1.5 px-2.5 border border-gray-300 rounded text-sm outline-none min-w-[180px] bg-white" style="color:var(--color-text-heading, #111827)" data-field="department">
              ${deptOptions}
            </select>
          </div>
        </div>
        <div class="${rowCls}">
          <div class="${labelCls}" style="color:var(--color-text-heading, #111827)">${t('settings.occupationLabel')}</div>
          <div class="${fieldCls}" style="color:var(--color-text-body, #333333)">
            <input type="text" class="${inputCls}" data-field="occupation" value="${data.occupation}" />
          </div>
        </div>
      </div>
      <div class="mt-6 py-4 bg-[#eff1f7] rounded-md flex justify-center">
        <button class="th-btn-outline" type="button" id="acc-edit-submit">${t('settings.submitBtn')}</button>
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

    formEl.querySelectorAll<HTMLInputElement | HTMLSelectElement>('[data-field]').forEach(el => {
      const field = el.dataset.field as keyof AccountData;
      if (field && field in current) {
        (current as unknown as Record<string, unknown>)[field] = el.value;
      }
    });

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

    if (editBtn && viewEl && formEl) {
      editBtn.addEventListener('click', () => {
        viewEl.style.display = 'none';
        formEl.style.display = '';
      });
    }

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
