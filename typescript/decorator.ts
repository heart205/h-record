/**
 * @author heart
 * @description 装饰器
 * @Date 2022-06-13
 * @see: https://github.com/ruanyf/es6tutorial/blob/a82ed100a3360b9c0ff7154ab1aa7f3283edf689/docs/decorator.md
 * @see: https://www.tslang.cn/docs/handbook/decorators.html
 * @see: https://saul-mirone.github.io/zh-hans/a-complete-guide-to-typescript-decorator/
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
/**
 * PropertyDescriptor： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
 * @description: 打印log日志的作用
 */
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

// ---------------------------------------------------------------
// 多个方法装饰器
// 有多个装饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行
function dec(id: number) {
  console.log('evaluated', id)
  return (target: typeof Example.prototype, property: string, descriptor: PropertyDescriptor) =>
    console.log('executed', id)
}

class Example {
  @dec(1)
  @dec(2)
  method() {}
}
// evaluated 1
// evaluated 2
// executed 2
// executed 1

// ---------------------------------------------------------------

// ---------------------------------------------------------------
// 属性的装饰器 如果直接加在类的属性上没有实际意义 可以利用他来做原数据映射关系

// reflect 映射元数据
// readOnly 只读属性
function readOnly(isBoolean: boolean) {
  console.log(isBoolean)
  return function (target: typeof Greeter.prototype, name: string) {
    console.log(target)
    console.log(name)
    Object.defineProperty(target, name, {
      writable: false,
    })
  }
}

class Greeter {
  @readOnly(false)
  private greeting: string

  constructor(message: string) {
    this.greeting = message
  }

  greet() {
    console.log(this.greeting)
  }
}
const greeterObj = new Greeter('Hello, world!')
greeterObj.greet()
// ---------------------------------------------------------------

// ---------------------------------------------------------------
// 访问器装饰器
// ---------------------------------------------------------------

// ---------------------------------------------------------------
// 参数装饰器
// target: 对于静态成员来说是类的构造器，对于实例成员来说是类的原型链。
// propertyKey: 属性的名称(注意是方法的名称，而不是参数的名称)。
// parameterIndex: 参数在方法中所处的位置的下标。
// ---------------------------------------------------------------

export {}
