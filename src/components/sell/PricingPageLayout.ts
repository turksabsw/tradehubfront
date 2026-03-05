/**
 * PricingPageLayout Component
 * Pricing plans with monthly/yearly toggle, comparison table, and FAQ
 */

import { PricingTable } from '../shared/PricingTable';

const PLANS = [
  {
    name: 'Ücretsiz',
    monthlyPrice: '₺0',
    yearlyPrice: '₺0',
    yearlyNote: '',
    recommended: false,
    features: ['50 ürün listeleme', 'Temel mağaza sayfası', 'Standart destek', 'Temel analitik'],
  },
  {
    name: 'Gold',
    monthlyPrice: '₺499',
    yearlyPrice: '₺399',
    yearlyNote: 'Yılda ₺4.788',
    recommended: false,
    features: ['500 ürün listeleme', 'Özel mağaza sayfası', 'Öncelikli destek', 'Detaylı analitik', 'Gold rozeti', 'Öne çıkan listeleme'],
  },
  {
    name: 'Verified',
    monthlyPrice: '₺999',
    yearlyPrice: '₺799',
    yearlyNote: 'Yılda ₺9.588',
    recommended: true,
    features: ['Sınırsız ürün listeleme', 'Premium mağaza sayfası', 'Özel hesap yöneticisi', 'AI destekli analitik', 'Verified rozeti', 'Öncelikli arama sıralaması', 'Toplu ürün yükleme', 'API erişimi'],
  },
];

const COMPARISON_FEATURES = [
  { label: 'Ürün Listeleme', values: ['50', '500', 'Sınırsız'] },
  { label: 'Mağaza Sayfası', values: ['Temel', 'Özel', 'Premium'] },
  { label: 'Destek', values: ['Standart', 'Öncelikli', 'Özel Yönetici'] },
  { label: 'Analitik', values: ['Temel', 'Detaylı', 'AI Destekli'] },
  { label: 'Rozet', values: [false, true, true] as (boolean | string)[] },
  { label: 'Öne Çıkan Listeleme', values: [false, true, true] as (boolean | string)[] },
  { label: 'Toplu Ürün Yükleme', values: [false, false, true] as (boolean | string)[] },
  { label: 'API Erişimi', values: [false, false, true] as (boolean | string)[] },
  { label: 'Öncelikli Arama', values: [false, false, true] as (boolean | string)[] },
];

export function PricingPageLayout(): string {
  return `
    <div x-data="sellPricing()" class="pb-16">
      <!-- Header -->
      <div class="text-center py-10 sm:py-14">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Üyelik Paketleri</h1>
        <p class="text-gray-500 mb-6">İşletmenize uygun planı seçin ve satışa başlayın.</p>

        <!-- Billing Toggle -->
        <div class="inline-flex items-center bg-gray-100 rounded-full p-1">
          <button @click="billingPeriod = 'monthly'" class="px-4 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer" :class="billingPeriod === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'">Aylık</button>
          <button @click="billingPeriod = 'yearly'" class="px-4 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer" :class="billingPeriod === 'yearly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'">
            Yıllık <span class="text-xs text-green-600 font-semibold ml-1">%20 indirim</span>
          </button>
        </div>
      </div>

      <!-- Pricing Cards -->
      <div class="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          ${PLANS.map(plan => `
            <div class="relative bg-white rounded-xl ${plan.recommended ? 'border-2 border-primary-500 shadow-lg' : 'border border-gray-200 shadow-sm'} p-6 sm:p-8 flex flex-col">
              ${plan.recommended ? '<div class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full">Popüler</div>' : ''}
              <h3 class="text-xl font-bold text-gray-900">${plan.name}</h3>
              <div class="mt-4 mb-6">
                <span class="text-3xl font-bold text-gray-900" x-text="billingPeriod === 'monthly' ? '${plan.monthlyPrice}' : '${plan.yearlyPrice}'"></span>
                <span class="text-sm text-gray-500"> / ay</span>
                ${plan.yearlyNote ? `<p class="text-xs text-gray-400 mt-1" x-show="billingPeriod === 'yearly'">${plan.yearlyNote}</p>` : ''}
              </div>
              <ul class="space-y-3 mb-8 flex-1">
                ${plan.features.map(f => `
                  <li class="flex items-start gap-2 text-sm text-gray-600">
                    <svg class="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    ${f}
                  </li>
                `).join('')}
              </ul>
              <a href="/pages/seller/sell.html" class="block text-center py-2.5 rounded-lg font-medium text-sm transition-colors ${plan.recommended ? 'bg-primary-500 text-white hover:bg-primary-600' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}">
                ${plan.name === 'Ücretsiz' ? 'Ücretsiz Başla' : 'Planı Seç'}
              </a>
            </div>
          `).join('')}
        </div>

        <!-- Feature Comparison -->
        <div class="mb-16">
          <h2 class="text-xl font-bold text-gray-900 mb-6 text-center">Özellik Karşılaştırması</h2>
          ${PricingTable({
            plans: [
              { name: 'Ücretsiz' },
              { name: 'Gold' },
              { name: 'Verified', recommended: true },
            ],
            features: COMPARISON_FEATURES,
          })}
        </div>

        <!-- FAQ -->
        <div class="max-w-[800px] mx-auto">
          <h2 class="text-xl font-bold text-gray-900 mb-6 text-center">Sık Sorulan Sorular</h2>
          <div class="space-y-2">
            <template x-for="(item, index) in faqItems" :key="index">
              <div class="border border-gray-200 rounded-lg overflow-hidden">
                <button @click="toggleFaq(index)" class="w-full flex items-center justify-between px-4 py-3.5 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer">
                  <span x-text="item.question"></span>
                  <svg class="w-4 h-4 text-gray-500 transition-transform shrink-0 ml-2" :class="item.open && 'rotate-180'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>
                </button>
                <div x-show="item.open" x-collapse>
                  <p class="px-4 pb-4 text-sm text-gray-600 leading-relaxed" x-text="item.answer"></p>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center mt-14">
          <a href="/pages/seller/sell.html" class="inline-block px-8 py-3.5 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors text-base">Hemen Başlayın</a>
        </div>
      </div>
    </div>
  `;
}
