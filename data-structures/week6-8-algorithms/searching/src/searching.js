/**
 * Linear search — O(n).
 * @param {unknown[]} arr
 * @param {unknown} target
 * @returns {number} index or -1
 */
export function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (Object.is(arr[i], target)) return i;
  }
  return -1;
}

/**
 * Binary search on a sorted ascending array — O(log n).
 * @param {number[]} arr
 * @param {number} target
 * @returns {number} index or -1
 */
export function binarySearch(arr, target) {
  let lo = 0;
  let hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    const val = arr[mid];
    if (val === target) return mid;
    if (val < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
