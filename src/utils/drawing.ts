/**
 * Alias for drawArc, this function draws a circle of the given size and style at the given coordinates
 *
 * @param ctx
 * @param dotX
 * @param dotY
 * @param radius
 * @param fillStyle
 * @param edgingWidth
 * @param edgingColor
 */
function drawCircle(
  ctx: CanvasRenderingContext2D,
  dotX: number,
  dotY: number,
  radius: number,
  fillStyle?: string,
  edgingWidth?: number,
  edgingColor?: string,
) {
  drawArc(ctx, dotX, dotY, radius, 0, Math.PI * 2, fillStyle, edgingWidth, edgingColor);
}

/**
 * Function draws a circle sector at the given coordinates
 *
 * @param ctx
 * @param dotX
 * @param dotY
 * @param radius
 * @param startAngle
 * @param endAngle
 * @param fillStyle
 * @param edgingWidth
 * @param edgingColor
 */
function drawSector(
  ctx: CanvasRenderingContext2D,
  dotX: number,
  dotY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  fillStyle: string,
  edgingWidth?: number,
  edgingColor?: string,
) {
  ctx.fillStyle = fillStyle;
  ctx.lineWidth = edgingWidth || 0;
  ctx.strokeStyle = edgingColor || 'transparent';

  ctx.beginPath();
  ctx.moveTo(dotX, dotY);
  ctx.arc(dotX, dotY, radius, startAngle, endAngle);
  ctx.lineTo(dotX, dotY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

/**
 * Function draws a circle sector at the given coordinates
 *
 * @param ctx
 * @param cx
 * @param cy
 * @param radius
 * @param startAngle
 * @param endAngle
 * @param fillStyle
 * @param edgingWidth
 * @param edgingColor
 */
function drawArc(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  fillStyle?: string,
  edgingWidth?: number,
  edgingColor?: string,
) {
  ctx.fillStyle = fillStyle || 'transparent';
  ctx.lineWidth = edgingWidth || 0;
  ctx.strokeStyle = edgingColor || 'transparent';

  ctx.beginPath();
  ctx.arc(cx, cy, radius, startAngle, endAngle);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
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
 * @param strokeStyle
 * @param lineWidth
 */
function drawLineToAngle(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  length: number,
  angle: number,
  strokeStyle?: string,
  lineWidth?: number,
): number[][] {
  const a = angle * Math.PI / 180;
  const x2 = x1 + length * Math.cos(a);
  const y2 = y1 + length * Math.sin(a);

  ctx.strokeStyle = strokeStyle || 'transparent';
  ctx.lineWidth = lineWidth || 0;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.closePath();
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
 * @param fillStyle
 * @param edgingWidth
 * @param edgingColor
 */
function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  spikes: number,
  outerRadius: number,
  innerRadius: number,
  fillStyle?: string,
  edgingWidth?: number,
  edgingColor?: string,
) {
  let rotation: number = Math.PI / 2 * 3;
  let x: number = cx;
  let y: number = cy;
  const step = Math.PI / spikes;

  ctx.fillStyle = fillStyle || 'transparent';
  ctx.lineWidth = edgingWidth || 0;
  ctx.strokeStyle = edgingColor || 'transparent';

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
  ctx.fill();
  ctx.stroke();
}

/**
 * Function draws a filled rectangle of the given size and style at the given coordinates
 *
 * @param ctx
 * @param left
 * @param top
 * @param width
 * @param height
 * @param fillStyle
 * @param edgingWidth
 * @param edgingColor
 */
function drawRectangle(
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  width: number,
  height: number,
  fillStyle?: string,
  edgingWidth?: number,
  edgingColor?: string,
) {
  ctx.fillStyle = fillStyle || 'transparent';
  ctx.lineWidth = edgingWidth || 0;
  ctx.strokeStyle = edgingColor || 'transparent';

  if (fillStyle) {
    ctx.fillRect(left, top, width, height);
  }

  if (edgingWidth) {
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
