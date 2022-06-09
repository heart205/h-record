/**
 * @author heart
 * @description 两数字相加
 * @Date 2022-06-09
 */
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

// // 反转链表
// function reverseLinkedList(li: ListNode | null) {
//   let head = null
//   let temp = null
//   while (li !== null) {
//     temp = new ListNode(li.val, head)
//     head = temp
//     li = li.next
//   }
//   return head
// }
export function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  // 创建两个链表 将逆序链表反转
  let templ1 = l1,
    templ2 = l2
  const head = new ListNode()
  let count = 0,
    number = 0, // 用于记录是否超过了10
    tempNode = head
  while (templ1 !== null && templ2 !== null) {
    count = (templ1.val + templ2.val + number) % 10

    number = Math.floor((templ1.val + templ2.val + number) / 10)
    tempNode.next = new ListNode(count)
    tempNode = tempNode.next
    templ1 = templ1.next
    templ2 = templ2.next
  }

  while (templ1) {
    count = (templ1.val + number) % 10
    number = Math.floor((templ1.val + number) / 10)
    tempNode.next = new ListNode(count)
    tempNode = tempNode.next
    templ1 = templ1.next
  }

  while (templ2) {
    count = (templ2.val + number) % 10
    number = Math.floor((templ2.val + number) / 10)
    tempNode.next = new ListNode(count)
    tempNode = tempNode.next
    templ2 = templ2.next
  }

  if (number === 1) {
    tempNode.next = new ListNode(number)
  }
  return head.next
}
