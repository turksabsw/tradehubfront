import Alpine from 'alpinejs'
import { t, getCurrentLang } from './i18n'
import { initLinkRewriter } from './utils/url'
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
import { getMockProduct } from './data/mockProduct';
const mockProduct = getMockProduct();
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
import { getOrderTabs, getOrderFilters } from './components/buyer-dashboard/ordersData';
import { orderStore } from './components/orders/state/OrderStore';
import { couponStore } from './components/orders/state/CouponStore';
import type { CouponData, CreditHistoryEntry } from './data/mockCheckout';

// Augment Window interface for Alpine global access (debugging)
declare global {
  interface Window {
    Alpine: typeof Alpine
  }
}

// Register reusable Alpine.data() components BEFORE Alpine.start()

Alpine.data('ordersListComponent', () => ({
  activeTab: 'all',
  searchQuery: '',
  dateFilter: 'all',
  dateFrom: '',
  dateTo: '',
  dateOpen: false,
  timeOpen: false,
  selectedOrder: null,
  copiedNumber: false,
  orders: [] as any[],

  init() {
    orderStore.load();
    this.orders = orderStore.getOrders();
    orderStore.subscribe(() => {
      this.orders = orderStore.getOrders();
    });
  },

  get filteredOrders() {
    const statusMap: Record<string, string[]> = {
      all: [],
      unpaid: ['Waiting for payment'],
      confirming: ['Confirming'],
      delivering: ['Delivering'],
      completed: ['Completed'],
      cancelled: ['Cancelled'],
    };

    return this.orders.filter((o: any) => {
      // Status filter
      const allowedStatuses = statusMap[this.activeTab];
      const matchStatus = !allowedStatuses || allowedStatuses.length === 0 || allowedStatuses.includes(o.status);

      // Search filter
      const q = this.searchQuery.toLowerCase();
      const matchSearch = !q || o.orderNumber.toLowerCase().includes(q) || o.seller.toLowerCase().includes(q) || o.products.some((p: any) => p.name.toLowerCase().includes(q));

      // Date filter
      let matchDate = true;
      if (this.dateFilter !== 'all' && o.createdAt) {
        const orderTime = o.createdAt;
        const now = Date.now();
        if (this.dateFilter === '7d') {
          matchDate = now - orderTime <= 7 * 24 * 60 * 60 * 1000;
        } else if (this.dateFilter === '30d') {
          matchDate = now - orderTime <= 30 * 24 * 60 * 60 * 1000;
        } else if (this.dateFilter === '90d') {
          matchDate = now - orderTime <= 90 * 24 * 60 * 60 * 1000;
        } else if (this.dateFilter === 'custom') {
          if (this.dateFrom) matchDate = orderTime >= new Date(this.dateFrom).getTime();
          if (this.dateTo && matchDate) matchDate = orderTime <= new Date(this.dateTo).getTime() + 24 * 60 * 60 * 1000;
        }
      }

      return matchStatus && matchSearch && matchDate;
    });
  },

  tabCount(tabId: string) {
    const statusMap: Record<string, string[]> = {
      all: [],
      unpaid: ['Waiting for payment'],
      confirming: ['Confirming'],
      delivering: ['Delivering'],
      completed: ['Completed'],
      cancelled: ['Cancelled'],
    };
    const allowedStatuses = statusMap[tabId];
    if (!allowedStatuses || allowedStatuses.length === 0) return this.orders.length;
    return this.orders.filter((o: any) => allowedStatuses.includes(o.status)).length;
  },

  viewDetail(order: any) {
    this.selectedOrder = order;
    window.scrollTo({ top: 0 });
  },

  backToList() {
    this.selectedOrder = null;
    this.copiedNumber = false;
  },

  get dateFilterLabel() {
    if (this.dateFilter === 'custom') return t('orders.customDate');
    if (this.dateFilter === '7d') return t('orders.last7Days');
    if (this.dateFilter === '30d') return t('orders.last30Days');
    if (this.dateFilter === '90d') return t('orders.last90Days');
    return t('orders.orderDate');
  },

  get timeRangeLabel() {
    if (this.dateFilter === 'custom' && (this.dateFrom || this.dateTo)) {
      return `${this.dateFrom || '...'} / ${this.dateTo || '...'}`;
    }
    return t('orders.selectTime');
  },

  setDateFilter(val: string) {
    this.dateFilter = val;
    this.dateOpen = false;
    if (val !== 'custom') {
      this.dateFrom = '';
      this.dateTo = '';
    }
  },

  clearTimeRange() {
    this.dateFrom = '';
    this.dateTo = '';
    this.dateFilter = 'all';
    this.timeOpen = false;
  },

  applyTimeRange() {
    if (this.dateFrom || this.dateTo) {
      this.dateFilter = 'custom';
      this.timeOpen = false;
    }
  },

  copyOrderNumber() {
    if (!this.selectedOrder) return;
    navigator.clipboard.writeText((this.selectedOrder as any).orderNumber);
    this.copiedNumber = true;
    setTimeout(() => { this.copiedNumber = false; }, 2000);
  },

  // Modal states
  showOperationHistory: false,
  showPaymentHistory: false,
  showTrackPackage: false,
  showModifyShipping: false,
  showAddServices: false,
  showCancelOrder: false,
  paymentHistoryTab: 'records',
  cancelReason: '',

  openModal(name: string) {
    (this as any)[name] = true;
    document.body.style.overflow = 'hidden';
  },

  closeModal(name: string) {
    (this as any)[name] = false;
    document.body.style.overflow = '';
  },

  getStepIndex(order: any) {
    if (!order) return -1;
    if (order.status === 'Waiting for payment') return 0;
    if (order.status === 'Delivering') return 2;
    if (order.status === 'Completed') return 4;
    return 1;
  }
}));

