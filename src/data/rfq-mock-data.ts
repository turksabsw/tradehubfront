/**
 * RFQ Page Mock Data
 * Turkish mock data for all RFQ page sections — B2B marketplace style.
 */

import type { CustomizationCard, Product, Testimonial } from '../types/rfq';

export const customizationCards: CustomizationCard[] = [
  {
    id: 'card-1',
    title: 'Tasarım',
    subtitle: 'Ürününüzü özelleştirin',
    icon: '🎨',
    position: 1,
  },
  {
    id: 'card-2',
    title: 'Logo',
    subtitle: 'Markanızı ekleyin',
    icon: '🏷️',
    position: 2,
  },
  {
    id: 'card-3',
    title: 'Paketleme',
    subtitle: 'Özel paket tasarımı',
    icon: '📦',
    position: 3,
  },
  {
    id: 'card-4',
    title: 'Ambalajlama',
    subtitle: 'Profesyonel ambalaj',
    icon: '🎁',
    position: 4,
  },
];

export const selectedProducts: Product[] = [
  {
    id: 'sp-1',
    name: 'Paslanmaz Çelik Termos Bardak Özel Logo Baskılı 500ml',
    image: '',
    supplierCount: 128,
    ctaText: 'Anında fiyat teklifi al',
  },
  {
    id: 'sp-2',
    name: 'Organik Pamuk Promosyon T-Shirt Toptan Baskılı',
    image: '',
    supplierCount: 256,
    ctaText: 'Anında fiyat teklifi al',
  },
  {
    id: 'sp-3',
    name: 'Kraft Karton Ambalaj Kutusu Özel Boyut Baskılı',
    image: '',
    supplierCount: 89,
    ctaText: 'Anında fiyat teklifi al',
  },
  {
    id: 'sp-4',
    name: 'Bambu Kapaklı Cam Kavanoz Bal Ambalajı 250ml',
    image: '',
    supplierCount: 67,
    ctaText: 'Anında fiyat teklifi al',
  },
  {
    id: 'sp-5',
    name: 'LED Masa Lambası USB Şarjlı Kablosuz Toptan',
    image: '',
    supplierCount: 194,
    ctaText: 'Anında fiyat teklifi al',
  },
  {
    id: 'sp-6',
    name: 'Silikon Telefon Kılıfı Özel Tasarım Toptan Üretim',
    image: '',
    supplierCount: 312,
    ctaText: 'Anında fiyat teklifi al',
  },
];

