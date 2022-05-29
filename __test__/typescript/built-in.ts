/* eslint-disable @typescript-eslint/no-unused-vars */
type MergeValues<One, Other> = One extends Other ? One : Other extends unknown[] ? [One, ...Other] : [One, Other]

// 如果两个值相等 则取的是两个一起的联合数组
type MergeParams<OneParam extends Record<string, any>, OtherParam extends Record<string, any>> = {
  [Key in keyof OneParam | keyof OtherParam]: Key extends keyof OneParam
    ? Key extends keyof OtherParam
      ? MergeValues<OneParam[Key], OtherParam[Key]>
      : OneParam[Key]
    : Key extends keyof OtherParam
    ? OtherParam[Key]
    : never
}

// ------ queryString的实现：
type ParseParam<Param extends string> = Param extends `${infer Key}=${infer Value}`
  ? {
      [K in Key]: Value
    }
  : // eslint-disable-next-line @typescript-eslint/ban-types
    {}

type ParseQueryString<Str extends string> = Str extends `${infer Param}&${infer Rest}`
  ? MergeParams<ParseParam<Param>, ParseQueryString<Rest>>
  : ParseParam<Str>

type params = ParseQueryString<'123=1234'>

type ObjType = { a: number } & { c: boolean }

type isObj = [ObjType] extends { a: number; c: boolean } ? true : never // false
export {}