Alpine.data('couponsPageComponent', () => ({
  activeTab: 'coupons-list' as string,
  activePill: 'available' as string,
  coupons: [] as CouponData[],
  creditBalance: 0,
  creditHistory: [] as CreditHistoryEntry[],

  init() {
    couponStore.load();
    this.coupons = couponStore.getCoupons();
    this.creditBalance = couponStore.getCreditBalance();
    this.creditHistory = couponStore.getCreditHistory();
    couponStore.subscribe(() => {
      this.coupons = couponStore.getCoupons();
      this.creditBalance = couponStore.getCreditBalance();
      this.creditHistory = couponStore.getCreditHistory();
    });
  },

  get filteredCoupons(): CouponData[] {
    const statusMap: Record<string, CouponData['status']> = {
      available: 'available',
      used: 'used',
      expired: 'expired',
    };
    const status = statusMap[this.activePill] ?? 'available';
    return this.coupons.filter((c: CouponData) => c.status === status);
  },

  switchTab(tab: string) {
    this.activeTab = tab;
  },

  setPill(pill: string) {
    this.activePill = pill;
  },

  formatDate(iso: string): string {
    if (!iso) return '-';
    const d = new Date(iso);
    const locale = getCurrentLang() === 'tr' ? 'tr-TR' : 'en-US';
    return d.toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric' });
  },

  couponTypeBadge(type: string): string {
    if (type === 'percent') return '%';
    if (type === 'fixed') return '$';
    return '🚚';
  },

  couponTypeLabel(type: string): string {
    if (type === 'percent') return t('coupons.percentDiscount');
    if (type === 'fixed') return t('coupons.fixedDiscount');
    return t('coupons.freeShipping');
  },

  couponBadgeClass(type: string): string {
    if (type === 'percent') return 'bg-(--color-info-50,#eff6ff) text-(--color-info-700,#1d4ed8)';
    if (type === 'fixed') return 'bg-(--color-success-50,#f0fdf4) text-(--color-success-700,#15803d)';
    return 'bg-(--color-warning-50,#fffbeb) text-(--color-warning-700,#b45309)';
  },

  creditTypeLabel(type: string): string {
    if (type === 'earned') return t('coupons.earned');
    if (type === 'spent') return t('coupons.spent');
    return t('coupons.refund');
  },

  creditBadgeClass(type: string): string {
    if (type === 'earned') return 'bg-(--color-success-50,#f0fdf4) text-(--color-success-700,#15803d)';
    if (type === 'spent') return 'bg-(--color-error-50,#fef2f2) text-(--color-error-700,#b91c1c)';
    return 'bg-(--color-info-50,#eff6ff) text-(--color-info-700,#1d4ed8)';
  },

  creditAmountClass(type: string): string {
    if (type === 'earned' || type === 'refund') return 'text-(--color-success-500,#22c55e)';
    return 'text-(--color-error-500,#ef4444)';
  },
}));

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
    return this.ratingFilter === 'all' ? t('reviews.rating') : t('reviews.stars', { count: this.ratingFilter });
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
          ${t('reviews.noReviews')}
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
          image?.alt ?? `Product view ${index + 1}`,
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
        image?.alt ?? `Product view ${index + 1}`,
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

    // Close when mega menu opens (listens to custom event)
    document.addEventListener('istoc:close-search', () => {
      this.close();
      const input = (this.$refs as Record<string, HTMLInputElement>).searchInput;
      if (input && document.activeElement === input) {
        input.blur();
      }
    });
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
  },

  syncDropdownOffset() {
    // Top position is now handled purely via Tailwind CSS classes (e.g. top-[115px])
    // to allow smooth CSS transitions without JS height recalculation interference.
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

  handleCheckoutSupplier(event: CustomEvent) {
    const supplierId = event.detail?.supplierId as string | undefined;
    if (!supplierId) return;

    // First, uncheck all selected skus globally
    cartStore.toggleAll(false);

    // Then, select only the specific supplier
    cartStore.toggleSupplierSelection(supplierId, true);

    // Finally, redirect to checkout
    window.location.href = `${getBaseUrl()}pages/order/checkout.html`;
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
        checkoutBtn.setAttribute('href', '/pages/order/checkout.html');
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
        checkoutWarning.textContent = t('cart.moqWarning');
        checkoutWarning.classList.remove('hidden');
      } else if (summary.selectedCount === 0) {
        checkoutWarning.textContent = t('cart.selectAtLeastOne');
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
        banner.innerHTML = t('cart.youSaved', { amount: `<strong>$${summary.discount.toFixed(2).replace('.', ',')}</strong>` });
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

      const totalEl = container.querySelector<HTMLElement>('.sc-c-supplier-total-text');
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
        <h2 class="text-2xl font-bold text-text-heading mb-2">${t('cart.empty')}</h2>
        <p class="text-base text-text-secondary mb-8 max-w-md">${t('cart.emptyDesc')}</p>
        <a href="/pages/products.html" class="inline-flex items-center justify-center th-btn-dark th-btn-pill no-underline">
          ${t('cart.continueShopping')}
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
        btn.title = t('orders.copied');
        setTimeout(() => { btn.title = t('orders.copy'); }, 2000);
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
      this.error = t('auth.register.emailError');
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
      this.error = t('settings.passwordMinLength');
      return;
    }
    if (newPw !== confirmPw) {
      this.error = t('settings.passwordsMismatch');
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
      this.phoneError = t('settings.invalidPhone');
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
      this.verifyError = t('settings.invalidVerifyCode');
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
      this.error1 = t('settings.selectReason');
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
      this.error2 = t('settings.invalidVerifyCode');
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
    alert(t('auth.forgot.passwordUpdated'));
    window.location.href = `${baseUrl}pages/auth/login.html`;
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

  // Coupon state
  couponCode: '',
  couponError: '',
  couponApplied: null as { code: string; type: string; value: number; description: string } | null,
  couponDiscount: 0,

  init() {
    window.addEventListener('checkout:shipping-updated', (event: Event) => {
      const detail = (event as CustomEvent<{ shippingFee?: number }>).detail;
      const nextShippingFee = detail?.shippingFee;
      if (typeof nextShippingFee === 'number' && Number.isFinite(nextShippingFee)) {
        this.shippingFee = Number(nextShippingFee.toFixed(2));
        this.recalcCouponDiscount();
      }
    });
  },

  applyCoupon() {
    const code = this.couponCode.trim().toUpperCase();
    if (!code) { this.couponError = 'Please enter a coupon code'; return; }

    const coupons = (window as unknown as Record<string, unknown>).__mockCoupons as Array<{ code: string; type: string; value: number; minOrder: number; description: string }> | undefined;
    const coupon = coupons?.find(c => c.code === code);
    if (!coupon) { this.couponError = 'Invalid coupon code'; return; }

    const subtotalBeforeCoupon = this.itemSubtotal + this.shippingFee - this.discount;
    if (coupon.minOrder > 0 && subtotalBeforeCoupon < coupon.minOrder) {
      this.couponError = `Minimum order amount: ${this.currency} ${coupon.minOrder.toFixed(2)}`;
      return;
    }

    this.couponApplied = { code: coupon.code, type: coupon.type, value: coupon.value, description: coupon.description };
    this.couponError = '';
    this.recalcCouponDiscount();

    window.dispatchEvent(new CustomEvent('checkout:coupon-updated', {
      detail: { coupon: this.couponApplied, couponDiscount: this.couponDiscount },
    }));
  },

  removeCoupon() {
    this.couponApplied = null;
    this.couponDiscount = 0;
    this.couponCode = '';
    this.couponError = '';

    window.dispatchEvent(new CustomEvent('checkout:coupon-updated', {
      detail: { coupon: null, couponDiscount: 0 },
    }));
  },

  recalcCouponDiscount() {
    if (!this.couponApplied) { this.couponDiscount = 0; return; }
    const subtotalBeforeCoupon = this.itemSubtotal + this.shippingFee - this.discount;
    if (this.couponApplied.type === 'percent') {
      this.couponDiscount = Number((subtotalBeforeCoupon * this.couponApplied.value / 100).toFixed(2));
    } else if (this.couponApplied.type === 'fixed') {
      this.couponDiscount = Math.min(this.couponApplied.value, subtotalBeforeCoupon);
    } else if (this.couponApplied.type === 'shipping') {
      this.couponDiscount = this.shippingFee;
    }
  },

  get total(): number {
    return Number((this.itemSubtotal + this.shippingFee - this.discount - this.couponDiscount).toFixed(2));
  },

  formatMoney(value: number): string {
    return `${this.currency} ${value.toFixed(2)}`;
  },
}));

