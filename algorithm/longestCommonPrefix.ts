/**
 * @author heart
 * @description 14. 最长公共前缀
 * @Date 2022-06-13
 */
export function longestCommonPrefix(strs: string[]): string {
  // 遍历数组取公共序列
  let flag = 0
  let result = ''
  let prefix = ''
  // flag 每行的个数
  while (flag !== -1) {
    if (flag >= strs[0].length) {
      return result
    }
    prefix = strs[0][flag]
    for (let i = 1; i < strs.length; i++) {
      if (flag >= strs[i].length || strs[i][flag] !== prefix) {
        return result
      }
    }
    result += prefix
    flag++
  }
  return result
}
