import { mountSuspended } from '@nuxt/test-utils/runtime'
import { enableAutoUnmount, flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import ProductList from './ProductList.vue'
import { product } from '~~/test/fixtures/products'
enableAutoUnmount(afterEach)
describe('product results', () => {
  it('renders fetched products and keeps controls visible', async () => {
    const wrapper = await mountSuspended(ProductList, { props: { products: [product] } })
    expect(wrapper.get('.product-card h2').text()).toBe(product.title)
    expect(wrapper.get('.product-image img').attributes('src')).toBe(product.image)
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

describe('URL-driven product search', () => {
  const products = [product, { ...product, id: 2, title: 'Silver Ring' }]

  it('filters a direct search link and initializes the field and chip from the URL', async () => {
    const wrapper = await mountSuspended(ProductList, {
      props: { products },
      route: '/?search=%20BACKPACK%20'
    })
    await expect.poll(() => wrapper.findAll('.product-card').length).toBe(1)
    expect(wrapper.get('.product-card h2').text()).toBe(product.title)
    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('backpack')
    expect(wrapper.get('.chip-label').text()).toBe('backpack')
  })

  it('waits for submission, normalizes the search, and preserves unrelated parameters', async () => {
    const wrapper = await mountSuspended(ProductList, {
      props: { products },
      route: '/?category=jewelery#product-list-title'
    })
    expect(wrapper.findAll('.filter-chip')).toHaveLength(0)
    expect(wrapper.find('.applied-filters').exists()).toBe(false)
    await wrapper.get('input').setValue('  RING  ')
    await expect.poll(() => wrapper.findAll('.product-card').length).toBe(2)
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    await expect
      .poll(() => wrapper.vm.$router.currentRoute.value.query)
      .toEqual({ category: 'jewelery', search: 'ring' })
    expect(wrapper.vm.$router.currentRoute.value.hash).toBe('#product-list-title')
    await expect.poll(() => wrapper.findAll('.product-card').length).toBe(1)
    expect(wrapper.get('.chip-label').text()).toBe('ring')
    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('ring')
    await wrapper.get('.remove-button').trigger('click')
    await flushPromises()
    await expect
      .poll(() => wrapper.vm.$router.currentRoute.value.query)
      .toEqual({ category: 'jewelery' })
    expect(wrapper.findAll('.filter-chip')).toHaveLength(0)
    expect(wrapper.find('.applied-filters').exists()).toBe(false)
    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('')
    await expect.poll(() => wrapper.findAll('.product-card').length).toBe(2)
  })

  it('updates when the URL changes and treats a blank submission as clearing the search', async () => {
    const wrapper = await mountSuspended(ProductList, { props: { products }, route: '/' })
    await wrapper.vm.$router.push('/?search=missing')
    await flushPromises()
    expect(wrapper.findAll('.product-card')).toHaveLength(0)
    expect(wrapper.get('[role="status"]').text()).toContain('محصولی پیدا نشد')
    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('missing')
    await wrapper.vm.$router.push('/?search=ring')
    await flushPromises()
    await expect.poll(() => wrapper.findAll('.product-card').length).toBe(1)
    await wrapper.get('input').setValue('   ')
    await wrapper.get('form').trigger('submit')
    await flushPromises()
    await expect.poll(() => wrapper.vm.$router.currentRoute.value.query.search).toBeUndefined()
    await expect.poll(() => wrapper.findAll('.product-card').length).toBe(2)
  })
})

describe('search length limit', () => {
  it('limits direct URL searches and submitted searches to 50 characters', async () => {
    const wrapper = await mountSuspended(ProductList, {
      props: { products: [product] },
      route: `/?search=${'A'.repeat(60)}`
    })
    expect(wrapper.get('input').attributes('maxlength')).toBe('50')
    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('a'.repeat(50))
    expect(wrapper.get('.chip-label').text()).toBe('a'.repeat(50))
    await wrapper.get('input').setValue('B'.repeat(60))
    await wrapper.get('form').trigger('submit')
    await expect.poll(() => wrapper.vm.$router.currentRoute.value.query.search).toBe('b'.repeat(50))
    await expect.poll(() => wrapper.get('.chip-label').text()).toBe('b'.repeat(50))
  })
})
