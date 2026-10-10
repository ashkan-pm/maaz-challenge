import { mountSuspended } from '@nuxt/test-utils/runtime'
import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import HomePage from './index.vue'

enableAutoUnmount(afterEach)

describe('homepage', () => {
  it('sets the document title and gives the product-list region an accessible heading', async () => {
    const wrapper = await mountSuspended(HomePage, { route: '/' })
    const heading = wrapper.get('h1')
    expect(heading.text()).toBe('لیست محصولات')
    expect(wrapper.get('section').attributes('aria-labelledby')).toBe(heading.attributes('id'))
    await expect.poll(() => document.title).toBe('لیست محصولات')
  })
})
