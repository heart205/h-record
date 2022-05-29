import { reverse } from '../../algorithm/reverse'

test('test reverse', () => {
  expect(reverse(123)).toBe(321)

  expect(reverse(1232332423123)).toBe(0)

  expect(reverse(0)).toBe(0)

  expect(reverse(-123)).toBe(-321)
})
