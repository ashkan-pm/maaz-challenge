import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import Accordion from './Accordion.vue'

describe('Accordion', () => {
  it.each([false, true])(
    'initializes the desktop default from the viewport: %s',
    async (matches) => {
      vi.spyOn(window, 'matchMedia').mockReturnValue({ matches } as MediaQueryList)
      const wrapper = await mountSuspended(Accordion, {
        props: { title: 'Sort', defaultOpen: 'desktop' }
      })
      expect(wrapper.get('button').attributes('aria-expanded')).toBe(String(matches))
    }
  )

  it('toggles the panel from the full header button and keeps its accessible relationship', async () => {
    const wrapper = await mountSuspended(Accordion, {
      props: { title: 'Sort' },
      slots: { default: '<p>Options</p>' }
    })
    const trigger = wrapper.get('button')
    const panel = wrapper.get('[role="region"]')
    expect(trigger.attributes('aria-controls')).toBe(panel.attributes('id'))
    expect(panel.attributes('aria-labelledby')).toBe(trigger.attributes('id'))
    expect(panel.attributes('inert')).toBeDefined()
    await trigger.trigger('click')
    expect(trigger.attributes('aria-expanded')).toBe('true')
    expect(panel.attributes('inert')).toBeUndefined()
    expect(panel.text()).toBe('Options')
    await trigger.trigger('click')
    expect(trigger.attributes('aria-expanded')).toBe('false')
  })

  it('reflects an externally supplied open model', async () => {
    const wrapper = await mountSuspended(Accordion, { props: { title: 'Sort', open: true } })
    await wrapper.setProps({ open: false })
    expect(wrapper.get('button').attributes('aria-expanded')).toBe('false')
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([true])
  })
})
