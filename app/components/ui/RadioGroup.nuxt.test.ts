import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import RadioGroup from './RadioGroup.vue'

const options = [
  { label: 'Ascending', value: 'asc' },
  { label: 'Descending', value: 'desc' },
  { label: 'Unavailable', value: 'disabled', disabled: true }
]

describe('RadioGroup', () => {
  it('labels the group, shares a radio name, and updates a single selected model', async () => {
    const wrapper = await mountSuspended(RadioGroup, {
      props: { label: 'Sorting', modelValue: 'asc', options }
    })
    expect(wrapper.get('legend').text()).toBe('Sorting')
    const inputs = wrapper.findAll('input')
    expect(new Set(inputs.map((input) => input.attributes('name'))).size).toBe(1)
    expect((inputs[0]!.element as HTMLInputElement).checked).toBe(true)
    await inputs[1]!.setValue(true)
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['desc'])
    await wrapper.setProps({ modelValue: 'desc' })
    expect((inputs[0]!.element as HTMLInputElement).checked).toBe(false)
    expect((inputs[1]!.element as HTMLInputElement).checked).toBe(true)
    expect(inputs[2]!.attributes('disabled')).toBeDefined()
  })

  it('generates independent names for separate groups', async () => {
    const Pair = defineComponent({
      setup: () => () =>
        h('div', [
          h(RadioGroup, { label: 'First', options }),
          h(RadioGroup, { label: 'Second', options })
        ])
    })
    const wrapper = await mountSuspended(Pair)
    const groups = wrapper.findAll('fieldset')
    expect(groups[0]!.get('input').attributes('name')).not.toBe(
      groups[1]!.get('input').attributes('name')
    )
  })
})
