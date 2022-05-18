# DOM

## hasChildNodes 是否含有子节点

> **hasChildNodes**方法返回一个[布尔值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean),表明当前[节点](https://developer.mozilla.org/zh-CN/docs/Web/API/Node)是否包含有[子节点](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/childNodes).

```js
element.hasChildNodes()
```

[mdn hasChildNodes](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/hasChildNodes)

## 获取子节点

首个子节点:

```js
document.getElementById('app').firstChild //获取第一个子节点 包括了换行和空格
document.getElementById('app').firstElementChild // 获取第一个dom子节点
```

---

最后一个子节点

```js
var getLastChildA = document.getElementById('app').lastChild
var getLastChildB = document.getElementById('app').lastElementChild
```

## 获取兄弟节点

```js
previousSibling 属性 匹配上一个兄弟节点
previousElementSibling 属性 匹配上一个兄弟DOM节点
```

> nextSibling nextElementSibling 同理
