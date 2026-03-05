/**
 * ReturnFAQ Component
 * FAQ accordion for return policy page
 */

const FAQ_ITEMS = [
  { q: 'İade süresi ne kadar?', a: 'Ürünü teslim aldığınız tarihten itibaren 14 gün içinde iade talebinde bulunabilirsiniz. Bu süre, tüm ürün kategorileri için geçerlidir.' },
  { q: 'İade kargo ücreti kim tarafından karşılanır?', a: 'Üretim hatası veya yanlış ürün gönderimi durumunda kargo ücreti tarafımızca karşılanır. Fikir değişikliği nedeniyle yapılan iadelerde kargo ücreti alıcıya aittir.' },
  { q: 'Hangi ürünler iade edilemez?', a: 'Kişiye özel üretilen ürünler, hijyen ürünleri (açılmış ambalaj), dijital ürünler ve indirimli kampanya ürünleri (belirtilmişse) iade edilemez.' },
  { q: 'Para iadesi ne zaman yapılır?', a: 'Ürün teslim alınıp onaylandıktan sonra 3-5 iş günü içinde ödemeniz iade edilir. Kredi kartı iadeleri bankanıza bağlı olarak 1-2 ek iş günü sürebilir.' },
  { q: 'Hasarlı ürün geldi, ne yapmalıyım?', a: 'Teslim sırasında veya sonrasında hasarlı ürün tespit ederseniz, 48 saat içinde fotoğraflı bildirim yapmanız yeterlidir. Hasarlı ürün iadeleri öncelikli olarak işlenir.' },
  { q: 'Toplu sipariş iadeleri için özel kurallar var mı?', a: 'B2B toplu siparişlerde iade koşulları satıcı ile yapılan sözleşmeye göre belirlenir. Genel iade politikamız bireysel alımlar için geçerlidir.' },
  { q: 'İade takibimi nasıl yapabilirim?', a: 'Destek Taleplerim sayfasından iade talebinizin durumunu takip edebilirsiniz. Ayrıca her aşamada e-posta bildirimi gönderilir.' },
];

export function ReturnFAQ(): string {
  return `
    <div class="mt-10" x-data="{ openFaq: null }">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Sık Sorulan Sorular</h3>
      <div class="space-y-2">
        ${FAQ_ITEMS.map((item, i) => `
          <div class="border border-gray-200 rounded-lg overflow-hidden">
            <button
              @click="openFaq = openFaq === ${i} ? null : ${i}"
              class="w-full flex items-center justify-between px-4 py-3.5 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span>${item.q}</span>
              <svg class="w-4 h-4 text-gray-500 transition-transform shrink-0 ml-2" :class="openFaq === ${i} && 'rotate-180'" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>
            </button>
            <div x-show="openFaq === ${i}" x-collapse>
              <p class="px-4 pb-4 text-sm text-gray-600 leading-relaxed">${item.a}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
