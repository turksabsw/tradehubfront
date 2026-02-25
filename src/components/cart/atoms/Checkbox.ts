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
  const isActive = checked || indeterminate;
  const activeCls = isActive ? ' border-transparent bg-[#222]' : ' border-2 border-gray-400';

  return `
    <label class="next-checkbox-wrapper inline-flex items-center gap-2 cursor-pointer select-none${checked ? ' checked' : ''}${indeterminate ? ' indeterminate' : ''}" for="${id}">
      <span class="next-checkbox inline-block relative w-6 h-6 rounded-[4px] bg-white flex-shrink-0 transition-all duration-100${activeCls}">
        <input
          type="checkbox"
          id="${id}"
          class="next-checkbox-input absolute opacity-0 w-6 h-6 cursor-pointer z-[1] m-0"
          data-checkbox
          ${checkedAttr}
          ${indeterminateData}
          ${onChangeAttr}
          role="checkbox"
          aria-checked="${indeterminate ? 'mixed' : String(checked)}"
        />
        <span class="next-checkbox-inner absolute inset-0 block h-6 w-6"></span>
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

    // İlk render'da indeterminate görsel stilini uygula
    if (input.indeterminate) {
      wrapper.classList.add('indeterminate');
      const checkboxSpan = wrapper.querySelector('.next-checkbox');
      if (checkboxSpan) {
        checkboxSpan.classList.add('border-transparent', 'bg-[#222]');
        checkboxSpan.classList.remove('border-[#d8d8d8]', 'bg-white');
      }
    }

    input.addEventListener('change', () => {
      input.indeterminate = false;
      input.removeAttribute('data-indeterminate');
      input.setAttribute('aria-checked', String(input.checked));
      wrapper.classList.toggle('checked', input.checked);
      wrapper.classList.remove('indeterminate');

      // Toggle checked styling on the checkbox span
      const checkboxSpan = wrapper.querySelector('.next-checkbox');
      if (checkboxSpan) {
        checkboxSpan.classList.toggle('border-transparent', input.checked);
        checkboxSpan.classList.toggle('bg-[#222]', input.checked);
        checkboxSpan.classList.toggle('border-gray-400', !input.checked);
        checkboxSpan.classList.toggle('border-2', !input.checked);
        // Ensure standard border is removed when checked
        if (input.checked) {
          checkboxSpan.classList.remove('border-2');
        }
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
