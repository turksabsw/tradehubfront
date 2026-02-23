/**
 * CartHeader Organism
 * Page title 'Sepetim' rendered as <h1>.
 * Matches sc-shopping-cart-title codex brief: font-size 26px, font-weight 600,
 * proper margin/padding.
 */

export interface CartHeaderProps {
  title?: string;
}

export function CartHeader({ title = 'Sepetim' }: CartHeaderProps = {}): string {
  return `
    <header class="sc-shopping-cart-header">
      <h1 class="sc-shopping-cart-title">${title}</h1>
    </header>
  `.trim();
}
