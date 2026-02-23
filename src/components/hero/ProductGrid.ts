/**
 * ProductGrid Component
 * Snapshot-matched Alibaba card structure (hFR19 / card2.md) with dynamic content.
 */

interface ProductCard {
  name: string;
  href: string;
  price: string;
  discount?: string;
  moq: string;
  sold: string;
  imageSrc: string;
  supplierYears?: string;
  supplierCountry?: string;
}

const productCardSeed: ProductCard[] = [
  {
    name: "Custom Beanie Patch Hat | Leather Patch Winter Beanie ADD YOUR LOGO Company Employee...",
    href: '/product-detail.html',
    price: '$1.28-2.99',
    discount: '%15 indirim',
    moq: '10 Adet',
    sold: '19,070 adet satıldı',
    imageSrc: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=600&q=80',
    supplierYears: '5 yıl',
    supplierCountry: 'CN',
  },
  {
    name: 'New Wireless TWS M10 Mini Black Earbuds Earphone Headphone Power Bank In-ear...',
    href: '/product-detail.html',
    price: '$1.30-1.99',
    discount: '%10 indirim',
    moq: '1 Adet',
    sold: '341 adet satıldı',
    imageSrc: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=600&h=600&q=80',
    supplierYears: '1 yıl',
    supplierCountry: 'CN',
  },
  {
    name: "Hot Sale 125ml High Quality Men's Perfume Floral Fragrance Light and Long Lasting Factory...",
    href: '/product-detail.html',
    price: '$6.02-7.02',
    moq: '10 Adet',
    sold: '490 adet satıldı',
    imageSrc: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&h=600&q=80',
    supplierYears: '1 yıl',
    supplierCountry: 'CN',
  },
  {
    name: 'Free to Door DHL FEDEX UPS Express Sea Railway Air Shipping Agent China to Egypt Freight...',
    href: '/product-detail.html',
    price: '$0.50-1',
    discount: '%5 indirim',
    moq: '1 Kilogram',
    sold: '880 adet satıldı',
    imageSrc: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&h=600&q=80',
    supplierYears: '1 yıl',
    supplierCountry: 'CN',
  },
  {
    name: 'Cross-Border New Style Cat-Eye Glasses Frame Fashion Eyewear...',
    href: '/product-detail.html',
    price: '$1.53-1.62',
    discount: '%8 indirim',
    moq: '5 Adet',
    sold: '649 adet satıldı',
    imageSrc: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&h=600&q=80',
    supplierYears: '1 yıl',
    supplierCountry: 'CN',
  },
  {
    name: "MORESE 2085 Men's Optical Eyeglasses Frame Full Rim...",
    href: '/product-detail.html',
    price: '$3.65-4.05',
    moq: '2 Adet',
    sold: '228 adet satıldı',
    imageSrc: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&h=600&q=80',
    supplierYears: '7 yıl',
    supplierCountry: 'CN',
  },
  {
    name: '2026 New Smart Fitness Watch Waterproof Touch Screen Men Women...',
    href: '/product-detail.html',
    price: '$4.10-5.90',
    discount: '%12 indirim',
    moq: '2 Adet',
    sold: '1,102 adet satıldı',
    imageSrc: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&h=600&q=80',
    supplierYears: '3 yıl',
    supplierCountry: 'CN',
  },
  {
    name: 'Wholesale Mini Crossbody Bag PU Leather Casual Fashion Design...',
    href: '/product-detail.html',
    price: '$2.10-3.40',
    moq: '20 Adet',
    sold: '2,345 adet satıldı',
    imageSrc: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&h=600&q=80',
    supplierYears: '2 yıl',
    supplierCountry: 'CN',
  },
  {
    name: 'Oversized Cotton Streetwear Blank T-Shirt Custom Logo Printing...',
    href: '/product-detail.html',
    price: '$2.60-3.20',
    discount: '%10 indirim',
    moq: '30 Adet',
    sold: '978 adet satıldı',
    imageSrc: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&h=600&q=80',
    supplierYears: '4 yıl',
    supplierCountry: 'CN',
  },
  {
    name: 'Wireless Bluetooth Stereo Headphones Foldable Deep Bass Sound...',
    href: '/product-detail.html',
    price: '$5.30-7.20',
    moq: '5 Adet',
    sold: '413 adet satıldı',
    imageSrc: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80',
    supplierYears: '1 yıl',
    supplierCountry: 'CN',
  },
  {
    name: 'Private Label Skincare Moisturizing Essence Serum Set OEM...',
    href: '/product-detail.html',
    price: '$3.90-6.50',
    discount: '%20 indirim',
    moq: '12 Adet',
    sold: '752 adet satıldı',
    imageSrc: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&h=600&q=80',
    supplierYears: '2 yıl',
    supplierCountry: 'CN',
  },
  {
    name: 'Premium Optical Frames With Case Lightweight Business Style...',
    href: '/product-detail.html',
    price: '$2.95-3.88',
    moq: '6 Adet',
    sold: '529 adet satıldı',
    imageSrc: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&h=600&q=80',
    supplierYears: '5 yıl',
    supplierCountry: 'CN',
  },
];

