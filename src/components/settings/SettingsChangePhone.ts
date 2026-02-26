/**
 * SettingsChangePhone Component
 * Phone number change with verification.
 * localStorage CRUD for phone update.
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
    <div class="phone-change__step" id="phone-step-1">
      <div class="phone-change__card">
        <h2 class="phone-change__card-title">Telefon numarasını değiştir</h2>
        <p class="phone-change__card-desc">Yeni telefon numaranızı girin. Doğrulama için SMS göndereceğiz.</p>
        <div class="phone-change__form-group">
          <label class="phone-change__form-label">Ülke Kodu</label>
          <input type="text" class="phone-change__form-input phone-change__form-input--short" id="phone-country" value="+90" placeholder="+90" />
        </div>
        <div class="phone-change__form-group">
          <label class="phone-change__form-label">Telefon Numarası</label>
          <input type="tel" class="phone-change__form-input" id="phone-number" placeholder="5XX XXX XX XX" />
        </div>
        <p class="phone-change__error" id="phone-error" style="display:none"></p>
        <button class="phone-change__submit-btn" type="button" id="phone-send-code">Doğrulama kodu gönder</button>
      </div>
    </div>
  `;
}

function renderVerifyStep(): string {
  return `
    <div class="phone-change__step" id="phone-step-2" style="display:none">
      <div class="phone-change__card">
        <h2 class="phone-change__card-title">Doğrulama kodunu girin</h2>
        <p class="phone-change__card-desc">Telefon numaranıza gönderilen 6 haneli kodu girin.</p>
        <div class="phone-change__code-group">
          <input type="text" class="phone-change__code-input" id="phone-verify-code" maxlength="6" placeholder="6 haneli kod" />
          <span class="phone-change__timer" id="phone-timer">60 s</span>
        </div>
        <p class="phone-change__error" id="phone-verify-error" style="display:none"></p>
        <button class="phone-change__submit-btn" type="button" id="phone-verify-submit">Doğrula</button>
      </div>
    </div>
  `;
}

function renderSuccessStep(): string {
  return `
    <div class="phone-change__step" id="phone-step-3" style="display:none">
      <div class="phone-change__card phone-change__card--center">
        <div class="phone-change__success-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" fill="#22c55e"/><path d="M14 24l7 7 13-13" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <h2 class="phone-change__card-title">Telefon numaranız güncellendi!</h2>
        <p class="phone-change__card-desc">Yeni telefon numaranız kaydedildi.</p>
        <a href="#" class="phone-change__submit-btn" style="text-align:center; text-decoration:none; display:block;">Hesap ayarlarına dön</a>
      </div>
    </div>
  `;
}

export function SettingsChangePhone(): string {
  return `
    <div class="phone-change">
      ${renderPhoneForm()}
      ${renderVerifyStep()}
      ${renderSuccessStep()}
    </div>
  `;
}

export function initSettingsChangePhone(): void {
  let savedCountry = '';
  let savedNumber = '';

  // Step 1 → Step 2
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

  // Step 2 → Step 3
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
