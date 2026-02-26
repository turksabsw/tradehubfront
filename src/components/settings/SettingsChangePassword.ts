/**
 * SettingsChangePassword Component
 * Multi-step password change flow:
 *   Step 1: Kimlik Doğrulama (verification code to email)
 *   Step 2: Parola Değiştir (new password form)
 *   Step 3: Bitti (success)
 * localStorage CRUD for password (demo only).
 */

const STORAGE_KEY = 'tradehub_account_data';
const ICONS = {
  info: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#2563eb" stroke-width="1.2"/><path d="M8 7v4M8 5h0" stroke="#2563eb" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  check: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" fill="#e5e7eb"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  checkActive: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" fill="#22c55e"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

function readEmail(): string {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      return data.email || 'met***@gmail.com';
    }
  } catch { /* ignore */ }
  return 'met***@gmail.com';
}

function renderStepper(activeStep: number): string {
  const steps = [
    { num: 1, label: 'Kimlik Doğrulama' },
    { num: 2, label: 'Parola Değiştir' },
    { num: 3, label: 'Bitti', isLast: true },
  ];

  return `
    <div class="pw-stepper">
      ${steps.map((s, i) => {
        const isActive = s.num === activeStep;
        const isDone = s.num < activeStep;
        const cls = isDone ? 'pw-stepper__step--done' : isActive ? 'pw-stepper__step--active' : '';
        const icon = isDone ? ICONS.checkActive : s.isLast ? ICONS.check : `<span class="pw-stepper__num ${isActive ? 'pw-stepper__num--active' : ''}">${s.num}</span>`;
        const line = i < steps.length - 1 ? `<div class="pw-stepper__line ${isDone ? 'pw-stepper__line--done' : ''}"></div>` : '';
        return `
          <div class="pw-stepper__step ${cls}">
            ${icon}
            <span class="pw-stepper__label">${s.label}</span>
          </div>
          ${line}
        `;
      }).join('')}
    </div>
  `;
}

function renderStep1(email: string): string {
  return `
    <div class="pw-step" id="pw-step-1">
      ${renderStepper(1)}
      <div class="pw-card">
        <div class="pw-card__alert">
          ${ICONS.info}
          <span>Hesabınızı korumak için lütfen doğrulama işlemini tamamlayın.</span>
        </div>
        <div class="pw-card__row">
          <span class="pw-card__label">E-posta adresi:</span>
          <span class="pw-card__value">${email}</span>
        </div>
        <div class="pw-card__row">
          <span class="pw-card__label">Doğrulama Kodu:</span>
          <div class="pw-card__code-group">
            <input type="text" class="pw-card__code-input" id="pw-verify-code" maxlength="6" placeholder="6 haneli kod" />
            <span class="pw-card__timer" id="pw-timer">60 s</span>
          </div>
        </div>
        <p class="pw-card__hint">E-postanıza yeni bir doğrulama kodu gönderildi ve 30 dakika geçerli olacak. Lütfen bu kodu başkalarıyla paylaşmayın.</p>
        <p class="pw-card__resend">Doğrulama kodu gelmedi mi? <a href="#" id="pw-resend">Buraya tıklayın.</a></p>
        <div class="pw-card__actions">
          <button class="pw-card__btn pw-card__btn--primary" type="button" id="pw-verify-submit">Gönder</button>
          <a href="#" class="pw-card__alt-link">Farklı bir doğrulama yöntemi deneyin</a>
        </div>
      </div>
    </div>
  `;
}

