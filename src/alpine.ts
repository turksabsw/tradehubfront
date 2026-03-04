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
import {
  initAccountTypeSelector,
  getSelectedAccountType,
  type AccountType,
} from './components/auth/AccountTypeSelector';
import {
  EmailVerification,
  initEmailVerification,
  cleanupEmailVerification,
  type EmailVerificationState,
} from './components/auth/EmailVerification';
import {
  AccountSetupForm,
  initAccountSetupForm,
  type AccountSetupFormData,
} from './components/auth/AccountSetupForm';
import {
  escapeHtml,
  type RegisterStep,
} from './components/auth/RegisterPage';
import {
  maskEmail,
  type ForgotPasswordStep,
} from './components/auth/ForgotPasswordPage';
import { getBaseUrl } from './components/auth/AuthLayout';
import {
  countries as checkoutCountries,
  districtsByProvince,
  geolocationMockAddress,
} from './data/mockCheckout';
import type { SavedAddress } from './types/checkout';
import { getUser, isLoggedIn } from './utils/auth';
import { ORDER_TABS, ORDER_FILTERS } from './components/buyer-dashboard/ordersData';

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
    this.$nextTick(() => {
      this.syncDropdownOffset();
    });
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
      this.syncMoqRestrictions();
      this.checkEmptyCart();
    });

    // Initial render synchronization
    this.syncSummary();
    this.syncBatchBar();
    this.syncSupplierTotals();
    this.syncMoqRestrictions();

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

  handleSkuFillMin(event: CustomEvent) {
    const skuId = event.detail?.skuId as string | undefined;
    if (!skuId) return;

    const snapshot = cartStore.getSku(skuId);
    if (!snapshot) return;

    cartStore.fillSkuToMinQty(skuId);

    const updatedSku = cartStore.getSku(skuId)?.sku;
    if (updatedSku) {
      this.syncSkuQuantityInput(skuId, updatedSku.quantity);
    }
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

  syncSkuQuantityInput(skuId: string, quantity: number) {
    const el = this.$el as HTMLElement;
    const input = el.querySelector<HTMLInputElement>(`#sku-qty-${skuId}`);
    if (input) input.value = String(quantity);

    const picker = input?.closest<HTMLElement>('.number-picker');
    if (!picker) return;

    const dataStack = (picker as any)._x_dataStack; // eslint-disable-line @typescript-eslint/no-explicit-any
    if (dataStack?.[0]) {
      dataStack[0].value = quantity;
    }
  },

  syncMoqRestrictions() {
    const el = this.$el as HTMLElement;
    const violations = cartStore.getSelectedSkuMoqViolations();
    const violationsBySkuId = new Map(violations.map((violation) => [violation.skuId, violation]));

    el.querySelectorAll<HTMLElement>('[data-sku-id]').forEach((skuRow) => {
      const skuId = skuRow.dataset.skuId;
      if (!skuId) return;

      const violation = violationsBySkuId.get(skuId);
      const warning = skuRow.querySelector<HTMLElement>('.sc-c-sku-moq-warning');
      const missingEl = skuRow.querySelector<HTMLElement>('.sc-c-sku-moq-missing');
      const quantityPicker = skuRow.querySelector<HTMLElement>('.number-picker');

      if (violation) {
        skuRow.style.backgroundColor = '#fff1f1';
        if (quantityPicker) quantityPicker.style.borderColor = '#ef4444';
        if (missingEl) missingEl.textContent = String(violation.missingQty);
        warning?.classList.remove('hidden');
      } else {
        skuRow.style.backgroundColor = '';
        if (quantityPicker) quantityPicker.style.borderColor = '';
        warning?.classList.add('hidden');
      }
    });

    const checkoutBtn = el.querySelector<HTMLAnchorElement>('.sc-summary-checkout-btn');
    const checkoutWarning = el.querySelector<HTMLElement>('.sc-summary-checkout-warning');
    const summary = cartStore.getSummary();
    const canCheckout = summary.selectedCount > 0 && violations.length === 0;

    if (checkoutBtn) {
      if (canCheckout) {
        checkoutBtn.setAttribute('href', '/checkout.html');
        checkoutBtn.removeAttribute('aria-disabled');
        checkoutBtn.style.pointerEvents = '';
        checkoutBtn.style.cursor = '';
        checkoutBtn.style.opacity = '';
        checkoutBtn.style.backgroundColor = '';
      } else {
        checkoutBtn.removeAttribute('href');
        checkoutBtn.setAttribute('aria-disabled', 'true');
        checkoutBtn.style.pointerEvents = 'none';
        checkoutBtn.style.cursor = 'not-allowed';
        checkoutBtn.style.opacity = '0.55';
        checkoutBtn.style.backgroundColor = '#9ca3af';
      }
    }

    if (checkoutWarning) {
      if (violations.length > 0) {
        checkoutWarning.textContent = 'Minimum sipariş adedi eksik ürünler var. "Add all" ile tamamlayın.';
        checkoutWarning.classList.remove('hidden');
      } else if (summary.selectedCount === 0) {
        checkoutWarning.textContent = 'Checkout için en az 1 ürün seçin.';
        checkoutWarning.classList.remove('hidden');
      } else {
        checkoutWarning.textContent = '';
        checkoutWarning.classList.add('hidden');
      }
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

Alpine.data('settingsChangeEmail', () => ({
  step: 1,
  countdown: 59,
  error: '',
  _timerInterval: null as ReturnType<typeof setInterval> | null,

  init() {
    this.startTimer();
  },

  startTimer() {
    this.countdown = 59;
    if (this._timerInterval) clearInterval(this._timerInterval);
    this._timerInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0 && this._timerInterval) {
        clearInterval(this._timerInterval);
        this._timerInterval = null;
      }
    }, 1000);
  },

  resendCode() {
    if (this.countdown > 0) return;
    this.startTimer();
  },

  handleCodeInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.classList.contains('email-change__code-box')) return;
    const idx = parseInt(input.dataset.idx || '0', 10);
    const boxes = (this.$refs as Record<string, HTMLElement>).codeBoxes;
    if (!boxes) return;
    const inputs = boxes.querySelectorAll<HTMLInputElement>('.email-change__code-box');

    if (input.value.length === 1 && idx < inputs.length - 1) {
      inputs[idx + 1].focus();
    }

    const code = Array.from(inputs).map(b => b.value).join('');
    if (code.length === 6) {
      if (this._timerInterval) {
        clearInterval(this._timerInterval);
        this._timerInterval = null;
      }
      this.step = 2;
    }
  },

  handleCodeKeydown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (!input.classList.contains('email-change__code-box')) return;
    const idx = parseInt(input.dataset.idx || '0', 10);
    if (event.key === 'Backspace' && !input.value && idx > 0) {
      const boxes = (this.$refs as Record<string, HTMLElement>).codeBoxes;
      if (!boxes) return;
      const inputs = boxes.querySelectorAll<HTMLInputElement>('.email-change__code-box');
      inputs[idx - 1].focus();
    }
  },

  submitEmail() {
    const input = (this.$refs as Record<string, HTMLInputElement>).ecNewEmail;
    const val = input?.value.trim() || '';

    if (!val || !val.includes('@')) {
      this.error = 'Geçerli bir e-posta adresi girin.';
      return;
    }

    try {
      const raw = localStorage.getItem('tradehub_account_data');
      const data = raw ? JSON.parse(raw) : {};
      data.email = val;
      data.emailVerified = false;
      localStorage.setItem('tradehub_account_data', JSON.stringify(data));
    } catch { /* ignore */ }

    this.error = '';
    this.step = 3;
  },

  destroy() {
    if (this._timerInterval) {
      clearInterval(this._timerInterval);
      this._timerInterval = null;
    }
  },
}));

