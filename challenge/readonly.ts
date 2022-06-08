/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @author heart
 * @description readonly
 * @Date 2022-06-08
 */

type MyReadonly2<T, K> = {
  readonly [k in keyof T as k extends K ? k : never]: T[k]
} & {
  readonly [k in keyof T as k extends K ? never : k]: T[k]
}

// interface 会接口合并
interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Todo {
  name: string
}

// -------------
// deepReadOnly
type DeepReadonly<T> = {
  readonly [k in keyof T]: T[k] extends object
    ? T[k] extends (...args: any[]) => unknown
      ? T[k]
      : DeepReadonly<T[k]>
    : T[k]
}
type X = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        }
      ]
    }
  }
}
type case1 = DeepReadonly<X>
export {}
