/**
 * @author heart
 * @description keyof 操作符的理解
 * @Date 2022-05-08
 * 交叉类型会把同一类型做合并，不同类型舍弃
 */
// 类型 number string boolean symbol undefined null enum tuple function class interface

/**
 * @desc: keyof 会返回该对象属性名组成的一个字符串或者数字字面量的联合
 */

/**
 * @desc: keyof number | string | boolean | symbol 都同理 返回一个包装类的集合
 */

type typeNumber = keyof 1 // 返回的是Number包装类上的隐式原型链的属性名集合
const number = Number(1)
type typeNumberObj = keyof number
type isType = [typeNumber] extends [typeNumberObj] ? true : false // true
//   Object.getOwnPropertyNames(Number(1).__proto__).map((val) => `'${val}'`).join('|') // "toFixed" | "toExponential" | "toPrecision" | "toString" | "valueOf" | "toLocaleString"

// ---------------------------------------------------------------

/**
 * @desc: 对象使用keyof 对象将不会取到原型链上的属性名
 */

type objKeyof = keyof { a: string; b: number } // "a" | "b"
const obj: objKeyof = 'a'
const detail = {
  a: 'a',
  b: 1,
}
type objKeyof2 = keyof typeof detail // "a" | "b"

// ---------------------------------------------------------------

/**
 * @desc: keyof null undefined 只能返回never
 */
type objNull = keyof null
type objUndefined = keyof undefined

// ---------------------------------------------------------------

/**
 * @desc: function 中使用keyof 去值的是他的自定义的属性名的联合类型
 * * 查看一个function的自定义属性名 Object.getOwnPropertyNames(func) (不包括原来自带的name length prototype 属性等)
 */
function func() {}
func.timer = 1
type funcKeyof = keyof typeof func

// ---------------------------------------------------------------

/**
 * @desc: 对一个类进行class操作 和函数相似
 * keyof 获取的是实例的属性名组成的联合
 */
class A {
  static as: number
  a = 1
  b = 2
}
type classKeyof = keyof A
const aObj: classKeyof = 'a' // "a" | "b"

// 这里因为 typeof A 有了一个新的 对象类型为  {new (): A; [props: string | number | symbol]: any} keyof 取得了prototype字段
// 如果A的static 新增类型
A.as = 1
// type classKeyof2 = keyof typeof A // 'prototype'
type classKeyof2 = keyof typeof A // 'prototype' | 'as'

// ---------------------------------------------------------------

/**
 * @desc: interface
 */
interface I {
  a: string
  b: number
}
type interfaceKeyof = keyof I
const iObj: interfaceKeyof = 'a' // "a" | "b"

// ---------------------------------------------------------------

/**
 * @desc: 对元祖使用keyof keyof 获取的是key下标 和 数组原型链的key
 *  元祖会限长度
 */
const arr: readonly [number, string] = [1, '2'] as const
type tupleKeyof = keyof [string, number]
const tuple: tupleKeyof = '0' // "0" | "1" | 0 | 1

// ---------------------------------------------------------------

/**
 * @desc: 对数组 和任意下表 数组原型链的key
 * 数组限制了key的下标类型只能为number
 */
const arr2 = [1, 2, 3]
type arrKeyof = keyof typeof arr2
// const arr3: arrKeyof = '0' // ! error
const arr3: arrKeyof = 'length'

// ---------------------------------------------------------------
/**
 * @desc: 对enum使用
 */
enum E {
  A = 1,
  B = 2,
}
type enumKeyof = keyof E // "toString" | "toLocaleString" | "toFixed" | "toExponential" | "toPrecision" | "valueOf"

// keyof enum 会对 enum 中的值进行交叉类型操作
enum E1 {
  A = 1,
  B = '2',
}
type enumKeyof1 = keyof E1 // "toString" | "valueOf" (keyof string & keyof number)

// ---------------------------------------------------------------

/**
 * @desc: 范型的keyof
 */
export function useKey<T, K extends keyof T>(obj: T, key: K) {
  // const name: string = key // ! error 不能将类型“undefined”分配给类型“string | number | symbol”。
  console.log(name)

  // T 的类型相当于any
  type anyT = keyof any
  // let b: anyT = undefined // ! error 不能将类型“undefined”分配给类型“string | number | symbol”。
}

// 如果只使用 string类型的变量 则可以这样写:
export function useKey2<T, K extends Extract<keyof T, string>>(obj: T, key: K) {}

// Extract<T, U> ： 从t中提取u的类型
// ? type Extract<T, U> = T extends U ? T : never;

// 类中使用keyof
class persons {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  change() {
    console.log('change')
  }
}

type personsKey = keyof persons

const personsObj: personsKey = 'change'
// ---------------------------------------------------------------

// 索引也可以做变化，用 as 运算符，叫做重映射
type MapType<T> = {
  [Key in keyof T as `${Key & string}${Key & string}${Key & string}`]: [T[Key], T[Key], T[Key]]
}

type mapObj = MapType<{ a: 1 }>
