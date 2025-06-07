# Top K Frequent Elements

Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in **any order**.

---

## Example 1

**Input:**

```
nums = [1,1,1,2,2,3], k = 2
```

**Output:**

```
[1,2]
```

## Example 2

**Input:**

```
nums = [1], k = 1
```

**Output:**

```
[1]
```

---

# Top K Frequent Elements - Detailed Explanation

This document explains the step-by-step logic behind the bucket sort solution for the "Top K Frequent Elements" problem, as implemented in `TopKFrequentElements.js`.

---

## Full Solution Code

```js
const topKFrequent = (nums, k) => {
  // Step 1: Count frequencies
  const freqMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  // Step 2: Create buckets
  const buckets = Array(nums.length + 1)
    .fill()
    .map(() => []);
  const entries = Array.from(freqMap.entries());
  for (let i = 0; i < entries.length; i++) {
    const [num, freq] = entries[i];
    buckets[freq].push(num);
  }

  // Step 3: Gather top k frequent elements
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    for (let j = 0; j < buckets[i].length; j++) {
      result.push(buckets[i][j]);
      if (result.length === k) break;
    }
    if (result.length === k) break;
  }
  return result;
};
```

---

## Code Explanation

### Step 1: Count Frequencies

We use a `Map` to count how many times each number appears in the input array:

```js
const freqMap = new Map();
for (let i = 0; i < nums.length; i++) {
  const num = nums[i];
  freqMap.set(num, (freqMap.get(num) || 0) + 1);
}
```

- We iterate through `nums`.
- For each number, we increment its count in `freqMap`.

### Step 2: Create Buckets

We create an array of buckets, where the index represents the frequency. Each bucket at index `i` will contain all numbers that appear exactly `i` times:

```js
const buckets = Array(nums.length + 1)
  .fill()
  .map(() => []);
const entries = Array.from(freqMap.entries());
for (let i = 0; i < entries.length; i++) {
  const [num, freq] = entries[i];
  buckets[freq].push(num);
}
```

- We create `nums.length + 1` empty buckets (since the maximum frequency cannot exceed the length of the array).
- For each `[num, freq]` pair in `freqMap`, we push `num` into the bucket at index `freq`.

### Step 3: Gather Top K Frequent Elements

We collect the most frequent elements by iterating from the highest frequency bucket downwards, adding numbers to the result until we have `k` elements:

```js
const result = [];
for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
  for (let j = 0; j < buckets[i].length; j++) {
    result.push(buckets[i][j]);
    if (result.length === k) break;
  }
  if (result.length === k) break;
}
```

- We start from the end of the buckets array (highest frequency).
- For each bucket, we add its numbers to the result.
- We use `break` statements to stop as soon as we've collected `k` elements.

### Step 4: Return the Result

```js
return result;
```

- The result array contains the `k` most frequent elements.

---

## Example

**Input:**

```
nums = [1,1,1,2,2,3], k = 2
```

**Execution:**

- Frequency map: `{1: 3, 2: 2, 3: 1}`
- Buckets: `[[], [3], [2], [1]]` (index = frequency)
- Collect from highest frequency: `[1, 2]`

**Output:**

```
[1, 2]
```

---

## Complexity Analysis (Detailed)

Let's break down the time and space complexity of the bucket sort solution step by step:

### Time Complexity

1. **Counting Frequencies**

   ```js
   for (let i = 0; i < nums.length; i++) { ... }
   ```

   - We iterate through the `nums` array once.
   - Each operation inside the loop (getting and setting values in a Map) is O(1) on average.
   - **Total time for this step:** O(N), where N is the length of `nums`.

2. **Creating Buckets and Filling Them**

   ```js
   const buckets = Array(nums.length + 1).fill().map(() => []);
   const entries = Array.from(freqMap.entries());
   for (let i = 0; i < entries.length; i++) { ... }
   ```

   - Creating the buckets array is O(N) because we create `nums.length + 1` empty arrays.
   - Converting the frequency map to an array of entries is O(M), where M is the number of unique elements (M ≤ N).
   - Filling the buckets involves iterating over all unique elements, so O(M).
   - **Total time for this step:** O(N) (since M ≤ N).

3. **Collecting Top K Frequent Elements**
   ```js
   for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
     for (let j = 0; j < buckets[i].length; j++) {
       result.push(buckets[i][j]);
       if (result.length === k) break;
     }
     if (result.length === k) break;
   }
   ```
   - In the worst case, we may need to look at all elements in the buckets, but we stop as soon as we've collected k elements.
   - Since k ≤ N, this step is O(N) in the worst case.

**Overall Time Complexity:**

- Each step is O(N), so the total time complexity is **O(N)**.
- This is optimal, as we must examine every element at least once.

---

### Space Complexity

1. **Frequency Map**

   - Stores up to M unique elements and their counts.
   - **Space:** O(M), where M ≤ N.

2. **Buckets Array**

   - We create an array of length N+1, where each entry is an array (some may be empty).
   - In total, all numbers are distributed among the buckets, so the total number of elements stored is N.
   - **Space:** O(N) for the buckets.

3. **Result Array**
   - Stores up to k elements.
   - **Space:** O(k).

**Overall Space Complexity:**

- The dominant terms are O(N) for the buckets and O(M) for the frequency map.
- Since M ≤ N, the total space complexity is **O(N)**.

---

### Summary Table

| Step               | Time Complexity | Space Complexity |
| ------------------ | --------------- | ---------------- |
| Frequency Counting | O(N)            | O(M)             |
| Bucketing          | O(N)            | O(N)             |
| Collecting Results | O(N)            | O(k)             |
| **Total**          | **O(N)**        | **O(N)**         |

- **N** = length of input array `nums`
- **M** = number of unique elements in `nums` (M ≤ N)
- **k** = number of top frequent elements to return

This makes the bucket sort approach both time and space optimal for this problem.

---

## Summary

This bucket sort approach is optimal for the Top K Frequent Elements problem, providing both efficiency and clarity. It leverages the fact that the maximum possible frequency is bounded by the array length, allowing us to use an array of buckets for fast lookup and collection.
