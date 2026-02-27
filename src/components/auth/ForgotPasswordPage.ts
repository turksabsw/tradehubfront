/**
 * ForgotPasswordPage Component
 * 3-step password reset flow:
 *   Step 1: "Hesabınızı bulun" — Email/username input
 *   Step 2: "Kimliğinizi doğrulayın" — 6-digit OTP verification
 *   Step 3: "Şifrenizi yenileyin" — New password with requirements
 *
 * Uses a minimal layout (logo header + centered card on gray bg),
 * matching the Alibaba forgot-password style.
 */

import { getBaseUrl } from './AuthLayout';

/* ── Types ──────────────────────────────────────────── */

export type ForgotPasswordStep = 'find-account' | 'verify-code' | 'reset-password';

export interface ForgotPasswordState {
  step: ForgotPasswordStep;
  email: string;
  otp: string[];
  countdownSeconds: number;
  countdownInterval: number | null;
  canResend: boolean;
}

/* ── Helper ─────────────────────────────────────────── */

function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return email;
  const [local, domain] = email.split('@');
  if (local.length <= 2) return `${local[0]}***@${domain}`;
  return `${local.slice(0, 3)}***@${domain}`;
}

const supportLink = `
  <a href="javascript:void(0)" class="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors">
    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/>
    </svg>
    Müşteri hizmetleriyle iletişime geçin
  </a>
`;

/* ── Layout ─────────────────────────────────────────── */

/** Minimal header with logo + language selector */
function ForgotPasswordHeader(): string {
  const baseUrl = getBaseUrl();
  return `
    <header class="bg-white border-b-2" style="border-color: var(--auth-header-border, #FF6600)">
      <div class="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
        <a href="${baseUrl}" aria-label="iSTOC Ana Sayfa">
          <img src="${baseUrl}images/istoc-logo.png" alt="iSTOC" class="h-7" />
        </a>
        <div class="relative">
          <select class="text-sm text-gray-600 border border-gray-300 rounded px-2 py-1 bg-white appearance-none pr-6 cursor-pointer auth-input-focus">
            <option>Türkçe</option>
            <option>English</option>
          </select>
          <svg class="w-3.5 h-3.5 absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m19 9-7 7-7-7"/></svg>
        </div>
      </div>
    </header>
  `;
}

/** Wrap step content in a centered card */
function ForgotPasswordCard(content: string): string {
  return `
    <div class="min-h-[calc(100vh-58px)] bg-gray-100 flex items-start justify-center pt-8 sm:pt-12 pb-12 px-2 sm:px-4">
      <div class="w-full max-w-xl bg-white rounded-xl shadow-sm p-5 sm:p-8 md:p-12">
        ${content}
      </div>
    </div>
  `;
}

/* ── Step 1: Hesabınızı bulun ───────────────────────── */

function StepFindAccount(): string {
  return `
    <div id="fp-step-find" class="fp-step">
      <h1 class="text-2xl font-bold text-gray-900 text-center mb-3">Hesabınızı bulun</h1>
      <p class="text-sm text-gray-500 text-center mb-8">Hesabınızla ilişkili e-postayı veya üye kimliğini girin</p>

      <form id="fp-find-form" class="space-y-5">
        <div>
          <label for="fp-email" class="sr-only">Kullanıcı Adı veya E-posta Adresi</label>
          <input
            type="text"
            id="fp-email"
            name="email"
            class="w-full h-12 px-4 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 auth-input-focus transition-colors"
            placeholder="Kullanıcı Adı veya E-posta Adresi"
            required
            autocomplete="email"
          />
        </div>

        <button
          type="submit"
          id="fp-find-submit"
          class="w-full h-12 auth-btn-primary font-bold rounded-full transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Devam
        </button>
      </form>

      <div class="mt-16 flex justify-end">
        ${supportLink}
      </div>
    </div>
  `;
}

/* ── Step 2: Kimliğinizi doğrulayın ─────────────────── */

