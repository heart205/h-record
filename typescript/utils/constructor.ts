/**
 * @author heart
 * @description 构造器
 * @Date 2022-05-29
 */

// 构造器类型可以用interface声明: 使用 new():xx的语法
interface p {
  name: string
}
interface pConstructor {
  name: string
  new (name: string): p
}
class A {
  constructor() {}
}
// 获取构造器类型的返回值类型
type getInstanceType<T extends new (...args: any[]) => unknown> = T extends new (...args: unknown[]) => infer r
  ? r
  : never
type T = getInstanceType<typeof A>
type T1 = getInstanceType<pConstructor>

// 获取构造器类型的参数类型
type getInstanceParameters<T extends new (...args: any[]) => unknown> = T extends new (...args: infer r) => unknown
  ? r
  : never

type T2 = getInstanceParameters<pConstructor>
export {}
