思路：使用递归算法，每次从联合类型中 取出一个类型 ，将该类型插入到已有的元组类型中，直至联合类型所有类型被取完。

如何取出联合类型中的一个元素，虽然联合类型从行为上来可以视为集合，但是 TS 本身没有给联合类型提供从集合中取值的操作。

```typescript
type Union = 'a' | 'b' | 'c'
type E = Union[1] // Property '1' does not exist on type 'Union'
```

所以要从联合类型中取出某个位置的元素,只能另辟蹊径:

1. 重载的函数再使用 infer 进行推断时，重载的部分会取最后一个声明。

```typescript
type FF = {
  (): 'a'
  (): 'b'
}

type G = returnType<FF> // 'b'
```

2. 将相同形状的函数类型进行交叉，等价于函数重载

```typescript
type FF = {
  (): 'a'
  (): 'b'
}
type B = (() => 'b') & (() => 'a') // 函数的交叉
type G = FF extends B ? true : false // true
```

基于这两个特性，可以从联合类型中取出一个元素，只不过这个元素只能是最后一个:

1. 将联合类型转为交叉类型(利用函数参数类型可以逆变的特性)

```typescript
/**
 * 将联合类型转为对应的交叉函数类型
 * @template U 联合类型
 */
type UnionToInterFunction<U> = (U extends any ? (k: () => U) => void : never) extends (k: infer I) => void ? I : never
```

2. 获取交叉函数类型的返回类型

```typescript
/**
 * 获取联合类型中的最后一个类型
 * @template U 联合类型
 */
type GetUnionLast<U> = UnionToInterFunction<U> extends { (): infer A } ? A : never
```

联合类型如何进行递归？在 TS 类型系统中如果对(嵌套)对象类型进行递归，是可以调用自身的:

```typescript
type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> }
```

如果泛型本身是联合类型，想要通过直接在类型中调用自身就会报错(4.0 以上版本无这个报错，就可以使用下面这个方法直接获取)

```typescript
type Prepend<Tuple extends any[], E> = [E, ...Tuple]

// 4.0.5版本报错信息
// Type alias 'UnionToTuple' circularly references itself
type UnionToTuple<Union, T extends any[] = [], Last = GetUnionLast<Union>> = [Union] extends [never]
  ? T
  : UnionToTuple<Exclude<Union, Last>, Prepend<T, Last>>
```
