/* eslint-disable @typescript-eslint/no-unused-vars */
type TupleToUnion<T> = T extends Array<unknown> ? T[number] : []

type case1 = TupleToUnion<[123, '456', true]>

export {}
