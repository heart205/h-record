/**
 * @author heart
 * @description ]
 * @Date 2022-05-28
 */

export function removeOuterParentheses(s: string): string {
  // 保持一个栈元素 进行压入栈的操作
  const arr = [] // 保存栈元素
  const result = [] // 保存结果
  for (let i = 0; i < s.length; i++) {
    // 压入栈中
    if (s.charAt(i) === '(') {
      if (arr.length > 0) {
        result.push('(')
      }
      arr.push('(')
    } else {
      // ) 弹栈
      arr.pop()
      if (arr.length > 0) {
        result.push(')')
      }
    }
  }
  return result.join('')
}
