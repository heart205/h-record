/**
 * @author heart
 * @description 范型
 * @Date 2022-05-08
 */

/**
 * @desc: 函数范型
 */
function genericFunc<T>(arg: T): T {
  if (arg instanceof Array) {
    console.log(arg.length)
  }
  return arg
}
const genericObj: <T>(arg: T) => T = genericFunc

const genericObj2: <T>(arg: T) => T = function genericFunc2<T>(arg: T): T {
  return arg
}

// 对象类型的调用签名的形式
const genericFunc3: {
  <T>(arg: T): T
} = function genericFunc3<T>(arg: T): T {
  return arg
}

// 调用的时候 或者可以不写 范型 让编译器自动推断
genericFunc<number>(1)

// ---------------------------------------------------------------

/**
 * @desc: 接口范型
 */

// 对象类型的调用签名的形式 可以改编成接口
interface genericFuncInterface {
  <T>(arg: T): T
}

const genericFunc4: genericFuncInterface = function genericFunc4<T>(arg: T): T {
  return arg
}

// 泛型参数作为整个接口的参数
interface genericFuncInterface2<T> {
  (arg: T): T
  timer: T
}

function genericFunc5<T>(arg: T): T {
  return arg
}
genericFunc5.timer = 1

// genericFuncInterface2<number> number限制了函数的范型
const genericFuncObj5: genericFuncInterface2<number> = genericFunc5
// genericFunc5的参数可以传任意的类型
genericFunc5('1')
//  但是 genericFuncObj5 被 number 限制了 相当于 <T extends number>(arg: T) => T
genericFuncObj5(1)
// TODO:  <T extends number>(arg: T) => T 例子
function genericExtendsNumber<T extends number>(arg: T): T {
  return arg
}
// genericExtendsNumber('1') // ! error

// ---------------------------------------------------------------

/**
 * @desc: class范型
 */

// TODO: class 类的静态类型和实例类型
// 一个类它的类型有两部分：静态部分和实例部分。泛型类仅仅对实例部分生效，所以当我们使用类的时候，注意静态成员并不能使用类型参数。
class Type<T> {
  num!: T
  addNum!: (num1: T, num2: T) => T
}
const typeClassObj: Type<number> = new Type()
typeClassObj.num = 1
typeClassObj.addNum = (num1: number, num2: number) => num1 + num2

// ---------------------------------------------------------------

/**
 * 在泛型中使用类类型
 */

// TypeScript 中，当使用工厂模式创建实例的时候，有必要通过他们的构造函数推断出类的类型

function create<T>(ctor: { new (): T }): T {
  return new ctor()
}

// ? 修改为类 ctorInterface 表示的是一个类 类有一个静态的属性timer
interface ctorInterface<T> {
  new (): T
  timer: number
}
function create2<T>(ctor: ctorInterface<T>): T {
  return new ctor()
}
class Person {
  static timer: number
}
Person.timer = 1
create2(Person) // 注意  Person的实例并没有timer属性  如果要有 可以在 范型中限制 create2(Person).timer error

class Timer {
  static timer: number
  timerInter: number = 12
}
Timer.timer = 1
// 在实例中添加添加timer 属性 (这里更改为timerInter 好区分)
function create3<T extends { timerInter: number }>(ctor: ctorInterface<T>): T {
  return new ctor()
}
create3(Timer).timerInter // 12
// 总结: 在类类型中 可以用接口去限制 类的静态属性和构造函数 可以用范型限制实例的属性
