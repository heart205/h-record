/**
 * @author heart
 * @description 剑指 Offer 29. 顺时针打印矩阵
 * @Date 2022-06-04
 */

// 顺时针旋转矩阵
export function spiralOrder(matrix: number[][]): number[] {
  const result: number[] = []
  if (matrix.length === 0 || matrix[0].length === 0) return result
  let startX = 0,
    startY = 0

  let loop = Math.ceil(matrix.length / 2)

  let offset = 1 // 偏移量

  while (loop > 0) {
    let i = startX,
      j = startY
    // 第一行遍历
    for (; j < startY + matrix[0].length - offset; j++) {
      if (!isNaN(matrix[startX][j])) result.push(matrix[startX][j])
      matrix[startX][j] = NaN
    }

    // 最后一列遍历
    for (; i < startX + matrix.length - offset; i++) {
      if (!isNaN(matrix[i][j])) result.push(matrix[i][j])
      matrix[i][j] = NaN
    }

    // 最后一行遍历
    for (; j > startY; j--) {
      if (!isNaN(matrix[i][j])) result.push(matrix[i][j])
      matrix[i][j] = NaN
    }

    // 遍历第一列
    for (; i > startX; i--) {
      if (!isNaN(matrix[i][j])) result.push(matrix[i][j])
      matrix[i][j] = NaN
    }

    startX += 1
    startY += 1
    offset += 2
    loop--
  }

  if (matrix.length === matrix[0].length && matrix.length % 2 !== 0) {
    const mid = Math.floor(matrix.length / 2)
    if (!isNaN(matrix[mid][mid])) result.push(matrix[mid][mid])
  }

  return result
}

// 逆转矩阵的推荐方法:
// @see:https://leetcode.cn/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/solution/shuang-ceng-you-ya-shi-xian-shun-shi-zhe-rfcw/
export function spiralOrder2(matrix: number[][]): number[] {
  // 最后获取的矩阵的长度肯定为 matrix.length * matrix.length[0]
  if (!matrix.length) return []
  // 解释
  const res = [],
    row = matrix.length,
    col = matrix[0].length,
    size = row * col
  let t = 0,
    r = col - 1,
    b = row - 1,
    l = 0 // 遍历顺序的边 分为为 上、右、下、左

  while (res.length !== size) {
    // 从左往右
    for (let i = l; i <= r; i++) res.push(matrix[t][i])
    t++

    // 从上往下
    for (let i = t; i <= b; i++) res.push(matrix[i][r])
    r--

    // 检查一次是否遍历完
    if (res.length === size) break

    // 从右往左
    for (let i = r; i >= l; i--) res.push(matrix[b][i])
    b--
    // 从下往上
    for (let i = b; i >= t; i--) res.push(matrix[i][l])
    l++
  }

  return res
}
