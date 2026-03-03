/**
 * ShippingAddressForm Component (C2)
 * Shipping address form with float-label inputs, country dropdown,
 * composite phone input, and 3-column state/city/postal row.
 *
 * Interactivity handled by Alpine.js x-data="shippingForm" (see alpine.ts).
 * Float-label behavior is CSS-driven via Tailwind peer-* classes.
 */

import type { Country, Province } from '../../types/checkout';
import { countries, turkishProvinces, pageContent } from '../../data/mockCheckout';
import { AddressAutocomplete } from './AddressAutocomplete';

export interface ShippingAddressFormProps {
  countries?: Country[];
  provinces?: Province[];
}

/** Chevron-down SVG icon */
const ChevronDown = `<svg class="w-4 h-4 shrink-0 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/></svg>`;

// SVG icon constants (InfoIcon, LocationIcon) removed — unused in template.
// See ChevronDown above for the icon that IS used by dropdown buttons.

/**
 * Float-label text input field.
 * Alpine binds error state via x-bind:data-error and clears on @input.
 * Float-label animation uses CSS peer-* selectors with transition-all duration-200.
 */
function floatField(id: string, name: string, label: string, required: boolean, type = 'text', helperText?: string, helperAction?: string): string {
  return `
    <div class="relative mb-4 group checkout-field-container" data-field="${name}" x-bind:data-error="errors.${name}">
      <input
        class="peer w-full h-[48px] pt-[18px] px-3 pb-0 text-[14px] text-[var(--color-text-primary)] border border-[var(--color-border-medium)] rounded-lg bg-[var(--color-surface)] outline-none transition-colors focus:border-[var(--color-primary-500)] data-[error=true]:border-[var(--color-error-500)] placeholder-transparent"
        type="${type}"
        id="${id}"
        name="${name}"
        autocomplete="off"
        placeholder=" "
        ${required ? 'required' : ''}
        @input="clearError('${name}')"
      />
      <label
        class="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-[#767676] transition-all duration-200 ease-in-out pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-[#767676] peer-focus:top-[12px] peer-focus:-translate-y-1/2 peer-focus:text-[12px] peer-focus:text-[var(--color-primary-500)] peer-focus:bg-transparent group-data-[error=true]:text-[var(--color-error-500)] ${type !== 'tel' && `peer-[:not(:placeholder-shown)]:top-[12px] peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:text-[12px]`}"
        for="${id}"
      >
        ${label}${required ? ' <span class="text-[var(--color-error-500)]">*</span>' : ''}
      </label>
      <div class="hidden text-[12px] text-[var(--color-error-500)] mt-1 group-data-[error=true]:block">${pageContent.requiredFieldError}</div>
      ${helperText ? `<p class="text-[14px] text-[#767676] mt-2">${helperText}</p>` : ''}
      ${helperAction ? helperAction : ''}
    </div>
  `;
}

/**
 * Dropdown select field with Alpine.js bindings.
 * Uses @click for toggling, @click.outside for closing, and x-text for display sync.
 * Dropdown visibility controlled via group-data-[open=true]:block CSS.
 * Float-label on dropdown is always in "floated" position (top-[12px]) since
 * the label text is always visible.
 */
