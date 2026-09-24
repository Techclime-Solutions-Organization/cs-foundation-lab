import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { DoublyLinkedList } from './doubly-linked-list.js';

describe('DoublyLinkedList', () => {
  it('starts empty', () => {
    const list = new DoublyLinkedList();
    assert.equal(list.size, 0);
    assert.deepEqual(list.toArray(), []);
    assert.deepEqual(list.toArrayReverse(), []);
  });

  it('append and prepend keep prev/next links', () => {
    const list = new DoublyLinkedList();
    list.append(2);
    list.append(3);
    list.prepend(1);
    assert.deepEqual(list.toArray(), [1, 2, 3]);
    assert.deepEqual(list.toArrayReverse(), [3, 2, 1]);
    assert.equal(list.size, 3);
  });

  it('get and insertAt in the middle', () => {
    const list = new DoublyLinkedList();
    list.append('a');
    list.append('c');
    list.insertAt(1, 'b');
    assert.equal(list.get(1), 'b');
    assert.deepEqual(list.toArray(), ['a', 'b', 'c']);
    assert.deepEqual(list.toArrayReverse(), ['c', 'b', 'a']);
  });

  it('removeAt head, middle, tail', () => {
    const list = new DoublyLinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    list.append(4);
    assert.equal(list.removeAt(0), 1);
    assert.equal(list.removeAt(1), 3);
    assert.equal(list.removeAt(1), 4);
    assert.deepEqual(list.toArray(), [2]);
    assert.equal(list.head, list.tail);
  });

  it('remove by value and duplicates', () => {
    const list = new DoublyLinkedList();
    list.append('x');
    list.append('y');
    list.append('x');
    assert.equal(list.remove('x'), true);
    assert.deepEqual(list.toArray(), ['y', 'x']);
    assert.equal(list.indexOf('x'), 1);
    assert.equal(list.remove('z'), false);
  });

  it('single element then empty', () => {
    const list = new DoublyLinkedList();
    list.append(7);
    assert.equal(list.get(0), 7);
    assert.equal(list.removeAt(0), 7);
    assert.equal(list.size, 0);
    assert.equal(list.head, null);
    assert.equal(list.tail, null);
  });

  it('out-of-bounds throws', () => {
    const list = new DoublyLinkedList();
    list.append(1);
    assert.throws(() => list.get(2), RangeError);
    assert.throws(() => list.removeAt(-1), RangeError);
    assert.throws(() => list.insertAt(3, 9), RangeError);
  });
});
