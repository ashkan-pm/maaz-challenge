import type { Product } from '~/types/product'

type Inventory = Pick<Product, 'available' | 'stockQuantity'>

// Fixed mock inventory: Fake Store does not expose availability or stock.
export const productInventory: Readonly<Record<number, Inventory>> = {
  1: { available: true, stockQuantity: 12 },
  2: { available: true, stockQuantity: 8 },
  3: { available: false, stockQuantity: 0 },
  4: { available: true, stockQuantity: 25 },
  5: { available: true, stockQuantity: 6 },
  6: { available: false, stockQuantity: 0 },
  7: { available: true, stockQuantity: 18 },
  8: { available: true, stockQuantity: 3 },
  9: { available: true, stockQuantity: 10 },
  10: { available: false, stockQuantity: 0 },
  11: { available: true, stockQuantity: 7 },
  12: { available: true, stockQuantity: 15 },
  13: { available: true, stockQuantity: 4 },
  14: { available: false, stockQuantity: 0 },
  15: { available: true, stockQuantity: 21 },
  16: { available: true, stockQuantity: 9 },
  17: { available: false, stockQuantity: 0 },
  18: { available: true, stockQuantity: 14 }
}

export const unknownInventory: Readonly<Inventory> = { available: false, stockQuantity: 0 }
