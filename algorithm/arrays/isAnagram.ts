/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * @author heart
 * @description
 * @Date 2022-05-28
 * @see: https://leetcode.cn/problems/valid-anagram/
 */
export function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false
  const map = new Map<string, number>()
  const str = s.length > t.length ? t : s
  const otherStr = str === s ? t : s
  for (let i = 0; i < str.length; i++) {
    if (map.has(str[i])) {
      map.set(str[i], map.get(str[i])! + 1)
    } else {
      map.set(str[i], 1)
    }
  }
  for (let i = 0; i < otherStr.length; i++) {
    if (!map.has(otherStr.charAt(i))) {
      return false
    }
    map.set(otherStr.charAt(i), map.get(otherStr.charAt(i))! - 1)
    if (map.get(otherStr.charAt(i))! < 0) {
      return false
    }
  }

  for (const [, value] of map) {
    if (value !== 0) return false
  }

  return true
}

// 排序后比较
export function isAnagram2(s: string, t: string): boolean {
  if (s.length !== t.length) return false
  s = s
    .split('')
    .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
    .join('')

  t = t
    .split('')
    .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
    .join('')

  for (let i = 0; i < s.length; i++) {
    if (s[i] !== t[i]) return false
  }
  return true
}
