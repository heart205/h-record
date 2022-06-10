// function ListNode(val) {
//   this.val = val
//   this.next = null
// }
/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
// hash 解法
export const getIntersectionNode = function (headA, headB) {
  let relativeNode = null // 关联的链表
  const set = new Set()
  while (headA) {
    if (headA === null) break
    set.add(headA)
    headA = headA.next
  }

  while (headB) {
    if (headB === null) return
    if (set.has(headB)) {
      relativeNode = headB
      break
    }
    headB = headB.next
  }
  return relativeNode
}
