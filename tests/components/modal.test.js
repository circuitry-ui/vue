import { mount } from '@vue/test-utils'
import modal from '../../src/components/modal'

describe('Modal', () => {
  const wrapper = mount(modal(), {
    propsData: {
      opened: false
    }
  })

  it('initially renders hidden', () => {
    expect(wrapper.vm.$el.style.display).toBe('none')
  })
})
