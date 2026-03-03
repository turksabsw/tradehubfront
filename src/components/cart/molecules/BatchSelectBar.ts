/**
 * Batch select bar for cart page.
 * Alpine.js: Uses x-data on container. @checkbox-change bridges to
 * batch-select-toggle for CartPage compatibility. Delete uses @click + $dispatch.
 */

import { Checkbox } from '../atoms/Checkbox';

export interface BatchSelectBarProps {
  totalCount: number;
  selectedCount: number;
}

export function BatchSelectBar({ totalCount, selectedCount }: BatchSelectBarProps): string {
  const allSelected = totalCount > 0 && selectedCount === totalCount;
  const someSelected = selectedCount > 0 && selectedCount < totalCount;

  return `
    <div class="sc-c-batch-select-bar flex items-center justify-between gap-3 px-5 py-4 rounded-3xl border border-border-default bg-surface max-sm:px-3 max-sm:py-3" x-data @checkbox-change="$dispatch('batch-select-toggle', { selectAll: $event.detail.checked })">
      <div class="flex items-center gap-3 min-w-0">
        ${Checkbox({ id: 'batch-select-all', checked: allSelected, indeterminate: someSelected, onChange: 'batch-select-all' })}
        <p class="text-base text-text-heading truncate">Tüm ürünleri seç <span class="sc-c-batch-count text-text-tertiary">(${totalCount})</span></p>
      </div>

      <button type="button" class="sc-c-batch-delete-btn text-sm text-text-tertiary hover:text-error-500 disabled:opacity-40 disabled:cursor-not-allowed" ${selectedCount === 0 ? 'disabled' : ''} @click="$dispatch('batch-delete')">
        Seçilenleri sil
      </button>
    </div>
  `.trim();
}

/** @deprecated Alpine.js handles batch events declaratively. @checkbox-change bridges to batch-select-toggle; delete uses @click + $dispatch. Kept as no-op for backward compatibility. */
export function initBatchSelectBar(_container?: HTMLElement): void {
  // No-op — Alpine x-data on bar + @checkbox-change + @click="$dispatch('batch-delete')" handles all behavior.
}
