# v2 eslint 配置

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base', 'plugin:prettier/recommended', 'prettier'],
  plugins: ['prettier', 'vue'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    // 如果用到了babel 这里这里配置
    // parser: 'babel-eslint',
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      module: true,
    },
  },
  rules: {
    'no-useless-concat': 0,
    'no-console': 0,
    'import/no-unresolved': [2, { caseSensitive: false }],
  },
}
```
