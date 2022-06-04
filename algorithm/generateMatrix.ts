/**
 * @author heart
 * @description 螺旋矩阵 II
 * @Date 2022-06-04
 */

// 从左往右 进行填充
// 之后进行对称填充
// 矩阵填充

/**
 *
 * @param array
 * @param index 开始的索引行
 */
// 乱序版
// 顺序如下:
// 1 2 3
// 4 5
// 6 7
// 8
function fillMatrix(array: number[][], index: number) {
  // n * n的数组 每次遍历
  // 第index 表示 从 哪一行开始
  for (let i = index; i <= array.length - 1 - index; i++) {
    array[index][i] = i - 1 < 0 ? array[index][i] : array[index][i - 1] + 1
  }

  // 最后一列 开始循环
  // 此时需要从i + 1开始
  // 后续都是要从 偏移一位的位置开始
  for (let i = index + 1; i <= array.length - 1 - index; i++) {
    // 第二列
    array[i][array.length - 1 - index] =
      i - 1 < 0 ? array[i][array.length - 1 - index] : array[i - 1][array.length - 1 - index] + 1
  }

  // 最后一行开始循环
  for (let i = array.length - 2 - index; i >= index; i--) {
    array[array.length - 1 - index][i] = array[array.length - 1 - index][i + 1] + 1
  }

  // 第一列最开始循环
  for (let i = array.length - 2 - index; i > index; i--) {
    array[i][index] = array[i + 1][index] + 1
  }
}

export function generateMatrix(n: number): number[][] {
  const matrix = Array.from({ length: n }, () => new Array(n).fill(1))

  for (let i = 0; i < Math.ceil(n / 2); i++) {
    fillMatrix(matrix, i)
  }
  return matrix
}

// 更优解法
function generateMatrix2(n: number): number[][] {
  // 创建一个二维数组
  const matrix = Array.from({ length: n }, () => new Array(n).fill(0))

  let loop = Math.ceil(n / 2) // 循环的次数

  // 每次循环开始的位置
  let startX = 0,
    startY = 0

  // 偏移量
  let offset = 1

  // 定义的填充的数字
  let count = 1

  while (loop > 0) {
    let i = startX,
      j = startY

    // 首先先第一行开始填充
    // n - offset 就是这一行需要填充的个数  startY + n - offset 表示从Y 开始 填充n个数字 因为最后的一位不填充 所以不取等号
    for (; j < startY + n - offset; j++) {
      matrix[startX][j] = count++
    }

    // 最后一列填充
    for (; i < startX + n - offset; i++) {
      matrix[i][j] = count++
    }

    // 最后一行填充
    for (; j > startY; j--) {
      matrix[i][j] = count++
    }

    // 第一列填充
    for (; i > startX; i--) {
      matrix[i][j] = count++
    }

    startX += 1
    startY += 1
    offset += 2
    loop--
  }

  if (n % 2 === 1) {
    // 奇数的位置
    const mid = Math.floor(n / 2)
    matrix[mid][mid] = count
  }
  return matrix
}

console.log(generateMatrix2(3))
