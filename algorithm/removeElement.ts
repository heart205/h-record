/**
 * @author heart
 * @description 移除元素
 * @Date 2022-05-23
 */
import { swap } from './utils/swap'

// for 循环暴力解法
export function removeElement(nums: number[], val: number): number {
  let i = 0,
    j = 0,
    result = 0
  for (i = 0; i < nums.length - result; i++) {
    if (nums[i] === val) {
      console.log(nums)
      result++
      for (j = i + 1; j < nums.length; j++) {
        nums[j - 1] = nums[j]
      }
      i--
    }
  }
  return nums.length - result
}

// 双指针解法: 通用解法
// @see: https://leetcode.cn/problems/remove-element/solution/yi-chu-yuan-su-by-leetcode-solution-svxi/

export function removeElement2(nums: number[], val: number): number {
  // 右指针移动 左指针移动要覆盖的位置
  let left = 0,
    right = 0
  for (; right < nums.length; right++) {
    // 如果 当前的值不等于 val 则 左右指针需要一起移动 末尾right++ 则这里只需左指针++
    if (val !== nums[right]) {
      nums[left] = nums[right]
      left++
    }
  }
  return left
}

// 双指针第二种解法：
export function removeElement3(nums: number[], val: number): number {
  let pointer = nums.length - 1
  for (let i = 0; i <= pointer; i++) {
    // 如果等于val 则直接交换
    if (val === nums[i]) {
      swap(nums, i, pointer)
      pointer--
      // 这里需要-- 因为交换了元素 防止交换的元素还是val
      i--
    }
  }
  // 最后return的结果是 [0,pointer) 长度值为 pointer + 1
  return pointer + 1
}
