/**
 * Batch select bar for cart page.
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
    <div class="sc-c-batch-select-bar flex items-center justify-between gap-3 px-5 py-4 rounded-3xl border border-border-default bg-surface max-sm:px-3 max-sm:py-3">
      <div class="flex items-center gap-3 min-w-0">
        ${Checkbox({ id: 'batch-select-all', checked: allSelected, indeterminate: someSelected, onChange: 'batch-select-all' })}
        <p class="text-base text-text-heading truncate">Tüm ürünleri seç <span class="sc-c-batch-count text-text-tertiary">(${totalCount})</span></p>
      </div>

      <button type="button" class="sc-c-batch-delete-btn text-sm text-text-tertiary hover:text-error-500 disabled:opacity-40 disabled:cursor-not-allowed" ${selectedCount === 0 ? 'disabled' : ''}>
        Seçilenleri sil
      </button>
    </div>
  `.trim();
}

export function initBatchSelectBar(container?: HTMLElement): void {
  const root = container || document;
  const bar = root.querySelector<HTMLElement>('.sc-c-batch-select-bar');
  if (!bar) return;

  const checkbox = bar.querySelector<HTMLInputElement>('#batch-select-all');
  checkbox?.addEventListener('change', () => {
    bar.dispatchEvent(new CustomEvent('batch-select-toggle', {
      bubbles: true,
      detail: { selectAll: checkbox.checked },
    }));
  });

  const deleteBtn = bar.querySelector<HTMLButtonElement>('.sc-c-batch-delete-btn');
  deleteBtn?.addEventListener('click', () => {
    bar.dispatchEvent(new CustomEvent('batch-delete', { bubbles: true }));
  });
}
