import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick, reactive } from 'vue'
import HeaderNavigationLinks from './HeaderNavigationLinks.vue'
import { headerNavigation } from './navigation'

const routeState = vi.hoisted(() => ({ route: { path: '/' } }))
mockNuxtImport('useRoute', () => () => routeState.route)

enableAutoUnmount(afterEach)

beforeEach(() => {
  routeState.route = reactive({ path: '/' })
})

describe('header navigation links', () => {
  it('marks only the product-list link current despite shared fallback destinations', async () => {
    const wrapper = await mountSuspended(HeaderNavigationLinks, {
      route: '/',
      props: { items: headerNavigation }
    })
    const links = wrapper.findAll('a')
    expect(links.map((link) => link.text())).toEqual([
      'لیست محصولات',
      'دریافت مشاوره',
      'سوالات متداول',
      'تماس با ما'
    ])
    expect(links.every((link) => link.attributes('href') === '/')).toBe(true)
    expect(wrapper.findAll('[aria-current="page"]')).toHaveLength(1)
    expect(wrapper.get('[aria-current="page"]').text()).toBe('لیست محصولات')
    expect(wrapper.findAll('img')).toHaveLength(1)
  })

  it('updates the active link when navigation changes', async () => {
    const items = [
      { label: 'Home', icon: 'category', path: '/' },
      { label: 'Details', icon: 'book', path: '/navigation-test' }
    ] as const
    const wrapper = await mountSuspended(HeaderNavigationLinks, { route: '/', props: { items } })
    routeState.route.path = '/navigation-test'
    await nextTick()
    expect(wrapper.get('[aria-current="page"]').text()).toBe('Details')
    expect(wrapper.findAll('[aria-current="page"]')).toHaveLength(1)
  })

  it('emits selection and omits the desktop dot in mobile navigation', async () => {
    const wrapper = await mountSuspended(HeaderNavigationLinks, {
      route: '/',
      props: { items: headerNavigation, mobile: true }
    })
    expect(wrapper.find('img').exists()).toBe(false)
    await wrapper.get('a').trigger('click')
    expect(wrapper.emitted('select')).toHaveLength(1)
  })
})
