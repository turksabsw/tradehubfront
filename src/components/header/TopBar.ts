/**
 * TopBar Component
 * Top navigation bar with iSTOC logo, delivery selector, language/currency,
 * utility icons (messages, orders), cart, and auth buttons
 * Each icon/selector has a Flowbite popover panel
 */

import type { LocaleOption, CurrencyOption } from '../../types/navigation';
import { megaCategories } from './MegaMenu';

/** Default country options for the delivery selector */
const countryOptions: LocaleOption[] = [
  { code: 'TR', name: 'Türkiye', flag: '🇹🇷' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
];

/** Default language options */
const languageOptions: LocaleOption[] = [
  { code: 'TR', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
];

/** Default currency options */
const currencyOptions: CurrencyOption[] = [
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
];

/**
 * Get base URL for assets (handles GitHub Pages subdirectory)
 */
const getBaseUrl = (): string => {
  // Vite replaces import.meta.env.BASE_URL at build time.
  // If it's set to a subdirectory (not just "/"), use it directly.
  const viteBase = typeof import.meta !== 'undefined' ? import.meta.env?.BASE_URL : undefined;
  if (viteBase && viteBase !== '/') {
    return viteBase;
  }
  // Runtime fallback: detect GitHub Pages subdirectory from URL
  if (window.location.pathname.startsWith('/tradehub/')) {
    return '/tradehub/';
  }
  return '/';
};

/**
 * Generates the iSTOC logo
 */
function renderLogo(): string {
  const baseUrl = getBaseUrl();
  return `
    <a href="${baseUrl}" class="flex items-center hover:opacity-80 transition-opacity" aria-label="iSTOC Home">
      <img src="${baseUrl}images/istoc-logo.png" alt="iSTOC" class="h-8 lg:h-9" />
    </a>
  `;
}

/**
 * Compact sticky search shown after hero search area is scrolled out.
 */
function renderCompactStickySearch(): string {
  return `
    <div id="topbar-compact-search-shell" class="hidden lg:flex flex-col justify-center relative min-w-0 flex-1 h-[60px] lg:mx-4">
      
      <form
        id="topbar-compact-search"
        action="/search"
        method="GET"
        role="search"
        aria-label="Sticky header search"
        aria-hidden="true"
        aria-expanded="false"
        aria-controls="topbar-compact-dropdown"
        class="absolute left-0 right-0 top-[8px] z-[var(--z-popover)] w-full rounded-full border border-gray-300 bg-white shadow-sm transition-all duration-200 dark:border-gray-600 dark:bg-gray-800"
      >
        <div id="topbar-compact-primary-row" class="flex items-center gap-2 px-3 py-1.5">
          <div class="relative min-w-0 flex-1">
            <input
              id="topbar-compact-search-input"
              name="search"
              type="text"
              tabindex="-1"
              placeholder="Search products"
              autocomplete="off"
              aria-label="Search products from sticky header"
              aria-expanded="false"
              aria-controls="topbar-compact-dropdown"
              class="w-full border-0 bg-transparent px-2 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 dark:text-white dark:placeholder:text-gray-400"
            />
          </div>

          <a
            id="topbar-compact-image-search"
            href="/image-search"
            tabindex="-1"
            aria-label="Image search"
            class="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-primary-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-primary-400"
          >
            <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
            </svg>
            <span id="topbar-compact-image-search-label" class="hidden">Image Search</span>
          </a>

          <button
            id="topbar-compact-search-submit"
            type="submit"
            tabindex="-1"
            class="th-btn th-btn-pill inline-flex items-center justify-center gap-1.5 px-4 py-1.5 text-sm font-semibold transition-colors"
          >
            <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35m1.6-5.15a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z" />
            </svg>
            <span>Search</span>
          </button>
        </div>

        <div id="topbar-compact-secondary-row" class="hidden h-11"></div>
      </form>

      <div
        id="topbar-compact-dropdown"
        aria-hidden="true"
        class="hidden absolute left-0 right-0 z-[var(--z-modal)] rounded-md border border-gray-200 bg-white px-5 py-4 shadow-xl dark:border-gray-700 dark:bg-gray-800"
      >
        <div class="flex items-center justify-between gap-4">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">Recommended for you</h3>
          <button
            type="button"
            tabindex="-1"
            data-compact-expanded-interactive="true"
            class="text-sm font-medium text-gray-500 underline decoration-gray-300 underline-offset-2 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Refresh
          </button>
        </div>

        <div id="topbar-compact-reco-list" class="mt-3 space-y-2">
          <button type="button" tabindex="-1" data-compact-expanded-interactive="true" data-search-value="women's intimates" class="block text-left text-[22px] font-normal leading-tight text-gray-900 transition-colors hover:text-primary-600 dark:text-white dark:hover:text-primary-400">women's intimates</button>
          <button type="button" tabindex="-1" data-compact-expanded-interactive="true" data-search-value="iphones 15 pro max" class="block text-left text-[22px] font-normal leading-tight text-gray-900 transition-colors hover:text-primary-600 dark:text-white dark:hover:text-primary-400">iphones 15 pro max</button>
          <button type="button" tabindex="-1" data-compact-expanded-interactive="true" data-search-value="watch" class="block text-left text-[22px] font-normal leading-tight text-gray-900 transition-colors hover:text-primary-600 dark:text-white dark:hover:text-primary-400">watch</button>
        </div>

        <div class="mt-4 flex items-center justify-between gap-4">
          <p class="text-sm font-semibold text-primary-600 dark:text-primary-400">
            <span class="mr-1" aria-hidden="true">&#10022;</span>
            Navigate complex requirements with Deep Search
          </p>
          <a
            href="/terms"
            tabindex="-1"
            data-compact-expanded-interactive="true"
            class="text-sm text-gray-500 underline decoration-gray-300 underline-offset-2 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Terms of use
          </a>
        </div>

        <div class="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-3">
          <button type="button" tabindex="-1" data-compact-expanded-interactive="true" data-search-value="Watch for Men" class="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"><span class="text-primary-500">&#10022;</span><span>Watch for Men</span></button>
          <button type="button" tabindex="-1" data-compact-expanded-interactive="true" data-search-value="Surron Light Bee X" class="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"><span class="text-primary-500">&#10022;</span><span>Surron Light Bee X</span></button>
          <button type="button" tabindex="-1" data-compact-expanded-interactive="true" data-search-value="Human Hair Wigs" class="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"><span class="text-primary-500">&#10022;</span><span>Human Hair Wigs</span></button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generates the delivery country selector with popover panel
 */
function renderCountrySelector(): string {
  const defaultCountry = countryOptions[0];
  return `
    <button
      data-popover-target="popover-deliver-to"
      data-popover-placement="bottom"
      class="th-header-icon flex flex-col items-center px-2 py-1 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
      type="button"
      aria-label="Select delivery country"
    >
      <span class="text-xs text-gray-500 dark:text-gray-400">Deliver to:</span>
      <span class="text-sm font-medium">${defaultCountry.flag} ${defaultCountry.code}</span>
    </button>

    <!-- Deliver To Popover -->
    <div data-popover id="popover-deliver-to" role="tooltip"
      class="absolute z-50 invisible inline-block w-80 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 transition-opacity duration-300 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-5">
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-1">Specify your location</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Shipping options and fees vary based on your location</p>

        <!-- Add Address Button -->
        <button type="button" class="th-btn th-btn-pill w-full px-4 py-2.5 text-sm font-medium transition-colors mb-4">
          Add address
        </button>

        <!-- Or Divider -->
        <div class="flex items-center gap-3 mb-4">
          <div class="flex-1 border-t border-gray-200 dark:border-gray-600"></div>
          <span class="text-sm text-gray-400">Or</span>
          <div class="flex-1 border-t border-gray-200 dark:border-gray-600"></div>
        </div>

        <!-- Country Select -->
        <div class="mb-3">
          <select class="th-input w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white appearance-none cursor-pointer">
            ${countryOptions.map(country => `
              <option value="${country.code}">${country.flag} ${country.name}</option>
            `).join('')}
          </select>
        </div>

        <!-- ZIP Code Input -->
        <div class="mb-4">
          <input
            type="text"
            placeholder="Enter ZIP or postal code"
            class="th-input w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          />
        </div>

        <!-- Save Button -->
        <button type="button" class="th-btn th-btn-pill w-full px-4 py-2.5 text-sm font-medium transition-colors">
          Save
        </button>
      </div>
      <div data-popper-arrow></div>
    </div>
  `;
}

/**
 * Generates the language/currency selector with popover panel
 */
function renderLanguageCurrencySelector(): string {
  return `
    <button
      data-popover-target="popover-language-currency"
      data-popover-placement="bottom"
      class="th-header-icon flex items-center gap-1.5 px-2 py-1.5 text-sm dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
      type="button"
      aria-label="Select language and currency"
    >
      <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-4.247m0 0A8.959 8.959 0 0 1 3 12c0-1.177.227-2.302.637-3.332" />
      </svg>
      <span class="font-medium">English-USD</span>
    </button>

    <!-- Language & Currency Popover -->
    <div data-popover id="popover-language-currency" role="tooltip"
      class="absolute z-50 invisible inline-block w-96 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 transition-opacity duration-300 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-5">
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-1">Set language and currency</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-5">Select your preferred language and currency. You can update the settings at any time.</p>

        <!-- Language Select -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Language</label>
          <select class="th-input w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white appearance-none cursor-pointer">
            ${languageOptions.map(lang => `
              <option value="${lang.code}">${lang.name}</option>
            `).join('')}
          </select>
        </div>

        <!-- Currency Select -->
        <div class="mb-5">
          <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Currency</label>
          <select class="th-input w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white appearance-none cursor-pointer">
            ${currencyOptions.map(currency => `
              <option value="${currency.code}">${currency.code} - ${currency.name}</option>
            `).join('')}
          </select>
        </div>

        <!-- Save Button -->
        <button type="button" class="th-btn th-btn-pill w-full px-4 py-2.5 text-sm font-medium transition-colors">
          Save
        </button>
      </div>
      <div data-popper-arrow></div>
    </div>
  `;
}

/**
 * Generates the Messages icon button with popover panel
 */
function renderMessagesButton(): string {
  return `
    <button
      data-popover-target="popover-messages"
      data-popover-placement="bottom"
      class="th-header-icon flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-colors relative"
      type="button"
      aria-label="Messages"
    >
      <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
      <span class="th-badge absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 text-[10px] font-bold" style="background:var(--color-error-500);color:#fff">1</span>
    </button>

    <!-- Messages Popover -->
    <div data-popover id="popover-messages" role="tooltip"
      class="absolute z-50 invisible inline-block w-96 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 transition-opacity duration-300 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-5">
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-4">Messages</h3>

        <!-- Message Items -->
        <div class="space-y-4 mb-4">
          <!-- Message 1 -->
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <p class="text-sm font-semibold text-gray-900 dark:text-white">Procurement Assistant</p>
                <span class="text-xs text-gray-400">2025-1-16</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400">iSTOC.com</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">[Message]</p>
            </div>
            <span class="th-badge flex items-center justify-center min-w-5 h-5 px-1 text-[10px] font-bold" style="background:var(--color-error-500);color:#fff">32</span>
          </div>

          <!-- Message 2 -->
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
              <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <p class="text-sm font-semibold text-gray-900 dark:text-white">Connie Zhao</p>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400">Guangzhou Senka Electronics Co., Ltd.</p>
            </div>
            <span class="th-badge flex items-center justify-center min-w-5 h-5 px-1 text-[10px] font-bold" style="background:var(--color-error-500);color:#fff">1</span>
          </div>
        </div>

        <!-- View More Button -->
        <a href="/messages" class="th-btn th-btn-pill block w-full px-4 py-2.5 text-sm font-medium text-center transition-colors">
          View more
        </a>
      </div>
      <div data-popper-arrow></div>
    </div>
  `;
}

/**
 * Generates the Orders icon button with popover panel
 */
function renderOrdersButton(): string {
  return `
    <button
      data-popover-target="popover-orders"
      data-popover-placement="bottom"
      class="th-header-icon hidden lg:flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-colors"
      type="button"
      aria-label="Orders"
      title="Orders"
    >
      <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    </button>

    <!-- Orders Popover -->
    <div data-popover id="popover-orders" role="tooltip"
      class="absolute z-50 invisible inline-block w-96 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 transition-opacity duration-300 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-5">
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-4">Orders</h3>

        <!-- Trade Assurance Header -->
        <div class="flex items-center gap-2 mb-2">
          <span class="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100">
            <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.94s4.18 1.36 4.18 3.85c0 1.89-1.44 2.98-3.12 3.19z"/>
            </svg>
          </span>
          <span class="text-lg font-bold text-gray-900 dark:text-white">Trade Assurance</span>
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-5">Enjoy protection from payment to delivery</p>

        <!-- Features List -->
        <div class="space-y-4 mb-5">
          <div class="flex items-center gap-3">
            <span class="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-50">
              <svg class="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
            </span>
            <span class="text-sm text-gray-700 dark:text-gray-300">Safe & easy payments</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-50">
              <svg class="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
              </svg>
            </span>
            <span class="text-sm text-gray-700 dark:text-gray-300">Money-back policy</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-50">
              <svg class="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.029-.504 1.029-1.125a3.75 3.75 0 0 0-3.75-3.75H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            </span>
            <span class="text-sm text-gray-700 dark:text-gray-300">Shipping & logistics services</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-50">
              <svg class="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
              </svg>
            </span>
            <span class="text-sm text-gray-700 dark:text-gray-300">After-sales protections</span>
          </div>
        </div>

        <!-- Learn More Link -->
        <a href="/trade-assurance" class="text-sm font-medium text-gray-900 hover:text-primary-600 dark:text-white dark:hover:text-primary-400 underline transition-colors">
          Learn more
        </a>
      </div>
      <div data-popper-arrow></div>
    </div>
  `;
}

/**
 * Generates the cart button with badge and popover panel
 */
function renderCartButton(itemCount: number = 0): string {
  const showBadge = itemCount > 0;
  const badgeText = itemCount > 99 ? '99+' : String(itemCount);

  return `
    <button
      id="header-cart-btn"
      data-popover-target="popover-cart"
      data-popover-placement="bottom"
      class="th-header-icon relative flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-colors"
      type="button"
      aria-label="Shopping cart${showBadge ? `, ${itemCount} items` : ''}"
    >
      <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
      <span id="header-cart-badge" class="th-badge absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 text-xs font-bold${showBadge ? '' : ' hidden'}" style="background:var(--btn-bg);color:var(--btn-text)">
        ${badgeText}
      </span>
    </button>

    <!-- Cart Popover -->
    <div data-popover id="popover-cart" role="tooltip"
      class="absolute z-50 invisible inline-block w-96 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 transition-opacity duration-300 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-5" id="header-cart-body">
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-3">Alışveriş Sepeti</h3>

        <!-- Empty Cart State -->
        <div id="header-cart-empty" class="flex flex-col items-center py-4">
          <div class="mb-4">
            <svg class="w-20 h-20 text-gray-300" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="28" width="56" height="44" rx="4" fill="#F3F4F6" stroke="#D1D5DB" stroke-width="2"/>
              <path d="M20 36h56" stroke="#D1D5DB" stroke-width="2"/>
              <rect x="32" y="20" width="32" height="12" rx="2" fill="#E5E7EB" stroke="#D1D5DB" stroke-width="2"/>
              <circle cx="36" cy="76" r="4" fill="#D1D5DB"/>
              <circle cx="60" cy="76" r="4" fill="#D1D5DB"/>
              <path d="M40 48h16M48 44v8" stroke="#D1D5DB" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Sepetiniz boş</p>
        </div>

        <!-- Cart Items (hidden initially) -->
        <div id="header-cart-items" class="hidden"></div>

        <!-- Subtotal (hidden initially) -->
        <div id="header-cart-subtotal" style="display:none" class="flex items-center justify-between pt-3 mt-1 border-t border-gray-200 dark:border-gray-700">
          <span class="text-sm text-gray-600 dark:text-gray-400">Ara Toplam</span>
          <span id="header-cart-subtotal-price" class="text-base font-bold text-gray-900 dark:text-white">$0.00</span>
        </div>

        <!-- Go to Cart Button -->
        <a href="/cart" class="block w-full mt-3 px-4 py-2.5 text-sm font-medium text-center rounded-full transition-colors" style="background:var(--btn-bg);color:var(--btn-text)">
          Sepete Git
        </a>
      </div>
      <div data-popper-arrow></div>
    </div>
  `;
}

/**
 * Generates the auth buttons (Sign In / Join Free)
 */
function renderAuthButtons(): string {
  return `
    <div class="flex items-center gap-1 sm:gap-3">
      <a
        href="/login"
        class="th-header-icon hidden sm:inline-flex px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-50 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800 transition-colors"
      >
        Sign In
      </a>
      <a
        href="/register"
        class="th-btn th-btn-pill px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all"
      >
        Join Free
      </a>
    </div>
  `;
}

/**
 * Renders the 3-panel sliding mobile drawer (istoc.com style)
 * Panel 1: Main menu, Panel 2: Categories list, Panel 3: Subcategory detail
 */
function renderMobileDrawer(): string {
  const filteredCategories = megaCategories.filter(
    cat => !cat.id.startsWith('featured') && !cat.id.startsWith('new-') && !cat.id.startsWith('deal')
  );

  return `
    <!-- Mobile Menu Drawer -->
    <div
      id="mobile-menu-drawer"
      class="fixed top-0 left-0 z-[var(--z-backdrop)] h-screen overflow-hidden transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800"
      tabindex="-1"
      aria-labelledby="drawer-label"
    >
      <div class="relative h-full w-full">

        <!-- Panel 1: Main Menu -->
        <div id="drawer-panel-main" class="absolute inset-0 overflow-y-auto transition-transform duration-300 ease-in-out">

          <!-- Header: Logo + Close -->
          <div class="flex items-center justify-between px-4 pt-4 pb-2">
            <a href="${getBaseUrl()}" aria-label="iSTOC Home">
              <img src="${getBaseUrl()}images/istoc-logo.png" alt="iSTOC" class="h-8" />
            </a>
            <button
              type="button"
              data-drawer-hide="mobile-menu-drawer"
              aria-controls="mobile-menu-drawer"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-md text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/></svg>
              <span class="sr-only">Close menu</span>
            </button>
          </div>

          <!-- Profile Section -->
          <div class="mx-4 mt-2 rounded-md bg-gray-50 dark:bg-gray-700 px-4 py-3 flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-gray-400 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-1 text-sm">
                <a href="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-400">Sign In</a>
                <span class="text-gray-400 dark:text-gray-500">|</span>
                <a href="/register" class="font-medium text-primary-600 hover:underline dark:text-primary-400">Join Free</a>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Start shopping.</p>
            </div>
          </div>

          <!-- My Account Section -->
          <div class="mx-4 mt-3">
            <button
              id="drawer-account-toggle"
              type="button"
              class="flex items-center justify-between w-full py-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              <span>My Account</span>
              <svg id="drawer-account-icon" class="w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
              </svg>
            </button>
            <div id="drawer-account-panel" class="hidden pb-2 space-y-1">
              <a href="/buyer/messages" class="flex items-center gap-3 px-3 py-2.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                <span>Messages</span>
                <span class="th-badge ml-auto flex items-center justify-center min-w-5 h-5 px-1 text-[10px] font-bold" style="background:var(--color-error-500);color:#fff">1</span>
              </a>
              <a href="/buyer/orders" class="flex items-center gap-3 px-3 py-2.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                <span>Orders</span>
              </a>
              <a href="/buyer/cart" class="flex items-center gap-3 px-3 py-2.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                <span>Shopping Cart</span>
                <span class="th-badge ml-auto flex items-center justify-center min-w-5 h-5 px-1 text-[10px] font-bold" style="background:var(--btn-bg);color:var(--btn-text)">3</span>
              </a>
            </div>
          </div>

          <!-- Navigation Section -->
          <div class="border-b border-gray-200 dark:border-gray-700 mx-4 pb-3 space-y-1">

            <!-- Categories Button -->
            <button
              id="drawer-open-categories"
              type="button"
              class="flex items-center gap-3 w-full px-3 py-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors"
            >
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <span class="text-sm font-bold text-gray-900 dark:text-white">Categories</span>
                  <span class="th-badge inline-flex items-center px-2 py-0.5 text-[10px] font-bold" style="background:var(--btn-bg);color:var(--btn-text)">ALL</span>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Browse categories to discover products</p>
              </div>
              <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>
            </button>

            <!-- Campaigns -->
            <a href="/campaigns" class="block px-3 py-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span class="text-sm font-bold text-gray-900 dark:text-white">Campaigns</span>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Deals, discounts, campaigns</p>
            </a>

            <!-- Brands -->
            <a href="/brands" class="block px-3 py-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span class="text-sm font-bold text-gray-900 dark:text-white">Brands</span>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Official registered brands on iSTOC</p>
            </a>

            <!-- Sellers -->
            <a href="/sellers" class="block px-3 py-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span class="text-sm font-bold text-gray-900 dark:text-white">Sellers</span>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Browse sellers on iSTOC marketplace</p>
            </a>

            <!-- iSTOC B2B Marketplace -->
            <a href="/b2b" class="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div class="w-10 h-10 rounded-md bg-gray-100 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                <span class="text-sm font-bold text-gray-700 dark:text-gray-200">iS</span>
              </div>
              <div class="flex-1 min-w-0">
                <span class="text-sm font-bold text-gray-900 dark:text-white">iSTOC B2B Marketplace</span>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Learn how to sell on iSTOC</p>
              </div>
              <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>
            </a>
          </div>

          <!-- Language / Currency Pills -->
          <div class="mx-4 mt-3 space-y-3">
            <!-- Language pills -->
            <div class="flex flex-wrap gap-2">
              ${languageOptions.map((lang, i) => `
                <button type="button" class="px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${i === 0 ? 'border-primary-500 text-primary-600 bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:bg-primary-900/20' : 'border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500'}">
                  ${lang.code}
                </button>
              `).join('')}
            </div>
            <!-- Currency pills -->
            <div class="flex flex-wrap gap-2">
              ${currencyOptions.map((currency, i) => `
                <button type="button" class="px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${i === 0 ? 'border-primary-500 text-primary-600 bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:bg-primary-900/20' : 'border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500'}">
                  ${currency.code === 'TRY' ? 'TL' : currency.symbol}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Deliver to -->
          <div class="mx-4 mt-4 mb-6">
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Deliver to</label>
            <select class="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white appearance-none cursor-pointer">
              ${countryOptions.map(country => `
                <option value="${country.code}">${country.flag} ${country.name}</option>
              `).join('')}
            </select>
          </div>

        </div>

        <!-- Panel 2: Categories List -->
        <div id="drawer-panel-categories" class="absolute inset-0 overflow-y-auto translate-x-full transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800">

          <!-- Header: Back + Close -->
          <div class="flex items-center justify-between px-4 pt-4 pb-2">
            <button id="drawer-categories-back" type="button" class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/></svg>
              <span>Back</span>
            </button>
            <button
              type="button"
              data-drawer-hide="mobile-menu-drawer"
              aria-controls="mobile-menu-drawer"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-md text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/></svg>
              <span class="sr-only">Close menu</span>
            </button>
          </div>

          <!-- Category Header Bar -->
          <div class="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-700">
            <span class="text-lg font-bold text-gray-900 dark:text-white">Categories</span>
            <span class="th-badge inline-flex items-center px-2 py-0.5 text-[10px] font-bold" style="background:var(--btn-bg);color:var(--btn-text)">ALL</span>
          </div>

          <!-- Category List -->
          <div class="divide-y divide-gray-100 dark:divide-gray-700">
            ${filteredCategories.map(cat => `
              <button
                type="button"
                data-drawer-cat-id="${cat.id}"
                class="flex items-center justify-between w-full px-4 py-3 text-sm text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span>${cat.name}</span>
                <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>
              </button>
            `).join('')}
          </div>

        </div>

        <!-- Panel 3: Subcategory -->
        <div id="drawer-panel-subcategory" class="absolute inset-0 overflow-y-auto translate-x-full transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800">

          <!-- Header: Back + Close -->
          <div class="flex items-center justify-between px-4 pt-4 pb-2">
            <button id="drawer-subcategory-back" type="button" class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/></svg>
              <span>Categories</span>
            </button>
            <button
              type="button"
              data-drawer-hide="mobile-menu-drawer"
              aria-controls="mobile-menu-drawer"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-md text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/></svg>
              <span class="sr-only">Close menu</span>
            </button>
          </div>

          <!-- Subcategory Header -->
          <div class="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700">
            <span id="drawer-subcategory-title" class="text-lg font-bold text-gray-900 dark:text-white"></span>
            <a id="drawer-subcategory-link" href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-400">Detail</a>
          </div>

          <!-- Subcategory List -->
          <div id="drawer-subcategory-list"></div>

        </div>

      </div>
    </div>
  `;
}

/**
 * Initializes mobile drawer interactivity:
 * - Account toggle expand/collapse
 * - Panel sliding (main -> categories -> subcategory)
 * - MutationObserver to reset panels on drawer close
 */
export function initMobileDrawer(): void {
  // Move drawer to body so it escapes all stacking contexts (sticky-header, TopBar z-30)
  const drawerEl = document.getElementById('mobile-menu-drawer');
  if (drawerEl) document.body.appendChild(drawerEl);

  // TopBar mobile search tabs switching
  const topbarTabs = document.querySelectorAll<HTMLButtonElement>('.topbar-search-tab');
  const mobileSearchType = document.getElementById('mobile-search-type') as HTMLInputElement | null;
  const mobileSearchInput = document.querySelector<HTMLInputElement>('#mobile-search-form input[name="mobile-search"]');
  const TB_ACT = ['font-semibold', 'text-gray-900', 'dark:text-white', 'after:bg-gray-900', 'after:dark:bg-white'];
  const TB_INACT = ['font-normal', 'text-gray-400', 'dark:text-gray-500', 'after:bg-transparent'];
  topbarTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      topbarTabs.forEach(t => { t.classList.remove(...TB_ACT); t.classList.add(...TB_INACT); });
      tab.classList.remove(...TB_INACT);
      tab.classList.add(...TB_ACT);
      const tabValue = tab.getAttribute('data-search-tab') || 'products';
      if (mobileSearchType) {
        mobileSearchType.value = tabValue;
      }
      if (mobileSearchInput) {
        mobileSearchInput.placeholder = `Search ${tabValue}...`;
      }
    });
  });

  // Account toggle
  const accountToggle = document.getElementById('drawer-account-toggle');
  const accountPanel = document.getElementById('drawer-account-panel');
  const accountIcon = document.getElementById('drawer-account-icon');
  if (accountToggle && accountPanel && accountIcon) {
    accountToggle.addEventListener('click', () => {
      accountPanel.classList.toggle('hidden');
      const path = accountIcon.querySelector('path');
      if (path) {
        const isOpen = !accountPanel.classList.contains('hidden');
        path.setAttribute('d', isOpen ? 'M5 12h14' : 'M12 4.5v15m7.5-7.5h-15');
      }
    });
  }

  const panelMain = document.getElementById('drawer-panel-main');
  const panelCategories = document.getElementById('drawer-panel-categories');
  const panelSubcategory = document.getElementById('drawer-panel-subcategory');

  // Open categories panel
  const openCategories = document.getElementById('drawer-open-categories');
  if (openCategories && panelMain && panelCategories) {
    openCategories.addEventListener('click', () => {
      panelMain.classList.add('-translate-x-full');
      panelCategories.classList.remove('translate-x-full');
    });
  }

  // Back from categories
  const categoriesBack = document.getElementById('drawer-categories-back');
  if (categoriesBack && panelMain && panelCategories) {
    categoriesBack.addEventListener('click', () => {
      panelMain.classList.remove('-translate-x-full');
      panelCategories.classList.add('translate-x-full');
    });
  }

  // Open subcategory panel
  const catButtons = document.querySelectorAll<HTMLButtonElement>('[data-drawer-cat-id]');
  const subcategoryTitle = document.getElementById('drawer-subcategory-title');
  const subcategoryLink = document.getElementById('drawer-subcategory-link') as HTMLAnchorElement | null;
  const subcategoryList = document.getElementById('drawer-subcategory-list');

  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const catId = btn.getAttribute('data-drawer-cat-id');
      const cat = megaCategories.find(c => c.id === catId);
      if (!cat || !panelCategories || !panelSubcategory || !subcategoryTitle || !subcategoryLink || !subcategoryList) return;

      subcategoryTitle.textContent = cat.name;
      subcategoryLink.href = `/categories/${cat.id}`;
      subcategoryList.innerHTML = cat.products.map(
        p => `<a href="${p.href}" class="block px-4 py-3 text-sm text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700 transition-colors">${p.name}</a>`
      ).join('');

      panelCategories.classList.add('-translate-x-full');
      panelSubcategory.classList.remove('translate-x-full');
    });
  });

  // Back from subcategory
  const subcategoryBack = document.getElementById('drawer-subcategory-back');
  if (subcategoryBack && panelCategories && panelSubcategory) {
    subcategoryBack.addEventListener('click', () => {
      panelCategories.classList.remove('-translate-x-full');
      panelSubcategory.classList.add('translate-x-full');
    });
  }

  // Reset panels when drawer is closed
  const drawer = document.getElementById('mobile-menu-drawer');
  if (drawer && panelMain && panelCategories && panelSubcategory) {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          if (drawer.classList.contains('-translate-x-full')) {
            setTimeout(() => {
              panelMain.classList.remove('-translate-x-full');
              panelCategories.classList.remove('-translate-x-full');
              panelCategories.classList.add('translate-x-full');
              panelSubcategory.classList.remove('-translate-x-full');
              panelSubcategory.classList.add('translate-x-full');
            }, 300);
          }
        }
      }
    });
    observer.observe(drawer, { attributes: true, attributeFilter: ['class'] });
  }
}

