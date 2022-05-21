# 环境变量

## uglifyjs 打包失败

> uglifyjs 不支持 es6

对 babel-loader 添加需要转换的包 这里添加了 react-intl 的包

```shell
      {
        test: /\.(js|jsx)$/,
        include: [paths.appSrc, path.resolve(__dirname, '../node_modules/react-intl')],
        loader: require.resolve('babel-loader'),
        options: {
          plugins: [
            [
              'transform-runtime',
              {
                helpers: false,
                polyfill: false,
                regenerator: true,
                moduleName: 'babel-runtime',
              },
            ],
            ['import', { libraryName: 'antd', style: true }],
          ],
          compact: true,
        },
      }
```
