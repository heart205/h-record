export declare function PromiseAll<T extends any[]>(
  args: readonly [...T]
): Promise<{
  -readonly [P in keyof T]: T[P] extends Promise<infer r> ? r : T[P]
}>

// 因此 promise.All 方法
// TODO: T extends [] 阻止条件类型分发
export declare function PromiseAll<T extends [] | readonly any[]>(
  args: T
): Promise<{
  -readonly [P in keyof T]: T[P] extends Promise<infer r> ? r : T[P]
}>

// const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])

declare function case1<T extends [] | readonly any[]>(args: T): T

console.log(typeof case1([1, 2, Promise.resolve(3)]))

export {}
