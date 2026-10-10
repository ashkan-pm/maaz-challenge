import { mountSuspended } from '@nuxt/test-utils/runtime'
import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import AppIcon from './AppIcon.vue'

enableAutoUnmount(afterEach)

describe('AppIcon', () => {
  it.each([
    { name: 'phone', size: '14' },
    { name: 'menu', size: '16' },
    { name: 'telegram', size: '24' }
  ] as const)(
    'renders $name with its native coordinate system and no extra focus target',
    async ({ name, size }) => {
      const wrapper = await mountSuspended(AppIcon, { props: { name } })
      expect(wrapper.attributes('width')).toBe(size)
      expect(wrapper.attributes('height')).toBe(size)
      expect(wrapper.attributes('viewBox')).toBe(`0 0 ${size} ${size}`)
      expect(wrapper.attributes('aria-hidden')).toBe('true')
      expect(wrapper.attributes('focusable')).toBe('false')
      expect(wrapper.get('use').attributes('href')).toBe(`/images/layout/${name}.svg#icon`)
    }
  )

  it('updates both the SVG source and dimensions when the icon prop changes', async () => {
    const wrapper = await mountSuspended(AppIcon, { props: { name: 'menu' } })
    await wrapper.setProps({ name: 'phone' })
    expect(wrapper.attributes('viewBox')).toBe('0 0 14 14')
    expect(wrapper.get('use').attributes('href')).toBe('/images/layout/phone.svg#icon')
  })
})
