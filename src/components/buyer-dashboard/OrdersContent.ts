/**
 * OrdersContent Component
 * Gradient background area with empty state display.
 */

function documentIconSvg(): string {
  return `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="6" width="28" height="36" rx="3" stroke="var(--color-orders-empty-icon)" stroke-width="2" fill="none"/>
    <line x1="16" y1="16" x2="32" y2="16" stroke="var(--color-orders-empty-icon)" stroke-width="2" stroke-linecap="round"/>
    <line x1="16" y1="22" x2="32" y2="22" stroke="var(--color-orders-empty-icon)" stroke-width="2" stroke-linecap="round"/>
    <line x1="16" y1="28" x2="26" y2="28" stroke="var(--color-orders-empty-icon)" stroke-width="2" stroke-linecap="round"/>
  </svg>`;
}

export function OrdersContent(): string {
  return `
    <div class="orders__content" role="tabpanel" aria-label="Sipariş içeriği">
      <div class="orders__empty">
        <div class="orders__empty-icon" aria-hidden="true">
          ${documentIconSvg()}
        </div>
        <p class="orders__empty-text">Henüz sipariş yok</p>
        <a href="#" class="orders__empty-btn" role="button">
          Tedarik etmeye başla
        </a>
      </div>
    </div>
  `;
}
