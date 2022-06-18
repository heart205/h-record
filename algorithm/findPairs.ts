/**
 * @author heart
 * @description
 * @Date 2022-06-16
 */
export function findPairs(nums: number[], k: number): number {
  const map = new Map<number, number>()
  let result = 0 // 记录时间
  for (let j = 0; j < nums.length; j++) {
    let i = j + 1
    while (i < nums.length) {
      const diff = Math.abs(nums[i] - nums[j])
      // 判断diff是否在map中
      if (!map.has(Math.min(nums[i], nums[j])) && diff === k) {
        // 判断最小值是否在map中
        map.set(Math.min(nums[i], nums[j]), Math.max(nums[i], nums[j]))
        result++
      }
      i++
    }
  }
  return result
}

// 利用hash表解法
// 由于 Math.abs(nus[i] - nums[j]) == k  的判断条件转换成: nums[j] - k = +- nums[i] 或者判断 nums[j] - k = +- nums[i]
export function findPairs1(nums: number[], k: number): number {
  const set = new Set<number>()
  // 存储一列的最大值或者是最小值 达到去重复的效果
  const result = new Set<number>() // 去重复

  // 还需要过滤相同的元素
  for (let i = 0; i < nums.length; i++) {
    if (set.has(nums[i] - k)) {
      result.add(nums[i])
    }
    if (set.has(nums[i] + k)) {
      result.add(nums[i] + k)
    }
    set.add(nums[i])
  }
  return result.size
}

console.log(findPairs([3, 1, 4, 1, 5], 2))
console.log(findPairs1([3, 1, 4, 1, 5], 2))
