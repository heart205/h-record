/**
 * @author heart
 * @description 算数平方根
 * @Date 2022-05-21
 */
// TODO: 可以优化 优化代码在下:
export function mySqrt(x: number): number {
  if (x === 0 || x === 1) return x
  let left = 1,
    right = x,
    middle = 0
  while (left <= right) {
    middle = Math.floor(left + (right - left) / 2)
    if (middle * middle === x) {
      return middle
    } else if (middle * middle < x) {
      left = middle + 1
    } else {
      right = middle - 1
    }
  }
  // 能够从这里出来的结果 只能是 left > right 并且是 0 < left < x
  // 相当于要求的 Math.ceil(Math.sqrt(x)) 向上取整了 因此 要 - 1
  return left - 1
}

export function refectoryMySqrt(x: number): number {
  if (x === 0 || x === 1) return x
  let left = 1,
    right = x,
    middle = 0,
    result = -1
  while (left <= right) {
    middle = Math.floor(left + (right - left) / 2)
    if (middle * middle <= x) {
      result = middle
      left = middle + 1
    } else {
      right = middle - 1
    }
  }
  // 能够从这里出来的结果 只能是 left > right 并且是 0 < left < x
  // 相当于要求的 Math.ceil(Math.sqrt(x)) 向上取整了 因此 要 - 1
  return result
}

export function mySqrt2(x: number): number {
  const data = Math.exp(0.5 * Math.log(x))
  // 由于浮点数的精度丢失 最终的值一定是比 正确的值要小的
  //  19.9 * 100 = 1989.9999999999998
  const result = Number.parseInt(String(data))
  return (result + 1) * (result + 1) <= x ? result + 1 : result
}
