import { mountSuspended } from '@nuxt/test-utils/runtime'
import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import Modal from './Modal.vue'

enableAutoUnmount(afterEach)

describe('Modal', () => {
  it('opens with an accessible label, locks scrolling and restores focus after dismissal', async () => {
    const trigger = document.createElement('button')
    document.body.append(trigger)
    trigger.focus()
    const wrapper = await mountSuspended(Modal, {
      attachTo: document.body,
      props: { label: 'Preview' },
      slots: { default: '<button>Content</button>' }
    })
    await wrapper.setProps({ modelValue: true })
    expect(wrapper.element.open).toBe(true)
    expect(wrapper.attributes('aria-label')).toBe('Preview')
    expect(document.body.style.overflow).toBe('hidden')
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false])
    await wrapper.setProps({ modelValue: false })
    expect(wrapper.element.open).toBe(false)
    expect(document.body.style.overflow).toBe('')
    expect(document.activeElement).toBe(trigger)
    trigger.remove()
  })

  it('dismisses on Escape and restores existing scroll styles when unmounted while open', async () => {
    document.body.style.overflow = 'auto'
    const wrapper = await mountSuspended(Modal, {
      attachTo: document.body,
      props: { label: 'Preview', modelValue: true }
    })
    expect(wrapper.element.open).toBe(true)
    await wrapper.trigger('cancel')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false])
    wrapper.unmount()
    expect(document.body.style.overflow).toBe('auto')
    document.body.style.overflow = ''
  })
})
