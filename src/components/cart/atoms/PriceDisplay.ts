/**
 * PriceDisplay Atom
 * Formatted price display with currency symbol and Turkish locale formatting.
 * Uses comma as decimal separator (e.g., $15,90).
 * Supports bold styling and optional unit suffix (e.g., '/Çift').
 */

export interface PriceDisplayProps {
  amount: number;
  currency?: string;
  bold?: boolean;
  unit?: string;
}

function formatPrice(amount: number, currency: string): string {
  const fixed = amount.toFixed(2);
  const formatted = fixed.replace('.', ',');
  return `${currency}${formatted}`;
}

export function PriceDisplay({
  amount,
  currency = '$',
  bold = false,
  unit,
}: PriceDisplayProps): string {
  const price = formatPrice(amount, currency);
  const tag = bold ? 'strong' : 'span';
  const unitHtml = unit ? `<span class="price-display-unit">${unit}</span>` : '';

  return `<${tag} class="price-display${bold ? ' price-display--bold' : ''}">${price}${unitHtml}</${tag}>`;
}
