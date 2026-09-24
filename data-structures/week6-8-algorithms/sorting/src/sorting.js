/**
 * Selection sort — O(n²). Returns a new array.
 * @param {number[]} arr
 * @returns {number[]}
 */
export function selectionSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < a.length; j++) {
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      const tmp = a[i];
      a[i] = a[minIdx];
      a[minIdx] = tmp;
    }
  }
  return a;
}

/**
 * Insertion sort — O(n²) worst, O(n) best on nearly sorted.
 * @param {number[]} arr
 * @returns {number[]}
 */
export function insertionSort(arr) {
  const a = [...arr];
  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = key;
  }
  return a;
}

/**
 * Merge sort — O(n log n).
 * @param {number[]} arr
 * @returns {number[]}
 */
export function mergeSort(arr) {
  if (arr.length <= 1) return [...arr];
  const mid = arr.length >> 1;
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

/**
 * @param {number[]} left
 * @param {number[]} right
 * @returns {number[]}
 */
function merge(left, right) {
  const out = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) out.push(left[i++]);
    else out.push(right[j++]);
  }
  while (i < left.length) out.push(left[i++]);
  while (j < right.length) out.push(right[j++]);
  return out;
}
