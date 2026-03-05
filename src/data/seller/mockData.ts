/**
 * Seller Storefront — Mock Data (Turkish)
 * Complete mock dataset for all 13 components
 */
import type {
  SellerStorefrontData,
  SellerProfile,
  StoreNavData,
  HeroBannerData,
  CategoryCard,
  SimpleProduct,
  ProductCategory,
  CompanyInfo,
  Certificate,
  Advantage,
  Feature,
  CompanyInfoCell,
  CompanyPhoto,
  GalleryPhoto,
  ContactFormData,
  FloatingActionsData,
} from '../../types/seller/types';

// ─── C1: Seller Profile ─────────────────────────────────
const seller: SellerProfile = {
  name: 'Anadolu Endüstriyel Ölçüm Sistemleri A.Ş.',
  slug: 'anadolu-endustriyel',
  logo: '/assets/mock/anadolu-logo.png',
  verificationType: 'Verified',
  verificationBadgeType: 'standard',
  yearsOnPlatform: 12,
  location: 'İstanbul, Türkiye',
  mainCategories: ['Elektrik Sayaçları', 'Su Sayaçları', 'Doğalgaz Sayaçları'],
  email: 'info@anadoluolcum.com.tr',
  deliveryBadge: 'Elektrik Sayaçları kategorisinde #3 en yüksek zamanında teslimat oranı',
  assessmentBadge: 'Tedarikçi değerlendirme prosedürleri tamamlandı',
  verificationDate: '2025.06.15',
  hasCategoryGrid: true,
  hasCategoryListing: true,
};

// ─── C2: Navigation ─────────────────────────────────────
const navData: StoreNavData = {
  items: [
    { label: 'Ana Sayfa', href: '#overview', isActive: true },
    { label: 'Ürünler', href: '#products', isActive: false, dropdownType: 'products' },
    { label: 'Şirket Profili', href: '#company', isActive: false, dropdownType: 'company' },
    { label: 'İletişim', href: '#contact', isActive: false },
    { label: 'Kampanyalar', href: '#', isActive: false },
  ],
  productCategories: [
    {
      name: 'Ön Ödemeli Elektrik Sayaçları',
      slug: 'on-odemeli-elektrik',
      hasSubcategories: true,
      subcategories: [
        { name: 'Tek Fazlı Ön Ödemeli Sayaç', href: '#' },
        { name: 'Üç Fazlı Ön Ödemeli Sayaç', href: '#' },
        { name: 'STS Tokenli Sayaç', href: '#' },
      ],
    },
    {
      name: 'Akıllı Elektrik Sayaçları',
      slug: 'akilli-elektrik',
      hasSubcategories: true,
      subcategories: [
        { name: 'Wi-Fi Modüllü Sayaç', href: '#' },
        { name: 'LoRa Haberleşmeli Sayaç', href: '#' },
        { name: 'GPRS/4G Sayaç', href: '#' },
      ],
    },
    {
      name: 'Endüstriyel Enerji Sayaçları',
      slug: 'endustriyel-enerji',
      hasSubcategories: true,
      subcategories: [
        { name: 'CT Bağlantılı Sayaç', href: '#' },
        { name: 'Reaktif Enerji Sayacı', href: '#' },
      ],
    },
    {
      name: 'Su Sayaçları',
      slug: 'su-sayaclari',
      hasSubcategories: true,
      subcategories: [
        { name: 'Ultrasonik Su Sayacı', href: '#' },
        { name: 'Mekanik Su Sayacı', href: '#' },
      ],
    },
    { name: 'Doğalgaz Sayaçları', slug: 'dogalgaz', hasSubcategories: false },
    { name: 'Yedek Parça ve Aksesuarlar', slug: 'yedek-parca', hasSubcategories: false },
  ],
  companyProfileLinks: [
    { label: 'Şirkete Genel Bakış', href: '#company' },
    { label: 'Değerlendirmeler ve Yorumlar', href: '#reviews' },
  ],
  searchPlaceholder: 'Bu mağazada ara',
};

