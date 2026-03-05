/**
 * Sidebar Data — Menu structure and section definitions
 * 4 sections + bottom discover link, following SidebarSection/SidebarMenuItem types
 */

import type { SidebarSection, SidebarMenuItem } from '../../types/buyerDashboard';

/* ════════════════════════════════════════════════════
   MENU SECTIONS
   ════════════════════════════════════════════════════ */

export const sidebarSections: SidebarSection[] = [
  /* ──── Dashboard (standalone) ──── */
  {
    items: [
      {
        id: 'dashboard',
        label: 'Kontrol panelim',
        icon: 'dashboard',
        href: '/pages/dashboard/buyer-dashboard.html',
      },
    ],
  },

  /* ──── Çevrimiçi ticaret ──── */
  {
    title: 'Çevrimiçi ticaret',
    items: [
      {
        id: 'messages',
        label: 'Mesajlarım',
        icon: 'messages',
        href: '/pages/dashboard/messages.html',
        submenu: [
          { label: 'Tedarikçi mesajlarım', href: '/pages/dashboard/messages.html' },
          { label: 'Ürün sorularım ve Fiyat Teklifi Taleplerim (RFQ)', href: '/pages/dashboard/inquiries.html' },
          { label: 'Kişilerim', href: '/pages/dashboard/contacts.html' },
        ],
      },
      {
        id: 'orders',
        label: 'Siparişlerim',
        icon: 'orders',
        href: '/pages/dashboard/orders.html',
        submenu: [
          { label: 'Tüm siparişlerim', href: '/pages/dashboard/orders.html' },
          { label: 'Para iadesi ve satış sonrası hizmetler', href: '/pages/dashboard/orders.html#refunds' },
          { label: 'Değerlendirmelerim', href: '/pages/dashboard/orders.html#reviews' },
          { label: 'Kupon ve kredilerim', href: '/pages/dashboard/orders.html#coupons' },
          { label: 'Vergi bilgilerim', href: '/pages/dashboard/orders.html#tax-info' },
        ],
      },
      {
        id: 'payment',
        label: 'Ödeme',
        icon: 'payment',
        href: '/pages/dashboard/payment.html',
        submenu: [
          { label: 'Ödeme yönetimi', href: '/pages/dashboard/payment.html#payment-management', group: 'Özet' },
          { label: 'İşlemler', href: '/pages/dashboard/payment.html#transactions', group: 'Özet' },
          { label: 'Havale hesapları', href: '/pages/dashboard/payment.html#tt-accounts', group: 'T/T' },
          { label: 'Havale Takibi', href: '/pages/dashboard/payment.html#tt-tracking', group: 'T/T' },
          { label: 'Alibaba.com Kartı', href: '/pages/dashboard/payment.html#alibaba-card', group: 'Ek Hizmetler' },
          { label: 'Pay Later for Business', href: '/pages/dashboard/payment.html#pay-later', group: 'Ek Hizmetler' },
        ],
      },
      {
        id: 'saved',
        label: 'Kaydettiklerim ve geçmişim',
        icon: 'saved',
        href: '/pages/dashboard/favorites.html',
        submenu: [
          { label: 'Favorilerim', href: '/pages/dashboard/favorites.html#favorites' },
          { label: 'Gezinme geçmişi', href: '/pages/dashboard/favorites.html#browsing-history' },
        ],
      },
    ],
  },

  /* ──── Eklenti hizmetleri ──── */
  {
    title: 'Eklenti hizmetleri',
    items: [
      {
        id: 'subscription',
        label: 'Abonelik',
        icon: 'subscription',
        href: '/pages/dashboard/subscription.html',
        badge: 'New',
      },
      {
        id: 'logistics',
        label: 'Lojistik hizmetlerim',
        icon: 'logistics',
        href: '/pages/dashboard/logistics.html',
        submenu: [
          { label: 'Lojistik siparişlerim', href: '/pages/dashboard/logistics.html#orders' },
          { label: 'Lojistik siparişi değerlendirmelerim', href: '/pages/dashboard/logistics.html#reviews' },
        ],
      },
      {
        id: 'dropshipping',
        label: 'Stoksuz Satış',
        icon: 'dropshipping',
        href: '/pages/dashboard/dropshipping.html',
        submenu: [
          { label: 'Ürünleri bulun', href: '/pages/dashboard/dropshipping.html#find-products' },
          { label: 'Siparişleri yönet', href: '/pages/dashboard/dropshipping.html#manage-orders' },
        ],
      },
      {
        id: 'other-services',
        label: 'Diğer hizmetlerim',
        icon: 'otherServices',
        href: '/pages/dashboard/buyer-dashboard.html#payment-terms',
        submenu: [
          { label: 'Esnek ödeme koşulları: 30/60 gün', href: '/pages/dashboard/buyer-dashboard.html#payment-terms' },
          { label: 'Ürün denetimi', href: '/pages/dashboard/buyer-dashboard.html#product-inspection' },
        ],
      },
    ],
  },

  /* ──── Ayarlar ──── */
  {
    title: 'Ayarlar',
    items: [
      {
        id: 'settings',
        label: 'Hesap ayarları',
        icon: 'settings',
        href: '/pages/dashboard/settings.html',
      },
    ],
  },
];

/* ──── Bottom sticky discover link ──── */

export const discoverItem: SidebarMenuItem = {
  id: 'discover',
  label: 'Satıcı Sitesini Keşfedin',
  icon: 'discover',
  href: '#discover',
};
