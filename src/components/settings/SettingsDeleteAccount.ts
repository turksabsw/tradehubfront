/**
 * SettingsDeleteAccount Component
 * Multi-step account deletion flow.
 */

const STORAGE_KEY = 'tradehub_account_data';

function readEmail(): string {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw).email || 'met***@gmail.com';
  } catch { /* ignore */ }
  return 'met***@gmail.com';
}

const ICONS = {
  warning: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/><path d="M24 14v12M24 30v2" stroke="#ef4444" stroke-width="3" stroke-linecap="round"/></svg>`,
  trash: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M8 5V3h4v2M5 5v12a2 2 0 002 2h6a2 2 0 002-2V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 9v6M12 9v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  check: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" fill="#f3f4f6"/><path d="M14 24l7 7 13-13" stroke="#6b7280" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

const DELETE_REASONS = [
  'Artık bu platformu kullanmıyorum',
  'Başka bir platform kullanıyorum',
  'Gizlilik endişelerim var',
  'Çok fazla e-posta alıyorum',
  'Hesabımda sorun yaşıyorum',
  'Diğer',
];

function renderStep1(): string {
  return `
    <div class="del-acc__step mb-4" id="del-step-1">
      <div class="bg-white border border-border-default rounded-xl p-8 max-sm:p-6">
        <div class="text-center mb-4">${ICONS.warning}</div>
        <h2 class="text-lg font-bold mb-2 text-center" style="color:var(--color-text-heading, #111827)">Hesabınızı silmek istediğinizden emin misiniz?</h2>
        <p class="text-sm leading-normal mb-4 text-center" style="color:var(--color-text-muted, #666666)">Hesabınızı sildiğinizde aşağıdakiler kalıcı olarak kaldırılacaktır:</p>
        <ul class="list-none p-0 m-0 mb-5 flex flex-col gap-2.5">
          <li class="text-sm leading-normal pl-6 relative" style="color:var(--color-text-body, #333333)"><span class="absolute left-1 top-[7px] w-2 h-2 bg-red-500 rounded-full"></span>Tüm profil bilgileriniz ve kişisel verileriniz</li>
          <li class="text-sm leading-normal pl-6 relative" style="color:var(--color-text-body, #333333)"><span class="absolute left-1 top-[7px] w-2 h-2 bg-red-500 rounded-full"></span>Sipariş geçmişiniz ve faturalarınız</li>
          <li class="text-sm leading-normal pl-6 relative" style="color:var(--color-text-body, #333333)"><span class="absolute left-1 top-[7px] w-2 h-2 bg-red-500 rounded-full"></span>Favori listeleriniz ve kayıtlı aramalarınız</li>
          <li class="text-sm leading-normal pl-6 relative" style="color:var(--color-text-body, #333333)"><span class="absolute left-1 top-[7px] w-2 h-2 bg-red-500 rounded-full"></span>Mesaj geçmişiniz ve teklif talepleriniz</li>
          <li class="text-sm leading-normal pl-6 relative" style="color:var(--color-text-body, #333333)"><span class="absolute left-1 top-[7px] w-2 h-2 bg-red-500 rounded-full"></span>Bağlı hesaplarınız ve oturum bilgileriniz</li>
        </ul>
        <div class="bg-red-50 border border-red-200 rounded-lg py-3.5 px-4 text-[13px] text-red-900 leading-normal mb-6">
          <strong>Bu işlem geri alınamaz.</strong> Hesabınız silindikten sonra verilerinizi kurtarmak mümkün olmayacaktır.
        </div>
        <div class="mb-5">
          <label class="block text-[13px] font-semibold mb-2" style="color:var(--color-text-body, #333333)">Ayrılma nedeninizi seçin</label>
          <select class="w-full py-2.5 px-3 border border-gray-300 rounded-lg text-sm bg-white cursor-pointer focus:outline-none focus:border-primary-500" style="color:var(--color-text-heading, #111827)" id="del-reason">
            <option value="">Bir neden seçin...</option>
            ${DELETE_REASONS.map(r => `<option value="${r}">${r}</option>`).join('')}
          </select>
          <textarea class="w-full mt-2.5 py-2.5 px-3 border border-gray-300 rounded-lg text-sm resize-y font-[inherit] focus:outline-none focus:border-primary-500" style="color:var(--color-text-heading, #111827)" id="del-reason-other" placeholder="Lütfen nedeninizi açıklayın..." style="display:none" rows="3"></textarea>
        </div>
        <p class="text-[13px] text-red-600 mb-3" id="del-error-1" style="display:none"></p>
        <div class="flex flex-col gap-3 items-center">
          <button class="inline-flex items-center justify-center py-3 px-6 rounded-lg text-sm font-semibold cursor-pointer border-none transition-all min-w-[200px] text-center text-white bg-red-600 hover:bg-red-700 max-sm:min-w-full" type="button" id="del-continue">Hesabımı silmek istiyorum</button>
          <a href="#" class="inline-flex items-center justify-center py-3 px-6 rounded-lg text-sm font-semibold cursor-pointer border border-gray-300 transition-all min-w-[200px] text-center no-underline bg-transparent hover:bg-surface-muted max-sm:min-w-full" style="color:var(--color-text-muted, #666666)">Vazgeç</a>
        </div>
      </div>
    </div>
  `;
}

function renderStep2(email: string): string {
  return `
    <div class="del-acc__step mb-4" id="del-step-2" style="display:none">
      <div class="bg-white border border-border-default rounded-xl p-8 max-sm:p-6">
        <h2 class="text-lg font-bold mb-2 text-center" style="color:var(--color-text-heading, #111827)">Kimliğinizi doğrulayın</h2>
        <p class="text-sm leading-normal mb-4 text-center" style="color:var(--color-text-muted, #666666)">Hesabınızı silmek için <strong>${email}</strong> adresine gönderilen doğrulama kodunu girin.</p>
        <div class="flex items-center gap-3 mb-4 max-w-[320px] mx-auto">
          <input type="text" class="flex-1 py-2.5 px-3 border border-gray-300 rounded-lg text-base text-center tracking-widest focus:outline-none focus:border-primary-500" id="del-verify-code" maxlength="6" placeholder="6 haneli kod" />
          <span class="py-1.5 px-3 bg-red-50 rounded text-[13px] font-semibold text-red-600 whitespace-nowrap" id="del-timer">60 s</span>
        </div>
        <p class="text-[13px] text-red-600 mb-3" id="del-error-2" style="display:none"></p>
        <div class="flex flex-col gap-3 items-center">
          <button class="inline-flex items-center justify-center py-3 px-6 rounded-lg text-sm font-semibold cursor-pointer border-none transition-all min-w-[200px] text-center text-white bg-red-600 hover:bg-red-700 max-sm:min-w-full" type="button" id="del-verify">Doğrula ve devam et</button>
          <a href="#" class="inline-flex items-center justify-center py-3 px-6 rounded-lg text-sm font-semibold cursor-pointer border border-gray-300 transition-all min-w-[200px] text-center no-underline bg-transparent hover:bg-surface-muted max-sm:min-w-full" style="color:var(--color-text-muted, #666666)">Vazgeç</a>
        </div>
      </div>
    </div>
  `;
}

function renderStep3(): string {
  return `
    <div class="del-acc__step mb-4" id="del-step-3" style="display:none">
      <div class="bg-white border border-border-default rounded-xl p-8 max-sm:p-6">
        <h2 class="text-lg font-bold mb-2 text-center text-red-600">Son onay</h2>
        <p class="text-sm leading-normal mb-4 text-center" style="color:var(--color-text-muted, #666666)">Hesabınızı kalıcı olarak silmek için aşağıdaki kutuyu işaretleyin ve "Hesabımı sil" butonuna tıklayın.</p>
        <label class="del-acc__confirm-check flex items-start gap-2.5 p-4 bg-red-50 border border-red-200 rounded-lg mb-5 cursor-pointer text-sm leading-normal" style="color:var(--color-text-body, #333333)">
          <input type="checkbox" class="w-[18px] h-[18px] mt-0.5 flex-shrink-0 cursor-pointer" style="accent-color:#dc2626" id="del-confirm-checkbox" />
          <span>Hesabımın ve tüm verilerimin kalıcı olarak silineceğini anlıyorum ve onaylıyorum.</span>
        </label>
        <p class="text-[13px] text-red-600 mb-3" id="del-error-3" style="display:none"></p>
        <div class="flex flex-col gap-3 items-center">
          <button class="inline-flex items-center justify-center py-3 px-6 rounded-lg text-sm font-semibold cursor-pointer border-none transition-all min-w-[200px] text-center text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed max-sm:min-w-full" type="button" id="del-final" disabled>Hesabımı sil</button>
          <a href="#" class="inline-flex items-center justify-center py-3 px-6 rounded-lg text-sm font-semibold cursor-pointer border border-gray-300 transition-all min-w-[200px] text-center no-underline bg-transparent hover:bg-surface-muted max-sm:min-w-full" style="color:var(--color-text-muted, #666666)">Vazgeç</a>
        </div>
      </div>
    </div>
  `;
}

function renderStep4(): string {
  return `
    <div class="del-acc__step mb-4" id="del-step-4" style="display:none">
      <div class="bg-white border border-border-default rounded-xl p-8 text-center flex flex-col items-center max-sm:p-6">
        ${ICONS.check}
        <h2 class="text-lg font-bold mb-2 mt-4" style="color:var(--color-text-heading, #111827)">Hesabınız silindi</h2>
        <p class="text-sm leading-normal mb-4" style="color:var(--color-text-muted, #666666)">Hesabınız başarıyla silindi. 30 gün içinde giriş yaparak hesabınızı tekrar aktif edebilirsiniz.</p>
        <div class="flex flex-col gap-3 items-center">
          <a href="/login.html" class="inline-flex items-center justify-center py-3 px-6 rounded-lg text-sm font-semibold cursor-pointer border-none transition-all min-w-[200px] text-center text-white no-underline" style="background:var(--color-cta-primary, #cc9900)">Giriş sayfasına git</a>
        </div>
      </div>
    </div>
  `;
}

export function SettingsDeleteAccount(): string {
  const email = readEmail();
  return `
    <div class="max-w-[600px]">
      <h2 class="text-lg font-bold mb-6 flex items-center gap-2" style="color:var(--color-text-heading, #111827)">${ICONS.trash} Hesabı sil</h2>
      ${renderStep1()}
      ${renderStep2(email)}
      ${renderStep3()}
      ${renderStep4()}
    </div>
  `;
}

export function initSettingsDeleteAccount(): void {
  const reasonSelect = document.getElementById('del-reason') as HTMLSelectElement | null;
  const reasonOther = document.getElementById('del-reason-other') as HTMLTextAreaElement | null;
  if (reasonSelect && reasonOther) {
    reasonSelect.addEventListener('change', () => {
      reasonOther.style.display = reasonSelect.value === 'Diğer' ? '' : 'none';
    });
  }

  const continueBtn = document.getElementById('del-continue');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      const errorEl = document.getElementById('del-error-1')!;
      if (!reasonSelect || !reasonSelect.value) {
        errorEl.textContent = 'Lütfen bir ayrılma nedeni seçin.';
        errorEl.style.display = '';
        return;
      }
      errorEl.style.display = 'none';
      document.getElementById('del-step-1')!.style.display = 'none';
      document.getElementById('del-step-2')!.style.display = '';
      startTimer();
    });
  }

  let timerInterval: ReturnType<typeof setInterval> | null = null;
  function startTimer() {
    let countdown = 60;
    const timerEl = document.getElementById('del-timer');
    if (!timerEl) return;
    timerEl.textContent = `${countdown} s`;
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      countdown--;
      timerEl.textContent = `${countdown} s`;
      if (countdown <= 0 && timerInterval) {
        clearInterval(timerInterval);
        timerEl.textContent = '';
      }
    }, 1000);
  }

  const verifyBtn = document.getElementById('del-verify');
  if (verifyBtn) {
    verifyBtn.addEventListener('click', () => {
      const codeInput = document.getElementById('del-verify-code') as HTMLInputElement;
      const errorEl = document.getElementById('del-error-2')!;
      if (!codeInput.value.trim() || codeInput.value.length < 6) {
        errorEl.textContent = 'Geçerli bir doğrulama kodu girin.';
        errorEl.style.display = '';
        return;
      }
      if (timerInterval) clearInterval(timerInterval);
      errorEl.style.display = 'none';
      document.getElementById('del-step-2')!.style.display = 'none';
      document.getElementById('del-step-3')!.style.display = '';
    });
  }

  const confirmCheckbox = document.getElementById('del-confirm-checkbox') as HTMLInputElement | null;
  const finalBtn = document.getElementById('del-final') as HTMLButtonElement | null;
  if (confirmCheckbox && finalBtn) {
    confirmCheckbox.addEventListener('change', () => {
      finalBtn.disabled = !confirmCheckbox.checked;
    });
  }

  if (finalBtn) {
    finalBtn.addEventListener('click', () => {
      localStorage.removeItem(STORAGE_KEY);
      document.getElementById('del-step-3')!.style.display = 'none';
      document.getElementById('del-step-4')!.style.display = '';
    });
  }
}
