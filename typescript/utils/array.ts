/**
 * @author heart
 * @description utils
 * @Date 2022-05-29
 */
// any 和 unknown 的区别： any 和 unknown 都代表任意类型，
// 但是 unknown 只能接收任意类型的值，而 any 除了可以接收任意类型的值，也可以赋值给任意类型（除了 never）。
// 类型体操中经常用 unknown 接受和匹配任何类型，而很少把任何类型赋值给某个类型变量。

// 获取数组的第一个元素
type getArrayFirst<T extends unknown[]> = T extends [infer U, ...unknown[]] ? U : never

// 获取数组的最后一个元素
type getArrayLast<T extends unknown[]> = T extends [...unknown[], infer U] ? U : never

// 去掉第一个元素的数组
type popArrayFirst<T extends unknown[]> = T extends [infer U, ...infer rest] ? rest : never

// 去掉最后一个元素的数组
type popArrayLast<T extends unknown[]> = T extends [...infer head, infer U] ? head : never
