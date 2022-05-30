/**
 * @author heart
 * @description
 * @Date 2022-05-30
 */
// any 类型与任何类型的交叉都是 any，也就是 1 & any 结果是 any
// type isAny<T> = T extends 1 ? false : T extends 1 & any ? true : false
type isAny<T> = T extends 1 & any ? true : false

type s = isAny<1>

// 先进行条件类型分发, 后收窄类型 如果收窄类型相等 则说明是一个元素
type isUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never

// type union = isUnion<1 | 3>

// never 在条件类型中也比较特殊，如果条件类型左边是类型参数，并且传入的是 never，那么直接返回 never
type isErrorNever<T> = T extends never ? true : false
// type s = isErrorNever<never> // type s = never
type isNever<T> = [T] extends [never] ? true : false

// any 在条件类型中也比较特殊，如果类型参数为 any，会直接返回 trueType 和 falseType 的合并
type TestAny<T> = T extends number ? 1 : 2
// type s = TestAny<any> // type s = 1 | 2

type isEquals<T, U> = (<K>() => K extends T ? 1 : 2) extends <R>() => R extends U ? 1 : 2 ? true : false

type isTuple<T> = T extends readonly [...arr1: infer rest]
  ? isEquals<rest['length'], number> extends true
    ? false
    : true
  : never

export {}
