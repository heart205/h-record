class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

export function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  const node = new ListNode(0, head) // 头节点

  let temp: ListNode | null = node
  let size = 0

  while (temp !== null) {
    temp = temp.next
    size++
  }

  const count = size - n //顺序多少个

  // 找到前一个节点
  temp = node
  for (let i = 1; i < count; i++) {
    if (temp === null) break
    temp = temp.next
  }

  if (temp) {
    const next = temp.next
    if (next) {
      temp.next = next.next
      next.next = null
    }
  }

  return node.next
}
