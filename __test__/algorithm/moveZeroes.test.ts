import { moveZeroes } from '../../algorithm/moveZeroes'

describe('moveZeros', () => {
  it('1, 2, 3', () => {
    expect(moveZeroes([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('[0,1,0,3,12]', () => {
    expect(moveZeroes([0, 1, 0, 3, 12])).toEqual([1, 3, 12, 0, 0])
  })

  it('[0]', () => {
    expect(moveZeroes([0])).toEqual([0])
  })
  it('[1,0,1]', () => {
    expect(moveZeroes([1, 0, 1])).toEqual([1, 1, 0])
  })

  it('moveZeroes([4, 2, 4, 0, 0, 3, 0, 5, 1, 0])', () => {
    expect(moveZeroes([4, 2, 4, 0, 0, 3, 0, 5, 1, 0])).toEqual([4, 2, 4, 3, 5, 1, 0, 0, 0, 0])
  })
})
