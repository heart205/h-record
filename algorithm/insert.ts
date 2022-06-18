/**
 * @author heart
 * @description
 * @Date 2022-06-18
 */

class Node {
  val: number
  next: Node | null
  constructor(val?: number, next?: Node) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

export function insert(head: Node | null, insertVal: number): Node | null {
  if (!head) {
    head = new Node(insertVal)
    head.next = head
    return head
  }
  // 遍历一遍数组
  let maxNode = head,
    minNode = head
  if (head && head.next === null) {
    head.next = new Node(insertVal, head)
    return head
  }
  let temp: Node | null = head.next
  while (temp && temp !== head) {
    if (maxNode && maxNode.val <= temp.val) {
      maxNode = temp
    } else if (minNode && minNode.val >= temp.val) {
      minNode = temp
    }
    temp = temp.next
  }
  // 判断值 最大值还是i最小值 都应该插入到最后 因为是循环链表 首位没区别
  if ((maxNode && insertVal > maxNode.val) || (minNode && insertVal < minNode.val)) {
    maxNode.next = new Node(insertVal, maxNode.next!)
    return head
  }
  let left: Node | null = head
  while (left && left.next !== head) {
    if (left && left.val <= insertVal && left.next && left.next.val >= insertVal) {
      break
    }
    left = left.next
  }
  if (left && left.next) {
    left.next = new Node(insertVal, left.next)
  }
  return head
}

export function arrayToNode(arr: number[]): Node | null {
  let head: Node = new Node()
  const temp: Node = head
  for (let i = 0; i < arr.length; i++) {
    head.next = new Node(arr[i])
    head = head.next
  }
  head.next = temp.next
  return temp.next
}
// console.log(insert(arrayToNode([3, 3, 3]), 0))
export {}
