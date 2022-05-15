/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @author heart
 * @description
 * @Date 2022-05-15
 */

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>

type deepPromise<T> = T extends Promise<infer u> ? deepPromise<u> : T
type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer r> ? deepPromise<r> : never

type result1 = MyAwaited<Z> // string | number
type result2 = MyAwaited<X> // string
type result3 = MyAwaited<Y> // { field: number }
// type error = MyAwaited<number>
