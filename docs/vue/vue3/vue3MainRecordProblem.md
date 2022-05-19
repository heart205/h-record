## template 上面添加 ref

1. 在 template 中的写法跟 vue2 一样，给元素添加个 ref='xxx'

2. 在 setup 中，先创建一个响应式数据，并且要把响应式数据暴露出去
3. 当元素被创建出来的适合，就会给对应的响应数据赋值
4. 当响应式数据被赋值之后，就可以利用生命周期方法，在生命周期方法中获取对应的响应式数据，即 DOM 元素

## vue2 和 vue3 的生命周期差别

1. vue3 是先需要挂载(`mount('#app')`) 才开始执行生命周期钩子的 而 vue2 是创建了 vue 实例对象的时候就直接开始先走`created beforeCreated`两个钩子 之后才挂载(`mount('#app')`)

## v-if 和 v-for

当它们处于同一节点，`v-if` 的优先级比 `v-for` 更高

这意味着 `v-if` 将没有权限访问 `v-for` 里的变量：