export function reverseString(s: string[]) {
  let temp = ''
  for (let i = 0; i < Number.parseInt(String(s.length / 2)); i++) {
    temp = s[i]
    s[i] = s[s.length - 1 - i]
    s[s.length - 1 - i] = temp
  }
}

// 双指针
export function reverseString2(s: string[]) {
  let left = 0,
    right = s.length - 1,
    temp = ''
  while (left < right) {
    temp = s[left]
    s[left] = s[right]
    s[right] = temp
    left++
    right--
  }
}
