/**
 * HashMap with separate chaining. Does not use built-in Map.
 * Keys are stringified for hashing; Object.is used for equality within a bucket.
 */
export class HashMap {
  /**
   * @param {number} [capacity=16]
   * @param {number} [loadFactor=0.75]
   */
  constructor(capacity = 16, loadFactor = 0.75) {
    if (capacity < 1) throw new RangeError('capacity must be >= 1');
    /** @type {Array<Array<{ key: unknown, value: unknown }>>} */
    this._buckets = Array.from({ length: capacity }, () => []);
    this._size = 0;
    this._loadFactor = loadFactor;
  }

  /** @returns {number} */
  get size() {
    return this._size;
  }

  /**
   * @param {unknown} key
   * @returns {number}
   */
  _hash(key) {
    const str = typeof key === 'string' ? key : String(key);
    let hash = 2166136261;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0) % this._buckets.length;
  }

  _maybeResize() {
    if (this._size / this._buckets.length <= this._loadFactor) return;
    const old = this._buckets;
    this._buckets = Array.from({ length: old.length * 2 }, () => []);
    this._size = 0;
    for (const bucket of old) {
      for (const entry of bucket) {
        this.set(entry.key, entry.value);
      }
    }
  }

  /**
   * @param {unknown} key
   * @param {unknown} value
   */
  set(key, value) {
    const idx = this._hash(key);
    const bucket = this._buckets[idx];
    for (const entry of bucket) {
      if (Object.is(entry.key, key)) {
        entry.value = value;
        return;
      }
    }
    bucket.push({ key, value });
    this._size++;
    this._maybeResize();
  }

  /**
   * @param {unknown} key
   * @returns {unknown | undefined}
   */
  get(key) {
    const bucket = this._buckets[this._hash(key)];
    for (const entry of bucket) {
      if (Object.is(entry.key, key)) return entry.value;
    }
    return undefined;
  }

  /**
   * @param {unknown} key
   * @returns {boolean}
   */
  has(key) {
    return this._find(key) !== null;
  }

  /**
   * @param {unknown} key
   * @returns {{ key: unknown, value: unknown } | null}
   */
  _find(key) {
    const bucket = this._buckets[this._hash(key)];
    for (const entry of bucket) {
      if (Object.is(entry.key, key)) return entry;
    }
    return null;
  }

  /**
   * @param {unknown} key
   * @returns {boolean}
   */
  delete(key) {
    const idx = this._hash(key);
    const bucket = this._buckets[idx];
    for (let i = 0; i < bucket.length; i++) {
      if (Object.is(bucket[i].key, key)) {
        bucket.splice(i, 1);
        this._size--;
        return true;
      }
    }
    return false;
  }

  /** @returns {unknown[]} */
  keys() {
    const out = [];
    for (const bucket of this._buckets) {
      for (const entry of bucket) out.push(entry.key);
    }
    return out;
  }

  /** @returns {unknown[]} */
  values() {
    const out = [];
    for (const bucket of this._buckets) {
      for (const entry of bucket) out.push(entry.value);
    }
    return out;
  }
}
