import type { OrderSummary as OrderSummaryData, OrderSummaryThumbnail } from '../../types/checkout';

export interface ProtectionSummaryItem {
  icon: string;
  title: string;
  description: string;
}

export interface OrderSummaryProps {
  data: OrderSummaryData;
  protectionItems: ProtectionSummaryItem[];
  tradeAssuranceText: string;
}

// Custom Green SVG Icons that match the screenshot aesthetics
const secureIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="text-[#008a00] shrink-0 mt-[2px]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const truckIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="text-[#008a00] shrink-0 mt-[2px]"><rect x="1" y="3" width="15" height="13" stroke="currentColor" stroke-width="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" stroke="currentColor" stroke-width="2"/><circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" stroke-width="2"/><circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" stroke-width="2"/></svg>`;
const refundIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="text-[#008a00] shrink-0 mt-[2px]"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/><path d="M2 10h20" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="15" r="2" stroke="currentColor" stroke-width="2"/></svg>`;

function getIconForTitle(title: string): string {
  if (title.includes('Secure')) return secureIcon;
  if (title.includes('Dispatch')) return truckIcon;
  if (title.includes('Money')) return refundIcon;
  return `<span class="text-[16px]">${title.charAt(0)}</span>`; // Fallback
}

function renderThumbnailGrid(thumbnails: OrderSummaryThumbnail[], itemCount: number): string {
  if (thumbnails.length === 0) return '';

  const visibleThumbnails = thumbnails.slice(0, 4);
  const grid = visibleThumbnails
    .map(
      (thumb, idx) => `
      <div class="relative w-[48px] h-[48px] min-w-[48px] rounded border border-[#e5e5e5]">
        <img class="w-full h-full object-cover rounded" src="${thumb.image}" alt="" />
        ${idx === 0 ? `<div class="absolute -top-[6px] -right-[6px] flex items-center justify-center min-w-[20px] h-[20px] rounded-[10px] px-1 bg-[#222222] text-white text-[12px] font-bold z-10 leading-none">${itemCount}</div>` : ''}
      </div>`
    )
    .join('');

  return `
    <div class="flex gap-2 mb-5">
      ${grid}
    </div>`;
}

export function OrderSummary({ data, protectionItems, tradeAssuranceText }: OrderSummaryProps): string {
  const currency = data.currency;

  // Format numbers to match precision
  const subtotalStr = `${currency} ${(data.itemSubtotal).toFixed(2)}`;
  const shippingStr = `${currency} ${(data.shipping).toFixed(2)}`;
  const totalStr = `${currency} ${(data.total).toFixed(2)}`;
  const implicitDiscount = Number((data.itemSubtotal + data.shipping - data.total).toFixed(2));

  // The protection items rendering
  const protectionRows = protectionItems.map(item => `
    <li class="flex items-start gap-2 mb-3">
      ${getIconForTitle(item.title)}
      <div class="flex flex-col">
        <span class="text-[14px] font-bold text-[#222222] leading-5">${item.title}</span>
        <span class="text-[14px] text-[#444444] leading-5 mt-[2px]">${item.description}</span>
      </div>
    </li>
  `).join('');

  return `
    <div
      class="checkout-sidebar w-full p-[28px] bg-[#FFFFFF] border border-[#e5e5e5] rounded-xl max-h-[calc(100vh-48px)] overflow-y-auto [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/20 hover:[&::-webkit-scrollbar-thumb]:bg-black/30 [&::-webkit-scrollbar-thumb]:rounded-full"
      x-data="checkoutOrderSummary({ itemSubtotal: ${data.itemSubtotal}, discount: ${implicitDiscount}, initialShippingFee: ${data.shipping}, currency: '${currency}' })"
    >
      <!-- Title -->
      <div class="text-[20px] font-bold leading-7 text-[#222222] mb-5 font-inter">
        Order summary (${data.itemCount} items)
      </div>

      <!-- Thumbnail Grid -->
      ${renderThumbnailGrid(data.thumbnails, data.itemCount)}

      <!-- Price Breakdown -->
      <div class="flex flex-col summary-amounts-layout-row">
        <div class="flex justify-between items-center py-[6px] text-[14px] leading-5 text-[#222222]">
          <span>Item subtotal</span>
          <span x-text="formatMoney(itemSubtotal)">${subtotalStr}</span>
        </div>
        <div class="flex justify-between items-center py-[6px] text-[14px] leading-5 text-[#222222]">
          <span>Estimated shipping fee</span>
          <span x-text="formatMoney(shippingFee)">${shippingStr}</span>
        </div>
      </div>

      <!-- Total -->
      <div class="flex justify-between items-center mt-[10px] pt-[16px] border-t border-[#e5e5e5] summary-amounts-total-block text-[20px] font-bold text-[#222222]">
        <span>Total</span>
        <span x-text="formatMoney(total)">${totalStr}</span>
      </div>

      <!-- Place Order Button -->
      <button type="button" class="w-full mt-[20px] mb-[12px] flex items-center justify-center bg-cta-primary text-white font-bold text-[16px] py-[12px] rounded-full cursor-pointer hover:bg-cta-primary-hover transition-colors leading-none" id="summary-place-order-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="mr-2 shrink-0"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Place order
      </button>

      <!-- Terms & Privacy -->
      <p class="text-[12px] leading-snug text-[#767676] mb-[20px]">
        By clicking the above, you agree to Alibaba.com's <a href="#" class="underline hover:text-[#333]">Terms of Use</a> and <a href="#" class="underline hover:text-[#333]">Privacy Policy</a>
      </p>

      <!-- Order Protection Link -->
      <button type="button" class="flex items-center justify-between w-full mb-3 cursor-pointer bg-transparent text-left hover:opacity-80 transition-opacity" data-modal-target="order-protection-modal" data-modal-toggle="order-protection-modal">
        <span class="text-[16px] font-bold text-[#222222]">Alibaba.com order protection</span>
        <svg class="w-[18px] h-[18px] text-[#222222] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      <!-- Protection Summary Items -->
      <ul class="list-none p-0 m-0 flex flex-col mt-2">
        ${protectionRows}
      </ul>

      <!-- Trade Assurance Footer -->
      <div class="mt-2 text-[12px] leading-snug text-[#767676]">
        ${tradeAssuranceText}
      </div>
    </div>
  `;
}
