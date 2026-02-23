/**
 * ListingCartDrawer Component — Alibaba-Style Redesign
 * Right panel: 600px drawer with price tiers, color rows, qty steppers, expandable footer.
 * Left panel: Large image preview with prev/next arrows and color label.
 */

import type { ProductListingCard, ProductImageKind, ProductVisual, ListingPriceTier, ListingColorVariant } from '../../types/productListing';

/* ── Product visuals (reuse from ProductListingGrid pattern) ── */
const productVisuals: Record<ProductImageKind, ProductVisual> = {
  jewelry: { background: 'linear-gradient(180deg, #fef9e7 0%, #fdf0c3 100%)', accent: 'rgba(230, 178, 18, 0.3)', stroke: '#8a6800', icon: '<path d="M12 2l2.5 5.5L20 9l-4 4 1 5.5L12 16l-5 2.5 1-5.5-4-4 5.5-1.5Z" /><circle cx="12" cy="10" r="2" />' },
  electronics: { background: 'linear-gradient(180deg, #eef2ff 0%, #dbeafe 100%)', accent: 'rgba(129, 140, 248, 0.3)', stroke: '#4f5fb3', icon: '<rect x="3" y="4" width="18" height="12" rx="2" /><path d="M7 20h10M12 16v4" /><circle cx="12" cy="10" r="2" />' },
  label: { background: 'linear-gradient(180deg, #f0fdf4 0%, #dcfce7 100%)', accent: 'rgba(74, 222, 128, 0.3)', stroke: '#2d8a5e', icon: '<rect x="4" y="6" width="16" height="12" rx="1" /><path d="M8 10h8M8 13h5" /><circle cx="17" cy="6" r="1.5" />' },
  crafts: { background: 'linear-gradient(180deg, #fdf4ff 0%, #fae8ff 100%)', accent: 'rgba(192, 132, 252, 0.3)', stroke: '#7e22ce', icon: '<path d="M12 2C8.5 2 6 4.5 6 7c0 3 6 8 6 8s6-5 6-8c0-2.5-2.5-5-6-5Z" /><path d="M8 18h8M9 21h6" />' },
  accessory: { background: 'linear-gradient(180deg, #fff7ed 0%, #ffedd5 100%)', accent: 'rgba(251, 146, 60, 0.3)', stroke: '#b45309', icon: '<rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V6a4 4 0 0 1 8 0v4" /><path d="M4 14h16" />' },
  clothing: { background: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 100%)', accent: 'rgba(244, 114, 182, 0.3)', stroke: '#a3456e', icon: '<path d="M8 3h8l2 6v12H6V9l2-6Z" /><path d="M12 3v8M8 3 6 9M16 3l2 6" />' },
  tools: { background: 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)', accent: 'rgba(100, 116, 139, 0.3)', stroke: '#475569', icon: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />' },
  packaging: { background: 'linear-gradient(180deg, #fef3c7 0%, #fde68a 100%)', accent: 'rgba(251, 191, 36, 0.3)', stroke: '#92700c', icon: '<path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3" /><path d="M3 8h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z" /><path d="M10 12h4" />' },
};

/* ── Color maps per category ── */
const categoryColorMap: Record<string, { label: string; hex: string }[]> = {
  jewelry:     [{ label: 'Altin', hex: '#D4AF37' }, { label: 'Gumus', hex: '#C0C0C0' }, { label: 'Rose Gold', hex: '#B76E79' }, { label: 'Siyah', hex: '#1a1a1a' }, { label: 'Beyaz', hex: '#F5F5F5' }],
  electronics: [{ label: 'Siyah', hex: '#1a1a1a' }, { label: 'Beyaz', hex: '#F5F5F5' }, { label: 'Mavi', hex: '#3B82F6' }, { label: 'Gumus', hex: '#C0C0C0' }],
  clothing:    [{ label: 'Siyah', hex: '#1a1a1a' }, { label: 'Beyaz', hex: '#F5F5F5' }, { label: 'Gri', hex: '#9CA3AF' }, { label: 'Lacivert', hex: '#1E3A5F' }, { label: 'Kirmizi', hex: '#DC2626' }],
  accessory:   [{ label: 'Siyah', hex: '#1a1a1a' }, { label: 'Kahverengi', hex: '#8B4513' }, { label: 'Taba', hex: '#D2691E' }, { label: 'Lacivert', hex: '#1E3A5F' }],
  tools:       [{ label: 'Gumus', hex: '#C0C0C0' }, { label: 'Siyah', hex: '#1a1a1a' }, { label: 'Kirmizi', hex: '#DC2626' }, { label: 'Sari', hex: '#EAB308' }],
  label:       [{ label: 'Beyaz', hex: '#F5F5F5' }, { label: 'Kraft', hex: '#C4A35A' }, { label: 'Seffaf', hex: '#E0E7EE' }, { label: 'Siyah', hex: '#1a1a1a' }],
  crafts:      [{ label: 'Dogal', hex: '#DEB887' }, { label: 'Beyaz', hex: '#F5F5F5' }, { label: 'Pembe', hex: '#F9A8D4' }, { label: 'Mavi', hex: '#93C5FD' }],
  packaging:   [{ label: 'Kraft', hex: '#C4A35A' }, { label: 'Beyaz', hex: '#F5F5F5' }, { label: 'Siyah', hex: '#1a1a1a' }, { label: 'Kahverengi', hex: '#8B4513' }],
};

