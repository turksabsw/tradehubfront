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
        active: true,
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
        href: '#',
        submenu: [
          { label: 'Mesaj merkezi', href: '#messages-center' },
          { label: 'Teklif isteklerim', href: '#quote-requests' },
          { label: 'Tedarikçi yöneticim', href: '#supplier-manager' },
        ],
      },
      {
        id: 'orders',
        label: 'Siparişlerim',
        icon: 'orders',
        href: '#',
        submenu: [
          { label: 'Tüm siparişler', href: '#all-orders' },
          { label: 'Ödeme bekleyenler', href: '#awaiting-payment' },
          { label: 'Sevkiyat bekleyenler', href: '#awaiting-shipment' },
          { label: 'Onay bekleyenler', href: '#awaiting-confirmation' },
          { label: 'İptal edilenler', href: '#cancelled' },
        ],
      },
      {
        id: 'payment',
        label: 'Ödeme',
        icon: 'payment',
        href: '#',
        submenu: [
          { label: 'Ödeme özeti', href: '#payment-summary', group: 'Özet' },
          { label: 'İşlem geçmişi', href: '#transaction-history', group: 'Özet' },
          { label: 'T/T transferleri', href: '#tt-transfers', group: 'T/T' },
          { label: 'T/T takibi', href: '#tt-tracking', group: 'T/T' },
          { label: 'Ödeme koruması', href: '#payment-protection', group: 'Ek Hizmetler' },
          { label: 'Fatura yönetimi', href: '#invoice-management', group: 'Ek Hizmetler' },
        ],
      },
      {
        id: 'saved',
        label: 'Kaydettiklerim ve geçmişim',
        icon: 'saved',
        href: '#',
        submenu: [
          { label: 'Favorilerim', href: '#favorites' },
          { label: 'Gezinme geçmişi', href: '#browsing-history' },
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
        href: '#subscription',
        badge: 'New',
      },
      {
        id: 'logistics',
        label: 'Lojistik hizmetlerim',
        icon: 'logistics',
        href: '#',
        submenu: [
          { label: 'Kargo takibi', href: '#cargo-tracking' },
          { label: 'Navlun teklifi', href: '#freight-quote' },
        ],
      },
      {
        id: 'dropshipping',
        label: 'Stoksuz Satış',
        icon: 'dropshipping',
        href: '#',
        submenu: [
          { label: 'Stoksuz satış merkezi', href: '#dropship-center' },
          { label: 'Ürün listelerim', href: '#product-listings' },
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
