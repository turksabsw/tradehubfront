/**
 * CompanyProfile Component
 * Alibaba "Know Your Supplier" design: hero banner, stat counters,
 * company details table, factory capabilities, certifications.
 */

import { mockProduct } from '../../data/mockProduct';

export function CompanyProfile(): string {
  const s = mockProduct.supplier;

  return `
    <div class="py-6">
      <!-- 1. Hero Banner -->
      <div class="sp-hero-banner">
        <div>
          <div class="sp-company-name">
            ${s.name}
            ${s.verified ? `
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" style="color: var(--pd-supplier-verified-color, #cc9900);">
                <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd"/>
              </svg>
            ` : ''}
          </div>
          <p class="sp-company-subtitle">Verified Multispecialty Supplier &middot; ${s.yearsInBusiness} yıl &middot; \u{1F1F9}\u{1F1F7} TR</p>
        </div>
        <button type="button" class="sp-contact-btn">İletişime Geç</button>
      </div>

      <!-- 2. Stat Counters -->
      <div class="sp-stats-row">
        <div class="sp-stat-card">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="color: var(--pd-rating-text-color, #6b7280); margin-bottom: 6px;">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <span class="sp-stat-value">${s.responseTime}</span>
          <span class="sp-stat-label">Yanıt Süresi</span>
        </div>
        <div class="sp-stat-card">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="color: var(--pd-rating-text-color, #6b7280); margin-bottom: 6px;">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <span class="sp-stat-value">${s.responseRate}</span>
          <span class="sp-stat-label">Yanıt Oranı</span>
        </div>
        <div class="sp-stat-card">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="color: var(--pd-rating-text-color, #6b7280); margin-bottom: 6px;">
            <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
          <span class="sp-stat-value">${s.onTimeDelivery}</span>
          <span class="sp-stat-label">Zamanında Teslimat</span>
        </div>
      </div>

      <!-- 3. Company Details Table -->
      <div style="margin-bottom: 24px;">
        <h3 class="pd-section-heading">Şirket Bilgileri</h3>
        <table class="pd-attrs-table">
          <tbody>
            <tr>
              <td class="pd-attrs-key">Çalışan Sayısı</td>
              <td class="pd-attrs-val">${s.employees}</td>
              <td class="pd-attrs-key">Yıllık Gelir</td>
              <td class="pd-attrs-val">${s.annualRevenue}</td>
            </tr>
            <tr>
              <td class="pd-attrs-key">Faaliyet Süresi</td>
              <td class="pd-attrs-val">${s.yearsInBusiness} yıl</td>
              <td class="pd-attrs-key">Ana Ürünler</td>
              <td class="pd-attrs-val">${s.mainProducts.join(', ')}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 4. Factory Capabilities -->
      <div style="margin-bottom: 24px;">
        <h3 class="pd-section-heading">Fabrika Kapasitesi</h3>
        <div class="sp-factory-grid">
          ${[
            { label: 'Üretim Hattı', stroke: '#4a5e9a', icon: '<rect x="3" y="8" width="18" height="12" rx="1"/><path d="M7 8V6a2 2 0 012-2h6a2 2 0 012 2v2"/><path d="M12 12v4"/>' },
            { label: 'Kalite Kontrol', stroke: '#2d8a5e', icon: '<path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>' },
            { label: 'Depo', stroke: '#92700c', icon: '<path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"/><path d="M3 8h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z"/><path d="M10 12h4"/>' },
            { label: 'Showroom', stroke: '#7e22ce', icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/><polyline points="9 22 9 12 15 12 15 22"/>' },
          ].map(item => `
            <div class="sp-factory-item">
              <svg width="28" height="28" fill="none" stroke-width="1.4" viewBox="0 0 24 24" style="stroke: ${item.stroke};">
                ${item.icon}
              </svg>
              <span>${item.label}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 5. Certifications -->
      <div style="margin-bottom: 24px;">
        <h3 class="pd-section-heading">Sertifikalar</h3>
        <div class="flex flex-wrap gap-3">
          ${s.certifications.map(cert => `
            <div class="flex items-center gap-2 px-4 py-3 rounded-md" style="border: 1px solid var(--pd-spec-border, #e5e5e5);">
              <svg class="h-5 w-5" style="color: var(--pd-trade-assurance-text, #15803d);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
              </svg>
              <span class="text-sm font-medium" style="color: var(--pd-title-color, #111827);">${cert}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
