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
  return `<span class="sc-c-spu-tag" style="color:${escapeHtml(tag.color)};background:${escapeHtml(tag.bgColor)}">${escapeHtml(tag.text)}</span>`;
}

export function ProductItem({ product }: ProductItemProps): string {
  const checkbox = Checkbox({
    id: `product-checkbox-${product.id}`,
    checked: product.selected,
    onChange: `product-select-${product.id}`,
  });

  const titleLink = `<a class="sc-c-spu-title-link" href="${escapeHtml(product.href)}">${escapeHtml(product.title)}</a>`;

  const favoriteBtn = `<button type="button" class="sc-c-spu-favorite-btn" data-product-id="${escapeHtml(product.id)}" aria-label="Favorite">`
    + `<i class="sc-c-spu-favorite-icon ${escapeHtml(product.favoriteIcon)}"></i>`
    + `</button>`;

  const deleteBtn = `<button type="button" class="sc-c-spu-delete-btn" data-product-id="${escapeHtml(product.id)}" aria-label="Delete product">`
    + `<i class="sc-c-spu-delete-icon ${escapeHtml(product.deleteIcon)}"></i>`
    + `</button>`;

  const tags = product.tags.length > 0
    ? `<div class="sc-c-spu-tags">${product.tags.map(renderTag).join('')}</div>`
    : '';

  const moqLabel = product.moqLabel
    ? `<span class="sc-c-spu-moq-label">${escapeHtml(product.moqLabel)}</span>`
    : '';

  const skuRows = product.skus.map((sku) => SkuRow({ sku })).join('\n');

  return `
    <div class="sc-c-spu-container-new" data-product-id="${escapeHtml(product.id)}">
      <div class="sc-c-spu-header">
        <div class="sc-c-spu-checkbox">${checkbox}</div>
        <div class="sc-c-spu-title">${titleLink}</div>
        <div class="sc-c-spu-actions">
          ${favoriteBtn}
          ${deleteBtn}
        </div>
      </div>
      ${tags}
      ${moqLabel}
      <div class="sc-c-spu-sku-list">
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
