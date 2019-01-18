import styled from 'vue-styled-components'

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`

const Underlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const Modal = styled.aside`
  position: relative;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`

const getDefaultOptions = () => ({
  props: {},
  wrapper: { classes: null },
  underlay: { classes: null },
  modal: { classes: null },
  header: { classes: null },
  title: {
    tag: 'h2',
    classes: null
  },
  closeButton: { classes: null },
  body: { classes: null },
  footer: { classes: null }
})

export default function (optionsCallback) {
  const options = getDefaultOptions()

  if (typeof optionsCallback === 'function') {
    optionsCallback(options)
  }

  return {
    model: {
      prop: 'opened',
      event: 'change'
    },
    props: {
      opened: {
        type: Boolean,
        required: true
      },
      label: {
        type: String,
        default: ''
      },
      hideCloseButton: {
        type: Boolean,
        default: false
      },
      ...options.props
    },
    methods: {
      open () {
        this.$emit('change', true)
      },
      close () {
        this.$emit('change', false)
      },
      toggle () {
        this.$emit('change', !this.opened)
      },
      getClasses (segment) {
        const classOption = options[segment].classes

        if (classOption === null) {
          return ''
        }

        if (typeof classOption === 'function') {
          return classOption.call(this)
        }

        return classOption
      },
      getHeaderEl () {
        if (!this.label && !this.$slots.header) {
          return ''
        }

        let titleEl = this.$slots.header ? this.$slots.header : this.$createElement(
          options.title.tag,
          { class: this.getClasses('title') },
          this.label
        )

        const closeButtonEl = !this.hideCloseButton ? (
          <button
            class={ this.getClasses('closeButton') }
            onClick={ this.close }
          >&times;</button>
        ) : ''

        return (
          <Header modal-header class={ this.getClasses('header') }>
            { titleEl }
            { closeButtonEl }
          </Header>
        )
      },
      getFooterEl () {
        return this.$slots.footer ? (
          <footer modal-footer class={ this.getClasses('footer') }>
            { this.$slots.footer }
          </footer>
        ) : ''
      }
    },
    render () {
      return (
        <Wrapper
          modal-wrapper
          v-show={ this.opened }
          class={ this.getClasses('wrapper') }
        >
          <Underlay
            modal-underlay
            class={ this.getClasses('underlay') }
            onClick={ this.close }
          />
          <Modal modal class={ this.getClasses('modal') }>
            { this.getHeaderEl() }
            <div modal-body class={ this.getClasses('body') }>
              { this.$slots.default }
            </div>
            { this.getFooterEl() }
          </Modal>
        </Wrapper>
      )
    }
  }
}