function dropdownField(
  id: string,
  name: string,
  label: string,
  displayValue: string,
  items?: string,
  alpine?: { openProp: string; selectFn: string; displayProp?: string }
): string {
  const containerAlpine = alpine
    ? ` x-bind:data-open="${alpine.openProp}" x-bind:data-error="errors.${name}" @click.outside="${alpine.openProp} = false"`
    : '';
  const triggerAlpine = alpine
    ? `@click.prevent="toggleDropdown('${name}')" x-bind:aria-expanded="${alpine.openProp}"`
    : 'aria-expanded="false"';
  const displayAlpine = alpine?.displayProp ? ` x-text="${alpine.displayProp}"` : '';
  const listAlpine = alpine ? ` @click="${alpine.selectFn}"` : '';

  return `
    <div class="relative mb-4 group checkout-dropdown-container" data-field="${name}" data-dropdown="${id}"${containerAlpine}>
      <button
        type="button"
        class="w-full h-[48px] flex items-center justify-between pt-[18px] px-3 pb-0 text-[14px] text-[var(--color-text-primary)] border border-[var(--color-border-medium)] rounded-lg bg-[var(--color-surface)] cursor-pointer outline-none transition-colors focus:border-[var(--color-primary-500)] group-data-[error=true]:border-[var(--color-error-500)] dropdown-trigger"
        id="${id}"
        aria-haspopup="listbox"
        ${triggerAlpine}
      >
        <span class="text-left truncate pb-[6px]" data-display${displayAlpine}>${displayValue}</span>
        <span class="pb-[6px]">${ChevronDown}</span>
      </button>
      <label class="absolute left-3 top-[12px] -translate-y-1/2 text-[12px] text-[#767676] transition-all duration-200 ease-in-out pointer-events-none group-data-[error=true]:text-[var(--color-error-500)] dropdown-label">
        ${label} <span class="text-[var(--color-error-500)]">*</span>
      </label>
      <ul class="absolute top-full left-0 right-0 z-50 max-h-[260px] overflow-y-auto bg-[var(--color-surface)] border border-[var(--color-border-medium)] rounded-lg shadow-lg mt-1 hidden group-data-[open=true]:block" role="listbox" data-list${listAlpine}>${items || ''}</ul>
      <div class="hidden text-[12px] text-[var(--color-error-500)] mt-1 group-data-[error=true]:block">${pageContent.requiredFieldError}</div>
    </div>
  `;
}

/** Default country (Turkey) */
const defaultCountry = countries.find(c => c.code === 'TR') ?? countries[0];

