import { beforeEach, describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import { router } from 'src/router'
import AppFooter from 'src/components/AppFooter.vue'
describe('AppFooter', () => {
  beforeEach(async () => {
    await router.push('/')
  })

  test('footer should be rendered correctly', async () => {
    const wrapper = mount(AppFooter)

    const appLink = wrapper.get('[data-test="app-link"]')
    expect(appLink.classes()).toContain('logo-font')
  })
})
