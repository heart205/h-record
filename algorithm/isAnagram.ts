/**
 * @author heart
 * @description
 * @Date 2022-06-27
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
