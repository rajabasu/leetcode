# Two Sum Problem Solver (JavaScript)

This document explains a JavaScript solution for the "Two Sum" problem, a common coding challenge. The solution is optimized for time complexity and designed for compatibility with various JavaScript environments.

## Problem Statement

Given an array of integers `nums` and an integer `target`, return the _indices_ of the two numbers in the array such that they add up to `target`.

**Constraints and Assumptions:**

- You may assume that each input would have **exactly one solution**.
- You may **not** use the same element twice.
- The order of the returned indices does not matter.

**Example:**

If `nums = [2, 7, 11, 15]` and `target = 9`, the output should be `[0, 1]` because `nums[0] + nums[1] == 9`.

## Code: `twoSum`

```javascript
/**
 * Given an array of integers nums and an integer target, return indices of the two numbers
 * such that they add up to target.
 *
 * @param {number[]} nums The input array of integers.
 * @param {number} target The target sum.
 * @return {number[]} An array containing the indices of the two numbers.
 */
const twoSum = function (nums, target) {
  // Create a map to store numbers and their indices encountered so far.
  // Key: number from nums, Value: index of that number.
  const numMap = {}; // Using a plain object as a hash map

  // Iterate through the array.
  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i];
    // Calculate the complement needed to reach the target.
    const complement = target - currentNum;

    // Check if this complement has been seen before (i.e., exists in our map).
    if (numMap.hasOwnProperty(complement)) {
      // If the complement exists in the map, we've found our two numbers.
      // Return the index of the complement (stored in numMap) and the current index (i).
      return [numMap[complement], i];
    }

    // If the complement is not found, it means the current number (currentNum)
    // might be a part of a future pair. Store it and its index in the map.
    numMap[currentNum] = i;
  }

  // According to the problem statement, a solution always exists.
  // However, in a general scenario, you might return an empty array or throw an error
  // if no solution is found after checking all elements.
  return []; // Should not be reached given problem constraints.
};
```

## How `twoSum` Works

The `twoSum` function uses a hash map (implemented with a plain JavaScript object `numMap`) to achieve an efficient solution. Here's the step-by-step process:

1.  **Initialization**:

    - An empty object `numMap` is created. This object will store the numbers encountered so far as keys and their respective indices in the `nums` array as values. For example, if `nums[2]` is `5`, `numMap` might store `{ 5: 2 }`.

2.  **Iteration**:

    - The function iterates through the `nums` array using a `for` loop, examining each number (`currentNum`) and its index (`i`).

3.  **Calculate Complement**:

    - For each `currentNum`, it calculates the `complement`. The `complement` is the value that, when added to `currentNum`, would equal the `target`.
      - `complement = target - currentNum`

4.  **Check for Complement in Map**:

    - The function then checks if this `complement` already exists as a key in `numMap`.
      - `numMap.hasOwnProperty(complement)` is used for a robust check to ensure the property belongs to the object itself and not its prototype chain.
    - **If the `complement` is found in `numMap`**: This means the other number required to form the `target` sum has been encountered earlier in the array. The function has found the two numbers. It returns an array containing:
      - `numMap[complement]`: The index of the complement (which was stored when the complement was `currentNum` in a previous iteration).
      - `i`: The index of the `currentNum`.
    - **If the `complement` is NOT found in `numMap`**: This means the `currentNum` itself might be the first part of a future pair. The function stores `currentNum` and its index `i` into `numMap`:
      - `numMap[currentNum] = i;`
      - This way, if a future number's complement matches this `currentNum`, it can be quickly found.

5.  **Guaranteed Solution**:
    - The problem statement assumes that exactly one solution exists. Therefore, the loop is guaranteed to find a pair and return their indices. The `return [];` at the end is a fallback that shouldn't be reached under the problem's constraints.

## Optimization and Compatibility

- **Hash Map for Efficiency**: The use of `numMap` (a JavaScript object acting as a hash map) is key to the optimization. Looking up a key in an object has an average time complexity of $O(1)$.
- **Single Pass**: The algorithm iterates through the `nums` array only once.

## Complexity Analysis

- **Time Complexity:** $O(N)$

  - The function iterates through the `nums` array once, where $N$ is the number of elements in `nums`.
  - Inside the loop, operations like calculating the complement, accessing/inserting into the `numMap` (hash map), and `hasOwnProperty` take, on average, constant time ($O(1)$).
  - Therefore, the total time complexity is proportional to $N$.

- **Space Complexity:** $O(N)$
  - In the worst-case scenario, the `numMap` could store up to $N-1$ elements before finding the pair (e.g., if the pair is formed by the last element and one of the earlier elements).
  - Thus, the space required by `numMap` is proportional to the number of elements in the input array.

## Usage Example

```javascript
let nums = [2, 7, 11, 15];
let target = 9;
console.log(twoSum(nums, target)); // Output: [0, 1] (or [1, 0])

let nums2 = [3, 2, 4];
let target2 = 6;
console.log(twoSum(nums2, target2)); // Output: [1, 2] (or [2, 1])
```
