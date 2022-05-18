/**
 * @author heart
 * @description + 1
 * @Date 2022-05-16
 */

// 添加1的操作
function addOne(digits: number[], len: number) {
  if (len >= 0) {
    if (digits[len] === 9) {
      digits[len] = 0
      addOne(digits, len - 1)
    } else {
      digits[len] = digits[len] + 1
    }
  } else {
    // 考虑len < 0 的边界情况 如果全部小于 则首位直接加1
    digits.unshift(1)
  }
}

export function plusOne(digits: number[]): number[] {
  const result: number[] = [...digits]
  const len = digits.length - 1
  // 获取数组长度
  // 从最后一位开始遍历
  addOne(result, len)
  return result
}
