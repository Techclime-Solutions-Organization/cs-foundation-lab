/**
 * DynamicArray — a growable array with amortized O(1) append.
 * Uses a backing store that doubles capacity when full.
 */
export class DynamicArray {
  /**
   * @param {number} [initialCapacity=4]
   */
  constructor(initialCapacity = 4) {
    if (initialCapacity < 1) {
      throw new RangeError('initialCapacity must be >= 1');
    }
    /** @type {unknown[]} */
    this._data = new Array(initialCapacity);
    this._size = 0;
    this._capacity = initialCapacity;
  }

  /** @returns {number} */
  get length() {
    return this._size;
  }

  /** @returns {number} */
  get capacity() {
    return this._capacity;
  }

  /**
   * @param {number} index
   * @returns {unknown}
   */
  get(index) {
    this._checkBounds(index);
    return this._data[index];
  }

  /**
   * @param {number} index
   * @param {unknown} value
   */
  set(index, value) {
    this._checkBounds(index);
    this._data[index] = value;
  }

  /**
   * Append a value. Amortized O(1).
   * @param {unknown} value
   */
  push(value) {
    if (this._size === this._capacity) {
      this._resize(this._capacity * 2);
    }
    this._data[this._size++] = value;
  }

  /**
   * Remove and return the last value. O(1).
   * @returns {unknown}
   */
  pop() {
    if (this._size === 0) {
      throw new RangeError('Cannot pop from empty DynamicArray');
    }
    const value = this._data[--this._size];
    this._data[this._size] = undefined;
    return value;
  }

  /**
   * Insert at index, shifting right. O(n).
   * @param {number} index
   * @param {unknown} value
   */
  insert(index, value) {
    if (index < 0 || index > this._size) {
      throw new RangeError(`Index ${index} out of bounds for size ${this._size}`);
    }
    if (this._size === this._capacity) {
      this._resize(this._capacity * 2);
    }
    for (let i = this._size; i > index; i--) {
      this._data[i] = this._data[i - 1];
    }
    this._data[index] = value;
    this._size++;
  }

  /**
   * Remove at index, shifting left. O(n).
   * @param {number} index
   * @returns {unknown}
   */
  removeAt(index) {
    this._checkBounds(index);
    const value = this._data[index];
    for (let i = index; i < this._size - 1; i++) {
      this._data[i] = this._data[i + 1];
    }
    this._size--;
    this._data[this._size] = undefined;
    return value;
  }

  /**
   * @param {unknown} value
   * @returns {number} index or -1
   */
  indexOf(value) {
    for (let i = 0; i < this._size; i++) {
      if (Object.is(this._data[i], value)) return i;
    }
    return -1;
  }

  /** @returns {unknown[]} */
  toArray() {
    return this._data.slice(0, this._size);
  }

  /** @param {number} newCapacity */
  _resize(newCapacity) {
    const next = new Array(newCapacity);
    for (let i = 0; i < this._size; i++) {
      next[i] = this._data[i];
    }
    this._data = next;
    this._capacity = newCapacity;
  }

  /** @param {number} index */
  _checkBounds(index) {
    if (index < 0 || index >= this._size) {
      throw new RangeError(`Index ${index} out of bounds for size ${this._size}`);
    }
  }
}
