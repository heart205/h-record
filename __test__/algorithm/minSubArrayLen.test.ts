import { minSubArrayLen, minSubArrayLen2 } from '../../algorithm/arrays/minSubArrayLen'

describe('test minSubArrayLen', () => {
  it('to equal 2', () => {
    expect(minSubArrayLen(4, [1, 4, 4])).toBe(1)
    expect(minSubArrayLen2(4, [1, 4, 4])).toBe(1)
    expect(minSubArrayLen2(4, [1])).toBe(0)
    expect(minSubArrayLen2(1, [1])).toBe(1)
  })
})
