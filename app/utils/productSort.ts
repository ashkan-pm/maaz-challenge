import type { Product } from '~/types/product'
import type { ProductSort } from '~/types/productSort'

export const DEFAULT_PRODUCT_SORT: ProductSort = 'quantity-desc'
export const PRODUCT_SORT_OPTIONS = [
  { label: 'تعداد: زیاد به کم', value: 'quantity-desc' },
  { label: 'تعداد: کم به زیاد', value: 'quantity-asc' },
  { label: 'رتبه: زیاد به کم', value: 'rating-desc' },
  { label: 'رتبه: کم به زیاد', value: 'rating-asc' }
] as const satisfies readonly { label: string; value: ProductSort }[]

export function normalizeSort(value: unknown): ProductSort {
  return (
    PRODUCT_SORT_OPTIONS.find((option) => option.value === value)?.value ?? DEFAULT_PRODUCT_SORT
  )
}

export function sortProducts(products: readonly Product[], sort: ProductSort): Product[] {
  const direction = sort.endsWith('-asc') ? 1 : -1
  const value = sort.startsWith('quantity-')
    ? (product: Product) => product.stockQuantity
    : (product: Product) => product.rating.rate

  return [...products].sort(
    (first, second) => (value(first) - value(second)) * direction || first.id - second.id
  )
}
