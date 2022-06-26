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
export function largestValues(root: TreeNode | null): number[] {
  const result: number[] = []
  const dfs = (node: TreeNode | null, deep: number) => {
    if (!node) return
    // 比较值
    if (result[deep] === undefined) {
      result[deep] = node.val
    } else {
      result[deep] = Math.max(node.val, result[deep])
    }
    if (node.left) {
      dfs(node.left, deep + 1)
    }

    if (node.right) {
      dfs(node.right, deep + 1)
    }
  }
  dfs(root, 0)
  return result
}
