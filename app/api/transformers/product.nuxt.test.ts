import { describe, expect, it } from 'vitest'
import { transformProducts } from './product'
import { apiProduct } from '~~/test/fixtures/products'
describe('product transformer', () => {
  it('preserves content, adds repeatable inventory and does not mutate the response', () => {
    const response = [apiProduct, { ...apiProduct, id: 3 }]
    const result = transformProducts(response)
    expect(result[0]).toMatchObject({ ...apiProduct, available: true, stockQuantity: 12 })
    expect(result[1]).toMatchObject({ available: false, stockQuantity: 0 })
    expect(result).toEqual(transformProducts(response))
    expect(response[0]).not.toHaveProperty('available')
    expect(result[0]!.rating).not.toBe(response[0]!.rating)
  })
  it('caps results at 18 and accepts empty responses', () => {
    expect(
      transformProducts(Array.from({ length: 20 }, (_, i) => ({ ...apiProduct, id: i + 1 })))
    ).toHaveLength(18)
    expect(transformProducts([])).toEqual([])
  })
  it('uses fixed zero inventory for unknown IDs', () => {
    expect(transformProducts([{ ...apiProduct, id: 999 }])[0]).toMatchObject({
      available: false,
      stockQuantity: 0
    })
  })
})
