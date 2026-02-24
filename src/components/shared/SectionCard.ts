/**
 * SectionCard Shared Component
 * White background card wrapper with padding and border-radius.
 */

import type { SectionCardProps } from '../../types/buyerDashboard';

export function SectionCard({ children, className = '' }: SectionCardProps): string {
  return `
    <div class="bg-white rounded-lg p-5${className ? ` ${className}` : ''}">
      ${children}
    </div>
  `;
}
