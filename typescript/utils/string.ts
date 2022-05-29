/**
 * @author heart
 * @description
 * @Date 2022-05-29
 * infer 类似 正则中的(?=)
 */

// startWidth
type startWidth<T extends string> = T extends `heart_${infer r}` ? true : false

// type isStartWidth = startWidth<'heart_t'> // true

// endWidth
type endWidth<T extends string> = T extends `${infer r}_heart` ? true : false

// replace 局部匹配
type replace<T extends string, From extends string, To extends string> = From extends ''
  ? T
  : T extends `${infer prefix}${From}${infer suffix}`
  ? `${prefix}${To}${suffix}`
  : T

type isReplace = replace<'heart_d', 'd', 'a'> // 'heart_a'

// 可以使用递归做全局匹配
type globalReplace<T extends string, From extends string, To extends string> = From extends ''
  ? T
  : T extends `${infer prefix}${From}${infer suffix}`
  ? globalReplace<`${prefix}${To}${suffix}`, From, To>
  : T

type isGlobalReplace = globalReplace<'heart_t', 't', 'a'> // 'heart_a'

// trim 去掉空白符
// type trim<T extends string> = T extends ` ${infer T} ` ? trim<T> : T  // 除非前后是等价的空格 否则去除不了

// type trim<T extends string> = T extends `${infer rest}${' ' | '\n' | '\t'}` ? trim<rest> : T 这样也是只能去除一边的空格

// 现在需要转换成两部 一部分是去除左边的空格 一部分是去除右边的空格

type trimLeft<T extends string> = T extends `${' ' | '\n' | '\t'}${infer rest}` ? trimLeft<rest> : T
type trimRight<T extends string> = T extends `${infer rest}${' ' | '\n' | '\t'}` ? trimRight<rest> : T
type trim<T extends string> = trimLeft<trimRight<T>>

// 另外一种写法 只排除空格
type trimRight1<T extends string> = T extends ` ${infer T}` ? trimRight1<T> : T
type trimLeft1<T extends string> = T extends `${infer T} ` ? trimLeft1<T> : T
type trim1<T extends string> = trimLeft1<trimRight1<T>>

type isTrim = trim<'       heart      '> // heart

// reserve
type reserve<T extends string> = T extends `${infer r}${infer suffix}` ? `${reserve<suffix>}${r}` : T
export {}
