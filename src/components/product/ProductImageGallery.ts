/**
 * ProductImageGallery Component
 * Alibaba-style: vertical scrollable thumbnail strip (left) + large main image (right).
 * Thumbnails change main image on HOVER. Up/down scroll arrows on thumbnail strip.
 * Prev/next arrows on main image. Favorite + camera icons top-right.
 * Gallery container uses aspect-ratio 16/10 matching Alibaba layout.
 */

import { mockProduct } from '../../data/mockProduct';
import { ProductAttributes } from './ProductAttributes';

interface GalleryVisual {
  background: string;
  accent: string;
  stroke: string;
  icon: string;
}

const ZOOM_SCALE = 1.85;

const defaultVisual: GalleryVisual = {
  background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)',
  accent: 'rgba(156, 163, 175, 0.2)',
  stroke: '#9ca3af',
  icon: `<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>`,
};

function renderPlaceholder(visual: GalleryVisual, size: 'large' | 'thumb'): string {
  const svgSize = size === 'large' ? 'width="64" height="64"' : 'width="24" height="24"';
  return `
    <div class="w-full h-full flex items-center justify-center" style="background: ${visual.background};" data-gallery-main-media="true" aria-hidden="true">
      <svg ${svgSize} fill="none" stroke-width="1.4" viewBox="0 0 24 24" style="stroke: ${visual.stroke};">
        ${visual.icon}
      </svg>
    </div>
  `;
}

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderGalleryMedia(src: string | undefined, alt: string, visual: GalleryVisual, size: 'large' | 'thumb'): string {
  if (src) {
    const safeAlt = escapeHtmlAttr(alt);
    return `
      <img
        src="${src}"
        alt="${safeAlt}"
        data-gallery-main-media="true"
        class="gallery-media-asset gallery-media-asset--${size}"
        loading="${size === 'thumb' ? 'lazy' : 'eager'}"
        decoding="${size === 'thumb' ? 'async' : 'sync'}"
        draggable="false"
      />
    `;
  }

  return renderPlaceholder(visual, size);
}

const THUMB_SIZE = 60;
const THUMB_GAP = 6;
const LIGHTBOX_THUMB_SIZE = 76;
const LIGHTBOX_THUMB_GAP = 10;

