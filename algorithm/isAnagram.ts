/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * @author heart
 * @description
 * @Date 2022-06-27
 * 数组其实就是一个简单哈希表
 */

export function isAnagram(s: string, t: string): boolean {
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

export function isAnagram1(s: string, t: string): boolean {
  // 利用hashCode存储

  const map1 = setMap(s)
  const map2 = setMap(t)
  if (map1.size !== map2.size) return false
  for (const [key, value] of map1) {
    if (!map2.has(key)) {
      return false
    } else if (map2.get(key) !== value) {
      return false
    }
  }
  return true
}

function setMap(str: string): Map<string, number> {
  const map = new Map<string, number>()
  for (let i = 0; i < str.length; i++) {
    if (map.has(str.charAt(i))) {
      map.set(str.charAt(i), map.get(str.charAt(i))! + 1)
    } else {
      map.set(str.charAt(i), 1)
    }
  }
  return map
}
