/**
 * Mock Buyer Dashboard Data
 * Static data for the buyer dashboard page — TR TradeHub B2B style.
 */

import type {
  BuyerDashboardData,
  UserProfile,
  UserStat,
  NotificationSlide,
  BrowsingHistoryProduct,
  PromotionBannerData,
} from '../types/buyerDashboard';

const PLACEHOLDER_IMG = 'https://placehold.co/170x170/f5f5f5/999?text=Ürün';
const PROMO_IMG = 'https://placehold.co/80x80/ffffff/999?text=Promo';

export const mockUserProfile: UserProfile = {
  avatar: 'https://placehold.co/48x48/e0e0e0/999?text=U',
  username: 'Metin K.',
  profileHref: '/profile',
};

export const mockUserStats: UserStat[] = [
  { label: 'Mesajlar', count: 7, href: '/messages' },
  { label: 'Teklifler', count: 0, href: '/quotations' },
  { label: 'Kuponlar', count: 0, href: '/coupons' },
];

export const mockNotifications: NotificationSlide[] = [
  {
    icon: '📋',
    title: 'Profil bilgilerinizi tamamlayın',
    description: 'Tedarikçilerden daha iyi teklifler alabilmek için şirket profilinizi doldurun.',
    linkText: 'Şimdi tamamla',
    linkHref: '/profile/edit',
    bgColor: '#FFF7E6',
  },
  {
    icon: '🔔',
    title: 'Yeni tedarikçi teklifleri',
    description: 'İlgilendiğiniz ürünler için 3 yeni teklif mevcut.',
    linkText: 'Teklifleri gör',
    linkHref: '/quotations',
    bgColor: '#E6F7FF',
  },
  {
    icon: '🎉',
    title: 'Hoş geldiniz!',
    description: 'TR TradeHub\'a hoş geldiniz. Binlerce tedarikçi arasından ihtiyacınız olan ürünleri bulun.',
    linkText: 'Keşfetmeye başla',
    linkHref: '/products',
    bgColor: '#F0FFF0',
  },
];

export const mockBrowsingHistory: BrowsingHistoryProduct[] = [
  {
    id: 'bh-001',
    image: PLACEHOLDER_IMG,
    price: 15.90,
    currency: '$',
    minOrder: 'Min. sipariş: 1 Adet',
    href: '/product/bh-001',
  },
  {
    id: 'bh-002',
    image: PLACEHOLDER_IMG,
    price: 24.50,
    currency: '$',
    minOrder: 'Min. sipariş: 2 Adet',
    href: '/product/bh-002',
  },
  {
    id: 'bh-003',
    image: PLACEHOLDER_IMG,
    price: 8.75,
    currency: '$',
    minOrder: 'Min. sipariş: 5 Adet',
    href: '/product/bh-003',
  },
];

export const mockPromotions: PromotionBannerData[] = [
  {
    id: 'promo-001',
    title: 'Süper İndirimler',
    subtitle: '%50\'ye varan indirimlerle alışveriş yapın',
    image: PROMO_IMG,
    bgColor: '#FFF1F0',
    href: '/promotions/super-deals',
  },
  {
    id: 'promo-002',
    title: 'Yeni Sezon Ürünleri',
    subtitle: 'En yeni ürünleri keşfedin',
    image: PROMO_IMG,
    bgColor: '#F0F5FF',
    href: '/promotions/new-season',
  },
  {
    id: 'promo-003',
    title: 'Toplu Alım Fırsatları',
    subtitle: 'Toplu alımlarda ekstra indirimler',
    image: PROMO_IMG,
    bgColor: '#F6FFED',
    href: '/promotions/bulk-deals',
  },
  {
    id: 'promo-004',
    title: 'Güvenli Ticaret',
    subtitle: 'Doğrulanmış tedarikçilerle güvenli alışveriş',
    image: PROMO_IMG,
    bgColor: '#FFFBE6',
    href: '/promotions/trade-assurance',
  },
  {
    id: 'promo-005',
    title: 'Hızlı Teslimat',
    subtitle: '7 gün içinde teslimat garantisi',
    image: PROMO_IMG,
    bgColor: '#FFF0F6',
    href: '/promotions/fast-delivery',
  },
];

export const mockBuyerDashboardData: BuyerDashboardData = {
  user: mockUserProfile,
  stats: mockUserStats,
  notifications: mockNotifications,
  browsingHistory: mockBrowsingHistory,
  promotions: mockPromotions,
};
