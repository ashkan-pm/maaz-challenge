import { mountSuspended } from '@nuxt/test-utils/runtime'
import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import Input from './Input.vue'

enableAutoUnmount(afterEach)

describe('Input', () => {
  it('renders a labelled native input without icon or divider when no icon is provided', async () => {
    const wrapper = await mountSuspended(Input, {
      props: { label: 'جستجو' },
      attrs: { placeholder: 'جستجو...', name: 'query' }
    })
    expect(wrapper.find('.input-icon').exists()).toBe(false)
    expect(wrapper.find('svg').exists()).toBe(false)
    expect(wrapper.get('input').attributes()).toMatchObject({
      'aria-label': 'جستجو',
      placeholder: 'جستجو...',
      name: 'query'
    })
  })

  it('generates a name when none is provided', async () => {
    const wrapper = await mountSuspended(Input, { props: { label: 'جستجو' } })
    expect(wrapper.get('input').attributes('name')).toBeTruthy()
  })

  it('focuses the native input when the icon, divider area or field padding is clicked', async () => {
    const wrapper = await mountSuspended(Input, {
      props: { label: 'جستجو', icon: 'search' },
      attachTo: document.body
    })
    for (const selector of ['svg', '.input-icon', '.input-field']) {
      ;(wrapper.get('input').element as HTMLInputElement).blur()
      await wrapper.get(selector).trigger('click')
      expect(document.activeElement).toBe(wrapper.get('input').element)
    }
  })

  it('updates the model while typing and clears it while retaining input focus', async () => {
    const wrapper = await mountSuspended(Input, {
      props: { label: 'جستجو', clearable: true },
      attachTo: document.body
    })
    await wrapper.get('input').setValue('backpack')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['backpack'])
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([''])
    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('')
    expect(document.activeElement).toBe(wrapper.get('input').element)
  })
})
