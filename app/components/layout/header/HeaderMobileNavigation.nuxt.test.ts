import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick, reactive } from 'vue'
import HeaderMobileNavigation from './HeaderMobileNavigation.vue'

const routeState = vi.hoisted(() => ({ route: { path: '/' } }))
mockNuxtImport('useRoute', () => () => routeState.route)

enableAutoUnmount(afterEach)
let media: MediaQueryList
beforeEach(() => {
  routeState.route = reactive({ path: '/' })
  media = Object.assign(new EventTarget(), {
    matches: false,
    media: '(min-width: 64rem)',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn()
  }) as MediaQueryList
  vi.spyOn(window, 'matchMedia').mockReturnValue(media)
})

async function render() {
  return mountSuspended(HeaderMobileNavigation, { route: '/', attachTo: document.body })
}

describe('mobile navigation', () => {
  it('starts closed and toggles with an accessible button', async () => {
    const wrapper = await render()
    const button = wrapper.get('button')
    expect(button.attributes('aria-label')).toBe('باز کردن منو')
    expect(button.attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('nav').exists()).toBe(false)
    await button.trigger('click')
    expect(button.attributes('aria-label')).toBe('بستن منو')
    expect(button.attributes('aria-expanded')).toBe('true')
    expect(button.attributes('aria-controls')).toBe(wrapper.get('nav').attributes('id'))
    await button.trigger('click')
    expect(button.attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('nav').exists()).toBe(false)
  })

  it.each(['لیست محصولات', 'دریافت مشاوره', 'سوالات متداول', 'تماس با ما'])(
    'closes after selecting %s, including links that already point to the current route',
    async (label) => {
      const wrapper = await render()
      await wrapper.get('button').trigger('click')
      const link = wrapper.findAll('nav a').find((link) => link.text() === label)
      expect(link).toBeDefined()
      await link!.trigger('click')
      expect(wrapper.get('button').attributes('aria-expanded')).toBe('false')
      expect(wrapper.find('nav').exists()).toBe(false)
    }
  )

  it('ignores inside pointer events and closes on an outside pointer event', async () => {
    const wrapper = await render()
    await wrapper.get('button').trigger('click')
    await wrapper.get('nav').trigger('pointerdown')
    expect(wrapper.get('button').attributes('aria-expanded')).toBe('true')
    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }))
    await nextTick()
    expect(wrapper.find('nav').exists()).toBe(false)
  })

  it('closes on Escape and returns keyboard focus to the toggle', async () => {
    const wrapper = await render()
    await wrapper.get('button').trigger('click')
    const link = wrapper.get('nav a').element as HTMLAnchorElement
    link.focus()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()
    expect(wrapper.find('nav').exists()).toBe(false)
    expect(document.activeElement).toBe(wrapper.get('button').element)
  })

  it('closes when switching to desktop and stays closed when returning to mobile', async () => {
    const wrapper = await render()
    await wrapper.get('button').trigger('click')
    media.dispatchEvent(Object.assign(new Event('change'), { matches: true }))
    await nextTick()
    expect(wrapper.find('nav').exists()).toBe(false)
    media.dispatchEvent(Object.assign(new Event('change'), { matches: false }))
    await nextTick()
    expect(wrapper.get('button').attributes('aria-expanded')).toBe('false')
  })

  it('closes when the route changes', async () => {
    const wrapper = await render()
    await wrapper.get('button').trigger('click')
    routeState.route.path = '/navigation-test'
    await nextTick()
    expect(wrapper.find('nav').exists()).toBe(false)
  })

  it('removes global event listeners when unmounted', async () => {
    const removeDocumentListener = vi.spyOn(document, 'removeEventListener')
    const removeMediaListener = vi.spyOn(media, 'removeEventListener')
    const wrapper = await render()
    wrapper.unmount()
    expect(removeDocumentListener).toHaveBeenCalledWith('keydown', expect.any(Function))
    expect(removeDocumentListener).toHaveBeenCalledWith('pointerdown', expect.any(Function))
    expect(removeMediaListener).toHaveBeenCalledWith('change', expect.any(Function))
  })
})
