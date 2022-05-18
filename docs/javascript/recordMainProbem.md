# 常用问题:

1. fill 填充引用类型 会使用同一个引用类型去填充: 可以使用`map`遍历去解决

```js
const obj = { a: 1 }
const arr = new Array(2).fill(obj)
// obj.a = 2
// arr =[{a:2},{a:2}]
使用map遍历获取
const arr = new Array(null).map((v) => {
  a: v
})
```

> https://tie.pub/2019/09/creating-arrays/
