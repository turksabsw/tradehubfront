/**
 * FooterSocial Component
 * Social media functionality migrated to FooterLinks component.
 * This file returns empty string for backwards compatibility.
 */

import type { SocialLink } from '../../types/navigation';

/**
 * FooterSocial Component
 * @deprecated Social media icons now rendered inside FooterLinks
 */
export function FooterSocial(): string {
  return '';
}

/**
 * Get social links data for use by other components
 */
export function getSocialLinksData(): SocialLink[] {
  return [];
}

/**
 * Get app store badges data for use by other components
 */
export function getAppStoreBadgesData(): { name: string; href: string; store: string }[] {
  return [];
}
