/**
 * @author heart
 * @description 移动0
 * @Date 2022-05-16
 */

// 双指针 讲非0元素往前移动
// i 为0元素的起始位置
// [0,1,0,3,12]
export function moveZeroes(nums: number[]): number[] {
  let i = 0,
    j = 0
  while (j < nums.length) {
    if (nums[j] !== 0) {
      // 交换顺序
      // 寻找最近的一个
      while (i < nums.length && nums[i] !== 0) {
        i++
      }
      // ;[nums[i], nums[j]] = [nums[j], nums[i]]
      if (i < nums.length && nums[i] === 0 && j > i) {
        nums[i] = nums[i] ^ nums[j]
        nums[j] = nums[i] ^ nums[j]
        nums[i] = nums[i] ^ nums[j]
      }
    }
    j++
  }
  return nums
}
