# Group Anagrams

## Problem Description

Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Constraints:**

- `1 <= strs.length <= 10^4`
- `0 <= strs[i].length <= 100`
- `strs[i]` consists of lowercase English letters.

### Example 1:

**Input:** `strs = ["eat","tea","tan","ate","nat","bat"]`  
**Output:** `[["bat"],["nat","tan"],["ate","eat","tea"]]`

### Example 2:

**Input:** `strs = [""]`  
**Output:** `[[""]]`

### Example 3:

**Input:** `strs = ["a"]`  
**Output:** `[["a"]]`

---

## Approach: Categorize by Character Count

The most efficient way to group anagrams is to use a canonical representation for each string such that all its anagrams map to the same representation. A common and effective canonical representation is the count of each character in the string.

### Steps:

1. **Generate a Character Count Key:**

   - For each string in the input array:
     - Create a frequency array (e.g., of size 26 for lowercase English letters 'a' through 'z'), initializing all counts to zero.
     - Iterate through the characters of the string. For each character, increment its corresponding count in the frequency array.
     - Convert this frequency array into a unique string key. For instance, if 'a' appears once, 'b' twice, and 'c' zero times, the key might look like `"1#2#0#..."`. Using a separator (like `#`) is important to distinguish counts like `[1, 12]` from `[11, 2]`.

2. **Group Using a Hash Map:**

   - Initialize an empty hash map (in JavaScript, a `Map` object is suitable).
   - For each string from the input:
     - Generate its character count key.
     - If this key is not already in the hash map, add it and associate it with a new empty list (array).
     - Append the original string to the list associated with its key.

3. **Collect Results:**
   - After processing all strings, the values of the hash map will be lists, where each list contains strings that are anagrams of each other.
   - Convert these lists (the values of the map) into the final output format, which is typically an array of arrays of strings.

This approach ensures that all anagrams, having identical character counts, will map to the same key and thus be grouped together.

---

## Code

```javascript
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  // Create a Map to store grouped anagrams
  // Key: string representation of character counts
  // Value: array of anagram strings
  const anagramGroups = new Map();

  // Iterate through each string in the input array
  for (let i = 0; i < strs.length; i++) {
    const str = strs[i]; // Current string

    // Create a character count array of length 26 initialized to 0
    // Represents count of each letter from 'a' to 'z'
    const charCount = Array(26).fill(0);

    // Count characters in the current string
    for (let j = 0; j < str.length; j++) {
      // str.charCodeAt(j) returns ASCII of character
      // Subtract 97 ('a'.charCodeAt(0)) to map 'a' → 0, ..., 'z' → 25
      charCount[str.charCodeAt(j) - 97]++;
    }

    // Join character count array using '#' to form a unique key
    // for example: [1,2,0,...] => "1#2#0#...", to differentiate "1#11#2#22#222"
    const key = charCount.join('#');

    // If this key is not in the map, create an empty array for it
    if (!anagramGroups.has(key)) {
      anagramGroups.set(key, []);
    }

    // Push the current string into the appropriate anagram group
    anagramGroups.get(key).push(str);
  }

  // Return all grouped anagrams as an array of arrays
  return Array.from(anagramGroups.values());
};
```

---

## How It Works

### Step-by-step:

1. **Map Creation**:  
   `anagramGroups = new Map();`

   - A `Map` is used to group anagrams by a unique key derived from character counts.

2. **Iterate Over Strings**:  
   `for (let i = 0; i < strs.length; i++) { ... }`

   - Loop over every string in the `strs` array.

3. **Character Frequency Array**:  
   `const charCount = Array(26).fill(0);`

   - Initializes an array of size 26 (one for each letter in the alphabet) with all values set to 0.

4. **Update Character Counts**:

   ```javascript
   for (let j = 0; j < str.length; j++) {
     charCount[str.charCodeAt(j) - 97]++;
   }
   ```

   - For each character in the string, calculate its index (0 for 'a', 1 for 'b', ..., 25 for 'z') and increment the respective index in `charCount`.

5. **Generate Key**:  
   `const key = charCount.join('#');`

   - Convert the character frequency array into a string key. The `#` separator prevents confusion between character counts. (to differentiate "1#11#2#22#222")

6. **Group Anagrams**:

   ```javascript
   if (!anagramGroups.has(key)) {
     anagramGroups.set(key, []);
   }
   anagramGroups.get(key).push(str);
   ```

   - If this key doesn’t exist in the map, create a new entry. Then push the string into the corresponding group.

7. **Return Result**:  
   `return Array.from(anagramGroups.values());`
   - Extract all grouped anagrams from the `Map` and return them as an array of arrays.

---

## Complexity Analysis

Let:

- `M` = number of strings in input array `strs`
- `N` = maximum length of a single string

### Time Complexity: `O(M ⋅ N)`

- Outer loop runs `M` times.
- Inner loop (to count characters) runs up to `N` times per string.
- Joining the `charCount` array takes `O(26)` which is constant time.
- Map operations (get, set, has) are effectively `O(1)`.

So, total time: `O(M ⋅ (N + 26))` → simplified to **`O(M ⋅ N)`**

### Space Complexity: `O(M ⋅ N)`

- Each group can store up to all `M` strings.
- The total characters across all strings is `O(M ⋅ N)`.
- Each key is a fixed-size string of 26 counts → `O(M)` keys max.

So overall: **`O(M ⋅ N)`**

---

## Summary

- **Efficient** method to group anagrams using frequency counts instead of sorting.
- **Avoids** repeated sorting operations which would cost `O(N log N)` per string.
- Uses a **fixed-size array** for character counting, making it suitable for large input sizes.
