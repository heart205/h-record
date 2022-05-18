# TypeScript

## 记录 📝

## 基本类型

### 数组类型

1. 普通的数组类型

```ts
let fibonacci: number[] = [1, 1, 2, 3, 5]

// 数组的项中不允许出现其他的类型
// 不能将类型“string”分配给类型“number”。
let fibonacciTo: number[] = [1, 1, 2, 3, '5']

// 数组的一些方法的参数也会根据数组在定义时约定的类型进行限制
let fibonacciNumber: number[] = [1, 1, 2, 3, 5]

//类型“string”的参数不能赋给类型“number”的参数。
fibonacciNumber.push('8')

// 如果数组里面需要使用多个值 可以用type启用一个类型别名
type types = string | number

let fi: types[] = [1, 2, 3, 4, 5, '5']
```

2. 数组范型

```ts
let arrayGenerics: Array<string | number> = [1, 2, 3, 4, 5, '5']
```

3. 特殊的还可以使用一个接口去表示一个数组

   > 数字索引是 string 索引的子集 <br />

```ts
interface inter {
  [index: number]: number | string
}

let fibo: inter = [1, 123, 3213213, 321]
fibo[1] === fibo['1']
```

> 两种任意类型签名并存时，number 类型的签名指定的值类型必须是 string 类型的签名指定的值类型的子集,索引的类型为数字的时候 他的索引类型就必须是 number 类型或者 string 类型<br />

```ts
interface it {
  // 会报错 “number”索引类型“string | number”不能分配给“string”索引类型“object”。
  [index: number]: number | string
  [index: string]: object
}
```

### 类数组类型

类数组（Array-like Object）不是数组类型，比如 arguments,除了有数组的索引签名之外 还拥有其他的属性
类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等

```ts
interface likeObjArray {
  [index: number]: number
  length: number
  callee: Function
}

function sum(a: number, b: number): void {
  // let arg : number[]= arguments; //  类型“IArguments”缺少类型“number[]”的以下属性: pop, push, concat, join 及其他 27 项。
  let arg: likeObjArray = arguments
  // 注意不要写成
  // let arg : Array<likeObjArray> = arguments // 这里说明了 arg是一个二维数组 里面的每一项 都是likeObjArray的类数组
  let args: Array<likeObjArray> = Array(arguments)
}
```

IArguments 是 Typescript 已经定义好了的类型

```ts
interface IArguments {
  [index: number]: any
  length: number
  callee: Function
}
```

## 函数

## 接口 interface

### 接口声明函数类型

```ts
interface func {
  (): void
  timer?: number
}

const func: func = () => {
  console.log(func.timer)
}

console.log(func())
```

## 类

## keyof 操作符

> keyof 不仅获取的是当前类型的键 还会获取当前元素的原型链上的键

1. 对基本类型使用：

```ts
// type numberKey = "toString" | "toFixed" | "toExponential" | "toPrecision" | "valueOf" | "toLocaleString"
type numberKey = keyof number

// type stringKey = number | typeof Symbol.iterator | "toString" | "charAt" | "charCodeAt" | "concat" | "indexOf" | "lastIndexOf" | "localeCompare" | "match" | "replace" | "search" | "slice" | ... 36 more ... | "at"
// number | typeof Symbol.iterator 是因为是由字符数组组成  数组的索引类型就有 number | typeof Symbol.iterator
type stringKey = keyof string

// type booleanKey = "valueOf"
type booleanKey = keyof boolean

// type symbolKey = typeof Symbol.toPrimitive | typeof Symbol.toStringTag | "toString" | "valueOf" | "description"
type symbolKey = keyof symbol
```

> keyof string 的解释： 涉及一些条件分发的知识: [k] extends [...] 后续有说

