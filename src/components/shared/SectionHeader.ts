/**
 * SectionHeader Shared Component
 * Flex row with title (18px bold) and optional action link (13px gray).
 */

import type { SectionHeaderProps } from '../../types/buyerDashboard';

export function SectionHeader({ title, actionText, actionHref }: SectionHeaderProps): string {
  const actionHtml = actionText && actionHref
    ? `<a href="${actionHref}" class="text-[13px] text-[#999] hover:text-[#222] transition-colors">${actionText}</a>`
    : '';

  return `
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-[18px] font-bold text-[#222] leading-tight">${title}</h3>
      ${actionHtml}
    </div>
  `;
}
