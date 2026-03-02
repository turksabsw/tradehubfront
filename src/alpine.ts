import Alpine from 'alpinejs'
import {
  filterAndSortReviews,
  renderReviewCard,
  bindHelpfulButtons,
  SORT_LABELS,
} from './components/product/ProductReviews';
import type { ReviewFilterState, SortMode } from './components/product/ProductReviews';
import {
  renderGalleryMedia,
  defaultVisual,
  ZOOM_SCALE,
  THUMB_SIZE,
  THUMB_GAP,
  LIGHTBOX_THUMB_SIZE,
  LIGHTBOX_THUMB_GAP,
} from './components/product/ProductImageGallery';
import { mockProduct } from './data/mockProduct';
import { cartStore } from './components/cart/state/CartStore';
import { showFavoriteToast } from './components/cart/page/CartPage';

// Augment Window interface for Alpine global access (debugging)
declare global {
  interface Window {
    Alpine: typeof Alpine
  }
}

// Register reusable Alpine.data() components BEFORE Alpine.start()

Alpine.data('loginModal', () => ({
  open: false,

  show() {
    this.open = true;
    document.body.style.overflow = 'hidden';
  },

  close() {
    this.open = false;
    // Only restore body scroll if no other modal is open underneath
    // ReviewsModal now uses Alpine x-data with :data-open="open" instead of rv-modal-hidden class
    const reviewsModal = document.getElementById('rv-reviews-modal');
    const reviewsOpen = reviewsModal?.dataset.open === 'true';
    if (!reviewsOpen) {
      document.body.style.overflow = '';
    }
  },
}));

