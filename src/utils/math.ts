import { ILineSegment, IPoint } from '../types/utils';

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
 * Function checks if a point belongs to a line segment
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

/**
 * Function checks if a line segment intersects with a rectangle by checking intersection
 * with each of its sides; returns true if at least one intersection registered
 *
 * @param segment
 * @param rectCoords
 */
function lineSegmentIntersectsWithRect(segment: ILineSegment, rectCoords: number[]): boolean {
  const segment1: ILineSegment = {
    start: { x: rectCoords[0], y: rectCoords[1] },
    end: { x: rectCoords[2], y: rectCoords[1] },
  };
  const segment2: ILineSegment = {
    start: { x: rectCoords[0], y: rectCoords[1] },
    end: { x: rectCoords[0], y: rectCoords[3] },
  };
  const segment3: ILineSegment = {
    start: { x: rectCoords[0], y: rectCoords[3] },
    end: { x: rectCoords[2], y: rectCoords[3] },
  };
  const segment4: ILineSegment = {
    start: { x: rectCoords[2], y: rectCoords[1] },
    end: { x: rectCoords[2], y: rectCoords[3] },
  };

  return (
    lineSegmentsIntersect(segment, segment1) ||
    lineSegmentsIntersect(segment, segment2) ||
    lineSegmentsIntersect(segment, segment3) ||
    lineSegmentsIntersect(segment, segment4)
  );
}

export {
  lineSegmentsIntersect,
  pointOnLineSegment,
  lineSegmentIntersectsWithRect,
};
