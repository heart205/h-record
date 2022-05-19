# react i8n

react 16.13.1 版本的国际化

> 技术栈: react 16.13.1 react-int ^3.x

先配置国际化所需要的 key-value 键值对(也可以使用 json)

```js
// en-US.js
export default {
  help: 'Help',
  personalCenter: 'Personal center',
  logout: 'Sign out',
  role: 'Role',
  coding: 'Coding',
  description: 'Description',
  status: 'Status',
  operation: 'Operation',
  enable: 'Enable',
  disable: 'Disable',
}
```

```js
// zh-CN.js
export default {
  help: '帮助',
  personalCenter: '个人中心',
  logout: '推出登陆',
  role: '角色',
  coding: '编码',
  description: '描述',
  status: '状态',
  operation: '操作',
  enable: '启用',
  disable: '禁用',
}
```

在根组件中引入`IntlProvider`容器 通过指定`locate`和 `messages` 使得后代的消费组件都能获取`messages`的值

通过 Context 组件给后代组件传递`change`方法, 使得后代组件可以在任意处修改国际化语言

> 这里关键的一点 需要指定 IntlProvider 的 key 值 不然有可能会造成页面视图不会刷新的问题
>
> [stackoverflow formatmessage 视图层不渲染](https://stackoverflow.com/questions/44832683/intl-formatmessage-not-working-react-intl)

```js
import React from 'react'
import App from '../App'
import MyContext from './context'
import { IntlProvider } from 'react-intl'
import { LocaleProvider } from 'antd'
import enUs from './en-US'
import enUSAntd from 'antd/lib/locale-provider/en_US'
import zhCn from './zh-CN'
export default class I18N extends React.Component {
  state = {
    lang: 'zh-CN',
  }
  getLanguage(language) {
    let message = null
    let lang = null
    switch (language) {
      case 'en-US': {
        message = enUs
        lang = enUSAntd
        break
      }
      default: {
        message = zhCn
        lang = null
      }
    }
    return { message, lang }
  }
  render() {
    const { message, lang } = this.getLanguage(this.state.lang)
    return (
      <MyContext.Provider
        value={{
          // 给后代组件传递可以修改国际化语言的方法
          change: (language) => {
            this.setState({ lang: language })
          },
          lang: this.state.lang,
        }}
      >
        <LocaleProvider locale={lang}>
          {/* TODO: 关键key 刷新关键 */}
          <IntlProvider key={this.state.lang} locale={this.state.lang} messages={message}>
            <App />
          </IntlProvider>
        </LocaleProvider>
      </MyContext.Provider>
    )
  }
}
```

后代组件通过`FormatedMessage`组件订阅国际化配置的语言信息

> 通过 id 去映射 messages 中的 key 从而带出 value

```js
<FormattedMessage id={'operation'} />
```

> 参考资料:
>
> [npm react-intl 3.2.0](https://www.npmjs.com/package/react-intl/v/3.2.0)
>
> [react-intl 前端国际化快速入门](https://juejin.cn/post/7051469762546630669)
>
> [intl-messageformat](https://formatjs.io/docs/intl-messageformat)
>
> [intl 介绍](https://www.jianshu.com/p/2f8d6e0b4adb)
