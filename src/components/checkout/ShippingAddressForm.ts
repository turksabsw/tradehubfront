/**
 * ShippingAddressForm Component (C2)
 * Shipping address form with float-label inputs, country dropdown,
 * composite phone input, and 3-column state/city/postal row.
 */

import type { Country, Province } from '../../types/checkout';
import { countries, turkishProvinces, districtsByProvince, pageContent } from '../../data/mockCheckout';

export interface ShippingAddressFormProps {
  countries?: Country[];
  provinces?: Province[];
}

/** Chevron-down SVG icon */
const ChevronDown = `<svg class="w-4 h-4 shrink-0 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/></svg>`;

/** Info circle SVG icon */
const InfoIcon = `<svg class="w-4 h-4 text-[var(--color-text-muted)]" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd"/></svg>`;

/** Location pin SVG icon */
const LocationIcon = `<svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clip-rule="evenodd"/></svg>`;

function floatField(id: string, name: string, label: string, required: boolean, type = 'text'): string {
  return `
    <div class="checkout-float-field" data-field="${name}">
      <input
        class="checkout-float-field__input"
        type="${type}"
        id="${id}"
        name="${name}"
        autocomplete="off"
        ${required ? 'required' : ''}
      />
      <label class="checkout-float-field__label" for="${id}">
        ${label}${required ? ' <span class="text-[var(--color-error-500)]">*</span>' : ''}
      </label>
      <div class="checkout-float-field__error">${pageContent.requiredFieldError}</div>
    </div>
  `;
}

function dropdownField(id: string, name: string, label: string, displayValue: string): string {
  return `
    <div class="checkout-dropdown checkout-float-field checkout-float-field--active" data-field="${name}" data-dropdown="${id}">
      <button
        type="button"
        class="checkout-dropdown__trigger"
        id="${id}"
        aria-expanded="false"
        aria-haspopup="listbox"
      >
        <span class="text-left truncate" data-display>${displayValue}</span>
        ${ChevronDown}
      </button>
      <label class="checkout-float-field__label">
        ${label} <span class="text-[var(--color-error-500)]">*</span>
      </label>
      <ul class="checkout-dropdown__list" role="listbox" data-list></ul>
      <div class="checkout-float-field__error">${pageContent.requiredFieldError}</div>
    </div>
  `;
}

/** Default country (Turkey) */
const defaultCountry = countries.find(c => c.code === 'TR') ?? countries[0];

