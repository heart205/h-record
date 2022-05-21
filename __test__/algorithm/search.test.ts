/**
 * @author heart
 * @description 二分查找
 * @Date 2022-05-21
 */

import { search } from '../../algorithm/search'

test('二分查找', () => {
  expect(search([-1, 0, 3, 5, 9, 12], 9)).toBe(4)

  expect(search([-1, 0, 3, 5, 9, 12], 2)).toBe(-1)

  expect(search([5], 5)).toBe(0)

  expect(search([5], 4)).toBe(-1)

  expect(search([1, 5], 5)).toBe(1)

  expect(search([1, 5], 2)).toBe(-1)
})
