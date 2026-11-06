import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('counts observed cells and marginals', () => {
  const x = api.contingencyTable(['a', 'a', 'b'], ['x', 'y', 'x']);
  assert.deepEqual(x.observed, [
    [1, 1],
    [1, 0],
  ]);
  assert.deepEqual(x.rowTotals, [2, 1]);
});
test('computes expected independence counts', () => {
  const x = api.contingencyTable(['a', 'a', 'b'], ['x', 'y', 'x']);
  assert.equal(x.expected[0][0], 4 / 3);
});
test('sorts category labels deterministically', () => {
  const x = api.contingencyTable(['z', 'a'], ['b', 'a']);
  assert.deepEqual(x.rows, ['a', 'z']);
  assert.deepEqual(x.columns, ['a', 'b']);
});
test('preserves zero cells', () => {
  assert.equal(api.contingencyTable(['a', 'b'], ['x', 'y']).observed[0][1], 0);
});
test('tracks total observations', () => {
  assert.equal(api.contingencyTable(['a', 'b'], ['x', 'y']).grandTotal, 2);
});
test('rejects unequal paired arrays', () => {
  assert.throws(() => api.contingencyTable(['a'], []), RangeError);
});
