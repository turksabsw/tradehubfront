import type { SellerProfile, ProductCategory, SimpleProduct } from '../../types/seller/types';
import { ProductCard } from '../shared/ProductCard';

// Mock Review Data Type (to be added to types/seller/types.ts)
export interface SellerReview {
  id: string;
  reviewerName: string;
  country: string;
  countryFlag: string;
  date: string;
  comment: string;
  productName: string;
  productImage: string;
  productPrice: string;
}

export interface SellerPerformanceStats {
  rating: number;
  reviewCount: number;
  responseTime: string;
  onTimeDeliveryRate: string;
  transactions: number;
  supplierServiceScore: number;
  onTimeShipmentScore: number;
  productQualityScore: number;
}

// ─── Contact Sidebar Component ─────────────────────────────────
function ContactSidebar(seller: SellerProfile): string {
  return `
    <div class="company-profile__sidebar sticky top-[100px] bg-white rounded-[var(--radius-md)] border border-gray-200 p-6">
      <h3 class="text-[18px] font-bold text-gray-900 mb-4">Tedarikçiye Ulaşın</h3>
      
      <div class="flex items-center gap-3 mb-6">
        <div class="w-12 h-12 flex items-center justify-center rounded overflow-hidden shadow-sm border border-gray-100 p-1">
          <img src="${seller.logo}" alt="${seller.name}" class="w-full h-full object-contain" />
        </div>
        <div>
          <h4 class="text-[14px] font-medium text-gray-900 leading-tight line-clamp-2">${seller.name}</h4>
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <button class="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-bold py-2.5 px-4 rounded-full transition-colors text-[14px] company-profile__contact-btn">
          Şimdi iletişime geçin
        </button>
        <button class="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-medium py-2.5 px-4 rounded-full transition-colors text-[14px] company-profile__inquiry-btn">
          Sorgu gönder
        </button>
      </div>
    </div>
  `;
}

// ─── Overview Tab (Genel Bakış) ────────────────────────────────
function OverviewTab(stats: SellerPerformanceStats, mainProducts: SimpleProduct[]): string {
  return `
    <div class="company-profile__tab-content active transition-opacity duration-300" id="tab-overview">
      
      <!-- Performance Section -->
      <section class="bg-white rounded-[var(--radius-md)] border border-gray-200 p-6 mb-6">
        <h3 class="text-[18px] font-bold text-gray-900 mb-6">Performans</h3>
        
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8">
          <!-- Stats -->
          <div>
            <div class="flex items-end gap-2 mb-4">
              <span class="text-[32px] font-bold leading-none text-gray-900">${stats.rating.toFixed(1)}</span>
              <span class="text-[14px] text-gray-500 mb-1">/5</span>
              <div class="ml-2">
                <span class="block text-[12px] text-gray-900 font-medium">Hoşnut eden</span>
                <a href="#tab-reviews" class="text-[12px] text-blue-600 hover:underline company-profile__tab-link" data-target="tab-reviews">${stats.reviewCount} değerlendirmeler</a>
              </div>
            </div>
            
            <ul class="space-y-2 text-[13px] text-gray-900 mb-6 font-medium">
              <li class="flex items-center gap-2"><span>&le;${stats.responseTime}</span> <span class="text-gray-500 font-normal">Ortalama yanıt süresi</span></li>
              <li class="flex items-center gap-2"><span>${stats.onTimeDeliveryRate}</span> <span class="text-gray-500 font-normal">Zamanında teslimat oranı</span></li>
              <li class="flex items-center gap-2"><span>${stats.transactions}+</span> <span class="text-gray-500 font-normal">sipariş</span></li>
            </ul>

            <div class="pt-4 border-t border-gray-100">
              <h4 class="text-[13px] font-bold text-gray-900 mb-3 flex items-center gap-2">
                Tedarikçi kapasitesi <span class="text-[11px] font-normal text-gray-500">Doğrulandı by <strong>Intertek</strong></span>
              </h4>
              <ul class="space-y-2 text-[13px] text-gray-600">
                <li class="flex items-center gap-2"><svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> Küçük özelleştirme</li>
                <li class="flex items-center gap-2"><svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> Çizime göre özelleştirme</li>
                <li class="flex items-center gap-2"><svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> Nihai ürün denetimi</li>
                 <li class="flex items-center gap-2"><svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> Garanti seçenekleri mevcut</li>
              </ul>
            </div>
          </div>
          
          <!-- Video / Images Gallery -->
          <div class="relative rounded-lg overflow-hidden bg-gray-100 aspect-video group cursor-pointer company-profile__video-trigger">
            <img src="https://images.unsplash.com/photo-1581091226825-acb28bd45c61?q=80&w=800&auto=format&fit=crop" alt="Factory Video" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
               <div class="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                 <svg class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg>
               </div>
            </div>
          </div>

        </div>
      </section>

      <!-- Main Products Section -->
      <section class="bg-white rounded-[var(--radius-md)] border border-gray-200 p-6">
        <h3 class="text-[18px] font-bold text-gray-900 mb-6 uppercase">ANA ÜRÜNLER</h3>
        
        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          ${mainProducts.map(product => `
            <div class="p-2 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
               ${ProductCard({
    image: product.image,
    price: "25.40", // using placeholder because SimpleProduct is missing prices in mockData
    currency: "$",
    minOrder: "1 set",
    href: product.link
  })}
               <h4 class="mt-2 text-[13px] text-gray-700 font-medium line-clamp-2 cursor-pointer hover:text-[#f97316] transition-colors">${product.name}</h4>
            </div>
          `).join('')}
        </div>
      </section>

    </div>
  `;
}

