/**
 * CartPage Page Component
 * Composes all cart components into a two-column layout:
 * Left: CartHeader + BatchSelectBar + SupplierCard(s)
 * Right: Sticky CartSummary sidebar
 *
 * Store-entegreli: CartStore merkezi state, DOM cerrahi güncelleniyor.
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
    <div class="sc-cart-page max-w-[1640px] mx-auto px-(--space-page-x) py-3 sm:py-6">
      <div class="flex flex-col lg:flex-row gap-3 sm:gap-5 items-start w-full">
        <!-- Left Column -->
        <div class="w-full lg:flex-1 lg:min-w-0 flex flex-col gap-3 sm:gap-4">
          ${CartHeader()}
          ${BatchSelectBar({ totalCount: totalItems, selectedCount })}
          <div class="sc-cart-supplier-list flex flex-col gap-3 sm:gap-4">
            ${supplierCards}
          </div>
        </div>

        <!-- Right Column (Sticky Summary) -->
        <div class="w-full lg:w-[425px] flex-shrink-0 lg:sticky lg:top-[71px] self-start">
          ${CartSummary(summary, assuranceItems)}
        </div>
      </div>
    </div>
  `;
}

/**
 * Initialize all CartPage interactive behaviors with CartStore integration.
 * Store is the single source of truth; DOM events → store mutations → DOM updates.
 */
export function initCartPage(suppliers?: CartSupplier[], shippingFee?: number, discount?: number): void {
  // Store'u başlat (suppliers verilmişse)
  if (suppliers) {
    cartStore.init(suppliers, shippingFee ?? 0, '$', discount ?? 0);
  }

  // Atom/molecule init'leri (DOM event binding)
  initCheckbox();
  initQuantityInputs();
  initSkuRows();
  initProductItems();
  initBatchSelectBar();
  initSupplierCards();

  // Store-entegreli event handler'lar
  initStoreEventHandlers();

  // Thumbnail slider
  initThumbnailSlider();

  // Store subscription: state değişince DOM güncelle
  cartStore.subscribe(() => {
    syncSummary();
    syncBatchBar();
  });
}

// ──────────────── STORE EVENT HANDLERS ────────────────

