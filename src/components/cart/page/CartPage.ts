/**
 * CartPage Page Component
 * Composes all cart components into a two-column layout:
 * Left: CartHeader + BatchSelectBar + SupplierCard(s)
 * Right: Sticky CartSummary sidebar
 */

import type { CartSupplier, CartSummaryData, AssuranceItem } from '../../../types/cart';
import { CartHeader } from '../organisms/CartHeader';
import { BatchSelectBar } from '../molecules/BatchSelectBar';
import { SupplierCard, initSupplierCards } from '../organisms/SupplierCard';
import { CartSummary } from './CartSummary';
import { initBatchSelectBar } from '../molecules/BatchSelectBar';
import { initProductItems } from '../molecules/ProductItem';
import { initSkuRows } from '../molecules/SkuRow';
import { initQuantityInputs } from '../atoms/QuantityInput';
import { initCheckbox } from '../atoms/Checkbox';

export interface CartPageProps {
  suppliers: CartSupplier[];
  summary: CartSummaryData;
  assuranceItems?: AssuranceItem[];
}

export function CartPage({ suppliers, summary, assuranceItems }: CartPageProps): string {
  const totalItems = suppliers.reduce(
    (acc, s) => acc + s.products.reduce((a, p) => a + p.skus.length, 0),
    0,
  );

  const selectedCount = suppliers.reduce(
    (acc, s) => acc + s.products.reduce((a, p) => a + p.skus.filter((sk) => sk.selected).length, 0),
    0,
  );

  const supplierCards = suppliers.map((supplier) => SupplierCard({ supplier })).join('');

  return `
    <div class="sc-cart-page max-w-[1640px] mx-auto px-4 py-6">
      <div class="flex gap-5 items-start">
        <!-- Left Column -->
        <div class="flex-1 min-w-0 flex flex-col gap-4">
          ${CartHeader()}
          ${BatchSelectBar({ totalCount: totalItems, selectedCount })}
          <div class="sc-cart-supplier-list flex flex-col gap-4">
            ${supplierCards}
          </div>
        </div>

        <!-- Right Column (Sticky Summary) -->
        <div class="w-[425px] flex-shrink-0">
          <div class="sticky top-24">
            ${CartSummary(summary, assuranceItems)}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Initialize all CartPage interactive behaviors:
 * - Checkbox cascading (supplier → products → SKUs)
 * - Quantity change recalculation
 * - Summary dynamic updates
 */
export function initCartPage(): void {
  initCheckbox();
  initQuantityInputs();
  initSkuRows();
  initProductItems();
  initBatchSelectBar();
  initSupplierCards();
  initCheckboxCascading();
  initSummaryUpdates();
}

/**
 * Checkbox cascading logic:
 * - Supplier checkbox toggles all its products and SKUs
 * - Product checkbox toggles all its SKUs
 * - SKU checkbox updates parent product and supplier states
 * - Batch select-all toggles everything
 */
function initCheckboxCascading(): void {
  const page = document.querySelector('.sc-cart-page');
  if (!page) return;

  // Batch select-all toggle
  page.addEventListener('batch-select-toggle', ((e: CustomEvent) => {
    const checked = e.detail?.checked ?? false;
    const allCheckboxes = page.querySelectorAll<HTMLInputElement>('[data-checkbox]');
    allCheckboxes.forEach((cb) => {
      cb.checked = checked;
      cb.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }) as EventListener);

  // Supplier checkbox cascades to products and SKUs
  page.addEventListener('supplier-select', ((e: CustomEvent) => {
    const supplierId = e.detail?.supplierId;
    const checked = e.detail?.checked ?? false;
    if (!supplierId) return;

    const supplierCard = page.querySelector(`[data-supplier-id="${supplierId}"]`);
    if (!supplierCard) return;

    const childCheckboxes = supplierCard.querySelectorAll<HTMLInputElement>(
      '[data-product-id] [data-checkbox], [data-sku-id] [data-checkbox]',
    );
    childCheckboxes.forEach((cb) => {
      cb.checked = checked;
    });
    recalculateSummary();
  }) as EventListener);

  // Product checkbox cascades to SKUs
  page.addEventListener('checkbox-change', ((e: CustomEvent) => {
    const target = e.target as HTMLElement;
    const productItem = target?.closest?.('[data-product-id]');
    const skuRow = target?.closest?.('[data-sku-id]');

    if (productItem && !skuRow) {
      // Product-level checkbox toggled — cascade to SKUs
      const checked = e.detail?.checked ?? false;
      const skuCheckboxes = productItem.querySelectorAll<HTMLInputElement>(
        '[data-sku-id] [data-checkbox]',
      );
      skuCheckboxes.forEach((cb) => {
        cb.checked = checked;
      });
    }

    if (skuRow) {
      // SKU checkbox toggled — update parent product and supplier
      updateParentCheckboxStates(skuRow);
    }

    recalculateSummary();
  }) as EventListener);
}

/**
 * Update parent product and supplier checkbox states based on child selections.
 */
function updateParentCheckboxStates(skuRow: Element): void {
  const productItem = skuRow.closest('[data-product-id]');
  if (!productItem) return;

  const skuCheckboxes = productItem.querySelectorAll<HTMLInputElement>(
    '[data-sku-id] [data-checkbox]',
  );
  const skuCbArr: HTMLInputElement[] = [];
  skuCheckboxes.forEach((cb) => skuCbArr.push(cb));
  const allSkusChecked = skuCbArr.every((cb) => cb.checked);
  const productCheckbox = productItem.querySelector<HTMLInputElement>(
    ':scope > .sc-product-item [data-checkbox], :scope [data-checkbox]',
  );
  if (productCheckbox && !productCheckbox.closest('[data-sku-id]')) {
    productCheckbox.checked = allSkusChecked;
  }

  const supplierCard = productItem.closest('[data-supplier-id]');
  if (!supplierCard) return;

  const productCheckboxes = supplierCard.querySelectorAll<HTMLInputElement>(
    '[data-product-id] [data-checkbox]',
  );
  const prodCbArr: HTMLInputElement[] = [];
  productCheckboxes.forEach((cb) => prodCbArr.push(cb));
  const allProductsChecked = prodCbArr
    .filter((cb) => !cb.closest('[data-sku-id]'))
    .every((cb) => cb.checked);
  const supplierCheckbox = supplierCard.querySelector<HTMLInputElement>(
    ':scope > [data-checkbox], .sc-supplier-header [data-checkbox]',
  );
  if (supplierCheckbox) {
    supplierCheckbox.checked = allProductsChecked;
  }
}

/**
 * Listen for quantity changes and recalculate summary.
 */
function initSummaryUpdates(): void {
  const page = document.querySelector('.sc-cart-page');
  if (!page) return;

  page.addEventListener('quantity-change', (() => {
    recalculateSummary();
  }) as EventListener);

  page.addEventListener('sku-delete', (() => {
    recalculateSummary();
  }) as EventListener);

  page.addEventListener('product-delete', (() => {
    recalculateSummary();
  }) as EventListener);

  page.addEventListener('batch-delete', (() => {
    recalculateSummary();
  }) as EventListener);
}

/**
 * Recalculate and update the cart summary panel.
 */
function recalculateSummary(): void {
  const page = document.querySelector('.sc-cart-page');
  if (!page) return;

  const skuRows = page.querySelectorAll('[data-sku-id]');
  let selectedCount = 0;
  let productSubtotal = 0;
  const items: { image: string; quantity: number }[] = [];

  skuRows.forEach((row) => {
    const checkbox = row.querySelector<HTMLInputElement>('[data-checkbox]');
    if (!checkbox?.checked) return;

    selectedCount++;

    const qtyInput = row.querySelector<HTMLInputElement>('[data-quantity-input]');
    const quantity = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;

    const priceEl = row.querySelector('[data-unit-price]');
    const unitPrice = priceEl ? parseFloat(priceEl.getAttribute('data-unit-price') || '0') : 0;

    productSubtotal += unitPrice * quantity;

    const img = row.querySelector<HTMLImageElement>('img');
    if (img) {
      items.push({ image: img.src, quantity });
    }
  });

  // Update summary count
  const countEl = page.querySelector('.sc-summary-selected-count');
  if (countEl) countEl.textContent = String(selectedCount);

  // Update subtotal
  const subtotalEl = page.querySelector('.sc-summary-product-subtotal');
  if (subtotalEl) subtotalEl.textContent = `₺${productSubtotal.toFixed(2)}`;

  const totalEl = page.querySelector('.sc-summary-subtotal');
  if (totalEl) totalEl.textContent = `₺${productSubtotal.toFixed(2)}`;
}
