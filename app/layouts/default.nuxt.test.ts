import { mountSuspended } from '@nuxt/test-utils/runtime'
import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { h } from 'vue'
import DefaultLayout from './default.vue'
import HomePage from '~/pages/index.vue'

enableAutoUnmount(afterEach)

describe('default layout', () => {
  it('renders the live homepage between the shared header and footer', async () => {
    const wrapper = await mountSuspended(DefaultLayout, {
      route: '/',
      slots: { default: () => h(HomePage) }
    })
    expect(wrapper.get('main h1').text()).toBe('لیست محصولات')
    expect(wrapper.get('section').attributes('aria-labelledby')).toBe(
      wrapper.get('h1').attributes('id')
    )
    expect(
      Array.from((wrapper.element as HTMLElement).children).map((element) => element.tagName)
    ).toEqual(['HEADER', 'MAIN', 'FOOTER'])
    expect(wrapper.findAll('header')).toHaveLength(1)
    expect(wrapper.findAll('footer')).toHaveLength(1)
  })
})
