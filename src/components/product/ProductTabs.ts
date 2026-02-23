/**
 * ProductTabs Component
 * Flowbite-based tabbed content: Description, Reviews, Company, FAQ.
 */

import { AttributesTabContent } from './AttributesTabContent';
import { ProductReviews } from './ProductReviews';
import { CompanyProfile } from './CompanyProfile';
import { ProductDescription } from './ProductDescription';

interface TabConfig {
  id: string;
  label: string;
  content: () => string;
}

const tabs: TabConfig[] = [
  { id: 'attributes', label: 'Özellikler', content: AttributesTabContent },
  { id: 'reviews', label: 'Yorumlar', content: ProductReviews },
  { id: 'company', label: 'Tedarikçi', content: CompanyProfile },
  { id: 'description', label: 'Açıklama', content: ProductDescription },
];

export function ProductTabs(): string {
  return `
    <section id="product-tabs-section" class="py-6" style="background: var(--pd-bg, #ffffff);">
      <!-- Tab Navigation -->
      <div
        id="product-tabs-nav"
        class="flex gap-0 overflow-x-auto scrollbar-hide"
        style="border-bottom: 2px solid var(--pd-spec-border, #e5e5e5);"
        role="tablist"
      >
        ${tabs.map((tab, i) => `
          <button
            type="button"
            id="tab-btn-${tab.id}"
            class="product-tab-btn whitespace-nowrap px-5 py-3 text-sm font-medium transition-colors relative"
            style="color: ${i === 0 ? 'var(--pd-tab-active-color, #cc9900)' : 'var(--pd-tab-color, #6b7280)'};"
            role="tab"
            aria-selected="${i === 0 ? 'true' : 'false'}"
            aria-controls="tab-content-${tab.id}"
            data-tab-target="${tab.id}"
          >
            ${tab.label}
            <span
              class="absolute bottom-0 left-0 right-0 h-0.5 transition-all"
              style="background: ${i === 0 ? 'var(--pd-tab-active-border, #cc9900)' : 'transparent'};"
            ></span>
          </button>
        `).join('')}
      </div>

      <!-- Tab Content Panels -->
      ${tabs.map((tab, i) => `
        <div
          id="tab-content-${tab.id}"
          class="product-tab-panel ${i === 0 ? '' : 'hidden'}"
          role="tabpanel"
          aria-labelledby="tab-btn-${tab.id}"
        >
          ${tab.content()}
        </div>
      `).join('')}
    </section>
  `;
}

export function initProductTabs(): void {
  const tabBtns = document.querySelectorAll<HTMLButtonElement>('.product-tab-btn');
  const tabPanels = document.querySelectorAll<HTMLElement>('.product-tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.tabTarget;

      // Deactivate all
      tabBtns.forEach(b => {
        b.style.color = 'var(--pd-tab-color, #6b7280)';
        b.setAttribute('aria-selected', 'false');
        const underline = b.querySelector('span');
        if (underline) underline.style.background = 'transparent';
      });
      tabPanels.forEach(p => p.classList.add('hidden'));

      // Activate clicked
      btn.style.color = 'var(--pd-tab-active-color, #cc9900)';
      btn.setAttribute('aria-selected', 'true');
      const underline = btn.querySelector('span');
      if (underline) underline.style.background = 'var(--pd-tab-active-border, #cc9900)';

      const panel = document.getElementById(`tab-content-${targetId}`);
      if (panel) panel.classList.remove('hidden');
    });
  });

  // Sticky tab bar on scroll
  const tabNav = document.getElementById('product-tabs-nav');
  const tabSection = document.getElementById('product-tabs-section');
  if (tabNav && tabSection) {
    const header = document.getElementById('sticky-header');
    const headerHeight = header ? header.offsetHeight : 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          tabNav.style.position = 'sticky';
          tabNav.style.top = `${headerHeight}px`;
          tabNav.style.zIndex = '20';
          tabNav.style.background = 'var(--pd-bg, #ffffff)';
        } else {
          tabNav.style.position = '';
          tabNav.style.top = '';
          tabNav.style.zIndex = '';
          tabNav.style.background = '';
        }
      },
      { rootMargin: `-${headerHeight}px 0px 0px 0px`, threshold: 1 }
    );
    observer.observe(tabSection);
  }
}
