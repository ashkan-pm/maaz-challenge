import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import App from '~/app.vue'

// A starter smoke test: replace it with product behavior tests as the app grows.
describe('application', () => {
  it('renders the Nuxt starter with a documentation link', async () => {
    const wrapper = await mountSuspended(App)

    try {
      expect(wrapper.text()).toContain('Nuxt')
      expect(wrapper.find('a[href^="https://nuxt.com/docs"]').exists()).toBe(true)
    } finally {
      wrapper.unmount()
    }
  })
})
