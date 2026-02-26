/**
 * SettingsEmailPreferences Component
 * Email notification preferences with master toggles and sub-checkboxes.
 * localStorage CRUD: tradehub_email_preferences
 */

const STORAGE_KEY = 'tradehub_email_preferences';

export interface EmailCategory {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  items: EmailItem[];
}

export interface EmailItem {
  id: string;
  title: string;
  description: string;
  checked: boolean;
}

const defaultCategories: EmailCategory[] = [
  {
    id: 'notification',
    title: 'Tüm bildirim e-postaları',
    description: 'Alibaba.Com\'da önemli hesap güncellemeleri ve etkinlikleri hakkında sizi bilgilendiren e-postalar',
    enabled: true,
    items: [
      {
        id: 'general_notification',
        title: 'Genel bildirim e-postaları',
        description: 'Hesaplarınız, iletişimleriniz, siparişleriniz, gönderilerinize ilgili güncellemeler dahil olmak üzere platformdaki faaliyetleriniz tarafından tetiklenen e-postalar.',
        checked: true,
      },
      {
        id: 'dispute_updates',
        title: 'Anlaşmazlık güncellemeleri',
        description: 'Taraf olduğunuz herhangi bir anlaşmazlık olması durumunda (sizin tarafınız tarafından başlatılmış olsun ya da olmasın), sizi bilgilendirecek ve ilerlemesi konusunda sizi bilgilendireceğiz.',
        checked: true,
      },
    ],
  },
  {
    id: 'marketing',
    title: 'Tüm pazarlama e-postaları',
    description: 'Alibaba.Com\'da ürünler ve hizmetler hakkında tanıtım mesajları içeren e-postalar',
    enabled: true,
    items: [
      {
        id: 'general_marketing',
        title: 'Genel pazarlama e-postaları',
        description: 'İşletmenize fayda sağlayabilecek ürün indirimleri, özel teklifler, etkinlikler ve hizmet teklifleri dahil olmak üzere fırsatlar, etkinlikler ve hizmet güncellemeleri hakkında sizi bilgilendirmek için e-postalar.',
        checked: true,
      },
      {
        id: 'surveys',
        title: 'Anketler',
        description: 'Size daha iyi hizmet verebilmek için tekliflerimizi geliştirebilmemiz için sizi geri bildirim sağlamaya davet eden e-postalar.',
        checked: true,
      },
    ],
  },
];

// ── CRUD ─────────────────────────────────────────────────────────

interface SavedEmailPrefs {
  toggles: Record<string, boolean>;
  checks: Record<string, boolean>;
}

function readEmailPrefs(): EmailCategory[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved: SavedEmailPrefs = JSON.parse(raw);
      return defaultCategories.map(cat => ({
        ...cat,
        enabled: saved.toggles[cat.id] ?? cat.enabled,
        items: cat.items.map(item => ({
          ...item,
          checked: saved.checks[item.id] ?? item.checked,
        })),
      }));
    }
  } catch { /* ignore */ }
  return defaultCategories.map(cat => ({ ...cat, items: cat.items.map(i => ({ ...i })) }));
}

function saveEmailPrefs(): void {
  const toggles: Record<string, boolean> = {};
  const checks: Record<string, boolean> = {};

  document.querySelectorAll<HTMLInputElement>('[data-cat-toggle]').forEach(el => {
    toggles[el.dataset.catToggle!] = el.checked;
  });
  document.querySelectorAll<HTMLInputElement>('[data-email-check]').forEach(el => {
    checks[el.dataset.emailCheck!] = el.checked;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify({ toggles, checks }));
}

// ── Renderers ────────────────────────────────────────────────────

function renderEmailItem(item: EmailItem): string {
  return `
    <div class="email-pref__item">
      <label class="email-pref__checkbox">
        <input type="checkbox" data-email-check="${item.id}" ${item.checked ? 'checked' : ''} />
        <span class="email-pref__checkmark"></span>
      </label>
      <div class="email-pref__item-content">
        <h4 class="email-pref__item-title">${item.title}</h4>
        <p class="email-pref__item-desc">${item.description}</p>
      </div>
    </div>
  `;
}

function renderCategory(cat: EmailCategory): string {
  return `
    <div class="email-pref__category">
      <div class="email-pref__cat-header">
        <div class="email-pref__cat-info">
          <h3 class="email-pref__cat-title">${cat.title}</h3>
          <p class="email-pref__cat-desc">${cat.description}</p>
        </div>
        <label class="email-pref__toggle">
          <input type="checkbox" data-cat-toggle="${cat.id}" ${cat.enabled ? 'checked' : ''} />
          <span class="email-pref__toggle-slider"></span>
        </label>
      </div>
      <div class="email-pref__items">
        ${cat.items.map(renderEmailItem).join('')}
      </div>
    </div>
  `;
}

export function SettingsEmailPreferences(): string {
  const categories = readEmailPrefs();
  return `
    <div class="email-pref">
      <p class="email-pref__breadcrumb">E-posta Hizmetleri</p>
      <h2 class="email-pref__title">E-posta tercihleri</h2>
      <p class="email-pref__subtitle">Almak istediğiniz e-posta türlerini seçin.</p>
      <p class="email-pref__email">E-posta tercihleri için <strong>met***@gmail.com</strong></p>
      <div class="email-pref__categories">
        ${categories.map(renderCategory).join('')}
      </div>
      <div class="email-pref__unsub">
        <a href="#" class="email-pref__unsub-link">Tüm abonelikten çıkın</a>
      </div>
    </div>
  `;
}

export function initSettingsEmailPreferences(): void {
  // Auto-save on any toggle/checkbox change
  document.querySelectorAll<HTMLInputElement>('[data-cat-toggle], [data-email-check]').forEach(input => {
    input.addEventListener('change', () => {
      saveEmailPrefs();
    });
  });

  // Master toggle controls sub-checkboxes
  document.querySelectorAll<HTMLInputElement>('[data-cat-toggle]').forEach(toggle => {
    toggle.addEventListener('change', () => {
      const category = toggle.closest('.email-pref__category');
      if (category) {
        category.querySelectorAll<HTMLInputElement>('[data-email-check]').forEach(cb => {
          cb.checked = toggle.checked;
        });
        saveEmailPrefs();
      }
    });
  });
}
