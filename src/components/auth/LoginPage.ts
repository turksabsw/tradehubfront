/**
 * LoginPage Component
 * Login page content with social login options (Google, Facebook, LinkedIn, Email),
 * and 'Create account' link.
 * Used within AuthLayout for both desktop and mobile views.
 */

import { SocialLoginButtons, initSocialLoginButtons, type LoginProvider } from './SocialLoginButtons';
import { getBaseUrl } from './AuthLayout';

/* ── Types ──────────────────────────────────────────── */

export interface LoginPageOptions {
  /** Callback when a social provider is selected */
  onProviderSelect?: (provider: LoginProvider) => void;
  /** Callback when 'Create account' is clicked */
  onCreateAccount?: () => void;
}

/* ── Component HTML ─────────────────────────────────── */

export function LoginPage(): string {
  const baseUrl = getBaseUrl();

  return `
    <div id="login-page" class="auth-page-content">
      <!-- Header Area -->
      <div class="mb-8 relative">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Giriş Yap</h1>
        
        <!-- Sign in with code link (Absolute positioned on desktop, relative on mobile) -->
        <a 
          href="javascript:void(0)" 
          class="lg:absolute lg:top-1 lg:right-0 text-sm text-gray-500 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400 transition-colors flex items-center gap-1"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Mobil kod ile giriş yap
        </a>
      </div>

      <!-- Login Form -->
      <form id="login-form" class="space-y-5">
        
        <!-- Email Input -->
        <div>
          <label for="email" class="sr-only">E-posta adresi</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            class="w-full h-12 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white placeholder-gray-500 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            placeholder="E-posta adresi"
            required
          >
        </div>

        <!-- Password Input -->
        <div class="relative">
          <label for="password" class="sr-only">Şifre</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            class="w-full h-12 px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white placeholder-gray-500 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            placeholder="Şifre"
            required
          >
          <button 
            type="button" 
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>

        <!-- Forgot Password -->
        <div class="text-right">
          <a href="javascript:void(0)" class="text-sm font-medium text-gray-900 dark:text-gray-300 hover:underline">
            Şifremi unuttum?
          </a>
        </div>

        <!-- Submit Button -->
        <button 
          type="submit" 
          class="w-full h-12 bg-[#FF6600] hover:bg-[#E65C00] text-white font-bold rounded-full transition-colors text-lg"
        >
          Devam Et
        </button>

      </form>

      <!-- Divider -->
      <div class="relative my-8 text-center">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <span class="relative px-4 bg-white dark:bg-gray-900 text-sm text-gray-500 dark:text-gray-400 uppercase">VEYA</span>
      </div>

      <!-- Social Login Buttons (Icons Mode) -->
      ${SocialLoginButtons({ mode: 'icons' })}

      <!-- Create Account Link -->
      <div class="mt-8 text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          TradeHub'da yeni misiniz? 
          <a
            href="${baseUrl}register.html"
            id="login-create-account-link"
            class="font-medium text-gray-900 dark:text-white hover:underline ml-1"
          >
            Hesap oluştur
          </a>
        </p>
      </div>

      <!-- QR Code Link (Bottom) -->
      <div class="mt-12 flex justify-end">
        <a
          href="javascript:void(0)"
          id="login-qr-link-bottom"
          class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/>
          </svg>
          QR kod ile giriş yap
        </a>
      </div>
    </div>
  `;
}

/* ── Init Logic ──────────────────────────────────────── */

/**
 * Initialize LoginPage interactivity
 * Sets up social login button handlers and create account link
 */
export function initLoginPage(options: LoginPageOptions = {}): void {
  const loginPage = document.getElementById('login-page');
  if (!loginPage) return;

  // Initialize social login buttons
  initSocialLoginButtons({
    mode: 'icons',
    onProviderSelect: (provider) => {
      // Call custom handler if provided
      if (options.onProviderSelect) {
        options.onProviderSelect(provider);
      }

      // Default behavior: redirect based on provider
      handleProviderLogin(provider);
    }
  });

  // Handle 'Create account' link
  const createAccountLink = document.getElementById('login-create-account-link');
  if (createAccountLink && options.onCreateAccount) {
    createAccountLink.addEventListener('click', (e) => {
      e.preventDefault();
      options.onCreateAccount!();
    });
  }

  // Handle Form Submission
  const loginForm = document.getElementById('login-form') as HTMLFormElement;
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Giriş yapılıyor...');
    });
  }
}

/* ── Helper Functions ────────────────────────────────── */

/**
 * Handle provider login selection (UI-only, no actual auth)
 * In production, this would redirect to OAuth flow
 */
function handleProviderLogin(provider: LoginProvider): void {
  // For now, just dispatch a custom event for analytics/tracking
  const event = new CustomEvent('login-provider-selected', {
    bubbles: true,
    detail: { provider, timestamp: Date.now() }
  });
  document.dispatchEvent(event);

  // TODO: When backend is ready, redirect to OAuth flow:
  // window.location.href = `/api/auth/${provider}`;
}
