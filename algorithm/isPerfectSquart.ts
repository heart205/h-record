/**
 * @author heart
 * @description 有效的完全平方数
 * @Date 2022-05-22
 */
export function isPerfectSquare(num: number): boolean {
  // 边界情况
  if (num === 1) return true
  let left = 1,
    middle = 0,
    right = num,
    result = -1 // 初始化

  while (left <= right) {
    middle = Number.parseInt(String(left + (right - left) / 2))
    if (middle * middle <= num) {
      // 最后出循环的时候 一定是 middle * middle > num
      result = middle
      left = middle + 1
    } else {
      right = middle - 1
    }
  }
  return result * result === num
}
