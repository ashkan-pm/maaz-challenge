import { mountSuspended } from '@nuxt/test-utils/runtime'
import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import SiteFooter from './SiteFooter.vue'

enableAutoUnmount(afterEach)

describe('site footer', () => {
  it('labels its navigation groups and keeps unspecified destinations on the homepage', async () => {
    const wrapper = await mountSuspended(SiteFooter)
    const groups = wrapper.findAll('nav[aria-labelledby]')
    expect(groups.map((group) => group.get('h2').text())).toEqual([
      'دسترسی سریع',
      'راهنمای سایت',
      'شبکه‌های اجتماعی'
    ])
    for (const group of groups) {
      expect(group.attributes('aria-labelledby')).toBe(group.get('h2').attributes('id'))
    }
    expect(wrapper.findAll('a').every((link) => link.attributes('href') === '/')).toBe(true)
    expect(wrapper.find('[aria-current]').exists()).toBe(false)
  })

  it('includes support information, copyright, and accessible trust badges', async () => {
    const wrapper = await mountSuspended(SiteFooter)
    expect(wrapper.text()).toContain('هفت روز هفته از ۸ صبح تا ۱۲ شب پاسخگو هستیم')
    expect(wrapper.text()).toContain('تمامی حقوق مادی و معنوی')
    const images = wrapper.findAll('.trust-badges img')
    expect(images.map((image) => image.attributes('alt'))).toEqual([
      'نماد اعتماد الکترونیکی',
      'نشان ساماندهی'
    ])
    expect(images.every((image) => image.attributes('src')?.startsWith('/images/layout/'))).toBe(
      true
    )
  })
})
