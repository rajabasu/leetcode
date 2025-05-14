/**
 * Given an array of strings `strs`, group the anagrams together.
 * You can return the answer in any order.
 *
 * An Anagram is a word or phrase formed by rearranging the letters of a
 * different word or phrase, typically using all the original letters exactly once.
 *
 * Example 1:
 * Input: strs = ["eat","tea","tan","ate","nat","bat"]
 * Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
 *
 * Example 2:
 * Input: strs = [""]
 * Output: [[""]]
 *
 * Example 3:
 * Input: strs = ["a"]
 * Output: [["a"]]
 *
 * Constraints:
 * - 1 <= strs.length <= 10^4
 * - 0 <= strs[i].length <= 100
 * - strs[i] consists of lowercase English letters.
 *
 * @param {string[]} strs
 * @return {string[][]}
 */

const groupAnagrams = (strs) => {
  const anagramGroups = new Map();

  for (let i = 0; i < strs.length; i++) {
    const str = strs[i];

    const charCount = Array(26).fill(0);

    for (let j = 0; j < str.length; j++) {
      charCount[str.charCodeAt(j) - 97]++;
    }

    const key = charCount.join('#');

    console.log({ key });

    if (!anagramGroups.has(key)) {
      console.log({ key, anagramGroups });
      anagramGroups.set(key, []);
    }

    console.log({ charCount });

    anagramGroups.get(key).push(str);
  }

  return Array.from(anagramGroups.values());
};

console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
// Expected: [["eat","tea","ate"],["tan","nat"],["bat"]] (order of groups and strings within groups may vary)

console.log(groupAnagrams(['']));
// Expected: [[""]]

console.log(groupAnagrams(['a']));
// Expected: [["a"]]
