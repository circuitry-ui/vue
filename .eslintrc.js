module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'space-before-blocks': ['error', 'always'],
    'vue/max-attributes-per-line': ['error', { 'singleline': 5 }],
    'vue/singleline-html-element-content-newline': 'off',
    'import/no-unresolved': 'ignore',
    'comma-dangle': ['error', 'never'],
    'vue/html-closing-bracket-spacing': ['error', {
      'selfClosingTag': 'always'
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
