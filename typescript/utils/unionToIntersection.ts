/**
 * @author heart
 * @description 联合类型和交叉类型的转变 以及逆变 协变的概念
 * @Date 2022-05-30
 */

/**
 * 类型之间是有父子关系的，更具体的那个是子类型，比如 A 和 B 的交叉类型 A & B 就是联合类型 A | B 的子类型，因为更具体。
 * 如果允许子类型赋值给父类型，就叫做协变。
 * 如果允许父类型赋值给子类型，就叫做逆变。
 */

// 联合类型转交叉类型
type unionToInsertion<T> = (T extends T ? (x: T) => unknown : never) extends (x: infer r) => unknown ? r : never

type asd = unionToInsertion<{ a: 1 } | { b: 2 }>
// 如果函数没有括号 则会变成最后一个unknown 去 extends 后面的函数
type fun = (x: unknown) => unknown extends (x: infer r) => unknown ? true : never

// 提取索引类型的可选索引
type GetOptional<T extends Record<string, unknown>> = {
  [k in keyof T as {} extends Pick<T, k> ? k : never]: T[k]
}

// type val = GetOptional<{
//   name: string
//   age?: number
// }>

// 获取必填写
type GetRequired<T extends Record<string, unknown>> = {
  [k in keyof T as {} extends Pick<T, k> ? never : k]: T[k]
}
// type val = GetRequired<{
//   name: string
//   age?: number
// }>

// 过滤索引签名
// 索引签名不能构造成字符串字面量类型，因为它没有名字，而其他索引可以。
type removeIndexSignature<T extends Record<string, unknown>> = {
  [p in keyof T as p extends `${infer r}` ? r : never]: T[p]
}

// keyof 只能拿到 class 的 public 索引，private 和 protected 的索引会被忽略。
class Person {
  public name1: string
  protected age: number
  private hobbies: string[]
  constructor() {
    this.name1 = 'name'
    this.age = 18
    this.hobbies = ['a', 'b']
  }
}

// Person.asd = 'asd'
type classPublicProps<T extends Record<string, unknown>> = {
  [k in keyof T]: T[k]
}
// 这里注意 typeof Person 和直接Person
// typeof Person访问的就是Person的静态的一写属性了
// 直接person就是Person的实例
// type val = classPublicProps<Person>

export {}

// TODO: 联合类型转元组

// 利用函数的逆变性转换联合类型为元组类型

type mergeTuple<T extends any[], U> = [...T, U]
type unionToInsertion1<T> = (T extends T ? (x: () => T) => unknown : never) extends (x: infer r) => unknown ? r : never
type getUnionLast<T> = unionToInsertion1<T> extends { (...args: any[]): infer R } ? R : never
type unionToTuple<Union, result extends any[] = [], Last = getUnionLast<Union>> = [Union] extends [never]
  ? result
  : unionToTuple<Exclude<Union, Last>, mergeTuple<result, Last>>

const case1 = {
  name: 'name',
  age: 18,
}

;(Object.keys(case1) as unionToTuple<keyof typeof case1>).forEach((val) => {
  if (val === 'name') {
    case1[val] = '2'
  } else {
    case1[val] = 2
  }
})
