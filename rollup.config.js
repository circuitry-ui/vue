import babel from 'rollup-plugin-babel'
import { eslint } from 'rollup-plugin-eslint'

export default {
  input: 'src/index.js',
  output: {
    name: 'circuitry',
    exports: 'named',
    globals: {
      'vue-styled-components': 'styled'
    }
  },
  external: [
    'vue-styled-components'
  ],
  plugins: [
    eslint(),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'],
      plugins: ['transform-vue-jsx']
    })
  ]
}