export const customProducts: Product[] = [
  { id: 'cp-1', name: 'Endüstriyel Dişli Pompa Paslanmaz Çelik Gıda Sınıfı', image: '', supplierCount: 45, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-2', name: 'Otomatik Paketleme Makinesi Dikey Form Dolum', image: '', supplierCount: 32, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-3', name: 'CNC Torna Tezgahı Hassas İşleme Metal Parça', image: '', supplierCount: 78, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-4', name: 'Güneş Paneli Monokristal 550W Endüstriyel Çatı', image: '', supplierCount: 156, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-5', name: 'Hidrolik Pres 100 Ton Otomasyon Sistemli', image: '', supplierCount: 23, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-6', name: 'Elektrik Motoru 3 Fazlı Asenkron 7.5kW', image: '', supplierCount: 89, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-7', name: 'Tekstil Kumaş Polyester Örme Toptan Metre', image: '', supplierCount: 234, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-8', name: 'Deri Cüzdan Erkek Hakiki Deri El Yapımı Toptan', image: '', supplierCount: 112, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-9', name: 'Seramik Karo 60x60 Mat Granit Görünümlü Toptan', image: '', supplierCount: 67, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-10', name: 'Alüminyum Profil Doğrama Sistemi 6063 T5', image: '', supplierCount: 145, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-11', name: 'Plastik Enjeksiyon Kalıp Özel Tasarım Üretim', image: '', supplierCount: 56, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-12', name: 'Paslanmaz Çelik Boru 304 Dikişsiz Endüstriyel', image: '', supplierCount: 98, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-13', name: 'Organik Zeytinyağı Soğuk Sıkım 5L Teneke Toptan', image: '', supplierCount: 43, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-14', name: 'Endüstriyel Hava Kompresörü Vidalı 50HP', image: '', supplierCount: 34, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-15', name: 'Bebek Tekstil Seti Organik Pamuk 5 Parça Toptan', image: '', supplierCount: 178, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-16', name: 'LED Endüstriyel Aydınlatma Armatür IP65 150W', image: '', supplierCount: 201, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-17', name: 'Kauçuk Conta O-Ring NBR Endüstriyel Sızdırmazlık', image: '', supplierCount: 89, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-18', name: 'Ahşap Palet Euro Standart 120x80cm Toptan', image: '', supplierCount: 67, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-19', name: 'Kimyasal Ham Madde Polietilen Granül HDPE', image: '', supplierCount: 34, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-20', name: 'Otomotiv Yedek Parça Fren Balatası Seramik OEM', image: '', supplierCount: 156, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-21', name: 'Medikal Tek Kullanımlık Eldiven Nitril Pudrasız', image: '', supplierCount: 278, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-22', name: 'Tarım İlacı Herbisit Konsantre 20L Bidon Toptan', image: '', supplierCount: 23, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-23', name: 'Spor Ayakkabı Erkek Koşu Hafif Taban Toptan', image: '', supplierCount: 345, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-24', name: 'Çelik Konstrüksiyon Prefabrik Depo Hangar', image: '', supplierCount: 45, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-25', name: 'Cam Şişe Amber 500ml Vida Kapaklı İlaç Ambalaj', image: '', supplierCount: 78, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-26', name: 'Elektrikli Forklift 3 Ton Lityum Batarya Depo', image: '', supplierCount: 19, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-27', name: 'Gıda Ambalaj Filmi Streç PVC 30cm Toptan Rulo', image: '', supplierCount: 123, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-28', name: 'Güvenlik Kamerası IP PoE 4MP Gece Görüşlü', image: '', supplierCount: 267, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-29', name: 'Mutfak Robotu Endüstriyel Paslanmaz Çelik 10L', image: '', supplierCount: 56, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-30', name: 'Beton Mikser Kamyon 8m³ Özel İmalat Araç Üstü', image: '', supplierCount: 12, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-31', name: 'Halı Makine Dokuma Polipropilen 200x300cm Toptan', image: '', supplierCount: 89, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-32', name: 'Transformatör Kuru Tip 1000kVA Enerji Dağıtım', image: '', supplierCount: 15, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-33', name: 'Pet Mama Kuru Köpek Yetişkin 15kg Çuval Toptan', image: '', supplierCount: 67, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-34', name: 'Kozmetik Ambalaj Airless Pompa Şişe 50ml Toptan', image: '', supplierCount: 134, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-35', name: 'İnşaat Demiri Nervürlü 12mm B420C Toptan Demir', image: '', supplierCount: 45, ctaText: 'Hemen fiyat teklifi al' },
  { id: 'cp-36', name: 'Ofis Mobilya Ergonomik Çalışma Koltuğu Toptan', image: '', supplierCount: 198, ctaText: 'Hemen fiyat teklifi al' },
];

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote: 'iSTOC TradeHub sayesinde tedarikçi bulma sürecimiz yarıya indi. Özellikle fiyat teklifi sistemi çok hızlı ve pratik. 3 ayda 12 yeni tedarikçi ile anlaşma sağladık.',
    avatar: '',
    name: 'Mehmet Kaya',
    title: 'Satın Alma Müdürü',
    company: 'Anadolu Tekstil A.Ş.',
  },
  {
    id: 'testimonial-2',
    quote: 'Platformdaki AI destekli eşleştirme özelliği tam ihtiyacımız olan tedarikçileri öneriyor. İlk siparişimizden itibaren kaliteden memnunuz. Kesinlikle tavsiye ederim.',
    avatar: '',
    name: 'Ayşe Demir',
    title: 'Genel Müdür',
    company: 'Demir Gıda San. Tic. Ltd. Şti.',
  },
  {
    id: 'testimonial-3',
    quote: 'Yurt dışı tedarikçilerle iletişim kurmak hiç bu kadar kolay olmamıştı. Güvenli ödeme sistemi ve şeffaf süreç yönetimi ile toptan alımlarımızı büyük ölçüde kolaylaştırdık.',
    avatar: '',
    name: 'Ali Yılmaz',
    title: 'Kurumsal Satış Direktörü',
    company: 'Yılmaz Makine Sanayi A.Ş.',
  },
];