Alpine.data('settingsChangePassword', () => ({
  step: 1,
  countdown: 0,
  codeError: false,
  error: '',
  _timerInterval: null as ReturnType<typeof setInterval> | null,

  init() {
    this.startTimer();
  },

  startTimer() {
    this.countdown = 60;
    if (this._timerInterval) clearInterval(this._timerInterval);
    this._timerInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0 && this._timerInterval) {
        clearInterval(this._timerInterval);
        this._timerInterval = null;
      }
    }, 1000);
  },

  resendCode() {
    this.startTimer();
  },

  verifySubmit() {
    const codeInput = (this.$refs as Record<string, HTMLInputElement>).pwVerifyCode;
    if (!codeInput.value.trim()) {
      this.codeError = true;
      return;
    }
    this.codeError = false;
    if (this._timerInterval) {
      clearInterval(this._timerInterval);
      this._timerInterval = null;
    }
    this.step = 2;
  },

  savePassword() {
    const newPw = (this.$refs as Record<string, HTMLInputElement>).pwNew.value;
    const confirmPw = (this.$refs as Record<string, HTMLInputElement>).pwConfirm.value;

    if (newPw.length < 8) {
      this.error = 'Parola en az 8 karakter olmalıdır.';
      return;
    }
    if (newPw !== confirmPw) {
      this.error = 'Parolalar eşleşmiyor.';
      return;
    }

    this.error = '';
    this.step = 3;
  },

  destroy() {
    if (this._timerInterval) {
      clearInterval(this._timerInterval);
      this._timerInterval = null;
    }
  },
}));

Alpine.data('settingsChangePhone', () => ({
  step: 1,
  countryCode: '+90',
  phoneNumber: '',
  phoneError: '',
  verifyError: '',
  countdown: 0,
  _timerInterval: null as ReturnType<typeof setInterval> | null,

  sendCode() {
    const num = this.phoneNumber.trim();
    if (!num || num.length < 7) {
      this.phoneError = 'Geçerli bir telefon numarası girin.';
      return;
    }
    this.phoneError = '';
    this.step = 2;
    this.startTimer();
  },

  startTimer() {
    this.countdown = 60;
    if (this._timerInterval) clearInterval(this._timerInterval);
    this._timerInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0 && this._timerInterval) {
        clearInterval(this._timerInterval);
        this._timerInterval = null;
      }
    }, 1000);
  },

  verify() {
    const codeInput = (this.$refs as Record<string, HTMLInputElement>).phoneVerifyCode;
    const code = codeInput?.value.trim() || '';
    if (!code || code.length < 6) {
      this.verifyError = 'Geçerli bir doğrulama kodu girin.';
      return;
    }
    if (this._timerInterval) {
      clearInterval(this._timerInterval);
      this._timerInterval = null;
    }
    this.verifyError = '';

    try {
      const raw = localStorage.getItem('tradehub_account_data');
      const data = raw ? JSON.parse(raw) : {};
      data.phoneCountry = this.countryCode.trim();
      data.phoneArea = '';
      data.phoneNumber = this.phoneNumber.trim();
      localStorage.setItem('tradehub_account_data', JSON.stringify(data));
    } catch { /* ignore */ }

    this.step = 3;
  },

  destroy() {
    if (this._timerInterval) {
      clearInterval(this._timerInterval);
      this._timerInterval = null;
    }
  },
}));

Alpine.data('settingsDeleteAccount', () => ({
  step: 1,
  reason: '',
  confirmed: false,
  countdown: 0,
  error1: '',
  error2: '',
  error3: '',
  _timerInterval: null as ReturnType<typeof setInterval> | null,

  continueToVerify() {
    if (!this.reason) {
      this.error1 = 'Lütfen bir ayrılma nedeni seçin.';
      return;
    }
    this.error1 = '';
    this.step = 2;
    this.startTimer();
  },

  startTimer() {
    this.countdown = 60;
    if (this._timerInterval) clearInterval(this._timerInterval);
    this._timerInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0 && this._timerInterval) {
        clearInterval(this._timerInterval);
        this._timerInterval = null;
      }
    }, 1000);
  },

  verifyCode() {
    const codeInput = (this.$refs as Record<string, HTMLInputElement>).delVerifyCode;
    const code = codeInput?.value.trim() || '';
    if (!code || code.length < 6) {
      this.error2 = 'Geçerli bir doğrulama kodu girin.';
      return;
    }
    if (this._timerInterval) {
      clearInterval(this._timerInterval);
      this._timerInterval = null;
    }
    this.error2 = '';
    this.step = 3;
  },

  deleteFinal() {
    localStorage.removeItem('tradehub_account_data');
    this.step = 4;
  },

  destroy() {
    if (this._timerInterval) {
      clearInterval(this._timerInterval);
      this._timerInterval = null;
    }
  },
}));

Alpine.data('registerPage', () => ({
  currentStep: 'account-type' as RegisterStep,
  accountType: 'buyer' as AccountType | null,
  email: '',
  emailValid: false,
  emailError: false,
  otpState: null as EmailVerificationState | null,

  init() {
    // Read initial step from data attribute if provided
    const initialStep = (this.$el as HTMLElement).dataset.initialStep as RegisterStep | undefined;
    if (initialStep && initialStep !== 'account-type') {
      this.currentStep = initialStep;
    }

    // Initialize account type selector (child component delegation)
    initAccountTypeSelector({
      defaultType: 'buyer',
      onTypeSelect: (type: AccountType) => {
        this.accountType = type;
      }
    });
    this.accountType = getSelectedAccountType() || 'buyer';

    // Listen for programmatic navigation via navigateToStep()
    (this.$el as HTMLElement).addEventListener('register-navigate', ((e: CustomEvent) => {
      this.goToStep(e.detail.step as RegisterStep);
    }) as EventListener);
  },

  validateEmail() {
    const input = (this.$refs as Record<string, HTMLInputElement>).emailInput;
    const value = input?.value.trim() || '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailValid = emailRegex.test(value);
    if (this.emailValid) {
      this.emailError = false;
    }
  },

  submitEmail() {
    const input = (this.$refs as Record<string, HTMLInputElement>).emailInput;
    const value = input?.value.trim() || '';

    if (!this.emailValid) {
      this.emailError = true;
      return;
    }

    this.email = value;
    this.goToStep('otp');
  },

  goToStep(step: RegisterStep) {
    // Cleanup OTP state when leaving OTP step
    if (this.currentStep === 'otp' && this.otpState) {
      cleanupEmailVerification(this.otpState);
      this.otpState = null;
    }

    this.currentStep = step;

    // Notify external listeners via custom event
    this.$dispatch('register-step-change', { step });

    this.$nextTick(() => {
      switch (step) {
        case 'email': {
          const input = (this.$refs as Record<string, HTMLInputElement>).emailInput;
          input?.focus();
          break;
        }
        case 'otp': {
          // Dynamically render OTP content (child component needs fresh DOM each time)
          const container = (this.$refs as Record<string, HTMLElement>).otpContainer;
          if (container) {
            container.innerHTML = EmailVerification(escapeHtml(this.email));
          }
          this.otpState = initEmailVerification({
            email: this.email,
            onComplete: () => {
              this.goToStep('setup');
            },
            onResend: () => {
              // In production, resend OTP via backend
            },
            onBack: () => {
              this.goToStep('email');
            }
          });
          break;
        }
        case 'setup': {
          // Dynamically render setup form (child component needs fresh DOM each time)
          const container = (this.$refs as Record<string, HTMLElement>).setupContainer;
          if (container) {
            container.innerHTML = AccountSetupForm('TR');
          }
          initAccountSetupForm({
            defaultCountry: 'TR',
            onSubmit: (formData: AccountSetupFormData) => {
              if (this.accountType) {
                this.$dispatch('register-complete', {
                  accountType: this.accountType,
                  email: this.email,
                  formData
                });
              }
            }
          });
          break;
        }
      }
    });
  },
}));

