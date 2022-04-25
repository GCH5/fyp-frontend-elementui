import { beforeEach, describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import { router } from 'src/router'
import AppNavigation from 'src/components/AppNavigation.vue'
class ResizeObserver {
  observe (): void {
    // do nothing
  }

  unobserve (): void {
    // do nothing
  }

  disconnect (): void {
    // do nothing
  }
}
describe('AppNavigation', () => {
  global.ResizeObserver = ResizeObserver
  beforeEach(async () => {
    await router.push('/')
  })

  test('Default menu item should be rendered correctly', async () => {
    const wrapper = mount(AppNavigation)
    const menuItem = wrapper.get('.is-active')
    expect(menuItem.text()).toBe('Home')
  })
})
