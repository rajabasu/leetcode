// Valid Sudoku - Optimal O(1) time and space for 9x9 board
// Returns true if the board is valid according to Sudoku rules
// Uses sets to track seen digits in rows, columns, and 3x3 boxes

/**
 * @param {character[][]} board - 9x9 Sudoku board
 * @return {boolean} - true if valid, false otherwise
 */
const isValidSudoku = (board) => {
  // Arrays of sets to track seen digits
  const rows = Array.from({ length: 9 }, () => new Set());
  const cols = Array.from({ length: 9 }, () => new Set());
  const boxes = Array.from({ length: 9 }, () => new Set());

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const val = board[i][j];
      if (val === '.') continue;
      const boxIdx = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      // Check for duplicates in row, column, or box
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

// Example usage:
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
