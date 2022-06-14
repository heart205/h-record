/**
 * @author heart
 * @description
 * @Date 2022-06-13
 */
export function strStr(haystack: string, needle: string): number {
  // 字符串
  if (needle.length > haystack.length) return -1
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle[0]) {
      // 第一个字符相等 开始比较
      let j = 0
      while (j < needle.length && i + j < haystack.length && haystack[i + j] === needle[j]) {
        if (j === needle.length - 1) {
          // 最后一个相等 说明已经相等
          return i
        }
        j++
        continue
      }
    }
  }
  return -1
}
