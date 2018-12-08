/**
 * Function returns true if one line intersects with another
 *
 * @param point1
 * @param point2
 */
export function intersects(
  point1: {
    start: {
      x: number;
      y: number;
    };
    end: {
      x: number;
      y: number;
    };
  },
  point2: {
    start: {
      x: number;
      y: number;
    };
    end: {
      x: number;
      y: number;
    };
  },
): boolean {
  const det: number = (point1.end.x - point1.start.x) * (point2.end.y - point2.start.y) -
    (point2.end.x - point2.start.x) * (point1.end.y - point1.start.y);

  if (det === 0) {
    return false;
  }

  const lambda = ((point2.end.y - point2.start.y) * (point2.end.x - point1.start.x) +
    (point2.start.x - point2.end.x) * (point2.end.y - point1.start.y)) / det;
  const gamma = ((point1.start.y - point1.end.y) * (point2.end.x - point1.start.x) +
    (point1.end.x - point1.start.x) * (point2.end.y - point1.start.y)) / det;

  return (lambda > 0 && lambda < 1) && (gamma > 0 && gamma < 1);
}