Alpine.data('forgotPasswordPage', () => ({
  step: 'find-account' as ForgotPasswordStep,
  email: '',
  otp: ['', '', '', '', '', ''] as string[],
  countdown: 0,
  otpError: false,
  showPassword: false,
  passwordValid: false,
  reqLength: null as boolean | null,
  reqChars: null as boolean | null,
  reqEmoji: null as boolean | null,
  _timerInterval: null as ReturnType<typeof setInterval> | null,

  get maskedEmail(): string {
    return maskEmail(this.email);
  },

  submitFindAccount() {
    const trimmed = this.email.trim();
    if (!trimmed) return;

    this.step = 'verify-code';
    this.startCountdown();

    this.$nextTick(() => {
      const container = (this.$refs as Record<string, HTMLElement>).otpContainer;
      if (container) {
        const first = container.querySelector('[data-fp-otp-index="0"]') as HTMLInputElement;
        first?.focus();
      }
    });
  },

  handleOtpInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const idx = parseInt(input.dataset.fpOtpIndex || '', 10);
    if (isNaN(idx)) return;

    const value = input.value.replace(/\D/g, '');
    if (value.length === 1) {
      this.otp[idx] = value;
      input.value = value;
      // Auto-focus next
      if (idx < 5) {
        const container = (this.$refs as Record<string, HTMLElement>).otpContainer;
        const next = container?.querySelector(`[data-fp-otp-index="${idx + 1}"]`) as HTMLInputElement;
        next?.focus();
      }
    } else {
      this.otp[idx] = '';
      input.value = '';
    }

    this.otpError = false;

    // Auto-proceed when all 6 digits entered
    if (this.otp.every((d: string) => d !== '')) {
      setTimeout(() => {
        this.step = 'reset-password';
        this.stopCountdown();
        this.$nextTick(() => {
          const pwInput = (this.$refs as Record<string, HTMLInputElement>).newPassword;
          pwInput?.focus();
        });
      }, 300);
    }
  },

  handleOtpPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text') || '';
    const digits = pasted.replace(/\D/g, '').slice(0, 6);
    const container = (this.$refs as Record<string, HTMLElement>).otpContainer;
    if (!container) return;

    for (let i = 0; i < 6; i++) {
      this.otp[i] = digits[i] || '';
      const el = container.querySelector(`[data-fp-otp-index="${i}"]`) as HTMLInputElement;
      if (el) el.value = digits[i] || '';
    }

    if (digits.length > 0) {
      const focusIdx = Math.min(digits.length - 1, 5);
      const focusEl = container.querySelector(`[data-fp-otp-index="${focusIdx}"]`) as HTMLInputElement;
      focusEl?.focus();
    }

    if (this.otp.every((d: string) => d !== '')) {
      setTimeout(() => {
        this.step = 'reset-password';
        this.stopCountdown();
      }, 300);
    }
  },

  handleOtpKeydown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const idx = parseInt(input.dataset.fpOtpIndex || '', 10);
    if (isNaN(idx)) return;

    const container = (this.$refs as Record<string, HTMLElement>).otpContainer;
    if (!container) return;

    if (event.key === 'Backspace' && !input.value && idx > 0) {
      const prev = container.querySelector(`[data-fp-otp-index="${idx - 1}"]`) as HTMLInputElement;
      prev?.focus();
    }
    if (event.key === 'ArrowLeft' && idx > 0) {
      event.preventDefault();
      const prev = container.querySelector(`[data-fp-otp-index="${idx - 1}"]`) as HTMLInputElement;
      prev?.focus();
    }
    if (event.key === 'ArrowRight' && idx < 5) {
      event.preventDefault();
      const next = container.querySelector(`[data-fp-otp-index="${idx + 1}"]`) as HTMLInputElement;
      next?.focus();
    }
  },

  resendCode() {
    if (this.countdown > 0) return;

    // Reset OTP
    this.otp = ['', '', '', '', '', ''];
    const container = (this.$refs as Record<string, HTMLElement>).otpContainer;
    if (container) {
      container.querySelectorAll<HTMLInputElement>('[data-fp-otp-index]').forEach(i => { i.value = ''; });
    }
    this.otpError = false;
    this.startCountdown();

    if (container) {
      const first = container.querySelector('[data-fp-otp-index="0"]') as HTMLInputElement;
      first?.focus();
    }
  },

  startCountdown() {
    this.stopCountdown();
    this.countdown = 60;
    this._timerInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        this.stopCountdown();
      }
    }, 1000);
  },

  stopCountdown() {
    if (this._timerInterval) {
      clearInterval(this._timerInterval);
      this._timerInterval = null;
    }
  },

  validatePassword() {
    const pw = (this.$refs as Record<string, HTMLInputElement>).newPassword?.value || '';
    const touched = pw.length > 0;

    // Rule 1: 6-20 characters
    const lengthOk = pw.length >= 6 && pw.length <= 20;
    this.reqLength = touched ? lengthOk : null;

    // Rule 2: At least 2 of: letters, digits, special chars
    const hasLetters = /[a-zA-Z]/.test(pw);
    const hasDigits = /[0-9]/.test(pw);
    const hasSpecial = /[^a-zA-Z0-9\s]/.test(pw);
    const typesCount = [hasLetters, hasDigits, hasSpecial].filter(Boolean).length;
    const charsOk = typesCount >= 2;
    this.reqChars = touched ? charsOk : null;

    // Rule 3: No emoji
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    const noEmoji = !emojiRegex.test(pw);
    this.reqEmoji = touched ? noEmoji : null;

    // Enable/disable submit
    this.passwordValid = lengthOk && charsOk && noEmoji;
  },

  reqStyle(valid: boolean | null): string {
    if (valid === null) return '';
    return valid ? 'color: #16a34a' : 'color: #dc2626';
  },

  submitReset() {
    if (!this.passwordValid) return;
    const baseUrl = getBaseUrl();
    alert('Şifreniz başarıyla güncellendi!');
    window.location.href = `${baseUrl}login.html`;
  },

  destroy() {
    this.stopCountdown();
  },
}));

Alpine.data('filterSidebar', (initialCollapsed: Record<string, boolean> = {}) => ({
  collapsed: { ...initialCollapsed } as Record<string, boolean>,
  lastRadioValue: {} as Record<string, string | null>,

  init() {
    // Initialize radio tracking from current DOM state
    (this.$el as HTMLElement).querySelectorAll<HTMLInputElement>('[data-filter-section][type="radio"]').forEach((radio) => {
      const section = radio.dataset.filterSection ?? '';
      if (radio.checked) this.lastRadioValue[section] = radio.value;
      else if (!(section in this.lastRadioValue)) this.lastRadioValue[section] = null;
    });
  },

  toggleSection(sectionId: string) {
    this.collapsed[sectionId] = !this.collapsed[sectionId];
  },

  handleRadioClick(event: Event) {
    const radio = event.target as HTMLInputElement;
    if (radio.type !== 'radio') return;
    const section = radio.dataset.filterSection ?? '';
    if (this.lastRadioValue[section] === radio.value) {
      radio.checked = false;
      this.lastRadioValue[section] = null;
    } else {
      this.lastRadioValue[section] = radio.value;
    }
    this.$dispatch('filter-change');
  },

  handleSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const sectionId = input.dataset.filterSection;
    if (!sectionId) return;
    const query = input.value.toLowerCase();
    const wrapper = input.closest('[data-filter-section-wrapper]') || input.parentElement?.parentElement;
    if (!wrapper) return;
    wrapper.querySelectorAll<HTMLLabelElement>('label[for^="filter-"]').forEach((label) => {
      label.style.display = (label.textContent?.toLowerCase() || '').includes(query) ? '' : 'none';
    });
  },

  clearAllFilters() {
    (this.$el as HTMLElement).querySelectorAll<HTMLInputElement>('[data-filter-section]').forEach((input) => {
      if (input.type === 'checkbox' || input.type === 'radio') {
        input.checked = false;
      } else if (input.type === 'number' || input.type === 'text') {
        input.value = '';
      }
    });
    // Reset search result visibility
    (this.$el as HTMLElement).querySelectorAll<HTMLLabelElement>('label[for^="filter-"]').forEach((label) => {
      label.style.display = '';
    });
    for (const key in this.lastRadioValue) this.lastRadioValue[key] = null;
    this.$dispatch('filter-change');
  },
}));

Alpine.data('filterChips', () => ({
  removeChipFilter(section: string, value: string) {
    // Uncheck the corresponding checkbox/radio input
    const input = document.querySelector<HTMLInputElement>(
      `input[data-filter-section="${section}"][data-filter-value="${value}"]`
    );
    if (input) {
      input.checked = false;
      input.dispatchEvent(new Event('change', { bubbles: true }));
      return;
    }

    // For price range, clear both min/max inputs
    if (section === 'price') {
      document.querySelectorAll<HTMLInputElement>('[data-filter-section="price"][data-filter-type]').forEach(i => { i.value = ''; });
      document.dispatchEvent(new CustomEvent('filter-change'));
      return;
    }

    // For min-order, clear the value input
    if (section === 'min-order') {
      document.querySelectorAll<HTMLInputElement>('[data-filter-section="min-order"][data-filter-type]').forEach(i => { i.value = ''; });
      document.dispatchEvent(new CustomEvent('filter-change'));
    }
  },
}));

Alpine.data('searchHeader', ({ selectedSort, viewMode, sortLabel }: { selectedSort: string; viewMode: string; sortLabel: string }) => ({
  sortOpen: false,
  selectedSort,
  viewMode,
  sortLabel,

  selectSort(value: string, label: string) {
    this.selectedSort = value;
    this.sortLabel = label;
    this.sortOpen = false;
    this.$dispatch('sort-change', { value, label });
  },

  setViewMode(mode: string) {
    this.viewMode = mode;
    this.$dispatch('view-mode-change', { mode });
  },
}));

