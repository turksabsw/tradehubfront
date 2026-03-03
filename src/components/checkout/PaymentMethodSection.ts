/**
 * PaymentMethodSection Component (C3)
 * Collapsed accordion section for payment method selection.
 *
 * Interactivity handled by Alpine.js x-data="checkoutAccordion" (see alpine.ts).
 * Accordion expand/collapse uses scrollHeight-based height animation.
 */

export interface PaymentMethodSectionProps {
  initialExpanded?: boolean;
}

export function PaymentMethodSection({ initialExpanded = false }: PaymentMethodSectionProps = {}): string {
  const chevronRotate = initialExpanded ? 'rotate-180' : '';
  const contentStyle = initialExpanded ? '' : 'height: 0; overflow: hidden;';

  return `
    <section
      id="checkout-payment"
      class="checkout-section border-t border-[#e5e5e5]"
      x-data="checkoutAccordion({ initialExpanded: ${initialExpanded} })"
      :class="{ 'checkout-section--collapsed': !expanded }"
      ${!initialExpanded ? 'x-cloak' : ''}
    >
      <button
        class="checkout-section__header checkout-section__header--toggle w-full flex items-center gap-3 py-5 px-6 cursor-pointer hover:bg-[#fafafa] transition-colors"
        :aria-expanded="expanded"
        aria-expanded="${initialExpanded ? 'true' : 'false'}"
        @click="toggle()"
        type="button"
      >
        <svg class="checkout-section__icon w-6 h-6 min-w-[24px] text-[#6b7280]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v12M9 9.5c0-1.1.9-2 2-2h2a2 2 0 010 4h-2a2 2 0 000 4h2a2 2 0 002-2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <h2 class="checkout-section__title text-lg font-bold text-[#111827] flex-1 text-left">Payment method</h2>
        <svg class="checkout-section__chevron w-5 h-5 text-[#6b7280] transition-transform duration-300 ${chevronRotate}" :class="{ 'rotate-180': expanded }" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <div class="checkout-section__content transition-[height] duration-300 ease-in-out overflow-hidden" style="${contentStyle}" x-ref="content">
        <p class="text-[#6b7280] text-base p-6">Payment method options will appear here after shipping address is completed.</p>
      </div>
    </section>
  `.trim();
}

/** @deprecated Migrated to Alpine.js x-data="checkoutAccordion" — see alpine.ts */
export function initAccordionSections(): void {
  // No-op: accordion interactions now handled by Alpine.js checkoutAccordion component
}
