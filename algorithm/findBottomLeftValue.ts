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

export function findBottomLeftValue(root: TreeNode | null): number {
  // flag 标志着是否是左节点
  const result: Array<number[]> = []
  const dfs = (node: TreeNode | null, flag: boolean, deep: number) => {
    if (!node) return 2 ** 31 * -1
    if (node.left === null && node.right == null && flag) {
      result.push([node.val, deep])
    }
    if (node.left) {
      dfs(node.left, true, deep + 1)
    }
    if (node.right) {
      dfs(node.right, false, deep + 1)
    }
  }
  dfs(root, true, 1)

  let deep = 1,
    ans = root!.val
  for (let i = 0; i < result.length; i++) {
    if (result[i][1] > deep) {
      deep = result[i][1]
      ans = result[i][0]
    }
  }
  return ans
}
