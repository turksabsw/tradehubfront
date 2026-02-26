/**
 * SettingsChangePassword Component
 * Multi-step password change flow.
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
    <div class="flex items-center justify-center mb-8">
      ${steps.map((s, i) => {
        const isActive = s.num === activeStep;
        const isDone = s.num < activeStep;
        const icon = isDone ? ICONS.checkActive : s.isLast ? ICONS.check : `<span class="flex items-center justify-center w-7 h-7 rounded-full text-[13px] font-semibold ${isActive ? 'text-white' : ''}" style="background:${isActive ? 'var(--stepper-active-bg, #cc9900)' : '#e5e7eb'}; color:${isActive ? '#fff' : 'var(--color-text-muted, #666666)'}">${s.num}</span>`;
        const line = i < steps.length - 1 ? `<div class="w-[120px] h-0.5 -mx-2 mb-6 max-md:w-[60px]" style="background:${isDone ? '#22c55e' : '#e5e7eb'}"></div>` : '';
        return `
          <div class="flex flex-col items-center gap-2 min-w-[100px]">
            ${icon}
            <span class="text-xs whitespace-nowrap" style="color:${isDone ? '#22c55e' : isActive ? 'var(--color-primary-500, #cc9900)' : 'var(--color-text-placeholder, #999999)'}; font-weight:${isActive || isDone ? '600' : '400'}">${s.label}</span>
          </div>
          ${line}
        `;
      }).join('')}
    </div>
  `;
}

function renderStep1(email: string): string {
  return `
    <div id="pw-step-1">
      ${renderStepper(1)}
      <div class="max-w-[640px] mx-auto">
        <div class="flex items-center gap-2.5 py-3 px-4 bg-blue-50 rounded-md text-[13px] text-blue-800 mb-6">
          ${ICONS.info}
          <span>Hesabınızı korumak için lütfen doğrulama işlemini tamamlayın.</span>
        </div>
        <div class="flex items-center gap-3 mb-4 text-sm max-md:flex-col max-md:items-start max-md:gap-1.5">
          <span class="min-w-[120px] text-right font-semibold max-md:min-w-0 max-md:text-left" style="color:var(--color-text-muted, #666666)">E-posta adresi:</span>
          <span style="color:var(--color-text-heading, #111827)">${email}</span>
        </div>
        <div class="flex items-center gap-3 mb-4 text-sm max-md:flex-col max-md:items-start max-md:gap-1.5">
          <span class="min-w-[120px] text-right font-semibold max-md:min-w-0 max-md:text-left" style="color:var(--color-text-muted, #666666)">Doğrulama Kodu:</span>
          <div class="flex items-center gap-3">
            <input type="text" class="py-2 px-3 border border-gray-300 rounded-md text-sm w-[160px] outline-none focus:border-primary-500" id="pw-verify-code" maxlength="6" placeholder="6 haneli kod" />
            <span class="py-1.5 px-3 border border-primary-500 rounded text-[13px] font-semibold whitespace-nowrap" style="color:var(--color-primary-500, #cc9900)" id="pw-timer">60 s</span>
          </div>
        </div>
        <p class="text-xs text-green-500 mt-2 mb-3 pl-[132px] max-md:pl-0">E-postanıza yeni bir doğrulama kodu gönderildi ve 30 dakika geçerli olacak. Lütfen bu kodu başkalarıyla paylaşmayın.</p>
        <p class="text-[13px] mb-5 pl-[132px] max-md:pl-0" style="color:var(--color-text-body, #333333)">Doğrulama kodu gelmedi mi? <a href="#" class="text-blue-600 no-underline hover:underline" id="pw-resend">Buraya tıklayın.</a></p>
        <div class="flex items-center gap-4 pl-[132px] max-md:pl-0">
          <button class="py-2.5 px-9 rounded text-sm font-semibold border-none cursor-pointer transition-all text-white" style="background:var(--color-cta-primary, #cc9900)" type="button" id="pw-verify-submit">Gönder</button>
          <a href="#" class="text-[13px] text-green-500 no-underline font-medium hover:underline">Farklı bir doğrulama yöntemi deneyin</a>
        </div>
      </div>
    </div>
  `;
}

function renderStep2(): string {
  return `
    <div id="pw-step-2" style="display:none">
      ${renderStepper(2)}
      <div class="max-w-[640px] mx-auto">
        <h3 class="text-base font-bold mb-5 m-0" style="color:var(--color-text-heading, #111827)">Yeni parolanızı belirleyin</h3>
        <div class="mb-4">
          <label class="block text-[13px] font-medium mb-1.5" style="color:var(--color-text-muted, #666666)">Yeni Parola</label>
          <input type="password" class="w-full max-w-[360px] py-2.5 px-3.5 border border-gray-300 rounded-md text-sm outline-none focus:border-primary-500" id="pw-new" placeholder="En az 8 karakter" />
        </div>
        <div class="mb-4">
          <label class="block text-[13px] font-medium mb-1.5" style="color:var(--color-text-muted, #666666)">Yeni Parola (Tekrar)</label>
          <input type="password" class="w-full max-w-[360px] py-2.5 px-3.5 border border-gray-300 rounded-md text-sm outline-none focus:border-primary-500" id="pw-confirm" placeholder="Parolayı tekrar girin" />
        </div>
        <p class="text-[13px] text-red-500 mb-3" id="pw-error" style="display:none"></p>
        <div class="flex items-center gap-4">
          <button class="py-2.5 px-9 rounded text-sm font-semibold border-none cursor-pointer transition-all text-white" style="background:var(--color-cta-primary, #cc9900)" type="button" id="pw-save">Kaydet</button>
        </div>
      </div>
    </div>
  `;
}

function renderStep3(): string {
  return `
    <div id="pw-step-3" style="display:none">
      ${renderStepper(3)}
      <div class="max-w-[640px] mx-auto text-center">
        <div class="mb-4">${ICONS.checkActive}</div>
        <h3 class="text-lg font-bold mb-2 m-0" style="color:var(--color-text-heading, #111827)">Parolanız başarıyla değiştirildi!</h3>
        <p class="text-sm mb-6 m-0" style="color:var(--color-text-muted, #666666)">Yeni parolanızla giriş yapabilirsiniz.</p>
        <div class="flex items-center gap-4 justify-center">
          <a href="#" class="py-2.5 px-9 rounded text-sm font-semibold border-none cursor-pointer transition-all text-white no-underline" style="background:var(--color-cta-primary, #cc9900)">Hesap ayarlarına dön</a>
        </div>
      </div>
    </div>
  `;
}

export function SettingsChangePassword(): string {
  const email = readEmail();
  return `
    <div class="bg-white rounded-lg p-8 max-md:p-5">
      <h2 class="text-xl font-bold mb-7 m-0" style="color:var(--color-text-heading, #111827)">Kimlik doğrulama</h2>
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

  const resendLink = document.getElementById('pw-resend');
  if (resendLink) {
    resendLink.addEventListener('click', (e) => {
      e.preventDefault();
      startTimer();
    });
  }

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

      document.getElementById('pw-step-2')!.style.display = 'none';
      document.getElementById('pw-step-3')!.style.display = '';
    });
  }
}
