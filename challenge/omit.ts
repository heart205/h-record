/* eslint-disable @typescript-eslint/no-unused-vars */
type MyExclude<T, K> = T extends K ? never : T
type MyPick<T, K extends keyof T> = {
  [k in K]: T[k]
}
type MyOmit<T, K> = MyPick<T, MyExclude<keyof T, K>>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}

type case1 = MyOmit<Todo, 'description'>

type case2 = MyOmit<Todo, 'description' | 'completed'>

type error = MyOmit<Todo, 'description' | 'invalid'>
