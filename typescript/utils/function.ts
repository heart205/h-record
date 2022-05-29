/**
 * @author heart
 * @description function
 * @Date 2022-05-29
 */

// 获取函数的参数类型
type getParameters<Func extends Function> = Func extends (...args: infer Args) => unknown ? Args : never

// 这里不能用 unknown，因为参数类型是要赋值给别的类型的，
// 而 unknown 只能用来接收类型，所以用 any, 换句话说， unknown是Top type, 不能赋值给其他类型的，
// any既是Top type 又是Bottom type, 可以赋值给其他任何类型（除了never）
// 获取函数的返回值类型
type getReturnType<Func extends Function> = Func extends (...args: any[]) => infer ReturnType ? ReturnType : never

type i = getReturnType<(name: string) => number>
// 获取class的function的this类型
// 可以在方法声明的时候指定this的类型
// 注意 this必须是第一个参数 只有当call bind apply的时候 会用到this

class heart {
  constructor(private name: string) {}
  speak(this: heart, detail: string) {
    console.log(this.name, detail)
  }
}
const h = new heart('heart')
console.log(h.speak.call(h, 'detail'))
