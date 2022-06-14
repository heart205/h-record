/**
 * @author heart
 * @description
 * @Date 2022-06-13
 */
// TODO: 改为快排
function swapArray(arr: number[], i: number, j: number) {
  if (j < arr.length) {
    const temp = arr[j]
    for (let k = j; k >= i; k--) {
      arr[k] = arr[k - 1]
    }
    arr[i] = temp
  }
}

export function insertSort(array: number[]) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < i; j++) {
      // 插入排序
      if (array[i] < array[j]) {
        // 插入的位置为j
        swapArray(array, j, i)
        break
      }
    }
  }
}
function heightChecker(heights: number[]): number {
  // 插入排序
  const detail = [...heights]
  let count = 0
  // insertSort(heights)
  heights = countSort(heights)
  for (let o = 0; o < detail.length; o++) {
    if (detail[o] !== heights[o]) {
      count++
    }
  }
  return count
}

// 计数排序 也称为桶排序
function countSort(array: number[]) {
  const arr: number[] = new Array(100).fill(0)
  for (let i = 0; i < array.length; i++) {
    arr[array[i]]++
  }
  const result: number[] = []

  for (let i = 0; i < arr.length; i++) {
    while (arr[i] > 0) {
      result.push(i)
      arr[i]--
    }
  }
  return result
}

// 快速排序

console.log(heightChecker([5, 1, 2, 3, 4]))
