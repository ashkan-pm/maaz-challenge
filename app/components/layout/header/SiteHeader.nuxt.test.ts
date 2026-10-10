import { mountSuspended } from '@nuxt/test-utils/runtime'
import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import SiteHeader from './SiteHeader.vue'

enableAutoUnmount(afterEach)

describe('site header', () => {
  it('composes desktop navigation, an accessible mobile toggle, and the contact link', async () => {
    const wrapper = await mountSuspended(SiteHeader, { route: '/' })
    expect(wrapper.findAll('header')).toHaveLength(1)
    expect(wrapper.get('nav[aria-label="منوی اصلی"]').findAll('a')).toHaveLength(4)
    expect(wrapper.get('button').attributes('aria-controls')).toBe('mobile-navigation')
    const contact = wrapper.get('a[aria-label="تماس"]')
    expect(contact.attributes('href')).toBe('/')
    expect(contact.get('use').attributes('href')).toBe('/images/layout/phone.svg#icon')
    expect(wrapper.find('img[src*="logo"]').exists()).toBe(false)
  })
})
