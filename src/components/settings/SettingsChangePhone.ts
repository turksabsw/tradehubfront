/**
 * SettingsChangePhone Component
 * Phone number change with verification.
 * Uses Alpine.js x-data="settingsChangePhone" for step navigation and form state.
 */

import { t } from '../../i18n';

export function SettingsChangePhone(): string {
  return `
    <div class="flex justify-center" x-data="settingsChangePhone">
      <div class="w-full max-w-[640px]">
        <div x-show="step === 1">
          <div class="bg-white rounded-xl p-10 shadow-sm max-sm:p-6">
            <h2 class="text-xl font-bold mb-3 m-0 text-center" style="color:var(--color-text-heading, #111827)">${t('settings.changePhone')}</h2>
            <p class="text-sm text-center mb-6 m-0" style="color:var(--color-text-muted, #666666)">${t('settings.changePhoneDesc')}</p>
            <div class="mb-4">
              <label class="block text-[13px] font-medium mb-1.5" style="color:var(--color-text-muted, #666666)">${t('settings.countryCode')}</label>
              <input type="text" class="w-full max-w-[120px] py-2.5 px-3.5 border-[1.5px] border-gray-300 rounded-lg text-sm outline-none focus:border-(--color-text-heading)" style="color:var(--color-text-heading, #111827)" x-model="countryCode" placeholder="+90" />
            </div>
            <div class="mb-4">
              <label class="block text-[13px] font-medium mb-1.5" style="color:var(--color-text-muted, #666666)">${t('settings.phoneNumber')}</label>
              <input type="tel" class="w-full max-w-[320px] py-2.5 px-3.5 border-[1.5px] border-gray-300 rounded-lg text-sm outline-none focus:border-(--color-text-heading)" style="color:var(--color-text-heading, #111827)" x-model="phoneNumber" placeholder="5XX XXX XX XX" />
            </div>
            <p class="text-[13px] text-red-500 mb-3" x-show="phoneError" x-text="phoneError" x-cloak></p>
            <button class="th-btn block w-full max-w-[320px] mx-auto" type="button" @click="sendCode()">${t('settings.sendVerificationCode')}</button>
          </div>
        </div>

        <div x-show="step === 2" x-cloak>
          <div class="bg-white rounded-xl p-10 shadow-sm max-sm:p-6">
            <h2 class="text-xl font-bold mb-3 m-0 text-center" style="color:var(--color-text-heading, #111827)">${t('settings.enterVerificationCode')}</h2>
            <p class="text-sm text-center mb-6 m-0" style="color:var(--color-text-muted, #666666)">${t('settings.enterCodeDesc')}</p>
            <div class="flex items-center justify-center gap-3 mb-5">
              <input type="text" class="py-2.5 px-3.5 border-[1.5px] border-gray-300 rounded-lg text-sm w-[180px] text-center outline-none focus:border-(--color-text-heading)" x-ref="phoneVerifyCode" maxlength="6" placeholder="${t('settings.sixDigitCode')}" />
              <span class="py-1.5 px-3 border border-primary-500 rounded text-[13px] font-semibold whitespace-nowrap" style="color:var(--color-primary-500, #cc9900)" x-text="countdown > 0 ? countdown + ' s' : ''"></span>
            </div>
            <p class="text-[13px] text-red-500 mb-3" x-show="verifyError" x-text="verifyError" x-cloak></p>
            <button class="th-btn block w-full max-w-[320px] mx-auto" type="button" @click="verify()">${t('settings.verify')}</button>
          </div>
        </div>

        <div x-show="step === 3" x-cloak>
          <div class="bg-white rounded-xl p-10 shadow-sm text-center max-sm:p-6">
            <div class="mb-4">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" fill="#22c55e"/><path d="M14 24l7 7 13-13" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <h2 class="text-xl font-bold mb-3 m-0" style="color:var(--color-text-heading, #111827)">${t('settings.phoneUpdated')}</h2>
            <p class="text-sm mb-2 m-0" style="color:var(--color-text-muted, #666666)">${t('settings.newPhoneSaved')}</p>
            <a href="#" class="th-btn block w-full max-w-[320px] mx-auto text-center no-underline">${t('settings.backToSettings')}</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

/** @deprecated No-op — Alpine handles all interactivity */
export function initSettingsChangePhone(): void { /* no-op */ }
