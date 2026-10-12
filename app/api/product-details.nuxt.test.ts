import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import { clearNuxtData, useNuxtData } from '#imports'
import { defineComponent, h } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useProduct } from './products'
import { apiProduct } from '~~/test/fixtures/products'
import type { Product } from '~/types/product'

vi.mock('~/api/endpoints', () => ({
  buildApiEndpoint: (endpoint: string) => `/__test/detail${endpoint}`
}))
const endpoints: (() => void)[] = []
beforeEach(() => clearNuxtData((key) => key.startsWith('product:')))
afterEach(() => {
  endpoints.splice(0).forEach((unregister) => unregister())
  clearNuxtData((key) => key.startsWith('product:'))
})

const ProductRequest = defineComponent({
  props: { id: { type: Number, required: true } },
  async setup(props) {
    const { data, status, error } = await useProduct(props.id)
    return () =>
      h(
        'div',
        { 'data-status': status.value, 'data-error': error.value?.statusCode },
        data.value?.title
      )
  }
})

describe('single-product requests', () => {
  it('keeps responses and inventory isolated by product ID', async () => {
    const firstHandler = vi.fn(() => apiProduct)
    const secondHandler = vi.fn(() => ({ ...apiProduct, id: 3, title: 'Cotton Jacket' }))
    endpoints.push(registerEndpoint('/__test/detail/products/1', firstHandler))
    endpoints.push(registerEndpoint('/__test/detail/products/3', secondHandler))
    const first = await mountSuspended(ProductRequest, { props: { id: 1 } })
    const second = await mountSuspended(ProductRequest, { props: { id: 3 } })
    expect(first.text()).toBe(apiProduct.title)
    expect(second.text()).toBe('Cotton Jacket')
    expect(useNuxtData<Product>('product:1').data.value).toMatchObject({ id: 1, stockQuantity: 12 })
    expect(useNuxtData<Product>('product:3').data.value).toMatchObject({ id: 3, stockQuantity: 0 })
    expect(firstHandler).toHaveBeenCalledOnce()
    expect(secondHandler).toHaveBeenCalledOnce()
  })

  it.each([
    ['an empty successful response', () => new Response('', { status: 200 })],
    [
      'a null successful response',
      () => new Response('null', { headers: { 'Content-Type': 'application/json' } })
    ]
  ])('normalizes %s to a missing product', async (_, response) => {
    endpoints.push(registerEndpoint('/__test/detail/products/999', response))
    const wrapper = await mountSuspended(ProductRequest, { props: { id: 999 } })
    expect(wrapper.attributes('data-status')).toBe('success')
    expect(useNuxtData<Product | null>('product:999').data.value).toBeNull()
    expect(wrapper.text()).toBe('')
  })

  it.each([404, 503])(
    'preserves HTTP %s so the page can distinguish missing products from retryable failures',
    async (status) => {
      const handler = vi.fn(() => new Response('Request failed', { status }))
      endpoints.push(registerEndpoint('/__test/detail/products/999', handler))
      const wrapper = await mountSuspended(ProductRequest, { props: { id: 999 } })
      expect(wrapper.attributes('data-status')).toBe('error')
      expect(wrapper.attributes('data-error')).toBe(String(status))
      expect(wrapper.text()).toBe('')
      expect(handler).toHaveBeenCalledOnce()
    }
  )
})
