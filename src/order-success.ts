/**
 * Order Success / Pending Page
 * Shows order confirmation with summary card.
 */
import './style.css';
import { orderStore } from './components/orders/state/OrderStore';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const status = params.get('status') || 'pending';
  const count = params.get('count') || '1';
  const orderNumbersParam = params.get('orderNumbers') || '';
  const orderNumbersList = orderNumbersParam ? orderNumbersParam.split(',') : [];
  const displayOrderNumber = orderNumbersList[0] || `ORD-${Date.now().toString(36).toUpperCase()}`;

  // Update order statuses in the store
  orderStore.load();
  if (status === 'success' && orderNumbersList.length > 0) {
    for (const num of orderNumbersList) {
      orderStore.updateOrderStatus(num, 'Confirming', 'text-blue-600', 'Your payment is being confirmed.');
    }
  }

  const appEl = document.getElementById('app');
  if (!appEl) return;

  if (status === 'success') {
    appEl.innerHTML = `
      <div class="w-full max-w-lg mx-auto text-center">
        <!-- Animated checkmark -->
        <div class="flex justify-center mb-6">
          <div class="w-20 h-20 rounded-full border-[3px] border-[#16a34a] flex items-center justify-center animate-[bounceIn_0.5s_ease-out]">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6L9 17l-5-5" class="animate-[drawCheck_0.4s_0.3s_ease-out_both]" style="stroke-dasharray:30;stroke-dashoffset:30;animation:drawCheck 0.4s 0.3s ease-out forwards"/>
            </svg>
          </div>
        </div>

        <!-- Title -->
        <h1 class="text-2xl md:text-[28px] font-bold text-[#222] mb-2">
          ${count === '1'
            ? 'Your order has been placed successfully!'
            : `Your ${count} orders have been placed successfully!`}
        </h1>
        <p class="text-[#666] text-sm mb-6">Payment completed. Your order is being processed and will be shipped soon.</p>

        <!-- Order Summary Card -->
        <div class="bg-white border border-[#e5e5e5] rounded-xl p-5 mb-6 text-left max-w-sm mx-auto shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-medium text-[#999] uppercase tracking-wide">Order Number</span>
            <span class="text-sm font-bold text-[#222]">${displayOrderNumber}</span>
          </div>
          <div class="border-t border-[#f0f0f0] pt-3 flex items-center justify-between">
            <span class="text-xs text-[#999]">Status</span>
            <span class="inline-flex items-center gap-1 text-xs font-medium text-[#16a34a] bg-[#f0fdf4] px-2 py-1 rounded-full">
              <span class="w-1.5 h-1.5 rounded-full bg-[#16a34a]"></span>
              Confirmed
            </span>
          </div>
          <div class="border-t border-[#f0f0f0] pt-3 mt-3 flex items-center justify-between">
            <span class="text-xs text-[#999]">Items</span>
            <span class="text-sm text-[#333]">${count} order${Number(count) > 1 ? 's' : ''}</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col gap-3 max-w-[320px] mx-auto">
          <a href="/orders.html"
            class="w-full bg-[#d24600] hover:bg-[#b03b00] text-white font-bold py-3 px-6 rounded-full transition-colors text-[15px] text-center block no-underline">
            Track your order
          </a>
          <a href="/"
            class="w-full bg-white border border-[#ccc] hover:border-[#999] hover:bg-gray-50 text-[#333] font-bold py-3 px-6 rounded-full transition-all text-center block text-[15px] no-underline">
            Continue shopping
          </a>
        </div>
      </div>
    `;
  } else {
    // Pending payment state
    appEl.innerHTML = `
      <div class="w-full max-w-lg mx-auto text-center">
        <!-- Icon -->
        <div class="flex justify-center mb-6">
          <div class="w-20 h-20 rounded-full border-[3px] border-[#222] flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
        </div>

        <!-- Title -->
        <h1 class="text-2xl md:text-[28px] font-bold text-[#222] mb-2">
          ${count === '1'
            ? 'There is 1 order waiting for payment'
            : `There are ${count} orders waiting for payment`}
        </h1>
        <p class="text-[#666] text-sm mb-6">You have not paid for the order yet. Pay for your order now to complete the final step.</p>

        <!-- Order Summary Card -->
        <div class="bg-white border border-[#e5e5e5] rounded-xl p-5 mb-6 text-left max-w-sm mx-auto shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-medium text-[#999] uppercase tracking-wide">Order Number</span>
            <span class="text-sm font-bold text-[#222]">${displayOrderNumber}</span>
          </div>
          <div class="border-t border-[#f0f0f0] pt-3 flex items-center justify-between">
            <span class="text-xs text-[#999]">Status</span>
            <span class="inline-flex items-center gap-1 text-xs font-medium text-[#f59e0b] bg-[#fffbeb] px-2 py-1 rounded-full">
              <span class="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></span>
              Awaiting Payment
            </span>
          </div>
          <div class="border-t border-[#f0f0f0] pt-3 mt-3 flex items-center justify-between">
            <span class="text-xs text-[#999]">Items</span>
            <span class="text-sm text-[#333]">${count} order${Number(count) > 1 ? 's' : ''}</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col gap-3 max-w-[320px] mx-auto">
          <a href="/payment.html"
            class="w-full bg-[#d24600] hover:bg-[#b03b00] text-white font-bold py-3 px-6 rounded-full transition-colors text-[15px] text-center block no-underline">
            Make payment
          </a>
          <a href="/orders.html"
            class="w-full bg-white border border-[#ccc] hover:border-[#999] hover:bg-gray-50 text-[#333] font-bold py-3 px-6 rounded-full transition-all text-center block text-[15px] no-underline">
            View all orders
          </a>
        </div>
      </div>
    `;
  }
});

// Add keyframe animation for the checkmark draw
const style = document.createElement('style');
style.textContent = `
  @keyframes drawCheck {
    to { stroke-dashoffset: 0; }
  }
  @keyframes bounceIn {
    0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
  }
`;
document.head.appendChild(style);
