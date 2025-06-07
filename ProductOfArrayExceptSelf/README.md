# Product of Array Except Self

Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.

The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

---

## Examples

### Example 1

**Input:**

```
nums = [1,2,3,4]
```

**Output:**

```
[24,12,8,6]
```

### Example 2

**Input:**

```
nums = [-1,1,0,-3,3]
```

**Output:**

```
[0,0,9,0,0]
```

---

# Full Solution Code

```js
// Product of Array Except Self - O(n) solution without division
// Returns an array where each element is the product of all other elements

const productExceptSelf = (nums) => {
  const n = nums.length;
  const answer = Array(n).fill(1);

  // First pass: calculate prefix products
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    answer[i] = prefix;
    // console.log(`Prefix pass [i=${i}]: answer =`, answer, 'prefix =', prefix);
    prefix *= nums[i];
  }
  // console.log('After prefix pass: answer =', answer);

  // Second pass: calculate suffix products and multiply
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= suffix;
    // console.log(`Suffix pass [i=${i}]: answer =`, answer, 'suffix =', suffix);
    suffix *= nums[i];
  }
  // console.log('After suffix pass: answer =', answer);

  // Convert -0 to 0 for display consistency
  const finalAnswer = answer.map((x) => (Object.is(x, -0) ? 0 : x));
  // console.log('Final answer (with -0 converted to 0):', finalAnswer);
  return finalAnswer;
};

// Example usage:
console.log('Result for [1, 2, 3, 4]:');
console.log(productExceptSelf([1, 2, 3, 4])); // Output: [24,12,8,6]

console.log('Result for [1, 2, 3, -4]:');
console.log(productExceptSelf([1, 2, 3, -4])); // Output: [-24,-12,-8,6]

console.log('Result for [-1, 1, 0, -3, 3]:');
console.log(productExceptSelf([-1, 1, 0, -3, 3])); // Output: [0,0,9,0,0]

console.log('Result for [2, 4, 6, 8]:');
console.log(productExceptSelf([2, 4, 6, 8])); // Output: [192, 96, 64, 48]

console.log('Result for [-2, -4, -6, -8]:');
console.log(productExceptSelf([-2, -4, -6, -8])); // Output: [-192, -96, -64, -48]

console.log('Result for [0, 0, 2, 3]:');
console.log(productExceptSelf([0, 0, 2, 3])); // Output: [0, 0, 0, 0]

console.log('Result for [5]:');
console.log(productExceptSelf([5])); // Output: [1]

console.log('Result for [7, 3]:');
console.log(productExceptSelf([7, 3])); // Output: [3, 7]
```

---

# Edge Cases

Edge cases are special or boundary input scenarios that test the robustness and correctness of the algorithm. Handling these ensures your solution works for all valid inputs, not just typical cases. Here are some important edge cases for this problem, with explanations:

- **Single element:** `[5]` → `[1]`

  - _Explanation:_ With only one element, there are no other numbers to multiply, so the product except self is 1 (the multiplicative identity). This checks if the algorithm handles the minimum input size.

- **Two elements:** `[7, 3]` → `[3, 7]`

  - _Explanation:_ Each element's product except self is just the other element. This tests if the algorithm works for the smallest array where exclusion is meaningful.

- **All zeros:** `[0, 0, 0]` → `[0, 0, 0]`

  - _Explanation:_ Every product except self will include at least one zero, so all outputs are zero. This checks if the algorithm handles multiple zeros correctly.

- **Multiple zeros:** `[0, 0, 2, 3]` → `[0, 0, 0, 0]`

  - _Explanation:_ More than one zero means every product except self will be zero, since every product will include at least one zero. This tests the handling of multiple zeros in the input.

- **All negative numbers:** `[-2, -4, -6, -8]` → `[-192, -96, -64, -48]`

  - _Explanation:_ The product of all negatives except one will alternate in sign. This checks if the algorithm handles negative numbers and sign changes correctly.

- **Mixed positive and negative:** `[1, 2, 3, -4]` → `[-24, -12, -8, 6]`

  - _Explanation:_ Checks if the algorithm correctly computes the sign of the result when both positive and negative numbers are present.

- **Input with one zero:** `[1, 2, 0, 4]` → `[0, 0, 8, 0]`
  - _Explanation:_ Only the position where the zero is excluded will have a nonzero product (the product of all nonzero elements). All other positions will be zero. This tests if the algorithm can handle a single zero in the input.

