import { removeElement } from '../../algorithm/removeElement'

test('pass ts test removeElement', () => {
  expect(removeElement([3, 2, 2, 3], 3)).toBe(2)

  expect(removeElement([3, 2, 2, 3, 3, 2, 3], 3)).toBe(3)
  expect(removeElement([3, 2, 2, 3], 3)).toBe(2)
})
