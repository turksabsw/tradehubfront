/**
 * FavoritesLayout Component
 * Two hash-based views: #favorites (default) and #browsing-history.
 * Favorites: tabs (Ürünler/Tedarikçiler), list sidebar, empty state, "Yeni liste ekle" modal
 * Browsing History: 5-column product grid with mock data
 */

import favEmptySvg from '../../assets/images/O1CN01Bny3KU1Swwfj3Ntma_!!6000000002312-55-tps-222-221.svg';
import { t } from '../../i18n';
import { formatPrice } from '../../utils/currency';

/* ────────────────────────────────────────
   BROWSING HISTORY MOCK DATA
   ──────────────────────────────────────── */
interface BrowsingProduct {
  image: string;
  title: string;
  priceRange: string;
  minOrder: string;
}

const BROWSING_PRODUCTS: BrowsingProduct[] = [
  {
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
    title: 'Custom Logo Professional Thick Foam Padded Waterproof Electric Bass Guitar Bag',
    priceRange: '$15.90-19.90',
    minOrder: 'Min. order: 3 Pcs',
  },
  {
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    title: 'Outdoor Tactical Training Boots Classic Style Leather Waterproof Hiking Shoes',
    priceRange: '$14.22-18.81',
    minOrder: 'Min. order: 2 Pcs',
  },
  {
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop',
    title: 'Custom Logo Portable Outdoor Foldable Cart Metal Beach Wagon',
    priceRange: '$24.99-26.99',
    minOrder: 'Min. order: 100 Pcs',
  },
  {
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop',
    title: 'Custom Logo Printed Eco Recyclable Reusable Plain Cotton Tote Bag',
    priceRange: '$1.20-3.50',
    minOrder: 'Min. order: 50 Pcs',
  },
  {
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=300&h=300&fit=crop',
    title: 'New Hot Sale Ladies Crossbody Designer Women Tote Handbag',
    priceRange: '$8.50-12.90',
    minOrder: 'Min. order: 1 Pc',
  },
  {
    image: 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=300&h=300&fit=crop',
    title: 'Autumn Winter Women Triple Strap Zipper Large Capacity Cross-Border Backpack',
    priceRange: '$6.43-6.86',
    minOrder: 'Min. order: 2 Pcs',
  },
  {
    image: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=300&h=300&fit=crop',
    title: 'Fashion Unisex Casual Thick Nylon Zipper Canvas Bag Travel Bag',
    priceRange: '$4-5',
    minOrder: 'Min. order: 100 Bags',
  },
  {
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop',
    title: 'Men Breathable Height Increasing Soft Cushioned Fashion Outdoor Sports Shoes',
    priceRange: '$14.31-15.90',
    minOrder: 'Min. order: 12 Pairs',
  },
  {
    image: 'https://images.unsplash.com/photo-1605733513597-a8f8341084e6?w=300&h=300&fit=crop',
    title: 'Men Lightweight Outdoor Leather Wear-Resistant Hiking Boots',
    priceRange: '$15.80-16.90',
    minOrder: 'Min. order: 2 Pairs',
  },
  {
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=300&fit=crop',
    title: 'Wholesale Latest Design Combat Sports Shoes Men Outdoor Running Shoes',
    priceRange: '$13.65-15.65',
    minOrder: 'Min. order: 1 Pair',
  },
];

/* ────────────────────────────────────────
   EMPTY STATE ILLUSTRATION
   ──────────────────────────────────────── */
const FAVORITES_EMPTY_SVG = `<img src="${favEmptySvg}" alt="${t('favorites.noFavorites')}" width="160" height="160" />`;

/* ────────────────────────────────────────
   SECTION RENDERERS
   ──────────────────────────────────────── */

function renderEmptyState(): string {
  return `
    <div class="flex flex-col items-center text-center py-15 px-5">
      <div class="mb-5">${FAVORITES_EMPTY_SVG}</div>
      <h3 class="text-base font-bold text-text-primary mb-2.5">${t('favorites.noFavorites')}</h3>
      <p class="text-sm text-text-tertiary leading-relaxed max-w-[380px]">${t('favorites.noFavoritesDesc')}</p>
    </div>
  `;
}

