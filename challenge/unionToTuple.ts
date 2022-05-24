/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @author heart
 * @description 联合类型转元组
 * @Date 2022-05-24
 */
type union = 'hearts' | 'diamonds' | 'spades' | 'clubs'
// @see:https://stackoverflow.com/questions/55127004/how-to-transform-union-type-to-tuple-type/55128956#55128956

// oh boy don't do this
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never
type LastOf<T> = UnionToIntersection<T extends any ? () => T : never> extends () => infer R ? R : never

// TS4.0+
type Push<T extends any[], V> = [...T, V]

// TS4.1+
type TuplifyUnion<T, L = LastOf<T>, N = [T] extends [never] ? true : false> = true extends N
  ? []
  : Push<TuplifyUnion<Exclude<T, L>>, L>

type t = TuplifyUnion<union> // ["a", "b", "c"]
export {}
type UnionToInterFunction<U> = (U extends any ? (k: () => U) => void : never) extends (k: infer I) => void ? I : never
