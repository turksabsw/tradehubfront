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
    <div class="inline-flex items-center px-3 py-1 bg-[#f5f5f5] rounded-full text-[13px] text-[#222] cursor-pointer max-w-full transition-colors duration-150 hover:bg-[#e8e8e8]" data-sku-id="${escapeHtml(sku.id)}">
      <span class="overflow-hidden text-ellipsis whitespace-nowrap">${escapeHtml(sku.variantText)}</span>
      <i class="ml-1 opacity-60 text-[10px]">&#9660;</i>
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
    <div class="sc-c-sku-container-new flex py-4 pl-2 lg:pl-5 border-t border-[#f5f5f5] first:border-t-0 gap-3 lg:gap-4 items-start" data-sku-id="${escapeHtml(sku.id)}">
      <div class="flex items-center justify-center flex-shrink-0 mt-[34px] lg:mt-[38px]">${checkbox}</div>
      <div class="w-20 h-20 lg:w-[96px] lg:h-[96px] flex-shrink-0 rounded overflow-hidden border border-[#e5e5e5] bg-white">${thumbnail}</div>
      <div class="flex-1 min-w-0 flex flex-col justify-between self-stretch">
        <div class="flex justify-between items-start gap-2">
          <div class="min-w-0">${variantSelector}</div>
          <div class="flex-shrink-0 -mt-1 -mr-2">${deleteBtn}</div>
        </div>
        <div class="flex items-end justify-between mt-auto pt-2" data-unit-price="${sku.unitPrice}">
          <div class="flex-shrink-0">${price}</div>
          <div class="flex-shrink-0">${quantity}</div>
        </div>
      </div>
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
