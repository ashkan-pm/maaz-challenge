import { productInventory, unknownInventory } from '../fixtures/product-inventory'
import type { ApiProduct, Product } from '~/types/product'

export function transformProduct(product: ApiProduct): Product {
  return {
    ...product,
    rating: { ...product.rating },
    ...(productInventory[product.id] ?? unknownInventory)
  }
}

export function transformProducts(response: readonly ApiProduct[]): Product[] {
  return response.slice(0, 18).map(transformProduct)
}
