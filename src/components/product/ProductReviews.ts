/**
 * ProductReviews Component
 * Alibaba-style reviews: sub-tabs, rating summary, category bars,
 * filter/mention pills, review cards with badges & supplier replies.
 */

import { mockProduct } from '../../data/mockProduct';
import type { ProductReview } from '../../types/product';
import { openLoginModal } from './LoginModal';

/* ── Utility helpers ─────────────────────────────────── */

function starIcon(filled: boolean, small = false): string {
  const size = small ? 'h-3.5 w-3.5' : 'h-4 w-4';
  return filled
    ? `<svg class="${size}" viewBox="0 0 20 20" fill="currentColor" style="color: var(--pd-review-star-color, #f59e0b);"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`
    : `<svg class="${size}" viewBox="0 0 20 20" fill="currentColor" style="color: #d1d5db;"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
}

export function renderStars(rating: number, small = false): string {
  return Array.from({ length: 5 }, (_, i) => starIcon(i < Math.round(rating), small)).join('');
}

function countryFlag(country: string): string {
  const flags: Record<string, string> = {
    'TR': '\u{1F1F9}\u{1F1F7}',
    'DE': '\u{1F1E9}\u{1F1EA}',
    'US': '\u{1F1FA}\u{1F1F8}',
    'IT': '\u{1F1EE}\u{1F1F9}',
    'CN': '\u{1F1E8}\u{1F1F3}',
    'UK': '\u{1F1EC}\u{1F1E7}',
    'FR': '\u{1F1EB}\u{1F1F7}',
  };
  return flags[country] || '\u{1F310}';
}

function anonymizeName(name: string): string {
  // "Ahmet Y." → "A***t Y."
  const parts = name.split(' ');
  const first = parts[0];
  if (first.length <= 2) return name;
  const anonymized = first.charAt(0) + '***' + first.charAt(first.length - 1);
  return [anonymized, ...parts.slice(1)].join(' ');
}

const avatarColors = [
  '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316',
  '#eab308', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6',
];

function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i);
    hash |= 0;
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

function satisfactionLabel(score: number): string {
  if (score >= 4.5) return 'Çok Memnun';
  if (score >= 3.5) return 'Memnun';
  if (score >= 2.5) return 'Orta';
  if (score >= 1.5) return 'Memnun Değil';
  return 'Çok Memnun Değil';
}

/* ── Review card renderer ────────────────────────────── */

export function renderReviewCard(review: ProductReview, showProductThumb = false): string {
  const badges: string[] = [];
  if (review.verified) {
    badges.push('<span class="rv-badge rv-badge-verified">Doğrulanmış Satın Alma</span>');
  }
  if (review.repeatBuyer) {
    badges.push('<span class="rv-badge rv-badge-repeat">Tekrar Alıcı</span>');
  }

  const supplierReplyHtml = review.supplierReply
    ? `<div class="rv-supplier-reply">
        <div class="rv-supplier-reply-label">Tedarikçi yanıtı:</div>
        <div class="rv-supplier-reply-text">${review.supplierReply}</div>
      </div>`
    : '';

  const productThumbHtml = showProductThumb && review.productTitle
    ? `<div class="rv-product-card">
        <img class="rv-product-card-img" src="${review.productImage || ''}" alt="Ürün görseli">
        <div class="rv-product-card-info">
          <span class="rv-product-card-title">${review.productTitle}</span>
          <span class="rv-product-card-price">${review.productPrice || ''}</span>
        </div>
        <a class="rv-product-card-link" href="javascript:void(0)">Ürün detaylarını gör ›</a>
      </div>`
    : '';

  return `
    <div class="rv-card">
      <div class="rv-card-header">
        <div class="rv-avatar" style="background: ${avatarColor(review.author)};">
          ${review.author.charAt(0)}
        </div>
        <div class="rv-card-meta">
          <div class="rv-card-name-row">
            <span class="rv-card-name">${anonymizeName(review.author)}</span>
            <span class="rv-card-country">${countryFlag(review.country)} ${review.countryName || review.country}</span>
            ${badges.join('')}
          </div>
          <div class="rv-card-stars-row">
            <div class="flex items-center gap-0.5">${renderStars(review.rating, true)}</div>
            <span class="rv-card-date">${review.date}</span>
          </div>
        </div>
      </div>
      <div class="rv-card-comment">${review.comment}</div>
      ${supplierReplyHtml}
      ${productThumbHtml}
      <button type="button" class="rv-hidden-reviews-link">Gizli yorumları göster</button>
      <button type="button" class="rv-helpful-btn" data-review-id="${review.id}">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
        </svg>
        Faydalı (${review.helpful})
      </button>
    </div>
  `;
}

/* ── Shared sub-component helpers ─────────────────────── */

function ratingDropdownHtml(idPrefix: string): string {
  return `
    <div class="rv-rating-dropdown" id="${idPrefix}-rating-dropdown">
      <button type="button" class="rv-rating-dropdown-trigger">
        Puan
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
      </button>
      <div class="rv-rating-dropdown-panel">
        <button type="button" class="rv-rating-dropdown-item active" data-rv-rating="all">Tüm Puanlar</button>
        <button type="button" class="rv-rating-dropdown-item" data-rv-rating="5">${renderStars(5, true)} 5 Yıldız</button>
        <button type="button" class="rv-rating-dropdown-item" data-rv-rating="4">${renderStars(4, true)} 4 Yıldız</button>
        <button type="button" class="rv-rating-dropdown-item" data-rv-rating="3">${renderStars(3, true)} 3 Yıldız</button>
        <button type="button" class="rv-rating-dropdown-item" data-rv-rating="2">${renderStars(2, true)} 2 Yıldız</button>
        <button type="button" class="rv-rating-dropdown-item" data-rv-rating="1">${renderStars(1, true)} 1 Yıldız</button>
      </div>
    </div>`;
}

function sortDropdownHtml(idPrefix: string): string {
  return `
    <div class="rv-sort-dropdown" id="${idPrefix}-sort-dropdown">
      <button type="button" class="rv-sort-dropdown-trigger">
        Sırala: En alakalı
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
      </button>
      <div class="rv-sort-dropdown-panel">
        <button type="button" class="rv-sort-dropdown-item active" data-rv-sort="relevant">En alakalı</button>
        <button type="button" class="rv-sort-dropdown-item" data-rv-sort="newest">En yeni</button>
      </div>
    </div>`;
}

function langToggleHtml(): string {
  return `
    <div class="rv-lang-row">
      <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd"/></svg>
      <span>Seçtiğiniz dilde tüm yorumlar gösteriliyor.</span>
      <a class="rv-lang-toggle-link" href="javascript:void(0)">Orijinalini Göster</a>
    </div>`;
}

/* ── Main component ──────────────────────────────────── */

export function ProductReviews(): string {
  const p = mockProduct;
  const photoReviewCount = p.reviews.filter(r => r.images && r.images.length > 0).length;

  return `
    <div class="py-6">
      <!-- Sub-tabs -->
      <div class="rv-sub-tabs">
        <button type="button" class="rv-sub-tab active" data-rv-panel="rv-product-panel">Ürün Yorumları (${p.reviewCount})</button>
        <button type="button" class="rv-sub-tab" data-rv-panel="rv-store-panel">Mağaza Yorumları (${p.storeReviewCount})</button>
      </div>

      <!-- Product Reviews Panel -->
      <div id="rv-product-panel">
        <!-- Info text -->
        <p style="font-size: 13px; color: var(--pd-rating-text-color, #6b7280); padding: 16px 0 12px; border-bottom: 1px solid var(--pd-spec-border, #e5e5e5); margin-bottom: 16px;">
          Bu ürün için son bir yılda yeni puan yok. Bunun yerine önceki puanlar ve yorumlar gösteriliyor.
        </p>

        <!-- Filter Row -->
        <div class="rv-filter-row">
          <button type="button" class="rv-filter-pill active" data-rv-filter="all">Tümü</button>
          ${ratingDropdownHtml('rv-product')}
          ${sortDropdownHtml('rv-product')}
        </div>

        <!-- Language Toggle -->
        ${langToggleHtml()}

        <!-- Review Cards -->
        ${p.reviews.map(r => renderReviewCard(r, false)).join('')}
      </div>

      <!-- Store Reviews Panel (hidden) -->
      <div id="rv-store-panel" class="hidden">
        <!-- Rating Summary -->
        <div class="rv-rating-summary">
          <div class="rv-rating-big">
            <span class="rv-rating-number">${p.rating}</span>
            <div class="flex items-center gap-0.5 mt-1">${renderStars(p.rating)}</div>
            <span class="rv-rating-label">${satisfactionLabel(p.rating)}</span>
            <span class="rv-rating-subtitle">${p.storeReviewCount} doğrulanmış alışveriş yorumuna dayalı</span>
          </div>
          <div class="rv-category-bars">
            ${p.reviewCategoryRatings.map(cat => `
              <div class="rv-category-row">
                <span class="rv-category-label">${cat.label}</span>
                <div class="rv-category-bar-track">
                  <div class="rv-category-bar-fill" style="width: ${(cat.score / 5) * 100}%;"></div>
                </div>
                <span class="rv-category-score">${cat.score}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Filter Row -->
        <div class="rv-filter-row">
          <button type="button" class="rv-filter-pill active" data-rv-filter="all">Tümü</button>
          <button type="button" class="rv-filter-pill" data-rv-filter="photo">Fotoğraflı/Videolu (${photoReviewCount})</button>
          ${ratingDropdownHtml('rv-store')}
          ${sortDropdownHtml('rv-store')}
        </div>

        <!-- Mention Tags -->
        <div class="rv-mention-tags">
          <span style="font-size: 12px; color: var(--pd-rating-text-color, #6b7280); align-self: center;">Sık bahsedilenler:</span>
          ${p.reviewMentionTags.map(tag => `
            <button type="button" class="rv-mention-tag" data-rv-mention="${tag.label}">${tag.label} (${tag.count})</button>
          `).join('')}
        </div>

        <!-- Language Toggle -->
        ${langToggleHtml()}

        <!-- Review Cards (with product thumbnails) -->
        ${p.reviews.map(r => renderReviewCard(r, true)).join('')}

        <!-- Show All Button -->
        <button type="button" class="rv-show-all-btn">Tümünü Göster</button>
      </div>
    </div>
  `;
}

/* ── Init logic ──────────────────────────────────────── */

/** Auth flag — set to false to simulate logged-out user */
let isLoggedIn = false;

export type SortMode = 'relevant' | 'newest' | 'highest' | 'lowest';

export interface ReviewFilterState {
  filterType: 'all' | 'photo';
  ratingFilter: 'all' | number;
  mentionFilter: string | null;
  sortBy: SortMode;
}

export const SORT_LABELS: Record<SortMode, string> = {
  relevant: 'En alakalı',
  newest: 'En yeni',
  highest: 'En yüksek puan',
  lowest: 'En düşük puan',
};

export function filterAndSortReviews(state: ReviewFilterState): ProductReview[] {
  let results = [...mockProduct.reviews];

  // Filter by photo/video
  if (state.filterType === 'photo') {
    results = results.filter(r => r.images && r.images.length > 0);
  }

  // Filter by rating
  if (state.ratingFilter !== 'all') {
    const target = typeof state.ratingFilter === 'number'
      ? state.ratingFilter
      : parseInt(String(state.ratingFilter), 10);
    results = results.filter(r => r.rating === target);
  }

  // Filter by mention tag (match against review tags array)
  if (state.mentionFilter) {
    const keyword = state.mentionFilter.toLowerCase();
    results = results.filter(r => r.tags?.some(t => t.toLowerCase() === keyword));
  }

  // Sort
  switch (state.sortBy) {
    case 'relevant':
      results.sort((a, b) => b.helpful - a.helpful);
      break;
    case 'newest':
      results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      break;
    case 'highest':
      results.sort((a, b) => b.rating - a.rating || b.helpful - a.helpful);
      break;
    case 'lowest':
      results.sort((a, b) => a.rating - b.rating || b.helpful - a.helpful);
      break;
  }

  return results;
}

export function bindHelpfulButtons(container: HTMLElement): void {
  const btns = container.querySelectorAll<HTMLButtonElement>('.rv-helpful-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('voted')) return;

      if (!isLoggedIn) {
        openLoginModal();
        return;
      }

      btn.classList.add('voted');
      const text = btn.textContent || '';
      const match = text.match(/\((\d+)\)/);
      if (match) {
        const count = parseInt(match[1], 10) + 1;
        btn.innerHTML = `
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
          </svg>
          Faydalı (${count})
        `;
      }
    });
  });
}

