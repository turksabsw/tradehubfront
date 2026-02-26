/**
 * SettingsDeleteAccount Component
 * Multi-step account deletion flow:
 *   Step 1: Uyarı ve sebep seçimi
 *   Step 2: Kimlik doğrulama (e-posta kodu)
 *   Step 3: Son onay
 *   Step 4: Hesap silindi
 * localStorage CRUD for deletion.
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
    <div class="del-acc__step" id="del-step-1">
      <div class="del-acc__card">
        <div class="del-acc__warning-icon">${ICONS.warning}</div>
        <h2 class="del-acc__card-title">Hesabınızı silmek istediğinizden emin misiniz?</h2>
        <p class="del-acc__card-desc">Hesabınızı sildiğinizde aşağıdakiler kalıcı olarak kaldırılacaktır:</p>
        <ul class="del-acc__list">
          <li>Tüm profil bilgileriniz ve kişisel verileriniz</li>
          <li>Sipariş geçmişiniz ve faturalarınız</li>
          <li>Favori listeleriniz ve kayıtlı aramalarınız</li>
          <li>Mesaj geçmişiniz ve teklif talepleriniz</li>
          <li>Bağlı hesaplarınız ve oturum bilgileriniz</li>
        </ul>
        <div class="del-acc__alert">
          <strong>Bu işlem geri alınamaz.</strong> Hesabınız silindikten sonra verilerinizi kurtarmak mümkün olmayacaktır.
        </div>
        <div class="del-acc__reason">
          <label class="del-acc__reason-label">Ayrılma nedeninizi seçin</label>
          <select class="del-acc__reason-select" id="del-reason">
            <option value="">Bir neden seçin...</option>
            ${DELETE_REASONS.map(r => `<option value="${r}">${r}</option>`).join('')}
          </select>
          <textarea class="del-acc__reason-other" id="del-reason-other" placeholder="Lütfen nedeninizi açıklayın..." style="display:none" rows="3"></textarea>
        </div>
        <p class="del-acc__error" id="del-error-1" style="display:none"></p>
        <div class="del-acc__actions">
          <button class="del-acc__btn del-acc__btn--danger" type="button" id="del-continue">Hesabımı silmek istiyorum</button>
          <a href="#" class="del-acc__btn del-acc__btn--secondary">Vazgeç</a>
        </div>
      </div>
    </div>
  `;
}

function renderStep2(email: string): string {
  return `
    <div class="del-acc__step" id="del-step-2" style="display:none">
      <div class="del-acc__card">
        <h2 class="del-acc__card-title">Kimliğinizi doğrulayın</h2>
        <p class="del-acc__card-desc">Hesabınızı silmek için <strong>${email}</strong> adresine gönderilen doğrulama kodunu girin.</p>
        <div class="del-acc__code-group">
          <input type="text" class="del-acc__code-input" id="del-verify-code" maxlength="6" placeholder="6 haneli kod" />
          <span class="del-acc__timer" id="del-timer">60 s</span>
        </div>
        <p class="del-acc__error" id="del-error-2" style="display:none"></p>
        <div class="del-acc__actions">
          <button class="del-acc__btn del-acc__btn--danger" type="button" id="del-verify">Doğrula ve devam et</button>
          <a href="#" class="del-acc__btn del-acc__btn--secondary">Vazgeç</a>
        </div>
      </div>
    </div>
  `;
}

function renderStep3(): string {
  return `
    <div class="del-acc__step" id="del-step-3" style="display:none">
      <div class="del-acc__card">
        <h2 class="del-acc__card-title del-acc__card-title--danger">Son onay</h2>
        <p class="del-acc__card-desc">Hesabınızı kalıcı olarak silmek için aşağıdaki kutuyu işaretleyin ve "Hesabımı sil" butonuna tıklayın.</p>
        <label class="del-acc__confirm-check">
          <input type="checkbox" id="del-confirm-checkbox" />
          <span>Hesabımın ve tüm verilerimin kalıcı olarak silineceğini anlıyorum ve onaylıyorum.</span>
        </label>
        <p class="del-acc__error" id="del-error-3" style="display:none"></p>
        <div class="del-acc__actions">
          <button class="del-acc__btn del-acc__btn--danger" type="button" id="del-final" disabled>Hesabımı sil</button>
          <a href="#" class="del-acc__btn del-acc__btn--secondary">Vazgeç</a>
        </div>
      </div>
    </div>
  `;
}

function renderStep4(): string {
  return `
    <div class="del-acc__step" id="del-step-4" style="display:none">
      <div class="del-acc__card del-acc__card--center">
        ${ICONS.check}
        <h2 class="del-acc__card-title">Hesabınız silindi</h2>
        <p class="del-acc__card-desc">Hesabınız başarıyla silindi. 30 gün içinde giriş yaparak hesabınızı tekrar aktif edebilirsiniz.</p>
        <div class="del-acc__actions">
          <a href="/login.html" class="del-acc__btn del-acc__btn--primary">Giriş sayfasına git</a>
        </div>
      </div>
    </div>
  `;
}

export function SettingsDeleteAccount(): string {
  const email = readEmail();
  return `
    <div class="del-acc">
      <h2 class="del-acc__title">${ICONS.trash} Hesabı sil</h2>
      ${renderStep1()}
      ${renderStep2(email)}
      ${renderStep3()}
      ${renderStep4()}
    </div>
  `;
}

export function initSettingsDeleteAccount(): void {
  // Reason select → show textarea for "Diğer"
  const reasonSelect = document.getElementById('del-reason') as HTMLSelectElement | null;
  const reasonOther = document.getElementById('del-reason-other') as HTMLTextAreaElement | null;
  if (reasonSelect && reasonOther) {
    reasonSelect.addEventListener('change', () => {
      reasonOther.style.display = reasonSelect.value === 'Diğer' ? '' : 'none';
    });
  }

  // Step 1 → Step 2
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

  // Timer
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

  // Step 2 → Step 3
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

  // Step 3: checkbox → enable button
  const checkbox = document.getElementById('del-confirm-checkbox') as HTMLInputElement | null;
  const finalBtn = document.getElementById('del-final') as HTMLButtonElement | null;
  if (checkbox && finalBtn) {
    checkbox.addEventListener('change', () => {
      finalBtn.disabled = !checkbox.checked;
    });
  }

  // Step 3 → Step 4
  if (finalBtn) {
    finalBtn.addEventListener('click', () => {
      const errorEl = document.getElementById('del-error-3')!;
      if (!checkbox?.checked) {
        errorEl.textContent = 'Lütfen onay kutusunu işaretleyin.';
        errorEl.style.display = '';
        return;
      }
      // Save deletion to localStorage
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const data = raw ? JSON.parse(raw) : {};
        data.accountDeleted = true;
        data.accountDeletedAt = new Date().toISOString();
        data.deleteReason = reasonSelect?.value || '';
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch { /* ignore */ }

      document.getElementById('del-step-3')!.style.display = 'none';
      document.getElementById('del-step-4')!.style.display = '';
    });
  }
}
