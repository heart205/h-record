// thunk函数
const fs = require('fs')
// 编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数

//JavaScript 语言是传值调用，它的 Thunk 函数含义有所不同。在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数。
// 正常版本的readFile（多参数版本）
const fileName = __dirname

function callback(err: Error, data: any) {
  if (err) return
  console.log(data)
}
fs.readFile(fileName, callback)

// Thunk版本的readFile（单参数版本）
var Thunk = function (fileName: string) {
  return function (callback: (...args: any[]) => void) {
    return fs.readFile(fileName, callback)
  }
}

var readFileThunk = Thunk(fileName)
readFileThunk(callback)
