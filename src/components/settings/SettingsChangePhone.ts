/**
 * SettingsChangePhone Component
 * Phone number change with verification.
 */

const STORAGE_KEY = 'tradehub_account_data';

function savePhone(country: string, area: string, number: string): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : {};
    data.phoneCountry = country;
    data.phoneArea = area;
    data.phoneNumber = number;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* ignore */ }
}

function renderPhoneForm(): string {
  return `
    <div id="phone-step-1">
      <div class="bg-white rounded-xl p-10 shadow-sm max-sm:p-6">
        <h2 class="text-xl font-bold mb-3 m-0 text-center" style="color:var(--color-text-heading, #111827)">Telefon numarasını değiştir</h2>
        <p class="text-sm text-center mb-6 m-0" style="color:var(--color-text-muted, #666666)">Yeni telefon numaranızı girin. Doğrulama için SMS göndereceğiz.</p>
        <div class="mb-4">
          <label class="block text-[13px] font-medium mb-1.5" style="color:var(--color-text-muted, #666666)">Ülke Kodu</label>
          <input type="text" class="w-full max-w-[120px] py-2.5 px-3.5 border-[1.5px] border-gray-300 rounded-lg text-sm outline-none focus:border-[var(--color-text-heading)]" style="color:var(--color-text-heading, #111827)" id="phone-country" value="+90" placeholder="+90" />
        </div>
        <div class="mb-4">
          <label class="block text-[13px] font-medium mb-1.5" style="color:var(--color-text-muted, #666666)">Telefon Numarası</label>
          <input type="tel" class="w-full max-w-[320px] py-2.5 px-3.5 border-[1.5px] border-gray-300 rounded-lg text-sm outline-none focus:border-[var(--color-text-heading)]" style="color:var(--color-text-heading, #111827)" id="phone-number" placeholder="5XX XXX XX XX" />
        </div>
        <p class="text-[13px] text-red-500 mb-3" id="phone-error" style="display:none"></p>
        <button class="block w-full max-w-[320px] mx-auto py-3 border-none rounded-lg text-sm font-semibold cursor-pointer transition-colors text-white" style="background:var(--color-cta-primary, #cc9900)" type="button" id="phone-send-code">Doğrulama kodu gönder</button>
      </div>
    </div>
  `;
}

function renderVerifyStep(): string {
  return `
    <div id="phone-step-2" style="display:none">
      <div class="bg-white rounded-xl p-10 shadow-sm max-sm:p-6">
        <h2 class="text-xl font-bold mb-3 m-0 text-center" style="color:var(--color-text-heading, #111827)">Doğrulama kodunu girin</h2>
        <p class="text-sm text-center mb-6 m-0" style="color:var(--color-text-muted, #666666)">Telefon numaranıza gönderilen 6 haneli kodu girin.</p>
        <div class="flex items-center justify-center gap-3 mb-5">
          <input type="text" class="py-2.5 px-3.5 border-[1.5px] border-gray-300 rounded-lg text-sm w-[180px] text-center outline-none focus:border-[var(--color-text-heading)]" id="phone-verify-code" maxlength="6" placeholder="6 haneli kod" />
          <span class="py-1.5 px-3 border border-primary-500 rounded text-[13px] font-semibold whitespace-nowrap" style="color:var(--color-primary-500, #cc9900)" id="phone-timer">60 s</span>
        </div>
        <p class="text-[13px] text-red-500 mb-3" id="phone-verify-error" style="display:none"></p>
        <button class="block w-full max-w-[320px] mx-auto py-3 border-none rounded-lg text-sm font-semibold cursor-pointer transition-colors text-white" style="background:var(--color-cta-primary, #cc9900)" type="button" id="phone-verify-submit">Doğrula</button>
      </div>
    </div>
  `;
}

function renderSuccessStep(): string {
  return `
    <div id="phone-step-3" style="display:none">
      <div class="bg-white rounded-xl p-10 shadow-sm text-center max-sm:p-6">
        <div class="mb-4">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" fill="#22c55e"/><path d="M14 24l7 7 13-13" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <h2 class="text-xl font-bold mb-3 m-0" style="color:var(--color-text-heading, #111827)">Telefon numaranız güncellendi!</h2>
        <p class="text-sm mb-2 m-0" style="color:var(--color-text-muted, #666666)">Yeni telefon numaranız kaydedildi.</p>
        <a href="#" class="block w-full max-w-[320px] mx-auto py-3 border-none rounded-lg text-sm font-semibold cursor-pointer transition-colors text-white text-center no-underline" style="background:var(--color-cta-primary, #cc9900)">Hesap ayarlarına dön</a>
      </div>
    </div>
  `;
}

export function SettingsChangePhone(): string {
  return `
    <div class="flex justify-center">
      <div class="w-full max-w-[640px]">
        ${renderPhoneForm()}
        ${renderVerifyStep()}
        ${renderSuccessStep()}
      </div>
    </div>
  `;
}

export function initSettingsChangePhone(): void {
  let savedCountry = '';
  let savedNumber = '';

  const sendBtn = document.getElementById('phone-send-code');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const countryInput = document.getElementById('phone-country') as HTMLInputElement;
      const numberInput = document.getElementById('phone-number') as HTMLInputElement;
      const errorEl = document.getElementById('phone-error')!;
      const num = numberInput.value.trim();

      if (!num || num.length < 7) {
        errorEl.textContent = 'Geçerli bir telefon numarası girin.';
        errorEl.style.display = '';
        return;
      }

      savedCountry = countryInput.value.trim();
      savedNumber = num;

      document.getElementById('phone-step-1')!.style.display = 'none';
      document.getElementById('phone-step-2')!.style.display = '';
      startTimer();
    });
  }

  let timerInterval: ReturnType<typeof setInterval> | null = null;
  function startTimer() {
    let countdown = 60;
    const timerEl = document.getElementById('phone-timer');
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

  const verifyBtn = document.getElementById('phone-verify-submit');
  if (verifyBtn) {
    verifyBtn.addEventListener('click', () => {
      const codeInput = document.getElementById('phone-verify-code') as HTMLInputElement;
      const errorEl = document.getElementById('phone-verify-error')!;

      if (!codeInput.value.trim() || codeInput.value.length < 6) {
        errorEl.textContent = 'Geçerli bir doğrulama kodu girin.';
        errorEl.style.display = '';
        return;
      }

      if (timerInterval) clearInterval(timerInterval);
      savePhone(savedCountry, '', savedNumber);
      document.getElementById('phone-step-2')!.style.display = 'none';
      document.getElementById('phone-step-3')!.style.display = '';
    });
  }
}