Testing these edge cases ensures the solution is robust, handles all possible scenarios, and does not break on unusual or boundary inputs.

---

# Code Explanation

## Step 1: Initialize Output Array

- We create an array `answer` of length `n` (same as `nums`) and fill it with 1s. This will store our result.

## Step 2: Prefix Product Pass

- We use a variable `prefix` to keep track of the product of all elements to the left of the current index.
- For each index `i`, we set `answer[i]` to `prefix`, then update `prefix` by multiplying it with `nums[i]`.
- After this pass, `answer[i]` contains the product of all elements to the left of `i`.

## Step 3: Suffix Product Pass

- We use a variable `suffix` to keep track of the product of all elements to the right of the current index.
- We iterate from right to left. For each index `i`, we multiply `answer[i]` by `suffix`, then update `suffix` by multiplying it with `nums[i]`.
- After this pass, `answer[i]` contains the product of all elements to the left and right of `i` (i.e., all except `nums[i]`).

## Step 4: Convert -0 to 0

- For display consistency, we convert any `-0` values in the result to `0` using `Object.is(x, -0) ? 0 : x`.
- This does not affect the correctness or complexity of the solution, but ensures the output matches expected results.

## Step 5: Return the Result

- The `answer` array now contains the product of all elements except self for each index, with all `-0` values converted to `0`.

---

# Solution Explanation

To solve this problem in O(n) time without using division, we use the prefix and suffix product approach:

### Step 1: Prefix Products

- For each index, calculate the product of all elements to the left (prefix).
- Store this in the answer array.

### Step 2: Suffix Products

- Traverse from right to left, maintaining the product of all elements to the right (suffix).
- Multiply the current value in the answer array by the suffix product.

This way, each position in the answer array contains the product of all elements except itself.

---

# Example Walkthrough

For `nums = [1,2,3,4]`:

- **Prefix pass:**  
  answer = [1, 1, 2, 6]
- **Suffix pass:**  
  answer = [24, 12, 8, 6]

---

# Complexity Analysis

Let's break down the time and space complexity of the solution step by step:

## Time Complexity

1. **Prefix Product Pass**

   - The first for-loop iterates through the array once to compute the prefix products.
   - Each operation inside the loop is O(1).
   - **Time for this step:** O(n)

2. **Suffix Product Pass**

   - The second for-loop iterates through the array once (from right to left) to compute the suffix products and multiply them into the answer array.
   - Each operation inside the loop is O(1).
   - **Time for this step:** O(n)

3. **Post-processing to Convert -0 to 0**
   - The final `.map()` iterates through the array once to convert any `-0` to `0`.
   - Each operation inside the map is O(1).
   - **Time for this step:** O(n)

**Total Time Complexity:**

- O(n) + O(n) + O(n) = **O(n)**
- This is optimal, as every element must be processed at least once.

---

## Space Complexity

1. **Output Array**

   - The answer array is required by the problem and is of size n.
   - **Space:** O(n) (not counted as extra space by LeetCode convention)

2. **Variables**

   - Only a constant number of variables (`prefix`, `suffix`, `n`, and loop counters) are used.
   - **Space:** O(1)

3. **Post-processing**
   - The `.map()` creates a new array of size n, but since the output array is required, this does not count as extra space.
   - **Space:** O(1) extra

**Total Space Complexity:**

- **O(1) extra space** (excluding the output array)
- The solution is in-place with respect to extra memory usage, aside from the required output.

---

## Summary Table

| Step                      | Time Complexity | Space Complexity |
| ------------------------- | --------------- | ---------------- |
| Prefix Product Pass       | O(n)            | O(1)             |
| Suffix Product Pass       | O(n)            | O(1)             |
| Post-processing (-0 to 0) | O(n)            | O(1)             |
| **Total**                 | **O(n)**        | **O(1) extra**   |

- **n** = length of input array `nums`

**This makes the solution both time and space optimal for this problem.**

---

# Summary

- We use two passes: one to accumulate prefix products, and one for suffix products.
- No division is used, and the solution is O(n) time and O(1) extra space.
- The implementation converts all `-0` values to `0` for display consistency, but this does not affect performance or correctness.
- This method is robust and works for arrays containing zeros and negative numbers.
- The function handles negative numbers and zeros correctly, and the sign of the result is determined by the number of negative numbers in the input.
