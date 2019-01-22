import { createLocalVue, mount } from '@vue/test-utils'
import loadScript from '../../src/components/load-script'

const Vue = createLocalVue()
const scriptUrl = 'https://code.jquery.com/jquery-3.3.1.slim.min.js'
const mountComponent = (opts) => {
  return mount(
    loadScript(),
    opts
  )
}
const triggerScriptLoadEvent = () => {
  window.document.querySelector('head script').dispatchEvent(
    new CustomEvent('load')
  )
}

describe('LoadScript', () => {
  afterEach(() => {
    window.document.querySelectorAll('head script').forEach(el => {
      el.remove()
    })
  })

  it('loads a script', (done) => {
    expect(window.document.querySelectorAll('head script').length).toEqual(0)

    const wrapper = mountComponent({
      propsData: { src: scriptUrl }
    })

    wrapper.vm.$nextTick(() => {
      expect(window.document.querySelectorAll('head script').length).toEqual(1)
      done()
    })
  })

  it('updates "isLoaded" after script loads', (done) => {
    const wrapper = mountComponent({
      propsData: { src: scriptUrl }
    })

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.isLoaded).toBeFalsy()
      triggerScriptLoadEvent()
      expect(wrapper.vm.isLoaded).toBeTruthy()
      done()
    })
  })

  it('emits "loaded" event after script loads', (done) => {
    const wrapper = mountComponent({
      propsData: { src: scriptUrl }
    })

    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted().loaded).toBeUndefined()
      expect(wrapper.emitted().previouslyloaded).toBeUndefined()
      triggerScriptLoadEvent()

      wrapper.vm.$nextTick(() => {
        expect(wrapper.emitted().loaded).toBeTruthy()
        expect(wrapper.emitted().loaded.length).toEqual(1)
        expect(wrapper.emitted().previouslyloaded).toBeUndefined()
        done()
      })
    })
  })

  it('will not load the script more than once', (done) => {
    const wrapper = mountComponent({
      propsData: { src: scriptUrl }
    })

    wrapper.vm.$nextTick(() => {
      expect(window.document.querySelectorAll('head script').length).toEqual(1)
      triggerScriptLoadEvent()

      const wrapper2 = mountComponent({
        propsData: { src: scriptUrl }
      })

      wrapper2.vm.$nextTick(() => {
        expect(window.document.querySelectorAll('head script').length).toEqual(1)
        done()
      })
    })
  })

  it('emits "previouslyloaded" event if component is mounted a second time', (done) => {
    const wrapper = mountComponent({
      propsData: { src: scriptUrl }
    })

    wrapper.vm.$nextTick(() => {
      triggerScriptLoadEvent()

      const wrapper2 = mountComponent({
        propsData: { src: scriptUrl }
      })

      expect(wrapper2.emitted().previouslyloaded).toBeTruthy()
      expect(wrapper2.emitted().previouslyloaded.length).toEqual(1)

      wrapper2.vm.$nextTick(() => {
        expect(wrapper2.emitted().loaded).toBeUndefined()
        done()
      })
    })
  })

  it('renders a slot once loaded', (done) => {
    const wrapper = mountComponent({
      propsData: { src: scriptUrl },
      slots: { default: 'Slot text' }
    })

    expect(wrapper.html()).toBeUndefined()

    wrapper.vm.$nextTick(() => {
      triggerScriptLoadEvent()

      expect(wrapper.html()).toMatch('Slot text')
      done()
    })
  })

  it('renders a scoped slot whether loaded or not', (done) => {
    expect(window.document.querySelectorAll('head script').length).toEqual(0)

    const wrapper = mountComponent({
      propsData: { src: scriptUrl },
      scopedSlots: { default: `
        <div slot-scope="{ isLoading }">
          <div v-if="isLoaded">Loaded Text</div>
          <div v-else="isLoaded">Loading Text</div>
        </div>
      `
    }})

    expect(wrapper.html()).toContain('Loading Text')
    expect(wrapper.html()).not.toContain('Loaded Text')

    wrapper.vm.$nextTick(() => {
      triggerScriptLoadEvent()

      expect(wrapper.html()).not.toContain('Loading Text')
      expect(wrapper.html()).toContain('Loaded Text')
      done()
    })
  })

  it('allows the specification of the root element type', (done) => {
    const wrapper = mountComponent({
      propsData: { src: scriptUrl, el: 'h1' },
      slots: { default: 'Slot title' }
    })

    expect(wrapper.html()).toBeUndefined()

    wrapper.vm.$nextTick(() => {
      triggerScriptLoadEvent()

      expect(wrapper.html()).toMatch('<h1>Slot title</h1>')
      done()
    })
  })
})
