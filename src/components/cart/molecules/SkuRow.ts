/**
 * SkuRow Molecule
 * A single SKU variant row: Checkbox + SKU thumbnail + variant selector display
 * (styled like 'next-select' dropdown) + PriceDisplay + QuantityInput + delete button.
 * Follows sc-c-sku-container-new-wrapper DOM structure from codex brief.
 */

import type { CartSku } from '../../../types/cart';
import { Checkbox } from '../atoms/Checkbox';
import { PriceDisplay } from '../atoms/PriceDisplay';
import { QuantityInput } from '../atoms/QuantityInput';

export interface SkuRowProps {
  sku: CartSku;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function SkuRow({ sku }: SkuRowProps): string {
  const checkbox = Checkbox({
    id: `sku-checkbox-${sku.id}`,
    checked: sku.selected,
    onChange: `sku-select-${sku.id}`,
  });

  const thumbnail = `<img class="sc-c-sku-thumbnail" src="${escapeHtml(sku.skuImage)}" alt="SKU ${escapeHtml(sku.id)}" loading="lazy" />`;

  const variantSelector = `
    <div class="next-select sc-c-sku-variant-selector" data-sku-id="${escapeHtml(sku.id)}">
      <span class="next-select-inner">${escapeHtml(sku.variantText)}</span>
    </div>
  `.trim();

  const price = PriceDisplay({
    amount: sku.unitPrice,
    currency: sku.currency,
    unit: sku.unit,
  });

  const quantity = QuantityInput({
    id: `sku-qty-${sku.id}`,
    value: sku.quantity,
    min: sku.minQty,
    max: sku.maxQty,
  });

  const deleteBtn = `<button type="button" class="sc-c-sku-delete-btn" data-sku-id="${escapeHtml(sku.id)}" aria-label="Delete SKU">`
    + `<i class="sc-c-sku-delete-icon"></i>`
    + `</button>`;

  return `
    <div class="sc-c-sku-container-new-wrapper" data-sku-id="${escapeHtml(sku.id)}">
      <div class="sc-c-sku-checkbox">${checkbox}</div>
      <div class="sc-c-sku-image">${thumbnail}</div>
      <div class="sc-c-sku-variant">${variantSelector}</div>
      <div class="sc-c-sku-price">${price}</div>
      <div class="sc-c-sku-quantity">${quantity}</div>
      <div class="sc-c-sku-actions">${deleteBtn}</div>
    </div>
  `.trim();
}

export function initSkuRows(container?: HTMLElement): void {
  const root = container || document;
  const rows = root.querySelectorAll<HTMLElement>('.sc-c-sku-container-new-wrapper');

  rows.forEach((row) => {
    const skuId = row.dataset.skuId;
    if (!skuId) return;

    const deleteBtn = row.querySelector<HTMLButtonElement>('.sc-c-sku-delete-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => {
        deleteBtn.dispatchEvent(new CustomEvent('sku-delete', {
          bubbles: true,
          detail: { skuId },
        }));
      });
    }
  });
}
