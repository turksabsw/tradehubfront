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

  const nameLink = `<a class="text-[#222] no-underline font-semibold hover:text-[#cc9900] hover:underline" href="${escapeHtml(supplier.href)}">${escapeHtml(supplier.name)}</a>`;

  const productItems = supplier.products
    .map((product) => ProductItem({ product }))
    .join('\n');

  return `
    <div class="sc-c-supplier-container block border border-[#e5e5e5] rounded-lg bg-white overflow-hidden" data-supplier-id="${escapeHtml(supplier.id)}">
      <div class="sc-c-supplier-header flex items-center gap-3 px-5 py-4 border-b border-[#e5e5e5] bg-white">
        <div class="flex-shrink-0">${checkbox}</div>
        <div class="text-sm font-semibold text-[#222] leading-5 flex-1 min-w-0">${nameLink}</div>
        <div class="flex-shrink-0"></div>
      </div>
      <div class="px-5">
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
          '.sc-c-sku-container-new-wrapper input[type="checkbox"]',
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