export function ProductImageGallery(): string {
  const images = mockProduct.images;
  const needsScroll = images.length > 4;
  const firstImage = images[0];
  const needsLightboxThumbScroll = images.length > 6;

  const thumbsHtml = images.map((img, i) => `
    <div
      class="gallery-thumb${i === 0 ? ' active' : ''}"
      data-index="${i}"
      aria-label="${img.alt}"
    >${renderGalleryMedia(img.src, img.alt, defaultVisual, 'thumb')}</div>
  `).join('');

  // Attributes thumbnail — last slide
  const attrThumbHtml = `
    <div
      class="gallery-thumb gallery-thumb-attrs"
      data-index="${images.length}"
      aria-label="Özellikler"
    >
      <div class="relative w-full h-full overflow-hidden flex items-center justify-center" style="background: linear-gradient(180deg, #f0f4f8 0%, #e2e8f0 100%);" aria-hidden="true">
        <svg width="24" height="24" fill="none" stroke="#64748b" stroke-width="1.4" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      </div>
    </div>
  `;

  const lightboxThumbsHtml = images.map((img, i) => `
    <button
      type="button"
      class="gallery-lightbox-thumb${i === 0 ? ' active' : ''}"
      data-index="${i}"
      aria-label="${img.alt}"
    >${renderGalleryMedia(img.src, img.alt, defaultVisual, 'thumb')}</button>
  `).join('');

  return `
    <div id="product-gallery">

      <!-- LEFT: Vertical Thumbnail Strip -->
      <div id="pd-thumb-strip">

        ${needsScroll ? `
        <button type="button" id="thumb-scroll-up" class="pd-thumb-arrow" aria-label="Yukarı kaydır">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>
        </button>
        ` : ''}

        <div id="gallery-thumb-list">
          ${thumbsHtml}
          ${attrThumbHtml}
        </div>

        ${needsScroll ? `
        <button type="button" id="thumb-scroll-down" class="pd-thumb-arrow" aria-label="Aşağı kaydır">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        ` : ''}

      </div>

      <!-- RIGHT: Main Image Area (content only) -->
      <div id="gallery-main-image">
        ${renderGalleryMedia(firstImage?.src, firstImage?.alt ?? 'Ürün görseli', defaultVisual, 'large')}
      </div>

      <!-- RIGHT: Attributes Card (hidden by default, replaces main image) -->
      ${ProductAttributes()}

      <!-- Navigation arrows — always visible on all slides -->
      <button type="button" id="gallery-prev" class="gallery-nav-btn" aria-label="Önceki">
        <svg width="16" height="16" fill="none" stroke="#333" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button type="button" id="gallery-next" class="gallery-nav-btn" aria-label="Sonraki">
        <svg width="16" height="16" fill="none" stroke="#333" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
      </button>

      <!-- Action buttons — always visible -->
      <div id="gallery-action-btns">
        <button type="button" class="gallery-action-btn" aria-label="Favorilere ekle">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
        </button>
        <button type="button" class="gallery-action-btn" aria-label="Görsel ile ara">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 9a2 2 0 012-2h2l1-2h8l1 2h2a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><circle cx="12" cy="13" r="3"/></svg>
        </button>
      </div>

    </div>

    <!-- Photos / Attributes tabs -->
    <div id="pd-gallery-tabs">
      <button type="button" class="gallery-view-tab active">Fotoğraflar</button>
      <button type="button" class="gallery-view-tab">Özellikler</button>
    </div>

    <div id="gallery-lightbox" class="hidden" aria-hidden="true">
      <div id="gallery-lightbox-toolbar">
        <div id="gallery-lightbox-actions">
          <button type="button" class="gallery-lightbox-action-btn" aria-label="Favorilere ekle">
            <svg width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.9" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            <span>Favorite</span>
          </button>
          <button type="button" class="gallery-lightbox-action-btn" aria-label="Benzerini bul">
            <svg width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.9" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 7.5A2.5 2.5 0 0 1 5.5 5h2A2.5 2.5 0 0 1 10 7.5v2A2.5 2.5 0 0 1 7.5 12h-2A2.5 2.5 0 0 1 3 9.5v-2zm11 0A2.5 2.5 0 0 1 16.5 5h2A2.5 2.5 0 0 1 21 7.5v2a2.5 2.5 0 0 1-2.5 2.5h-2A2.5 2.5 0 0 1 14 9.5v-2zm-11 9A2.5 2.5 0 0 1 5.5 14h2A2.5 2.5 0 0 1 10 16.5v2A2.5 2.5 0 0 1 7.5 21h-2A2.5 2.5 0 0 1 3 18.5v-2zm13.5-2.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 2.5v2l1.6 1"/>
            </svg>
            <span>Find similar</span>
          </button>
        </div>

        <div id="gallery-lightbox-count">1/${images.length}</div>

        <button type="button" id="gallery-lightbox-close" aria-label="Galeriyi kapat">
          <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.1" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6l-12 12"/>
          </svg>
        </button>
      </div>

      <div id="gallery-lightbox-inner" role="dialog" aria-modal="true" aria-label="Ürün görsel galerisi">
        <div id="gallery-lightbox-sidebar">
          ${needsLightboxThumbScroll ? `
          <button type="button" id="gallery-lightbox-thumb-up" class="gallery-lightbox-scroll" aria-label="Yukarı kaydır">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>
          </button>
          ` : ''}

          <div id="gallery-lightbox-thumb-list">
            ${lightboxThumbsHtml}
          </div>

          ${needsLightboxThumbScroll ? `
          <button type="button" id="gallery-lightbox-thumb-down" class="gallery-lightbox-scroll" aria-label="Aşağı kaydır">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          ` : ''}
        </div>

        <div id="gallery-lightbox-stage">
          <div id="gallery-lightbox-image">
            ${renderGalleryMedia(firstImage?.src, firstImage?.alt ?? 'Ürün görseli', defaultVisual, 'large')}
          </div>

          <div id="gallery-lightbox-vertical-nav" aria-label="Görsel gezinme">
            <button type="button" id="gallery-lightbox-prev" class="gallery-lightbox-nav-btn" aria-label="Önceki görsel">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7-7-7 7"/></svg>
            </button>
            <button type="button" id="gallery-lightbox-next" class="gallery-lightbox-nav-btn" aria-label="Sonraki görsel">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7 7 7-7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initImageGallery(): void {
  const mainImage = document.getElementById('gallery-main-image');
  const thumbs = document.querySelectorAll<HTMLElement>('.gallery-thumb');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  const thumbList = document.getElementById('gallery-thumb-list');
  const scrollUpBtn = document.getElementById('thumb-scroll-up');
  const scrollDownBtn = document.getElementById('thumb-scroll-down');
  const attrCard = document.getElementById('pd-attributes-card');
  const viewTabs = document.querySelectorAll<HTMLButtonElement>('.gallery-view-tab');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxInner = document.getElementById('gallery-lightbox-inner');
  const lightboxImage = document.getElementById('gallery-lightbox-image');
  const lightboxCount = document.getElementById('gallery-lightbox-count');
  const lightboxCloseBtn = document.getElementById('gallery-lightbox-close');
  const lightboxPrevBtn = document.getElementById('gallery-lightbox-prev');
  const lightboxNextBtn = document.getElementById('gallery-lightbox-next');
  const lightboxThumbList = document.getElementById('gallery-lightbox-thumb-list');
  const lightboxThumbUpBtn = document.getElementById('gallery-lightbox-thumb-up');
  const lightboxThumbDownBtn = document.getElementById('gallery-lightbox-thumb-down');
  const lightboxThumbs = document.querySelectorAll<HTMLButtonElement>('.gallery-lightbox-thumb');

  if (!mainImage || thumbs.length === 0) return;
  const supportsHoverZoom = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  let currentIndex = 0;
  let lightboxIndex = 0;
  let isLightboxOpen = false;
  const imageCount = mockProduct.images.length;
  const totalSlides = imageCount + 1; // images + attributes slide
  const attrsIndex = imageCount;

  const getMainMedia = (): HTMLElement | null => {
    const node = mainImage.querySelector<HTMLElement>('[data-gallery-main-media="true"]');
    return node;
  };

  const resetZoom = (): void => {
    const media = getMainMedia();
    if (!media) return;
    media.style.transformOrigin = '50% 50%';
    media.style.transform = 'scale(1)';
    mainImage.classList.remove('is-zooming');
  };

  const syncLightboxThumbInView = (index: number): void => {
    if (!lightboxThumbList) return;
    const activeThumb = lightboxThumbList.querySelector<HTMLElement>(`.gallery-lightbox-thumb[data-index="${index}"]`);
    activeThumb?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  };

  const setLightboxSlide = (index: number): void => {
    if (!lightboxImage || imageCount === 0) return;

    if (index < 0) index = imageCount - 1;
    if (index >= imageCount) index = 0;
    lightboxIndex = index;

    const image = mockProduct.images[index];
    const visual = defaultVisual;
    lightboxImage.innerHTML = renderGalleryMedia(
      image?.src,
      image?.alt ?? `Ürün görünümü ${index + 1}`,
      visual,
      'large',
    );

    if (lightboxCount) {
      lightboxCount.textContent = `${index + 1}/${imageCount}`;
    }

    lightboxThumbs.forEach((thumb) => {
      const thumbIndex = parseInt(thumb.dataset.index || '0', 10);
      thumb.classList.toggle('active', thumbIndex === index);
    });

    syncLightboxThumbInView(index);
  };

  const openLightbox = (index: number): void => {
    if (!lightbox || !lightboxInner || imageCount === 0) return;
    setLightboxSlide(index);
    lightbox.classList.remove('hidden');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('gallery-lightbox-open');
    isLightboxOpen = true;
  };

  const closeLightbox = (): void => {
    if (!lightbox) return;
    lightbox.classList.add('hidden');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('gallery-lightbox-open');
    isLightboxOpen = false;
  };

  if (supportsHoverZoom) {
    mainImage.classList.add('zoom-enabled');

    mainImage.addEventListener('pointermove', (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;

      const media = getMainMedia();
      if (!media) return;

      const rect = mainImage.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      const clampedX = Math.min(100, Math.max(0, x));
      const clampedY = Math.min(100, Math.max(0, y));

      media.style.transformOrigin = `${clampedX}% ${clampedY}%`;
      media.style.transform = `scale(${ZOOM_SCALE})`;
      mainImage.classList.add('is-zooming');
    });

    mainImage.addEventListener('pointerleave', () => {
      resetZoom();
    });
  } else {
    mainImage.classList.remove('zoom-enabled');
  }

  function goToSlide(index: number): void {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;

    // Dispatch event for mobile gallery sync
    document.dispatchEvent(new CustomEvent('gallery-slide-change', { detail: { index: currentIndex } }));

    const isAttrs = index === attrsIndex;

    // Toggle main image vs attributes card visibility
    mainImage!.classList.toggle('hidden', isAttrs);
    attrCard?.classList.toggle('hidden', !isAttrs);

    // Update image placeholder when showing a photo slide
    if (!isAttrs) {
      const visual = defaultVisual;
      const image = mockProduct.images[index];
      mainImage!.innerHTML = renderGalleryMedia(
        image?.src,
        image?.alt ?? `Ürün görünümü ${index + 1}`,
        visual,
        'large',
      );
      resetZoom();
    }

    // Update thumbnail active state
    thumbs.forEach(t => {
      const ti = parseInt(t.dataset.index || '0', 10);
      if (ti === index) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    // Update tab active state
    viewTabs.forEach((tab, tabIdx) => {
      // tab 0 = Fotograflar (active for photo slides), tab 1 = Ozellikler (active for attrs)
      if ((tabIdx === 1 && isAttrs) || (tabIdx === 0 && !isAttrs)) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Scroll the active thumbnail into view within the thumb list
    if (thumbList) {
      const activeThumb = thumbList.children[index] as HTMLElement;
      if (activeThumb) {
        const listTop = thumbList.scrollTop;
        const listHeight = thumbList.clientHeight;
        const thumbTop = activeThumb.offsetTop;
        const thumbHeight = activeThumb.offsetHeight;

        if (thumbTop < listTop) {
          thumbList.scrollTo({ top: thumbTop, behavior: 'smooth' });
        } else if (thumbTop + thumbHeight > listTop + listHeight) {
          thumbList.scrollTo({ top: thumbTop + thumbHeight - listHeight, behavior: 'smooth' });
        }
      }
    }
  }

  // HOVER on thumbnails changes slide
  thumbs.forEach(thumb => {
    thumb.addEventListener('mouseenter', () => {
      goToSlide(parseInt(thumb.dataset.index || '0', 10));
    });
    thumb.addEventListener('click', () => {
      goToSlide(parseInt(thumb.dataset.index || '0', 10));
    });
  });

  // Prev / Next arrows cycle through all slides including attributes
  prevBtn?.addEventListener('click', (e) => { e.stopPropagation(); goToSlide(currentIndex - 1); });
  nextBtn?.addEventListener('click', (e) => { e.stopPropagation(); goToSlide(currentIndex + 1); });

  // Click main image to open full-screen gallery (photo slides only)
  mainImage.addEventListener('click', () => {
    if (currentIndex === attrsIndex) return;
    openLightbox(currentIndex);
  });

  // Lightbox controls
  lightboxCloseBtn?.addEventListener('click', closeLightbox);

  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  lightboxPrevBtn?.addEventListener('click', () => {
    setLightboxSlide(lightboxIndex - 1);
    goToSlide(lightboxIndex);
  });

  lightboxNextBtn?.addEventListener('click', () => {
    setLightboxSlide(lightboxIndex + 1);
    goToSlide(lightboxIndex);
  });

  lightboxThumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const thumbIndex = parseInt(thumb.dataset.index || '0', 10);
      setLightboxSlide(thumbIndex);
      goToSlide(lightboxIndex);
    });
  });

  if (lightboxThumbList && lightboxThumbUpBtn && lightboxThumbDownBtn) {
    const lightboxScrollAmount = LIGHTBOX_THUMB_SIZE + LIGHTBOX_THUMB_GAP;

    lightboxThumbUpBtn.addEventListener('click', () => {
      lightboxThumbList.scrollBy({ top: -lightboxScrollAmount, behavior: 'smooth' });
    });
    lightboxThumbDownBtn.addEventListener('click', () => {
      lightboxThumbList.scrollBy({ top: lightboxScrollAmount, behavior: 'smooth' });
    });
  }

  document.addEventListener('keydown', (event) => {
    if (!isLightboxOpen) return;

    if (event.key === 'Escape') {
      closeLightbox();
      return;
    }

    if (event.key === 'ArrowLeft') {
      setLightboxSlide(lightboxIndex - 1);
      goToSlide(lightboxIndex);
      return;
    }

    if (event.key === 'ArrowRight') {
      setLightboxSlide(lightboxIndex + 1);
      goToSlide(lightboxIndex);
    }
  });

  // Thumbnail scroll up/down
  if (thumbList && scrollUpBtn && scrollDownBtn) {
    const scrollAmount = THUMB_SIZE + THUMB_GAP;

    scrollUpBtn.addEventListener('click', () => {
      thumbList.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
    });
    scrollDownBtn.addEventListener('click', () => {
      thumbList.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    });
  }

  // Photos / Attributes tab click handlers
  viewTabs.forEach((tab, tabIdx) => {
    tab.addEventListener('click', () => {
      if (tabIdx === 1) {
        goToSlide(attrsIndex);
      } else {
        goToSlide(0);
      }
    });
  });

  // Listen for mobile swipe navigation
  document.addEventListener('gallery-go-to', ((e: CustomEvent) => {
    goToSlide(e.detail.index);
  }) as EventListener);
}
