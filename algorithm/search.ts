/**
 * @author heart
 * @description 二分查找的边界处理 判断如何定义 left 和 right 之间的关系
 * @Date 2022-05-21
 */

//给定一个n个元素有序的（升序）整型数组nums和一个目标值target，写一个函数搜索nums中的target，如果目标值存在返回下标，否则返回 -1。
export function search(nums: number[], target: number): number {
  if (nums.length === 1) {
    return target === nums[0] ? 0 : -1
  }
  let left = 0,
    right = nums.length - 1
  let middle
  while (left <= right) {
    // 这里使用
    middle = Math.floor(left + (right - left) / 2)
    // 如果相等 则直接返回
    if (nums[middle] === target) {
      return middle
    } else if (nums[middle] < target) {
      // 比当前的值小 左边的值偏小
      left = middle + 1
    } else {
      right = middle - 1
    }
  }
  return -1
}
