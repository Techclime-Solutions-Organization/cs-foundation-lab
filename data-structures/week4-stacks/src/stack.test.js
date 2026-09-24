import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { Stack } from './stack.js';

describe('Stack', () => {
  it('starts empty', () => {
    const s = new Stack();
    assert.equal(s.size, 0);
    assert.equal(s.isEmpty(), true);
  });

  it('push/pop LIFO order', () => {
    const s = new Stack();
    s.push(1);
    s.push(2);
    s.push(3);
    assert.equal(s.pop(), 3);
    assert.equal(s.pop(), 2);
    assert.equal(s.pop(), 1);
  });

  it('peek does not remove', () => {
    const s = new Stack();
    s.push('a');
    assert.equal(s.peek(), 'a');
    assert.equal(s.size, 1);
  });

  it('single element', () => {
    const s = new Stack();
    s.push(42);
    assert.equal(s.peek(), 42);
    assert.equal(s.pop(), 42);
    assert.equal(s.isEmpty(), true);
  });

  it('empty pop/peek throw', () => {
    const s = new Stack();
    assert.throws(() => s.pop(), RangeError);
    assert.throws(() => s.peek(), RangeError);
  });

  it('allows duplicates', () => {
    const s = new Stack();
    s.push(1);
    s.push(1);
    assert.deepEqual(s.toArray(), [1, 1]);
  });
});