function StepVerifyCode(): string {
  const otpInputs = Array.from({ length: 6 }, (_, i) => `
    <input
      type="text"
      inputmode="numeric"
      pattern="[0-9]*"
      maxlength="1"
      id="fp-otp-${i}"
      data-fp-otp-index="${i}"
      class="w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16 text-center text-lg sm:text-xl md:text-2xl font-bold
             rounded-lg border-2 border-gray-200
             bg-white text-gray-900
             auth-otp-focus
             transition-all duration-200 outline-none"
      placeholder=""
      autocomplete="one-time-code"
      aria-label="OTP hanesi ${i + 1}"
    />
  `).join('');

  return `
    <div id="fp-step-verify" class="fp-step hidden">
      <h1 class="text-2xl font-bold text-gray-900 text-center mb-3">Kimliğinizi doğrulayın</h1>
      <p class="text-sm text-gray-500 text-center mb-1">Şu e-posta adresine gönderdiğimiz doğrulama kodunu girin:</p>
      <p id="fp-masked-email" class="text-sm font-bold text-gray-900 text-center mb-8"></p>

      <!-- OTP Inputs -->
      <div id="fp-otp-container" class="flex justify-center gap-1.5 sm:gap-2 md:gap-3 mb-6">
        ${otpInputs}
      </div>

      <!-- OTP Error -->
      <p id="fp-otp-error" class="text-sm text-red-600 text-center mb-4 hidden">Geçersiz kod. Lütfen tekrar deneyin.</p>

      <!-- Resend -->
      <div class="text-center mb-6">
        <button
          type="button"
          id="fp-resend-btn"
          class="w-full h-12 border border-gray-300 rounded-full text-sm text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled
        >
          Kodu tekrar gönder <span id="fp-countdown">(60 sn)</span>
        </button>
      </div>

      <!-- ID Verification Link -->
      <div class="text-center mb-12">
        <a href="javascript:void(0)" class="text-sm font-medium text-gray-900 underline hover:no-underline">
          Kimlik belgesiyle doğrulayın
        </a>
      </div>

      <div class="flex justify-end">
        ${supportLink}
      </div>
    </div>
  `;
}

/* ── Step 3: Şifrenizi yenileyin ────────────────────── */

function StepResetPassword(): string {
  return `
    <div id="fp-step-reset" class="fp-step hidden">
      <h1 class="text-2xl font-bold text-gray-900 text-center mb-8">Şifrenizi yenileyin</h1>

      <form id="fp-reset-form" class="space-y-5">
        <!-- New Password -->
        <div class="relative">
          <label for="fp-new-password" class="sr-only">Yeni şifre</label>
          <input
            type="password"
            id="fp-new-password"
            name="new-password"
            class="w-full h-12 px-4 pr-12 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 auth-input-focus transition-colors"
            placeholder="Yeni şifre"
            required
            autocomplete="new-password"
          />
          <button
            type="button"
            id="fp-toggle-password"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Şifreyi göster/gizle"
          >
            <svg id="fp-eye-icon" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"/>
            </svg>
          </button>
        </div>

        <!-- Password Requirements -->
        <ul id="fp-password-requirements" class="space-y-1.5 text-sm text-gray-500 list-disc pl-5">
          <li id="fp-req-length" class="fp-req">Şifreniz 6 ile 20 karakter arasında olmalıdır</li>
          <li id="fp-req-chars" class="fp-req">Şifreniz harf, rakam ve özel karakterlerden en az ikisini içermelidir</li>
          <li id="fp-req-emoji" class="fp-req">Şifrenizde emoji ve benzeri semboller olmamalıdır</li>
        </ul>

        <!-- Submit -->
        <button
          type="submit"
          id="fp-reset-submit"
          class="w-full h-12 auth-btn-primary font-bold rounded-full transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed"
          disabled
        >
          Yenile ve giriş yap
        </button>
      </form>
    </div>
  `;
}

/* ── Main Component ─────────────────────────────────── */

/** Render the full forgot-password page */
export function ForgotPasswordPage(): string {
  return `
    <div id="forgot-password-page">
      ${ForgotPasswordHeader()}
      ${ForgotPasswordCard(`
        ${StepFindAccount()}
        ${StepVerifyCode()}
        ${StepResetPassword()}
      `)}
    </div>
  `;
}

/* ── Init Logic ─────────────────────────────────────── */