// ── Checkout Review Modal ──

Alpine.data('checkoutReviewModal', () => ({
  open: false,
  shippingAddress: '',
  paymentMethod: '',
  orders: [] as Array<{ orderId: string; orderLabel: string; sellerName: string; products: Array<{ id: string; title: string; image: string; skuLines: Array<{ id: string; variantText: string; unitPrice: number; quantity: number }> }> }>,
  summary: { itemSubtotal: '0.00', shippingFee: '0.00', couponDiscount: '0.00', total: '0.00' },

  init() {
    window.addEventListener('checkout:open-review', ((event: CustomEvent) => {
      const d = event.detail;
      this.shippingAddress = d.shippingAddress || '';
      this.paymentMethod = d.paymentMethod || '';
      this.orders = d.orders || [];
      this.summary = d.summary || this.summary;
      this.open = true;
      document.body.style.overflow = 'hidden';
    }) as EventListener);
  },

  confirmOrder() {
    this.open = false;
    document.body.style.overflow = '';
    window.dispatchEvent(new CustomEvent('checkout:confirm-order'));
  },

  // Clean up on close
  '$watch': {
    open(val: boolean) {
      if (!val) document.body.style.overflow = '';
    },
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
  activeTabId: getOrderTabs()[0].id,
  selectedFilterId: getOrderFilters()[0].id as string | null,
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

  get categories() {
    return [
      { id: 'all', label: t('messages.allMessages'), icon: 'chat' },
      { id: 'unread', label: t('messages.unread'), icon: 'eye' },
    ];
  },

  conversations: [] as any[],

  _buildConversations() {
    return [
      {
        id: 'conv-001',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
        name: 'Robert Song',
        company: 'Ningbo Happiness Statio...',
        preview: t('messages.previewRfqReply'),
        date: '2026-2-19',
        unreadCount: 2,
        messages: [
          { id: 'm1', sender: 'Robert Song', text: t('messages.conv1m1'), time: '09:15', isMe: false },
          { id: 'm2', sender: t('messages.me'), text: t('messages.conv1m2'), time: '09:30', isMe: true },
          { id: 'm3', sender: 'Robert Song', text: t('messages.conv1m3'), time: '10:05', isMe: false },
          { id: 'm4', sender: t('messages.me'), text: t('messages.conv1m4'), time: '10:20', isMe: true },
          { id: 'm5', sender: 'Robert Song', text: t('messages.conv1m5'), time: '11:00', isMe: false },
        ],
      },
      {
        id: 'conv-002',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
        name: 'Leo',
        company: 'Dg Excelpro Rubber Co., L...',
        preview: t('messages.previewRfqReply'),
        date: '2026-2-19',
        unreadCount: 2,
        messages: [
          { id: 'm1', sender: 'Leo', text: t('messages.conv2m1'), time: '14:00', isMe: false },
          { id: 'm2', sender: t('messages.me'), text: t('messages.conv2m2'), time: '14:15', isMe: true },
          { id: 'm3', sender: 'Leo', text: t('messages.conv2m3'), time: '14:45', isMe: false },
        ],
      },
      {
        id: 'conv-003',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
        name: 'Yue Luo',
        company: 'Sichuan Wang Zhihao Tra...',
        preview: t('messages.previewRfqReply'),
        date: '2026-2-19',
        unreadCount: 2,
        messages: [
          { id: 'm1', sender: 'Yue Luo', text: t('messages.conv3m1'), time: '16:00', isMe: false },
          { id: 'm2', sender: t('messages.me'), text: t('messages.conv3m2'), time: '16:10', isMe: true },
        ],
      },
      {
        id: 'conv-004',
        avatar: '',
        name: 'TradeHub.com',
        company: '',
        preview: t('messages.previewWelcome'),
        date: '2026-2-19',
        unreadCount: 1,
        messages: [
          { id: 'm1', sender: 'TradeHub.com', text: t('messages.conv4m1'), time: '08:00', isMe: false },
        ],
      },
    ];
  },

  init() {
    this.conversations = this._buildConversations();
    window.addEventListener('languageChanged', () => {
      this.conversations = this._buildConversations();
      this.selectedConversation = null;
    });
  },

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
      sender: 'Me',
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

Alpine.data('helpCenter', () => ({
  searchQuery: '',
  searchActive: false,
  searchResults: [] as string[],
  activeTab: 'account',
  activeLearningCard: '' as string,

  get popularSearches() {
    return [t('helpCenter.search1'), t('helpCenter.search2'), t('helpCenter.search3'), t('helpCenter.search4')];
  },

  get learningCards() {
    return [
      {
        id: 'sourcing',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-9 h-9" viewBox="0 0 64 64" fill="none">
        <circle cx="26" cy="26" r="18" stroke="#FF8C00" stroke-width="4" fill="#FFF3E0"/>
        <path d="M39 39 L54 54" stroke="#FF8C00" stroke-width="5" stroke-linecap="round"/>
        <path d="M20 26 L26 32 L34 22" stroke="#FF8C00" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
        title: t('helpCenter.sourcing'),
        subtitle: t('helpCenter.sourcingDesc'),
      },
      {
        id: 'assurance',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-9 h-9" viewBox="0 0 64 64" fill="none">
        <path d="M32 6L10 16v16c0 12 9.8 22.4 22 25 12.2-2.6 22-13 22-25V16L32 6z" fill="#FFF3E0" stroke="#FF8C00" stroke-width="4"/>
        <circle cx="32" cy="30" r="8" fill="#FF8C00" opacity="0.3"/>
        <path d="M26 30l4 4 8-8" stroke="#FF8C00" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M28 18h8M28 42h8" stroke="#FF8C00" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
      </svg>`,
        title: t('helpCenter.tradeAssurance'),
        subtitle: t('helpCenter.tradeAssuranceDesc'),
      },
      {
        id: 'app',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-9 h-9" viewBox="0 0 64 64" fill="none">
        <rect x="18" y="6" width="28" height="52" rx="5" fill="#FFF3E0" stroke="#FF8C00" stroke-width="4"/>
        <rect x="24" y="14" width="16" height="10" rx="2" fill="#FF8C00" opacity="0.3"/>
        <circle cx="32" cy="50" r="3" fill="#FF8C00"/>
        <path d="M26 30h12M26 38h8" stroke="#FF8C00" stroke-width="2.5" stroke-linecap="round"/>
      </svg>`,
        title: t('helpCenter.downloadApp'),
        subtitle: t('helpCenter.downloadAppDesc'),
      },
      {
        id: 'logistics',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-9 h-9" viewBox="0 0 64 64" fill="none">
        <rect x="6" y="20" width="36" height="26" rx="3" fill="#FFF3E0" stroke="#FF8C00" stroke-width="3.5"/>
        <path d="M42 30h10l6 10v10H42V30z" fill="#FFF3E0" stroke="#FF8C00" stroke-width="3.5"/>
        <circle cx="16" cy="50" r="5" fill="#FF8C00"/>
        <circle cx="48" cy="50" r="5" fill="#FF8C00"/>
        <path d="M10 20V14a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v6" stroke="#FF8C00" stroke-width="3" stroke-linecap="round"/>
      </svg>`,
        title: t('helpCenter.logistics'),
        subtitle: t('helpCenter.logisticsDesc'),
      },
    ];
  },

  get tabs() {
    return [
      {
        id: 'account',
        label: t('helpCenter.tabAccount'),
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/></svg>`,
        questions: [
          t('helpCenter.q_account_1'),
          t('helpCenter.q_account_2'),
          t('helpCenter.q_account_3'),
          t('helpCenter.q_account_4'),
          t('helpCenter.q_account_5'),
          t('helpCenter.q_account_6'),
          t('helpCenter.q_account_7'),
          t('helpCenter.q_account_8'),
          t('helpCenter.q_account_9'),
        ],
      },
      {
        id: 'sourcing',
        label: t('helpCenter.tabSourcing'),
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35m1.6-5.15a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z"/></svg>`,
        questions: [
          t('helpCenter.q_sourcing_1'),
          t('helpCenter.q_sourcing_2'),
          t('helpCenter.q_sourcing_3'),
          t('helpCenter.q_sourcing_4'),
          t('helpCenter.q_sourcing_5'),
          t('helpCenter.q_sourcing_6'),
          t('helpCenter.q_sourcing_7'),
          t('helpCenter.q_sourcing_8'),
          t('helpCenter.q_sourcing_9'),
        ],
      },
      {
        id: 'negotiation',
        label: t('helpCenter.tabNegotiation'),
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/></svg>`,
        questions: [
          t('helpCenter.q_negotiation_1'),
          t('helpCenter.q_negotiation_2'),
          t('helpCenter.q_negotiation_3'),
          t('helpCenter.q_negotiation_4'),
          t('helpCenter.q_negotiation_5'),
          t('helpCenter.q_negotiation_6'),
        ],
      },
      {
        id: 'payment',
        label: t('helpCenter.tabPayment'),
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"/></svg>`,
        questions: [
          t('helpCenter.q_payment_1'),
          t('helpCenter.q_payment_2'),
          t('helpCenter.q_payment_3'),
          t('helpCenter.q_payment_4'),
          t('helpCenter.q_payment_5'),
          t('helpCenter.q_payment_6'),
          t('helpCenter.q_payment_7'),
          t('helpCenter.q_payment_8'),
          t('helpCenter.q_payment_9'),
        ],
      },
      {
        id: 'after-sales',
        label: t('helpCenter.tabAfterSales'),
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg>`,
        questions: [
          t('helpCenter.q_aftersales_1'),
          t('helpCenter.q_aftersales_2'),
          t('helpCenter.q_aftersales_3'),
          t('helpCenter.q_aftersales_4'),
          t('helpCenter.q_aftersales_5'),
          t('helpCenter.q_aftersales_6'),
        ],
      },
      {
        id: 'self-service',
        label: t('helpCenter.tabSelfService'),
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"/></svg>`,
        questions: [
          t('helpCenter.q_selfservice_1'),
          t('helpCenter.q_selfservice_2'),
          t('helpCenter.q_selfservice_3'),
          t('helpCenter.q_selfservice_4'),
          t('helpCenter.q_selfservice_5'),
          t('helpCenter.q_selfservice_6'),
        ],
      },
    ];
  },

  init() {
    // Initialize with first learning card active
    this.activeLearningCard = 'sourcing';
  },

  doSearch() {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return;
    this.searchActive = true;

    // Flat-map all questions from all tabs and filter
    const allQuestions = this.tabs.flatMap((t: any) => t.questions);
    this.searchResults = allQuestions.filter((question: string) =>
      question.toLowerCase().includes(q)
    );
  },

  clearSearch() {
    this.searchQuery = '';
    this.searchActive = false;
    this.searchResults = [];
  },

  selectLearningCard(card: any) {
    this.activeLearningCard = card.id;
    // Scroll to matching tab if it exists
    const matchTab = this.tabs.find((t: any) => t.id === card.id);
    if (matchTab) this.activeTab = card.id;
  },
}));


Alpine.data('faqPage', () => ({
  searchQuery: '',
  activeCategory: 'all',

  get categories() {
    return [
      { id: 'all', label: t('faq.allCategories') },
      { id: 'intro', label: t('faq.intro') },
      { id: 'account', label: t('faq.account') },
      { id: 'sourcing', label: t('faq.sourcing') },
      { id: 'negotiation', label: t('faq.negotiation') },
      { id: 'place-order', label: t('faq.placeOrder') },
      { id: 'payment', label: t('faq.payment') },
      { id: 'tax', label: t('faq.tax') },
      { id: 'shipping', label: t('faq.shipping') },
      { id: 'receipt', label: t('faq.receipt') },
      { id: 'inspection', label: t('faq.inspection') },
      { id: 'after-sales', label: t('faq.afterSales') },
      { id: 'feedback', label: t('faq.feedback') },
      { id: 'security', label: t('faq.security') },
      { id: 'others', label: t('faq.others') },
      { id: 'promotions', label: t('faq.promotions') },
      { id: 'guaranteed', label: t('faq.guaranteed') },
      { id: 'app-settings', label: t('faq.appSettings') },
      { id: 'localization', label: t('faq.localization') },
    ];
  },

  get allCategoryCards() {
    return [
      {
        id: 'intro', label: t('faq.intro'),
        subs: [
          { label: t('faq.introDesc') },
          { label: t('faq.introMembership'), highlight: true },
        ],
      },
      {
        id: 'account', label: t('faq.account'),
        subs: [
          { label: t('faq.accountSettings') },
          { label: t('faq.accountCancelReactivate') },
          { label: t('faq.accountLogin'), highlight: true },
          { label: t('faq.accountRegister') },
          { label: t('faq.accountBecomeSeller') },
        ],
      },
      {
        id: 'sourcing', label: t('faq.sourcing'),
        subs: [
          { label: t('faq.sourcingSearch') },
          { label: t('faq.sourcingSupplierEval') },
          { label: t('faq.sourcingTradeInfo'), highlight: true },
          { label: t('faq.sourcingRecommender'), highlight: true },
          { label: t('faq.sourcingAiApp') },
          { label: t('faq.sourcingSourcing') },
        ],
      },
      {
        id: 'negotiation', label: t('faq.negotiation'),
        subs: [
          { label: t('faq.negotiationRfq') },
          { label: t('faq.negotiationMessages') },
          { label: t('faq.negotiationOtherIssues'), highlight: true },
        ],
      },
      {
        id: 'place-order', label: t('faq.placeOrder'),
        subs: [
          { label: t('faq.placeOrderTradeAssurance') },
          { label: t('faq.placeOrderPlace') },
          { label: t('faq.placeOrderConfirm') },
          { label: t('faq.placeOrderManage') },
        ],
      },
      {
        id: 'payment', label: t('faq.payment'),
        subs: [
          { label: t('faq.paymentOrderPayment'), highlight: true },
          { label: t('faq.paymentReceipt') },
          { label: t('faq.paymentFinancial') },
          { label: t('faq.paymentPayment') },
          { label: t('faq.paymentTypes') },
        ],
      },
      {
        id: 'tax', label: t('faq.tax'),
        subs: [
          { label: t('faq.taxSubmitInfo') },
          { label: t('faq.taxTypes') },
          { label: t('faq.taxInvoice') },
          { label: t('faq.taxVerifyInfo') },
          { label: t('faq.taxOrderManage') },
          { label: t('faq.taxRefund'), highlight: true },
        ],
      },
      {
        id: 'shipping', label: t('faq.shipping'),
        subs: [
          { label: t('faq.shippingShipping') },
          { label: t('faq.shippingLogistics'), highlight: true },
          { label: t('faq.shippingMaersk') },
          { label: t('faq.shippingImportFees') },
        ],
      },
      {
        id: 'receipt', label: t('faq.receipt'),
        subs: [
          { label: t('faq.receiptDelivery') },
          { label: t('faq.receiptCompletion') },
        ],
      },
      {
        id: 'inspection', label: t('faq.inspection'),
        subs: [
          { label: t('faq.inspectionServices'), highlight: true },
          { label: t('faq.inspectionMonitoring') },
        ],
      },
      {
        id: 'after-sales', label: t('faq.afterSales'),
        subs: [
          { label: t('faq.afterSalesDispute') },
          { label: t('faq.afterSalesReturn'), highlight: true },
          { label: t('faq.afterSalesDisputeProcess') },
          { label: t('faq.afterSalesGoodsIssue') },
          { label: t('faq.afterSalesDisputeRules') },
          { label: t('faq.afterSalesRefund') },
        ],
      },
      {
        id: 'feedback', label: t('faq.feedback'),
        subs: [
          { label: t('faq.feedbackManagement'), highlight: true },
          { label: t('faq.feedbackRules') },
        ],
      },
      {
        id: 'security', label: t('faq.security'),
        subs: [
          { label: t('faq.securityFraud') },
          { label: t('faq.securityIpr') },
        ],
      },
      {
        id: 'others', label: t('faq.others'),
        subs: [
          { label: t('faq.othersCustomerService') },
          { label: t('faq.othersUnclearConcern') },
          { label: t('faq.othersOfflineService') },
        ],
      },
      {
        id: 'promotions', label: t('faq.promotions'),
        subs: [
          { label: t('faq.promotionsShoppingGuide') },
          { label: t('faq.promotionsScenario'), highlight: true },
          { label: t('faq.promotionsSuper'), highlight: true },
          { label: t('faq.promotionsPayment') },
          { label: t('faq.promotionsOtherIssues') },
        ],
      },
      {
        id: 'guaranteed', label: t('faq.guaranteed'),
        subs: [
          { label: t('faq.guaranteedShipping'), highlight: true },
          { label: t('faq.guaranteedAfterSales') },
          { label: t('faq.guaranteedPreSales'), highlight: true },
          { label: t('faq.guaranteedPlaceOrder') },
          { label: t('faq.guaranteedOverseasWarehouse') },
        ],
      },
      {
        id: 'app-settings', label: t('faq.appSettings'),
        subs: [
          { label: t('faq.appSettingsLabel') },
        ],
      },
      {
        id: 'localization', label: t('faq.localization'),
        subs: [
          { label: t('faq.localizationSettings'), highlight: true },
        ],
      },
    ];
  },

  get activeCategoryLabel(): string {
    const cat = (this.categories as any[]).find((c: any) => c.id === this.activeCategory);
    return cat ? cat.label : t('faq.allCategories');
  },

  get visibleCategories(): any[] {
    const q = this.searchQuery.trim().toLowerCase();
    let cards = this.allCategoryCards as any[];

    // Filter by sidebar selection
    if (this.activeCategory !== 'all') {
      cards = cards.filter((c: any) => c.id === this.activeCategory);
    }

    // Filter by search query
    if (q) {
      cards = cards.filter((c: any) =>
        c.label.toLowerCase().includes(q) ||
        c.subs.some((s: any) => s.label.toLowerCase().includes(q))
      );
    }

    return cards;
  },

  init() { },

  selectCategory(id: string) {
    this.activeCategory = id;
    this.searchQuery = '';
  },

  doSearch() {
    if (this.searchQuery.trim()) {
      this.activeCategory = 'all';
    }
  },
}));


// ─── Legal TOC scrollspy ───────────────────────────────────────────────
Alpine.data('legalToc', () => ({
  activeSection: '',
  tocOpen: false,
  _observer: null as IntersectionObserver | null,

  init() {
    this.$nextTick(() => {
      const sections = document.querySelectorAll('section[id]');
      this._observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.activeSection = entry.target.id;
            }
          }
        },
        { rootMargin: '-80px 0px -60% 0px' }
      );
      sections.forEach((s) => this._observer!.observe(s));
      // Set initial from hash
      if (window.location.hash) {
        this.activeSection = window.location.hash.slice(1);
      } else if (sections.length) {
        this.activeSection = sections[0].id;
      }
    });
  },

  destroy() {
    this._observer?.disconnect();
  },

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', `#${id}`);
    }
  },

  printPage() {
    window.print();
  },
}));

