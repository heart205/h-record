/**
 * @author heart
 * @description  707 设计链表
 * @Date 2022-06-06
 */

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */

// 链表是一种数据结构 应该和操作相分离

// 单链表实现
class LinkNode {
  constructor(public val: number, public next: LinkNode | null = null) {}
}

export class MyLinkedList {
  public prevNode: LinkNode | null = null // 存储头节点
  public head: LinkNode
  constructor() {
    this.head = new LinkNode(0)
  }
  get(index: number): number {
    let head: LinkNode | null = this.head
    for (let i = 0; i <= index; i++) {
      if (head === null) break
      head = head.next
    }
    return head === null ? -1 : head.val
  }

  addAtHead(val: number): void {
    const node = new LinkNode(val)
    if (this.head.next === null) {
      this.head.next = node
    } else {
      const next = this.head.next
      node.next = next
      this.head.next = node
    }
  }

  addAtTail(val: number): void {
    // 数组末尾添加元素
    let head = this.head
    const node = new LinkNode(val, null)
    while (head.next !== null) {
      head = head.next
    }
    head.next = node
  }

  addAtIndex(index: number, val: number): void {
    let head: LinkNode | null = this.head
    // 获取他的前一个值
    for (let i = 0; i < index; i++) {
      if (head === null) return
      head = head.next
    }
    if (head) {
      const tempNode = head.next
      const node = new LinkNode(val, tempNode)
      head.next = node
    }
  }

  deleteAtIndex(index: number): void {
    let head: LinkNode | null = this.head
    // 获取他的前一个值
    for (let i = 0; i < index; i++) {
      if (head === null) return
      head = head.next
    }
    if (head) {
      const deleteNode = head.next
      if (deleteNode && deleteNode.next) {
        head.next = deleteNode.next
      } else {
        head.next = null
      }
    }
  }
}

const linkList = new MyLinkedList()

linkList.addAtHead(1)

linkList.addAtTail(3)

linkList.addAtIndex(1, 2)

console.log(linkList.get(1))

linkList.deleteAtIndex(0)

console.log(linkList.head.next)