export function initForgotPasswordPage(): void {
  const state: ForgotPasswordState = {
    step: 'find-account',
    email: '',
    otp: ['', '', '', '', '', ''],
    countdownSeconds: 60,
    countdownInterval: null,
    canResend: false,
  };

  initStepFind(state);
  initStepVerify(state);
  initStepReset(state);
}

/* ── Step Navigation ────────────────────────────────── */

function goToStep(state: ForgotPasswordState, step: ForgotPasswordStep): void {
  state.step = step;

  // Hide all steps
  document.querySelectorAll('.fp-step').forEach(el => el.classList.add('hidden'));

  // Show target step
  const stepMap: Record<ForgotPasswordStep, string> = {
    'find-account': 'fp-step-find',
    'verify-code': 'fp-step-verify',
    'reset-password': 'fp-step-reset',
  };
  document.getElementById(stepMap[step])?.classList.remove('hidden');
}

/* ── Step 1 Init ────────────────────────────────────── */

function initStepFind(state: ForgotPasswordState): void {
  const form = document.getElementById('fp-find-form') as HTMLFormElement | null;
  const input = document.getElementById('fp-email') as HTMLInputElement | null;
  const submitBtn = document.getElementById('fp-find-submit') as HTMLButtonElement | null;

  // Enable/disable submit based on input
  if (input && submitBtn) {
    input.addEventListener('input', () => {
      submitBtn.disabled = !input.value.trim();
    });
    // Start disabled
    submitBtn.disabled = true;
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = input?.value.trim() || '';
      if (!email) return;

      state.email = email;

      // Update masked email display
      const maskedEl = document.getElementById('fp-masked-email');
      if (maskedEl) maskedEl.textContent = maskEmail(email);

      // Go to verify step
      goToStep(state, 'verify-code');
      startCountdown(state);

      // Focus first OTP input
      setTimeout(() => {
        (document.getElementById('fp-otp-0') as HTMLInputElement)?.focus();
      }, 100);
    });
  }
}

/* ── Step 2 Init ────────────────────────────────────── */

function initStepVerify(state: ForgotPasswordState): void {
  const otpInputs = document.querySelectorAll<HTMLInputElement>('[data-fp-otp-index]');
  const resendBtn = document.getElementById('fp-resend-btn') as HTMLButtonElement | null;
  const errorEl = document.getElementById('fp-otp-error');

  otpInputs.forEach((input, index) => {
    input.addEventListener('input', () => {
      const value = input.value.replace(/\D/g, '');
      if (value.length === 1) {
        state.otp[index] = value;
        input.value = value;
        // Auto-focus next
        if (index < 5) (otpInputs[index + 1] as HTMLInputElement)?.focus();
      } else {
        state.otp[index] = '';
        input.value = '';
      }

      errorEl?.classList.add('hidden');

      // Auto-proceed when all 6 digits entered
      if (state.otp.every(d => d !== '')) {
        // Simulate verification (in production, call API)
        setTimeout(() => {
          goToStep(state, 'reset-password');
          // Stop countdown
          if (state.countdownInterval) {
            clearInterval(state.countdownInterval);
            state.countdownInterval = null;
          }
          // Focus password input
          setTimeout(() => {
            (document.getElementById('fp-new-password') as HTMLInputElement)?.focus();
          }, 100);
        }, 300);
      }
    });

    // Paste support
    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasted = e.clipboardData?.getData('text') || '';
      const digits = pasted.replace(/\D/g, '').slice(0, 6);
      for (let i = 0; i < 6; i++) {
        state.otp[i] = digits[i] || '';
        const el = otpInputs[i] as HTMLInputElement;
        if (el) el.value = digits[i] || '';
      }
      if (digits.length > 0) {
        (otpInputs[Math.min(digits.length - 1, 5)] as HTMLInputElement)?.focus();
      }
      if (state.otp.every(d => d !== '')) {
        setTimeout(() => goToStep(state, 'reset-password'), 300);
      }
    });

    // Backspace → focus previous
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && index > 0) {
        (otpInputs[index - 1] as HTMLInputElement)?.focus();
      }
      if (e.key === 'ArrowLeft' && index > 0) {
        e.preventDefault();
        (otpInputs[index - 1] as HTMLInputElement)?.focus();
      }
      if (e.key === 'ArrowRight' && index < 5) {
        e.preventDefault();
        (otpInputs[index + 1] as HTMLInputElement)?.focus();
      }
    });

    input.addEventListener('focus', () => input.select());
  });

  // Resend button
  if (resendBtn) {
    resendBtn.addEventListener('click', () => {
      if (!state.canResend) return;
      // Reset OTP
      state.otp = ['', '', '', '', '', ''];
      otpInputs.forEach(i => { (i as HTMLInputElement).value = ''; });
      errorEl?.classList.add('hidden');
      startCountdown(state);
      (otpInputs[0] as HTMLInputElement)?.focus();
    });
  }
}

