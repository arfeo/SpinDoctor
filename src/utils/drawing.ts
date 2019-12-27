import { DrawOptions, DrawOptionsExtended } from '../types/utils';

/**
 * Alias for drawArc, this function draws a circle of the given size and style at the given coordinates
 *
 * @param ctx
 * @param dotX
 * @param dotY
 * @param radius
 * @param options
 */
function drawCircle(
  ctx: CanvasRenderingContext2D,
  dotX: number,
  dotY: number,
  radius: number,
  options: DrawOptionsExtended = {},
): void {
  drawArc(
    ctx,
    dotX,
    dotY,
    radius,
    {
      ...options,
      startAngle: 0,
      endAngle: Math.PI * 2,
    },
  );
}

/**
 * Function draws a circle sector at the given coordinates
 *
 * @param ctx
 * @param dotX
 * @param dotY
 * @param radius
 * @param options
 */
function drawSector(
  ctx: CanvasRenderingContext2D,
  dotX: number,
  dotY: number,
  radius: number,
  options: DrawOptionsExtended = {},
): void {
  ctx.beginPath();
  ctx.moveTo(dotX, dotY);
  ctx.arc(dotX, dotY, radius, options.startAngle, options.endAngle);
  ctx.lineTo(dotX, dotY);
  ctx.closePath();

  if (options.fillColor) {
    ctx.fillStyle = options.fillColor;

    ctx.fill();
  }

  if (options.edgingWidth) {
    ctx.lineWidth = options.edgingWidth;
    ctx.strokeStyle = options.edgingColor || 'rgba(0, 0, 0, 0)';

    ctx.stroke();
  }
}

/**
 * Function draws a circle sector at the given coordinates
 *
 * @param ctx
 * @param cx
 * @param cy
 * @param radius
 * @param options
 */
function drawArc(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  options: DrawOptionsExtended = {},
): void {
  ctx.beginPath();
  ctx.arc(cx, cy, radius, options.startAngle, options.endAngle);

  if (options.fillColor) {
    ctx.fillStyle = options.fillColor;

    ctx.fill();
  }

  if (options.edgingWidth) {
    ctx.lineWidth = options.edgingWidth;
    ctx.strokeStyle = options.edgingColor || 'rgba(0, 0, 0, 0)';

    ctx.stroke();
  }
}

/**
 * Function draws a line starting at the given coordinates of the given length at the given angle;
 * it returns an array of start and end positions of the line
 *
 * @param ctx
 * @param x1
 * @param y1
 * @param length
 * @param angle
 * @param options
 */
function drawLineToAngle(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  length: number,
  angle: number,
  options: Omit<DrawOptions, 'fillColor'> = {},
): number[][] {
  const a = angle * Math.PI / 180;
  const x2 = x1 + length * Math.cos(a);
  const y2 = y1 + length * Math.sin(a);

  ctx.strokeStyle = options.edgingColor;
  ctx.lineWidth = options.edgingWidth;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  return [
    [x1, y1],
    [x2, y2],
  ];
}

/**
 * Function draws a star-like object with the given count of spikes at the given coordinates
 *
 * @param ctx
 * @param cx
 * @param cy
 * @param spikes
 * @param outerRadius
 * @param innerRadius
 * @param options
 */
function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  spikes: number,
  outerRadius: number,
  innerRadius: number,
  options: DrawOptions = {},
): void {
  const step = Math.PI / spikes;
  let rotation: number = Math.PI / 2 * 3;
  let x: number = cx;
  let y: number = cy;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);

  for (let i = 0; i < spikes; i += 1) {
    x = cx + Math.cos(rotation) * outerRadius;
    y = cy + Math.sin(rotation) * outerRadius;
    ctx.lineTo(x, y);
    rotation += step;

    x = cx + Math.cos(rotation) * innerRadius;
    y = cy + Math.sin(rotation) * innerRadius;
    ctx.lineTo(x, y);
    rotation += step;
  }

  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();

  if (options.edgingWidth) {
    ctx.lineWidth = options.edgingWidth;
    ctx.strokeStyle = options.edgingColor || 'rgba(0, 0, 0, 0)';

    ctx.stroke();
  }

  if (options.fillColor) {
    ctx.fillStyle = options.fillColor;

    ctx.fill();
  }
}

/**
 * Function draws a filled rectangle of the given size and style at the given coordinates
 *
 * @param ctx
 * @param left
 * @param top
 * @param width
 * @param height
 * @param options
 */
function drawRectangle(
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  width: number,
  height: number,
  options: DrawOptions = {},
): void {
  if (options.fillColor) {
    ctx.fillStyle = options.fillColor;

    ctx.fillRect(left, top, width, height);
  }

  if (options.edgingWidth) {
    ctx.lineWidth = options.edgingWidth;
    ctx.strokeStyle = options.edgingColor || 'rgba(0, 0, 0, 0)';

    ctx.strokeRect(left, top, width, height);
  }
}

export {
  drawCircle,
  drawSector,
  drawArc,
  drawLineToAngle,
  drawStar,
  drawRectangle,
};