/* ── Helpers ── */

function parsePrice(priceStr: string): { low: number; high: number } {
  const nums = priceStr.match(/[\d.]+/g);
  if (!nums || nums.length === 0) return { low: 0, high: 0 };
  if (nums.length === 1) {
    const v = parseFloat(nums[0]);
    return { low: v, high: v };
  }
  const a = parseFloat(nums[0]);
  const b = parseFloat(nums[1]);
  return { low: Math.min(a, b), high: Math.max(a, b) };
}

function parseMoq(moqStr: string): number {
  const m = moqStr.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 1;
}

function buildPriceTiers(priceStr: string, moqStr: string): ListingPriceTier[] {
  const { low, high } = parsePrice(priceStr);
  const moq = parseMoq(moqStr);
  const mid = Math.round(((low + high) / 2) * 100) / 100;

  let brackets: [number, number | null][];
  if (moq < 100) {
    brackets = [[moq, 49], [50, 199], [200, null]];
    // Ensure first bracket min is at least moq
    if (moq > 49) brackets = [[moq, moq * 3 - 1], [moq * 3, moq * 10 - 1], [moq * 10, null]];
  } else if (moq < 1000) {
    brackets = [[moq, 299], [300, 999], [1000, null]];
    if (moq > 299) brackets = [[moq, moq * 2 - 1], [moq * 2, moq * 5 - 1], [moq * 5, null]];
  } else {
    brackets = [[moq, 4999], [5000, 9999], [10000, null]];
    if (moq > 4999) brackets = [[moq, moq * 2 - 1], [moq * 2, moq * 5 - 1], [moq * 5, null]];
  }

  return [
    { minQty: brackets[0][0], maxQty: brackets[0][1], price: high },
    { minQty: brackets[1][0], maxQty: brackets[1][1], price: mid },
    { minQty: brackets[2][0], maxQty: brackets[2][1], price: low },
  ];
}

function buildColorVariants(imageKind: ProductImageKind): ListingColorVariant[] {
  const colors = categoryColorMap[imageKind] || categoryColorMap.jewelry;
  return colors.map((c, i) => ({
    id: `color-${i}`,
    label: c.label,
    hex: c.hex,
    imageKind,
  }));
}

function renderPlaceholderSvg(kind: ProductImageKind, size: number = 64): string {
  const v = productVisuals[kind];
  return `<svg width="${size}" height="${size}" fill="none" stroke-width="1.4" viewBox="0 0 24 24" style="stroke: ${v.stroke};">${v.icon}</svg>`;
}

function renderColorThumbnail(color: ListingColorVariant, size: number = 56): string {
  const v = productVisuals[color.imageKind];
  return `
    <div style="width:${size}px;height:${size}px;border-radius:8px;overflow:hidden;background:${v.background};display:flex;align-items:center;justify-content:center;position:relative;flex-shrink:0;">
      <div style="position:absolute;inset:0;background:${color.hex};opacity:0.18;"></div>
      ${renderPlaceholderSvg(color.imageKind, Math.round(size * 0.5))}
    </div>`;
}

function renderPreviewImage(color: ListingColorVariant): string {
  const v = productVisuals[color.imageKind];
  return `
    <div style="width:100%;height:100%;background:${v.background};display:flex;align-items:center;justify-content:center;position:relative;">
      <div style="position:absolute;inset:0;background:${color.hex};opacity:0.12;"></div>
      ${renderPlaceholderSvg(color.imageKind, 120)}
    </div>`;
}

