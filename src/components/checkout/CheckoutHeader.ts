/**
 * CheckoutHeader Component
 * Page title "Checkout" rendered as <h1>.
 */

export interface CheckoutHeaderProps {
  title?: string;
}

export function CheckoutHeader({ title = 'Checkout' }: CheckoutHeaderProps = {}): string {
  return `
    <header class="mb-4">
      <h1 class="block text-2xl lg:text-[28px] font-bold leading-[34px] my-4 lg:my-6 mb-4 text-[#222]">${title}</h1>
    </header>
  `.trim();
}
