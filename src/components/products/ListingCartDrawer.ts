import type { ProductImageKind, ProductListingCard } from '../../types/productListing';
import {
  SharedCartDrawer,
  initSharedCartDrawer,
  type CartDrawerItemModel,
  type CartDrawerTierModel,
  type CartDrawerColorModel,
  type CartDrawerShippingOption,
} from '../cart/overlay/SharedCartDrawer';

const categoryColorMap: Record<ProductImageKind, Array<{ label: string; hex: string }>> = {
  jewelry: [
    { label: 'Altin', hex: '#D4AF37' },
    { label: 'Gumus', hex: '#C0C0C0' },
    { label: 'Rose Gold', hex: '#B76E79' },
    { label: 'Siyah', hex: '#6B7280' },
    { label: 'Beyaz', hex: '#F3F4F6' },
  ],
  electronics: [
    { label: 'Siyah', hex: '#1a1a1a' },
    { label: 'Beyaz', hex: '#F3F4F6' },
    { label: 'Mavi', hex: '#3B82F6' },
    { label: 'Gumus', hex: '#C0C0C0' },
  ],
  label: [
    { label: 'Beyaz', hex: '#F5F5F5' },
    { label: 'Kraft', hex: '#C4A35A' },
    { label: 'Seffaf', hex: '#E0E7EE' },
    { label: 'Siyah', hex: '#1a1a1a' },
  ],
  crafts: [
    { label: 'Dogal', hex: '#DEB887' },
    { label: 'Beyaz', hex: '#F5F5F5' },
    { label: 'Pembe', hex: '#F9A8D4' },
    { label: 'Mavi', hex: '#93C5FD' },
  ],
  accessory: [
    { label: 'Siyah', hex: '#1a1a1a' },
    { label: 'Kahverengi', hex: '#8B4513' },
    { label: 'Taba', hex: '#D2691E' },
    { label: 'Lacivert', hex: '#1E3A5F' },
  ],
  clothing: [
    { label: 'Siyah', hex: '#1a1a1a' },
    { label: 'Beyaz', hex: '#F5F5F5' },
    { label: 'Gri', hex: '#9CA3AF' },
    { label: 'Lacivert', hex: '#1E3A5F' },
    { label: 'Kirmizi', hex: '#DC2626' },
  ],
  tools: [
    { label: 'Gumus', hex: '#C0C0C0' },
    { label: 'Siyah', hex: '#1a1a1a' },
    { label: 'Kirmizi', hex: '#DC2626' },
    { label: 'Sari', hex: '#EAB308' },
  ],
  packaging: [
    { label: 'Kraft', hex: '#C4A35A' },
    { label: 'Beyaz', hex: '#F5F5F5' },
    { label: 'Siyah', hex: '#1a1a1a' },
    { label: 'Kahverengi', hex: '#8B4513' },
  ],
};

const defaultShipping: CartDrawerShippingOption[] = [
  { id: 'dhl', method: 'DHL Express', estimatedDays: '5-8 iş günü', cost: 45, costText: '$45.00' },
  { id: 'air', method: 'Hava Kargo', estimatedDays: '10-15 iş günü', cost: 28, costText: '$28.00' },
  { id: 'sea', method: 'Deniz Yolu', estimatedDays: '25-35 iş günü', cost: 12, costText: '$12.00' },
];

function parsePriceRange(priceText: string): { low: number; high: number } {
  const matches = priceText.match(/[\d.]+/g);
  if (!matches || matches.length === 0) return { low: 0, high: 0 };
  if (matches.length === 1) {
    const value = Number(matches[0]);
    return { low: value, high: value };
  }

  const a = Number(matches[0]);
  const b = Number(matches[1]);
  return { low: Math.min(a, b), high: Math.max(a, b) };
}

function parseMoq(moqText: string): number {
  const found = moqText.match(/(\d+)/);
  return found ? Number(found[1]) : 1;
}

function buildPriceTiers(priceText: string, moqText: string): CartDrawerTierModel[] {
  const { low, high } = parsePriceRange(priceText);
  const moq = parseMoq(moqText);
  const mid = Math.round(((low + high) / 2) * 100) / 100;

  if (moq >= 500) {
    return [
      { minQty: moq, maxQty: moq * 2 - 1, price: high },
      { minQty: moq * 2, maxQty: moq * 4 - 1, price: mid },
      { minQty: moq * 4, maxQty: null, price: low },
    ];
  }

  if (moq >= 100) {
    return [
      { minQty: moq, maxQty: 499, price: high },
      { minQty: 500, maxQty: 999, price: mid },
      { minQty: 1000, maxQty: null, price: low },
    ];
  }

  return [
    { minQty: Math.max(1, moq), maxQty: 49, price: high },
    { minQty: 50, maxQty: 199, price: mid },
    { minQty: 200, maxQty: null, price: low },
  ];
}

function buildColors(kind: ProductImageKind, imageSrc?: string): CartDrawerColorModel[] {
  const palette = categoryColorMap[kind] ?? categoryColorMap.jewelry;
  return palette.map((entry, index) => ({
    id: `${kind}-color-${index + 1}`,
    label: entry.label,
    colorHex: entry.hex,
    imageKind: kind,
    imageUrl: imageSrc
  }));
}

function toDrawerItem(product: ProductListingCard): CartDrawerItemModel {
  const moq = parseMoq(product.moq);
  return {
    id: product.id,
    title: product.name,
    supplierName: product.supplierName || 'Supplier',
    unit: 'adet',
    moq,
    imageKind: product.imageKind,
    priceTiers: buildPriceTiers(product.price, product.moq),
    colors: buildColors(product.imageKind, product.imageSrc),
    shippingOptions: defaultShipping,
  };
}

export function ListingCartDrawer(): string {
  return SharedCartDrawer();
}

export function initListingCartDrawer(products: ProductListingCard[]): void {
  const drawerItems = products.map(toDrawerItem);
  initSharedCartDrawer(drawerItems);
}
