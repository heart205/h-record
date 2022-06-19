function queue(list: ((next: () => void) => void)[]) {
  const data: any[] = []
  function next() {
    const item = data.shift()
    if (item) {
      item(next)
    }
  }
  for (let i = 0; i < list.length; i++) {
    const p = (next: () => void) => {
      if (!next) {
        next = () => {
          return void 0
        }
      }
      list[i](next)
    }
    data.push(p)
  }
  next()
}

export function queue1(list: any[]) {
  list.reduceRight(
    (p, n) => () => {
      console.log(n)
      n(p)
    },
    () => {
      return
    }
  )()
}

function task1(next: any) {
  setTimeout(() => {
    console.log(1)
    next()
  }, 1000)
}

function task2(next: any) {
  console.log(next)
  console.log(2)
  next()
}

function task3(next: any) {
  setTimeout(() => {
    console.log(3)
    next()
  }, 400)
}

queue([task1, task2, task3])
