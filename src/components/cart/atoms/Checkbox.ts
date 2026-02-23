/**
 * Checkbox Atom
 * Custom styled checkbox matching the 'next-checkbox-wrapper' styling.
 * Supports checked/unchecked/indeterminate states.
 * Orange fill when checked (#ff6600 or theme primary).
 */

export interface CheckboxProps {
  id: string;
  checked: boolean;
  indeterminate?: boolean;
  onChange?: string;
}

export function Checkbox({ id, checked, indeterminate = false, onChange }: CheckboxProps): string {
  const checkedAttr = checked ? ' checked' : '';
  const indeterminateData = indeterminate ? ' data-indeterminate="true"' : '';
  const onChangeAttr = onChange ? ` data-onchange="${onChange}"` : '';

  const wrapperClass = checked ? 'next-checkbox-wrapper checked' : 'next-checkbox-wrapper';

  return `
    <label class="${wrapperClass}" for="${id}">
      <span class="next-checkbox">
        <input
          type="checkbox"
          id="${id}"
          class="next-checkbox-input"
          data-checkbox
          ${checkedAttr}
          ${indeterminateData}
          ${onChangeAttr}
          role="checkbox"
          aria-checked="${indeterminate ? 'mixed' : String(checked)}"
        />
        <span class="next-checkbox-inner"></span>
      </span>
    </label>
  `.trim();
}

export function initCheckbox(container?: HTMLElement): void {
  const root = container || document;
  const wrappers = root.querySelectorAll<HTMLElement>('.next-checkbox-wrapper');

  wrappers.forEach((wrapper) => {
    const input = wrapper.querySelector<HTMLInputElement>('.next-checkbox-input');
    if (!input) return;

    // Set indeterminate state from data attribute
    if (input.dataset.indeterminate === 'true') {
      input.indeterminate = true;
    }

    input.addEventListener('change', () => {
      input.indeterminate = false;
      input.removeAttribute('data-indeterminate');
      input.setAttribute('aria-checked', String(input.checked));
      wrapper.classList.toggle('checked', input.checked);

      // Dispatch custom event for parent components
      const handlerId = input.dataset.onchange;
      if (handlerId) {
        input.dispatchEvent(new CustomEvent('checkbox-change', {
          bubbles: true,
          detail: { id: input.id, checked: input.checked, handlerId },
        }));
      }
    });
  });
}
