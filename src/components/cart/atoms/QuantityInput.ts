/**
 * QuantityInput Atom
 * Number picker with minus/plus buttons flanking a numeric input.
 * Matches 'number-picker' pattern from codex brief.
 * Minus disabled at min, plus disabled at max. Input accepts direct typing within range.
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
  const minusDisabled = value <= min ? ' disabled' : '';
  const plusDisabled = value >= max ? ' disabled' : '';

  return `
    <div class="number-picker" data-id="${id}" data-min="${min}" data-max="${max}" data-step="${step}">
      <button type="button" class="number-picker-btn number-picker-minus"${minusDisabled} aria-label="Decrease quantity">&minus;</button>
      <input
        type="number"
        id="${id}"
        class="number-picker-input"
        data-quantity-input
        value="${value}"
        min="${min}"
        max="${max}"
        step="${step}"
        aria-label="Quantity"
      />
      <button type="button" class="number-picker-btn number-picker-plus"${plusDisabled} aria-label="Increase quantity">+</button>
    </div>
  `.trim();
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
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

    function updateButtons(): void {
      const val = Number(input!.value);
      minusBtn!.disabled = val <= min;
      plusBtn!.disabled = val >= max;
    }

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
      const clamped = clamp(isNaN(raw) ? min : raw, min, max);
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
