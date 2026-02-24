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

  const checkedCls = checked ? ' border-[#ff6a00] bg-[#ff6a00]' : '';

  return `
    <label class="next-checkbox-wrapper inline-flex items-center gap-2 cursor-pointer select-none${checked ? ' checked' : ''}" for="${id}">
      <span class="next-checkbox inline-block relative w-4 h-4 border border-[#c4c6cf] rounded-sm bg-white flex-shrink-0 transition-colors duration-200${checkedCls}">
        <input
          type="checkbox"
          id="${id}"
          class="next-checkbox-input absolute opacity-0 w-4 h-4 cursor-pointer z-[1] m-0"
          data-checkbox
          ${checkedAttr}
          ${indeterminateData}
          ${onChangeAttr}
          role="checkbox"
          aria-checked="${indeterminate ? 'mixed' : String(checked)}"
        />
        <span class="next-checkbox-inner absolute inset-0"></span>
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

      // Toggle checked styling on the checkbox span
      const checkboxSpan = wrapper.querySelector('.next-checkbox');
      if (checkboxSpan) {
        checkboxSpan.classList.toggle('border-[#ff6a00]', input.checked);
        checkboxSpan.classList.toggle('bg-[#ff6a00]', input.checked);
        checkboxSpan.classList.toggle('border-[#c4c6cf]', !input.checked);
        checkboxSpan.classList.toggle('bg-white', !input.checked);
      }

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
