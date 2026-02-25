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
    { label: 'Ana Sayfa', href: '#', isActive: true },
    { label: 'Ürünler', href: '#', isActive: false, dropdownType: 'products' },
    { label: 'Şirket Profili', href: '#', isActive: false, dropdownType: 'company' },
    { label: 'İletişim', href: '#contact-form', isActive: false },
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
    { label: 'Şirkete Genel Bakış', href: '#company-info' },
    { label: 'Değerlendirmeler ve Yorumlar', href: '#' },
  ],
  searchPlaceholder: 'Bu mağazada ara',
};

// ─── C3: Hero Banner ────────────────────────────────────
const heroBanner: HeroBannerData = {
  slides: [
    {
      id: 'slide-1',
      image: '/assets/mock/hero-oem-odm.jpg',
      title: 'OEM/ODM',
      subtitle: 'Hassas ölçüm teknolojisi\nKurum içi Ar-Ge inovasyon\nKüresel OEM/ODM ortaklıkları',
      textPosition: 'left',
      textColor: 'dark',
    },
    {
      id: 'slide-2',
      image: '/assets/mock/hero-marka.jpg',
      title: 'SİZİN MARKANIZ\nSİZİN RENGİNİZ\nSİZİN YOLUNUZ',
      textPosition: 'left',
      textColor: 'dark',
    },
    {
      id: 'slide-3',
      image: '/assets/mock/hero-akilli-sayac.jpg',
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
  { id: 'cat-1', name: 'ÖN ÖDEMELİ ELEKTRİK SAYAÇLARI', bgColor: '#d4e157', image: '/assets/mock/cat-on-odemeli.png' },
  { id: 'cat-2', name: 'AKILLI ELEKTRİK SAYAÇLARI', bgColor: '#90caf9', image: '/assets/mock/cat-akilli-elektrik.png' },
  { id: 'cat-3', name: 'ENDÜSTRİYEL ENERJİ SAYAÇLARI', bgColor: '#bdbdbd', image: '/assets/mock/cat-endustriyel.png' },
  { id: 'cat-4', name: 'ULTRASONİK SU SAYAÇLARI', bgColor: '#80deea', image: '/assets/mock/cat-ultrasonik-su.png' },
  { id: 'cat-5', name: 'MEKANİK SU SAYAÇLARI', bgColor: '#a5d6a7', image: '/assets/mock/cat-mekanik-su.png' },
  { id: 'cat-6', name: 'DOĞALGAZ SAYAÇLARI', bgColor: '#ffcc80', image: '/assets/mock/cat-dogalgaz.png' },
  { id: 'cat-7', name: 'YEDEK PARÇA VE AKSESUARLAR', bgColor: '#f48fb1', image: '/assets/mock/cat-yedek-parca.png' },
];

// ─── C5: Hot Products ───────────────────────────────────
const hotProducts: SimpleProduct[] = [
  { id: 'hp-1', name: 'DIN Ray Tipi Ön Ödemeli Sayaç (CIU Modüllü)', image: '/assets/mock/prod-din-ray.jpg', link: '#' },
  { id: 'hp-2', name: 'Tek Fazlı Ön Ödemeli Çift Kaynaklı Enerji Sayacı', image: '/assets/mock/prod-tek-faz.jpg', link: '#' },
  { id: 'hp-3', name: 'Üç Fazlı Ön Ödemeli Enerji Sayacı', image: '/assets/mock/prod-uc-faz.jpg', link: '#' },
  { id: 'hp-4', name: 'Ultrasonik Su Sayacı DN15-DN300', image: '/assets/mock/prod-ultrasonik.jpg', link: '#' },
  { id: 'hp-5', name: 'Akıllı Ön Ödemeli Tokenli Elektrik Sayacı', image: '/assets/mock/prod-akilli-token.jpg', link: '#' },
  { id: 'hp-6', name: 'Endüstriyel Doğalgaz Sayacı G4-G100', image: '/assets/mock/prod-dogalgaz.jpg', link: '#' },
  { id: 'hp-7', name: 'LoRa Haberleşmeli Uzaktan Okuma Sayacı', image: '/assets/mock/prod-lora.jpg', link: '#' },
  { id: 'hp-8', name: 'Çok Tarifeli Akıllı Elektrik Sayacı', image: '/assets/mock/prod-cok-tarifeli.jpg', link: '#' },
  { id: 'hp-9', name: 'Kompakt Tip Isı Sayacı DN20-DN100', image: '/assets/mock/prod-isi-sayaci.jpg', link: '#' },
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
        image: '/assets/mock/on-odemeli-1.jpg',
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
        link: '#',
      },
      {
        id: 'clp-2',
        name: 'Üç Fazlı Ön Ödemeli Enerji Sayacı Klavyeli Giriş',
        image: '/assets/mock/on-odemeli-2.jpg',
        hasVideo: false,
        badges: [{ type: 'certified', label: 'IEC Onaylı' }],
        priceMin: 32.0,
        priceMax: 45.0,
        moq: 300,
        moqUnit: 'adet',
        soldCount: 15843,
        link: '#',
      },
      {
        id: 'clp-3',
        name: 'DIN Ray Montajlı Ön Ödemeli Sayaç CIU Üniteli',
        image: '/assets/mock/on-odemeli-3.jpg',
        hasVideo: true,
        badges: [{ type: 'main-product', label: 'Ana Ürün' }],
        priceMin: 22.0,
        priceMax: 28.5,
        moq: 500,
        moqUnit: 'adet',
        soldCount: 12567,
        link: '#',
      },
      {
        id: 'clp-4',
        name: 'Çift Kaynaklı Ön Ödemeli Elektrik Sayacı (Şebeke + Güneş)',
        image: '/assets/mock/on-odemeli-4.jpg',
        hasVideo: false,
        badges: [],
        priceMin: 35.0,
        priceMax: 42.0,
        moq: 200,
        moqUnit: 'adet',
        soldCount: 8934,
        link: '#',
      },
      {
        id: 'clp-5',
        name: 'Akıllı Ön Ödemeli Sayaç GPRS/4G Haberleşme Modüllü',
        image: '/assets/mock/on-odemeli-5.jpg',
        hasVideo: true,
        badges: [{ type: 'certified', label: 'DLMS Uyumlu' }],
        priceMin: 28.0,
        priceMax: 36.0,
        moq: 300,
        moqUnit: 'adet',
        soldCount: 19450,
        link: '#',
      },
      {
        id: 'clp-6',
        name: 'Endüstriyel Tip Üç Fazlı Ön Ödemeli CT Sayacı',
        image: '/assets/mock/on-odemeli-6.jpg',
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
        link: '#',
      },
      {
        id: 'clp-7',
        name: 'Kompakt Ön Ödemeli Sayaç Dahili Röle ve LCD Ekranlı',
        image: '/assets/mock/on-odemeli-7.jpg',
        hasVideo: true,
        badges: [{ type: 'certified', label: 'IEC 62055' }],
        priceMin: 15.0,
        priceMax: 20.0,
        moq: 1000,
        moqUnit: 'adet',
        soldCount: 31245,
        link: '#',
      },
      {
        id: 'clp-8',
        name: 'Duvara Monte Ön Ödemeli Sayaç Entegre Tuş Takımlı',
        image: '/assets/mock/on-odemeli-8.jpg',
        hasVideo: false,
        badges: [{ type: 'main-product', label: 'Ana Ürün' }],
        priceMin: 19.0,
        priceMax: 25.5,
        moq: 500,
        moqUnit: 'adet',
        soldCount: 14320,
        link: '#',
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
        image: '/assets/mock/su-1.jpg',
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
        link: '#',
      },
      {
        id: 'clp-10',
        name: 'Mekanik Çok Hüzmeli Kuru Tip Su Sayacı DN20',
        image: '/assets/mock/su-2.jpg',
        hasVideo: false,
        badges: [{ type: 'certified', label: 'ISO 4064' }],
        priceMin: 8.5,
        priceMax: 12.0,
        moq: 500,
        moqUnit: 'adet',
        soldCount: 34210,
        link: '#',
      },
      {
        id: 'clp-11',
        name: 'Endüstriyel Ultrasonik Su Sayacı DN50-DN300 Flanşlı',
        image: '/assets/mock/su-3.jpg',
        hasVideo: true,
        badges: [{ type: 'main-product', label: 'Ana Ürün' }],
        priceMin: 180.0,
        priceMax: 450.0,
        moq: 50,
        moqUnit: 'adet',
        soldCount: 4560,
        link: '#',
      },
      {
        id: 'clp-12',
        name: 'Ön Ödemeli IC Kartlı Su Sayacı DN15 Pirinç Gövdeli',
        image: '/assets/mock/su-4.jpg',
        hasVideo: false,
        badges: [{ type: 'certified', label: 'CE Sertifikalı' }],
        priceMin: 25.0,
        priceMax: 35.0,
        moq: 300,
        moqUnit: 'adet',
        soldCount: 18970,
        link: '#',
      },
      {
        id: 'clp-13',
        name: 'Kablosuz NB-IoT Uzaktan Okuma Su Sayacı DN25',
        image: '/assets/mock/su-5.jpg',
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
        link: '#',
      },
      {
        id: 'clp-14',
        name: 'Manyetik Debimetre Tip Su Sayacı DN100 Paslanmaz Çelik',
        image: '/assets/mock/su-6.jpg',
        hasVideo: false,
        badges: [],
        priceMin: 320.0,
        priceMax: 520.0,
        moq: 20,
        moqUnit: 'adet',
        soldCount: 2340,
        link: '#',
      },
      {
        id: 'clp-15',
        name: 'Woltman Tip Yatay Su Sayacı DN50 Endüstriyel Kullanım',
        image: '/assets/mock/su-7.jpg',
        hasVideo: true,
        badges: [{ type: 'certified', label: 'MID Onaylı' }],
        priceMin: 85.0,
        priceMax: 120.0,
        moq: 100,
        moqUnit: 'adet',
        soldCount: 7650,
        link: '#',
      },
      {
        id: 'clp-16',
        name: 'Kompakt Isı Sayacı Entegre Su Ölçüm DN20 Konut Tipi',
        image: '/assets/mock/su-8.jpg',
        hasVideo: false,
        badges: [{ type: 'main-product', label: 'Ana Ürün' }],
        priceMin: 65.0,
        priceMax: 90.0,
        moq: 200,
        moqUnit: 'adet',
        soldCount: 9870,
        link: '#',
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
    { id: 'fp-1', image: '/assets/mock/fabrika-1.jpg', caption: 'Üretim Hattı' },
    { id: 'fp-2', image: '/assets/mock/fabrika-2.jpg', caption: 'Kalite Test Laboratuvarı' },
    { id: 'fp-3', image: '/assets/mock/fabrika-3.jpg', caption: 'Montaj Atölyesi' },
  ],
  carouselPhotos: [
    { id: 'cp-1', image: '/assets/mock/karusel-1.jpg', caption: 'Akıllı İnovasyon Parkı' },
    { id: 'cp-2', image: '/assets/mock/karusel-2.jpg', caption: 'Otomatik Üretim Hattı' },
    { id: 'cp-3', image: '/assets/mock/karusel-3.jpg', caption: 'Ar-Ge Merkezi' },
  ],
  locations: [
    { id: 'loc-1', name: 'İstanbul, Türkiye (Genel Müdürlük)', image: '/assets/mock/loc-istanbul.jpg' },
    { id: 'loc-2', name: 'Ankara, Türkiye (Bölge Ofisi)', image: '/assets/mock/loc-ankara.jpg' },
    { id: 'loc-3', name: 'İzmir, Türkiye (Üretim Tesisi)', image: '/assets/mock/loc-izmir.jpg' },
    { id: 'loc-4', name: 'Kocaeli, Türkiye (Depo & Lojistik)', image: '/assets/mock/loc-kocaeli.jpg' },
  ],
};

// ─── C8: Certificates ───────────────────────────────────
const certificates: Certificate[] = [
  { id: 'cert-1', name: 'ISO 9001:2015 Kalite Yönetim Sistemi', image: '/assets/mock/cert-iso9001.jpg' },
  { id: 'cert-2', name: 'ISO 14001:2015 Çevre Yönetim Sistemi', image: '/assets/mock/cert-iso14001.jpg' },
  { id: 'cert-3', name: 'CE Uygunluk Belgesi', image: '/assets/mock/cert-ce.jpg' },
  { id: 'cert-4', name: 'IEC 62052-11 Test Raporu', image: '/assets/mock/cert-iec.jpg' },
  { id: 'cert-5', name: 'TÜV Rheinland Sertifikası', image: '/assets/mock/cert-tuv.jpg' },
  { id: 'cert-6', name: 'SGS Denetim Raporu', image: '/assets/mock/cert-sgs.jpg' },
  { id: 'cert-7', name: 'TSE Türk Standartları Uygunluk Belgesi', image: '/assets/mock/cert-tse.jpg' },
  { id: 'cert-8', name: 'KEMA/DEKRA Tip Onay Sertifikası', image: '/assets/mock/cert-kema.jpg' },
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
  { id: 'cip-1', image: '/assets/mock/tanitim-fabrika-1.jpg', caption: 'Fabrika Genel Görünüm', hasVideo: true },
  { id: 'cip-2', image: '/assets/mock/tanitim-fabrika-2.jpg', caption: 'Üretim Hattı', hasVideo: false },
  { id: 'cip-3', image: '/assets/mock/tanitim-fabrika-3.jpg', caption: 'Depo Alanı', hasVideo: false },
  { id: 'cip-4', image: '/assets/mock/tanitim-fabrika-4.jpg', caption: 'Showroom / Sergi Alanı', hasVideo: false },
];

// ─── C11: Gallery ───────────────────────────────────────
const galleryPhotos: GalleryPhoto[] = [
  { id: 'gal-1', image: '/assets/mock/galeri-1.jpg', caption: 'Otomatik Montaj Hattı' },
  { id: 'gal-2', image: '/assets/mock/galeri-2.jpg', caption: 'Kalite Kontrol Laboratuvarı' },
  { id: 'gal-3', image: '/assets/mock/galeri-3.jpg', caption: 'Hammadde Depolama Alanı' },
  { id: 'gal-4', image: '/assets/mock/galeri-4.jpg', caption: 'Ambalaj ve Paketleme Bölümü' },
  { id: 'gal-5', image: '/assets/mock/galeri-5.jpg', caption: 'Ar-Ge Merkezi' },
  { id: 'gal-6', image: '/assets/mock/galeri-6.jpg', caption: 'İdari Bina' },
  { id: 'gal-7', image: '/assets/mock/galeri-7.jpg', caption: 'Kalibrasyon ve Test Odası' },
  { id: 'gal-8', image: '/assets/mock/galeri-8.jpg', caption: 'Sevkiyat ve Lojistik Alanı' },
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
      hoverColor: 'hover:bg-[#ea580c]',
      action: 'scroll-to-contact',
      ariaLabel: 'Contact Supplier',
    },
    {
      id: 'chat',
      label: 'Chat Now!',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>',
      bgColor: 'bg-[#ea580c]',
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
