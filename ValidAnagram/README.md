## Anagram Checker: `isAnagram` (Using a Single Frequency Map)

This section details an optimized JavaScript function, `isAnagram`, to efficiently determine if one string (`t`) is an anagram of another string (`s`) using a single frequency map. This solution is designed for compatibility with older JavaScript environments.

### Code: `isAnagram`

```javascript
/**
 * Checks if string t is an anagram of string s using a single frequency map.
 * Processes both strings in one loop and then verifies counts.
 * Compatible with older JavaScript environments.
 *
 * @param {string} s The first string.
 * @param {string} t The second string.
 * @return {boolean} True if t is an anagram of s, false otherwise.
 */
const isAnagram = function (s, t) {
  // Step 1: Check if lengths are different.
  // If the lengths of the strings are different, they cannot be anagrams.
  if (s.length !== t.length) {
    return false;
  }

  const charCounts = {}; // Initialize a single frequency map.

  // Step 2: Use a single traditional for loop to process both strings.
  // Increment count for characters from string s.
  // Decrement count for characters from string t.
  for (let i = 0; i < s.length; i++) {
    const charS = s[i];
    const charT = t[i];

    charCounts[charS] = (charCounts[charS] || 0) + 1;
    charCounts[charT] = (charCounts[charT] || 0) - 1;
  }

  // Step 3: Iterate through the character counts using Object.keys()
  // and a traditional for loop for older JS compatibility.
  // If any character count is not zero, the strings are not anagrams.
  const keys = Object.keys(charCounts); // Get an array of all keys in charCounts
  for (let i = 0; i < keys.length; i++) {
    const char = keys[i]; // Get the current character (key)
    if (charCounts[char] !== 0) {
      return false;
    }
  }

  // Step 4: If all counts are zero, the strings are anagrams.
  return true;
};
```

### How `isAnagram` Works

1. **Length Check**:

   - The function first checks if the lengths of `s` and `t` are different. If they are, the strings cannot be anagrams, and the function immediately returns `false`.

2. **Build Combined Frequency Map**:

   - A single JavaScript object, `charCounts`, is initialized to serve as a frequency map.

   - The function then iterates from `0` to `s.length - 1` using a traditional `for` loop (since `s.length` is equal to `t.length` at this point).

   - In each iteration:

     - The count for the character `s[i]` (from the first string) is incremented in `charCounts`.

     - The count for the character `t[i]` (from the second string) is decremented in `charCounts`.

   - The core idea is that if `s` and `t` are anagrams, they contain the same characters with the same frequencies. By incrementing for `s` and decrementing for `t`, all character counts in `charCounts` should become zero if the strings are indeed anagrams.

3. **Verify Zero Counts**:

   - After processing both strings, the function retrieves an array of all unique characters (keys) encountered using `Object.keys(charCounts)`.

   - It then iterates through this `keys` array. For each character, it checks its corresponding count in `charCounts`.

   - If any character's count is not `0`, it means the character frequencies did not perfectly match between `s` and `t`, indicating they are not anagrams. In this case, the function returns `false`.

4. **Result**:

   - If the loop completes and all character counts in `charCounts` are `0`, it confirms that `t` is an anagram of `s`. The function returns `true`.

### Optimization and Compatibility

- **Frequency Maps (Objects)**: Using a JavaScript object as a hash map (`charCounts`) provides an efficient way to store and update character frequencies.

- **Single Processing Loop**: This `isAnagram` method processes both input strings within a single primary `for` loop. This can offer slight performance benefits by reducing the overhead of multiple separate loops.

- **Older JavaScript Compatibility**:

  - Traditional `for` loops (`for (let i = 0; ... )`) are used for iterating based on string length.

  - `Object.keys()` is used to get an array of an object's property names (the characters). This array is then iterated using a traditional `for` loop. `Object.keys()` was introduced in ECMAScript 5 (ES5), which has very broad support across JavaScript environments, ensuring compatibility.

### Complexity Analysis for `isAnagram`

- **Time Complexity:** $O(N)$

  - Let $N$ be the length of string `s` (assuming `s.length === t.length`).

  - The primary loop runs $N$ times to populate/update the `charCounts` map. Operations inside this loop (object property access and arithmetic) are, on average, $O(1)$.

  - `Object.keys(charCounts)` takes time proportional to the number of unique characters, let's say $k$.

  - The subsequent loop iterates $k$ times to check if all counts are zero.

  - Since $k \le N$ (the number of unique characters cannot exceed the string length if they are anagrams, or $2N$ in general if they are not but have the same length), the dominant factor for the overall time complexity is $O(N)$.

- **Space Complexity:** $O(k)$

  - Where $k$ is the number of unique characters across both strings `s` and `t`.

  - The `charCounts` object will store at most $k$ distinct characters as keys.

  - In the worst-case scenario (e.g., all characters in `s` are unique and different from all characters in `t`, though the length check makes this specific case non-anagrammatic), $k$ could be up to $2N$. If they are anagrams, $k$ is the number of unique characters in `s` (or `t`). Generally, $k$ is bounded by the size of the character set (e.g., 26 for lowercase English letters, or a larger number for Unicode). If $k$ is considered constant (e.g. fixed alphabet size), space can be $O(1)$. Otherwise, it's $O(k)$ which can be $O(N)$ in the worst case of all unique characters in a string.

### Usage Example for `isAnagram`

```javascript
console.log(
  '--- Optimized Anagram Examples (Single Loop Method - Older JS Friendly) ---'
);

console.log(
  `Is "anagram" an anagram of "nagaram"? ${isAnagram('anagram', 'nagaram')}`
);
// Output: true

console.log(`Is "rat" an anagram of "car"? ${isAnagram('rat', 'car')}`);
// Output: false

console.log(
  `Is "listen" an anagram of "silent"? ${isAnagram('listen', 'silent')}`
);
// Output: true

console.log(`Is "hello" an anagram of "ollhe"? ${isAnagram('hello', 'ollhe')}`);
// Output: true

console.log(`Is "apple" an anagram of "apply"? ${isAnagram('apple', 'apply')}`);
// Output: false

console.log(`Is "" an anagram of ""? ${isAnagram('', '')}`);
// Output: true

console.log(`Is "a" an anagram of "b"? ${isAnagram('a', 'b')}`);
// Output: false

console.log(`Is "ab" an anagram of "a"? ${isAnagram('ab', 'a')}`);
// Output: false (due to length check)

console.log(`Is "aabb" an anagram of "bbaa"? ${isAnagram('aabb', 'bbaa')}`);
// Output: true

console.log(`Is "Aa" an anagram of "aa"? ${isAnagram('Aa', 'aa')}`);
// Output: false (comparison is case-sensitive)

console.log(`Is "aacc" an anagram of "ccac"? ${isAnagram('aacc', 'ccac')}`);
// Output: false
```
