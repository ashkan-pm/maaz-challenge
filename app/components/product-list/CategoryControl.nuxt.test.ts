import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import CategoryControl from './CategoryControl.vue'
import Badge from '~/components/ui/Badge.vue'

const options = [
  { value: "men's clothing", label: "Men's Clothing", count: 2 },
  { value: 'electronics', label: 'Electronics', count: 0 }
]

describe('CategoryControl', () => {
  it('renders supplied counts and updates selections without mutating the options', async () => {
    const wrapper = await mountSuspended(CategoryControl, {
      props: { options, modelValue: ["men's clothing"] }
    })
    const inputs = wrapper.findAll('input[type="checkbox"]')
    const badges = wrapper.findAllComponents(Badge)
    expect(badges.map((badge) => badge.text())).toEqual(['۲', '۰'])
    expect(badges[0]!.props('active')).toBe(true)
    expect(badges[1]!.props('active')).toBe(false)
    await inputs[1]!.setValue(true)
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([
      ["men's clothing", 'electronics']
    ])
    await wrapper.setProps({ modelValue: ["men's clothing", 'electronics'] })
    expect(badges[1]!.props('active')).toBe(true)
    await inputs[0]!.setValue(false)
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([['electronics']])
    expect(options[0]!.count).toBe(2)
  })
})
