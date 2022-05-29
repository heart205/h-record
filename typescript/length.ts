/**
 * @author heart
 * @description 数组 长度实现加减乘除
 * @Date 2022-05-29
 */
// 数组的length可以构建
type length = []['length'] // 0
// 构建数字
type buildLength<T extends number, val extends unknown = unknown, arr extends unknown[] = []> = arr['length'] extends T
  ? arr
  : buildLength<T, val, [val, ...arr]>

// 加法
type Add<T extends number, U extends number> = [...buildLength<T>, ...buildLength<U>]['length']

// 减法
// TODO:还不完善 不能添加负号
type subtract<T extends number, U extends number> = buildLength<T> extends [
  ...arr1: buildLength<U>,
  ...arr2: infer rest
]
  ? rest['length']
  : never

// 乘法就是多个加法结果的累加
type multiply<
  T extends number,
  U extends number,
  arr extends unknown[] = [],
  result extends unknown[] = []
> = arr['length'] extends U ? result['length'] : multiply<T, U, [unknown, ...arr], [...buildLength<T>, ...result]>
// 第二种实现:
type multiply2<T extends number, U extends number, result extends unknown[] = []> = U extends 0
  ? result['length']
  : multiply2<T, subtract<U, 1>, [...buildLength<T>, ...result]>

// 减法
type divide<
  T extends number,
  U extends number,
  arr extends unknown[] = buildLength<T>,
  result extends unknown[] = []
> = arr['length'] extends 0
  ? result['length']
  : arr extends [...arr1: buildLength<U>, ...arr2: infer rest]
  ? divide<T, U, [...rest], [...result, unknown]>
  : []

// 减法第二种
type divide2<T extends number, U extends number, result extends unknown[] = []> = T extends 0
  ? result['length']
  : divide2<subtract<T, U>, U, [unknown, ...result]>
export {}
