/**
 * QuantityInput Atom
 * Rounded stepper used in cart SKU rows.
 */

export interface QuantityInputProps {
  id: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
}

export function QuantityInput({
  id,
  value,
  min = 1,
  max = 9999,
  step = 1,
}: QuantityInputProps): string {
  const minusDisabled = value <= min ? 'disabled' : '';
  const plusDisabled = value >= max ? 'disabled' : '';

  return `
    <div class="number-picker inline-flex items-center w-[136px] h-[40px] px-[2px] bg-white border border-[#ddd] rounded-full select-none" data-id="${id}" data-min="${min}" data-max="${max}" data-step="${step}">
      <button type="button" class="number-picker-button number-picker-minus flex items-center justify-center shrink-0 w-[36px] h-[36px] rounded-full text-text-primary hover:bg-[#F2F2F2] transition-colors disabled:opacity-40 disabled:cursor-not-allowed" ${minusDisabled} aria-label="Miktar azalt">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <input
        type="number"
        id="${id}"
        class="number-picker-input flex-1 w-0 h-full border-none focus:ring-0 focus:outline-none focus:border-none text-center text-[14px] font-medium text-text-heading bg-transparent p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        data-quantity-input
        value="${value}"
        min="${min}"
        max="${max}"
        step="${step}"
        aria-label="Miktar"
      />
      <button type="button" class="number-picker-button number-picker-plus flex items-center justify-center shrink-0 w-[36px] h-[36px] rounded-full text-text-primary hover:bg-[#F2F2F2] transition-colors disabled:opacity-40 disabled:cursor-not-allowed" ${plusDisabled} aria-label="Miktar artır">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M5 12h14" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  `.trim();
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function initQuantityInputs(container?: HTMLElement): void {
  const root = container || document;
  const pickers = root.querySelectorAll<HTMLElement>('.number-picker');

  pickers.forEach((picker) => {
    const input = picker.querySelector<HTMLInputElement>('.number-picker-input');
    const minusBtn = picker.querySelector<HTMLButtonElement>('.number-picker-minus');
    const plusBtn = picker.querySelector<HTMLButtonElement>('.number-picker-plus');
    if (!input || !minusBtn || !plusBtn) return;

    const min = Number(picker.dataset.min ?? 1);
    const max = Number(picker.dataset.max ?? 9999);
    const step = Number(picker.dataset.step ?? 1);

    const updateButtons = () => {
      const value = Number(input.value);
      minusBtn.disabled = value <= min;
      plusBtn.disabled = value >= max;
    };

    minusBtn.addEventListener('click', () => {
      const current = Number(input.value) || min;
      const next = clamp(current - step, min, max);
      input.value = String(next);
      updateButtons();
      input.dispatchEvent(new CustomEvent('quantity-change', {
        bubbles: true,
        detail: { id: input.id, value: next },
      }));
    });

    plusBtn.addEventListener('click', () => {
      const current = Number(input.value) || min;
      const next = clamp(current + step, min, max);
      input.value = String(next);
      updateButtons();
      input.dispatchEvent(new CustomEvent('quantity-change', {
        bubbles: true,
        detail: { id: input.id, value: next },
      }));
    });

    input.addEventListener('change', () => {
      const raw = Number(input.value);
      const clamped = clamp(Number.isNaN(raw) ? min : raw, min, max);
      input.value = String(clamped);
      updateButtons();
      input.dispatchEvent(new CustomEvent('quantity-change', {
        bubbles: true,
        detail: { id: input.id, value: clamped },
      }));
    });

    updateButtons();
  });
}
