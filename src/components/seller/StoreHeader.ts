/**
 * C1: Store Profile Header
 * Shows seller identity, verification badges, categories, CTA buttons
 * Variants: Standard (Verified) and PRO (Verified+PRO pill+email)
 */
import type { SellerProfile } from '../../types/seller/types';

export function StoreHeader(seller: SellerProfile): string {
  const verifiedBadge = `
    <span class="store-header__badge store-header__badge--verified flex items-center gap-1 text-[13px] text-[#2563eb]">
      <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" fill="#2563eb"/>
        <path d="M5.5 8.5l2 2 4-4" stroke="#fff" stroke-width="1.5" fill="none"/>
      </svg>
      ${seller.verificationType}
    </span>
  `;

  const proBadge = seller.verificationBadgeType === 'pro' ? `
    <span class="store-header__badge--pro inline-flex items-center gap-1 bg-[var(--store-accent)] text-white text-[11px] font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wide">
      PRO
    </span>
  ` : '';

  const emailRow = seller.email ? `
    <p class="store-header__email text-[13px] text-[var(--color-text-tertiary)] dark:text-gray-400 flex items-center gap-1">
      <svg class="w-4 h-4 text-[var(--color-text-tertiary)] dark:text-gray-400" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="4" width="12" height="8" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <path d="M2 4l6 5 6-5" stroke="currentColor" stroke-width="1.5" fill="none"/>
      </svg>
      ${seller.email}
    </p>
  ` : '';

  const deliveryBadge = seller.deliveryBadge ? `
    <a class="store-header__delivery-badge inline-flex items-center border border-[var(--color-border-strong)] dark:border-gray-600 rounded-sm px-2.5 py-1 text-[12px] text-[#374151] dark:text-gray-300 underline hover:bg-[var(--color-surface-muted)] focus:ring-1 focus:ring-[#d1d5db] transition-colors cursor-pointer max-w-[260px] lg:max-w-none truncate" href="#">
      ${seller.deliveryBadge}
    </a>
  ` : '';

  const assessmentBadge = seller.assessmentBadge ? `
    <span class="store-header__assessment-badge inline-flex items-center text-[12px] text-[var(--color-text-tertiary)] dark:text-gray-400 gap-1">
      <span class="w-2 h-2 rounded-full bg-[#2563eb] inline-block"></span>
      ${seller.assessmentBadge}
    </span>
  ` : '';

  return `
    <section id="store-header" class="store-header bg-white dark:bg-gray-800 border-b border-[var(--color-border-default)] dark:border-gray-700" aria-label="Mağaza profil başlığı">
      <div class="store-header__container max-w-[var(--container-lg)] mx-auto px-4 py-4 lg:px-6 lg:py-5 xl:px-8 xl:py-5 flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">

        <!-- Left: Logo + Info -->
        <div class="store-header__info flex items-start gap-3 lg:gap-5">
          <!-- Logo -->
          <img
            class="store-header__logo w-[80px] max-h-[48px] lg:max-h-[52px] xl:w-[100px] xl:max-h-[60px] object-contain flex-shrink-0 hover:opacity-80 transition-opacity"
            src="${seller.logo}"
            alt="${seller.name}"
            onerror="this.style.display='none'"
          />

          <div class="store-header__details flex flex-col gap-1">
            <!-- Company Name + Chevron -->
            <div class="store-header__name-row flex items-center gap-2">
              <h1 class="store-header__name text-[18px] lg:text-[20px] xl:text-[22px] font-bold text-[var(--color-text-primary)] dark:text-gray-50 leading-tight">
                ${seller.name}
              </h1>
              <svg class="store-header__chevron w-4 h-4 text-[var(--color-text-tertiary)] cursor-pointer transition-transform hover:text-[var(--color-text-secondary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>

            <!-- Badge Row -->
            <div class="store-header__badges flex items-center gap-2 flex-wrap">
              ${verifiedBadge}
              ${proBadge}
              <span class="store-header__separator text-[var(--color-border-strong)]">&middot;</span>
              <span class="store-header__years text-[13px] text-[var(--color-text-tertiary)] dark:text-gray-400">
                ${seller.yearsOnPlatform}yrs
              </span>
              <span class="store-header__separator text-[var(--color-border-strong)]">&middot;</span>
              <span class="store-header__location text-[13px] text-[var(--color-text-tertiary)] dark:text-gray-400">
                ${seller.location}
              </span>
            </div>

            <!-- Main Categories -->
            <p class="store-header__categories text-[13px] text-[var(--color-text-tertiary)] dark:text-gray-400">
              Main categories: ${seller.mainCategories.join(', ')}
            </p>

            <!-- Email (Optional — PRO only) -->
            ${emailRow}

            <!-- Tags Row (Delivery + Assessment) -->
            <div class="store-header__tags flex flex-wrap items-center gap-2 mt-1">
              ${deliveryBadge}
              ${assessmentBadge}
            </div>

            <!-- TÜV Verification Note -->
            <p class="store-header__tuv text-[11px] text-[var(--color-text-muted)] dark:text-gray-500 mt-1">
              Verified by TÜVRheinland — ${seller.verificationDate}
              <span class="inline-block ml-1 cursor-help" data-tooltip-target="tuv-tooltip" data-tooltip-placement="top">&oplus;</span>
            </p>
            <div id="tuv-tooltip" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip">
              TÜV Rheinland tarafından doğrulanmış tedarikçi
              <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
        </div>

        <!-- Right: CTA Buttons -->
        <div class="store-header__actions flex flex-col w-full gap-2 mt-3 lg:flex-row lg:w-auto lg:gap-3 lg:mt-0 flex-shrink-0">
          <button class="store-header__contact-btn w-full lg:w-auto bg-[var(--store-accent)] hover:bg-[var(--store-accent-hover)] active:bg-[#c2410c] focus:ring-2 focus:ring-[#f97316] focus:ring-offset-2 text-white font-semibold text-[14px] rounded-[var(--radius-button)] px-6 py-2.5 shadow-[var(--shadow-sm)] transition-colors cursor-pointer"
                  onclick="document.getElementById('contact-form')?.scrollIntoView({behavior:'smooth'})">
            Contact supplier
          </button>
          <button class="store-header__chat-btn w-full lg:w-auto bg-transparent border border-[var(--color-border-strong)] dark:border-gray-600 hover:bg-[var(--color-surface-muted)] hover:border-[var(--color-text-muted)] active:bg-[#f3f4f6] focus:ring-2 focus:ring-[#d1d5db] focus:ring-offset-2 text-[#374151] dark:text-gray-300 font-medium text-[14px] rounded-[var(--radius-button)] px-6 py-2.5 transition-colors cursor-pointer">
            Chat now
          </button>
        </div>

      </div>
    </section>
  `;
}
