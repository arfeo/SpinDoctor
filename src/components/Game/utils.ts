/**
 * Function returns true if the line (a, b) -> (c, d) intersects with (p, q) -> (r, s)
 *
 * @param a
 * @param b
 * @param c
 * @param d
 * @param p
 * @param q
 * @param r
 * @param s
 */
export function intersects(
  a: number,
  b: number,
  c: number,
  d: number,
  p: number,
  q: number,
  r: number,
  s: number,
): boolean {
  let det: number;
  let gamma: number;
  let lambda: number;

  det = (c - a) * (s - q) - (r - p) * (d - b);

  if (det === 0) {
    return false;
  }

  lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
  gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;

  return (lambda > 0 && lambda < 1) && (gamma > 0 && gamma < 1);
}
