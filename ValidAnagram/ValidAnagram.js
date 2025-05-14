/**
 * Given two strings s and t, return true if t is an anagram of s, and false otherwise.
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
 * typically using all the original letters exactly once.
 *
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

const isAnagram = (s, t) => {
  if (s.length !== t.length) return false;

  const charCounts = {};

  // Increment count for characters from string s.
  // Decrement count for characters from string t.
  for (let i = 0; i < s.length; i++) {
    const charS = s[i];
    const charT = t[i];

    charCounts[charS] = (charCounts[charS] || 0) + 1;
    charCounts[charT] = (charCounts[charT] || 0) - 1;
  }

  // If any character count is not zero, the strings are not anagrams.
  const keys = Object.keys(charCounts);
  for (let i = 0; i < keys.length; i++) {
    const char = keys[i];
    if (charCounts[char] !== 0) {
      return false;
    }
  }

  // All counts should be zero if they are anagrams
  // This check is implicitly handled by the decrement loop.
  // If the loop finishes, it means all characters in t were found in s with matching frequencies.
  return true;
};

console.log(
  `Is "anagram" an anagram of "nagaram"? ${isAnagram('anagram', 'nagaram')}`
); // Output: true
console.log(`Is "rat" an anagram of "car"? ${isAnagram('rat', 'car')}`); // Output: false

console.log(
  `Is "anagram" an anagram of "nagaram"? ${isAnagram('anagram', 'nagaram')}`
); // Output: true
console.log(`Is "rat" an anagram of "car"? ${isAnagram('rat', 'car')}`); // Output: false
console.log(
  `Is "listen" an anagram of "silent"? ${isAnagram('listen', 'silent')}`
); // Output: true
console.log(`Is "hello" an anagram of "ollhe"? ${isAnagram('hello', 'ollhe')}`); // Output: true
console.log(`Is "Aa" an anagram of "aa"? ${isAnagram('Aa', 'aa')}`); // Output: false (case-sensitive)
