/**
 * RFQ (Request for Quote) Page — Entry Point
 * Renders all 5 sections: Hero, Form, Selected Products, Custom Products, Testimonials.
 */

import './style.css'
import { initFlowbite } from 'flowbite'
import Swiper from 'swiper'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/swiper-bundle.css'

// Assets
import rfqVideoUrl from './assets/images/rfqvidehero.mp4'

// Header & Footer components
import { TopBar, MobileSearchTabs, initMobileDrawer, SubHeader, initStickyHeaderSearch, MegaMenu, initMegaMenu } from './components/header'
import { FooterLinks } from './components/footer'

// Shared components
import { Breadcrumb } from './components/shared/Breadcrumb'

// Icons
import aiIconUrl from './assets/images/O1CN01WQ8Lqg1SIdpcL5OHE_!!6000000002224-55-tps-16-16.svg'

// Utilities
import { initAnimatedPlaceholder } from './utils/animatedPlaceholder'

// Mock data
import { selectedProducts, customProducts, testimonials } from './data/rfq-mock-data'

// Types
import type { Product, RFQFormData } from './types/rfq'
import { FILE_UPLOAD_CONFIG } from './types/rfq'

// --- Helper: Product Card HTML ---
function renderProductCard(product: Product): string {
  return `
    <div class="border border-border-default rounded-xl bg-white overflow-hidden transition-shadow duration-200 hover:shadow-lg" data-product-id="${product.id}">
      <div class="aspect-square overflow-hidden bg-surface-raised">
        <img
          src="${product.image || ''}"
          alt="${product.name}"
          loading="lazy"
          class="w-full h-full object-cover"
          onerror="this.parentElement.classList.add('flex','items-center','justify-center','text-text-tertiary');this.style.display='none';"
        />
      </div>
      <div class="p-3">
        <p class="text-xs text-[#767676]" style="font-family: Alibaba_B2B_Sans, Inter, sans-serif;">${product.supplierCount} tedarikçi sağlıyor</p>
        <h3 class="line-clamp-2 text-sm text-(--color-text-heading,#111827) my-1 mb-3" style="font-family: Alibaba_B2B_Sans, Inter, sans-serif;">${product.name}</h3>
        <a href="#" class="inline-block text-sm text-(--color-text-heading,#111827) underline transition-colors duration-200 hover:text-primary-600 mb-3" style="font-family: Alibaba_B2B_Sans, Inter, sans-serif;">${product.ctaText}</a>
      </div>
    </div>
  `;
}

