import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { HashMap } from './hash-map.js';

describe('HashMap', () => {
  it('starts empty', () => {
    const map = new HashMap();
    assert.equal(map.size, 0);
    assert.equal(map.get('missing'), undefined);
  });

  it('set/get/has/delete', () => {
    const map = new HashMap();
    map.set('a', 1);
    map.set('b', 2);
    assert.equal(map.get('a'), 1);
    assert.equal(map.has('b'), true);
    assert.equal(map.delete('a'), true);
    assert.equal(map.has('a'), false);
    assert.equal(map.size, 1);
  });

  it('updates existing key', () => {
    const map = new HashMap();
    map.set('x', 1);
    map.set('x', 99);
    assert.equal(map.get('x'), 99);
    assert.equal(map.size, 1);
  });

  it('handles collisions via chaining', () => {
    const map = new HashMap(2);
    for (let i = 0; i < 20; i++) {
      map.set(`k${i}`, i);
    }
    assert.equal(map.size, 20);
    assert.equal(map.get('k7'), 7);
  });

  it('stores undefined value distinctly via has', () => {
    const map = new HashMap();
    map.set('u', undefined);
    assert.equal(map.has('u'), true);
    assert.equal(map.get('u'), undefined);
  });

  it('keys and values', () => {
    const map = new HashMap();
    map.set(1, 'one');
    map.set(2, 'two');
    assert.deepEqual(map.keys().sort(), [1, 2]);
    assert.deepEqual(map.values().sort(), ['one', 'two']);
  });

  it('delete missing returns false', () => {
    const map = new HashMap();
    assert.equal(map.delete('nope'), false);
  });
});
