/**
 * CartSummary Page Component
 * Right sidebar sticky summary panel with order totals, product thumbnails,
 * line items, CTA button, and assurance block.
 */

import type { CartSummaryData, AssuranceItem } from '../../../types/cart';
import { PriceDisplay } from '../atoms/PriceDisplay';

const defaultAssuranceItems: AssuranceItem[] = [
  {
    icon: '🛡️',
    title: 'Güvenli Ödeme',
    description: 'Her ödeme güvenli ve emniyetlidir',
  },
  {
    icon: '📦',
    title: 'Kolay İade',
    description: 'Siparişiniz zamanında teslim edilir',
  },
  {
    icon: '✅',
    title: 'Tedarikçi Güvencesi',
    description: 'Memnun kalmazsanız paranız iade edilir',
  },
];

function renderThumbnailGrid(items: CartSummaryData['items']): string {
  if (items.length === 0) return '';

  const thumbnails = items
    .map(
      (item) => `
      <div class="checkout-item-card">
        <div class="item-image-container">
          <img src="${item.image}" alt="" />
        </div>
        <span class="item-quantity-badge">${item.quantity}</span>
      </div>`
    )
    .join('');

  return `<div class="checkout-items-wrapper"><div class="checkout-items-images">${thumbnails}</div></div>`;
}

function renderAssurance(items: AssuranceItem[]): string {
  const rows = items
    .map(
      (item) => `
      <li>
        <div class="item-title">
          <span>${item.icon}</span>
          <span>${item.title}</span>
        </div>
        <div class="item-desc">${item.description}</div>
      </li>`
    )
    .join('');

  return `
    <div class="assurance-block">
      <div class="assurance-block-title">Alibaba.com sipariş koruması</div>
      <ul>${rows}</ul>
    </div>
  `;
}

export function CartSummary(
  data: CartSummaryData,
  assuranceItems: AssuranceItem[] = defaultAssuranceItems
): string {
  return `
    <div class="sc-shopping-cart-summary-container">
      <div class="summary-title">Sipariş özeti (<span class="sc-summary-selected-count">${data.selectedCount}</span> Ürün)</div>

      ${renderThumbnailGrid(data.items)}

      <div class="summary-body">
        <div class="summary-row">
          <span>Ürün ara toplamı</span>
          <span class="sc-summary-product-subtotal">${PriceDisplay({ amount: data.productSubtotal, currency: data.currency })}</span>
        </div>
        <div class="summary-row">
          <span>Kargo ücreti</span>
          <span>${PriceDisplay({ amount: data.shippingFee, currency: data.currency })}</span>
        </div>
      </div>

      <div class="summary-row-total">
        <span>Ara toplam (vergi hariç)</span>
        <span class="sc-summary-subtotal">${PriceDisplay({ amount: data.subtotal, currency: data.currency, bold: true })}</span>
      </div>

      <button type="button" class="summary-checkout-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:8px;">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        Ödeme yap
      </button>

      ${renderAssurance(assuranceItems)}
    </div>
  `;
}
