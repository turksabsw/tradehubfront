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

  const thumbnail = `<img class="w-full h-full object-cover block" src="${escapeHtml(sku.skuImage)}" alt="SKU ${escapeHtml(sku.id)}" loading="lazy" />`;

  const variantSelector = `
    <div class="inline-flex items-center px-3 py-1 border border-[#e5e5e5] rounded text-xs text-[#333] bg-white cursor-pointer max-w-full transition-colors duration-150 hover:border-[#ff6a00]" data-sku-id="${escapeHtml(sku.id)}">
      <span class="overflow-hidden text-ellipsis whitespace-nowrap">${escapeHtml(sku.variantText)}</span>
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

  const deleteBtn = `<button type="button" class="sc-c-sku-delete-btn inline-flex items-center justify-center w-7 h-7 border-none bg-transparent cursor-pointer text-[#999] rounded transition-colors duration-150 hover:text-[#ff4747] hover:bg-[#fff0f0]" data-sku-id="${escapeHtml(sku.id)}" aria-label="Delete SKU">`
    + `<i class="sc-c-sku-delete-icon before:content-['\\2715'] before:text-sm"></i>`
    + `</button>`;

  return `
    <div class="sc-c-sku-container-new-wrapper grid grid-cols-[24px_64px_1fr_auto_auto_32px] gap-3 items-center py-3 pl-7 border-t border-[#f5f5f5] first:border-t-0" data-sku-id="${escapeHtml(sku.id)}">
      <div class="flex items-center justify-center">${checkbox}</div>
      <div class="w-16 h-16 flex-shrink-0 border border-[#e5e5e5] rounded overflow-hidden">${thumbnail}</div>
      <div class="min-w-0">${variantSelector}</div>
      <div class="whitespace-nowrap" data-unit-price="${sku.unitPrice}">${price}</div>
      <div class="flex-shrink-0">${quantity}</div>
      <div class="flex items-center justify-center">${deleteBtn}</div>
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
