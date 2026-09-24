import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { Queue } from './queue.js';

describe('Queue', () => {
  it('starts empty', () => {
    const q = new Queue();
    assert.equal(q.size, 0);
    assert.equal(q.isEmpty(), true);
  });

  it('enqueue/dequeue FIFO', () => {
    const q = new Queue();
    q.enqueue('a');
    q.enqueue('b');
    q.enqueue('c');
    assert.equal(q.dequeue(), 'a');
    assert.equal(q.dequeue(), 'b');
    assert.equal(q.dequeue(), 'c');
  });

  it('peek does not remove', () => {
    const q = new Queue();
    q.enqueue(10);
    assert.equal(q.peek(), 10);
    assert.equal(q.size, 1);
  });

  it('single element then empty', () => {
    const q = new Queue();
    q.enqueue(1);
    assert.equal(q.dequeue(), 1);
    assert.equal(q.isEmpty(), true);
    assert.throws(() => q.dequeue(), RangeError);
    assert.throws(() => q.peek(), RangeError);
  });

  it('duplicates preserved in order', () => {
    const q = new Queue();
    q.enqueue(2);
    q.enqueue(2);
    assert.deepEqual(q.toArray(), [2, 2]);
  });
});
