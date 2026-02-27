/**
 * OrdersSection Component
 * Composes header ('Siparişler' + 'Tümünü görüntüle >') + tabs + content.
 * initOrdersSection() handles tab clicks, dropdown toggle, outside click close.
 */

import type { OrdersState } from '../../types/buyerDashboard';
import { ORDER_TABS, ORDER_FILTERS } from './ordersData';
import { OrdersTabs } from './OrdersTabs';
import { OrdersContent } from './OrdersContent';

export function OrdersSection(): string {
  const initialState: OrdersState = {
    activeTabId: ORDER_TABS[0].id,
    selectedFilterId: ORDER_FILTERS[0].id,
    dropdownOpen: false,
    loading: false,
  };

  return `
    <div class="orders bg-(--color-surface,#ffffff) rounded-(--radius-card) overflow-hidden" data-orders-section>
      <div class="flex items-center justify-between px-5 pt-4 pb-3">
        <h2 class="text-base font-bold text-(--color-text-body,#333333) m-0">Siparişler</h2>
        <a href="#" class="orders__view-all text-[13px] text-(--color-text-placeholder,#999999) no-underline inline-flex items-center gap-0.5 transition-colors hover:text-primary-500" aria-label="Tüm siparişleri görüntüle">
          Tümünü görüntüle
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
      ${OrdersTabs({
        tabs: ORDER_TABS,
        filters: ORDER_FILTERS,
        activeTabId: initialState.activeTabId,
        selectedFilterId: initialState.selectedFilterId,
        dropdownOpen: initialState.dropdownOpen,
      })}
      ${OrdersContent()}
    </div>
  `;
}

export function initOrdersSection(): void {
  const section = document.querySelector<HTMLElement>('[data-orders-section]');
  if (!section) return;

  const state: OrdersState = {
    activeTabId: ORDER_TABS[0].id,
    selectedFilterId: ORDER_FILTERS[0].id,
    dropdownOpen: false,
    loading: false,
  };

  // Tab clicks
  section.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    const tabBtn = target.closest<HTMLElement>('[data-orders-tab]');

    if (tabBtn) {
      const tabId = tabBtn.dataset.ordersTab;
      if (!tabId) return;

      // If clicking the dropdown trigger tab
      if (tabBtn.hasAttribute('data-orders-dropdown-trigger')) {
        // If already active, toggle dropdown
        if (state.activeTabId === tabId) {
          state.dropdownOpen = !state.dropdownOpen;
          updateDropdown(section, state);
          return;
        }
        // Activate tab and open dropdown
        state.activeTabId = tabId;
        state.dropdownOpen = true;
      } else {
        state.activeTabId = tabId;
        state.dropdownOpen = false;
      }

      updateTabs(section, state);
      updateDropdown(section, state);
    }

    // Filter item clicks
    const filterBtn = target.closest<HTMLElement>('[data-orders-filter]');
    if (filterBtn) {
      const filterId = filterBtn.dataset.ordersFilter;
      if (!filterId) return;

      state.selectedFilterId = filterId;
      state.dropdownOpen = false;
      updateFilterItems(section, state);
      updateDropdown(section, state);
    }
  });

  // Outside click close
  document.addEventListener('click', (e: Event) => {
    if (!state.dropdownOpen) return;
    const target = e.target as HTMLElement;
    if (!section.contains(target)) {
      state.dropdownOpen = false;
      updateDropdown(section, state);
    }
  });
}

function updateTabs(section: HTMLElement, state: OrdersState): void {
  const tabs = section.querySelectorAll<HTMLElement>('[data-orders-tab]');
  tabs.forEach((tab) => {
    const isActive = tab.dataset.ordersTab === state.activeTabId;
    tab.classList.toggle('orders__tab--active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });
}

function updateDropdown(section: HTMLElement, state: OrdersState): void {
  const dropdown = section.querySelector<HTMLElement>('.orders__dropdown');
  if (!dropdown) return;
  dropdown.classList.toggle('orders__dropdown--open', state.dropdownOpen);
}

function updateFilterItems(section: HTMLElement, state: OrdersState): void {
  const items = section.querySelectorAll<HTMLElement>('[data-orders-filter]');
  items.forEach((item) => {
    const isSelected = item.dataset.ordersFilter === state.selectedFilterId;
    item.classList.toggle('orders__dropdown-item--selected', isSelected);

    // Update checkmark visibility
    const existingSvg = item.querySelector('svg');
    if (isSelected && !existingSvg) {
      item.insertAdjacentHTML('beforeend', `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 7L5.5 10L11.5 4" stroke="var(--color-dropdown-check)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`);
    } else if (!isSelected && existingSvg) {
      existingSvg.remove();
    }
  });
}