interface CheckoutDeliveryMethod {
  id: string;
  etaLabel: string;
  shippingFee: number;
  isDefault?: boolean;
}

interface CheckoutDeliveryOrderGroup {
  orderId: string;
  methods: CheckoutDeliveryMethod[];
}

interface CheckoutSupplierNotesStorage {
  [ownerKey: string]: Record<string, string>;
}

function parseCheckoutDeliveryOrders(raw: string | undefined): CheckoutDeliveryOrderGroup[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as CheckoutDeliveryOrderGroup[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const CHECKOUT_SUPPLIER_NOTES_KEY = 'tradehub_checkout_supplier_notes';

function getCheckoutOwnerKey(): string {
  const user = getUser();
  if (isLoggedIn() && user?.email) {
    return `user:${user.email.toLowerCase()}`;
  }
  return 'guest';
}

function readCheckoutSupplierNotesStorage(): CheckoutSupplierNotesStorage {
  try {
    const raw = localStorage.getItem(CHECKOUT_SUPPLIER_NOTES_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as CheckoutSupplierNotesStorage;
  } catch {
    return {};
  }
}

function writeCheckoutSupplierNotesStorage(storage: CheckoutSupplierNotesStorage): void {
  localStorage.setItem(CHECKOUT_SUPPLIER_NOTES_KEY, JSON.stringify(storage));
}

Alpine.data('checkoutItemsDelivery', () => ({
  deliveryOrders: [] as CheckoutDeliveryOrderGroup[],
  selectedMethodByOrderId: {} as Record<string, string>,
  supplierNotesByOrderId: {} as Record<string, string>,
  isNoteModalOpen: false,
  activeNoteOrderId: '',
  noteDraft: '',

  init() {
    const root = this.$el as HTMLElement;
    this.deliveryOrders = parseCheckoutDeliveryOrders(root.dataset.deliveryOrders);

    this.deliveryOrders.forEach((order) => {
      const defaultMethod = order.methods.find((method) => method.isDefault) ?? order.methods[0];
      if (defaultMethod) this.selectedMethodByOrderId[order.orderId] = defaultMethod.id;
    });

    this.loadSupplierNotes();
    this.emitShippingFeeUpdate();
  },

  selectMethod(orderId: string, methodId: string) {
    this.selectedMethodByOrderId[orderId] = methodId;
    this.emitShippingFeeUpdate();
  },

  isMethodSelected(orderId: string, methodId: string): boolean {
    return this.selectedMethodByOrderId[orderId] === methodId;
  },

  loadSupplierNotes() {
    const storage = readCheckoutSupplierNotesStorage();
    const ownerNotes = storage[getCheckoutOwnerKey()] ?? {};
    const validOrderIds = new Set(this.deliveryOrders.map((order) => order.orderId));

    this.supplierNotesByOrderId = Object.fromEntries(
      Object.entries(ownerNotes).filter(([orderId, note]) => validOrderIds.has(orderId) && typeof note === 'string' && note.trim().length > 0),
    );
  },

  persistSupplierNotes() {
    const storage = readCheckoutSupplierNotesStorage();
    storage[getCheckoutOwnerKey()] = this.supplierNotesByOrderId;
    writeCheckoutSupplierNotesStorage(storage);
  },

  openNoteModal(orderId: string) {
    this.activeNoteOrderId = orderId;
    this.noteDraft = this.getOrderNote(orderId);
    this.isNoteModalOpen = true;
  },

  closeNoteModal() {
    this.isNoteModalOpen = false;
    this.activeNoteOrderId = '';
    this.noteDraft = '';
  },

  saveNote() {
    if (!this.activeNoteOrderId) {
      this.closeNoteModal();
      return;
    }

    const note = this.noteDraft.trim();
    if (note) {
      this.supplierNotesByOrderId[this.activeNoteOrderId] = note;
    } else {
      delete this.supplierNotesByOrderId[this.activeNoteOrderId];
    }

    this.persistSupplierNotes();
    this.closeNoteModal();
  },

  hasOrderNote(orderId: string): boolean {
    return this.getOrderNote(orderId).trim().length > 0;
  },

  getOrderNote(orderId: string): string {
    return this.supplierNotesByOrderId[orderId] ?? '';
  },

  getSelectedShippingFeeTotal(): number {
    const total = this.deliveryOrders.reduce((sum, order) => {
      const selectedMethodId = this.selectedMethodByOrderId[order.orderId];
      const selectedMethod = order.methods.find((method) => method.id === selectedMethodId)
        ?? order.methods.find((method) => method.isDefault)
        ?? order.methods[0];

      return sum + (selectedMethod?.shippingFee ?? 0);
    }, 0);

    return Number(total.toFixed(2));
  },

  emitShippingFeeUpdate() {
    window.dispatchEvent(new CustomEvent('checkout:shipping-updated', {
      detail: { shippingFee: this.getSelectedShippingFeeTotal() },
    }));
  },
}));

Alpine.data('checkoutOrderSummary', (props?: { itemSubtotal?: number; discount?: number; initialShippingFee?: number; currency?: string }) => ({
  itemSubtotal: Number(props?.itemSubtotal ?? 0),
  discount: Number(props?.discount ?? 0),
  shippingFee: Number(props?.initialShippingFee ?? 0),
  currency: props?.currency ?? 'USD',

  init() {
    window.addEventListener('checkout:shipping-updated', (event: Event) => {
      const detail = (event as CustomEvent<{ shippingFee?: number }>).detail;
      const nextShippingFee = detail?.shippingFee;
      if (typeof nextShippingFee === 'number' && Number.isFinite(nextShippingFee)) {
        this.shippingFee = Number(nextShippingFee.toFixed(2));
      }
    });
  },

  get total(): number {
    return Number((this.itemSubtotal + this.shippingFee - this.discount).toFixed(2));
  },

  formatMoney(value: number): string {
    return `${this.currency} ${value.toFixed(2)}`;
  },
}));

// ── Checkout Accordion (PaymentMethodSection, ItemsDeliverySection) ──

Alpine.data('checkoutAccordion', (props?: { initialExpanded?: boolean }) => ({
  expanded: props?.initialExpanded ?? false,

  toggle() {
    const content = (this.$refs as Record<string, HTMLElement>).content;
    if (!content) {
      this.expanded = !this.expanded;
      return;
    }

    if (this.expanded) {
      // Collapse: set explicit height first, then animate to 0
      content.style.height = `${content.scrollHeight}px`;
      content.offsetHeight; // force reflow
      content.style.height = '0';
      content.style.overflow = 'hidden';
      this.expanded = false;
    } else {
      // Expand: animate from 0 to scrollHeight
      content.style.height = `${content.scrollHeight}px`;
      content.style.overflow = 'hidden';
      this.expanded = true;

      const onEnd = () => {
        content.style.height = '';
        content.style.overflow = '';
        content.removeEventListener('transitionend', onEnd);
      };
      content.addEventListener('transitionend', onEnd);
    }
  },
}));

// ── Shipping Address Form (checkout page) ──
interface CheckoutStoredAddress extends SavedAddress {
  id: string;
  isDefault: boolean;
}

interface CheckoutAddressBookStorage {
  [userKey: string]: CheckoutStoredAddress[];
}

interface CheckoutAddAddressForm {
  country: string;
  fullName: string;
  phonePrefix: string;
  phone: string;
  street: string;
  apartment: string;
  state: string;
  city: string;
  postalCode: string;
  isDefaultAddress: boolean;
}

const CHECKOUT_ADDRESS_BOOK_KEY = 'tradehub_checkout_address_book';
const defaultShippingCountry = checkoutCountries.find(c => c.code === 'TR') ?? checkoutCountries[0];

function generateAddressId(): string {
  return `addr-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: '', lastName: '' };
  if (parts.length === 1) return { firstName: parts[0], lastName: '' };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  };
}

function readCheckoutAddressBook(): CheckoutAddressBookStorage {
  try {
    const raw = localStorage.getItem(CHECKOUT_ADDRESS_BOOK_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as CheckoutAddressBookStorage;
  } catch {
    return {};
  }
}

function writeCheckoutAddressBook(storage: CheckoutAddressBookStorage): void {
  localStorage.setItem(CHECKOUT_ADDRESS_BOOK_KEY, JSON.stringify(storage));
}

function getCountryByCode(code: string) {
  return checkoutCountries.find((country) => country.code === code) ?? defaultShippingCountry;
}

function formatAddressLine(address: Pick<SavedAddress, 'street' | 'city' | 'state' | 'postalCode' | 'countryName'>): string {
  return [address.street, address.city, address.state, address.postalCode, address.countryName]
    .filter(Boolean)
    .join(', ');
}

function normalizeProvinceName(value: string): string {
  return value
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replaceAll('ı', 'i')
    .replace(/\s+/g, ' ')
    .trim();
}

const DISTRICTS_BY_PROVINCE_NORMALIZED = Object.fromEntries(
  Object.entries(districtsByProvince).map(([province, districts]) => [normalizeProvinceName(province), districts]),
) as Record<string, string[]>;

const FALLBACK_CITY_OPTIONS = ['Merkez', 'Cumhuriyet', 'Yeni Mahalle', 'Sanayi'];

Alpine.data('shippingForm', () => ({
  countryOpen: false,
  stateOpen: false,
  cityOpen: false,

  countryDisplay: `${defaultShippingCountry.flag} ${defaultShippingCountry.name}`,
  stateDisplay: '',
  cityDisplay: '',
  phonePrefix: defaultShippingCountry.phonePrefix,
  errors: {} as Record<string, boolean>,

  showAddressForm: true,
  savedAddresses: [] as CheckoutStoredAddress[],
  selectedAddressId: '',
  pendingAddressId: '',
  selectedAddressName: '',
  selectedAddressPhone: '',
  selectedAddressLine: '',

  isAddressSelectorOpen: false,
  isAddAddressModalOpen: false,
  isEditingAddress: false,
  editingAddressId: '',
  addAddressForm: {
    country: defaultShippingCountry.code,
    fullName: '',
    phonePrefix: defaultShippingCountry.phonePrefix,
    phone: '',
    street: '',
    apartment: '',
    state: '',
    city: '',
    postalCode: '',
    isDefaultAddress: false,
  } as CheckoutAddAddressForm,
  addFormErrors: {} as Record<string, boolean>,

  init() {
    this.loadAddressesForCurrentUser();
    this.updateCityDropdown(this.stateDisplay);
  },

  getAddressOwnerKey(): string {
    const user = getUser();
    if (isLoggedIn() && user?.email) {
      return `user:${user.email.toLowerCase()}`;
    }
    return 'guest';
  },

  loadAddressesForCurrentUser() {
    const storage = readCheckoutAddressBook();
    const ownerKey = this.getAddressOwnerKey();
    const addresses = storage[ownerKey] ?? [];

    this.savedAddresses = addresses;

    if (this.savedAddresses.length === 0) {
      this.showAddressForm = true;
      this.selectedAddressId = '';
      this.pendingAddressId = '';
      this.selectedAddressName = '';
      this.selectedAddressPhone = '';
      this.selectedAddressLine = '';
      return;
    }

    const defaultAddress = this.savedAddresses.find((address) => address.isDefault) ?? this.savedAddresses[0];
    this.applySelectedAddress(defaultAddress.id);
    this.showAddressForm = false;
  },

  persistAddresses() {
    const storage = readCheckoutAddressBook();
    storage[this.getAddressOwnerKey()] = this.savedAddresses;
    writeCheckoutAddressBook(storage);
  },

  fillMainFormFromAddress(address: CheckoutStoredAddress) {
    const el = this.$el as HTMLElement;
    const setInput = (id: string, value: string) => {
      const input = el.querySelector<HTMLInputElement>(`#${id}`);
      if (input) input.value = value;
    };

    const country = getCountryByCode(address.country);
    this.countryDisplay = `${country.flag} ${country.name}`;
    this.phonePrefix = address.phonePrefix || country.phonePrefix;
    this.stateDisplay = address.state;
    this.updateCityDropdown(address.state);
    this.cityDisplay = address.city;

    setInput('first-name', `${address.firstName} ${address.lastName}`.trim());
    setInput('phone', address.phone);
    setInput('street-address', address.street);
    setInput('apartment', address.apartment);
    setInput('postal-code', address.postalCode);

    this.errors.country = false;
    this.errors.firstName = false;
    this.errors.phone = false;
    this.errors.streetAddress = false;
    this.errors.state = false;
    this.errors.city = false;
    this.errors.postalCode = false;
  },

  applySelectedAddress(addressId: string) {
    const address = this.savedAddresses.find((row) => row.id === addressId);
    if (!address) return;

    this.selectedAddressId = address.id;
    this.pendingAddressId = address.id;
    this.selectedAddressName = `${address.firstName} ${address.lastName}`.trim();
    this.selectedAddressPhone = `${address.phonePrefix} ${address.phone}`.trim();
    this.selectedAddressLine = address.fullAddress || formatAddressLine(address);
    this.fillMainFormFromAddress(address);
  },

  openAddressSelector() {
    if (this.savedAddresses.length === 0) {
      this.openAddAddressModal();
      return;
    }
    this.pendingAddressId = this.selectedAddressId || this.savedAddresses[0].id;
    this.isAddressSelectorOpen = true;
  },

  closeAddressSelector() {
    this.isAddressSelectorOpen = false;
  },

  confirmSelectedAddress() {
    const address = this.savedAddresses.find((row) => row.id === this.pendingAddressId) ?? this.savedAddresses[0];
    if (!address) return;

    this.applySelectedAddress(address.id);
    this.showAddressForm = false;
    this.isAddressSelectorOpen = false;
  },

  resetAddAddressForm() {
    this.addAddressForm = {
      country: defaultShippingCountry.code,
      fullName: '',
      phonePrefix: defaultShippingCountry.phonePrefix,
      phone: '',
      street: '',
      apartment: '',
      state: '',
      city: '',
      postalCode: '',
      isDefaultAddress: false,
    };
    this.addFormErrors = {};
    this.isEditingAddress = false;
    this.editingAddressId = '';
  },

  openAddAddressModal() {
    this.resetAddAddressForm();
    this.isAddressSelectorOpen = false;
    this.isAddAddressModalOpen = true;
  },

  closeAddAddressModal() {
    this.isAddAddressModalOpen = false;
    this.addFormErrors = {};
  },

  syncAddAddressCountry() {
    const country = getCountryByCode(this.addAddressForm.country);
    this.addAddressForm.phonePrefix = country.phonePrefix;
  },

  startEditAddress(addressId: string) {
    const address = this.savedAddresses.find((row) => row.id === addressId);
    if (!address) return;

    this.isEditingAddress = true;
    this.editingAddressId = address.id;
    this.addAddressForm = {
      country: address.country,
      fullName: `${address.firstName} ${address.lastName}`.trim(),
      phonePrefix: address.phonePrefix,
      phone: address.phone,
      street: address.street,
      apartment: address.apartment,
      state: address.state,
      city: address.city,
      postalCode: address.postalCode,
      isDefaultAddress: address.isDefault,
    };
    this.addFormErrors = {};
    this.isAddressSelectorOpen = false;
    this.isAddAddressModalOpen = true;
  },

  deleteAddress(addressId: string) {
    this.savedAddresses = this.savedAddresses.filter((address) => address.id !== addressId);

    if (this.savedAddresses.length === 0) {
      this.persistAddresses();
      this.selectedAddressId = '';
      this.pendingAddressId = '';
      this.selectedAddressName = '';
      this.selectedAddressPhone = '';
      this.selectedAddressLine = '';
      this.showAddressForm = true;
      this.isAddressSelectorOpen = false;
      return;
    }

    if (!this.savedAddresses.some((address) => address.isDefault)) {
      this.savedAddresses[0].isDefault = true;
    }

    const nextAddress = this.savedAddresses.find((address) => address.id === this.selectedAddressId)
      ?? this.savedAddresses.find((address) => address.isDefault)
      ?? this.savedAddresses[0];

    this.persistAddresses();
    this.applySelectedAddress(nextAddress.id);
  },

  setDefaultAddress(addressId: string) {
    this.savedAddresses = this.savedAddresses.map((address) => ({
      ...address,
      isDefault: address.id === addressId,
    }));
    this.persistAddresses();
  },

  validateAddAddressForm(): boolean {
    const requiredFields: Array<keyof CheckoutAddAddressForm> = [
      'country',
      'fullName',
      'phone',
      'street',
      'state',
      'city',
      'postalCode',
    ];

    this.addFormErrors = {};
    let hasErrors = false;

    for (const field of requiredFields) {
      const value = String(this.addAddressForm[field] ?? '').trim();
      const invalid = !value;
      this.addFormErrors[field] = invalid;
      if (invalid) hasErrors = true;
    }

    return !hasErrors;
  },

  buildAddressFromAddForm(): CheckoutStoredAddress {
    const country = getCountryByCode(this.addAddressForm.country);
    const nameParts = splitFullName(this.addAddressForm.fullName);
    const baseAddress: SavedAddress = {
      label: 'Shipping address',
      fullAddress: formatAddressLine({
        street: this.addAddressForm.street.trim(),
        city: this.addAddressForm.city.trim(),
        state: this.addAddressForm.state.trim(),
        postalCode: this.addAddressForm.postalCode.trim(),
        countryName: country.name,
      }),
      country: country.code,
      countryName: country.name,
      firstName: nameParts.firstName,
      lastName: nameParts.lastName,
      phone: this.addAddressForm.phone.trim(),
      phonePrefix: this.addAddressForm.phonePrefix,
      street: this.addAddressForm.street.trim(),
      apartment: this.addAddressForm.apartment.trim(),
      state: this.addAddressForm.state.trim(),
      city: this.addAddressForm.city.trim(),
      postalCode: this.addAddressForm.postalCode.trim(),
    };

    return {
      id: this.editingAddressId || generateAddressId(),
      isDefault: this.addAddressForm.isDefaultAddress,
      ...baseAddress,
    };
  },

  submitAddAddress() {
    if (!this.validateAddAddressForm()) return;

    const candidate = this.buildAddressFromAddForm();

    if (this.isEditingAddress && this.editingAddressId) {
      this.savedAddresses = this.savedAddresses.map((address) => (
        address.id === this.editingAddressId ? candidate : address
      ));
    } else {
      this.savedAddresses = [candidate, ...this.savedAddresses];
    }

    if (candidate.isDefault || this.savedAddresses.length === 1) {
      this.savedAddresses = this.savedAddresses.map((address) => ({
        ...address,
        isDefault: address.id === candidate.id,
      }));
    } else if (!this.savedAddresses.some((address) => address.isDefault)) {
      this.savedAddresses[0].isDefault = true;
    }

    this.persistAddresses();
    this.applySelectedAddress(candidate.id);
    this.showAddressForm = false;
    this.isAddAddressModalOpen = false;
    this.isAddressSelectorOpen = false;
  },

  toggleDropdown(name: string) {
    const keys = ['country', 'state', 'city'];
    keys.forEach((key) => {
      if (key !== name) {
        const otherProp = `${key}Open` as 'countryOpen' | 'stateOpen' | 'cityOpen';
        this[otherProp] = false;
      }
    });
    const prop = `${name}Open` as 'countryOpen' | 'stateOpen' | 'cityOpen';
    if (name === 'city') {
      const stateFromDom = ((this.$el as HTMLElement)
        .querySelector('[data-dropdown="state-dropdown"] [data-display]')?.textContent ?? '')
        .trim();
      const effectiveState = this.stateDisplay.trim() || stateFromDom;
      this.updateCityDropdown(effectiveState);
    }
    this[prop] = !this[prop];
  },

  selectCountryItem(event: Event) {
    const item = (event.target as HTMLElement).closest('li') as HTMLElement | null;
    if (!item) return;

    const list = item.closest('[data-list]');
    list?.querySelectorAll('li').forEach((node) => node.classList.remove('bg-blue-50', 'text-blue-800'));
    item.classList.add('bg-blue-50', 'text-blue-800');

    this.countryDisplay = `${item.dataset.flag || ''} ${item.dataset.name || ''}`;
    if (item.dataset.prefix) this.phonePrefix = item.dataset.prefix;

    this.countryOpen = false;
    this.errors.country = false;
  },

  selectStateItem(event: Event) {
    const item = (event.target as HTMLElement).closest('li') as HTMLElement | null;
    if (!item) return;

    const list = item.closest('[data-list]');
    list?.querySelectorAll('li').forEach((node) => node.classList.remove('bg-blue-50', 'text-blue-800'));
    item.classList.add('bg-blue-50', 'text-blue-800');

    const stateValue = (item.dataset.value || item.textContent || '').trim();
    this.stateDisplay = stateValue;
    this.stateOpen = false;
    this.errors.state = false;
    this.updateCityDropdown(stateValue);
  },

  selectCityItem(event: Event) {
    const item = (event.target as HTMLElement).closest('li') as HTMLElement | null;
    if (!item) return;
    if (item.dataset.disabled === 'true') return;

    const list = item.closest('[data-list]');
    list?.querySelectorAll('li').forEach((node) => node.classList.remove('bg-blue-50', 'text-blue-800'));
    item.classList.add('bg-blue-50', 'text-blue-800');

    this.cityDisplay = item.dataset.value || item.textContent?.trim() || '';
    this.cityOpen = false;
    this.errors.city = false;
  },

  updateCityDropdown(stateName: string) {
    const normalizedState = normalizeProvinceName(stateName);
    this.cityDisplay = '';

    const el = this.$el as HTMLElement;
    const cityList = el.querySelector('[data-dropdown="city-dropdown"] [data-list]');
    if (!cityList) return;

    if (!normalizedState) {
      cityList.innerHTML = `
        <li
          class="px-3 py-2 text-[13px] text-[#9ca3af] cursor-not-allowed"
          role="option"
          data-disabled="true"
        >
          Once state / province secin
        </li>
      `;
      return;
    }

    const districts = DISTRICTS_BY_PROVINCE_NORMALIZED[normalizedState] ?? FALLBACK_CITY_OPTIONS;
    cityList.innerHTML = districts.map(district =>
      `<li class="px-3 py-2 text-[14px] text-[var(--color-text-primary)] cursor-pointer hover:bg-[#f5f5f5] transition-colors" role="option" data-value="${district}">${district}</li>`
    ).join('');
  },

  clearError(fieldName: string) {
    this.errors[fieldName] = false;
  },

  handleSubmit() {
    const requiredFields = ['country', 'firstName', 'phone', 'streetAddress', 'state', 'city', 'postalCode'];
    requiredFields.forEach(field => { this.errors[field] = false; });

    const el = this.$el as HTMLElement;
    const idMap: Record<string, string> = {
      firstName: 'first-name',
      phone: 'phone',
      streetAddress: 'street-address',
      postalCode: 'postal-code',
    };

    const getValue = (field: string): string => {
      if (field === 'country') return this.countryDisplay;
      if (field === 'state') return this.stateDisplay;
      if (field === 'city') return this.cityDisplay;
      const id = idMap[field];
      return id ? (el.querySelector<HTMLInputElement>(`#${id}`))?.value?.trim() ?? '' : '';
    };

    let hasErrors = false;
    let firstErrorField: HTMLElement | null = null;

    for (const field of requiredFields) {
      if (!getValue(field)) {
        hasErrors = true;
        this.errors[field] = true;
        if (!firstErrorField) {
          firstErrorField = el.querySelector<HTMLElement>(`[data-field="${field}"]`);
        }
      }
    }

    if (hasErrors && firstErrorField) {
      firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const countryMatch = checkoutCountries.find((country) => this.countryDisplay.includes(country.name));
    const country = countryMatch ?? defaultShippingCountry;
    const fullName = getValue('firstName');
    const nameParts = splitFullName(fullName);
    const street = getValue('streetAddress');
    const state = this.stateDisplay;
    const city = this.cityDisplay;
    const postalCode = getValue('postalCode');
    const apartment = (el.querySelector<HTMLInputElement>('#apartment'))?.value?.trim() ?? '';

    const candidate: CheckoutStoredAddress = {
      id: generateAddressId(),
      isDefault: (el.querySelector<HTMLInputElement>('#default-address'))?.checked ?? this.savedAddresses.length === 0,
      label: 'Shipping address',
      fullAddress: formatAddressLine({
        street,
        city,
        state,
        postalCode,
        countryName: country.name,
      }),
      country: country.code,
      countryName: country.name,
      firstName: nameParts.firstName,
      lastName: nameParts.lastName,
      phone: getValue('phone'),
      phonePrefix: this.phonePrefix,
      street,
      apartment,
      state,
      city,
      postalCode,
    };

    this.savedAddresses = [candidate, ...this.savedAddresses];
    if (candidate.isDefault || this.savedAddresses.length === 1) {
      this.savedAddresses = this.savedAddresses.map((address) => ({
        ...address,
        isDefault: address.id === candidate.id,
      }));
    }

    this.persistAddresses();
    this.applySelectedAddress(candidate.id);
    this.showAddressForm = false;
    this.isAddressSelectorOpen = false;
    this.isAddAddressModalOpen = false;
  },

  useCurrentLocation() {
    if (!navigator.geolocation) return;

    if (confirm('Allow TradeHub to access your current location?')) {
      navigator.geolocation.getCurrentPosition(
        () => {
          const el = this.$el as HTMLElement;
          const setInput = (id: string, value: string) => {
            const input = el.querySelector<HTMLInputElement>(`#${id}`);
            if (input) input.value = value;
          };

          setInput('street-address', geolocationMockAddress.street || '');
          setInput('postal-code', geolocationMockAddress.postalCode);
          this.stateDisplay = geolocationMockAddress.state;
          this.updateCityDropdown(geolocationMockAddress.state);
          this.cityDisplay = geolocationMockAddress.city;

          this.errors.streetAddress = false;
          this.errors.postalCode = false;
          this.errors.state = false;
          this.errors.city = false;
        },
        () => {
          // Silent fail on geolocation denial
        }
      );
    }
  },

  useCurrentLocationForAddForm() {
    if (!navigator.geolocation) return;

    if (confirm('Allow TradeHub to access your current location?')) {
      navigator.geolocation.getCurrentPosition(
        () => {
          this.addAddressForm.street = geolocationMockAddress.street || '';
          this.addAddressForm.state = geolocationMockAddress.state;
          this.addAddressForm.city = geolocationMockAddress.city;
          this.addAddressForm.postalCode = geolocationMockAddress.postalCode;
          this.addFormErrors.street = false;
          this.addFormErrors.state = false;
          this.addFormErrors.city = false;
          this.addFormErrors.postalCode = false;
        },
        () => {
          // Silent fail on geolocation denial
        }
      );
    }
  },
}));