// ─── Cookie Consent ────────────────────────────────────────────────────
Alpine.data('cookieConsent', () => ({
  categories: {
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  },

  init() {
    this.loadPreferences();
  },

  toggleCategory(cat: string) {
    if (cat === 'necessary') return;
    (this.categories as any)[cat] = !(this.categories as any)[cat];
  },

  savePreferences() {
    localStorage.setItem('istoc_cookie_prefs', JSON.stringify(this.categories));
    // Show brief confirmation
    const el = document.getElementById('cookie-save-toast');
    if (el) {
      el.classList.remove('hidden');
      setTimeout(() => el.classList.add('hidden'), 2000);
    }
  },

  loadPreferences() {
    const saved = localStorage.getItem('istoc_cookie_prefs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.categories = { ...this.categories, ...parsed, necessary: true };
      } catch { /* ignore */ }
    }
  },
}));

// ─── Contact Page ──────────────────────────────────────────────────────
Alpine.data('contactPage', () => ({
  name: '',
  email: '',
  subject: '',
  message: '',
  attachment: null as File | null,
  formSubmitting: false,
  formSubmitted: false,
  errors: {} as Record<string, string>,

  get subjectOptions() {
    return [
      t('contactForm.subjectOrder'),
      t('contactForm.subjectPayment'),
      t('contactForm.subjectShipping'),
      t('contactForm.subjectAccount'),
      t('contactForm.subjectProductQuality'),
      t('contactForm.subjectOther'),
    ];
  },

  validateForm(): boolean {
    this.errors = {};
    if (!this.name.trim()) this.errors.name = t('contactForm.nameRequired');
    if (!this.email.trim()) this.errors.email = t('contactForm.emailRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) this.errors.email = t('contactForm.emailInvalid');
    if (!this.subject) this.errors.subject = t('contactForm.subjectRequired');
    if (!this.message.trim()) this.errors.message = t('contactForm.messageRequired');
    return Object.keys(this.errors).length === 0;
  },

  submitForm() {
    if (!this.validateForm()) return;
    this.formSubmitting = true;
    setTimeout(() => {
      this.formSubmitting = false;
      this.formSubmitted = true;
    }, 1500);
  },

  resetForm() {
    this.name = '';
    this.email = '';
    this.subject = '';
    this.message = '';
    this.attachment = null;
    this.formSubmitted = false;
    this.errors = {};
  },
}));

// ─── Ticket Form (multi-step) ─────────────────────────────────────────
Alpine.data('ticketForm', () => ({
  currentStep: 1,
  category: '',
  subCategory: '',
  subject: '',
  description: '',
  priority: 'normal',
  orderRef: '',
  files: [] as { name: string; size: number }[],
  errors: {} as Record<string, string>,
  submitted: false,

  get categories() {
    return [
      { id: 'siparis', label: t('ticketForm.catOrder'), subs: t('ticketForm.catOrderSubs', { returnObjects: true }) as unknown as string[] },
      { id: 'odeme', label: t('ticketForm.catPayment'), subs: t('ticketForm.catPaymentSubs', { returnObjects: true }) as unknown as string[] },
      { id: 'kargo', label: t('ticketForm.catShipping'), subs: t('ticketForm.catShippingSubs', { returnObjects: true }) as unknown as string[] },
      { id: 'hesap', label: t('ticketForm.catAccount'), subs: t('ticketForm.catAccountSubs', { returnObjects: true }) as unknown as string[] },
      { id: 'urun', label: t('ticketForm.catProductQuality'), subs: t('ticketForm.catProductQualitySubs', { returnObjects: true }) as unknown as string[] },
      { id: 'diger', label: t('ticketForm.catOther'), subs: t('ticketForm.catOtherSubs', { returnObjects: true }) as unknown as string[] },
    ];
  },

  get subCategories(): string[] {
    const cat = this.categories.find((c: any) => c.id === this.category);
    return cat ? cat.subs : [];
  },

  get charCount(): number {
    return this.description.length;
  },

  addFiles(fileList: FileList) {
    const maxFiles = 5;
    const maxSize = 10 * 1024 * 1024;
    for (let i = 0; i < fileList.length && this.files.length < maxFiles; i++) {
      const f = fileList[i];
      if (f.size <= maxSize) {
        this.files.push({ name: f.name, size: f.size });
      }
    }
  },

  removeFile(index: number) {
    this.files.splice(index, 1);
  },

  validateStep(step: number): boolean {
    this.errors = {};
    if (step === 1) {
      if (!this.category) this.errors.category = t('ticketForm.categoryRequired');
      if (!this.subject.trim()) this.errors.subject = t('ticketForm.subjectRequired');
    } else if (step === 2) {
      if (!this.description.trim()) this.errors.description = t('ticketForm.descriptionRequired');
      if (this.description.length < 20) this.errors.description = t('ticketForm.descriptionMinLength');
    }
    return Object.keys(this.errors).length === 0;
  },

  nextStep() {
    if (this.validateStep(this.currentStep)) {
      this.currentStep++;
    }
  },

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  },

  submitTicket() {
    if (!this.validateStep(this.currentStep)) return;
    this.submitted = true;
    setTimeout(() => {
      window.location.href = `${getBaseUrl()}pages/help/help-tickets.html`;
    }, 2000);
  },
}));

