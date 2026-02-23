/**
 * ProductAttributes Component
 * Renders product specs as a grid (first 6) + list (remaining).
 */

import { mockProduct } from '../../data/mockProduct';

export function ProductAttributes(): string {
  const specs = mockProduct.specs;
  const gridSpecs = specs.slice(0, 6);
  const listSpecs = specs.slice(6);

  const gridCells = gridSpecs
    .map(
      (spec) => `
      <div class="pd-attr-cell">
        <span class="pd-attr-value">${spec.value}</span>
        <span class="pd-attr-key">${spec.key}</span>
      </div>`
    )
    .join('');

  const listRows =
    listSpecs.length > 0
      ? `<div class="pd-attr-list">
          ${listSpecs
            .map(
              (spec) => `
            <div class="pd-attr-row">
              <span class="pd-attr-row-key">${spec.key}</span>
              <span class="pd-attr-row-value">${spec.value}</span>
            </div>`
            )
            .join('')}
        </div>`
      : '';

  return `
    <div id="pd-attributes-card" class="hidden">
      <h3 class="text-lg font-semibold mb-4" style="color: var(--color-text-primary);">Özellikler</h3>
      <div class="pd-attr-grid">
        ${gridCells}
      </div>
      ${listRows}
    </div>
  `;
}
