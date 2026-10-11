import { productInventory, unknownInventory } from '../fixtures/product-inventory'
import type { ApiProduct, Product } from '~/types/product'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function isApiProduct(value: unknown): value is ApiProduct {
  if (!isRecord(value) || !isRecord(value.rating)) return false
  return (
    isFiniteNumber(value.id) &&
    Number.isInteger(value.id) &&
    value.id > 0 &&
    typeof value.title === 'string' &&
    value.title.trim().length > 0 &&
    typeof value.image === 'string' &&
    /^https?:\/\//.test(value.image) &&
    typeof value.description === 'string' &&
    typeof value.category === 'string' &&
    value.category.trim().length > 0 &&
    isFiniteNumber(value.price) &&
    value.price >= 0 &&
    isFiniteNumber(value.rating.rate) &&
    value.rating.rate >= 0 &&
    value.rating.rate <= 5 &&
    isFiniteNumber(value.rating.count) &&
    Number.isInteger(value.rating.count) &&
    value.rating.count >= 0
  )
}

export function transformProducts(response: unknown): Product[] {
  if (!Array.isArray(response) || !response.every(isApiProduct)) {
    throw new Error('Invalid product list response')
  }
  const products = response.slice(0, 18)
  if (new Set(products.map((product) => product.id)).size !== products.length) {
    throw new Error('Duplicate product IDs in response')
  }
  return products.map((product) => ({
    ...product,
    rating: { ...product.rating },
    ...(productInventory[product.id] ?? unknownInventory)
  }))
}
