/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
  // 多一个参数 记录 size 则每次不用遍历去判断边界
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

// TODO: 单链表优解
export class MyLinkedList2 {
  constructor(public size: number = 0, public head = new LinkNode(0)) {}

  get(index: number): number {
    if (index < 0 || index >= this.size) {
      return -1
    }
    let head: LinkNode | null = this.head
    for (let i = 0; i <= index; i++) {
      if (head === null) break
      head = head.next
    }
    return head === null ? -1 : head.val
  }

  addAtIndex(index: number, val: number): void {
    // 在第 index 个节点之前插入一个新节点，例如index为0，那么新插入的节点为链表的新头节点。
    // 如果 index 等于链表的长度，则说明是新插入的节点为链表的尾结点
    // 如果 index 大于链表的长度，则返回空
    if (index > this.size) return
    if (index < 0) {
      index = 0
    }
    let head: LinkNode | null = this.head // 前驱节点
    // 获取前驱节点
    for (let i = 0; i < index; i++) {
      if (head === null) break
      head = head.next
    }
    if (head) {
      const node = new LinkNode(val, null)
      // 前驱节点 插入值
      const next = head.next
      head.next = node
      node.next = next
      this.size++
    }
  }

  addAtHead(val: number) {
    this.addAtIndex(0, val)
  }

  addAtTail(val: number) {
    this.addAtIndex(this.size, val)
  }

  // 删除index的节点
  deleteAtIndex(index: number): void {
    if (index < 0 || index >= this.size) {
      return
    }
    let head: LinkNode | null = this.head

    for (let i = 0; i < index; i++) {
      // 前驱节点
      if (head === null) break
      head = head.next
    }
    if (head) {
      // 要被删除的节点不会为空
      head.next = head.next === null ? null : head.next.next
      this.size--
    }
  }
}

// TODO: 双向链表的实现:
class doubleLinkedList {
  // 记录当前值 记录上一个节点的值 记录下一个节点的值
  constructor(public val: number, public prevNode: doubleLinkedList | null, public nextNode: doubleLinkedList | null) {}
}

export class MyLinkedList3 {
  public head: doubleLinkedList | null
  public size: number
  constructor() {
    this.head = new doubleLinkedList(0, null, null)
    this.size = 0
  }

  get(index: number): number {
    if (index >= this.size || index < 0) return -1
    let head: doubleLinkedList | null = this.head
    for (let i = 0; i <= index; i++) {
      if (head === null) break
      head = head?.nextNode
    }
    return head === null ? -1 : head.val
  }

  addAtIndex(index: number, val: number): void {
    // 在第 index 个节点之前插入一个新节点，例如index为0，那么新插入的节点为链表的新头节点。
    // 如果 index 等于链表的长度，则说明是新插入的节点为链表的尾结点
    // 如果 index 大于链表的长度，则返回空
    if (index > this.size) return
    if (index < 0) index = 0
    let head = this.head
    for (let i = 0; i < index; i++) {
      if (head === null) break
      head = head.nextNode
    }
    // 此时的head就是前驱节点
    if (head) {
      const node = new doubleLinkedList(val, head, head.nextNode)
      const next = head.nextNode
      head.nextNode = node
      if (next) next.prevNode = node
      this.size++
    }
  }
  addAtHead(val: number) {
    this.addAtIndex(0, val)
  }
  addAtTail(val: number) {
    this.addAtIndex(this.size, val)
  }
  deleteAtIndex(index: number) {
    // 这里不能等于size 范围在 [0- this.size - 1]
    if (index >= this.size || index < 0) return

    let head = this.head
    for (let i = 0; i < index; i++) {
      // 找到前驱节点
      if (head === null) break
      head = head.nextNode
    }

    if (head) {
      // 前驱节点
      // 在范围内 有值
      const node = head.nextNode! // 要删除的节点
      head.nextNode = node.nextNode
      if (node.nextNode) {
        node.nextNode.prevNode = head
      }
      node.prevNode = null
      node.nextNode = null
      this.size--
    }
  }
}
