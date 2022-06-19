import { TreeNode, findFrequentTreeSum } from '../../algorithm/findFrequentTreeSum'
describe('case 1: 5 -2 3', () => {
  it('should return [5, -2,3]', () => {
    const array = [5, -2, 3]
    const root = new TreeNode(array[0])
    root.left = new TreeNode(array[1])
    root.right = new TreeNode(array[2])
    expect(findFrequentTreeSum(root)).toEqual([-2, 3, 6])
  })

  it('should return [1]', () => {
    const array = [1]
    const root = new TreeNode(array[0])
    expect(findFrequentTreeSum(root)).toEqual([1])
  })
})
