import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import { useProducts } from '~/api/products'
import { product } from '~~/test/fixtures/products'
import type { Product } from '~/types/product'
import HomePage from './index.vue'

vi.mock('~/api/products', async () => {
  const { createProductsResult } = await import('~~/test/fixtures/products')
  return { useProducts: vi.fn(createProductsResult) }
})

describe('homepage', () => {
  it('sets the document title and gives the product-list region an accessible heading', async () => {
    const wrapper = await mountSuspended(HomePage, { route: '/' })
    const heading = wrapper.get('h1')
    expect(heading.text()).toBe('لیست محصولات')
    expect(wrapper.get('section').attributes('aria-labelledby')).toBe(heading.attributes('id'))
    await expect.poll(() => document.title).toBe('لیست محصولات')
  })
})

describe('product rendering error boundary', () => {
  it('contains client rendering failures and refetches before recovering', async () => {
    const wrapper = await mountSuspended(HomePage, { route: '/' })
    const result = await vi.mocked(useProducts).mock.results.at(-1)!.value
    result.data.value = [{ ...product, title: null } as unknown as Product]
    await expect.poll(() => wrapper.find('[role="alert"]').exists()).toBe(true)
    expect(wrapper.get('[role="alert"]').text()).toContain('دریافت محصولات انجام نشد')
    vi.mocked(result.refresh).mockImplementation(async () => {
      result.data.value = [product]
    })
    await wrapper.get('[role="alert"] button').trigger('click')
    await expect.poll(() => wrapper.find('.product-card').exists()).toBe(true)
    expect(result.refresh).toHaveBeenCalledOnce()
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })
})