/**
 * Initialise a scoped review panel (Product tab, Store tab, or Modal).
 * Each scope gets its own independent filter state and re-render pipeline.
 *
 * @param panel            Root DOM element of the scope
 * @param idPrefix         ID namespace – 'rv-product' | 'rv-store' | 'rv-modal'
 * @param dataPrefix       Data-attribute namespace – 'rv' for tabs, 'rv-modal' for modal
 * @param showProductThumb Whether review cards show the product thumbnail
 */
function initScopedReviewPanel(
  panel: HTMLElement,
  idPrefix: string,
  dataPrefix: string,
  showProductThumb: boolean,
): void {
  const state: ReviewFilterState = {
    filterType: 'all',
    ratingFilter: 'all',
    mentionFilter: null,
    sortBy: 'relevant',
  };

  // ── Cards container ────────────────────────────────
  // Modal already has #rv-modal-reviews-list; tab panels get a wrapper on the fly.
  let cardsContainer = panel.querySelector<HTMLElement>(`#${idPrefix}-reviews-list`);
  if (!cardsContainer) {
    const showAllBtn = panel.querySelector<HTMLButtonElement>('.rv-show-all-btn');
    const existingCards = panel.querySelectorAll<HTMLElement>('.rv-card');
    cardsContainer = document.createElement('div');
    cardsContainer.id = `${idPrefix}-reviews-list`;
    existingCards.forEach(card => cardsContainer!.appendChild(card));
    if (showAllBtn) {
      panel.insertBefore(cardsContainer, showAllBtn);
    } else {
      panel.appendChild(cardsContainer);
    }
  }

  function renderFilteredReviews(): void {
    if (!cardsContainer) return;
    const filtered = filterAndSortReviews(state);

    if (filtered.length === 0) {
      cardsContainer.innerHTML = `
        <div style="text-align: center; padding: 40px 0; color: var(--pd-rating-text-color, #6b7280); font-size: 14px;">
          Bu filtrelere uygun yorum bulunamadı.
        </div>
      `;
    } else {
      cardsContainer.innerHTML = filtered.map(r => renderReviewCard(r, showProductThumb)).join('');
    }
    bindHelpfulButtons(cardsContainer);
  }

  // ── Filter pills (Tümü / Fotoğraflı) ──────────────
  const filterAttr = `data-${dataPrefix}-filter`;
  const filterPills = panel.querySelectorAll<HTMLButtonElement>(`[${filterAttr}]`);
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const val = pill.getAttribute(filterAttr);
      state.filterType = val === 'photo' ? 'photo' : 'all';
      renderFilteredReviews();
    });
  });

  // ── Rating dropdown ────────────────────────────────
  const ratingDropdown = document.getElementById(`${idPrefix}-rating-dropdown`);
  const sortDropdown = document.getElementById(`${idPrefix}-sort-dropdown`);
  const ratingAttr = `data-${dataPrefix}-rating`;

  if (ratingDropdown) {
    const trigger = ratingDropdown.querySelector<HTMLButtonElement>('.rv-rating-dropdown-trigger');
    const items = ratingDropdown.querySelectorAll<HTMLButtonElement>(`[${ratingAttr}]`);

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

        const rating = item.getAttribute(ratingAttr);
        state.ratingFilter = rating === 'all' ? 'all' : parseInt(rating || '0', 10);

        if (trigger) {
          const label = rating === 'all' ? 'Puan' : `${rating} Yıldız`;
          trigger.innerHTML = `${label} <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>`;
          trigger.classList.toggle('active', rating !== 'all');
        }
        renderFilteredReviews();
      });
    });
  }

  // ── Sort dropdown ──────────────────────────────────
  const sortAttr = `data-${dataPrefix}-sort`;

  if (sortDropdown) {
    const trigger = sortDropdown.querySelector<HTMLButtonElement>('.rv-sort-dropdown-trigger');
    const items = sortDropdown.querySelectorAll<HTMLButtonElement>(`[${sortAttr}]`);

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

        const sortVal = item.getAttribute(sortAttr) as SortMode | null;
        if (sortVal && sortVal in SORT_LABELS) {
          state.sortBy = sortVal;
        }

        if (trigger) {
          trigger.innerHTML = `Sırala: ${SORT_LABELS[state.sortBy]} <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>`;
        }
        renderFilteredReviews();
      });
    });
  }

  // ── Mention tags ───────────────────────────────────
  const mentionAttr = `data-${dataPrefix}-mention`;
  const mentionTags = panel.querySelectorAll<HTMLButtonElement>(`[${mentionAttr}]`);
  mentionTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const label = tag.getAttribute(mentionAttr);
      const wasActive = tag.classList.contains('active');

      // Deactivate all, then toggle the clicked one
      mentionTags.forEach(t => t.classList.remove('active'));
      if (!wasActive) {
        tag.classList.add('active');
        state.mentionFilter = label;
      } else {
        state.mentionFilter = null;
      }
      renderFilteredReviews();
    });
  });

  // ── Helpful buttons (initial binding) ──────────────
  bindHelpfulButtons(panel);
}