export function ShippingAddressForm(props: ShippingAddressFormProps = {}): string {
  const ctrs = props.countries ?? countries;
  const _provinces = props.provinces ?? turkishProvinces;

  // Country dropdown items (rendered directly into dropdown UL)
  const countryItems = ctrs.map(c =>
    `<li class="px-3 py-2 text-[14px] text-[var(--color-text-primary)] cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition-colors flex items-center gap-2 ${c.code === defaultCountry.code ? 'bg-blue-50 text-blue-800' : ''}" role="option" data-value="${c.code}" data-flag="${c.flag}" data-name="${c.name}" data-prefix="${c.phonePrefix}">${c.flag} ${c.name}</li>`
  ).join('');

  // Province dropdown items (rendered directly into dropdown UL)
  const provinceItems = _provinces.map(p =>
    `<li class="px-3 py-2 text-[14px] text-[var(--color-text-primary)] cursor-pointer hover:bg-[#f5f5f5] transition-colors" role="option" data-value="${p.name}">${p.name}</li>`
  ).join('');

  return `
    <section class="checkout-section mb-4" id="shipping-address-section" x-data="shippingForm">
      <!-- Section Header -->
      <div class="flex items-center gap-3 p-4 lg:p-5">
        <div class="flex items-center justify-center w-7 h-7 rounded-full bg-[var(--color-primary-500)] text-white text-sm font-semibold shrink-0">1</div>
        <h2 class="text-base lg:text-lg font-semibold text-[var(--color-text-primary)]">${pageContent.shippingAddressTitle}</h2>
      </div>

      <!-- Form Content -->
      <div class="checkout-section__content">
        <form id="shipping-address-form" class="px-4 lg:px-5 pb-5" novalidate @submit.prevent="handleSubmit()">
          <div class="flex flex-col gap-0">
            <div class="flex items-center gap-2 mb-4 text-[#008a00] text-[14px] font-medium">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="shrink-0"><path d="M18 10v-3.5A6.5 6.5 0 105 6.5V10H4v12h16V10h-2zm-2 0H8v-3.5a4.5 4.5 0 119 0V10zm-3 5.5v3h-2v-3h2z" fill="currentColor"/></svg>
              <span>Your information is encrypted and secure</span>
            </div>

            <!-- Country/Region — Alpine dropdown with @click/@click.outside -->
            ${dropdownField('country-dropdown', 'country', 'Country / region',
              `${defaultCountry.flag} ${defaultCountry.name}`,
              countryItems,
              { openProp: 'countryOpen', selectFn: 'selectCountryItem($event)', displayProp: 'countryDisplay' }
            )}

            <!-- First name and Last name -->
            ${floatField('first-name', 'firstName', 'First name and Last name', true)}

            <!-- Phone Number (composite) — Alpine binds error and prefix -->
            <div class="relative mb-4 group checkout-field-container flex gap-2" data-field="phone" x-bind:data-error="errors.phone">
              <div class="flex items-center justify-center w-[70px] h-[48px] rounded-lg border border-[var(--color-border-medium)] bg-transparent text-[14px] text-[var(--color-text-primary)] shrink-0">
                <span id="phone-prefix" x-text="phonePrefix">${defaultCountry.phonePrefix}</span>
              </div>
              <div class="relative flex-1">
                <input
                  class="peer w-full h-[48px] pt-[18px] px-3 pb-0 text-[14px] text-[var(--color-text-primary)] border border-[var(--color-border-medium)] rounded-lg bg-[var(--color-surface)] outline-none transition-colors focus:border-[var(--color-primary-500)] data-[error=true]:border-[var(--color-error-500)] placeholder-transparent"
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder=" "
                  @input="clearError('phone')"
                />
                <label
                  class="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-[#767676] transition-all duration-200 ease-in-out pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-[#767676] peer-focus:top-[12px] peer-focus:-translate-y-1/2 peer-focus:text-[12px] peer-focus:text-[var(--color-primary-500)] peer-focus:bg-transparent peer-[:not(:placeholder-shown)]:top-[12px] peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:text-[12px] group-data-[error=true]:text-[var(--color-error-500)]"
                  for="phone"
                >
                  ${pageContent.phoneLabel} <span class="text-[var(--color-error-500)]">*</span>
                </label>
              </div>
              <p class="absolute top-[100%] left-[78px] text-[14px] text-[#767676] mt-[8px]">Only used to contact you for delivery updates</p>
            </div>
            <div class="h-[30px]"></div> <!-- Spacer for absolute positioned help text -->

            <!-- Street Address — with "Use my current location" Alpine action -->
            ${floatField('street-address', 'streetAddress', pageContent.streetAddressLabel, true, 'text', '', `
              <button type="button" id="use-location-btn" @click.prevent="useCurrentLocation()" class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-[#FFFFFF] px-[16px] py-0 text-[14px] text-[var(--color-primary-500)] hover:text-[var(--color-primary-700)] transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                <span>${pageContent.useCurrentLocationText}</span>
              </button>
            `)}

          <!-- Apartment (optional) -->
          ${floatField('apartment', 'apartment', pageContent.apartmentLabel, false)}

          <!-- State / City / Postal Code — 3-column row -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <!-- State/Province — Alpine dropdown -->
            <div class="relative">
              ${dropdownField('state-dropdown', 'state', 'State / province', '',
                provinceItems,
                { openProp: 'stateOpen', selectFn: 'selectStateItem($event)', displayProp: 'stateDisplay' }
              )}
              ${AddressAutocomplete()}
            </div>

            <!-- City — Alpine dropdown (populated dynamically on state change) -->
            ${dropdownField('city-dropdown', 'city', 'City', '',
              '',
              { openProp: 'cityOpen', selectFn: 'selectCityItem($event)', displayProp: 'cityDisplay' }
            )}

            <!-- Postal Code -->
            ${floatField('postal-code', 'postalCode', 'Postal code', true, 'text', '', `
              <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer group/tooltip">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="text-[var(--color-text-primary)]"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm1-4.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="currentColor"/></svg>
                <!-- Tooltip Popup -->
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[320px] bg-[#222222] text-white text-[14px] leading-snug p-3 rounded-md shadow-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50">
                  Provide the exact postal code of your address to ensure delivery to the correct location
                  <!-- Tooltip Arrow -->
                  <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-[6px] border-transparent border-t-[#222222]"></div>
                </div>
              </div>
            `)}
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

/** @deprecated Migrated to Alpine.js x-data="shippingForm" — see alpine.ts */
export function initShippingAddressForm(): void {
  // No-op: form interactions now handled by Alpine.js shippingForm component
}