/* ── Step 3 Init ────────────────────────────────────── */

function initStepReset(_state: ForgotPasswordState): void {
  const form = document.getElementById('fp-reset-form') as HTMLFormElement | null;
  const passwordInput = document.getElementById('fp-new-password') as HTMLInputElement | null;
  const toggleBtn = document.getElementById('fp-toggle-password') as HTMLButtonElement | null;
  const submitBtn = document.getElementById('fp-reset-submit') as HTMLButtonElement | null;
  const reqLength = document.getElementById('fp-req-length');
  const reqChars = document.getElementById('fp-req-chars');
  const reqEmoji = document.getElementById('fp-req-emoji');

  // Toggle password visibility
  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      // Swap icon
      const icon = document.getElementById('fp-eye-icon');
      if (icon) {
        if (isPassword) {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>';
        } else {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"/>';
        }
      }
    });
  }

  // Validate password in real-time
  if (passwordInput) {
    passwordInput.addEventListener('input', () => {
      const pw = passwordInput.value;

      // Rule 1: 6-20 characters
      const lengthOk = pw.length >= 6 && pw.length <= 20;
      setReqState(reqLength, lengthOk, pw.length > 0);

      // Rule 2: At least 2 of: letters, digits, special chars
      const hasLetters = /[a-zA-Z]/.test(pw);
      const hasDigits = /[0-9]/.test(pw);
      const hasSpecial = /[^a-zA-Z0-9\s]/.test(pw);
      const typesCount = [hasLetters, hasDigits, hasSpecial].filter(Boolean).length;
      const charsOk = typesCount >= 2;
      setReqState(reqChars, charsOk, pw.length > 0);

      // Rule 3: No emoji
      const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
      const noEmoji = !emojiRegex.test(pw);
      setReqState(reqEmoji, noEmoji, pw.length > 0);

      // Enable/disable submit
      if (submitBtn) {
        submitBtn.disabled = !(lengthOk && charsOk && noEmoji);
      }
    });
  }

  // Submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const baseUrl = getBaseUrl();
      // Simulate success — redirect to login
      alert('Şifreniz başarıyla güncellendi!');
      window.location.href = `${baseUrl}login.html`;
    });
  }
}

function setReqState(el: HTMLElement | null, valid: boolean, touched: boolean): void {
  if (!el) return;
  if (!touched) {
    el.style.color = '';
    return;
  }
  el.style.color = valid ? '#16a34a' : '#dc2626';
}

/* ── Countdown ──────────────────────────────────────── */

function startCountdown(state: ForgotPasswordState): void {
  if (state.countdownInterval) clearInterval(state.countdownInterval);

  state.countdownSeconds = 60;
  state.canResend = false;

  const resendBtn = document.getElementById('fp-resend-btn') as HTMLButtonElement | null;
  const countdownSpan = document.getElementById('fp-countdown');

  updateCountdownUI(resendBtn, countdownSpan, state);

  state.countdownInterval = window.setInterval(() => {
    state.countdownSeconds--;
    if (state.countdownSeconds <= 0) {
      if (state.countdownInterval) {
        clearInterval(state.countdownInterval);
        state.countdownInterval = null;
      }
      state.canResend = true;
    }
    updateCountdownUI(resendBtn, countdownSpan, state);
  }, 1000);
}

function updateCountdownUI(
  btn: HTMLButtonElement | null,
  span: HTMLElement | null,
  state: ForgotPasswordState,
): void {
  if (btn) btn.disabled = !state.canResend;
  if (span) {
    if (state.canResend) {
      span.classList.add('hidden');
    } else {
      span.classList.remove('hidden');
      span.textContent = `(${state.countdownSeconds} sn)`;
    }
  }
}
