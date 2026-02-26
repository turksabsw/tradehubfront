/**
 * SettingsAdPreferences Component
 * Data preferences with toggle switches for personalized ads/recommendations.
 * localStorage CRUD: tradehub_ad_preferences
 */

const STORAGE_KEY = 'tradehub_ad_preferences';

export interface AdPreference {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

const defaultPreferences: AdPreference[] = [
  {
    id: 'personalized_ads',
    title: 'Tüm kişiselleştirilmiş reklamlar',
    description: 'Kişiselleştirilmiş reklamlar açıkken, size özel öneriler gösterilir. Kapatırsanız yine de reklam görürsünüz, ancak ilgi alanlarınıza göre özelleştirilmez.',
    enabled: false,
  },
  {
    id: 'personalized_recommendations',
    title: 'Tüm kişiselleştirilmiş öneriler',
    description: 'İlginizi çekebilecek ürünleri göstermek için öneriler kullanıyoruz. Öneri ayarlarınızı değiştirerek önerilerinizi etkileyin.',
    enabled: false,
  },
];

function readPreferences(): AdPreference[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved: Record<string, boolean> = JSON.parse(raw);
      return defaultPreferences.map(p => ({ ...p, enabled: saved[p.id] ?? p.enabled }));
    }
  } catch { /* ignore */ }
  return defaultPreferences.map(p => ({ ...p }));
}

function savePreferences(prefs: Record<string, boolean>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

function renderToggle(pref: AdPreference): string {
  return `
    <div class="ad-pref__item">
      <div class="ad-pref__content">
        <h3 class="ad-pref__item-title">${pref.title}</h3>
        <p class="ad-pref__item-desc">${pref.description}</p>
      </div>
      <label class="ad-pref__toggle">
        <input type="checkbox" data-pref-id="${pref.id}" ${pref.enabled ? 'checked' : ''} />
        <span class="ad-pref__toggle-slider"></span>
      </label>
    </div>
  `;
}

export function SettingsAdPreferences(): string {
  const prefs = readPreferences();
  return `
    <div class="ad-pref">
      <h2 class="ad-pref__title">Veri tercihleri</h2>
      <div class="ad-pref__list">
        ${prefs.map(renderToggle).join('')}
      </div>
      <div class="ad-pref__actions">
        <a href="#" class="ad-pref__back-btn">Geri</a>
      </div>
    </div>
  `;
}

export function initSettingsAdPreferences(): void {
  // Toggle change → save immediately
  document.querySelectorAll<HTMLInputElement>('[data-pref-id]').forEach(input => {
    input.addEventListener('change', () => {
      const prefs: Record<string, boolean> = {};
      document.querySelectorAll<HTMLInputElement>('[data-pref-id]').forEach(cb => {
        prefs[cb.dataset.prefId!] = cb.checked;
      });
      savePreferences(prefs);
    });
  });

  // Back button
  const backBtn = document.querySelector<HTMLAnchorElement>('.ad-pref__back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '';
    });
  }
}