function initStoreEventHandlers(): void {
  const page = document.querySelector('.sc-cart-page');
  if (!page) return;

  // --- Batch select-all toggle ---
  page.addEventListener('batch-select-toggle', ((e: CustomEvent) => {
    const checked = e.detail?.selectAll ?? false;
    cartStore.toggleAll(checked);

    // DOM: tüm checkbox'ları güncelle
    const allCheckboxes = page.querySelectorAll<HTMLInputElement>('[data-checkbox]');
    allCheckboxes.forEach((cb) => {
      cb.checked = checked;
      syncCheckboxVisual(cb);
    });
  }) as EventListener);

  // --- Supplier checkbox cascade ---
  page.addEventListener('supplier-select', ((e: CustomEvent) => {
    const supplierId = e.detail?.supplierId;
    const checked = e.detail?.selected ?? e.detail?.checked ?? false;
    if (!supplierId) return;

    cartStore.toggleSupplierSelection(supplierId, checked);

    // DOM: supplier altındaki tüm checkbox'ları güncelle
    const supplierCard = page.querySelector(`[data-supplier-id="${supplierId}"]`);
    if (!supplierCard) return;

    const childCheckboxes = supplierCard.querySelectorAll<HTMLInputElement>(
      '[data-product-id] [data-checkbox], [data-sku-id] [data-checkbox]',
    );
    childCheckboxes.forEach((cb) => {
      cb.checked = checked;
      syncCheckboxVisual(cb);
    });
  }) as EventListener);

  // --- Checkbox change (product-level & SKU-level) ---
  page.addEventListener('checkbox-change', ((e: CustomEvent) => {
    const target = e.target as HTMLElement;
    const productItem = target?.closest?.('[data-product-id]');
    const skuRow = target?.closest?.('[data-sku-id]');
    const checked = e.detail?.checked ?? false;

    if (productItem && !skuRow) {
      // Product-level checkbox
      const productId = (productItem as HTMLElement).dataset.productId;
      if (productId) {
        cartStore.toggleProductSelection(productId, checked);

        // DOM: cascade SKU checkbox'larını güncelle
        const skuCheckboxes = productItem.querySelectorAll<HTMLInputElement>(
          '[data-sku-id] [data-checkbox]',
        );
        skuCheckboxes.forEach((cb) => {
          cb.checked = checked;
          syncCheckboxVisual(cb);
        });
      }
    }

    if (skuRow) {
      // SKU-level checkbox
      const skuId = (skuRow as HTMLElement).dataset.skuId;
      if (skuId) {
        cartStore.toggleSkuSelection(skuId, checked);

        // DOM: parent product ve supplier checkbox'larını senkronize et
        updateParentCheckboxStates(skuRow);
      }
    }
  }) as EventListener);

  // --- Quantity change ---
  page.addEventListener('quantity-change', ((e: CustomEvent) => {
    const inputId = e.detail?.id as string;
    const value = e.detail?.value as number;
    if (!inputId) return;

    // Input id pattern: sku-qty-{skuId}
    const skuId = inputId.replace('sku-qty-', '');
    cartStore.updateSkuQuantity(skuId, value);
  }) as EventListener);

  // --- SKU delete ---
  page.addEventListener('sku-delete', ((e: CustomEvent) => {
    const skuId = e.detail?.skuId;
    if (!skuId) return;

    // Store'dan sil (cascade ile birlikte)
    const skuInfo = cartStore.getSku(skuId);
    const productId = skuInfo?.product.id;
    const supplierId = skuInfo?.supplier.id;
    const productSkuCount = skuInfo?.product.skus.length ?? 0;
    const supplierProductCount = skuInfo?.supplier.products.length ?? 0;

    cartStore.deleteSku(skuId);

    // DOM: SKU row'u kaldır
    const skuEl = page.querySelector(`[data-sku-id="${skuId}"]`);
    if (skuEl) skuEl.remove();

    // Cascade DOM temizliği
    if (productSkuCount <= 1 && productId) {
      const productEl = page.querySelector(`[data-product-id="${productId}"]`);
      if (productEl) productEl.remove();

      if (supplierProductCount <= 1 && supplierId) {
        const supplierEl = page.querySelector(`[data-supplier-id="${supplierId}"]`);
        if (supplierEl) supplierEl.remove();
      }
    }
  }) as EventListener);

  // --- Product delete ---
  page.addEventListener('product-delete', ((e: CustomEvent) => {
    const productId = e.detail?.productId;
    if (!productId) return;

    // Store'dan bilgi al (silmeden önce)
    const productInfo = cartStore.getProduct(productId);
    const supplierId = productInfo?.supplier.id;
    const supplierProductCount = productInfo?.supplier.products.length ?? 0;

    cartStore.deleteProduct(productId);

    // DOM: product container'ı kaldır
    const productEl = page.querySelector(`[data-product-id="${productId}"]`);
    if (productEl) productEl.remove();

    // Cascade: supplier boşsa kaldır
    if (supplierProductCount <= 1 && supplierId) {
      const supplierEl = page.querySelector(`[data-supplier-id="${supplierId}"]`);
      if (supplierEl) supplierEl.remove();
    }
  }) as EventListener);

  // --- Batch delete (seçilenleri sil) ---
  page.addEventListener('batch-delete', (() => {
    // Silinecek elemanları DOM'da işaretle (store silmeden önce)
    const selectedSkus = cartStore.getSelectedSkus();
    const skuIds = new Set(selectedSkus.map((s) => s.id));

    cartStore.deleteSelected();

    // DOM: seçili SKU row'larını kaldır
    skuIds.forEach((skuId) => {
      const skuEl = page.querySelector(`[data-sku-id="${skuId}"]`);
      if (skuEl) skuEl.remove();
    });

    // Boş product container'ları temizle
    page.querySelectorAll('[data-product-id]').forEach((productEl) => {
      const hasSkus = productEl.querySelector('[data-sku-id]');
      if (!hasSkus) productEl.remove();
    });

    // Boş supplier card'ları temizle
    page.querySelectorAll('[data-supplier-id]').forEach((supplierEl) => {
      const hasProducts = supplierEl.querySelector('[data-product-id]');
      if (!hasProducts) supplierEl.remove();
    });
  }) as EventListener);

  // --- Product favorite toggle ---
  page.addEventListener('product-favorite', ((e: CustomEvent) => {
    const productId = e.detail?.productId;
    if (!productId) return;

    cartStore.toggleFavorite(productId);

    // DOM: favori ikonunu güncelle
    const found = cartStore.getProduct(productId);
    if (found) {
      const btn = page.querySelector<HTMLElement>(
        `[data-product-id="${productId}"] .sc-c-spu-favorite-btn .sc-c-spu-favorite-icon`,
      );
      if (btn) btn.className = `sc-c-spu-favorite-icon ${found.product.favoriteIcon}`;
    }
  }) as EventListener);
}

