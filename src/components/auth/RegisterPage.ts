/**
 * RegisterPage Component
 * Multi-step registration flow with step management:
 * 1. Account type selection (Buyer/Supplier)
 * 2. Email input
 * 3. OTP verification
 * 4. Account setup form
 *
 * Uses Alpine.js x-data="registerPage" for step navigation.
 * Child components (AccountTypeSelector, EmailVerification, AccountSetupForm)
 * retain their own init logic, called from the Alpine component in alpine.ts.
 */

import { AccountTypeSelector, type AccountType } from './AccountTypeSelector';
import { type EmailVerificationState } from './EmailVerification';
import { type AccountSetupFormData } from './AccountSetupForm';
import { getBaseUrl } from './AuthLayout';

/* ── Helpers ────────────────────────────────────────── */

/** HTML-encode user input to prevent XSS when inserted via innerHTML */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ── Types ──────────────────────────────────────────── */

/** Registration flow steps */
export type RegisterStep = 'account-type' | 'email' | 'otp' | 'setup';

export interface RegisterPageOptions {
  /** Initial step (defaults to 'account-type') */
  initialStep?: RegisterStep;
  /** Callback when registration is completed */
  onComplete?: (data: RegisterPageData) => void;
  /** Callback when step changes */
  onStepChange?: (step: RegisterStep) => void;
  /** Callback when user wants to go to login */
  onLoginClick?: () => void;
}

export interface RegisterPageData {
  /** Selected account type */
  accountType: AccountType;
  /** User email address */
  email: string;
  /** Account setup form data */
  formData: AccountSetupFormData;
}

export interface RegisterPageState {
  /** Current step in the registration flow */
  currentStep: RegisterStep;
  /** Selected account type */
  accountType: AccountType | null;
  /** User's email address */
  email: string;
  /** OTP verification state */
  otpState: EmailVerificationState | null;
}

/* ── Component HTML ─────────────────────────────────── */

/**
 * RegisterPage Component
 * Renders the multi-step registration flow with Alpine.js step management.
 * Steps 1–2 are pre-rendered with x-show. Steps 3–4 use x-ref containers
 * populated dynamically when the step is activated (child components use
 * imperative init that expects fresh DOM elements each time).
 *
 * @param initialStep - Starting step (defaults to 'account-type')
 * @returns HTML string for the register page
 */
export function RegisterPage(initialStep: RegisterStep = 'account-type'): string {
  const baseUrl = getBaseUrl();

  return `
    <div id="register-page" class="w-full" x-data="registerPage" data-initial-step="${initialStep}">
      <!-- Step 1: Account Type Selection -->
      <div id="register-step-account-type" class="register-step"
        x-show="currentStep === 'account-type'"${initialStep !== 'account-type' ? ' x-cloak' : ''}>
        <!-- Header -->
        <div class="mb-6 text-center lg:text-left">
          <h1 class="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Hesap Oluştur
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Hesap türünüzü seçin
          </p>
        </div>

        <!-- Account Type Selector (child component) -->
        ${AccountTypeSelector('buyer')}

        <!-- Continue Button -->
        <button
          type="button"
          id="register-account-type-continue"
          @click="goToStep('email')"
          class="th-btn th-btn-pill w-full py-3 text-base font-semibold transition-all mt-6"
        >
          Devam Et
        </button>

        <!-- Login Link -->
        <div class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Zaten hesabınız var mı?
          <a href="${baseUrl}login.html" id="register-login-link" class="ml-1 font-medium text-orange-600 dark:text-orange-400 hover:underline">
            Giriş yapın
          </a>
        </div>
      </div>

      <!-- Step 2: Email Input -->
      <div id="register-step-email" class="register-step"
        x-show="currentStep === 'email'"${initialStep !== 'email' ? ' x-cloak' : ''}>
        <!-- Header -->
        <div class="mb-6 text-center lg:text-left">
          <h1 class="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            E-posta Adresiniz
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Doğrulama kodu göndereceğiz
          </p>
        </div>

        <!-- Email Input Form -->
        <form id="register-email-form" @submit.prevent="submitEmail()" class="space-y-4" novalidate>
          <div class="auth-form-field relative">
            <label for="register-email-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              E-posta
            </label>
            <input
              type="email"
              id="register-email-input"
              name="email"
              x-ref="emailInput"
              placeholder="ornek@email.com"
              autocomplete="email"
              @input="validateEmail()"
              class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 dark:focus:border-orange-400 transition-all"
              required
            />
            <p id="register-email-error" x-show="emailError" x-cloak class="mt-1 text-sm text-red-500">
              Geçerli bir e-posta adresi girin
            </p>
          </div>

          <!-- Continue Button -->
          <button
            type="submit"
            id="register-email-continue"
            :disabled="!emailValid"
            disabled
            class="th-btn th-btn-pill w-full py-3 text-base font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Doğrulama Kodu Gönder
          </button>
        </form>

        <!-- Back Button -->
        <div class="mt-4 text-center lg:text-left">
          <button
            type="button"
            id="register-email-back"
            @click="goToStep('account-type')"
            class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:underline transition-colors"
          >
            ← Hesap türü seçimine dön
          </button>
        </div>
      </div>

      <!-- Step 3: OTP Verification (dynamically rendered for child component re-init) -->
      <div id="register-step-otp" class="register-step"
        x-show="currentStep === 'otp'" x-cloak x-ref="otpContainer">
      </div>

      <!-- Step 4: Account Setup (dynamically rendered for child component re-init) -->
      <div id="register-step-setup" class="register-step"
        x-show="currentStep === 'setup'" x-cloak x-ref="setupContainer">
      </div>
    </div>
  `;
}

/* ── Init Logic (transitional bridge) ────────────────── */

/**
 * Initialize RegisterPage interactivity.
 * Transitional bridge: the Alpine.data('registerPage') component in alpine.ts
 * handles all step management. This bridge wires external callbacks to custom
 * events dispatched by the Alpine component.
 */
export function initRegisterPage(options: RegisterPageOptions = {}): void {
  const registerPage = document.getElementById('register-page');
  if (!registerPage) return;

  // Wire onComplete callback to register-complete custom event
  if (options.onComplete) {
    registerPage.addEventListener('register-complete', ((e: CustomEvent) => {
      options.onComplete!(e.detail as RegisterPageData);
    }) as EventListener);
  }

  // Wire onStepChange callback to register-step-change custom event
  if (options.onStepChange) {
    registerPage.addEventListener('register-step-change', ((e: CustomEvent) => {
      options.onStepChange!(e.detail.step as RegisterStep);
    }) as EventListener);
  }
}

/**
 * Get the current registration step
 */
export function getCurrentStep(): RegisterStep | null {
  const registerPage = document.getElementById('register-page');
  if (!registerPage) return null;

  // Read from Alpine component reactive state
  const dataStack = (registerPage as any)._x_dataStack; // eslint-disable-line @typescript-eslint/no-explicit-any
  if (dataStack?.[0]?.currentStep) {
    return dataStack[0].currentStep as RegisterStep;
  }

  return null;
}

/**
 * Navigate to a specific step programmatically.
 * Dispatches a custom event that the Alpine component listens for.
 */
export function navigateToStep(step: RegisterStep, _state?: RegisterPageState, _options?: RegisterPageOptions): void {
  const registerPage = document.getElementById('register-page');
  if (!registerPage) return;

  registerPage.dispatchEvent(new CustomEvent('register-navigate', {
    detail: { step }
  }));
}
