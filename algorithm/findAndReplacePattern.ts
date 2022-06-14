/**
 * @author heart
 * @Date 2022-06-12
 * @see: 890. 查找和替换模式
 * @see: https://leetcode.cn/problems/find-and-replace-pattern/solution/by-ac_oier-s4cw/
 */
// 字符串模式匹方法:
export function findAndReplacePattern(words: string[], pattern: string): string[] {
  const result: string[] = []
  for (let i = 0; i < words.length; i++) {
    if (words[i].length !== pattern.length) continue
    if (match(words[i], pattern) && match(pattern, words[i])) {
      result.push(words[i])
    }
  }
  return result
}

// 需要words和pattern调换 才能比较字符串格式是否一样
function match(words: string, pattern: string): boolean {
  // 遍历words 判断映射是否都存在
  const map = new Map<string, string>()
  for (let i = 0; i < words.length; i++) {
    const x = words.charAt(i)
    const y = pattern.charAt(i)
    // 不存在添加映射
    if (!map.has(x)) {
      map.set(x, y)
    } else if (map.get(x) != y) {
      return false
    }
  }
  return true
}

console.log(findAndReplacePattern(['abc', 'deq', 'mee', 'aqq', 'dkd', 'ccc'], 'abb'))
