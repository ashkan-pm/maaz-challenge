import { describe, expect, it } from 'vitest'
import { resolveApiEndpoint } from './endpoints'
describe('API endpoint builder', () => {
  it.each(['https://example.com/api', 'https://example.com/api/'])(
    'preserves base paths and normalizes slashes: %s',
    (base) => {
      expect(resolveApiEndpoint(base, '/products')).toBe('https://example.com/api/products')
      expect(resolveApiEndpoint(base, '/products/1')).toBe('https://example.com/api/products/1')
    }
  )
  it('rejects invalid and non-HTTP configuration', () => {
    expect(() => resolveApiEndpoint('invalid', '/products')).toThrow()
    expect(() => resolveApiEndpoint('file:///tmp', '/products')).toThrow('HTTP or HTTPS')
  })
})
