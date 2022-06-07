/**
 * @author heart
 * @description 1037. 有效的回旋镖
 * @Date 2022-06-08
 */
export function isBoomerang(points: number[][]): boolean {
  const x1 = points[2][0] - points[0][0]
  const y1 = points[2][1] - points[0][1]

  const x2 = points[2][0] - points[1][0]
  const y2 = points[2][1] - points[1][1]

  // return y1 * x2 !== y2 * x1

  // 除法有问题 需要考虑0的边界问题
  // y1 / x1 != y2 / x2
  // 两个点相同的情况
  if ((x1 === 0 && y1 === 0) || (x2 === 0 && y2 === 0)) return false
  if (x1 === 0) {
    if (x2 === 0) {
      return false
    } else {
      return true
    }
  } else {
    if (x2 === 0) {
      return true
    } else {
      return y1 / x1 != y2 / x2
    }
  }
}
