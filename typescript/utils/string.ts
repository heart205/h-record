/**
 * @author heart
 * @description
 * @Date 2022-05-29
 */

// startWidth
type startWidth<T extends string> = T extends `heart_${infer r}` ? true : false

// type isStartWidth = startWidth<'heart_t'> // true

// endWidth
type endWidth<T extends string> = T extends `${infer r}_heart` ? true : false
