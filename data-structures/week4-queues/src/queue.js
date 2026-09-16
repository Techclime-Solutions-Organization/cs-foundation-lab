/**
 * Queue (FIFO) using a singly linked list for O(1) enqueue/dequeue.
 * @template T
 */
export class Queue {
  constructor() {
    /** @type {{ value: T, next: any } | null} */
    this._head = null;
    /** @type {{ value: T, next: any } | null} */
    this._tail = null;
    this._size = 0;
  }

  /** @returns {number} */
  get size() {
    return this._size;
  }

  /** @returns {boolean} */
  isEmpty() {
    return this._size === 0;
  }

  /**
   * @param {T} value
   */
  enqueue(value) {
    const node = { value, next: null };
    if (!this._tail) {
      this._head = this._tail = node;
    } else {
      this._tail.next = node;
      this._tail = node;
    }
    this._size++;
  }

  /**
   * @returns {T}
   */
  dequeue() {
    if (!this._head) {
      throw new RangeError('Cannot dequeue from empty Queue');
    }
    const value = this._head.value;
    this._head = this._head.next;
    if (!this._head) this._tail = null;
    this._size--;
    return value;
  }

  /**
   * @returns {T}
   */
  peek() {
    if (!this._head) {
      throw new RangeError('Cannot peek empty Queue');
    }
    return this._head.value;
  }

  /** @returns {T[]} */
  toArray() {
    const out = [];
    let cur = this._head;
    while (cur) {
      out.push(cur.value);
      cur = cur.next;
    }
    return out;
  }
}
