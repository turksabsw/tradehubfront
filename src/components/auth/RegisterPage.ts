/**
 * RegisterPage Component
 * Multi-step registration flow with step management:
 * 1. Account type selection (Buyer/Supplier)
 * 2. Email input
 * 3. OTP verification
 * 4. Account setup form
 *
 * Uses existing child components and manages transitions between steps.
 */

import { AccountTypeSelector, initAccountTypeSelector, getSelectedAccountType, type AccountType } from './AccountTypeSelector';
import { EmailVerification, initEmailVerification, cleanupEmailVerification, type EmailVerificationState } from './EmailVerification';
import { AccountSetupForm, initAccountSetupForm, type AccountSetupFormData } from './AccountSetupForm';
import { getBaseUrl } from './AuthLayout';

/* ── Helpers ────────────────────────────────────────── */

/** HTML-encode user input to prevent XSS when inserted via innerHTML */
function escapeHtml(str: string): string {
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
 * Renders the multi-step registration flow
 *
 * @param initialStep - Starting step (defaults to 'account-type')
 * @returns HTML string for the register page
 */
export function RegisterPage(initialStep: RegisterStep = 'account-type'): string {
  return `
    <div id="register-page" class="auth-page-content" data-current-step="${initialStep}">
      <!-- Step Container - only one step visible at a time -->
      <div id="register-step-container">
        ${renderStep(initialStep)}
      </div>
    </div>
  `;
}

/**
 * Renders the content for a specific step
 */
function renderStep(step: RegisterStep, email: string = ''): string {
  switch (step) {
    case 'account-type':
      return renderAccountTypeStep();
    case 'email':
      return renderEmailStep();
    case 'otp':
      return renderOTPStep(email);
    case 'setup':
      return renderSetupStep();
    default:
      return renderAccountTypeStep();
  }
}

/**
 * Step 1: Account Type Selection
 */
function renderAccountTypeStep(): string {
  const baseUrl = getBaseUrl();

  return `
    <div id="register-step-account-type" class="register-step">
      <!-- Header -->
      <div class="mb-6 text-center lg:text-left">
        <h1 class="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Hesap Oluştur
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Hesap türünüzü seçin
        </p>
      </div>

      <!-- Account Type Selector -->
      ${AccountTypeSelector('buyer')}

      <!-- Continue Button -->
      <button
        type="button"
        id="register-account-type-continue"
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
  `;
}

/**
 * Step 2: Email Input
 */
function renderEmailStep(): string {
  return `
    <div id="register-step-email" class="register-step">
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
      <form id="register-email-form" class="space-y-4" novalidate>
        <div class="auth-form-field">
          <label for="register-email-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            E-posta
          </label>
          <input
            type="email"
            id="register-email-input"
            name="email"
            placeholder="ornek@email.com"
            autocomplete="email"
            class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 dark:focus:border-orange-400 transition-all"
            required
          />
          <p id="register-email-error" class="mt-1 text-sm text-red-500 hidden">
            Geçerli bir e-posta adresi girin
          </p>
        </div>

        <!-- Continue Button -->
        <button
          type="submit"
          id="register-email-continue"
          class="th-btn th-btn-pill w-full py-3 text-base font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          disabled
        >
          Doğrulama Kodu Gönder
        </button>
      </form>

      <!-- Back Button -->
      <div class="mt-4 text-center lg:text-left">
        <button
          type="button"
          id="register-email-back"
          class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:underline transition-colors"
        >
          ← Hesap türü seçimine dön
        </button>
      </div>
    </div>
  `;
}

/**
 * Step 3: OTP Verification
 */
function renderOTPStep(email: string): string {
  return `
    <div id="register-step-otp" class="register-step">
      ${EmailVerification(email)}
    </div>
  `;
}

/**
 * Step 4: Account Setup Form
 */
function renderSetupStep(): string {
  return `
    <div id="register-step-setup" class="register-step">
      ${AccountSetupForm('TR')}
    </div>
  `;
}

/* ── Init Logic ──────────────────────────────────────── */

/**
 * Initialize RegisterPage interactivity
 * Sets up step management and transitions between registration steps
 */
export function initRegisterPage(options: RegisterPageOptions = {}): RegisterPageState {
  const initialStep = options.initialStep ?? 'account-type';

  // Initialize state
  const state: RegisterPageState = {
    currentStep: initialStep,
    accountType: null,
    email: '',
    otpState: null
  };

  const registerPage = document.getElementById('register-page');
  if (!registerPage) return state;

  // Initialize the current step
  initCurrentStep(state, options);

  return state;
}

/**
 * Initialize the current step's interactivity
 */
function initCurrentStep(state: RegisterPageState, options: RegisterPageOptions): void {
  switch (state.currentStep) {
    case 'account-type':
      initAccountTypeStep(state, options);
      break;
    case 'email':
      initEmailStep(state, options);
      break;
    case 'otp':
      initOTPStep(state, options);
      break;
    case 'setup':
      initSetupStep(state, options);
      break;
  }
}

/**
 * Initialize Step 1: Account Type Selection
 */
function initAccountTypeStep(state: RegisterPageState, options: RegisterPageOptions): void {
  // Initialize account type selector
  initAccountTypeSelector({
    defaultType: 'buyer',
    onTypeSelect: (type) => {
      state.accountType = type;
    }
  });

  // Set default selection
  state.accountType = getSelectedAccountType() || 'buyer';

  // Continue button handler
  const continueBtn = document.getElementById('register-account-type-continue');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      if (state.accountType) {
        goToStep(state, 'email', options);
      }
    });
  }

  // Login link handler
  const loginLink = document.getElementById('register-login-link');
  if (loginLink && options.onLoginClick) {
    loginLink.addEventListener('click', (e) => {
      e.preventDefault();
      options.onLoginClick!();
    });
  }
}

