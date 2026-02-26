/**
 * Dropshipping Layout Component
 * Hash-based routing between #find-products and #manage-orders sections.
 */

import type { ProductListingCard, ProductImageKind } from '../../types/productListing';
import {
  collectionChips,
  countryChips,
  categoryTags,
  orderTabs,
  dropshippingProducts,
} from '../../data/mockDropshipping';

// ── Image URLs per category (same as ProductListingGrid) ──────────
const categoryImages: Record<ProductImageKind, string[]> = {
  jewelry: [
    'https://images.unsplash.com/photo-1515562141589-67f0d569b6f5?w=400&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop&q=80',
  ],
  electronics: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop&q=80',
  ],
  label: [
    'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=400&fit=crop&q=80',
  ],
  crafts: [
    'https://images.unsplash.com/photo-1513364776144-60967b0f800c?w=400&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1452860606245-08f97f4c8657?w=400&h=400&fit=crop&q=80',
  ],
  accessory: [
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&q=80',
  ],
  clothing: [
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop&q=80',
  ],
  tools: [
    'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400&h=400&fit=crop&q=80',
  ],
  packaging: [
    'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=400&fit=crop&q=80',
  ],
};

function getProductImage(card: ProductListingCard): string {
  const idOffset = card.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const urls = categoryImages[card.imageKind];
  return urls[idOffset % urls.length];
}

/** Render a compact dropshipping product card (Alibaba reference style) */
function renderDsCard(card: ProductListingCard): string {
  const imgUrl = card.imageSrc || getProductImage(card);

  const discountHtml = card.discount
    ? `<span class="ds-card__discount">↓ -${card.discount.replace('off', '').trim()}</span>`
    : '';

  const originalPriceHtml = card.originalPrice
    ? `<span class="ds-card__original-price">${card.originalPrice}</span>`
    : '';

  const reorderHtml = card.reorderRate
    ? `<span class="ds-card__reorder">&#10003; Yeniden sipariş oranı %${card.reorderRate}</span>`
    : '';

  const verifiedHtml = card.verified && card.supplierYears && card.supplierYears >= 5
    ? `<span class="ds-card__verified">Verified</span>`
    : '';

  const flagUrl = card.supplierCountry
    ? `https://flagcdn.com/16x12/${card.supplierCountry.toLowerCase()}.png`
    : '';

  return `
    <a href="${card.href}" class="ds-card" target="_blank">
      <div class="ds-card__img">
        <img src="${imgUrl}" alt="${card.name}" loading="lazy" />
        <div class="ds-card__img-overlay">
          <button class="ds-card__overlay-btn" onclick="event.preventDefault();event.stopPropagation();">+ Stoksuz ticaret listesi</button>
        </div>
      </div>
      <div class="ds-card__body">
        <h3 class="ds-card__title">${card.name}</h3>
        <div class="ds-card__stats">${card.stats ? card.stats.replace('satış', 'adet satıldı') : ''}</div>
        ${discountHtml}
        <div class="ds-card__price-row">
          <span class="ds-card__price">${card.price}</span>
          ${originalPriceHtml}
        </div>
        <div class="ds-card__moq">Minimum sipariş: ${card.moq}</div>
        ${reorderHtml}
        <div class="ds-card__supplier">
          ${verifiedHtml}
          ${card.supplierYears ? `<span>${card.supplierYears} yıl</span>` : ''}
          ${flagUrl ? `<img src="${flagUrl}" alt="${card.supplierCountry}" width="16" height="12" />` : ''}
          ${card.supplierCountry ? `<span>${card.supplierCountry}</span>` : ''}
          ${card.rating ? `<span class="ds-card__rating">${card.rating}/5.0</span>` : ''}
        </div>
      </div>
    </a>
  `;
}

// ── Hash Routing ──────────────────────────────────────────────────

type SectionId = 'find-products' | 'manage-orders';

const SECTIONS: Record<SectionId, () => string> = {
  'find-products': renderFindProducts,
  'manage-orders': renderManageOrders,
};

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: 'find-products', label: 'Ürünleri bulun' },
  { id: 'manage-orders', label: 'Siparişleri yönet' },
];