function formatTierLabel(tier: ListingPriceTier): string {
  if (tier.maxQty === null) return `≥ ${tier.minQty.toLocaleString()} adet`;
  return `${tier.minQty.toLocaleString()} - ${tier.maxQty.toLocaleString()} adet`;
}

/* ── Drawer HTML Shell ── */

export function ListingCartDrawer(): string {
  return `
    <div class="cart-drawer-overlay" id="listing-cart-overlay">
      <!-- Large Image Preview Panel (left of drawer) -->
      <div id="listing-preview-panel" class="listing-preview-panel hidden">
        <div class="listing-preview-inner">
          <button type="button" id="listing-preview-prev" class="listing-preview-arrow left">&lsaquo;</button>
          <div id="listing-preview-image" class="listing-preview-image"></div>
          <button type="button" id="listing-preview-next" class="listing-preview-arrow right">&rsaquo;</button>
          <div id="listing-preview-label" class="listing-preview-label">color : —</div>
        </div>
      </div>

      <!-- Cart Drawer (right panel) -->
      <div class="cart-drawer listing-cart-drawer" id="listing-cart-drawer">
        <div class="cart-drawer-header">
          <h3>Sepete Ekle</h3>
          <button type="button" class="cart-drawer-close" id="listing-cart-close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="cart-drawer-body" id="listing-cart-body"></div>
        <div class="cart-drawer-footer" id="listing-cart-footer"></div>
      </div>
    </div>
  `;
}

/* ── Cart state ── */

interface CartItem {
  product: ProductListingCard;
  colorQuantities: Map<string, number>;
}

const cartState = new Map<string, CartItem>();

/* ── Drawer State ── */

interface DrawerState {
  product: ProductListingCard | null;
  priceTiers: ListingPriceTier[];
  colors: ListingColorVariant[];
  colorQuantities: Map<string, number>;
  activeTierIndex: number;
  previewColorIndex: number;
  footerExpanded: boolean;
}

const state: DrawerState = {
  product: null,
  priceTiers: [],
  colors: [],
  colorQuantities: new Map(),
  activeTierIndex: 0,
  previewColorIndex: 0,
  footerExpanded: false,
};

/* ── Init ── */

