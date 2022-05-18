/**
 * @author heart
 * @description 有效的数独
 * @Date 2022-05-17
 * TODO: https://leetcode.cn/leetbook/read/top-interview-questions-easy/x2f9gg/ 数据待优化
 */

// 数字 1-9 在每一行只能出现一次。
// 数字 1-9 在每一列只能出现一次。
// 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次

export function isValidSudoku(board: string[][]): boolean {
  // 判断每一行 每一列是否有重复的 无重复的利用hash set存储
  // 判断每一行
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== '.') {
        // 判断当前行是否有重复的
        for (let k = 0; k < 9; k++) {
          if (j !== k && board[i][j] === board[i][k]) {
            return false
          }
        }
        // 判断当前列是否有重复的
        for (let k = 0; k < 9; k++) {
          if (i !== k && board[k][j] === board[i][j]) {
            return false
          }
        }
        // 判断当前的3*3的宫格是否有重复的
        const rows = Math.floor(i / 3) * 3
        const columns = Math.floor(j / 3) * 3
        for (let k = rows; k < rows + 3; k++) {
          for (let l = columns; l < columns + 3; l++) {
            if (board[k][l] === board[i][j] && i !== k && j !== l) {
              return false
            }
          }
        }
      }
    }
  }
  return true
}
