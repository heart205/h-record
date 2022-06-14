/**
 * @author heart
 * @description
 * @Date 2022-06-13
 */

export function isPalindrome(s: string): boolean {
  let str = ''
  for (let i = 0; i < s.length; i++) {
    if ((s[i] >= 'a' && s[i] <= 'z') || (s[i] >= 'A' && s[i] <= 'Z')) {
      str += s[i].toLocaleLowerCase()
    } else if (s[i] >= '0' && s[i] <= '9') {
      str += s[i]
    }
  }

  if (str.length === 0 || str.length === 1) return true
  for (let i = 0; i < Math.floor(str.length / 2); i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      return false
    }
  }
  return true
}

function whiteList(str: string): boolean {
  if ((str >= 'a' && str <= 'z') || (str >= 'A' && str <= 'Z') || (str >= '0' && str <= '9')) {
    return true
  }
  return false
}
// 回文串 双指针解法：
export function isPalindrome2(s: string): boolean {
  let left = 0,
    right = s.length - 1
  while (left < right) {
    while (left < right && !whiteList(s[left])) {
      left++
    }
    while (left < right && !whiteList(s[right])) {
      right--
    }

    if (s[left].toLocaleLowerCase() !== s[right].toLocaleLowerCase()) {
      return false
    }
    left++
    right--
  }
  return true
}
