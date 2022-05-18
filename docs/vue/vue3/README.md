# Vue 3.0

> [antfu 手写 watch](https://antfu.me/posts/watch-with-reactivity)
>
> [watch watchEffect](https://www.zhihu.com/question/462378193)

## 更新原理

vuex 中的数据也是跟 vue 的 ref 和 reactive 一样经过了处理的

> 如何渲染 以后看源码

## 初始化

`npm init vite-app <project-name>`

或者
`npm init @vitejs/app` 选择版本

## 一些特性

```js
// createApp 工厂函数 已经不会导出Vue
// import Vue from 'vue' // undefined
import { createApp } from 'vue'
```

> vue3.0 的 template 可以没有根标签

## Composition API 组合式 API

### setup

一个配置项 值是一个函数

组件中所用到的：数据。方法等等 均要在配置在 setup 中

1. 如果返回的是一个对象 则对象中的属性 方法 在模版中均可以直接使用

   ```js
   export default {
     setup() {
       // 有点小问题 数据不是响应式
       return {
         msg: 'Hello Vue.js!22',
         count: 0,
       }
     },
   }
   ```

2. 如果返回一个渲染函数 则可以自定义渲染内容

```js
import { h } from 'vue'
export default {
  setup() {
    // 自定义渲染函数
    return () => {
      return h('h1', 'hello vue')
    }
  },
}
```

> vue2 的配置可以读取到 vue3 中的配置
>
> vue3 的 setup 中可能会读取不到 vue2 的配置
>
> 如果有重名 setup 优先
>
> setup 普通情况下不能是一个 async 函数 因为返回值不再是对象 而是一个 promise(在 suspense 中可以使用 async 和 promise 实例对象)

## ref

定义一个响应式的数据

```vue
<template>
  <div>{{ msg }}</div>
  <div>{{ obj.a }}</div>
  <div>{{ obj.b }}</div>
  <button @click="msg = '112'">点击添加</button>
  <button @click="click">函数点击添加</button>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    let msg = ref('hello message')
    console.log(msg) // 被ref加工后是一个引用实现的对象RefImpl
    let obj = ref({ a: 1, b: 2 }) // 引用数据类型的对象是RefImpl 里面的value是Proxy对象
    console.log(obj)
    return {
      msg: msg,
      obj: obj,
      click() {
        // 在template中可以不用.value
        msg.value = '112'
      },
    }
  },
}
</script>
```

基本数据类型的数据是依靠 Object.defineProperty()的 get 和 set 完成的

引用类型的数据 内部求助了 Vue3.0 中的一个新的函数`reactive`函数 完成了 Proxy 对象的封装

## reactive

定义一个对象类型的响应式数据(基本类型不要用它 要用`ref`函数)

语法：`const 代理对象 = reactive(源对象)`接受一个对象(或者数组) 返回一个 Proxy 对象

reactive 定义的响应式函数是深层次的 内部基于 Proxy 实现 通过代理对象操作源对象内部数据进行操作

## vue3 响应式

通过 Proxy 拦截对象中的任意属性的变化 包括属性值的读写 属性的添加 属性的删除等

之后再通过反射 对被代理对象的属性进行操作

```js
const obj = {
  name: 'John',
  age: 30,
  job: 'developer',
  sayHello: function () {
    console.log(`Hello, ${this.name}`)
  },
}
const proxy = new Proxy(obj, {
  // 获取某个熟悉的时候调用
  get(target, propName) {
    console.log(`Getting prop ${propName}`)
    console.log(`target[propName] = ${target[propName]}`)
    // return target[propName]
    return Reflect.get(target, propName)
  },
  // 新增或者更新的时候调用
  set(target, propName, value) {
    console.log(`Setting prop ${propName} to ${value}`)
    // target[propName] = value;
    return Reflect.set(target, propName, value)
  },
  // 删除的时候调用
  deleteProperty(target, propName) {
    console.log(`Deleting prop ${propName}`)
    // return delete target[propName];
    return Reflect.deleteProperty(target, propName)
  },
})
//#region
// console.log(proxy.age);

// proxy.age = 48;
// console.log(proxy)

// delete proxy.age;

// console.log(proxy);

//#endregion

/**
 * Reflect
 */
console.log(Reflect.get(obj, 'name'))
const isFlag = Reflect.set(obj, 'ddd', 'Tom')
console.log('isFlag', isFlag)
const a1 = Reflect.defineProperty(obj, 'ref', {
  get() {
    return 3
  },
})
console.log('a1', a1)

// 重复定义个新的属性值 会返回一个bool类型 判断是否返回成功
const a2 = Reflect.defineProperty(obj, 'ref', {
  get() {
    return 4
  },
})
console.log('a2', a2)

console.log(obj.ddd)

Object.defineProperty(obj, 'reflect', {
  get() {
    return '1'
  },
})

// Object.defineProperty 不能够重复定义一个属性值
Object.defineProperty(obj, 'reflect', {
  get() {
    return '2'
  },
})

console.log('2')
```

## reactive 与 ref 对比数据

1. 数据定义角度对比

   1. ref 定义基本类型数据
   2. reactive 定义 引用类型数据

   > ref 也可以用来定义引用类型数据 它内部会自动通过 reactive 转为代理对象

2. 原理角度对比

   1. ref 通过`Object.defineProperty`对数据进行劫持
   2. reactive 通过`Proxy 和 Reflect`操作源对象内部的数据 实现响应式

3. 使用角度对比

   1. ref 操作数据需要.value 在 template 中读取 ref 定义的数据不需要`.value`

   ```vue
   <template>
     <div>{{ objRef.a }}</div>
     <button @click="click">函数点击添加</button>
   </template>
   <script>
   import { ref } from 'vue'
   export default {
     setup() {
       let objRef = ref({ a: 1, b: 2 }) // 引用数据类型的对象是RefImpl 里面的value是Proxy对象
       return {
         objRef,
         click() {
           objRef.value.a++
         },
       }
     },
   }
   </script>
   ```

4. reactive 定义的数据均不需要`.value`

setup 执行的时机

- 在 beforeCreate 之前执行一次 this 是`undefined`

```js
setup(props,context) {

}
```

```vue
<template slot="qwe"></tempalte>  //已经不推荐写法

<template v-slot:q></template> v3推荐写法
```

### setup 参数

1. props 值为对象 父组件传递的属性且已经在组件内部声明接收了的
2. Context ： 上下文对象
   1. attrs： 值为对象 包含组件外部传递的 并且没有在 props 中配置的声明的属性 相当于$attrs
   2. slots: 收到的插槽的内容 相当于 this.$slots
   3. emit 分发自定义事件的函数 相当于 this.$emit

## 计算属性

```vue
<template>
  <div>
    first-name: <input type="text" v-model="person['first-name']" />
    <br />
    last-name: <input type="text" v-model="person['last-name']" />
    <br />
    full-name: <input type="text" v-model="person.fullName" />
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
export default {
  setup() {
    const person = reactive({
      'first-name': '张三',
      'last-name': '李四',
      age: 18,
    })
    // 计算属性应该为 person 的一个属性 不应该单独变成一个对象
    // const computedObj = computed(() => {
    //   return `${person["first-name"]} - ${person["last-name"]}`;
    // });
    person.fullName = computed(() => {
      return `${person['first-name']} - ${person['last-name']}`
    })
    return {
      person,
      //  computedObj
    }
  },
}
</script>
```

### 测试响应式

```vue
<template>
  <div>
    <button @click="updateB">点击测试响应式</button>
    {{ b }}
  </div>
</template>
<script>
let detail = 1
import { computed, reactive } from 'vue'
export default {
  setup() {
    const person = reactive({
      'first-name': '张三',
      'last-name': '李四',
      age: 18,
    })
    // 由于detail不是响应式数据 所以页面不会刷新
    const b = computed({
      get() {
        return detail + 'b'
      },
      set(value) {
        console.log('a')
        detail++
        // 这里如果换成 person.age++ 即会刷新页面
        return true
      },
    })
    function updateB() {
      b.value++
      console.log('更新b', 'detail', detail)
    }
    return {
      person,
      updateB,
      b,
    }
  },
}
</script>
```

## watch

> Watch 默认监视的是 value 属性

watch 单个值的写法

```js
setup() {
	let sum = ref(0)
	watch(sum, (newVal, oldVal) => {
  	console.log('sum变化', newVal, oldVal)
	},{immediate: true})
}
```

watch 多个值的写法

```js
watch(
  [sum, msg],
  (newVal, oldVal) => {
    // 此时的newVal是一个数组 oldVal也是一个数组
    // newVal[newSum,newMsg] oldVal[oldSum,oldMsg]
    console.log('sum变化', newVal, oldVal)
  },
  { immediate: true }
)
```

监视 reactive 定义的一个响应式的数据 newValue 和 oldValue 相等

watch 监听的时候 ref 的基本数据类型直接监听即可 如果是 ref 的对象类型 则需要监听`.value的结果`（因为引用类型的 ref 的`.value`是一个 reactive 的响应对象 如果直接监听对象 则只有对象的地址值被换掉的时候 vue 才会认为你对数据进行了更新）

> 可以开启深度监听的问题解决

```js
const ps = ref({
  names: 'josin',
  age: 19,
})

watch(
  ps,
  (newVal) => {
    console.log('newVal ps ', ps)
  },
  { deep: true }
)
```

监视 reactive 所定义的一个响应式的**全部**数据

1. 无法正确的获取 oldValue
2. 强制开启深度监视 此时的 deep 配置无效

```js
 const person = ref({
      name: "join",
      age: 18,
    });
// 这里监听person.value 因为person.value 就是reactive定义的proxy对象
 watch(person.value, (newValue, oldValue) => {
      console.log(newValue);
    });


-------------- 第二种写法
    const person = reactive({
      name: "join",
      age: 18,
    });

    watch(person, (newValue, oldValue) => {
      console.log(newValue);
    });
```

监视 reactive 中的某一个属性

如果监听的是 reactive 中的某个`属性对象` 则此时的 deep 配置有效（只有对象才起 deep 才有意义）

```js
const person = reactive({
  name: 'join',
  age: 18,
})

watch(
  () => person.age,
  (newVal, oldVal) => {
    console.log('person.age', person.age)
  }
)
```

监视 reactive 中的某些属性

```js
watch([() => person.age, () => person.name], (newVal, oldVal) => {
  console.log('new Val', newVal)
})
```

## 获取对象的 ref 的使用

### 单个 ref 的使用

```vue
<template>
  <canvas ref="canvas" class="canvas"></canvas>
</template>

<script>
import {ref,onMounted} from 'vue'
setup() {
  const canvas = ref(null)
  onMounted(() => {
    console.log(canvas.value) // 此时的canvas就是单个的ref
  })
  return {
    canvas
  }
}
</script>
```

### 多个 ref 的使用

```vue
<template>
  <div>获取多个DOM元素</div>
  <ul>
    <li v-for="(item, index) in arr" :key="index" :ref="setRef">
      {{ item }}
    </li>
  </ul>
</template>

<script>
import { reactive, nextTick } from 'vue'

export default {
  setup() {
    const arr = reactive([1, 2, 3])
    // 存储dom数组
    const myRef = reactive([])
    const setRef = (el) => {
      myRef.push(el)
    }
    nextTick(() => {
      console.log(myRef)
    })
    return {
      arr,
      setRef,
    }
  },
}
</script>
```

## 生命周期钩子

`beforeDestroy` 改名为 `beforeUnmount`
`destoryed` 改名为 `unmounted`
其他的钩子和 v2 中的一样

<img src="./_images/lifecycle3.png">

### 组合式 api 的钩子

> 如果有 before Create 和 setup setup 先执行
> beforeCreate ===>setup()

created ===>setup()

beforeMount ===> onBeforeMount // onBeforeMount 的执行顺序是比 beforeMount 先执行

mounted ===> onMounted

beforeUpdate ===> onBeforeUpdate

updated ===> onUpdated

beforeUnmount ==> onBeforeUnmount

unmounted ===> onUnmounted

## 自定义 hooks

hooks 有点类似于 mixin 的方式 本质是一个函数

> 开头以 use 开头（一种约定俗成）

> useMouseDown 的 hook 实现 全局单一挂载 并且数据返回的始终是鼠标的点击的位置

```js
import { reactive, onMounted, onBeforeUnmount } from 'vue'

let isInit = false
const obj = {
  x: 0,
  y: 0,
}
export default function () {
  const mouseDown = reactive(obj)
  const ev = (e) => {
    mouseDown.x = e.clientX
    mouseDown.y = e.clientY
  }
  if (!isInit) {
    isInit = true
    onMounted(() => {
      console.log('onMounted')
      window.addEventListener('mousedown', ev)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('mousedown', ev)
    })
  }

  return mouseDown
}
```

## toRef

- 创建一个 ref 对象其 value 指向的是另外一个对象中的某个属性

> 应用场景： 将响应式对象中的某个属性单独提供给外部使用

```js
const name = toRef(person, 'name') // 将person.name的包装成RefImpl
```

```vue
<template>
  <div>
    {{ person }}
  </div>
  <button @click="handleChange">点击改变</button>
</template>

<script>
import { reactive, toRef } from 'vue'
export default {
  setup() {
    const person = reactive({
      name: 'jsoin',
      age: '17',
      detail: {
        a: 1,
        b: 2,
      },
    })
    // 将person.detail.a 通过ref包裹了一层 使得它能够响应式
    const r = toRef(person.detail, 'a')
    console.log(r)
    function handleChange() {
      r.value++
    }
    return {
      person,
      handleChange,
    }
  },
}
</script>
```

> toRefs 与 toRef 功能一致 dandy 批量创建多个 ref 对象

```js
const p = toRefs（person）
```

## shallowReacitve

shallowReactive 只处理对象的最外层的属性的响应式

```js
<template>
  <div>
    {{ person }}
  </div>

  <button @click="handleClick">detail</button>
</template>

<script>
import { shallowReactive } from "vue";
// shallowReactive与shallowRef
export default {
  setup() {
    const person = shallowReactive({
      name: "join",
      age: 18,
      detail: {
        proxy: "detail",
      },
    });
    console.log(person);
    function handleClick() {
      // 只有浅层次的监听 不能监听到detail里面的对象
      person.detail.proxy = "ddd";
      // person.age++;
    }
    return {
      person,
      handleClick,
    };
  },
};
</script>
```

## shallowRef

只处理基本数据类型的响应式 不进行对象的响应式处理

如果监听的是一个对象属性 则不会调用 reactive 变成 proxy

> shallowRef 监听的如果是一个对象 不更改对象的属性值 则直接替换对象 也能响应式

```js
<template>
  <div>
    {{ person }}
  </div>
  <button @click="handleClick">handle click</button>
</template>

<script>
import { shallowRef } from "vue";
export default {
  setup() {
    const person = shallowRef({
      detail: "detial",
    });
    function handleClick() {
      person.value = { details: "change detail" };
    }
    return {
      person,
      handleClick,
    };
  },
};
</script>

<style>
</style>
```

## readonly

让一个响应式的对象变成一个只读的（深度监听）

## shallowReadOnly

让一个响应式的数据变为只读(对于对象来说就是最外的属性只读)

## toRaw

将一个`reactive`生成的响应式对象转为一个普通的对象（只能转`reactive`的对象 不能转换`ref`的对象）

读取响应式对象的普通对象 对这个普通对象的所有操作 不会引起页面刷新

```vue
<template>
  <div>
    {{ person }}
  </div>
  {{ a }}
  <button @click="handleClick">handle click</button>
</template>

<script>
import { reactive, toRaw } from 'vue'
export default {
  setup() {
    const demo = {
      ds: 'dd',
    }
    const person = reactive({
      detail: 'detial',
      d: demo,
    })
    // 将person.d 没有代理之前的对象返回
    const a = toRaw(person.d)
    function handleClick() {
      a.ds = '123'
      console.log(a)
      console.log(a === demo) // true toRaw返回的是proxy之前的对象
    }
    return {
      person,
      handleClick,
      a,
    }
  },
}
</script>
```

## markRaw

标记一个对象 使其不会成为响应式的对象

```vue
<template>
  <div>
    {{ p }}
  </div>

  <button @click="handleClick">handle click</button>
</template>

<script>
import { markRaw, reactive } from 'vue'
// markRaw 标记了person  使其不会变成一个响应式的对象
export default {
  setup() {
    const person = {
      name: 'join',
      age: 18,
    }
    const p = reactive(markRaw(person))
    function handleClick() {
      console.log(p) // 一个普通的Object对象
    }
    return {
      p,
      handleClick,
    }
  },
}
</script>
```

也可以让 reactive 的某一个对象不变成响应式对象

```vue
<template>
  <div>
    {{ p }}
  </div>
  <button @click="handleClick">handle click</button>
</template>

<script>
import { markRaw, reactive } from 'vue'
export default {
  setup() {
    const d = markRaw({
      hobby: 'play',
    })
    const person = {
      name: 'join',
      age: 18,
      d,
    }
    const p = reactive(person)
    function handleClick() {
      p.d.hobby = 12
      console.log(p)
    }
    return {
      p,
      handleClick,
    }
  },
}
</script>

<style></style>
```

> 应用场景： 有些值不应该设置为响应式 例如第三方库等等
>
> 当选让具有不可变数据源的大列表时 跳过响应式可以提高性能

## customerRef

一个自定义的 ref 对其依赖跟踪和更新触发进行显示的控制

> 实现一个防抖的功能

```vue
<template>
  <div>
    <input type="text" v-model="text" />
    {{ text }}
  </div>
</template>

<script>
// 实现一个防抖的功能
import { customRef } from 'vue'
export default {
  setup() {
    function myRef(val, delay = 1000) {
      let timer = null
      return customRef((track, trigger) => {
        return {
          get() {
            console.log('val value:', val)
            track() // 通知vue追踪数据的变化 是否进行依赖更踪
            return val
          },
          set(newVal) {
            console.log(' trigger template update' + newVal)
            timer && clearTimeout(timer)
            timer = setTimeout(() => {
              val = newVal
              trigger() // 触发template模版更新机制
            }, delay)
          },
        }
      })
    }
    const text = myRef('hello')
    return {
      text,
    }
  },
}
</script>
```

## provide 与 inject

实现祖先组件与后代组件间的通信

> 例如 在后代组件中修改背景颜色
>
> App.vue:

```vue
<template>
  <div class="app" :style="{ background: background.backgroundColor }">
    <HelloWorld />
  </div>
</template>

<script>
import { reactive, provide } from 'vue'
import HelloWorldVue from './components/HelloWorld.vue'
export default {
  name: 'App',
  components: {
    HelloWorld: HelloWorldVue,
  },
  setup() {
    const background = reactive({
      backgroundColor: '#fff',
    })
    function changeColor() {
      background.backgroundColor = '#ccc'
    }
    // 可以提供多个provide供后代组件使用
    provide('background', {
      state: background,
      action: changeColor,
    })
    return {
      background,
    }
  },
}
</script>
```

后代组件中:

```vue
<template>
  <button @click="handleChange">change background color</button>
</template>

<script>
import { inject } from 'vue'
export default {
  setup() {
    // inject 获取provide提供的数据
    const val = inject('background')
    function handleChange() {
      val.action()
    }
    return {
      handleChange,
    }
  },
}
</script>
```

## 响应式判断

- isRef:检查一个值是否为一个 ref 对象

- isReactive:检查一个对象是否是由 reactive 创建的响应式代理

- isReadonly: 检查一个对象是否是由 readonly 创建的只读代理

- isProxy:检查一个对象是否是由 reactive 或者 readonly 方法创建的代理

## Fragment

在 Vue2 中：组件必须有一个根标签

在 Vue3 中：组件可以没有根标签，内部会将多个标签包含在一个 Fragment 虚拟元素中，

> 好处：减少标签层级，减小内存占用

## Teleport

`Teleport` 能够将组件 html 结构移动到指定位置的技术

> 可以写 html 元素 或者是 css 选择器

```vue
<teleport to="body">
 <!-- canvas 移动到body元素下-->
    <canvas ref="canvas" class="canvas"></canvas>
  </teleport>
```

## Suspense

> 静态引入和异步引入的区别就是 静态引入需要等待文件引入完成才会去渲染模版
>
> 而异步引入无需去等待组件是否引入完成

```js
import Children from './components/child' // 静态引入

import { defineAsyncComponent } from 'vue' //异步引入
const Child = defineAsyncComponent(() => import('./components/child'))
```

```vue
<template>
  <Suspense>
    <!-- v-slot:default 默认显示的组件-->
    <template v-slot:default>
      <HelloWorldAsync />
    </template>
    <!-- v-slot:fallback 组件异步引入的过程中显示的组件-->
    <template v-slot:fallback>
      <div>加载中</div>
    </template>
  </Suspense>
</template>

<script>
import { defineAsyncComponent } from 'vue'
const HelloWorldAsync = defineAsyncComponent(() => import('./components/HelloWorld.vue'))
export default {
  name: 'App',
  components: {
    HelloWorldAsync,
  },
}
</script>
```

如果组件在 suspense 中 则组件可以使用 setup 返回一个 promise 的实例对象

```vue
<template>
  <WaterMaker />
  <br />
  {{ obj.x }}
  <br />
  {{ obj.y }}
</template>

<script>
import { ref } from 'vue'
import SignCanvas from './canvas.vue'
import WaterMaker from './waterMaker.vue'
import BaseUrl from './baseUrl.vue'
import useMouseDown from '../hooks/useMouseDown'
export default {
  components: {
    SignCanvas,
    WaterMaker,
    BaseUrl,
  },
  setup() {
    // 此时可以返回一个promise 的实例对象
    return new Promise((resolve, reject) => {
      let objRef = ref({ a: 1, b: 2 }) // 引用数据类型的对象是RefImpl 里面的value是Proxy对象
      const obj = useMouseDown()
      setTimeout(() => {
        resolve({
          objRef,
          obj,
          click() {
            objRef.value.a++
          },
        })
      }, 1000)
    })
  },
}
</script>
```

setup 改为 async await 的方式

```js
  async setup() {
    return await new Promise((resolve, reject) => {
      let objRef = ref({ a: 1, b: 2 }) // 引用数据类型的对象是RefImpl 里面的value是Proxy对象
      const obj = useMouseDown()
      setTimeout(() => {
        resolve({
          objRef,
          obj,
          click() {
            objRef.value.a++
          }
        })
      }, 1000)
    })
  }
```

## v3 全局 API 调整

将全局的 APl，即：vue.xxx 调整到应用实例（app）上

| 2.x 全局 API (Vue)        | 3.x 实例 API (app)          |
| ------------------------- | --------------------------- |
| Vue.config.xxxx           | app.config.xxxx             |
| Vue.config.production Tip | 移除                        |
| Vue.component             | app.component               |
| Vue.directive             | app.directive               |
| Vue.mixin                 | app.mixin                   |
| Vue.use                   | app.use                     |
| Vue.prototype             | app.config.globalProperties |

### 过度类名的修改

V2:

```css
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-leave,
.v-enter-to {
  opacity: 1;
}
```

V3:

```css
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-leave-from,
.v-enter-to {
  opacity: 1;
}
```

### 其他特性

1. 移除 keyCode 作为 v-on 的修饰符 不支持`config.keyCodes`

   v2 中：按下回车键触发的操作

```html
<div @keyup.13="handleDown"></div>
```

```js
Vue.config.keyCodes.enters = 13 // 自定义一个别名的按键
```

2. 移除`v-on.native`修饰符

   在 v3 中 如果要声明自定义事件 需要在子组件中声明 emits

   ```vue
   <components v-on:close="handleClose" v-on:click="handleClick" />
   ```

   ```vue
   <script>
   export default {
     // 此时没有指定click 则 close被认为是一个自定义事件 click被认为是一个原声事件
     emits: ['close'],
   }
   </script>
   ```

3. 移除过滤器(filer)

## 开发遇到的问题:

在 vue 中使用 jsx 语法 如果有警告

> Non-function value encountered for default slot. Prefer function slots

将最后的子组件换成默认插槽 并且以函数式的方法返回值

```ts
h(
  SubMenu,
  {
    key: item.key,
    title: item.name,
  },
  {
    default: () =>
      item.children &&
      item.children instanceof Array &&
      item.children.map((val) => {
        if (val.type === 'subMenu') {
          return useSubItem(val, deepNumber + 1, router)
        }
        return useMenuItem(val, deepNumber + 1, router)
      }),
  }
)
```

## setup 常用的 hooks

- useStore 获取 vuex 的 store

  [set up](https://v3.cn.vuejs.org/api/sfc-script-setup.html#%E4%BD%BF%E7%94%A8%E7%BB%84%E4%BB%B6)
