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
      <h1 class="ds-hero__title">Başlangıç damla nakliye bugün mağazanıza</h1>
      <div class="ds-hero__platforms">
        <span class="ds-hero__platform-badge">Amazon</span>
        <span class="ds-hero__platform-badge">Shopify</span>
        <span class="ds-hero__platform-badge">Wix</span>
        <span class="ds-hero__platform-badge">WooCommerce</span>
      </div>
      <div class="ds-hero__search">
        <input type="text" class="ds-hero__search-input" placeholder="İşletmeniz için mükemmel ürünleri keşfedin" />
        <button class="ds-hero__search-btn">Arama</button>
      </div>
      <div class="ds-hero__links">
        <a href="#" class="ds-hero__link">Nasıl çalışır</a>
        <a href="#" class="ds-hero__link">Bize geribildirim bırakın</a>
        <a href="#" class="ds-hero__link">ABD Satış Vergisi Muafiyeti Programı</a>
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

function renderCategoryFilters(): string {
  const visible = categoryTags.slice(0, 6);
  const hidden = categoryTags.slice(6);

  const visibleTags = visible
    .map(
      (tag) => `
      <div class="ds-category-tag" data-cat-id="${tag.id}">
        <span>${tag.label}</span>
        ${
          tag.subcategories
            ? `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5"/></svg>
               <div class="ds-category-tag__dropdown">
                 ${tag.subcategories.map((s) => `<a href="#" class="ds-category-tag__dropdown-item">${s}</a>`).join('')}
               </div>`
            : ''
        }
      </div>`
    )
    .join('');

  const hiddenTags = hidden
    .map(
      (tag) => `
      <div class="ds-category-tag ds-category-tag--hidden" data-cat-id="${tag.id}">
        <span>${tag.label}</span>
        ${
          tag.subcategories
            ? `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5"/></svg>
               <div class="ds-category-tag__dropdown">
                 ${tag.subcategories.map((s) => `<a href="#" class="ds-category-tag__dropdown-item">${s}</a>`).join('')}
               </div>`
            : ''
        }
      </div>`
    )
    .join('');

  return `
    <div class="ds-filters__row ds-category-row">
      <span class="ds-filters__label">Kategori:</span>
      <div class="ds-filters__chips">
        ${visibleTags}
        ${hiddenTags}
        <button class="ds-category-toggle" data-expanded="false">Tümünü görüntüle</button>
      </div>
    </div>
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
    toggleBtn.setAttribute('data-expanded', String(!expanded));
    toggleBtn.textContent = expanded ? 'Tümünü görüntüle' : 'Daha az görüntüle';

    document.querySelectorAll('.ds-category-tag--hidden').forEach((tag) => {
      (tag as HTMLElement).style.display = expanded ? 'none' : '';
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
