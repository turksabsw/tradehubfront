/**
 * OrderSummary Component (C5)
 * Sticky sidebar with thumbnail grid, price breakdown, processing fee tooltip,
 * order protection link, protection summary items, and Trade Assurance footer.
 */

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

function renderThumbnailGrid(thumbnails: OrderSummaryThumbnail[], itemCount: number): string {
  if (thumbnails.length === 0) return '';

  const visibleThumbnails = thumbnails.slice(0, 4);
  const grid = visibleThumbnails
    .map(
      (thumb) => `
      <div class="relative w-[48px] h-[48px] min-w-[48px] rounded overflow-hidden border border-[#e5e5e5]">
        <img class="w-full h-full object-cover" src="${thumb.image}" alt="" />
      </div>`
    )
    .join('');

  const badge = itemCount > 4
    ? `<div class="flex items-center justify-center w-[48px] h-[48px] min-w-[48px] rounded border border-[#e5e5e5] bg-[#f5f5f5] text-[13px] font-semibold text-[#333]">${itemCount}</div>`
    : '';

  return `
    <div class="flex gap-2 mb-5">
      ${grid}
      ${badge}
    </div>`;
}

function renderPriceRow(label: string, value: string, options?: { bold?: boolean; borderTop?: boolean; large?: boolean; tooltip?: boolean }): string {
  const containerCls = [
    'flex justify-between items-center',
    options?.borderTop ? 'border-t border-[#e5e5e5] pt-3 mt-3' : '',
    options?.large ? 'text-[20px] font-bold leading-7 text-[#222]' : 'text-[14px] leading-5 text-[#333]',
    options?.bold && !options?.large ? 'font-bold text-[#222]' : '',
  ].filter(Boolean).join(' ');

  const tooltipHtml = options?.tooltip
    ? `<button type="button" class="checkout-processing-fee-tooltip ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full border border-[#ccc] text-[10px] text-[#999] cursor-pointer hover:border-[#666] hover:text-[#666]" title="Processing fee applied by payment provider">i</button>`
    : '';

  return `
    <div class="${containerCls}">
      <span>${label}${tooltipHtml}</span>
      <span${options?.bold || options?.large ? ' class="font-bold"' : ''}>${value}</span>
    </div>`;
}

function renderProtectionLink(): string {
  return `
    <button type="button" class="checkout-protection-link flex items-center justify-between w-full py-3 border-t border-[#e5e5e5] mt-3 cursor-pointer bg-transparent text-left hover:bg-[#f9f9f9] transition-colors duration-150 rounded px-0" data-modal-target="order-protection-modal" data-modal-toggle="order-protection-modal">
      <span class="text-[14px] font-semibold text-[#222]">Alibaba.com order protection</span>
      <svg class="w-4 h-4 text-[#999] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>
    </button>`;
}

function renderProtectionSummary(items: ProtectionSummaryItem[]): string {
  const rows = items
    .map(
      (item) => `
      <li class="flex items-start gap-2">
        <span class="text-[16px] leading-5 flex-shrink-0">${item.icon}</span>
        <span class="text-[13px] leading-[18px] text-[#333]">${item.title}</span>
      </li>`
    )
    .join('');

  return `
    <ul class="list-none p-0 m-0 flex flex-col gap-2 mt-3">
      ${rows}
    </ul>`;
}

function renderTradeAssurance(text: string): string {
  return `
    <div class="mt-4 pt-3 border-t border-[#e5e5e5]">
      <p class="text-[12px] leading-4 text-[#999] m-0">${text}</p>
    </div>`;
}

export function OrderSummary({ data, protectionItems, tradeAssuranceText }: OrderSummaryProps): string {
  const currency = data.currency === 'USD' ? '$' : data.currency;

  return `
    <div class="checkout-sidebar w-full lg:w-[380px] p-6 lg:p-7 bg-white border border-[#e5e5e5] rounded-xl overflow-y-auto lg:sticky lg:top-[80px] max-h-[calc(100vh-100px)]">
      <!-- Title -->
      <div class="text-[18px] lg:text-[20px] font-bold leading-7 text-[#222] mb-5">
        Order summary (${data.itemCount} items)
      </div>

      <!-- Thumbnail Grid -->
      ${renderThumbnailGrid(data.thumbnails, data.itemCount)}

      <!-- Price Breakdown -->
      <div class="flex flex-col gap-2">
        ${renderPriceRow('Item subtotal', `${currency}${data.itemSubtotal.toFixed(2)}`)}
        ${renderPriceRow('Estimated shipping fee', `${currency}${data.shipping.toFixed(2)}`)}
        ${renderPriceRow('Subtotal', `${currency}${data.subtotal.toFixed(2)}`, { bold: true, borderTop: true })}
        ${renderPriceRow('Payment processing fee', `${currency}${data.processingFee.toFixed(2)}`, { tooltip: true })}
        ${renderPriceRow(`Pay in ${data.currency}`, `${currency}${data.total.toFixed(2)}`, { large: true, borderTop: true })}
      </div>

      <!-- Order Protection Link -->
      ${renderProtectionLink()}

      <!-- Protection Summary Items -->
      ${renderProtectionSummary(protectionItems)}

      <!-- Trade Assurance Footer -->
      ${renderTradeAssurance(tradeAssuranceText)}
    </div>
  `;
}
