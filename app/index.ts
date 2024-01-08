import { Sudoku } from "./Sudoku";
import { SudokuSolver } from "./SudokuSolver";

function main() {
  const matrix = [
    [ 3, 0, 6, 5, 0, 8, 4, 0, 0 ],
    [ 5, 2, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 8, 7, 0, 0, 0, 0, 3, 1 ],
    [ 0, 0, 3, 0, 1, 0, 0, 8, 0 ],
    [ 9, 0, 0, 8, 6, 3, 0, 0, 5 ],
    [ 0, 5, 0, 0, 9, 0, 6, 0, 0 ],
    [ 1, 3, 0, 0, 0, 0, 2, 5, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 7, 4 ],
    [ 0, 0, 5, 2, 0, 6, 3, 0, 0 ]
  ];
  
  const sudokuResult = Sudoku.fromMatrix(matrix);
  const solver = new SudokuSolver();

  if(sudokuResult.isError()) { return; }

  const solutionResult = solver.solve(sudokuResult.getValue());
  
  if(solutionResult.isError()) {
    console.log("sudoku has no solutions: ");
    console.log(sudokuResult.getValue().toString());
  } else {
    console.log("sudoku: ");
    console.log(sudokuResult.getValue().toString());
    console.log("has solution: ");
    console.log(solutionResult.getValue().toString());
  }
}

main();