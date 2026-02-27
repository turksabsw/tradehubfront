/**
 * FavoritesLayout Component
 * Two hash-based views: #favorites (default) and #browsing-history.
 * Favorites: tabs (Ürünler/Tedarikçiler), list sidebar, empty state, "Yeni liste ekle" modal
 * Browsing History: 5-column product grid with mock data
 */

import favEmptySvg from '../../assets/images/O1CN01Bny3KU1Swwfj3Ntma_!!6000000002312-55-tps-222-221.svg';

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
    title: 'Özel logo profesyonel kalın köpük yastıklı su geçirmez elektrik bas gitar çantası',
    priceRange: '$15,90-19,90',
    minOrder: 'Min. sipariş: 3 Adet',
  },
  {
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    title: 'Rusya açık taktik eğitim botları klasik tarzı deri su geçirmez spor dağ yürüyüşü',
    priceRange: '$14,22-18,81',
    minOrder: 'Min. sipariş: 2 Adet',
  },
  {
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop',
    title: 'Özel Logolu Taşınabilir Açık Hava Katlanabilir El Arabası Metal Plaj Arabası',
    priceRange: '$24,99-26,99',
    minOrder: 'Min. sipariş: 100 Adet',
  },
  {
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop',
    title: 'Özel Logo baskılı eko geri dönüşümlü yeniden kullanılabilir düz pamuklu çanta',
    priceRange: '$1,20-3,50',
    minOrder: 'Min. sipariş: 50 Adet',
  },
  {
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=300&h=300&fit=crop',
    title: 'Yeni sıcak satış bayanlar çanta çapraz vücut tasarımcı kadın tote çanta',
    priceRange: '$8,50-12,90',
    minOrder: 'Min. sipariş: 1 Adet',
  },
  {
    image: 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=300&h=300&fit=crop',
    title: 'Sonbahar Kış Kadın Üç Askılı Fermuarlı Büyük Kapasiteli Sınır Ötesi Sırt Çantası',
    priceRange: '$6,43-6,86',
    minOrder: 'Min. sipariş: 2 Adet',
  },
  {
    image: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=300&h=300&fit=crop',
    title: "Hong'ao Moda Unisex Günlük Kalın Naylon Fermuarlı Bez Çanta Seyahat Çantası",
    priceRange: '$4-5',
    minOrder: 'Min. sipariş: 100 Poşet',
  },
  {
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop',
    title: 'Erkek Nefes Alabilen Boy Uzatıcı Yumuşak Yastıklı Moda Açık Hava Spor Ayakkabı',
    priceRange: '$14,31-15,90',
    minOrder: 'Min. sipariş: 12 Çift',
  },
  {
    image: 'https://images.unsplash.com/photo-1605733513597-a8f8341084e6?w=300&h=300&fit=crop',
    title: 'Erkek hafif açık ayakkabı deri aşınmaya dayanıklı yürüyüş botları',
    priceRange: '$15,80-16,90',
    minOrder: 'Min. sipariş: 2 Çift',
  },
  {
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=300&fit=crop',
    title: 'Toptan son tasarım savaş spor ayakkabıları erkek açık spor koşu ayakkabısı',
    priceRange: '$13,65-15,65',
    minOrder: 'Min. sipariş: 1 Çift',
  },
];

/* ────────────────────────────────────────
   EMPTY STATE ILLUSTRATION
   ──────────────────────────────────────── */
const FAVORITES_EMPTY_SVG = `<img src="${favEmptySvg}" alt="Favori ürününüz yok" width="160" height="160" />`;

/* ────────────────────────────────────────
   SECTION RENDERERS
   ──────────────────────────────────────── */

function renderEmptyState(): string {
  return `
    <div class="flex flex-col items-center text-center py-15 px-5">
      <div class="mb-5">${FAVORITES_EMPTY_SVG}</div>
      <h3 class="text-base font-bold text-text-primary mb-2.5">Favori ürününüz yok</h3>
      <p class="text-sm text-text-tertiary leading-relaxed max-w-[380px]">Beğendiğiniz ama satın almaya hazır olmayan bir şey görüyor musunuz?<br/>favorilerinizde sizin için tasarruf edeceğiz</p>
    </div>
  `;
}

