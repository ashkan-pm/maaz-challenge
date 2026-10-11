import { mountSuspended } from '@nuxt/test-utils/runtime'
import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import CategoryControl from './CategoryControl.vue'
import Badge from '~/components/ui/Badge.vue'

enableAutoUnmount(afterEach)

describe('CategoryControl', () => {
  it('keeps independent local selections and synchronizes each badge with its checkbox', async () => {
    const wrapper = await mountSuspended(CategoryControl)
    const inputs = wrapper.findAll('input[type="checkbox"]')
    const badges = wrapper.findAllComponents(Badge)
    expect(inputs).toHaveLength(4)
    expect(badges.map((badge) => badge.text())).toEqual(['۴', '۴', '۶', '۴'])
    expect(badges[0]!.props('active')).toBe(true)
    expect(badges[1]!.props('active')).toBe(false)
    await inputs[1]!.setValue(true)
    expect(badges[1]!.props('active')).toBe(true)
    expect(badges[0]!.props('active')).toBe(true)
    await inputs[1]!.setValue(false)
    expect(badges[1]!.props('active')).toBe(false)
  })
})
