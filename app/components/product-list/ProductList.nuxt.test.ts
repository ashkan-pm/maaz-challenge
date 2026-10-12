import { mountSuspended } from '@nuxt/test-utils/runtime'
import type { VueWrapper } from '@vue/test-utils'
import { enableAutoUnmount, flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { SEARCH_MAX_LENGTH } from '~/utils/productSearch'
import ProductList from './ProductList.vue'
import { product } from '~~/test/fixtures/products'
enableAutoUnmount(afterEach)
describe('product results', () => {
  it('renders fetched products and keeps controls visible', async () => {
    const wrapper = await mountSuspended(ProductList, { props: { products: [product] } })
    expect(wrapper.get('.product-card h2').text()).toBe(product.title)
    expect(wrapper.get('.product-image img').attributes('src')).toBe(product.image)
    expect(wrapper.get('.details-button').attributes('href')).toBe(`/products/${product.id}`)
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
      route: '/?category=jewelery',
      attachTo: document.body
    })
    // Add the hash once its target is in the document, because the router scrolls to it.
    await wrapper.vm.$router.replace('/?category=jewelery#product-list-title')
    expect(wrapper.findAll('.filter-chip')).toHaveLength(1)
    expect(wrapper.find('.applied-filters').exists()).toBe(true)
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
    expect(wrapper.findAll('.filter-chip')).toHaveLength(1)
    expect(wrapper.find('.applied-filters').exists()).toBe(true)
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
  it('limits direct URL searches and submitted searches to the configured maximum', async () => {
    const wrapper = await mountSuspended(ProductList, {
      props: { products: [product] },
      route: `/?search=${'A'.repeat(60)}`
    })
    expect(wrapper.get('input').attributes('maxlength')).toBe(String(SEARCH_MAX_LENGTH))
    expect((wrapper.get('input').element as HTMLInputElement).value).toBe(
      'a'.repeat(SEARCH_MAX_LENGTH)
    )
    expect(wrapper.get('.chip-label').text()).toBe('a'.repeat(SEARCH_MAX_LENGTH))
    await wrapper.get('input').setValue('B'.repeat(60))
    await wrapper.get('form').trigger('submit')
    await expect
      .poll(() => wrapper.vm.$router.currentRoute.value.query.search)
      .toBe('b'.repeat(SEARCH_MAX_LENGTH))
    await expect.poll(() => wrapper.get('.chip-label').text()).toBe('b'.repeat(SEARCH_MAX_LENGTH))
  })
})

describe('URL-driven availability filter', () => {
  const products = [product, { ...product, id: 2, title: 'Unavailable Backpack', available: false }]

  it('filters direct links without adding a chip and defaults off for missing or invalid values', async () => {
    const wrapper = await mountSuspended(ProductList, {
      props: { products },
      route: '/?available=true'
    })
    expect(wrapper.get('[role="switch"]').attributes('aria-checked')).toBe('true')
    expect(wrapper.findAll('.product-card')).toHaveLength(1)
    expect(wrapper.find('.applied-filters').exists()).toBe(true)
    await wrapper.vm.$router.push('/?available=invalid')
    await expect.poll(() => wrapper.findAll('.product-card').length).toBe(2)
    expect(wrapper.get('[role="switch"]').attributes('aria-checked')).toBe('false')
  })

  it('combines with search, preserves other parameters, and restores unavailable products when off', async () => {
    const wrapper = await mountSuspended(ProductList, {
      props: { products },
      route: '/?search=backpack&category=clothing'
    })
    await wrapper.get('[role="switch"]').trigger('click')
    await expect
      .poll(() => wrapper.vm.$router.currentRoute.value.query)
      .toEqual({
        search: 'backpack',
        category: 'clothing',
        available: 'true'
      })
    await expect.poll(() => wrapper.findAll('.product-card').length).toBe(1)
    expect(wrapper.findAll('.filter-chip')).toHaveLength(2)
    await wrapper.get('.remove-button').trigger('click')
    await expect
      .poll(() => wrapper.vm.$router.currentRoute.value.query)
      .toEqual({
        category: 'clothing',
        available: 'true'
      })
    await expect.poll(() => wrapper.find('.applied-filters').exists()).toBe(true)
    expect(wrapper.findAll('.product-card')).toHaveLength(1)
    await wrapper.get('[role="switch"]').trigger('click')
    await expect.poll(() => wrapper.vm.$router.currentRoute.value.query.available).toBe('false')
    await expect.poll(() => wrapper.findAll('.product-card').length).toBe(2)
    await wrapper.vm.$router.push('/?available=true&search=unavailable')
    await expect.poll(() => wrapper.findAll('.product-card').length).toBe(0)
    expect(wrapper.get('[role="status"]').text()).toContain('محصولی پیدا نشد')
    expect(wrapper.get('[role="switch"]').attributes('aria-checked')).toBe('true')
  })
})

describe('URL-driven sorting', () => {
  const products = [
    { ...product, id: 1, title: 'Low Stock', stockQuantity: 2, rating: { rate: 5, count: 1 } },
    { ...product, id: 2, title: 'High Stock', stockQuantity: 20, rating: { rate: 2, count: 999 } }
  ]

  it('defaults to quantity-desc with a permanent chip and the requested option order', async () => {
    const wrapper = await mountSuspended(ProductList, {
      props: { products },
      route: '/?sort=invalid'
    })
    expect(wrapper.findAll('.product-card h2').map((item) => item.text())).toEqual([
      'High Stock',
      'Low Stock'
    ])
    expect(
      wrapper.findAll('input[type="radio"]').map((input) => input.attributes('value'))
    ).toEqual(['quantity-desc', 'quantity-asc', 'rating-desc', 'rating-asc'])
    expect((wrapper.get('input[value="quantity-desc"]').element as HTMLInputElement).checked).toBe(
      true
    )
    expect(wrapper.findAll('.filter-chip')).toHaveLength(1)
    expect(wrapper.get('.chip-label').text()).toBe('تعداد: زیاد به کم')
    expect(wrapper.find('.filter-chip button').exists()).toBe(false)
    expect(wrapper.get('.filter-chip use').attributes('href')).toBe('/images/ui/sort-desc.svg#icon')
  })

  it('updates the URL, products, and chip while preserving search and availability', async () => {
    const wrapper = await mountSuspended(ProductList, {
      props: { products },
      route: '/?search=stock&available=true'
    })
    await wrapper.get('input[value="rating-desc"]').setValue(true)
    await expect
      .poll(() => wrapper.vm.$router.currentRoute.value.query)
      .toEqual({
        search: 'stock',
        available: 'true',
        sort: 'rating-desc'
      })
    await expect
      .poll(() => wrapper.findAll('.product-card h2').map((item) => item.text()))
      .toEqual(['Low Stock', 'High Stock'])
    expect(wrapper.findAll('.filter-chip')).toHaveLength(2)
    expect(wrapper.findAll('.filter-chip button')).toHaveLength(1)
    await wrapper.vm.$router.push('/?sort=rating-asc')
    await expect.poll(() => wrapper.get('.chip-label').text()).toBe('رتبه: کم به زیاد')
    expect(wrapper.get('.filter-chip use').attributes('href')).toBe('/images/ui/sort.svg#icon')
    expect((wrapper.get('input[value="rating-asc"]').element as HTMLInputElement).checked).toBe(
      true
    )
    await wrapper.vm.$router.push('/?sort=quantity-asc')
    await expect
      .poll(() => wrapper.findAll('.product-card h2').map((item) => item.text()))
      .toEqual(['Low Stock', 'High Stock'])
  })
})

describe('URL-driven categories', () => {
  const products = [
    { ...product, id: 1, title: 'Shared Shirt', category: "men's clothing" },
    { ...product, id: 2, title: 'Shared Monitor', category: 'electronics', available: false },
    { ...product, id: 3, title: 'Other Monitor', category: 'electronics' },
    { ...product, id: 4, title: 'Shared Ring', category: 'jewelery' }
  ]
  const counts = (wrapper: VueWrapper) =>
    wrapper.findAll('.category-options .badge').map((badge) => badge.text())

  it('reads encoded repeated parameters and ignores unknown categories without adding chips', async () => {
    const wrapper = await mountSuspended(ProductList, {
      props: { products },
      route: '/?category=men%27s%20clothing&category=electronics&category=unknown'
    })
    expect(wrapper.findAll('.product-card')).toHaveLength(3)
    expect(
      wrapper
        .findAll('.category-options input')
        .map((input) => (input.element as HTMLInputElement).checked)
    ).toEqual([true, true, false])
    expect(counts(wrapper)).toEqual(['۱', '۲', '۱'])
    expect(wrapper.findAll('.filter-chip')).toHaveLength(1)
  })

  it('combines selections, preserves other parameters, and counts search/availability matches', async () => {
    const wrapper = await mountSuspended(ProductList, {
      props: { products },
      route: '/?search=shared&available=true&sort=rating-asc&tracking=keep'
    })
    expect(counts(wrapper)).toEqual(['۱', '۰', '۱'])
    const checkboxes = wrapper.findAll('.category-options input')
    await checkboxes[0]!.setValue(true)
    await expect
      .poll(() => wrapper.vm.$router.currentRoute.value.query.category)
      .toEqual(["men's clothing"])
    await expect.poll(() => wrapper.findAll('.product-card').length).toBe(1)
    await checkboxes[2]!.setValue(true)
    await expect
      .poll(() => wrapper.vm.$router.currentRoute.value.query)
      .toEqual({
        search: 'shared',
        available: 'true',
        sort: 'rating-asc',
        tracking: 'keep',
        category: ["men's clothing", 'jewelery']
      })
    await expect.poll(() => wrapper.findAll('.product-card').length).toBe(2)
    expect(counts(wrapper)).toEqual(['۱', '۰', '۱'])
    await checkboxes[0]!.setValue(false)
    await expect.poll(() => wrapper.findAll('.product-card').length).toBe(1)
    await checkboxes[2]!.setValue(false)
    await expect.poll(() => wrapper.vm.$router.currentRoute.value.query.category).toBeUndefined()
    await expect.poll(() => wrapper.findAll('.product-card').length).toBe(2)
    await wrapper.vm.$router.push('/?search=shared&available=false')
    await expect.poll(() => counts(wrapper)).toEqual(['۱', '۱', '۱'])
    await wrapper.vm.$router.push('/?search=missing')
    await expect.poll(() => counts(wrapper)).toEqual(['۰', '۰', '۰'])
    expect(wrapper.findAll('.category-options input')).toHaveLength(3)
    expect(wrapper.get('[role="status"]').text()).toContain('محصولی پیدا نشد')
  })
})

describe('filter state lifecycle', () => {
  const products = [
    { ...product, id: 1, title: 'Cotton Shirt', category: "men's clothing", stockQuantity: 4 },
    { ...product, id: 2, title: 'Silver Ring', category: 'jewelery', stockQuantity: 12 },
    {
      ...product,
      id: 3,
      title: 'Gold Ring',
      category: 'jewelery',
      available: false,
      stockQuantity: 0
    }
  ]

  it('keeps edits and the input clear button local until submitting, preserving other filters', async () => {
    const wrapper = await mountSuspended(ProductList, {
      props: { products },
      route: '/?search=silver&available=true&sort=quantity-asc&category=jewelery'
    })
    await wrapper.get('input').setValue('gold')
    expect(wrapper.get('.product-card h2').text()).toBe('Silver Ring')
    expect(wrapper.get('.chip-label').text()).toBe('silver')
    await wrapper.get('.clear-button').trigger('click')
    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('')
    expect(wrapper.get('.chip-label').text()).toBe('silver')
    expect(wrapper.vm.$router.currentRoute.value.query.search).toBe('silver')
    await wrapper.get('form').trigger('submit')
    await expect
      .poll(() => wrapper.vm.$router.currentRoute.value.query)
      .toEqual({
        available: 'true',
        sort: 'quantity-asc',
        category: 'jewelery'
      })
    await expect.poll(() => wrapper.get('.chip-label').text()).toBe('تعداد: کم به زیاد')
    expect(wrapper.get('.product-card h2').text()).toBe('Silver Ring')
  })

  it('applies categories from the URL when initially empty data arrives', async () => {
    const wrapper = await mountSuspended(ProductList, {
      props: { products: [], loading: true },
      route: '/?category=jewelery&search=ring&available=true'
    })
    expect(wrapper.find('[aria-busy="true"]').exists()).toBe(true)
    await wrapper.setProps({ products, loading: false })
    expect(wrapper.findAll('.product-card')).toHaveLength(1)
    expect(wrapper.get('.product-card h2').text()).toBe('Silver Ring')
    expect((wrapper.get('input[aria-label="Jewelery"]').element as HTMLInputElement).checked).toBe(
      true
    )
    expect(wrapper.findAll('.category-options .badge').map((badge) => badge.text())).toEqual([
      '۰',
      '۱'
    ])
  })

  it('restores products, chips, and all controls through back and forward navigation', async () => {
    const wrapper = await mountSuspended(ProductList, { props: { products }, route: '/' })
    const router = wrapper.vm.$router
    await router.push('/?search=ring&available=true&sort=quantity-asc&category=jewelery')
    await expect.poll(() => wrapper.findAll('.product-card').length).toBe(1)
    await router.push(
      '/?search=cotton&available=false&sort=rating-desc&category=men%27s%20clothing'
    )
    await expect.poll(() => wrapper.get('.product-card h2').text()).toBe('Cotton Shirt')
    router.back()
    await expect.poll(() => router.currentRoute.value.query.search).toBe('ring')
    await expect.poll(() => wrapper.get('.product-card h2').text()).toBe('Silver Ring')
    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('ring')
    expect(wrapper.get('[role="switch"]').attributes('aria-checked')).toBe('true')
    expect((wrapper.get('input[value="quantity-asc"]').element as HTMLInputElement).checked).toBe(
      true
    )
    expect((wrapper.get('input[aria-label="Jewelery"]').element as HTMLInputElement).checked).toBe(
      true
    )
    expect(wrapper.findAll('.chip-label').map((chip) => chip.text())).toEqual([
      'ring',
      'تعداد: کم به زیاد'
    ])
    router.forward()
    await expect.poll(() => wrapper.get('.product-card h2').text()).toBe('Cotton Shirt')
    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('cotton')
    expect(wrapper.get('[role="switch"]').attributes('aria-checked')).toBe('false')
    expect((wrapper.get('input[value="rating-desc"]').element as HTMLInputElement).checked).toBe(
      true
    )
    expect(
      (wrapper.get('input[aria-label="Men\'s Clothing"]').element as HTMLInputElement).checked
    ).toBe(true)
  })
})
