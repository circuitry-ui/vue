# Circuitry

Circuitry is a UI kit generation tool. Circuitry gives you the ability to quickly and easily create UI components for your web app with out relying on any specific CSS framework. You can style the components however you would like without being married to a particular framework or design style. Use whatever CSS framwork you like: Bootstrap, Foundation, Bulma, Tailwind, Material Design, etc, etc, etc.

Often times, you will find a great UI Kit but you don't like the styling or the styling won't go with your app well, so you have to settle for a UI kit you don't like, or maybe have to make your own, or you have to settle for a design style you don't like. Not any more. Drop this into your Vue app, give it whatever styling you want, and don't settle!

## Installation

`npm i @circuitry/vue`

Requires `vue` and `vue-styled-components`

## Usage

This package does not automatically register any components. The main purpose behind Circuitry is so that you can build and configure a UI components kit specifically for your app. To use circuitry, you will need to import and register any components that you want to use:

```js
import * as circuitry from '@circuitry/vue'
//or
import { modal } from '@circuitry/vue'

// global registration
Vue.component('Modal', circuitry.modal({
  // options...
}))

// local component registration
{
  components: {
    Modal: circuitry.modal({
      // options...
    })
  }
}

```

## Development

Clone app to your local machine

`npm install`

### Running tests

The following command will launch the Jest test suite. It will listen for any changes to files an rerun the test suite:

`npm run watch`

If you just want to run the test suite once, you can run this command:

`npm run test`

You may run into issues with `eslint` if you `npm link` this into another project. Include this this line in your `.eslintignore` file:

`*/**/dist`
