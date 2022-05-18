## vue2 响应式

- 对象类型 通过`Object.defineProperty()` 对属性的读取 修改 进行拦截(数据劫持)
- 数组类型：通过重写更新数组的一系列方法来实现拦截(对数组的变更方法进行了包裹)

> 数组响应式：https://segmentfault.com/a/1190000040238233

更新特定的 getter 和 setter 更新特定的组件 然后开始 diff 算法比较

```js
Object.defineProperty(data,'count', {
  get() {}
  set() {}
})
```

存在的问题

- 直接新增/删除属性 界面不会刷新

```vue
<script>
import Vue from 'vue'
export default {
  data() {
    return: {
      obj: {}
    }
  }
methods: {
  addProperty() {
  	this.obj.name = 1; // 数据不会响应式
    // 解决方法:
    this.$set(this.obj,'name', 1)
    Vue.set(this.obj,name,1)
	}
  handleDeleteProperty() {
    delete this.obj.name // 数据不会响应式
    // 解决方法:
    this.$delete(this.obj, 'name')
    Vue.delete(this.obj, 'name')
  	}
	}
}
</script>
```

- 直接通过下标修改数组界面不会刷新

```js
<script>
import Vue from 'vue'
export default {
  data() {
    return: {
      arr:[]
    }
  }
methods: {
  addProperty() {
  	this.arr[0] = 1; // 数据不会响应式
    // 解决方法:
    this.$set(this.arr,0, 1)
    Vue.set(this.arr,0 ,1)
	}
  handleDeleteProperty() {
    delete this.arr[0] // 数据不会响应式
    // 解决方法:
    this.$delete(this.arr, 0)
    Vue.delete(this.arr, 0)
  	}
	}
}
</script>
```

## 生命周期钩子

如果一个组件没有(el 或者 template)，那么它的生命周期钩子 beforeCreate() 和 created() 会被调用 其他的不会被调用。

<img src="/images/lifecycle.png">

## 废置属性

> slot slot-scope 废弃 使用 v-slot 代替

## 强制刷新

```js
...//相关修改操作
this.$forceUpdate()//强制重新渲染视图
```

## provide/inject

provide 的使用:

```vue
<script>
// 父组件
export default {
  provide() {
    return {
      parentIsJEditableTable: true,
      getDestroyCleanGroupRequest: () => this.destroyCleanGroupRequest,
    }
  },
}
</script>
```

在子组件中 可以用 对象或者数组接收

```vue
inject: { 'isShowRelateQuery': { default: false} }, // 或者数组： inject:['closeCurrent'],
```

## v-for 直接循环的例子

```js
<div  v-for="index of 5" :key="index">
    第{{index}}个
</div>
```
