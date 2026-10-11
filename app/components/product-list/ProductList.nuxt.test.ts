import { mountSuspended } from '@nuxt/test-utils/runtime'
import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import ProductList from './ProductList.vue'
import { product } from '~~/test/fixtures/products'
enableAutoUnmount(afterEach)
describe('product results', () => {
  it('renders fetched products and keeps controls visible', async () => {
    const wrapper = await mountSuspended(ProductList, { props: { products: [product] } })
    expect(wrapper.get('.product-card h2').text()).toBe(product.title)
    expect(wrapper.get('.product-image').attributes('src')).toBe(product.image)
    expect(wrapper.find('[role="search"]').exists()).toBe(true)
  })
  it('switches from a retryable error to loading and then results', async () => {
    const wrapper = await mountSuspended(ProductList, { props: { products: [], failed: true } })
    expect(wrapper.get('[role="alert"]').text()).toContain('دریافت محصولات انجام نشد')
    await wrapper.get('[role="alert"] button').trigger('click')
    expect(wrapper.emitted('retry')).toHaveLength(1)
    await wrapper.setProps({ loading: true })
    expect(wrapper.get('[role="status"]').attributes('aria-busy')).toBe('true')
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    await wrapper.setProps({ loading: false, failed: false, products: [product] })
    expect(wrapper.find('.results-state').exists()).toBe(false)
    expect(wrapper.find('.product-card').exists()).toBe(true)
  })
  it('shows a distinct empty state without a retry button', async () => {
    const wrapper = await mountSuspended(ProductList, { props: { products: [] } })
    expect(wrapper.get('[role="status"]').text()).toContain('محصولی پیدا نشد')
    expect(wrapper.find('.results-state button').exists()).toBe(false)
  })
})
