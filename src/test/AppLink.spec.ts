import { createRouterMock, injectRouterMock, getRouter } from 'vue-router-mock'
import { it, expect, vi, beforeEach, describe } from 'vitest'
import { mount } from '@vue/test-utils'
import AppLink from 'src/components/AppLink.vue'
import { nextTick } from 'vue'

describe('AppLink', () => {
  // create one mock instance, pass options
  const router = createRouterMock({
    spy: {
      create: fn => vi.fn(fn),
      reset: spy => spy.mockReset()
    }
  })
  beforeEach(() => {
    // inject it globally to ensure `useRoute()`, `$route`, etc work
    // properly and give you access to test specific functions
    injectRouterMock(router)
  })

  it('should redirects to the correct page', async () => {
    const wrapper = mount(AppLink, {
      props: {
        name: 'about'
      }
    })
    /** TODO */
    await wrapper.trigger('click')
    await nextTick()
    const router = getRouter()
    router.push('/about')
    expect(router.push).toHaveBeenCalledTimes(1)
    expect(router.push).toBeCalledWith('/about')
  })
})
