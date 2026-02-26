/**
 * SettingsChangeEmail Component
 * Multi-step email change flow:
 *   Step 1: Kimliğinizi doğrulayın (6-digit code to current email)
 *   Step 2: Yeni e-posta girin
 *   Step 3: Başarılı
 * localStorage CRUD for email update.
 */

const STORAGE_KEY = 'tradehub_account_data';

function readEmail(): string {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw).email || 'met***@gmail.com';
  } catch { /* ignore */ }
  return 'met***@gmail.com';
}

function saveEmail(newEmail: string): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : {};
    data.email = newEmail;
    data.emailVerified = false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* ignore */ }
}

function renderStep1(email: string): string {
  return `
    <div class="email-change__step" id="ec-step-1">
      <div class="email-change__card">
        <h2 class="email-change__card-title">Kimliğinizi doğrulayın</h2>
        <p class="email-change__card-desc">Şu e-posta adresine gönderdiğimiz doğrulama kodunu girin:</p>
        <p class="email-change__card-email">${email}</p>
        <div class="email-change__code-boxes" id="ec-code-boxes">
          <input type="text" maxlength="1" class="email-change__code-box" data-idx="0" inputmode="numeric" />
          <input type="text" maxlength="1" class="email-change__code-box" data-idx="1" inputmode="numeric" />
          <input type="text" maxlength="1" class="email-change__code-box" data-idx="2" inputmode="numeric" />
          <input type="text" maxlength="1" class="email-change__code-box" data-idx="3" inputmode="numeric" />
          <input type="text" maxlength="1" class="email-change__code-box" data-idx="4" inputmode="numeric" />
          <input type="text" maxlength="1" class="email-change__code-box" data-idx="5" inputmode="numeric" />
        </div>
        <button class="email-change__resend" id="ec-resend" disabled>Kodu tekrar gönder (<span id="ec-timer">59</span> sn)</button>
        <a href="#" class="email-change__alt-link">Kimlik belgesiyle doğrulayın</a>
        <p class="email-change__support">Müşteri hizmetleriyle iletişime geçin</p>
      </div>
    </div>
  `;
}

function renderStep2(currentEmail: string): string {
  return `
    <div class="email-change__step" id="ec-step-2" style="display:none">
      <div class="email-change__card">
        <h2 class="email-change__card-title">E-posta adresini güncelle</h2>
        <p class="email-change__card-desc">Doğrulama kodu almak için yeni e-posta adresinizi girin</p>
        <div class="email-change__form-group">
          <label class="email-change__form-label">Mevcut e-posta</label>
          <input type="email" class="email-change__form-input email-change__form-input--disabled" value="${currentEmail}" readonly />
        </div>
        <div class="email-change__form-group">
          <label class="email-change__form-label">Yeni e-posta</label>
          <input type="email" class="email-change__form-input" id="ec-new-email" placeholder="" />
        </div>
        <p class="email-change__error" id="ec-error" style="display:none"></p>
        <button class="email-change__submit-btn" type="button" id="ec-submit">Devam</button>
        <p class="email-change__support">Müşteri hizmetleriyle iletişime geçin</p>
      </div>
    </div>
  `;
}

function renderStep3(): string {
  return `
    <div class="email-change__step" id="ec-step-3" style="display:none">
      <div class="email-change__card email-change__card--center">
        <div class="email-change__success-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" fill="#22c55e"/><path d="M14 24l7 7 13-13" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <h2 class="email-change__card-title">E-posta adresiniz güncellendi!</h2>
        <p class="email-change__card-desc">Yeni e-posta adresiniz kaydedildi.</p>
        <a href="#" class="email-change__submit-btn" style="text-align:center; text-decoration:none; display:block;">Hesap ayarlarına dön</a>
      </div>
    </div>
  `;
}

export function SettingsChangeEmail(): string {
  const email = readEmail();
  return `
    <div class="email-change" id="ec-root">
      ${renderStep1(email)}
      ${renderStep2(email)}
      ${renderStep3()}
    </div>
  `;
}

export function initSettingsChangeEmail(): void {
  let countdown = 59;
  let timerInterval: ReturnType<typeof setInterval> | null = null;

  // Code box auto-advance
  const boxes = document.querySelectorAll<HTMLInputElement>('.email-change__code-box');
  boxes.forEach((box, i) => {
    box.addEventListener('input', () => {
      if (box.value.length === 1 && i < boxes.length - 1) {
        (boxes[i + 1] as HTMLInputElement).focus();
      }
      // Auto-submit when all filled
      const code = Array.from(boxes).map(b => b.value).join('');
      if (code.length === 6) {
        if (timerInterval) clearInterval(timerInterval);
        document.getElementById('ec-step-1')!.style.display = 'none';
        document.getElementById('ec-step-2')!.style.display = '';
      }
    });
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !box.value && i > 0) {
        (boxes[i - 1] as HTMLInputElement).focus();
      }
    });
  });

  // Timer
  function startTimer() {
    countdown = 59;
    const timerEl = document.getElementById('ec-timer');
    const resendBtn = document.getElementById('ec-resend') as HTMLButtonElement;
    if (!timerEl || !resendBtn) return;
    resendBtn.disabled = true;
    timerEl.textContent = String(countdown);
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      countdown--;
      timerEl.textContent = String(countdown);
      if (countdown <= 0) {
        if (timerInterval) clearInterval(timerInterval);
        resendBtn.disabled = false;
        resendBtn.textContent = 'Kodu tekrar gönder';
      }
    }, 1000);
  }
  startTimer();

  const resendBtn = document.getElementById('ec-resend');
  if (resendBtn) {
    resendBtn.addEventListener('click', () => startTimer());
  }

  // Step 2 submit
  const submitBtn = document.getElementById('ec-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const input = document.getElementById('ec-new-email') as HTMLInputElement;
      const errorEl = document.getElementById('ec-error')!;
      const val = input.value.trim();

      if (!val || !val.includes('@')) {
        errorEl.textContent = 'Geçerli bir e-posta adresi girin.';
        errorEl.style.display = '';
        return;
      }

      saveEmail(val);
      document.getElementById('ec-step-2')!.style.display = 'none';
      document.getElementById('ec-step-3')!.style.display = '';
    });
  }
}
