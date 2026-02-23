/**
 * CartDrawer Component
 * Slide-in right drawer triggered by "Sepete Ekle" button.
 * Contains: price tiers, variant selectors (color swatches + size/material pills),
 * quantity stepper, shipping card, and sticky subtotal footer with per-piece price.
 */

import { mockProduct } from '../../data/mockProduct';
import type { ProductVariant } from '../../types/product';

/* ── Exported cart drawer opener (for MobileLayout) ──── */
let _openCartDrawer: (() => void) | null = null;

export function openCartDrawer(): void {
  _openCartDrawer?.();
}

/* ── Variant renderers ───────────────────────────────── */

function renderVariantSection(variant: ProductVariant, unitPrice: number): string {
  if (variant.type === 'color') {
    const firstAvailable = variant.options.find(o => o.available) || variant.options[0];
    return `
      <div class="cart-variant-section">
        <div class="cart-variant-label">${variant.label}: <span id="cart-selected-color">${firstAvailable.label}</span></div>
        <div class="cart-color-grid">
          ${variant.options.map((opt, i) => `
            <button
              type="button"
              class="cart-color-grid-item ${i === 0 && opt.available ? 'active' : ''} ${!opt.available ? 'disabled' : ''}"
              data-variant="color"
              data-value="${opt.id}"
              data-label="${opt.label}"
              data-color="${opt.value}"
              ${opt.available ? '' : 'disabled'}
            >
              ${opt.thumbnail ? `<img src="${opt.thumbnail}" alt="${opt.label}">` : `<div class="cart-color-swatch" style="background:${opt.value}"></div>`}
              <span class="cart-color-badge hidden">x0</span>
            </button>
          `).join('')}
        </div>
      </div>`;
  }

  return `
    <div class="cart-variant-section">
      <div class="cart-variant-label">${variant.label}</div>
      <div class="cart-size-rows">
        ${variant.options.map(opt => `
          <div class="cart-size-row ${!opt.available ? 'disabled' : ''}" data-variant="${variant.type}" data-value="${opt.id}" data-label="${opt.label}">
            <span class="cart-size-row-pill">${opt.label}</span>
            <span class="cart-size-row-price">$${unitPrice.toFixed(2)}</span>
            <div class="cart-size-row-qty">
              <button type="button" class="cart-size-row-btn cart-size-minus" ${!opt.available ? 'disabled' : ''}>&minus;</button>
              <input type="number" class="cart-size-row-input" value="0" min="0" ${!opt.available ? 'disabled' : ''}>
              <button type="button" class="cart-size-row-btn cart-size-plus" ${!opt.available ? 'disabled' : ''}>+</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>`;
}

/* ── Drawer HTML ─────────────────────────────────────── */

function parseShippingCost(cost: string): number {
  return parseFloat(cost.replace(/[^0-9.]/g, '')) || 0;
}

export function CartDrawer(): string {
  const p = mockProduct;
  const firstTierPrice = p.priceTiers[0].price;
  const itemTotal = firstTierPrice * p.moq;
  const shippingCost = parseShippingCost(p.shipping[0].cost);
  const grandTotal = itemTotal + shippingCost;
  const perPiece = grandTotal / p.moq;

  return `
    <div class="cart-drawer-overlay" id="cart-drawer-overlay">
      <div class="cart-drawer" id="cart-drawer">
        <!-- Header -->
        <div class="cart-drawer-header">
          <h3>Varyasyon ve miktar seçin</h3>
          <button type="button" class="cart-drawer-close" id="cart-drawer-close">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="cart-drawer-body">
          <!-- Price Tiers -->
          <div class="cart-tier-row">
            ${p.priceTiers.map((tier, i) => {
              const qtyLabel = tier.maxQty
                ? `${tier.minQty} - ${tier.maxQty} ${p.unit}`
                : `\u2265 ${tier.minQty} ${p.unit}`;
              return `
                <div class="cart-tier-item ${i === 0 ? 'active' : ''}" data-tier-index="${i}">
                  <span class="cart-tier-qty">${qtyLabel}</span>
                  <span class="cart-tier-price">$${tier.price.toFixed(2)}</span>
                </div>`;
            }).join('')}
          </div>

          <!-- Variants -->
          ${p.variants.map(v => renderVariantSection(v, firstTierPrice)).join('')}

          <!-- Price + Quantity Row -->
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span class="cart-current-price" id="cart-current-price">$${firstTierPrice.toFixed(2)}</span>
            <div class="cart-qty-stepper">
              <button type="button" class="cart-qty-btn" id="cart-qty-minus">&minus;</button>
              <input type="number" class="cart-qty-input" id="cart-qty-input" value="${p.moq}" min="1">
              <button type="button" class="cart-qty-btn" id="cart-qty-plus">+</button>
            </div>
          </div>

          <!-- Shipping -->
          <div class="cart-shipping-card">
            <div class="cart-shipping-title">
              <span id="cart-ship-method">${p.shipping[0].method}</span>
              <a href="javascript:void(0)" id="cart-ship-change">Değiştir ›</a>
            </div>
            <div class="cart-shipping-detail" id="cart-ship-detail">
              Kargo: ${p.shipping[0].cost} · ${p.shipping[0].estimatedDays}
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="cart-drawer-footer">
          <!-- Collapsed view (default) -->
          <div class="cart-footer-collapsed" id="cart-footer-collapsed">
            <span class="cart-subtotal-label"><strong>Ara Toplam</strong></span>
            <div class="cart-subtotal-right">
              <span class="cart-subtotal-price" id="cart-subtotal">$${grandTotal.toFixed(2)}</span>
              <span class="cart-subtotal-per" id="cart-per-piece">($${perPiece.toFixed(2)}/adet)</span>
              <svg class="cart-chevron" width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd"/></svg>
            </div>
          </div>

          <!-- Expanded view (hidden by default) -->
          <div class="cart-footer-expanded cart-footer-hidden" id="cart-footer-expanded">
            <div class="cart-breakdown-header" id="cart-breakdown-toggle">
              <span>Fiyat</span>
              <svg class="cart-chevron" width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/></svg>
            </div>
            <div class="cart-breakdown-row">
              <span>Ürün toplamı (<span id="cart-variation-info">1 varyasyon ${p.moq} adet</span>)</span>
              <span id="cart-item-subtotal">$${itemTotal.toFixed(2)}</span>
            </div>
            <div class="cart-breakdown-row">
              <span>Kargo toplamı</span>
              <span id="cart-shipping-total">${p.shipping[0].cost}</span>
            </div>
            <div class="cart-breakdown-row cart-breakdown-total">
              <span><strong>Ara Toplam</strong></span>
              <div>
                <span class="cart-subtotal-price" id="cart-total-price">$${grandTotal.toFixed(2)}</span>
                <span class="cart-subtotal-per" id="cart-total-per">($${perPiece.toFixed(2)}/adet)</span>
              </div>
            </div>
          </div>

          <button type="button" class="cart-add-btn" id="cart-add-btn">Sepete Ekle</button>
        </div>
      </div>
    </div>
  `;
}

/* ── Init logic ──────────────────────────────────────── */

export function initCartDrawer(): void {
  const overlay = document.getElementById('cart-drawer-overlay');
  const drawer = document.getElementById('cart-drawer');
  if (!overlay || !drawer) return;

  const closeBtn = document.getElementById('cart-drawer-close');
  const qtyInput = document.getElementById('cart-qty-input') as HTMLInputElement | null;
  const qtyMinus = document.getElementById('cart-qty-minus') as HTMLButtonElement | null;
  const qtyPlus = document.getElementById('cart-qty-plus') as HTMLButtonElement | null;
  const subtotalEl = document.getElementById('cart-subtotal');
  const perPieceEl = document.getElementById('cart-per-piece');
  const currentPriceEl = document.getElementById('cart-current-price');

  // Breakdown elements
  const collapsedView = document.getElementById('cart-footer-collapsed');
  const expandedView = document.getElementById('cart-footer-expanded');
  const breakdownToggle = document.getElementById('cart-breakdown-toggle');
  const itemSubtotalEl = document.getElementById('cart-item-subtotal');
  const variationInfoEl = document.getElementById('cart-variation-info');
  const totalPriceEl = document.getElementById('cart-total-price');
  const totalPerEl = document.getElementById('cart-total-per');

  const shipMethodEl = document.getElementById('cart-ship-method');
  const shipDetailEl = document.getElementById('cart-ship-detail');
  const shippingTotalEl = document.getElementById('cart-shipping-total');

  const p = mockProduct;
  let shippingCost = parseShippingCost(p.shipping[0].cost);
  let currentTierIndex = 0;
  let quantity = p.moq;

  // ── Open / Close ────────────────────────────────────

  function openDrawer(): void {
    overlay!.classList.add('open');
    drawer!.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  _openCartDrawer = openDrawer;

  function closeDrawer(): void {
    overlay!.classList.remove('open');
    drawer!.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Open from desktop "Sepete Ekle" CTA
  const addToCartBtn = document.getElementById('pd-add-to-cart');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', openDrawer);
  }

  // Open from mobile bottom bar "Sepete Ekle"
  const mobileBar = document.getElementById('pd-mobile-bar');
  if (mobileBar) {
    const mobileAddBtn = mobileBar.querySelector('.th-btn');
    if (mobileAddBtn) {
      mobileAddBtn.addEventListener('click', openDrawer);
    }
  }

  // "Numune Al" buttons (desktop + mobile) → add 1 sample directly
  function addSample(): void {
    const samplePrice = p.samplePrice ?? 30;
    document.dispatchEvent(new CustomEvent('cart-add', {
      detail: {
        productTitle: p.title,
        supplierName: p.supplier.name,
        unitPrice: samplePrice,
        quantity: 1,
        itemTotal: samplePrice,
        grandTotal: samplePrice,
        isSample: true,
        colorItems: [],
      }
    }));

    // Visual feedback — briefly flash the button
    const btn = document.querySelector('.pdm-sample-btn') || document.querySelector('.pd-sample-btn');
    if (btn) {
      const original = btn.textContent;
      btn.textContent = 'Eklendi ✓';
      setTimeout(() => { btn.textContent = original; }, 1500);
    }
  }

  document.querySelector('.pdm-sample-btn')?.addEventListener('click', addSample);
  document.querySelector('.pd-sample-btn')?.addEventListener('click', addSample);

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeDrawer();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeDrawer();
    }
  });

  // ── Price calculation ───────────────────────────────

  function getTierForQty(qty: number): number {
    for (let i = p.priceTiers.length - 1; i >= 0; i--) {
      if (qty >= p.priceTiers[i].minQty) return i;
    }
    return 0;
  }

  function updatePriceDisplay(): void {
    const tierIndex = getTierForQty(quantity);
    const unitPrice = p.priceTiers[tierIndex].price;
    const itemTotal = unitPrice * quantity;
    const grandTotal = itemTotal + shippingCost;
    const perPiece = grandTotal / quantity;

    // Update collapsed subtotal (grand total including shipping)
    if (subtotalEl) {
      subtotalEl.textContent = `$${grandTotal.toFixed(2)}`;
    }
    if (perPieceEl) {
      perPieceEl.textContent = `($${perPiece.toFixed(2)}/adet)`;
    }

    // Update expanded breakdown
    if (itemSubtotalEl) {
      itemSubtotalEl.textContent = `$${itemTotal.toFixed(2)}`;
    }
    if (variationInfoEl) {
      // Count actual variations with qty > 0 across all colors
      let varCount = 0;
      colorQtyMap.forEach(rowMap => rowMap.forEach(q => { if (q > 0) varCount++; }));
      variationInfoEl.textContent = `${Math.max(varCount, 1)} varyasyon ${quantity} adet`;
    }
    if (totalPriceEl) {
      totalPriceEl.textContent = `$${grandTotal.toFixed(2)}`;
    }
    if (totalPerEl) {
      totalPerEl.textContent = `($${perPiece.toFixed(2)}/adet)`;
    }

    // Update current price display
    if (currentPriceEl) {
      currentPriceEl.textContent = `$${unitPrice.toFixed(2)}`;
    }

    // Update row prices (size/material)
    overlay!.querySelectorAll<HTMLElement>('.cart-size-row-price').forEach(el => {
      el.textContent = `$${unitPrice.toFixed(2)}`;
    });

    // Update active tier highlight
    if (tierIndex !== currentTierIndex) {
      currentTierIndex = tierIndex;
      const tierEls = overlay!.querySelectorAll<HTMLElement>('.cart-tier-item');
      tierEls.forEach((el, i) => {
        el.classList.toggle('active', i === tierIndex);
      });
    }

    // Update color badge
    updateColorBadge();
  }

  // ── Quantity stepper ────────────────────────────────

  function clampQty(val: number): number {
    if (isNaN(val) || val < 1) return 1;
    if (val > 9999) return 9999;
    return val;
  }

  if (qtyMinus) {
    qtyMinus.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        if (qtyInput) qtyInput.value = String(quantity);
        updatePriceDisplay();
      }
    });
  }

  if (qtyPlus) {
    qtyPlus.addEventListener('click', () => {
      if (quantity < 9999) {
        quantity++;
        if (qtyInput) qtyInput.value = String(quantity);
        updatePriceDisplay();
      }
    });
  }

  if (qtyInput) {
    qtyInput.addEventListener('change', () => {
      quantity = clampQty(parseInt(qtyInput.value, 10));
      qtyInput.value = String(quantity);
      updatePriceDisplay();
    });
  }

  // ── Price tier click ────────────────────────────────

  const tierEls = overlay.querySelectorAll<HTMLElement>('.cart-tier-item');
  tierEls.forEach(el => {
    el.addEventListener('click', () => {
      const tierIdx = parseInt(el.dataset.tierIndex || '0', 10);
      const tier = p.priceTiers[tierIdx];
      if (!tier) return;

      // Set quantity to tier minimum
      quantity = tier.minQty;
      if (qtyInput) qtyInput.value = String(quantity);
      updatePriceDisplay();
    });
  });

  // ── Variant selection ───────────────────────────────

  // Per-color quantity storage: colorId -> { "type::value": qty }
  const colorQtyMap = new Map<string, Map<string, number>>();

  function getActiveColorId(): string {
    return overlay!.querySelector<HTMLButtonElement>('.cart-color-grid-item.active')?.dataset.value || '';
  }

  function saveRowsToColor(colorId: string): void {
    if (!colorId) return;
    const map = new Map<string, number>();
    overlay!.querySelectorAll<HTMLElement>('.cart-size-row:not(.disabled)').forEach(row => {
      const inp = row.querySelector<HTMLInputElement>('.cart-size-row-input');
      const key = `${row.dataset.variant}::${row.dataset.value}`;
      map.set(key, parseInt(inp?.value || '0', 10));
    });
    colorQtyMap.set(colorId, map);
  }

  function loadRowsFromColor(colorId: string): void {
    const map = colorQtyMap.get(colorId);
    overlay!.querySelectorAll<HTMLElement>('.cart-size-row:not(.disabled)').forEach(row => {
      const inp = row.querySelector<HTMLInputElement>('.cart-size-row-input');
      const key = `${row.dataset.variant}::${row.dataset.value}`;
      if (inp) inp.value = String(map?.get(key) || 0);
    });
  }

  function getColorTotal(colorId: string): number {
    const map = colorQtyMap.get(colorId);
    if (!map) return 0;
    let total = 0;
    map.forEach(q => total += q);
    return total;
  }

  function getGrandTotal(): number {
    let total = 0;
    colorQtyMap.forEach(map => map.forEach(q => total += q));
    return total;
  }

  // Update ALL color badges with per-color totals
  function updateColorBadge(): void {
    overlay!.querySelectorAll<HTMLButtonElement>('.cart-color-grid-item').forEach(item => {
      const badge = item.querySelector('.cart-color-badge') as HTMLElement;
      if (!badge) return;
      const colorId = item.dataset.value || '';
      const total = getColorTotal(colorId);
      if (total > 0) {
        badge.textContent = `x${total}`;
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    });
  }

  // Color grid click: save current, switch, load new
  const colorGridItems = overlay.querySelectorAll<HTMLButtonElement>('.cart-color-grid-item:not([disabled])');
  colorGridItems.forEach(item => {
    item.addEventListener('click', () => {
      // Save current color's row quantities
      saveRowsToColor(getActiveColorId());

      // Switch active color
      colorGridItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      // Load new color's row quantities
      loadRowsFromColor(item.dataset.value || '');

      // Update label
      const labelEl = document.getElementById('cart-selected-color');
      if (labelEl) labelEl.textContent = item.dataset.label || '';

      // Recalculate grand total
      quantity = Math.max(getGrandTotal(), 1);
      if (qtyInput) qtyInput.value = String(quantity);
      updatePriceDisplay();
    });
  });

  // Size / material rows — per-option quantity steppers
  function syncTotalFromRows(): void {
    // Save to current color
    saveRowsToColor(getActiveColorId());

    const total = getGrandTotal();
    quantity = Math.max(total, 1);
    if (qtyInput) qtyInput.value = String(quantity);
    updatePriceDisplay();
  }

  const sizeRows = overlay.querySelectorAll<HTMLElement>('.cart-size-row:not(.disabled)');
  sizeRows.forEach(row => {
    const minusBtn = row.querySelector<HTMLButtonElement>('.cart-size-minus');
    const plusBtn = row.querySelector<HTMLButtonElement>('.cart-size-plus');
    const inp = row.querySelector<HTMLInputElement>('.cart-size-row-input');
    if (!minusBtn || !plusBtn || !inp) return;

    minusBtn.addEventListener('click', () => {
      const val = parseInt(inp.value, 10) || 0;
      if (val > 0) {
        inp.value = String(val - 1);
        syncTotalFromRows();
      }
    });

    plusBtn.addEventListener('click', () => {
      const val = parseInt(inp.value, 10) || 0;
      inp.value = String(val + 1);
      syncTotalFromRows();
    });

    inp.addEventListener('change', () => {
      const val = parseInt(inp.value, 10);
      inp.value = String(isNaN(val) || val < 0 ? 0 : val);
      syncTotalFromRows();
    });
  });

  // ── Footer price breakdown toggle ──────────────────

  if (collapsedView && expandedView) {
    collapsedView.addEventListener('click', () => {
      collapsedView.classList.add('cart-footer-hidden');
      expandedView.classList.remove('cart-footer-hidden');
    });
  }

  if (breakdownToggle && collapsedView && expandedView) {
    breakdownToggle.addEventListener('click', () => {
      expandedView.classList.add('cart-footer-hidden');
      collapsedView.classList.remove('cart-footer-hidden');
    });
  }

  // ── Shipping change listener ────────────────────────

  // Open shared shipping modal from cart drawer
  const shipChangeBtn = document.getElementById('cart-ship-change');
  if (shipChangeBtn) {
    shipChangeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openShippingModal(quantity);
    });
  }

  // Listen for shipping changes from shared modal
  document.addEventListener('shipping-change', ((e: CustomEvent) => {
    const { method, cost, estimatedDays, costStr } = e.detail;
    shippingCost = cost;

    // Update cart drawer shipping card
    if (shipMethodEl) shipMethodEl.textContent = method;
    if (shipDetailEl) shipDetailEl.textContent = `Kargo: ${costStr} · ${estimatedDays}`;
    if (shippingTotalEl) shippingTotalEl.textContent = costStr;

    updatePriceDisplay();
  }) as EventListener);

  // ── Confirm add to cart ─────────────────────────────

  const confirmBtn = document.getElementById('cart-add-btn');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      // Save current color's rows before gathering
      saveRowsToColor(getActiveColorId());

      const tierIndex = getTierForQty(quantity);
      const unitPrice = p.priceTiers[tierIndex].price;

      // Find color variant definition
      const colorVariant = p.variants.find(v => v.type === 'color');

      // Build per-color line items from colorQtyMap
      const colorItems: Array<{
        colorId: string;
        colorLabel: string;
        colorThumb: string;
        colorValue: string;
        variants: Array<{type: string; label: string; qty: number}>;
      }> = [];

      colorQtyMap.forEach((rowMap, colorId) => {
        const colorOpt = colorVariant?.options.find(o => o.id === colorId);
        if (!colorOpt) return;

        const variants: Array<{type: string; label: string; qty: number}> = [];
        rowMap.forEach((qty, key) => {
          if (qty > 0) {
            const [type, value] = key.split('::');
            // Find the label from product variants
            const variantDef = p.variants.find(v => v.type === type);
            const optDef = variantDef?.options.find(o => o.id === value);
            variants.push({ type, label: optDef?.label || value, qty });
          }
        });

        if (variants.length > 0) {
          colorItems.push({
            colorId,
            colorLabel: colorOpt.label,
            colorThumb: colorOpt.thumbnail || '',
            colorValue: colorOpt.value,
            variants,
          });
        }
      });

      const itemTotal = unitPrice * quantity;
      const grandTotal = itemTotal + shippingCost;

      document.dispatchEvent(new CustomEvent('cart-add', {
        detail: {
          productTitle: p.title,
          supplierName: p.supplier.name,
          unitPrice,
          quantity,
          itemTotal,
          grandTotal,
          colorItems,
        }
      }));

      closeDrawer();
    });
  }
}

/* ══════════════════════════════════════════════════════
   Shared Shipping Selection Modal
   ══════════════════════════════════════════════════════ */

export function ShippingModal(): string {
  const p = mockProduct;
  return `
    <div class="cart-ship-modal-overlay" id="cart-ship-modal">
      <div class="cart-ship-modal-content">
        <div class="cart-ship-modal-header">
          <h4>Kargo servisi seçin</h4>
          <button type="button" class="cart-ship-modal-close" id="cart-ship-modal-close">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <p class="cart-ship-modal-subtitle">Gönderim: <strong>Türkiye</strong> · Miktar: <span id="cart-ship-qty">${p.moq} ${p.unit}</span></p>
        <div class="cart-ship-options">
          ${p.shipping.map((s, i) => `
            <label class="cart-ship-option ${i === 0 ? 'active' : ''}" data-ship-index="${i}">
              <input type="radio" name="cart-shipping" value="${i}" ${i === 0 ? 'checked' : ''}>
              <div class="cart-ship-option-info">
                <span class="cart-ship-option-name">${s.method}</span>
                <span class="cart-ship-option-days">${s.estimatedDays}</span>
              </div>
              <div class="cart-ship-option-cost">
                <span>${s.cost}</span>
              </div>
            </label>
          `).join('')}
        </div>
        <button type="button" class="cart-ship-apply" id="cart-ship-apply">Uygula</button>
      </div>
    </div>
  `;
}

/** Open the shared shipping modal */
export function openShippingModal(quantity?: number): void {
  const modal = document.getElementById('cart-ship-modal');
  if (modal) modal.classList.add('open');
  // Update quantity display if provided
  if (quantity != null) {
    const qtyEl = document.getElementById('cart-ship-qty');
    if (qtyEl) qtyEl.textContent = `${quantity} ${mockProduct.unit}`;
  }
}

export function initShippingModal(): void {
  const modal = document.getElementById('cart-ship-modal');
  const closeBtn = document.getElementById('cart-ship-modal-close');
  const applyBtn = document.getElementById('cart-ship-apply');
  if (!modal) return;

  const p = mockProduct;

  function closeModal(): void {
    modal!.classList.remove('open');
  }

  // Close button
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Close on backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Radio option selection — highlight active
  const shipOptions = modal.querySelectorAll<HTMLLabelElement>('.cart-ship-option');
  shipOptions.forEach(opt => {
    const radio = opt.querySelector<HTMLInputElement>('input[type="radio"]');
    if (radio) {
      radio.addEventListener('change', () => {
        shipOptions.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
      });
    }
  });

  // Apply — dispatch custom event for all listeners
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const checked = modal.querySelector<HTMLInputElement>('input[name="cart-shipping"]:checked');
      if (!checked) return;

      const idx = parseInt(checked.value, 10);
      const ship = p.shipping[idx];

      document.dispatchEvent(new CustomEvent('shipping-change', {
        detail: {
          index: idx,
          method: ship.method,
          estimatedDays: ship.estimatedDays,
          costStr: ship.cost,
          cost: parseShippingCost(ship.cost),
        }
      }));

      closeModal();
    });
  }
}
