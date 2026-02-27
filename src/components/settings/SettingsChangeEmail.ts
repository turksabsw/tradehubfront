/**
 * SettingsChangeEmail Component
 * Multi-step email change flow.
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
    <div id="ec-step-1">
      <div class="bg-white rounded-xl p-10 shadow-sm max-sm:p-6">
        <h2 class="text-xl font-bold mb-3 m-0 text-center" style="color:var(--color-text-heading, #111827)">Kimliğinizi doğrulayın</h2>
        <p class="text-sm text-center mb-2 m-0" style="color:var(--color-text-muted, #666666)">Şu e-posta adresine gönderdiğimiz doğrulama kodunu girin:</p>
        <p class="text-sm font-bold text-center mb-6 m-0" style="color:var(--color-text-heading, #111827)">${email}</p>
        <div class="flex justify-center gap-2.5 mb-5" id="ec-code-boxes">
          <input type="text" maxlength="1" class="email-change__code-box w-12 h-14 border-[1.5px] border-gray-300 rounded-lg text-center text-xl font-semibold outline-none transition-colors focus:border-(--color-text-heading) max-sm:w-10 max-sm:h-12 max-sm:text-lg" data-idx="0" inputmode="numeric" />
          <input type="text" maxlength="1" class="email-change__code-box w-12 h-14 border-[1.5px] border-gray-300 rounded-lg text-center text-xl font-semibold outline-none transition-colors focus:border-(--color-text-heading) max-sm:w-10 max-sm:h-12 max-sm:text-lg" data-idx="1" inputmode="numeric" />
          <input type="text" maxlength="1" class="email-change__code-box w-12 h-14 border-[1.5px] border-gray-300 rounded-lg text-center text-xl font-semibold outline-none transition-colors focus:border-(--color-text-heading) max-sm:w-10 max-sm:h-12 max-sm:text-lg" data-idx="2" inputmode="numeric" />
          <input type="text" maxlength="1" class="email-change__code-box w-12 h-14 border-[1.5px] border-gray-300 rounded-lg text-center text-xl font-semibold outline-none transition-colors focus:border-(--color-text-heading) max-sm:w-10 max-sm:h-12 max-sm:text-lg" data-idx="3" inputmode="numeric" />
          <input type="text" maxlength="1" class="email-change__code-box w-12 h-14 border-[1.5px] border-gray-300 rounded-lg text-center text-xl font-semibold outline-none transition-colors focus:border-(--color-text-heading) max-sm:w-10 max-sm:h-12 max-sm:text-lg" data-idx="4" inputmode="numeric" />
          <input type="text" maxlength="1" class="email-change__code-box w-12 h-14 border-[1.5px] border-gray-300 rounded-lg text-center text-xl font-semibold outline-none transition-colors focus:border-(--color-text-heading) max-sm:w-10 max-sm:h-12 max-sm:text-lg" data-idx="5" inputmode="numeric" />
        </div>
        <button class="block w-full max-w-[300px] mx-auto mb-4 py-2.5 border border-gray-300 rounded-3xl bg-none text-[13px] text-center cursor-default" style="color:var(--color-text-placeholder, #999999)" id="ec-resend" disabled>Kodu tekrar gönder (<span id="ec-timer">59</span> sn)</button>
        <a href="#" class="block text-center text-[13px] font-semibold underline mb-6" style="color:var(--color-text-heading, #111827)">Kimlik belgesiyle doğrulayın</a>
        <p class="text-xs text-right mt-6 m-0" style="color:var(--color-text-placeholder, #999999)">Müşteri hizmetleriyle iletişime geçin</p>
      </div>
    </div>
  `;
}

function renderStep2(currentEmail: string): string {
  return `
    <div id="ec-step-2" style="display:none">
      <div class="bg-white rounded-xl p-10 shadow-sm max-sm:p-6">
        <h2 class="text-xl font-bold mb-3 m-0 text-center" style="color:var(--color-text-heading, #111827)">E-posta adresini güncelle</h2>
        <p class="text-sm text-center mb-2 m-0" style="color:var(--color-text-muted, #666666)">Doğrulama kodu almak için yeni e-posta adresinizi girin</p>
        <div class="mb-4">
          <label class="block text-xs mb-1" style="color:var(--color-text-placeholder, #999999)">Mevcut e-posta</label>
          <input type="email" class="w-full max-w-[320px] py-3 px-3.5 border-[1.5px] border-gray-300 rounded-lg text-sm outline-none bg-surface-raised" style="color:var(--color-text-muted, #666666)" value="${currentEmail}" readonly />
        </div>
        <div class="mb-4">
          <label class="block text-xs mb-1" style="color:var(--color-text-placeholder, #999999)">Yeni e-posta</label>
          <input type="email" class="w-full max-w-[320px] py-3 px-3.5 border-[1.5px] border-gray-300 rounded-lg text-sm outline-none focus:border-(--color-text-heading)" style="color:var(--color-text-heading, #111827)" id="ec-new-email" placeholder="" />
        </div>
        <p class="text-[13px] text-red-500 mb-3" id="ec-error" style="display:none"></p>
        <button class="w-full max-w-[320px] py-3 border-none rounded-lg text-sm font-semibold cursor-pointer transition-colors text-white" style="background:var(--color-cta-primary-light, #e6b212)" type="button" id="ec-submit">Devam</button>
        <p class="text-xs text-right mt-6 m-0" style="color:var(--color-text-placeholder, #999999)">Müşteri hizmetleriyle iletişime geçin</p>
      </div>
    </div>
  `;
}

function renderStep3(): string {
  return `
    <div id="ec-step-3" style="display:none">
      <div class="bg-white rounded-xl p-10 shadow-sm text-center max-sm:p-6">
        <div class="mb-4">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" fill="#22c55e"/><path d="M14 24l7 7 13-13" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <h2 class="text-xl font-bold mb-3 m-0 text-center" style="color:var(--color-text-heading, #111827)">E-posta adresiniz güncellendi!</h2>
        <p class="text-sm text-center mb-2 m-0" style="color:var(--color-text-muted, #666666)">Yeni e-posta adresiniz kaydedildi.</p>
        <a href="#" class="block w-full max-w-[320px] mx-auto py-3 border-none rounded-lg text-sm font-semibold cursor-pointer transition-colors text-white text-center no-underline" style="background:var(--color-cta-primary-light, #e6b212)">Hesap ayarlarına dön</a>
      </div>
    </div>
  `;
}

export function SettingsChangeEmail(): string {
  const email = readEmail();
  return `
    <div class="flex justify-center" id="ec-root">
      <div class="w-full max-w-[640px]">
        ${renderStep1(email)}
        ${renderStep2(email)}
        ${renderStep3()}
      </div>
    </div>
  `;
}

export function initSettingsChangeEmail(): void {
  let countdown = 59;
  let timerInterval: ReturnType<typeof setInterval> | null = null;

  const boxes = document.querySelectorAll<HTMLInputElement>('.email-change__code-box');
  boxes.forEach((box, i) => {
    box.addEventListener('input', () => {
      if (box.value.length === 1 && i < boxes.length - 1) {
        (boxes[i + 1] as HTMLInputElement).focus();
      }
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
