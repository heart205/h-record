export function minimumAbsDifference(arr: number[]): number[][] {
  arr.sort((a, b) => a - b)
  const result: Array<number[]> = []

  const diff: number[] = []
  let min = Infinity
  for (let i = 1; i < arr.length; i++) {
    // 计算出两个差值
    diff[i - 1] = arr[i] - arr[i - 1]
    min = Math.min(min, diff[i - 1])
  }
  // 最小差值
  for (let i = 0; i < diff.length; i++) {
    if (diff[i] === min) {
      result.push([arr[i], arr[i + 1]])
    }
  }
  return result
}

// DONE: 优化算法
export function minimumAbsDifference1(arr: number[]): number[][] {
  arr.sort((a, b) => a - b)
  let min = Infinity
  const result: Array<number[]> = []
  for (let i = 1; i < arr.length; i++) {
    // 先确认最小值
    const diff = arr[i] - arr[i - 1]
    if (diff < min) {
      result.length = 0
      min = diff
    }
    if (diff === min) {
      result.push([arr[i - 1], arr[i]])
    }
  }
  return result
}
