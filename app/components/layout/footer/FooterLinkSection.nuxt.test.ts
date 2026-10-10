import { mountSuspended } from '@nuxt/test-utils/runtime'
import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import FooterLinkSection from './FooterLinkSection.vue'

enableAutoUnmount(afterEach)

describe('footer link section', () => {
  it('renders labelled links with optional decorative icons and reacts to new items', async () => {
    const wrapper = await mountSuspended(FooterLinkSection, {
      props: {
        id: 'section-title',
        title: 'Links',
        items: [{ label: 'Plain' }, { label: 'Telegram', icon: 'telegram' }]
      }
    })
    expect(wrapper.get('nav').attributes('aria-labelledby')).toBe('section-title')
    const links = wrapper.findAll('a')
    expect(links[0]?.find('svg').exists()).toBe(false)
    expect(links[1]?.get('svg').attributes('aria-hidden')).toBe('true')
    await wrapper.setProps({ items: [{ label: 'Updated' }] })
    expect(wrapper.findAll('a')).toHaveLength(1)
    expect(wrapper.get('a').text()).toBe('Updated')
    expect(wrapper.find('svg').exists()).toBe(false)
  })
})
