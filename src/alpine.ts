import Alpine from 'alpinejs'
import {
  filterAndSortReviews,
  renderReviewCard,
  bindHelpfulButtons,
  SORT_LABELS,
} from './components/product/ProductReviews';
import type { ReviewFilterState, SortMode } from './components/product/ProductReviews';

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
