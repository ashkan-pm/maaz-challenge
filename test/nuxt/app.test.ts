import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import SiteHeader from '~/components/layout/header/SiteHeader.vue'
import DefaultLayout from '~/layouts/default.vue'
import HomePage from '~/pages/index.vue'

describe('header and page shell', () => {
  it('renders the product-list card inside the shared layout', async () => {
    const page = await mountSuspended(HomePage)
    const layout = await mountSuspended(DefaultLayout, { slots: { default: page.html() } })
    try {
      expect(layout.find('header').exists()).toBe(true)
      expect(layout.find('main h1').text()).toBe('لیست محصولات')
    } finally {
      layout.unmount()
      page.unmount()
    }
  })

  it('marks only the product-list navigation item as current', async () => {
    const wrapper = await mountSuspended(SiteHeader, { route: '/' })
    try {
      const current = wrapper.findAll('nav [aria-current="page"]')
      expect(current).toHaveLength(1)
      expect(current[0]?.text()).toBe('لیست محصولات')
    } finally {
      wrapper.unmount()
    }
  })

  it('toggles the mobile menu, closes on selection, and restores focus on Escape', async () => {
    const wrapper = await mountSuspended(SiteHeader, { route: '/', attachTo: document.body })
    try {
      const button = wrapper.find('button[aria-controls="mobile-navigation"]')
      expect(button.attributes('aria-expanded')).toBe('false')
      expect(wrapper.find('#mobile-navigation').exists()).toBe(false)

      await button.trigger('click')
      expect(button.attributes('aria-expanded')).toBe('true')
      const menu = wrapper.find('#mobile-navigation')
      expect(menu.findAll('a')).toHaveLength(4)
      expect(menu.find('[aria-current="page"]').text()).toBe('لیست محصولات')

      await menu.find('a').trigger('click')
      expect(button.attributes('aria-expanded')).toBe('false')
      expect(wrapper.find('#mobile-navigation').exists()).toBe(false)

      await button.trigger('click')
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      await nextTick()
      expect(button.attributes('aria-expanded')).toBe('false')
      expect(document.activeElement).toBe(button.element)
    } finally {
      wrapper.unmount()
    }
  })
})
