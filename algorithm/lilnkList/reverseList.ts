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

export function reverseList(head: ListNode | null): ListNode | null {
  let tempNode = null
  while (head !== null) {
    tempNode = new ListNode(head.val, tempNode)
    head = head.next
  }
  return tempNode
}

// 双指针法
export function reverseList2(head: ListNode | null): ListNode | null {
  if (head === null) return null
  let pre = head,
    next = head.next,
    temp = null
  pre.next = null
  while (next !== null) {
    temp = next.next
    next.next = pre
    pre = next
    next = temp
  }
  return pre
}