export function initListingCartDrawer(products: ProductListingCard[]): void {
  const productMap = new Map(products.map(p => [p.id, p]));

  const overlay = document.getElementById('listing-cart-overlay');
  const drawer = document.getElementById('listing-cart-drawer');
  const body = document.getElementById('listing-cart-body');
  const footer = document.getElementById('listing-cart-footer');
  const closeBtn = document.getElementById('listing-cart-close');
  const previewPanel = document.getElementById('listing-preview-panel');
  const previewImage = document.getElementById('listing-preview-image');
  const previewLabel = document.getElementById('listing-preview-label');
  const prevBtn = document.getElementById('listing-preview-prev');
  const nextBtn = document.getElementById('listing-preview-next');

  if (!overlay || !drawer || !body || !footer || !closeBtn) return;

  /* ── Open / Close ── */

  function openDrawer(): void {
    overlay!.classList.add('open');
    drawer!.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Show preview panel on desktop
    if (previewPanel && window.innerWidth >= 1024) {
      previewPanel.classList.remove('hidden');
    }
  }

  function closeDrawer(): void {
    overlay!.classList.remove('open');
    drawer!.classList.remove('open');
    document.body.style.overflow = '';
    if (previewPanel) previewPanel.classList.add('hidden');
  }

  /* ── Preview panel ── */

  function updatePreview(): void {
    if (!previewImage || !previewLabel || state.colors.length === 0) return;
    const color = state.colors[state.previewColorIndex];
    previewImage.innerHTML = renderPreviewImage(color);
    previewLabel.textContent = `color : ${color.label}`;
  }

  /* ── Recalculate — central state update ── */

  function recalculate(): void {
    // 1. Total qty
    let totalQty = 0;
    for (const qty of state.colorQuantities.values()) {
      totalQty += qty;
    }

    // 2. Find active tier
    let newTierIdx = 0;
    for (let i = state.priceTiers.length - 1; i >= 0; i--) {
      if (totalQty >= state.priceTiers[i].minQty) {
        newTierIdx = i;
        break;
      }
    }
    state.activeTierIndex = newTierIdx;
    const activePrice = state.priceTiers[newTierIdx]?.price ?? 0;

    // 3. Update tier highlights
    const tierItems = body!.querySelectorAll<HTMLElement>('.cart-tier-item');
    tierItems.forEach((el, i) => {
      el.classList.toggle('active', i === newTierIdx);
    });

    // 4. Update all color row prices
    const priceEls = body!.querySelectorAll<HTMLElement>('.cart-color-row-price');
    priceEls.forEach(el => {
      el.textContent = `$${activePrice.toFixed(2)}`;
    });

    // 5. Update thumbnail borders (qty > 0 → selected)
    const rows = body!.querySelectorAll<HTMLElement>('.cart-color-row');
    rows.forEach(row => {
      const colorId = row.dataset.colorId || '';
      const qty = state.colorQuantities.get(colorId) || 0;
      const thumb = row.querySelector<HTMLElement>('.cart-color-row-thumb');
      if (thumb) {
        thumb.style.borderColor = qty > 0 ? '#ea580c' : '#e5e7eb';
        thumb.style.borderWidth = qty > 0 ? '2px' : '1px';
      }
    });

    // 6. Update footer
    updateFooter(totalQty, activePrice);
  }

  function updateFooter(totalQty: number, activePrice: number): void {
    if (!footer) return;

    // Count variations with qty > 0
    let variations = 0;
    for (const qty of state.colorQuantities.values()) {
      if (qty > 0) variations++;
    }

    const subtotal = totalQty * activePrice;
    const perPiece = totalQty > 0 ? (subtotal / totalQty).toFixed(2) : '0.00';

    const breakdownHtml = state.footerExpanded ? `
      <div class="cart-footer-expanded">
        <div class="cart-breakdown-header" id="listing-footer-toggle">
          Price
          <svg class="cart-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 15-6-6-6 6"/></svg>
        </div>
        <div class="cart-breakdown-row">
          <span>Item subtotal (${variations} varyasyon ${totalQty} urun)</span>
          <span style="font-weight:600;color:#111827;">$${subtotal.toFixed(2)}</span>
        </div>
        <div class="cart-breakdown-row cart-breakdown-total" style="font-weight:700;">
          <span>Subtotal</span>
          <span style="color:#111827;">$${subtotal.toFixed(2)} ($${perPiece}/adet)</span>
        </div>
      </div>
    ` : `
      <div class="cart-footer-collapsed" id="listing-footer-toggle">
        <span class="cart-subtotal-label">Price</span>
        <div class="cart-subtotal-right">
          <span class="cart-subtotal-price">$${subtotal.toFixed(2)}</span>
          <span class="cart-subtotal-per">($${perPiece}/adet)</span>
          <svg class="cart-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>
    `;

    footer.innerHTML = `
      ${breakdownHtml}
      <button type="button" class="cart-add-btn" id="listing-cart-confirm">Sepete Ekle</button>
    `;
  }

  /* ── Populate drawer ── */

  function populateDrawer(product: ProductListingCard): void {
    state.product = product;
    state.priceTiers = buildPriceTiers(product.price, product.moq);
    state.colors = buildColorVariants(product.imageKind);
    state.colorQuantities = new Map(state.colors.map(c => [c.id, 0]));
    state.activeTierIndex = 0;
    state.previewColorIndex = 0;
    state.footerExpanded = false;

    const activePrice = state.priceTiers[0]?.price ?? 0;

    // Build price tiers HTML
    const tiersHtml = `
      <div class="cart-tier-row">
        ${state.priceTiers.map((tier, i) => `
          <div class="cart-tier-item${i === 0 ? ' active' : ''}" data-tier-index="${i}">
            <span class="cart-tier-qty">${formatTierLabel(tier)}</span>
            <span class="cart-tier-price">$${tier.price.toFixed(2)}</span>
          </div>
        `).join('')}
      </div>
    `;

    // Build color rows HTML
    const colorRowsHtml = state.colors.map(color => `
      <div class="cart-color-row cart-size-row" data-color-id="${color.id}">
        <div class="cart-color-row-thumb" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;cursor:pointer;flex-shrink:0;" data-thumb-color="${color.id}">
          ${renderColorThumbnail(color, 56)}
        </div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:13px;font-weight:500;color:#111827;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${color.label}</div>
        </div>
        <span class="cart-color-row-price cart-size-row-price">$${activePrice.toFixed(2)}</span>
        <div class="cart-size-row-qty">
          <button type="button" class="cart-size-row-btn" data-qty-action="minus" data-qty-color="${color.id}">&minus;</button>
          <input type="number" class="cart-size-row-input" data-qty-input="${color.id}" value="0" min="0">
          <button type="button" class="cart-size-row-btn" data-qty-action="plus" data-qty-color="${color.id}">+</button>
        </div>
      </div>
    `).join('');

    body!.innerHTML = `
      <h4 style="font-size:15px;font-weight:600;color:#111827;line-height:1.4;margin-bottom:16px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">${product.name}</h4>
      ${tiersHtml}
      <div class="cart-variant-section">
        <div class="cart-variant-label">Renk</div>
        <div class="cart-size-rows">
          ${colorRowsHtml}
        </div>
      </div>
    `;

    // Initial footer
    updateFooter(0, activePrice);

    // Initial preview
    updatePreview();
  }

  /* ── Open drawer on "Sepete Ekle" card button click ── */
  document.addEventListener('click', (e: MouseEvent) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-add-to-cart]');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const productId = btn.dataset.addToCart;
    if (!productId) return;

    const product = productMap.get(productId);
    if (!product) return;

    populateDrawer(product);
    openDrawer();
  });

  /* ── Close handlers ── */
  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeDrawer();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeDrawer();
  });

  /* ── Preview arrow handlers ── */
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (state.colors.length === 0) return;
      state.previewColorIndex = (state.previewColorIndex - 1 + state.colors.length) % state.colors.length;
      updatePreview();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (state.colors.length === 0) return;
      state.previewColorIndex = (state.previewColorIndex + 1) % state.colors.length;
      updatePreview();
    });
  }

  /* ── Body click delegation ── */
  body.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    // Tier click → set first color to that tier's minQty
    const tierEl = target.closest<HTMLElement>('.cart-tier-item');
    if (tierEl) {
      const idx = parseInt(tierEl.dataset.tierIndex || '0', 10);
      const tier = state.priceTiers[idx];
      if (tier && state.colors.length > 0) {
        // Set first color's qty to tier minQty, reset others
        state.colorQuantities = new Map(state.colors.map(c => [c.id, 0]));
        state.colorQuantities.set(state.colors[0].id, tier.minQty);
        // Update input
        const firstInput = body!.querySelector<HTMLInputElement>(`[data-qty-input="${state.colors[0].id}"]`);
        if (firstInput) firstInput.value = String(tier.minQty);
        // Reset other inputs
        state.colors.slice(1).forEach(c => {
          const inp = body!.querySelector<HTMLInputElement>(`[data-qty-input="${c.id}"]`);
          if (inp) inp.value = '0';
        });
        recalculate();
      }
      return;
    }

    // Color thumbnail click → update preview
    const thumbEl = target.closest<HTMLElement>('[data-thumb-color]');
    if (thumbEl) {
      const colorId = thumbEl.dataset.thumbColor || '';
      const idx = state.colors.findIndex(c => c.id === colorId);
      if (idx >= 0) {
        state.previewColorIndex = idx;
        updatePreview();
        // Also show preview panel on desktop if hidden
        if (previewPanel && window.innerWidth >= 1024) {
          previewPanel.classList.remove('hidden');
        }
      }
      return;
    }

    // Qty buttons
    const qtyBtn = target.closest<HTMLElement>('[data-qty-action]');
    if (qtyBtn) {
      const action = qtyBtn.dataset.qtyAction;
      const colorId = qtyBtn.dataset.qtyColor || '';
      const currentQty = state.colorQuantities.get(colorId) || 0;

      if (action === 'plus') {
        state.colorQuantities.set(colorId, currentQty + 1);
      } else if (action === 'minus' && currentQty > 0) {
        state.colorQuantities.set(colorId, currentQty - 1);
      }

      const input = body!.querySelector<HTMLInputElement>(`[data-qty-input="${colorId}"]`);
      if (input) input.value = String(state.colorQuantities.get(colorId) || 0);
      recalculate();
      return;
    }
  });

  /* ── Qty input change ── */
  body.addEventListener('change', (e: Event) => {
    const target = e.target as HTMLInputElement;
    const colorId = target.dataset.qtyInput;
    if (!colorId) return;

    const val = parseInt(target.value, 10);
    state.colorQuantities.set(colorId, isNaN(val) || val < 0 ? 0 : val);
    target.value = String(state.colorQuantities.get(colorId) || 0);
    recalculate();
  });

  /* ── Footer toggle + confirm (delegation on footer) ── */
  footer.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    // Toggle footer expand/collapse
    if (target.closest('#listing-footer-toggle')) {
      state.footerExpanded = !state.footerExpanded;
      // Recompute footer
      let totalQty = 0;
      for (const qty of state.colorQuantities.values()) totalQty += qty;
      const activePrice = state.priceTiers[state.activeTierIndex]?.price ?? 0;
      updateFooter(totalQty, activePrice);
      return;
    }

    // Confirm add to cart
    if (target.closest('#listing-cart-confirm')) {
      if (!state.product) return;

      // Check total qty
      let totalQty = 0;
      for (const qty of state.colorQuantities.values()) totalQty += qty;

      if (totalQty === 0) {
        // Flash warning on button
        const btn = footer.querySelector<HTMLElement>('#listing-cart-confirm');
        if (btn) {
          btn.textContent = 'Lutfen miktar secin!';
          btn.style.background = '#ef4444';
          setTimeout(() => {
            btn.textContent = 'Sepete Ekle';
            btn.style.background = '';
          }, 1500);
        }
        return;
      }

      const product = state.product;
      const activePrice = state.priceTiers[state.activeTierIndex]?.price ?? 0;

      // Accumulate in cart state
      const existing = cartState.get(product.id);
      if (existing) {
        for (const [colorId, qty] of state.colorQuantities) {
          if (qty > 0) {
            existing.colorQuantities.set(colorId, (existing.colorQuantities.get(colorId) || 0) + qty);
          }
        }
      } else {
        const cq = new Map<string, number>();
        for (const [colorId, qty] of state.colorQuantities) {
          if (qty > 0) cq.set(colorId, qty);
        }
        cartState.set(product.id, { product, colorQuantities: cq });
      }

      // Build grouped items for header popover
      let grandTotal = 0;
      let grandQty = 0;
      const supplierGroups = new Map<string, {
        supplierName: string;
        productTitle: string;
        items: { label: string; unitPrice: number; qty: number; colorValue: string }[];
      }>();

      for (const item of cartState.values()) {
        const p = item.product;
        const { high } = parsePrice(p.price);
        const supplier = p.supplierName || 'Supplier';
        const visual = productVisuals[p.imageKind];

        if (!supplierGroups.has(supplier)) {
          supplierGroups.set(supplier, {
            supplierName: supplier,
            productTitle: p.name,
            items: [],
          });
        }

        const group = supplierGroups.get(supplier)!;
        let itemQty = 0;
        for (const qty of item.colorQuantities.values()) itemQty += qty;

        grandQty += itemQty;
        grandTotal += high * itemQty;

        group.items.push({
          label: `${itemQty} adet, ${p.name.length > 40 ? p.name.substring(0, 40) + '...' : p.name}`,
          unitPrice: high,
          qty: itemQty,
          colorValue: visual?.stroke || '#e5e7eb',
        });
      }

      const groupedItems = Array.from(supplierGroups.values());

      document.dispatchEvent(new CustomEvent('cart-add', {
        detail: {
          productTitle: product.name,
          supplierName: product.supplierName || '',
          unitPrice: activePrice,
          quantity: grandQty,
          itemTotal: activePrice * totalQty,
          grandTotal,
          groupedItems,
        },
      }));

      closeDrawer();

      // Brief visual feedback on the card button
      const cardBtn = document.querySelector<HTMLElement>(`[data-add-to-cart="${product.id}"]`);
      if (cardBtn) {
        const original = cardBtn.textContent;
        cardBtn.textContent = 'Eklendi!';
        cardBtn.classList.replace('bg-orange-500', 'bg-green-500');
        cardBtn.classList.replace('hover:bg-orange-600', 'hover:bg-green-600');
        setTimeout(() => {
          cardBtn.textContent = original;
          cardBtn.classList.replace('bg-green-500', 'bg-orange-500');
          cardBtn.classList.replace('hover:bg-green-600', 'hover:bg-orange-600');
        }, 1500);
      }
    }
  });
}
