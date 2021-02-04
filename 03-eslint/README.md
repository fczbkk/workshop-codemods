# eslint-plugin-mall-lodash-module

Enforce importing specific modules from Lodash, instead of importing whole Lodash.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-mall-lodash-module`:

```
$ npm install eslint-plugin-mall --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-mall` globally.

## Usage

Add `mall` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "mall"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "mall/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





