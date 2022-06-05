# Array

## Array.from

> 第二个参数为映射函数

```js
Array.from({ length: 4 }) // [ undefined, undefined, undefined, undefined ]
```

[JavaScript 中创建并填充任意长度的数组](https://tie.pub/2019/09/creating-arrays/)

## for of 和 for in 的区别

1. for in 遍历的是对象的属性名(key)，for of 遍历的是对象的元素值(value)，所以用 for in 来遍历对象
   > for...in 语句以任意顺序迭代一个对象的除 Symbol 以外的可枚举属性，包括继承的可枚举属性。
2. 用 for of 来遍历数组可以保证顺序，以及实现了 iterator 接口的对象，遍历普通对象会报错
