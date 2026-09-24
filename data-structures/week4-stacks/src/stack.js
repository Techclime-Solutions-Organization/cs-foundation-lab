/**
 * Stack (LIFO) backed by a JavaScript array used only at the end.
 * @template T
 */
export class Stack {
  constructor() {
    /** @type {T[]} */
    this._items = [];
  }

  /** @returns {number} */
  get size() {
    return this._items.length;
  }

  /** @returns {boolean} */
  isEmpty() {
    return this._items.length === 0;
  }

  /**
   * @param {T} value
   */
  push(value) {
    this._items.push(value);
  }

  /**
   * @returns {T}
   */
  pop() {
    if (this.isEmpty()) {
      throw new RangeError('Cannot pop from empty Stack');
    }
    return this._items.pop();
  }

  /**
   * @returns {T}
   */
  peek() {
    if (this.isEmpty()) {
      throw new RangeError('Cannot peek empty Stack');
    }
    return this._items[this._items.length - 1];
  }

  /** @returns {T[]} */
  toArray() {
    return [...this._items];
  }
}
