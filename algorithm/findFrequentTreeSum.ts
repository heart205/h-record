export class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

export function findFrequentTreeSum(root: TreeNode | null): number[] {
  const map = new Map<number, number>()
  let maxVal = 0
  const dfs = (node: TreeNode | null): number => {
    if (!node) return 0
    // 当前遍历的节点的总和
    const counter = node.val + dfs(node.left) + dfs(node.right)
    if (map.has(counter)) {
      const val = map.get(counter)
      if (val === undefined) return 0
      map.set(counter, val + 1)
    } else {
      map.set(counter, 1)
    }
    // 保存最大的比较次数
    maxVal = Math.max(maxVal, map.get(counter) || 0)
    return counter
  }

  dfs(root)
  const result: number[] = []
  for (const [key, val] of map) {
    if (val === maxVal) {
      result.push(key)
    }
  }
  return result
}

// 当前的值减去父亲元素的值 就是当前子元素的所有和