function renderFavorites(): string {
  return `
    <div class="px-7 pt-6 max-sm:px-3 max-sm:pt-4">
      <h1 class="text-xl font-bold text-text-primary">Sık kullanılanlar</h1>
    </div>

    <div class="fav-tabs flex px-7 max-sm:px-3 border-b border-border-default mt-4" data-tabgroup="fav">
      <button class="fav-tabs__tab fav-tabs__tab--active py-3 px-5 text-sm font-medium text-text-secondary bg-transparent border-none border-b-3 border-transparent cursor-pointer transition-[color,border-color] duration-150 -mb-px hover:text-text-primary" data-tab="fav-products">Ürünler</button>
      <button class="fav-tabs__tab py-3 px-5 text-sm font-medium text-text-secondary bg-transparent border-none border-b-3 border-transparent cursor-pointer transition-[color,border-color] duration-150 -mb-px hover:text-text-primary" data-tab="fav-suppliers">Tedarikçiler</button>
    </div>

    <!-- Tab: Ürünler -->
    <div class="fav-tab-content fav-tab-content--active" data-content="fav-products">
      <div class="fav-products flex min-h-[400px] max-md:flex-col">
        <aside class="fav-products__sidebar w-60 shrink-0 py-5 px-6 border-r border-[#f0f0f0] max-md:w-full max-md:border-r-0 max-md:border-b max-md:border-[#f0f0f0]">
          <h3 class="text-base font-bold text-text-primary mb-2.5">Listem</h3>
          <a href="#" class="text-sm text-text-primary font-semibold underline underline-offset-2 hover:text-primary-500" data-action="create-list">Bir liste oluştur</a>
          <div class="mt-4 flex flex-col gap-0.5">
            <div class="fav-products__list-item fav-products__list-item--active p-2.5 px-3 rounded-md cursor-pointer transition-[background] duration-150 bg-surface-raised hover:bg-surface-raised">
              <span class="block text-sm font-semibold text-text-primary">All</span>
              <span class="block text-xs text-text-tertiary mt-0.5">0 öğeleri</span>
            </div>
            <div class="fav-products__list-item p-2.5 px-3 rounded-md cursor-pointer transition-[background] duration-150 hover:bg-surface-raised">
              <span class="block text-sm font-semibold text-text-primary">Ungrouped</span>
              <span class="block text-xs text-text-tertiary mt-0.5">0 öğeleri</span>
            </div>
          </div>
        </aside>
        <div class="flex-1 min-w-0 flex items-center justify-center">
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
          <h3 class="text-lg font-bold text-text-primary">Yeni liste ekle</h3>
          <button class="fav-modal__close bg-transparent border-none cursor-pointer p-1 rounded flex items-center justify-center transition-[background] duration-150 hover:bg-surface-raised" aria-label="Kapat">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M14 4L4 14M4 4l10 10" stroke="#333" stroke-width="1.8" stroke-linecap="round"/></svg>
          </button>
        </div>
        <div class="px-6 pb-5">
          <div class="relative">
            <input type="text" class="fav-modal__input w-full py-3 pr-[50px] pl-3.5 text-sm border border-border-strong rounded-[20px] outline-none text-text-primary transition-[border-color] duration-150 focus:border-secondary-800 placeholder:text-text-tertiary" placeholder="Giriş adı" maxlength="20" id="fav-list-input" />
            <span class="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-text-tertiary"><span id="fav-char-count">0</span>/20</span>
          </div>
        </div>
        <div class="flex justify-center gap-4 px-6 pb-6">
          <button class="fav-modal__btn--cancel py-2.5 px-8 text-sm font-medium rounded-[20px] cursor-pointer transition-all duration-150 bg-surface text-text-secondary border border-border-strong hover:border-secondary-400">iptal et</button>
          <button class="fav-modal__btn--save py-2.5 px-8 text-sm font-medium rounded-[20px] cursor-pointer transition-all duration-150 bg-surface text-text-tertiary border border-border-default disabled:opacity-100 enabled:bg-primary-500 enabled:text-white enabled:border-primary-500 enabled:hover:bg-[#EA580C]" disabled>Kaydet</button>
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
      <p class="text-sm font-bold text-text-primary mb-0.5">${p.priceRange}</p>
      <p class="text-xs text-text-tertiary">${p.minOrder}</p>
    </a>
  `).join('');

  return `
    <div class="px-7 pt-6 max-sm:px-3 max-sm:pt-4">
      <h1 class="text-xl font-bold text-text-primary">Göz atma geçmişinizden esinlendik</h1>
      <p class="text-sm text-text-tertiary mt-1">Son üç aya ait göz atma geçmişiniz</p>
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
