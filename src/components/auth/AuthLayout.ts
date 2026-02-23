/**
 * AuthLayout Component
 * Shared layout for login and register pages with split-screen desktop
 * and full-screen mobile layouts (Alibaba-style).
 *
 * Desktop: Orange promotional banner on left (40%), form content on right (60%)
 * Mobile: Full orange background with centered white card overlay
 */

/* ── Types ──────────────────────────────────────────── */

export interface AuthLayoutOptions {
  /** Page title for mobile header */
  title?: string;
  /** Whether to show back button on mobile */
  showBackButton?: boolean;
  /** Custom back button handler */
  onBackClick?: () => void;
}

/* ── Utility Functions ───────────────────────────────── */

/**
 * Get base URL for assets (handles GitHub Pages subdirectory)
 */
export const getBaseUrl = (): string => {
  // Vite replaces import.meta.env.BASE_URL at build time.
  // If it's set to a subdirectory (not just "/"), use it directly.
  const viteBase = typeof import.meta !== 'undefined' ? import.meta.env?.BASE_URL : undefined;
  if (viteBase && viteBase !== '/') {
    return viteBase;
  }
  // Runtime fallback: detect GitHub Pages subdirectory from URL
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/tradehub/')) {
    return '/tradehub/';
  }
  return '/';
};

/* ── Sub-component Renders ───────────────────────────── */

/**
 * Renders the mobile header bar with optional back button and title
 */
function renderMobileHeader(options: AuthLayoutOptions = {}): string {
  const { title = 'Giriş yap veya hesap oluştur', showBackButton = true } = options;
  const baseUrl = getBaseUrl();

  return `
    <header class="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center h-14 px-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      ${showBackButton ? `
        <button
          type="button"
          id="auth-mobile-back"
          class="flex items-center justify-center w-10 h-10 -ml-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Geri"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
          </svg>
        </button>
      ` : ''}
      <span class="flex-1 text-center text-sm font-medium text-gray-900 dark:text-white truncate ${showBackButton ? 'pr-10' : ''}">${title}</span>
      <a href="${baseUrl}" class="absolute right-4 top-1/2 -translate-y-1/2" aria-label="iSTOC Ana Sayfa">
        <img src="${baseUrl}images/istoc-logo.png" alt="iSTOC" class="h-6" />
      </a>
    </header>
  `;
}

/**
 * Renders the promotional banner for desktop (left side) and mobile background
 */
function renderPromoBanner(): string {
  return `
    <div class="auth-promo-banner flex flex-col items-center justify-center px-12 py-12 text-center text-white h-full relative overflow-hidden bg-[#FF6600]">
      <!-- Background Pattern/Effect -->
      <div class="absolute inset-0 opacity-10">
         <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
         </svg>
      </div>

      <!-- Content -->
      <div class="relative z-10 w-full max-w-lg">
        <h1 class="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
          Global B2B sourcing with<br/>
          <span class="text-orange-100">order protection and great savings</span>
        </h1>
        
        <!-- Illustration Area -->
        <div class="mt-12 relative w-full aspect-square max-w-sm mx-auto">
           <!-- Placeholder for the globe/illustration from the screenshot -->
           <div class="absolute inset-0 flex items-center justify-center">
             <!-- Globe -->
             <div class="w-48 h-48 rounded-full bg-orange-400/30 backdrop-blur-sm border border-white/20 flex items-center justify-center relative">
               <div class="w-40 h-40 rounded-full bg-orange-300/30 border border-white/20 flex items-center justify-center">
                 <svg class="w-24 h-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
               </div>
               <!-- Pin Location -->
               <div class="absolute -top-6 right-8 text-red-500 drop-shadow-lg animate-bounce">
                  <svg class="w-12 h-12 fill-current" viewBox="0 0 24 24">
                     <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
               </div>
               <!-- Box -->
               <div class="absolute -bottom-2 -left-4 bg-orange-600 p-2 rounded shadow-lg transform rotate-12">
                   <svg class="w-8 h-8 text-yellow-300" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M21 16.532l-9-5.195-9 5.195v-7.15l9-5.196 9 5.196v7.15zm-9-12.87l-10 5.772v8.667l10 5.773 10-5.773v-8.667l-10-5.773z"/>
                   </svg>
               </div>
             </div>
             
             <!-- Floating Truck -->
             <div class="absolute bottom-4 right-0 transform translate-x-4 bg-yellow-400 p-2 rounded-md shadow-xl">
                 <svg class="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M20 8h-3V4H3v14h1v2h2v-2h10v2h2v-2h2.2l1.8-6v-4zM5 16H4V5h14v11H5zm14-4h-2v-2h2v2zm0-3h-2V7h2v2z"/>
                 </svg>
             </div>
           </div>
        </div>
      </div>
    </div>
  `;
}

/* ── Main Component ──────────────────────────────────── */

/**
 * AuthLayout Component
 * Renders split-screen desktop / full-screen mobile auth layout
 *
 * @param content - HTML string for the form content (LoginPage, RegisterPage, etc.)
 * @param options - Layout configuration options
 * @returns HTML string for the complete auth layout
 */
export function AuthLayout(content: string, options: AuthLayoutOptions = {}): string {
  return `
    <div id="auth-layout" class="min-h-screen">
      <!-- Mobile Header -->
      ${renderMobileHeader(options)}

      <!-- Main Container -->
      <div class="flex min-h-screen">

        <!-- Left: Promo Banner (Desktop only) -->
        <div class="hidden lg:flex lg:w-[45%] xl:w-[50%] bg-[#FF6600]">
          ${renderPromoBanner()}
        </div>

        <!-- Right: Form Content Area -->
        <div class="flex-1 lg:w-[55%] xl:w-[50%] relative bg-white dark:bg-gray-900">

          <!-- Mobile: Full-height orange background -->
          <div class="lg:hidden absolute inset-0 bg-[#FF6600]"></div>

          <!-- Responsive content wrapper -->
          <div class="relative z-10 w-full min-h-screen flex flex-col lg:items-center lg:justify-center">
            <!-- Mobile-only: header spacer + promo text -->
            <div class="lg:hidden">
              <div class="h-14"></div>
              <div class="px-6 pt-6 pb-8 text-white text-center">
                <h2 class="text-xl font-bold mb-1">Global B2B sourcing</h2>
                <p class="text-sm opacity-90">Order protection and great savings</p>
              </div>
            </div>

            <!-- Single content area (mobile: white card, desktop: transparent) -->
            <div class="bg-white dark:bg-gray-900 mx-4 mb-8 px-6 py-8 rounded-md shadow-lg lg:bg-transparent lg:dark:bg-transparent lg:mx-0 lg:mb-0 lg:px-8 lg:py-0 lg:rounded-none lg:shadow-none">
              <div class="w-full max-w-md mx-auto">
                ${content}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}

/* ── Init Logic ──────────────────────────────────────── */

/**
 * Initialize AuthLayout interactivity
 * Sets up mobile back button handler
 */
export function initAuthLayout(options: AuthLayoutOptions = {}): void {
  const backBtn = document.getElementById('auth-mobile-back');

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (options.onBackClick) {
        options.onBackClick();
      } else {
        // Default: go back in history or to home
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.href = getBaseUrl();
        }
      }
    });
  }
}