```ts
type K = keyof string
// true
type isString = [K] extends [
  | number
  | typeof Symbol.iterator
  | 'length'
  | 'constructor'
  | 'anchor'
  | 'big'
  | 'blink'
  | 'bold'
  | 'charAt'
  | 'charCodeAt'
  | 'codePointAt'
  | 'concat'
  | 'endsWith'
  | 'fontcolor'
  | 'fontsize'
  | 'fixed'
  | 'includes'
  | 'indexOf'
  | 'italics'
  | 'lastIndexOf'
  | 'link'
  | 'localeCompare'
  | 'match'
  | 'matchAll'
  | 'normalize'
  | 'padEnd'
  | 'padStart'
  | 'repeat'
  | 'replace'
  | 'replaceAll'
  | 'search'
  | 'slice'
  | 'small'
  | 'split'
  | 'strike'
  | 'sub'
  | 'substr'
  | 'substring'
  | 'sup'
  | 'startsWith'
  | 'toString'
  | 'trim'
  | 'trimStart'
  | 'trimLeft'
  | 'trimEnd'
  | 'trimRight'
  | 'toLocaleLowerCase'
  | 'toLocaleUpperCase'
  | 'toLowerCase'
  | 'toUpperCase'
  | 'valueOf'
  | 'at'
]
  ? true
  : false
```

2. 对数组使用

```ts
type arrKey = keyof []

// true
type ans = [arrKey] extends [number | string | symbol] ? true : false
const array: arrKey = 110 // 传入string或者symbol报错
```

