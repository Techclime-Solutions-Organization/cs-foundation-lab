import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { LinkedList } from './linked-list.js';

describe('LinkedList', () => {
  it('starts empty', () => {
    const list = new LinkedList();
    assert.equal(list.size, 0);
    assert.deepEqual(list.toArray(), []);
  });

  it('append and prepend', () => {
    const list = new LinkedList();
    list.append(2);
    list.append(3);
    list.prepend(1);
    assert.deepEqual(list.toArray(), [1, 2, 3]);
    assert.equal(list.size, 3);
  });

  it('get and insertAt', () => {
    const list = new LinkedList();
    list.append('a');
    list.append('c');
    list.insertAt(1, 'b');
    assert.equal(list.get(1), 'b');
    assert.deepEqual(list.toArray(), ['a', 'b', 'c']);
  });

  it('removeAt head, middle, tail', () => {
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    list.append(4);
    assert.equal(list.removeAt(0), 1);
    assert.equal(list.removeAt(1), 3);
    assert.equal(list.removeAt(1), 4);
    assert.deepEqual(list.toArray(), [2]);
  });

  it('single element list', () => {
    const list = new LinkedList();
    list.append(7);
    assert.equal(list.get(0), 7);
    assert.equal(list.removeAt(0), 7);
    assert.equal(list.size, 0);
    assert.equal(list.head, null);
    assert.equal(list.tail, null);
  });

  it('duplicates and indexOf', () => {
    const list = new LinkedList();
    list.append('x');
    list.append('y');
    list.append('x');
    assert.equal(list.indexOf('x'), 0);
    assert.equal(list.indexOf('z'), -1);
  });

  it('out-of-bounds throws', () => {
    const list = new LinkedList();
    list.append(1);
    assert.throws(() => list.get(2), RangeError);
    assert.throws(() => list.removeAt(-1), RangeError);
    assert.throws(() => list.insertAt(3, 9), RangeError);
  });
});
