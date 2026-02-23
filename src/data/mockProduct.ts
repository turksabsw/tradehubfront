/**
 * Mock Product Data
 * Static data for the product detail page — Alibaba B2B style.
 */

import type { ProductDetail } from '../types/product';

export const mockProduct: ProductDetail = {
  id: 'prod-001',
  title: 'Paslanmaz Çelik Özel Logo Kolye Ucu Altın Kaplama Toptan Takı Aksesuar',
  category: ['Ana Sayfa', 'Takı ve Aksesuar', 'Kolyeler', 'Kolye Uçları'],
  images: [
    { id: 'img-1', src: '', alt: 'Ürün görünümü 1' },
    { id: 'img-2', src: '', alt: 'Ürün görünümü 2' },
    { id: 'img-3', src: '', alt: 'Ürün görünümü 3' },
    { id: 'img-4', src: '', alt: 'Ürün detay görünümü' },
    { id: 'img-5', src: '', alt: 'Ambalaj görünümü' },
    { id: 'img-6', src: '', alt: 'Boyut detayı' },
  ],
  priceTiers: [
    { minQty: 1, maxQty: 99, price: 12.00, currency: 'USD' },
    { minQty: 100, maxQty: 499, price: 10.00, currency: 'USD' },
    { minQty: 500, maxQty: null, price: 8.50, currency: 'USD' },
  ],
  moq: 1,
  unit: 'adet',
  leadTime: '7-15 iş günü',
  shipping: [
    { method: 'DHL Express', estimatedDays: '5-8 iş günü', cost: '$45.00' },
    { method: 'Hava Kargo', estimatedDays: '10-15 iş günü', cost: '$28.00' },
    { method: 'Deniz Yolu', estimatedDays: '25-35 iş günü', cost: '$12.00' },
  ],
  variants: [
    {
      type: 'color',
      label: 'Renk',
      options: [
        { id: 'gold', label: 'Altın', value: '#D4AF37', available: true, thumbnail: 'https://placehold.co/80x80/D4AF37/fff?text=Altin' },
        { id: 'silver', label: 'Gümüş', value: '#C0C0C0', available: true, thumbnail: 'https://placehold.co/80x80/C0C0C0/333?text=Gumus' },
        { id: 'rosegold', label: 'Rose Gold', value: '#B76E79', available: true, thumbnail: 'https://placehold.co/80x80/B76E79/fff?text=Rose' },
        { id: 'black', label: 'Siyah', value: '#2D2D2D', available: false, thumbnail: 'https://placehold.co/80x80/2D2D2D/fff?text=Siyah' },
      ],
    },
    {
      type: 'size',
      label: 'Zincir Uzunluğu',
      options: [
        { id: 's', label: '40 cm', value: '40', available: true },
        { id: 'm', label: '45 cm', value: '45', available: true },
        { id: 'l', label: '50 cm', value: '50', available: true },
        { id: 'xl', label: '55 cm', value: '55', available: true },
      ],
    },
    {
      type: 'material',
      label: 'Malzeme',
      options: [
        { id: 'steel316', label: '316L Çelik', value: '316L', available: true },
        { id: 'titanium', label: 'Titanyum', value: 'Ti', available: true },
        { id: 'silver925', label: '925 Gümüş', value: '925', available: false },
      ],
    },
  ],
  specs: [
    { key: 'Malzeme', value: '316L Paslanmaz Çelik' },
    { key: 'Kaplama', value: '18K Altın / PVD Kaplama' },
    { key: 'Zincir Uzunluğu', value: '40-55 cm (ayarlanabilir)' },
    { key: 'Uç Boyutu', value: '20mm x 15mm' },
    { key: 'Ağırlık', value: '8.5g' },
    { key: 'Su Geçirmezlik', value: 'IP65' },
    { key: 'Garanti', value: '2 Yıl' },
    { key: 'Sertifikalar', value: 'SGS, ROHS, REACH' },
    { key: 'Menşei Ülke', value: 'Çin (Guangzhou)' },
    { key: 'Marka', value: 'OEM/ODM' },
  ],
  packagingSpecs: [
    { key: 'Satış Birimi', value: 'Tekli Ürün' },
    { key: 'Tekli Paket Boyutu', value: '25x13x16 cm' },
    { key: 'Tekli Brüt Ağırlık', value: '0.800 kg' },
  ],
  description: `
    <div class="space-y-4">
      <p>Premium kalite 316L paslanmaz çelik kolye ucu, 18K altın PVD kaplama ile üstün dayanıklılık ve şıklık sunar. Özel logo baskı imkânı ile markanızı ön plana çıkarın.</p>
      <h4 class="font-semibold text-base">Ürün Özellikleri</h4>
      <ul class="list-disc list-inside space-y-1 text-sm" style="color: var(--color-text-secondary);">
        <li>316L cerrahi çelik — alerji yapmaz, paslanmaz</li>
        <li>18K altın PVD kaplama — 2+ yıl renk garantisi</li>
        <li>Özel logo lazer kazıma veya kabartma</li>
        <li>IP65 su geçirmezlik sınıfı</li>
        <li>Nikel içermez — hassas ciltler için güvenli</li>
        <li>Her ürün bireysel OPP poşette paketlenir</li>
      </ul>
      <h4 class="font-semibold text-base">Kullanım Alanları</h4>
      <p class="text-sm" style="color: var(--color-text-secondary);">Moda takı mağazaları, online perakende, butik hediye dükkanları, kurumsal promosyon ürünleri, düğün hediyelikleri ve özel gün aksesuar koleksiyonları için idealdir.</p>
      <h4 class="font-semibold text-base">Kalite Kontrol</h4>
      <p class="text-sm" style="color: var(--color-text-secondary);">Her parti üretim öncesi malzeme testi, üretim sırası boyut kontrolü ve sevkiyat öncesi son kalite denetiminden geçer. SGS sertifikalı test raporları talep üzerine sunulur.</p>
    </div>
  `,
  packaging: `
    <table class="w-full text-sm">
      <tbody>
        <tr style="border-bottom: 1px solid var(--pd-spec-border, #e5e5e5);">
          <td class="py-2 font-medium" style="color: var(--pd-spec-key-color, #6b7280); width: 40%;">Birim Paketleme</td>
          <td class="py-2">Bireysel OPP poşet</td>
        </tr>
        <tr style="border-bottom: 1px solid var(--pd-spec-border, #e5e5e5);">
          <td class="py-2 font-medium" style="color: var(--pd-spec-key-color, #6b7280);">Paket Boyutu</td>
          <td class="py-2">10cm x 8cm x 3cm</td>
        </tr>
        <tr style="border-bottom: 1px solid var(--pd-spec-border, #e5e5e5);">
          <td class="py-2 font-medium" style="color: var(--pd-spec-key-color, #6b7280);">Birim Ağırlık</td>
          <td class="py-2">25g (paketli)</td>
        </tr>
        <tr style="border-bottom: 1px solid var(--pd-spec-border, #e5e5e5);">
          <td class="py-2 font-medium" style="color: var(--pd-spec-key-color, #6b7280);">Koli Boyutu</td>
          <td class="py-2">40cm x 30cm x 25cm</td>
        </tr>
        <tr>
          <td class="py-2 font-medium" style="color: var(--pd-spec-key-color, #6b7280);">Koli Başına Adet</td>
          <td class="py-2">200 adet</td>
        </tr>
      </tbody>
    </table>
  `,
  samplePrice: 30,
  rating: 4.7,
  reviewCount: 328,
  orderCount: '4,056',
  reviews: [
    {
      id: 'rev-1',
      author: 'Ahmet Y.',
      country: 'TR',
      countryName: 'Turkiye',
      rating: 5,
      date: '2025-12-15',
      comment: 'Kalite beklediğimin çok üstünde. Kaplama gerçekten sağlam, 3 aydır kullanıyorum hiç renk değişimi yok. Toptan sipariş için kesinlikle tavsiye ederim.',
      helpful: 24,
      verified: true,
      repeatBuyer: false,
      supplierReply: 'Tesekkur ederiz! Siparislerinizi her zaman ozenle hazirliyoruz.',
      tags: ['Kaliteli Urun', 'Iyi Tedarikci'],
      productTitle: 'Paslanmaz Çelik Kolye Ucu Altın Kaplama',
      productPrice: '$8.50-12.00',
      productImage: '',
    },
    {
      id: 'rev-2',
      author: 'Maria S.',
      country: 'DE',
      countryName: 'Almanya',
      rating: 4,
      date: '2025-11-28',
      comment: 'Good quality for the price. Shipping was fast with DHL. The gold plating looks premium. Only minor issue was some scratches on 2 pieces out of 50.',
      helpful: 18,
      verified: true,
      repeatBuyer: false,
      tags: ['Zamaninda Gonderim', 'Hizli Iletisim'],
      productTitle: '316L Çelik Özel Logo Bileklik Toptan',
      productPrice: '$5.20-9.80',
      productImage: '',
    },
    {
      id: 'rev-3',
      author: 'Fatma K.',
      country: 'TR',
      countryName: 'Turkiye',
      rating: 5,
      date: '2025-11-10',
      comment: 'İkinci siparişim bu tedarikçiden. İlk siparişteki gibi harika kalite. Logo baskı çok temiz çıkmış. Müşterilerimiz çok beğeniyor.',
      helpful: 15,
      verified: true,
      repeatBuyer: true,
      supplierReply: 'Tekrar siparisleriniz icin tesekkurler. Her zaman en iyi kaliteyi sunmaya devam edecegiz.',
      tags: ['Kaliteli Urun', 'Iyi Tedarikci', 'Profesyonel Isbirligi'],
      productTitle: 'Altın Kaplama Zincir Kolye Kadın 18K PVD',
      productPrice: '$3.80-7.50',
      productImage: '',
    },
    {
      id: 'rev-4',
      author: 'John D.',
      country: 'US',
      countryName: 'ABD',
      rating: 4,
      date: '2025-10-22',
      comment: 'Decent product overall. The pendant design matches the photos. Packaging was secure. Would have appreciated faster response time from the supplier.',
      helpful: 9,
      verified: true,
      repeatBuyer: false,
      tags: ['Iyi Tedarikci'],
      productTitle: 'Titanyum Çelik Erkek Yüzük Siyah Kaplama',
      productPrice: '$4.60-8.20',
      productImage: '',
    },
    {
      id: 'rev-5',
      author: 'Elena P.',
      country: 'IT',
      countryName: 'Italya',
      rating: 5,
      date: '2025-10-05',
      comment: 'Excellent! We ordered 500 pieces for our boutique chain. Every single piece was perfect. The supplier even sent extra samples for free. Highly recommended for bulk orders.',
      helpful: 31,
      verified: true,
      repeatBuyer: true,
      supplierReply: 'Toplu siparisleriniz icin tesekkurler! Numune gondermek bizim icin bir zevkti.',
      tags: ['Kaliteli Urun', 'Iyi Tedarikci', 'Hizli Iletisim'],
      productTitle: 'Gümüş Kübik Zirkon Küpe Set Kadın Toptan',
      productPrice: '$2.90-5.40',
      productImage: '',
    },
    {
      id: 'rev-6',
      author: 'Mehmet A.',
      country: 'TR',
      countryName: 'Turkiye',
      rating: 3,
      date: '2025-09-18',
      comment: 'Ürün kalitesi iyi ama kargo biraz geç geldi. 15 iş günü yerine 22 gün sürdü. Tedarikçi özür diledi ve bir sonraki sipariş için indirim teklif etti.',
      helpful: 7,
      verified: true,
      repeatBuyer: false,
      supplierReply: 'Gecikme icin ozur dileriz. Lojistik surecimizi iyilestirdik. Bir sonraki siparisinizte %10 indirim sunuyoruz.',
      productTitle: 'Rose Gold Paslanmaz Çelik Charm Bileklik',
      productPrice: '$6.30-11.00',
      productImage: '',
    },
  ],
  supplier: {
    name: 'Guangzhou Golden Craft Jewelry Co., Ltd.',
    verified: true,
    yearsInBusiness: 8,
    responseTime: '< 24 saat',
    responseRate: '%98',
    onTimeDelivery: '%95',
    mainProducts: ['Paslanmaz Çelik Takı', 'Altın Kaplama Aksesuar', 'Gümüş Takı', 'Özel Tasarım Kolye'],
    employees: '150-200',
    annualRevenue: '$5M - $10M',
    certifications: ['SGS', 'ISO 9001', 'BSCI', 'ROHS'],
  },
  faq: [
    {
      question: 'Minimum sipariş miktarı nedir?',
      answer: 'Stok ürünler için minimum sipariş miktarı 1 adettir. Özel logo veya tasarım için minimum 100 adet sipariş gerekmektedir.',
    },
    {
      question: 'Özel logo baskı yapılabiliyor mu?',
      answer: 'Evet, lazer kazıma ve kabartma olmak üzere iki farklı logo baskı yöntemi sunuyoruz. Logo dosyanızı AI veya PDF formatında göndermeniz yeterlidir. Numune onayı 3-5 iş günü içinde tamamlanır.',
    },
    {
      question: 'Ürünlerin garanti süresi ne kadardır?',
      answer: 'Tüm ürünlerimiz 2 yıl renk garantisi ve 1 yıl üretim hatası garantisi kapsamındadır. Garanti süresince ücretsiz değişim yapılmaktadır.',
    },
    {
      question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
      answer: 'T/T (banka havalesi), PayPal, Western Union ve Alibaba Trade Assurance üzerinden ödeme kabul ediyoruz. İlk siparişlerde %30 peşin, %70 sevkiyat öncesi ödeme şeklinde çalışıyoruz.',
    },
    {
      question: 'Numune gönderimi yapılıyor mu?',
      answer: 'Evet, stok ürünlerden ücretsiz numune gönderimi yapıyoruz (kargo alıcıya aittir). Özel tasarım numuneleri için numune ücreti alınır ve sipariş verilmesi durumunda bu ücret toplam tutardan düşülür.',
    },
    {
      question: 'Teslimat süresi ne kadardır?',
      answer: '1-100 adet siparişler için 3-5 iş günü, 101-500 adet için 7-12 iş günü, 500+ adet için 15-20 iş günü üretim süresi bulunmaktadır. Kargo süresi seçilen yönteme göre değişir.',
    },
  ],
  leadTimeRanges: [
    { quantityRange: '1 - 10', days: '7' },
    { quantityRange: '11 - 100', days: '20' },
    { quantityRange: '101 - 2.000', days: '45' },
    { quantityRange: '> 2.000', days: 'Pazarlık yapılacak' },
  ],
  customizationOptions: [
    { name: 'Malzeme', priceAddon: '+$0,50/adet', minOrder: 'Min. sipariş: 50 adet' },
  ],
  reviewCategoryRatings: [
    { label: 'Tedarikci Hizmeti', score: 4.9 },
    { label: 'Zamaninda Gonderim', score: 4.6 },
    { label: 'Urun Kalitesi', score: 4.8 },
  ],
  storeReviewCount: 151,
  reviewMentionTags: [
    { label: 'Profesyonel Isbirligi', count: 1 },
    { label: 'Zamaninda Gonderim', count: 1 },
    { label: 'Iyi Tedarikci', count: 4 },
    { label: 'Kaliteli Urun', count: 3 },
    { label: 'Hizli Iletisim', count: 2 },
  ],
};
