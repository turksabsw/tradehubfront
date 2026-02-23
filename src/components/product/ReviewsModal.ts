/**
 * ReviewsModal Component
 * Full-screen overlay modal showing all store reviews with filters,
 * mention tags, language toggle, and scrollable review cards.
 * Opened by the "Tümünü Göster" button in the Store Reviews panel.
 */

import { mockProduct } from '../../data/mockProduct';
import {
  renderReviewCard,
  renderStars,
  filterAndSortReviews,
  bindHelpfulButtons,
  SORT_LABELS,
} from './ProductReviews';
import type { ReviewFilterState, SortMode } from './ProductReviews';

/* ── Modal HTML ──────────────────────────────────────── */

export function ReviewsModal(): string {
  const p = mockProduct;
  const photoReviewCount = p.reviews.filter(r => r.images && r.images.length > 0).length;

  return `
    <div id="rv-reviews-modal" class="rv-modal-overlay rv-modal-hidden">
      <div class="rv-modal">
        <!-- Fixed Header -->
        <div class="rv-modal-header">
          <span class="rv-modal-title">Mağaza Yorumları (${p.storeReviewCount})</span>
          <button type="button" class="rv-modal-close" id="rv-modal-close">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Scrollable Body -->
        <div class="rv-modal-body">
          <!-- Filter Row -->
          <div class="rv-filter-row">
            <button type="button" class="rv-filter-pill active" data-rv-modal-filter="all">Tümü</button>
            <button type="button" class="rv-filter-pill" data-rv-modal-filter="photo">Fotoğraflı/Videolu (${photoReviewCount})</button>

            <!-- Rating Dropdown -->
            <div class="rv-rating-dropdown" id="rv-modal-rating-dropdown">
              <button type="button" class="rv-rating-dropdown-trigger">
                Puan
                <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
              </button>
              <div class="rv-rating-dropdown-panel">
                <button type="button" class="rv-rating-dropdown-item active" data-rv-modal-rating="all">Tüm Puanlar</button>
                <button type="button" class="rv-rating-dropdown-item" data-rv-modal-rating="5">${renderStars(5, true)} 5 Yıldız</button>
                <button type="button" class="rv-rating-dropdown-item" data-rv-modal-rating="4">${renderStars(4, true)} 4 Yıldız</button>
                <button type="button" class="rv-rating-dropdown-item" data-rv-modal-rating="3">${renderStars(3, true)} 3 Yıldız</button>
                <button type="button" class="rv-rating-dropdown-item" data-rv-modal-rating="2">${renderStars(2, true)} 2 Yıldız</button>
                <button type="button" class="rv-rating-dropdown-item" data-rv-modal-rating="1">${renderStars(1, true)} 1 Yıldız</button>
              </div>
            </div>

            <!-- Sort Dropdown -->
            <div class="rv-sort-dropdown" id="rv-modal-sort-dropdown">
              <button type="button" class="rv-sort-dropdown-trigger">
                Sırala: En alakalı
                <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
              </button>
              <div class="rv-sort-dropdown-panel">
                <button type="button" class="rv-sort-dropdown-item active" data-rv-modal-sort="relevant">En alakalı</button>
                <button type="button" class="rv-sort-dropdown-item" data-rv-modal-sort="newest">En yeni</button>
              </div>
            </div>
          </div>

          <!-- Mention Tags -->
          <div class="rv-mention-tags">
            <span style="font-size: 12px; color: var(--pd-rating-text-color, #6b7280); align-self: center;">Sık bahsedilenler:</span>
            ${p.reviewMentionTags.map(tag => `
              <button type="button" class="rv-mention-tag" data-rv-modal-mention="${tag.label}">${tag.label} (${tag.count})</button>
            `).join('')}
          </div>

          <!-- Language Toggle -->
          <div class="rv-lang-row">
            <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd"/></svg>
            <span>Seçtiğiniz dilde tüm yorumlar gösteriliyor.</span>
            <a class="rv-lang-toggle-link" href="javascript:void(0)">Orijinalini Göster</a>
          </div>

          <!-- Review Cards (with product thumbnails) -->
          <div id="rv-modal-reviews-list">
            ${p.reviews.map(r => renderReviewCard(r, true)).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ── Init logic ──────────────────────────────────────── */

export function initReviewsModal(): void {
  const overlay = document.getElementById('rv-reviews-modal');
  const closeBtn = document.getElementById('rv-modal-close');

  if (!overlay) return;

  // ── Modal chrome: open / close / Escape ────────────
  const showAllBtn = document.querySelector<HTMLButtonElement>('.rv-show-all-btn');
  if (showAllBtn) {
    showAllBtn.addEventListener('click', () => {
      overlay.classList.remove('rv-modal-hidden');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeModal() {
    overlay!.classList.add('rv-modal-hidden');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.classList.contains('rv-modal-hidden')) {
      closeModal();
    }
  });

  // ── Independent filter state for the modal ─────────
  const modalState: ReviewFilterState = {
    filterType: 'all',
    ratingFilter: 'all',
    mentionFilter: null,
    sortBy: 'relevant',
  };

  const cardsContainer = overlay.querySelector<HTMLElement>('#rv-modal-reviews-list');

  function renderModalReviews(): void {
    if (!cardsContainer) return;
    const filtered = filterAndSortReviews(modalState);

    if (filtered.length === 0) {
      cardsContainer.innerHTML = `
        <div style="text-align: center; padding: 40px 0; color: var(--pd-rating-text-color, #6b7280); font-size: 14px;">
          Bu filtrelere uygun yorum bulunamadı.
        </div>
      `;
    } else {
      cardsContainer.innerHTML = filtered.map(r => renderReviewCard(r, true)).join('');
    }
    bindHelpfulButtons(cardsContainer);
  }

  // ── Filter pills (Tümü / Fotoğraflı) ──────────────
  const filterPills = overlay.querySelectorAll<HTMLButtonElement>('[data-rv-modal-filter]');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const val = pill.getAttribute('data-rv-modal-filter');
      modalState.filterType = val === 'photo' ? 'photo' : 'all';
      renderModalReviews();
    });
  });

  // ── Rating dropdown ────────────────────────────────
  const ratingDropdown = document.getElementById('rv-modal-rating-dropdown');
  const sortDropdown = document.getElementById('rv-modal-sort-dropdown');

  if (ratingDropdown) {
    const trigger = ratingDropdown.querySelector<HTMLButtonElement>('.rv-rating-dropdown-trigger');
    const items = ratingDropdown.querySelectorAll<HTMLButtonElement>('[data-rv-modal-rating]');

    trigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      ratingDropdown.classList.toggle('open');
      sortDropdown?.classList.remove('open');
    });

    items.forEach(item => {
      item.addEventListener('click', () => {
        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        ratingDropdown.classList.remove('open');

        const rating = item.getAttribute('data-rv-modal-rating');
        modalState.ratingFilter = rating === 'all' ? 'all' : parseInt(rating || '0', 10);

        if (trigger) {
          const label = rating === 'all' ? 'Puan' : `${rating} Yıldız`;
          trigger.innerHTML = `${label} <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>`;
          trigger.classList.toggle('active', rating !== 'all');
        }
        renderModalReviews();
      });
    });
  }

  // ── Sort dropdown ──────────────────────────────────
  if (sortDropdown) {
    const trigger = sortDropdown.querySelector<HTMLButtonElement>('.rv-sort-dropdown-trigger');
    const items = sortDropdown.querySelectorAll<HTMLButtonElement>('[data-rv-modal-sort]');

    trigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      sortDropdown.classList.toggle('open');
      ratingDropdown?.classList.remove('open');
    });

    items.forEach(item => {
      item.addEventListener('click', () => {
        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        sortDropdown.classList.remove('open');

        const sortVal = item.getAttribute('data-rv-modal-sort') as SortMode | null;
        if (sortVal && sortVal in SORT_LABELS) {
          modalState.sortBy = sortVal;
        }

        if (trigger) {
          trigger.innerHTML = `Sırala: ${SORT_LABELS[modalState.sortBy]} <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>`;
        }
        renderModalReviews();
      });
    });
  }

  // ── Mention tags ───────────────────────────────────
  const mentionTags = overlay.querySelectorAll<HTMLButtonElement>('[data-rv-modal-mention]');
  mentionTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const label = tag.getAttribute('data-rv-modal-mention');
      const wasActive = tag.classList.contains('active');

      mentionTags.forEach(t => t.classList.remove('active'));
      if (!wasActive) {
        tag.classList.add('active');
        modalState.mentionFilter = label;
      } else {
        modalState.mentionFilter = null;
      }
      renderModalReviews();
    });
  });

  // ── Click-outside to close modal dropdowns ─────────
  overlay.querySelector('.rv-modal-body')?.addEventListener('click', () => {
    ratingDropdown?.classList.remove('open');
    sortDropdown?.classList.remove('open');
  });

  // ── Helpful buttons (initial binding with auth gate) ──
  if (cardsContainer) {
    bindHelpfulButtons(cardsContainer);
  }
}
