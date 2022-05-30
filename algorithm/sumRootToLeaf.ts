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

export function sumRootToLeaf(root: TreeNode | null): number {
  // dfs遍历二叉树节点
  let result = 0
  result = dfs(root, 0)
  return result
}

function dfs(root: TreeNode | null, value: number): number {
  if (!root) return 0
  value = (value << 1) | root.val
  if (root.left === null && root.right === null) {
    return value
  }

  return dfs(root.left, value) + dfs(root.right, value)
}

export function sumRootToLeaf2(root: TreeNode | null): number {
  // dfs遍历二叉树节点
  const result: number[] = []
  let res = 0
  dfs2(root, 0, result)
  console.log(result)
  for (let i = 0; i < result.length; i++) {
    res += result[i]
  }
  return res
}

function dfs2(root: TreeNode | null, value: number, result: number[]) {
  if (!root) return
  value = (value << 1) | root.val
  if (root.left === null && root.right === null) {
    result.push(value)
    // root为null的时候 将数据加入到result中
  }
  dfs2(root.left, value, result)
  dfs2(root.right, value, result)
}
