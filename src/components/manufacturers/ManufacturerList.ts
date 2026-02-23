import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

export function ManufacturerList(): string {
    const manufacturers = [
        {
            name: "Jingmen Tanmeng Technology Co., Ltd.",
            logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=50&h=50&fit=crop",
            verified: true,
            years: "2 yıl",
            staff: "100+ personel",
            area: "10.000+ m²",
            revenue: "$70 B+",
            rating: "4.9",
            reviews: "90+ değerlendirmeler",
            capabilities: ["Yanıt süresi ≤1h", "Zamanında teslimat 100.0%"],
            certifications: ["ISO", "CE", "CPC"],
            products: [
                { image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200", price: "$0,66-1,39", moq: "Min. sipariş: 5 Adet" },
                { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200", price: "$0,84-2,68", moq: "Min. sipariş: 10 Adet" },
                { image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=200", price: "$4,86", moq: "Min. sipariş: 48 Adet" }
            ],
            factoryImages: [
                "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&q=80&w=600"
            ]
        },
        {
            name: "Ganzhou Mingxiang Toys Co., Ltd.",
            logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=50&h=50&fit=crop",
            verified: true,
            years: "5 yıl",
            staff: "200+ personel",
            area: "3.000+ m²",
            revenue: "$500 B+",
            rating: "4.7",
            reviews: "120+ değerlendirmeler",
            capabilities: ["Yanıt süresi ≤2h", "Zamanında teslimat 98.5%"],
            certifications: ["ISO", "CE"],
            products: [
                { image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=200", price: "$6,50-7,60", moq: "Min. sipariş: 100 Adet" },
                { image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=200", price: "$7,60-8,80", moq: "Min. sipariş: 100 Adet" },
                { image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=200", price: "$8,60-10,60", moq: "Min. sipariş: 50 Adet" }
            ],
            factoryImages: [
                "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&q=80&w=600"
            ]
        },
        {
            name: "Shenzhen Dingyi Electronics Technology Co., Ltd.",
            logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=50&h=50&fit=crop",
            verified: true,
            years: "8 yıl",
            staff: "500+ personel",
            area: "20.000+ m²",
            revenue: "$1 T+",
            rating: "4.8",
            reviews: "250+ değerlendirmeler",
            capabilities: ["Yanıt süresi ≤1h", "Zamanında teslimat 99.2%"],
            certifications: ["ISO", "CE", "RoHS", "FCC"],
            products: [
                { image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&q=80&w=200", price: "$12,00-15,00", moq: "Min. sipariş: 50 Adet" },
                { image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=200", price: "$25,00-30,00", moq: "Min. sipariş: 20 Adet" },
                { image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&q=80&w=200", price: "$8,00-10,00", moq: "Min. sipariş: 100 Adet" }
            ],
            factoryImages: [
                "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600"
            ]
        }
    ];

    const lightboxModal = `
    <div id="factory-lightbox" class="fixed inset-0 bg-white z-[9999] hidden">
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <span id="factory-lightbox-title" class="text-[15px] text-[#222]"></span>
        <button id="factory-lightbox-close" type="button" class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      <div id="factory-lightbox-body" class="overflow-y-auto p-6" style="height:calc(100vh - 65px)">
      </div>
    </div>
    `;

    return `
    <div class="flex flex-col">
      ${manufacturers.map((mfg, idx) => renderFactoryCard(mfg, idx)).join('')}
    </div>
    ${lightboxModal}
  `;
}

function renderFactoryCard(mfg: any, cardIndex: number): string {
    const verifiedBadge = mfg.verified ? `
        <img src="https://img.icons8.com/fluency/16/verified-badge.png" alt="Verified" class="w-4 h-4" />
        <span class="text-[#1a66ff] font-bold text-[13px]">Doğrulanmış</span>
    ` : '';

    const certBadges = mfg.certifications.map((cert: string) => `
        <span class="inline-flex items-center justify-center w-6 h-6 rounded bg-gray-100 text-[10px] font-bold text-gray-600 border border-gray-200">${cert}</span>
    `).join('');

    const totalImages = mfg.factoryImages.length;

    return `
    <div class="bg-white rounded-lg p-5 mb-5" data-factory-card="${cardIndex}" data-factory-name="${mfg.name}" data-factory-images='${JSON.stringify(mfg.factoryImages)}'>
      <!-- Card Title Row -->
      <div class="flex justify-between items-start mb-8">
        <!-- Left: Logo + Info -->
        <div class="flex items-start">
          <div class="w-[50px] h-[50px] border border-[#ddd] rounded overflow-hidden shrink-0 mr-3">
            <img src="${mfg.logo}" alt="${mfg.name}" class="w-full h-full object-cover" />
          </div>
          <div>
            <h3 class="text-[16px] font-bold text-[#222] max-w-[440px] overflow-hidden text-ellipsis whitespace-nowrap">${mfg.name}</h3>
            <div class="flex items-center gap-1.5 mt-1 text-[14px] text-[#222]">
              ${verifiedBadge}
              <span>${mfg.years}</span>
              <span class="text-gray-400">·</span>
              <span>${mfg.staff}</span>
              <span class="text-gray-400">·</span>
              <span>${mfg.area}</span>
              <span class="text-gray-400">·</span>
              <span>${mfg.revenue}</span>
            </div>
          </div>
        </div>

        <!-- Right: Action Buttons -->
        <div class="flex items-center gap-5">
          <button type="button" class="text-gray-400 hover:text-red-500 transition-colors" aria-label="Favorilere ekle">
            <svg class="w-[25px] h-[25px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
          <button type="button" class="h-10 px-4 border border-[#222] rounded-full text-[14px] font-bold text-[#222] bg-white hover:bg-gray-50 transition-colors">
            Hemen sohbet edin
          </button>
          <button type="button" class="h-10 px-4 border border-[#222] rounded-full text-[14px] font-bold text-[#222] bg-white hover:bg-gray-50 transition-colors">
            Bize Ulaşın
          </button>
        </div>
      </div>

      <!-- Card Content Row -->
      <div class="flex justify-between">
        <!-- Left Column: Info -->
        <div class="w-[244px] shrink-0 pr-3">
          <h4 class="text-[14px] font-normal text-[#222] mb-1">Sıralama ve değerlendirmeler</h4>
          <div class="mb-6 text-[14px]">
            <strong class="text-[#222]">${mfg.rating}</strong><span class="text-[#222]">/5</span>
            <a href="#" class="underline text-[#222] hover:text-[#1a66ff] ml-1">(${mfg.reviews})</a>
          </div>
          <h4 class="text-[14px] font-normal text-[#222] mb-2">Fabrika kapasitesi</h4>
          <ul class="space-y-0.5">
            ${mfg.capabilities.map((cap: string) => `
              <li class="text-[14px] leading-[25px] font-bold text-[#222]">· ${cap}</li>
            `).join('')}
            <li class="text-[14px] leading-[25px] font-bold text-[#222] flex items-center gap-1.5">
              · Sertifikalar: ${certBadges}
            </li>
          </ul>
        </div>

        <!-- Middle Column: Products -->
        <div class="flex gap-3 mx-1">
          ${mfg.products.map((prod: any) => `
            <a href="#" class="flex flex-col group">
              <div class="w-[160px] h-[160px] rounded-lg overflow-hidden bg-gray-100">
                <img src="${prod.image}" alt="Ürün" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <p class="text-[16px] font-bold text-[#222] mt-3">${prod.price}</p>
              <p class="text-[14px] text-[#222] mt-1">${prod.moq}</p>
            </a>
          `).join('')}
        </div>

        <!-- Right Column: Factory Slider (Swiper) -->
        <div class="factory-slider w-[320px] h-[240px] shrink-0 relative" data-slider-root="${cardIndex}">
          <div class="swiper factory-swiper-${cardIndex} w-full h-full overflow-hidden">
            <div class="swiper-wrapper">
              ${mfg.factoryImages.map((img: string, i: number) => `
                <div class="swiper-slide">
                  <img src="${img}" alt="Fabrika görünümü ${i + 1}" class="w-full h-full object-cover cursor-pointer" data-slider-img="${cardIndex}" />
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Left Arrow -->
          <button type="button" class="factory-prev-${cardIndex} absolute left-0 top-1/2 -translate-y-1/2 w-[28px] h-[56px] bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors duration-100 z-10" aria-label="Önceki">
            <svg class="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>

          <!-- Right Arrow -->
          <button type="button" class="factory-next-${cardIndex} absolute right-0 top-1/2 -translate-y-1/2 w-[28px] h-[56px] bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors duration-100 z-10" aria-label="Sonraki">
            <svg class="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>

          <!-- Image Counter -->
          <span class="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 z-10 pointer-events-none">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            <span class="factory-counter-${cardIndex}">1/${totalImages}</span>
          </span>
        </div>
      </div>
    </div>
  `;
}

export function initFactorySliders(): void {
    // Initialize each factory card slider with Swiper + peek animation
    document.querySelectorAll<HTMLDivElement>('[data-slider-root]').forEach(root => {
        const cardIndex = root.dataset.sliderRoot!;
        const swiperEl = root.querySelector<HTMLElement>(`.factory-swiper-${cardIndex}`);
        if (!swiperEl) return;

        const prevBtn = root.querySelector<HTMLButtonElement>(`.factory-prev-${cardIndex}`);
        const nextBtn = root.querySelector<HTMLButtonElement>(`.factory-next-${cardIndex}`);
        const counterEl = root.querySelector<HTMLSpanElement>(`.factory-counter-${cardIndex}`);
        const total = swiperEl.querySelectorAll('.swiper-slide').length;

        const stopPeek = () => {
            root.classList.remove('factory-peek-prev', 'factory-peek-next');
        };

        // Peek: arrow hover shifts slide 28px
        prevBtn?.addEventListener('mouseenter', () => {
            root.classList.remove('factory-peek-next');
            root.classList.add('factory-peek-prev');
        });
        prevBtn?.addEventListener('mouseleave', stopPeek);
        prevBtn?.addEventListener('click', stopPeek);

        nextBtn?.addEventListener('mouseenter', () => {
            root.classList.remove('factory-peek-prev');
            root.classList.add('factory-peek-next');
        });
        nextBtn?.addEventListener('mouseleave', stopPeek);
        nextBtn?.addEventListener('click', stopPeek);

        root.addEventListener('mouseleave', stopPeek);

        const swiper = new Swiper(swiperEl, {
            modules: [Navigation],
            slidesPerView: 1,
            loop: true,
            speed: 650,
            navigation: {
                prevEl: prevBtn,
                nextEl: nextBtn,
            },
        });

        swiper.on('slideChange', () => {
            if (counterEl) counterEl.textContent = `${swiper.realIndex + 1}/${total}`;
        });
        swiper.on('slideChangeTransitionStart', stopPeek);
    });

    // Lightbox
    const lightbox = document.getElementById('factory-lightbox');
    const lightboxTitle = document.getElementById('factory-lightbox-title');
    const lightboxBody = document.getElementById('factory-lightbox-body');
    const lightboxClose = document.getElementById('factory-lightbox-close');

    function openLightbox(name: string, images: string[]) {
        if (!lightbox || !lightboxTitle || !lightboxBody) return;
        lightboxTitle.textContent = name;
        lightboxBody.innerHTML = images.map(img => `
            <div class="flex justify-center mb-4">
              <img src="${img}" alt="Fabrika" class="max-w-[800px] w-full object-contain" />
            </div>
        `).join('');
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.add('hidden');
        document.body.style.overflow = '';
    }

    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && !lightbox.classList.contains('hidden')) {
            closeLightbox();
        }
    });

    // Image click -> open lightbox
    document.querySelectorAll<HTMLImageElement>('[data-slider-img]').forEach(img => {
        img.addEventListener('click', () => {
            const cardIndex = img.dataset.sliderImg!;
            const card = document.querySelector<HTMLDivElement>(`[data-factory-card="${cardIndex}"]`);
            if (!card) return;
            const name = card.dataset.factoryName || '';
            const images: string[] = JSON.parse(card.dataset.factoryImages || '[]');
            openLightbox(name, images);
        });
    });
}
