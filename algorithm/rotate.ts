/**
 * @author heart
 * @description 旋转矩阵
 * @Date 2022-05-17
 * TODO: https://leetcode.cn/leetbook/read/top-interview-questions-easy/xnhhkv/ 待解析
 */

export function rotate(matrix: number[][]): void {
  const arr = new Array(matrix.length).fill(null).map(() => {
    return new Array(matrix.length).fill(0)
  })
  // 矩阵反转 将第一列最后一个变成第一行第一个
  // i 表示行 j表示列
  for (let i = 0; i < matrix.length; i++) {
    for (let j = matrix.length - 1; j >= 0; j--) {
      // 将第一列的最后一行
      arr[i][matrix.length - 1 - j] = matrix[j][i]
    }
  }
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      matrix[i][j] = arr[i][j]
    }
  }
}
