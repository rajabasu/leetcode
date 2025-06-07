# Valid Sudoku

Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

1. Each row must contain the digits 1-9 without repetition.
2. Each column must contain the digits 1-9 without repetition.
3. Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.

**Note:**

- A Sudoku board (partially filled) could be valid but is not necessarily solvable.
- Only the filled cells need to be validated according to the mentioned rules.

**Constraints:**

- `board.length == 9`
- `board[i].length == 9`
- `board[i][j]` is a digit 1-9 or '.'

---

## Examples

### Example 1

**Input:**

```
board =
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
```

**Output:**

```
true
```

### Example 2

**Input:**

```
board =
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
```

**Output:**

```
false
```

**Explanation:** Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.

---

# Full Solution Code

```js
// Valid Sudoku - O(1) space for board size, O(1) time for fixed 9x9 board
const isValidSudoku = (board) => {
  const rows = Array.from({ length: 9 }, () => new Set());
  const cols = Array.from({ length: 9 }, () => new Set());
  const boxes = Array.from({ length: 9 }, () => new Set());

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const val = board[i][j];
      if (val === '.') continue;
      const boxIdx = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      if (rows[i].has(val) || cols[j].has(val) || boxes[boxIdx].has(val)) {
        return false;
      }
      rows[i].add(val);
      cols[j].add(val);
      boxes[boxIdx].add(val);
    }
  }
  return true;
};
```

---

# Example Usage

You can use the following code snippets to test the function and see the output in your console:

```js
const board1 = [
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
];
console.log(isValidSudoku(board1)); // true

const board2 = [
  ['8', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
];
console.log(isValidSudoku(board2)); // false
```

---

# Code Explanation

1. **Initialization:**

   - We create three arrays of sets: `rows`, `cols`, and `boxes`.
     - `rows[i]` tracks the digits seen in row `i`.
     - `cols[j]` tracks the digits seen in column `j`.
     - `boxes[boxIdx]` tracks the digits seen in the 3x3 sub-box with index `boxIdx`.
   - The box index for cell `(i, j)` is calculated as `Math.floor(i / 3) * 3 + Math.floor(j / 3)`.

2. **Iterating through the board:**

   - For each cell `(i, j)`, if the value is '.', we skip it (empty cell).
   - Otherwise, we check if the digit is already present in the corresponding row, column, or box set.
     - If it is, the board is invalid, so we return `false` immediately.
     - If not, we add the digit to the corresponding sets.

3. **Completion:**
   - If we finish checking all cells without finding any duplicates, the board is valid, so we return `true`.

**Why use sets?**

- Sets provide O(1) time complexity for checking existence and adding elements, making the solution efficient.
- They also make the code clean and easy to understand.

**Why calculate box index this way?**

- The board is divided into nine 3x3 sub-boxes, each of which must also contain unique digits.
- To uniquely identify which sub-box a cell (i, j) belongs to, we use the formula:
  - `boxIdx = Math.floor(i / 3) * 3 + Math.floor(j / 3)`
- **How does this work?**
  - `Math.floor(i / 3)` gives the row index of the sub-box (0, 1, or 2).
  - `Math.floor(j / 3)` gives the column index of the sub-box (0, 1, or 2).
  - Multiplying the row index by 3 and adding the column index gives a unique index from 0 to 8 for each sub-box:
    - Sub-box indices:
      - Top-left: 0
      - Top-middle: 1
      - Top-right: 2
      - Middle-left: 3
      - Center: 4
      - Middle-right: 5
      - Bottom-left: 6
      - Bottom-middle: 7
      - Bottom-right: 8
- **Why is this correct and efficient?**
  - This formula ensures that every cell in the same 3x3 sub-box maps to the same index, allowing us to use a single array of sets to track all sub-boxes efficiently.
  - It is simple, fast (O(1)), and avoids the need for nested loops or extra data structures.

---

# Complexity Analysis

Let's break down the time and space complexity of the solution step by step:

## Time Complexity

1. **Iterating through the board**

   - The board is always 9x9, so there are 81 cells to check.
   - For each cell, we perform a constant number of operations: checking and adding to up to three sets (row, column, box).
   - Each set operation (has, add) is O(1) because the sets are small and the number of possible digits is limited (1-9).
   - **Total time for this step:** 81 × O(1) = O(1) (constant time for fixed board size)

2. **Early exit**
   - If a duplicate is found, the function returns immediately, making it even faster in practice for invalid boards.

**If the board were NxN:**

- The time complexity would be O(N^2), since we would check every cell in an N×N board.
- For standard Sudoku, N=9 is fixed, so the time is O(1).

---

## Space Complexity

1. **Sets for rows, columns, and boxes**

   - We use three arrays, each containing 9 sets (one for each row, column, and box).
   - Each set can store up to 9 digits (1-9), so the total number of elements stored is at most 3 × 9 × 9 = 243, but in practice, each set only stores unique digits for its row, column, or box.
   - The space for each set is O(1) because the number of possible digits is fixed.

2. **Auxiliary variables**
   - Only a constant number of variables are used for iteration and temporary storage.

**If the board were NxN:**

- We would need 3N sets, each capable of storing up to N digits, so the space complexity would be O(N).
- For standard Sudoku, N=9 is fixed, so the space is O(1).

---

## Summary Table

| Step                      | Time Complexity | Space Complexity |
| ------------------------- | --------------- | ---------------- |
| Iterate through board     | O(1)            | O(1)             |
| Set operations (per cell) | O(1)            | O(1)             |
| **Total (9x9 board)**     | **O(1)**        | **O(1)**         |
| **Total (NxN board)**     | **O(N^2)**      | **O(N)**         |

- **N** = length of one side of the board (N=9 for standard Sudoku)

**This makes the solution both time and space optimal for the standard 9x9 Sudoku problem.**

---

# Edge Cases

- **Empty board:** All cells are '.' — should return true (no violations). Tests if the function handles the minimum input.
- **Only one filled cell:** Should return true (no possibility of repetition). Checks if the function works for sparse boards.
- **Duplicate in a row, column, or box:** Should return false. Ensures the function catches all types of violations.
- **Multiple violations:** Should return false as soon as the first is found. Tests early exit and efficiency.
- **Board with only one type of digit filled in multiple places:** Should return false if any row, column, or box has a duplicate. Checks for correct duplicate detection.
- **Partially filled but valid board:** Should return true. Ensures the function does not require the board to be complete.

---

# Summary

- The solution efficiently checks all Sudoku rules using sets for rows, columns, and boxes.
- It returns false immediately upon finding a violation, making it fast in practice.
- The approach is optimal for the fixed 9x9 board size, with O(1) time and space.
- Handles all edge cases, including empty and partially filled boards.
- The code is easy to test and extend for custom board sizes if needed.
