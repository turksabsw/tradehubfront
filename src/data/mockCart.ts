/**
 * Mock Cart Data
 * Static data for the shopping cart page — Alibaba B2B style.
 */

import type { CartSupplier, CartSummaryData, AssuranceItem } from '../types/cart';

export const mockCartSuppliers: CartSupplier[] = [
  {
    id: 'supplier-001',
    name: 'JOTA KA',
    href: '/supplier/jota-ka',
    selected: true,
    products: [
      {
        id: 'prod-001',
        title: 'Paslanmaz Çelik Özel Logo Kolye Ucu Altın Kaplama Toptan Takı Aksesuar',
        href: '/product/prod-001',
        tags: [
          {
            type: 'DELIVERY_GUARANTEE',
            text: 'Teslimat Garantisi',
            color: '#0a8800',
            bgColor: '#e6f4e6',
          },
        ],
        moqLabel: 'MOQ: 1 adet',
        favoriteIcon: '♡',
        deleteIcon: '🗑',
        skus: [
          {
            id: 'sku-001',
            skuImage: '',
            variantText: 'Kahverengi',
            unitPrice: 15.9,
            currency: 'USD',
            unit: 'adet',
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
    name: 'WANGDU COUNTY',
    href: '/supplier/wangdu-county',
    selected: true,
    products: [
      {
        id: 'prod-002',
        title: 'Toptan Kadın Erkek Unisex Spor Ayakkabı Hafif Koşu Yürüyüş',
        href: '/product/prod-002',
        tags: [
          {
            type: 'PROMOTION',
            text: 'Kampanya',
            color: '#d4380d',
            bgColor: '#fff1e6',
          },
        ],
        moqLabel: 'MOQ: 1 adet',
        favoriteIcon: '♡',
        deleteIcon: '🗑',
        skus: [
          {
            id: 'sku-002',
            skuImage: '',
            variantText: 'Siyah',
            unitPrice: 16.9,
            currency: 'USD',
            unit: 'adet',
            quantity: 1,
            minQty: 1,
            maxQty: 9999,
            selected: true,
          },
          {
            id: 'sku-003',
            skuImage: '',
            variantText: 'Haki',
            unitPrice: 16.9,
            currency: 'USD',
            unit: 'adet',
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
    { image: '', quantity: 12 },
    { image: '', quantity: 1 },
    { image: '', quantity: 1 },
  ],
  productSubtotal: 224.6,
  shippingFee: 182.56,
  subtotal: 407.16,
  currency: 'USD',
};

export const mockAssuranceItems: AssuranceItem[] = [
  {
    icon: '🛡️',
    title: 'Güvenli Ödeme',
    description: 'Ödeme bilgileriniz şifrelenerek korunur.',
  },
  {
    icon: '🔄',
    title: 'Kolay İade',
    description: '30 gün içinde ücretsiz iade imkânı.',
  },
  {
    icon: '✅',
    title: 'Tedarikçi Güvencesi',
    description: 'Doğrulanmış tedarikçiler ile güvenli alışveriş.',
  },
];
