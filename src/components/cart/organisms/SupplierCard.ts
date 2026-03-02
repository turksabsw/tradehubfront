/**
 * Supplier card containing product rows.
 */

import type { CartSupplier } from '../../../types/cart';
import { Checkbox } from '../atoms/Checkbox';
import { ProductItem } from '../molecules/ProductItem';

export interface SupplierCardProps {
  supplier: CartSupplier;
  isSingleSupplier?: boolean;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function SupplierCard({ supplier, isSingleSupplier = true }: SupplierCardProps): string {
  const products = supplier.products.map((product) => ProductItem({ product })).join('');
  const isOpen = isSingleSupplier;

  return `
    <section class="sc-c-supplier-container group/supplier rounded-3xl border border-border-default bg-surface overflow-hidden" data-supplier-id="${escapeHtml(supplier.id)}" data-open="${String(isOpen)}">
      <header class="sc-c-supplier-header flex items-center justify-between gap-3 px-5 py-4 border-b border-border-default max-sm:px-3 max-sm:py-3 cursor-pointer hover:bg-surface-muted transition-colors select-none">
        <div class="flex items-center gap-3 w-full lg:w-auto overflow-hidden">
          <div onclick="event.stopPropagation()">
            ${Checkbox({ id: `supplier-checkbox-${supplier.id}`, checked: supplier.selected, onChange: `supplier-select-${supplier.id}` })}
          </div>
          <a href="${escapeHtml(supplier.href)}" onclick="event.stopPropagation()" class="text-lg font-semibold text-text-heading hover:text-cta-primary hover:underline truncate">${escapeHtml(supplier.name)}</a>
          <svg class="sc-c-supplier-chevron w-5 h-5 text-text-tertiary transition-transform duration-300 ml-1 shrink-0 group-data-[open=true]/supplier:rotate-180" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div class="text-sm font-bold text-text-primary whitespace-nowrap sc-c-supplier-total group-data-[open=true]/supplier:hidden">
          <!-- Dinamik olarak CartPage üzerinden doldurulacak -->
        </div>
      </header>
      <div class="sc-c-supplier-content px-5 pb-1 max-sm:px-3 transition-all duration-300 group-data-[open=false]/supplier:hidden">${products}</div>
    </section>
  `.trim();
}

export function initSupplierCards(container?: HTMLElement): void {
  const root = container || document;
  const cards = root.querySelectorAll<HTMLElement>('.sc-c-supplier-container');

  cards.forEach((card) => {
    const supplierId = card.dataset.supplierId;
    if (!supplierId) return;

    const supplierCheckbox = card.querySelector<HTMLInputElement>(`#supplier-checkbox-${supplierId}`);
    supplierCheckbox?.addEventListener('change', () => {
      const checked = supplierCheckbox.checked;

      const productCheckboxes = card.querySelectorAll<HTMLInputElement>('.sc-c-spu-container-new .next-checkbox-input');
      productCheckboxes.forEach((checkbox) => {
        checkbox.checked = checked;
      });

      const skuCheckboxes = card.querySelectorAll<HTMLInputElement>('.sc-c-sku-container-new .next-checkbox-input');
      skuCheckboxes.forEach((checkbox) => {
        checkbox.checked = checked;
      });

      card.dispatchEvent(new CustomEvent('supplier-select', {
        bubbles: true,
        detail: { supplierId, selected: checked },
      }));
    });
  });
}
