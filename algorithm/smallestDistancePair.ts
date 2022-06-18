/**
 * @author heart
 * @description
 * @Date 2022-06-15
 */
// 依据数据进行二分查找 滑动窗口
function smallestDistancePair(nums: number[], k: number): number {
  // 交换顺序
  nums.sort((a, b) => a - b)

  let l = 0,
    r = 1e6

  let result = 0
  // 二分查找 l - middle 中有多少个元素小于k
  while (l <= r) {
    const middle = Math.floor(l + (r - l) / 2)
    if (check(nums, middle) >= k) {
      // 需要在往下继续二分查找 找到最合适的值
      result = middle // 保存每次合适的值 每次减少
      r = middle - 1
    } else l = middle + 1
  }
  // r永远都是满足的结果
  return result
}

// 比较在left - middle 上 有多少数据 是否大于k 大于k则需要缩小范围
// 小于k扩大范围 第k小的数据
function check(nums: number[], k: number): number {
  const n = nums.length
  let ans = 0 // ans 统计总数

  for (let i = 0, j = 0; i < n; i++) {
    // 因为单调不减的原因 如果 num[j] - nums[i] >= k 则 后续的元素都会>=k 所以不需要再比较
    while (j < n && nums[j] - nums[i] <= k) {
      j++
    }
    ans += j - i - 1
  }
  // 循环完之后
  return ans
}

console.log(smallestDistancePair([1, 3, 1], 1))
