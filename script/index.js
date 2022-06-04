function* generator() {
  yield generatorPromise()
}

function generatorPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  })
}

console.log(1)

const iterator = generator()

console.log(iterator.next())

console.log(2)
