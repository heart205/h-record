/**
 * @author heart
 * @description 生成器
 * @Date 2022-06-02
 * @see:https://es6.ruanyifeng.com/#docs/generator-async
 */
function* gen() {
  yield 1
  yield 2
  yield 3
}

const iterator = gen()

let result
while (true) {
  result = iterator.next()
  if (result.done) {
    break
  }
  console.log(result.value) // 1 2 3
}

// 与Iterator 接口的关系
const obj: { [Symbol.iterator]: () => Generator<1 | 2 | 3, void, unknown> } = {
  [Symbol.iterator]: function* () {
    yield 1
    yield 2
    yield 3
  },
}
// 扩展运算符会自动迭代数据
console.log([...obj])

// 实现 数组的迭代
const arr = [1, 2, 3]
arr[Symbol.iterator] = function* () {
  for (let i = 0; i < this.length; i++) {
    yield this[i] * 2
  }
}

console.log([...arr])

// ------------- 异步generator解决方案 async await 解决方案
function* generatorPromise(): any {
  let i = 0
  while (i < 10) {
    const next = yield promiseFunc()
    console.log(next)
    i++
  }
  return 'end'
}

function promiseFunc(): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 10)
  })
}

// 自动迭代生成器 将generator 变成同步
function run(this: any, func: any): any {
  const ctx = this
  // 优先获取一个迭代器  保持上下文对象
  const it = func.call(this)

  let isEnd = false
  // 通过闭包解决迭代器的引用问题
  function next(resolve: (...args: any[]) => void, reject: (...args: any[]) => void, res?: any) {
    // 这里交还执行权
    const result = it.next(res)
    if (result.done) {
      if (isEnd) return resolve(res)
      isEnd = true
      next(resolve, reject, result.value)
      return
    }
    // 如果还有值 则将迭代器继续传递下去
    result.value.then((res: any) => {
      // 将值交还给迭代器
      next(resolve, reject, res)
    })
  }
  return new Promise((resolve, reject) => {
    next(resolve, reject)
  })
}

// ---------- async await 实现

// run2的实现
function run2(this: any, func: any): any {
  const ctx = this
  return new Promise((resolve, reject) => {
    // 优先获取一个迭代器
    const it = func.call(this)
    let isEnd = false
    // 通过闭包解决迭代器的引用问题
    function next(res?: any) {
      // 这里交还执行权
      const result = it.next(res)
      if (result.done) {
        if (isEnd) return resolve(res)
        isEnd = true
        next(result.value)
        return
      }
      // 如果还有值 则将迭代器继续传递下去
      result.value.then((res: any) => {
        // 将值交还给迭代器
        next(res)
      })
    }
    next()
  })
}

run(generatorPromise).then((res: any) => {
  console.log(res)
})

run2(generatorPromise).then((res: any) => {
  console.log(res)
})

export {}
