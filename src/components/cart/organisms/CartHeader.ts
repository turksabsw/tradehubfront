/**
 * CartHeader Organism
 * Page title 'Sepetim' rendered as <h1>.
 */

export interface CartHeaderProps {
  title?: string;
}

export function CartHeader({ title = 'Sepetim' }: CartHeaderProps = {}): string {
  return `
    <header class="mb-4">
      <h1 class="block text-2xl lg:text-[28px] font-bold leading-[34px] my-4 lg:my-6 mb-4 text-[#222]">${title}</h1>
    </header>
  `.trim();
}
