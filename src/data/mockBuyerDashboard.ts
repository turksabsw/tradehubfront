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

/* Real product images from Unsplash (e-commerce style) */
const PRODUCT_IMGS = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=340&h=340&fit=crop', // watch
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=340&h=340&fit=crop', // headphones
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=340&h=340&fit=crop', // camera
];

const PROMO_IMGS = [
  'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=160&h=160&fit=crop', // shopping bags
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=160&h=160&fit=crop', // store
  'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=160&h=160&fit=crop', // boxes
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=160&h=160&fit=crop', // delivery
  'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=160&h=160&fit=crop', // shipping
];

export const mockUserProfile: UserProfile = {
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face',
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
    title: 'Vergiden muaf statüsü için hesabınızı doğrulatın',
    linkText: 'İş bilgilerini doğrulayın',
    linkHref: '/profile/verify',
    bgColor: '#F4F4F4',
  },
  {
    title: 'TradeHub.com deneyiminizi kişiselleştirin',
    linkText: 'Profilinizi tamamlayın',
    linkHref: '/profile/edit',
    bgColor: '#F4F4F4',
  },
  {
    title: 'Tedarikçilerden daha iyi teklifler alabilmek için şirket profilinizi doldurun',
    linkText: 'Şimdi tamamlayın',
    linkHref: '/profile/company',
    bgColor: '#F4F4F4',
  },
];

export const mockBrowsingHistory: BrowsingHistoryProduct[] = [
  {
    id: 'bh-001',
    image: PRODUCT_IMGS[0],
    price: 15.90,
    currency: '$',
    minOrder: 'Min. sipariş: 1 Adet',
    href: '/product/bh-001',
  },
  {
    id: 'bh-002',
    image: PRODUCT_IMGS[1],
    price: 24.50,
    currency: '$',
    minOrder: 'Min. sipariş: 2 Adet',
    href: '/product/bh-002',
  },
  {
    id: 'bh-003',
    image: PRODUCT_IMGS[2],
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
    image: PROMO_IMGS[0],
    bgColor: '#FFF1F0',
    href: '/promotions/super-deals',
  },
  {
    id: 'promo-002',
    title: 'Yeni Sezon Ürünleri',
    subtitle: 'En yeni ürünleri keşfedin',
    image: PROMO_IMGS[1],
    bgColor: '#F0F5FF',
    href: '/promotions/new-season',
  },
  {
    id: 'promo-003',
    title: 'Toplu Alım Fırsatları',
    subtitle: 'Toplu alımlarda ekstra indirimler',
    image: PROMO_IMGS[2],
    bgColor: '#F6FFED',
    href: '/promotions/bulk-deals',
  },
  {
    id: 'promo-004',
    title: 'Güvenli Ticaret',
    subtitle: 'Doğrulanmış tedarikçilerle güvenli alışveriş',
    image: PROMO_IMGS[3],
    bgColor: '#FFFBE6',
    href: '/promotions/trade-assurance',
  },
  {
    id: 'promo-005',
    title: 'Hızlı Teslimat',
    subtitle: '7 gün içinde teslimat garantisi',
    image: PROMO_IMGS[4],
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
