/**
 * Mock Cart Data
 * Static data for the shopping cart page — Alibaba B2B style.
 */

import type { CartSupplier, CartSummaryData, AssuranceItem } from '../types/cart';

const PLACEHOLDER_IMG = 'https://placehold.co/120x120/f5f5f5/999?text=SKU';

export const mockCartSuppliers: CartSupplier[] = [
  {
    id: 'supplier-001',
    name: 'JOTA KA & EUROPE 2016 SL',
    href: '/supplier/jota-ka',
    selected: true,
    products: [
      {
        id: 'prod-001',
        title: 'Erkek Nefes Alabilen Boy Uzatıcı Yumuşak Yastıklı Moda Açık Hava Spor Ayakkabıları Kırış Yürüyüş Botları Kış İstikamet Yaz',
        href: '/product/prod-001',
        tags: [
          {
            type: 'DELIVERY_GUARANTEE',
            text: 'Tahmini teslimat tarihi: 05 Mar - 12 Mar',
            color: '#0a8800',
            bgColor: '#e6f4e6',
          },
        ],
        moqLabel: 'Min. sipariş: 1 Çift',
        favoriteIcon: '♡',
        deleteIcon: '🗑',
        skus: [
          {
            id: 'sku-001',
            skuImage: PLACEHOLDER_IMG,
            variantText: 'Renk: Kahverengi; EUR Boyutu: 40-45',
            unitPrice: 15.9,
            currency: '$',
            unit: 'Çift',
            quantity: 12,
            minQty: 1,
            maxQty: 9999,
            selected: true,
          },
        ],
        selected: true,
      },
    ],
  },
  {
    id: 'supplier-002',
    name: 'WANGDU COUNTY S.PETER SHOES CO.,LTD.',
    href: '/supplier/wangdu-county',
    selected: true,
    products: [
      {
        id: 'prod-002',
        title: 'Erkek hafif açık ayakkabı deri aşınmaya dayanıklı yürüyüş tırmanma arazisinden spor ayakkabılar',
        href: '/product/prod-002',
        tags: [
          {
            type: 'PROMOTION',
            text: '180 günün en düşük fiyatı',
            color: '#d4380d',
            bgColor: '#fff1e6',
          },
          {
            type: 'DELIVERY_GUARANTEE',
            text: 'Tahmini teslimat tarihi: 19 Mar - 02 Haz',
            color: '#0a8800',
            bgColor: '#e6f4e6',
          },
        ],
        moqLabel: 'Min. sipariş: 2 Çift',
        favoriteIcon: '♡',
        deleteIcon: '🗑',
        skus: [
          {
            id: 'sku-002',
            skuImage: PLACEHOLDER_IMG,
            variantText: 'Renk: Siyah/haki; Ayakkabı Boyutu: 39',
            unitPrice: 16.9,
            currency: '$',
            unit: 'Çift',
            quantity: 1,
            minQty: 1,
            maxQty: 9999,
            selected: true,
          },
          {
            id: 'sku-003',
            skuImage: PLACEHOLDER_IMG,
            variantText: 'Renk: Siyah/haki; Ayakkabı Boyutu: 40',
            unitPrice: 16.9,
            currency: '$',
            unit: 'Çift',
            quantity: 1,
            minQty: 1,
            maxQty: 9999,
            selected: true,
          },
        ],
        selected: true,
      },
    ],
  },
];

export const mockCartSummary: CartSummaryData = {
  selectedCount: 14,
  items: [
    { image: PLACEHOLDER_IMG, quantity: 12 },
    { image: PLACEHOLDER_IMG, quantity: 1 },
    { image: PLACEHOLDER_IMG, quantity: 1 },
  ],
  productSubtotal: 224.6,
  discount: 18.81,
  shippingFee: 182.56,
  subtotal: 388.35,
  currency: '$',
};

export const mockAssuranceItems: AssuranceItem[] = [
  {
    icon: '🛡️',
    title: 'Güvenli Ödeme',
    description: 'Ödeme bilgileriniz şifrelenerek korunur.',
  },
  {
    icon: '📦',
    title: 'Kolay İade',
    description: '30 gün içinde ücretsiz iade imkânı.',
  },
  {
    icon: '✅',
    title: 'Tedarikçi Güvencesi',
    description: 'Doğrulanmış tedarikçiler ile güvenli alışveriş.',
  },
];
