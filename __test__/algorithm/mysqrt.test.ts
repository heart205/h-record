import { mySqrt, mySqrt2 } from '../../algorithm/mysqrt'

test('mySqrt', () => {
  expect(mySqrt(0)).toBe(0)
  expect(mySqrt(4)).toBe(2)
  expect(mySqrt(1)).toBe(1)
  expect(mySqrt(8)).toBe(2)
  expect(mySqrt(64)).toBe(8)
})

test('mysqrt2', () => {
  for (let i = 0; i < 2 ** 10; i++) {
    expect(mySqrt2(i)).toBe(mySqrt(i))
  }
})
