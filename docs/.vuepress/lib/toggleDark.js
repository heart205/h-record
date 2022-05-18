/**
 * @author heart
 * @description 切换主题
 * @Date 2022-04-04
 */

const path = require('path')
module.exports = (option, ctx) => {
  return {
    name: 'toggle-handle-dark',
    clientAppSetupFiles: () => {
      return path.resolve(__dirname, './toggleDarkMixin.js')
    },
  }
}
