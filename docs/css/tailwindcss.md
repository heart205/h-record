# tailwindcss 配置

> [vscode 插件](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

安装:

```shell
yarn add tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
```

生成配置文件:

```shell
npx tailwindcss init
```

配置 postcss

> .postcssrc

```js
module.exports = () => {
  return {
    plugins: {
      tailwindcss: {},
    },
  }
}
```

> 在 webpack 中配置： postcss

```js
{
  test: /\.less$/,
  use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'],
},
```

在 less 中导入

```less
@import 'tailwindcss/base';

@import 'tailwindcss/components';

@import 'tailwindcss/utilities';
```