function renderFavorites(): string {
  return `
    <div class="px-7 pt-6 max-sm:px-3 max-sm:pt-4">
      <h1 class="text-xl font-bold text-text-primary">${t('favorites.title')}</h1>
    </div>

    <div class="fav-tabs flex px-7 max-sm:px-3 border-b border-border-default mt-4" data-tabgroup="fav">
      <button class="fav-tabs__tab fav-tabs__tab--active py-3 px-5 text-sm font-medium text-text-secondary bg-transparent border-none border-b-3 border-transparent cursor-pointer transition-[color,border-color] duration-150 -mb-px hover:text-text-primary" data-tab="fav-products">${t('favorites.products')}</button>
      <button class="fav-tabs__tab py-3 px-5 text-sm font-medium text-text-secondary bg-transparent border-none border-b-3 border-transparent cursor-pointer transition-[color,border-color] duration-150 -mb-px hover:text-text-primary" data-tab="fav-suppliers">${t('favorites.suppliers')}</button>
    </div>

    <!-- Tab: Ürünler -->
    <div class="fav-tab-content fav-tab-content--active" data-content="fav-products">
      <div class="fav-products flex min-h-[400px] max-md:flex-col">
        <aside class="fav-products__sidebar w-60 shrink-0 py-5 px-6 border-r border-[#f0f0f0] max-md:w-full max-md:border-r-0 max-md:border-b max-md:border-[#f0f0f0]">
          <h3 class="text-base font-bold text-text-primary mb-2.5">${t('favorites.myList')}</h3>
          <a href="#" class="text-sm text-text-primary font-semibold underline underline-offset-2 hover:text-(--color-cta-primary)" data-action="create-list">${t('favorites.createList')}</a>
          <div class="mt-4 flex flex-col gap-0.5" id="fav-list-sidebar">
            <!-- Sidebar counts populated via JS -->
            <div class="fav-products__list-item fav-products__list-item--active p-2.5 px-3 rounded-md cursor-pointer transition-[background] duration-150 bg-surface-raised hover:bg-surface-raised">
              <span class="block text-sm font-semibold text-text-primary">${t('favorites.listAll')}</span>
              <span class="block text-xs text-text-tertiary mt-0.5" id="fav-all-count">${t('favorites.itemCount', { count: 0 })}</span>
            </div>
            <div class="fav-products__list-item p-2.5 px-3 rounded-md cursor-pointer transition-[background] duration-150 hover:bg-surface-raised">
              <span class="block text-sm font-semibold text-text-primary">${t('favorites.ungrouped')}</span>
              <span class="block text-xs text-text-tertiary mt-0.5" id="fav-ungrouped-count">${t('favorites.itemCount', { count: 0 })}</span>
            </div>
          </div>
        </aside>
        <div class="flex-1 min-w-0" id="fav-products-container">
          <!-- Populated via JS -->
          ${renderEmptyState()}
        </div>
      </div>
    </div>

    <!-- Tab: Tedarikçiler -->
    <div class="fav-tab-content" data-content="fav-suppliers">
      ${renderEmptyState()}
    </div>

    <!-- Modal: Yeni liste ekle -->
    <div class="fav-modal hidden fixed inset-0 z-[9999] items-center justify-center" id="fav-list-modal">
      <div class="fav-modal__overlay absolute inset-0 bg-black/45"></div>
      <div class="relative bg-surface rounded-xl w-[440px] max-w-[calc(100vw-32px)] shadow-[0_20px_60px_rgba(0,0,0,0.2)] animate-[favModalIn_200ms_ease-out]">
        <div class="flex items-center justify-between px-6 pt-5 pb-4">
          <h3 class="text-lg font-bold text-text-primary">${t('favorites.addNewList')}</h3>
          <button class="fav-modal__close bg-transparent border-none cursor-pointer p-1 rounded flex items-center justify-center transition-[background] duration-150 hover:bg-surface-raised" aria-label="${t('common.close')}">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M14 4L4 14M4 4l10 10" stroke="#333" stroke-width="1.8" stroke-linecap="round"/></svg>
          </button>
        </div>
        <div class="px-6 pb-5">
          <div class="relative">
            <input type="text" class="fav-modal__input w-full py-3 pr-[50px] pl-3.5 text-sm border border-border-strong rounded-[20px] outline-none text-text-primary transition-[border-color] duration-150 focus:border-secondary-800 placeholder:text-text-tertiary" placeholder="${t('favorites.enterName')}" maxlength="20" id="fav-list-input" />
            <span class="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-text-tertiary"><span id="fav-char-count">0</span>/20</span>
          </div>
        </div>
        <div class="flex justify-center gap-4 px-6 pb-6">
          <button class="fav-modal__btn--cancel py-2.5 px-8 text-sm font-medium rounded-[20px] cursor-pointer transition-all duration-150 bg-surface text-text-secondary border border-border-strong hover:border-secondary-400">${t('common.cancel')}</button>
          <button class="fav-modal__btn--save th-btn th-btn-pill" disabled>${t('common.save')}</button>
        </div>
      </div>
    </div>
  `;
}

