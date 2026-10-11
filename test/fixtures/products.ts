import { ref } from 'vue'
import { vi } from 'vitest'
import type { ApiProduct, Product } from '~/types/product'
export const apiProduct: ApiProduct = {
  id: 1,
  title: 'Test Backpack',
  image: 'https://example.com/backpack.png',
  price: 109.95,
  description: 'A backpack',
  category: "men's clothing",
  rating: { rate: 3.9, count: 120 }
}
export const product: Product = { ...apiProduct, available: true, stockQuantity: 12 }
export function createProductsResult() {
  return Promise.resolve({
    data: ref([product]),
    status: ref('success'),
    error: ref(null),
    refresh: vi.fn()
  })
}