function getActiveSection(): SectionId {
  const hash = window.location.hash.replace('#', '') as SectionId;
  return SECTIONS[hash] ? hash : 'find-products';
}

// ── Find Products Section ─────────────────────────────────────────

function renderHeroBanner(): string {
  return `
    <div class="ds-hero">
      <div class="ds-hero__content">
        <h1 class="ds-hero__title">
          Başlangıç <strong>damla nakliye</strong> bugün mağazanıza
          <span class="ds-hero__platforms">
            <span class="ds-hero__platform-badge" title="Amazon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M.045 18.02c.07-.116.36-.208.686-.296 1.35-.36 5.37-1.56 7.63-3.33.18-.14.19-.38.04-.54-.66-.71-1.76-1.52-2.58-1.94-.12-.06-.28-.06-.4 0-1.34.76-2.9 1.29-4.3 1.56-.24.05-.43.18-.48.37-.08.28-.18.96-.18 1.56 0 .42.02.72.04.88.02.16.12.3.28.36.16.04.32 0 .44-.12l-.14.01zm14.5-7.5c.34 0 .63.1.87.28.24.18.36.44.36.74 0 .3-.12.56-.36.74-.24.18-.53.28-.87.28-.34 0-.63-.1-.87-.28-.24-.18-.36-.44-.36-.74 0-.3.12-.56.36-.74.24-.18.53-.28.87-.28z"/><path d="M20.2 18.43c-.08-.12-.28-.16-.44-.08-1.56.82-3.28 1.24-5.16 1.24-2.44 0-4.64-.72-6.6-2.16-.14-.1-.32-.08-.42.06-.1.14-.08.34.06.44 2.12 1.56 4.48 2.34 7.08 2.34 1.96 0 3.84-.46 5.56-1.36.16-.1.24-.3.16-.48h-.24z"/></svg>
            </span>
            <span class="ds-hero__platform-badge" title="Shopify">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.34 3.8c-.01-.07-.07-.12-.12-.13-.05-.01-1.17-.04-1.17-.04s-.78-.77-.86-.85c-.08-.08-.24-.06-.3-.04 0 0-.16.05-.43.13-.26-.74-.7-1.42-1.49-1.42h-.07c-.22-.29-.5-.42-.73-.42-1.81 0-2.67 2.26-2.94 3.41-.7.22-1.2.37-1.26.39-.39.12-.4.13-.45.5C5.45 5.63 4.4 13.63 4.4 13.63l8.26 1.44 4.48-1.1S15.35 3.87 15.34 3.8z"/></svg>
            </span>
            <span class="ds-hero__platform-badge" title="Wix">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.94 6.87c-.2.33-.54.86-.54 1.76 0 .88.46 1.5.56 1.64l2.48 3.38c.06.08.04.2-.04.26-.46.32-.7.88-.7 1.52 0 .66.3 1.16.4 1.3.1.16.42.54.86.54.3 0 .54-.12.7-.24l3.04-2.16c.08-.06.2-.04.26.04l2.48 3.38c.1.14.3.34.66.34.38 0 .6-.22.68-.34.1-.14.4-.64.4-1.3 0-.64-.24-1.2-.7-1.52-.08-.06-.1-.18-.04-.26l2.48-3.38c.1-.14.56-.76.56-1.64 0-.9-.34-1.43-.54-1.76"/></svg>
            </span>
            <span class="ds-hero__platform-badge" title="WooCommerce">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2.227 4C1 4 0 5.012 0 6.25v8.75c0 .834.478 1.563 1.172 1.926L4.96 20l.92-3.063H22c1.227 0 2-.98 2-2.187V6.25C24 5.012 23.227 4 22 4H2.227zm3.023 2.75c.73 0 1.27.41 1.59 1.219l1.23 3.438 1.22-3.438c.32-.81.86-1.219 1.59-1.219.99 0 1.5.73 1.5 2.156v3.344h-1.25V8.937c0-.57-.09-.968-.33-.968-.17 0-.36.21-.53.625L9 12.25H7.76l-1.26-3.656c-.17-.414-.36-.625-.53-.625-.24 0-.33.398-.33.969v3.312H4.39V8.906c0-1.425.55-2.156 1.5-2.156h-.64zm10.75 0c1.47 0 2.25 1.12 2.25 2.75s-.78 2.75-2.25 2.75-2.25-1.12-2.25-2.75.78-2.75 2.25-2.75z"/></svg>
            </span>
          </span>
        </h1>
        <div class="ds-hero__links">
          <a href="#" class="ds-hero__link">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.5"/><path d="M7 4v3.5M7 9.5h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            Nasıl çalışır
          </a>
          <a href="#" class="ds-hero__link">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4l5 3.5L12 4M2 4v6.5h10V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Bize geribildirim bırakın
          </a>
          <a href="#" class="ds-hero__link">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v4M5 3l2 2 2-2M1 7h12M3 10h8M5 13h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            ABD Satış Vergisi Muafiyeti Programı
          </a>
        </div>
      </div>
      <div class="ds-hero__search-wrapper">
        <div class="ds-hero__search">
          <input type="text" class="ds-hero__search-input" placeholder="İşletmeniz için mükemmel ürünleri keşfedin" />
          <button class="ds-hero__search-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="currentColor" stroke-width="2"/><path d="M10.5 10.5L14.5 14.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            Arama
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderCollectionFilters(): string {
  const chips = collectionChips
    .map(
      (c) =>
        `<button class="ds-chip${c.active ? ' ds-chip--active ds-chip--orange' : ''}" data-chip-id="${c.id}">${c.label}</button>`
    )
    .join('');
  return `
    <div class="ds-filters__row">
      <span class="ds-filters__label">Koleksiyon:</span>
      <div class="ds-filters__chips">${chips}</div>
    </div>
  `;
}

function renderCountryFilters(): string {
  const chips = countryChips
    .map(
      (c) =>
        `<button class="ds-chip ds-chip--country" data-country="${c.code}">
          <img src="https://flagcdn.com/16x12/${c.code.toLowerCase()}.png" alt="${c.label}" width="16" height="12" />
          ${c.label}
        </button>`
    )
    .join('');
  return `
    <div class="ds-filters__row">
      <span class="ds-filters__label">Gelen nakliye:</span>
      <div class="ds-filters__chips">${chips}</div>
    </div>
  `;
}

function renderDropdownFilters(): string {
  return `
    <div class="ds-filters__row">
      <span class="ds-filters__label">Diğer filtre:</span>
      <div class="ds-filters__chips">
        <select class="ds-select"><option>Tedarikçi ülkesi</option></select>
        <select class="ds-select"><option>Depo</option></select>
        <select class="ds-select"><option>Lojistik</option></select>
        <button class="ds-chip ds-chip--toggle" data-toggle="free-shipping">Ücretsiz kargo</button>
      </div>
    </div>
  `;
}

function renderCategoryTag(tag: typeof categoryTags[number], hidden: boolean): string {
  return `
    <div class="ds-category-tag${hidden ? ' ds-category-tag--hidden' : ''}" data-cat-id="${tag.id}">
      <span>${tag.label}</span>
      ${
        tag.subcategories
          ? `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5"/></svg>
             <div class="ds-category-tag__dropdown">
               ${tag.subcategories.map((s) => `<a href="#" class="ds-category-tag__dropdown-item">${s}</a>`).join('')}
             </div>`
          : ''
      }
    </div>`;
}

function renderCategoryFilters(): string {
  const VISIBLE_COUNT = 8;
  const visible = categoryTags.slice(0, VISIBLE_COUNT);
  const hidden = categoryTags.slice(VISIBLE_COUNT);

  return `
    <div class="ds-filters__row ds-category-row">
      <span class="ds-filters__label">Kategori:</span>
      <div class="ds-filters__chips ds-category-chips">
        ${visible.map((t) => renderCategoryTag(t, false)).join('')}
        ${hidden.map((t) => renderCategoryTag(t, true)).join('')}
        <button class="ds-category-toggle" data-expanded="false">
          Tümünü görüntüle
          <svg class="ds-category-toggle__icon" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>
    </div>
    <div class="ds-category-active-chips" id="ds-active-category-chips"></div>
  `;
}

function renderProductGrid(): string {
  const cards = dropshippingProducts.map((p) => renderDsCard(p)).join('');

  return `
    <div class="ds-products-bar">
      <span class="ds-products-bar__label">Tüm dropshipping ürünlerini gösterme (${dropshippingProducts.length})</span>
      <select class="ds-products-bar__sort">
        <option>Uygunluk</option>
        <option>Satışlara Göre - Yüksekten Düşüğe</option>
      </select>
    </div>
    <div class="ds-product-grid">
      ${cards}
    </div>
  `;
}

function renderFindProducts(): string {
  return `
    <div class="ds-find-products">
      ${renderHeroBanner()}
      <div class="ds-filters">
        ${renderCollectionFilters()}
        ${renderCountryFilters()}
        ${renderDropdownFilters()}
        ${renderCategoryFilters()}
      </div>
      ${renderProductGrid()}
    </div>
  `;
}

// ── Manage Orders Section ─────────────────────────────────────────

function renderOrderTabs(): string {
  const tabs = orderTabs
    .map(
      (tab, i) =>
        `<button class="ds-orders__tab${i === 0 ? ' ds-orders__tab--active' : ''}" data-tab="${tab.id}">
          ${tab.label}${tab.count !== undefined ? ` <span class="ds-orders__tab-count">(${tab.count})</span>` : ''}
        </button>`
    )
    .join('');
  return `<div class="ds-orders__tabs">${tabs}</div>`;
}

function renderEmptyState(): string {
  return `
    <div class="ds-empty">
      <div class="ds-empty__icon">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="10" width="50" height="60" rx="4" stroke="#D1D5DB" stroke-width="2" fill="none"/>
          <line x1="25" y1="25" x2="55" y2="25" stroke="#D1D5DB" stroke-width="2"/>
          <line x1="25" y1="35" x2="55" y2="35" stroke="#D1D5DB" stroke-width="2"/>
          <line x1="25" y1="45" x2="45" y2="45" stroke="#D1D5DB" stroke-width="2"/>
          <circle cx="58" cy="58" r="14" fill="#F3F4F6" stroke="#D1D5DB" stroke-width="2"/>
          <path d="M54 58L57 61L63 55" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h3 class="ds-empty__title">Henüz sipariş yok</h3>
      <p class="ds-empty__desc">Tedarik etmeye başlamak için ana sayfaya gidin veya aşağıya tıklayın</p>
      <a href="/dropshipping.html#find-products" class="ds-empty__cta">Tedarik etmeye başla</a>
    </div>
  `;
}

function renderAutoApprovalModal(): string {
  return `
    <div class="ds-modal" id="ds-auto-approval-modal">
      <div class="ds-modal__overlay"></div>
      <div class="ds-modal__dialog">
        <div class="ds-modal__header">
          <h3 class="ds-modal__title">Otomatik onay</h3>
          <button class="ds-modal__close" data-close-modal>&times;</button>
        </div>
        <div class="ds-modal__body">
          <div class="ds-toggle-row">
            <div class="ds-toggle" id="ds-auto-toggle">
              <div class="ds-toggle__track">
                <div class="ds-toggle__thumb"></div>
              </div>
            </div>
            <div class="ds-toggle-row__text">
              <strong>Otomatik onayla sipariş ver</strong>
              <p>Siparişler otomatik olarak onaylanarak işleme alınır. Bu özellik etkinleştirildiğinde, siparişleriniz manuel onay gerektirmeden doğrudan işlenir.</p>
            </div>
          </div>
          <label class="ds-modal__checkbox">
            <input type="checkbox" id="ds-legal-check" />
            <span>Stoksuz ticaret hizmet şartlarını okudum ve kabul ediyorum. Otomatik sipariş onayı ile ilgili tüm sorumlulukları üstleniyorum.</span>
          </label>
        </div>
        <div class="ds-modal__footer">
          <button class="ds-modal__btn ds-modal__btn--primary" id="ds-save-approval">Değişikliği kaydet</button>
        </div>
      </div>
    </div>
  `;
}

function renderManageOrders(): string {
  return `
    <div class="ds-orders">
      <div class="ds-orders__header">
        <h2 class="ds-orders__title">Dropshipping siparişleri</h2>
        <div class="ds-orders__auto-approval">
          <span>Otomatik onay</span>
          <button class="ds-orders__badge" id="ds-open-auto-modal">Kapalı</button>
        </div>
      </div>
      ${renderOrderTabs()}
      <div class="ds-orders__tab-content ds-orders__tab-content--active" data-tab-content="all">
        ${renderEmptyState()}
      </div>
      ${orderTabs
        .slice(1)
        .map(
          (tab) => `
        <div class="ds-orders__tab-content" data-tab-content="${tab.id}">
          ${renderEmptyState()}
        </div>`
        )
        .join('')}
    </div>
    ${renderAutoApprovalModal()}
  `;
}

// ── Main Layout ───────────────────────────────────────────────────

export function DropshippingLayout(): string {
  const activeId = getActiveSection();
  const renderFn = SECTIONS[activeId];

  const navLinks = NAV_ITEMS.map(
    (item) =>
      `<a href="#${item.id}" class="ds-page__nav-link${item.id === activeId ? ' ds-page__nav-link--active' : ''}" data-section="${item.id}">${item.label}</a>`
  ).join('');

  return `
    <div class="ds-page">
      <div class="ds-page__nav">${navLinks}</div>
      <div class="ds-page__content" id="ds-content">
        ${renderFn()}
      </div>
    </div>
  `;
}

// ── Init ──────────────────────────────────────────────────────────

export function initDropshippingLayout(): void {
  const contentEl = document.getElementById('ds-content');
  if (!contentEl) return;

  function navigate(): void {
    const activeId = getActiveSection();
    const renderFn = SECTIONS[activeId];
    contentEl!.innerHTML = renderFn();

    // Update nav active state
    document.querySelectorAll('.ds-page__nav-link').forEach((link) => {
      const section = link.getAttribute('data-section');
      link.classList.toggle('ds-page__nav-link--active', section === activeId);
    });

    // Re-init section-specific handlers
    if (activeId === 'find-products') {
      initFindProducts();
    } else {
      initManageOrders();
    }
  }

  window.addEventListener('hashchange', navigate);

  // Init current section
  const activeId = getActiveSection();
  if (activeId === 'find-products') {
    initFindProducts();
  } else {
    initManageOrders();
  }
}

// ── Find Products Init ────────────────────────────────────────────

function initFindProducts(): void {
  initCollectionChips();
  initCountryChips();
  initCategoryToggle();
  initCategorySelect();
  initToggleChips();
}

function initCollectionChips(): void {
  document.querySelectorAll<HTMLButtonElement>('.ds-chip[data-chip-id]').forEach((chip) => {
    chip.addEventListener('click', () => {
      // Only one active at a time in collection row
      chip.closest('.ds-filters__chips')?.querySelectorAll('.ds-chip').forEach((c) => {
        c.classList.remove('ds-chip--active', 'ds-chip--orange');
      });
      chip.classList.add('ds-chip--active', 'ds-chip--orange');
    });
  });
}

function initCountryChips(): void {
  document.querySelectorAll<HTMLButtonElement>('.ds-chip--country').forEach((chip) => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('ds-chip--active');
    });
  });
}

function initCategoryToggle(): void {
  const toggleBtn = document.querySelector<HTMLButtonElement>('.ds-category-toggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const expanded = toggleBtn.getAttribute('data-expanded') === 'true';
    const newExpanded = !expanded;
    toggleBtn.setAttribute('data-expanded', String(newExpanded));

    // Update label and icon direction
    const icon = toggleBtn.querySelector('.ds-category-toggle__icon');
    if (icon) {
      (icon as HTMLElement).style.transform = newExpanded ? 'rotate(180deg)' : '';
    }
    // Replace text content but keep the SVG
    const textNode = toggleBtn.firstChild;
    if (textNode && textNode.nodeType === Node.TEXT_NODE) {
      textNode.textContent = newExpanded ? 'Daha az görüntüle ' : 'Tümünü görüntüle ';
    }

    document.querySelectorAll('.ds-category-tag--hidden').forEach((tag) => {
      (tag as HTMLElement).style.display = expanded ? 'none' : '';
    });
  });
}

function initCategorySelect(): void {
  const chipsContainer = document.getElementById('ds-active-category-chips');
  if (!chipsContainer) return;

  document.querySelectorAll<HTMLElement>('.ds-category-tag').forEach((tag) => {
    tag.addEventListener('click', (e) => {
      // Don't trigger if clicking a dropdown item
      if ((e.target as HTMLElement).closest('.ds-category-tag__dropdown')) return;

      const catId = tag.getAttribute('data-cat-id');
      const label = tag.querySelector('span')?.textContent || '';
      if (!catId) return;

      const isActive = tag.classList.contains('ds-category-tag--active');

      if (isActive) {
        // Deselect
        tag.classList.remove('ds-category-tag--active');
        chipsContainer.querySelector(`[data-remove-cat="${catId}"]`)?.remove();
      } else {
        // Select
        tag.classList.add('ds-category-tag--active');
        const chip = document.createElement('button');
        chip.className = 'ds-active-chip';
        chip.setAttribute('data-remove-cat', catId);
        chip.innerHTML = `✕ ${label}`;
        chip.addEventListener('click', () => {
          tag.classList.remove('ds-category-tag--active');
          chip.remove();
        });
        chipsContainer.appendChild(chip);
      }
    });
  });
}

function initToggleChips(): void {
  document.querySelectorAll<HTMLButtonElement>('.ds-chip--toggle').forEach((chip) => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('ds-chip--active');
    });
  });
}

// ── Manage Orders Init ────────────────────────────────────────────

function initManageOrders(): void {
  initOrderTabs();
  initAutoApprovalModal();
}

function initOrderTabs(): void {
  document.querySelectorAll<HTMLButtonElement>('.ds-orders__tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');
      if (!tabId) return;

      // Update active tab
      document.querySelectorAll('.ds-orders__tab').forEach((t) => t.classList.remove('ds-orders__tab--active'));
      tab.classList.add('ds-orders__tab--active');

      // Show corresponding content
      document.querySelectorAll('.ds-orders__tab-content').forEach((c) => c.classList.remove('ds-orders__tab-content--active'));
      const content = document.querySelector(`[data-tab-content="${tabId}"]`);
      content?.classList.add('ds-orders__tab-content--active');
    });
  });
}

function initAutoApprovalModal(): void {
  const modal = document.getElementById('ds-auto-approval-modal');
  const openBtn = document.getElementById('ds-open-auto-modal');
  if (!modal || !openBtn) return;

  openBtn.addEventListener('click', () => {
    modal.classList.add('ds-modal--open');
  });

  // Close handlers
  modal.querySelector('.ds-modal__overlay')?.addEventListener('click', () => {
    modal.classList.remove('ds-modal--open');
  });
  modal.querySelector('[data-close-modal]')?.addEventListener('click', () => {
    modal.classList.remove('ds-modal--open');
  });

  // Toggle switch
  const toggle = document.getElementById('ds-auto-toggle');
  toggle?.addEventListener('click', () => {
    toggle.classList.toggle('ds-toggle--on');
  });

  // Save button
  document.getElementById('ds-save-approval')?.addEventListener('click', () => {
    const isOn = toggle?.classList.contains('ds-toggle--on');
    const badge = document.getElementById('ds-open-auto-modal');
    if (badge) {
      badge.textContent = isOn ? 'Açık' : 'Kapalı';
      badge.classList.toggle('ds-orders__badge--on', !!isOn);
    }
    modal.classList.remove('ds-modal--open');
  });
}
