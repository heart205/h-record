/**
 * @author heart
 * @description
 * @Date 2022-06-13
 */
export function myAtoi(s: string): number {
  let result = '' // 存放数字
  let num = 0
  let sign = 0 // 正负号
  const min = -(2 ** 31),
    max = 2 ** 31 - 1
  for (let i = 0; i < s.length; i++) {
    // 去除前导空格
    while (i < s.length && s[i] === ' ') {
      i++
    }
    while ((i < s.length && s[i] === '-') || s[i] === '+') {
      if (sign !== 0) return num
      sign = s[i] === '-' ? -1 : 1
      i++
    }

    if (sign === 0) {
      sign = 1
    }
    while (i < s.length && s[i] >= '0' && s[i] <= '9') {
      // 保存上一次的值
      const preResult = result
      result += s[i]
      if (sign === 1) {
        if (Number(preResult) * 10 + Number(s[i]) !== Number(result) || Number(result) > max) {
          result = max.toString()
          break
        }
      } else {
        if (Number(preResult) * 10 + Number(s[i]) !== Number(result) || sign * Number(result) < min) {
          result = min.toString()
          sign = 1
          break
        }
      }
      i++
    }
    break
  }
  num = Number.parseInt(result) || 0
  return sign * num
}
