## webpack 基本配置

```js
// 此处展示webpack 的基本配置 后续说明各个配置的原因
```

## publicPath

> 官方解释：
> 先理解绝对路径和相对路径

> 1.  绝对路径: 以斜杠开头 例如 `/` `/docs` 等

> 2. 相对路径: 是从当前路径开始的路径 以`./`开头或者直接写文件夹名称也默认是相对路径`docs`(严格写法应该是`./docs`)

> 因为端口是相对于服务端的工作目录()为基础路径启动的 而打包之后的 dist 文件夹相当于是一个静态的资源文件夹

以 `Live Server` 作为一个启动服务端为例 工作目录是一个文件夹 `s-v3`

> 文件结构如下:

```md
.
├── README.md
├── babel.config.js
├── dist
│   ├── css
│   ├── favicon.ico
│   ├── index.html
│   └── js
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── api
│   ├── assets
│   ├── components
│   ├── main.js
│   ├── router
│   ├── store
│   ├── utils
│   └── views
├── vue.config.js
└── yarn.lock
```

`dist` 文件夹是下面的静态资源文件

```md
.
├── css
│   └── chunk-vendors.331f546b.css
├── detail.md
├── favicon.ico
├── index.html
└── js
├── app.cb67d441.js
├── app.cb67d441.js.map
├── chunk-03aecb71.6843297c.js
├── chunk-03aecb71.6843297c.js.map
├── chunk-1c4d2cee.b5780b8a.js
├── chunk-1c4d2cee.b5780b8a.js.map
├── chunk-2d2169e2.3e9d73ac.js
├── chunk-2d2169e2.3e9d73ac.js.map
├── chunk-3cc155be.eb1a0b1b.js
├── chunk-3cc155be.eb1a0b1b.js.map
├── chunk-4310ad70.7b7d73a6.js
├── chunk-4310ad70.7b7d73a6.js.map
├── chunk-6901caa7.4350d069.js
├── chunk-6901caa7.4350d069.js.map
├── chunk-vendors.62c66c0b.js
└── chunk-vendors.62c66c0b.js.map
```

此时如果在 `dist的index.html` 中启动 `Live Server`
`http://localhost:5500` 映射的就是当前的工作目录

此时的网页请求的 html 的 url 是`http://127.0.0.1:5500/dist/index.html` 对应工作目录的`dist`文件夹下面的`index.html`静态资源

在从打包之后观看
如果 publicPath 设置为 `/` 一个绝对路径
则打包之后的 html:：

```md
<link href="/js/chunk-03aecb71.6843297c.js">
<link href="/js/chunk-1c4d2cee.b5780b8a.js">
<link href="/js/chunk-2d2169e2.3e9d73ac.js">
```

此时的 css 和 js 的静态资源则是相对于服务端的工作目录的来查询的 但是 服务端并没有 js 和 css 文件夹

js 和 css 文件夹都是在 dist 的 js 和 css 下面

则更改 publicPath 为 `/dist/`

此时打包之后的 html 为:

```md
 <link href="/dist/js/chunk-03aecb71.6843297c.js" rel="prefetch">
```

再次使用`live server` 启动服务端 则可以访问到

但是这样的弊端在于 不同的服务端可能存放的文件夹位置不同 导致 publicPath 的路径并不准确

例如 如果服务端将 css 和 js 文件放在 dist 的 modules 文件夹下面

则 publicPath 需要改为 `/dist/modules/`

打包之后的 html

```html
<link href="/dist/modules/js/chunk-03aecb71.6843297c.js" />
```

并且将文件的 css 和 js 目录结构移动成如下

```md
.
├── detail.md
├── favicon.ico
├── index.html
└── modules
├── css
│   └── chunk-vendors.331f546b.css
└── js
├── app.a3a19729.js
├── app.a3a19729.js.map
├── chunk-03aecb71.6843297c.js
├── chunk-03aecb71.6843297c.js.map
├── chunk-1c4d2cee.b5780b8a.js
├── chunk-1c4d2cee.b5780b8a.js.map
├── chunk-2d2169e2.3e9d73ac.js
├── chunk-2d2169e2.3e9d73ac.js.map
├── chunk-3cc155be.eb1a0b1b.js
├── chunk-3cc155be.eb1a0b1b.js.map
├── chunk-4310ad70.7b7d73a6.js
├── chunk-4310ad70.7b7d73a6.js.map
├── chunk-6901caa7.4350d069.js
├── chunk-6901caa7.4350d069.js.map
├── chunk-vendors.62c66c0b.js
└── chunk-vendors.62c66c0b.js.map
```

再次启动`Live Server` 才能访问到

> 如果 dist 文件内部的结构不变的话 则可以直接使用相对路径作为 publicPath 即可
>
> 此时客户端获取到 html 资源的时候 其他的 css 和 js 都是相对 index.html 的路径来获取的 因此不会出现路径找 404 的问题
>
> ```html
> <link href="js/chunk-03aecb71.6843297c.js" />
> ```

## env 环境变量

> process 对象是一个全局变量，提供了有关当前 Node.js 进程的信息并对其进行控制。
> process.env 属性会返回包含用户环境的对象。

### node 环境变量

> node 环境变量指 nodejs 执行环境的环境变量。
> 此处的 nodejs 指的是 webpack 的编译环境。

可以通过`cross-env`包统一 window 和 Linux 下设置 node 环境变量的问题

在`webpack`编译打包的时候获取

```js
const env = process.env.NODE_ENV
```

## 客户端的环境变量

此时可以通过 webpack 插件（DefinePlugin）获取根据环境变量的不同读取不同的配置注入到客户端中

```js
plugins: [
  new webpack.DefinePlugin({
    'process.env': process.env.NODE_ENV === 'development' ? require('./dev.env.js') : require('./prod.env.js'),
  }),
]
```

```js
//dev.env.js
const merge = require('webpack-merge')

module.exports = merge({
  NODE_ENV: '"development"',
  api: 'xxxx',
})
```

在客户端则可以通过 process.env 获取(编译之后的 process.env 等会是一个对象)
