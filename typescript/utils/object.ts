/**
 * @author heart
 * @description
 * @Date 2022-05-29
 */

type deepReadonlyResult<T extends Record<string, unknown>> = T extends any
  ? {
      readonly [k in keyof T]: T[k] extends Record<string, unknown>
        ? T[k] extends Function
          ? T[k]
          : deepReadonlyResult<T[k]>
        : T[k]
    }
  : never

//  ts 只有类型被用到的时候才会做类型计算
type obj = {
  a: {
    b: {
      c: {
        f: () => 'dong'
        d: {
          e: {
            guang: string
          }
        }
      }
    }
  }
}
type result = deepReadonlyResult<obj>
export {}
