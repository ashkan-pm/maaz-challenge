import { mountSuspended } from '@nuxt/test-utils/runtime'
import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import ProductImageCard from './ProductImageCard.vue'

enableAutoUnmount(afterEach)

describe('ProductImageCard preview', () => {
  it('opens the original image and dismisses it with the reusable close icon', async () => {
    const product = { id: 1, title: 'Backpack', image: 'https://example.com/backpack.jpg' }
    const wrapper = await mountSuspended(ProductImageCard, {
      attachTo: document.body,
      props: { product }
    })
    await wrapper.get('[aria-haspopup="dialog"]').trigger('click')
    expect(wrapper.get('dialog').element.open).toBe(true)
    expect(wrapper.get('dialog img').attributes()).toMatchObject({
      src: product.image,
      alt: product.title
    })
    const close = wrapper.get('[aria-label="بستن پیش‌نمایش"]')
    expect(close.get('use').attributes('href')).toBe('/images/ui/close.svg#icon')
    await close.trigger('click')
    expect(wrapper.get('dialog').element.open).toBe(false)
  })
})
