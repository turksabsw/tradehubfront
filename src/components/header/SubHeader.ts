/**
 * SubHeader Component
 * Secondary navigation bar with "All Categories" trigger (amber text),
 * navigation links (each triggers a different mega menu view), and utility links
 */

/** Right-side utility links (non-mega-trigger) */
const utilityLinks = [
  { label: 'Sell on iSTOC', href: '/sell' },
];

/**
 * Generates the "All Categories" mega menu trigger
 */
function renderCategoriesTrigger(): string {
  return `
    <button
      id="mega-menu-trigger"
      class="mega-trigger subheader-link th-subheader-link relative flex items-center gap-2 px-3 py-2.5 rounded-md dark:text-primary-400 dark:hover:text-primary-300 dark:hover:bg-gray-800/60 transition-all"
      style="color:var(--subheader-active-color)"
      type="button"
      aria-expanded="false"
      data-mega-target="categories"
    >
      <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
      <span>All Categories</span>
    </button>
  `;
}

/**
 * Generates the main navigation links — each triggers its own mega menu view
 */
function renderNavigationLinks(): string {
  return `
    <div class="hidden lg:flex items-center gap-1">
      <button
        class="mega-trigger subheader-link th-subheader-link relative flex items-center gap-1.5 px-3 py-2.5 rounded-md dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800/60 transition-all"
        type="button"
        data-mega-target="featured"
      >
        <span>Featured Selections</span>
      </button>
      <button
        class="mega-trigger subheader-link th-subheader-link relative flex items-center gap-1.5 px-3 py-2.5 rounded-md dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800/60 transition-all"
        type="button"
        data-mega-target="protections"
      >
        <span>Order Protections</span>
      </button>
    </div>
  `;
}

/**
 * Generates the right-side utility links
 */
function renderUtilityLinks(): string {
  return `
    <div class="hidden lg:flex items-center gap-1">
      <button
        class="mega-trigger subheader-link th-subheader-link relative px-3 py-2.5 rounded-md dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800/60 transition-all"
        type="button"
        data-mega-target="buyer-central"
      >
        Buyer Central
      </button>
      <button
        class="mega-trigger subheader-link th-subheader-link relative px-3 py-2.5 rounded-md dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800/60 transition-all"
        type="button"
        data-mega-target="help-center"
      >
        Help Center
      </button>
      <button
        class="mega-trigger subheader-link th-subheader-link relative px-3 py-2.5 rounded-md dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800/60 transition-all"
        type="button"
        data-mega-target="app-extension"
      >
        App &amp; Extension
      </button>
      ${utilityLinks.map(link => `
        <a
          href="${link.href}"
          class="th-subheader-link px-3 py-2.5 rounded-md dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-gray-800/60 transition-all"
        >
          ${link.label}
        </a>
      `).join('')}
    </div>
  `;
}

/**
 * SubHeader Component
 */
export function SubHeader(): string {
  return `
    <nav class="hidden lg:block dark:bg-gray-900 dark:border-gray-700" style="background-color:var(--subheader-bg);border-bottom:1px solid var(--subheader-border-color)" aria-label="Secondary navigation">
      <div class="container-boxed">
        <div class="flex items-center justify-between">
          <!-- Left Side: Categories Trigger + Navigation Links -->
          <div class="flex items-center gap-1 lg:gap-2">
            ${renderCategoriesTrigger()}
            ${renderNavigationLinks()}
          </div>

          <!-- Right Side: Utility Links -->
          ${renderUtilityLinks()}
        </div>
      </div>
    </nav>
  `;
}