Alpine.data('ordersSection', () => ({
  activeTabId: ORDER_TABS[0].id,
  selectedFilterId: ORDER_FILTERS[0].id as string | null,
  dropdownOpen: false,

  selectTab(tabId: string, hasDropdown: boolean) {
    if (hasDropdown) {
      if (this.activeTabId === tabId) {
        this.dropdownOpen = !this.dropdownOpen;
        return;
      }
      this.activeTabId = tabId;
      this.dropdownOpen = true;
    } else {
      this.activeTabId = tabId;
      this.dropdownOpen = false;
    }
  },

  selectFilter(filterId: string) {
    this.selectedFilterId = filterId;
    this.dropdownOpen = false;
  },
}));

Alpine.data('sidebar', () => ({
  closeTimer: null as ReturnType<typeof setTimeout> | null,
  activeFlyout: null as HTMLElement | null,
  isPeekExpanded: false,

  shouldUsePeekExpand(): boolean {
    return window.innerWidth >= 768 && window.innerWidth < 1280;
  },

  init() {
    const sidebarEl = this.$el as HTMLElement;

    /* ──── URL-based active state ──── */
    const currentPath = window.location.pathname;
    const allItems = sidebarEl.querySelectorAll<HTMLElement>('[data-sidebar-item]');
    const activeClasses = ['bg-white', 'text-gray-900', 'shadow-sm'];
    const inactiveClasses = ['text-gray-700'];

    allItems.forEach((el) => {
      const href = el.getAttribute('href') || '';
      const hrefPath = href.split('#')[0]; // strip hash
      const isActive = hrefPath && currentPath.endsWith(hrefPath.replace(/^\//, ''));

      // Remove old active styling
      el.classList.remove(...activeClasses, 'bg-green-50', 'text-green-600');

      if (isActive) {
        el.classList.add(...activeClasses);
        el.classList.remove(...inactiveClasses);
      } else {
        el.classList.add(...inactiveClasses);
      }
    });
  },

  /* ──── Peek expand styles (tablet 768-1280px) ──── */

  applyPeekExpandStyles() {
    const sidebarEl = this.$el as HTMLElement;
    sidebarEl.style.width = '260px';
    sidebarEl.style.zIndex = '30';
    sidebarEl.style.boxShadow = '4px 0 24px rgba(0,0,0,0.08)';
    sidebarEl.style.borderTopRightRadius = '0';
    sidebarEl.style.borderBottomRightRadius = '0';

    sidebarEl.querySelectorAll<HTMLElement>('.sidebar__section-title').forEach((el) => {
      el.style.display = 'block';
    });

    sidebarEl.querySelectorAll<HTMLElement>('.sidebar-item--expanded').forEach((el) => {
      el.style.marginLeft = '0.5rem';
      el.style.marginRight = '0.5rem';
      el.style.width = 'auto';
      el.style.height = '40px';
      el.style.justifyContent = 'flex-start';
      el.style.gap = '0.75rem';
      el.style.paddingLeft = '1rem';
      el.style.paddingRight = '1rem';
    });

    sidebarEl.querySelectorAll<HTMLElement>('.sidebar-item-label').forEach((el) => {
      el.style.display = 'block';
      if (el.classList.contains('truncate')) {
        el.style.whiteSpace = 'normal';
        el.style.overflow = 'visible';
        el.style.textOverflow = 'unset';
      }
    });

    sidebarEl.querySelectorAll<HTMLElement>('.sidebar-item-badge').forEach((el) => {
      el.style.display = 'inline-flex';
    });

    sidebarEl.querySelectorAll<HTMLElement>('.sidebar-item-chevron').forEach((el) => {
      el.style.display = 'block';
    });
  },

  clearPeekExpandStyles() {
    const sidebarEl = this.$el as HTMLElement;
    sidebarEl.style.width = '';
    sidebarEl.style.zIndex = '';
    sidebarEl.style.boxShadow = '';
    sidebarEl.style.borderTopRightRadius = '';
    sidebarEl.style.borderBottomRightRadius = '';

    sidebarEl.querySelectorAll<HTMLElement>('.sidebar__section-title').forEach((el) => {
      el.style.display = '';
    });

    sidebarEl.querySelectorAll<HTMLElement>('.sidebar-item--expanded').forEach((el) => {
      el.style.marginLeft = '';
      el.style.marginRight = '';
      el.style.width = '';
      el.style.height = '';
      el.style.justifyContent = '';
      el.style.gap = '';
      el.style.paddingLeft = '';
      el.style.paddingRight = '';
    });

    sidebarEl.querySelectorAll<HTMLElement>('.sidebar-item-label').forEach((el) => {
      el.style.display = '';
      el.style.whiteSpace = '';
      el.style.overflow = '';
      el.style.textOverflow = '';
    });

    sidebarEl.querySelectorAll<HTMLElement>('.sidebar-item-badge').forEach((el) => {
      el.style.display = '';
    });

    sidebarEl.querySelectorAll<HTMLElement>('.sidebar-item-chevron').forEach((el) => {
      el.style.display = '';
    });
  },

  setPeekExpanded(next: boolean) {
    const shouldExpand = next && this.shouldUsePeekExpand();
    if (shouldExpand === this.isPeekExpanded) return;
    this.isPeekExpanded = shouldExpand;

    if (this.activeFlyout) {
      this.activeFlyout.style.display = 'none';
      this.activeFlyout = null;
    }
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
    (this.$el as HTMLElement).style.borderTopRightRadius = '';
    (this.$el as HTMLElement).style.borderBottomRightRadius = '';

    if (shouldExpand) this.applyPeekExpandStyles();
    else this.clearPeekExpandStyles();
  },

  /* ──── Flyout helpers ──── */

  positionFlyout(flyout: HTMLElement) {
    const sidebarRect = (this.$el as HTMLElement).getBoundingClientRect();
    flyout.style.left = `${sidebarRect.right}px`;
    flyout.style.top = `${sidebarRect.top}px`;
    flyout.style.height = `${sidebarRect.height}px`;
  },

  showFlyout(flyout: HTMLElement, _wrapper: HTMLElement) {
    if (this.shouldUsePeekExpand()) return;
    if (this.activeFlyout && this.activeFlyout !== flyout) {
      this.activeFlyout.style.display = 'none';
    }
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
    this.positionFlyout(flyout);
    flyout.style.display = 'block';
    this.activeFlyout = flyout;
    // Sidebar + flyout become one unified card: remove right border-radius
    (this.$el as HTMLElement).style.borderTopRightRadius = '0';
    (this.$el as HTMLElement).style.borderBottomRightRadius = '0';
  },

  scheduleClose() {
    if (this.closeTimer) clearTimeout(this.closeTimer);
    this.closeTimer = setTimeout(() => {
      if (this.activeFlyout) {
        this.activeFlyout.style.display = 'none';
        this.activeFlyout = null;
        // Restore sidebar card shape
        (this.$el as HTMLElement).style.borderTopRightRadius = '';
        (this.$el as HTMLElement).style.borderBottomRightRadius = '';
      }
    }, 150);
  },

  /* ──── Combined event handlers (replace 6 addEventListener calls) ──── */

  handleMouseEnter(event: MouseEvent) {
    if (this.shouldUsePeekExpand()) {
      this.setPeekExpanded(true);
      return;
    }

    const target = event.target as HTMLElement;

    // Flyout bridge: cancel scheduled close when entering flyout
    const flyout = target.closest<HTMLElement>('[data-sidebar-flyout]');
    if (flyout && this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }

    // Wrapper: show flyout on hover
    const wrapper = target.closest<HTMLElement>('[data-sidebar-wrapper]');
    if (wrapper) {
      const wrapperFlyout = wrapper.querySelector<HTMLElement>('[data-sidebar-flyout]');
      if (wrapperFlyout) this.showFlyout(wrapperFlyout, wrapper);
    }
  },

  handleMouseLeave(event: MouseEvent) {
    if (this.shouldUsePeekExpand()) {
      const related = event.relatedTarget as Node | null;
      const sidebarEl = this.$el as HTMLElement;
      if (!related || !sidebarEl.contains(related)) {
        this.setPeekExpanded(false);
      }
      return;
    }

    const target = event.target as HTMLElement;

    // Flyout bridge: schedule close when leaving flyout
    const flyout = target.closest<HTMLElement>('[data-sidebar-flyout]');
    if (flyout && this.activeFlyout === flyout) {
      this.scheduleClose();
    }

    // Wrapper: schedule close when leaving wrapper
    const wrapper = target.closest<HTMLElement>('[data-sidebar-wrapper]');
    if (wrapper) {
      const wrapperFlyout = wrapper.querySelector<HTMLElement>('[data-sidebar-flyout]');
      if (wrapperFlyout && this.activeFlyout === wrapperFlyout) {
        this.scheduleClose();
      }
    }
  },

  handleScroll() {
    if (this.isPeekExpanded) {
      this.setPeekExpanded(false);
    }
    if (this.activeFlyout) {
      this.activeFlyout.style.display = 'none';
      this.activeFlyout = null;
      (this.$el as HTMLElement).style.borderTopRightRadius = '';
      (this.$el as HTMLElement).style.borderBottomRightRadius = '';
    }
  },

  handleResize() {
    if (!this.shouldUsePeekExpand()) {
      this.setPeekExpanded(false);
    }
  },
}));

// ─── Messages / Inbox Component ────────────────────────────────────
Alpine.data('messagesComponent', () => ({
  activeCategory: 'all',
  searchQuery: '',
  selectedConversation: null as any,
  newMessage: '',
  filterOpen: false,
  filterType: 'all',
  feedbackVisible: true,

  categories: [
    { id: 'all', label: 'Tümü', icon: 'chat' },
    { id: 'unread', label: 'Okunmamış', icon: 'eye' },
  ],

  conversations: [
    {
      id: 'conv-001',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      name: 'Robert Song',
      company: 'Ningbo Happiness Statio...',
      preview: '[Fiyat teklifi] Tedarikçi RFQ\'nuza yanıt verdi',
      date: '2026-2-19',
      unreadCount: 2,
      messages: [
        { id: 'm1', sender: 'Robert Song', text: 'Merhaba, RFQ talebinize yanıt vermek istiyorum. Ürünlerimiz hakkında detaylı bilgi paylaşabilirim.', time: '09:15', isMe: false },
        { id: 'm2', sender: 'Ben', text: 'Merhaba Robert, fiyat teklifinizi bekliyorum. Minimum sipariş miktarı nedir?', time: '09:30', isMe: true },
        { id: 'm3', sender: 'Robert Song', text: 'Minimum sipariş miktarımız 500 adet. Birim fiyat $2.50\'dir. Toplu alımlarda %15\'e kadar indirim yapabiliriz.', time: '10:05', isMe: false },
        { id: 'm4', sender: 'Ben', text: '1000 adet için özel fiyat teklifi alabilir miyim?', time: '10:20', isMe: true },
        { id: 'm5', sender: 'Robert Song', text: '1000 adet için birim fiyat $2.15 olarak teklif edebilirim. Kargo dahil değildir. Teslimat süresi 15-20 iş günüdür.', time: '11:00', isMe: false },
      ],
    },
    {
      id: 'conv-002',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
      name: 'Leo',
      company: 'Dg Excelpro Rubber Co., L...',
      preview: '[Fiyat teklifi] Tedarikçi RFQ\'nuza yanıt verdi',
      date: '2026-2-19',
      unreadCount: 2,
      messages: [
        { id: 'm1', sender: 'Leo', text: 'RFQ talebiniz için teşekkürler. Kauçuk ürünlerimiz hakkında detaylı katalog gönderebilirim.', time: '14:00', isMe: false },
        { id: 'm2', sender: 'Ben', text: 'Katalog gönderirseniz sevinirim. Özellikle silikon ürünlerle ilgileniyorum.', time: '14:15', isMe: true },
        { id: 'm3', sender: 'Leo', text: 'Tabii, silikon ürün katalogumuzu ekte bulabilirsiniz. Herhangi bir sorunuz olursa çekinmeden sorun.', time: '14:45', isMe: false },
      ],
    },
    {
      id: 'conv-003',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      name: 'Yue Luo',
      company: 'Sichuan Wang Zhihao Tra...',
      preview: '[Fiyat teklifi] Tedarikçi RFQ\'nuza yanıt verdi',
      date: '2026-2-19',
      unreadCount: 2,
      messages: [
        { id: 'm1', sender: 'Yue Luo', text: 'Merhaba, tekstil ürünlerimiz hakkında bilgi almak ister misiniz?', time: '16:00', isMe: false },
        { id: 'm2', sender: 'Ben', text: 'Evet, pamuklu kumaş fiyatları hakkında bilgi alabilir miyim?', time: '16:10', isMe: true },
      ],
    },
    {
      id: 'conv-004',
      avatar: '',
      name: 'TradeHub.com',
      company: '',
      preview: 'Yeni mi? TradeHub.com İleri düzey tedarikçi hizmetlerimizi keşfedin',
      date: '2026-2-19',
      unreadCount: 1,
      messages: [
        { id: 'm1', sender: 'TradeHub.com', text: 'TradeHub.com\'a hoş geldiniz! İleri düzey tedarikçi hizmetlerimizi keşfedin. Trade Assurance ile güvenli ticaret yapın.', time: '08:00', isMe: false },
      ],
    },
  ],

  getUnreadTotal(): number {
    return this.conversations.reduce((sum: number, c: any) => sum + c.unreadCount, 0);
  },

  getFilteredConversations(): any[] {
    let list = [...this.conversations] as any[];
    if (this.activeCategory === 'unread') {
      list = list.filter((c: any) => c.unreadCount > 0);
    }
    if (this.filterType === 'unread') {
      list = list.filter((c: any) => c.unreadCount > 0);
    } else if (this.filterType === 'read') {
      list = list.filter((c: any) => c.unreadCount === 0);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter((c: any) =>
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.preview.toLowerCase().includes(q)
      );
    }
    return list;
  },

  setCategory(id: string) {
    this.activeCategory = id;
    this.filterType = 'all';
    this.filterOpen = false;
  },

  selectConversation(conv: any) {
    this.selectedConversation = conv;
    const found = this.conversations.find((c: any) => c.id === conv.id);
    if (found) (found as any).unreadCount = 0;
    this.$nextTick(() => {
      const chatBody = document.getElementById('msg-chat-body');
      if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
    });
  },

  backToList() {
    this.selectedConversation = null;
    this.newMessage = '';
  },

  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedConversation) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const msg = {
      id: 'm' + Date.now(),
      sender: 'Ben',
      text: this.newMessage.trim(),
      time: timeStr,
      isMe: true,
    };
    (this.selectedConversation as any).messages.push(msg);
    const found = this.conversations.find((c: any) => c.id === (this.selectedConversation as any).id);
    if (found) (found as any).preview = this.newMessage.trim();
    this.newMessage = '';
    this.$nextTick(() => {
      const chatBody = document.getElementById('msg-chat-body');
      if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
    });
  },

  toggleFilter() {
    this.filterOpen = !this.filterOpen;
  },

  setFilter(type: string) {
    this.filterType = type;
    this.filterOpen = false;
  },

  dismissFeedback() {
    this.feedbackVisible = false;
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
