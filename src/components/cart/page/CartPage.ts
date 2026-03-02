/**
 * Cart page composition + store-driven interactions.
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
import { cartStore } from '../state/CartStore';

export interface CartPageProps {
  suppliers: CartSupplier[];
  summary: CartSummaryData;
  assuranceItems?: AssuranceItem[];
}

export function CartPage({ suppliers, summary, assuranceItems }: CartPageProps): string {
  if (suppliers.length === 0) {
    return `
      <div class="sc-cart-page max-w-[1640px] mx-auto px-(--space-page-x) py-4 sm:py-6">
        <div class="flex flex-col items-center justify-center py-20 text-center">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" class="text-text-tertiary mb-6">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <h2 class="text-2xl font-bold text-text-heading mb-2">Sepetiniz boş</h2>
          <p class="text-base text-text-secondary mb-8 max-w-md">Henüz sepetinize ürün eklemediniz. Ürünleri keşfedip sepetinize ekleyebilirsiniz.</p>
          <a href="/products.html" class="inline-flex items-center justify-center h-12 px-8 rounded-full bg-cta-primary text-white font-semibold text-base hover:bg-cta-primary-hover transition-colors no-underline">
            Alışverişe devam et
          </a>
        </div>
      </div>
    `;
  }

  const totalItems = suppliers.reduce(
    (acc, supplier) => acc + supplier.products.reduce((sum, product) => sum + product.skus.length, 0),
    0,
  );

  const selectedCount = suppliers.reduce(
    (acc, supplier) => acc + supplier.products.reduce((sum, product) => sum + product.skus.filter((sku) => sku.selected).length, 0),
    0,
  );

  return `
    <div class="sc-cart-page max-w-[1640px] mx-auto px-(--space-page-x) py-4 sm:py-6">
      <div class="flex flex-col lg:flex-row gap-5 items-start">
        <section class="w-full lg:min-w-0 lg:flex-1 space-y-4">
          ${CartHeader()}
          ${BatchSelectBar({ totalCount: totalItems, selectedCount })}
          <div class="sc-cart-supplier-list space-y-4">
            ${suppliers.map((supplier) => SupplierCard({ supplier, isSingleSupplier: suppliers.length === 1 })).join('')}
          </div>
        </section>

        <section class="w-full lg:w-[425px] lg:sticky lg:top-6 self-start z-10">
          ${CartSummary(summary, assuranceItems)}
        </section>
      </div>
    </div>
  `;
}

export function initCartPage(suppliers?: CartSupplier[], shippingFee?: number, discount?: number): void {
  if (suppliers) {
    cartStore.init(suppliers, shippingFee ?? 0, '$', discount ?? 0);
  }

  initCheckbox();
  initQuantityInputs();
  initSkuRows();
  initProductItems();
  initBatchSelectBar();
  initSupplierCards();

  initStoreEventHandlers();
  initThumbnailSlider();

  cartStore.subscribe(() => {
    syncSummary();
    syncBatchBar();
    syncSupplierTotals();
    checkEmptyCart();
  });

  // Initial render synchronization
  syncSummary();
  syncBatchBar();
  syncSupplierTotals();
}

function initStoreEventHandlers(): void {
  const page = document.querySelector('.sc-cart-page');
  if (!page) return;

  // Accordion Toggle
  page.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const header = target.closest<HTMLElement>('.sc-c-supplier-header');
    if (!header) return;

    // Do not toggle if checkbox or link was clicked (already stopped propagation in HTML, but safe check)
    if (target.closest('.next-checkbox-wrapper') || target.tagName === 'A') return;

    const container = header.closest('.sc-c-supplier-container') as HTMLElement;
    if (!container) return;

    const isOpen = container.dataset.open === 'true';
    container.dataset.open = String(!isOpen);
  });

  page.addEventListener('batch-select-toggle', ((event: CustomEvent) => {
    const checked = event.detail?.selectAll ?? false;
    cartStore.toggleAll(checked);

    page.querySelectorAll<HTMLInputElement>('.next-checkbox-input').forEach((input) => {
      input.checked = checked;
      input.indeterminate = false;
      syncCheckboxVisual(input);
    });
  }) as EventListener);

  page.addEventListener('supplier-select', ((event: CustomEvent) => {
    const supplierId = event.detail?.supplierId as string | undefined;
    const selected = event.detail?.selected ?? false;
    if (!supplierId) return;

    cartStore.toggleSupplierSelection(supplierId, selected);

    const supplierCard = page.querySelector<HTMLElement>(`[data-supplier-id="${supplierId}"]`);
    if (!supplierCard) return;

    supplierCard.querySelectorAll<HTMLInputElement>('.next-checkbox-input').forEach((input) => {
      input.checked = selected;
      input.indeterminate = false;
      syncCheckboxVisual(input);
    });
  }) as EventListener);

  page.addEventListener('checkbox-change', ((event: CustomEvent) => {
    const target = event.target as HTMLElement;
    const skuRow = target.closest<HTMLElement>('[data-sku-id]');
    const productRow = target.closest<HTMLElement>('[data-product-id]');
    const checked = event.detail?.checked ?? false;

    if (skuRow) {
      const skuId = skuRow.dataset.skuId;
      if (!skuId) return;
      cartStore.toggleSkuSelection(skuId, checked);
      updateParentCheckboxStates(skuRow);
      return;
    }

    if (productRow) {
      const productId = productRow.dataset.productId;
      if (!productId) return;

      cartStore.toggleProductSelection(productId, checked);
      productRow.querySelectorAll<HTMLInputElement>('.sc-c-sku-container-new .next-checkbox-input').forEach((input) => {
        input.checked = checked;
        input.indeterminate = false;
        syncCheckboxVisual(input);
      });

      const supplierCard = productRow.closest<HTMLElement>('[data-supplier-id]');
      if (supplierCard) {
        const supplierId = supplierCard.dataset.supplierId;
        if (supplierId) {
          const supplierCheck = supplierCard.querySelector<HTMLInputElement>(`#supplier-checkbox-${supplierId}`);
          if (supplierCheck) {
            const productChecks = supplierCard.querySelectorAll<HTMLInputElement>('.sc-c-spu-container-new > .flex .next-checkbox-input');
            const allSelected = Array.from(productChecks).every((checkbox) => checkbox.checked);
            const someSelected = Array.from(productChecks).some((checkbox) => checkbox.checked || checkbox.indeterminate);
            supplierCheck.checked = allSelected;
            supplierCheck.indeterminate = someSelected && !allSelected;
            syncCheckboxVisual(supplierCheck);
          }
        }
      }
    }
  }) as EventListener);

  page.addEventListener('quantity-change', ((event: CustomEvent) => {
    const inputId = event.detail?.id as string | undefined;
    const value = event.detail?.value as number;
    if (!inputId) return;

    const skuId = inputId.replace('sku-qty-', '');
    cartStore.updateSkuQuantity(skuId, value);
  }) as EventListener);

  page.addEventListener('sku-delete', ((event: CustomEvent) => {
    const skuId = event.detail?.skuId as string | undefined;
    if (!skuId) return;

    const snapshot = cartStore.getSku(skuId);
    const productId = snapshot?.product.id;
    const supplierId = snapshot?.supplier.id;
    const productSkuCount = snapshot?.product.skus.length ?? 0;
    const supplierProductCount = snapshot?.supplier.products.length ?? 0;

    cartStore.deleteSku(skuId);

    page.querySelector(`[data-sku-id="${skuId}"]`)?.remove();

    if (productSkuCount <= 1 && productId) {
      page.querySelector(`[data-product-id="${productId}"]`)?.remove();
      if (supplierProductCount <= 1 && supplierId) {
        page.querySelector(`[data-supplier-id="${supplierId}"]`)?.remove();
      }
    }
  }) as EventListener);

  page.addEventListener('product-delete', ((event: CustomEvent) => {
    const productId = event.detail?.productId as string | undefined;
    if (!productId) return;

    const snapshot = cartStore.getProduct(productId);
    const supplierId = snapshot?.supplier.id;
    const supplierProductCount = snapshot?.supplier.products.length ?? 0;

    cartStore.deleteProduct(productId);

    page.querySelector(`[data-product-id="${productId}"]`)?.remove();

    if (supplierProductCount <= 1 && supplierId) {
      page.querySelector(`[data-supplier-id="${supplierId}"]`)?.remove();
    }
  }) as EventListener);

  page.addEventListener('batch-delete', (() => {
    const selectedIds = new Set(cartStore.getSelectedSkus().map((sku) => sku.id));
    cartStore.deleteSelected();

    selectedIds.forEach((skuId) => {
      page.querySelector(`[data-sku-id="${skuId}"]`)?.remove();
    });

    page.querySelectorAll<HTMLElement>('[data-product-id]').forEach((product) => {
      if (!product.querySelector('[data-sku-id]')) product.remove();
    });

    page.querySelectorAll<HTMLElement>('[data-supplier-id]').forEach((supplier) => {
      if (!supplier.querySelector('[data-product-id]')) supplier.remove();
    });
  }) as EventListener);

  page.addEventListener('product-favorite', ((event: CustomEvent) => {
    const productId = event.detail?.productId as string | undefined;
    if (!productId) return;

    const snapshot = cartStore.getProduct(productId);
    if (!snapshot) return;

    // Save to local storage mock
    try {
      const stored = localStorage.getItem('tradehub-favorites') || '[]';
      const parsed = JSON.parse(stored);
      parsed.push({
        id: productId,
        image: snapshot.product.skus[0]?.skuImage || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
        title: snapshot.product.title,
        priceRange: `$${snapshot.product.skus[0]?.unitPrice || 0}`,
        minOrder: snapshot.product.moqLabel || 'Min. order: 1 piece'
      });
      localStorage.setItem('tradehub-favorites', JSON.stringify(parsed));
    } catch (e) { }

    showFavoriteToast();

    const supplierId = snapshot.supplier.id;
    const supplierProductCount = snapshot.supplier.products.length;

    cartStore.deleteProduct(productId);
    page.querySelector(`[data-product-id="${productId}"]`)?.remove();

    if (supplierProductCount <= 1 && supplierId) {
      page.querySelector(`[data-supplier-id="${supplierId}"]`)?.remove();
    }
  }) as EventListener);
}

function syncSummary(): void {
  const page = document.querySelector('.sc-cart-page');
  if (!page) return;

  const summary = cartStore.getSummary();

  const countEl = page.querySelector<HTMLElement>('.sc-summary-selected-count');
  if (countEl) countEl.textContent = String(summary.selectedCount);

  const subtotalEl = page.querySelector<HTMLElement>('.sc-summary-product-subtotal');
  if (subtotalEl) subtotalEl.textContent = `$${summary.productSubtotal.toFixed(2).replace('.', ',')}`;

  const discountRow = page.querySelector<HTMLElement>('.sc-summary-discount-row');
  const discountEl = page.querySelector<HTMLElement>('.sc-summary-discount');
  const banner = page.querySelector<HTMLElement>('.sc-summary-savings-banner');

  if (summary.discount > 0) {
    const formatted = `- $${summary.discount.toFixed(2).replace('.', ',')}`;
    discountRow?.classList.remove('hidden');
    if (discountEl) discountEl.textContent = formatted;
    if (banner) {
      banner.classList.remove('hidden');
      banner.innerHTML = `Siparişinizde <strong>$${summary.discount.toFixed(2).replace('.', ',')}</strong> tasarruf edildi`;
    }
  } else {
    discountRow?.classList.add('hidden');
    banner?.classList.add('hidden');
  }

  const totalEl = page.querySelector<HTMLElement>('.sc-summary-subtotal');
  if (totalEl) totalEl.textContent = `$${summary.subtotal.toFixed(2).replace('.', ',')}`;

  updateThumbnailGrid(summary.items);
}

function syncSupplierTotals(): void {
  const page = document.querySelector('.sc-cart-page');
  if (!page) return;

  page.querySelectorAll<HTMLElement>('.sc-c-supplier-container').forEach((container) => {
    const supplierId = container.dataset.supplierId;
    if (!supplierId) return;

    const supplier = cartStore.getSupplier(supplierId);
    if (!supplier) return;

    let subtotal = 0;
    supplier.products.forEach(product => {
      product.skus.forEach(sku => {
        if (sku.selected) {
          subtotal += sku.unitPrice * sku.quantity;
        }
      });
    });

    const totalEl = container.querySelector<HTMLElement>('.sc-c-supplier-total');
    if (totalEl) {
      if (subtotal > 0) {
        totalEl.textContent = `Toplam: ${supplier.products[0]?.skus[0]?.currency || '$'}${subtotal.toFixed(2).replace('.', ',')}`;
      } else {
        totalEl.textContent = '';
      }
    }
  });
}

function syncBatchBar(): void {
  const page = document.querySelector('.sc-cart-page');
  if (!page) return;

  const total = cartStore.getTotalSkuCount();
  const selected = cartStore.getSelectedSkuCount();

  const count = page.querySelector<HTMLElement>('.sc-c-batch-count');
  if (count) count.textContent = `(${total})`;

  const deleteBtn = page.querySelector<HTMLButtonElement>('.sc-c-batch-delete-btn');
  if (deleteBtn) deleteBtn.disabled = selected === 0;

  const selectAll = page.querySelector<HTMLInputElement>('#batch-select-all');
  if (selectAll) {
    selectAll.checked = total > 0 && selected === total;
    selectAll.indeterminate = selected > 0 && selected < total;
    syncCheckboxVisual(selectAll);
  }
}

function syncCheckboxVisual(input: HTMLInputElement): void {
  const wrapper = input.closest<HTMLElement>('.next-checkbox-wrapper');
  if (!wrapper) return;

  const box = wrapper.querySelector<HTMLElement>('.next-checkbox');
  const check = wrapper.querySelector<HTMLElement>('.next-checkbox-check');
  const dash = wrapper.querySelector<HTMLElement>('.next-checkbox-dash');
  if (!box || !check || !dash) return;

  const active = input.checked || input.indeterminate;

  box.classList.toggle('border-transparent', active);
  box.classList.toggle('bg-text-primary', active);
  box.classList.toggle('text-white', active);
  box.classList.toggle('border-border-strong', !active);
  box.classList.toggle('bg-surface', !active);

  check.classList.toggle('hidden', !input.checked);
  check.classList.toggle('block', input.checked);

  const showDash = input.indeterminate && !input.checked;
  dash.classList.toggle('hidden', !showDash);
  dash.classList.toggle('block', showDash);

  wrapper.classList.toggle('checked', input.checked);
  wrapper.classList.toggle('indeterminate', input.indeterminate);

  if (input.indeterminate) input.setAttribute('data-indeterminate', 'true');
  else input.removeAttribute('data-indeterminate');
}

function updateParentCheckboxStates(skuRow: Element): void {
  const productRow = skuRow.closest<HTMLElement>('[data-product-id]');
  if (!productRow) return;

  const productId = productRow.dataset.productId;
  const productCheckbox = productId ? productRow.querySelector<HTMLInputElement>(`#product-checkbox-${productId}`) : null;
  const skuChecks = Array.from(productRow.querySelectorAll<HTMLInputElement>('.sc-c-sku-container-new .next-checkbox-input'));

  if (productCheckbox && skuChecks.length > 0) {
    const all = skuChecks.every((checkbox) => checkbox.checked);
    const some = skuChecks.some((checkbox) => checkbox.checked || checkbox.indeterminate);
    productCheckbox.checked = all;
    productCheckbox.indeterminate = some && !all;
    syncCheckboxVisual(productCheckbox);
  }

  const supplier = productRow.closest<HTMLElement>('[data-supplier-id]');
  if (!supplier) return;

  const supplierId = supplier.dataset.supplierId;
  const supplierCheckbox = supplierId ? supplier.querySelector<HTMLInputElement>(`#supplier-checkbox-${supplierId}`) : null;
  const productChecks = Array.from(supplier.querySelectorAll<HTMLInputElement>('.sc-c-spu-container-new > .flex .next-checkbox-input'));

  if (supplierCheckbox && productChecks.length > 0) {
    const all = productChecks.every((checkbox) => checkbox.checked);
    const some = productChecks.some((checkbox) => checkbox.checked || checkbox.indeterminate);
    supplierCheckbox.checked = all;
    supplierCheckbox.indeterminate = some && !all;
    syncCheckboxVisual(supplierCheckbox);
  }
}

function updateThumbnailGrid(items: { image: string; quantity: number }[]): void {
  const track = document.querySelector<HTMLElement>('.checkout-items-images');
  if (!track) return;

  track.innerHTML = items.map((item) => `
    <div class="relative w-16 h-16 rounded-md overflow-hidden border border-border-default shrink-0">
      <img src="${item.image}" alt="SKU" class="w-full h-full object-cover" />
      <span class="absolute right-0 bottom-0 px-1 py-[2px] rounded-tl bg-black/65 text-white text-[11px] font-bold leading-none">${item.quantity}</span>
    </div>
  `).join('');

  track.dispatchEvent(new Event('scroll'));
}

function initThumbnailSlider(): void {
  const wrapper = document.querySelector<HTMLElement>('.checkout-items-wrapper');
  if (!wrapper) return;

  const track = wrapper.querySelector<HTMLElement>('.checkout-items-images');
  const left = wrapper.querySelector<HTMLButtonElement>('[data-dir="left"]');
  const right = wrapper.querySelector<HTMLButtonElement>('[data-dir="right"]');
  if (!track || !left || !right) return;

  const updateVisibility = () => {
    const overflows = track.scrollWidth > track.clientWidth + 1;
    left.classList.toggle('!hidden', !overflows);
    right.classList.toggle('!hidden', !overflows);

    if (!overflows) return;

    const atStart = track.scrollLeft <= 1;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;

    left.classList.toggle('!opacity-0', atStart);
    left.classList.toggle('!pointer-events-none', atStart);
    right.classList.toggle('!opacity-0', atEnd);
    right.classList.toggle('!pointer-events-none', atEnd);
  };

  wrapper.querySelectorAll<HTMLButtonElement>('.checkout-items-arrow').forEach((button) => {
    button.addEventListener('click', () => {
      const dir = button.dataset.dir;
      track.scrollBy({ left: dir === 'left' ? -140 : 140, behavior: 'smooth' });
    });
  });

  track.addEventListener('scroll', updateVisibility, { passive: true });
  window.addEventListener('resize', updateVisibility, { passive: true });
  updateVisibility();
}

function checkEmptyCart(): void {
  if (cartStore.getTotalSkuCount() > 0) return;

  const page = document.querySelector('.sc-cart-page');
  if (!page) return;

  page.innerHTML = `
    <div class="flex flex-col items-center justify-center py-20 text-center">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" class="text-text-tertiary mb-6">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
      <h2 class="text-2xl font-bold text-text-heading mb-2">Sepetiniz boş</h2>
      <p class="text-base text-text-secondary mb-8 max-w-md">Henüz sepetinize ürün eklemediniz. Ürünleri keşfedip sepetinize ekleyebilirsiniz.</p>
      <a href="/products.html" class="inline-flex items-center justify-center h-12 px-8 rounded-full bg-cta-primary text-white font-semibold text-base hover:bg-cta-primary-hover transition-colors no-underline">
        Alışverişe devam et
      </a>
    </div>
  `;
}

function showFavoriteToast(): void {
  const existing = document.getElementById('fav-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'fav-toast';
  toast.className = 'fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex items-center justify-between gap-4 px-4 py-3 min-w-[340px] rounded bg-[#E4F8E2] border border-[#CAEFC7] shadow-sm text-[14px] text-[#333] transition-all duration-300 translate-y-[-20px] opacity-0';
  toast.innerHTML = `
    <div class="flex items-center gap-2">
      <svg class="w-4 h-4 text-[#2db744]" viewBox="0 0 1024 1024" fill="currentColor">
        <path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.8 535.2L292.6 435.6a32 32 0 1 0-45.2 45.3l186 186a32 32 0 0 0 45.2 0l324-324a32 32 0 0 0-45.2-45.3L456.2 599.2z"/>
      </svg>
      <span>Successfully moved to <a href="/favorites.html" class="text-[#333] underline hover:text-[#ff6a00]">Favorites</a></span>
    </div>
    <button class="text-[#999] hover:text-[#666] shrink-0" onclick="this.parentElement.remove()">
      <svg class="w-3.5 h-3.5" viewBox="0 0 1024 1024" fill="currentColor">
        <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"/>
      </svg>
    </button>
  `;

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = 'translate(-50%, 0)';
    toast.style.opacity = '1';
  });

  setTimeout(() => {
    if (document.body.contains(toast)) {
      toast.style.opacity = '0';
      toast.style.transform = 'translate(-50%, -20px)';
      setTimeout(() => toast.remove(), 300);
    }
  }, 3000);
}
