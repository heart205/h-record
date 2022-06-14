/**
 * @author heart
 * @description 装饰器
 * @Date 2022-06-13
 * @see: https://github.com/ruanyf/es6tutorial/blob/a82ed100a3360b9c0ff7154ab1aa7f3283edf689/docs/decorator.md
 */
// ---------------------------------------------------------------
// 类装饰器
// 饰器对类的行为的改变，是代码编译时发生的，而不是在运行时发生的 因此 赋值的操作会晚于装饰器的操作
@testableDecorator
class testable {
  static isTestable: boolean | null = true
}

// 参数是当前的类
function testableDecorator(target: typeof testable) {
  target.isTestable = false
}

// console.log(testable.isTestable) // false

// 因为装饰器是在编译的时候就对类进行了改变 因此在运行时:
testable.isTestable = null

// console.log(testable.isTestable) // null

@testableFunc(null)
class testable2 {
  static isTestable: boolean | null = true
}

function testableFunc(data: null | boolean) {
  return function (target: typeof testable2) {
    target.isTestable = data
  }
}

console.log(testable2.isTestable)
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// 方法装饰器
class Math {
  @log
  add(a: number, b: number) {
    return a + b
  }
}
// 打印log日志的作用
function log(target: typeof Math.prototype, name: string, descriptor: PropertyDescriptor) {
  console.log(descriptor)
  var oldValue = descriptor.value
  descriptor.value = function () {
    console.log(`Calling ${name} with`, arguments)
    return oldValue.apply(this, arguments)
  }
  // descriptor.value 是函数最后需要的执行的方法
  return descriptor
}

const math = new Math()

// passed parameters should get logged now
console.log(math.add(2, 4))

// ---------------------------------------------------------------

export {}
