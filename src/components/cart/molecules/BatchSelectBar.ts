/**
 * BatchSelectBar Molecule
 * Top bar with 'Tüm ürünleri seç' (Select all) Checkbox and batch action button
 * (delete selected). Shows count of selected items.
 * Checkbox toggles all items when clicked.
 */

import { Checkbox } from '../atoms/Checkbox';

export interface BatchSelectBarProps {
  totalCount: number;
  selectedCount: number;
}

export function BatchSelectBar({ totalCount, selectedCount }: BatchSelectBarProps): string {
  const allSelected = totalCount > 0 && selectedCount === totalCount;
  const someSelected = selectedCount > 0 && selectedCount < totalCount;

  const checkbox = Checkbox({
    id: 'batch-select-all',
    checked: allSelected,
    indeterminate: someSelected,
    onChange: 'batch-select-all',
  });

  const countText = selectedCount > 0
    ? `<span class="sc-c-batch-count text-sm text-[#999]">(${selectedCount}/${totalCount})</span>`
    : '';

  const deleteDisabled = selectedCount === 0 ? ' disabled' : '';

  return `
    <div class="sc-c-batch-select-bar flex items-center justify-between py-3 px-5 bg-white border border-[#e5e5e5] rounded-lg">
      <div class="flex items-center gap-2">
        ${checkbox}
        <span class="text-sm leading-5 text-[#222]">Tüm ürünleri seç</span>
        ${countText}
      </div>
      <div class="flex items-center">
        <button type="button" class="sc-c-batch-delete-btn bg-transparent border-none text-[#999] text-sm cursor-pointer px-2 py-1 transition-colors duration-150 hover:text-[#ff4747] disabled:opacity-40 disabled:cursor-not-allowed"${deleteDisabled} aria-label="Seçilenleri sil">
          Seçilenleri sil
        </button>
      </div>
    </div>
  `.trim();
}

export function initBatchSelectBar(container?: HTMLElement): void {
  const root = container || document;
  const bar = root.querySelector<HTMLElement>('.sc-c-batch-select-bar');
  if (!bar) return;

  const checkbox = bar.querySelector<HTMLInputElement>('#batch-select-all');
  if (checkbox) {
    checkbox.addEventListener('change', () => {
      bar.dispatchEvent(new CustomEvent('batch-select-toggle', {
        bubbles: true,
        detail: { selectAll: checkbox.checked },
      }));
    });
  }

  const deleteBtn = bar.querySelector<HTMLButtonElement>('.sc-c-batch-delete-btn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      bar.dispatchEvent(new CustomEvent('batch-delete', {
        bubbles: true,
      }));
    });
  }
}
