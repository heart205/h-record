// 是否是质数
export function isZhiShu(n: number): boolean {
  if (n < 2) return false
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false
    }
  }
  return true
}

export function numPrimeArrangements(n: number): number {
  // 1. 求出质数的个数
  let counter = 0
  for (let i = 2; i <= n; i++) {
    if (isZhiShu(i)) {
      counter++
    }
  }
  // 2. 排列组合
  let s = n - counter
  let result = 1
  for (; counter > 0; counter--) {
    result = (result * counter) % (10 ** 9 + 7)
  }

  for (; s > 0; s--) {
    result = (result * s) % (10 ** 9 + 7)
  }
  return result
}
