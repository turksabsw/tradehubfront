/**
 * Checkout Page — Entry Point
 * Assembles header, checkout content, and footer.
 */

import './style.css'
import { initFlowbite } from 'flowbite'

// Header components (reuse from main page)
import { TopBar, initMobileDrawer, SubHeader, initStickyHeaderSearch, MegaMenu, initMegaMenu, initHeaderCart } from './components/header'

// Shared components
import { Breadcrumb } from './components/shared/Breadcrumb'

// Footer components
import { FooterLinks } from './components/footer'

// Floating components
import { FloatingPanel } from './components/floating'

// Alpine.js
import { startAlpine } from './alpine'

// Checkout components
import { CheckoutHeader, CheckoutLayout, ShippingAddressForm, OrderSummary, PaymentMethodSection, ItemsDeliverySection, OrderProtectionModal } from './components/checkout'
import { protectionSummaryItems, tradeAssuranceText, modalSections, paymentIcons, infoBoxBullets } from './data/mockCheckout'
import { cartStore } from './components/cart/state/CartStore'
import type { OrderSummary as OrderSummaryData } from './types/checkout'
import type { CartProduct, CartSku } from './types/cart'
import type { CheckoutDeliveryOrderGroup } from './components/checkout'
import { initStickyHeights } from './utils/stickyHeights'

// CartStore'dan checkout order summary oluştur
cartStore.load();
if (cartStore.hasSelectedSkuMoqViolation()) {
  window.location.replace('/cart.html');
}

const cartSummary = cartStore.getSummary();

function formatMonthDay(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
}

function addDays(base: Date, days: number): Date {
  const next = new Date(base);
  next.setDate(next.getDate() + days);
  return next;
}

function buildProductCard(product: CartProduct): { card: CheckoutDeliveryOrderGroup['products'][number] | null; subtotal: number } {
  const selectedSkus = product.skus.filter((sku) => sku.selected);
  if (selectedSkus.length === 0) return { card: null, subtotal: 0 };

  const skuLines = selectedSkus.map((sku: CartSku) => ({
    id: sku.id,
    image: sku.skuImage,
    variantText: sku.variantText,
    unitPrice: sku.unitPrice,
    quantity: sku.quantity,
  }));

  const subtotal = selectedSkus.reduce((sum, sku) => sum + (sku.unitPrice * sku.quantity), 0);
  const image = selectedSkus[0]?.skuImage || '';

  return {
    subtotal,
    card: {
      id: product.id,
      title: product.title,
      moqLabel: product.moqLabel,
      image,
      skuLines,
    },
  };
}

function buildDeliveryOrders(): CheckoutDeliveryOrderGroup[] {
  const suppliers = cartStore.getSuppliers();
  const selectedSuppliers = suppliers
    .map((supplier) => {
      const products = supplier.products
        .map((product) => buildProductCard(product))
        .filter((row): row is { card: CheckoutDeliveryOrderGroup['products'][number]; subtotal: number } => Boolean(row.card));

      const subtotal = products.reduce((sum, row) => sum + row.subtotal, 0);
      return {
        supplier,
        subtotal,
        products: products.map((row) => row.card),
      };
    })
    .filter((row) => row.subtotal > 0 && row.products.length > 0);

  if (selectedSuppliers.length === 0) return [];

  const subtotalTotal = selectedSuppliers.reduce((sum, row) => sum + row.subtotal, 0);
  const now = new Date();

  return selectedSuppliers.map((row, index) => {
    const shippingShare = subtotalTotal > 0 ? (cartSummary.shippingFee * row.subtotal) / subtotalTotal : 0;
    const method1Fee = Number(Math.max(5, shippingShare).toFixed(2));
    const method2Fee = Number(Math.max(method1Fee + 5, shippingShare * 1.35).toFixed(2));
    const start1 = addDays(now, 10 + (index * 2));
    const end1 = addDays(now, 24 + (index * 2));
    const start2 = addDays(now, 14 + (index * 2));
    const end2 = addDays(now, 24 + (index * 2));

    return {
      orderId: `order-${index + 1}`,
      orderLabel: `Order ${index + 1}`,
      sellerId: row.supplier.id,
      sellerName: row.supplier.name,
      methods: [
        {
          id: `method-${row.supplier.id}-1`,
          etaLabel: `Estimated delivery by ${formatMonthDay(start1)}-${formatMonthDay(end1)}`,
          shippingFee: method1Fee,
          isDefault: true,
        },
        {
          id: `method-${row.supplier.id}-2`,
          etaLabel: `Estimated delivery by ${formatMonthDay(start2)}-${formatMonthDay(end2)}`,
          shippingFee: method2Fee,
        },
      ],
      products: row.products,
    };
  });
}

const checkoutDeliveryOrders = buildDeliveryOrders();
const defaultShippingFee = Number(
  checkoutDeliveryOrders.reduce((sum, order) => {
    const defaultMethod = order.methods.find((method) => method.isDefault) ?? order.methods[0];
    return sum + (defaultMethod?.shippingFee ?? 0);
  }, 0).toFixed(2),
);

const checkoutOrderSummary: OrderSummaryData = {
  itemCount: cartSummary.selectedCount || cartSummary.items.reduce((s, i) => s + i.quantity, 0),
  thumbnails: cartSummary.items.map(i => ({ image: i.image, quantity: i.quantity })),
  itemSubtotal: cartSummary.productSubtotal,
  shipping: defaultShippingFee,
  subtotal: cartSummary.productSubtotal + defaultShippingFee - cartSummary.discount,
  processingFee: 0,
  total: cartSummary.productSubtotal + defaultShippingFee - cartSummary.discount,
  currency: 'USD',
};

const appEl = document.querySelector<HTMLDivElement>('#app')!;
appEl.classList.add('relative');
appEl.innerHTML = `
  <!-- Header (Not Sticky for Checkout Page) -->
  <div id="sticky-header" class="relative bg-white border-b border-[#e5e5e5] w-full">
    ${TopBar()}
    ${SubHeader()}
  </div>

  ${MegaMenu()}

  <!-- Main Content -->
  <main>
    <div class="container-boxed">
      ${Breadcrumb([{ label: 'Sepetim', href: '/cart.html' }, { label: 'Ödeme' }])}
    </div>
    ${CheckoutLayout({
  leftContent: `
        ${CheckoutHeader()}
        ${ShippingAddressForm()}
        ${PaymentMethodSection()}
        ${ItemsDeliverySection({ orders: checkoutDeliveryOrders })}
      `,
  rightContent: `
        ${OrderSummary({ data: checkoutOrderSummary, protectionItems: protectionSummaryItems, tradeAssuranceText })}
      `
})}
  </main>

  <!-- Footer -->
  <footer>
    ${FooterLinks()}
  </footer>

  <!-- Floating Panel -->
  ${FloatingPanel()}

  <!-- Order Protection Modal -->
  ${OrderProtectionModal({ sections: modalSections, paymentIcons, infoBoxBullets })}
`;

// Initialize behaviors
initMegaMenu();
initFlowbite();
startAlpine();
initStickyHeaderSearch();
initMobileDrawer();
initHeaderCart();
initStickyHeights();
