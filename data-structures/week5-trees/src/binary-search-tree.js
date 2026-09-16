/**
 * Binary Search Tree storing comparable numbers (or values with < / >).
 */
export class BinarySearchTree {
  constructor() {
    /** @type {{ value: number, left: any, right: any } | null} */
    this.root = null;
    this.size = 0;
  }

  /**
   * Insert a value. Duplicates go to the right.
   * @param {number} value
   */
  insert(value) {
    const node = { value, left: null, right: null };
    if (!this.root) {
      this.root = node;
      this.size++;
      return;
    }
    let cur = this.root;
    while (true) {
      if (value < cur.value) {
        if (!cur.left) {
          cur.left = node;
          this.size++;
          return;
        }
        cur = cur.left;
      } else {
        if (!cur.right) {
          cur.right = node;
          this.size++;
          return;
        }
        cur = cur.right;
      }
    }
  }

  /**
   * @param {number} value
   * @returns {boolean}
   */
  contains(value) {
    let cur = this.root;
    while (cur) {
      if (value === cur.value) return true;
      cur = value < cur.value ? cur.left : cur.right;
    }
    return false;
  }

  /**
   * @param {number} value
   * @returns {boolean}
   */
  remove(value) {
    const result = this._removeNode(this.root, value);
    if (!result.found) return false;
    this.root = result.node;
    this.size--;
    return true;
  }

  /**
   * @param {any} node
   * @param {number} value
   */
  _removeNode(node, value) {
    if (!node) return { node: null, found: false };
    if (value < node.value) {
      const left = this._removeNode(node.left, value);
      node.left = left.node;
      return { node, found: left.found };
    }
    if (value > node.value) {
      const right = this._removeNode(node.right, value);
      node.right = right.node;
      return { node, found: right.found };
    }
    // found
    if (!node.left) return { node: node.right, found: true };
    if (!node.right) return { node: node.left, found: true };
    let successorParent = node;
    let successor = node.right;
    while (successor.left) {
      successorParent = successor;
      successor = successor.left;
    }
    node.value = successor.value;
    if (successorParent === node) {
      successorParent.right = successor.right;
    } else {
      successorParent.left = successor.right;
    }
    return { node, found: true };
  }

  /** @returns {number[]} */
  inOrder() {
    const out = [];
    const walk = (n) => {
      if (!n) return;
      walk(n.left);
      out.push(n.value);
      walk(n.right);
    };
    walk(this.root);
    return out;
  }

  /** @returns {number | null} */
  min() {
    if (!this.root) return null;
    let cur = this.root;
    while (cur.left) cur = cur.left;
    return cur.value;
  }

  /** @returns {number | null} */
  max() {
    if (!this.root) return null;
    let cur = this.root;
    while (cur.right) cur = cur.right;
    return cur.value;
  }
}
