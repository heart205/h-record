class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

// root 需要删除的节点
export function deleteNode(root: ListNode | null): void {
  if (!root) return
  root.val = root.next?.val || 0
  root.next = root.next?.next || null
}
