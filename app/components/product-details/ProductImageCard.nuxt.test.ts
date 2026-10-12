import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import ProductImageCard from './ProductImageCard.vue'

const product = { id: 1, title: 'Backpack', image: 'https://example.com/backpack.jpg' }

describe('ProductImageCard preview', () => {
  it('opens the original image and dismisses it with the reusable close icon', async () => {
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
    await wrapper.get('dialog img').trigger('click')
    expect(wrapper.get('dialog').element.open).toBe(true)
    const close = wrapper.get('[aria-label="بستن پیش‌نمایش"]')
    expect(close.get('use').attributes('href')).toBe('/images/ui/close.svg#icon')
    await close.trigger('click')
    expect(wrapper.get('dialog').element.open).toBe(false)
  })
  it.each(['click', 'cancel'])(
    'dismisses via %s and can reopen without leaving scrolling locked',
    async (event) => {
      const wrapper = await mountSuspended(ProductImageCard, {
        attachTo: document.body,
        props: { product }
      })
      const initialOverflow = document.body.style.overflow
      for (let cycle = 0; cycle < 2; cycle++) {
        const trigger = wrapper.get<HTMLButtonElement>('[aria-haspopup="dialog"]')
        trigger.element.focus()
        await trigger.trigger('click')
        expect(wrapper.get('dialog').element.open).toBe(true)
        expect(document.body.style.overflow).toBe('hidden')
        await wrapper.get('dialog').trigger(event)
        expect(wrapper.get('dialog').element.open).toBe(false)
        expect(document.body.style.overflow).toBe(initialOverflow)
        expect(document.activeElement).toBe(trigger.element)
      }
    }
  )
})
