/**
 * RFQ (Request for Quote) Page — Entry Point
 * Renders all 5 sections: Hero, Form, Selected Products, Custom Products, Testimonials.
 */

import './style.css'
import { initFlowbite } from 'flowbite'
import Swiper from 'swiper'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/swiper-bundle.css'

// Mock data
import { customizationCards, selectedProducts, customProducts, testimonials } from './data/rfq-mock-data'

// Types
import type { Product } from './types/rfq'
import { FILE_UPLOAD_CONFIG } from './types/rfq'

// --- Helper: Product Card HTML ---
function renderProductCard(product: Product): string {
  return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-card__image">
        <img
          src="${product.image || ''}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.parentElement.classList.add('product-card__image--fallback');this.style.display='none';"
        />
      </div>
      <div class="p-3">
        <p class="product-card__supplier">${product.supplierCount} tedarikçi</p>
        <h3 class="product-card__name">${product.name}</h3>
        <a href="#" class="product-card__cta">${product.ctaText}</a>
      </div>
    </div>
  `;
}

const appEl = document.querySelector<HTMLDivElement>('#app')!;
appEl.classList.add('relative');
appEl.innerHTML = `
  <!-- Header placeholder -->

  <!-- Main Content -->
  <main>
    <!-- Section 1: Hero Banner -->
    <section id="rfq-hero" class="rfq-hero" aria-label="RFQ fiyat teklifi talebi">
      <div class="container-boxed">
        <div class="flex flex-col xl:flex-row gap-8 items-center">
          <!-- Left Column: Text Content -->
          <div class="flex-1 text-center xl:text-left">
            <span class="rfq-hero__badge">RFQ</span>
            <h1 class="text-[length:var(--font-size-hero-lg)] font-bold text-[var(--color-text-inverted)] mt-4 mb-2 leading-tight">
              Fiyat Teklifi Talebi Oluşturun
            </h1>
            <p class="rfq-hero__subtitle">
              Binlerce tedarikçiden anında fiyat teklifi alın. Ürünlerinizi özelleştirin, en iyi fiyatları karşılaştırın.
            </p>
            <div class="flex items-center gap-4 mt-6 justify-center xl:justify-start">
              <a href="#" class="rfq-hero__outlined-btn focus-ring">
                Nasıl çalışır?
              </a>
            </div>
          </div>

          <!-- Right Column: Customization Cards 2x2 Grid -->
          <div class="grid grid-cols-2 gap-4 w-full xl:w-auto xl:max-w-[400px]">
            ${customizationCards.map(card => `
              <div class="rfq-hero__card" data-card-id="${card.id}" data-position="${card.position}">
                <span class="text-3xl mb-2 block">${card.icon}</span>
                <h3 class="font-semibold text-[var(--color-text-inverted)] text-base">${card.title}</h3>
                <p class="text-sm text-white/70">${card.subtitle}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: RFQ Form Card (overlapping hero) -->
    <section id="rfq-form" class="rfq-form" aria-label="Fiyat teklifi formu">
      <div class="container-boxed">
        <div class="rfq-form__card">
          <h2 class="text-xl font-bold text-[var(--color-text-primary)] mb-4">Fiyat Teklifi Talebi</h2>
          <form id="rfq-form-element" novalidate>
            <div id="rfq-textarea-container" class="border border-[var(--color-border-default)] rounded-lg overflow-hidden transition-colors duration-200">
              <textarea
                id="rfq-details"
                class="w-full p-4 text-sm text-[var(--color-text-primary)] bg-[var(--color-input-bg)] placeholder:text-[var(--color-input-placeholder)] resize-y min-h-[120px] border-none outline-none focus-ring"
                placeholder="Ürün detaylarını yazın... (örn: malzeme, boyut, miktar, renk tercihleri)"
                rows="4"
              ></textarea>
              <div class="flex flex-wrap items-center justify-between gap-3 p-3 border-t border-[var(--color-border-muted)]">
                <div class="flex items-center gap-3">
                  <!-- File Upload Button -->
                  <button
                    type="button"
                    id="rfq-upload-btn"
                    class="rfq-form__upload-btn focus-ring"
                    data-tooltip-target="upload-tooltip"
                    data-tooltip-placement="top"
                  >
                    <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    Dosya yükle
                  </button>
                  <input
                    type="file"
                    id="rfq-file-input"
                    class="hidden"
                    multiple
                    accept="${FILE_UPLOAD_CONFIG.allowedExtensions.join(',')}"
                  />
                  <!-- Flowbite Tooltip -->
                  <div id="upload-tooltip" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700">
                    En fazla ${FILE_UPLOAD_CONFIG.maxFiles} dosya. Desteklenen: ${FILE_UPLOAD_CONFIG.allowedFormatsDisplay}
                    <div class="tooltip-arrow" data-popper-arrow></div>
                  </div>

                  <!-- AI Toggle -->
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      id="rfq-ai-toggle"
                      class="w-4 h-4 text-[var(--color-primary-500)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--color-primary-500)] focus:ring-2"
                      checked
                    />
                    <span class="rfq-ai-badge">AI</span>
                    <span class="text-sm text-[var(--color-text-secondary)]">Akıllı eşleştirme</span>
                  </label>
                </div>

                <!-- Submit CTA -->
                <button type="submit" class="rfq-form__cta focus-ring">
                  RFQ detaylarını yaz
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- Section 3: Selected Products -->
    <section id="rfq-selected-products" class="py-8 bg-[var(--color-surface-muted)]" aria-label="Seçili ürünler">
      <div class="container-boxed">
        <h2 class="text-xl font-bold text-[var(--color-text-primary)] mb-6">Seçili Ürünler</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          ${selectedProducts.map(p => renderProductCard(p)).join('')}
        </div>
      </div>
    </section>

    <!-- Section 4: Custom Products -->
    <section id="rfq-custom-products" class="py-8 bg-[var(--color-surface)]" aria-label="Özel ürünler">
      <div class="container-boxed">
        <h2 class="text-xl font-bold text-[var(--color-text-primary)] mb-6">Özel Ürünler</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          ${customProducts.map(p => renderProductCard(p)).join('')}
        </div>
      </div>
    </section>

    <!-- Section 5: Testimonials -->
    <section id="rfq-testimonials" class="rfq-testimonial py-16" aria-label="Müşteri yorumları">
      <div class="container-boxed max-w-3xl mx-auto text-center">
        <h2 class="text-xl font-bold text-[var(--color-text-inverted)] mb-8">Müşterilerimiz Ne Diyor?</h2>
        <div class="swiper">
          <div class="swiper-wrapper">
            ${testimonials.map(t => `
              <div class="swiper-slide" data-testimonial-id="${t.id}">
                <blockquote class="rfq-testimonial__quote">
                  "${t.quote}"
                </blockquote>
                <div class="flex flex-col items-center mt-6">
                  <div class="rfq-testimonial__avatar">
                    <img
                      src="${t.avatar || ''}"
                      alt="${t.name}"
                      loading="lazy"
                      onerror="this.style.display='none';"
                    />
                  </div>
                  <p class="rfq-testimonial__name">${t.name}</p>
                  <p class="rfq-testimonial__title">${t.title}, ${t.company}</p>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="swiper-pagination mt-6"></div>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer placeholder -->
`;

// --- Initialize Flowbite ---
initFlowbite();

// --- Initialize Swiper Testimonial Carousel ---
new Swiper('#rfq-testimonials .swiper', {
  modules: [Autoplay, Pagination, EffectFade],
  effect: 'fade',
  fadeEffect: { crossFade: true },
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: '#rfq-testimonials .swiper-pagination',
    clickable: true,
  },
});

// --- File Upload Handling ---
const uploadBtn = document.getElementById('rfq-upload-btn') as HTMLButtonElement;
const fileInput = document.getElementById('rfq-file-input') as HTMLInputElement;

uploadBtn.addEventListener('click', () => {
  fileInput.click();
});

function validateFiles(files: FileList): boolean {
  if (files.length > FILE_UPLOAD_CONFIG.maxFiles) {
    alert('En fazla 6 dosya ekleyebilirsiniz.');
    fileInput.value = '';
    return false;
  }

  for (let i = 0; i < files.length; i++) {
    const fileName = files[i].name;
    const ext = ('.' + fileName.split('.').pop()!.toLowerCase()) as string;
    if (!FILE_UPLOAD_CONFIG.allowedExtensions.includes(ext as any)) {
      alert(`Desteklenmeyen dosya formatı: ${fileName}`);
      fileInput.value = '';
      return false;
    }
  }

  return true;
}

fileInput.addEventListener('change', () => {
  if (fileInput.files) {
    validateFiles(fileInput.files);
  }
});

// Drag-and-drop on upload button
uploadBtn.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadBtn.classList.add('rfq-form__upload-btn--dragover');
});

uploadBtn.addEventListener('dragleave', () => {
  uploadBtn.classList.remove('rfq-form__upload-btn--dragover');
});

uploadBtn.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadBtn.classList.remove('rfq-form__upload-btn--dragover');
  if (e.dataTransfer?.files) {
    if (validateFiles(e.dataTransfer.files)) {
      fileInput.files = e.dataTransfer.files;
    }
  }
});

// --- Form Validation ---
const form = document.getElementById('rfq-form-element') as HTMLFormElement;
const textarea = document.getElementById('rfq-details') as HTMLTextAreaElement;
const textareaContainer = document.getElementById('rfq-textarea-container') as HTMLDivElement;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const details = textarea.value.trim();

  if (!details) {
    textareaContainer.classList.add('border-error-500');
    textarea.focus();
    return;
  }

  textareaContainer.classList.remove('border-error-500');

  const aiCheckbox = document.getElementById('rfq-ai-toggle') as HTMLInputElement;
  const formData = {
    details,
    files: fileInput.files ? Array.from(fileInput.files) : [],
    aiEnabled: aiCheckbox.checked,
  };

  console.log('RFQ Form submitted:', formData);
});
