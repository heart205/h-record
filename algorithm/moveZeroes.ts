/**
 * @author heart
 * @description 移动0
 * @Date 2022-05-16
 */
import { swap } from './utils/swap'
// 双指针 讲非0元素往前移动
// i 为0元素的起始位置
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

export function moveZeroes2(nums: number[]): number[] {
  let left = 0,
    right = 0 // 右指针
  for (; left < nums.length; left++) {
    // 不等于0的时候双指针是一起移动的
    if (nums[left] !== 0) {
      swap(nums, left, right)
      right++
    }
  }
  return nums
}

console.log(moveZeroes2([1, 0, 3, 12]))
