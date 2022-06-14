/**
 * @author heart
 * @description 38. 外观数列
 * @Date 2022-06-13
 */
export function countAndSay(n: number): string {
  let str = '1' // 保持有几个数字的
  let j = 1
  let temp = ''
  let left: string
  while (j < n) {
    let count = 0 // 记录相同个数
    for (let i = 0; i < str.length; ) {
      left = str[i] // 第一个元素
      while (i < str.length && str[i] === left) {
        // 遍历相同的元素
        count++
        i++
      }
      temp += '' + count + left // 相同的元素放入temp中
      count = 0 // 重置count
    }
    str = temp // 更新str
    temp = '' // 重置temp
    j++
  }
  return str
}
