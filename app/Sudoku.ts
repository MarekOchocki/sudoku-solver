import { RectangleArea } from "./RectangleArea";
import { Result, UncheckedResult } from "./Result";
import { Vector2 } from "./Vector2";

export class Sudoku {
  static readonly validLength = 9;

  private sudokuArea: RectangleArea;
  private length: number;

  private constructor(private matrix: number[][]) {
    this.length = matrix[0].length;
    this.sudokuArea = RectangleArea.fromPointAndSize(new Vector2(0, 0), new Vector2(this.length, this.length));
  }

  static fromMatrix(matrix: number[][]): UncheckedResult<Sudoku, undefined> {
    if(!Sudoku.hasValidSize(matrix) || !Sudoku.hasValidValues(matrix))
      return Result.error(undefined);
    return Result.ok(new Sudoku(matrix))
  }

  public copy(): Sudoku {
    const matrixCopy = this.matrix.map(line => [...line]);
    return new Sudoku(matrixCopy);
  }

  public getCell(position: Vector2): number | undefined {
    if(!this.isInside(position)) {
      return undefined;
    }
    return this.matrix[position.y][position.x];

  }

  public setCell(position: Vector2, value: number): void {
    if(!this.isInside(position)) { return; }
    if(!this.isInside(position)) { return; }
    this.matrix[position.y][position.x] = value;
  }

  public getSize(): number {
    return this.length;
  }

  public toString(): string {
    const horizontalLine = '-'.repeat(8*3 + 1);
    let result = horizontalLine + '\n';
    for(let i = 0; i < 3; i++) {
      for(let y = 0; y < 3; y++) {
        result += this.lineToString(i*3 + y) + '\n';
      }
      result += horizontalLine + '\n';
    }
    return result;
  }

  private lineToString(y: number): string {
    let result = '| ';
    for(let i = 0; i < 3; i++) {
      for(let x = 0; x < 3; x++) {
        result += `${this.getCell(new Vector2(i*3 + x, y))} `;
      }
      result += '| ';
    }
    return result;
  }

  private isInside(position: Vector2): boolean {
    return this.sudokuArea.isInside(position);
  }

  private static hasValidValues(matrix: number[][]): boolean {
    const sizeY = matrix.length;
    for(let i = 0; i < sizeY; i++) {
      for(let j = 0; j < matrix[i].length; j++) {
        if(!Sudoku.isValidCellValue(matrix[i][j], sizeY)) return false;
      }
    }
    return true;
  }

  private static hasValidSize(matrix: number[][]): boolean {
    const sizeY = matrix.length;
    if(sizeY !== Sudoku.validLength) return false;
    for(let i = 0; i < sizeY; i++) {
      if(matrix[i].length !== sizeY) return false;
    }
    return true;
  }

  private static isValidCellValue(value: number, sudokuLength: number): boolean {
    return value >= 0 && value <= sudokuLength;
  }
}