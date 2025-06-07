// Product of Array Except Self - O(n) solution without division
// Returns an array where each element is the product of all other elements

const productExceptSelf = (nums) => {
  const n = nums.length;
  const answer = Array(n).fill(1);

  // First pass: calculate prefix products
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    answer[i] = prefix;
    prefix *= nums[i];
  }

  // Second pass: calculate suffix products and multiply
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= suffix;
    suffix *= nums[i];
  }

  // Convert -0 to 0 for display consistency
  const finalAnswer = answer.map((x) => (Object.is(x, -0) ? 0 : x));
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
