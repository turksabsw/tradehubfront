/**
 * PaymentMethodSection Component (C3)
 * Collapsed accordion section for payment method selection.
 */

export interface PaymentMethodSectionProps {
  initialExpanded?: boolean;
}

export function PaymentMethodSection({ initialExpanded = false }: PaymentMethodSectionProps = {}): string {
  const expandedClass = initialExpanded ? '' : 'checkout-section--collapsed';
  const ariaExpanded = initialExpanded ? 'true' : 'false';
  const chevronRotate = initialExpanded ? 'rotate-180' : '';
  const contentStyle = initialExpanded ? '' : 'height: 0; overflow: hidden;';

  return `
    <section id="checkout-payment" class="checkout-section ${expandedClass} border-t border-[#e5e5e5]">
      <button
        class="checkout-section__header checkout-section__header--toggle w-full flex items-center gap-3 py-5 px-6 cursor-pointer hover:bg-[#fafafa] transition-colors"
        aria-expanded="${ariaExpanded}"
        type="button"
      >
        <svg class="checkout-section__icon w-6 h-6 min-w-[24px] text-[#6b7280]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v12M9 9.5c0-1.1.9-2 2-2h2a2 2 0 010 4h-2a2 2 0 000 4h2a2 2 0 002-2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <h2 class="checkout-section__title text-lg font-bold text-[#111827] flex-1 text-left">Payment method</h2>
        <svg class="checkout-section__chevron w-5 h-5 text-[#6b7280] transition-transform duration-300 ${chevronRotate}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <div class="checkout-section__content transition-[height] duration-300 ease-in-out overflow-hidden" style="${contentStyle}">
        <p class="text-[#6b7280] text-base p-6">Payment method options will appear here after shipping address is completed.</p>
      </div>
    </section>
  `.trim();
}

export function initAccordionSections(): void {
  const toggleButtons = document.querySelectorAll<HTMLButtonElement>('.checkout-section__header--toggle');

  toggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const section = button.closest('.checkout-section');
      if (!section) return;

      const content = section.querySelector<HTMLElement>('.checkout-section__content');
      const chevron = button.querySelector<SVGElement>('.checkout-section__chevron');
      if (!content) return;

      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        // Collapse: set explicit height first, then animate to 0
        content.style.height = `${content.scrollHeight}px`;
        content.offsetHeight; // force reflow
        content.style.height = '0';
        content.style.overflow = 'hidden';
        button.setAttribute('aria-expanded', 'false');
        section.classList.add('checkout-section--collapsed');
        chevron?.classList.remove('rotate-180');
      } else {
        // Expand: animate from 0 to scrollHeight
        content.style.height = `${content.scrollHeight}px`;
        content.style.overflow = 'hidden';
        button.setAttribute('aria-expanded', 'true');
        section.classList.remove('checkout-section--collapsed');
        chevron?.classList.add('rotate-180');

        const onEnd = () => {
          content.style.height = '';
          content.style.overflow = '';
          content.removeEventListener('transitionend', onEnd);
        };
        content.addEventListener('transitionend', onEnd);
      }
    });
  });
}
