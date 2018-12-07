function drawDot(dotX: number, dotY: number, fillStyle: string, strokeStyle: string) {
  const ctx: CanvasRenderingContext2D = this.staticCanvas.getContext('2d');

  ctx.beginPath();
  ctx.arc(
    dotX + this.cellSize / 2,
    dotY + this.cellSize / 2,
    this.cellSize / 5,
    0,
    Math.PI * 2,
    false,
  );

  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = strokeStyle;
  ctx.stroke();
}

function drawLineToAngle(ctx: CanvasRenderingContext2D, x1: number, y1: number, length: number, angle: number) {
  const a = angle * Math.PI / 180;

  const x2 = x1 + length * Math.cos(a);
  const y2 = y1 + length * Math.sin(a);

  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  spikes: number,
  outerRadius: number,
  innerRadius: number,
  backgroundColor: string,
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
  ctx.strokeStyle = edgingColor || null;
  ctx.stroke();
  ctx.fillStyle = backgroundColor || null;
  ctx.fill();
}

export { drawDot, drawLineToAngle, drawStar };
