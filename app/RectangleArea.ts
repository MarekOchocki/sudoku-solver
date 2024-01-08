import { Vector2 } from "./Vector2";


export class RectangleArea {
  private constructor(private topLeft: Vector2, private bottomRight: Vector2) { }

  public isInside(position: Vector2): boolean {
    return position.x >= this.topLeft.x &&
      position.x <= this.bottomRight.x &&
      position.y >= this.topLeft.y &&
      position.y <= this.bottomRight.y;
  }

  static fromPointAndSize(topLeftPoint: Vector2, size: Vector2): RectangleArea {
    const bottomRightPointX = topLeftPoint.x + size.x - 1;
    const bottomRightPointY = topLeftPoint.y + size.y - 1;
    return new RectangleArea(topLeftPoint, new Vector2(bottomRightPointX, bottomRightPointY));
  }
}