/**
 * SupplierCard Organism
 * Groups products by supplier. Header: supplier-level Checkbox + supplier name
 * as clickable link + supplier badge area. Body: renders child ProductItem(s).
 * Matches sc-c-supplier-container DOM from codex briefs.
 * Accepts CartSupplier data. Supplier checkbox selects/deselects all nested
 * products and SKUs.
 */

import type { CartSupplier } from '../../../types/cart';
import { Checkbox } from '../atoms/Checkbox';
import { ProductItem } from '../molecules/ProductItem';

export interface SupplierCardProps {
  supplier: CartSupplier;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function SupplierCard({ supplier }: SupplierCardProps): string {
  const checkbox = Checkbox({
    id: `supplier-checkbox-${supplier.id}`,
    checked: supplier.selected,
    onChange: `supplier-select-${supplier.id}`,
  });

  const nameLink = `<a class="sc-c-supplier-name-link" href="${escapeHtml(supplier.href)}">${escapeHtml(supplier.name)}</a>`;

  const productItems = supplier.products
    .map((product) => ProductItem({ product }))
    .join('\n');

  return `
    <div class="sc-c-supplier-container" data-supplier-id="${escapeHtml(supplier.id)}">
      <div class="sc-c-supplier-header">
        <div class="sc-c-supplier-checkbox">${checkbox}</div>
        <div class="sc-c-supplier-name">${nameLink}</div>
        <div class="sc-c-supplier-badge"></div>
      </div>
      <div class="sc-c-supplier-products">
        ${productItems}
      </div>
    </div>
  `.trim();
}

export function initSupplierCards(container?: HTMLElement): void {
  const root = container || document;
  const cards = root.querySelectorAll<HTMLElement>('.sc-c-supplier-container');

  cards.forEach((card) => {
    const supplierId = card.dataset.supplierId;
    if (!supplierId) return;

    const supplierCheckbox = card.querySelector<HTMLInputElement>(`#supplier-checkbox-${supplierId}`);
    if (supplierCheckbox) {
      supplierCheckbox.addEventListener('change', () => {
        const checked = supplierCheckbox.checked;

        // Select/deselect all nested product checkboxes
        const productCheckboxes = card.querySelectorAll<HTMLInputElement>(
          '.sc-c-spu-container-new input[type="checkbox"]',
        );
        productCheckboxes.forEach((cb) => {
          cb.checked = checked;
        });

        // Select/deselect all nested SKU checkboxes
        const skuCheckboxes = card.querySelectorAll<HTMLInputElement>(
          '.sc-c-sku-row input[type="checkbox"]',
        );
        skuCheckboxes.forEach((cb) => {
          cb.checked = checked;
        });

        card.dispatchEvent(new CustomEvent('supplier-select', {
          bubbles: true,
          detail: { supplierId, selected: checked },
        }));
      });
    }
  });
}
