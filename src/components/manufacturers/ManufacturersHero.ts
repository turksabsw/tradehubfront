interface SubcategoryGroup {
  title: string;
  items: string[];
}

interface SourceCategory {
  id: string;
  label: string;
  icon: string; // SVG string
  subcategoryGroups: SubcategoryGroup[];
}

const SOURCE_CATEGORIES: SourceCategory[] = [
  {
    id: 'valiz-canta',
    label: 'Valiz & Çanta & Kılıf',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`,
    subcategoryGroups: [
      {
        title: 'Kadın Çantaları',
        items: [
          'El Çantaları',
          'Kadın Büzgülü Çantalar',
          'Kadın Çapraz Göğüs Çantalar',
          'Kadın Kanvas Çantalar',
          'Kadın Eyer Omuz Çantalar',
          'Kadın Portföy Çantaları',
        ],
      },
      {
        title: 'Erkek Çantaları',
        items: [
          'Erkek Postacı Çantaları',
          'Erkek El Çantaları',
          'Evrak Çantaları',
          'Erkek Göğüs Çantaları',
          'Erkek Sırt Çantaları',
          'Erkek Omuz Çantaları',
        ],
      },
      {
        title: 'Cüzdanlar ve Kartlıklar',
        items: [
          'Ruj Çantaları',
          'Sertifika Çantaları',
          'Bozuk Para Cüzdanları',
          'Cüzdanlar',
          'Para Klipsleri',
          'Anahtarlık Cüzdanları',
        ],
      },
      {
        title: 'Özel Amaçlı Çantalar ve Kılıflar',
        items: [
          'Evcil Hayvan Çantaları',
          'Yanmaz çanta',
          'Dijital Ekipman ve Kamera Çantaları',
          'İş Çantaları ve Kılıfları',
          'Giysi Çantaları',
          'Cep Telefonu Kılıfları',
        ],
      },
      {
        title: 'Valiz ve Seyahat Çantaları',
        items: [
          'Seyahat Çantaları',
          'Spor Çantaları',
          'Valiz Arabaları',
          'Valiz',
        ],
      },
      {
        title: 'Bel Çantaları',
        items: [],
      },
    ],
  },
  {
    id: 'spor-giyim',
    label: 'Spor Giyim ve Outdoor Kıyafetleri',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/></svg>`,
    subcategoryGroups: [
      {
        title: 'Spor Giyim',
        items: [
          'Koşu Kıyafetleri',
          'Eşofman Takımları',
          'Spor Taytları',
          'Fitness Tişörtleri',
          'Spor Sütyenleri',
          'Yüzme Kıyafetleri',
        ],
      },
      {
        title: 'Outdoor Giyim',
        items: [
          'Rüzgarlıklar',
          'Kayak Montları',
          'Yağmurluklar',
          'Softshell Ceketler',
          'Termal İç Giyim',
          'Polar Ceketler',
        ],
      },
      {
        title: 'Spor Aksesuarları',
        items: [
          'Spor Çorapları',
          'Kafa Bantları',
          'Bileklikler',
          'Spor Çantaları',
          'Mataralar',
          'Havlular',
        ],
      },
    ],
  },
  {
    id: 'elektronik',
    label: 'Kişisel Elektronik Cihazlar',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>`,
    subcategoryGroups: [
      {
        title: 'Akıllı Saatler ve Bileklikler',
        items: [
          'Akıllı Saatler',
          'Fitness Bileklikleri',
          'Saat Kayışları',
          'Şarj Kabloları',
        ],
      },
      {
        title: 'Kulaklıklar',
        items: [
          'Kablosuz Kulaklıklar',
          'Bluetooth Kulaklıklar',
          'Oyuncu Kulaklıkları',
          'Kulak İçi Kulaklıklar',
        ],
      },
      {
        title: 'Taşınabilir Elektronik',
        items: [
          'Powerbank',
          'Bluetooth Hoparlörler',
          'Aksiyon Kameralar',
          'Taşınabilir Fanlar',
        ],
      },
    ],
  },
  {
    id: 'taki-gozluk',
    label: 'Takı & Gözlük & Saat ve Aksesuarlar',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    subcategoryGroups: [
      {
        title: 'Takı',
        items: [
          'Yüzükler',
          'Kolyeler',
          'Küpeler',
          'Bilezikler',
          'Broşlar',
          'Takı Setleri',
        ],
      },
      {
        title: 'Gözlük',
        items: [
          'Güneş Gözlükleri',
          'Optik Çerçeveler',
          'Spor Gözlükleri',
          'Gözlük Aksesuarları',
        ],
      },
      {
        title: 'Saat',
        items: [
          'Kol Saatleri',
          'Cep Saatleri',
          'Saat Kutuları',
          'Saat Mekanizmaları',
        ],
      },
    ],
  },
  {
    id: 'ayakkabi',
    label: 'Ayakkabı & Aksesuar',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 18H2a1 1 0 01-1-1v-1c0-1.5 1-2.5 2-3l3-1 5-6h2l2 4 3 1c1 .5 2 1.5 2 3v2a1 1 0 01-1 1z"/></svg>`,
    subcategoryGroups: [
      {
        title: 'Kadın Ayakkabıları',
        items: [
          'Topuklu Ayakkabılar',
          'Babet',
          'Kadın Botları',
          'Kadın Spor Ayakkabı',
          'Sandalet',
          'Terlik',
        ],
      },
      {
        title: 'Erkek Ayakkabıları',
        items: [
          'Erkek Klasik Ayakkabı',
          'Erkek Spor Ayakkabı',
          'Erkek Botları',
          'Loafer',
          'Erkek Sandalet',
        ],
      },
      {
        title: 'Ayakkabı Aksesuarları',
        items: [
          'Tabanlıklar',
          'Ayakkabı Bakım Ürünleri',
          'Bağcıklar',
          'Ayakkabı Kalıpları',
        ],
      },
    ],
  },
  {
    id: 'anne-cocuk',
    label: 'Anne & Çocuk & Oyuncaklar',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><path d="M12 8c-3 0-6 1.5-6 4v1h12v-1c0-2.5-3-4-6-4z"/><path d="M5 13H3a1 1 0 00-1 1v5a1 1 0 001 1h18a1 1 0 001-1v-5a1 1 0 00-1-1h-2"/></svg>`,
    subcategoryGroups: [
      {
        title: 'Bebek Ürünleri',
        items: [
          'Bebek Kıyafetleri',
          'Bebek Arabaları',
          'Mama Sandalyeleri',
          'Bebek Bakım Ürünleri',
          'Emzirme Ürünleri',
        ],
      },
      {
        title: 'Çocuk Giyim',
        items: [
          'Çocuk Elbiseleri',
          'Çocuk Ayakkabıları',
          'Çocuk Aksesuarları',
          'Okul Çantaları',
        ],
      },
      {
        title: 'Oyuncaklar',
        items: [
          'Eğitici Oyuncaklar',
          'Peluş Oyuncaklar',
          'Yapbozlar',
          'RC Arabalar',
          'Blok Oyuncaklar',
        ],
      },
    ],
  },
  {
    id: 'tum-kategoriler',
    label: 'Tüm kategoriler',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`,
    subcategoryGroups: [],
  },
];