function renderStep2(): string {
  return `
    <div class="pw-step" id="pw-step-2" style="display:none">
      ${renderStepper(2)}
      <div class="pw-card">
        <h3 class="pw-card__subtitle">Yeni parolanızı belirleyin</h3>
        <div class="pw-card__form-group">
          <label class="pw-card__form-label">Yeni Parola</label>
          <input type="password" class="pw-card__form-input" id="pw-new" placeholder="En az 8 karakter" />
        </div>
        <div class="pw-card__form-group">
          <label class="pw-card__form-label">Yeni Parola (Tekrar)</label>
          <input type="password" class="pw-card__form-input" id="pw-confirm" placeholder="Parolayı tekrar girin" />
        </div>
        <p class="pw-card__error" id="pw-error" style="display:none"></p>
        <div class="pw-card__actions">
          <button class="pw-card__btn pw-card__btn--primary" type="button" id="pw-save">Kaydet</button>
        </div>
      </div>
    </div>
  `;
}

function renderStep3(): string {
  return `
    <div class="pw-step" id="pw-step-3" style="display:none">
      ${renderStepper(3)}
      <div class="pw-card pw-card--center">
        <div class="pw-card__success-icon">${ICONS.checkActive}</div>
        <h3 class="pw-card__success-title">Parolanız başarıyla değiştirildi!</h3>
        <p class="pw-card__success-desc">Yeni parolanızla giriş yapabilirsiniz.</p>
        <div class="pw-card__actions">
          <a href="#" class="pw-card__btn pw-card__btn--primary">Hesap ayarlarına dön</a>
        </div>
      </div>
    </div>
  `;
}

export function SettingsChangePassword(): string {
  const email = readEmail();
  return `
    <div class="pw-change">
      <h2 class="pw-change__title">Kimlik doğrulama</h2>
      <div id="pw-steps-root">
        ${renderStep1(email)}
        ${renderStep2()}
        ${renderStep3()}
      </div>
    </div>
  `;
}

export function initSettingsChangePassword(): void {
  let timerInterval: ReturnType<typeof setInterval> | null = null;
  let countdown = 60;

  function startTimer() {
    countdown = 60;
    const timerEl = document.getElementById('pw-timer');
    if (!timerEl) return;
    timerEl.textContent = `${countdown} s`;
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      countdown--;
      if (timerEl) timerEl.textContent = `${countdown} s`;
      if (countdown <= 0 && timerInterval) {
        clearInterval(timerInterval);
        timerEl.textContent = '';
      }
    }, 1000);
  }

  startTimer();

  // Resend
  const resendLink = document.getElementById('pw-resend');
  if (resendLink) {
    resendLink.addEventListener('click', (e) => {
      e.preventDefault();
      startTimer();
    });
  }

  // Step 1 → Step 2
  const verifyBtn = document.getElementById('pw-verify-submit');
  if (verifyBtn) {
    verifyBtn.addEventListener('click', () => {
      const codeInput = document.getElementById('pw-verify-code') as HTMLInputElement;
      if (!codeInput.value.trim()) {
        codeInput.style.borderColor = '#ef4444';
        return;
      }
      if (timerInterval) clearInterval(timerInterval);
      document.getElementById('pw-step-1')!.style.display = 'none';
      document.getElementById('pw-step-2')!.style.display = '';
    });
  }

  // Step 2 → Step 3
  const saveBtn = document.getElementById('pw-save');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const newPw = (document.getElementById('pw-new') as HTMLInputElement).value;
      const confirmPw = (document.getElementById('pw-confirm') as HTMLInputElement).value;
      const errorEl = document.getElementById('pw-error')!;

      if (newPw.length < 8) {
        errorEl.textContent = 'Parola en az 8 karakter olmalıdır.';
        errorEl.style.display = '';
        return;
      }
      if (newPw !== confirmPw) {
        errorEl.textContent = 'Parolalar eşleşmiyor.';
        errorEl.style.display = '';
        return;
      }

      // Save to localStorage (demo)
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const data = raw ? JSON.parse(raw) : {};
        data.passwordChanged = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch { /* ignore */ }

      document.getElementById('pw-step-2')!.style.display = 'none';
      document.getElementById('pw-step-3')!.style.display = '';
    });
  }
}
