import { removeOuterParentheses } from '../../algorithm/removeOuterParentheses'

test('removeOuterParentheses', () => {
  expect(removeOuterParentheses('(()())(())(()(()))')).toBe('()()()()(())')

  expect(removeOuterParentheses('((()())(()()))')).toBe('(()())(()())')
})
