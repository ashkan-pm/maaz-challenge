import { mountSuspended } from '@nuxt/test-utils/runtime'
import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import FooterSocialLinks from './FooterSocialLinks.vue'

enableAutoUnmount(afterEach)

describe('footer social links', () => {
  it('provides accessible platform names with one decorative icon per link', async () => {
    const wrapper = await mountSuspended(FooterSocialLinks)
    const links = wrapper.findAll('a')
    expect(links.map((link) => link.attributes('aria-label'))).toEqual([
      'تلگرام',
      'اینستاگرام',
      'توییتر',
      'یوتیوب',
      'لینکدین'
    ])
    for (const link of links) {
      expect(link.findAll('svg')).toHaveLength(1)
      expect(link.get('svg').attributes('aria-hidden')).toBe('true')
    }
    expect(wrapper.get('a[aria-label="توییتر"] use').attributes('href')).toBe(
      '/images/layout/twitter.svg#icon'
    )
  })
})
