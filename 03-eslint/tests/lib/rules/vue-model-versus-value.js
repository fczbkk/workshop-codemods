'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/vue-model-versus-value')

const RuleTester = require('eslint').RuleTester

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
})

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

ruleTester.run('vue-model-versus-value', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: '<template></template>'
    },
    {
      filename: 'test.vue',
      code: "<template><MyComponent /></template>"
    },
    {
      filename: 'test.vue',
      code: "<template><MyComponent v-model='aaa' /></template>"
    },
    {
      filename: 'test.vue',
      code: "<template><MyComponent value='aaa' /></template>"
    }
  ],

  invalid: [
    {
      filename: 'test.vue',
      code: "<template><MyComponent v-model='aaa' value='bbb' /></template>",
      output: "<template><MyComponent v-model='aaa' value='bbb' /></template>",
      errors: [
        {
          message: 'Component cannot have both `v-model` and `value` attributes. This causes error in IE.',
          type: 'VStartTag',
          line: 1
        }
      ]
    }
  ]
})
