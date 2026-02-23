/**
 * StickyHeaderSearch
 * Handles expand/collapse behavior for the compact header search bar.
 * The compact search is always visible on desktop (md+).
 */

function setInteractiveState(elements: HTMLElement[], isEnabled: boolean): void {
  elements.forEach((element) => {
    if (isEnabled) {
      element.removeAttribute('tabindex');
    } else {
      element.setAttribute('tabindex', '-1');
    }
  });
}

export function initStickyHeaderSearch(): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;

  const compactShell = document.getElementById('topbar-compact-search-shell') as HTMLElement | null;
  const compactSearch = document.getElementById('topbar-compact-search') as HTMLFormElement | null;
  const compactInput = document.getElementById('topbar-compact-search-input') as HTMLInputElement | null;
  const compactImageSearch = document.getElementById('topbar-compact-image-search') as HTMLAnchorElement | null;
  const compactImageSearchLabel = document.getElementById('topbar-compact-image-search-label') as HTMLSpanElement | null;
  const compactSubmit = document.getElementById('topbar-compact-search-submit') as HTMLButtonElement | null;
  const compactSecondaryRow = document.getElementById('topbar-compact-secondary-row') as HTMLElement | null;
  const compactDropdown = document.getElementById('topbar-compact-dropdown') as HTMLElement | null;

  if (
    !compactShell
    || !compactSearch
    || !compactInput
    || !compactImageSearch
    || !compactImageSearchLabel
    || !compactSubmit
    || !compactSecondaryRow
    || !compactDropdown
  ) return;

  const expandedInteractiveElements = Array.from(
    compactShell.querySelectorAll<HTMLElement>('[data-compact-expanded-interactive="true"]'),
  );
  const valuePickers = Array.from(
    compactShell.querySelectorAll<HTMLButtonElement>('[data-search-value]'),
  );
  let isExpanded = false;

  // Mark as visible and interactive (always visible on desktop now)
  compactSearch.setAttribute('aria-hidden', 'false');

  const syncDropdownOffset = (): void => {
    const dropdownTop = compactSearch.offsetTop + compactSearch.offsetHeight + 8;
    compactDropdown.style.top = `${dropdownTop}px`;
  };

  const openExpanded = (): void => {
    if (isExpanded) return;
    isExpanded = true;

    compactSearch.setAttribute('aria-expanded', 'true');
    compactInput.setAttribute('aria-expanded', 'true');
    compactDropdown.setAttribute('aria-hidden', 'false');

    compactSearch.classList.remove('rounded-full');
    compactSearch.classList.add('rounded-md', 'shadow-md', 'pt-0.5');
    compactInput.classList.add('text-base', 'py-2.5');
    compactInput.classList.add('pr-12');
    compactSubmit.classList.remove('px-4', 'py-1.5', 'text-sm');
    compactSubmit.classList.add('px-6', 'py-2', 'text-base');
    compactSubmit.classList.add('absolute', 'right-4', 'bottom-2');
    compactImageSearch.classList.remove('h-8', 'w-8', 'rounded-full', 'hover:bg-gray-100', 'dark:hover:bg-gray-700');
    compactImageSearch.classList.add(
      'absolute',
      'left-4',
      'bottom-2',
      'h-9',
      'w-auto',
      'gap-1.5',
      'rounded-md',
      'px-0',
      'text-sm',
      'font-medium',
      'text-gray-700',
      'hover:bg-transparent',
      'dark:text-gray-300',
      'dark:hover:bg-transparent',
    );
    compactImageSearchLabel.classList.remove('hidden');
    compactSecondaryRow.classList.remove('hidden');
    compactSecondaryRow.classList.add('block');
    syncDropdownOffset();
    compactDropdown.classList.remove('hidden');
    setInteractiveState(expandedInteractiveElements, true);
  };

  const closeExpanded = (): void => {
    if (!isExpanded) return;
    isExpanded = false;
    compactSearch.setAttribute('aria-expanded', 'false');
    compactInput.setAttribute('aria-expanded', 'false');
    compactDropdown.setAttribute('aria-hidden', 'true');

    compactSearch.classList.remove('rounded-md', 'shadow-md', 'pt-0.5');
    compactSearch.classList.add('rounded-full');
    compactInput.classList.remove('text-base', 'py-2.5');
    compactInput.classList.remove('pr-12');
    compactSubmit.classList.remove('px-6', 'py-2', 'text-base');
    compactSubmit.classList.add('px-4', 'py-1.5', 'text-sm');
    compactSubmit.classList.remove('absolute', 'right-4', 'bottom-2');
    compactImageSearch.classList.remove(
      'absolute',
      'left-4',
      'bottom-2',
      'h-9',
      'w-auto',
      'gap-1.5',
      'rounded-md',
      'px-0',
      'text-sm',
      'font-medium',
      'text-gray-700',
      'hover:bg-transparent',
      'dark:text-gray-300',
      'dark:hover:bg-transparent',
    );
    compactImageSearch.classList.add('h-8', 'w-8', 'rounded-full', 'hover:bg-gray-100', 'dark:hover:bg-gray-700');
    compactImageSearchLabel.classList.add('hidden');
    compactSecondaryRow.classList.remove('block');
    compactSecondaryRow.classList.add('hidden');
    compactDropdown.classList.add('hidden');
    compactDropdown.style.removeProperty('top');
    setInteractiveState(expandedInteractiveElements, false);
  };

  // Click / focus → expand
  compactSearch.addEventListener('click', openExpanded);
  compactInput.addEventListener('focus', openExpanded);

  // Value pickers fill the input
  valuePickers.forEach((picker) => {
    picker.addEventListener('click', () => {
      const value = picker.dataset.searchValue;
      if (!value) return;
      compactInput.value = value;
      compactInput.focus();
    });
  });

  // Click outside → collapse
  document.addEventListener('mousedown', (event: MouseEvent) => {
    if (!isExpanded) return;
    const target = event.target as Node;
    if (compactShell.contains(target)) return;
    closeExpanded();
  });

  // Sync dropdown offset on resize
  window.addEventListener('resize', () => {
    if (isExpanded) {
      syncDropdownOffset();
    }
  }, { passive: true });

  // Initial state: collapsed
  setInteractiveState(expandedInteractiveElements, false);
}
