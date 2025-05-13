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

  const charCounts = new Set();

  // Increment counts for characters in s
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    charCounts[char] = (charCounts[char] || 0) + 1;
  }

  // Decrement counts for characters in t
  for (let i = 0; i < t.length; i++) {
    const char = t[i];

    // If char in t is not in s or count becomes zero prematurely
    if (!charCounts[char]) {
      return false;
    }
    charCounts[char]--;
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
  `Is "listen" an anagram of "silent"? ${isAnagram('listen', 'silent')}`
); // Output: true
console.log(`Is "Aa" an anagram of "aa"? ${isAnagram('Aa', 'aa')}`); // Output: false (case-sensitive)
