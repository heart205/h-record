/**
 * @author heart
 * @description 算数平方根
 * @Date 2022-05-21
 * 0 <= x <= 231 - 1
 */
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
