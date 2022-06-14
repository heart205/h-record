/**
 * @author heart
 * @description
 * @Date 2022-06-14
 */
// 前多少个相加的和等于这一列
// 奇数位置的时候 列先加 偶数位置的时候 行先加
// 00
// 01 10
// 20 11 02
// 21 12
// 22

// 00
// 01 10
// 11
export function findDiagonalOrder(mat: number[][]): number[] {
  const result: number[] = []
  const row = mat.length
  const col = mat[0].length
  let num = 1 // 循环测次数
  let x = 0,
    y = 0
  while (num) {
    // 奇数位置 从下往上走
    // 偶数位置 从上往下走
    // 判断越界的优先级
    let s = 1
    if (num % 2 === 0) {
      while (s++) {
        // 偶数
        // 从上往下走
        result.push(mat[x][y])
        if (x === row - 1 && y === col - 1) {
          // 到最后一次的时候 结束循环
          return result
        }
        y--
        x++
        if (y < 0) {
          y = 0
          if (x > row - 1) {
            console.log(x, y)
            x = row - 1
            y++
          }
          break
        }
        if (x > row - 1) {
          x = row - 1
          y += 2
          break
        }
      }
    } else {
      // 奇数
      // 从下往上走 到达边界之后 判断优先级
      while (s++) {
        result.push(mat[x][y])
        if (x === row - 1 && y === col - 1) {
          // 到最后一次的时候 结束循环
          return result
        }
        y++
        x--
        if (x < 0) {
          // x超过边界
          x = 0
          if (y > col - 1) {
            y = col - 1
            // 上面的x = 0 已经相当于 x++ 了
            x++
          }
          break
        }
        if (y > col - 1) {
          // y 超过边界
          y = col - 1
          x += 2
          break
        }
      }
    }
    num++
  }
  return result
}

//TODO：更好的解法：

// console.log(
//   findDiagonalOrder([
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//   ])
// )

// console.log(findDiagonalOrder([[2, 3]]))
