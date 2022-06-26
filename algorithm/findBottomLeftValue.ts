/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}
// 每次优先遍历左边节点
export function findBottomLeftValue(root: TreeNode | null): number {
  // flag 标志着是否是左节点
  const result: Array<number> = []
  const dfs = (node: TreeNode | null, deep: number) => {
    if (!node) return
    if (result[deep] === undefined) {
      result[deep] = node.val
    }
    if (node.left) {
      dfs(node.left, deep + 1)
    }
    if (node.right) {
      dfs(node.right, deep + 1)
    }
  }
  dfs(root, 0)
  const ans = result.length > 0 ? result[result.length - 1] : 2 ** 31 * -1
  return ans
}
