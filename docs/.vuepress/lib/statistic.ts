/**
 * @author heart
 * @description 统计字数
 * @Date 2022-04-08
 */

const path = require('path')
const fs = require('fs')
import { getStringLength } from './regExp'
module.exports = {
  name: 'toggle-handle-dark',
  extendsPage: (page) => {
    //fs模块写入文件
    const str = getStringLength(page.contentRendered)
    page.data.stringLength = str.length
  },
}
