/**
 * @description 统计字符串的个数
 * @param
 */

export function getStringLength(string: string) {
  const reg = /\<.*?>|\<\/.*?>|\s|\#*|^\-/gm
  return string.replace(reg, '')
}
