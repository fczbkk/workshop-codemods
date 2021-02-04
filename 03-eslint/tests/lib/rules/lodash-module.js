'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/lodash-module')

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

const EXPECTED_ERROR = {
  message: 'Instead of importing whole Lodash, import just the modules you need.',
  type: 'ImportDeclaration'
}

const ruleTester = new RuleTester()
ruleTester.run('lodash-module', rule, {
  valid: [
    {
      code: "import _get from 'notLodash'"
    },
    {
      code: "import _get from 'lodash/get'"
    }
  ],

  invalid: [
    {
      // simple import
      code: "import {get} from 'lodash'",
      output: "import get from 'lodash/get';",
      errors: [EXPECTED_ERROR]
    },
    {
      // import of multiple modules at once
      code: "import {get, chunk} from 'lodash'",
      output: "import get from 'lodash/get';\nimport chunk from 'lodash/chunk';",
      errors: [EXPECTED_ERROR]
    },
    {
      // renamed import
      code: "import {get as getNestedProperty} from 'lodash'",
      output: "import getNestedProperty from 'lodash/get';",
      errors: [EXPECTED_ERROR]
    },
    {
      // combination of multiple and renamed import
      code: "import {get as getNestedProperty, chunk} from 'lodash'",
      output: "import getNestedProperty from 'lodash/get';\nimport chunk from 'lodash/chunk';",
      errors: [EXPECTED_ERROR]
    }
  ]
})
