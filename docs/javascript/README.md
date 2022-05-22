# javaScript

## 通过 js 修改 css 变量

```css
:root {
  --color: #333;
}
```

js 设置 css 变量的值

> 将 css 变量挂载到 html 的 style 属性上

```js
document.querySelector(':root').style.setProperty('--color', '#eee')
```

或者可以给 html 绑定一个 class 通过 class 改变 css 变量的值

```css
.dark {
  --background-color: #333;
  --color: #eee;
}
```

```js
document.querySelector('html').className = 'dark'
```

## `noscript`元素

> `noscript` 元素出现，被用于给不支持 JavaScript 的浏览器提供替代内容

```js
<noscript>
  <p>This page requires a JavaScript-enabled browser.</p>
</noscript>
```

## 严格模式

ECMAScript 5 增加了严格模式(strict mode)的概念。严格模式是一种不同的 JavaScript 解析和执 行模型，ECMAScript 3 的一些不规范写法在这种模式下会被处理，对于不安全的活动将抛出错误。要对 整个脚本启用严格模式，在脚本开头加上这一行:

```js
'use strict'
```

1. 在严格模式下，不能定义名为 eval 和 arguments 的变量，否则会导致语法错误。

## DOM

### getBoundingClientRect

getBoundingClientRect 返回一个 DOMRect 对象

> top left right bottom 为元素到视口的距离 width height 为元素的宽高

```js
DOMRect :{
  bottom: 260,
  height: 200,
  left: 60,
  right: 484.2421875,
  top: 60,
  width: 424.2421875,
  x: 60,
  y: 60,
}
```

## Object

### getOwnPropertyNames

> Object.getOwnPropertyNames()方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括 Symbol 值作为名称的属性）组成的数组。

```js
Object.getOwnPropertyNames(obj)

Object.getOwnPropertyNames([].__proto__)
```

## String

### 字符串与 ASCII 码转换方法

字符串转为 ascii 码：

```js
var str = 'a'
str.charCodeAt(0)
```

ascii 码转字符串：

```js
const num = 97
String.fromCharCode(num)
```

## Map 映射类型

[map - mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)

get set 方法

```ts
const map: Map<string, string> = new Map()
map.set('name', 'zhangsan')
map.get('name')
```

> size 属性

```ts
map.size
```

### forEach 迭代 map

```ts
myMap.forEach((val, key) => {
  // ....
})
```

### map 和二维数组的关系：

二维数组转 map

```ts
let kvArray: Array<Readonly<[string, string]>> = [
  ['key1', 'value1'],
  ['key2', 'value2'],
]

let myMap = new Map<string, string>(kvArray)
```

使用 Array.from 函数可以将一个 Map 对象转换成一个二维键值对数组

```ts
Array.from(kvArray)
// 也可以使用扩展运算符
//[...kvArray]
```

只获取 key 的遍历值

```ts
;[...map.keys()]
```

只获取 value 的值

```ts
;[...myMap.values()]
```

map 的克隆

> 数据本身未被克隆。

```ts
let original = new Map([[1, { name: '张三', age: 18 }]])

let clone = new Map(original)

const d = clone.get(1)

if (d) d.age = 21

console.log(clone.get(1)) // { name: '张三', age: 21 }

console.log(original.get(1)) // { name: '张三', age: 21 }
```

## 内置标准对象

[mdn 链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects#%E6%A0%87%E5%87%86%E5%86%85%E7%BD%AE%E5%AF%B9%E8%B1%A1%E5%88%86%E7%B1%BB)

### Blob 类

### File 类

### FileRead 类

#### Blob 对象转换为 File 对象

> 第一个参数是一个 Blob 对象的数组

```ts
new window.File([this.blob], file.name, { type: file.type })
```

### DataURL

1.`URL.createObjectURL(file|Blob)` 可以将 File 对象或者 Blob 变成一个 DataURL 输出

```js
<template>
  <div ref="file">
    <input type="file" @change="changeFile" />
  </div>
</template>

<script>
import { onBeforeUnmount, ref } from 'vue'
export default {
  setup() {
    const file = ref(null)
    const imgSrc = null
    function changeFile(event) {
      imgSrc = URL.createObjectURL(event.target.files[0])
      console.log(imgSrc) // blob:http://localhost:3000/b4dbeb2a-186a-49af-aad8-beb02da47571
      if (file && file.value) {
        const img = document.createElement('img')
        img.src = imgSrc
        img.onload = () => {
          file.value.append(img)
        }
      }
    }
    onBeforeUnmount(() => {
      URL.revokeObjectURL(imgSrc)
    })
    return {
      file,
      changeFile
    }
  }
}
</script>

```

2. 利用 FileReader 实例对象完成将`File|Blob`对象转成 DataURL

```vue
<template>
  <div ref="file">
    <input type="file" @change="changeFile" />
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const file = ref(null)
    const imgSrc = null
    function changeFile(event) {
      const fr = new FileReader()
      fr.readAsDataURL(event.target.files[0])
      // fr回调 this === fr
      fr.onload = function () {
        console.log(this === fr) // true
        if (file && file.value) {
          const img = document.createElement('img')
          img.src = this.result
          img.onload = () => {
            file.value.append(img)
          }
        }
      }
    }
    return {
      file,
      changeFile,
    }
  },
}
</script>
```

#### 下载 DataURL 的图片

```js
function downloadImg() {
  let aLink = document.createElement('a')
  aLink.download = 'fileName.png' // 文件名后缀需要和DataURL表示的相同，否则可能乱码
  aLink.href = dataUrl
  aLink.click()
}
```

## 精度丢失问题：

[知乎 javascript 精度丢失](https://zhuanlan.zhihu.com/p/100353781)