function lensIcon(): string {
  return `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <path d="M3 9a2 2 0 0 1 2-2h2l1-2h8l1 2h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  `;
}

function renderProductCard(card: ProductCard, index: number): string {
  const safeName = card.name.replace(/"/g, '&quot;');

  return `
    <a
      class="hFR19"
      href="${card.href}"
      target="_blank"
      data-spm="card-${index}"
      pos="${index}"
      scenename="just_for_you"
      aria-label="${safeName}"
    >
      <!-- Image area -->
      <div class="uE82p">
        <div class="rcEIR gT6Yt">
          <img
            class="kRa33"
            src="${card.imageSrc}"
            alt="${safeName}"
            loading="lazy"
          />
        </div>
        <div class="searchx-find-similar__wrapper ya497">
          <div
            class="searchx-find-similar searchx-find-similar__icon theme-float"
            role="button"
            aria-label="Benzer ürünleri bulun"
            tabindex="0"
          >
            ${lensIcon()}
          </div>
        </div>
      </div>

      <!-- Content area -->
      <div class="sZpNS">
        <div class="th-hfr19-stack">
          <!-- Title (3 lines) -->
          <div class="u1SHv Cye1T">
            <div class="iyDLA" style="--lines: 3;">
              <span title="${safeName}">${card.name}</span>
            </div>
          </div>

          <div class="th-hfr19-stack-compact">
            <!-- Price + discount -->
            <div class="XBlq6 e9DGa">
              <div class="R3Kcz eg6xk">${card.price}</div>
              ${card.discount ? `<div class="YGd3t vE7bg">${card.discount}</div>` : ''}
            </div>

            <!-- MOQ + sold -->
            <div class="iyDLA yUble" style="--lines: 1;">
              <div class="hVMAV z5oZw"><bdi>${card.moq}</bdi></div>
              <span class="mHuc8" title="${card.sold}">${card.sold}</span>
            </div>

            <!-- Supplier info -->
            <div class="YpiVg">
              ${card.supplierYears ? `<span class="wELvB">${card.supplierYears}</span>` : ''}
              ${card.supplierCountry ? `<span class="wELvB">${card.supplierCountry}</span>` : ''}
            </div>
          </div>
        </div>
      </div>
    </a>
  `;
}

/** No-op — ProductGrid uses CSS grid, no JS initialization needed. */
export function initProductGrid(): void { }

export function ProductGrid(): string {
  return `
    <section
      data-theme-section="productgrid"
      aria-label="Recommended Products"
      style="background-color: var(--product-bg, #f4f4f4); padding-top: 28px; padding-bottom: 28px;"
    >
      <div class="container-wide">
        <div class="grid product-grid home-product-grid" style="gap: var(--product-grid-gap, 8px);" role="list" aria-label="Product listings">
          ${productCardSeed.map((card, index) => renderProductCard(card, index)).join('')}
        </div>
      </div>
    </section>
  `;
}