// ──────────────── SYNC HELPERS ────────────────

/** Summary panel'ini store verisinden güncelle */
function syncSummary(): void {
  const page = document.querySelector('.sc-cart-page');
  if (!page) return;

  const summary = cartStore.getSummary();

  // Selected count
  const countEl = page.querySelector('.sc-summary-selected-count');
  if (countEl) countEl.textContent = String(summary.selectedCount);

  // Subtotal (Turkish locale)
  const formattedSubtotal = `$${summary.productSubtotal.toFixed(2).replace('.', ',')}`;
  const subtotalEl = page.querySelector('.sc-summary-product-subtotal');
  if (subtotalEl) subtotalEl.textContent = formattedSubtotal;

  // Discount row
  const discountRow = page.querySelector('.sc-summary-discount-row') as HTMLElement | null;
  const discountEl = page.querySelector('.sc-summary-discount');
  const savingsBanner = page.querySelector('.sc-summary-savings-banner') as HTMLElement | null;

  if (summary.discount > 0) {
    const formattedDiscount = `- $${summary.discount.toFixed(2).replace('.', ',')}`;
    if (discountRow) discountRow.classList.remove('hidden');
    if (discountEl) discountEl.textContent = formattedDiscount;
    if (savingsBanner) {
      savingsBanner.classList.remove('hidden');
      const amountEl = savingsBanner.querySelector('strong');
      if (amountEl) amountEl.textContent = `$${summary.discount.toFixed(2).replace('.', ',')}`;
    }
  } else {
    if (discountRow) discountRow.classList.add('hidden');
    if (savingsBanner) savingsBanner.classList.add('hidden');
  }

  // Grand total
  const formattedTotal = `$${summary.subtotal.toFixed(2).replace('.', ',')}`;
  const totalEl = page.querySelector('.sc-summary-subtotal');
  if (totalEl) totalEl.textContent = formattedTotal;

  // Thumbnail grid
  updateThumbnailGrid(summary.items);
}

/** Batch bar seçim sayılarını ve buton durumunu güncelle */
function syncBatchBar(): void {
  const page = document.querySelector('.sc-cart-page');
  if (!page) return;

  const total = cartStore.getTotalSkuCount();
  const selected = cartStore.getSelectedSkuCount();

  // Count text
  const countEl = page.querySelector('.sc-c-batch-count');
  if (countEl) {
    countEl.textContent = `(${total})`;
  }

  // Delete button disabled state
  const deleteBtn = page.querySelector<HTMLButtonElement>('.sc-c-batch-delete-btn');
  if (deleteBtn) {
    deleteBtn.disabled = selected === 0;
  }

  // Select-all checkbox state
  const selectAllCb = page.querySelector<HTMLInputElement>('#batch-select-all');
  if (selectAllCb) {
    selectAllCb.checked = total > 0 && selected === total;
    selectAllCb.indeterminate = selected > 0 && selected < total;
    syncCheckboxVisual(selectAllCb);
  }
}

