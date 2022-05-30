# 利用 fs 模块读取 env 配置文件

以`=`和`\n`为临界点 对 env 每一行的数据进行解析

得到`key`和`value`

```js
// fs-readFile.cjs
const fs = require('fs')

// 以逗号为分隔符 将前面的和后面的字符串截取出来  匹配由逗号前面的字符组成的字符串
const reg = /(?:^(.*?)=(.*))/gm
// 删除注释
const annotation = /^((\s*)\#.*?\n)|(\#[!\'\"]*?$)/gm

function readEnvFileSync(path = process.cwd() + '/.env', obj) {
  try {
    const buffer = fs.readFileSync(path)
    const envString = buffer.toString().replace(annotation, '')
    while (reg.test(envString)) {
      if (RegExp.$1 && RegExp.$2) obj[RegExp.$1.trim()] = RegExp.$2.trim().replace(/'|"/g, '')
    }
  } catch (e) {
    console.log(e)
    throw new Error('读取文件失败', e)
  }
}

function readEnvFile(path) {
  const obj = {}
  if (path instanceof Array) {
    path.forEach((val) => {
      readEnvFileSync(val, obj)
    })
  } else {
    readEnvFileSync(path, obj)
  }
  return obj
}

function readEnvFileSyncRotate(path = process.cwd() + '/.env', obj = {}) {
  const buffer = fs.readFileSync(path)
  const envString = buffer.toString().replace(annotation, '')
  let i = 0,
    key = '',
    value = '',
    left = 0
  while (i <= envString.length) {
    if (envString[i] === '=' || envString[i] === '\n' || i === envString.length) {
      key === '' ? (key = envString.slice(left, i)) : (value = envString.slice(left, i))
      left = i + 1
    }
    i++
    if (key && value) {
      obj[key.trim()] = value.trim().replace(/'|"/g, '')
      key = ''
      value = ''
    }
  }
  return obj
}

function readEnvFileRotate(path) {
  const obj = {}
  if (path instanceof Array) {
    path.forEach((val) => {
      readEnvFileSyncRotate(val, obj)
    })
  } else {
    readEnvFileSyncRotate(path, obj)
  }
  return obj
}

module.exports = {
  readEnvFile,
  readEnvFileRotate,
}
```
