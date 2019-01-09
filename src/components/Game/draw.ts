/**
 * Function draws a dot of the given size and style at the given coordinates
 *
 * @param ctx
 * @param dotX
 * @param dotY
 * @param radius
 * @param fillStyle
 * @param edgingWidth
 * @param edgingColor
 */
function drawDot(
  ctx: CanvasRenderingContext2D,
  dotX: number,
  dotY: number,
  radius: number,
  fillStyle: string,
  edgingWidth?: number,
  edgingColor?: string,
) {
  ctx.beginPath();
  ctx.arc(
    dotX,
    dotY,
    radius,
    0,
    Math.PI * 2,
    false,
  );
  ctx.fillStyle = fillStyle || 'transparent';
  ctx.fill();
  ctx.lineWidth = edgingWidth || 0;
  ctx.strokeStyle = edgingColor || 'transparent';
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
  strokeStyle: string,
  lineWidth: number,
): number[][] {
  const a = angle * Math.PI / 180;
  const x2 = x1 + length * Math.cos(a);
  const y2 = y1 + length * Math.sin(a);

  ctx.strokeStyle = strokeStyle || 'transparent';
  ctx.lineWidth = lineWidth || 0;

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
  fillStyle: string,
  edgingWidth: number,
  edgingColor: string,
) {
  let rotation: number = Math.PI / 2 * 3;
  let x: number = cx;
  let y: number = cy;
  const step = Math.PI / spikes;

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
  ctx.lineWidth = edgingWidth || 0;
  ctx.strokeStyle = edgingColor || 'transparent';
  ctx.stroke();
  ctx.fillStyle = fillStyle || 'transparent';
  ctx.fill();
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
 */
function drawFilledRectangle(
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  width: number,
  height: number,
  fillStyle?: string,
) {
  ctx.fillStyle = fillStyle || 'transparent';
  ctx.fillRect(left, top, width, height);
}

/**
 * Function draws a stroke rectangle of the given size and style at the given coordinates
 *
 * @param ctx
 * @param left
 * @param top
 * @param width
 * @param height
 * @param edgingWidth
 * @param edgingColor
 */
function drawStrokeRectangle(
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  width: number,
  height: number,
  edgingWidth: number,
  edgingColor: string,
) {
  ctx.lineWidth = edgingWidth || 0;
  ctx.strokeStyle = edgingColor || 'transparent';
  ctx.strokeRect(left, top, width, height);
}

export {
  drawDot,
  drawLineToAngle,
  drawStar,
  drawFilledRectangle,
  drawStrokeRectangle,
};