function renderBrowsingHistory(): string {
  const productCards = BROWSING_PRODUCTS.map(p => `
    <a href="#" class="group flex flex-col no-underline text-inherit transition-transform duration-150 hover:-translate-y-0.5">
      <div class="w-full aspect-square rounded-lg overflow-hidden border border-[#f0f0f0] mb-2.5">
        <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]" loading="lazy" />
      </div>
      <h4 class="text-[13px] text-text-secondary leading-[1.4] line-clamp-2 mb-1.5" title="${p.title}">${p.title}</h4>
      <p class="text-sm font-bold text-text-primary mb-0.5">${formatPrice(p.priceRange)}</p>
      <p class="text-xs text-text-tertiary">${p.minOrder}</p>
    </a>
  `).join('');

  return `
    <div class="px-7 pt-6 max-sm:px-3 max-sm:pt-4">
      <h1 class="text-xl font-bold text-text-primary">${t('favorites.browsingHistoryTitle')}</h1>
      <p class="text-sm text-text-tertiary mt-1">${t('favorites.browsingHistoryDesc')}</p>
    </div>
    <div class="grid grid-cols-5 gap-4 px-7 py-5 pb-7 max-md:grid-cols-2 max-md:p-4 max-sm:grid-cols-2 max-sm:gap-3 max-sm:p-3 max-lg:min-[769px]:grid-cols-3">
      ${productCards}
    </div>
  `;
}

/* ────────────────────────────────────────
   SECTION MAP
   ──────────────────────────────────────── */
const SECTIONS: Record<string, () => string> = {
  'favorites': renderFavorites,
  'browsing-history': renderBrowsingHistory,
};

function getActiveSection(): string {
  const hash = window.location.hash.replace('#', '');
  return SECTIONS[hash] ? hash : 'favorites';
}

/* ────────────────────────────────────────
   MAIN LAYOUT
   ──────────────────────────────────────── */
export function FavoritesLayout(): string {
  const activeId = getActiveSection();
  const renderFn = SECTIONS[activeId] ?? renderFavorites;

  return `
    <div class="bg-surface rounded-lg min-h-[600px]" id="fav-content">
      ${renderFn()}
    </div>
  `;
}

/* ────────────────────────────────────────
   INIT
   ──────────────────────────────────────── */
export function initFavoritesLayout(): void {
  const contentEl = document.getElementById('fav-content');
  if (!contentEl) return;

  function navigate(): void {
    const activeId = getActiveSection();
    const renderFn = SECTIONS[activeId] ?? renderFavorites;
    contentEl!.innerHTML = renderFn();
    initFavTabs();
    initFavListModal();
  }

  window.addEventListener('hashchange', navigate);

  // Init for initial render
  initFavTabs();
  initFavListModal();
  loadFavoritesData();
}

