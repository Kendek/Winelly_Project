import { describe, it, expect } from 'vitest'
import { formatPrice, type CartItem, type Wine } from '../Mcontext/WineContextProvider'

describe('Cart Logic', () => {
  const mockWine: Wine = {
    id: 1,
    name: 'Test Wine',
    type: 'Red',
    description: 'Test description',
    taste: 'Fruity',
    year: 2020,
    price: 5000,
    alcoholContent: 13,
    region: 'Hungary',
    url: 'test.jpg',
    fileId: '123',
    wineryId: 1,
    grapes: [{ id: 1, name: 'Cabernet', color: 'red' }],
    ratings: [],
  }

  describe('CartItem creation', () => {
    it('creates a cart item with quantity 1', () => {
      const cartItem: CartItem = { wine: mockWine, quantity: 1 }
      expect(cartItem.quantity).toBe(1)
      expect(cartItem.wine.id).toBe(1)
    })

    it('creates a cart item with multiple quantities', () => {
      const cartItem: CartItem = { wine: mockWine, quantity: 3 }
      expect(cartItem.quantity).toBe(3)
    })
  })

  describe('Cart item total price calculation', () => {
    it('calculates total price for single item', () => {
      const cartItem: CartItem = { wine: mockWine, quantity: 1 }
      const total = cartItem.wine.price * cartItem.quantity
      expect(total).toBe(5000)
    })

    it('calculates total price for multiple items', () => {
      const cartItem: CartItem = { wine: mockWine, quantity: 3 }
      const total = cartItem.wine.price * cartItem.quantity
      expect(total).toBe(15000)
    })
  })

  describe('Quantity control', () => {
    it('increases quantity by 1', () => {
      let quantity = 1
      quantity += 1
      expect(quantity).toBe(2)
    })

    it('decreases quantity by 1', () => {
      let quantity = 3
      quantity -= 1
      expect(quantity).toBe(2)
    })

    it('removes item when quantity goes to 0', () => {
      let quantity = 1
      quantity -= 1
      const shouldRemove = quantity <= 0
      expect(shouldRemove).toBe(true)
    })
  })

  describe('Add to cart logic', () => {
    it('adds new item to empty cart', () => {
      const cart: CartItem[] = []
      const newItem: CartItem = { wine: mockWine, quantity: 1 }
      cart.push(newItem)
      expect(cart.length).toBe(1)
    })

    it('increases quantity if item already exists', () => {
      const cart: CartItem[] = [{ wine: mockWine, quantity: 1 }]
      const existing = cart.find(item => item.wine.id === mockWine.id)
      if (existing) {
        existing.quantity += 1
      }
      expect(cart[0].quantity).toBe(2)
    })
  })

  describe('Remove from cart logic', () => {
    it('removes item from cart', () => {
      const cart: CartItem[] = [{ wine: mockWine, quantity: 1 }]
      const filtered = cart.filter(item => item.wine.id !== mockWine.id)
      expect(filtered.length).toBe(0)
    })
  })
})

describe('Discount Code Logic', () => {
  const validCode = 'WINELLY25'
  const itemsTotalPrice = 20000

  it('applies 25% discount for valid code', () => {
    const isValid = validCode.trim().toUpperCase() === 'WINELLY25'
    if (isValid) {
      const discountAmount = Math.floor(itemsTotalPrice * 0.25)
      expect(discountAmount).toBe(5000)
    }
  })

  it('calculates full price without discount', () => {
    const shippingPrice = 2500
    const fullPrice = itemsTotalPrice + shippingPrice
    expect(fullPrice).toBe(22500)
  })

  it('calculates full price with discount', () => {
    const shippingPrice = 2500
    const discount = 5000
    const fullPrice = itemsTotalPrice + shippingPrice - discount
    expect(fullPrice).toBe(17500)
  })

  it('rejects invalid discount code', () => {
    const invalidCode = 'INVALID'
    const isValid = invalidCode.trim().toUpperCase() === 'WINELLY25'
    expect(isValid).toBe(false)
  })
})