// ─── Tickets List ──────────────────────────────────────────────────────
Alpine.data('ticketsList', () => ({
  activeTab: 'all' as 'all' | 'open' | 'pending' | 'closed',
  searchQuery: '',
  currentPage: 1,
  pageSize: 10,
  expandedTicket: null as string | null,

  get tickets(): any[] {
    // Import mock tickets inline to avoid circular deps at module level
    return (window as any).__mockTickets || [];
  },

  get filteredTickets(): any[] {
    return this.tickets.filter((t: any) => {
      const matchTab = this.activeTab === 'all' || t.status === this.activeTab;
      const q = this.searchQuery.toLowerCase().trim();
      const matchSearch = !q || t.id.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q);
      return matchTab && matchSearch;
    });
  },

  get paginatedTickets(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredTickets.slice(start, start + this.pageSize);
  },

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredTickets.length / this.pageSize));
  },

  tabCount(status: string): number {
    if (status === 'all') return this.tickets.length;
    return this.tickets.filter((t: any) => t.status === status).length;
  },

  setTab(tab: string) {
    this.activeTab = tab as any;
    this.currentPage = 1;
  },

  setPage(page: number) {
    this.currentPage = page;
  },

  toggleTicket(id: string) {
    this.expandedTicket = this.expandedTicket === id ? null : id;
  },
}));

