export default () => ({
  props: {
    src: {
      type: String,
      required: true
    },
    el: {
      type: [String, Object],
      default: 'div'
    }
  },
  data: () => ({
    isLoaded: false
  }),
  methods: {
    handleLoaded () {
      this.isLoaded = true

      this.$nextTick(() => {
        this.$emit('loaded')
      })
    }
  },
  mounted () {
    const el = document.querySelector(`head script[src="${this.src}"]`)

    if (el) {
      this.isLoaded = true
      this.$emit('previouslyloaded')
      return
    }

    const script = document.createElement('script')
    script.addEventListener('load', this.handleLoaded)
    script.setAttribute('src', this.src)
    script.setAttribute('async', true)
    document.head.appendChild(script)
  },
  render (h) {
    if (this.$scopedSlots.default) {
      return this.$scopedSlots.default({
        isLoaded: this.isLoaded
      })
    }

    if (!this.isLoaded) {
      return ''
    }

    return h(this.el, {}, this.$slots.default)
  }
})
