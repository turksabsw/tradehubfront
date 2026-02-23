/**
 * ProductInfo Component
 * Right sticky card (Alibaba layout-stick style).
 * Contains: price tiers, variations, shipping, CTAs.
 */

import { mockProduct } from '../../data/mockProduct';
import type { PriceTier, ProductVariant } from '../../types/product';
import { openShippingModal } from './CartDrawer';

function renderPriceTiers(tiers: PriceTier[]): string {
  return `
    <div id="pd-price-tiers">
      ${tiers.map((tier, i) => {
        const qtyLabel = tier.maxQty
          ? `${tier.minQty} - ${tier.maxQty} ${mockProduct.unit}`
          : `>= ${tier.minQty} ${mockProduct.unit}`;
        return `
          <div class="pd-price-tier ${i === 0 ? 'active' : ''}" data-tier-index="${i}">
            <span class="pd-price-tier-qty">${qtyLabel}</span>
            <span class="pd-price-tier-price">$${tier.price.toFixed(2)}</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderVariant(variant: ProductVariant): string {
  const selectedOpt = variant.options.find(o => o.available) || variant.options[0];

  if (variant.type === 'color') {
    return `
      <div class="variant-group" data-variant-type="${variant.type}">
        <h4 class="pd-variant-label"><strong>${variant.label}:</strong> ${selectedOpt.label}</h4>
        <div class="pd-color-thumbs">
          ${variant.options.map((opt, i) => `
            <button
              type="button"
              class="variant-option pd-color-thumb ${i === 0 && opt.available ? 'active' : ''} ${opt.available ? '' : 'pd-color-thumb-disabled'}"
              data-variant-id="${opt.id}"
              ${opt.available ? '' : 'disabled'}
              aria-label="${opt.label}"
              title="${opt.label}"
            >
              <img src="${opt.thumbnail || ''}" alt="${opt.label}" style="background:${opt.value};">
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  return `
    <div class="variant-group" data-variant-type="${variant.type}">
      <h4 class="pd-variant-label"><strong>${variant.label}:</strong> ${selectedOpt.label}</h4>
      <div class="flex flex-wrap gap-2 mt-2">
        ${variant.options.map((opt, i) => `
          <button
            type="button"
            class="variant-option pd-variant-btn ${i === 0 && opt.available ? 'active' : ''} ${opt.available ? '' : 'opacity-40 cursor-not-allowed'}"
            data-variant-id="${opt.id}"
            ${opt.available ? '' : 'disabled'}
          >
            ${opt.label}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

export function ProductInfo(): string {
  const p = mockProduct;

  return `
    <div id="product-info">
      <div id="pd-info-scrollable">
        <!-- Wholesale / Customization Tabs -->
        <div id="pd-card-tabs">
          <button type="button" class="pd-card-tab active">Toptan Satış</button>
          <button type="button" class="pd-card-tab">Özelleştirme</button>
        </div>

        <!-- Ready to Ship Badge -->
        <span id="pd-ready-badge" class="th-badge">Sevkiyata Hazır</span>

        <!-- Price Tiers -->
        ${renderPriceTiers(p.priceTiers)}

        <!-- Sample Price -->
        <div id="pd-sample-price">
          <div class="pd-sample-left">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
            <span>Numune fiyatı: <strong>$${p.samplePrice?.toFixed(2) ?? '30.00'}</strong></span>
          </div>
          <button type="button" class="pd-sample-btn">Numune Al</button>
        </div>

        <!-- Variations Header -->
        <div id="pd-variations-section">
          <div class="pd-section-header">
            <h3>Varyantlar</h3>
            <a href="#" class="pd-select-now">Seçim yap</a>
          </div>

          <!-- Variant Groups -->
          ${p.variants.map(v => renderVariant(v)).join('')}
        </div>

        <!-- Supplier Customization -->
        <div class="pd-info-section">
          <h3 class="pd-section-title">
            Tedarikçi Özelleştirme
            <span class="pd-verified-badge">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" style="color: #16a34a;"><path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/></svg>
              Verified
            </span>
          </h3>
          <ul class="pd-customization-list">
            <li>Çizim bazlı özelleştirme</li>
            <li>Numune bazlı özelleştirme</li>
            <li>Tam özelleştirme (OEM/ODM)</li>
          </ul>
        </div>

        <!-- Shipping -->
        <div class="pd-info-section">
          <h3 class="pd-section-title">Kargo</h3>
          <div class="pd-shipping-card" id="pd-shipping-card">
            <div class="pd-shipping-card-left">
              <span class="pd-shipping-card-method" id="pd-ship-card-method">${p.shipping[0].method}</span>
              <span class="pd-shipping-card-detail">Kargo: ${p.shipping[0].cost} · ${p.shipping[0].estimatedDays}</span>
            </div>
            <a href="javascript:void(0)" class="pd-shipping-card-change" id="pd-ship-card-change">Değiştir ›</a>
          </div>
        </div>

        <!-- Trade Assurance / Order Protection -->
        <div id="pd-trade-assurance">
          <div class="pd-ta-header">
            <h4>
              <svg viewBox="0 0 20 20" fill="currentColor" style="color:#16a34a; width:16px; height:16px;"><path fill-rule="evenodd" d="M10 1a.75.75 0 01.65.378l1.855 3.27 3.69.53a.75.75 0 01.416 1.279l-2.668 2.6.63 3.67a.75.75 0 01-1.088.79L10 11.347l-3.485 1.832a.75.75 0 01-1.088-.79l.63-3.67-2.668-2.6a.75.75 0 01.416-1.28l3.69-.53L9.35 1.379A.75.75 0 0110 1z" clip-rule="evenodd"/></svg>
              iSTOC Sipariş Koruma
            </h4>
            <svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"/></svg>
          </div>

          <div class="pd-ta-item">
            <svg class="pd-ta-item-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/></svg>
            <div class="pd-ta-item-content">
              <h5>Güvenli Ödeme</h5>
              <p>Her ödeme yöntemiyle korunan ödemeler</p>
              <div class="pd-ta-payment-icons">
                <span class="pd-ta-payment-icon">VISA</span>
                <span class="pd-ta-payment-icon">MC</span>
                <span class="pd-ta-payment-icon">PayPal</span>
                <span class="pd-ta-payment-icon">Apple Pay</span>
                <span class="pd-ta-payment-icon">GPay</span>
              </div>
            </div>
          </div>

          <div class="pd-ta-item">
            <svg class="pd-ta-item-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/></svg>
            <div class="pd-ta-item-content">
              <h5>Para İade Koruması</h5>
              <p>Ürün açıklamayla eşleşmezse para iadesi alın</p>
            </div>
          </div>

          <div class="pd-ta-badge">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 1a.75.75 0 01.65.378l1.855 3.27 3.69.53a.75.75 0 01.416 1.279l-2.668 2.6.63 3.67a.75.75 0 01-1.088.79L10 11.347l-3.485 1.832a.75.75 0 01-1.088-.79l.63-3.67-2.668-2.6a.75.75 0 01.416-1.28l3.69-.53L9.35 1.379A.75.75 0 0110 1z" clip-rule="evenodd"/></svg>
            Ticaret Güvencesi
          </div>
        </div>

        <!-- CTA Buttons -->
        <div id="pd-cta-buttons">
          <button type="button" id="pd-add-to-cart" class="pd-cta-primary">
            Sepete Ekle
          </button>
          <button type="button" id="pd-chat-now" class="pd-cta-outline">
            Sohbet Başlat
          </button>
        </div>
      </div>
    </div>
  `;
}

export function initProductInfo(): void {
  // Card tab switching (Toptan Satış / Özelleştirme)
  const cardTabs = document.querySelectorAll<HTMLButtonElement>('.pd-card-tab');
  cardTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      cardTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // Price tier highlighting
  const tierCells = document.querySelectorAll<HTMLElement>('.pd-price-tier');
  tierCells.forEach(cell => {
    cell.addEventListener('click', () => {
      tierCells.forEach(c => c.classList.remove('active'));
      cell.classList.add('active');
    });
  });

  // Variant selection
  const variantGroups = document.querySelectorAll<HTMLElement>('.variant-group');
  variantGroups.forEach(group => {
    const buttons = group.querySelectorAll<HTMLButtonElement>('.variant-option:not([disabled])');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  });

  // Sticky card: add .pd-sticky once user scrolls past the card's bottom
  const heroInfo = document.getElementById('pd-hero-info');
  if (heroInfo && window.matchMedia('(min-width: 1024px)').matches) {
    const stickyTop = 130;
    const cardBottom = heroInfo.getBoundingClientRect().bottom + window.scrollY;

    const onScroll = () => {
      heroInfo.classList.toggle('pd-sticky', window.scrollY + stickyTop >= cardBottom);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Shipping card change ──────────────────────────

  const pdShipChangeBtn = document.getElementById('pd-ship-card-change');
  if (pdShipChangeBtn) {
    pdShipChangeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openShippingModal();
    });
  }

  // Listen for shipping changes from shared modal
  document.addEventListener('shipping-change', ((e: CustomEvent) => {
    const { method, costStr, estimatedDays } = e.detail;
    const methodEl = document.getElementById('pd-ship-card-method');
    if (methodEl) methodEl.textContent = method;
    const detailEl = document.querySelector('#pd-shipping-card .pd-shipping-card-detail');
    if (detailEl) detailEl.textContent = `Kargo: ${costStr} · ${estimatedDays}`;
  }) as EventListener);
}
