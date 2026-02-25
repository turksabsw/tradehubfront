/**
 * Categories Page — Data
 * Amazon-style category grid data with Unsplash images per category.
 * Maps to megaCategories from header for consistency.
 */

export interface CategoryItem {
  id: string;
  name: string;
  href: string;
  image: string;
  subcategories: { name: string; href: string }[];
}

export interface FilterGroup {
  title: string;
  items: { name: string; href: string }[];
  showShopAll?: boolean;
  shopAllHref?: string;
}

export interface CategorySection {
  title: string;
  categories: CategoryItem[];
  filters?: FilterGroup[];
}

/**
 * All category sections for the categories page.
 * Each section = "Featured categories" block with circular thumbnails.
 */
export const categorySections: CategorySection[] = [
  {
    title: 'Giyim & Aksesuar',
    filters: [
      {
        title: 'Giyim Türüne Göre',
        items: [
          { name: 'Kadın Giyim', href: 'products.html?q=kadın+giyim' },
          { name: 'Erkek Giyim', href: 'products.html?q=erkek+giyim' },
          { name: 'Çocuk Giyim', href: 'products.html?q=çocuk+giyim' },
          { name: 'Spor Giyim', href: 'products.html?q=spor+giyim' },
          { name: 'İç Giyim', href: 'products.html?q=iç+giyim' },
        ],
        showShopAll: true,
        shopAllHref: 'products.html?q=giyim',
      },
      {
        title: 'Bedene Göre',
        items: [
          { name: 'XS', href: 'products.html?q=giyim+xs' },
          { name: 'S', href: 'products.html?q=giyim+s' },
          { name: 'M', href: 'products.html?q=giyim+m' },
          { name: 'L', href: 'products.html?q=giyim+l' },
          { name: 'XL', href: 'products.html?q=giyim+xl' },
          { name: 'XXL ve üzeri', href: 'products.html?q=giyim+xxl' },
        ],
        showShopAll: true,
        shopAllHref: 'products.html?q=giyim',
      },
      {
        title: 'Fiyata Göre',
        items: [
          { name: '$25 altı', href: 'products.html?q=giyim&price=0-25' },
          { name: '$25 - $50', href: 'products.html?q=giyim&price=25-50' },
          { name: '$50 - $100', href: 'products.html?q=giyim&price=50-100' },
          { name: '$100 - $200', href: 'products.html?q=giyim&price=100-200' },
          { name: '$200 ve üzeri', href: 'products.html?q=giyim&price=200' },
        ],
        showShopAll: true,
        shopAllHref: 'products.html?q=giyim',
      },
    ],
    categories: [
      {
        id: 'bridesmaid-dresses',
        name: 'Gelinlik & Abiye',
        href: 'products.html?q=bridesmaid+dresses',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'carnival-costume',
        name: 'Kostümler',
        href: 'products.html?q=carnival+costume',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800c?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'rhinestones',
        name: 'Taş & Boncuk',
        href: 'products.html?q=rhinestones',
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'camouflage',
        name: 'Kamuflaj Giyim',
        href: 'products.html?q=camouflage',
        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'polyester-ties',
        name: 'Kravatlar',
        href: 'products.html?q=polyester+ties',
        image: 'https://images.unsplash.com/photo-1589756823695-278bc923f962?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'mittens',
        name: 'Eldivenler',
        href: 'products.html?q=mittens',
        image: 'https://images.unsplash.com/photo-1545170163-9be1c11735c5?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'tshirts',
        name: 'T-Shirt & Üstler',
        href: 'products.html?q=t-shirts',
        image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
    ],
  },
  {
    title: 'Tüketici Elektroniği',
    filters: [
      {
        title: 'Mağazaya Göre',
        items: [
          { name: 'Samsung', href: 'products.html?q=samsung+electronics' },
          { name: 'Apple', href: 'products.html?q=apple+electronics' },
          { name: 'Sony', href: 'products.html?q=sony+electronics' },
          { name: 'Xiaomi', href: 'products.html?q=xiaomi+electronics' },
          { name: 'JBL', href: 'products.html?q=jbl+electronics' },
        ],
        showShopAll: true,
        shopAllHref: 'products.html?q=elektronik',
      },
      {
        title: 'Ürün Türüne Göre',
        items: [
          { name: 'Akıllı Saatler', href: 'products.html?q=smart+watches' },
          { name: 'Kulaklıklar', href: 'products.html?q=wireless+earbuds' },
          { name: 'Hoparlörler', href: 'products.html?q=bluetooth+speakers' },
          { name: 'Kameralar', href: 'products.html?q=action+cameras' },
          { name: 'Monitörler', href: 'products.html?q=led+monitors' },
          { name: 'Dronelar', href: 'products.html?q=drone' },
        ],
        showShopAll: true,
        shopAllHref: 'products.html?q=elektronik',
      },
      {
        title: 'Fiyata Göre',
        items: [
          { name: '$50 altı', href: 'products.html?q=elektronik&price=0-50' },
          { name: '$50 - $100', href: 'products.html?q=elektronik&price=50-100' },
          { name: '$100 - $500', href: 'products.html?q=elektronik&price=100-500' },
          { name: '$500 - $1,000', href: 'products.html?q=elektronik&price=500-1000' },
          { name: '$1,000 ve üzeri', href: 'products.html?q=elektronik&price=1000' },
        ],
        showShopAll: true,
        shopAllHref: 'products.html?q=elektronik',
      },
    ],
    categories: [
      {
        id: 'smart-watches',
        name: 'Akıllı Saatler',
        href: 'products.html?q=smart+watches',
        image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'wireless-earbuds',
        name: 'Kablosuz Kulaklık',
        href: 'products.html?q=wireless+earbuds',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'bluetooth-speakers',
        name: 'Bluetooth Hoparlör',
        href: 'products.html?q=bluetooth+speakers',
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'action-cameras',
        name: 'Aksiyon Kamera',
        href: 'products.html?q=action+cameras',
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'led-monitors',
        name: 'LED Monitörler',
        href: 'products.html?q=led+monitors',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'drones',
        name: 'Drone',
        href: 'products.html?q=drone',
        image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'vr-headset',
        name: 'VR Gözlük',
        href: 'products.html?q=vr+headset',
        image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
    ],
  },
  {
    title: 'Spor & Eğlence',
    filters: [
      {
        title: 'Spor Dalına Göre',
        items: [
          { name: 'Fitness & Gym', href: 'products.html?q=fitness+equipment' },
          { name: 'Yoga & Pilates', href: 'products.html?q=yoga+mats' },
          { name: 'Dövüş Sporları', href: 'products.html?q=boxing+gloves' },
          { name: 'Kamp & Outdoor', href: 'products.html?q=camping+tents' },
          { name: 'Balıkçılık', href: 'products.html?q=fishing+rods' },
          { name: 'Su Sporları', href: 'products.html?q=water+sports' },
        ],
        showShopAll: true,
        shopAllHref: 'products.html?q=spor',
      },
      {
        title: 'Fiyata Göre',
        items: [
          { name: '$25 altı', href: 'products.html?q=spor&price=0-25' },
          { name: '$25 - $50', href: 'products.html?q=spor&price=25-50' },
          { name: '$50 - $100', href: 'products.html?q=spor&price=50-100' },
          { name: '$100 - $300', href: 'products.html?q=spor&price=100-300' },
          { name: '$300 ve üzeri', href: 'products.html?q=spor&price=300' },
        ],
        showShopAll: true,
        shopAllHref: 'products.html?q=spor',
      },
    ],
    categories: [
      {
        id: 'fitness-equipment',
        name: 'Fitness Ekipmanları',
        href: 'products.html?q=fitness+equipment',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'yoga-mats',
        name: 'Yoga Matları',
        href: 'products.html?q=yoga+mats',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'boxing-gloves',
        name: 'Boks Eldivenleri',
        href: 'products.html?q=boxing+gloves',
        image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'camping-tents',
        name: 'Kamp Çadırları',
        href: 'products.html?q=camping+tents',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'fishing-rods',
        name: 'Olta Takımları',
        href: 'products.html?q=fishing+rods',
        image: 'https://images.unsplash.com/photo-1532015421997-39e6e9c78901?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'skateboard',
        name: 'Kaykay',
        href: 'products.html?q=skateboard',
        image: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'golf-clubs',
        name: 'Golf Ekipmanları',
        href: 'products.html?q=golf+clubs',
        image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
    ],
  },
  {
    title: 'Güzellik & Kişisel Bakım',
    filters: [
      {
        title: 'Bakım Türüne Göre',
        items: [
          { name: 'Cilt Bakımı', href: 'products.html?q=skincare+set' },
          { name: 'Saç Bakımı', href: 'products.html?q=hair+extensions' },
          { name: 'Makyaj', href: 'products.html?q=makeup+brushes' },
          { name: 'Parfüm & Deodorant', href: 'products.html?q=perfume' },
          { name: 'Tırnak Bakımı', href: 'products.html?q=nail+art' },
          { name: 'Yüz Maskeleri', href: 'products.html?q=face+masks' },
        ],
        showShopAll: true,
        shopAllHref: 'products.html?q=güzellik',
      },
      {
        title: 'Fiyata Göre',
        items: [
          { name: '$10 altı', href: 'products.html?q=güzellik&price=0-10' },
          { name: '$10 - $25', href: 'products.html?q=güzellik&price=10-25' },
          { name: '$25 - $50', href: 'products.html?q=güzellik&price=25-50' },
          { name: '$50 - $100', href: 'products.html?q=güzellik&price=50-100' },
          { name: '$100 ve üzeri', href: 'products.html?q=güzellik&price=100' },
        ],
        showShopAll: true,
        shopAllHref: 'products.html?q=güzellik',
      },
    ],
    categories: [
      {
        id: 'skincare-set',
        name: 'Cilt Bakım Seti',
        href: 'products.html?q=skincare+set',
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'hair-extensions',
        name: 'Saç Eklentileri',
        href: 'products.html?q=hair+extensions',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'makeup-brushes',
        name: 'Makyaj Fırçaları',
        href: 'products.html?q=makeup+brushes',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'perfume',
        name: 'Parfüm',
        href: 'products.html?q=perfume',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'nail-art',
        name: 'Tırnak Bakımı',
        href: 'products.html?q=nail+art',
        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'face-masks',
        name: 'Yüz Maskeleri',
        href: 'products.html?q=face+masks',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'hair-dryers',
        name: 'Saç Kurutma',
        href: 'products.html?q=hair+dryers',
        image: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
    ],
  },
  {
    title: 'Takı, Gözlük & Saatler',
    filters: [
      {
        title: 'Takı Türüne Göre',
        items: [
          { name: 'Yüzükler', href: 'products.html?q=fashion+rings' },
          { name: 'Kolyeler', href: 'products.html?q=necklaces' },
          { name: 'Küpeler', href: 'products.html?q=earrings' },
          { name: 'Bileklikler', href: 'products.html?q=bracelets' },
          { name: 'Kol Saatleri', href: 'products.html?q=wrist+watches' },
          { name: 'Güneş Gözlükleri', href: 'products.html?q=sunglasses' },
        ],
        showShopAll: true,
        shopAllHref: 'products.html?q=takı',
      },
      {
        title: 'Malzemeye Göre',
        items: [
          { name: 'Altın Kaplama', href: 'products.html?q=gold+plated+jewelry' },
          { name: 'Gümüş', href: 'products.html?q=silver+jewelry' },
          { name: 'Paslanmaz Çelik', href: 'products.html?q=stainless+steel+jewelry' },
          { name: 'Kristal & Taş', href: 'products.html?q=crystal+jewelry' },
        ],
        showShopAll: true,
        shopAllHref: 'products.html?q=takı',
      },
      {
        title: 'Fiyata Göre',
        items: [
          { name: '$10 altı', href: 'products.html?q=takı&price=0-10' },
          { name: '$10 - $25', href: 'products.html?q=takı&price=10-25' },
          { name: '$25 - $50', href: 'products.html?q=takı&price=25-50' },
          { name: '$50 - $100', href: 'products.html?q=takı&price=50-100' },
          { name: '$100 ve üzeri', href: 'products.html?q=takı&price=100' },
        ],
        showShopAll: true,
        shopAllHref: 'products.html?q=takı',
      },
    ],
    categories: [
      {
        id: 'fashion-rings',
        name: 'Yüzükler',
        href: 'products.html?q=fashion+rings',
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'necklaces',
        name: 'Kolyeler',
        href: 'products.html?q=necklaces',
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'wrist-watches',
        name: 'Kol Saatleri',
        href: 'products.html?q=wrist+watches',
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'earrings',
        name: 'Küpeler',
        href: 'products.html?q=earrings',
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'bracelets',
        name: 'Bileklikler',
        href: 'products.html?q=bracelets',
        image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'reading-glasses',
        name: 'Gözlükler',
        href: 'products.html?q=reading+glasses',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'pendants',
        name: 'Kolye Uçları',
        href: 'products.html?q=pendants',
        image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
    ],
  },
  {
    title: 'Ev & Yaşam',
    filters: [
      {
        title: 'Odaya Göre',
        items: [
          { name: 'Yatak Odası', href: 'products.html?q=bedroom+furniture' },
          { name: 'Mutfak', href: 'products.html?q=kitchen+appliances' },
          { name: 'Salon', href: 'products.html?q=living+room+decor' },
          { name: 'Banyo', href: 'products.html?q=bathroom+accessories' },
          { name: 'Bahçe', href: 'products.html?q=garden+furniture' },
        ],
        showShopAll: true,
        shopAllHref: 'products.html?q=ev+yaşam',
      },
      {
        title: 'Fiyata Göre',
        items: [
          { name: '$25 altı', href: 'products.html?q=ev+yaşam&price=0-25' },
          { name: '$25 - $50', href: 'products.html?q=ev+yaşam&price=25-50' },
          { name: '$50 - $100', href: 'products.html?q=ev+yaşam&price=50-100' },
          { name: '$100 - $250', href: 'products.html?q=ev+yaşam&price=100-250' },
          { name: '$250 ve üzeri', href: 'products.html?q=ev+yaşam&price=250' },
        ],
        showShopAll: true,
        shopAllHref: 'products.html?q=ev+yaşam',
      },
    ],
    categories: [
      {
        id: 'garden-furniture',
        name: 'Bahçe Mobilyası',
        href: 'products.html?q=garden+furniture',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'kitchen-appliances',
        name: 'Mutfak Aletleri',
        href: 'products.html?q=kitchen+appliances',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'bed-sheets',
        name: 'Nevresim Takımı',
        href: 'products.html?q=bed+sheets',
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'led-lights',
        name: 'LED Aydınlatma',
        href: 'products.html?q=led+lights',
        image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'curtains',
        name: 'Perdeler',
        href: 'products.html?q=curtains',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'storage-boxes',
        name: 'Saklama Kutuları',
        href: 'products.html?q=storage+boxes',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'wall-decor',
        name: 'Duvar Dekorasyonu',
        href: 'products.html?q=wall+decor',
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
    ],
  },
  {
    title: 'Bavul, Çanta & Kılıflar',
    filters: [
      {
        title: 'Çanta Türüne Göre',
        items: [
          { name: 'Sırt Çantaları', href: 'products.html?q=backpacks' },
          { name: 'Valiz & Bavul', href: 'products.html?q=travel+suitcase' },
          { name: 'Laptop Çantaları', href: 'products.html?q=laptop+bags' },
          { name: 'El Çantaları', href: 'products.html?q=handbags' },
          { name: 'Cüzdanlar', href: 'products.html?q=wallets' },
          { name: 'Telefon Kılıfları', href: 'products.html?q=phone+cases' },
        ],
        showShopAll: true,
        shopAllHref: 'products.html?q=çanta',
      },
      {
        title: 'Fiyata Göre',
        items: [
          { name: '$15 altı', href: 'products.html?q=çanta&price=0-15' },
          { name: '$15 - $30', href: 'products.html?q=çanta&price=15-30' },
          { name: '$30 - $60', href: 'products.html?q=çanta&price=30-60' },
          { name: '$60 - $120', href: 'products.html?q=çanta&price=60-120' },
          { name: '$120 ve üzeri', href: 'products.html?q=çanta&price=120' },
        ],
        showShopAll: true,
        shopAllHref: 'products.html?q=çanta',
      },
    ],
    categories: [
      {
        id: 'travel-suitcase',
        name: 'Seyahat Çantası',
        href: 'products.html?q=travel+suitcase',
        image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'backpacks',
        name: 'Sırt Çantaları',
        href: 'products.html?q=backpacks',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'laptop-bags',
        name: 'Laptop Çantaları',
        href: 'products.html?q=laptop+bags',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'cosmetic-bags',
        name: 'Makyaj Çantası',
        href: 'products.html?q=cosmetic+bags',
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'messenger-bags',
        name: 'Postacı Çantası',
        href: 'products.html?q=messenger+bags',
        image: 'https://images.unsplash.com/photo-1622560480654-d96214fddae9?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'phone-cases',
        name: 'Telefon Kılıfları',
        href: 'products.html?q=phone+cases',
        image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'wallets',
        name: 'Cüzdanlar',
        href: 'products.html?q=wallets',
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
    ],
  },
  {
    title: 'Ambalaj & Baskı',
    filters: [
      {
        title: 'Ambalaj Türüne Göre',
        items: [
          { name: 'Hediye Kutuları', href: 'products.html?q=gift+boxes' },
          { name: 'Kağıt Çantalar', href: 'products.html?q=paper+bags' },
          { name: 'Etiketler', href: 'products.html?q=labels' },
          { name: 'Yapıştırmalar', href: 'products.html?q=stickers' },
          { name: 'Koruyucu Ambalaj', href: 'products.html?q=bubble+wrap' },
        ],
        showShopAll: true,
        shopAllHref: 'products.html?q=ambalaj',
      },
      {
        title: 'Fiyata Göre',
        items: [
          { name: '$10 altı', href: 'products.html?q=ambalaj&price=0-10' },
          { name: '$10 - $25', href: 'products.html?q=ambalaj&price=10-25' },
          { name: '$25 - $50', href: 'products.html?q=ambalaj&price=25-50' },
          { name: '$50 ve üzeri', href: 'products.html?q=ambalaj&price=50' },
        ],
        showShopAll: true,
        shopAllHref: 'products.html?q=ambalaj',
      },
    ],
    categories: [
      {
        id: 'gift-boxes',
        name: 'Hediye Kutuları',
        href: 'products.html?q=gift+boxes',
        image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'paper-bags',
        name: 'Kağıt Çantalar',
        href: 'products.html?q=paper+bags',
        image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'labels',
        name: 'Etiketler',
        href: 'products.html?q=labels',
        image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'stickers',
        name: 'Yapıştırmalar',
        href: 'products.html?q=stickers',
        image: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'bubble-wrap',
        name: 'Balonlu Naylon',
        href: 'products.html?q=bubble+wrap',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'packaging-tape',
        name: 'Ambalaj Bandı',
        href: 'products.html?q=packaging+tape',
        image: 'https://images.unsplash.com/photo-1576867757603-05b134ebc379?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
    ],
  },
  {
    title: 'Çocuk, Oyuncak & Bebek',
    filters: [
      {
        title: 'Yaş Grubuna Göre',
        items: [
          { name: '0-2 Yaş (Bebek)', href: 'products.html?q=baby+toys' },
          { name: '3-5 Yaş', href: 'products.html?q=toddler+toys' },
          { name: '6-8 Yaş', href: 'products.html?q=kids+toys' },
          { name: '9-12 Yaş', href: 'products.html?q=children+toys' },
          { name: '12+ Yaş', href: 'products.html?q=teen+toys' },
        ],
        showShopAll: true,
        shopAllHref: 'products.html?q=oyuncak',
      },
      {
        title: 'Oyuncak Türüne Göre',
        items: [
          { name: 'Yapı Blokları', href: 'products.html?q=building+blocks' },
          { name: 'Peluş Oyuncaklar', href: 'products.html?q=plush+toys' },
          { name: 'Uzaktan Kumanda', href: 'products.html?q=rc+cars' },
          { name: 'Yapboz & Puzzle', href: 'products.html?q=puzzles' },
          { name: 'Bebek Giyim', href: 'products.html?q=baby+clothes' },
        ],
        showShopAll: true,
        shopAllHref: 'products.html?q=oyuncak',
      },
      {
        title: 'Fiyata Göre',
        items: [
          { name: '$10 altı', href: 'products.html?q=oyuncak&price=0-10' },
          { name: '$10 - $25', href: 'products.html?q=oyuncak&price=10-25' },
          { name: '$25 - $50', href: 'products.html?q=oyuncak&price=25-50' },
          { name: '$50 - $100', href: 'products.html?q=oyuncak&price=50-100' },
          { name: '$100 ve üzeri', href: 'products.html?q=oyuncak&price=100' },
        ],
        showShopAll: true,
        shopAllHref: 'products.html?q=oyuncak',
      },
    ],
    categories: [
      {
        id: 'building-blocks',
        name: 'Yapı Blokları',
        href: 'products.html?q=building+blocks',
        image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'plush-toys',
        name: 'Peluş Oyuncaklar',
        href: 'products.html?q=plush+toys',
        image: 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'strollers',
        name: 'Bebek Arabası',
        href: 'products.html?q=strollers',
        image: 'https://images.unsplash.com/photo-1591924560470-a27e9f07bba6?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'baby-clothes',
        name: 'Bebek Giyim',
        href: 'products.html?q=baby+clothes',
        image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'rc-cars',
        name: 'Uzaktan Kumanda',
        href: 'products.html?q=rc+cars',
        image: 'https://images.unsplash.com/photo-1581235707960-2c76d29716e7?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
      {
        id: 'puzzles',
        name: 'Yapboz & Puzzle',
        href: 'products.html?q=puzzles',
        image: 'https://images.unsplash.com/photo-1606503153255-59d7ae25103f?w=300&h=300&fit=crop&q=80',
        subcategories: [],
      },
    ],
  },
];