const appEl = document.querySelector<HTMLDivElement>('#app')!;
appEl.classList.add('relative');
appEl.innerHTML = `
  <!-- Sticky Header (global) -->
  <div id="sticky-header" class="sticky top-0 z-(--z-header)" style="background-color:var(--header-scroll-bg);border-bottom:1px solid var(--header-scroll-border)">
    ${TopBar()}
    ${SubHeader()}
  </div>

  <!-- Mobile Search Tabs (Products | Manufacturers | Worldwide) -->
  ${MobileSearchTabs('products')}

  <!-- Mega Menu -->
  ${MegaMenu()}

  <!-- Main Content -->
  <main>
    <div class="container-boxed">
      ${Breadcrumb([{ label: 'Teklif İste' }])}
    </div>
    <!-- Section 1: Hero Banner -->
    <section id="rfq-hero" class="rfq-hero relative overflow-hidden" aria-label="RFQ fiyat teklifi talebi" style="height: auto; min-height: 240px; background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAxIiBoZWlnaHQ9IjcyMiIgdmlld0JveD0iMCAwIDMwMSA3MjIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAuNzcxMzYyIDY4My44OTRIMjU3LjQ4MkwwLjc3MTM2MiAxNjguNDY3VjY4My44OTRaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfNV81NikiLz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfNV81NiIgeDE9Ii0zNC4zMjQyIiB5MT0iMjA2LjAxNCIgeDI9IjEyNy4zNDEiIHkyPSI2OTUuMzY1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iIzIyMjU4NCIgc3RvcC1vcGFjaXR5PSIwLjkiLz48c3RvcCBvZmZzZXQ9IjAuNDI3ODg1IiBzdG9wLWNvbG9yPSIjMjIyNTg0IiBzdG9wLW9wYWNpdHk9IjAuNSIvPjxzdG9wIG9mZnNldD0iMC42NTM4NDYiIHN0b3AtY29sb3I9IiMyMjI1ODQiIHN0b3Atb3BhY2l0eT0iMC4zIi8+PHN0b3Agb2Zmc2V0PSIwLjkzMzYxMiIgc3RvcC1jb2xvcj0iIzIyMjU4NCIgc3RvcC1vcGFjaXR5PSIwIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PC9zdmc+'), linear-gradient(to right, rgb(35, 29, 104) 0%, rgb(38, 39, 114) 70%, rgb(36, 37, 112) 71%, rgb(36, 37, 107) 100%); background-size: cover; background-position: left center;">
      <!-- Video Background -->
      <video src="${rfqVideoUrl}" autoplay loop muted playsinline class="hidden sm:block absolute right-0 w-full max-w-[664px] h-full object-cover z-0 opacity-100 pointer-events-none" style="-webkit-mask-image: linear-gradient(to right, transparent, black 15%); mask-image: linear-gradient(to right, transparent, black 15%); object-position: center; top: 50%; transform: translateY(-50%);"></video>

      <div class="container-boxed relative z-10 flex flex-col justify-center max-w-[1200px] mx-auto h-full px-[var(--spacing-fluid-sm)] py-6 sm:py-0">
        <div class="flex flex-col xl:flex-row gap-4 sm:gap-8 items-center py-4 sm:py-6 w-full justify-between">
          <!-- Left Column: Text Content -->
          <div class="flex-1 text-center xl:text-left">
            <span class="inline-block bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">RFQ</span>
            <h1 class="text-xl sm:text-[length:var(--font-size-hero-lg)] font-bold text-(--color-text-inverse) mt-3 sm:mt-4 mb-2 leading-tight">
              Fiyat Teklifi Talebi Oluşturun
            </h1>
            <p class="text-sm sm:text-base text-white/80">
              Binlerce tedarikçiden anında fiyat teklifi alın. Ürünlerinizi özelleştirin, en iyi fiyatları karşılaştırın.
            </p>
            <div class="flex items-center gap-4 mt-4 sm:mt-6 justify-center xl:justify-start">
              <a href="#" class="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 border-2 border-white/60 rounded-full text-white text-sm sm:text-base font-medium transition-all duration-200 hover:bg-white/15 hover:border-white focus-ring group">
                Nasıl çalışır?
              </a>
            </div>
          </div>

          <!-- Right Area: Empty space for Video -->
          <div class="hidden xl:block xl:w-[50%] h-full min-h-[300px]"></div>
        </div>
      </div>
    </section>

    <!-- Section 2: RFQ Form Card (overlapping hero) -->
    <section id="rfq-form" class="rfq-form -mt-10 relative z-20" aria-label="Fiyat teklifi formu">
      <div class="max-w-[1200px] mx-auto px-[var(--spacing-fluid-sm)] xl:px-0">
        <div class="bg-white rounded-lg shadow-md w-full p-[var(--spacing-fluid-sm)] sm:p-5">
          <h2 class="font-bold text-[#222222] mb-4 sm:mb-[20px] text-base sm:text-lg" style="font-family: Alibaba_B2B_Sans, Inter, sans-serif;">Talebinizin detaylarını yazın</h2>
          <form id="rfq-form-element" class="w-full" novalidate>
            <div id="rfq-textarea-container" class="border border-solid border-[#e5e5e5] rounded overflow-hidden transition-colors duration-200 hover:border-[#cc9900]" style="padding: 12px 12px 8px; min-height: 120px; background-color: #f8f8f8;">
              
              <!-- File Upload Button inside textbox area (Alibaba style) -->
              <div class="mb-3">
                <button
                  type="button"
                  id="rfq-upload-btn"
                  class="inline-flex items-center justify-center px-3 py-2.5 sm:py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#cc9900] min-h-[44px] sm:min-h-0"
                  data-tooltip-target="upload-tooltip"
                  data-tooltip-placement="top"
                >
                  <svg class="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
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
              </div>

              <textarea
                id="rfq-details"
                class="w-full p-0 text-sm text-[#222222] bg-transparent placeholder:text-[#999999] resize-none border-none outline-none focus:ring-0"
                placeholder="Bir görsel, dosya ekleyin veya anahtar kelimeler yazın. Örneğin: &quot;Eklediğim tasarıma göre 100 adet oyuncak ayı&quot;"
                rows="2"
              ></textarea>
            </div>
              
            <!-- Action Bar (Outside Textarea) -->
            <div class="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-3 mt-4">
              <div class="flex items-center gap-3">
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
                    class="w-4 h-4 text-(--color-primary-600) bg-white border-gray-300 rounded focus:ring-(--color-primary-600) focus:ring-2"
                    checked
                  />
                  <div class="flex items-center text-xs sm:text-sm text-[#666666] flex-wrap">
                    <img src="${aiIconUrl}" alt="AI" class="w-4 h-4 mr-1 object-contain shrink-0" />
                    <span>Yapay Zeka ile kolayca RFQ oluşturun</span>
                    <svg class="w-3.5 h-3.5 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                </label>
              </div>

              <!-- Submit CTA (Dynamic Color) -->
              <button type="submit" class="w-full sm:w-auto px-8 py-3 sm:py-2.5 text-base font-bold text-white bg-(--color-primary-600) hover:bg-(--color-primary-700) rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-(--color-primary-600) min-h-[48px] sm:min-h-0">
                RFQ detaylarını yaz
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- Section 3: Selected Products -->
    <section id="rfq-selected-products" class="py-[var(--spacing-fluid-md)] bg-(--color-surface-muted)" aria-label="Seçili ürünler">
      <div class="container-boxed">
        <h2 class="text-lg sm:text-xl font-bold text-(--color-text-primary) mb-4 sm:mb-6">Seçili Ürünler</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[var(--spacing-fluid-xs)] sm:gap-4">
          ${selectedProducts.map(p => renderProductCard(p)).join('')}
        </div>
      </div>
    </section>

    <!-- Section 4: Custom Products -->
    <section id="rfq-custom-products" class="py-[var(--spacing-fluid-md)] bg-(--color-surface)" aria-label="Özel ürünler">
      <div class="container-boxed">
        <h2 class="text-lg sm:text-xl font-bold text-(--color-text-primary) mb-4 sm:mb-6">Özel Ürünler</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[var(--spacing-fluid-xs)] sm:gap-4">
          ${customProducts.map(p => renderProductCard(p)).join('')}
        </div>
      </div>
    </section>

    <!-- Section 5: Testimonials -->
    <section id="rfq-testimonials" class="rfq-testimonial py-8 sm:py-16 bg-gradient-to-br from-[#1f1f1f] to-[#0a0a0a]" aria-label="Müşteri yorumları">
      <div class="container-boxed max-w-3xl mx-auto text-center px-[var(--spacing-fluid-sm)]">
        <h2 class="text-lg sm:text-xl font-bold text-(--color-text-inverted) mb-6 sm:mb-8">Müşterilerimiz Ne Diyor?</h2>
        <div class="swiper">
          <div class="swiper-wrapper">
            ${testimonials.map(t => `
              <div class="swiper-slide" data-testimonial-id="${t.id}">
                <blockquote class="italic text-white text-center text-base sm:text-xl leading-relaxed">
                  "${t.quote}"
                </blockquote>
                <div class="flex flex-col items-center mt-6">
                  <div class="w-16 h-16 rounded-full border-3 border-white/30 overflow-hidden">
                    <img
                      src="${t.avatar || ''}"
                      alt="${t.name}"
                      loading="lazy"
                      onerror="this.style.display='none';"
                    />
                  </div>
                  <p class="font-bold text-white">${t.name}</p>
                  <p class="text-white/60 text-sm">${t.title}, ${t.company}</p>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="swiper-pagination mt-6"></div>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer Section -->
  <footer>
    ${FooterLinks()}
  </footer>
`;

// --- Initialize Flowbite & Custom Behaviors ---
initMegaMenu();
initFlowbite();
initStickyHeaderSearch();
initMobileDrawer();
initAnimatedPlaceholder('#topbar-compact-search-input');

// --- Initialize Swiper Testimonial Carousel ---
new Swiper('.rfq-testimonial .swiper', {
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
    el: '.rfq-testimonial .swiper-pagination',
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
  const formData: RFQFormData = {
    details,
    files: fileInput.files ? Array.from(fileInput.files) : [],
    aiEnabled: aiCheckbox.checked,
  };

  // eslint-disable-next-line no-console
  console.log('RFQFormData:', formData);
});