/**
 * Mobile Search Tabs (Products | Manufacturers | Worldwide)
 * Rendered outside the sticky header as a separate non-sticky section.
 */
export function MobileSearchTabs(): string {
  return `
    <div class="lg:hidden flex items-center gap-6 px-3 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900">
      <a href="/" class="topbar-search-tab relative py-2 text-[13px] font-semibold text-gray-900 dark:text-white whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-gray-900 after:dark:bg-white after:rounded-full" data-search-tab="products">Products</a>
      <a href="/manufacturers.html" class="topbar-search-tab relative py-2 text-[13px] font-normal text-gray-400 dark:text-gray-500 whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-transparent after:rounded-full" data-search-tab="manufacturers">Manufacturers</a>
    </div>
  `;
}

/**
 * TopBar Component
 * Renders the top navigation bar containing:
 * - iSTOC logo
 * - Delivery country selector with location popover
 * - Language/Currency selector with settings popover
 * - Messages icon with messages popover
 * - Orders icon with trade assurance popover
 * - Cart with empty/items popover
 * - Auth buttons (Sign In / Join Free pill)
 */
export function TopBar(): string {
  return `
    <div class="relative z-30 dark:bg-gray-900" style="background-color:var(--header-bg);border-bottom:1px solid var(--header-border-color)">
      <div class="container-boxed">
        <!-- Row 1: Logo + Search (mobile) + Icons -->
        <div class="flex items-center h-16 gap-2 lg:gap-0">
          <!-- Logo -->
          <div class="flex-shrink-0">
            ${renderLogo()}
          </div>

          <!-- Mobile Inline Search (between logo and icons) -->
          <div class="flex-1 min-w-0 mx-2 lg:hidden">
            <form id="mobile-search-form" action="/search" method="GET" role="search">
              <input type="hidden" id="mobile-search-type" name="searchType" value="products" />
              <div class="flex">
                <input
                  type="text"
                  name="mobile-search"
                  class="w-full h-10 px-3 text-sm text-gray-900 bg-white border-2 border-primary-400 border-r-0 rounded-l-md focus:ring-1 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-primary-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Search products..."
                  autocomplete="off"
                  aria-label="Search products"
                />
                <a href="/image-search" class="flex items-center justify-center h-10 px-2.5 bg-white border-2 border-primary-400 border-l-0 border-r-0 text-gray-400 hover:text-primary-600 transition-colors dark:bg-gray-700 dark:border-primary-600" aria-label="Image search">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"/>
                  </svg>
                </a>
                <button
                  type="submit"
                  class="flex items-center justify-center h-10 px-4 text-white rounded-r-md transition-colors"
                  style="background: linear-gradient(135deg, var(--search-btn-gradient-start) 0%, var(--search-btn-gradient-end) 100%);"
                  aria-label="Search"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>

          <!-- Desktop Compact Sticky Search -->
          ${renderCompactStickySearch()}

          <!-- Right Side: Selectors + Icons + Cart + Auth -->
          <div class="ml-auto flex items-center gap-2 lg:gap-4 flex-shrink-0">
            <!-- Country Selector (hidden on mobile) -->
            <div class="hidden lg:block">
              ${renderCountrySelector()}
            </div>

            <!-- Language/Currency Selector (hidden on mobile) -->
            <div class="hidden lg:block">
              ${renderLanguageCurrencySelector()}
            </div>

            <!-- Messages Button (hidden on mobile) -->
            <div class="hidden lg:block">
              ${renderMessagesButton()}
            </div>

            <!-- Orders Button (hidden on mobile) -->
            <div class="hidden lg:block">
              ${renderOrdersButton()}
            </div>

            <!-- Cart Button -->
            ${renderCartButton(0)}

            <!-- Auth Buttons (hidden on mobile) -->
            <div class="hidden lg:block">
              ${renderAuthButtons()}
            </div>

            <!-- Mobile Menu Button -->
            <button
              data-drawer-target="mobile-menu-drawer"
              data-drawer-toggle="mobile-menu-drawer"
              class="th-header-icon inline-flex items-center p-2 rounded-md lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              type="button"
              aria-controls="mobile-menu-drawer"
              aria-label="Open main menu"
            >
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Row 2: Search Tabs (Desktop Only) -->
        <div class="hidden lg:flex items-center gap-6 pb-2 -mt-1">
          <a href="/" class="topbar-search-tab relative py-1 text-[13px] font-semibold text-gray-900 dark:text-white whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-gray-900 after:dark:bg-white after:rounded-full" data-search-tab="products">Products</a>
          <a href="/manufacturers.html" class="topbar-search-tab relative py-1 text-[13px] font-normal text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-transparent after:rounded-full" data-search-tab="manufacturers">Manufacturers</a>
        </div>
      </div>

      ${renderMobileDrawer()}
    </div>
  `;
}

