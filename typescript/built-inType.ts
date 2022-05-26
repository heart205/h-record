/**
 * @author heart
 * @description 内置类型
 * @Date 2022-05-25
 */

// ? 映射类型
// #region
// pick<T,K> 挑选映射

type myPick<T, K extends keyof T> = {
  [p in K]: T[p]
}

// Partial<T> 将T中的所有属性值转为可选的映射
type MyPartial<T> = {
  [p in keyof T]?: T[p]
}

// TODO:实现将对象中某个特定的属性变成可选的
// 这样会丢失类型
type mergeObj<
  T extends Record<Extract<keyof any, string>, unknown>,
  U extends Record<Extract<keyof any, string>, unknown>
> = {
  [k in keyof T | keyof U]: k extends keyof T ? T[k] : k extends keyof U ? U[k] : never
}
type add = mergeObj<{ a: '1' }, { b: '1' }>

// type MyPartial2<T, K extends keyof T> = mergeObj<Pick<T, K>, Omit<T, K>>
type MyPartial2<T, K extends keyof T> = Pick<T, K>
// type MyPartial2<T, K extends keyof T> = Omit<T, K>
type adds = MyPartial2<{ a?: '1'; b: 2 }, 'a'>

// Required<T> 必选映射
type myRequired<T> = {
  [p in keyof T]-?: T[p]
}

// readonly 只读映射
type myReadonly<T> = {
  readonly [p in keyof T]: T[p]
}

// 属性映射
type myRecord<k extends keyof any, T> = {
  [p in k]: T
}

//#endregion

//#region

// 条件类型

// Extract<T, U> 公共类型 提取公共类型
// type Extract<T, U> = T extends U ? T : never;

const add: Extract<number, number> = 1 + 2

// Exclude<T, U> 排除类型
// type Exclude<T, U> = T extends U ? never : T;

// Omit 反选类型
// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
interface User {
  name: string
  age?: number
  height?: number
  weight: number
}

type OmitUser = Omit<User, 'name' | 'age'>
// 等同于:
// type OmitUser = {
//   height?: number
//   weight: number
// }

//NonNullable<T> 去除null和undefined
// type NonNullable<T> = T extends null | undefined ? never : T;

//Parameters<T> 参数类型
// type Parameters<T> = T extends (...args: infer P) => any ? P : never;

// ReturnType<T> 返回函数的返回值类型
// type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// InstanceType<T> 返回构造函数的实例类型
// type InstanceType<T> = T extends new (...args: any[]) => infer R ? R : never;

//@see:https://github.com/chenxiaochun/blog/issues/67
