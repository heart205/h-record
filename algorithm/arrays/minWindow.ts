/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * @author heart
 * @description 最小子串
 * @Date 2022-05-26
 */

function stringToMap(t: string): Map<string, number> {
  const map = new Map<string, number>()
  for (let i = 0; i < t.length; i++) {
    if (map.has(t.charAt(i))) {
      map.set(t.charAt(i), map.get(t.charAt(i))! + 1)
    } else {
      map.set(t[i], 1)
    }
  }
  return map
}
function minWindow(s: string, t: string): string {
  // 将t转化为hash表的形式
  // 滑动窗口
  const map = stringToMap(t)
  const result = ''
  //TODO:
  for (let i = 0; i < s.length; i++) {
    console.log(map)
  }
  return result
}

console.log(minWindow('ADOBECODEBANC', 'ABC'))
