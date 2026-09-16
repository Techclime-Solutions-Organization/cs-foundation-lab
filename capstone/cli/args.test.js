import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { parseArgs } from './args.js';

describe('parseArgs', () => {
  it('parses space and equals forms', () => {
    assert.deepEqual(parseArgs(['--product-id', '1', '--quantity', '5']), {
      'product-id': '1',
      quantity: '5',
    });
    assert.deepEqual(parseArgs(['--delta=10']), { delta: '10' });
  });

  it('handles flags without values', () => {
    assert.equal(parseArgs(['--verbose']).verbose, 'true');
  });

  it('handles empty argv', () => {
    assert.deepEqual(parseArgs([]), {});
  });
});