function loadFavoritesData(): void {
  try {
    const stored = localStorage.getItem('tradehub-favorites');
    if (!stored) return;
    const items = JSON.parse(stored);

    // Update counts
    const countText = t('favorites.itemCount', { count: items.length });
    const allCount = document.getElementById('fav-all-count');
    const ungroupedCount = document.getElementById('fav-ungrouped-count');
    if (allCount) allCount.textContent = countText;
    if (ungroupedCount) ungroupedCount.textContent = countText;

    // Render products
    const container = document.getElementById('fav-products-container');
    if (!container) return;

    if (items.length > 0) {
      container.classList.remove('flex', 'items-center', 'justify-center');
      const cards = items.map((p: any) => `
        <div class="relative bg-white rounded-lg border border-[#eee] hover:border-[#F60] hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-all p-4 group">
          <div class="absolute top-2 right-2 w-8 h-8 rounded-full bg-[#f4f4f4] flex items-center justify-center cursor-pointer hover:bg-[#e0e0e0] z-10 transition-colors">
            <svg class="w-[18px] h-[18px] text-[#f60]" viewBox="0 0 1024 1024" fill="currentColor"><path d="M512 884.2l-47.6-43.2C130.4 537.4 32 448 32 334.8 32 242.2 104.6 170 197.6 170c52.6 0 102.8 24.6 135.2 62.8C365.2 194.6 415.4 170 468 170c93 0 165.6 72.2 165.6 164.8 0 113.2-98.4 202.6-432.4 506.2L512 884.2zm-289.4-48l241.8 219.8L706.2 836.2C850 705.8 928 642 928 554c0-54.6-41.4-96-96-96-33.8 0-66.2 17.6-86.8 45.4l-39 52.8-39-52.8C646.6 475.6 614.2 458 580.4 458c-54.6 0-96 41.4-96 96 0 88 78 151.8 221.8 282.2zM276.4 52.6c80.8 0 156.4 39.4 203.2 101.8 46.8-62.4 122.4-101.8 203.2-101.8 141.6 0 252.8 111.4 252.8 252.6 0 178-154 316.4-388.6 529.6l-67.4 61-67.4-61c-234.6-213.2-388.6-351.6-388.6-529.6 0-141.2 111.2-252.6 252.8-252.6z" /></svg>
          </div>
          <a href="#" class="block no-underline">
            <div class="w-full aspect-square rounded overflow-hidden mb-3 bg-[#f5f5f5]">
              <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover mix-blend-multiply" loading="lazy" />
            </div>
            <h4 class="text-[13px] font-normal text-[#333] leading-[18px] line-clamp-2 mb-2 group-hover:text-[#F60] transition-colors">${p.title}</h4>
            <div class="flex items-baseline gap-1 mb-1">
              <span class="text-[16px] font-[700] text-[#111] leading-none">${formatPrice(p.priceRange)}</span>
            </div>
            <p class="text-[12px] text-[#999] opacity-80">${p.minOrder}</p>
          </a>
          <div class="mt-4 flex gap-2 w-full pt-3 border-t border-[#f2f2f2] opacity-0 group-hover:opacity-100 transition-opacity">
            <button class="flex-1 th-btn th-btn-pill th-btn-sm">${t('favorites.orderNow')}</button>
            <button class="w-8 h-8 rounded-full border border-[#e5e7eb] flex items-center justify-center text-[#666] hover:text-[#333] hover:border-[#d1d5db] transition-colors">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            </button>
          </div>
        </div>
      `).join('');

      container.innerHTML = `
        <div class="px-7 pt-5 pb-7 max-sm:px-3">
          <div class="flex items-center justify-between mb-4">
               <h2 class="text-[18px] font-bold text-text-primary">${t('favorites.products')}</h2>
               <div class="flex items-center gap-2">
                 <button class="px-3 py-1 bg-surface-raised border border-border-default rounded text-[13px] text-text-secondary hover:bg-[#f0f0f0]">${t('favorites.sortBy')}</button>
                 <button class="w-8 h-8 rounded bg-surface-raised border border-border-default flex items-center justify-center hover:bg-[#f0f0f0]">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>
                 </button>
               </div>
          </div>
          <div class="grid grid-cols-4 gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2">
            ${cards}
          </div>
        </div>
      `;
    }
  } catch (error) { }
}

