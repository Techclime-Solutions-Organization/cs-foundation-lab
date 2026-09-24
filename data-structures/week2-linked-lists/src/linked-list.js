/**
 * @template T
 * @typedef {{ value: T, next: ListNode<T> | null }} ListNode
 */

/**
 * Singly linked list with head/tail pointers.
 * @template T
 */
export class LinkedList {
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
    return { value, next: null };
  }

  /**
   * Append at tail. O(1).
   * @param {T} value
   */
  append(value) {
    const node = this._node(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
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
    const prev = this._nodeAt(index - 1);
    const node = this._node(value);
    node.next = prev.next;
    prev.next = node;
    this.size++;
  }

  /**
   * Remove at index. O(n).
   * @param {number} index
   * @returns {T}
   */
  removeAt(index) {
    if (index < 0 || index >= this.size) {
      throw new RangeError(`Index ${index} out of bounds`);
    }
    if (index === 0) {
      const value = this.head.value;
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      this.size--;
      return value;
    }
    const prev = this._nodeAt(index - 1);
    const target = prev.next;
    prev.next = target.next;
    if (target === this.tail) this.tail = prev;
    this.size--;
    return target.value;
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

  /**
   * @param {number} index
   * @returns {ListNode<T>}
   */
  _nodeAt(index) {
    if (index < 0 || index >= this.size) {
      throw new RangeError(`Index ${index} out of bounds`);
    }
    let cur = this.head;
    for (let i = 0; i < index; i++) cur = cur.next;
    return cur;
  }
}