export function initReviews(): void {
  const productPanel = document.getElementById('rv-product-panel');
  const storePanel = document.getElementById('rv-store-panel');
  if (!productPanel) return;

  // ── Sub-tab switching ──────────────────────────────
  const subTabs = document.querySelectorAll<HTMLButtonElement>('.rv-sub-tab');
  subTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      subTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetId = tab.dataset.rvPanel;
      if (productPanel && storePanel) {
        productPanel.classList.toggle('hidden', targetId !== 'rv-product-panel');
        storePanel.classList.toggle('hidden', targetId !== 'rv-store-panel');
      }
    });
  });

  // ── Init scoped panels ─────────────────────────────
  // Product tab: uses data-rv-* attributes, no product thumbnails
  initScopedReviewPanel(productPanel, 'rv-product', 'rv', false);

  // Store tab: uses data-rv-* attributes, shows product thumbnails on cards
  if (storePanel) {
    initScopedReviewPanel(storePanel, 'rv-store', 'rv', true);
  }

  // Modal filter pipeline lives in initReviewsModal() (ReviewsModal.ts)

  // ── Click-outside to close all dropdowns ───────────
  document.addEventListener('click', () => {
    document.querySelectorAll('.rv-rating-dropdown.open').forEach(el => el.classList.remove('open'));
    document.querySelectorAll('.rv-sort-dropdown.open').forEach(el => el.classList.remove('open'));
  });
}