// ─── About Page (counter animation) ───────────────────────────────────
Alpine.data('aboutPage', () => ({
  counters: { users: 0, sellers: 0, countries: 0, categories: 0 },
  targets: { users: 250000, sellers: 12000, countries: 45, categories: 180 },
  animated: false,

  animateCounters() {
    if (this.animated) return;
    this.animated = true;
    const duration = 2000;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      this.counters = {
        users: Math.round(this.targets.users * ease),
        sellers: Math.round(this.targets.sellers * ease),
        countries: Math.round(this.targets.countries * ease),
        categories: Math.round(this.targets.categories * ease),
      };
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  },
}));

// ─── Sell Page (registration form) ────────────────────────────────────
Alpine.data('sellPage', () => ({
  currentStep: 1,
  formData: {
    companyName: '',
    businessType: '',
    taxNumber: '',
    contactName: '',
    email: '',
    phone: '',
    mainCategories: [] as string[],
    productCount: '',
    termsAccepted: false,
  },
  formErrors: {} as Record<string, string>,
  submitted: false,

  get businessTypes() { return t('sellerForm.businessTypes', { returnObjects: true }) as unknown as string[]; },
  get categoryOptions() { return t('sellerForm.categoryOptions', { returnObjects: true }) as unknown as string[]; },

  validateStep(step: number): boolean {
    this.formErrors = {};
    if (step === 1) {
      if (!this.formData.companyName.trim()) this.formErrors.companyName = t('sellerForm.companyNameRequired');
      if (!this.formData.businessType) this.formErrors.businessType = t('sellerForm.businessTypeRequired');
      if (!this.formData.taxNumber.trim()) this.formErrors.taxNumber = t('sellerForm.taxNumberRequired');
    } else if (step === 2) {
      if (!this.formData.contactName.trim()) this.formErrors.contactName = t('sellerForm.contactNameRequired');
      if (!this.formData.email.trim()) this.formErrors.email = t('sellerForm.emailRequired');
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email)) this.formErrors.email = t('sellerForm.emailInvalid');
      if (!this.formData.phone.trim()) this.formErrors.phone = t('sellerForm.phoneRequired');
    } else if (step === 3) {
      if (this.formData.mainCategories.length === 0) this.formErrors.mainCategories = t('sellerForm.categoryMinOne');
    } else if (step === 4) {
      if (!this.formData.termsAccepted) this.formErrors.termsAccepted = t('sellerForm.termsRequired');
    }
    return Object.keys(this.formErrors).length === 0;
  },

  nextStep() {
    if (this.validateStep(this.currentStep)) this.currentStep++;
  },

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  },

  toggleCategory(cat: string) {
    const idx = this.formData.mainCategories.indexOf(cat);
    if (idx === -1) this.formData.mainCategories.push(cat);
    else this.formData.mainCategories.splice(idx, 1);
  },

  submitForm() {
    if (!this.validateStep(4)) return;
    this.submitted = true;
  },
}));

// ─── Sell Pricing ──────────────────────────────────────────────────────
Alpine.data('sellPricing', () => ({
  billingPeriod: 'monthly' as 'monthly' | 'yearly',
  faqOpen: [false, false, false, false, false] as boolean[],
  get faqItems() {
    return [
      { question: t('pricingFaq.q1'), answer: t('pricingFaq.a1'), open: this.faqOpen[0] },
      { question: t('pricingFaq.q2'), answer: t('pricingFaq.a2'), open: this.faqOpen[1] },
      { question: t('pricingFaq.q3'), answer: t('pricingFaq.a3'), open: this.faqOpen[2] },
      { question: t('pricingFaq.q4'), answer: t('pricingFaq.a4'), open: this.faqOpen[3] },
      { question: t('pricingFaq.q5'), answer: t('pricingFaq.a5'), open: this.faqOpen[4] },
    ];
  },
  selectedPlan: '',

  toggleFaq(index: number) {
    this.faqOpen[index] = !this.faqOpen[index];
  },

  selectPlan(name: string) {
    this.selectedPlan = name;
    window.location.href = `${getBaseUrl()}pages/seller/sell.html`;
  },
}));


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
  initLinkRewriter();
  Alpine.start();
}