/**
 * Initializes header cart popover — listens for cart-add events and updates badge + popover.
 * Supports two rendering modes:
 *   1. groupedItems (multi-supplier) — products listing page sends grouped cart items by supplier
 *   2. Legacy single-product — product detail page sends single product with colorItems
 */
export function initHeaderCart(): void {
  document.addEventListener('cart-add', ((e: CustomEvent) => {
    const { quantity, grandTotal, groupedItems } = e.detail;

    // Update badge
    const badge = document.getElementById('header-cart-badge');
    if (badge) {
      const totalQty = quantity || 0;
      badge.textContent = totalQty > 99 ? '99+' : String(totalQty);
      badge.classList.remove('hidden');
    }

    // Hide empty state
    const emptyState = document.getElementById('header-cart-empty');
    if (emptyState) emptyState.style.display = 'none';

    // Update items
    const itemsContainer = document.getElementById('header-cart-items');
    if (itemsContainer) {
      let html = '';

      if (groupedItems && groupedItems.length > 0) {
        // Multi-supplier mode (products listing page)
        html += '<div class="max-h-72 overflow-y-auto">';
        for (const group of groupedItems) {
          html += `
            <div class="mb-3 last:mb-0">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 truncate">${group.supplierName || 'Supplier'}</p>
              <p class="text-[13px] font-medium text-gray-900 dark:text-white mb-2 leading-tight" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${group.productTitle}</p>`;

          for (const item of group.items) {
            html += `
              <div class="flex items-center gap-3 py-1.5 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <div class="w-10 h-10 rounded-md flex-shrink-0" style="background:${item.colorValue || '#e5e7eb'}"></div>
                <div class="flex-1 min-w-0">
                  <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">${item.label}</p>
                  <div class="flex items-center justify-between mt-0.5">
                    <span class="text-[13px] font-semibold text-gray-900 dark:text-white">$${item.unitPrice.toFixed(2)}</span>
                    <span class="text-xs text-gray-500">x ${item.qty}</span>
                  </div>
                </div>
              </div>`;
          }

          html += '</div>';
        }
        html += '</div>';
      } else {
        // Legacy single-product mode (product detail page)
        const { productTitle, supplierName, unitPrice, colorItems } = e.detail;
        html += `<p class="text-xs text-gray-500 dark:text-gray-400 mb-1 truncate">${supplierName}</p>`;
        html += `<p class="text-sm text-gray-900 dark:text-white mb-2 leading-tight" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${productTitle}</p>`;
        html += '<div class="max-h-52 overflow-y-auto">';

        const items = colorItems && colorItems.length > 0 ? colorItems : null;
        if (items) {
          for (const ci of items) {
            const thumbHtml = ci.colorThumb
              ? `<img src="${ci.colorThumb}" alt="${ci.colorLabel}" class="w-12 h-12 rounded-md object-cover border border-gray-200 dark:border-gray-600 flex-shrink-0">`
              : `<div class="w-12 h-12 rounded-md flex-shrink-0" style="background:${ci.colorValue || '#e5e7eb'}"></div>`;

            for (const vi of ci.variants) {
              const desc = [vi.label, ci.colorLabel].filter(Boolean).join(', ');
              html += `
                <div class="flex items-center gap-3 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  ${thumbHtml}
                  <div class="flex-1 min-w-0">
                    <p class="text-xs text-gray-500 dark:text-gray-400">${desc}</p>
                    <div class="flex items-center justify-between mt-0.5">
                      <span class="text-sm font-semibold text-gray-900 dark:text-white">$${unitPrice.toFixed(2)}</span>
                      <span class="text-xs text-gray-500">x ${vi.qty}</span>
                    </div>
                  </div>
                </div>`;
            }
          }
        } else {
          html += `
            <div class="flex items-center gap-3 py-2">
              <div class="w-12 h-12 rounded-md flex-shrink-0" style="background:#e5e7eb"></div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mt-0.5">
                  <span class="text-sm font-semibold text-gray-900 dark:text-white">$${unitPrice.toFixed(2)}</span>
                  <span class="text-xs text-gray-500">x ${quantity}</span>
                </div>
              </div>
            </div>`;
        }
        html += '</div>';
      }

      itemsContainer.innerHTML = html;
      itemsContainer.classList.remove('hidden');
    }

    // Update subtotal
    const subtotalContainer = document.getElementById('header-cart-subtotal');
    const subtotalPrice = document.getElementById('header-cart-subtotal-price');
    if (subtotalContainer) subtotalContainer.style.display = 'flex';
    if (subtotalPrice) subtotalPrice.textContent = `$${grandTotal.toFixed(2)}`;
  }) as EventListener);
}
