/**
 * AttributesTabContent Component
 * Renders the "Ozellikler" tab content with Key Attributes and Packaging tables.
 */

import { mockProduct } from '../../data/mockProduct';

function buildTableRows(specs: { key: string; value: string }[]): string {
  const rows: string[] = [];
  for (let i = 0; i < specs.length; i += 2) {
    const left = specs[i];
    const right = specs[i + 1];
    if (right) {
      rows.push(`<tr><td class="pd-attrs-key">${left.key}</td><td class="pd-attrs-val">${left.value}</td><td class="pd-attrs-key">${right.key}</td><td class="pd-attrs-val">${right.value}</td></tr>`);
    } else {
      rows.push(`<tr><td class="pd-attrs-key">${left.key}</td><td class="pd-attrs-val" colspan="3">${left.value}</td></tr>`);
    }
  }
  return rows.join('');
}

export function AttributesTabContent(): string {
  return `
    <div id="pd-tab-attributes">
      <h3 class="pd-section-heading">Temel Özellikler</h3>
      <table class="pd-attrs-table">
        <tbody>
          ${buildTableRows(mockProduct.specs)}
        </tbody>
      </table>

      <h3 class="pd-section-heading" style="margin-top: 32px;">Paketleme ve Teslimat</h3>
      <table class="pd-attrs-table">
        <tbody>
          ${buildTableRows(mockProduct.packagingSpecs)}
        </tbody>
      </table>

      <!-- Lead Time — collapsible -->
      <div style="margin-top: 32px; border-top: 1px solid var(--pd-spec-border, #e5e5e5);">
        <button type="button" class="pd-section-collapsible" id="pd-leadtime-toggle">
          <span>Teslim Süresi</span>
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div id="pd-leadtime-content" class="hidden">
          <table class="pd-attrs-table">
            <thead>
              <tr>
                <th>Miktar (adet)</th>
                ${mockProduct.leadTimeRanges.map(r => `<th>${r.quantityRange}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="pd-attrs-key">Teslim süresi (gün)</td>
                ${mockProduct.leadTimeRanges.map(r => `<td class="pd-attrs-val">${r.days}</td>`).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Customization Options -->
      <div style="margin-top: 32px; border-top: 1px solid var(--pd-spec-border, #e5e5e5); padding-top: 24px;">
        <h3 class="pd-section-heading">Özelleştirme Seçenekleri</h3>
        ${mockProduct.customizationOptions.map(opt => `
          <div class="pd-customization-item">
            <strong>${opt.name}</strong>
            <span>${opt.priceAddon}</span>
            <span>(${opt.minOrder})</span>
          </div>
        `).join('')}
        <a class="pd-customization-link">Detayları Gör</a>
        <div>
          <button type="button" class="pd-customization-chat">Sohbet Başlat</button>
        </div>
      </div>
    </div>
  `;
}

export function initAttributesTab(): void {
  const toggle = document.getElementById('pd-leadtime-toggle');
  const content = document.getElementById('pd-leadtime-content');

  if (toggle && content) {
    toggle.addEventListener('click', () => {
      content.classList.toggle('hidden');
      toggle.classList.toggle('open');
    });
  }
}
