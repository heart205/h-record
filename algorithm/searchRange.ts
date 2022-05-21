export function searchRange(nums: number[], target: number): number[] {
  let result = [-1, -1]
  if (nums.length === 0) return result
  if (nums.length === 1 && nums[0] === target) {
    result = result.map(() => 0)
  } else {
    let left = 0,
      right = nums.length - 1
    let middle = 0
    while (left <= right) {
      middle = Math.floor(left + (right - left) / 2)
      if (nums[middle] === target) {
        // 继续判断左边的值 或者是右边的值是否符合
        result = result.map(() => middle)
        ;(left = middle), (right = middle)
        while (left - 1 > -1 && nums[left - 1] === target) {
          left--
        }
        while (right + 1 < nums.length && nums[right + 1] === target) {
          right++
        }
        result = [left, right]
        return result
      } else if (nums[middle] < target) {
        left = middle + 1
      } else {
        right = middle - 1
      }
    }
  }
  return result
}
