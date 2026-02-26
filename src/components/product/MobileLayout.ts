/**
 * MobileLayout Component
 * Mobile-only product detail layout for TradeHub B2B e-commerce,
 * styled after Alibaba's mobile product detail page.
 * Uses reusable collapsibleSection() and bottomSheet() builders
 * with data-attribute-driven JS initialization.
 */

import { mockProduct } from '../../data/mockProduct';
import { openShippingModal, openCartDrawer } from './CartDrawer';
import { openLoginModal } from './LoginModal';
import { renderStars } from './ProductReviews';

/* ── Reusable SVG fragments ──────────────────────────── */

const chevronSvg = `<svg class="pdm-chevron" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"/></svg>`;

const closeSvg = `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 6l12 12M18 6l-12 12"/></svg>`;

/* ── Reusable component builders ─────────────────────── */

interface CollapsibleConfig {
  id: string;
  title: string;
  previewHtml?: string;
  bodyHtml?: string;
  sheetId?: string;        // if set, header click opens this bottom sheet
  sectionClass?: string;   // extra class on the wrapper (e.g. 'pdm-shipping-section')
}

/** Renders a collapsible section with divider.
 *  - If `sheetId` is provided, clicking the header opens a bottom sheet.
 *  - If `bodyHtml` is provided, clicking the header toggles an inline body.
 *  - `previewHtml` is always visible below the header. */
function collapsibleSection(cfg: CollapsibleConfig): string {
  const headerAttr = cfg.sheetId
    ? `data-pdm-sheet="${cfg.sheetId}"`
    : cfg.bodyHtml ? `data-pdm-target="${cfg.id}-body"` : '';

  return `
    <div class="pdm-section-divider h-2 bg-surface-raised"></div>
    <div class="pdm-collapsible-section bg-surface${cfg.sectionClass ? ' ' + cfg.sectionClass : ''}" id="${cfg.id}">
      <button type="button" class="pdm-collapsible-header w-full flex items-center justify-between px-4 py-3.5 border-none bg-none text-sm font-semibold text-text-heading cursor-pointer text-left" ${headerAttr}>
        <span>${cfg.title}</span>
        ${chevronSvg}
      </button>
      ${cfg.previewHtml ?? ''}
      ${cfg.bodyHtml ? `<div class="pdm-collapsible-body pdm-hidden px-4 pb-3.5" id="${cfg.id}-body">${cfg.bodyHtml}</div>` : ''}
    </div>
  `;
}

/** Renders a bottom sheet modal with handle, header, close button, and body. */
function bottomSheet(id: string, title: string, bodyHtml: string): string {
  return `
    <div id="${id}" class="pdm-bottom-sheet pdm-hidden" aria-hidden="true">
      <div class="pdm-sheet-inner">
        <div class="pdm-sheet-handle"></div>
        <div class="pdm-sheet-header">
          <span>${title}</span>
          <button type="button" class="pdm-sheet-close" data-pdm-close="${id}" aria-label="Kapat">${closeSvg}</button>
        </div>
        <div class="pdm-sheet-body">${bodyHtml}</div>
      </div>
    </div>
  `;
}

/* ── Variant section renderer ────────────────────────── */

function renderVariantSection(variant: typeof mockProduct.variants[number]): string {
  const available = variant.options.filter(o => o.available).length;

  if (variant.type === 'color') {
    const thumbs = variant.options.map(opt => `
      <button type="button" class="pdm-color-thumb w-14 h-14 rounded-[6px] border-2 border-border-default overflow-hidden cursor-pointer p-0 bg-none${!opt.available ? ' pdm-disabled' : ''}"
        data-value="${opt.id}" data-label="${opt.label}" ${!opt.available ? 'disabled' : ''}>
        ${opt.thumbnail
          ? `<img src="${opt.thumbnail}" alt="${opt.label}" class="w-full h-full object-cover" />`
          : `<span class="pdm-color-swatch" style="background:${opt.value}"></span>`}
      </button>
    `).join('');

    return collapsibleSection({
      id: `pdm-color-section`,
      title: `${variant.label} <em>(${available})</em>`,
      bodyHtml: `<div class="pdm-color-thumbs flex flex-wrap gap-2">${thumbs}</div>`,
    });
  }

  // Size / Material — pill layout
  const pills = variant.options.map(opt => `
    <button type="button" class="pdm-variant-pill px-4 py-[7px] border border-border-medium rounded-2xl text-[13px] text-text-body bg-surface cursor-pointer${!opt.available ? ' pdm-disabled' : ''}"
      data-value="${opt.id}" data-label="${opt.label}" ${!opt.available ? 'disabled' : ''}>
      ${opt.label}
    </button>
  `).join('');

  return collapsibleSection({
    id: `pdm-${variant.type}-section`,
    title: `${variant.label} <em>(${available})</em>`,
    bodyHtml: `<div class="pdm-variant-pills flex flex-wrap gap-2">${pills}</div>`,
  });
}

