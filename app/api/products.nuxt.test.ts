import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { clearNuxtData } from '#imports'
import HomePage from '~/pages/index.vue'
import { apiProduct } from '~~/test/fixtures/products'
import type { ApiProduct } from '~/types/product'

vi.mock('./endpoints', () => ({ buildApiEndpoint: () => '/__test/products' }))
enableAutoUnmount(afterEach)

let unregister: (() => void) | undefined
beforeEach(() => clearNuxtData('products:18'))
afterEach(() => {
  unregister?.()
  clearNuxtData('products:18')
})

const response = [
  apiProduct,
  { ...apiProduct, id: 3, title: 'Unavailable Backpack' },
  { ...apiProduct, id: 4, title: 'High Stock Backpack' }
]

describe('product requests', () => {
  it('fetches and transforms products once, then applies URL filters without refetching', async () => {
    const handler = vi.fn(() => response)
    unregister = registerEndpoint('/__test/products', handler)
    const wrapper = await mountSuspended(HomePage, { route: '/' })
    await expect.poll(() => wrapper.findAll('.product-card').length).toBe(3)
    expect(wrapper.findAll('.product-card h2').map((title) => title.text())).toEqual([
      'High Stock Backpack',
      'Test Backpack',
      'Unavailable Backpack'
    ])
    await wrapper.get('[role="switch"]').trigger('click')
    await expect.poll(() => wrapper.findAll('.product-card').length).toBe(2)
    await wrapper.get('input').setValue('high stock')
    await wrapper.get('form').trigger('submit')
    await expect.poll(() => wrapper.findAll('.product-card').length).toBe(1)
    expect(wrapper.get('.product-card h2').text()).toBe('High Stock Backpack')
    expect(handler).toHaveBeenCalledOnce()
  })

  it('shows a request error, exposes loading during retry, and recovers on success', async () => {
    let retryResponse: ((value: ApiProduct[]) => void) | undefined
    const handler = vi
      .fn()
      .mockImplementationOnce(() => new Response('Service unavailable', { status: 503 }))
      .mockImplementationOnce(
        () =>
          new Promise<ApiProduct[]>((resolve) => {
            retryResponse = resolve
          })
      )
    unregister = registerEndpoint('/__test/products', handler)
    const wrapper = await mountSuspended(HomePage, { route: '/' })
    await expect.poll(() => wrapper.find('[role="alert"]').exists()).toBe(true)
    expect(handler).toHaveBeenCalledOnce()
    await wrapper.get('[role="alert"] button').trigger('click')
    await expect.poll(() => wrapper.find('[aria-busy="true"]').exists()).toBe(true)
    await expect.poll(() => retryResponse).toBeDefined()
    retryResponse!(response)
    await expect.poll(() => wrapper.findAll('.product-card').length).toBe(3)
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    expect(handler).toHaveBeenCalledTimes(2)
  })
})
