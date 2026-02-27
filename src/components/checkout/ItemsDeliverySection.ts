/**
 * ItemsDeliverySection Component (C4)
 * Collapsed accordion section for items and delivery options.
 */

export interface ItemsDeliverySectionProps {
  initialExpanded?: boolean;
}

export function ItemsDeliverySection({ initialExpanded = false }: ItemsDeliverySectionProps = {}): string {
  const expandedClass = initialExpanded ? '' : 'checkout-section--collapsed';
  const ariaExpanded = initialExpanded ? 'true' : 'false';
  const chevronRotate = initialExpanded ? 'rotate-180' : '';
  const contentStyle = initialExpanded ? '' : 'height: 0; overflow: hidden;';

  return `
    <section id="checkout-items" class="checkout-section ${expandedClass} border-t border-[#e5e5e5]">
      <button
        class="checkout-section__header checkout-section__header--toggle w-full flex items-center gap-3 py-5 px-6 cursor-pointer hover:bg-[#fafafa] transition-colors"
        aria-expanded="${ariaExpanded}"
        type="button"
      >
        <svg class="checkout-section__icon w-6 h-6 min-w-[24px] text-[#6b7280]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <h2 class="checkout-section__title text-lg font-bold text-[#111827] flex-1 text-left">Items and delivery options</h2>
        <svg class="checkout-section__chevron w-5 h-5 text-[#6b7280] transition-transform duration-300 ${chevronRotate}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <div class="checkout-section__content transition-[height] duration-300 ease-in-out overflow-hidden" style="${contentStyle}">
        <p class="text-[#6b7280] text-base p-6">Item and delivery details will appear here.</p>
      </div>
    </section>
  `.trim();
}
