/**
 * Checkbox Atom
 * Tailwind-only custom checkbox with checked + indeterminate visuals.
 */

export interface CheckboxProps {
  id: string;
  checked: boolean;
  indeterminate?: boolean;
  onChange?: string;
}

function renderVisual(checked: boolean, indeterminate: boolean): string {
  const active = checked || indeterminate;
  const boxClass = active
    ? 'next-checkbox border-transparent bg-text-primary text-white'
    : 'next-checkbox border-border-strong bg-surface text-transparent';

  const checkClass = checked ? 'next-checkbox-check block' : 'next-checkbox-check hidden';
  const dashClass = indeterminate && !checked ? 'next-checkbox-dash block' : 'next-checkbox-dash hidden';

  return `
    <span class="${boxClass} relative inline-flex w-5 h-5 rounded-[4px] border transition-colors duration-150">
      <svg class="${checkClass} absolute inset-0 m-auto" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m5 13 4 4L19 7"/>
      </svg>
      <span class="${dashClass} absolute left-1 right-1 top-1/2 -translate-y-1/2 h-[2px] bg-current rounded" aria-hidden="true"></span>
    </span>
  `;
}

export function Checkbox({ id, checked, indeterminate = false, onChange }: CheckboxProps): string {
  const checkedAttr = checked ? 'checked' : '';
  const indeterminateAttr = indeterminate ? 'data-indeterminate="true"' : '';
  const onChangeAttr = onChange ? `data-onchange="${onChange}"` : '';

  return `
    <label class="next-checkbox-wrapper inline-flex items-center cursor-pointer select-none" for="${id}">
      <input
        type="checkbox"
        id="${id}"
        class="next-checkbox-input sr-only"
        data-checkbox
        ${checkedAttr}
        ${indeterminateAttr}
        ${onChangeAttr}
        aria-checked="${indeterminate ? 'mixed' : String(checked)}"
      />
      ${renderVisual(checked, indeterminate)}
    </label>
  `.trim();
}

function syncVisual(input: HTMLInputElement): void {
  const wrapper = input.closest<HTMLElement>('.next-checkbox-wrapper');
  if (!wrapper) return;

  const box = wrapper.querySelector<HTMLElement>('.next-checkbox');
  const check = wrapper.querySelector<HTMLElement>('.next-checkbox-check');
  const dash = wrapper.querySelector<HTMLElement>('.next-checkbox-dash');
  if (!box || !check || !dash) return;

  const active = input.checked || input.indeterminate;

  box.classList.toggle('border-transparent', active);
  box.classList.toggle('bg-text-primary', active);
  box.classList.toggle('text-white', active);

  box.classList.toggle('border-border-strong', !active);
  box.classList.toggle('bg-surface', !active);

  check.classList.toggle('hidden', !input.checked);
  check.classList.toggle('block', input.checked);

  const showDash = input.indeterminate && !input.checked;
  dash.classList.toggle('hidden', !showDash);
  dash.classList.toggle('block', showDash);

  wrapper.classList.toggle('checked', input.checked);
  wrapper.classList.toggle('indeterminate', input.indeterminate);

  if (input.indeterminate) input.setAttribute('data-indeterminate', 'true');
  else input.removeAttribute('data-indeterminate');
}

export function initCheckbox(container?: HTMLElement): void {
  const root = container || document;
  const inputs = root.querySelectorAll<HTMLInputElement>('.next-checkbox-input');

  inputs.forEach((input) => {
    if (input.dataset.indeterminate === 'true') {
      input.indeterminate = true;
    }

    syncVisual(input);

    input.addEventListener('change', () => {
      input.indeterminate = false;
      input.setAttribute('aria-checked', String(input.checked));
      syncVisual(input);

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
