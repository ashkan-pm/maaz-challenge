import { mountSuspended } from '@nuxt/test-utils/runtime'
import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import Breadcrumbs from './Breadcrumbs.vue'

enableAutoUnmount(afterEach)

describe('Breadcrumbs', () => {
  it('labels the icon link, separates items with the existing caret, and marks the current page', async () => {
    const wrapper = await mountSuspended(Breadcrumbs, {
      props: {
        items: [
          { label: 'خانه', to: '/', icon: 'home' },
          { label: 'لیست محصولات', to: '/' },
          { label: 'A long product title' }
        ]
      }
    })
    expect(wrapper.get('nav').attributes('aria-label')).toBe('مسیر صفحه')
    const links = wrapper.findAll('a')
    expect(links).toHaveLength(2)
    expect(links[0]!.attributes('aria-label')).toBe('خانه')
    expect(links[0]!.get('svg').attributes('viewBox')).toBe('0 0 18 18')
    expect(links[0]!.get('use').attributes('href')).toBe('/images/ui/home.svg#icon')
    expect(wrapper.findAll('li > svg use').map((icon) => icon.attributes('href'))).toEqual([
      '/images/product-list/caret.svg#icon',
      '/images/product-list/caret.svg#icon'
    ])
    const current = wrapper.get('[aria-current="page"]')
    expect(current.text()).toBe('A long product title')
    expect(current.attributes('title')).toBe('A long product title')
    expect(current.element.tagName).toBe('SPAN')
  })

  it('supports other navigation hierarchies, route objects, and a custom accessible label', async () => {
    const wrapper = await mountSuspended(Breadcrumbs, {
      props: {
        label: 'Account navigation',
        items: [
          { label: 'Account', to: { path: '/', query: { section: 'account' } } },
          { label: 'Settings' }
        ]
      }
    })
    expect(wrapper.get('nav').attributes('aria-label')).toBe('Account navigation')
    expect(wrapper.get('a').attributes('href')).toBe('/?section=account')
    expect(wrapper.find('a svg').exists()).toBe(false)
    expect(wrapper.get('[aria-current="page"]').text()).toBe('Settings')
  })
})
