import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import SiteHeader from '~/components/layout/SiteHeader.vue'
import DefaultLayout from '~/layouts/default.vue'
import HomePage from '~/pages/index.vue'

describe('header and page shell', () => {
  it('renders the product-list card inside the shared layout', async () => {
    const page = await mountSuspended(HomePage)
    const layout = await mountSuspended(DefaultLayout, { slots: { default: page.html() } })
    try {
      expect(layout.find('header').exists()).toBe(true)
      expect(layout.find('main h1').text()).toBe('لیست محصولات')
      expect(layout.find('a[href="#main-content"]').exists()).toBe(true)
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
})
