/**
 * @author heart
 * @description 吃香蕉的珂珂
 * @Date 2022-06-07
 */

function total(k: number, piles: number[]): number {
  let count = 0
  for (let i = 0; i < piles.length; i++) {
    count += Math.ceil(piles[i] / k)
  }
  return count
}

export function minEatingSpeed(piles: number[], h: number): number {
  // 先排序
  piles = piles.sort((a, b) => a - b)

  // 吃香蕉的个数始终是Math.ceil(piles[i]/k) // 至少是一个小时
  // 根据 h 确定每个最多执行多少次
  let left = 1,
    right = piles[piles.length - 1],
    middle = 0

  while (left <= right) {
    middle = Number.parseInt(String(left + (right - left) / 2))
    // 以middle 为 当前吃的香蕉的时间
    if (total(middle, piles) > h) {
      left = left + Number.parseInt(String((right - left) / 2)) + 1
      // 由于求最小值 则等于之后在往下逼入 最后left === right + 1 但是最后一次满足的条件一定是 right+ 1 则是left
    } else {
      right = left + Number.parseInt(String((right - left) / 2)) - 1
    }
  }
  return left
}

console.log(minEatingSpeed([30, 11, 23, 4, 20], 5))

console.log(minEatingSpeed([3, 6, 7, 11], 8))

console.log(minEatingSpeed([1, 1, 1, 999999999], 10))