export function ShippingAddressForm(props: ShippingAddressFormProps = {}): string {
  const ctrs = props.countries ?? countries;
  const _provinces = props.provinces ?? turkishProvinces;

  // Country dropdown items
  const countryItems = ctrs.map(c =>
    `<li class="checkout-dropdown__item${c.code === defaultCountry.code ? ' checkout-dropdown__item--selected' : ''}" role="option" data-value="${c.code}" data-flag="${c.flag}" data-name="${c.name}" data-prefix="${c.phonePrefix}">${c.flag} ${c.name}</li>`
  ).join('');

  // Province dropdown items
  const provinceItems = _provinces.map(p =>
    `<li class="checkout-dropdown__item" role="option" data-value="${p.name}">${p.name}</li>`
  ).join('');

  return `
    <section class="checkout-section mb-4" id="shipping-address-section">
      <!-- Section Header -->
      <div class="flex items-center gap-3 p-4 lg:p-5">
        <div class="flex items-center justify-center w-7 h-7 rounded-full bg-[var(--color-primary-500)] text-white text-sm font-semibold shrink-0">1</div>
        <h2 class="text-base lg:text-lg font-semibold text-[var(--color-text-primary)]">${pageContent.shippingAddressTitle}</h2>
      </div>

      <!-- Form Content -->
      <div class="checkout-section__content">
        <form id="shipping-address-form" class="px-4 lg:px-5 pb-5" novalidate>
          <!-- Country/Region -->
          ${dropdownField('country-dropdown', 'country', pageContent.countryLabel, `${defaultCountry.flag} ${defaultCountry.name}`)}
          <div class="hidden" id="country-items">${countryItems}</div>

          <!-- First name and Last name -->
          ${floatField('first-name', 'firstName', pageContent.firstNameLabel, true)}

          <!-- Phone Number (composite) -->
          <div class="checkout-float-field" data-field="phone">
            <div class="flex rounded-[var(--radius-input)] border border-[var(--color-border-medium)] overflow-hidden transition-colors" id="phone-wrapper">
              <div class="flex items-center gap-1 px-3 bg-[var(--color-surface-raised)] border-r border-[var(--color-border-medium)] shrink-0 min-w-[70px]">
                <span class="text-sm font-medium text-[var(--color-text-secondary)]" id="phone-prefix">${defaultCountry.phonePrefix}</span>
              </div>
              <input
                class="flex-1 px-3 py-[18px] pb-[6px] text-[var(--font-size-base)] text-[var(--color-text-primary)] outline-none bg-transparent"
                type="tel"
                id="phone"
                name="phone"
                required
              />
            </div>
            <label class="checkout-float-field__label" for="phone">
              ${pageContent.phoneLabel} <span class="text-[var(--color-error-500)]">*</span>
            </label>
            <p class="text-xs text-[var(--color-text-muted)] mt-1">Only used to contact you for delivery updates</p>
            <div class="checkout-float-field__error">${pageContent.requiredFieldError}</div>
          </div>

          <!-- Street Address -->
          <div class="checkout-float-field" data-field="streetAddress">
            <input
              class="checkout-float-field__input"
              type="text"
              id="street-address"
              name="streetAddress"
              autocomplete="off"
              required
            />
            <label class="checkout-float-field__label" for="street-address">
              ${pageContent.streetAddressLabel} <span class="text-[var(--color-error-500)]">*</span>
            </label>
            <div class="checkout-float-field__error">${pageContent.requiredFieldError}</div>
            <!-- Use my current location link -->
            <button type="button" id="use-location-btn" class="flex items-center gap-1.5 mt-2 text-sm text-[var(--color-primary-500)] hover:text-[var(--color-primary-700)] transition-colors">
              ${LocationIcon}
              <span>${pageContent.useCurrentLocationText}</span>
            </button>
          </div>

          <!-- Apartment (optional) -->
          ${floatField('apartment', 'apartment', pageContent.apartmentLabel, false)}

          <!-- State / City / Postal Code — 3-column row -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <!-- State/Province -->
            ${dropdownField('state-dropdown', 'state', pageContent.stateLabel, '')}
            <div class="hidden" id="state-items">${provinceItems}</div>

            <!-- City -->
            ${dropdownField('city-dropdown', 'city', pageContent.cityLabel, '')}
            <div class="hidden" id="city-items"></div>

            <!-- Postal Code -->
            <div class="checkout-float-field" data-field="postalCode">
              <input
                class="checkout-float-field__input"
                type="text"
                id="postal-code"
                name="postalCode"
                autocomplete="off"
                required
              />
              <label class="checkout-float-field__label" for="postal-code">
                ${pageContent.postalCodeLabel} <span class="text-[var(--color-error-500)]">*</span>
              </label>
              <div class="flex items-center gap-1 mt-1" data-tooltip-target="postal-tooltip">
                ${InfoIcon}
                <span class="text-xs text-[var(--color-text-muted)]">Enter your postal/ZIP code</span>
              </div>
              <div class="checkout-float-field__error">${pageContent.requiredFieldError}</div>
            </div>
          </div>

          <!-- Default address checkbox -->
          <div class="flex items-center gap-2 mt-2 mb-4">
            <input
              type="checkbox"
              id="default-address"
              name="isDefaultAddress"
              class="w-4 h-4 rounded border-[var(--color-border-medium)] text-[var(--color-primary-500)] focus:ring-[var(--color-primary-500)]"
            />
            <label for="default-address" class="text-sm text-[var(--color-text-secondary)] cursor-pointer select-none">
              ${pageContent.defaultAddressCheckbox}
            </label>
          </div>

          <!-- Continue to payment button -->
          <button
            type="submit"
            id="continue-payment-btn"
            class="px-8 py-3 bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] text-white font-semibold text-sm rounded-[var(--radius-input)] transition-colors"
          >
            ${pageContent.submitButtonText}
          </button>
        </form>
      </div>
    </section>
  `.trim();
}

