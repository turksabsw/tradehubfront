/**
 * ProductItem Molecule
 * A product entry: product-level Checkbox + product title link + favorite heart icon
 * + delete trash icon + delivery tags (green 'Tahmini teslimat tarihi: ...' and optional
 * red '180 günün en düşük fiyatı') + min order label + renders child SkuRow(s).
 * Accepts CartProduct data. Follows sc-c-spu-container-new DOM structure.
 */

import type { CartProduct, CartProductTag } from '../../../types/cart';
import { Checkbox } from '../atoms/Checkbox';
import { SkuRow } from './SkuRow';

export interface ProductItemProps {
  product: CartProduct;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderTag(tag: CartProductTag): string {
  return `<span class="inline-block px-2 py-0.5 rounded text-xs leading-[18px] whitespace-nowrap" style="color:${escapeHtml(tag.color)};background:${escapeHtml(tag.bgColor)}">${escapeHtml(tag.text)}</span>`;
}

export function ProductItem({ product }: ProductItemProps): string {
  const checkbox = Checkbox({
    id: `product-checkbox-${product.id}`,
    checked: product.selected,
    onChange: `product-select-${product.id}`,
  });

  const titleLink = `<a class="block text-[#222] no-underline text-xs sm:text-sm leading-5 overflow-hidden text-ellipsis whitespace-nowrap hover:text-[#cc9900] hover:underline" href="${escapeHtml(product.href)}">${escapeHtml(product.title)}</a>`;

  const actionBtnCls = 'inline-flex items-center justify-center w-7 h-7 border-none bg-transparent cursor-pointer text-[#999] text-base rounded transition-colors duration-150 hover:text-[#ff4747] hover:bg-[#fff0f0]';

  const favoriteBtn = `<button type="button" class="sc-c-spu-favorite-btn ${actionBtnCls}" data-product-id="${escapeHtml(product.id)}" aria-label="Favorite">`
    + `<i class="sc-c-spu-favorite-icon ${escapeHtml(product.favoriteIcon)}"></i>`
    + `</button>`;

  const deleteBtn = `<button type="button" class="sc-c-spu-delete-btn ${actionBtnCls}" data-product-id="${escapeHtml(product.id)}" aria-label="Delete product">`
    + `<i class="sc-c-spu-delete-icon ${escapeHtml(product.deleteIcon)}"></i>`
    + `</button>`;

  const tags = product.tags.length > 0
    ? `<div class="flex gap-2 mb-2 pl-7 flex-wrap">${product.tags.map(renderTag).join('')}</div>`
    : '';

  const moqLabel = product.moqLabel
    ? `<span class="block text-xs text-[#999] mb-2 pl-7">${escapeHtml(product.moqLabel)}</span>`
    : '';

  const skuRows = product.skus.map((sku) => SkuRow({ sku })).join('\n');

  return `
    <div class="sc-c-spu-container-new py-4 border-b border-[#f0f0f0] last:border-b-0" data-product-id="${escapeHtml(product.id)}">
      <div class="flex items-start gap-2 sm:gap-3 mb-2">
        <div class="flex-shrink-0 pt-0.5">${checkbox}</div>
        <div class="flex-1 min-w-0">${titleLink}</div>
        <div class="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          ${favoriteBtn}
          ${deleteBtn}
        </div>
      </div>
      ${tags}
      ${moqLabel}
      <div class="flex flex-col">
        ${skuRows}
      </div>
    </div>
  `.trim();
}

export function initProductItems(container?: HTMLElement): void {
  const root = container || document;
  const items = root.querySelectorAll<HTMLElement>('.sc-c-spu-container-new');

  items.forEach((item) => {
    const productId = item.dataset.productId;
    if (!productId) return;

    const favoriteBtn = item.querySelector<HTMLButtonElement>('.sc-c-spu-favorite-btn');
    if (favoriteBtn) {
      favoriteBtn.addEventListener('click', () => {
        favoriteBtn.dispatchEvent(new CustomEvent('product-favorite', {
          bubbles: true,
          detail: { productId },
        }));
      });
    }

    const deleteBtn = item.querySelector<HTMLButtonElement>('.sc-c-spu-delete-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => {
        deleteBtn.dispatchEvent(new CustomEvent('product-delete', {
          bubbles: true,
          detail: { productId },
        }));
      });
    }
  });
}
