/**
 * @template T
 * @typedef {{ value: T, prev: ListNode<T> | null, next: ListNode<T> | null }} ListNode
 */

/**
 * Doubly linked list with head/tail pointers.
 * Bidirectional links enable O(1) remove when a node is known and efficient tail walks.
 * @template T
 */
export class DoublyLinkedList {
  constructor() {
    /** @type {ListNode<T> | null} */
    this.head = null;
    /** @type {ListNode<T> | null} */
    this.tail = null;
    this.size = 0;
  }

  /**
   * @param {T} value
   * @returns {ListNode<T>}
   */
  _node(value) {
    return { value, prev: null, next: null };
  }

  /**
   * Append at tail. O(1).
   * @param {T} value
   */
  append(value) {
    const node = this._node(value);
    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  /**
   * Prepend at head. O(1).
   * @param {T} value
   */
  prepend(value) {
    const node = this._node(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.size++;
  }

  /**
   * @param {number} index
   * @returns {T}
   */
  get(index) {
    return this._nodeAt(index).value;
  }

  /**
   * Insert at index. O(n).
   * @param {number} index
   * @param {T} value
   */
  insertAt(index, value) {
    if (index < 0 || index > this.size) {
      throw new RangeError(`Index ${index} out of bounds`);
    }
    if (index === 0) {
      this.prepend(value);
      return;
    }
    if (index === this.size) {
      this.append(value);
      return;
    }
    const next = this._nodeAt(index);
    const node = this._node(value);
    const prev = next.prev;
    node.prev = prev;
    node.next = next;
    prev.next = node;
    next.prev = node;
    this.size++;
  }

  /**
   * Remove at index. O(n) to locate; unlink is O(1).
   * @param {number} index
   * @returns {T}
   */
  removeAt(index) {
    const node = this._nodeAt(index);
    return this._unlink(node);
  }

  /**
   * Remove first occurrence of value. O(n).
   * @param {T} value
   * @returns {boolean}
   */
  remove(value) {
    let cur = this.head;
    while (cur) {
      if (Object.is(cur.value, value)) {
        this._unlink(cur);
        return true;
      }
      cur = cur.next;
    }
    return false;
  }

  /**
   * @param {T} value
   * @returns {number}
   */
  indexOf(value) {
    let i = 0;
    let cur = this.head;
    while (cur) {
      if (Object.is(cur.value, value)) return i;
      cur = cur.next;
      i++;
    }
    return -1;
  }

  /** @returns {T[]} */
  toArray() {
    const out = [];
    let cur = this.head;
    while (cur) {
      out.push(cur.value);
      cur = cur.next;
    }
    return out;
  }

  /** @returns {T[]} */
  toArrayReverse() {
    const out = [];
    let cur = this.tail;
    while (cur) {
      out.push(cur.value);
      cur = cur.prev;
    }
    return out;
  }

  /**
   * @param {ListNode<T>} node
   * @returns {T}
   */
  _unlink(node) {
    if (node.prev) node.prev.next = node.next;
    else this.head = node.next;
    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev;
    node.prev = node.next = null;
    this.size--;
    return node.value;
  }

  /**
   * Walk from the nearer end. O(n).
   * @param {number} index
   * @returns {ListNode<T>}
   */
  _nodeAt(index) {
    if (index < 0 || index >= this.size) {
      throw new RangeError(`Index ${index} out of bounds`);
    }
    if (index <= (this.size - 1) / 2) {
      let cur = this.head;
      for (let i = 0; i < index; i++) cur = cur.next;
      return cur;
    }
    let cur = this.tail;
    for (let i = this.size - 1; i > index; i--) cur = cur.prev;
    return cur;
  }
}
