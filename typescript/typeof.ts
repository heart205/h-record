/**
 * @author heart
 * @description typeof
 * @Date 2022-05-08
 */
// 类型  undefined null

// ---------------------------------------------------------------
// ? interface和 class中的typeof 的区别 typeof获取的是当前变量对应的类型 keyof获取的是实例对应的类型的属性名的联合
// ? class { a = 1} a是实例的属性名 因此 keyof可以获取到a
// ? 如果用了 typeof A 则 此时的实例是一个 new (): A;[props: string | number | symbol]: any} 类型
/**
 * @desc: 对 class使用 typeof
 */
class A {}
type objTypeOf = typeof A

type a = { new (): A; [props: string | number | symbol]: any }
type isType = [a] extends [objTypeOf] ? true : false

// ---------------------------------------------------------------

/**
 * @desc: 对 interface使用 typeof 与 class相同
 */
interface A {
  a: string
  b: number
}
type objTypeOf2 = typeof A
type a1 = { new (): A; [props: string | number | symbol]: any }
type isType1 = [a1] extends [objTypeOf2] ? true : false
// 如果要获取 a b 的值 则需要使用keyof

type attributeA = keyof A // "a" | "b"
const objA = 'b'

// ---------------------------------------------------------------

/**
 * @desc:对函数使用 typeof
 */
function identity<Type>(arg: Type): Type {
  return arg
}

type result = typeof identity
// type result = <Type>(arg: Type) => Type

// ---------------------------------------------------------------

/**
 * @desc: 基本类型使用typeof
 */
const a = '1'
type numberType = typeof a // '1'

// ...

// ---------------------------------------------------------------

/**
 * @desc: 对枚举成员使用typeof
 */
enum users {
  admin = 'admin',
  user = 'user',
}

type userType = typeof users // ! {user: user.user, admin: user.admin} 注意 虽然user.admin的类型是string 但是user的类型是user.user 所以只能由user这个枚举类赋值

const obj: { admin: users.admin; user: users.user } = {
  admin: users.admin,
  user: users.user,
}
const userTypeObj: userType = obj

// TODO: 这里为解释:
type c = typeof users

type isT = [{ admin: users.admin; user: users.user }] extends [c] ? true : false

enum UserResponse {
  No = '0',
  Yes = 1,
}

const user2: typeof UserResponse = {
  No: UserResponse.No, // 字符串只能用 UserResponse.No赋值
  Yes: 3,
}

// ---------------------------------------------------------------

/**
 * @desc: undefined
 */

type undefinedType = typeof undefined

// ---------------------------------------------------------------

/**
 * @desc: 数组
 */

const arr2 = ['1', '2', '3']
type arrType = typeof arr2 // string[] 如果数组有多个值 则是他们的联合类型 例如（string | number）[]

// ? 此时keyof可以获取他身上的key
type arrKey = keyof arrType
const arr23: arrKey = 'concat'

// Object.getOwnPropertyNames([].__proto__).map(val => `'${val}'`).join('|') 数组身上的类型 加上number 和 | Symbol.iterator

// true
type arrKey1 = [
  // @ts-ignore
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
  | number
] extends [arrKey]
  ? true
  : false

// ---------------------------------------------------------------

/**
 * @desc: 元祖 tuple
 */
const tuple: readonly [number, string] = [1, '2'] as const
type tupleType = typeof tuple // readonly  [number, string]

const tuple1: tupleType = [2, '3']

// 数组转元祖的操作: 数组后面加 as const
const arrTemp = [1, 2, 3] as const // readonly [1, 2, 3]

type as = typeof arrTemp

const arr1: as = [1, 2, 3] // 类型只能是 [1,2,3]

// 获取 1 | 2 | 3
type arr1Keyof = typeof arr1[number] // 1 | 2 | 3

// ---------------------------------------------------------------

/**
 * 索引访问类型（Indexed Access Types）
 */
