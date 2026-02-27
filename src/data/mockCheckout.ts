/**
 * Mock Checkout Data
 * Static data for the checkout page — Alibaba B2B style.
 */

import type {
  Country,
  Province,
  OrderSummary,
  ModalSection,
  PaymentIcon,
  SavedAddress,
  PageContent,
} from '../types/checkout';

const PLACEHOLDER_IMG = 'https://placehold.co/80x80/f5f5f5/999?text=SKU';

// 1. Countries (30 with flag, name, code, phone prefix)
export const countries: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', phonePrefix: '+1' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', phonePrefix: '+61' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', phonePrefix: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', phonePrefix: '+44' },
  { code: 'IN', name: 'India', flag: '🇮🇳', phonePrefix: '+91' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', phonePrefix: '+52' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', phonePrefix: '+49' },
  { code: 'FR', name: 'France', flag: '🇫🇷', phonePrefix: '+33' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', phonePrefix: '+39' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', phonePrefix: '+34' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', phonePrefix: '+55' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', phonePrefix: '+81' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', phonePrefix: '+82' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', phonePrefix: '+31' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', phonePrefix: '+7' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', phonePrefix: '+966' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪', phonePrefix: '+971' },
  { code: 'TR', name: 'Turkey/Turkiye', flag: '🇹🇷', phonePrefix: '+90' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', phonePrefix: '+48' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', phonePrefix: '+46' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', phonePrefix: '+41' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', phonePrefix: '+47' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', phonePrefix: '+45' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', phonePrefix: '+32' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', phonePrefix: '+43' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', phonePrefix: '+62' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', phonePrefix: '+66' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', phonePrefix: '+84' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', phonePrefix: '+63' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', phonePrefix: '+60' },
];

// 2. Turkish Provinces (all 81, alphabetical)
export const turkishProvinces: Province[] = [
  { code: '01', name: 'Adana' },
  { code: '02', name: 'Adiyaman' },
  { code: '03', name: 'Afyonkarahisar' },
  { code: '04', name: 'Agri' },
  { code: '05', name: 'Amasya' },
  { code: '06', name: 'Ankara' },
  { code: '07', name: 'Antalya' },
  { code: '08', name: 'Artvin' },
  { code: '09', name: 'Aydin' },
  { code: '10', name: 'Balikesir' },
  { code: '11', name: 'Bilecik' },
  { code: '12', name: 'Bingol' },
  { code: '13', name: 'Bitlis' },
  { code: '14', name: 'Bolu' },
  { code: '15', name: 'Burdur' },
  { code: '16', name: 'Bursa' },
  { code: '17', name: 'Canakkale' },
  { code: '18', name: 'Cankiri' },
  { code: '19', name: 'Corum' },
  { code: '20', name: 'Denizli' },
  { code: '21', name: 'Diyarbakir' },
  { code: '22', name: 'Edirne' },
  { code: '23', name: 'Elazig' },
  { code: '24', name: 'Erzincan' },
  { code: '25', name: 'Erzurum' },
  { code: '26', name: 'Eskisehir' },
  { code: '27', name: 'Gaziantep' },
  { code: '28', name: 'Giresun' },
  { code: '29', name: 'Gumushane' },
  { code: '30', name: 'Hakkari' },
  { code: '31', name: 'Hatay' },
  { code: '32', name: 'Isparta' },
  { code: '33', name: 'Mersin' },
  { code: '34', name: 'Istanbul' },
  { code: '35', name: 'Izmir' },
  { code: '36', name: 'Kars' },
  { code: '37', name: 'Kastamonu' },
  { code: '38', name: 'Kayseri' },
  { code: '39', name: 'Kirklareli' },
  { code: '40', name: 'Kirsehir' },
  { code: '41', name: 'Kocaeli' },
  { code: '42', name: 'Konya' },
  { code: '43', name: 'Kutahya' },
  { code: '44', name: 'Malatya' },
  { code: '45', name: 'Manisa' },
  { code: '46', name: 'Kahramanmaras' },
  { code: '47', name: 'Mardin' },
  { code: '48', name: 'Mugla' },
  { code: '49', name: 'Mus' },
  { code: '50', name: 'Nevsehir' },
  { code: '51', name: 'Nigde' },
  { code: '52', name: 'Ordu' },
  { code: '53', name: 'Rize' },
  { code: '54', name: 'Sakarya' },
  { code: '55', name: 'Samsun' },
  { code: '56', name: 'Siirt' },
  { code: '57', name: 'Sinop' },
  { code: '58', name: 'Sivas' },
  { code: '59', name: 'Tekirdag' },
  { code: '60', name: 'Tokat' },
  { code: '61', name: 'Trabzon' },
  { code: '62', name: 'Tunceli' },
  { code: '63', name: 'Sanliurfa' },
  { code: '64', name: 'Usak' },
  { code: '65', name: 'Van' },
  { code: '66', name: 'Yozgat' },
  { code: '67', name: 'Zonguldak' },
  { code: '68', name: 'Aksaray' },
  { code: '69', name: 'Bayburt' },
  { code: '70', name: 'Karaman' },
  { code: '71', name: 'Kirikkale' },
  { code: '72', name: 'Batman' },
  { code: '73', name: 'Sirnak' },
  { code: '74', name: 'Bartin' },
  { code: '75', name: 'Ardahan' },
  { code: '76', name: 'Igdir' },
  { code: '77', name: 'Yalova' },
  { code: '78', name: 'Karabuk' },
  { code: '79', name: 'Kilis' },
  { code: '80', name: 'Osmaniye' },
  { code: '81', name: 'Duzce' },
];

