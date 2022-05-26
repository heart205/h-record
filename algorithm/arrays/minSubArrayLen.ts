/**
 * @author heart
 * @description 最小长度子数组
 * @Date 2022-05-26
 */
// 先暴力解法:
export function minSubArrayLen(target: number, nums: number[]): number {
  let total = 0,
    result = 0
  for (let i = 0; i < nums.length; i++) {
    total = 0
    for (let j = i; j < nums.length; j++) {
      total += nums[j]
      if (total >= target) {
        result = result === 0 ? j - i + 1 : Math.min(result, j - i + 1)
        break
      }
    }
  }
  return result
}

// 滑动窗口题解:
export function minSubArrayLen2(target: number, nums: number[]): number {
  let left = 0,
    right = 0,
    result = 0,
    total = 0
  while (right < nums.length) {
    total += nums[right]
    while (total >= target && left <= right) {
      // 此时移动左指针
      result = result === 0 ? right - left + 1 : Math.min(result, right - left + 1)
      total -= nums[left]
      left++
    }
    right++
  }
  return result
}

// 二分查找
// https://leetcode.cn/problems/minimum-size-subarray-sum/solution/javade-jie-fa-ji-bai-liao-9985de-yong-hu-by-sdwwld/
function search(nums: number[], target: number): number {
  let left = 0,
    right = nums.length - 1,
    middle = 0
  while (left <= right) {
    middle = Math.floor(left + (right - left) / 2)
    // 求出大于等于他的最小值
    if (nums[middle] === target) {
      return middle
    } else if (nums[middle] < target) {
      left = middle + 1
    } else {
      right = middle - 1
    }
  }
  // 最后出来的结果一定是 left > right 为了方便取反 则返回的是 -(left + 1)
  // 需要插入的位置就是left
  // ~a === -(a + 1)
  console.log(left)
  return -(left + 1)
}
// 前缀和 + 二分查找
export function minSubArrayLen3(target: number, nums: number[]): number {
  // 先将所有的值先求和
  let result = Number.MAX_VALUE
  // +1 求前n个的和
  const array = new Array(nums.length + 1).fill(0)
  for (let i = 1; i < array.length; i++) {
    array[i] = array[i - 1] + nums[i - 1]
  }
  console.log(array)
  for (let i = 0; i < nums.length; i++) {
    // index就是 k的下标志
    let index = search(array, array[i] + target)
    if (index < 0 || Object.is(index, -0)) {
      index = ~index
    }
    console.log(index)
    // 此时求出k的位置的最小值 k的位置不能超过原数组的长度
    if (index <= nums.length) {
      result = Math.min(result, index - i)
    }
  }
  // 数组成递增序列增长
  return result === Number.MAX_VALUE ? 0 : result
}
