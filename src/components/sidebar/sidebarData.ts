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
        href: '/buyer-dashboard.html',
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
        href: '/messages.html',
        submenu: [
          { label: 'Tedarikçi mesajlarım', href: '/messages.html' },
          { label: 'Ürün sorularım ve Fiyat Teklifi Taleplerim (RFQ)', href: '/inquiries.html' },
          { label: 'Kişilerim', href: '/contacts.html' },
        ],
      },
      {
        id: 'orders',
        label: 'Siparişlerim',
        icon: 'orders',
        href: '/orders.html',
        submenu: [
          { label: 'Tüm siparişlerim', href: '/orders.html' },
          { label: 'Para iadesi ve satış sonrası hizmetler', href: '/orders.html#refunds' },
          { label: 'Değerlendirmelerim', href: '/orders.html#reviews' },
          { label: 'Kupon ve kredilerim', href: '/orders.html#coupons' },
          { label: 'Vergi bilgilerim', href: '/orders.html#tax-info' },
        ],
      },
      {
        id: 'payment',
        label: 'Ödeme',
        icon: 'payment',
        href: '/payment.html',
        submenu: [
          { label: 'Ödeme yönetimi', href: '/payment.html#payment-management', group: 'Özet' },
          { label: 'İşlemler', href: '/payment.html#transactions', group: 'Özet' },
          { label: 'Havale hesapları', href: '/payment.html#tt-accounts', group: 'T/T' },
          { label: 'Havale Takibi', href: '/payment.html#tt-tracking', group: 'T/T' },
          { label: 'Alibaba.com Kartı', href: '/payment.html#alibaba-card', group: 'Ek Hizmetler' },
          { label: 'Pay Later for Business', href: '/payment.html#pay-later', group: 'Ek Hizmetler' },
        ],
      },
      {
        id: 'saved',
        label: 'Kaydettiklerim ve geçmişim',
        icon: 'saved',
        href: '/favorites.html',
        submenu: [
          { label: 'Favorilerim', href: '/favorites.html#favorites' },
          { label: 'Gezinme geçmişi', href: '/favorites.html#browsing-history' },
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
        href: '/subscription.html',
        badge: 'New',
      },
      {
        id: 'logistics',
        label: 'Lojistik hizmetlerim',
        icon: 'logistics',
        href: '/logistics.html',
        submenu: [
          { label: 'Lojistik siparişlerim', href: '/logistics.html#orders' },
          { label: 'Lojistik siparişi değerlendirmelerim', href: '/logistics.html#reviews' },
        ],
      },
      {
        id: 'dropshipping',
        label: 'Stoksuz Satış',
        icon: 'dropshipping',
        href: '/dropshipping.html',
        submenu: [
          { label: 'Ürünleri bulun', href: '/dropshipping.html#find-products' },
          { label: 'Siparişleri yönet', href: '/dropshipping.html#manage-orders' },
        ],
      },
      {
        id: 'other-services',
        label: 'Diğer hizmetlerim',
        icon: 'otherServices',
        href: '#',
        submenu: [
          { label: 'Denetim hizmetleri', href: '#inspection-services' },
          { label: 'Gümrük hizmetleri', href: '#customs-services' },
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
        href: '#settings',
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
