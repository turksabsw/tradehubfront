/**
 * CookieConsentUI Component
 * Cookie category toggles and cookie table
 */

export function CookieConsentUI(): string {
  const categories = [
    { id: 'necessary', label: 'Zorunlu Çerezler', desc: 'Web sitesinin temel işlevleri için gereklidir. Bu çerezler devre dışı bırakılamaz.', alwaysOn: true },
    { id: 'functional', label: 'Fonksiyonel Çerezler', desc: 'Tercihlerinizi hatırlayarak daha iyi bir deneyim sunar.', alwaysOn: false },
    { id: 'analytics', label: 'Analitik Çerezler', desc: 'Ziyaretçilerin siteyi nasıl kullandığını anlamamıza yardımcı olur.', alwaysOn: false },
    { id: 'marketing', label: 'Pazarlama Çerezleri', desc: 'Kişiselleştirilmiş reklamlar göstermek için kullanılır.', alwaysOn: false },
  ];

  const cookieTable = [
    { name: '_istoc_session', provider: 'iSTOC', purpose: 'Oturum yönetimi', duration: 'Oturum', type: 'Zorunlu' },
    { name: '_istoc_csrf', provider: 'iSTOC', purpose: 'CSRF koruması', duration: 'Oturum', type: 'Zorunlu' },
    { name: '_istoc_prefs', provider: 'iSTOC', purpose: 'Kullanıcı tercihleri', duration: '1 yıl', type: 'Fonksiyonel' },
    { name: '_istoc_lang', provider: 'iSTOC', purpose: 'Dil tercihi', duration: '1 yıl', type: 'Fonksiyonel' },
    { name: '_ga', provider: 'Google', purpose: 'Ziyaretçi istatistikleri', duration: '2 yıl', type: 'Analitik' },
    { name: '_gid', provider: 'Google', purpose: 'Ziyaretçi tanımlama', duration: '24 saat', type: 'Analitik' },
    { name: '_fbp', provider: 'Facebook', purpose: 'Reklam hedefleme', duration: '3 ay', type: 'Pazarlama' },
    { name: '_gcl_au', provider: 'Google Ads', purpose: 'Dönüşüm takibi', duration: '3 ay', type: 'Pazarlama' },
  ];

  return `
    <div class="mt-10 bg-white rounded-lg border border-gray-200 p-6 sm:p-8" x-data="cookieConsent()">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">Çerez Tercihlerinizi Yönetin</h2>

      <!-- Category Toggles -->
      <div class="space-y-4 mb-8">
        ${categories.map(cat => `
          <div class="flex items-start justify-between gap-4 p-4 rounded-lg border border-gray-100 bg-gray-50">
            <div class="min-w-0">
              <h3 class="text-sm font-semibold text-gray-800">${cat.label}</h3>
              <p class="text-sm text-gray-500 mt-0.5">${cat.desc}</p>
            </div>
            <label class="relative inline-flex items-center shrink-0 ${cat.alwaysOn ? 'cursor-not-allowed' : 'cursor-pointer'}">
              <input type="checkbox"
                ${cat.alwaysOn ? 'checked disabled' : `:checked="categories.${cat.id}" @change="toggleCategory('${cat.id}')"`}
                class="sr-only peer">
              <div class="w-10 h-5 bg-gray-300 peer-checked:bg-primary-500 rounded-full transition-colors ${cat.alwaysOn ? 'opacity-70' : ''} after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
            </label>
          </div>
        `).join('')}
      </div>

      <button @click="savePreferences()" class="px-6 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors cursor-pointer mb-8">
        Tercihleri Kaydet
      </button>

      <!-- Cookie Table -->
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Kullanılan Çerezler</h3>
      <div class="overflow-x-auto -mx-2 sm:mx-0">
        <table class="w-full text-sm min-w-[600px]">
          <thead class="bg-gray-50">
            <tr>
              <th class="text-left py-2.5 px-3 font-medium text-gray-700">Çerez Adı</th>
              <th class="text-left py-2.5 px-3 font-medium text-gray-700">Sağlayıcı</th>
              <th class="text-left py-2.5 px-3 font-medium text-gray-700">Amaç</th>
              <th class="text-left py-2.5 px-3 font-medium text-gray-700">Süre</th>
              <th class="text-left py-2.5 px-3 font-medium text-gray-700">Tip</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            ${cookieTable.map(c => `
              <tr class="hover:bg-gray-50">
                <td class="py-2.5 px-3 font-mono text-xs text-gray-800">${c.name}</td>
                <td class="py-2.5 px-3 text-gray-600">${c.provider}</td>
                <td class="py-2.5 px-3 text-gray-600">${c.purpose}</td>
                <td class="py-2.5 px-3 text-gray-500">${c.duration}</td>
                <td class="py-2.5 px-3"><span class="text-xs px-2 py-0.5 rounded-full ${c.type === 'Zorunlu' ? 'bg-blue-100 text-blue-700' : c.type === 'Fonksiyonel' ? 'bg-purple-100 text-purple-700' : c.type === 'Analitik' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}">${c.type}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
