'use strict'

const {defineTemplateBodyVisitor} = require('./../utilities')

const attributeNameGetter = {
  'VDirectiveKey': (node) => node.name.name,
  'VIdentifier': (node) => node.name
}

function getAttributeName (node) {
  const getter = attributeNameGetter[node.key.type] || (() => '')
  return getter(node.key)
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent components from having both `v-model` and `value` attributes.',
      category: 'Best Practices',
      recommended: false
    }
  },

  create: function (context) {

    return defineTemplateBodyVisitor(context, {
      'VStartTag' (node) {
        const attributeNames = node.attributes.map(getAttributeName)
        if (attributeNames.includes('value') && attributeNames.includes('model')) {
          context.report({
            node,
            message: 'Component cannot have both `v-model` and `value` attributes. This causes error in IE.'
          })
        }
      }
    })

  }
}
