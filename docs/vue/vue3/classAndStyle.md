## class 和 style 绑定

## vue3

> [官方文档](https://v3.cn.vuejs.org/guide/class-and-style.html#%E7%BB%91%E5%AE%9A-html-class)

> 当你在带有单个根元素的自定义组件上使用 `class` attribute 时，这些 class 将被添加到该元素中。此元素上的现有 class 将不会被覆盖

在父组件中

```vue
<template>
  <HelloWorld class="style" />
</template>
```

子组件的根标签会渲染父组件传下来的 class

> 如果有多个根标签 则 class 不会渲染 需要手动使用$attrs 去指定

```vue
<template>
  <div>click btns</div>
</template>
```
