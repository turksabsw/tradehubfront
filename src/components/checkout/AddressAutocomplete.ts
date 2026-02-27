/**
 * AddressAutocomplete Component (C8)
 * Dark popup showing saved address suggestion near the State dropdown.
 * Clicking the saved address fills ALL form fields.
 */

import type { SavedAddress } from '../../types/checkout';
import { savedAddress, pageContent, districtsByProvince } from '../../data/mockCheckout';

export function AddressAutocomplete(): string {
  const truncatedAddress = savedAddress.fullAddress.length > 50
    ? savedAddress.fullAddress.substring(0, 50) + '…'
    : savedAddress.fullAddress;

  return `
    <div id="address-autocomplete" class="checkout-autocomplete" aria-label="Saved address suggestions">
      <div class="checkout-autocomplete__header">
        ${pageContent.savedAddressLabel}
      </div>
      <button type="button" class="checkout-autocomplete__item" data-saved-address>
        <div class="checkout-autocomplete__city">${savedAddress.city}, ${savedAddress.state}</div>
        <div class="checkout-autocomplete__address">${truncatedAddress}</div>
      </button>
    </div>
  `.trim();
}

/**
 * Fill all form fields from a SavedAddress object.
 * Also triggers float-label --active state on filled inputs.
 */
function fillFormFromAddress(addr: SavedAddress): void {
  // Country display
  const countryDisplay = document.querySelector('[data-dropdown="country-dropdown"] [data-display]');
  if (countryDisplay) {
    const countryList = document.querySelector('[data-dropdown="country-dropdown"] [data-list]');
    const countryItem = countryList?.querySelector(`[data-value="${addr.country}"]`) as HTMLElement | null;
    if (countryItem) {
      countryList?.querySelectorAll('.checkout-dropdown__item').forEach(i => i.classList.remove('checkout-dropdown__item--selected'));
      countryItem.classList.add('checkout-dropdown__item--selected');
      countryDisplay.textContent = countryItem.textContent?.trim() ?? '';
    }
  }

  // Phone prefix
  const prefixEl = document.getElementById('phone-prefix');
  if (prefixEl) prefixEl.textContent = addr.phonePrefix;

  // Text inputs
  const fieldMap: Record<string, { id: string; value: string }> = {
    firstName: { id: 'first-name', value: addr.firstName },
    phone: { id: 'phone', value: addr.phone },
    streetAddress: { id: 'street-address', value: addr.street },
    apartment: { id: 'apartment', value: addr.apartment },
    postalCode: { id: 'postal-code', value: addr.postalCode },
  };

  Object.entries(fieldMap).forEach(([, { id, value }]) => {
    const input = document.getElementById(id) as HTMLInputElement | null;
    if (input) {
      input.value = value;
      // Activate float label
      const field = input.closest('.checkout-float-field');
      if (field) {
        field.classList.add('checkout-float-field--active');
        field.classList.remove('checkout-float-field--error');
      }
    }
  });

  // State dropdown
  const stateDropdown = document.querySelector('[data-dropdown="state-dropdown"]');
  const stateDisplay = stateDropdown?.querySelector('[data-display]');
  if (stateDisplay) {
    stateDisplay.textContent = addr.state;
    stateDropdown?.classList.add('checkout-float-field--active');
    stateDropdown?.classList.remove('checkout-float-field--error');
    // Mark selected in list
    const stateList = stateDropdown?.querySelector('[data-list]');
    stateList?.querySelectorAll('.checkout-dropdown__item').forEach(i => {
      i.classList.toggle('checkout-dropdown__item--selected', (i as HTMLElement).dataset.value === addr.state);
    });
  }

  // Update city dropdown with districts for the selected state, then select city
  const districts = districtsByProvince[addr.state] ?? ['Merkez'];
  const cityDropdown = document.querySelector('[data-dropdown="city-dropdown"]');
  const cityList = cityDropdown?.querySelector('[data-list]');
  const cityDisplay = cityDropdown?.querySelector('[data-display]');
  if (cityList) {
    cityList.innerHTML = districts.map(d =>
      `<li class="checkout-dropdown__item${d === addr.city ? ' checkout-dropdown__item--selected' : ''}" role="option" data-value="${d}">${d}</li>`
    ).join('');
  }
  if (cityDisplay) {
    cityDisplay.textContent = addr.city;
    cityDropdown?.classList.add('checkout-float-field--active');
    cityDropdown?.classList.remove('checkout-float-field--error');
  }
}

/**
 * Initialize AddressAutocomplete behavior:
 * - Show popup when State dropdown opens
 * - Fill form on saved address click
 * - Close on outside click
 */
export function initAddressAutocomplete(): void {
  const popup = document.getElementById('address-autocomplete');
  const stateDropdown = document.querySelector('[data-dropdown="state-dropdown"]');
  if (!popup || !stateDropdown) return;

  const showPopup = () => popup.classList.add('checkout-autocomplete--open');
  const hidePopup = () => popup.classList.remove('checkout-autocomplete--open');

  // Show when state dropdown trigger is clicked
  const stateTrigger = stateDropdown.querySelector('.checkout-dropdown__trigger');
  stateTrigger?.addEventListener('click', () => {
    // Small delay to let dropdown open first
    requestAnimationFrame(() => showPopup());
  });

  // Fill form on saved address click
  const savedBtn = popup.querySelector('[data-saved-address]');
  savedBtn?.addEventListener('click', () => {
    fillFormFromAddress(savedAddress);
    hidePopup();
    // Close any open dropdowns
    document.querySelectorAll('.checkout-dropdown--open').forEach(dd => {
      dd.classList.remove('checkout-dropdown--open');
      dd.querySelector('.checkout-dropdown__trigger')?.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest('#address-autocomplete') && !target.closest('[data-dropdown="state-dropdown"]')) {
      hidePopup();
    }
  });
}