/** Checkbox'un görsel stilini checked/indeterminate durumuna göre senkronize et */
function syncCheckboxVisual(input: HTMLInputElement): void {
  const wrapper = input.closest('.next-checkbox-wrapper');
  if (!wrapper) return;

  const isActive = input.checked || input.indeterminate;

  wrapper.classList.toggle('checked', input.checked);
  wrapper.classList.toggle('indeterminate', input.indeterminate);

  // data-indeterminate attribute'ünü CSS pseudo-element için senkronize et
  if (input.indeterminate) {
    input.setAttribute('data-indeterminate', 'true');
  } else {
    input.removeAttribute('data-indeterminate');
  }

  const span = wrapper.querySelector('.next-checkbox');
  if (span) {
    span.classList.toggle('border-transparent', isActive);
    span.classList.toggle('bg-[#222]', isActive);
    span.classList.toggle('border-gray-400', !isActive);
    span.classList.toggle('border-2', !isActive);
    if (isActive) span.classList.remove('border-2');
    span.classList.toggle('bg-white', !isActive);
  }
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
    const someSkusChecked = skuCbArr.some((cb) => cb.checked);
    productCheckbox.checked = allSkusChecked;
    productCheckbox.indeterminate = someSkusChecked && !allSkusChecked;
    syncCheckboxVisual(productCheckbox);
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
    ':scope > [data-checkbox], .sc-c-supplier-header [data-checkbox]',
  );
  if (supplierCheckbox) {
    const someProductsChecked = prodCbArr
      .filter((cb) => !cb.closest('[data-sku-id]'))
      .some((cb) => cb.checked || cb.indeterminate);
    supplierCheckbox.checked = allProductsChecked;
    supplierCheckbox.indeterminate = someProductsChecked && !allProductsChecked;
    syncCheckboxVisual(supplierCheckbox);
  }
}

// ──────────────── THUMBNAIL SLIDER ────────────────

/**
 * Dynamically update the thumbnail grid in the summary sidebar.
 */
function updateThumbnailGrid(items: { image: string; quantity: number }[]): void {
  const track = document.querySelector<HTMLElement>('.checkout-items-images');
  if (!track) return;

  track.innerHTML = items
    .map(
      (item) => `<div class="checkout-item-card relative w-16 h-16 min-w-[64px] rounded overflow-hidden border border-[#e5e5e5] flex-shrink-0">
        <div class="block w-full h-full"><img class="w-full h-full object-cover" src="${item.image}" alt="" /></div>
        <span class="absolute bottom-0 right-0 bg-black/60 text-white rounded-tl text-[11px] font-bold leading-4 px-1 py-px">${item.quantity}</span>
      </div>`
    )
    .join('');

  // Re-check arrow visibility after thumbnail update
  track.dispatchEvent(new Event('scroll'));
}

/**
 * Initialize dynamic thumbnail slider arrow navigation in order summary.
 */
function initThumbnailSlider(): void {
  const wrapper = document.querySelector<HTMLElement>('.checkout-items-wrapper');
  if (!wrapper) return;

  const track = wrapper.querySelector<HTMLElement>('.checkout-items-images');
  if (!track) return;

  const leftArrow = wrapper.querySelector<HTMLButtonElement>('[data-dir="left"]');
  const rightArrow = wrapper.querySelector<HTMLButtonElement>('[data-dir="right"]');
  const scrollAmount = 144;

  function updateArrowVisibility(): void {
    if (!track || !leftArrow || !rightArrow) return;

    const overflows = track.scrollWidth > track.clientWidth + 1;

    if (!overflows) {
      leftArrow.classList.add('!hidden');
      rightArrow.classList.add('!hidden');
      return;
    }

    leftArrow.classList.remove('!hidden');
    rightArrow.classList.remove('!hidden');

    const atStart = track.scrollLeft <= 1;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;

    leftArrow.classList.toggle('!opacity-0', atStart);
    leftArrow.classList.toggle('!pointer-events-none', atStart);
    rightArrow.classList.toggle('!opacity-0', atEnd);
    rightArrow.classList.toggle('!pointer-events-none', atEnd);
  }

  wrapper.querySelectorAll<HTMLButtonElement>('.checkout-items-arrow').forEach((btn) => {
    btn.addEventListener('click', () => {
      const dir = btn.dataset.dir;
      track.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    });
  });

  track.addEventListener('scroll', updateArrowVisibility, { passive: true });
  updateArrowVisibility();
  window.addEventListener('resize', updateArrowVisibility, { passive: true });
}