// 3. Districts per province (5 detailed provinces, rest fallback to Merkez)
export const districtsByProvince: Record<string, string[]> = {
  Adana: [
    'Aladag', 'Ceyhan', 'Cukurova', 'Feke', 'Imamoglu',
    'Karaisali', 'Karatas', 'Kozan', 'Pozanti', 'Saimbeyli',
    'Saricam', 'Seyhan', 'Tufanbeyli', 'Yumurtalik', 'Yuregir',
  ],
  Adiyaman: [
    'Besni', 'Celikhan', 'Gerger', 'Golbasi', 'Kahta',
    'Merkez', 'Samsat', 'Sincik', 'Tut',
  ],
  Ankara: [
    'Akyurt', 'Altindag', 'Ayas', 'Bala', 'Beypazari',
    'Cankaya', 'Cubuk', 'Elmadag', 'Etimesgut', 'Evren',
    'Golbasi', 'Gudul', 'Haymana', 'Kahramankazan', 'Kalecik',
    'Kecioren', 'Kizilcahamam', 'Mamak', 'Nallihan', 'Polatli',
    'Pursaklar', 'Sincan', 'Yenimahalle',
  ],
  Istanbul: [
    'Adalar', 'Arnavutkoy', 'Atasehir', 'Avcilar', 'Bagcilar',
    'Bahcelievler', 'Bakirkoy', 'Basaksehir', 'Bayrampasa', 'Besiktas',
    'Beykoz', 'Beylikduzu', 'Beyoglu', 'Buyukcekmece', 'Catalca',
    'Cekmekoy', 'Esenler', 'Esenyurt', 'Eyupsultan', 'Fatih',
    'Gaziosmanpasa', 'Gungoren', 'Kadikoy', 'Kagithane', 'Kartal',
    'Kucukcekmece', 'Maltepe', 'Pendik', 'Sancaktepe', 'Sariyer',
    'Silivri', 'Sultanbeyli', 'Sultangazi', 'Sile', 'Sisli',
    'Tuzla', 'Umraniye', 'Uskudar', 'Zeytinburnu',
  ],
  Izmir: [
    'Aliaga', 'Balcova', 'Bayindir', 'Bayrakli', 'Bergama',
    'Beydag', 'Bornova', 'Buca', 'Cesme', 'Cigli',
    'Dikili', 'Foca', 'Gaziemir', 'Guzelbahce', 'Karabaglar',
    'Karsiaka', 'Kemalpasa', 'Kinik', 'Kiraz', 'Konak',
    'Menderes', 'Menemen', 'Narlidere', 'Odemis', 'Seferihisar',
    'Selcuk', 'Tire', 'Torbali', 'Urla',
  ],
};

