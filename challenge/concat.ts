

type Concat<T, U> = T extends Array<unknown> ? U extends Array<unknown> ? [...T,...U] : [...T] : []