# react

## ReactDOM API:

### unmountComponentAtNode

> 从 DOM 中卸载 react 组件 并且会将组件的事件监听和 state 一起卸载 如果传入的 dom 中有 react 组件 则会被卸载 原声的 dom 组件不受影响

```js
ReactDOM.unmountComponentAtNode(divTag)
```

> [unmountComponentAtNode](https://zh-hans.reactjs.org/docs/react-dom.html#unmountcomponentatnode)

### render(element, container[, callback])

> 如果 React 元素之前已经在 container 里渲染过，这将会对其执行更新操作，并仅会在必要时改变 DOM 以映射最新的 React 元素。<br />
> 首次调用时，容器节点里的所有 DOM 元素(子节点)都会被替换
> callback callback 将在组件被渲染或更新之后被执行

```js
ReactDOM.render(
  <MessageFunction
    message={message}
    type={type}
    onclose={() => {
      if (divTag) {
        ReactDOM.unmountComponentAtNode(divTag)
        root ? root.removeChild(divTag) : null
        if (root && !root?.hasChildNodes()) {
          document.body.removeChild(root)
        }
      }
    }}
  />,
  divTag
)
```

> [render](https://zh-hans.reactjs.org/docs/react-dom.html#render)

### dangerouslySetInnerHTML

直接在 react 中添加 DOM 元素会被当作字符串解析
dangerouslySetInnerHTML 是 React 为浏览器 DOM 提供 innerHTML 的替换方案 `key 为 __html`

```tsx
<code>
  <pre
    dangerouslySetInnerHTML={{
      __html: prismjs.highlight(JSON.stringify(code, null, 2) || '', prismjs.languages[language], language),
    }}
  ></pre>
</code>
```

> [dangerouslySetInnerHTML](https://zh-hans.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)

> [mui]](https://github.com/mui/material-ui)

## 闭包陷阱

[闭包陷阱的切入](https://juejin.cn/post/6844904193044512782)

## hooks

### useMemo

> `useMemo(callback,[deps])` 主要用于高性能开销计算

```tsx
import React, { useMemo, useState } from 'react'

interface Props {}
/**
 * useMemo 优化针对于当前组件高开销的计算
 * @returns deps如果值不变化 则不会进行重新计算值
 */
const TestUseMemo: React.FC<Props> = () => {
  const [count, setCount] = useState(0)
  const [detail, setDetail] = useState(0)
  const total = useMemo(() => {
    let num = 0
    for (let i = 0; i < 100; i++) {
      num += count
    }
    return num
  }, [detail])
  return (
    <>
      {total}
      <br />
      {detail}
      <br />
      {count}
      <br />
      <button
        onClick={() => {
          setDetail(detail + 1)
        }}
      >
        点击新增detail
      </button>
      <br />
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        点击新增total
      </button>
    </>
  )
}

export default TestUseMemo
```

## useCallback

> 返回一个 memoized 回调函数。在依赖参数不变的情况下，返回的回调函数是同一个引用地址
> <br/>
> 每当依赖参数发生改变 useCallback 就会自动重新返回一个新的 memoized 函数（地址发生改变）

使用场景： 优化父子组件传递 callback 刷新问题
[useCallback 使用场景](https://juejin.cn/post/6844904032113278990#heading-5)

```tsx

```

## memo

hooks 中的 memo 和 PureComponent 的作用相同 都是完成 shouldComponentUpdate 的对 props 浅层的判断
