import { mySqrt } from '../../algorithm/mysqrt'

test('mySqrt', () => {
  expect(mySqrt(0)).toBe(0)
  expect(mySqrt(4)).toBe(2)
  expect(mySqrt(1)).toBe(1)
  expect(mySqrt(8)).toBe(2)
  expect(mySqrt(64)).toBe(8)
})
