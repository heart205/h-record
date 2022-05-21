# git commit specification

```
yarn add lint-staged husky
npm set-script prepare "husky install"
npm run prepare
npx husky add .husky/pre-commit "npx lint-staged"
```

created .lintstagedrc.json

> "\*_/_.{less,css}": "stylelint --fix" //对 css 文件进行检测

```json
{
  "*.{js,jsx,ts,tsx}": ["prettier --write .", "eslint  --fix"],
  "*.md": ["prettier --write"],
  "**/*.{less,css}": "stylelint --fix" //对css文件进行检测
}
```

add

```
yarn add commitlint @commitlint/config-conventional -D

npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'

echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

## css

```shell
yarn add stylelint-config-standard
yarn add stylelint-config-prettier
yarn add stylelint
```

> .stylelintrc.json

```json
{
  "extends": ["stylelint-config-standard", "stylelint-config-prettier"]
}
```

## babel

```
yarn add @babel/preset-env @babel/preset-typescript # ts add @babel/preset-typescript
```

## jest

```shell
npx husky add .husky/pre-push "npm test" # 提交代码前,跑一遍测试用例
```

## ts config jest

1. Babel.config.js

```shell
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
}
// yarn add jest @types/jest
```

## jest config 根据 node 或者 browser 自行配置
