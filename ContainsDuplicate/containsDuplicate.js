/**
 * Given an integer array nums, return true if any value appears at least twice in the array,
 * and return false if every element is distinct.
 *
 * @param {number[]} arr
 * @return {boolean}
 */

const containsDuplicate = (array) => {
  const seenNumbers = new Set();

  for (let i = 0; i <= array.length - 1; i++) {
    const num = array[i];
    if (seenNumbers.has(num)) {
      return true;
    }
    seenNumbers.add(num);
  }

  return false;
};

// Given array
const arr = [1, 4, 3, 5, 6, 7, 8, 9, 10];

// Check for duplicates
const result = containsDuplicate(arr);

// Output the result
console.log(result); // Output: true