// ─── Reviews Tab (Yorumlar) ────────────────────────────────────
function ReviewsTab(stats: SellerPerformanceStats, reviews: SellerReview[]): string {
  return `
    <div class="company-profile__tab-content hidden transition-opacity duration-300" id="tab-reviews">
      <section class="bg-white rounded-[var(--radius-md)] border border-gray-200 p-6">
        <h3 class="text-[18px] font-bold text-gray-900 mb-8">Şirket Değerlendirmeleri (${stats.reviewCount})</h3>
        
        <!-- Score Breakdown -->
        <div class="flex flex-col md:flex-row gap-12 mb-10 pb-10 border-b border-gray-100">
          <div class="flex flex-col">
            <div class="text-[48px] font-bold text-gray-900 leading-none">${stats.rating.toFixed(1)} <span class="text-[16px] text-gray-500 font-normal">/5</span></div>
            <div class="text-[14px] text-gray-600 font-medium mt-1">Memnun</div>
          </div>
          
          <div class="flex-1 max-w-md space-y-3">
            <div class="flex items-center justify-between text-[13px]">
              <span class="text-gray-600 w-32">Tedarikçi Hizmeti</span>
              <div class="flex-1 mx-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-[#f97316] rounded-full" style="width: ${(stats.supplierServiceScore / 5) * 100}%"></div>
              </div>
              <span class="font-bold text-gray-900">${stats.supplierServiceScore.toFixed(1)}</span>
            </div>
            <div class="flex items-center justify-between text-[13px]">
              <span class="text-gray-600 w-32">Zamanında Sevkiyat</span>
              <div class="flex-1 mx-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-[#f97316] rounded-full" style="width: ${(stats.onTimeShipmentScore / 5) * 100}%"></div>
              </div>
              <span class="font-bold text-gray-900">${stats.onTimeShipmentScore.toFixed(1)}</span>
            </div>
            <div class="flex items-center justify-between text-[13px]">
              <span class="text-gray-600 w-32">Ürün Kalitesi</span>
              <div class="flex-1 mx-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-[#f97316] rounded-full" style="width: ${(stats.productQualityScore / 5) * 100}%"></div>
              </div>
              <span class="font-bold text-gray-900">${stats.productQualityScore.toFixed(1)}</span>
            </div>
          </div>
        </div>

        <!-- Reviews List -->
        <div class="space-y-8">
          ${reviews.map(review => `
            <div class="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <div class="w-full sm:w-48 flex-shrink-0">
                <div class="flex items-center gap-2 text-[13px] font-medium text-gray-900 mb-1">
                  ${review.reviewerName} <span class="text-lg" title="${review.country}">${review.countryFlag}</span>
                </div>
                <div class="text-[12px] text-gray-400">${review.date}</div>
              </div>
              
              <div class="flex-1">
                <p class="text-[14px] text-gray-700 mb-4">${review.comment}</p>
                
                <div class="flex items-start gap-3 bg-gray-50 p-3 rounded-md border border-gray-100">
                  <img src="${review.productImage}" alt="${review.productName}" class="w-12 h-12 object-cover rounded bg-white border border-gray-200">
                  <div>
                    <a href="#" class="text-[12px] text-gray-600 hover:text-[#f97316] line-clamp-2 transition-colors">${review.productName}</a>
                    <div class="text-[13px] font-medium text-gray-900 mt-1">${review.productPrice}</div>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="mt-8 text-center">
           <button class="px-6 py-2 border border-gray-300 rounded-full text-[14px] font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              Tüm değerlendirmelere göz at
           </button>
        </div>
      </section>
    </div>
  `;
}

// ─── Products Tab (Ürünler) ────────────────────────────────────
function ProductsTab(categories: ProductCategory[]): string {
  // Flatten products for "All" view
  const allProducts = categories.flatMap(c => c.products).slice(0, 12);

  return `
    <div class="company-profile__tab-content hidden transition-opacity duration-300" id="tab-products">
      <section class="bg-white rounded-[var(--radius-md)] border border-gray-200 p-6">
        
        <!-- Category Filter Bar -->
        <div class="flex items-center border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar pb-1">
          <button class="company-profile__prod-cat active whitespace-nowrap px-4 py-2 text-[14px] font-bold text-gray-900 border-b-2 border-gray-900">Tümü</button>
          ${categories.map(cat => `
             <button class="company-profile__prod-cat whitespace-nowrap px-4 py-2 text-[14px] font-medium text-gray-500 hover:text-gray-900 border-b-2 border-transparent transition-colors">${cat.name}</button>
          `).join('')}
        </div>

        <!-- Dynamic Product Grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          ${allProducts.map(product => `
            <div class="p-3 border border-gray-100 rounded-[calc(var(--radius-md)+4px)] hover:shadow-md transition-shadow bg-white">
                <div class="mb-3">
                   ${ProductCard({
    image: product.image,
    price: product.priceMin.toFixed(2),
    currency: "$",
    minOrder: `${product.moq} ${product.moqUnit}`,
    href: product.link
  })}
                </div>
                <!-- Extra Product Meta (Title and Badge) -->
                ${product.badges && product.badges.length ? `<div class="mb-2 flex flex-wrap gap-1">${product.badges.map(b => `<span class="bg-blue-50 text-blue-600 border border-blue-200 text-[10px] px-1.5 py-0.5 rounded font-medium tracking-wide uppercase">${b.label}</span>`).join('')}</div>` : ''}
                <a href="${product.link}" class="text-[13px] text-[#222222] font-medium leading-[1.4] line-clamp-2 hover:text-[#f97316] transition-colors mb-2">
                    ${product.name}
                </a>
                <div class="text-[12px] text-gray-500 border-t border-gray-100 pt-2 mt-auto text-right">
                   ${product.soldCount} sold
                </div>
            </div>
          `).join('')}
        </div>

      </section>
    </div>
  `;
}

// ─── Main Wrapper ──────────────────────────────────────────────
export function CompanyProfileComponent(
  seller: SellerProfile,
  stats: SellerPerformanceStats,
  reviews: SellerReview[],
  mainProducts: SimpleProduct[],
  categories: ProductCategory[]
): string {
  return `
    <section class="company-profile bg-[#f9fafb] py-8 min-h-screen" aria-label="Satıcı Profili">
      <div class="max-w-[var(--container-xl)] mx-auto px-4 lg:px-6 xl:px-8">
        
        <!-- Main Navigation Tabs -->
        <div class="bg-white rounded-t-[var(--radius-md)] border-b border-gray-200 px-6 py-0 flex items-center gap-8 mb-6 overflow-x-auto no-scrollbar">
          <button class="company-profile__main-tab active py-4 text-[15px] font-bold text-gray-900 border-b-2 border-gray-900 whitespace-nowrap" data-target="tab-overview">Hesabım</button>
          <button class="company-profile__main-tab py-4 text-[15px] font-medium text-gray-500 hover:text-gray-900 border-b-2 border-transparent transition-colors whitespace-nowrap" data-target="tab-reviews">Yorumlar</button>
          <button class="company-profile__main-tab py-4 text-[15px] font-medium text-gray-500 hover:text-gray-900 border-b-2 border-transparent transition-colors whitespace-nowrap" data-target="tab-video" disabled>Video İpuçları</button>
          <button class="company-profile__main-tab py-4 text-[15px] font-medium text-gray-500 hover:text-gray-900 border-b-2 border-transparent transition-colors whitespace-nowrap" data-target="tab-products">Ürünler</button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          <!-- Left Content Area (Tabs) -->
          <div class="lg:col-span-3">
            ${OverviewTab(stats, mainProducts)}
            ${ReviewsTab(stats, reviews)}
            ${ProductsTab(categories)}
          </div>

          <!-- Right Sidebar -->
          <div class="lg:col-span-1 border-l border-gray-100 lg:pl-2">
            ${ContactSidebar(seller)}
          </div>

        </div>
      </div>
    </section>
  `;
}
