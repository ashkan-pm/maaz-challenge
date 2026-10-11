import { mountSuspended } from '@nuxt/test-utils/runtime'
import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import Badge from './Badge.vue'

enableAutoUnmount(afterEach)

describe('Badge', () => {
  it('formats counts as Farsi numerals and updates when the count changes', async () => {
    const wrapper = await mountSuspended(Badge, { props: { count: 13 } })
    expect(wrapper.text()).toBe('۱۳')
    await wrapper.setProps({ count: 33 })
    expect(wrapper.text()).toBe('۳۳')
  })
})