/**
 * Initialize ShippingAddressForm interactions:
 * - Float-label focus/blur
 * - Dropdown open/close
 * - Form validation on submit
 */
export function initShippingAddressForm(): void {
  const form = document.getElementById('shipping-address-form') as HTMLFormElement | null;
  if (!form) return;

  // ── Float-label behavior ──
  form.querySelectorAll<HTMLInputElement>('.checkout-float-field__input').forEach(input => {
    const field = input.closest('.checkout-float-field');
    if (!field) return;

    const updateActive = () => {
      field.classList.toggle('checkout-float-field--active', input.value.trim().length > 0);
    };

    input.addEventListener('focus', () => {
      field.classList.add('checkout-float-field--active');
    });
    input.addEventListener('blur', updateActive);
    // Init state
    updateActive();
  });

  // ── Phone field float-label ──
  const phoneInput = document.getElementById('phone') as HTMLInputElement | null;
  const phoneField = phoneInput?.closest('.checkout-float-field');
  if (phoneInput && phoneField) {
    phoneInput.addEventListener('focus', () => phoneField.classList.add('checkout-float-field--active'));
    phoneInput.addEventListener('blur', () => {
      phoneField.classList.toggle('checkout-float-field--active', phoneInput.value.trim().length > 0);
    });
  }

  // ── Dropdown behavior ──
  const dropdowns = form.querySelectorAll<HTMLElement>('[data-dropdown]');

  const closeAllDropdowns = () => {
    dropdowns.forEach(dd => {
      dd.classList.remove('checkout-dropdown--open');
      const trigger = dd.querySelector('.checkout-dropdown__trigger');
      trigger?.setAttribute('aria-expanded', 'false');
    });
  };

  // Populate dropdown lists from hidden containers
  const populateDropdown = (dropdownId: string, itemsContainerId: string) => {
    const dropdown = document.querySelector(`[data-dropdown="${dropdownId}"]`);
    const itemsContainer = document.getElementById(itemsContainerId);
    const list = dropdown?.querySelector('[data-list]');
    if (list && itemsContainer) {
      list.innerHTML = itemsContainer.innerHTML;
    }
  };

  populateDropdown('country-dropdown', 'country-items');
  populateDropdown('state-dropdown', 'state-items');

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.checkout-dropdown__trigger');
    const list = dropdown.querySelector('[data-list]');
    const display = dropdown.querySelector('[data-display]');
    const fieldName = dropdown.dataset.field;

    trigger?.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = dropdown.classList.contains('checkout-dropdown--open');
      closeAllDropdowns();
      if (!isOpen) {
        dropdown.classList.add('checkout-dropdown--open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    list?.addEventListener('click', (e) => {
      const item = (e.target as HTMLElement).closest('.checkout-dropdown__item') as HTMLElement | null;
      if (!item) return;

      // Update selected state
      list.querySelectorAll('.checkout-dropdown__item').forEach(i => i.classList.remove('checkout-dropdown__item--selected'));
      item.classList.add('checkout-dropdown__item--selected');

      // Update display value
      if (display) display.textContent = item.textContent?.trim() ?? '';

      // Mark field as active
      dropdown.classList.add('checkout-float-field--active');
      // Remove error state on selection
      dropdown.classList.remove('checkout-float-field--error');

      closeAllDropdowns();

      // Country-specific: update phone prefix
      if (fieldName === 'country') {
        const prefix = item.dataset.prefix;
        const prefixEl = document.getElementById('phone-prefix');
        if (prefix && prefixEl) prefixEl.textContent = prefix;
      }

      // State-specific: update city dropdown
      if (fieldName === 'state') {
        const stateName = item.dataset.value ?? '';
        updateCityDropdown(stateName);
      }
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.checkout-dropdown')) {
      closeAllDropdowns();
    }
  });

  // State/City empty state: remove --active class if no value
  const stateDropdown = document.querySelector('[data-dropdown="state-dropdown"]');
  const cityDropdown = document.querySelector('[data-dropdown="city-dropdown"]');
  if (stateDropdown) stateDropdown.classList.remove('checkout-float-field--active');
  if (cityDropdown) cityDropdown.classList.remove('checkout-float-field--active');

  // ── Form validation on submit ──
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous errors
    form.querySelectorAll('.checkout-float-field--error').forEach(el => el.classList.remove('checkout-float-field--error'));

    const requiredFields: { field: string; getValue: () => string }[] = [
      { field: 'country', getValue: () => document.querySelector('[data-dropdown="country-dropdown"] [data-display]')?.textContent?.trim() ?? '' },
      { field: 'firstName', getValue: () => (document.getElementById('first-name') as HTMLInputElement)?.value?.trim() ?? '' },
      { field: 'phone', getValue: () => (document.getElementById('phone') as HTMLInputElement)?.value?.trim() ?? '' },
      { field: 'streetAddress', getValue: () => (document.getElementById('street-address') as HTMLInputElement)?.value?.trim() ?? '' },
      { field: 'state', getValue: () => document.querySelector('[data-dropdown="state-dropdown"] [data-display]')?.textContent?.trim() ?? '' },
      { field: 'city', getValue: () => document.querySelector('[data-dropdown="city-dropdown"] [data-display]')?.textContent?.trim() ?? '' },
      { field: 'postalCode', getValue: () => (document.getElementById('postal-code') as HTMLInputElement)?.value?.trim() ?? '' },
    ];

    let hasErrors = false;
    let firstErrorField: HTMLElement | null = null;

    requiredFields.forEach(({ field, getValue }) => {
      if (!getValue()) {
        hasErrors = true;
        const fieldEl = form.querySelector(`[data-field="${field}"]`);
        fieldEl?.classList.add('checkout-float-field--error');
        if (!firstErrorField && fieldEl) firstErrorField = fieldEl as HTMLElement;
      }
    });

    if (hasErrors && firstErrorField) {
      (firstErrorField as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (hasErrors) return;

    const formData = {
      country: document.querySelector('[data-dropdown="country-dropdown"] [data-display]')?.textContent?.trim(),
      firstName: (document.getElementById('first-name') as HTMLInputElement)?.value?.trim(),
      phonePrefix: document.getElementById('phone-prefix')?.textContent?.trim(),
      phone: (document.getElementById('phone') as HTMLInputElement)?.value?.trim(),
      streetAddress: (document.getElementById('street-address') as HTMLInputElement)?.value?.trim(),
      apartment: (document.getElementById('apartment') as HTMLInputElement)?.value?.trim(),
      state: document.querySelector('[data-dropdown="state-dropdown"] [data-display]')?.textContent?.trim(),
      city: document.querySelector('[data-dropdown="city-dropdown"] [data-display]')?.textContent?.trim(),
      postalCode: (document.getElementById('postal-code') as HTMLInputElement)?.value?.trim(),
      isDefaultAddress: (document.getElementById('default-address') as HTMLInputElement)?.checked ?? false,
    };

    console.info('Checkout form submitted:', formData);
  });

  // Remove error state on input
  form.querySelectorAll<HTMLInputElement>('.checkout-float-field__input').forEach(input => {
    input.addEventListener('input', () => {
      const field = input.closest('.checkout-float-field');
      field?.classList.remove('checkout-float-field--error');
    });
  });

  // Phone input error clearing (separate since it lacks checkout-float-field__input class)
  if (phoneInput && phoneField) {
    phoneInput.addEventListener('input', () => {
      phoneField.classList.remove('checkout-float-field--error');
    });
  }
}

/** Update the city dropdown when state changes */
function updateCityDropdown(stateName: string): void {
  const districts = districtsByProvince[stateName] ?? ['Merkez'];

  const cityDropdown = document.querySelector('[data-dropdown="city-dropdown"]');
  const list = cityDropdown?.querySelector('[data-list]');
  const display = cityDropdown?.querySelector('[data-display]');

  if (list) {
    list.innerHTML = districts.map(d =>
      `<li class="checkout-dropdown__item" role="option" data-value="${d}">${d}</li>`
    ).join('');
  }
  if (display) display.textContent = '';
  cityDropdown?.classList.remove('checkout-float-field--active');
}
