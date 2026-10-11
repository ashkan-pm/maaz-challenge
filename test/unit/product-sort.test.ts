import { describe, expect, it } from 'vitest'
import { normalizeSort, sortProducts } from '../../app/utils/productSort'
import { product } from '../fixtures/products'

const products = [
  { ...product, id: 1, stockQuantity: 5, rating: { rate: 5, count: 999 } },
  { ...product, id: 2, stockQuantity: 20, rating: { rate: 2, count: 1 } },
  { ...product, id: 3, stockQuantity: 10, rating: { rate: 3, count: 100 } }
]

describe('product sorting', () => {
  it.each([
    ['quantity-desc', [2, 3, 1]],
    ['quantity-asc', [1, 3, 2]],
    ['rating-desc', [1, 3, 2]],
    ['rating-asc', [2, 3, 1]]
  ] as const)('sorts by %s without changing the source array', (sort, expected) => {
    expect(sortProducts(products, sort).map((item) => item.id)).toEqual(expected)
    expect(products.map((item) => item.id)).toEqual([1, 2, 3])
  })

  it('breaks ties consistently by ID', () => {
    const tied = [
      { ...product, id: 3 },
      { ...product, id: 1 },
      { ...product, id: 2 }
    ]
    expect(sortProducts(tied, 'quantity-desc').map((item) => item.id)).toEqual([1, 2, 3])
    expect(sortProducts(tied, 'rating-asc').map((item) => item.id)).toEqual([1, 2, 3])
  })

  it.each([undefined, null, 'invalid', ['rating-asc'], 'RATING-ASC'])(
    'defaults invalid values to quantity-desc: %j',
    (value) => {
      expect(normalizeSort(value)).toBe('quantity-desc')
    }
  )
})
