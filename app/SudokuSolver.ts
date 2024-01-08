import { Result, UncheckedResult } from "./Result";
import { Sudoku } from "./Sudoku";
import { Vector2 } from "./Vector2";

export class SudokuSolver {
  public solve(sudoku: Sudoku): UncheckedResult<Sudoku, undefined> {
    const sudokuCopy = sudoku.copy();
    return this.trySolving(sudokuCopy);
  }

  private trySolving(sudoku: Sudoku): UncheckedResult<Sudoku, undefined> {
    for(let y = 0; y < sudoku.getSize(); y++) {
      for(let x = 0; x < sudoku.getSize(); x++) {
        if(sudoku.getCell(new Vector2(x, y)) !== 0) continue;
        const result = this.tryPossibleValuesForPosition(new Vector2(x, y), sudoku);
        if(result.isOk()) {
          return result;
        } else {
          return Result.error(undefined);
        }
      }
    }
    return Result.ok(sudoku);
  }

  private tryPossibleValuesForPosition(position: Vector2, sudoku: Sudoku): UncheckedResult<Sudoku, undefined> {
    const possibleValues = this.getPossibleValuesAtPosition(position, sudoku);
    for(let i = 0; i < possibleValues.length; i++) {
      sudoku.setCell(position, possibleValues[i]);
      const result = this.trySolving(sudoku);
      if(result.isOk()) {
         return result;
      }
    }
    sudoku.setCell(position, 0);
    return Result.error(undefined);
  }

  private getPossibleValuesAtPosition(position: Vector2, sudoku: Sudoku): number[] {
    if(sudoku.getCell(position) !== 0) return [];
    const allValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return allValues.filter(v => this.canBeAtPosition(v, position, sudoku));
  }

  private canBeAtPosition(value: number, position: Vector2, sudoku: Sudoku): boolean {
    return !this.hasValueInColumn(value, position.x, sudoku) &&
      !this.hasValueInRow(value, position.y, sudoku) &&
      !this.hasValueInSquare(value, position, sudoku);
  }

  private hasValueInColumn(value: number, column: number, sudoku: Sudoku): boolean {
    for(let i = 0; i < sudoku.getSize(); i++) {
      if(sudoku.getCell(new Vector2(column, i)) === value) {
        return true;
      }
    }
    return false;
  }

  private hasValueInRow(value: number, row: number, sudoku: Sudoku): boolean {
    for(let i = 0; i < sudoku.getSize(); i++) {
      if(sudoku.getCell(new Vector2(i, row)) === value) {
        return true;
      }
    }
    return false;
  }

  private hasValueInSquare(value: number, cellPosition: Vector2, sudoku: Sudoku): boolean {
    const startX = Math.floor(cellPosition.x / 3) * 3;
    const startY = Math.floor(cellPosition.y / 3) * 3;

    for(let x = 0; x < 3; x++) {
      for(let y = 0; y < 3; y++) {
        if(sudoku.getCell(new Vector2(startX + x, startY + y)) === value) {
          return true;
        }
      }
    }
    return false;
  }
}