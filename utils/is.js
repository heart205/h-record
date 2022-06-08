/**
 * @author heart
 * @description 判断逻辑
 * @Date 2022-06-08
 */

/**
 * 是否包含中文
 * @param {*} str
 * @returns
 */
export function isChineseCode(str) {
  var reg = /[\u4e00-\u9fa5]+$/
  return reg.test(str)
}
