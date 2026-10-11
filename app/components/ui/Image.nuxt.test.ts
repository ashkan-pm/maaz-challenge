import { mountSuspended } from '@nuxt/test-utils/runtime'
import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Image from './Image.vue'

enableAutoUnmount(afterEach)

const props = { src: 'https://example.com/product.png', alt: 'A backpack' }

describe('Image', () => {
  beforeEach(() => {
    vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(false)
  })
  it('shows a skeleton until the image loads, preserving its accessible description', async () => {
    const wrapper = await mountSuspended(Image, { props })
    expect(wrapper.classes()).toContain('image-loading')
    expect(wrapper.get('img').attributes()).toMatchObject({ alt: props.alt, loading: 'lazy' })
    expect(wrapper.get('.image-skeleton').attributes('aria-hidden')).toBe('true')
    await wrapper.get('img').trigger('load')
    expect(wrapper.classes()).toContain('image-loaded')
  })

  it('stops loading on failure and resets when a new source replaces the failed image', async () => {
    const wrapper = await mountSuspended(Image, { props })
    const oldImage = wrapper.get('img')
    await oldImage.trigger('error')
    expect(wrapper.classes()).toContain('image-error')
    expect(wrapper.text()).toContain('تصویر در دسترس نیست')
    await wrapper.setProps({ src: 'https://example.com/replacement.png' })
    expect(wrapper.classes()).toContain('image-loading')
    expect(wrapper.find('.image-fallback').exists()).toBe(false)
    await oldImage.trigger('load')
    expect(wrapper.classes()).toContain('image-loading')
    await wrapper.get('img').trigger('load')
    expect(wrapper.classes()).toContain('image-loaded')
  })

  it('recognizes an already cached image without waiting for another load event', async () => {
    vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(true)
    vi.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get').mockReturnValue(200)
    const wrapper = await mountSuspended(Image, { props: { ...props, loading: 'eager' } })
    expect(wrapper.classes()).toContain('image-loaded')
    expect(wrapper.get('img').attributes('loading')).toBe('eager')
  })

  it('shows a fallback for an already failed cached image without waiting for an error event', async () => {
    vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(true)
    vi.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get').mockReturnValue(0)
    const wrapper = await mountSuspended(Image, { props })
    expect(wrapper.classes()).toContain('image-error')
    expect(wrapper.text()).toContain('تصویر در دسترس نیست')
    expect(wrapper.get('img').attributes('alt')).toBe(props.alt)
  })

  it('resets a loaded image for a new source and ignores stale failures', async () => {
    const wrapper = await mountSuspended(Image, { props })
    const previous = wrapper.get('img')
    await previous.trigger('load')
    expect(wrapper.classes()).toContain('image-loaded')
    await wrapper.setProps({ src: 'https://example.com/new-product.png' })
    await previous.trigger('error')
    expect(wrapper.classes()).toContain('image-loading')
    expect(wrapper.find('.image-fallback').exists()).toBe(false)
    await wrapper.get('img').trigger('load')
    expect(wrapper.classes()).toContain('image-loaded')
  })
})
