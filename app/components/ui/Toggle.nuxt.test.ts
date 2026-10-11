import { mountSuspended } from '@nuxt/test-utils/runtime'
import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import Toggle from './Toggle.vue'

enableAutoUnmount(afterEach)

describe('Toggle', () => {
  it('starts off and exposes its label and state while toggling in both directions', async () => {
    const wrapper = await mountSuspended(Toggle, { props: { label: 'Available only' } })
    expect(wrapper.attributes()).toMatchObject({
      role: 'switch',
      'aria-label': 'Available only',
      'aria-checked': 'false',
      type: 'button'
    })
    expect(wrapper.get('use').attributes('href')).toBe('/images/ui/dots.svg#icon')
    await wrapper.trigger('click')
    expect(wrapper.attributes('aria-checked')).toBe('true')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([true])
    await wrapper.trigger('click')
    expect(wrapper.attributes('aria-checked')).toBe('false')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false])
  })

  it('reflects an external model and prevents changes when disabled', async () => {
    const wrapper = await mountSuspended(Toggle, {
      props: { label: 'Available only', modelValue: true }
    })
    expect(wrapper.attributes('aria-checked')).toBe('true')
    await wrapper.setProps({ modelValue: false, disabled: true })
    await wrapper.trigger('click')
    expect(wrapper.attributes('aria-checked')).toBe('false')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
