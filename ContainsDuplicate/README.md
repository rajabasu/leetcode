# Contains Duplicate Checker (JavaScript)

This repository contains a JavaScript function `containsDuplicate` that efficiently determines if an array of integers contains any duplicate values.

## Problem Statement

Given an integer array `arr`, the function returns `true` if any value appears at least twice in the array, and returns `false` if every element is distinct.

## Code

```javascript
/**
 * Checks if an integer arr contains any duplicate values.
 *
 * @param {number[]} arr The input array of integers.
 * @return {boolean} True if any value appears at least twice, false otherwise.
 */
const containsDuplicate = function (array) {
  // A Set stores only unique values.
  // We use it to keep track of the numbers we've seen so far.
  const seenNumbers = new Set();

  for (let i = 0; i <= array.length - 1; i++) {
    // If the set already has the current number, it means we've seen it before.
    // This indicates a duplicate.
    if (seenNumbers.has(num)) {
      return true; // Duplicate found
    }
    // If the number is not in the set, add it for future checks.
    seenNumbers.add(num);
  }

  // If the loop completes, it means no duplicates were found.
  return false; // All elements are distinct
};
```

## How It Works (Process)

The `containsDuplicate` function employs a straightforward and efficient strategy using a JavaScript `Set`:

1.  **Initialization**:

    - A `Set` named `seenNumbers` is created. A `Set` is a data structure that only stores unique values. This property is key to detecting duplicates.

2.  **Iteration**:

    - The function iterates through each `num` in the input array `array`.

3.  **Duplicate Check**:

    - For each `num`, it checks if `num` is already present in the `seenNumbers` set using the `has()` method.
    - **If `seenNumbers.has(num)` is `true`**: This means the current `num` has been encountered before in the array. A duplicate is found, and the function immediately returns `true`.
    - **If `seenNumbers.has(num)` is `false`**: This means the current `num` is being encountered for the first time. The function adds `num` to the `seenNumbers` set using the `add()` method. This ensures that if this number appears again later in the array, it will be identified as a duplicate.

4.  **No Duplicates Found**:
    - If the loop completes without finding any duplicates (i.e., the `if (seenNumbers.has(num))` condition was never met for any element), it means all elements in the array are distinct.
    - In this case, the function returns `false` after the loop finishes.

## Optimization and Efficiency

This approach is highly optimized for checking duplicates due to the properties of the `Set` data structure:

- **Fast Lookups**: The `has()` operation on a `Set` has an average time complexity of $O(1)$ (constant time). This means checking if an element already exists in the set is very fast, regardless of the number of elements already in the set or the array.
- **Single Pass**: The algorithm only needs to iterate through the input array once.

Compared to other potential methods:

- **Brute-Force (Nested Loops)**: Comparing each element with every other element would result in an $O(N^2)$ time complexity, which is significantly less efficient for larger arrays.
- **Sorting**: Sorting the array first and then checking for adjacent duplicates would typically have a time complexity of $O(N \log N)$ (due to the sort operation). While better than $O(N^2)$, it's still less efficient in terms of time than the $O(N)$ Set-based approach.

## Complexity Analysis

### Time Complexity: $O(N)$

- The function iterates through the input array `array` once. Let $N$ be the number of elements in `array`.
- For each element, the `Set.has()` and `Set.add()` operations take, on average, $O(1)$ time.
- Therefore, the total time complexity is proportional to $N$, resulting in $O(N)$.
- In the worst-case scenario (e.g., all elements are unique, or the duplicate is the very last element to be processed), we still only iterate through the array once.

### Space Complexity: $O(N)$

- In the worst-case scenario, if all elements in the input array `array` are unique, the `seenNumbers` Set will store up to $N$ distinct elements.
- Therefore, the space required by the `Set` is proportional to the number of elements in the input array, leading to a space complexity of $O(N)$.
- If duplicates are found early, the space used might be less than $N$, but the worst-case space complexity remains $O(N)$.

## Usage Example

```
const exampleArray1 = [1, 2, 3, 1];
console.log(`[${exampleArray1}] contains duplicate: ${containsDuplicate(exampleArray1)}`); // Output: true

const exampleArray2 = [1, 2, 3, 4];
console.log(`[${exampleArray2}] contains duplicate: ${containsDuplicate(exampleArray2)}`); // Output: false

const exampleArray3 = [];
console.log(`[${exampleArray3}] contains duplicate: ${containsDuplicate(exampleArray3)}`); // Output: false

const exampleArray4 = [1, 4, 3, 5, 4];
console.log(`[${exampleArray4}] contains duplicate: ${containsDuplicate(exampleArray4)}`); // Output: true
```