/**
 * Initialize Step 2: Email Input
 */
function initEmailStep(state: RegisterPageState, options: RegisterPageOptions): void {
  const emailInput = document.getElementById('register-email-input') as HTMLInputElement | null;
  const emailForm = document.getElementById('register-email-form') as HTMLFormElement | null;
  const continueBtn = document.getElementById('register-email-continue') as HTMLButtonElement | null;
  const backBtn = document.getElementById('register-email-back');
  const errorMsg = document.getElementById('register-email-error');

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Input handler
  if (emailInput && continueBtn) {
    emailInput.addEventListener('input', () => {
      const value = emailInput.value.trim();
      const isValid = emailRegex.test(value);
      continueBtn.disabled = !isValid;

      // Hide error on valid input
      if (isValid && errorMsg) {
        errorMsg.classList.add('hidden');
      }
    });

    // Focus email input
    emailInput.focus();
  }

  // Form submission
  if (emailForm) {
    emailForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = emailInput?.value.trim() || '';

      if (!emailRegex.test(email)) {
        if (errorMsg) {
          errorMsg.classList.remove('hidden');
        }
        return;
      }

      state.email = email;
      goToStep(state, 'otp', options);
    });
  }

  // Back button handler
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      goToStep(state, 'account-type', options);
    });
  }
}

/**
 * Initialize Step 3: OTP Verification
 */
function initOTPStep(state: RegisterPageState, options: RegisterPageOptions): void {
  // Cleanup previous OTP state if exists
  if (state.otpState) {
    cleanupEmailVerification(state.otpState);
  }

  // Initialize email verification component
  state.otpState = initEmailVerification({
    email: state.email,
    onComplete: (_otp) => {
      // In production, verify OTP with backend using _otp
      // For now, accept any 6-digit code and proceed
      goToStep(state, 'setup', options);
    },
    onResend: () => {
      // In production, resend OTP via backend
      // For now, just show visual feedback
    },
    onBack: () => {
      goToStep(state, 'email', options);
    }
  });
}

/**
 * Initialize Step 4: Account Setup Form
 */
function initSetupStep(state: RegisterPageState, options: RegisterPageOptions): void {
  // Initialize account setup form
  initAccountSetupForm({
    defaultCountry: 'TR',
    onSubmit: (formData) => {
      // Call completion callback with all registration data
      if (options.onComplete && state.accountType) {
        options.onComplete({
          accountType: state.accountType,
          email: state.email,
          formData
        });
      }
    }
  });
}

/**
 * Navigate to a specific step
 */
function goToStep(state: RegisterPageState, step: RegisterStep, options: RegisterPageOptions): void {
  // Cleanup current step if needed
  if (state.currentStep === 'otp' && state.otpState) {
    cleanupEmailVerification(state.otpState);
    state.otpState = null;
  }

  // Update state
  state.currentStep = step;

  // Update DOM
  const registerPage = document.getElementById('register-page');
  const stepContainer = document.getElementById('register-step-container');

  if (registerPage && stepContainer) {
    registerPage.setAttribute('data-current-step', step);
    stepContainer.innerHTML = renderStep(step, escapeHtml(state.email));
  }

  // Initialize new step
  initCurrentStep(state, options);

  // Call step change callback
  if (options.onStepChange) {
    options.onStepChange(step);
  }
}

/**
 * Get the current registration step
 */
export function getCurrentStep(): RegisterStep | null {
  const registerPage = document.getElementById('register-page');
  if (!registerPage) return null;

  return registerPage.getAttribute('data-current-step') as RegisterStep | null;
}

/**
 * Navigate to a specific step programmatically
 * Useful for external control of the registration flow
 */
export function navigateToStep(step: RegisterStep, state: RegisterPageState, options: RegisterPageOptions = {}): void {
  goToStep(state, step, options);
}