/* ══════════════════════════════════════════════════════
   Main Layout HTML
   ══════════════════════════════════════════════════════ */

export function MobileProductLayout(): string {
  const p = mockProduct;

  // ── Sections 1-5: Gallery, Badges, Price, Sample, Title ──

  const gallerySection = `
    <div id="pdm-gallery-wrap">
      <div id="pdm-gallery-track">
        ${p.images.map((img, i) => `
          <div class="pdm-gallery-slide" data-slide-index="${i}">
            ${img.src
              ? `<img src="${img.src}" alt="${img.alt}" draggable="false" loading="${i === 0 ? 'eager' : 'lazy'}">`
              : `<div class="pdm-gallery-placeholder">
                  <svg width="64" height="64" fill="none" stroke="#9ca3af" stroke-width="1.4" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
                  </svg>
                </div>`
            }
          </div>
        `).join('')}
      </div>
      <!-- Action buttons -->
      <div id="pdm-gallery-actions">
        <button type="button" class="pdm-gallery-action-btn" aria-label="Favorilere ekle">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
        </button>
        <button type="button" class="pdm-gallery-action-btn" aria-label="Görsel ile ara">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 9a2 2 0 012-2h2l1-2h8l1 2h2a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><circle cx="12" cy="13" r="3"/></svg>
        </button>
      </div>
      <!-- Counter pill -->
      <div id="pdm-gallery-counter">Fotoğraflar <span id="pdm-counter-current">1</span>/${p.images.length}</div>
    </div>
  `;

  const badgesSection = `
    <div id="pdm-badges" class="flex gap-2 pt-3 px-4 bg-surface">
      <span class="pdm-badge-dark inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded bg-[#222] text-white leading-[1.4]">Sevkiyata Hazır</span>
      <span class="pdm-badge-orange inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded border border-cta-primary text-cta-primary bg-transparent leading-[1.4]">Özelleştirilebilir</span>
    </div>
  `;

  const priceTiersSection = `
    <div id="pdm-price-tiers" class="grid grid-cols-3 bg-surface-raised rounded-lg mx-4 mt-3 py-3.5">
      ${p.priceTiers.map(tier => `
        <div class="pdm-tier-col flex flex-col items-center px-3 border-r border-border-default last:border-r-0">
          <span class="pdm-tier-price text-lg font-bold text-[#111] leading-[1.3]">$${tier.price.toFixed(2)}</span>
          <span class="pdm-tier-qty text-[11px] text-text-placeholder mt-[3px] text-center">${tier.maxQty !== null
            ? `${tier.minQty} - ${tier.maxQty} ${p.unit}`
            : `>= ${tier.minQty} ${p.unit}`}</span>
        </div>
      `).join('')}
    </div>
  `;

  const sampleSection = `
    <div id="pdm-sample-row" class="flex items-center justify-between px-4 py-2.5 bg-surface text-[13px] text-text-body">
      <span>Numune fiyatı: <strong>$${p.samplePrice?.toFixed(2) ?? '30.00'}</strong></span>
      <button type="button" class="pdm-sample-btn px-[18px] py-1.5 border border-[#333] rounded-[20px] text-[13px] font-medium bg-surface cursor-pointer text-text-body">Numune Al</button>
    </div>
  `;

  const titleSection = `
    <div id="pdm-title-section" class="flex flex-col gap-1 pt-3.5 px-4 pb-1.5 bg-surface">
      <div id="pdm-title-row" class="flex items-start justify-between gap-3">
        <h1 id="pdm-product-title" class="text-[15px] font-semibold leading-[1.45] text-text-heading m-0 flex-1 line-clamp-3">${p.title}</h1>
        <button type="button" class="pdm-share-btn shrink-0 w-8 h-8 border-none bg-none cursor-pointer text-text-muted p-1 flex items-center justify-center" aria-label="Paylaş">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
        </button>
      </div>
      <div id="pdm-reviews-row" class="flex items-center gap-1.5 px-4 pb-3 text-[13px] text-text-muted cursor-pointer">
        <span class="pdm-stars flex gap-0.5 text-[#f5a623]">${renderStars(p.rating)}</span>
        <span>${p.reviewCount} yorum</span>
      </div>
    </div>
  `;

  // ── Section 6: Variants (dynamic via renderVariantSection) ──

  const variantSections = p.variants.map(v => renderVariantSection(v)).join('');

  // ── Sections 7-10: Collapsible info sections (all use collapsibleSection) ──

  const shippingSection = collapsibleSection({
    id: 'pdm-ship-section',
    title: 'Kargolama',
    sectionClass: 'pdm-shipping-section',
    sheetId: 'shipping-modal',  // special: opens existing ShippingModal
    previewHtml: `
      <div id="pdm-ship-preview" class="px-4 pb-3.5 text-[13px] text-text-body leading-[1.6]">
        <div class="pdm-ship-method font-semibold text-text-heading">${p.shipping[0].method}</div>
        <div class="pdm-ship-detail flex gap-4 mt-1">
          <span class="text-text-muted">Tahmini Maliyet: <strong>${p.shipping[0].cost}</strong></span>
          <span class="text-text-muted">Süre: <strong>${p.shipping[0].estimatedDays}</strong></span>
        </div>
      </div>
    `,
  });

  const protectionsSection = collapsibleSection({
    id: 'pdm-protections-section',
    title: 'Bu ürün için güvenceler',
    sheetId: 'pdm-sheet-protections',
    previewHtml: `
      <div id="pdm-protections-preview" class="px-4 pb-3.5">
        <div class="pdm-protection-item flex items-center gap-2.5 py-1.5 text-[13px] text-text-body">
          <div class="pdm-protection-icon shrink-0 w-5 h-5 text-text-muted">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"/><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <span>Güvenli ödemeler</span>
        </div>
        <div class="pdm-protection-item flex items-center gap-2.5 py-1.5 text-[13px] text-text-body">
          <div class="pdm-protection-icon shrink-0 w-5 h-5 text-text-muted">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M9 14l-4-4 4-4"/><path d="M5 10h11a4 4 0 010 8h-1"/></svg>
          </div>
          <span>Standart iade politikası</span>
        </div>
        <div class="pdm-trade-badge flex items-center gap-1.5 pt-2 text-[13px] font-semibold text-cta-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#e85d04"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4" fill="none" stroke="#fff" stroke-width="2"/></svg>
          Ticaret Güvencesi
        </div>
      </div>
    `,
  });

  const keyAttrsSection = collapsibleSection({
    id: 'pdm-keyattrs-section',
    title: 'Temel Özellikler',
    sheetId: 'pdm-sheet-keyattrs',
    previewHtml: `
      <div id="pdm-keyattrs-preview" class="px-4 pb-3.5">
        <div class="pdm-attrs-grid grid grid-cols-2 gap-y-2 gap-x-4">
          ${p.specs.slice(0, 4).map(s => `
            <div class="pdm-attr-item flex flex-col">
              <span class="pdm-attr-key text-[11px] text-text-placeholder">${s.key}</span>
              <span class="pdm-attr-val text-[13px] text-text-heading font-medium">${s.value}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `,
  });

  const customizationSection = collapsibleSection({
    id: 'pdm-customization-section',
    title: 'Özelleştirme Seçenekleri',
    sheetId: 'pdm-sheet-customization',
    previewHtml: `
      <div id="pdm-custom-preview" class="px-4 pb-3.5">
        ${p.customizationOptions.map(o => `
          <div class="pdm-custom-item flex items-center gap-2 text-[13px] text-text-body">
            <svg class="w-4 h-4 text-text-muted shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
            <span>${o.name}</span>
          </div>
        `).join('')}
      </div>
    `,
  });

  // ── Section 11: Supplier Card ──

  const si = p.supplier;
  const supplierSection = `
    <div class="pdm-section-divider h-2 bg-surface-raised"></div>
    <div id="pdm-supplier-card" class="bg-surface p-4">
      <div class="pdm-supplier-header flex items-center gap-3 mb-1">
        <div class="pdm-supplier-logo w-12 h-12 rounded-lg bg-[#fef9e7] flex items-center justify-center shrink-0 text-lg font-bold text-primary-600">${si.name.charAt(0)}${si.name.split(' ')[1]?.charAt(0) || ''}</div>
        <div>
          <div class="pdm-supplier-name text-sm font-bold text-text-heading leading-[1.3]">${si.name}</div>
          <div class="pdm-supplier-meta text-xs text-text-muted mt-0.5 flex items-center gap-1.5">
            ${si.yearsInBusiness} yıl <span>&middot;</span> ${si.verified ? 'Doğrulanmış Tedarikçi' : ''}
          </div>
        </div>
      </div>
      <div class="pdm-supplier-stats grid grid-cols-3 border border-border-default rounded-lg my-3 overflow-hidden">
        ${[
          { val: si.onTimeDelivery, label: 'Zamanında Teslimat' },
          { val: si.annualRevenue, label: 'Yıllık Gelir' },
          { val: si.responseTime, label: 'Yanıt Süresi' },
        ].map(s => `
          <div class="pdm-supplier-stat flex flex-col items-center py-2.5 px-1 border-r border-border-default last:border-r-0 text-center"><strong class="text-sm font-bold text-text-heading">${s.val}</strong><span class="text-[11px] text-text-placeholder mt-0.5">${s.label}</span></div>
        `).join('')}
      </div>
      <div class="pdm-supplier-btns grid grid-cols-2 gap-2">
        <button type="button" class="pdm-supplier-btn py-2.5 px-2 border border-border-medium rounded-[22px] bg-surface text-[13px] font-medium text-text-heading cursor-pointer text-center">Şirket Profili</button>
        <button type="button" class="pdm-supplier-btn py-2.5 px-2 border border-border-medium rounded-[22px] bg-surface text-[13px] font-medium text-text-heading cursor-pointer text-center">Diğer Ürünler</button>
      </div>
    </div>
  `;

  // ── Bottom Sheets (all use bottomSheet builder) ──

  const sheets = [
    bottomSheet('pdm-sheet-protections', 'Güvenceler', `
      <h3 class="pdm-sheet-section-title">Her aşamada koruma</h3>
      <div class="pdm-sheet-protection-block">
        <h4>Güvenli ödemeler</h4>
        <p>Her işlem korunur. Ödeme bilgileriniz asla tedarikçiyle paylaşılmaz.</p>
        <div class="pdm-payment-icons">
          ${['VISA', 'MC', 'PayPal', 'T/T', 'L/C'].map(m => `<span class="pdm-payment-icon">${m}</span>`).join('')}
        </div>
      </div>
      <div class="pdm-sheet-protection-block">
        <h4>İade politikası</h4>
        <p>30 gün içinde iade başvurusu yapabilirsiniz. Ürünler hasarlı veya tanımlandığı gibi değilse iade kabul edilir.</p>
      </div>
      <div class="pdm-trade-badge flex items-center gap-1.5 pt-2 text-[13px] font-semibold text-cta-primary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#e85d04"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4" fill="none" stroke="#fff" stroke-width="2"/></svg>
        Ticaret Güvencesi
      </div>
    `),

    bottomSheet('pdm-sheet-keyattrs', 'Temel Özellikler', `
      <table class="pdm-attrs-table">
        ${p.specs.map(s => `<tr><td>${s.key}</td><td>${s.value}</td></tr>`).join('')}
      </table>
    `),

    bottomSheet('pdm-sheet-customization', 'Özelleştirme Seçenekleri', `
      <table class="pdm-custom-table">
        <thead><tr><th>Seçenek</th><th>Min. Sipariş</th><th>Birim Fiyat</th></tr></thead>
        <tbody>
          ${p.customizationOptions.map(o => `<tr><td>${o.name}</td><td>${o.minOrder}</td><td>${o.priceAddon}</td></tr>`).join('')}
        </tbody>
      </table>
    `),
  ].join('');

  // ── Sticky section tabs ──

  const sectionTabs = `
    <div id="pdm-section-tabs">
      <button type="button" class="pdm-section-tab pdm-section-tab-active" data-pdm-tab="pdm-sec-overview">Genel Bakış</button>
      <button type="button" class="pdm-section-tab" data-pdm-tab="pdm-sec-details">Detaylar</button>
      <button type="button" class="pdm-section-tab" data-pdm-tab="pdm-sec-supplier">Öneriler</button>
    </div>
  `;

  // ── Assemble ──

  return `
    <div id="pdm-mobile-layout">
      ${gallerySection}

      ${sectionTabs}

      <!-- Overview section -->
      <div id="pdm-sec-overview">
        ${badgesSection}
        ${priceTiersSection}
        ${sampleSection}
        ${titleSection}
        ${variantSections}
      </div>

      <!-- Details section -->
      <div id="pdm-sec-details">
        ${shippingSection}
        ${protectionsSection}
        ${keyAttrsSection}
        ${customizationSection}
      </div>

      <!-- Supplier / Recommendations section -->
      <div id="pdm-sec-supplier">
        ${supplierSection}
      </div>
    </div>
    ${sheets}
  `;
}

/* ══════════════════════════════════════════════════════
   Init — JS behaviors (mobile only)
   ══════════════════════════════════════════════════════ */

export function initMobileLayout(): void {
  if (window.matchMedia('(min-width: 1024px)').matches) return;

  initMobileGallery();
  initSectionTabs();
  initCollapsibles();
  initSheetTriggers();
  initBottomBar();
  initVariantSelection();
}

/* ── Gallery: scroll-snap carousel ───────────────────── */

function initMobileGallery(): void {
  const counterEl = document.getElementById('pdm-counter-current');
  const track = document.getElementById('pdm-gallery-track');
  if (!track) return;

  const slides = track.querySelectorAll<HTMLElement>('.pdm-gallery-slide');
  if (slides.length === 0) return;

  let currentIdx = 0;
  let scrollTimer: ReturnType<typeof setTimeout> | null = null;

  track.addEventListener('scroll', () => {
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const slideWidth = track.clientWidth;
      if (slideWidth === 0) return;
      const newIdx = Math.round(track.scrollLeft / slideWidth);
      if (newIdx !== currentIdx && newIdx >= 0 && newIdx < slides.length) {
        currentIdx = newIdx;
        if (counterEl) counterEl.textContent = String(newIdx + 1);
      }
    }, 50);
  }, { passive: true });
}

/* ── Collapsible sections (data-pdm-target driven) ───── */

function initCollapsibles(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-pdm-target]').forEach(header => {
    header.addEventListener('click', () => {
      const body = document.getElementById(header.dataset.pdmTarget!);
      if (!body) return;
      body.classList.toggle('pdm-hidden');
      header.classList.toggle('pdm-collapsible-open');
    });
  });
}

/* ── Bottom sheet open/close + triggers (data-pdm-sheet driven) ── */

let activeSheetId: string | null = null;

function openSheet(sheetId: string): void {
  const sheet = document.getElementById(sheetId);
  if (!sheet) return;
  activeSheetId = sheetId;
  sheet.classList.remove('pdm-hidden');
  sheet.setAttribute('aria-hidden', 'false');
  document.body.classList.add('pdm-sheet-open');
  requestAnimationFrame(() => requestAnimationFrame(() => sheet.classList.add('pdm-sheet-visible')));
}

function closeSheet(sheetId: string): void {
  const sheet = document.getElementById(sheetId);
  if (!sheet) return;
  activeSheetId = null;
  sheet.classList.remove('pdm-sheet-visible');
  const inner = sheet.querySelector<HTMLElement>('.pdm-sheet-inner');
  if (inner) {
    inner.style.transition = '';
    inner.style.transform = '';   // clear inline from drag — let CSS animate to translateY(100%)
  }
  const onEnd = () => {
    sheet.classList.add('pdm-hidden');
    sheet.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('pdm-sheet-open');
  };
  inner?.addEventListener('transitionend', onEnd, { once: true });
  setTimeout(onEnd, 350);
}

function initSheetTriggers(): void {
  // Open triggers — all driven by data-pdm-sheet attribute
  document.querySelectorAll<HTMLButtonElement>('[data-pdm-sheet]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const target = trigger.dataset.pdmSheet!;
      if (target === 'shipping-modal') {
        openShippingModal();
      } else {
        openSheet(target);
      }
    });
  });

  // Close triggers — all driven by data-pdm-close attribute
  document.querySelectorAll<HTMLButtonElement>('[data-pdm-close]').forEach(btn => {
    btn.addEventListener('click', () => closeSheet(btn.dataset.pdmClose!));
  });

  // Backdrop click closes sheet
  document.querySelectorAll<HTMLElement>('.pdm-bottom-sheet').forEach(sheet => {
    sheet.addEventListener('click', (e) => {
      if (e.target === sheet) closeSheet(sheet.id);
    });
  });

  // Escape key closes active sheet
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeSheetId) closeSheet(activeSheetId);
  });

  // Drag-to-dismiss gesture on each bottom sheet (pointer events — works for both mouse & touch)
  document.querySelectorAll<HTMLElement>('.pdm-bottom-sheet').forEach(sheet => {
    const inner = sheet.querySelector<HTMLElement>('.pdm-sheet-inner');
    if (!inner) return;

    const handle = inner.querySelector<HTMLElement>('.pdm-sheet-handle');
    const header = inner.querySelector<HTMLElement>('.pdm-sheet-header');
    const dragTarget = handle || header || inner;

    let startY = 0;
    let currentY = 0;
    let dragging = false;

    dragTarget.addEventListener('pointerdown', (e: PointerEvent) => {
      startY = e.clientY;
      currentY = startY;
      dragging = true;
      inner.style.transition = 'none';
      dragTarget.setPointerCapture(e.pointerId);
    });

    dragTarget.addEventListener('pointermove', (e: PointerEvent) => {
      if (!dragging) return;
      currentY = e.clientY;
      const deltaY = currentY - startY;
      if (deltaY > 0) {
        inner.style.transform = `translateY(${deltaY}px)`;
        const progress = Math.min(deltaY / inner.offsetHeight, 1);
        sheet.style.background = `rgba(0,0,0,${0.5 * (1 - progress)})`;
      }
    });

    dragTarget.addEventListener('pointerup', () => {
      if (!dragging) return;
      dragging = false;
      inner.style.transition = '';
      sheet.style.background = '';
      const deltaY = currentY - startY;
      if (deltaY > inner.offsetHeight * 0.3) {
        closeSheet(sheet.id);
      } else {
        inner.style.transform = 'translateY(0)';
      }
    });
  });
}

/* ── Bottom bar actions ──────────────────────────────── */

function initBottomBar(): void {
  document.getElementById('pdm-bar-cart')?.addEventListener('click', openCartDrawer);
  document.getElementById('pdm-bar-order')?.addEventListener('click', openLoginModal);
}

/* ── Sticky section tabs — scroll-to + active tracking ── */

function initSectionTabs(): void {
  const tabBar = document.getElementById('pdm-section-tabs');
  const tabs = document.querySelectorAll<HTMLButtonElement>('.pdm-section-tab');
  if (!tabBar || tabs.length === 0) return;

  const sectionIds = Array.from(tabs).map(t => t.dataset.pdmTab!);
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
  if (sections.length === 0) return;

  let isScrolling = false;

  // Set sticky top position below header
  const stickyHeaderEl = document.getElementById('sticky-header');
  if (stickyHeaderEl) {
    const updateTop = () => {
      tabBar.style.top = `${stickyHeaderEl.offsetHeight}px`;
    };
    updateTop();
    window.addEventListener('resize', updateTop);
  }

  // Click → smooth scroll to section
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.pdmTab!;
      const section = document.getElementById(targetId);
      if (!section) return;

      isScrolling = true;
      const tabBarH = tabBar.offsetHeight;
      const stickyHeader = document.getElementById('sticky-header');
      const headerH = stickyHeader?.offsetHeight ?? 0;
      const offset = headerH + tabBarH;

      const top = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });

      setActiveTab(tab);
      setTimeout(() => { isScrolling = false; }, 600);
    });
  });

  function setActiveTab(active: HTMLButtonElement): void {
    tabs.forEach(t => t.classList.remove('pdm-section-tab-active'));
    active.classList.add('pdm-section-tab-active');
  }

  // Scroll → track active section via IntersectionObserver
  const stickyHeader = document.getElementById('sticky-header');
  const headerH = stickyHeader?.offsetHeight ?? 0;
  const rootMargin = `${-(headerH + tabBar.offsetHeight + 1)}px 0px -60% 0px`;

  const observer = new IntersectionObserver((entries) => {
    if (isScrolling) return;
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const idx = sections.indexOf(entry.target as HTMLElement);
        if (idx >= 0) setActiveTab(tabs[idx]);
      }
    }
  }, { rootMargin, threshold: 0 });

  sections.forEach(sec => observer.observe(sec));
}

/* ── Variant selection (delegated) ───────────────────── */

function initVariantSelection(): void {
  // Color thumbnails
  const colorBody = document.getElementById('pdm-color-section-body');
  if (colorBody) {
    colorBody.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.pdm-color-thumb:not(.pdm-disabled)');
      if (!btn) return;
      colorBody.querySelectorAll('.pdm-color-thumb').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  }

  // Size/Material pills — delegated per pill group
  document.querySelectorAll<HTMLElement>('.pdm-variant-pills').forEach(group => {
    group.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.pdm-variant-pill:not(.pdm-disabled)');
      if (!btn) return;
      group.querySelectorAll('.pdm-variant-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}
