/**
 * SettingsPrivacy Component
 * Privacy settings with radio group sections.
 */

export interface PrivacyOption {
  value: string;
  label: string;
  tooltip?: string;
}

export interface PrivacySection {
  id: string;
  title: string;
  tooltip?: boolean;
  options: PrivacyOption[];
  selected: string;
}

const shareOptions: PrivacyOption[] = [
  { value: 'hide', label: 'Gizle' },
  { value: 'verified', label: 'Yalnızca doğrulanmış tedarikçilerle paylaş', tooltip: '?' },
  { value: 'all', label: 'Tüm kullanıcılarla paylaş', tooltip: '?' },
];

const shareOptionsExtended: PrivacyOption[] = [
  { value: 'hide', label: 'Gizle' },
  { value: 'verified', label: 'Yalnızca doğrulanmış tedarikçilerle paylaş', tooltip: '?' },
  { value: 'verified-extended', label: 'Yalnızca doğrulanmış tedarikçiler, üçüncü taraf hizmet sağlayıcıları ve/veya iştirakleriyle paylaş' },
  { value: 'all', label: 'Tüm kullanıcılarla paylaş', tooltip: '?' },
];

const contactOptions: PrivacyOption[] = [
  { value: 'exchanged', label: 'Yalnızca kartvizit değiştirdiğiniz tedarikçiler görebilir' },
  { value: 'verified-extended', label: 'Yalnızca (i) tedarikçiler, (ii) üçüncü taraf hizmet sağlayıcıları ve/veya (iii) kartvizit değiştirdiğiniz iştirakleri görebilir' },
];

const defaultSections: PrivacySection[] = [
  { id: 'basic', title: 'Temel bilgiler', tooltip: true, options: shareOptionsExtended, selected: 'all' },
  { id: 'contact', title: 'İletişim bilgileri', tooltip: true, options: contactOptions, selected: 'verified-extended' },
  { id: 'spam', title: 'Kişi ekleme, engelleme ve spam durumunuz', tooltip: true, options: shareOptions, selected: 'all' },
  { id: 'sourcing', title: 'Tedarik bilgileri', tooltip: true, options: shareOptions, selected: 'all' },
  { id: 'activity', title: 'Alibaba.com\'daki aktiviteniz', tooltip: true, options: shareOptions, selected: 'verified' },
  { id: 'industries', title: 'İlgilendiğiniz endüstriler', tooltip: true, options: shareOptions, selected: 'verified' },
  { id: 'keywords', title: 'En çok aranan anahtar kelimeler', tooltip: true, options: shareOptions, selected: 'hide' },
  { id: 'recent', title: 'Son aranan anahtar kelimeler ve görüntülenen ürünler', tooltip: true, options: shareOptions, selected: 'verified' },
  { id: 'transaction', title: 'İşlem', tooltip: true, options: shareOptionsExtended, selected: 'hide' },
  { id: 'details', title: 'Aktivite detayları', tooltip: true, options: shareOptions, selected: 'verified' },
];

function renderPrivacySection(section: PrivacySection): string {
  const optionsHtml = section.options.map(opt => `
    <label class="privacy__radio flex items-center gap-2 text-sm cursor-pointer leading-normal" style="color:var(--color-text-body, #333333)">
      <input type="radio" name="privacy-${section.id}" value="${opt.value}" class="m-0 flex-shrink-0" style="accent-color:var(--color-primary-500, #cc9900)" ${opt.value === section.selected ? 'checked' : ''} />
      <span class="flex-1">${opt.label}</span>
      ${opt.tooltip ? `<span class="inline-flex items-center justify-center w-4 h-4 rounded-full border border-gray-300 text-[10px] cursor-help flex-shrink-0" style="color:var(--color-text-placeholder, #999999)" title="Daha fazla bilgi">?</span>` : ''}
    </label>
  `).join('');

  return `
    <div>
      <h3 class="text-sm font-bold mb-3 m-0 flex items-center gap-1.5" style="color:var(--color-text-heading, #111827)">
        ${section.title}
        ${section.tooltip ? `<span class="inline-flex items-center justify-center w-4 h-4 rounded-full border border-gray-300 text-[10px] cursor-help flex-shrink-0" style="color:var(--color-text-placeholder, #999999)" title="Daha fazla bilgi">?</span>` : ''}
      </h3>
      <div class="flex flex-col gap-2 pl-1">
        ${optionsHtml}
      </div>
    </div>
  `;
}

export function SettingsPrivacy(sections?: PrivacySection[]): string {
  const items = sections || defaultSections;

  return `
    <div class="bg-white rounded-lg p-8 max-md:p-5">
      <h2 class="text-xl font-bold m-0" style="color:var(--color-text-heading, #111827)">Gizlilik Ayarları</h2>
      <div class="h-px bg-gray-200 mt-4 mb-6"></div>
      <div class="flex flex-col gap-7">
        ${items.map(renderPrivacySection).join('')}
      </div>
      <div class="mt-8">
        <button class="privacy__save-btn py-2.5 px-7 border-none rounded text-sm font-semibold cursor-pointer transition-colors text-white hover:opacity-90 disabled:opacity-60 disabled:cursor-default" style="background:var(--color-cta-primary, #cc9900)" type="button">Kaydet</button>
      </div>
    </div>
  `;
}

const PRIVACY_STORAGE_KEY = 'tradehub_privacy_settings';

function readPrivacyData(): Record<string, string> {
  try {
    const raw = localStorage.getItem(PRIVACY_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return {};
}

function savePrivacyData(data: Record<string, string>): void {
  localStorage.setItem(PRIVACY_STORAGE_KEY, JSON.stringify(data));
}

export function initSettingsPrivacy(): void {
  const saved = readPrivacyData();
  for (const [name, value] of Object.entries(saved)) {
    const radio = document.querySelector<HTMLInputElement>(`input[name="${name}"][value="${value}"]`);
    if (radio) radio.checked = true;
  }

  const saveBtn = document.querySelector<HTMLButtonElement>('.privacy__save-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const data: Record<string, string> = {};
      document.querySelectorAll<HTMLInputElement>('.privacy__radio input[type="radio"]:checked').forEach(r => {
        if (r.name) data[r.name] = r.value;
      });
      savePrivacyData(data);

      saveBtn.textContent = 'Kaydedildi!';
      saveBtn.disabled = true;
      setTimeout(() => {
        saveBtn.textContent = 'Kaydet';
        saveBtn.disabled = false;
      }, 2000);
    });
  }
}
