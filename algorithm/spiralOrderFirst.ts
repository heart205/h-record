/**
 * @author heart
 * @description 54. 螺旋矩阵
 * @Date 2022-06-05
 */
function spiralOrder(matrix: number[][]): number[] {
  if (matrix.length === 0 || matrix[0].length === 0) return []
  let left = 0,
    right = matrix[0].length - 1,
    top = 0,
    bottom = matrix.length - 1

  const total = matrix.length * matrix[0].length

  const result: number[] = []
  while (result.length < total) {
    // 先从左往右依次添加
    for (let i = left; i <= right; i++) {
      result.push(matrix[top][i])
    }
    top++
    // 从上往下遍历
    for (let j = top; j <= bottom; j++) {
      result.push(matrix[j][right])
    }
    right--

    // 这里做一层判断 因为 上面的循环 可能是 下面的 逆序 避免重复
    if (result.length === total) break

    // 从右往左遍历
    for (let i = right; i >= left; i--) {
      result.push(matrix[bottom][i])
    }
    bottom--

    // 从下往上遍历
    for (let i = bottom; i >= top; i--) {
      result.push(matrix[i][left])
    }
    left++
  }
  return result
}
console.log(spiralOrder([[1, 2, 3]]))
