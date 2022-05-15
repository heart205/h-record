/**
 * @author heart
 * @description
 * @Date 2022-05-15
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
type Concat<T, U> = T extends Array<unknown> ? (U extends Array<unknown> ? [...T, ...U] : [...T]) : []
