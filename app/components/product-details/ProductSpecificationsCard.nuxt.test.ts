import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import ProductSpecificationsCard from './ProductSpecificationsCard.vue'
import { product } from '~~/test/fixtures/products'

describe('ProductSpecificationsCard', () => {
  it('maps API content and mock inventory to labeled fields with Farsi numerals', async () => {
    const wrapper = await mountSuspended(ProductSpecificationsCard, { props: { product } })
    expect(wrapper.attributes('aria-labelledby')).toBe(wrapper.get('h2').attributes('id'))
    expect(wrapper.findAll('dt').map((field) => field.text())).toEqual([
      'قیمت',
      'توضیحات',
      'دسته بندی',
      'رتبه',
      'تعداد'
    ])
    expect(wrapper.findAll('dd').map((field) => field.text())).toEqual([
      '۱۰۹٫۹۵ دلار',
      product.description,
      product.category,
      '۳٫۹',
      '۱۲'
    ])
    expect(wrapper.get('.detail-description p').attributes('dir')).toBe('auto')
  })

  it('shows zero stock for an unavailable product without using the rating count', async () => {
    const wrapper = await mountSuspended(ProductSpecificationsCard, {
      props: { product: { ...product, available: false, stockQuantity: 0 } }
    })
    expect(wrapper.findAll('dd').at(-1)?.text()).toBe('۰')
    await wrapper.setProps({
      product: { ...product, stockQuantity: 25, rating: { rate: 4.5, count: 999 } }
    })
    expect(wrapper.findAll('dd').at(-1)?.text()).toBe('۲۵')
    expect(wrapper.findAll('dd').at(-2)?.text()).toBe('۴٫۵')
  })
})
