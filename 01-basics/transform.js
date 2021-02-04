// const { describe } = require('jscodeshift-helper')

/**
 * Translates all "Hello world" sent into `console.log()`.
 *
 * @example
 * // input
 * console.log('Hello world')
 * //output
 * console.log('Nazdar svet')
 */
export default function transformer (file, api) {
  const j = api.jscodeshift

  const consoleLogCallee = {
    callee: {
      object: { name: 'console' },
      property: { name: 'log' }
    }
  }

  const getConsoleLogCalls = () => j(file.source)
    .find(j.CallExpression, consoleLogCallee)

  const updateConsoleLog = (path) => {
    path.node.arguments.forEach(updateArgument)
  }

  const updateArgument = (argument) => {
    if (argument.value === 'Hello world') {
      argument.value = 'Nazdar svet'
    }
  }

  return getConsoleLogCalls()
    .forEach(updateConsoleLog)
    .toSource()
}
