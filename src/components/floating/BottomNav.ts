/**
 * BottomNav Component
 * Mobile-only fixed bottom navigation bar (Alibaba-style).
 * Visible on screens below md breakpoint.
 */

/**
 * Renders the mobile bottom navigation bar with 5 action buttons:
 * Home, Categories, Messages (badge), Cart (badge), Account
 */
export function BottomNav(): string {
  return `
    <div id="bottom-nav" class="fixed bottom-0 left-0 z-[var(--z-sticky)] w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700 md:hidden">
      <div class="grid h-full grid-cols-5 mx-auto">
        <!-- Home -->
        <button type="button" id="bottom-nav-home" class="inline-flex flex-col items-center justify-center px-1 group" aria-label="Home">
          <div class="relative">
            <svg class="w-6 h-6 text-gray-500 group-hover:text-primary-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
            </svg>
          </div>
          <span class="text-[10px] mt-0.5 text-gray-500 group-hover:text-primary-500 dark:text-gray-400">Home</span>
        </button>

        <!-- Categories -->
        <button type="button" id="bottom-nav-categories" class="inline-flex flex-col items-center justify-center px-1 group" aria-label="Categories">
          <div class="relative">
            <svg class="w-6 h-6 text-gray-500 group-hover:text-primary-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h8m-8 4h14M3 13h8m-8 4h14"/>
            </svg>
          </div>
          <span class="text-[10px] mt-0.5 text-gray-500 group-hover:text-primary-500 dark:text-gray-400">Categories</span>
        </button>

        <!-- Messages -->
        <button type="button" id="bottom-nav-messages" class="inline-flex flex-col items-center justify-center px-1 group" aria-label="Messages, 1 new">
          <div class="relative">
            <svg class="w-6 h-6 text-gray-500 group-hover:text-primary-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17h6l3 3v-3h2V9a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3Z"/>
            </svg>
            <span class="th-badge absolute -top-1.5 -right-2 flex items-center justify-center min-w-4 h-4 px-0.5" style="background:var(--color-error-500);color:#fff">1</span>
          </div>
          <span class="text-[10px] mt-0.5 text-gray-500 group-hover:text-primary-500 dark:text-gray-400">Messages</span>
        </button>

        <!-- Cart -->
        <button type="button" id="bottom-nav-cart" class="inline-flex flex-col items-center justify-center px-1 group" aria-label="Cart, 3 items">
          <div class="relative">
            <svg class="w-6 h-6 text-gray-500 group-hover:text-primary-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
            </svg>
            <span class="th-badge absolute -top-1.5 -right-2 flex items-center justify-center min-w-4 h-4 px-0.5" style="background:var(--color-error-500);color:#fff">3</span>
          </div>
          <span class="text-[10px] mt-0.5 text-gray-500 group-hover:text-primary-500 dark:text-gray-400">Cart</span>
        </button>

        <!-- Account -->
        <button type="button" id="bottom-nav-account" class="inline-flex flex-col items-center justify-center px-1 group" aria-label="Account">
          <div class="relative">
            <svg class="w-6 h-6 text-gray-500 group-hover:text-primary-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
            </svg>
          </div>
          <span class="text-[10px] mt-0.5 text-gray-500 group-hover:text-primary-500 dark:text-gray-400">Account</span>
        </button>
      </div>
    </div>
  `;
}

/**
 * Initializes click handlers for the bottom navigation buttons.
 * Should be called after DOM is ready.
 */
export function initBottomNav(): void {
  // Home - scroll to top
  const homeBtn = document.getElementById('bottom-nav-home');
  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Categories - trigger MegaMenu via .mega-trigger
  const categoriesBtn = document.getElementById('bottom-nav-categories');
  if (categoriesBtn) {
    categoriesBtn.addEventListener('click', () => {
      const megaTrigger = document.querySelector<HTMLElement>('.mega-trigger');
      if (megaTrigger) {
        megaTrigger.click();
      }
    });
  }

  // Messages - placeholder navigation
  const messagesBtn = document.getElementById('bottom-nav-messages');
  if (messagesBtn) {
    messagesBtn.addEventListener('click', () => {
      window.location.href = '/buyer/messages';
    });
  }

  // Cart - placeholder navigation
  const cartBtn = document.getElementById('bottom-nav-cart');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      window.location.href = '/buyer/cart';
    });
  }

  // Account - placeholder navigation
  const accountBtn = document.getElementById('bottom-nav-account');
  if (accountBtn) {
    accountBtn.addEventListener('click', () => {
      window.location.href = '/buyer/account';
    });
  }
}