// 4. Order Summary
export const orderSummary: OrderSummary = {
  itemCount: 200,
  thumbnails: [
    { image: PLACEHOLDER_IMG, quantity: 100 },
    { image: PLACEHOLDER_IMG, quantity: 50 },
    { image: PLACEHOLDER_IMG, quantity: 30 },
    { image: PLACEHOLDER_IMG, quantity: 20 },
  ],
  itemSubtotal: 60.00,
  shipping: 402.00,
  subtotal: 462.00,
  processingFee: 13.82,
  total: 475.82,
  currency: 'USD',
};

// 5. Modal Sections (6 sections)
export const modalSections: ModalSection[] = [
  {
    id: 'info-box',
    iconType: 'info',
    title: 'How to keep your order protected',
    description: '',
    learnMoreText: undefined,
    learnMoreUrl: undefined,
  },
  {
    id: 'secure-payments',
    iconType: 'check',
    title: 'Secure payments',
    description:
      'Choose your preferred local payment methods, currencies, bank transfers, or deferred payment plans to pay. Every transaction you make through Alibaba.com is protected by SSL encryption and PCI DSS data security protocols.',
    learnMoreText: 'Learn about secure payments',
    learnMoreUrl: '#',
  },
  {
    id: 'guaranteed-delivery',
    iconType: 'truck',
    title: 'Guaranteed delivery',
    description:
      'Better planning and managing inventory knowing that your order will be dispatched or delivered by the guaranteed date. In the rare case there is a delay, receive a 10% compensation on the total order amount.',
    learnMoreText: 'Learn about guaranteed shipping',
    learnMoreUrl: '#',
  },
  {
    id: 'money-back',
    iconType: 'shield',
    title: 'Money-back protection',
    description:
      'Claim a refund if your order doesn\'t ship, is missing, or the products arrive defective, incorrect, or damaged.',
    learnMoreText: 'Learn about refunds and returns',
    learnMoreUrl: '#',
  },
  {
    id: 'support-24-7',
    iconType: 'clock',
    title: '24/7 support',
    description:
      'Access our virtual help center 24/7, or connect with live agents for order issues, reports, or inquiries.',
    learnMoreText: 'Learn about 24/7 support',
    learnMoreUrl: '#',
  },
  {
    id: 'data-privacy',
    iconType: 'lock',
    title: 'Data privacy',
    description:
      'We never share your data with third parties without your consent. All personal information is handled in accordance with the Alibaba.com Privacy Policy.',
    learnMoreText: 'Learn how we protect your data',
    learnMoreUrl: '#',
  },
];

// Info box bullet points (separate from modal sections for flexibility)
export const infoBoxBullets = [
  {
    dotColor: '#3b82f6',
    title: 'When placing an order yourself:',
    description: 'Place and pay for your order directly through Alibaba.com to enjoy full protection.',
  },
  {
    dotColor: '#22c55e',
    title: 'When supplier drafts an order for you:',
    description: 'Review the order details carefully before confirming and paying through Alibaba.com.',
  },
];