export function ManufacturersHero(): string {
  return `
    <!-- Top Bar for Manufacturers specific promos (optional, like "Accio AI | Quotation") -->
    <div class="hidden lg:flex items-center justify-between mb-4 px-2">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">Welcome to iSTOC.com</h2>
      <div class="flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
        <a href="#" class="flex items-center gap-1.5 hover:text-primary-600 transition-colors">
          <span class="text-lg font-black">▲</span> Accio AI
        </a>
        <span class="text-gray-300 dark:text-gray-600">|</span>
        <a href="#" class="flex items-center gap-1.5 hover:text-primary-600 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          Request for Quotation
        </a>
        <span class="text-gray-300 dark:text-gray-600">|</span>
        <a href="#" class="flex items-center gap-1.5 hover:text-primary-600 transition-colors">
          <span class="font-bold text-lg">A</span> Online Trade Show
        </a>
        <span class="text-gray-300 dark:text-gray-600">|</span>
        <a href="#" class="flex items-center gap-1.5 hover:text-primary-600 transition-colors">
          <span class="font-bold italic text-lg">P</span> Prime hub supplies
        </a>
      </div>
    </div>

    <!-- Main Grid: 4 columns (Sidebar) + (Samples/LIVE) + (Top Ranking) + (Profile Box) -->
    <div class="hidden xl:flex flex-row h-[400px] gap-4 mb-4">
      
      <!-- Column 1: Source by category (Sidebar) -->
      ${renderSourceByCategory()}

      <!-- Column 2: Get samples & Factory LIVE Q&A -->
      ${renderMiddleColumn()}

      <!-- Column 3: Top-ranking manufacturers -->
      ${renderTopRankingColumn()}

      <!-- Column 4: Profile / Guest Panel -->
      ${renderProfileColumn()}

    </div>
  `;
}

