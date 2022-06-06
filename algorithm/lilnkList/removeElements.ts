/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

export function removeElements(head: ListNode | null, val: number): ListNode | null {
  // 判断头节点是否是相同的元素
  while (head && head.val === val) {
    head = head.next
  }
  if (head === null) return null

  let node: ListNode | null = head

  // 移除元素的节点
  let preNode: ListNode = head
  let tempNode: ListNode | null = null
  while (node !== null) {
    if (node.val === val) {
      // 移除元素
      tempNode = node.next
      preNode.next = tempNode
    } else {
      preNode = node
    }
    node = node.next
  }

  return head
}
