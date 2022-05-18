import { plusOne } from '../../algorithm/plusOne'

describe('plusOne', () => {
  it('1, 2, 3', () => {
    expect(plusOne([1, 2, 3])).toEqual([1, 2, 4])
  })

  it('0', () => {
    expect(plusOne([0])).toEqual([1])
  })

  it('19', () => {
    expect(plusOne([1, 9])).toEqual([2, 0])
  })

  it('9999', () => {
    expect(plusOne([9, 9, 9, 9])).toEqual([1, 0, 0, 0, 0])
  })
})
