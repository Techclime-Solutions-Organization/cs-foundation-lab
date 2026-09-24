import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { DynamicArray } from './dynamic-array.js';

describe('DynamicArray', () => {
  it('starts empty with given capacity', () => {
    const arr = new DynamicArray(8);
    assert.equal(arr.length, 0);
    assert.equal(arr.capacity, 8);
  });

  it('rejects invalid capacity', () => {
    assert.throws(() => new DynamicArray(0), RangeError);
  });

  it('push and get work; grows capacity', () => {
    const arr = new DynamicArray(2);
    arr.push('a');
    arr.push('b');
    arr.push('c');
    assert.equal(arr.length, 3);
    assert.ok(arr.capacity >= 3);
    assert.equal(arr.get(0), 'a');
    assert.equal(arr.get(2), 'c');
  });

  it('set updates values', () => {
    const arr = new DynamicArray();
    arr.push(1);
    arr.set(0, 99);
    assert.equal(arr.get(0), 99);
  });

  it('pop removes last; empty pop throws', () => {
    const arr = new DynamicArray();
    arr.push(1);
    arr.push(2);
    assert.equal(arr.pop(), 2);
    assert.equal(arr.length, 1);
    arr.pop();
    assert.throws(() => arr.pop(), RangeError);
  });

  it('insert at beginning, middle, and end', () => {
    const arr = new DynamicArray();
    arr.push(2);
    arr.push(4);
    arr.insert(0, 1);
    arr.insert(2, 3);
    arr.insert(4, 5);
    assert.deepEqual(arr.toArray(), [1, 2, 3, 4, 5]);
  });

  it('removeAt and out-of-bounds', () => {
    const arr = new DynamicArray();
    arr.push('x');
    arr.push('y');
    arr.push('z');
    assert.equal(arr.removeAt(1), 'y');
    assert.deepEqual(arr.toArray(), ['x', 'z']);
    assert.throws(() => arr.get(5), RangeError);
    assert.throws(() => arr.removeAt(-1), RangeError);
  });

  it('indexOf finds values including duplicates position', () => {
    const arr = new DynamicArray();
    arr.push(1);
    arr.push(2);
    arr.push(2);
    assert.equal(arr.indexOf(2), 1);
    assert.equal(arr.indexOf(9), -1);
  });

  it('single element edge case', () => {
    const arr = new DynamicArray(1);
    arr.push(42);
    assert.equal(arr.get(0), 42);
    assert.equal(arr.pop(), 42);
    assert.equal(arr.length, 0);
  });
});
