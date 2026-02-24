/**
 * EmptyState Shared Component
 * Centered flex-col layout with SVG icon, title text, and optional link.
 * Link color is configurable (defaults to orange #E67A00).
 */

import type { EmptyStateProps } from '../../types/buyerDashboard';

export interface EmptyStateFullProps extends EmptyStateProps {
  linkColor?: string;
}

export function EmptyState({ icon, text, linkText, linkHref, linkColor = '#E67A00' }: EmptyStateFullProps): string {
  const linkHtml = linkText && linkHref
    ? `<a href="${linkHref}" class="text-[13px] mt-2 hover:underline" style="color: ${linkColor}">${linkText}</a>`
    : '';

  return `
    <div class="flex flex-col items-center justify-center py-8">
      <div class="w-12 h-12 mb-3">${icon}</div>
      <p class="text-[14px] text-[#999] mb-1">${text}</p>
      ${linkHtml}
    </div>
  `;
}
