/**
 * NewBuyerInfo Component
 * White card composing UserInfoCard + OperationSlider.
 */

import type { NewBuyerInfoProps } from '../../types/buyerDashboard';
import { UserInfoCard } from './UserInfoCard';
import { OperationSlider, initOperationSlider } from './OperationSlider';

export function NewBuyerInfo(props: NewBuyerInfoProps): string {
  return `
    <div class="new-buyer-info">
      ${UserInfoCard({ user: props.user, stats: props.stats })}
      ${OperationSlider({ notifications: props.notifications })}
    </div>
  `;
}

export function initNewBuyerInfo(): void {
  initOperationSlider();
}