// ─── C3: Hero Banner ────────────────────────────────────
const heroBanner: HeroBannerData = {
  slides: [
    {
      id: 'slide-1',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80',
      title: 'OEM/ODM',
      subtitle: 'Hassas ölçüm teknolojisi\nKurum içi Ar-Ge inovasyon\nKüresel OEM/ODM ortaklıkları',
      textPosition: 'left',
      textColor: 'dark',
    },
    {
      id: 'slide-2',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80',
      title: 'SİZİN MARKANIZ\nSİZİN RENGİNİZ\nSİZİN YOLUNUZ',
      textPosition: 'left',
      textColor: 'dark',
    },
    {
      id: 'slide-3',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80',
      title: 'AKILLI ÖLÇÜM ÇÖZÜMLERİ',
      subtitle: 'Geleceğin enerji altyapısı.\nSizin ihtiyaçlarınıza özel tasarım.',
      textPosition: 'center',
      textColor: 'white',
    },
  ],
  autoplayDelay: 5000,
  showPagination: true,
};

// ─── C4: Category Cards ─────────────────────────────────
const categoryCards: CategoryCard[] = [
  { id: 'cat-1', name: 'ÖN ÖDEMELİ ELEKTRİK SAYAÇLARI', bgColor: '#d4e157', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80' },
  { id: 'cat-2', name: 'AKILLI ELEKTRİK SAYAÇLARI', bgColor: '#90caf9', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80' },
  { id: 'cat-3', name: 'ENDÜSTRİYEL ENERJİ SAYAÇLARI', bgColor: '#bdbdbd', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80' },
  { id: 'cat-4', name: 'ULTRASONİK SU SAYAÇLARI', bgColor: '#80deea', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80' },
  { id: 'cat-5', name: 'MEKANİK SU SAYAÇLARI', bgColor: '#a5d6a7', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80' },
  { id: 'cat-6', name: 'DOĞALGAZ SAYAÇLARI', bgColor: '#ffcc80', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80' },
  { id: 'cat-7', name: 'YEDEK PARÇA VE AKSESUARLAR', bgColor: '#f48fb1', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80' },
];

// ─── C5: Hot Products ───────────────────────────────────
const hotProducts: SimpleProduct[] = [
  { id: 'hp-1', name: 'DIN Ray Tipi Ön Ödemeli Sayaç (CIU Modüllü)', image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=400&auto=format&fit=crop', link: '/pages/product-detail.html' },
  { id: 'hp-2', name: 'Tek Fazlı Ön Ödemeli Çift Kaynaklı Enerji Sayacı', image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=400&auto=format&fit=crop', link: '/pages/product-detail.html' },
  { id: 'hp-3', name: 'Üç Fazlı Ön Ödemeli Enerji Sayacı', image: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=400&auto=format&fit=crop', link: '/pages/product-detail.html' },
  { id: 'hp-4', name: 'Ultrasonik Su Sayacı DN15-DN300', image: 'https://images.unsplash.com/photo-1627964434947-d5ab70b8c66e?q=80&w=400&auto=format&fit=crop', link: '/pages/product-detail.html' },
  { id: 'hp-5', name: 'Akıllı Ön Ödemeli Tokenli Elektrik Sayacı', image: 'https://images.unsplash.com/photo-1631541909061-71e34ddce158?q=80&w=400&auto=format&fit=crop', link: '/pages/product-detail.html' },
  { id: 'hp-6', name: 'Endüstriyel Doğalgaz Sayacı G4-G100', image: 'https://images.unsplash.com/photo-1582046426742-b06f8c792ea8?q=80&w=400&auto=format&fit=crop', link: '/pages/product-detail.html' },
  { id: 'hp-7', name: 'LoRa Haberleşmeli Uzaktan Okuma Sayacı', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop', link: '/pages/product-detail.html' },
  { id: 'hp-8', name: 'Çok Tarifeli Akıllı Elektrik Sayacı', image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=400&auto=format&fit=crop', link: '/pages/product-detail.html' },
  { id: 'hp-9', name: 'Kompakt Tip Isı Sayacı DN20-DN100', image: 'https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?q=80&w=400&auto=format&fit=crop', link: '/pages/product-detail.html' },
];

// ─── C6: Category Product Listings ──────────────────────
const categoryListings: ProductCategory[] = [
  {
    id: 'cl-1',
    name: 'ÖN ÖDEMELİ ELEKTRİK SAYAÇLARI',
    bannerImage: '/assets/mock/banner-on-odemeli.jpg',
    products: [
      {
        id: 'clp-1',
        name: 'STS Tokenli Tek Fazlı Ön Ödemeli Elektrik Sayacı 230V',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80',
        hasVideo: true,
        badges: [
          { type: 'main-product', label: 'Ana Ürün' },
          { type: 'certified', label: 'CE Sertifikalı' },
        ],
        priceMin: 18.5,
        priceMax: 24.0,
        moq: 500,
        moqUnit: 'adet',
        soldCount: 28212,
        link: '/pages/product-detail.html',
      },
      {
        id: 'clp-2',
        name: 'Üç Fazlı Ön Ödemeli Enerji Sayacı Klavyeli Giriş',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80',
        hasVideo: false,
        badges: [{ type: 'certified', label: 'IEC Onaylı' }],
        priceMin: 32.0,
        priceMax: 45.0,
        moq: 300,
        moqUnit: 'adet',
        soldCount: 15843,
        link: '/pages/product-detail.html',
      },
      {
        id: 'clp-3',
        name: 'DIN Ray Montajlı Ön Ödemeli Sayaç CIU Üniteli',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80',
        hasVideo: true,
        badges: [{ type: 'main-product', label: 'Ana Ürün' }],
        priceMin: 22.0,
        priceMax: 28.5,
        moq: 500,
        moqUnit: 'adet',
        soldCount: 12567,
        link: '/pages/product-detail.html',
      },
      {
        id: 'clp-4',
        name: 'Çift Kaynaklı Ön Ödemeli Elektrik Sayacı (Şebeke + Güneş)',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80',
        hasVideo: false,
        badges: [],
        priceMin: 35.0,
        priceMax: 42.0,
        moq: 200,
        moqUnit: 'adet',
        soldCount: 8934,
        link: '/pages/product-detail.html',
      },
      {
        id: 'clp-5',
        name: 'Akıllı Ön Ödemeli Sayaç GPRS/4G Haberleşme Modüllü',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80',
        hasVideo: true,
        badges: [{ type: 'certified', label: 'DLMS Uyumlu' }],
        priceMin: 28.0,
        priceMax: 36.0,
        moq: 300,
        moqUnit: 'adet',
        soldCount: 19450,
        link: '/pages/product-detail.html',
      },
      {
        id: 'clp-6',
        name: 'Endüstriyel Tip Üç Fazlı Ön Ödemeli CT Sayacı',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80',
        hasVideo: false,
        badges: [
          { type: 'main-product', label: 'Ana Ürün' },
          { type: 'certified', label: 'CE Sertifikalı' },
        ],
        priceMin: 55.0,
        priceMax: 72.0,
        moq: 100,
        moqUnit: 'adet',
        soldCount: 6721,
        link: '/pages/product-detail.html',
      },
      {
        id: 'clp-7',
        name: 'Kompakt Ön Ödemeli Sayaç Dahili Röle ve LCD Ekranlı',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80',
        hasVideo: true,
        badges: [{ type: 'certified', label: 'IEC 62055' }],
        priceMin: 15.0,
        priceMax: 20.0,
        moq: 1000,
        moqUnit: 'adet',
        soldCount: 31245,
        link: '/pages/product-detail.html',
      },
      {
        id: 'clp-8',
        name: 'Duvara Monte Ön Ödemeli Sayaç Entegre Tuş Takımlı',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80',
        hasVideo: false,
        badges: [{ type: 'main-product', label: 'Ana Ürün' }],
        priceMin: 19.0,
        priceMax: 25.5,
        moq: 500,
        moqUnit: 'adet',
        soldCount: 14320,
        link: '/pages/product-detail.html',
      },
    ],
  },
  {
    id: 'cl-2',
    name: 'AKILLI SU SAYAÇLARI',
    bannerImage: '/assets/mock/banner-su-sayaci.jpg',
    products: [
      {
        id: 'clp-9',
        name: 'Ultrasonik Su Sayacı DN15 Konut Tipi LoRa Modüllü',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80',
        hasVideo: true,
        badges: [
          { type: 'main-product', label: 'Ana Ürün' },
          { type: 'certified', label: 'MID Onaylı' },
        ],
        priceMin: 42.0,
        priceMax: 58.0,
        moq: 200,
        moqUnit: 'adet',
        soldCount: 22456,
        link: '/pages/product-detail.html',
      },
      {
        id: 'clp-10',
        name: 'Mekanik Çok Hüzmeli Kuru Tip Su Sayacı DN20',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80',
        hasVideo: false,
        badges: [{ type: 'certified', label: 'ISO 4064' }],
        priceMin: 8.5,
        priceMax: 12.0,
        moq: 500,
        moqUnit: 'adet',
        soldCount: 34210,
        link: '/pages/product-detail.html',
      },
      {
        id: 'clp-11',
        name: 'Endüstriyel Ultrasonik Su Sayacı DN50-DN300 Flanşlı',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80',
        hasVideo: true,
        badges: [{ type: 'main-product', label: 'Ana Ürün' }],
        priceMin: 180.0,
        priceMax: 450.0,
        moq: 50,
        moqUnit: 'adet',
        soldCount: 4560,
        link: '/pages/product-detail.html',
      },
      {
        id: 'clp-12',
        name: 'Ön Ödemeli IC Kartlı Su Sayacı DN15 Pirinç Gövdeli',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80',
        hasVideo: false,
        badges: [{ type: 'certified', label: 'CE Sertifikalı' }],
        priceMin: 25.0,
        priceMax: 35.0,
        moq: 300,
        moqUnit: 'adet',
        soldCount: 18970,
        link: '/pages/product-detail.html',
      },
      {
        id: 'clp-13',
        name: 'Kablosuz NB-IoT Uzaktan Okuma Su Sayacı DN25',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80',
        hasVideo: true,
        badges: [
          { type: 'main-product', label: 'Ana Ürün' },
          { type: 'certified', label: 'IP68 Koruma' },
        ],
        priceMin: 55.0,
        priceMax: 78.0,
        moq: 200,
        moqUnit: 'adet',
        soldCount: 11230,
        link: '/pages/product-detail.html',
      },
      {
        id: 'clp-14',
        name: 'Manyetik Debimetre Tip Su Sayacı DN100 Paslanmaz Çelik',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80',
        hasVideo: false,
        badges: [],
        priceMin: 320.0,
        priceMax: 520.0,
        moq: 20,
        moqUnit: 'adet',
        soldCount: 2340,
        link: '/pages/product-detail.html',
      },
      {
        id: 'clp-15',
        name: 'Woltman Tip Yatay Su Sayacı DN50 Endüstriyel Kullanım',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80',
        hasVideo: true,
        badges: [{ type: 'certified', label: 'MID Onaylı' }],
        priceMin: 85.0,
        priceMax: 120.0,
        moq: 100,
        moqUnit: 'adet',
        soldCount: 7650,
        link: '/pages/product-detail.html',
      },
      {
        id: 'clp-16',
        name: 'Kompakt Isı Sayacı Entegre Su Ölçüm DN20 Konut Tipi',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80',
        hasVideo: false,
        badges: [{ type: 'main-product', label: 'Ana Ürün' }],
        priceMin: 65.0,
        priceMax: 90.0,
        moq: 200,
        moqUnit: 'adet',
        soldCount: 9870,
        link: '/pages/product-detail.html',
      },
    ],
  },
];

// ─── C7: Company Info ───────────────────────────────────
const company: CompanyInfo = {
  heroImage: '/assets/mock/fabrika-hero.jpg',
  heroTitle: 'Odaklanma',
  heroSubtitle: '20 yılı aşkın süredir özelleştirilmiş ölçüm çözümleri sunmaya odaklanıyoruz',
  description:
    '2004 yılında kurulan Anadolu Endüstriyel Ölçüm Sistemleri A.Ş., akıllı enerji ölçüm ürünlerinin Ar-Ge, üretim ve satışı konusunda uzmanlaşmış yüksek teknoloji kuruluşudur. 500\'den fazla çalışanı ve 30.000 m² üretim tesisi ile dünya genelinde 60\'tan fazla ülkedeki müşterilerimize yenilikçi ön ödemeli elektrik sayaçları, su sayaçları ve doğalgaz sayaçları sunmaktayız. ISO 9001 sertifikalı üretim hattımız tutarlı kalite ve güvenilirlik sağlamaktadır.',
  descriptionExtended:
    'Şirketimiz, IEC, ANSI ve BS dahil uluslararası standartları karşılayan özelleştirilmiş OEM/ODM çözümleri sunma konusunda kararlıdır. Enerji verimliliği ve akıllı şebeke altyapısı alanlarında lider konumdayız. Yıllık 2 milyon adet üretim kapasitemiz ile küçük ve büyük ölçekli siparişlere hızlı teslimat garantisi veriyoruz.',
  factoryPhotos: [
    { id: 'fp-1', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80', caption: 'Üretim Hattı' },
    { id: 'fp-2', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80', caption: 'Kalite Test Laboratuvarı' },
    { id: 'fp-3', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80', caption: 'Montaj Atölyesi' },
  ],
  carouselPhotos: [
    { id: 'cp-1', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80', caption: 'Akıllı İnovasyon Parkı' },
    { id: 'cp-2', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80', caption: 'Otomatik Üretim Hattı' },
    { id: 'cp-3', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80', caption: 'Ar-Ge Merkezi' },
  ],
  locations: [
    { id: 'loc-1', name: 'İstanbul, Türkiye (Genel Müdürlük)', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80' },
    { id: 'loc-2', name: 'Ankara, Türkiye (Bölge Ofisi)', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80' },
    { id: 'loc-3', name: 'İzmir, Türkiye (Üretim Tesisi)', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80' },
    { id: 'loc-4', name: 'Kocaeli, Türkiye (Depo & Lojistik)', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80' },
  ],
};

// ─── C8: Certificates ───────────────────────────────────
const certificates: Certificate[] = [
  { id: 'cert-1', name: 'ISO 9001:2015 Kalite Yönetim Sistemi', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80' },
  { id: 'cert-2', name: 'ISO 14001:2015 Çevre Yönetim Sistemi', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80' },
  { id: 'cert-3', name: 'CE Uygunluk Belgesi', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80' },
  { id: 'cert-4', name: 'IEC 62052-11 Test Raporu', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80' },
  { id: 'cert-5', name: 'TÜV Rheinland Sertifikası', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80' },
  { id: 'cert-6', name: 'SGS Denetim Raporu', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80' },
  { id: 'cert-7', name: 'TSE Türk Standartları Uygunluk Belgesi', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80' },
  { id: 'cert-8', name: 'KEMA/DEKRA Tip Onay Sertifikası', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80' },
];

// ─── C9: Why Choose Us ──────────────────────────────────
const advantages: Advantage[] = [
  {
    id: 'adv-1',
    icon: 'shield-check',
    title: 'GÜVENLİK',
    description: 'Uluslararası Parmak İzi Doğrulama, BCI protokolü, Akıllı Ön Ödeme, Güvenli Kimlik Doğrulama, 15.000+ Kurulum',
  },
  {
    id: 'adv-2',
    icon: 'certificate',
    title: 'KALİTE',
    description: 'ISO 9001 Sertifikalı, Gelişmiş Test Altyapısı, %100 Kalite Kontrol, Otomatik Üretim Hattı, %0,1 Hata Oranı',
  },
  {
    id: 'adv-3',
    icon: 'lightbulb',
    title: 'İNOVASYON',
    description: 'Uzman Ar-Ge Ekibi, 50+ Patent, Sürekli İyileştirme, Akıllı IoT Entegrasyonu, Yapay Zeka Destekli Analitik',
  },
  {
    id: 'adv-4',
    icon: 'headset',
    title: 'HİZMET',
    description: 'Çevrimiçi Teknik Destek, 48 Saat İçinde Yanıt, 7/24 İş Danışmanlığı, Özel Müşteri Temsilcisi',
  },
  {
    id: 'adv-5',
    icon: 'cog',
    title: 'OEM/ODM',
    description: 'OEM ve ODM Hizmeti, Özel Firmware Geliştirme, Özel Etiket Üretimi, Ambalaj Tasarımı, Tasarım Danışmanlığı',
  },
];

const features: Feature[] = [
  { id: 'feat-1', icon: 'shield', title: 'Kalite güvencesi' },
  { id: 'feat-2', icon: 'factory', title: 'OEM/ODM Onaylı' },
  { id: 'feat-3', icon: 'support', title: 'Özenli hizmet' },
];

// ─── C10: Company Introduction ──────────────────────────
const companyInfoCells: CompanyInfoCell[] = [
  { icon: 'globe', label: 'Ülke / Bölge', value: 'İstanbul, Türkiye', verified: true },
  { icon: 'calendar', label: 'Kuruluş Yılı', value: '2004', verified: true },
  { icon: 'factory', label: 'İş Türü', value: 'Özel Üretici (OEM/ODM)', verified: true },
  { icon: 'box', label: 'Ana Ürünler', value: 'Elektrik Sayacı, Su Sayacı, Doğalgaz Sayacı, Isı Sayacı, Enerji İzleme Sistemi', verified: true },
  { icon: 'map', label: 'Ana Pazarlar', value: 'Afrika, Orta Doğu, Güneydoğu Asya, Güney Amerika', verified: true },
  { icon: 'chart', label: 'Yıllık Toplam Ciro', value: '85.000.000 USD', verified: true },
];

const companyPhotos: CompanyPhoto[] = [
  { id: 'cip-1', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80', caption: 'Fabrika Genel Görünüm', hasVideo: true },
  { id: 'cip-2', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80', caption: 'Üretim Hattı', hasVideo: false },
  { id: 'cip-3', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80', caption: 'Depo Alanı', hasVideo: false },
  { id: 'cip-4', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80', caption: 'Showroom / Sergi Alanı', hasVideo: false },
];

// ─── C11: Gallery ───────────────────────────────────────
const galleryPhotos: GalleryPhoto[] = [
  { id: 'gal-1', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80', caption: 'Otomatik Montaj Hattı' },
  { id: 'gal-2', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80', caption: 'Kalite Kontrol Laboratuvarı' },
  { id: 'gal-3', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80', caption: 'Hammadde Depolama Alanı' },
  { id: 'gal-4', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80', caption: 'Ambalaj ve Paketleme Bölümü' },
  { id: 'gal-5', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80', caption: 'Ar-Ge Merkezi' },
  { id: 'gal-6', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80', caption: 'İdari Bina' },
  { id: 'gal-7', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80', caption: 'Kalibrasyon ve Test Odası' },
  { id: 'gal-8', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80', caption: 'Sevkiyat ve Lojistik Alanı' },
];

// ─── C12: Contact Form ──────────────────────────────────
const contactForm: ContactFormData = {
  title: 'Tedarikçiye mesaj gönder',
  recipient: {
    name: 'Ahmet Yılmaz',
    title: 'Dış Ticaret Müdürü',
    department: 'Satış Departmanı',
  },
  placeholder: 'Ürün adı, renk, boyut, miktar, malzeme vb. gibi sorgu detaylarınızı yazın.',
  maxLength: 8000,
  businessCardDefault: true,
};

// ─── C13: Floating Actions ──────────────────────────────
const floatingActions: FloatingActionsData = {
  buttons: [
    {
      id: 'contact',
      label: 'Contact Supplier',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
      bgColor: 'bg-[#f97316]',
      hoverColor: 'hover:bg-primary-600',
      action: 'scroll-to-contact',
      ariaLabel: 'Contact Supplier',
    },
    {
      id: 'chat',
      label: 'Chat Now!',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>',
      bgColor: 'bg-primary-600',
      hoverColor: 'hover:bg-[#dc2626]',
      action: 'open-chat',
      ariaLabel: 'Chat Now',
    },
  ],
  topPosition: '40%',
};

// ─── Aggregate Export ───────────────────────────────────
export const sellerData: SellerStorefrontData = {
  seller,
  navData,
  heroBanner,
  categoryCards,
  hotProducts,
  categoryListings,
  company,
  certificates,
  advantages,
  features,
  companyInfoCells,
  companyPhotos,
  galleryPhotos,
  contactForm,
  floatingActions,
};

// ─── C14: Seller Performance Stats & Reviews ──────────────────────────────
export const sellerStats: any = {
  rating: 4.7,
  reviewCount: 87,
  responseTime: '3h',
  onTimeDeliveryRate: '98.5%',
  transactions: 154,
  supplierServiceScore: 4.8,
  onTimeShipmentScore: 4.6,
  productQualityScore: 4.6
};

export const sellerReviews: any[] = [
  {
    id: 'rev-1',
    reviewerName: 'J********l',
    country: 'Angola',
    countryFlag: '🇦🇴',
    date: '25 Feb 2026 10:15',
    comment: 'muito bom veio do mesmo jeito que pedi',
    productName: 'USB portu düz ile özelleştirilebilir Logo 15.6 inç su geçirmez Oxford iş rahat okul dizüstü bilgisayar seyahat sırt çantası',
    productImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop',
    productPrice: '$2.58-2.95 / Adet'
  },
  {
    id: 'rev-2',
    reviewerName: 'M********a',
    country: 'Senegal',
    countryFlag: '🇸🇳',
    date: '12 Feb 2026 19:04',
    comment: 'cool',
    productName: 'Yeni tasarım moda serin sırt çantası lüks su geçirmez öğrenci okul çantası kaliteli iş dizüstü bilgisayar seyahat sırt çantası eğlence',
    productImage: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=100&h=100&fit=crop',
    productPrice: '$8.69-9.99 / Adet'
  }
];
