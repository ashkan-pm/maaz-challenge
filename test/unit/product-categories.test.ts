import { describe, expect, it } from 'vitest'
import { getProductCategories, normalizeCategories } from '../../app/utils/productCategories'
import { product } from '../fixtures/products'

const products = [
  product,
  { ...product, id: 2, category: 'electronics' },
  { ...product, id: 3, category: 'electronics' }
]

describe('product categories', () => {
  it('accepts single and repeated parameters, removes duplicates, and ignores unknown values', () => {
    const known = ["men's clothing", 'electronics']
    expect(normalizeCategories('electronics', known)).toEqual(['electronics'])
    expect(
      normalizeCategories([null, 'electronics', 'unknown', 'electronics', "men's clothing"], known)
    ).toEqual(['electronics', "men's clothing"])
    expect(normalizeCategories(undefined, known)).toEqual([])
  })

  it('counts matching products while keeping all known categories, including zero counts', () => {
    expect(getProductCategories(products, [products[1]!])).toEqual([
      { value: "men's clothing", label: "Men's Clothing", count: 0 },
      { value: 'electronics', label: 'Electronics', count: 1 }
    ])
    expect(getProductCategories(products, []).map((category) => category.count)).toEqual([0, 0])
  })
})