const ALL_CATEGORIES_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`;

function renderSubcategoryFlyout(cat: SourceCategory): string {
  const visibleGroups = cat.subcategoryGroups.filter(g => g.items.length > 0);
  if (visibleGroups.length === 0) return '';

  return `
    <div
      class="pointer-events-none opacity-0 translate-x-2
             absolute left-full top-0 z-50 ml-1
             w-[656px] h-full overflow-y-auto
             pt-5 px-5 pb-2.5
             transition-all duration-150 ease-out"
      style="background-color: var(--mfr-flyout-bg, #f4f4f4); border-radius: var(--mfr-hero-card-radius, 6px); box-shadow: var(--mfr-hero-card-shadow, 0 0 12px rgba(0,0,0,0.05))"
      data-flyout-id="${cat.id}"
      role="region"
      aria-label="${cat.label} alt kategorileri"
    >
      <!-- Flyout subcategory grid — 3 columns -->
      <div class="grid grid-cols-3 gap-x-0 gap-y-1.5">
        ${visibleGroups.map(group => `
          <div class="flex flex-col">
            <p class="text-sm font-bold mb-2.5" style="color: var(--mfr-flyout-heading-color, #111827)">${group.title}</p>
            <ul class="flex flex-col">
              ${group.items.map(item => `
                <li>
                  <a
                    href="#"
                    class="block text-xs hover:text-primary-600 hover:underline leading-5 transition-colors duration-150"
                    style="color: var(--mfr-flyout-link-color, #767676)"
                  >${item}</a>
                </li>
              `).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderSourceByCategory(): string {
  return `
    <!-- Sidebar wrapper: position:relative so flyout can be absolutely positioned to the right -->
    <div class="relative flex-1" data-category-sidebar>
      <div class="p-4 flex flex-col h-full" style="background-color: var(--mfr-sidebar-bg, #ffffff); border-radius: var(--mfr-hero-card-radius, 6px); box-shadow: var(--mfr-hero-card-shadow, 0 0 12px rgba(0,0,0,0.05))">
        <h3 class="text-lg font-bold mb-3" style="color: var(--mfr-sidebar-heading-color, #111827)">
          Kategoriye göre tedarik edin
        </h3>

        <ul class="flex-1 flex flex-col" data-category-list>
          ${SOURCE_CATEGORIES.map(cat => `
            <li data-category-id="${cat.id}">
              <a
                href="#"
                class="flex items-center justify-between py-0 px-4 h-10 mb-2 rounded-md
                       hover:bg-gray-50 dark:hover:bg-gray-700/50
                       transition-colors duration-150"
              >
                <div class="flex items-center gap-3 min-w-0 flex-1">
                  <span
                    class="w-5 h-5 flex-shrink-0 flex items-center justify-center
                           transition-colors duration-150"
                    style="color: var(--mfr-sidebar-icon-color, #6b7280)"
                  >
                    ${cat.icon}
                  </span>
                  <span class="text-sm font-medium truncate" style="color: var(--mfr-sidebar-text-color, #374151)">
                    ${cat.label}
                  </span>
                </div>

                <!-- Right chevron -->
                <svg
                  class="w-4 h-4 flex-shrink-0 ml-2"
                  style="color: var(--mfr-sidebar-chevron-color, #d1d5db)"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>

              <!-- Flyout panel — toggled by JS via data-flyout-id / data-category-id -->
              ${renderSubcategoryFlyout(cat)}
            </li>
          `).join('')}

          <!-- All categories — separated by top border -->
          <li class="mt-1 pt-2 border-t border-gray-100 dark:border-gray-700" data-category-id="tum-kategoriler">
            <a
              href="#"
              data-all-categories
              class="flex items-center justify-between py-0 px-4 h-10 mb-2 rounded-md
                     hover:bg-gray-50 dark:hover:bg-gray-700/50
                     transition-colors duration-150 group"
            >
              <div class="flex items-center gap-3 min-w-0 flex-1">
                <span
                  class="w-5 h-5 flex-shrink-0 flex items-center justify-center
                         transition-colors duration-150"
                  style="color: var(--mfr-sidebar-icon-color, #6b7280)"
                >
                  ${ALL_CATEGORIES_ICON}
                </span>
                <span class="text-sm font-semibold truncate" style="color: var(--mfr-sidebar-heading-color, #111827)">
                  Tüm kategoriler
                </span>
              </div>
              <svg
                class="w-4 h-4 flex-shrink-0 ml-2"
                style="color: var(--mfr-sidebar-chevron-color, #d1d5db)"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>

            <!-- Tüm kategoriler flyout -->
            <div
              class="pointer-events-none opacity-0 translate-x-2
                     absolute left-full top-0 z-50 ml-1
                     w-[656px] h-full overflow-y-auto
                     pt-5 px-5 pb-2.5
                     transition-all duration-150 ease-out"
              style="background-color: var(--mfr-flyout-bg, #f4f4f4); border-radius: var(--mfr-hero-card-radius, 6px); box-shadow: var(--mfr-hero-card-shadow, 0 0 12px rgba(0,0,0,0.05))"
              data-flyout-id="tum-kategoriler"
              role="region"
              aria-label="Tüm kategoriler"
            >
              <div class="flex flex-wrap gap-y-2.5 leading-5">
                ${[
                  ['Araç Parçaları ve Aksesuarları', 'Araç Aksesuarları, Elektronik ve Araçlar', 'Araçlar & Ulaşım'],
                  ['Endüstriyel Makineler', 'İnşaat ve Yapı Makineleri'],
                  ['Kişisel Elektronik Cihazlar', 'Ev Aletleri'],
                  ['Giyim & Aksesuar', 'Takı & Gözlük & Saat ve Aksesuarlar'],
                  ['Lambalar & Aydınlatma', 'İnşaat & Gayrimenkul'],
                  ['Ev & Bahçe', 'Mobilya', 'Evcil Hayvan Ürünleri', 'Hediyelik Eşya & Hobi Malzemeleri'],
                  ['Kozmetik', 'Kişisel Bakım ve Ev Temizliği', 'Sağlık Hizmetleri', 'Tıbbi Cihazlar & Medikal Ürünler'],
                  ['Ambalaj & Baskı', 'Okul ve Ofis Malzemeleri', 'Test Cihaz ve Ekipmanları'],
                  ['El aletleri ve donanım', 'Güvenlik', 'İş Güvenliği', 'İmalat Hizmetleri'],
                  ['Elektrikli Ekipmanlar ve Gereçler', 'Elektronik Parça ve Aksesuarlar & Telekomünikasyon'],
                  ['Spor & Eğlence', 'Anne & Çocuk & Oyuncaklar', 'Spor Giyim ve Outdoor Kıyafetleri'],
                  ['Valiz & Çanta & Kılıf', 'Ayakkabı & Aksesuar'],
                  ['Metal & Alaşımlar', 'Kimyasallar', 'Kauçuk & Plastik Ürünler', 'Kumaş & Tekstil Ham Maddeleri'],
                  ['Tarım', 'Gıda & İçecek'],
                  ['Ticari Ekipman ve Makineler'],
                  ['Yenilenebilir Enerji', 'Çevre'],
                  ['Güç Aktarımı', 'Malzeme Taşıma'],
                ].map(row => `
                  <div class="w-full flex flex-wrap items-center">
                    ${row.map((cat, i) => `<a href="#" class="text-xs hover:text-primary-600 hover:underline transition-colors" style="color: var(--mfr-flyout-link-color, #222222)">${cat}</a>${i < row.length - 1 ? '<span class="text-xs text-[#999] mx-2">/</span>' : ''}`).join('')}
                  </div>
                `).join('')}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `;
}

function renderMiddleColumn(): string {
  return `
    <div class="flex-1 flex flex-col h-[400px]">

      <!-- Kart A: Numune alın -->
      <div class="h-[192px] mb-4 p-4" style="background-color: var(--mfr-hero-card-bg, #ffffff); border-radius: var(--mfr-hero-card-radius, 6px); box-shadow: var(--mfr-hero-card-shadow, 0 0 12px rgba(0,0,0,0.05))">
        <h3 class="text-lg font-bold leading-6 mb-2.5" style="color: var(--mfr-sample-heading-color, #222222)" title="Numune alın">Numune alın</h3>
        <div class="flex flex-wrap justify-between">
          <a href="#" class="block w-[calc(50%-5.5px)] group">
            <div class="w-full h-[105px] overflow-hidden rounded flex items-center justify-center" style="background-color: var(--mfr-sample-img-bg, #f5f5f5)">
              <img src="https://picsum.photos/seed/sample1/160/105" alt="Popüler ürünler" class="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300">
            </div>
            <p class="w-full h-8 min-h-[32px] mt-1 text-sm leading-4 text-center overflow-hidden text-ellipsis" style="color: var(--mfr-sample-label-color, #666666)" title="Popüler ürünler">Popüler ürünler</p>
          </a>
          <a href="#" class="block w-[calc(50%-5.5px)] group">
            <div class="w-full h-[105px] overflow-hidden rounded flex items-center justify-center" style="background-color: var(--mfr-sample-img-bg, #f5f5f5)">
              <img src="https://picsum.photos/seed/sample2/160/105" alt="Yeni çıkanlar" class="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300">
            </div>
            <p class="w-full h-8 min-h-[32px] mt-1 text-sm leading-4 text-center overflow-hidden text-ellipsis" style="color: var(--mfr-sample-label-color, #666666)" title="Yeni çıkanlar">Yeni çıkanlar</p>
          </a>
        </div>
      </div>

      <!-- Kart B: Numune alın (2) -->
      <div class="h-[192px] p-4" style="background-color: var(--mfr-hero-card-bg, #ffffff); border-radius: var(--mfr-hero-card-radius, 6px); box-shadow: var(--mfr-hero-card-shadow, 0 0 12px rgba(0,0,0,0.05))">
        <h3 class="text-lg font-bold leading-6 mb-2.5" style="color: var(--mfr-sample-heading-color, #222222)" title="Numune alın">Numune alın</h3>
        <div class="flex flex-wrap justify-between">
          <a href="#" class="block w-[calc(50%-5.5px)] group">
            <div class="w-full h-[105px] overflow-hidden rounded flex items-center justify-center" style="background-color: var(--mfr-sample-img-bg, #f5f5f5)">
              <img src="https://picsum.photos/seed/sample3/160/105" alt="Çok satanlar" class="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300">
            </div>
            <p class="w-full h-8 min-h-[32px] mt-1 text-sm leading-4 text-center overflow-hidden text-ellipsis" style="color: var(--mfr-sample-label-color, #666666)" title="Çok satanlar">Çok satanlar</p>
          </a>
          <a href="#" class="block w-[calc(50%-5.5px)] group">
            <div class="w-full h-[105px] overflow-hidden rounded flex items-center justify-center" style="background-color: var(--mfr-sample-img-bg, #f5f5f5)">
              <img src="https://picsum.photos/seed/sample4/160/105" alt="Kampanyalar" class="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300">
            </div>
            <p class="w-full h-8 min-h-[32px] mt-1 text-sm leading-4 text-center overflow-hidden text-ellipsis" style="color: var(--mfr-sample-label-color, #666666)" title="Kampanyalar">Kampanyalar</p>
          </a>
        </div>
      </div>

    </div>
  `;
}

function renderTopRankingColumn(): string {
  const items = [
    { img: 'https://picsum.photos/seed/rank1/116/116', label: 'En popüler' },
    { img: 'https://picsum.photos/seed/rank2/116/116', label: 'En çok satanlar' },
    { img: 'https://picsum.photos/seed/rank3/116/116', label: 'Lider fabrikalar' },
    { img: 'https://picsum.photos/seed/rank4/116/116', label: 'Hızlı yanıtlama' },
  ];

  return `
    <div class="top-ranking flex-1 h-[400px] p-4" style="background-color: var(--mfr-hero-card-bg, #ffffff); border-radius: var(--mfr-hero-card-radius, 6px); box-shadow: var(--mfr-hero-card-shadow, 0 0 12px rgba(0,0,0,0.05))">
      <h3 class="text-lg font-bold leading-6 mb-4" style="color: var(--mfr-ranking-heading-color, #222222)" title="En iyi sıralamalı üreticiler">En iyi sıralamalı üreticiler</h3>
      <div class="products flex flex-wrap justify-between">
        ${items.map(item => `
          <a href="#" class="block w-[calc(50%-5.5px)] h-[156px] mb-4 group" title="${item.label}">
            <div class="w-full h-[116px] rounded overflow-hidden flex items-center justify-center">
              <img src="${item.img}" alt="${item.label}" class="max-w-full max-h-full w-[116px] h-[116px] object-contain group-hover:scale-105 transition-transform duration-300">
            </div>
            <p class="w-full h-8 min-h-[32px] mt-1 text-sm leading-4 text-center overflow-hidden text-ellipsis" style="color: var(--mfr-ranking-label-color, #666666)" title="${item.label}">${item.label}</p>
          </a>
        `).join('')}
      </div>
    </div>
  `;
}

function renderProfileColumn(): string {
  const thumbs = [
    'https://picsum.photos/seed/hist1/80/80',
    'https://picsum.photos/seed/hist2/80/80',
    'https://picsum.photos/seed/hist3/80/80',
    'https://picsum.photos/seed/hist4/80/80',
  ];

  return `
    <div class="flex-1 h-[400px] overflow-hidden flex flex-col" style="border-radius: var(--mfr-hero-card-radius, 6px)">

      <!-- Üst kart: user-info -->
      <div class="h-[268px] mb-4 py-3 px-4 flex flex-col" style="background-color: var(--mfr-hero-card-bg, #ffffff); border-radius: var(--mfr-hero-card-radius, 6px); box-shadow: var(--mfr-hero-card-shadow, 0 0 12px rgba(0,0,0,0.05))">
        <!-- Avatar satırı -->
        <div class="flex items-center h-[42px] mb-3">
          <div class="w-10 h-10 rounded-full border mr-3 flex items-center justify-center text-gray-400 flex-shrink-0" style="background-color: var(--mfr-profile-avatar-bg, #dddddd); border-color: var(--mfr-profile-avatar-bg, #dddddd)">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
          </div>
          <div>
            <span class="text-xs" style="color: var(--mfr-profile-text-color, #222222)">Hoş geldiniz!</span>
            <p class="text-base font-bold leading-6" style="color: var(--mfr-profile-text-color, #222222)">Guest</p>
          </div>
        </div>

        <!-- Butonlar -->
        <div class="flex justify-between mt-6 mb-4">
          <a href="/login" class="w-[calc(50%-4px)] flex items-center justify-center rounded-full h-10 text-xs font-bold transition-colors" style="background-color: var(--mfr-profile-btn-bg, #cc9900); color: var(--mfr-profile-btn-text, #ffffff)" onmouseover="this.style.backgroundColor='var(--mfr-profile-btn-hover, #8a6800)'" onmouseout="this.style.backgroundColor='var(--mfr-profile-btn-bg, #cc9900)'" data-spm="button_login">Giriş Yap</a>
          <a href="/register" class="w-[calc(50%-4px)] flex items-center justify-center rounded-full h-10 text-xs font-bold transition-colors" style="background-color: var(--mfr-profile-btn-bg, #cc9900); color: var(--mfr-profile-btn-text, #ffffff)" onmouseover="this.style.backgroundColor='var(--mfr-profile-btn-hover, #8a6800)'" onmouseout="this.style.backgroundColor='var(--mfr-profile-btn-bg, #cc9900)'" data-spm="button_register">Ücretsiz Kaydolun</a>
        </div>

        <!-- Arama geçmişi -->
        <div class="mt-auto">
          <a href="#" class="block text-base font-bold mb-2 leading-6" style="color: var(--mfr-profile-text-color, #222222)">Arama geçmişiniz</a>
          <div class="grid grid-cols-4 gap-2">
            ${thumbs.map(src => `
              <a href="#" class="aspect-square rounded-md overflow-hidden group">
                <img src="${src}" alt="Geçmiş" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
              </a>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Alt kart: RFQ -->
      <div class="flex-1 py-3 px-4 flex flex-col items-center justify-center text-center" style="background-color: var(--mfr-hero-card-bg, #ffffff); border-radius: var(--mfr-hero-card-radius, 6px); box-shadow: var(--mfr-hero-card-shadow, 0 0 12px rgba(0,0,0,0.05))">
        <p class="text-xs font-semibold mb-4" style="color: var(--mfr-profile-rfq-text, #222222)">Bir istek, birden fazla teklif</p>
        <a href="#" class="hover-expand-center w-full h-10 flex items-center justify-center border rounded-full text-xs font-bold transition-colors" style="background-color: var(--mfr-hero-card-bg, #ffffff); border-color: var(--mfr-profile-rfq-border, #222222); color: var(--mfr-profile-rfq-text, #222222)" title="Fiyat Teklifi Talebi (RFQ)">
          Fiyat Teklifi Talebi (RFQ)
        </a>
      </div>

    </div>
  `;
}

export function initCategoryFlyout(): void {
  const sidebar = document.querySelector<HTMLElement>('[data-category-sidebar]');
  if (!sidebar) return;

  const categoryItems = Array.from(
    sidebar.querySelectorAll<HTMLElement>('[data-category-id]')
  );
  const flyoutPanels = Array.from(
    sidebar.querySelectorAll<HTMLElement>('[data-flyout-id]')
  );

  let hideTimeout: ReturnType<typeof setTimeout> | null = null;
  let activeFlyoutId: string | null = null;

  // ── helpers ──────────────────────────────────────────────────────────────

  const ACTIVE_FLYOUT = ['opacity-100', 'pointer-events-auto', 'translate-x-0'];
  const INACTIVE_FLYOUT = ['opacity-0', 'pointer-events-none', 'translate-x-2'];
  const ACTIVE_LI = ['bg-gray-50', 'dark:bg-gray-700/50'];

  function clearHideTimeout(): void {
    if (hideTimeout !== null) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
  }

  function deactivateAll(): void {
    flyoutPanels.forEach(panel => {
      panel.classList.remove(...ACTIVE_FLYOUT);
      panel.classList.add(...INACTIVE_FLYOUT);
    });
    categoryItems.forEach(li => li.classList.remove(...ACTIVE_LI));
    activeFlyoutId = null;
  }

  function activateFlyout(categoryId: string): void {
    flyoutPanels.forEach(panel => {
      if (panel.dataset.flyoutId === categoryId) {
        panel.classList.remove(...INACTIVE_FLYOUT);
        panel.classList.add(...ACTIVE_FLYOUT);
      } else {
        panel.classList.remove(...ACTIVE_FLYOUT);
        panel.classList.add(...INACTIVE_FLYOUT);
      }
    });
    categoryItems.forEach(li => {
      if (li.dataset.categoryId === categoryId) {
        li.classList.add(...ACTIVE_LI);
      } else {
        li.classList.remove(...ACTIVE_LI);
      }
    });
    activeFlyoutId = categoryId;
  }

  function scheduleHide(): void {
    hideTimeout = setTimeout(() => {
      deactivateAll();
    }, 150);
  }

  // ── category items: event delegation on sidebar ──────────────────────────

  sidebar.addEventListener('mouseenter', (e: MouseEvent) => {
    const li = (e.target as HTMLElement).closest<HTMLElement>('[data-category-id]');
    if (!li) return;

    clearHideTimeout();
    const categoryId = li.dataset.categoryId ?? '';

    const hasFlyout = flyoutPanels.some(p => p.dataset.flyoutId === categoryId);
    if (hasFlyout && categoryId !== activeFlyoutId) {
      activateFlyout(categoryId);
    }
  }, true);

  // ── sidebar container: schedule hide when mouse fully leaves ─────────────

  sidebar.addEventListener('mouseleave', () => {
    scheduleHide();
  });

  // ── flyout panels: cancel hide while hovering, reschedule on leave ────────

  flyoutPanels.forEach(panel => {
    panel.addEventListener('mouseenter', () => {
      clearHideTimeout();
    });
    panel.addEventListener('mouseleave', () => {
      hideTimeout = setTimeout(() => {
        deactivateAll();
      }, 100);
    });
  });

  // ── "Tüm kategoriler" click ──────────────────────────────────────────────

  const allCategoriesLink = sidebar.querySelector<HTMLAnchorElement>('[data-all-categories]');
  allCategoriesLink?.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    window.location.href = '/categories';
  });
}
