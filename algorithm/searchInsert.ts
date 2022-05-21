/**
 * @author heart
 * @description
 * @Date 2022-05-21
 */

export function searchInsert(nums: number[], target: number): number {
  if (nums.length === 1) return nums[0] < target ? 1 : 0
  let left = 0,
    right = nums.length - 1
  let middle = 0
  while (left <= right) {
    middle = Math.floor(left + (right - left) / 2)
    if (nums[middle] === target) {
      return middle
    } else if (nums[middle] < target) {
      left = middle + 1
    } else {
      right = middle - 1
    }
  }
  // 如果middle 比 target大的话 target应该在middle位置 middle的位置往后移动一位
  // middle 比 target 小 则需要插入到middle的后一位
  return nums[middle] > target ? middle : middle + 1
}
