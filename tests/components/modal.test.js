import { createLocalVue, mount } from '@vue/test-utils'
import modal from '../../src/components/modal'

const Vue = createLocalVue()

describe('Modal', () => {
  it('initially renders hidden', () => {
    const wrapper = mount(modal(), {propsData: {opened: false}})
    expect(wrapper.isVisible()).toBe(false)
  })

  it('can open via prop', () => {
    const wrapper = mount(modal(), {propsData: {opened: false}})
    wrapper.setProps({ opened: true })
    expect(wrapper.isVisible()).toBe(true)
  })

  it('can close via prop', () => {
    const wrapper = mount(modal(), {propsData: {opened: true}})
    wrapper.setProps({ opened: false })
    expect(wrapper.isVisible()).toBe(false)
  })

  it('can open via method', () => {
    const wrapper = mount(modal(), {propsData: {opened: false}})
    wrapper.vm.open()
    return Vue.nextTick().then(() => {
      expect(wrapper.emitted().change[0]).toEqual([true])
    })
  })

  it('can close via method', () => {
    const wrapper = mount(modal(), {propsData: {opened: true}})
    wrapper.vm.close()
    return Vue.nextTick().then(() => {
      expect(wrapper.emitted().change[0]).toEqual([false])
    })
  })

  it('can toggle on via method', () => {
    const wrapper = mount(modal(), {propsData: {opened: false}})
    wrapper.vm.toggle()
    return Vue.nextTick().then(() => {
      expect(wrapper.emitted().change[0]).toEqual([true])
    })
  })

  it('can toggle off via method', () => {
    const wrapper = mount(modal(), {propsData: {opened: true}})
    wrapper.vm.toggle()
    return Vue.nextTick().then(() => {
      expect(wrapper.emitted().change[0]).toEqual([false])
    })
  })

  it('will close when the underlay is clicked', () => {
    const wrapper = mount(modal(), { propsData: { opened: true } })

    wrapper.find('[modal-underlay]').trigger('click')
    return Vue.nextTick().then(() => {
      expect(wrapper.emitted().change[0]).toEqual([false])
    })
  })

  it('displays with no header when no label is given', () => {
    const wrapper = mount(modal(), { propsData: { opened: true } })
    expect(wrapper.contains('header[modal-header]')).toBe(false)
  })

  it('displays a header when a label is given', () => {
    const wrapper = mount(modal(), { propsData: { opened: false, label: 'A modal!' } })
    expect(wrapper.contains('header[modal-header]')).toBe(true)
    expect(wrapper.contains('header[modal-header] h2')).toBe(true)
    expect(wrapper.contains('header[modal-header] button')).toBe(true)
  })

  it('displays a header when the header slot is used', () => {
    const wrapper = mount(modal(), { propsData: { opened: false }, slots: { header: '<h3>My Modal</h3>' } })
    expect(wrapper.contains('header[modal-header]')).toBe(true)
    expect(wrapper.contains('header[modal-header] h2')).toBe(false)
    expect(wrapper.contains('header[modal-header] h3')).toBe(true)
    expect(wrapper.contains('header[modal-header] button')).toBe(true)
  })

  it('can hide the header close button', () => {
    const wrapper = mount(modal(), { propsData: { opened: false, label: 'A Modal!', hideCloseButton: true } })
    expect(wrapper.contains('header[modal-header]')).toBe(true)
    expect(wrapper.contains('header[modal-header] h2')).toBe(true)
    expect(wrapper.contains('header[modal-header] button')).toBe(false)
  })

  it('will close when the header close button is clicked', () => {
    const wrapper = mount(modal(), { propsData: { opened: true, label: 'A Modal!' } })
    wrapper.find('header[modal-header] button').trigger('click')
    return Vue.nextTick().then(() => {
      expect(wrapper.emitted().change[0]).toEqual([false])
    })
  })

  it('displays with no footer when no footer slot is used', () => {
    const wrapper = mount(modal(), { propsData: { opened: true } })
    expect(wrapper.contains('header[modal-footer]')).toBe(false)
  })

  it('displays with a footer when the footer slot is used', () => {
    const wrapper = mount(modal(), { propsData: { opened: true }, slots: { footer: '<p>Here is some footer content</p>' } })
    expect(wrapper.contains('footer[modal-footer]')).toBe(true)
  })

  it('can customize wrapper classes with a string', () => {
    const wrapper = mount(modal(options => {
      options.wrapper.classes = 'modal wrapper'
    }), { propsData: { opened: true } })
    expect(wrapper.contains('[modal-wrapper].modal.wrapper')).toBe(true)
  })

  it('can customize underlay classes with an array', () => {
    const wrapper = mount(modal(options => {
      options.underlay.classes = ['modal', 'underlay']
    }), { propsData: { opened: true } })
    expect(wrapper.contains('[modal-underlay].modal.underlay')).toBe(true)
  })

  it('can customize modal classes with an object', () => {
    const wrapper = mount(modal(options => {
      options.modal.classes = { modal: true, contents: false }
    }), { propsData: { opened: true } })
    expect(wrapper.contains('[modal].modal')).toBe(true)
    expect(wrapper.contains('[modal].contents')).toBe(false)
  })

  it('can customize header classes with a function', () => {
    const wrapper = mount(modal(options => {
      options.header.classes = () => {
        return 'modal header'
      }
    }), { propsData: { opened: true, label: 'A Modal!' } })
    expect(wrapper.contains('[modal-header].modal.header')).toBe(true)
  })

  it('can customize title tag', () => {
    const wrapper = mount(modal(options => {
      options.title.tag = 'span'
    }), { propsData: { opened: true, label: 'A Modal!' } })
    expect(wrapper.contains('header[modal-header] span')).toBe(true)
    expect(wrapper.contains('header[modal-header] h2')).toBe(false)
  })

  it('can customize title classes', () => {
    const wrapper = mount(modal(options => {
      options.title.classes = () => {
        return 'modal title'
      }
    }), { propsData: { opened: true, label: 'A Modal!' } })
    expect(wrapper.contains('[modal-header] h2.modal.title')).toBe(true)
  })

  it('can customize close button classes', () => {
    const wrapper = mount(modal(options => {
      options.closeButton.classes = 'modal close-button'
    }), { propsData: { opened: true, label: 'A Modal!' } })
    expect(wrapper.contains('[modal-header] button.modal.close-button')).toBe(true)
  })

  it('can customize body classes', () => {
    const wrapper = mount(modal(options => {
      options.body.classes = 'modal body'
    }), { propsData: { opened: true } })
    expect(wrapper.contains('[modal-body].modal.body')).toBe(true)
  })

  it('can customize footer classes', () => {
    const wrapper = mount(modal(options => {
      options.footer.classes = 'modal footer'
    }), { propsData: { opened: true }, slots: { footer: '<p>Footer content</p>' } })
    expect(wrapper.contains('[modal-footer].modal.footer')).toBe(true)
  })

  it('can add custom prop and react to it', () => {
    const wrapper = mount(modal(options => {
      options.props.color = {
        type: String,
        default: 'grey'
      }
      options.underlay.classes = function () {
        return `bg-color-${ this.color }`
      }
      options.modal.classes = function () {
        return `border-color-${ this.color }`
      }
    }), { propsData: { opened: true } })
    expect(wrapper.contains('[modal-underlay].bg-color-grey')).toBe(true)
    expect(wrapper.contains('[modal].border-color-grey')).toBe(true)

    wrapper.setProps({ color: 'blue' })
    expect(wrapper.contains('[modal-underlay].bg-color-grey')).toBe(false)
    expect(wrapper.contains('[modal].border-color-grey')).toBe(false)
    expect(wrapper.contains('[modal-underlay].bg-color-blue')).toBe(true)
    expect(wrapper.contains('[modal].border-color-blue')).toBe(true)
  })
})
