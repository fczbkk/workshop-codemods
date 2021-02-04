'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce importing specific modules from Lodash, instead of importing whole Lodash.',
      category: 'Best Practices',
      recommended: false
    },
    fixable: 'code'
  },

  create: function (context) {

    const LIB_NAME = 'lodash'

    function convertImportSpecifier (specifier) {
      const importedSpecifier = specifier.imported.name
      const localSpecifier = specifier.local.name
      return `import ${localSpecifier} from 'lodash/${importedSpecifier}';`
    }

    return {

      ImportDeclaration (node) {
        if (node.source.value === LIB_NAME) {
          context.report({
            node,
            message: 'Instead of importing whole Lodash, import just the modules you need.',
            fix (fixer) {
              return fixer.replaceText(
                node,
                node.specifiers.map(convertImportSpecifier).join('\n')
              )
            }
          })
        }
      }
    }
  }
}
