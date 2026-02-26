/**
 * SectionCard Shared Component
 * White background card wrapper with padding and border-radius.
 */

import type { SectionCardProps } from '../../types/buyerDashboard';

export function SectionCard({ children, className = '' }: SectionCardProps): string {
  return `
    <div class="bg-white dark:bg-gray-800 rounded-lg p-5${className ? ` ${className}` : ''}">
      ${children}
    </div>
  `;
}
