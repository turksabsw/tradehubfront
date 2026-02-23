/**
 * FooterPolicy Component
 * Bottom bar with logo, policy links, and copyright notice
 * Layout: stacked on mobile, horizontal three-column on xl+
 */

import type { NavLink } from '../../types/navigation';

/**
 * Policy links configuration
 */
const policyLinks: NavLink[] = [
  { label: 'Legal Notice', href: '/legal/notice' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Product Listing Policy', href: '/legal/product-listing' },
  { label: 'Terms of Use', href: '/terms' },
  { label: 'Intellectual Property', href: '/legal/ip' },
  { label: 'Accessibility', href: '/accessibility' },
];

/**
 * FooterPolicy Component
 * Renders the footer bottom bar with logo, policy links, and copyright.
 */
export function FooterPolicy(): string {
  return `
    <section class="dark:bg-gray-800/80 border-t dark:border-gray-700 py-5" style="background-color:var(--footer-bg);border-color:var(--footer-border-color)" aria-label="Policy links and copyright">
      <div class="container-boxed">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <!-- Policy Links -->
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1.5 text-xs dark:text-gray-400" style="color:var(--footer-text-color)">
            ${policyLinks.map(link => `
              <a href="${link.href}" class="th-footer-link dark:hover:text-gray-200 transition-colors duration-200">${link.label}</a>
            `).join('')}
          </div>

          <!-- Copyright -->
          <p class="text-xs dark:text-gray-500 text-center md:text-right whitespace-nowrap" style="color:var(--footer-text-color)">
            &copy; 2010-2026 <a href="/" class="th-footer-link dark:hover:text-gray-300 transition-colors duration-200">iSTOC.com</a>. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  `;
}

/**
 * Get policy links data for use by other components
 */
export function getPolicyLinksData(): NavLink[] {
  return policyLinks;
}
