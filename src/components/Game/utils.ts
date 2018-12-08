import { ILineSegment, IPoint } from '../../types/global';

/**
 * Function returns true if one line segment intersects with another
 *
 * @param segment1
 * @param segment2
 */
function lineSegmentsIntersect(segment1: ILineSegment, segment2: ILineSegment): boolean {
  const det: number = (segment1.end.x - segment1.start.x) * (segment2.end.y - segment2.start.y) -
    (segment2.end.x - segment2.start.x) * (segment1.end.y - segment1.start.y);

  if (det === 0) {
    return false;
  }

  const lambda: number = ((segment2.end.y - segment2.start.y) * (segment2.end.x - segment1.start.x) +
    (segment2.start.x - segment2.end.x) * (segment2.end.y - segment1.start.y)) / det;
  const gamma: number = ((segment1.start.y - segment1.end.y) * (segment2.end.x - segment1.start.x) +
    (segment1.end.x - segment1.start.x) * (segment2.end.y - segment1.start.y)) / det;

  return (lambda > 0 && lambda < 1) && (gamma > 0 && gamma < 1);
}

/**
 * Function checks if a point belongs on a line segment
 *
 * @param segment
 * @param point
 * @param tolerance
 */
function pointOnLineSegment(segment: ILineSegment, point: IPoint, tolerance: number): boolean {
  const dxL: number = segment.end.x - segment.start.x;
  const dyL: number = segment.end.y - segment.start.y;
  const dxP: number = point.x - segment.start.x;
  const dyP: number = point.y - segment.start.y;

  const squareLen: number = dxL * dxL + dyL * dyL;
  const dotProd: number = dxP * dxL + dyP * dyL;
  const crossProd: number = dyP * dxL - dxP * dyL;

  return (Math.abs(crossProd) / Math.sqrt(squareLen) <= tolerance && dotProd >= 0 && dotProd <= squareLen);
}

export { lineSegmentsIntersect, pointOnLineSegment };
