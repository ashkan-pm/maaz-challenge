import type { Product } from '~/types/product'
import type { ProductCategory } from '~/types/productCategory'

export function normalizeCategories(value: unknown, knownCategories: readonly string[]): string[] {
  const values = Array.isArray(value) ? value : [value]
  return [
    ...new Set(
      values.filter(
        (item): item is string => typeof item === 'string' && knownCategories.includes(item)
      )
    )
  ]
}

export function getProductCategories(
  products: readonly Product[],
  matchingProducts: readonly Product[]
): ProductCategory[] {
  const counts = new Map<string, number>()
  for (const product of matchingProducts) {
    counts.set(product.category, (counts.get(product.category) ?? 0) + 1)
  }
  return [...new Set(products.map((product) => product.category))].map((value) => ({
    value,
    label: value.replace(/(^|\s)\S/g, (character) => character.toUpperCase()),
    count: counts.get(value) ?? 0
  }))
}
