/**
 * SettingsChangeEmail Component
 * Multi-step email change flow.
 * Uses Alpine.js x-data="settingsChangeEmail" for step navigation and form state.
 */

const STORAGE_KEY = 'tradehub_account_data';

function readEmail(): string {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw).email || 'met***@gmail.com';
  } catch { /* ignore */ }
  return 'met***@gmail.com';
}

export function SettingsChangeEmail(): string {
  const email = readEmail();
  return `
    <div class="flex justify-center" x-data="settingsChangeEmail">
      <div class="w-full max-w-[640px]">
        <div x-show="step === 1">
          <div class="bg-white rounded-xl p-10 shadow-sm max-sm:p-4">
            <h2 class="text-xl max-sm:text-lg font-bold mb-3 m-0 text-center" style="color:var(--color-text-heading, #111827)">Kimliğinizi doğrulayın</h2>
            <p class="text-sm text-center mb-2 m-0" style="color:var(--color-text-muted, #666666)">Şu e-posta adresine gönderdiğimiz doğrulama kodunu girin:</p>
            <p class="text-sm font-bold text-center mb-6 m-0 max-sm:break-all" style="color:var(--color-text-heading, #111827)">${email}</p>
            <div class="flex justify-center gap-2.5 max-sm:gap-1.5 mb-5" x-ref="codeBoxes" @input="handleCodeInput($event)" @keydown="handleCodeKeydown($event)">
              <input type="text" maxlength="1" class="email-change__code-box w-12 h-14 border-[1.5px] border-gray-300 rounded-lg text-center text-xl font-semibold outline-none transition-colors focus:border-(--color-text-heading) max-sm:w-9 max-sm:h-11 max-sm:text-base max-sm:rounded-md" data-idx="0" inputmode="numeric" />
              <input type="text" maxlength="1" class="email-change__code-box w-12 h-14 border-[1.5px] border-gray-300 rounded-lg text-center text-xl font-semibold outline-none transition-colors focus:border-(--color-text-heading) max-sm:w-9 max-sm:h-11 max-sm:text-base max-sm:rounded-md" data-idx="1" inputmode="numeric" />
              <input type="text" maxlength="1" class="email-change__code-box w-12 h-14 border-[1.5px] border-gray-300 rounded-lg text-center text-xl font-semibold outline-none transition-colors focus:border-(--color-text-heading) max-sm:w-9 max-sm:h-11 max-sm:text-base max-sm:rounded-md" data-idx="2" inputmode="numeric" />
              <input type="text" maxlength="1" class="email-change__code-box w-12 h-14 border-[1.5px] border-gray-300 rounded-lg text-center text-xl font-semibold outline-none transition-colors focus:border-(--color-text-heading) max-sm:w-9 max-sm:h-11 max-sm:text-base max-sm:rounded-md" data-idx="3" inputmode="numeric" />
              <input type="text" maxlength="1" class="email-change__code-box w-12 h-14 border-[1.5px] border-gray-300 rounded-lg text-center text-xl font-semibold outline-none transition-colors focus:border-(--color-text-heading) max-sm:w-9 max-sm:h-11 max-sm:text-base max-sm:rounded-md" data-idx="4" inputmode="numeric" />
              <input type="text" maxlength="1" class="email-change__code-box w-12 h-14 border-[1.5px] border-gray-300 rounded-lg text-center text-xl font-semibold outline-none transition-colors focus:border-(--color-text-heading) max-sm:w-9 max-sm:h-11 max-sm:text-base max-sm:rounded-md" data-idx="5" inputmode="numeric" />
            </div>
            <button class="block w-full max-w-[300px] mx-auto mb-4 py-2.5 border border-gray-300 rounded-3xl bg-none text-[13px] text-center cursor-default" style="color:var(--color-text-placeholder, #999999)" :disabled="countdown > 0" @click="resendCode()">
              <span x-show="countdown > 0">Kodu tekrar gönder (<span x-text="countdown"></span> sn)</span>
              <span x-show="countdown <= 0" x-cloak>Kodu tekrar gönder</span>
            </button>
            <a href="#" class="block text-center text-[13px] font-semibold underline mb-6" style="color:var(--color-text-heading, #111827)">Kimlik belgesiyle doğrulayın</a>
            <p class="text-xs text-right mt-6 m-0" style="color:var(--color-text-placeholder, #999999)">Müşteri hizmetleriyle iletişime geçin</p>
          </div>
        </div>

        <div x-show="step === 2" x-cloak>
          <div class="bg-white rounded-xl p-10 shadow-sm max-sm:p-4">
            <h2 class="text-xl max-sm:text-lg font-bold mb-3 m-0 text-center" style="color:var(--color-text-heading, #111827)">E-posta adresini güncelle</h2>
            <p class="text-sm text-center mb-2 m-0" style="color:var(--color-text-muted, #666666)">Doğrulama kodu almak için yeni e-posta adresinizi girin</p>
            <div class="mb-4">
              <label class="block text-xs mb-1" style="color:var(--color-text-placeholder, #999999)">Mevcut e-posta</label>
              <input type="email" class="w-full max-w-[320px] py-3 px-3.5 border-[1.5px] border-gray-300 rounded-lg text-sm outline-none bg-surface-raised" style="color:var(--color-text-muted, #666666)" value="${email}" readonly />
            </div>
            <div class="mb-4">
              <label class="block text-xs mb-1" style="color:var(--color-text-placeholder, #999999)">Yeni e-posta</label>
              <input type="email" class="w-full max-w-[320px] py-3 px-3.5 border-[1.5px] border-gray-300 rounded-lg text-sm outline-none focus:border-(--color-text-heading)" style="color:var(--color-text-heading, #111827)" x-ref="ecNewEmail" placeholder="" />
            </div>
            <p class="text-[13px] text-red-500 mb-3" x-show="error" x-text="error" x-cloak></p>
            <button class="w-full max-w-[320px] py-3 border-none rounded-lg text-sm font-semibold cursor-pointer transition-colors text-white" style="background:var(--color-cta-primary-light, #e6b212)" type="button" @click="submitEmail()">Devam</button>
            <p class="text-xs text-right mt-6 m-0" style="color:var(--color-text-placeholder, #999999)">Müşteri hizmetleriyle iletişime geçin</p>
          </div>
        </div>

        <div x-show="step === 3" x-cloak>
          <div class="bg-white rounded-xl p-10 shadow-sm text-center max-sm:p-4">
            <div class="mb-4">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" fill="#22c55e"/><path d="M14 24l7 7 13-13" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <h2 class="text-xl font-bold mb-3 m-0 text-center" style="color:var(--color-text-heading, #111827)">E-posta adresiniz güncellendi!</h2>
            <p class="text-sm text-center mb-2 m-0" style="color:var(--color-text-muted, #666666)">Yeni e-posta adresiniz kaydedildi.</p>
            <a href="#" class="block w-full max-w-[320px] mx-auto py-3 border-none rounded-lg text-sm font-semibold cursor-pointer transition-colors text-white text-center no-underline" style="background:var(--color-cta-primary-light, #e6b212)">Hesap ayarlarına dön</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

/** @deprecated No-op — Alpine handles all interactivity */
export function initSettingsChangeEmail(): void { /* no-op */ }
