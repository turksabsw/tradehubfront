/**
 * FooterCopyright Component
 * Copyright functionality migrated to FooterPolicy component.
 * This file returns empty string for backwards compatibility.
 */

/**
 * FooterCopyright Component
 * @deprecated Copyright now rendered inside FooterPolicy
 */
export function FooterCopyright(): string {
  return '';
}

/**
 * Get copyright configuration for use by other components
 */
export function getCopyrightConfig(): { companyName: string; year: number; rightsText: string } {
  return { companyName: 'iSTOC', year: 2026, rightsText: 'All rights reserved.' };
}
