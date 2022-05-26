export function sortedSquares(nums: number[]): number[] {
  // 先对数组进行平方
  for (let i = 0; i < nums.length; i++) {
    nums[i] = nums[i] * nums[i]
  }
  // 在对数组进行排序
  // TODO: 各种排序使用
  nums = nums.sort((a, b) => a - b)
  return nums
}

export function sortedSquares2(nums: number[]): number[] {
  // 双指针法
  // 因为数组有序 则最大值只会在边界上 之后根据边界进行相减
  let left = 0,
    right = nums.length - 1
  const result = Array.from({ length: nums.length }, () => 0)
  let k = result.length - 1
  while (left <= right) {
    if (nums[left] ** 2 > nums[right] ** 2) {
      result[k--] = nums[left] ** 2
      left++
    } else {
      result[k--] = nums[right] ** 2
      right--
    }
  }
  return result
}
// console.log(sortedSquares([-4, -1, 0, 3, 10]))
// console.log(sortedSquares2([-4, -1, 0, 3, 10]))
