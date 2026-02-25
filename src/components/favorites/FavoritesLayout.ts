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

function renderFavorites(): string {
  return `
    <div class="fav-page__header">
      <h1 class="fav-page__title">Sık kullanılanlar</h1>
    </div>

    <div class="fav-tabs" data-tabgroup="fav">
      <button class="fav-tabs__tab fav-tabs__tab--active" data-tab="fav-products">Ürünler</button>
      <button class="fav-tabs__tab" data-tab="fav-suppliers">Tedarikçiler</button>
    </div>

    <!-- Tab: Ürünler -->
    <div class="fav-tab-content fav-tab-content--active" data-content="fav-products">
      <div class="fav-products">
        <aside class="fav-products__sidebar">
          <h3 class="fav-products__list-title">Listem</h3>
          <a href="#" class="fav-products__create-link" data-action="create-list">Bir liste oluştur</a>
          <div class="fav-products__list-items">
            <div class="fav-products__list-item fav-products__list-item--active">
              <span class="fav-products__list-name">All</span>
              <span class="fav-products__list-count">0 öğeleri</span>
            </div>
            <div class="fav-products__list-item">
              <span class="fav-products__list-name">Ungrouped</span>
              <span class="fav-products__list-count">0 öğeleri</span>
            </div>
          </div>
        </aside>
        <div class="fav-products__content">
          <div class="fav-empty">
            ${FAVORITES_EMPTY_SVG}
            <h3 class="fav-empty__title">Favori ürününüz yok</h3>
            <p class="fav-empty__desc">Beğendiğiniz ama satın almaya hazır olmayan bir şey görüyor musunuz?<br/>favorilerinizde sizin için tasarruf edeceğiz</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab: Tedarikçiler -->
    <div class="fav-tab-content" data-content="fav-suppliers">
      <div class="fav-empty">
        ${FAVORITES_EMPTY_SVG}
        <h3 class="fav-empty__title">Favori ürününüz yok</h3>
        <p class="fav-empty__desc">Beğendiğiniz ama satın almaya hazır olmayan bir şey görüyor musunuz?<br/>favorilerinizde sizin için tasarruf edeceğiz</p>
      </div>
    </div>

    <!-- Modal: Yeni liste ekle -->
    <div class="fav-modal" id="fav-list-modal">
      <div class="fav-modal__overlay"></div>
      <div class="fav-modal__dialog">
        <div class="fav-modal__header">
          <h3 class="fav-modal__title">Yeni liste ekle</h3>
          <button class="fav-modal__close" aria-label="Kapat">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M14 4L4 14M4 4l10 10" stroke="#333" stroke-width="1.8" stroke-linecap="round"/></svg>
          </button>
        </div>
        <div class="fav-modal__body">
          <div class="fav-modal__input-wrap">
            <input type="text" class="fav-modal__input" placeholder="Giriş adı" maxlength="20" id="fav-list-input" />
            <span class="fav-modal__counter"><span id="fav-char-count">0</span>/20</span>
          </div>
        </div>
        <div class="fav-modal__footer">
          <button class="fav-modal__btn fav-modal__btn--cancel">iptal et</button>
          <button class="fav-modal__btn fav-modal__btn--save" disabled>Kaydet</button>
        </div>
      </div>
    </div>
  `;
}

function renderBrowsingHistory(): string {
  const productCards = BROWSING_PRODUCTS.map(p => `
    <a href="#" class="bh-card">
      <div class="bh-card__image-wrap">
        <img src="${p.image}" alt="${p.title}" class="bh-card__image" loading="lazy" />
      </div>
      <h4 class="bh-card__title" title="${p.title}">${p.title}</h4>
      <p class="bh-card__price">${p.priceRange}</p>
      <p class="bh-card__min-order">${p.minOrder}</p>
    </a>
  `).join('');

  return `
    <div class="fav-page__header">
      <h1 class="fav-page__title">Göz atma geçmişinizden esinlendik</h1>
      <p class="fav-page__subtitle">Son üç aya ait göz atma geçmişiniz</p>
    </div>
    <div class="bh-grid">
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
    <div class="fav-page" id="fav-content">
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

        tabs.forEach(t => t.classList.remove('fav-tabs__tab--active'));
        tab.classList.add('fav-tabs__tab--active');

        const parent = tabGroup.parentElement;
        if (!parent) return;
        parent.querySelectorAll<HTMLElement>('.fav-tab-content').forEach(panel => {
          panel.classList.toggle('fav-tab-content--active', panel.dataset.content === targetId);
        });
      });
    });
  });

  // List item switching
  const listItems = document.querySelectorAll<HTMLElement>('.fav-products__list-item');
  listItems.forEach(item => {
    item.addEventListener('click', () => {
      listItems.forEach(i => i.classList.remove('fav-products__list-item--active'));
      item.classList.add('fav-products__list-item--active');
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
    modal!.classList.add('fav-modal--open');
    document.body.style.overflow = 'hidden';
    input?.focus();
  }

  function closeModal(): void {
    modal!.classList.remove('fav-modal--open');
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
    if (e.key === 'Escape' && modal!.classList.contains('fav-modal--open')) {
      closeModal();
    }
  });
}
