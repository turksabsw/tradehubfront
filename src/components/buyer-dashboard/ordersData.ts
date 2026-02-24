/**
 * Orders Section — Static Data Configuration
 * Tab items and dropdown filter items with Turkish labels.
 */

import type { OrdersTabItem, OrdersFilterItem } from '../../types/buyerDashboard';

export const ORDER_TABS: OrdersTabItem[] = [
  { id: 'delivery', label: 'Teslimat sürecinde' },
  { id: 'refunds', label: 'Para iadeleri ve satış sonrası' },
  { id: 'completed', label: 'Tamamlandı ve değerlendiriliyor', hasDropdown: true },
];

export const ORDER_FILTERS: OrdersFilterItem[] = [
  { id: 'all', label: 'Tümü', selected: true },
  { id: 'pending-review', label: 'Değerlendirme bekliyor' },
  { id: 'reviewed', label: 'Değerlendirildi' },
  { id: 'completed', label: 'Tamamlandı' },
  { id: 'cancelled', label: 'İptal edildi' },
  { id: 'closed', label: 'Kapatıldı' },
  { id: 'archived', label: 'Arşivlendi' },
];