> 对于 keyof [] 的解释: [在线预览](https://www.typescriptlang.org/play?#code/C4TwDgpgBAKlC8UDWEQHsBmUDaBdAUPqJFAM7ABOCyqmZlAlgHYDmhx0DpM40i2MXFAgAPYBCYATUjnxR5UJgFcAtgCMIVAD7yAyiHVoANgDoG4igENgabVABERiS2AALe1B32AxmibkKJW8bCg8vXyZva3s5BXC0MBAAdXNXZjCHDAYjIwz7LKkYhU9M5kkASSlRPKNLckrJUQB5DDywBLalUndY+S8KCAA3TVIIPO6GDGA8pX80qfGjBm8x3pL7Ultp9dIwJZW85m8jJUbSQ6qRFqK4hwArNHT1lBBz9YlGCDevQcsTr5ufUytgAopZvO51lkjBY8hhatsvPDrABZSxgPIqdGA97DCggexaDZoFRjIkDSRBVbFfoQSkrABKDBYrkR9hsABk0FEnLpGKwwuy0HyKMwWIT7NE1kiyhy6tMiQVJHL6pcYkIAPxQShKaAALigGD+o3wQA)

```ts
type T = keyof []

type str = keyof string
// true 高版本的ts 存在symbol
type isType = [T] extends [
  | number
  | Symbol.iterator
  | 'length'
  | 'constructor'
  | 'concat'
  | 'copyWithin'
  | 'fill'
  | 'find'
  | 'findIndex'
  | 'lastIndexOf'
  | 'pop'
  | 'push'
  | 'reverse'
  | 'shift'
  | 'unshift'
  | 'slice'
  | 'sort'
  | 'splice'
  | 'includes'
  | 'indexOf'
  | 'join'
  | 'keys'
  | 'entries'
  | 'values'
  | 'forEach'
  | 'filter'
  | 'flat'
  | 'flatMap'
  | 'map'
  | 'every'
  | 'some'
  | 'reduce'
  | 'reduceRight'
  | 'toLocaleString'
  | 'toString'
  | 'at'
  | 'findLast'
  | 'findLastIndex'
]
  ? true
  : false
```

1. 对对象使用

   > JavaScript 对象的属性名会被强制转为一个字符串<br />

```ts
type Arrayish = { [n: number]: unknown }
// type A = number
type A = keyof Arrayish
type Mapish = { [k: string]: boolean }
// type M = string | number
type M = keyof Mapish
```

TypeScript 支持 symbol 类型的属性名 因此

```ts
type a = keyof any // number | string | symbol
// 在范型中也是 T 相当于了any
function useKey<T, K extends keyof T>(o: T, k: K) {
  // ...
}
```

## typeof 操作符

TypeScript 添加的 typeof 方法可以在类型上下文（type context）中使用，用于获取一个变量或者属性的类型
并且对标识符（比如变量名）或者他们的属性使用 typeof 才是合法的

1. 对对象使用 typeof

```ts
const person = {
  name: 'tom',
  [1]: 'John',
}
type personT = typeof person
/*
 * type personT = {
 *   name: string;
 *   1: string;
 * }
 */
```

2. 对数组使用 typeof

```ts
const arr = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, '123']

// type arrT = (string | number)[]
type arrT = typeof arr

// type arrV = string | number
type arrV = typeof arr[number]
```

3. 对函数使用 typeof

```ts
function identity<Type>(arg: Type): Type {
  return arg
}
// type result = <Type>(arg: Type) => Type
type result = typeof identity
```

4. 对枚举使用 typeof

```ts
const enum UserResponse {
  No = 0,
  Yes = 1,
}

// data { No: number, Yes: number }
type data = typeof UserResponse
```

## 索引访问类型

通过索引访问类型 可以查找到其他类型或者元素上的特定的属性

> `['taobao', 'timal', 'alipay'] as const` 表示为只读数组 ’taobao', 'timal', 'alipay'
> 因为只读数组的值是确定的 才能用 typeof X[keyof typeof X] // 获取

索引类型操作对象:

```ts
type Person = { age: number; name: string; alive: boolean }
// type value = string | number | boolean
type value = Person[keyof Person] // keyof 获取key
// age | name | alive
type key = keyof Person
```

索引类型操作数组:

```ts
const app = ['taobao', 'timal', 'alipay'] as const
type a = typeof app[number]
// a = taobao | timal | alipay
// 如果传入string 会报错
// 但是会转成string 因此这里的a获取的是app的索引类型以及类的全部属性

//  number | typeof Symbol.iterator | "toString" | "charAt" |
//  "charCodeAt" | "concat" | "indexOf" | "lastIndexOf" | "localeCompare" | "match" |
//  "replace" | "search" | "slice" | ... 36 more ... | "at"
type key = keyof a
```

索引操作元组:

```ts
type ap = [string, number, number, number, number, number, number, number]
// 取值共有的值
// type as = "toString" | "valueOf"
type as = keyof ap[number]
```

## 条件类型

条件类型的写法类似于 javascript 中的三元表达式

> 注意 unknow 在没有类型收窄的情况下不能赋值给其他的类型

```ts
type MergeObj<T extends Record<string, unknown>, U extends Record<string, unknown>> = {
  [K in keyof T | keyof U]: K extends keyof T ? T[K] : K extends keyof U ? U[K] : never
}
```

### 在条件类型中进行类型推断

使用`infer`关键字可以在条件类型中推断类型 然后在后续的判断中引用推断的结果

> 利用类型推断实现 queryParameters 的推断

```ts
type Merge<otherParam extends object, Param extends object> = {
  [key in keyof otherParam | keyof Param]: key extends keyof otherParam
    ? otherParam[key]
    : key extends keyof Param
    ? Param[key]
    : never
}

type queryParameters<T extends string> = T extends `${infer key}=${infer value}`
  ? T extends `${infer ks}=${infer kv}&${infer r}`
    ? Merge<{ [k in ks]: kv }, queryParameters<r>>
    : { [k in key]: value }
  : never
type foo = queryParameters<'age=1&obj=2&name=tom'>
```

### 条件类型分发

在范型中使用条件类型的时候 如果传入的是一个联合类型，他就会变成分发的

> 例如这里将联合类型的`string|number` 分发成一个`string[] | number[]` 的类型

```ts
type toArray<T> = T extends unknown ? T[] : never
// type union = string[] | number[]
type union = toArray<string | number>

// 这里的执行过程是
// string | number extends unknown
// 分别执行了 string extends unknown ? string[] : never | number extends unknown ? number[] : never
// string[] | number[]
```

如果要阻止联合条件类型进行条件分发的话 可以使用方括号将范型包裹

```ts
type toArray<T> = [T] extends unknown ? T[] : never
// type union = (string | number)[]
type union = toArray<string | number>
```

因为 `string | number extends unknown`的值是为 true 的 所以这里的 unknown 没有用方括号包裹<br />
但是如果换一种方式 会变成 never 因为 `[T] extends string | [T] extends number` 的值都是 never

```ts
type toArray<T> = [T] extends string | number ? T[] : any
// type union = never
type union = toArray<string | number>
```

所以 <b>如果要阻止联合条件类型进行条件分发 尽量将两个都用[] 包裹</b>

```ts
type toArray<T> = [T] extends [string | number] ? T[] : any
// type union = (string | number)[]
type union = toArray<string | number>
```

## tsconfig 配置文件

<a href="./tsconfig.html">点击跳转</a>
