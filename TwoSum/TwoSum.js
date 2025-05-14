/**
 * Given an array of integers nums and an integer target, return indices of the two numbers
 * such that they add up to target.
 *
 * You may assume that each input would have exactly one solution,
 * and you may not use the same element twice.
 *
 * @param {number[]} nums The input array of integers.
 * @param {number} target The target sum.
 * @return {number[]} An array containing the indices of the two numbers, or an empty array if no solution is found.
 */

const twoSum = (nums, target) => {
  const numMap = {};

  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i];
    const complement = target - currentNum;

    if (numMap.hasOwnProperty(complement)) {
      return [numMap[complement], i];
    }

    numMap[currentNum] = i;
  }

  return [];
};

// Example Usage:
console.log('--- Two Sum Examples ---');

let nums1 = [2, 7, 11, 15];
let target1 = 9;
console.log(
  `nums: [${nums1}], target: ${target1} -> indices: [${twoSum(nums1, target1)}]`
); // Expected: [0, 1] or [1, 0]

let nums2 = [3, 2, 4];
let target2 = 6;
console.log(
  `nums: [${nums2}], target: ${target2} -> indices: [${twoSum(nums2, target2)}]`
); // Expected: [1, 2] or [2, 1]

let nums3 = [3, 3];
let target3 = 6;
console.log(
  `nums: [${nums3}], target: ${target3} -> indices: [${twoSum(nums3, target3)}]`
); // Expected: [0, 1] or [1, 0]

let nums4 = [0, 4, 3, 0];
let target4 = 0;
console.log(
  `nums: [${nums4}], target: ${target4} -> indices: [${twoSum(nums4, target4)}]`
); // Expected: [0,3]

let nums5 = [-1, -3, 7, 2, 5];
let target5 = 4;
console.log(
  `nums: [${nums5}], target: ${target5} -> indices: [${twoSum(nums5, target5)}]`
); // Expected: [0,4] (or other valid pairs if multiple existed)
