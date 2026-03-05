import re

with open('src/components/cart/overlay/SharedCartDrawer.ts', 'r') as f:
    content = f.read()

# 1. Update CartDrawerItemModel
content = content.replace(
    '  shippingOptions: CartDrawerShippingOption[];\n}',
    '  shippingOptions: CartDrawerShippingOption[];\n  samplePrice?: number;\n}'
)

# 2. Update DrawerState
content = content.replace(
    'interface DrawerState {\n  item: CartDrawerItemModel | null;',
    'interface DrawerState {\n  mode: \'cart\' | \'sample\';\n  item: CartDrawerItemModel | null;'
)

# 3. Update const state
content = content.replace(
    'const state: DrawerState = {\n  item: null,',
    'const state: DrawerState = {\n  mode: \'cart\',\n  item: null,'
)

# 4. getTotals activePrice
content = content.replace(
    '  const tierIndex = getActiveTierIndex(totalQty);\n  const activePrice = state.item?.priceTiers[tierIndex]?.price ?? 0;',
    '  const tierIndex = getActiveTierIndex(totalQty);\n  const activePrice = state.mode === \'sample\' \n    ? (state.item?.samplePrice ?? 30)\n    : (state.item?.priceTiers[tierIndex]?.price ?? 0);'
)

# 5. renderDrawerBody
old_body = """    <h4 class="text-base font-bold text-text-heading leading-tight mb-4">${escapeHtml(state.item.title)}</h4>

    <div class="grid grid-cols-3 gap-6 pb-5 mb-5 border-b border-border-default">
      ${state.item.priceTiers.map((tier, index) => {
    const activeClass = index === totals.tierIndex ? 'text-error-500' : 'text-text-heading';
    return `
          <div class="cart-tier-item" data-tier-index="${index}">
            <p class="text-sm text-text-tertiary">${formatTierLabel(tier, state.item!.unit)}</p>
            <p class="mt-1 text-[22px] font-bold ${activeClass}">$${tier.price.toFixed(2)}</p>
          </div>
        `;
  }).join('')}
    </div>"""

new_body = """    <h4 class="text-base font-bold text-text-heading leading-tight mb-4">${escapeHtml(state.item.title)}</h4>

    ${state.mode === 'sample' ? `
      <div class="mb-5 pb-5 border-b border-border-default">
        <p class="text-sm text-text-secondary mb-1">Numuneler için maksimum sipariş miktarı: 1 adet</p>
        <p class="text-[22px] font-bold text-text-heading">$${(state.item.samplePrice ?? 30).toFixed(2)} <span class="text-base font-normal text-text-tertiary">/adet</span></p>
      </div>
    ` : `
      <div class="grid grid-cols-3 gap-6 pb-5 mb-5 border-b border-border-default">
        ${state.item.priceTiers.map((tier, index) => {
          const activeClass = index === totals.tierIndex ? 'text-error-500' : 'text-text-heading';
          return \\`
            <div class="cart-tier-item" data-tier-index="\\${index}">
              <p class="text-sm text-text-tertiary">\\${formatTierLabel(tier, state.item!.unit)}</p>
              <p class="mt-1 text-[22px] font-bold \\${activeClass}">$\\${tier.price.toFixed(2)}</p>
            </div>
          \\`;
        }).join('')}
      </div>
    `}"""

content = content.replace(old_body, new_body)

# 6. footer text
content = content.replace(
    '<button type="button" id="shared-cart-confirm" class="w-full h-12 rounded-full bg-cta-primary text-white font-semibold text-lg hover:bg-cta-primary-hover transition-colors">Sepete Ekle</button>',
    '<button type="button" id="shared-cart-confirm" class="w-full h-12 rounded-full bg-cta-primary text-white font-semibold text-lg hover:bg-cta-primary-hover transition-colors">${state.mode === \'sample\' ? \'Numune Al\' : \'Sepete Ekle\'}</button>'
)

# 7. openDrawer
content = content.replace(
    'function openDrawer(itemId?: string): void {\n  const item = itemId ? productsById.get(itemId) : Array.from(productsById.values())[0];\n  if (!item) return;\n\n  state.item = item;',
    'function openDrawer(itemId?: string, mode: \'cart\' | \'sample\' = \'cart\'): void {\n  const item = itemId ? productsById.get(itemId) : Array.from(productsById.values())[0];\n  if (!item) return;\n\n  state.mode = mode;\n  state.item = item;'
)

content = content.replace(
    '  state.colorQuantities = new Map(item.colors.map((color) => [color.id, 0]));\n\n  rerenderDrawer();',
    '  state.colorQuantities = new Map(item.colors.map((color) => [color.id, 0]));\n\n  const heading = document.getElementById(\'shared-cart-heading\');\n  if (heading) {\n    heading.textContent = mode === \'sample\' ? \'Numune varyasyonları\' : \'Varyasyon ve miktar seçin\';\n  }\n\n  rerenderDrawer();'
)

# 8. heading ID in template
content = content.replace(
    '<h3 class="text-lg font-bold text-text-heading">Varyasyon ve miktar seçin</h3>',
    '<h3 id="shared-cart-heading" class="text-lg font-bold text-text-heading">Varyasyon ve miktar seçin</h3>'
)

# 9. add-to-cart -> sample listener
old_listener = """  document.addEventListener('click', (event) => {
    const trigger = (event.target as HTMLElement).closest<HTMLElement>('[data-add-to-cart]');
    if (!trigger) return;
    const id = trigger.dataset.addToCart;
    if (!id || !productsById.has(id)) return;

    event.preventDefault();
    openDrawer(id);
  });"""

new_listener = """  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    
    const cartTrigger = target.closest<HTMLElement>('[data-add-to-cart]');
    if (cartTrigger) {
      const id = cartTrigger.dataset.addToCart;
      if (id && productsById.has(id)) {
        event.preventDefault();
        openDrawer(id, 'cart');
      }
      return;
    }

    const sampleTrigger = target.closest<HTMLElement>('[data-order-sample]');
    if (sampleTrigger) {
      const id = sampleTrigger.dataset.orderSample;
      if (id && productsById.has(id)) {
        event.preventDefault();
        openDrawer(id, 'sample');
      }
      return;
    }
  });"""

content = content.replace(old_listener, new_listener)

# 10. export openSharedCartDrawer
content = content.replace(
    'export function openSharedCartDrawer(itemId?: string): void {\n  openDrawer(itemId);\n}',
    'export function openSharedCartDrawer(itemId?: string, mode: \'cart\' | \'sample\' = \'cart\'): void {\n  openDrawer(itemId, mode);\n}'
)

with open('src/components/cart/overlay/SharedCartDrawer.ts', 'w') as f:
    f.write(content)
