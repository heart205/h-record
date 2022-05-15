/**
 * @author heart
 * @description 这里需要判断两个值是否相等
 * @Date 2022-05-15
 * @description: 关于两个数相等的判断
 * @see: https://github.com/type-challenges/type-challenges/issues/225
 * @see: https://github.com/microsoft/TypeScript/issues/27024
 * @see: https://github.com/type-challenges/type-challenges/blob/49b53ccaad1dc296c5c4d20102890fb625d8d345/utils/index.d.ts#L8-L10
 */


// 需要遍历每一个值 去判断和当前的值是否相等
// 这里的判断相等的条件是后面的函数约束类型的X和Y都要相同
type Equals<X, Y> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? true : false;


type Includes<T extends readonly any[], U> = T extends [infer P, ...infer S] ? (Equals<P,U> extends true ? true : Includes<S,U>) : false


type arr = ['Kars', 'Esidisi', 'Wamuu', 'Santana']


type isBool = Includes<arr, 'dio'>