function initFavTabs(): void {
  document.querySelectorAll<HTMLElement>('.fav-tabs').forEach(tabGroup => {
    const tabs = tabGroup.querySelectorAll<HTMLButtonElement>('.fav-tabs__tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.tab;
        if (!targetId) return;

        // Reset all tabs
        tabs.forEach(t => {
          t.classList.remove('fav-tabs__tab--active');
          t.style.color = '';
          t.style.fontWeight = '';
          t.style.borderBottomColor = 'transparent';
        });
        // Activate clicked tab
        tab.classList.add('fav-tabs__tab--active');
        tab.style.fontWeight = '600';
        tab.style.borderBottomColor = '#222';

        const parent = tabGroup.parentElement;
        if (!parent) return;
        parent.querySelectorAll<HTMLElement>('.fav-tab-content').forEach(panel => {
          const isActive = panel.dataset.content === targetId;
          panel.classList.toggle('fav-tab-content--active', isActive);
          panel.style.display = isActive ? 'block' : 'none';
        });
      });
    });

    // Set initial active tab style
    const activeTab = tabGroup.querySelector<HTMLButtonElement>('.fav-tabs__tab--active');
    if (activeTab) {
      activeTab.style.fontWeight = '600';
      activeTab.style.borderBottomColor = '#222';
    }
  });

  // List item switching
  const listItems = document.querySelectorAll<HTMLElement>('.fav-products__list-item');
  listItems.forEach(item => {
    item.addEventListener('click', () => {
      listItems.forEach(i => i.classList.remove('fav-products__list-item--active', 'bg-surface-raised'));
      item.classList.add('fav-products__list-item--active', 'bg-surface-raised');
    });
  });
}

function initFavListModal(): void {
  const modal = document.getElementById('fav-list-modal');
  if (!modal) return;

  const overlay = modal.querySelector<HTMLElement>('.fav-modal__overlay');
  const closeBtn = modal.querySelector<HTMLButtonElement>('.fav-modal__close');
  const cancelBtn = modal.querySelector<HTMLButtonElement>('.fav-modal__btn--cancel');
  const saveBtn = modal.querySelector<HTMLButtonElement>('.fav-modal__btn--save');
  const input = document.getElementById('fav-list-input') as HTMLInputElement | null;
  const counter = document.getElementById('fav-char-count');

  function openModal(): void {
    modal!.classList.remove('hidden');
    modal!.classList.add('flex');
    document.body.style.overflow = 'hidden';
    input?.focus();
  }

  function closeModal(): void {
    modal!.classList.add('hidden');
    modal!.classList.remove('flex');
    document.body.style.overflow = '';
    if (input) { input.value = ''; }
    if (counter) { counter.textContent = '0'; }
    if (saveBtn) { saveBtn.disabled = true; }
  }

  // Open modal from "Bir liste oluştur" link
  document.querySelector<HTMLElement>('[data-action="create-list"]')?.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  overlay?.addEventListener('click', closeModal);
  closeBtn?.addEventListener('click', closeModal);
  cancelBtn?.addEventListener('click', closeModal);

  // Character counter + save button state
  input?.addEventListener('input', () => {
    const len = input.value.length;
    if (counter) counter.textContent = String(len);
    if (saveBtn) saveBtn.disabled = len === 0;
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal!.classList.contains('hidden')) {
      closeModal();
    }
  });
}
