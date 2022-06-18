class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

export function detectCycle(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) return null
  // 利用hashSet存储 如果不存在 直接return
  const set = new Set<ListNode>()
  let node: ListNode | null = head
  while (node) {
    if (set.has(node)) {
      return node
    } else {
      set.add(node)
      node = node.next
    }
  }
  return null
}
