export function firstUniqChar(s: string): number {
  let result = -1
  const map = new Map<string, number>()
  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      map.set(s[i], -1)
    } else {
      // 记录下标的位置
      map.set(s[i], i)
    }
  }
  for (const [, value] of map) {
    if (value >= 0) {
      result = value
      break
    }
  }
  return result
}
