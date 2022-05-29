/**
 * @author heart
 * @description
 * @Date 2022-05-28
 */

// 整数反转
// 每次保留上一次的值 如果溢出 则此次 / 10 将不等于上一次的值
export function reverse(x: number): number {
  const max = 2 ** 31 - 1
  const min = -(2 ** 31)
  let preResult = 0,
    res = 0,
    result = 0,
    flag = 0
  const isZero = x > 0 ? true : false // x是否大于0
  while (x != 0) {
    res = x % 10
    x = isZero ? Math.floor(x / 10) : Math.ceil(x / 10)
    result = result * 10 + res
    flag = isZero ? Math.floor(result / 10) : Math.ceil(result / 10)
    if (flag !== preResult || result > max || result < min) {
      console.log('result', result)
      return 0
    }
    preResult = result
  }
  return result
}
