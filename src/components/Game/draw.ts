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

export { drawDot, drawLineToAngle };
