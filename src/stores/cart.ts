import Alpine from 'alpinejs'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

const CART_KEY = 'tradehub_cart'

function loadCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]')
  } catch {
    return []
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

Alpine.store('cart', {
  items: loadCart() as CartItem[],

  get count(): number {
    return (this as any).items.reduce((sum: number, i: CartItem) => sum + i.quantity, 0)
  },

  get total(): number {
    return (this as any).items.reduce((sum: number, i: CartItem) => sum + i.price * i.quantity, 0)
  },

  add(item: CartItem) {
    const existing = (this as any).items.find((i: CartItem) => i.id === item.id)
    if (existing) {
      existing.quantity += item.quantity
    } else {
      (this as any).items.push(item)
    }
    saveCart((this as any).items)
  },

  remove(id: string) {
    (this as any).items = (this as any).items.filter((i: CartItem) => i.id !== id)
    saveCart((this as any).items)
  },

  clear() {
    (this as any).items = []
    saveCart([])
  },
})
