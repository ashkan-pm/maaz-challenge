import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, describe, expect, it } from 'vitest'
import { clearError, useError, useRouter } from '#imports'
import NotFoundPage from './[...slug].vue'

afterEach(() => clearError())

describe('unknown routes', () => {
  it.each(['/missing', '/_nuxt/', '/products/1/extra'])(
    'matches %s with the catch-all route instead of leaving it unmatched',
    (path) => {
      const route = useRouter().resolve(path)
      expect(route.matched).toHaveLength(1)
      expect(route.name).toBe('slug')
    }
  )

  it('keeps existing routes ahead of the catch-all', () => {
    expect(useRouter().resolve('/').name).toBe('index')
    expect(useRouter().resolve('/products/1').name).toBe('products-id')
  })

  it('shows the shared 404 page for unknown routes', async () => {
    await mountSuspended(NotFoundPage, { route: '/missing' })
    expect(useError().value).toMatchObject({ statusCode: 404, statusMessage: 'Page not found' })
  })
})
