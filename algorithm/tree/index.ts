/**
 * @author heart
 * @description 数组转二叉树
 * @Date 2022-06-02
 * @description 如果父节点的数组下标是 i，那么它的左孩子就是 i * 2 + 1，右孩子就是 i * 2 + 2。
 */

class TreeNode<T> {
  val: T | number
  left: TreeNode<T> | null
  right: TreeNode<T> | null
  constructor(val?: T, left?: TreeNode<T> | null, right?: TreeNode<T> | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

function addTreeNode<T>(tree: TreeNode<T>, val: T, signIndex: 'left' | 'right') {
  tree[signIndex] = new TreeNode(val)
}

/**
 *
 * @param array
 * @param tree
 * @param index 父节点id
 * @returns
 */
function arrayToTreeNode<T>(array: T[], tree: TreeNode<T> | null, index: number) {
  if (tree === null) return
  const leftIndex = index * 2 + 1
  const rightIndex = leftIndex + 1
  if (index * 2 + 1 < array.length) {
    addTreeNode(tree, array[leftIndex], 'left')
    arrayToTreeNode(array, tree.left, leftIndex)
  }

  if (index * 2 + 2 < array.length) {
    addTreeNode(tree, array[rightIndex], 'right')
    arrayToTreeNode(array, tree.right, rightIndex)
  }
}

export default function generatorTree<T extends unknown[]>(array: T) {
  if (array.length === 0) return null
  const tree = new TreeNode(array[0])
  arrayToTreeNode(array, tree, 0)
  return tree
}
