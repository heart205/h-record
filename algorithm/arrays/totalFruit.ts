/**
 * @author heart
 * @description
 * @Date 2022-05-26
 */
// 求最大的连续的最长子序列
function maxMap(map: Map<number, number>): number {
  let tempTotal = 0
  for (const [, value] of map) {
    tempTotal += value
  }
  return tempTotal
}
// 滑动窗口
function totalFruit(fruits: number[]): number {
  const map = new Map() // 存储元素的值
  let left = 0,
    result = 0,
    tempTotal = 0
  for (let i = 0; i < fruits.length; i++) {
    if (map.has(fruits[i])) {
      map.set(fruits[i], map.get(fruits[i]) + 1)
      tempTotal = maxMap(map)
      result = Math.max(result, tempTotal)
    } else {
      while (map.size === 2) {
        // 左指针开始滑动 减去值
        map.set(fruits[left], map.get(fruits[left]) - 1)
        if (map.get(fruits[left]) <= 0) {
          map.delete(fruits[left])
        }
        left++
      }
      if (map.size < 2) {
        map.set(fruits[i], 1)
        tempTotal = maxMap(map)
        result = Math.max(result, tempTotal)
      }
    }
  }
  return result
}

console.log(totalFruit([0]))
