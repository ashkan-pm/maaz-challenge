import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { clearNuxtData, useNuxtData } from '#imports'
import ProductPage from './[id].vue'
import { apiProduct } from '~~/test/fixtures/products'
import type { Product } from '~/types/product'

vi.mock('~/api/endpoints', () => ({
  buildApiEndpoint: (endpoint: string) => `/__test${endpoint}`
}))
let unregister: (() => void) | undefined
beforeEach(() => clearNuxtData((key) => key.startsWith('product:')))
afterEach(() => {
  unregister?.()
  clearNuxtData((key) => key.startsWith('product:'))
})

describe('product detail route', () => {
  it('fetches the requested ID and supplies the title, breadcrumbs, and shared inventory', async () => {
    const handler = vi.fn(() => ({ ...apiProduct, id: 3, title: 'Cotton Jacket' }))
    unregister = registerEndpoint('/__test/products/3', handler)
    const wrapper = await mountSuspended(ProductPage, { route: '/products/3' })
    await expect.poll(() => wrapper.get('[aria-current="page"]').text()).toBe('Cotton Jacket')
    await expect.poll(() => document.title).toBe('Cotton Jacket')
    expect(wrapper.get('a[aria-label="خانه"]').attributes('href')).toBe('/')
    expect(wrapper.get('h1').text()).toBe('Cotton Jacket')
    expect(wrapper.get('.product-image img').attributes()).toMatchObject({
      src: apiProduct.image,
      alt: 'Cotton Jacket',
      loading: 'eager'
    })
    expect(wrapper.get('section.product-image-card').attributes('aria-labelledby')).toBe(
      wrapper.get('h1').attributes('id')
    )
    const previewButton = wrapper.get('button[aria-label="بزرگنمایی تصویر محصول"]')
    expect(previewButton.get('use').attributes('href')).toBe('/images/ui/magnify.svg#icon')
    expect(previewButton.get('svg').attributes('viewBox')).toBe('0 0 24 24')
    expect(wrapper.findAll('a')[1]!.text()).toBe('لیست محصولات')
    expect(useNuxtData<Product>('product:3').data.value).toMatchObject({
      id: 3,
      available: false,
      stockQuantity: 0,
      title: 'Cotton Jacket'
    })
    expect(wrapper.get('h2').text()).toBe('مشخصات فنی')
    expect(wrapper.findAll('dd').at(-1)?.text()).toBe('۰')
    expect(wrapper.get('.detail-description').text()).toBe(apiProduct.description)
    expect(handler).toHaveBeenCalledOnce()
  })

  it('shows a retryable request error and restores the product breadcrumb on success', async () => {
    const handler = vi
      .fn()
      .mockImplementationOnce(() => new Response('Unavailable', { status: 503 }))
      .mockImplementationOnce(() => apiProduct)
    unregister = registerEndpoint('/__test/products/1', handler)
    const wrapper = await mountSuspended(ProductPage, { route: '/products/1' })
    await expect.poll(() => wrapper.find('[role="alert"]').exists()).toBe(true)
    await wrapper.get('[role="alert"] button').trigger('click')
    await expect.poll(() => wrapper.get('[aria-current="page"]').text()).toBe(apiProduct.title)
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    expect(handler).toHaveBeenCalledTimes(2)
  })
})
