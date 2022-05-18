# v3 配置 eslint

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  parser: 'vue-eslint-parser', //解析.vue文件
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prefer-rest-params': 0, // 关闭使用 rest 参数
    '@typescript-eslint/consistent-type-imports': 'error', // 当只引用类型时，自动加上 type 操作符
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 0, // setup is error
    '@typescript-eslint/no-explicit-any': 0,
    'prettier/prettier': 'error', // 被prettier标记的地方抛出错误
  },
}
```

编辑器处理

> settings.json

```json
{
  "eslint.validate": [
    //配置eslint.validate扩展名的选项以检查.vue文件，因为扩展名仅针对*.js或*.jsx默认为文件
    "javascript",
    "javascriptreact",
    "vue"
  ]
}
```

> eslint-plugin-prettier 用于对文件代码进行风格检查

> eslint-config-prettier 用于关闭其他插件与 prettier 出现冲突的 lint，然后以 prettier 为准

```js
module.exports = {
  extends: [
    // ...其他lint
    // 为了保证格式化后代码都以prettier为准，把这两项配置放到数组最后
    'plugin:prettier/recommended',
    'prettier',
  ],
}
```

以上等价于：

```js
{
  "extends": ["prettier"],
  "plugins": ["prettier"],
  "rules": {
     "prettier/prettier": "error",
     "arrow-body-style": "off",
     "prefer-arrow-callback": "off"
    }
}
```

## typescript

`yarn add @typescript-eslint/parser @typescript-eslint/eslint-plugin`
