import babel from 'rollup-plugin-babel'
import { eslint } from 'rollup-plugin-eslint'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/circuitry.umd.js',
      format: 'umd',
      name: 'circuitry',
      exports: 'named',
      globals: {
        'vue-styled-components': 'styled'
      }
    },
    {
      file: 'dist/circuitry.esm.js',
      format: 'esm',
      exports: 'named',
      globals: {
        'vue-styled-components': 'styled'
      }
    }
  ],
  external: [
    'vue-styled-components'
  ],
  plugins: [
    eslint(),
    babel()
  ]
}
