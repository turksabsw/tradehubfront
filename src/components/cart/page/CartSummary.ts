/**
 * CartSummary Page Component
 * Right sidebar sticky summary panel with order totals, product thumbnails,
 * line items, CTA button, and assurance block.
 */

import type { CartSummaryData, AssuranceItem } from '../../../types/cart';
import { PriceDisplay } from '../atoms/PriceDisplay';

const defaultAssuranceItems: AssuranceItem[] = [
  {
    icon: '🔒',
    title: 'Güvenli ödemeler',
    description: 'Her ödeme güvenli ve emniyetlidir',
  },
  {
    icon: '🚚',
    title: 'Garantili teslimat',
    description: 'Siparişiniz zamanında teslim edilir',
  },
  {
    icon: '💰',
    title: 'Para iade koruması',
    description: 'Memnun kalmazsanız paranız iade edilir',
  },
];

function renderThumbnailGrid(items: CartSummaryData['items']): string {
  if (items.length === 0) return '';

  const thumbnails = items
    .map(
      (item) => `
      <div class="cart-summary-thumbnail">
        <img src="${item.image}" alt="" class="cart-summary-thumbnail__img" />
        <span class="cart-summary-thumbnail__badge">${item.quantity}</span>
      </div>`
    )
    .join('');

  return `<div class="cart-summary-thumbnails">${thumbnails}</div>`;
}

function renderAssurance(items: AssuranceItem[]): string {
  const rows = items
    .map(
      (item) => `
      <div class="cart-summary-assurance__item">
        <span class="cart-summary-assurance__icon">${item.icon}</span>
        <div class="cart-summary-assurance__text">
          <span class="cart-summary-assurance__title">${item.title}</span>
        </div>
      </div>`
    )
    .join('');

  return `<div class="cart-summary-assurance">${rows}</div>`;
}

export function CartSummary(
  data: CartSummaryData,
  assuranceItems: AssuranceItem[] = defaultAssuranceItems
): string {
  return `
    <div class="cart-summary-container" style="position: sticky; top: 51px; width: 425px;">
      <div class="cart-summary">
        <h2 class="cart-summary__title">Sipariş özeti (<span class="sc-summary-selected-count">${data.selectedCount}</span> Ürün)</h2>

        ${renderThumbnailGrid(data.items)}

        <div class="cart-summary__line-items">
          <div class="cart-summary__line">
            <span>Ürün ara toplamı</span>
            <span class="sc-summary-product-subtotal">${PriceDisplay({ amount: data.productSubtotal, currency: data.currency })}</span>
          </div>
          <div class="cart-summary__line">
            <span>Kargo ücreti</span>
            ${PriceDisplay({ amount: data.shippingFee, currency: data.currency })}
          </div>
        </div>

        <hr class="cart-summary__divider" />

        <div class="cart-summary__total">
          <span class="cart-summary__total-label">Ara toplam (vergi hariç)</span>
          <span class="sc-summary-subtotal">${PriceDisplay({ amount: data.subtotal, currency: data.currency, bold: true })}</span>
        </div>

        <button type="button" class="cart-summary__cta">
          <svg class="cart-summary__cta-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Ödeme yap
        </button>

        ${renderAssurance(assuranceItems)}
      </div>
    </div>
  `;
}