// 6. Payment Icons (11)
export const paymentIcons: PaymentIcon[] = [
  { name: 'Visa', altText: 'Visa', bgColor: '#1a1f71', textColor: '#ffffff' },
  { name: 'Mastercard', altText: 'Mastercard', bgColor: '#eb001b', textColor: '#ffffff' },
  { name: 'Amex', altText: 'American Express', bgColor: '#006fcf', textColor: '#ffffff' },
  { name: 'PayPal', altText: 'PayPal', bgColor: '#003087', textColor: '#ffffff' },
  { name: 'Apple Pay', altText: 'Apple Pay', bgColor: '#000000', textColor: '#ffffff' },
  { name: 'Google Pay', altText: 'Google Pay', bgColor: '#ffffff', textColor: '#4285f4' },
  { name: 'Discover', altText: 'Discover', bgColor: '#ff6000', textColor: '#ffffff' },
  { name: 'Diners', altText: 'Diners Club', bgColor: '#0079be', textColor: '#ffffff' },
  { name: 'JCB', altText: 'JCB', bgColor: '#0e4c96', textColor: '#ffffff' },
  { name: 'UnionPay', altText: 'UnionPay', bgColor: '#e21836', textColor: '#ffffff' },
  { name: 'T/T', altText: 'T/T (Wire Transfer)', bgColor: '#6b7280', textColor: '#ffffff' },
];

// 7. Saved Address (1 entry for autocomplete popup)
export const savedAddress: SavedAddress = {
  label: 'Ev Adresi',
  fullAddress: 'Gulbahar Mah. Cemal Sururi Sk. No:12, Sisli, Istanbul 34394, Turkey',
  country: 'TR',
  countryName: 'Turkey/Turkiye',
  firstName: 'Ali',
  lastName: 'BAL',
  phone: '5551234567',
  phonePrefix: '+90',
  street: 'Gulbahar Mah. Cemal Sururi Sk. No:12',
  apartment: 'Kat: 3, Daire: 7',
  state: 'Istanbul',
  city: 'Sisli',
  postalCode: '34394',
};

// 8. Geolocation mock address
export const geolocationMockAddress = {
  street: 'Gulbahar Mah. Cemal Sururi Sk. No:12',
  state: 'Istanbul',
  city: 'Sisli',
  postalCode: '34394',
  country: 'TR',
};

// 9. Protection summary items (sidebar)
export const protectionSummaryItems = [
  {
    icon: '✅',
    title: 'Secure payments',
    description:
      'Every payment you make on Alibaba.com is secured with strict SSL encryption and PCI DSS data protection protocols.',
  },
  {
    icon: '🚚',
    title: 'On-time Dispatch Guarantee',
    description:
      'Dispatched within 7 days of payment or receive a 10% delay compensation.',
  },
  {
    icon: '💰',
    title: 'Money-back protection',
    description:
      'Claim a refund if your order doesn\'t ship, is missing, or arrives with product issues.',
  },
];

// 10. Page text content
export const pageContent: PageContent = {
  pageTitle: 'Checkout',
  shippingAddressTitle: 'Shipping address',
  paymentMethodTitle: 'Payment method',
  itemsDeliveryTitle: 'Items and delivery options',
  orderSummaryTitle: 'Order summary',
  orderProtectionTitle: 'Alibaba.com order protection',
  submitButtonText: 'Continue to payment',
  useCurrentLocationText: 'Use my current location',
  savedAddressLabel: 'Kayitli adres kullan',
  requiredFieldError: 'Required',
  countryLabel: 'Country/Region',
  firstNameLabel: 'First name and Last name',
  lastNameLabel: 'Last name',
  phoneLabel: 'Phone number',
  streetAddressLabel: 'Street address or P.O. box',
  apartmentLabel: 'Apartment, suite, unit, building, floor (optional)',
  stateLabel: 'State/Province',
  cityLabel: 'City',
  postalCodeLabel: 'Postal code',
  defaultAddressCheckbox: 'Set as default shipping address',
  orderProtectionLinkText: 'Alibaba.com order protection',
  trustIconsLabel: 'Trade Assurance',
};

// 11. Trade Assurance footer text
export const tradeAssuranceText =
  'Only orders placed and paid through Alibaba.com can enjoy free protection by 🛡 Trade Assurance';
