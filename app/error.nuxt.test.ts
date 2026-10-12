import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import { createError } from '#imports'
import ErrorPage from './error.vue'

const { clearErrorMock } = vi.hoisted(() => ({ clearErrorMock: vi.fn() }))
mockNuxtImport('clearError', () => clearErrorMock)
const layoutStub = { template: '<div><slot /></div>' }

describe('error page', () => {
  it('explains a missing product, sets its title and clears the error before returning to the list', async () => {
    const wrapper = await mountSuspended(ErrorPage, {
      props: { error: createError({ statusCode: 404, statusMessage: 'Product not found' }) },
      global: { stubs: { NuxtLayout: layoutStub } }
    })
    expect(wrapper.get('h1').text()).toBe('محصول پیدا نشد')
    expect(wrapper.text()).toContain('محصول مورد نظر موجود نیست یا حذف شده است')
    await expect.poll(() => document.title).toBe('محصول پیدا نشد')
    await wrapper.get('button').trigger('click')
    expect(clearErrorMock).toHaveBeenCalledWith({ redirect: '/' })
  })

  it('uses page-not-found wording for other missing routes', async () => {
    const wrapper = await mountSuspended(ErrorPage, {
      props: { error: createError({ statusCode: 404, statusMessage: 'Page not found' }) },
      global: { stubs: { NuxtLayout: layoutStub } }
    })
    expect(wrapper.get('h1').text()).toBe('صفحه پیدا نشد')
    expect(wrapper.text()).not.toContain('محصول مورد نظر')
  })
})