Alpine.data('reviewsModal', () => ({
  open: false,
  filterType: 'all' as 'all' | 'photo',
  ratingFilter: 'all' as 'all' | number,
  mentionFilter: null as string | null,
  sortBy: 'relevant' as SortMode,
  ratingOpen: false,
  sortOpen: false,

  show() {
    this.open = true;
    document.body.style.overflow = 'hidden';
  },

  close() {
    this.open = false;
    document.body.style.overflow = '';
  },

  ratingLabel(): string {
    return this.ratingFilter === 'all' ? 'Puan' : `${this.ratingFilter} Yıldız`;
  },

  sortLabel(): string {
    return SORT_LABELS[this.sortBy as SortMode];
  },

  setFilter(type: 'all' | 'photo') {
    this.filterType = type;
    this.renderReviews();
  },

  setRating(rating: string) {
    this.ratingFilter = rating === 'all' ? 'all' : parseInt(rating, 10);
    this.ratingOpen = false;
    this.renderReviews();
  },

  setSort(sort: string) {
    if (sort in SORT_LABELS) {
      this.sortBy = sort as SortMode;
    }
    this.sortOpen = false;
    this.renderReviews();
  },

  toggleMention(label: string) {
    if (this.mentionFilter === label) {
      this.mentionFilter = null;
    } else {
      this.mentionFilter = label;
    }
    this.renderReviews();
  },

  renderReviews() {
    const container = (this.$refs as Record<string, HTMLElement>).reviewsList;
    if (!container) return;

    const state: ReviewFilterState = {
      filterType: this.filterType as 'all' | 'photo',
      ratingFilter: this.ratingFilter as 'all' | number,
      mentionFilter: this.mentionFilter as string | null,
      sortBy: this.sortBy as SortMode,
    };

    const filtered = filterAndSortReviews(state);

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 0; color: var(--pd-rating-text-color, #6b7280); font-size: 14px;">
          Bu filtrelere uygun yorum bulunamadı.
        </div>
      `;
    } else {
      container.innerHTML = filtered.map((r: Parameters<typeof renderReviewCard>[0]) => renderReviewCard(r, true)).join('');
    }
    bindHelpfulButtons(container);
  },

  init() {
    // Bind helpful buttons on the initially-rendered review cards
    const container = (this.$refs as Record<string, HTMLElement>).reviewsList;
    if (container) {
      bindHelpfulButtons(container);
    }
  },
}));

Alpine.data('floatingPanel', () => ({
  showScrollTop: false,
  chatOpen: false,
  lensOpen: false,

  init() {
    // Check initial scroll position in case page is already scrolled
    this.showScrollTop = window.scrollY > 300;

    window.addEventListener('scroll', () => {
      this.showScrollTop = window.scrollY > 300;
    }, { passive: true });
  },

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
}));

Alpine.data('orderProtectionModal', () => ({
  open: false,
  triggerEl: null as HTMLElement | null,

  show() {
    // Save the element that triggered the modal for focus restoration
    this.triggerEl = document.activeElement as HTMLElement | null;
    this.open = true;
    document.body.style.overflow = 'hidden';
    // Auto-focus close button after Alpine renders the modal
    setTimeout(() => {
      const closeBtn = (this.$refs as Record<string, HTMLElement>).closeBtn;
      closeBtn?.focus();
    }, 50);
  },

  close() {
    this.open = false;
    document.body.style.overflow = '';
    // Restore focus to the element that opened the modal
    this.triggerEl?.focus();
    this.triggerEl = null;
  },

  trapFocus(e: KeyboardEvent) {
    if (e.key !== 'Tab') return;
    const el = this.$el as HTMLElement;
    const focusable = el.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  },
}));

Alpine.data('imageGallery', () => ({
  currentIndex: 0,
  lightboxIndex: 0,
  isLightboxOpen: false,
  isZooming: false,
  supportsHoverZoom: false,
  imageCount: mockProduct.images.length,
  totalSlides: mockProduct.images.length + 1,
  attrsIndex: mockProduct.images.length,

  init() {
    this.supportsHoverZoom = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // Listen for mobile swipe navigation custom event
    document.addEventListener('gallery-go-to', ((e: CustomEvent) => {
      this.goToSlide(e.detail.index);
    }) as EventListener);
  },

  getMainMedia(): HTMLElement | null {
    const mainImage = (this.$refs as Record<string, HTMLElement>).mainImage;
    return mainImage?.querySelector<HTMLElement>('[data-gallery-main-media="true"]') ?? null;
  },

  resetZoom() {
    const media = this.getMainMedia();
    if (!media) return;
    media.style.transformOrigin = '50% 50%';
    media.style.transform = 'scale(1)';
    this.isZooming = false;
  },

  handleZoomMove(event: PointerEvent) {
    if (!this.supportsHoverZoom) return;
    if (event.pointerType && event.pointerType !== 'mouse') return;

    const mainImage = (this.$refs as Record<string, HTMLElement>).mainImage;
    const media = this.getMainMedia();
    if (!media || !mainImage) return;

    const rect = mainImage.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const clampedX = Math.min(100, Math.max(0, x));
    const clampedY = Math.min(100, Math.max(0, y));

    media.style.transformOrigin = `${clampedX}% ${clampedY}%`;
    media.style.transform = `scale(${ZOOM_SCALE})`;
    this.isZooming = true;
  },

  scrollActiveThumbIntoView(index: number) {
    const thumbList = (this.$refs as Record<string, HTMLElement>).thumbList;
    if (!thumbList) return;
    const activeThumb = thumbList.children[index] as HTMLElement | undefined;
    if (!activeThumb) return;

    const listTop = thumbList.scrollTop;
    const listHeight = thumbList.clientHeight;
    const thumbTop = activeThumb.offsetTop;
    const thumbHeight = activeThumb.offsetHeight;

    if (thumbTop < listTop) {
      thumbList.scrollTo({ top: thumbTop, behavior: 'smooth' });
    } else if (thumbTop + thumbHeight > listTop + listHeight) {
      thumbList.scrollTo({ top: thumbTop + thumbHeight - listHeight, behavior: 'smooth' });
    }
  },

  goToSlide(index: number) {
    if (index < 0) index = this.totalSlides - 1;
    if (index >= this.totalSlides) index = 0;
    this.currentIndex = index;

    // Dispatch event for mobile gallery sync
    document.dispatchEvent(new CustomEvent('gallery-slide-change', { detail: { index: this.currentIndex } }));

    const isAttrs = index === this.attrsIndex;

    // Toggle attributes card visibility (ProductAttributes renders its own HTML with id)
    const attrCard = document.getElementById('pd-attributes-card');
    attrCard?.classList.toggle('hidden', !isAttrs);

    // Update main image content when showing a photo slide
    if (!isAttrs) {
      const mainImage = (this.$refs as Record<string, HTMLElement>).mainImage;
      if (mainImage) {
        const image = mockProduct.images[index];
        mainImage.innerHTML = renderGalleryMedia(
          image?.src,
          image?.alt ?? `Ürün görünümü ${index + 1}`,
          defaultVisual,
          'large',
        );
        this.resetZoom();
      }
    }

    // Scroll the active thumbnail into view within the thumb list
    this.scrollActiveThumbIntoView(index);
  },

  syncLightboxThumbInView(index: number) {
    const lightboxThumbList = (this.$refs as Record<string, HTMLElement>).lightboxThumbList;
    if (!lightboxThumbList) return;
    const activeThumb = lightboxThumbList.querySelector<HTMLElement>(`.gallery-lightbox-thumb[data-index="${index}"]`);
    activeThumb?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  },

  setLightboxSlide(index: number) {
    if (this.imageCount === 0) return;

    if (index < 0) index = this.imageCount - 1;
    if (index >= this.imageCount) index = 0;
    this.lightboxIndex = index;

    const lightboxImage = (this.$refs as Record<string, HTMLElement>).lightboxImage;
    if (lightboxImage) {
      const image = mockProduct.images[index];
      lightboxImage.innerHTML = renderGalleryMedia(
        image?.src,
        image?.alt ?? `Ürün görünümü ${index + 1}`,
        defaultVisual,
        'large',
      );
    }

    this.syncLightboxThumbInView(index);
  },

  openLightbox(index: number) {
    if (this.imageCount === 0) return;
    this.setLightboxSlide(index);
    this.isLightboxOpen = true;
    document.body.classList.add('gallery-lightbox-open');
  },

  closeLightbox() {
    this.isLightboxOpen = false;
    document.body.classList.remove('gallery-lightbox-open');
  },

  lightboxPrev() {
    this.setLightboxSlide(this.lightboxIndex - 1);
    this.goToSlide(this.lightboxIndex);
  },

  lightboxNext() {
    this.setLightboxSlide(this.lightboxIndex + 1);
    this.goToSlide(this.lightboxIndex);
  },

  selectLightboxThumb(index: number) {
    this.setLightboxSlide(index);
    this.goToSlide(this.lightboxIndex);
  },

  scrollThumbs(direction: number) {
    const thumbList = (this.$refs as Record<string, HTMLElement>).thumbList;
    if (!thumbList) return;
    const scrollAmount = THUMB_SIZE + THUMB_GAP;
    thumbList.scrollBy({ top: direction * scrollAmount, behavior: 'smooth' });
  },

  scrollLightboxThumbs(direction: number) {
    const lightboxThumbList = (this.$refs as Record<string, HTMLElement>).lightboxThumbList;
    if (!lightboxThumbList) return;
    const scrollAmount = LIGHTBOX_THUMB_SIZE + LIGHTBOX_THUMB_GAP;
    lightboxThumbList.scrollBy({ top: direction * scrollAmount, behavior: 'smooth' });
  },
}));

Alpine.data('stickyHeaderSearch', () => ({
  expanded: false,

  init() {
    // Manage tabindex on expanded interactive elements
    this.$watch('expanded', (isExpanded: boolean) => {
      const el = this.$el as HTMLElement;
      el.querySelectorAll<HTMLElement>('[data-compact-expanded-interactive]').forEach((interEl) => {
        if (isExpanded) {
          interEl.removeAttribute('tabindex');
        } else {
          interEl.setAttribute('tabindex', '-1');
        }
      });
    });

    // Sync dropdown offset on resize
    window.addEventListener('resize', () => {
      if (this.expanded) {
        this.syncDropdownOffset();
      }
    }, { passive: true });
  },

  open() {
    if (this.expanded) return;
    this.expanded = true;
    this.syncDropdownOffset();
  },

  close() {
    if (!this.expanded) return;
    this.expanded = false;
    const dropdown = (this.$refs as Record<string, HTMLElement>).dropdown;
    if (dropdown) {
      dropdown.style.removeProperty('top');
    }
  },

  syncDropdownOffset() {
    const form = (this.$refs as Record<string, HTMLElement>).searchForm;
    const dropdown = (this.$refs as Record<string, HTMLElement>).dropdown;
    if (!form || !dropdown) return;
    const dropdownTop = form.offsetTop + form.offsetHeight + 8;
    dropdown.style.top = `${dropdownTop}px`;
  },

  pickValue(value: string) {
    if (!value) return;
    const input = (this.$refs as Record<string, HTMLInputElement>).searchInput;
    if (input) {
      input.value = value;
      input.focus();
    }
  },
}));

Alpine.data('checkbox', () => ({
  checked: false,
  indeterminate: false,
  inputId: '',
  handlerId: null as string | null,

  init() {
    const input = (this.$refs as Record<string, HTMLInputElement>).input;
    if (!input) return;

    this.inputId = input.id;
    this.checked = input.checked;
    this.handlerId = input.dataset.onchange || null;

    if (input.dataset.indeterminate === 'true') {
      this.indeterminate = true;
    }
  },

  handleChange() {
    const input = (this.$refs as Record<string, HTMLInputElement>).input;
    if (!input) return;

    this.checked = input.checked;
    this.indeterminate = false;

    if (this.handlerId) {
      this.$dispatch('checkbox-change', {
        id: this.inputId,
        checked: this.checked,
        handlerId: this.handlerId,
      });
    }
  },
}));

Alpine.data('quantityInput', (props: { value: number; min: number; max: number; step: number; id: string }) => ({
  value: props.value,
  min: props.min,
  max: props.max,
  step: props.step,
  id: props.id,

  decrement() {
    const current = this.value || this.min;
    this.value = Math.min(Math.max(current - this.step, this.min), this.max);
    this.$dispatch('quantity-change', { id: this.id, value: this.value });
  },

  increment() {
    const current = this.value || this.min;
    this.value = Math.min(Math.max(current + this.step, this.min), this.max);
    this.$dispatch('quantity-change', { id: this.id, value: this.value });
  },

  clampAndDispatch() {
    const input = (this.$refs as Record<string, HTMLInputElement>).input;
    const raw = Number(input.value);
    this.value = Math.min(Math.max(Number.isNaN(raw) ? this.min : raw, this.min), this.max);
    this.$dispatch('quantity-change', { id: this.id, value: this.value });
  },
}));

Alpine.data('cartPage', () => ({
  init() {
    cartStore.subscribe(() => {
      this.syncSummary();
      this.syncBatchBar();
      this.syncSupplierTotals();
      this.checkEmptyCart();
    });

    // Initial render synchronization
    this.syncSummary();
    this.syncBatchBar();
    this.syncSupplierTotals();

    // Thumbnail slider for summary section
    this.initThumbnailSlider();
  },

  /**
   * Sync a checkbox's DOM state and Alpine Checkbox component state.
   * Updates both input.checked/indeterminate and the Alpine :class binding
   * via _x_dataStack to prevent stale visual state.
   */
  syncCheckbox(input: HTMLInputElement, checked: boolean, indeterminate: boolean = false) {
    input.checked = checked;
    input.indeterminate = indeterminate;

    // Update Alpine Checkbox component reactive state so :class bindings stay correct
    const wrapper = input.closest<HTMLElement>('.next-checkbox-wrapper');
    if (wrapper) {
      const dataStack = (wrapper as any)._x_dataStack; // eslint-disable-line @typescript-eslint/no-explicit-any
      if (dataStack?.[0]) {
        dataStack[0].checked = checked;
        dataStack[0].indeterminate = indeterminate;
      }
    }
  },

  handleBatchSelectToggle(event: CustomEvent) {
    const checked = event.detail?.selectAll ?? false;
    cartStore.toggleAll(checked);

    const el = this.$el as HTMLElement;
    el.querySelectorAll<HTMLInputElement>('.next-checkbox-input').forEach((input) => {
      this.syncCheckbox(input, checked);
    });
  },

  handleSupplierSelect(event: CustomEvent) {
    const supplierId = event.detail?.supplierId as string | undefined;
    const selected = event.detail?.selected ?? false;
    if (!supplierId) return;

    cartStore.toggleSupplierSelection(supplierId, selected);

    const el = this.$el as HTMLElement;
    const supplierCard = el.querySelector<HTMLElement>(`[data-supplier-id="${supplierId}"]`);
    if (!supplierCard) return;

    supplierCard.querySelectorAll<HTMLInputElement>('.next-checkbox-input').forEach((input) => {
      this.syncCheckbox(input, selected);
    });
  },

  handleCheckboxChange(event: CustomEvent) {
    const target = event.target as HTMLElement;
    const skuRow = target.closest<HTMLElement>('[data-sku-id]');
    const productRow = target.closest<HTMLElement>('[data-product-id]');
    const checked = event.detail?.checked ?? false;

    if (skuRow) {
      const skuId = skuRow.dataset.skuId;
      if (!skuId) return;
      cartStore.toggleSkuSelection(skuId, checked);
      this.updateParentCheckboxStates(skuRow);
      return;
    }

    if (productRow) {
      const productId = productRow.dataset.productId;
      if (!productId) return;

      cartStore.toggleProductSelection(productId, checked);
      productRow.querySelectorAll<HTMLInputElement>('.sc-c-sku-container-new .next-checkbox-input').forEach((input) => {
        this.syncCheckbox(input, checked);
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
            this.syncCheckbox(supplierCheck, allSelected, someSelected && !allSelected);
          }
        }
      }
    }
  },

  handleQuantityChange(event: CustomEvent) {
    const inputId = event.detail?.id as string | undefined;
    const value = event.detail?.value as number;
    if (!inputId) return;

    const skuId = inputId.replace('sku-qty-', '');
    cartStore.updateSkuQuantity(skuId, value);
  },

  handleSkuDelete(event: CustomEvent) {
    const skuId = event.detail?.skuId as string | undefined;
    if (!skuId) return;

    const snapshot = cartStore.getSku(skuId);
    const productId = snapshot?.product.id;
    const supplierId = snapshot?.supplier.id;
    const productSkuCount = snapshot?.product.skus.length ?? 0;
    const supplierProductCount = snapshot?.supplier.products.length ?? 0;

    cartStore.deleteSku(skuId);

    const el = this.$el as HTMLElement;
    el.querySelector(`[data-sku-id="${skuId}"]`)?.remove();

    if (productSkuCount <= 1 && productId) {
      el.querySelector(`[data-product-id="${productId}"]`)?.remove();
      if (supplierProductCount <= 1 && supplierId) {
        el.querySelector(`[data-supplier-id="${supplierId}"]`)?.remove();
      }
    }
  },

  handleProductDelete(event: CustomEvent) {
    const productId = event.detail?.productId as string | undefined;
    if (!productId) return;

    const snapshot = cartStore.getProduct(productId);
    const supplierId = snapshot?.supplier.id;
    const supplierProductCount = snapshot?.supplier.products.length ?? 0;

    cartStore.deleteProduct(productId);

    const el = this.$el as HTMLElement;
    el.querySelector(`[data-product-id="${productId}"]`)?.remove();

    if (supplierProductCount <= 1 && supplierId) {
      el.querySelector(`[data-supplier-id="${supplierId}"]`)?.remove();
    }
  },

  handleBatchDelete() {
    const selectedIds = new Set(cartStore.getSelectedSkus().map((sku) => sku.id));
    cartStore.deleteSelected();

    const el = this.$el as HTMLElement;
    selectedIds.forEach((skuId) => {
      el.querySelector(`[data-sku-id="${skuId}"]`)?.remove();
    });

    el.querySelectorAll<HTMLElement>('[data-product-id]').forEach((product) => {
      if (!product.querySelector('[data-sku-id]')) product.remove();
    });

    el.querySelectorAll<HTMLElement>('[data-supplier-id]').forEach((supplier) => {
      if (!supplier.querySelector('[data-product-id]')) supplier.remove();
    });
  },

  handleProductFavorite(event: CustomEvent) {
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
    } catch (e) { /* ignore storage errors */ }

    showFavoriteToast();

    const supplierId = snapshot.supplier.id;
    const supplierProductCount = snapshot.supplier.products.length;

    cartStore.deleteProduct(productId);
    const el = this.$el as HTMLElement;
    el.querySelector(`[data-product-id="${productId}"]`)?.remove();

    if (supplierProductCount <= 1 && supplierId) {
      el.querySelector(`[data-supplier-id="${supplierId}"]`)?.remove();
    }
  },

  updateParentCheckboxStates(skuRow: Element) {
    const productRow = skuRow.closest<HTMLElement>('[data-product-id]');
    if (!productRow) return;

    const productId = productRow.dataset.productId;
    const productCheckbox = productId ? productRow.querySelector<HTMLInputElement>(`#product-checkbox-${productId}`) : null;
    const skuChecks = Array.from(productRow.querySelectorAll<HTMLInputElement>('.sc-c-sku-container-new .next-checkbox-input'));

    if (productCheckbox && skuChecks.length > 0) {
      const all = skuChecks.every((checkbox) => checkbox.checked);
      const some = skuChecks.some((checkbox) => checkbox.checked || checkbox.indeterminate);
      this.syncCheckbox(productCheckbox, all, some && !all);
    }

    const supplier = productRow.closest<HTMLElement>('[data-supplier-id]');
    if (!supplier) return;

    const supplierId = supplier.dataset.supplierId;
    const supplierCheckbox = supplierId ? supplier.querySelector<HTMLInputElement>(`#supplier-checkbox-${supplierId}`) : null;
    const productChecks = Array.from(supplier.querySelectorAll<HTMLInputElement>('.sc-c-spu-container-new > .flex .next-checkbox-input'));

    if (supplierCheckbox && productChecks.length > 0) {
      const all = productChecks.every((checkbox) => checkbox.checked);
      const some = productChecks.some((checkbox) => checkbox.checked || checkbox.indeterminate);
      this.syncCheckbox(supplierCheckbox, all, some && !all);
    }
  },

  syncSummary() {
    const el = this.$el as HTMLElement;
    const summary = cartStore.getSummary();

    const countEl = el.querySelector<HTMLElement>('.sc-summary-selected-count');
    if (countEl) countEl.textContent = String(summary.selectedCount);

    const subtotalEl = el.querySelector<HTMLElement>('.sc-summary-product-subtotal');
    if (subtotalEl) subtotalEl.textContent = `$${summary.productSubtotal.toFixed(2).replace('.', ',')}`;

    const discountRow = el.querySelector<HTMLElement>('.sc-summary-discount-row');
    const discountEl = el.querySelector<HTMLElement>('.sc-summary-discount');
    const banner = el.querySelector<HTMLElement>('.sc-summary-savings-banner');

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

    const totalEl = el.querySelector<HTMLElement>('.sc-summary-subtotal');
    if (totalEl) totalEl.textContent = `$${summary.subtotal.toFixed(2).replace('.', ',')}`;

    this.updateThumbnailGrid(summary.items);
  },

  syncSupplierTotals() {
    const el = this.$el as HTMLElement;

    el.querySelectorAll<HTMLElement>('.sc-c-supplier-container').forEach((container) => {
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
  },

  syncBatchBar() {
    const el = this.$el as HTMLElement;

    const total = cartStore.getTotalSkuCount();
    const selected = cartStore.getSelectedSkuCount();

    const count = el.querySelector<HTMLElement>('.sc-c-batch-count');
    if (count) count.textContent = `(${total})`;

    const deleteBtn = el.querySelector<HTMLButtonElement>('.sc-c-batch-delete-btn');
    if (deleteBtn) deleteBtn.disabled = selected === 0;

    const selectAll = el.querySelector<HTMLInputElement>('#batch-select-all');
    if (selectAll) {
      this.syncCheckbox(selectAll, total > 0 && selected === total, selected > 0 && selected < total);
    }
  },

  updateThumbnailGrid(items: { image: string; quantity: number }[]) {
    const track = document.querySelector<HTMLElement>('.checkout-items-images');
    if (!track) return;

    track.innerHTML = items.map((item) => `
      <div class="relative w-16 h-16 rounded-md overflow-hidden border border-border-default shrink-0">
        <img src="${item.image}" alt="SKU" class="w-full h-full object-cover" />
        <span class="absolute right-0 bottom-0 px-1 py-[2px] rounded-tl bg-black/65 text-white text-[11px] font-bold leading-none">${item.quantity}</span>
      </div>
    `).join('');

    track.dispatchEvent(new Event('scroll'));
  },

  initThumbnailSlider() {
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
  },

  checkEmptyCart() {
    if (cartStore.getTotalSkuCount() > 0) return;

    const el = this.$el as HTMLElement;
    el.innerHTML = `
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
  },
}));

Alpine.data('settingsLayout', () => ({
  currentSection: '',

  init() {
    this.currentSection = window.location.hash || '';
  },

  copyMemberId() {
    navigator.clipboard.writeText('tr29243492599miuy').then(() => {
      const btn = (this.$refs as Record<string, HTMLElement>).copyBtn;
      if (btn) {
        btn.title = 'Kopyalandı!';
        setTimeout(() => { btn.title = 'Kopyala'; }, 2000);
      }
    });
  },
}));

// Make Alpine available globally for debugging
window.Alpine = Alpine;

/**
 * Start Alpine.js. MUST be called AFTER:
 * 1. All Alpine.data() registrations above
 * 2. The page HTML has been injected into #app via innerHTML
 *
 * Do NOT call at module import time — Alpine won't find directives in
 * elements that don't exist in the DOM yet.
 */
export function startAlpine(): void {
  Alpine.start();
}
