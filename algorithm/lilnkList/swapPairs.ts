class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

export function swapPairs(head: ListNode | null): ListNode | null {
  const node = new ListNode(0, head)
  let oneNode = node.next,
    towNode = oneNode === null ? null : oneNode.next,
    tempNode = node
  while (towNode !== null && oneNode !== null) {
    const temp = towNode.next
    tempNode.next = towNode
    towNode.next = oneNode
    // 防止后续不在交换节点 在这里先让最后一个节点指向下一个节点
    oneNode.next = temp
    tempNode = oneNode
    oneNode = oneNode.next
    towNode = oneNode === null ? null : oneNode.next
  }
  return node.next
}
