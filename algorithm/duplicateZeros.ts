/**
 Do not return anything, modify arr in-place instead.
 */
export function duplicateZeros(arr: number[]): void {
  const temp: number[] = []

  for (let i = 0; i < arr.length; i++) {
    if (temp.length === arr.length) break
    if (arr[i] === 0) {
      for (let j = 0; j < 2 && temp.length < arr.length; j++) {
        temp.push(0)
      }
    } else if (temp.length < arr.length) {
      temp.push(arr[i])
    }
  }
  for (let i = 0; i < arr.length; i++) {
    arr[i] = temp[i]
  }
}

// 双指针
