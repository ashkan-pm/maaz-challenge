import { mountSuspended } from '@nuxt/test-utils/runtime'
import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import Checkbox from './Checkbox.vue'

enableAutoUnmount(afterEach)

describe('Checkbox', () => {
  it('uses a labelled native checkbox and emits both checked states', async () => {
    const wrapper = await mountSuspended(Checkbox, {
      props: { label: 'Electronics' },
      slots: { default: '<span>۶</span>' }
    })
    expect(wrapper.element.tagName).toBe('LABEL')
    expect(wrapper.get('input').attributes()).toMatchObject({
      type: 'checkbox',
      'aria-label': 'Electronics'
    })
    expect(wrapper.get('use').attributes('href')).toBe('/images/ui/check.svg#icon')
    await wrapper.get('input').setValue(true)
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([true])
    await wrapper.get('input').setValue(false)
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false])
  })

  it('supports an externally controlled value and a disabled input', async () => {
    const wrapper = await mountSuspended(Checkbox, {
      props: { label: 'Electronics', modelValue: true }
    })
    expect((wrapper.get('input').element as HTMLInputElement).checked).toBe(true)
    await wrapper.setProps({ modelValue: false, disabled: true })
    expect((wrapper.get('input').element as HTMLInputElement).checked).toBe(false)
    expect(wrapper.get('input').attributes('disabled')).toBeDefined()
  })
})
