// [0,1,2]
// [0,2,3]
// 数组的差集求值
export function arrayDiff(arr1: number[], arr2: number[]): number[] {
  const nums1 = arr1.sort((a, b) => a - b)
  const nums2 = arr2.sort((a, b) => a - b)
  let i = 0,
    j = 0
  const result = []
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] === nums2[j]) {
      i++
      j++
      // 因为是生序排列 如果值比较另外一个值小 则他就是差集
    } else if (nums1[i] < nums2[j]) {
      result.push(nums1[i])
      i++
    } else {
      result.push(nums2[j])
      j++
    }
  }
  while (i < nums1.length) {
    result.push(nums1[i])
    i++
  }
  while (j < nums2.length) {
    result.push(nums2[j])
    j++
  }
  return result
}

console.log(arrayDiff([1, 2, 3, 4, 5], [2, 3, 4, 5]))
